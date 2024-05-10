import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  calculateUserBalanceUSD,
  getConversionRate,
  insertEmployeeWageData,
  insertWageAccessRequest,
} from "../lib/utils";

const prisma = new PrismaClient();

export const getWages = async (req: Request, res: Response) => {
  try {
    const employeeWageData = await prisma.wageData.findMany({
      where: { employeeId: req.user.employeeId },
      include: {
        currency: { select: { currencyName: true, currencyId: true } },
      },
    });

    const wagesAccessRequests = await prisma.wageAccessRequest.findMany({
      ...(req.user && { where: { employeeId: req.user.employeeId } }),
      include: {
        currency: { select: { currencyName: true, currencyId: true } },
      },
    });

    const formattedData = employeeWageData.map(
      (wage: {
        amount: number;
        currency: {
          currencyName: string;
          currencyId: string;
        };
      }) => ({
        amount: wage.amount,
        currency: wage.currency.currencyName,
        currencyId: wage.currency.currencyId,
      })
    );

    const formattedRequests = wagesAccessRequests.map(
      (
        request: {
          currency: {
            currencyId: string;
            currencyName: string;
          };
        } & {
          requestId: number;
          employeeId: string;
          amount: number;
          currencyId: string;
        }
      ) => ({
        amount: -request.amount,
        currency: request.currency.currencyName,
        currencyId: request.currency.currencyId,
      })
    );

    const combinedData = [...formattedData, ...formattedRequests];

    res.json({ wages: combinedData });
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).send("Server Error");
  }
};

export const postWages = async (req: Request, res: Response) => {
  const { employeeId, totalEarnedWages, currencyId } = req.body;

  if (!employeeId || !totalEarnedWages || !currencyId) {
    return res
      .status(400)
      .send("Missing employeeId, totalEarnedWages, or currencyId");
  }

  try {
    await insertEmployeeWageData(employeeId, totalEarnedWages, currencyId);

    res.status(201).send("Wage created successfully");
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).send("Server Error");
  }
};

export const getWagesRequests = async (req: Request, res: Response) => {
  try {
    const wageAccessRequests = await prisma.wageAccessRequest.findMany({
      select: {
        employeeId: true,
        amount: true,
        currencyId: true,
      },
    });
    res.json(wageAccessRequests);
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).send("Server Error");
  }
};

export const postWagesRequests = async (req: Request, res: Response) => {
  const { employeeId } = req.user;
  const { amount, currencyId } = req.body;

  if (!amount || !currencyId) {
    return res.status(400).send("Missing amount or currencyId");
  }

  try {
    const conversionRate = await getConversionRate(currencyId);
    const requestedAmountUSD = amount * conversionRate;

    const balanceUSD = await calculateUserBalanceUSD(employeeId);

    if (balanceUSD < requestedAmountUSD) {
      return res
        .status(400)
        .send(`Insufficient balance. Current balance: ${balanceUSD} USD`);
    }

    await insertWageAccessRequest(employeeId, amount, currencyId);

    res.status(201).send("Wage access request created successfully");
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).send("Server Error");
  }
};

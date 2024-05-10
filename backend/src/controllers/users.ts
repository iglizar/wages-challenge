import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { calculateUserBalanceUSD, validateEmployeeId } from "../lib/utils";

const prisma = new PrismaClient();
const tokenSecret = process.env.TOKEN_SECRET ?? "";

export const login = async (req: Request, res: Response) => {
  const { employeeId } = req.body;

  if (!employeeId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const isValidEmployeeId = await validateEmployeeId(employeeId);

  if (!isValidEmployeeId) {
    return res.status(400).json({ error: "Invalid employeeId" });
  }
  const token = jwt.sign(employeeId, tokenSecret);
  await prisma.employee.update({
    where: { employeeId },
    data: { token: token },
  });

  res.json({ token });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const employeesIds = await prisma.employee.findMany({
      select: {
        employeeId: true,
      },
      orderBy: {
        employeeId: "asc",
      },
    });

    res.json({ employeesIds });
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).send("Server Error");
  }
};

export const getBalance = async (req: Request, res: Response) => {
  const { employeeId } = req.user;

  try {
    const balanceUSD = await calculateUserBalanceUSD(employeeId);

    const currencies = await prisma.currency.findMany({
      select: {
        currencyId: true,
        currencyName: true,
        conversionRate: true,
      },
    });

    const balances = currencies.map(
      (currency: {
        currencyId: string;
        currencyName: string;
        conversionRate: number;
      }) => ({
        currency: currency.currencyName,
        currencyId: currency.currencyId,
        amount: Math.floor((balanceUSD * 100) / currency.conversionRate) / 100,
      })
    );

    res.json({ balances });
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).send("Server Error");
  }
};

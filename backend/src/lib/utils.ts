import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const calculateUserBalanceUSD = async (employeeId: string) => {
  const wages = await prisma.wageData.findMany({
    where: {
      employeeId: employeeId,
    },
    include: {
      currency: true,
    },
  });
  const totalWagesUSD = wages.reduce(
    (
      sum: number,
      wage: {
        amount: number;
        currency: {
          conversionRate: number;
        };
      }
    ) => sum + wage.amount * wage.currency.conversionRate,
    0
  );

  const wageAccessRequests = await prisma.wageAccessRequest.findMany({
    where: {
      employeeId: employeeId,
    },
    include: {
      currency: true,
    },
  });
  const totalRequestsUSD = wageAccessRequests.reduce(
    (
      sum: number,
      request: {
        amount: number;
        currency: {
          conversionRate: number;
        };
      }
    ) => sum + request.amount * request.currency.conversionRate,
    0
  );

  const balanceUSD = totalWagesUSD - totalRequestsUSD;
  return balanceUSD;
};

export async function getConversionRate(currencyId: string) {
  const currency = await prisma.currency.findUnique({
    where: {
      currencyId: currencyId,
    },
    select: {
      conversionRate: true,
    },
  });

  if (!currency) {
    throw new Error("Invalid currencyId");
  }

  return currency.conversionRate;
}

export async function insertWageAccessRequest(
  employeeId: string,
  requestedAmount: number,
  currencyId: string
) {
  await prisma.wageAccessRequest.create({
    data: {
      employeeId: employeeId,
      amount: requestedAmount,
      currencyId: currencyId,
    },
  });
}

export async function insertEmployeeWageData(
  employeeId: string,
  amount: number,
  currencyId: string
) {
  await prisma.wageAccessRequest.create({
    data: {
      employeeId,
      amount,
      currencyId,
    },
  });
}

export const validateEmployeeId = async (
  employeeId: string
): Promise<boolean> => {
  const employee = await prisma.employee.findUnique({
    where: {
      employeeId,
    },
  });

  return !!employee;
};

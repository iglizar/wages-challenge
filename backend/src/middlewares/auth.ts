import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const tokenSecret = process.env.TOKEN_SECRET ?? "";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token: string | null = authHeader.split(" ")[1];
    if (token !== "null") {
      try {
        const userId = jwt.verify(token, tokenSecret) as string;
        const userDoc: {
          employeeId: string;
          token: string | null;
        } | null = await prisma.employee.findUnique({
          where: { employeeId: userId },
        });
        if (userDoc) {
          req.user = { employeeId: userDoc.employeeId };
          return next();
        }
      } catch (err) {
        res.status(401).send("Invalid Token");
      }
    }
  }
  res.status(401).send("Unauthorized");
};

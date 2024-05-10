import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Balance } from "../../models/wages";

export const CardBalance = ({ balances }: { balances?: Balance[] }) => {
  const balanceItems =
    balances &&
    balances.map((balance, i) => (
      <div className="grid grid-cols-2 gap-4" key={i}>
        <div className="text-sm font-medium leading-none">
          <span>{balance.amount.toLocaleString()}</span>
        </div>
        <div className="text-sm font-medium leading-none">
          <span className="text-bluePrimary">{balance.currency}</span>
        </div>
      </div>
    ));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>Current Balance</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col items-left rounded-md border p-4 space-y-4">
          {balanceItems}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Balance } from "../../models/wages";
import { WageAccessForm } from "../forms/WageAccess";

const CardWageAccess: React.FC<{ balances?: Balance[] }> = ({ balances }) => {
  return (
    <Card className=" h-full">
      <CardHeader>
        <CardTitle>Requests</CardTitle>
        <CardDescription>Wages Early Access</CardDescription>
      </CardHeader>
      {balances && (
        <CardContent>
          {balances?.every((balance) => balance.amount === 0) ? (
            <div className="text-sm font-medium leading-none h-full">
              <span>There are no funds remaining in your account.</span>
            </div>
          ) : (
            <WageAccessForm wages={balances ?? []} />
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default CardWageAccess;

import React from "react";
import { useBalance } from "../models/wages";
import WagesCard from "../components/cards/Wages";
import { CardBalance } from "../components/cards/Balance";
import CardWageAccess from "../components/cards/WageAccess";

const BalanceSection = () => {
  const { data } = useBalance();
  return (
    <div className="flex flex-col h-full  space-y-4">
      <CardBalance balances={data?.balances} />
      <CardWageAccess balances={data?.balances} />
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="sm:grid sm:grid-cols-5 gap-4 grid-cols-1 space-y-4 sm:space-y-0">
      <div className="sm:col-span-3">
        <WagesCard />
      </div>
      <div className="sm:col-span-2">
        <BalanceSection />
      </div>
    </div>
  );
};

export default Dashboard;

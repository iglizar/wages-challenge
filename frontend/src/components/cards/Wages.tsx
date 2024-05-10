import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useWages } from "../../models/wages";
import { WagesTable } from "../tables/Wages";

const WagesCard: React.FC = () => {
  const { data: wages } = useWages();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Wages</CardTitle>
        <CardDescription>History</CardDescription>
      </CardHeader>

      <CardContent>{wages && <WagesTable data={wages.wages} />}</CardContent>
    </Card>
  );
};

export default WagesCard;

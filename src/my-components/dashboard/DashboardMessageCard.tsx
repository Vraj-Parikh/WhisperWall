import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import React from "react";

type DashboardMessageCardProps = {
  msg: string;
  sendData: Date;
};
const DashboardMessageCard = ({ msg, sendData }: DashboardMessageCardProps) => {
  return (
    <Card className="">
      <CardContent>
        <div className="flex justify-between">
          <div className="">
            <h2>{msg}</h2>
          </div>
          <div className="">
            <X />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMessageCard;

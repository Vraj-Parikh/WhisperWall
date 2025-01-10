import { X } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DashboardMessageCardProps = {
  msg: string;
  sendDate: Date;
  _id: string;
  handleOnDeleteMessage: (_id: string) => Promise<void>;
};
const DashboardMessageCard = ({
  msg,
  sendDate,
  _id,
  handleOnDeleteMessage,
}: DashboardMessageCardProps) => {
  const date = new Date(sendDate);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedDate = formatter.format(date).replace(", ", " ");
  return (
    <div className="shadow-xl p-3.5 rounded-md border">
      <div className="flex justify-between gap-2 items-stretch">
        <div className="space-y-2">
          <h2 className="text-sm sm:text-base md:text-lg font-bold">{msg}</h2>
          <h2 className="text-xs sm:text-sm italic">{formattedDate}</h2>
        </div>
        <div className="">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="bg-red-600 p-1 xxs:p-1.5 rounded-md scale-75 sm:scale-90">
                <X strokeWidth={3} color="#fff" size={20} />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  message from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleOnDeleteMessage(_id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessageCard;

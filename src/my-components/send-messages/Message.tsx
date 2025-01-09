import { NextPage } from "next";
import React, { ComponentPropsWithoutRef } from "react";

interface MessageProps extends ComponentPropsWithoutRef<"div"> {
  msg: string;
}
const Message: NextPage<MessageProps> = ({ msg, ...props }) => {
  return (
    <div {...props} className="border p-2 lg:p-3 rounded-md">
      <h2 className="text-xs xxs:text-sm sm:text-base">{msg}</h2>
    </div>
  );
};

export default Message;

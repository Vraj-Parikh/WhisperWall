import { NextPage } from "next";
import React, { ComponentPropsWithoutRef } from "react";

interface MessageProps extends ComponentPropsWithoutRef<"div"> {
  msg: string;
}
const Message: NextPage<MessageProps> = ({ msg, ...props }) => {
  return (
    <div {...props} className="border p-2 rounded-md">
      <h2>{msg}</h2>
    </div>
  );
};

export default Message;

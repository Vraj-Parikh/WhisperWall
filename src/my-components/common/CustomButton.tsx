import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import React, { ComponentPropsWithRef, PropsWithChildren } from "react";

interface CustomButtonProps extends ComponentPropsWithRef<"button"> {}
const CustomButton: NextPage<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button className={`${className}`} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;

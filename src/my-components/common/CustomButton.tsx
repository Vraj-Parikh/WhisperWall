import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { NextPage } from "next";
import React, { ComponentPropsWithRef, PropsWithChildren } from "react";

interface CustomButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {}
const CustomButton: NextPage<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button className={`active:scale-95 ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;

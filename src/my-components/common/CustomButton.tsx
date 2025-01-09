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
    <Button
      className={`active:scale-95 h-8 rounded-md px-3 text-xs sm:h-9 sm:px-4 sm:py-2 sm:text-sm md:h-10 md:px-8 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

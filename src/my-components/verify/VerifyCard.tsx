"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { VerifySchemaZod } from "@/schemas/VerifySchema";
import CustomButton from "../common/CustomButton";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
type VerifyCardProps = {
  userName: string;
};
const VerifyCard = ({ userName }: VerifyCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof VerifySchemaZod>>({
    resolver: zodResolver(VerifySchemaZod),
    defaultValues: {
      verificationCode: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof VerifySchemaZod>) => {
    try {
      setIsSubmitting(true);
      const { verificationCode } = data;
      const API_URL = "/api/verify-user";
      const postData = {
        userName,
        verificationCode,
      };
      await axios.post<ApiResponse>(API_URL, postData);
      form.reset();
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      if (errorMessage === "Verification Code Expired") {
        try {
          await axios.get(
            `http://localhost:3000/resend-otp?userName=${userName}`
          );
        } catch (error) {
          console.error(error);
        }
      }
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleOnResend = async () => {
    try {
      const API_URL = `/api/resend-otp?userName=${userName}`;
      const response = await axios.get(API_URL);
      form.setValue("verificationCode", "");
      toast({
        title: "OTP Resend",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Could Not Resend OTP",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <Card>
      <CardContent className="flex flex-col justify-between items-center p-4 sm:p-10 lg:p-12">
        <div className="space-y-2 lg:space-y-3 mb-6 lg:mb-10">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="Website Logo"
            priority
            quality={100}
            className="rounded-xl mx-auto"
          />
          <h1 className="text-lg xxs:text-xl md:text-2xl font-semibold lg:text-3xl text-center">
            OTP Verification
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col justify-center items-center"
          >
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className="border border-red-600"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="sm:text-base">
                    Enter the 6 digit OTP sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomButton
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting && "cursor-not-allowed"}`}
            >
              {isSubmitting ? (
                <div className="flex gap-2 justify-center items-center">
                  <LoaderCircle color="#fff" className="animate-spin" />
                  <h4 className="text-white">Validating</h4>
                </div>
              ) : (
                "Verify OTP"
              )}
            </CustomButton>
          </form>
        </Form>
        <div className="flex items-center text-sm justify-center gap-2 mt-4 lg:mt-6 md:text-base">
          <h2>Didn't get the code?</h2>
          <h2
            className="font-bold text-blue-600 cursor-pointer border-b-2 border-transparent hover:border-black transition-colors"
            onClick={handleOnResend}
          >
            Resend
          </h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyCard;

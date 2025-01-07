"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchemaZod } from "@/schemas/LoginSchema";
import { Input } from "@/components/ui/input";
import CustomButton from "../common/CustomButton";
const SignInForm = () => {
  const form = useForm<z.infer<typeof LoginSchemaZod>>({
    resolver: zodResolver(LoginSchemaZod),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchemaZod>) => {
    const { email, password } = values;
    try {
      //   const API_URL = `${process.env.WEBSITE_URL || "http://192.168.1.3:3000"}/api/send-message/${userName}`;
      //   const headers = new Headers();
      //   headers.append("Content-Type", "application/json");
      //   const request = new Request(API_URL, {
      //     method: "POST",
      //     body: JSON.stringify({ messageToSend: msg }),
      //     headers,
      //   });
      //   const response = await fetch(request);
      form.setValue("email", "");
      form.setValue("password", "");
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton className="block mx-auto" type="submit">
            Sign In
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;

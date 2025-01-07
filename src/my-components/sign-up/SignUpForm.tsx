"use client";
import React, { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import CustomButton from "../common/CustomButton";
import { SignUpSchemaZod } from "@/schemas/SignUpSchema";
import { useDebounce } from "@uidotdev/usehooks";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchemaZod>>({
    resolver: zodResolver(SignUpSchemaZod),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof SignUpSchemaZod>) => {
    const { email, password, confirmPassword, userName } = values;
    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "validate",
        message: "Password Does Not Match",
      });
      return;
    }
    try {
      const API_URL = `${process.env.WEBSITE_URL || "http://192.168.1.3:3000"}/api/sign-up`;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const request = new Request(API_URL, {
        method: "POST",
        body: JSON.stringify({ username: userName, email, password }),
        headers,
      });
      const response = await fetch(request);
      if (response && response?.success) {
        router.replace("/dashboard");
        // form.setValue("userName", "");
        // form.setValue("email", "");
        // form.setValue("password", "");
        // form.setValue("confirmPassword", "");
      } else {
        //show toast
        toast({
          description: "Could Not Register User. Please Try Again",
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  const val = form.watch("userName");
  const debouncedSearchTerm = useDebounce(val, 1000);
  useEffect(() => {
    if (debouncedSearchTerm.trim().length === 0) {
      return;
    }
    try {
      const API_URL = `${process.env.WEBSITE_URL || "http://192.168.1.3:3000"}/api/is-username-unique`;
      (async () => {
        let response = await fetch(
          `${API_URL}?username=${debouncedSearchTerm}`
        );
        response = await response.json();
        console.log(response);
        if (!response || !response?.success) {
          form.setError("userName", {
            type: "validate",
            message: "User Name Already Exists",
          });
        } else {
          form.clearErrors("userName");
        }
      })();
    } catch (error: any) {
      console.error(error);
    }
  }, [debouncedSearchTerm]);
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            Sign Up
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;

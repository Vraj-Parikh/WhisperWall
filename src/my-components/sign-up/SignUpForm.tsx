"use client";
import React, { useEffect, useState } from "react";
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
import { LoaderCircle } from "lucide-react";

// import CustomIcon from "../common/CustomIcon";
const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const userNameError = form.formState.errors.userName?.message;
    console.log(userNameError);
    if (userNameError) {
      form.setError("userName", {
        type: "validate",
        message: "User Name Already Exists",
      });
      return;
    }
    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "validate",
        message: "Password Does Not Match",
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const API_URL = `/api/sign-up`;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const request = new Request(API_URL, {
        method: "POST",
        body: JSON.stringify({ username: userName, email, password }),
        headers,
      });
      let response = await fetch(request);
      response = await response.json();
      if (response && response?.success) {
        form.setValue("userName", "");
        form.setValue("email", "");
        form.setValue("password", "");
        form.setValue("confirmPassword", "");
        router.push(`/verify/${userName}`);
      } else {
        toast({
          description: "Could Not Register User. Please Try Again",
        });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      form.clearErrors();
      setIsSubmitting(false);
    }
  };
  const val = form.watch("userName");
  const debouncedSearchTerm = useDebounce(val, 500);
  useEffect(() => {
    console.log("effect running");
    if (debouncedSearchTerm.trim().length === 0) {
      return;
    }
    try {
      const API_URL = `/api/is-username-unique`;
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
                <FormLabel className="font-semibold sm:text-base">
                  User Name
                </FormLabel>
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
                <FormLabel className="font-semibold sm:text-base">
                  Email
                </FormLabel>
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
                <FormLabel className="font-semibold sm:text-base">
                  Password
                </FormLabel>
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
                <FormLabel className="font-semibold sm:text-base">
                  Confirm Password
                </FormLabel>
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
          <CustomButton
            className={`sm:!mt-6 font-bold tracking-wider block mx-auto ${isSubmitting && "cursor-not-allowed"}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex gap-2 justify-center items-center">
                <LoaderCircle color="#fff" className="animate-spin" />
                <h4 className="text-white">Registering</h4>
              </div>
            ) : (
              "Sign Up"
            )}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;

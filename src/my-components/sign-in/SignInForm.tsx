"use client";
import React, { useState } from "react";
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
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast({
            title: "Login Failed",
            description: "Incorrect Email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Failed",
            description: result.error,
            variant: "destructive",
          });
        }
      }
      if (result?.url) {
        console.log(result);
        router.push("/dashboard");
        form.setValue("email", "");
        form.setValue("password", "");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <CustomButton
            className={`sm:!mt-6 font-bold tracking-wider block mx-auto ${isSubmitting && "cursor-not-allowed"}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex gap-2 justify-center items-center">
                <LoaderCircle color="#fff" className="animate-spin" />
                <h4 className="text-white">Logging In</h4>
              </div>
            ) : (
              "Login"
            )}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;

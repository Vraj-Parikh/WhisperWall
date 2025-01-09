import { Textarea } from "@/components/ui/textarea";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
type SendMessageProps = {
  userName: string;
  suggestedMessage: string;
};
const FormSchema = z.object({
  anonymousMsg: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters.",
    })
    .max(160, {
      message: "Message must not be longer than 200 characters.",
    }),
});

const SendMessage: NextPage<SendMessageProps> = ({
  userName,
  suggestedMessage,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      const { anonymousMsg: msg } = data;
      const API_URL = `/api/send-message/${userName}`;
      await axios.post(API_URL, { messageToSend: msg });
      toast({
        title: "Message Sent",
      });
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage =
        axiosError.response?.data.message || "Something Went Wrong";
      toast({
        title: "Could Not Send Message",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    form.setValue("anonymousMsg", suggestedMessage);
  }, [suggestedMessage]);
  return (
    <div className="w-full space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="anonymousMsg"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-base">
                  Send Anonymous Message To @
                  <span className="font-bold">{userName}</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="text-xs xxs:text-sm xs:text-base sm:text-2xl placeholder:text-sm min-h-20 sm:min-h-24 md:min-h-28 lg:min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            className={`!mt-3 sm:!mt-6 xxs:font-bold tracking-wider block mx-auto ${isSubmitting && "cursor-not-allowed"}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex gap-2 justify-center items-center">
                <LoaderCircle color="#fff" className="animate-spin" />
                <h4 className="text-white">Sending Message</h4>
              </div>
            ) : (
              "Send"
            )}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default SendMessage;

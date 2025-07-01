"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "../schema";
import { useAuth } from "../api/useAuth";

export default function ForgotPassword() {
  const { forgotPassword, forgotPasswordPending } = useAuth();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    console.log("ForgotPassword: Submitting forgot password form");
    const email = formData.get("email");
    if (typeof email === "string") {
      forgotPassword({ email });
    } else {
      // Optionally handle the error case
      console.error("Email is missing or not a string");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-[90%]">
      <Card className="shadow-none rounded-none border-none">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your email below to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={forgotPasswordPending}
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <a href="/auth/login" className="underline underline-offset-4">
              Back to login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

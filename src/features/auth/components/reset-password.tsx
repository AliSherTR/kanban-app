"use client";
import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema } from "../schema";
import { useAuth } from "../api/useAuth";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const {
    verifyPasswordResetToken,
    verifyPasswordResetTokenPending,
    verifyPasswordResetTokenSuccess,
    verifyPasswordResetTokenError,
    verifyPasswordResetTokenData,
    resetPassword,
    resetPasswordPending,
  } = useAuth();

  const params = useSearchParams();

  const token = params.get("token");

  if (!token) {
    redirect("/auth/login");
  }

  useEffect(() => {
    verifyPasswordResetToken({ token });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    console.log(data);
    const dataToSend = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: verifyPasswordResetTokenData.payload.email,
      token: token,
    };
    resetPassword(dataToSend);
  };

  if (verifyPasswordResetTokenPending) {
    return <p>Loading......</p>;
  }
  if (verifyPasswordResetTokenError) {
    return (
      <>
        <p className=" text-center font-semibold text-lg text-red-500">
          {verifyPasswordResetTokenError.message}
        </p>

        <Link
          href={"/auth/forgot-password"}
          className=" text-center block mt-3 underline text-sm"
        >
          Go To Reset Password
        </Link>
      </>
    );
  }

  if (verifyPasswordResetTokenSuccess) {
    console.log(verifyPasswordResetTokenData.payload.email);
    return (
      <div className="flex flex-col gap-6 w-[90%]">
        <Card className="shadow-none rounded-none border-none">
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Reset Password
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

  return null;
}

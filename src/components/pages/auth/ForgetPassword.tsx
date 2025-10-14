"use client";

import type React from "react";

import { FieldValues, useForm } from "react-hook-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { TResponse } from "@/global/global.interface";
import { toast } from "sonner";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>({ defaultValues: { email: "" } });
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = (await forgetPassword(data)) as TResponse<null>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({ email: "" });
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Forgot Password
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
            >
              Next
              {isLoading ? "Sending..." : "Next"}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

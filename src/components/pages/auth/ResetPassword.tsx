"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TResponse } from "@/global/global.interface";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { storToken } from "@/redux/features/auth/authSlice";

const ResetPassword = ({ email, token }: { email: string; token: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  useEffect(() => {
    dispatch(storToken(token));
  }, [token]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({ defaultValues: { newPassword: "", confirmPassword: "" } });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = (await resetPassword(data)) as TResponse<null>;

      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({ newPassword: "", confirmPassword: "" });
        toast.success(res.data.message);
        navigate.push("/auth/login");
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
              Set a New Password
            </h1>
            <p className="text-slate-300 text-sm">
              Create a new password. Ensure it differs from previous ones of
              security
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("newPassword", {
                    required: "Password is required",
                  })}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.newPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white text-sm">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};
export default ResetPassword;

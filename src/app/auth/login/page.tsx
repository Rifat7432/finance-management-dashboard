"use client";

import type React from "react";

import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import { AuthLayout } from "@/components/auth/auth-layout";
import { TResponse, TUserLoginData } from "@/global/global.interface";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { storToken, storUserData } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const navigate = useRouter()
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = (await loginUser(data)) as TResponse<TUserLoginData>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({ password: "", email: "" });
        toast.success(res.data.message);
        navigate.push("/");
        if (res?.data?.data) {
          localStorage.setItem("accessToken", res?.data?.data.accessToken);
          const decoded = jwtDecode(res?.data?.data.accessToken);
          const { exp, iat, ...rest } = decoded;
          dispatch(storToken(res?.data?.data.accessToken));
          return dispatch(storUserData(rest));
        }
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
              Login to Account
            </h1>
            <p className="text-slate-300 text-sm">
              Please enter your email and password to continue
            </p>
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
                placeholder="Enter your email"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message  as string}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-red-400 text-sm hover:text-red-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
            >
              Log In
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

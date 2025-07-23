"use client";

import { useRef, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";

export default function VerifyCodePage() {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [code, setCode] = useState(Array(5).fill(""));

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Here you would verify the code with your backend
    // For now, just redirect to reset-password
    window.location.href = "/auth/reset-password";
  };

  const handleResend = () => {
    alert("Verification code resent!");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Verification Code
            </h1>
            <p className="text-slate-300 text-sm">
              We sent a reset link to{" "}
              <span className="font-medium">contact@dscode...com</span>
              <br />
              Enter 5 digit code that is mentioned in the email
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el || null; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border border-slate-600 bg-slate-700/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete={index === 0 ? "one-time-code" : undefined}
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
          >
            Verify Code
          </Button>

          <p className="text-sm text-slate-300 mt-6">
            You have not received the email?{" "}
            <button
              onClick={handleResend}
              className="text-primary font-medium hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

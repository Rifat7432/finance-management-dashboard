"use client";

import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/auth-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        {children}
      </div>
    </div>
  );
}

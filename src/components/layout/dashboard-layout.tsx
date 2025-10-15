"use client";

import type React from "react";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Spinner from "../shared/Spinner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Skip redirect logic for /auth pages
    if (pathname.startsWith("/auth")) return;
    // Case 1: No token
    if (!token) {
      navigate.push("/auth/login");
      return;
    }
    // Case 2: Token exists but expired
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true;

      if (isExpired) {
        navigate.push("/auth/login");
      }
    } catch (error) {
      // Invalid token (e.g., corrupted)
      navigate.push("/auth/login");
    }
  }, [token, pathname, navigate]);
  if (!token) {
    return (
      <div className="flex items-center justify-center pt-40">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

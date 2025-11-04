"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CreditCard,
  Video,
  CalendarCheck,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logOut } from "@/redux/features/auth/authSlice";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Finance Data Monitoring", href: "/finance", icon: BarChart3 },
  // { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Content Management", href: "/content", icon: Video },
  { name: "Appointment", href: "/appointment", icon: CalendarCheck },
  { name: "Ad Management", href: "/ad", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 rounded">
      <img src="/logo.png" alt="logo" />
        </div>
        <span className="text-xl font-semibold text-gray-900">ROHU APP </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => {
            dispatch(logOut());
            console.log("logout");
          }}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

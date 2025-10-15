"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { setLoading, storUserData } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

export function Header() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserQuery(undefined);
  useEffect(() => {
    if (data) {
      dispatch(setLoading(isLoading));
      dispatch(
        storUserData({
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
          image: data.data.image ? data.data.image : undefined,
        })
      );
    }
  }, [isLoading, dispatch, data]);
  console.log(data?.data);
  const user = data?.data;
  if (user === null || isLoading) return null;
  console.log(user?.image, user, data);

  return (
    <header
      className="flex items-center justify-end gap-4 px-6 py-4 border-b"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Button variant="ghost" size="icon" className="rounded-lg">
        <Bell className="w-5 h-5" />
      </Button>
      <Avatar>
        <AvatarImage
          src={
            user?.image ? user?.image : "/placeholder.svg?height=32&width=32"
          }
        />
        <AvatarFallback>{user?.name}</AvatarFallback>
      </Avatar>
    </header>
  );
}

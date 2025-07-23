"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header
      className="flex items-center justify-end gap-4 px-6 py-4 border-b"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Button variant="ghost" size="icon" className="rounded-lg">
        <Bell className="w-5 h-5" />
      </Button>
      <Avatar>
        <AvatarImage src="/placeholder.svg?height=32&width=32" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </header>
  )
}
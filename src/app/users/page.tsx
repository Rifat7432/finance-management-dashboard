"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const users = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  name: "Robo Gladiators",
  email: "@gmail.com",
  avatar: "/placeholder.svg?height=32&width=32",
  subscriptions: i === 1 ? ("Expired" as const) : ("Active" as const),
  startDate: "March 15, 2024",
  endDate: "Apr 15, 2024",
}));

export default function UserManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useRouter();
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Select>
              <SelectTrigger className="w-[180px] text-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">
                  <Badge className="bg-green-100 text-green-800 border border-green-700">
                    Active
                  </Badge>
                </SelectItem>
                <SelectItem value="inactive">
                  <Badge className="bg-red-100 text-red-800 border border-red-700">
                    Inactive
                  </Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search" className="pl-10" />
          </div>
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="hover:bg-primary bg-[#636AE8] text-white">
                    <TableHead className="text-left p-3 rounded-l text-white">
                      Name
                    </TableHead>
                    <TableHead className="text-left p-3 text-white">
                      Email
                    </TableHead>
                    <TableHead className="text-left p-3 text-white">
                      Subscriptions
                    </TableHead>
                    <TableHead className="text-left p-3 text-white">
                      Start Date
                    </TableHead>
                    <TableHead className="text-left p-3 text-white">
                      End Date
                    </TableHead>
                    <TableHead className="text-left p-3 text-white rounded-r">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <Dialog
                    open={isCreateModalOpen}
                    onOpenChange={setIsCreateModalOpen}
                  >
                    {users.map((user) => (
                      <TableRow className="border-b" key={user.id}>
                        <TableCell className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>RG</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell className="p-3">{user.email}</TableCell>
                        <TableCell className="p-3">
                          <Badge
                            variant={
                              user.subscriptions === "Active"
                                ? "default"
                                : "destructive"
                            }
                            className={
                              user.subscriptions === "Active"
                                ? "bg-green-100 text-green-800 outline-green-700 outline-1"
                                : "bg-red-100 text-red-800 outline-red-700 outline-1"
                            }
                          >
                            {user.subscriptions}
                          </Badge>
                        </TableCell>
                        <TableCell className="p-3">{user.startDate}</TableCell>
                        <TableCell className="p-3">{user.endDate}</TableCell>
                        <TableCell className="p-3">
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                navigate.push(`/notifications/${user.id}`)
                              }
                              size="sm"
                              variant="ghost"
                              className="bg-transparent hover:bg-[#0053B21A] text-[#636AE8] cursor-pointer"
                            >
                              <Bell className="w-4 h-4" />
                            </Button>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-[#0053B21A] hover:bg-[#636AE8] hover:text-white text-[#636AE8] border border-[#636AE8] rounded-2xl cursor-pointer"
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="bg-[#B200001A] hover:bg-[#FF0000] hover:text-white text-[#FF0000] border border-[#FF0000] rounded-2xl cursor-pointer"
                            >
                              Block
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <DialogContent className="max-w-2xl w-full space-y-5">
                      <DialogTitle className="flex justify-between items-center px-4 mt-5">
                        <Avatar className="w-14 h-14">
                          <AvatarImage
                            height={56}
                            width={56}
                            src="/profile.png"
                          />
                        </Avatar>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 rounded-full cursor-pointer hover:bg-red-500 hover:text-white text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTitle>
                      <div className="space-y-2 px-4">
                        <p>
                          <span className="text-sm">Venue Name :</span>
                          <span className="text-sm font-semibold">
                            Urban Palate
                          </span>
                        </p>
                        <p>
                          <span className="text-sm">Email : </span>
                          <span className="text-sm font-semibold">
                            abc@example.com
                          </span>
                        </p>
                        <p>
                          <span className="text-sm">Phone number : </span>
                          <span className="text-sm font-semibold">
                            (319) 555-0115
                          </span>
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

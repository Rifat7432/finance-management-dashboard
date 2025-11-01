/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Trash2, Loader2 } from "lucide-react";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner"; // or your toast library
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} from "@/redux/features/user/userApi";
import Spinner from "@/components/shared/Spinner";
import { TResponse, TUserLoginData } from "@/global/global.interface";

export default function UserManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useRouter();

  // Fetch users with filters
  const {
    data: usersData,
    isLoading,
    isError,
  } = useGetAllUsersQuery({
    searchTerm: searchQuery,
    status: statusFilter,
    page: 1,
    limit: 10,
  });

  // Mutations
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const handleBlockUser = async (userId: string) => {
    try {
      const res = (await blockUser(userId)) as TResponse<TUserLoginData>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        return toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  const handleViewUser = (userId: string) => {
    setSelectedUser(userId);
    setIsCreateModalOpen(true);
  };
  if (usersData === null || isLoading)
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
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
                <SelectItem value="expired">
                  <Badge className="bg-red-100 text-red-800 border border-red-700">
                    Expired
                  </Badge>
                </SelectItem>
                <SelectItem value="inactive">
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                    Inactive
                  </Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center p-8">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        <p className="mt-2 text-muted-foreground">
                          Loading users...
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center p-8">
                        <p className="text-red-500">
                          Error loading users. Please try again.
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : !usersData?.data || usersData.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center p-8">
                        <p className="text-muted-foreground">No users found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    usersData.data.map((user: any) => (
                      <TableRow className="border-b" key={user._id}>
                        <TableCell className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={user.image || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell className="p-3">{user.email}</TableCell>
                        <TableCell className="p-3">
                          {user.subscriptions !== "Inactive" && (
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
                          )}
                          {user.subscriptions === "Inactive" && (
                            <Badge
                              variant={"destructive"}
                              className="bg-yellow-100 text-yellow-800 outline-yellow-300 outline-1"
                            >
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="p-3">
                          {user.startDate ? user.startDate : "N/A"}
                        </TableCell>
                        <TableCell className="p-3">
                          {user.endDate ? user.endDate : "N/A"}
                        </TableCell>
                        <TableCell className="p-3">
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                navigate.push(`/notifications/${user._id}`)
                              }
                              size="sm"
                              variant="ghost"
                              className="bg-transparent hover:bg-[#0053B21A] text-[#636AE8] cursor-pointer"
                            >
                              <Bell className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleViewUser(user)}
                              size="sm"
                              variant="outline"
                              className="bg-[#0053B21A] hover:bg-[#636AE8] hover:text-white text-[#636AE8] border border-[#636AE8] rounded-2xl cursor-pointer"
                            >
                              View
                            </Button>
                            <Button
                              onClick={() => handleBlockUser(user._id)}
                              disabled={isBlocking}
                              size="sm"
                              variant="destructive"
                              className="bg-[#B200001A] hover:bg-[#FF0000] hover:text-white text-[#FF0000] border border-[#FF0000] rounded-2xl cursor-pointer"
                            >
                              {isBlocking ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Block"
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl w-full space-y-5">
          {selectedUser ? (
            <>
              <DialogTitle className="flex justify-between items-center px-4 mt-5">
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    height={56}
                    width={56}
                    src={selectedUser.image || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {selectedUser.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DialogTitle>
              <div className="space-y-2 px-4">
                <p>
                  <span className="text-sm">Name: </span>
                  <span className="text-sm font-semibold">
                    {selectedUser.name}
                  </span>
                </p>
                <p>
                  <span className="text-sm">Email: </span>
                  <span className="text-sm font-semibold">
                    {selectedUser.email}
                  </span>
                </p>
                <p>
                  <span className="text-sm">Phone number: </span>
                  <span className="text-sm font-semibold">
                    {selectedUser.phoneNumber || "N/A"}
                  </span>
                </p>
                <p>
                  <span className="text-sm">Subscription: </span>
                  <span className="text-sm font-semibold">
                    {selectedUser.subscriptions}
                  </span>
                </p>
                {selectedUser.startDate && (
                  <p>
                    <span className="text-sm">Start Date: </span>
                    <span className="text-sm font-semibold">
                      {selectedUser.startDate}
                    </span>
                  </p>
                )}
                {selectedUser.startDate && (
                  <p>
                    <span className="text-sm">End Date: </span>
                    <span className="text-sm font-semibold">
                      {selectedUser.endDate}
                    </span>
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

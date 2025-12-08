/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  TrendingUp, TrendingDown, Bell, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FinanceOverviewChart } from "@/components/pages/dashboard/FinanceOverviewChart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import StatisticBarChart from "@/components/pages/dashboard/BarChart";
import {
  useBlockUserMutation,
  useGetAdminStatsQuery,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { TResponse, TUserLoginData } from "@/global/global.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";

const HomePage = () => {
   const navigate = useRouter();
  const [year, setYear] = useState<number | undefined>(undefined);
  const { data, isLoading } = useGetAdminStatsQuery({
    year: year ? year : new Date().getFullYear(),
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: usersData, isError,isLoading:userLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 10,
  });
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
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
      toast.error("Request Failed");
    }
  };

  const handleViewUser = (userId: string) => {
    setSelectedUser(userId);
    setIsCreateModalOpen(true);
  };

  if (usersData === null || isLoading || data?.data === null || userLoading)
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner />
      </div>
    );


  const stats = data?.data || null;
  const {
    activeUsers,
    engagementRate,
    totalContentViews,
    monthRevenue,
    totalSubscribers,
    financeOverview,
    usageEngagementTrends,
    revenueChart,
  } = stats;

  return (
    <>
  
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center items-center">
              <CardContent className="items-center space-y-4">
                <CardTitle className="text-sm font-medium text-gray-600 text-nowrap">
                  Active Users
                </CardTitle>
                <div className="text-2xl font-bold">{activeUsers.count}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    activeUsers.percentageChange > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } mt-1`}
                >
                  {activeUsers.percentageChange > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{activeUsers.percentageChange}</span>
                  <span className="text-gray-500">From the last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center items-center">
              <CardContent className="items-center space-y-4">
                <CardTitle className="text-sm font-medium text-gray-600 text-nowrap">
                  Engagement Rate
                </CardTitle>
                <div className="text-2xl font-bold">{engagementRate.rate}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    engagementRate.percentageChange > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } mt-1`}
                >
                  {engagementRate.percentageChange > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{engagementRate.percentageChange}</span>
                  <span className="text-gray-500">From the last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center items-center">
              <CardContent className="items-center space-y-4">
                <CardTitle className="text-sm font-medium text-gray-600 text-nowrap">
                  Total Content Views
                </CardTitle>
                <div className="text-2xl font-bold">
                  {totalContentViews.count}
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    totalContentViews.percentageChange > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } mt-1`}
                >
                  {totalContentViews.percentageChange > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{totalContentViews.percentageChange}</span>
                  <span className="text-gray-500">From the last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px]">
            {/* Usage Chart */}

            <div className="lg:col-span-2">
              <StatisticBarChart
                rawChartData={usageEngagementTrends}
                monthRevenue={monthRevenue}
                totalSubscribers={totalSubscribers}
                year={year}
                setYear={setYear}
              />
            </div>

            {/* Finance Overview */}
            <FinanceOverviewChart
              financeChartData={revenueChart}
              financeOverview={financeOverview}
            />
          </div>

          {/* User Management Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Link href="/users">
                  <Button variant="link" className="text-primary font-bold">
                    See All
                  </Button>
                </Link>
              </div>
            </CardHeader>
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
                    usersData.data.slice(0, 4).map((user: any) => (
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
    
    </>
  );
};

export default HomePage;

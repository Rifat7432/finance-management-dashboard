"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, TrendingUp } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import StatisticBarChart from "@/components/pages/dashboard/BarChart";

const stats = [
  {
    title: "Active Users",
    value: "2,500",
    change: "+4%",
    subtitle: "From the last month",
  },
  {
    title: "Engagement Rate",
    value: "15.2%",
    change: "+4%",
    subtitle: "From the last month",
  },
  {
    title: "Total Content Views",
    value: "54,321",
    change: "+4%",
    subtitle: "From the last month",
  },
];

const users = [
  {
    id: "1",
    name: "Robo Gladiators",
    email: "@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32",
    subscriptions: "Active" as const,
    startDate: "March 15, 2024",
    endDate: "Apr 15, 2024",
  },
  {
    id: "2",
    name: "Robo Gladiators",
    email: "@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32",
    subscriptions: "Expired" as const,
    startDate: "March 15, 2024",
    endDate: "Apr 15, 2024",
  },
  {
    id: "3",
    name: "Robo Gladiators",
    email: "@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32",
    subscriptions: "Active" as const,
    startDate: "March 15, 2024",
    endDate: "Apr 15, 2024",
  },
];
const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <>
      {" "}
      <DashboardLayout>
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center items-center">
                <CardContent className="items-center space-y-4">
                  <CardTitle className="text-sm font-medium text-gray-600 text-nowrap">
                    {stat.title}
                  </CardTitle>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                    <span className="text-gray-500">{stat.subtitle}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px]">
            {/* Usage Chart */}

            <div className="lg:col-span-2">
              <StatisticBarChart />
            </div>

            {/* Finance Overview */}
            <FinanceOverviewChart />
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
                          <TableCell className="p-3">
                            {user.startDate}
                          </TableCell>
                          <TableCell className="p-3">{user.endDate}</TableCell>
                          <TableCell className="p-3">
                            <div className="flex gap-2">
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
    </>
  );
};

export default Dashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/Pagination";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/shared/Spinner";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useGetUserFinanceTrackQuery } from "@/redux/features/finance/financeApi";
import { setPage } from "@/redux/features/finance/financeSlice";
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert to 12-hour format
  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes}${ampm}`;

  return `${year}-${month}-${day} ${formattedTime}`;
};

const FinancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { page } = useAppSelector((state) => state.finance);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserFinanceTrackQuery({ searchTerm });

  const navigate = useRouter();

  return (
    <div className="space-y-6 bg-white p-10 rounded-l">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Overview</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="h-80 flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-primary bg-[#636AE8] text-white">
                    <TableHead className="text-left p-4 rounded-l">
                      Name
                    </TableHead>
                    <TableHead className="text-left p-4">
                      Budget Status
                    </TableHead>
                    <TableHead className="text-left p-4">Debt Status</TableHead>
                    <TableHead className="text-left p-4">
                      Income Status
                    </TableHead>
                    <TableHead className="text-left p-4">
                      Expense Status
                    </TableHead>
                    <TableHead className="text-left p-4 rounded-r">
                      Last Activity
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.users?.map((user: any) => (
                    <TableRow
                      key={user._id}
                      className="border-b hover:bg-gray-50"
                      onClick={() => navigate.push(`/finance/${user._id}`)}
                    >
                      <TableCell className="p-4">
                        <div className="flex items-center gap-3">
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
                      <TableCell className="p-4">
                        <Badge
                          variant={
                            user.financialStatus.budgetStatus === "on track"
                              ? "default"
                              : user.financialStatus.budgetStatus ===
                                "medium risk"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            user.financialStatus.budgetStatus === "on track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : user.financialStatus.budgetStatus ===
                                "medium risk"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.financialStatus.budgetStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge
                          variant={
                            user.financialStatus.debtStatus === "on track"
                              ? "default"
                              : user.financialStatus.debtStatus ===
                                "medium risk"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            user.financialStatus.debtStatus === "on track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : user.financialStatus.debtStatus ===
                                "medium risk"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.financialStatus.debtStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge
                          variant={
                            user.financialStatus.incomeStatus === "on track"
                              ? "default"
                              : user.financialStatus.incomeStatus ===
                                "medium risk"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            user.financialStatus.incomeStatus === "on track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : user.financialStatus.incomeStatus ===
                                "medium risk"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.financialStatus.incomeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge
                          variant={
                            user.financialStatus.incomeStatus === "on track"
                              ? "default"
                              : user.financialStatus.incomeStatus ===
                                "medium risk"
                              ? "secondary"
                              : "destructive"
                          }
                          className={
                            user.financialStatus.incomeStatus === "on track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : user.financialStatus.incomeStatus ===
                                "medium risk"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.financialStatus.incomeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 text-gray-600">
                        {user.lastActivity
                          ? formatDate(user.lastActivity)
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {!isLoading && (
        <Pagination
          setPage={(page) => dispatch(setPage(page))}
          totalPages={Number(data?.data?.meta?.totalPage)}
          page={page}
        />
      )}
    </div>
  );
};

export default FinancePage;

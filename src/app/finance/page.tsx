"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

const users = Array.from({ length: 11 }, (_, i) => ({
  id: `${i + 1}`,
  name: "Robo Gladiators",
  avatar: "/placeholder.svg?height=32&width=32",
  budgetStatus: i === 1 ? "Expired" : "On Track",
  debtStatus: i === 1 ? "Expired" : "On Track",
  riskLevel: i === 2 ? "Medium" : "On Track",
  lastActivity:
    i === 5 ? "10 day ago" : i === 1 ? "5 day ago" : i === 6 ? "3 day ago" : i === 9 ? "6 day ago" : "2 day ago",
}))

export default function FinanceDataMonitoring() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Overview</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search" className="pl-10" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left p-4 rounded-l">Name</th>
                    <th className="text-left p-4">Budget Status</th>
                    <th className="text-left p-4">Debt Status</th>
                    <th className="text-left p-4">Risk Level</th>
                    <th className="text-left p-4 rounded-r">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>RG</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={user.budgetStatus === "On Track" ? "default" : "destructive"}
                          className={
                            user.budgetStatus === "On Track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.budgetStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={user.debtStatus === "On Track" ? "default" : "destructive"}
                          className={
                            user.debtStatus === "On Track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.debtStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            user.riskLevel === "On Track"
                              ? "default"
                              : user.riskLevel === "Medium"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            user.riskLevel === "On Track"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : user.riskLevel === "Medium"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {user.riskLevel}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600">{user.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <span className="px-2">...</span>
          <Button variant="outline" size="sm">
            30
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

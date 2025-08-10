"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Calendar,
  AlertTriangle,
} from "lucide-react";

const spendingCategories = [
  { category: "Food", level: "High", color: "bg-red-100" },
  { category: "Transport", level: "Low", color: "bg-gray-100" },
  { category: "Shopping", level: "Moderate", color: "bg-yellow-100" },
  { category: "Utility Bills", level: "Low", color: "bg-gray-100" },
  { category: "Others", level: "Moderate", color: "bg-yellow-100" },
];

const alerts = [
  "Your food expenses are 35% above average.",
  "You've overspent ₹1,200 on subscriptions.",
  "Monthly spending has been consistently increasing for 3 months.",
];

const tips = [
  "Reducing shopping expenses by 25% could save ₹2,500/month.",
  "Controlling restaurant spending could save ₹15,000/year.",
];

export default function SpendingOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
        <h1 className="text-2xl font-bold">Spending Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#F0F2F5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium bg-[#F0F2F5]">
                Total Monthly Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹24,500</div>
            </CardContent>
          </Card>

          <Card className="bg-[#F0F2F5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Top Overspending Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                Food, Shopping, Subscriptions
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F0F2F5]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Spending Growth from Last Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-3xl font-bold">12%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Heatmap */}
        <h3 className="text-2xl font-bold">Spending Heatmap</h3>
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 mb-4">
                <div>Category</div>
                <div className="text-right">Spending Level</div>
              </div>
              {spendingCategories.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 items-center py-3 border-b last:border-b-0"
                >
                  <div className="font-medium">{item.category}</div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={`${item.color} ${
                        item.level === "High"
                          ? "text-red-800"
                          : item.level === "Moderate"
                          ? "text-yellow-800"
                          : "text-gray-800"
                      }`}
                    >
                      {item.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <h3 className="text-2xl font-bold">AI Insights</h3>

        <div className="space-y-6">
          {/* Alerts */}
          <div>
            <h3 className="font-bold text-lg mb-3">Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{alert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tips */}
          <div>
            <h3 className="font-bold text-lg mb-3">AI Tips</h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Installment & Loan Info */}

        <h3 className="font-bold text-lg mb-3">Installment & Loan Info</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">Missed 2 installments</span>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Next installment due date: 17 July
            </span>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Status: 🟡 Medium Risk
            </span>
          </div>
        </div>

        {/* Peer Comparison */}

        <h3 className="font-bold text-lg mb-3">Peer Comparison</h3>
        <div>
          <p className="text-sm text-gray-700">
            You spend 22% more on shopping compared to others in your age/income
            group.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

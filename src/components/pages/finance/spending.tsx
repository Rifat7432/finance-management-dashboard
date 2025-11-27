/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, Lightbulb, AlertTriangle, Calendar } from "lucide-react";
import Spinner from "../../shared/Spinner";
import { useGetUserExpensesDetailsQuery } from "@/redux/features/finance/financeApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function SpendingOverview({ userId }: { userId: string }) {
  const { token } = useAppSelector((state) => state.auth);
  const [aiInsights, setAiInSights] = useState<any>(null);
  const { data, isLoading } = useGetUserExpensesDetailsQuery(userId);
  useEffect(() => {
    const fetchAiInsights = async () => {
      fetch(
        `${process.env.NEXT_PUBLIC_AI_BACKEND_URL}/admin/user-dashboard/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => { 
          return res.json()})
        .then((aiData) => setAiInSights(aiData));
    };
    fetchAiInsights();
  }, []);

  if (isLoading || aiInsights === null) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }
  return (
    <>
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
              <div className="text-3xl font-bold">
                {data?.data?.totalMonthlySpending}
              </div>
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
                {data?.data?.topOverspendingCategories.length > 0
                  ? data?.data?.topOverspendingCategories.join(", ")
                  : "N/A"}
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
                <span className="text-3xl font-bold">
                  {data?.data?.topOverspendingCategories
                    ? data?.data?.spendingGrowth
                    : "0%"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Heatmap */}
        {data?.data?.spendingHeatmap.length > 0 && (
          <h3 className="text-2xl font-bold">Spending Heatmap</h3>
        )}
        {data?.data?.spendingHeatmap.length > 0 && (
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 mb-4">
                  <div>Category</div>
                  <div className="text-right">Spending Level</div>
                </div>
                {data?.data?.spendingHeatmap?.map(
                  (item: any, index: number) => (
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
                          {item.spendingLevel}
                        </Badge>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        <h3 className="text-2xl font-bold">AI Insights</h3>

        <div className="space-y-6">
          {/* Alerts */}
          <div>
            <h3 className="font-bold text-lg mb-3">Alerts</h3>
            <div className="space-y-3">
              {aiInsights?.currentAlerts?.map(
                ({
                  alertMessage,
                }: {
                  alertMessage: string;
                },i:number) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {alertMessage}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* AI Tips */}
          <div>
            <h3 className="font-bold text-lg mb-3">AI Tips</h3>
            <div className="space-y-3">
              {aiInsights?.aiTips?.map(
                ({ suggestion }: { suggestion: string }, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </div>
                )
              )}
            </div>
          </div>


            {/* Installment & Loan Info */}

        <h3 className="font-bold text-lg mb-3">Installment & Loan Info</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{aiInsights?.debtStatuses?.missedInstallments}</span>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
             {aiInsights?.debtStatuses?.nextDueDate}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              {aiInsights?.debtStatuses?.status}
            </span>
          </div>
        </div>

        {/* Peer Comparison */}

        <h3 className="font-bold text-lg mb-3">Peer Comparison</h3>
        <div>
          <p className="text-sm text-gray-700">
            {aiInsights?.peerComparison?.comparison}
          </p>
        </div>
        </div>
      </div>
    </>
  );
}

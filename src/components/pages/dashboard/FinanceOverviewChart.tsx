"use client";

import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";



// Chart config

export function FinanceOverviewChart({
  financeChartData,financeOverview
}: {
  financeChartData: {
    month: string;
    revenue: number;
  }[];financeOverview:{
    adRevenue:number;
    subscription:number;
    total:number;
  }
}) {
  const financeChartConfig = {
    value: {
      label: "Revenue",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="justify-between h-[680px]">
      <CardHeader>
        <CardTitle>Finance Overview</CardTitle>
        <div className="text-3xl font-bold mb-2">£{financeOverview.total}</div>

        <div className="space-y-4 my-4">
          {/* Reduced spacing to mb-4 */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subscription</span>
            <span>£{financeOverview.subscription}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ad Revenue</span>
            <span>£{financeOverview.adRevenue}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Removed space-y-4 and replaced with padding */}

        <ChartContainer config={financeChartConfig} style={{ padding: 0 }}>
          <AreaChart
            data={financeChartData}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            width={300}
            height={120}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              type="natural"
              dataKey="value"
              fill="var(--color-primary)"
              fillOpacity={0.3}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

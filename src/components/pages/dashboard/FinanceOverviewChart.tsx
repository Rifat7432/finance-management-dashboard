"use client";

import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// Example chart data
const financeChartData = [
  { month: "January", revenue: 1200 },
  { month: "February", revenue: 1800 },
  { month: "March", revenue: 1350 },
  { month: "April", revenue: 1600 },
  { month: "May", revenue: 2000 },
  { month: "June", revenue: 2450 },
];

// Chart config
const financeChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function FinanceOverviewChart() {
  return (
    <Card className="justify-between h-[680px]">
      <CardHeader>
        <CardTitle>Finance Overview</CardTitle>
        <div className="text-3xl font-bold mb-2">£2450</div>

        <div className="space-y-4 my-4">
          {/* Reduced spacing to mb-4 */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subscription</span>
            <span>£2000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ad Revenue</span>
            <span>£450</span>
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
              dataKey="revenue"
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

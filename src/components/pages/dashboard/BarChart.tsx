/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 1. Raw data (in thousands for realism)
const rawChartData = [
  { month: "January", value: 11000 },
  { month: "February", value: 13000 },
  { month: "March", value: 10300 },
  { month: "April", value: 9500 },
  { month: "May", value: 102000 },
  { month: "June", value: 11000 },
  { month: "July", value: 14000 },
  { month: "August", value: 11500 },
  { month: "September", value: 10200 },
  { month: "October", value: 10100 },
  { month: "November", value: 10100 },
  { month: "December", value: 10100 },
];

// 2. Chart config
const yStep = 2500; // Y-axis step value
const maxY = 15000; // Max Y value for domain
const segments = maxY / yStep;

// 3. Colors from darkest (bottom) to lightest (top)
const barColors = [
  "#4A50AE",
  "#4F55BA",
  "#595FD1",
  "#636AE8",
  "#636AE8",
  "#847DFA",
];

// 4. Generate explicit Y ticks array to match yStep intervals
const yTicks = Array.from({ length: segments + 1 }, (_, i) => i * yStep);

// 5. Transform raw data to split into segments for stacked bars and keep original value
const chartData = rawChartData.map((entry) => {
  const segmented: { [key: string]: number | string } = {
    month: entry.month,
    value: entry.value,
  };
  let remaining = entry.value;

  for (let i = 0; i < segments; i++) {
    const levelKey = `level${i + 1}`;
    if (remaining >= yStep) {
      segmented[levelKey] = yStep;
      remaining -= yStep;
    } else {
      segmented[levelKey] = remaining;
      remaining = 0;
    }
  }

  return segmented;
});

// 6. Custom tooltip showing total value
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const totalValue = payload[0].payload.value;
    return (
      <div className="custom-tooltip p-2 bg-white border rounded shadow">
        <p className="label font-semibold">{label}</p>
        <p className="intro">Value: {totalValue.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export function StatisticBarChart() {
  return (
    <Card className="lg:col-span-2 h-[680px]">
      <CardHeader>
        <div className="flex items-center justify-between w-full gap-4">
          <CardTitle>Usage and Engagement Trends</CardTitle>
          <div>
            <p className="text-lg font-semibold whitespace-nowrap">Month Revenue</p>
            <p className="text-green-600">+9%</p>
          </div>
          <div>
            {" "}
            <p className="text-md font-semibold whitespace-nowrap">Total Subscriber</p>
            <p className="text-primary font-semibold">5000</p>
          </div>
    <Select defaultValue="month">
      <SelectTrigger className="w-[120px] text-sm">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="month">Month</SelectItem>
        <SelectItem value="quarter">Quarter</SelectItem>
        <SelectItem value="year">Year</SelectItem>
      </SelectContent>
    </Select>
        </div>
      </CardHeader>

      <CardContent className="h-[580px]">
        <ChartContainer config={{}} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                horizontalPoints={yTicks}
              />

              <YAxis
                domain={[0, maxY]}
                ticks={yTicks}
                tickFormatter={(value) => `${value / 1000}k`}
                interval={0}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <Tooltip content={<CustomTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />

              {Array.from({ length: segments }).map((_, i) => {
                const levelKey = `level${i + 1}`;
                const isTopSegment = i === segments - 1;
                const allTopFull = chartData.every(
                  (entry) => entry[levelKey] === yStep
                );

                return (
                  <Bar
                    key={levelKey}
                    dataKey={levelKey}
                    stackId="a"
                    fill={barColors[i] || barColors[barColors.length - 1]}
                    radius={
                      isTopSegment && allTopFull ? [4, 4, 0, 0] : [0, 0, 0, 0]
                    }
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

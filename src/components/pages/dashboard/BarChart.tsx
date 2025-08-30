/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Types
interface ChartDataEntry {
  month: string;
  value: number;
  [key: string]: number | string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataEntry;
  }>;
  label?: string;
}

// Raw data (in thousands for realism)
const rawChartData: Array<{ month: string; value: number }> = [
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

// Chart config
const yStep = 2500;
const maxY = 15000;
const segments = maxY / yStep;

// Colors from darkest (bottom) to lightest (top)
const barColors = [
  "#4A50AE",
  "#4F55BA",
  "#595FD1",
  "#636AE8",
  "#636AE8",
  "#847DFA",
];

// Generate explicit Y ticks array
const yTicks = Array.from({ length: segments + 1 }, (_, i) => i * yStep);

// Transform raw data to split into segments for stacked bars
const chartData = rawChartData.map((entry) => {
  const segmented:any = {
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

// Custom tooltip showing total value
function CustomTooltip({ active, payload, label }:any) {
  if (active && payload && payload.length) {
    const totalValue = payload[0].payload.value;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">Value: {totalValue.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export default function StatisticBarChart() {
  return (
    <div className="w-full max-w-full">
      <Card className="w-full min-h-[400px] lg:min-h-[680px]">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">
            <CardTitle className="text-xl lg:text-2xl">Usage and Engagement Trends</CardTitle>
            
            {/* Stats section - responsive layout */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm lg:text-lg font-semibold whitespace-nowrap">Month Revenue</p>
                <p className="text-green-600 font-semibold">+9%</p>
              </div>
              
              <div className="text-center sm:text-left">
                <p className="text-sm lg:text-md font-semibold whitespace-nowrap">Total Subscriber</p>
                <p className="text-blue-600 font-semibold">5,000</p>
              </div>
              
              <div className="flex justify-center sm:justify-start">
                <Select defaultValue="month" />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-[350px] sm:h-[450px] lg:h-[580px] p-3 sm:p-6">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                margin={{ 
                  top: 20, 
                  right: 10, 
                  left: 10, 
                  bottom: 20 
                }}
                maxBarSize={60}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  horizontalPoints={yTicks}
                  stroke="#e5e7eb"
                />

                <YAxis
                  domain={[0, maxY]}
                  ticks={yTicks}
                  tickFormatter={(value) => `${value / 1000}k`}
                  interval={0}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  width={40}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => value.slice(0, 3)}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  height={40}
                  interval={0}
                  angle={window?.innerWidth < 640 ? -45 : 0}
                  textAnchor={window?.innerWidth < 640 ? "end" : "middle"}
                />

                <Tooltip content={<CustomTooltip />} />

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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
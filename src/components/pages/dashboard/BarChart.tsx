/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { YearPicker } from "@/components/shared/YearPicker";

// Colors from darkest (bottom) to lightest (top)
const barColors = [
  "#4A50AE",
  "#4F55BA",
  "#595FD1",
  "#636AE8",
  "#636AE8",
  "#847DFA",
];

// Custom tooltip showing total value
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const totalValue = payload[0].payload.value;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          Value: {totalValue.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

export default function StatisticBarChart({
  rawChartData,
  monthRevenue,
  totalSubscribers,
  year,
  setYear,
}: {
  rawChartData: Array<{ month: string; value: number }>;
  monthRevenue: { amount: number; percentageChange: number };
  totalSubscribers: number;
  year: number | undefined;
  setYear: any;
}) {
  // Chart config
  const maxY = Math.max(...rawChartData.map((d) => d.value)) || 15000;

  const yStep =
    maxY <= 6000
      ? 1000
      : maxY <= 10000
      ? 2000
      : maxY <= 15000
      ? 3000
      : maxY <= 30000
      ? 5000
      : maxY <= 100000
      ? 10000
      : maxY <= 500000
      ? 50000
      : maxY <= 1000000
      ? 100000
      : 200000;
  const segments = maxY / yStep;

  // Generate explicit Y ticks array
  const yTicks = Array.from({ length: segments + 1 }, (_, i) => i * yStep);

  // Transform raw data to split into segments for stacked bars
  const chartData = rawChartData.map((entry) => {
    const segmented: any = {
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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // run once on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-full">
      <Card className="w-full min-h-[400px] lg:max-h-[680px]">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">
            <CardTitle className="text-xl lg:text-2xl">
              Usage and Engagement Trends
            </CardTitle>

            {/* Stats section - responsive layout */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm lg:text-lg font-semibold whitespace-nowrap">
                  Month Revenue
                </p>
                <p
                  className={`${
                    monthRevenue.percentageChange > 0
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {monthRevenue.percentageChange}%
                </p>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm lg:text-md font-semibold whitespace-nowrap">
                  Total Subscriber
                </p>
                <p className="text-blue-600 font-semibold">
                  {totalSubscribers}
                </p>
              </div>

              <div className="flex justify-center sm:justify-start">
                <YearPicker  year={year}  setYear={setYear}/>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-[350px] sm:h-[450px] lg:h-[580px] p-3 sm:p-6">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
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
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
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

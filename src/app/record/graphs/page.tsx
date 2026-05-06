"use client";

import { LineChart, Line, XAxis, YAxis } from "recharts";

export default function TestChart() {
  const data = [
    { day: "月", weight: 60 },
    { day: "火", weight: 62.5 },
    { day: "水", weight: 65 },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="font-bold text-xl">記録をグラフで表示</h1>
        <div className="w-[450px] h-[400px] mt-[20px]">
          <p className="flex flex-col items-center">種目:</p>
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Line type="monotone" dataKey="weight" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

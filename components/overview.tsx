"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Resistors",
    total: 1245,
  },
  {
    name: "Capacitors",
    total: 856,
  },
  {
    name: "Transistors",
    total: 324,
  },
  {
    name: "MOSFETs",
    total: 428,
  },
  {
    name: "ICs",
    total: 512,
  },
  {
    name: "Diodes",
    total: 278,
  },
  {
    name: "Connectors",
    total: 189,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

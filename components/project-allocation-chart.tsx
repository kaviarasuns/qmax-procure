"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Project Alpha",
    resistors: 125,
    capacitors: 75,
    transistors: 25,
    mosfets: 20,
  },
  {
    name: "Project Beta",
    resistors: 85,
    capacitors: 45,
    transistors: 15,
    mosfets: 42,
  },
  {
    name: "Project Gamma",
    resistors: 110,
    capacitors: 100,
    transistors: 30,
    mosfets: 15,
  },
  {
    name: "Project Delta",
    resistors: 65,
    capacitors: 40,
    transistors: 30,
    mosfets: 21,
  },
  {
    name: "Project Epsilon",
    resistors: 95,
    capacitors: 85,
    transistors: 45,
    mosfets: 53,
  },
];

export function ProjectAllocationChart() {
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
        <Tooltip />
        <Legend />
        <Bar
          dataKey="resistors"
          name="Resistors"
          stackId="a"
          fill="#4f46e5"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="capacitors"
          name="Capacitors"
          stackId="a"
          fill="#06b6d4"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="transistors"
          name="Transistors"
          stackId="a"
          fill="#10b981"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="mosfets"
          name="MOSFETs"
          stackId="a"
          fill="#f59e0b"
          radius={[0, 0, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

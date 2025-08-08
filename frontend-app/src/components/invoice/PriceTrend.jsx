// components/PriceTrend.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "12am", l1: 9000, l2: 3200, l3: 800 },
  { time: "2am", l1: 10000, l2: 4000, l3: 1000 },
  { time: "4am", l1: 9500, l2: 4100, l3: 1100 },
  { time: "6am", l1: 9700, l2: 4000, l3: 1080 },
  { time: "8am", l1: 9800, l2: 4050, l3: 1120 },
  { time: "10am", l1: 9900, l2: 4080, l3: 1150 },
  { time: "12pm", l1: 10100, l2: 4100, l3: 1175 },
  { time: "2pm", l1: 10300, l2: 4125, l3: 1180 },
  { time: "4pm", l1: 10200, l2: 4130, l3: 1160 },
  { time: "6pm", l1: 10400, l2: 4110, l3: 1140 },
  { time: "8pm", l1: 10100, l2: 4090, l3: 1130 },
  { time: "10pm", l1: 9800, l2: 4050, l3: 1100 },
];

export const PriceTrend = () => {
  return (
    <div className="bg-white rounded-md border p-4 text-sm">
      {/* Header with Legends */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-800">
          Price Trend for 'Cabling Kit'
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            Legend 1
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            Legend 2
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            Legend 3
          </div>
        </div>
      </div>

      {/* ✅ Scrollable Chart Wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" stroke="#888" fontSize={12} />
              <YAxis
                tickFormatter={(v) => `$${v.toLocaleString()}`}
                stroke="#888"
                fontSize={12}
                width={60}
                tick={{ textAnchor: "end", dx: 10 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="l1"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="l2"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="l3"
                stroke="#facc15"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights section */}
      <div className="mt-6">
        <h4 className="font-semibold text-sm text-gray-800 mb-2">
          Insights from the Chart
        </h4>
        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
          <li>Price dipped slightly in Feb due to excess inventory.</li>
          <li>Steady increase from March to May shows rising demand.</li>
          <li>Slight drop in June, possibly due to supplier discounts.</li>
          <li>
            July hits a new high, suggesting increased cost of raw materials or
            supply constraints.
          </li>
        </ul>
      </div>
    </div>
  );
};

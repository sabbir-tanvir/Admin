import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  Revenue: '#0bbf4f',
  Customers: '#ffbd2d',
  Visitors: '#ff3b3b',
};
const SHADOWS = {
  Revenue: 'rgba(11,191,79,0.18)',
  Customers: 'rgba(255,189,45,0.18)',
  Visitors: 'rgba(255,59,59,0.18)',
};

const WebsiteMetricsChart = ({ labels, revenue, customers, visitors }) => {
  const data = labels.map((label, i) => ({
    name: label,
    Revenue: revenue[i],
    Customers: customers[i],
    Visitors: visitors[i],
  }));

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            width={30}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke={COLORS.Revenue}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            style={{ filter: `drop-shadow(0px 2px 4px ${SHADOWS.Revenue})` }}
          />
          <Line
            type="monotone"
            dataKey="Customers"
            stroke={COLORS.Customers}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            style={{ filter: `drop-shadow(0px 2px 4px ${SHADOWS.Customers})` }}
          />
          <Line
            type="monotone"
            dataKey="Visitors"
            stroke={COLORS.Visitors}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            style={{ filter: `drop-shadow(0px 2px 4px ${SHADOWS.Visitors})` }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WebsiteMetricsChart;
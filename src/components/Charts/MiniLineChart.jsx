import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const THEME_COLORS = {
  up: { line: '#0bbf4f', shadow: 'rgba(11,191,79,0.18)' },
  down: { line: '#ff3b3b', shadow: 'rgba(255,59,59,0.18)' },
  neutral: { line: '#ffbd2d', shadow: 'rgba(255,189,45,0.18)' },
};

const MiniLineChart = ({ data, color, theme = 'neutral' }) => {
  const chartData = data.map((value, index) => ({ name: index, value }));
  const themeColor = THEME_COLORS[theme] || THEME_COLORS.neutral;

  return (
    <div className="mini-line-chart" style={{ width: '100%', height: 38 }}>
      <ResponsiveContainer width="100%" height={38}>
        <LineChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={themeColor.line}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            style={{ filter: `drop-shadow(0px 2px 4px ${themeColor.shadow})` }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniLineChart;
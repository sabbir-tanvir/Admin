import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../../styles/components/OrderSummaryTable.css';

function getOrderStatusStats(orders) {
  const total = orders.length;
  const completed = orders.filter(o => o.status.toLowerCase() === 'completed').length;
  const inProgress = orders.filter(o => o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'in progress').length;
  const canceled = orders.filter(o => o.status.toLowerCase() === 'cancelled' || o.status.toLowerCase() === 'canceled').length;
  return {
    completed: total ? Math.round((completed / total) * 100) : 0,
    inProgress: total ? Math.round((inProgress / total) * 100) : 0,
    canceled: total ? Math.round((canceled / total) * 100) : 0,
  };
}

function getMonthlyOrderCounts(orders) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const counts = Array(months.length).fill(0);
  orders.forEach(order => {
    const monthIdx = new Date(order.date).getMonth();
    if (monthIdx >= 0 && monthIdx < months.length) {
      counts[monthIdx]++;
    }
  });
  return months.map((name, i) => ({ name, value: counts[i] }));
}

function CircularProgress({ percent, color, label }) {
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="order-summary-circle">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e5e5"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
      </svg>
      <div className="order-summary-circle-label">
        <div className="order-summary-circle-title">{label}</div>
        <div className="order-summary-circle-percent">{percent}%</div>
      </div>
    </div>
  );
}

const OrderSummaryStats = ({ orders }) => {
  const { completed, inProgress, canceled } = getOrderStatusStats(orders);
  const chartData = getMonthlyOrderCounts(orders);

  return (
    <div className="order-summary-stats">
      <div className="order-summary-stats-circles space-between">
        <CircularProgress percent={completed} color="#4CAF50" label="Completed" />
        <CircularProgress percent={inProgress} color="#FFBD2D" label="In Progress" />
        <CircularProgress percent={canceled} color="#FF3B3B" label="Canceled" />
      </div>
      <div className="order-summary-stats-chart">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
            <XAxis dataKey="name" tick={{ fontSize: 15, fill: '#232323', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis domain={[50, 350]} tick={{ fontSize: 13, fill: '#bbb' }} axisLine={false} tickLine={false} width={32} />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#areaColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderSummaryStats; 
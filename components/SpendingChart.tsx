
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartData } from '../types';

interface SpendingChartProps {
  data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-serif text-brand-secondary">{`Date: ${label}`}</p>
        <p className="font-bold text-brand-accent">{`Spent: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f', '#ffbb28'];

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  return (
    <div className="bg-brand-surface p-6 rounded-xl shadow-lg mt-8">
       <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Daily Spending</h2>
      {data.length > 0 ? (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontFamily: 'Lora', fill: '#718096' }} />
                <YAxis tick={{ fontFamily: 'Lora', fill: '#718096' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      ) : (
         <div className="h-[300px] flex items-center justify-center text-brand-secondary">
          <p>No spending data for this month yet. Add an expense to see the chart.</p>
        </div>
      )}
    </div>
  );
};

export default SpendingChart;

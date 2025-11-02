
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Expense } from '../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const CategoryPieChart: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
    const chartData = useMemo(() => {
        if (!expenses.length) return [];
        
        const categoryTotals: { [key: string]: number } = {};
        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
        });

        const sortedCategories = Object.entries(categoryTotals)
            .sort(([, a], [, b]) => b - a)
            .map(([name, value]) => ({ name, value }));
        
        if (sortedCategories.length > 3) {
            const top3 = sortedCategories.slice(0, 3);
            const otherTotal = sortedCategories.slice(3).reduce((acc, curr) => acc + curr.value, 0);
            return [...top3, { name: 'Other', value: otherTotal }];
        }
        
        return sortedCategories;
    }, [expenses]);
    
  return (
    <div className="bg-brand-surface p-6 rounded-xl shadow-lg mt-8">
       <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Top Spending Categories</h2>
       {chartData.length > 0 ? (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            // FIX: The `percent` prop can be undefined. Coalesce to 0 to prevent type error on arithmetic operation.
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
       ) : (
        <div className="h-[300px] flex items-center justify-center text-brand-secondary">
            <p>No spending data to display.</p>
        </div>
       )}
    </div>
  );
};

export default CategoryPieChart;
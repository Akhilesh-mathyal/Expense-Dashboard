
import React, { useState } from 'react';
import { Category, Expense } from '../types';

interface InputFormProps {
  onSetSalary: (salary: number) => void;
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  currentSalary: number;
}

const InputForm: React.FC<InputFormProps> = ({ onSetSalary, onAddExpense, currentSalary }) => {
  const [salaryInput, setSalaryInput] = useState(currentSalary > 0 ? currentSalary.toString() : '');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(Category.FOOD);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSetSalary = (e: React.FormEvent) => {
    e.preventDefault();
    const salaryValue = parseFloat(salaryInput);
    if (!isNaN(salaryValue) && salaryValue >= 0) {
      onSetSalary(salaryValue);
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (description && !isNaN(amountValue) && amountValue > 0 && date) {
      onAddExpense({
        description,
        amount: amountValue,
        category,
        date,
      });
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div className="space-y-8">
        {/* Salary Form */}
        <div className="bg-brand-surface p-6 rounded-xl shadow-lg">
            <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Manage Income</h2>
            <form onSubmit={handleSetSalary} className="space-y-4">
            <div>
                <label htmlFor="salary" className="block text-sm font-medium text-brand-secondary">
                Your Monthly Salary
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    type="number"
                    id="salary"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-brand-accent focus:ring-brand-accent sm:text-sm"
                    placeholder="0.00"
                    step="100"
                />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-brand-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
                Set Income
            </button>
            </form>
        </div>

        {/* Expense Form */}
        <div className="bg-brand-surface p-6 rounded-xl shadow-lg">
            <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Add New Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-brand-secondary">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm"
                    placeholder="e.g., Coffee with friends"
                    required
                />
            </div>
             <div>
                <label htmlFor="amount" className="block text-sm font-medium text-brand-secondary">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm"
                    placeholder="0.00"
                    required
                    step="0.01"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-brand-secondary">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm"
                    >
                        {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-brand-secondary">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm"
                        required
                    />
                </div>
            </div>
             <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
            >
                Add Expense
            </button>
            </form>
        </div>
    </div>
  );
};

export default InputForm;

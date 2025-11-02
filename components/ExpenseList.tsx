
import React from 'react';
import { Expense } from '../types';
import { CATEGORY_DETAILS } from '../constants';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
  onEditExpense: (expense: Expense) => void;
}

const ExpenseItem: React.FC<{ expense: Expense; onDelete: (id: number) => void; onEdit: (expense: Expense) => void }> = ({ expense, onDelete, onEdit }) => {
  const { color, icon } = CATEGORY_DETAILS[expense.category];
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(expense.amount);

  return (
    <li className="flex items-center p-4 border-b border-gray-100 last:border-b-0 transition-colors duration-200 hover:bg-gray-50">
       <div className={`w-1.5 h-12 rounded-full ${color} mr-4`}></div>
       <div className={`p-2 rounded-full mr-4 text-white ${color}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-brand-text">{expense.description}</p>
        <p className="text-sm text-brand-secondary">{expense.category} &bull; {new Date(expense.date).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg text-brand-primary">{formattedAmount}</p>
        <div className="flex items-center justify-end space-x-2 mt-1">
          <button onClick={() => onEdit(expense)} title="Edit" className="text-brand-secondary hover:text-brand-accent transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
          </button>
          <button onClick={() => onDelete(expense.id)} title="Delete" className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </li>
  );
};


const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
  return (
    <div className="bg-brand-surface p-2 sm:p-4 rounded-xl shadow-lg mt-8">
      <h2 className="font-serif text-2xl font-bold text-brand-primary p-4">Recent Expenses</h2>
      {sortedExpenses.length > 0 ? (
        <ul className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
          {sortedExpenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} onEdit={onEditExpense} />
          ))}
        </ul>
      ) : (
        <div className="h-[200px] flex items-center justify-center text-brand-secondary">
          <p>You have no expenses recorded this month.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
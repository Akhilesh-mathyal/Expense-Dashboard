
import React, { useState, useEffect } from 'react';
import { Category, Expense } from '../types';

interface EditExpenseModalProps {
  expense: Expense;
  onUpdate: (expense: Expense) => void;
  onClose: () => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ expense, onUpdate, onClose }) => {
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState<Category>(expense.category);
  const [date, setDate] = useState(expense.date);

  useEffect(() => {
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    if (description && !isNaN(amountValue) && amountValue > 0 && date) {
      onUpdate({
        ...expense,
        description,
        amount: amountValue,
        category,
        date,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-brand-surface p-6 rounded-xl shadow-lg w-full max-w-md animate-fade-in-up">
        <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-brand-secondary">Description</label>
            <input type="text" id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="edit-amount" className="block text-sm font-medium text-brand-secondary">Amount</label>
            <input type="number" id="edit-amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm" required step="0.01" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-category" className="block text-sm font-medium text-brand-secondary">Category</label>
              <select id="edit-category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm">
                {Object.values(Category).map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="edit-date" className="block text-sm font-medium text-brand-secondary">Date</label>
              <input type="date" id="edit-date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-accent focus:ring-brand-accent sm:text-sm" required />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300">
              Cancel
            </button>
            <button type="submit" className="bg-brand-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;

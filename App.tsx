
import React, { useMemo, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Expense, ChartData } from './types';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import SpendingChart from './components/SpendingChart';
import ExpenseList from './components/ExpenseList';
import InputForm from './components/InputForm';
import Footer from './components/Footer';
import EditExpenseModal from './components/EditExpenseModal';
import CategoryPieChart from './components/CategoryPieChart';


function App() {
  const [salary, setSalary] = useLocalStorage<number>('salary', 0);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);


  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  }, [expenses]);

  const totalSpent = useMemo(() => {
    return currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [currentMonthExpenses]);

  const moneyLeft = useMemo(() => salary - totalSpent, [salary, totalSpent]);

  const chartData = useMemo<ChartData[]>(() => {
    const dailySpending: { [key: string]: number } = {};
    currentMonthExpenses.forEach(expense => {
        const day = new Date(expense.date).getDate();
        const dayKey = `${day}`.padStart(2, '0');
        if (!dailySpending[dayKey]) {
            dailySpending[dayKey] = 0;
        }
        dailySpending[dayKey] += expense.amount;
    });

    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const data: ChartData[] = [];
    for(let i=1; i<=daysInMonth; i++) {
        const dayKey = `${i}`.padStart(2, '0');
        if (dailySpending[dayKey] > 0) {
           data.push({ name: dayKey, amount: dailySpending[dayKey] });
        }
    }
    
    return data.sort((a,b) => parseInt(a.name) - parseInt(b.name));
  }, [currentMonthExpenses]);


  const handleSetSalary = (newSalary: number) => {
    setSalary(newSalary);
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prevExpenses => [...prevExpenses, { ...newExpense, id: Date.now() }]);
  };
  
  const handleDeleteExpense = (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    }
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null); // Close modal
  };


  return (
    <div className="min-h-screen text-brand-text">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="mb-8">
            <SummaryCards income={salary} spent={totalSpent} left={moneyLeft} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
                <SpendingChart data={chartData} />
                <ExpenseList 
                    expenses={currentMonthExpenses}
                    onDeleteExpense={handleDeleteExpense}
                    onEditExpense={setEditingExpense}
                />
                <CategoryPieChart expenses={currentMonthExpenses} />
            </div>
            <div className="mt-8 lg:mt-0">
                <InputForm 
                    onSetSalary={handleSetSalary} 
                    onAddExpense={handleAddExpense} 
                    currentSalary={salary}
                />
            </div>
        </div>
      </main>
      <Footer />
       {editingExpense && (
        <EditExpenseModal 
          expense={editingExpense} 
          onUpdate={handleUpdateExpense} 
          onClose={() => setEditingExpense(null)} 
        />
      )}
    </div>
  );
}

export default App;
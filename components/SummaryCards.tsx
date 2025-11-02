
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: number;
  color: string;
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  // FIX: Explicitly type icon props as <any> to allow adding className via cloneElement.
  icon: React.ReactElement<any>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, color, icon }) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

  return (
    <div className="bg-brand-surface p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 from-white to-gray-50 bg-gradient-to-br">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-serif text-brand-secondary">{title}</p>
          <p className="text-3xl font-bold text-brand-text">{formattedValue}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {React.cloneElement(icon, { className: 'h-6 w-6 text-white' })}
        </div>
      </div>
    </div>
  );
};

interface SummaryCardsProps {
  income: number;
  spent: number;
  left: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, spent, left }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard 
        title="My Income" 
        value={income} 
        color="bg-green-500" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.303 0-3.182s2.9-.826 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>} 
      />
      <SummaryCard 
        title="Money Spent This Month" 
        value={spent} 
        color="bg-red-500" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>}
      />
      <SummaryCard 
        title="Money Left" 
        value={left} 
        color="bg-blue-500"
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25-2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
      />
    </div>
  );
};

export default SummaryCards;
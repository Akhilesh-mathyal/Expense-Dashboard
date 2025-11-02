
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-primary">
        Monthly Expense Dashboard
      </h1>
      <p className="text-brand-secondary mt-2">Your personal finance at a glance.</p>
    </header>
  );
};

export default Header;

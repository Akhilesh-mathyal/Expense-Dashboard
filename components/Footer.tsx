
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-12 border-t border-gray-200">
      <p className="text-brand-secondary text-sm">
        © {new Date().getFullYear()} Classical Expense Dashboard. All rights reserved.
      </p>
      <p className="text-brand-secondary text-sm mt-1">
        For inquiries, contact us at <a href="mailto:contact@expensedashboard.com" className="text-brand-accent hover:underline">contact@expensedashboard.com</a>.
      </p>
    </footer>
  );
};

export default Footer;

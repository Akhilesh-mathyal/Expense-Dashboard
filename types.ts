
export enum Category {
  FOOD = 'Food & Dining',
  TRANSPORT = 'Transportation',
  BILLS = 'Utilities & Bills',
  HEALTH = 'Healthcare',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  OTHER = 'Other',
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
}

export interface ChartData {
  name: string;
  amount: number;
}

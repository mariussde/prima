export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  customerId: string;
  items: InvoiceItem[];
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  total: number;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  company?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface ShippingRate {
  id: string;
  carrier: string;
  service: string;
  rate: number;
  estimatedDays: number;
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}
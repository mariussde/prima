'use client';

import { Invoice, Customer, Product } from './models/types';

const STORAGE_KEYS = {
  INVOICES: 'prima_invoices',
  CUSTOMERS: 'prima_customers',
  PRODUCTS: 'prima_products',
};

// Default data that will always be present
const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
    company: 'Acme Corp'
  },
  {
    id: 'cust-002',
    name: 'TechStart Solutions',
    email: 'accounts@techstart.io',
    phone: '+1 (555) 987-6543',
    address: '456 Innovation Drive, San Francisco, CA 94105',
    company: 'TechStart'
  },
  {
    id: 'cust-003',
    name: 'Global Logistics Inc',
    email: 'finance@globallogistics.com',
    phone: '+1 (555) 246-8135',
    address: '789 Supply Chain Blvd, Chicago, IL 60601',
    company: 'Global Logistics'
  }
];

const DEFAULT_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    number: 'INV-2024-001',
    date: '2024-03-20',
    dueDate: '2024-04-19',
    customerId: 'cust-001',
    items: [
      {
        id: 'item-001',
        description: 'Web Development Services',
        quantity: 1,
        unitPrice: 2500,
        total: 2500
      }
    ],
    status: 'pending',
    total: 2500,
    notes: 'Net 30 payment terms'
  },
  {
    id: 'inv-002',
    number: 'INV-2024-002',
    date: '2024-03-15',
    dueDate: '2024-04-14',
    customerId: 'cust-002',
    items: [
      {
        id: 'item-002',
        description: 'Cloud Infrastructure Setup',
        quantity: 1,
        unitPrice: 3500,
        total: 3500
      },
      {
        id: 'item-003',
        description: 'Monthly Maintenance',
        quantity: 12,
        unitPrice: 500,
        total: 6000
      }
    ],
    status: 'paid',
    total: 9500,
    notes: 'Annual contract - paid in full'
  },
  {
    id: 'inv-003',
    number: 'INV-2024-003',
    date: '2024-02-28',
    dueDate: '2024-03-29',
    customerId: 'cust-003',
    items: [
      {
        id: 'item-004',
        description: 'Logistics Software License',
        quantity: 5,
        unitPrice: 1200,
        total: 6000
      }
    ],
    status: 'overdue',
    total: 6000,
    notes: 'Second reminder sent'
  }
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Web Development',
    description: 'Professional web development services',
    price: 2500
  },
  {
    id: 'prod-002',
    name: 'Cloud Infrastructure Setup',
    description: 'Complete cloud infrastructure setup and configuration',
    price: 3500
  },
  {
    id: 'prod-003',
    name: 'Monthly Maintenance',
    description: 'Regular system maintenance and updates',
    price: 500
  }
];

// Initialize storage with default data if not exists
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.INVOICES)) {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(DEFAULT_INVOICES));
  }

  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(DEFAULT_CUSTOMERS));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  }
};

// Initialize storage when module loads
if (typeof window !== 'undefined') {
  initializeStorage();
}

export function getInvoices(): Invoice[] {
  if (typeof window === 'undefined') return DEFAULT_INVOICES;
  const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
  const storedInvoices = data ? JSON.parse(data) : [];
  return [...DEFAULT_INVOICES, ...storedInvoices.filter((invoice: Invoice) => 
    !DEFAULT_INVOICES.some(defaultInvoice => defaultInvoice.id === invoice.id)
  )];
}

export function getCustomers(): Customer[] {
  if (typeof window === 'undefined') return DEFAULT_CUSTOMERS;
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  const storedCustomers = data ? JSON.parse(data) : [];
  return [...DEFAULT_CUSTOMERS, ...storedCustomers.filter((customer: Customer) => 
    !DEFAULT_CUSTOMERS.some(defaultCustomer => defaultCustomer.id === customer.id)
  )];
}

export function getCustomerById(id: string): Customer | undefined {
  const customers = getCustomers();
  return customers.find(customer => customer.id === id);
}

export function createCustomer(customer: Customer): void {
  if (typeof window === 'undefined') return;
  const customers = getCustomers().filter(c => 
    !DEFAULT_CUSTOMERS.some(defaultCustomer => defaultCustomer.id === c.id)
  );
  customers.push(customer);
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
}

export function updateCustomer(customer: Customer): void {
  if (typeof window === 'undefined') return;
  // Don't allow updating default customers
  if (DEFAULT_CUSTOMERS.some(c => c.id === customer.id)) return;
  
  const customers = getCustomers().filter(c => 
    !DEFAULT_CUSTOMERS.some(defaultCustomer => defaultCustomer.id === c.id)
  );
  const index = customers.findIndex((c) => c.id === customer.id);
  if (index !== -1) {
    customers[index] = customer;
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }
}

export function updateInvoice(invoice: Invoice): void {
  if (typeof window === 'undefined') return;
  // Don't allow updating default invoices
  if (DEFAULT_INVOICES.some(i => i.id === invoice.id)) return;
  
  const invoices = getInvoices().filter(i => 
    !DEFAULT_INVOICES.some(defaultInvoice => defaultInvoice.id === i.id)
  );
  const index = invoices.findIndex((i) => i.id === invoice.id);
  if (index !== -1) {
    invoices[index] = invoice;
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }
}

export function createInvoice(invoice: Invoice): void {
  if (typeof window === 'undefined') return;
  const invoices = getInvoices().filter(i => 
    !DEFAULT_INVOICES.some(defaultInvoice => defaultInvoice.id === i.id)
  );
  invoices.push(invoice);
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
}

export function deleteInvoice(id: string): void {
  if (typeof window === 'undefined') return;
  // Don't allow deleting default invoices
  if (DEFAULT_INVOICES.some(i => i.id === id)) return;
  
  const invoices = getInvoices().filter(i => 
    !DEFAULT_INVOICES.some(defaultInvoice => defaultInvoice.id === i.id)
  );
  const filteredInvoices = invoices.filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(filteredInvoices));
}

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  const storedProducts = data ? JSON.parse(data) : [];
  return [...DEFAULT_PRODUCTS, ...storedProducts.filter((product: Product) => 
    !DEFAULT_PRODUCTS.some(defaultProduct => defaultProduct.id === product.id)
  )];
}
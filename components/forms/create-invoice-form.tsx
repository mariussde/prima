'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createInvoice, getCustomers, getProducts, updateInvoice } from '@/lib/data';
import { Customer, Product, Invoice, InvoiceItem } from '@/lib/models/types';

interface CreateInvoiceFormProps {
  initialData?: Invoice;
  onSuccess: () => void;
}

export function CreateInvoiceForm({ initialData, onSuccess }: CreateInvoiceFormProps) {
  const [items, setItems] = useState<InvoiceItem[]>(initialData?.items || []);
  const customers = getCustomers();
  const products = getProducts();

  useEffect(() => {
    if (initialData) {
      setItems(initialData.items);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const invoice: Invoice = {
      id: initialData?.id || `inv-${Date.now()}`,
      number: initialData?.number || `INV-${Date.now()}`,
      date: formData.get('date') as string,
      dueDate: formData.get('dueDate') as string,
      customerId: formData.get('customerId') as string,
      items: items,
      status: (formData.get('status') as Invoice['status']) || 'pending',
      total: items.reduce((sum, item) => sum + item.total, 0),
      notes: formData.get('notes') as string,
    };

    if (initialData) {
      updateInvoice(invoice);
    } else {
      createInvoice(invoice);
    }
    onSuccess();
  };

  const setToday = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      const today = new Date().toISOString().split('T')[0];
      input.value = today;
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const updateItem = (index: number, updates: Partial<InvoiceItem>) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      ...updates,
      total: (updates.quantity || items[index].quantity) * 
             (updates.unitPrice || items[index].unitPrice),
    };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Invoice Date</Label>
          <div className="flex gap-2">
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={initialData?.date}
              required
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setToday('date')}
              className="whitespace-nowrap"
            >
              Today
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <div className="flex gap-2">
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue={initialData?.dueDate}
              required
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setToday('dueDate')}
              className="whitespace-nowrap"
            >
              Today
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerId">Customer</Label>
        <Select name="customerId" defaultValue={initialData?.customerId} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a customer" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer: Customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {initialData && (
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={initialData.status} required>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Items</h3>
          <Button type="button" onClick={addItem} variant="outline">
            Add Item
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 items-end border p-4 rounded-lg">
            <div className="col-span-4">
              <Label>Description</Label>
              <Input
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
                placeholder="Item description"
              />
            </div>
            <div className="col-span-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
                min="1"
              />
            </div>
            <div className="col-span-2">
              <Label>Unit Price</Label>
              <Input
                type="number"
                value={item.unitPrice}
                onChange={(e) => updateItem(index, { unitPrice: Number(e.target.value) })}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-span-2">
              <Label>Total</Label>
              <Input
                type="number"
                value={item.total}
                readOnly
                disabled
              />
            </div>
            <div className="col-span-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeItem(index)}
                className="w-full"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          name="notes"
          defaultValue={initialData?.notes}
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit">
          {initialData ? 'Update Invoice' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
}
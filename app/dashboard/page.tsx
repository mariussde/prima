'use client';

import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getInvoices, deleteInvoice, getCustomerById, updateInvoice } from '@/lib/data';
import { Invoice } from '@/lib/models/types';
import { CreateInvoiceForm } from '@/components/forms/create-invoice-form';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(getInvoices());
  const [filters, setFilters] = useState({
    number: '',
    date: '',
    dueDate: '',
    customer: '',
    status: '',
    total: ''
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const handleDelete = (id: string) => {
    deleteInvoice(id);
    setInvoices(getInvoices());
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    updateInvoice(updatedInvoice);
    setInvoices(getInvoices());
    setEditingInvoice(null);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const customer = getCustomerById(invoice.customerId);
    return (
      invoice.number.toLowerCase().includes(filters.number.toLowerCase()) &&
      invoice.date.includes(filters.date) &&
      invoice.dueDate.includes(filters.dueDate) &&
      (customer?.name || '').toLowerCase().includes(filters.customer.toLowerCase()) &&
      invoice.status.toLowerCase().includes(filters.status.toLowerCase()) &&
      (filters.total === '' || invoice.total.toString().includes(filters.total))
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Create a new invoice by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <CreateInvoiceForm onSuccess={() => {
              setIsCreateDialogOpen(false);
              setInvoices(getInvoices());
            }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="space-y-1">
                  <div>Invoice Number</div>
                  <Input
                    placeholder="Filter number..."
                    value={filters.number}
                    onChange={(e) => setFilters({...filters, number: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-1">
                  <div>Date</div>
                  <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-1">
                  <div>Due Date</div>
                  <Input
                    type="date"
                    value={filters.dueDate}
                    onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-1">
                  <div>Customer</div>
                  <Input
                    placeholder="Filter customer..."
                    value={filters.customer}
                    onChange={(e) => setFilters({...filters, customer: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-1">
                  <div>Status</div>
                  <Input
                    placeholder="Filter status..."
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-1">
                  <div>Total</div>
                  <Input
                    placeholder="Filter total..."
                    value={filters.total}
                    onChange={(e) => setFilters({...filters, total: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => {
              const customer = getCustomerById(invoice.customerId);
              return (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{customer?.name}</TableCell>
                  <TableCell>
                    <div className={`capitalize px-2 py-1 rounded-full text-xs font-semibold inline-block
                      ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : invoice.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    `}>
                      {invoice.status}
                    </div>
                  </TableCell>
                  <TableCell>${formatCurrency(invoice.total)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleEdit(invoice)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDelete(invoice.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {editingInvoice && (
        <Dialog open={!!editingInvoice} onOpenChange={() => setEditingInvoice(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Invoice</DialogTitle>
              <DialogDescription>
                Update the invoice details below.
              </DialogDescription>
            </DialogHeader>
            <CreateInvoiceForm 
              initialData={editingInvoice}
              onSuccess={() => {
                setEditingInvoice(null);
                setInvoices(getInvoices());
              }} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
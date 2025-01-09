'use client';

import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import { getCustomers } from '@/lib/data';
import { Customer } from '@/lib/models/types';
import { CreateCustomerForm } from '@/components/forms/create-customer-form';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(getCustomers());
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setCustomers(getCustomers());
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const filteredCustomers = customers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      customer.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      (customer.phone || '').toLowerCase().includes(filters.phone.toLowerCase()) &&
      (customer.company || '').toLowerCase().includes(filters.company.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Customer</DialogTitle>
              <DialogDescription>
                Create a new customer by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <CreateCustomerForm onSuccess={() => {
              setIsCreateDialogOpen(false);
              setCustomers(getCustomers());
            }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="space-y-2 py-2">
                  <div className="pt-1">Name</div>
                  <Input
                    placeholder="Filter name..."
                    value={filters.name}
                    onChange={(e) => setFilters({...filters, name: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-2 py-2">
                  <div className="pt-1">Email</div>
                  <Input
                    placeholder="Filter email..."
                    value={filters.email}
                    onChange={(e) => setFilters({...filters, email: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-2 py-2">
                  <div className="pt-1">Phone</div>
                  <Input
                    placeholder="Filter phone..."
                    value={filters.phone}
                    onChange={(e) => setFilters({...filters, phone: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="space-y-2 py-2">
                  <div className="pt-1">Company</div>
                  <Input
                    placeholder="Filter company..."
                    value={filters.company}
                    onChange={(e) => setFilters({...filters, company: e.target.value})}
                    className="h-8"
                  />
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.company}</TableCell>
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
                        onClick={() => handleEdit(customer)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingCustomer && (
        <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Update the customer details below.
              </DialogDescription>
            </DialogHeader>
            <CreateCustomerForm 
              initialData={editingCustomer}
              onSuccess={() => {
                setEditingCustomer(null);
                setCustomers(getCustomers());
              }} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
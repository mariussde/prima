'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCustomer, updateCustomer } from '@/lib/data';
import { Customer } from '@/lib/models/types';

interface CreateCustomerFormProps {
  initialData?: Customer;
  onSuccess: () => void;
}

export function CreateCustomerForm({ initialData, onSuccess }: CreateCustomerFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const customer: Customer = {
      id: initialData?.id || `cust-${Date.now()}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      company: formData.get('company') as string,
    };

    if (initialData) {
      updateCustomer(customer);
    } else {
      createCustomer(customer);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialData?.name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={initialData?.email}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initialData?.phone}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          defaultValue={initialData?.address}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          defaultValue={initialData?.company}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit">
          {initialData ? 'Update Customer' : 'Create Customer'}
        </Button>
      </div>
    </form>
  );
}
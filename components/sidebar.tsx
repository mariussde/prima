'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Users,
  Building,
  Package,
  Truck,
  DollarSign,
  Settings,
  Search,
} from 'lucide-react';

const categories = [
  {
    name: 'Invoices',
    icon: FileText,
    subcategories: ['Create', 'Review', 'Approve', 'Archive', 'Reports'],
  },
  {
    name: 'Customers',
    icon: Users,
    subcategories: ['Add New', 'Manage', 'Credit', 'History', 'Analytics'],
  },
  {
    name: 'Vendors',
    icon: Building,
    subcategories: ['Register', 'Contracts', 'Payments', 'Performance', 'Documents'],
  },
  {
    name: 'Products',
    icon: Package,
    subcategories: ['Catalog', 'Pricing', 'Stock', 'Categories', 'Import'],
  },
  {
    name: 'Shipping',
    icon: Truck,
    subcategories: ['Rates', 'Carriers', 'Tracking', 'Returns', 'Labels'],
  },
  {
    name: 'Finance',
    icon: DollarSign,
    subcategories: ['Dashboard', 'Reports', 'Taxes', 'Expenses', 'Budget'],
  },
  {
    name: 'Settings',
    icon: Settings,
    subcategories: ['General', 'Security', 'Notifications', 'Backup', 'Integration'],
  },
];

export function Sidebar({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredCategories = categories
    .map(category => ({
      ...category,
      subcategories: category.subcategories.filter(sub =>
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.length > 0
    );

  const handleCategoryClick = (category: typeof categories[0], index: string) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
    onNavigate(category.name);
  };

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-4 px-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="relative">
            <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
              <Accordion 
                type="multiple" 
                value={expandedItems}
                onValueChange={setExpandedItems}
                className="w-full"
              >
                {filteredCategories.map((category, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger 
                      className="text-sm hover:no-underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category, `item-${index}`);
                      }}
                    >
                      <div className="flex items-center">
                        {<category.icon className="mr-2 h-4 w-4" />}
                        {category.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-1">
                        {category.subcategories.map((sub, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            className="justify-start pl-8"
                            onClick={() => onNavigate(`${category.name} > ${sub}`)}
                          >
                            {sub}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
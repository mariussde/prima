'use client';

import { useRouter } from 'next/navigation';
import { Home, HelpCircle, Settings, Building2, User, Bell, LogOut, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useState } from 'react';

const companies = ['Antwerp', 'Spain', 'Italy'];

export function TopBar({ currentPath }: { currentPath: string }) {
  const router = useRouter();
  const [currentCompany, setCurrentCompany] = useState(companies[0]);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <span className="text-2xl font-bold text-emerald-600">Prima</span>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[200px] justify-between">
                <span className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Current Company: {currentCompany}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {companies.map((company) => (
                <DropdownMenuItem 
                  key={company}
                  onClick={() => setCurrentCompany(company)}
                >
                  {company}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.push('/helpdesk')}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>
      <div className="px-4 py-2 text-sm text-muted-foreground">
        {currentPath}
      </div>
    </div>
  );
}

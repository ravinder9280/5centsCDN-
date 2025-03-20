"use client"

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut } from 'lucide-react';
import { logout, getUser } from '@/lib/auth';

export function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 border-b px-4 md:px-6 flex items-center justify-between">
      <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden md:inline text-sm text-muted-foreground">
            Welcome, {user?.name}
          </span>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
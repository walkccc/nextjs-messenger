'use client';

import { User } from 'next-auth';
import { useState } from 'react';

import { Avatar } from '@/components/global/avatar';
import { useRoutes } from '@/hooks/use-routes';

import { SidebarItem } from './sidebar-item';

interface SidebarProps {
  currentUser: User;
}

export const Sidebar = ({ currentUser }: SidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((route) => (
            <SidebarItem
              key={route.label}
              label={route.label}
              href={route.href}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mx-4 flex flex-col items-center justify-between">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer transition hover:opacity-75"
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

'use client';

import { User } from '@prisma/client';

import { UserBox } from '@/app/users/_components/user-box';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <aside className="fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-semibold text-neutral-800">
            People
          </div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

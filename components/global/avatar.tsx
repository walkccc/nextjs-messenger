'use client';

import Image from 'next/image';
import { User } from 'next-auth';

interface AvatarProps {
  user: User;
}

export const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="relative">
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-12 md:w-12">
        <Image
          alt="Avatar"
          fill
          src={user?.image || '/images/avatar-placeholder.png'}
        />
      </div>
      <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white md:h-3 md:w-3"></span>
    </div>
  );
};

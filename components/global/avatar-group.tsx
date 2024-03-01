'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[];
}

export const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: 'left-[12px] top-0',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image
            fill
            src={user?.image || '/images/placeholder.jpg'}
            alt="Avatar"
          />{' '}
        </div>
      ))}
    </div>
  );
};

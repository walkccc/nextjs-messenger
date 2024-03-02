'use client';

import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Avatar } from '@/components/global/avatar';
import { FullMessageType } from '@/types';

import { ImageModal } from './image-modal';

interface MessageBoxProps {
  message: FullMessageType;
  isLast: boolean;
}

export const MessageBox = ({ message, isLast }: MessageBoxProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = session.data?.user?.email === message.sender.email;
  const seenUsers = (message.seenUsers || [])
    .filter(({ user }) => user?.email !== message.sender.email)
    .map(({ user }) => user?.name)
    .join(', ');

  const containerStyle = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatarStyle = clsx(isOwn && 'order-2');
  const bodyStyle = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const messageStyle = clsx(
    'w-fit overflow-hidden text-sm',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    message.image ? 'rounded-md p-0' : 'rounded-full px-3 py-2',
  );

  return (
    <div className={containerStyle}>
      <div className={avatarStyle}>
        <Avatar user={message.sender} />
      </div>
      <div className={bodyStyle}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), 'p')}
          </div>
        </div>
        <div className={messageStyle}>
          <ImageModal
            src={message.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {message.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={message.image}
              onClick={() => setImageModalOpen(true)}
              className="translate cursor-pointer object-cover transition hover:scale-110"
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwn && seenUsers.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenUsers}`}</div>
        )}
      </div>
    </div>
  );
};

'use client';

import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

import { Modal } from '@/components/modals/modal';
import { Button } from '@/components/ui/button';
import { useConversation } from '@/hooks/use-conversation';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/conversations/${conversationId}`);
      onClose();
      router.push('/conversations');
      router.refresh();
    } catch {
      toast.error('Something went wrong!');
    }

    setIsLoading(false);
  }, [router, conversationId, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 gap-x-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          disabled={isLoading}
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-300"
        >
          Delete
        </Button>
        <Button disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

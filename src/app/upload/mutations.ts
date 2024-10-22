/* eslint-disable no-console */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const useUploadNovels = () => {
  const mutationFn = ({ novelID, textContent }: { textContent: string; novelID: number }) => {
    return axios.post('/api/seed', {
      textContent,
      novelID,
    });
  };
  return useMutation({
    mutationFn,
    mutationKey: ['useUploadNovels'],
    onSuccess: () => {
      toast.success('Successfully uploaded!');
    },
    onError: () => {
      toast.error('Failed to upload!');
    },
  });
};

export const useHehe = () => {
  const mutationFn = (body: any) => {
    return axios.post('/api/test', body);
  };
  return useMutation({
    mutationFn,
    mutationKey: ['useHehe'],
    onSuccess: () => {
      toast.success('Successfully post!');
    },
    onError: () => {
      toast.error('Failed to post!');
    },
  });
};

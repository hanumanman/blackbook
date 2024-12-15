import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as uploadAPI from './apis';
import { TUploadChaptersBody } from './types.js';

export const useUploadChapters = () => {
  const mutationFn = (params: TUploadChaptersBody) => {
    return uploadAPI.uploadChapters(params);
  };
  return useMutation({
    mutationFn,
    mutationKey: ['useUploadNovels'],
    onSuccess: () => {
      toast.success('Successfully uploaded!');
    },
    onError: (error) => {
      toast.error('Failed to upload!', { description: error.message });
    },
  });
};

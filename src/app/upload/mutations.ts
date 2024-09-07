import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useUploadNovels = () => {
  const mutationFn = ({
    novelID,
    textContent,
  }: {
    textContent: string;
    novelID: number;
  }) => {
    return axios.post('/api/seed', {
      textContent,
      novelID,
    });
  };
  return useMutation({
    mutationFn,
    mutationKey: ['uploadNovels'],
    onSuccess: () => {
      console.log('query success');
    },
    onError: () => {
      console.log('query error');
    },
  });
};

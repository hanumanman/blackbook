import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { text } from 'stream/consumers';

export const useUploadNovels = () => {
  const mutationFn = (textContent: string) => {
    return axios.post('/api/seed', {
      textContent,
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

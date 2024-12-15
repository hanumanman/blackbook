import axios from 'axios';
import { TUploadChaptersBody } from './types';

export function uploadChapters(params: TUploadChaptersBody) {
  const { textContent, novelID } = params;
  return axios.post('/api/seed', {
    textContent,
    novelID,
  });
}

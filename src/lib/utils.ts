import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const baseURL = process.env.BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customFetch = async ({
  cache,
  url,
}: {
  url: string;
  cache: RequestCache;
}) => {
  if (!baseURL) {
    throw new Error('Missing BASE_URL in env');
  }
  try {
    const response = await fetch(`${baseURL}${url}`, {
      cache,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch novels');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error :', error);
  }
};

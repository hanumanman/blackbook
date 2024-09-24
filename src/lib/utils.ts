/* eslint-disable no-console */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const baseURL = process.env.BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeVietnamese = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const customFetch = async ({ cache, url }: { url: string; cache: RequestCache }) => {
  if (!baseURL) {
    throw new Error('Missing BASE_URL in env');
  }
  try {
    const response = await fetch(`${baseURL}${url}`, {
      cache,
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Response not ok. Check log for details.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't fetch novels. Check log for details.");
  }
};

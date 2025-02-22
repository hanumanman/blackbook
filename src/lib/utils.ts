import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes a Vietnamese string by removing diacritical marks and converting
 * specific Vietnamese characters to their closest ASCII equivalents.
 *
 * This function performs the following transformations:
 * - Normalizes the string using Unicode Normalization Form D (NFD).
 * - Removes all diacritical marks.
 * - Replaces 'đ' with 'd'.
 * - Replaces 'Đ' with 'D'.
 *
 * @param str - The Vietnamese string to be normalized.
 * @returns The normalized string with diacritical marks removed and specific
 *          characters replaced.
 */
export function normalizeVietnamese(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

// eslint-disable-next-line no-unused-vars
export function getEnv(key: string): string;
// eslint-disable-next-line no-unused-vars
export function getEnv(keys: string[]): string[];
/**
 * Retrieves the value(s) of the specified environment variable(s).
 *
 * @param {string | string[]} keys - The name(s) of the environment variable(s) to retrieve.
 * @returns {string | string[]} The value(s) of the specified environment variable(s).
 * @throws {Error} If any of the specified environment variables are undefined.
 *
 * @example
 * // Retrieve a single environment variable
 * const dbHost = getEnv('DB_HOST');
 *
 * @example
 * // Retrieve multiple environment variables
 * const [dbHost, dbPort] = getEnv(['DB_HOST', 'DB_PORT']);
 */
export function getEnv(keys: string | string[]): string | string[] {
  if (typeof keys === 'string') {
    const value = process.env[keys];
    if (value === undefined) {
      throw new Error(`Environment variable ${keys} is undefined`);
    }
    return value;
  }

  if (Array.isArray(keys)) {
    return keys.map((key) => {
      return getEnv(key);
    });
  }

  throw new Error('Invalid argument type: expected a string or an array of strings');
}

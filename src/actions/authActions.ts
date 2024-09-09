'use server';

import { authService } from '@/auth';

export async function login() {
  await authService.signIn('google');
}

export async function logout() {
  await authService.signOut();
}

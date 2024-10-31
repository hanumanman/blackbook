/* eslint-disable no-unused-vars */
//@ts-nocheck
// TODO  enable TS and eslint check
'use server';

import { TSession, TUser } from '@/db/schema';

export async function login() {
  alert('login');
}

export async function logout() {
  alert('logout');
}

export type SessionValidationResult =
  | {
      user: TUser;
      session: TSession;
    }
  | {
      session: null;
      user: null;
    };

export function generateSessionToken(): string {
  // TODO  implement
}

export async function createSession(token: string, userId: number): Promise<TSession> {
  // TODO  implement
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  // TODO  implement
}

export async function invalidateSession(sessionId: string): Promise<void> {
  // TODO  implement
}

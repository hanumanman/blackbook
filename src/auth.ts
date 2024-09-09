import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const authService = NextAuth({
  providers: [Google],
});

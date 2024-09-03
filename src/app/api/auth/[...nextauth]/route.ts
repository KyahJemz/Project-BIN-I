import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import { env } from '@/env.mjs';
import { AccountService } from '@/services/accounts.service';
import AccountModel from '@/models/accounts';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        const accountService = new AccountService(AccountModel);
        const user = await accountService.getByEmail( credentials?.email );
        if (!user) {
          throw new Error('No user found with the email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return { 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            position: user.position,
            department: user.department,
            type: user.type,
            id: user._id
        };
      },
    }),
  ],
//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error',
//   },
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
        position: token.position,
        department: token.department,
        type: token.type,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.position = user.position;
        token.department = user.department;
        token.type = user.type;
      }
      return token;
    },
  },
});
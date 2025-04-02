import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import type { User, Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters"
import axios from 'axios';
import https from 'https';

async function getToken(username: string, password: string) {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', process.env.KEYCLOAK_ID!);
  params.append('client_secret', process.env.KEYCLOAK_SECRET!);
  params.append('username', username);
  params.append('password', password);

  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false // Note: This is not recommended for production
    });

    const response = await axios.post(
      `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpsAgent
      }
    );

    return response.data;
  } catch (error) {
    console.error('Token Error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error_description || 'Authentication failed');
    }
    throw error;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter your username and password');
        }

        try {
          const tokenData = await getToken(credentials.username, credentials.password);
          
          return {
            id: credentials.username,
            name: credentials.username,
            email: credentials.username,
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            expiresIn: tokenData.expires_in,
          };
        } catch (error) {
          console.error('Authorization Error:', error);
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user: User | AdapterUser; account: Account | null }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiresIn = token.expiresIn;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

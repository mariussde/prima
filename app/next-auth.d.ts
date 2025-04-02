import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
  }

  interface Session {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
  }
}

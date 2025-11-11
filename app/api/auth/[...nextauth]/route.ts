/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { adapter } from "next/dist/server/web/adapter";
import { sendEmail } from "@/lib/config/nodemailer";
import { generatePassword } from "@/utlis/generatePassword";

export const authOptions: NextAuthOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@domain.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        // Find user by email
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        // console.log(user)


        if (!user) return null;

        

        // verify password (bcrypt)
        // const isValid = await verifyPassword(credentials.password, user.password);
        // if (!isValid) return null;

        // Return a user object that will be stored in session token
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          phone: user.phone?? undefined
        };
      },
    }),
  ],

  // If you want to persist sessions in DB (optional). If using PrismaAdapter,
  // you must run migrations to add the required tables for NextAuth
  // adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt", // or "database" if adapter used
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },



  callbacks: {
    async signIn({ user, account, profile }) {
      // `profile` is the OAuthProfile you saw in the debug logs
      console.log("Profile from Google:", profile, user, account);

      const isExiste = await prisma.user.findFirst({
        where: { email: profile?.email }
      })

      if (isExiste) {
        return true;
      } else {
        const result = await prisma.user.create({
          data: {
            name: profile?.name || "",
            email: profile?.email || "",
            password: generatePassword(profile?.email ?? "", 8), 
            phone: ""
          }
        });

        const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #333;">Welcome to Our Platform, ${result?.name || "User"}!</h2>
    <p>Thank you for registering with us. Your account has been successfully created.</p>
    
    <p><strong>Your login details:</strong></p>
    <ul>
      <li><strong>Email:</strong> ${result?.email}</li>
      <li><strong>Password:</strong> ${result.password}</li>
    </ul>
    
    <p>Please keep this information safe. You can now <a href="https://yourwebsite.com/login" style="color: #1a73e8;">log in here</a>.</p>
    
    <p>We recommend changing your password after your first login for security purposes.</p>
    
    <hr style="border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #777;">If you did not register for this account, please ignore this email.</p>
  </div>
`;


        if (profile?.email) {
          await sendEmail(profile.email, "Thank you for choosing us", html);
        }
        return true;
      }
    },

    // async jwt({ token, user }) {
    //   // On sign in, attach user id / email to token
    //   if (user) {
    //     token.id = (user as any).id ?? token.sub;
    //     token.email = (user as any).email ?? token.email;
    //   }
    //   return token;
    // },

    // async session({ session, token }) {
    //   // Expose additional properties to client
    //   if (token && session.user) {
    //     session.user.id = token.id as string;
    //     session.user.email = token.email as string;
    //   }
    //   return session;
    // },
  },



  pages: {
    signIn: "/auth/signin", // custom sign-in route (optional)
    error: '/auth/error' // custom error page
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};



const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

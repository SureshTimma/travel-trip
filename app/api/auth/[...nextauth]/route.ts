import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoConnect } from "@/app/DB/MongoConnect";
import { userModel } from "@/app/DB/MongoDB";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Connect to MongoDB
          await MongoConnect();

          // Find user in the database
          const user = await userModel.findOne({ email: credentials.email });          // If no user found or password doesn't match
          if (!user || user.password !== credentials.password) {
            return null;
          }

          // Return user object that will be stored in JWT token
          return {
            id: user._id.toString(),
            email: user.email
          };
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };

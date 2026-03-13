import type { NextAuthConfig } from "next-auth";
type NextAuthOptions = NextAuthConfig;
import { supabase } from "./supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/password through Supabase Auth
    // We'll implement a custom credentials provider that talks to Supabase
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Add Supabase user data to session
      if (token.sub) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', token.sub)
          .single();

        if (profile) {
          session.user.id = token.sub;
          session.user.email = profile.email;
          session.user.name = profile.full_name || null;
          session.user.image = null;
          // Add custom fields
          (session as any).plan = profile.plan;
          (session as any).subscriptionStatus = profile.subscription_status;
          (session as any).company = profile.company;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    // signUp: '/signup',
  },
};

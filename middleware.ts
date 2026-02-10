import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // zatím: povol jen přihlášené
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/edit/:path*", "/admin/:path*"],
};

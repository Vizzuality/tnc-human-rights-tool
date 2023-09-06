import { withAuth } from "next-auth/middleware";

// middleware is applied to all projects routes
export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token }) => {
      if (token === null) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: "/projects/:path*",
};

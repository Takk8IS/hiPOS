import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Check both cookie and session storage for authentication
    const isAuthenticated =
        request.cookies.get("isAuthenticated")?.value === "true";

    // Protected routes check
    if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
    matcher: ["/dashboard/:path*"],
};

import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // For protected routes, we allow the request through and let the page handle auth
    // This is necessary because cross-site cookies (backend on Render) may not be
    // immediately available to the middleware (frontend on Vercel)
    // The page components will check authentication via API calls
    
    // Only redirect logged-in users away from login/signup pages if we have a token
    // (This works for same-site cookies, but cross-site cookies may not be available)
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
};

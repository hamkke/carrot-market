import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

export async function middleware(request: NextRequest) {
  console.log('HELLO');
}

export const config = {
  matcher: ['/', '/user/:path*'],
};

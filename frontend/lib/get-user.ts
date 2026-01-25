import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth-helpers';

export async function getUser(req: Request) {
    const token = req.headers.get('cookie')?.split('; ')?.find(row => row.startsWith('token='))?.split('=')[1];

    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded;
}

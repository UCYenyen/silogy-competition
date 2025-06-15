import { NextResponse} from 'next/server';

export async function POST(){
    const respon = NextResponse.json({ message: 'user telah bisa logout'});
    respon.cookies.set('user_id', '', { httpOnly: true, path: '/', maxAge: 0});
    return respon;
}
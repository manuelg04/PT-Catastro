/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { MY_TOKEN_NAME } from './constantes';

export function middleware(req: NextRequest) {
  console.log("Hola middleware");
    const token = req.cookies.get(MY_TOKEN_NAME)
   
    // console.log("🚀 ~ req.cookies:", req.cookies)
    
     console.log("🚀 ~ token:", token)
    
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}
export const config = {
  matcher: ['/perfil/:path*'],
};

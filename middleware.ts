import { NextRequest, NextResponse } from 'next/server'
import { LOCALSTORAGE_TOKEN } from './constants'
let token: string | null = null
export function middleware(req: NextRequest, res: NextResponse) {
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(LOCALSTORAGE_TOKEN)
    console.log(token)
  }
  console.log(req.cookies)

  if (
    !req.nextUrl.pathname.startsWith('/login') &&
    !req.nextUrl.pathname.startsWith('/account')
  ) {
    if (!token) {
      req.nextUrl.pathname = '/login'
      return NextResponse.redirect(req.nextUrl)
    }
    if (
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/create-account')
    ) {
      if (token) {
        req.nextUrl.pathname = '/'
        return NextResponse.redirect(req.nextUrl)
      }
    }
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/', '/login', '/account'],
}

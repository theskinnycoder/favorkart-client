import { NextResponse } from 'next/server'

export async function middleware(req) {
  if (!req?.cookies?.token) return NextResponse.next()
  const url = req?.nextUrl?.clone()
  url.pathname = '/me/profile'
  return NextResponse.redirect(url)
}

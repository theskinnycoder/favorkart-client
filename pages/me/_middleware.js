import { NextResponse } from 'next/server'

export async function middleware(req) {
  if (req?.cookies?.token) return NextResponse.next()
  const url = req?.nextUrl?.clone()
  url.pathname = '/auth'
  return NextResponse.redirect(url)
}

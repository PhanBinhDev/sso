import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  // Refresh session nếu hết hạn
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // Bảo vệ /complete-sso — phải login mới vào được
  if (request.nextUrl.pathname.startsWith('/complete-sso') && !user) {
    console.log('Middleware: User not authenticated, redirecting to login')

    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/complete-sso', '/authorize']
}

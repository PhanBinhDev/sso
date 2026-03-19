'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

function buildCompleteSSOUrl(
  baseUrl: string,
  clientId: string,
  redirectUri: string,
  state?: string | null
) {
  const url = new URL('/complete-sso', baseUrl)
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  if (state) url.searchParams.set('state', state)
  return url.toString()
}

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const clientId = formData.get('client_id') as string
  const redirectUri = formData.get('redirect_uri') as string
  const state = formData.get('state') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(error.message)}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`
    )
  }

  redirect(
    buildCompleteSSOUrl(
      process.env.NEXT_PUBLIC_AUTH_SERVER_URL!,
      clientId,
      redirectUri,
      state
    )
  )
}

export async function loginWithGoogle(formData: FormData) {
  const clientId = formData.get('client_id') as string
  const redirectUri = formData.get('redirect_uri') as string
  const state = formData.get('state') as string

  const supabase = await createClient()

  const completeSSOUrl = new URL(
    '/complete-sso',
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL
  )
  completeSSOUrl.searchParams.set('client_id', clientId)
  completeSSOUrl.searchParams.set('redirect_uri', redirectUri)
  if (state) completeSSOUrl.searchParams.set('state', state)

  const authCallbackUrl = new URL(
    '/auth/callback',
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL
  )
  authCallbackUrl.searchParams.set('next', completeSSOUrl.toString())

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: authCallbackUrl.toString(),
      skipBrowserRedirect: true // ← key fix
    }
  })

  if (error || !data.url) {
    redirect(
      `/login?error=Google+login+failed&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`
    )
  }

  redirect(data.url) // ← redirect thủ công với đúng URL
}

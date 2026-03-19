'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'

interface Props {
  clientId: string
  redirectUri: string
  state: string
}

export function AuthForm({ clientId, redirectUri, state }: Props) {
  const supabase = createClient()
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL

  const completeSSOUrl = new URL('/complete-sso', baseUrl)
  completeSSOUrl.searchParams.set('client_id', clientId)
  completeSSOUrl.searchParams.set(
    'redirect_uri',
    decodeURIComponent(redirectUri)
  )
  if (state) completeSSOUrl.searchParams.set('state', decodeURIComponent(state))

  const authCallbackUrl = new URL('/auth/callback', baseUrl)
  authCallbackUrl.searchParams.set('next', completeSSOUrl.toString())

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={['google']}
      redirectTo={authCallbackUrl.toString()}
      onlyThirdPartyProviders={false}
    />
  )
}

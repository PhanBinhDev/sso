import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const clientId = searchParams.get('client_id')
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing client_id or redirect_uri' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()
  const { data: client } = await supabase
    .schema('sso')
    .from('clients')
    .select('client_id, redirect_uris, is_active')
    .eq('client_id', clientId)
    .eq('is_active', true)
    .single()

  if (!client || !client.redirect_uris.includes(redirectUri)) {
    return NextResponse.json({ error: 'Invalid client' }, { status: 401 })
  }

  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  // Log toàn bộ cookies nhận được
  console.log('Cookies received:', request.cookies.getAll())
  console.log('User:', session?.user.email ?? null)
  console.log('Error:', error?.message ?? null)

  console.log(
    'Authorize route hit, client_id:',
    clientId,
    'redirect_uri:',
    redirectUri,
    'state:',
    state,
    'user:',
    session?.user.email ?? null
  )

  if (session?.user) {
    const url = new URL('/complete-sso', request.url)
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('redirect_uri', redirectUri)
    if (state) url.searchParams.set('state', state)
    return NextResponse.redirect(url)
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('client_id', clientId)
  loginUrl.searchParams.set('redirect_uri', redirectUri)
  if (state) loginUrl.searchParams.set('state', state)

  return NextResponse.redirect(loginUrl)
}

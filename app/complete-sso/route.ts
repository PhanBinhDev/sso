import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const clientId = searchParams.get('client_id')
  const redirectUri = searchParams.get('redirect_uri')
  const state = searchParams.get('state')

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const supabase = await createClient()
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  console.log(
    'Complete SSO route hit, client_id:',
    clientId,
    'redirect_uri:',
    redirectUri,
    'state:',
    state,
    'user:',
    user
  )

  if (userError || !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('client_id', clientId)
    loginUrl.searchParams.set('redirect_uri', redirectUri)
    if (state) loginUrl.searchParams.set('state', state)
    return NextResponse.redirect(loginUrl)
  }

  const admin = createAdminClient()
  const { data: client } = await admin
    .schema('sso')
    .from('clients')
    .select('client_id, redirect_uris, is_active')
    .eq('client_id', clientId)
    .eq('is_active', true)
    .single()

  if (!client || !client.redirect_uris.includes(redirectUri)) {
    return NextResponse.json({ error: 'Invalid client' }, { status: 401 })
  }

  const { data: codeRow, error: codeError } = await admin
    .schema('sso')
    .from('codes')
    .insert({
      user_id: user.id,
      client_id: clientId
      // expires_at tự set bởi DEFAULT trong DB (now() + 60s)
    })
    .select('code')
    .single()

  if (codeError || !codeRow) {
    return NextResponse.json(
      { error: 'Failed to create code' },
      { status: 500 }
    )
  }

  // --- Redirect về app con kèm code ---
  const callbackUrl = new URL(redirectUri)
  callbackUrl.searchParams.set('code', codeRow.code)
  if (state) callbackUrl.searchParams.set('state', state)

  return NextResponse.redirect(callbackUrl)
}

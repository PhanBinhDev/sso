import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { code, client_id, client_secret } = body

  if (!code || !client_id || !client_secret) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const admin = createAdminClient()

  // --- Verify client ---

  console.log('Verifying client:', client_id)

  const { data: client } = await admin
    .schema('sso')
    .from('clients')
    .select('secret_hash, is_active')
    .eq('client_id', client_id)
    .eq('is_active', true)
    .single()

  console.log('Client data:', client)

  if (!client) {
    return NextResponse.json({ error: 'Invalid client' }, { status: 401 })
  }

  const secretValid = await bcrypt.compare(client_secret, client.secret_hash)
  if (!secretValid) {
    return NextResponse.json(
      { error: 'Invalid client secret' },
      { status: 401 }
    )
  }

  // --- Consume code ---
  const { data: result, error: consumeError } = await admin
    .schema('sso')
    .rpc('consume_code', { p_code: code, p_client_id: client_id })

  if (consumeError || !result || result.length === 0) {
    return NextResponse.json(
      { error: 'Invalid or expired code' },
      { status: 401 }
    )
  }

  const { user_id, schema_name } = result[0]

  // --- Lấy email của user ---
  const { data: userData, error: userError } =
    await admin.auth.admin.getUserById(user_id)

  if (userError || !userData.user?.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // --- Generate magic link, lấy hashed_token ---
  const { data: linkData, error: linkError } =
    await admin.auth.admin.generateLink({
      type: 'magiclink',
      email: userData.user.email
    })

  if (linkError || !linkData?.properties?.hashed_token) {
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    hashed_token: linkData.properties.hashed_token,
    schema_name,
    user: {
      id: userData.user.id,
      email: userData.user.email
    }
  })
}

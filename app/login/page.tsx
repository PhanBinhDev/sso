interface Props {
  searchParams: Promise<{
    client_id?: string
    redirect_uri?: string
    state?: string
    error?: string
  }>
}

import { AuthForm } from './auth-form'

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams
  const { client_id, redirect_uri, state } = params

  if (!client_id || !redirect_uri) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-sm text-gray-500'>Invalid login request.</p>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm'>
        <h1 className='mb-6 text-center text-xl font-semibold'>Đăng nhập</h1>
        <AuthForm
          clientId={client_id}
          redirectUri={redirect_uri}
          state={state ?? ''}
        />
      </div>
    </div>
  )
}

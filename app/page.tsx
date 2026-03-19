import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950'>
      <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col items-center gap-6 border border-gray-100 dark:border-gray-800'>
        <Image
          src='/next.svg'
          alt='Logo'
          width={64}
          height={64}
          className='mb-2 dark:invert'
        />
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
          Đăng nhập SSO
        </h1>
        <p className='text-gray-500 dark:text-gray-300 text-center mb-4 text-sm'>
          Đăng nhập một lần, truy cập mọi dịch vụ trong hệ thống của bạn.
          <br />
          Hỗ trợ Google và các phương thức khác.
        </p>
        <div className='text-xs text-gray-400 dark:text-gray-500 mt-2 text-center'>
          © {new Date().getFullYear()} SSO Demo. Powered by Next.js & Supabase.
        </div>
      </div>
    </div>
  )
}

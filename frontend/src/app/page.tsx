import LoginForm from '@/components/login-form'

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-l from-blue-100 via-blue-300 to-blue-500 dark:bg-gradient-to-l dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <div className="min-w-[600px]">
        <LoginForm />
      </div>
    </main>
  )
}

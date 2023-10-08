import LoginForm from '@/components/login-form'

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500">
      <div className="min-w-[600px]">
        <LoginForm />
      </div>
    </main>
  )
}

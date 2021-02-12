import { useAuth } from '@/utils/auth'

export default function Home() {
  const { user, signInWithGoogle } = useAuth()
  return (
    <div>
      <button onClick={() => signInWithGoogle()}>login</button>
      Hello: {user?.name}
    </div>
  )
}

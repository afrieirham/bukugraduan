import { useEffect } from 'react'

import { useAuth } from '@/utils/auth'
import DashboardShell from '@/components/DashboardShell'
import AddBookForm from '@/components/AddBookForm'

function AddBook() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  return (
    <DashboardShell>
      <AddBookForm />
    </DashboardShell>
  )
}

export default AddBook

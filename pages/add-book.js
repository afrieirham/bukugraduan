import { useEffect } from 'react'
import Router from 'next/router'

import { useAuth } from '@/utils/auth'
import DashboardShell from '@/components/DashboardShell'
import AddBookForm from '@/components/AddBookForm'

function AddBook() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

  return (
    <DashboardShell>
      <AddBookForm />
    </DashboardShell>
  )
}

export default AddBook

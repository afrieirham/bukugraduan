import { useEffect } from 'react'
import Router from 'next/router'

import { useAuth } from '@/utils/auth'
import DashboardShell from '@/components/DashboardShell'
import AddBookForm from '@/components/AddBookForm'
import { useSEO } from '@/hooks/useSEO'

function AddBook() {
  const { user } = useAuth()
  const { CustomNextSeo } = useSEO()

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

  return (
    <DashboardShell>
      <CustomNextSeo />
      <AddBookForm />
    </DashboardShell>
  )
}

export default AddBook

'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function UserSync() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.email) {
      localStorage.setItem('user-email', session.user.email)
      localStorage.setItem('user-name', session.user.name || 'User')
    }
  }, [session])

  return null
}
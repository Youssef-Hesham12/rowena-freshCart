import { authOptions } from '@/next-auth/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Profile() {
  const session = await getServerSession(authOptions)
    if(!session) redirect('/login');
    redirect('/profile/addresses')
  return (
    <div>
      
    </div>
  )
}

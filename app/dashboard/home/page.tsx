import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'

const HomePage = () => {

  const session = getServerSession(authOptions)
  if(!session){
    return
  }
  return (
    <div>
        hi
    </div>
  )
}

export default HomePage
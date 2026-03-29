import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Admin = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to access admin panel</div>
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Manage games here</p>
    </div>
  )
}

export default Admin

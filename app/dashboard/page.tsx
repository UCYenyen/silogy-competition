import { cookies } from 'next/headers'
import { prisma } from '../lib/prisma'
import Logout from '../../components/logoutButton';

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user_id')?.value

  if (!userId) {
    return <div>Not logged in. Please <a href="/login">login</a>.</div>
  }

  const user = await prisma.users.findUnique({
    where: { user_id: Number(userId) }
  })

  if (!user) {
    return <div>User not found.</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>User ID: {user.user_id}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Phone: {user.phone_number}</div>
      <div>Password: {user.password_hash}</div>
      <Logout />
    </div>
  )
}
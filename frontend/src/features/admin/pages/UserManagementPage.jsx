/**
 * UserManagementPage
 *
 * Admin page to manage user access.
 */

import { useEffect, useState } from 'react'
import PageLayout from '../../../components/PageLayout'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import Button from '../../../components/Button'
import { UserService } from '../../../services/UserService'

function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const allUsers = await UserService.getAllUsers()
      setUsers(allUsers)
      setLoading(false)
    }
    load()
  }, [])

  async function handleSuspend(userId) {
    await UserService.updateUser(userId, { role: 'suspended' })
    setUsers(current => current.map(user => user.id === userId ? { ...user, role: 'suspended' } : user))
  }

  async function handleRestore(userId) {
    await UserService.updateUser(userId, { role: 'buyer' })
    setUsers(current => current.map(user => user.id === userId ? { ...user, role: 'buyer' } : user))
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">User management</h1>
          <p className="mt-2 text-sm text-slate-600">Suspend or restore users and review account roles.</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? <Loader /> : users.length ? (
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{user.displayName || user.email}</h2>
                    <p className="text-sm text-slate-600">{user.email}</p>
                    <p className="text-sm text-slate-600">Role: {user.role}</p>
                  </div>
                  {user.role === 'suspended' ? (
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleRestore(user.id)}>Restore</Button>
                  ) : (
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleSuspend(user.id)}>Suspend</Button>
                  )}
                </div>
              ))}
            </div>
          ) : <EmptyState title="No users" description="No users found in the system." />}
        </div>
      </div>
    </PageLayout>
  )
}

export default UserManagementPage

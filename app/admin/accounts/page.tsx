'use client'

import AdminAccountsPanel from '../../components/AdminAccountsPanel'

export default function Page() {
  return (
    <main className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-semibold">Admin — Accounts</h1>
      <div className="mt-6 max-w-2xl">
        <AdminAccountsPanel />
      </div>
    </main>
  )
}

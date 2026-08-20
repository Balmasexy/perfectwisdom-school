'use client'

import { useEffect, useState } from 'react'

export default function AdminAccountsPanel() {
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((data) => {
        setAccountName(data.accountName || '')
        setAccountNumber(data.accountNumber || '')
      })
  }, [])

  async function save() {
    setStatus('saving')
    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountName, accountNumber }),
      })
      if (!res.ok) throw new Error('save failed')
      setStatus('saved')
      setTimeout(() => setStatus(''), 2000)
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Bank account for deposits</h2>
      <p className="mt-2 text-sm text-muted-foreground">Admins can update the school account details shown to clients when they make deposits.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Account name</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Account number</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button onClick={save} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Save</button>
        </div>
        {status && <div className="text-sm text-muted-foreground">{status}</div>}
      </div>
    </section>
  )
}

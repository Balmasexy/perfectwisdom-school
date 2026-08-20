// Updated DepositModal to fetch account details from API and redirect via deposits API

'use client'

import { useEffect, useState } from 'react'

export default function DepositModal({
  open,
  onClose,
  studentName,
  defaultAmount = 0,
  onConfirm,
  studentId,
}: {
  open: boolean
  onClose: () => void
  studentName: string
  studentId: string
  defaultAmount?: number
  onConfirm?: (amount: number) => void
}) {
  const [amount, setAmount] = useState(defaultAmount)
  const [copied, setCopied] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAmount(defaultAmount)
  }, [defaultAmount, open])

  useEffect(() => {
    if (!open) return
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((data) => {
        setAccountName(data.accountName || '')
        setAccountNumber(data.accountNumber || '')
      })
  }, [open])

  if (!open) return null

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(`${accountName} — ${accountNumber}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.warn('Copy failed', e)
    }
  }

  async function confirm() {
    setLoading(true)
    try {
      const res = await fetch('/api/deposits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, studentName, amount }),
      })
      const data = await res.json()
      if (data.redirectUrl) {
        // Redirect the user to bank to complete payment
        window.location.href = data.redirectUrl
      } else {
        console.error('No redirect URL returned', data)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/60 p-4">
      <div className="mx-auto w-full max-w-md rounded-xl bg-card p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Deposit for {studentName}</h3>
          <button aria-label="Close" onClick={onClose} className="text-sm text-muted-foreground">Close</button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="text-xs font-medium text-muted-foreground">Account</div>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <div className="font-medium">{accountName}</div>
                <div className="text-sm text-muted-foreground">Account number: {accountNumber}</div>
              </div>
              <button onClick={copyAccount} className="ml-4 rounded-md border px-3 py-1 text-sm">{copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Amount</label>
            <div className="mt-1">
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded-md border px-3 py-2" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="rounded-md px-3 py-2 text-sm">Cancel</button>
            <button onClick={confirm} disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">{loading ? 'Redirecting…' : 'Pay at bank'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

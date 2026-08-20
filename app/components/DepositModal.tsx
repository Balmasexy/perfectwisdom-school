'use client'

import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  amount?: number
  studentName?: string
  accountName?: string
  accountNumber?: string
}

export default function DepositModal({
  open,
  onClose,
  amount = 0,
  studentName = 'Student',
  accountName = 'perfectwisdom-school',
  accountNumber = '0123456789',
}: Props) {
  if (!open) return null

  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : String(amount)
  const copyAccount = async () => {
    const text = `${accountName} — Account number: ${accountNumber}`
    try {
      await navigator.clipboard.writeText(text)
      // silent success; UI could show a toast if available
    } catch (e) {
      // ignore
    }
  }

  const copyAmount = async () => {
    try {
      await navigator.clipboard.writeText(String(formattedAmount))
    } catch (e) {}
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">Deposit details</h2>
            <p className="text-sm text-muted-foreground mt-1">Provide this information to the payer when requesting payment.</p>
          </div>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground">Close</button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">Account</p>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <p className="font-medium">{accountName}</p>
                <p className="text-sm text-muted-foreground">Account number: {accountNumber}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={copyAccount} className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">Copy account</button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">For</p>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <p className="font-medium">{studentName}</p>
                <p className="text-sm text-muted-foreground">Use this as payment reference</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs text-muted-foreground">Amount</p>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <p className="font-medium">NGN {formattedAmount}</p>
                <p className="text-sm text-muted-foreground">Amount to pay</p>
              </div>
              <div>
                <button onClick={copyAmount} className="rounded-md bg-secondary px-3 py-1 text-sm">Copy amount</button>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Tip: After payment, record the transaction in the student payments area so the student's balance is updated.</p>
        </div>
      </div>
    </div>
  )
}

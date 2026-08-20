import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const ACCOUNTS_FILE = path.join(process.cwd(), 'data', 'accounts.json')
const DEPOSITS_FILE = path.join(process.cwd(), 'data', 'deposits.json')

export async function POST(request: Request) {
  try {
    const { studentId, studentName, amount } = await request.json()
    const accRaw = await fs.readFile(ACCOUNTS_FILE, 'utf8')
    const account = JSON.parse(accRaw)
    const reference = `${studentId}-${Date.now()}`

    // Construct a fake bank redirect URL. Replace with a real payment provider integration as needed.
    const params = new URLSearchParams({
      account: account.accountNumber || '',
      accountName: account.accountName || '',
      amount: String(amount),
      reference,
      studentName: studentName || '',
    })
    const redirectUrl = `https://bank.example.com/pay?${params.toString()}`

    // Record the deposit intent
    const deposit = {
      id: uuidv4(),
      studentId,
      studentName,
      amount,
      reference,
      redirectUrl,
      status: 'redirected',
      createdAt: new Date().toISOString(),
    }

    await fs.mkdir(path.dirname(DEPOSITS_FILE), { recursive: true })
    let deposits: any[] = []
    try {
      const raw = await fs.readFile(DEPOSITS_FILE, 'utf8')
      deposits = JSON.parse(raw || '[]')
    } catch (e) {
      deposits = []
    }
    deposits.push(deposit)
    await fs.writeFile(DEPOSITS_FILE, JSON.stringify(deposits, null, 2), 'utf8')

    return NextResponse.json({ redirectUrl })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Could not create redirect' }, { status: 500 })
  }
}

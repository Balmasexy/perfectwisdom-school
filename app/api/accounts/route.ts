import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FILE = path.join(process.cwd(), 'data', 'accounts.json')

export async function GET() {
  try {
    const raw = await fs.readFile(FILE, 'utf8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ accountName: '', accountNumber: '' })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const next = {
      accountName: String(body.accountName || '').trim(),
      accountNumber: String(body.accountNumber || '').trim(),
    }
    await fs.mkdir(path.dirname(FILE), { recursive: true })
    await fs.writeFile(FILE, JSON.stringify(next, null, 2), 'utf8')
    return NextResponse.json(next)
  } catch (err) {
    return NextResponse.json({ error: 'Could not update account' }, { status: 500 })
  }
}

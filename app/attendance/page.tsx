'use client'

import { useMemo, useState } from 'react'
import { Check, ClipboardCheck, Search } from 'lucide-react'

type Status = 'Present' | 'Absent' | 'Late'
type Student = { id: number; name: string; className: string; status: Status }

const initial: Student[] = [
  { id: 1, name: 'Amara Johnson', className: 'JSS 1', status: 'Present' },
  { id: 2, name: 'Daniel Okafor', className: 'JSS 2', status: 'Present' },
  { id: 3, name: 'Sarah Adeyemi', className: 'SSS 1', status: 'Late' },
  { id: 4, name: 'Michael Ibrahim', className: 'JSS 1', status: 'Absent' },
]

export default function AttendancePage() {
  const [records, setRecords] = useState(initial)
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState(false)

  const filtered = useMemo(() => records.filter(s => (s.name + ' ' + s.className).toLowerCase().includes(search.toLowerCase())), [records, search])
  const count = (status: Status) => records.filter(s => s.status === status).length

  function update(id: number, status: Status) {
    setSaved(false)
    setRecords(current => current.map(s => s.id === id ? { ...s, status } : s))
  }

  return (
    <main className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><ClipboardCheck size={22} /></div>
            <div><h1 className="text-3xl font-semibold">Attendance</h1><p className="mt-1 text-sm text-muted-foreground">Record and manage daily student attendance.</p></div>
          </div>
          <button onClick={() => setSaved(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"><Check size={18} />Save attendance</button>
        </div>
        {saved && <div className="mt-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">Attendance saved successfully for today.</div>}
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Total students</p><p className="mt-2 text-2xl font-semibold">{records.length}</p></div>
          <div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Present</p><p className="mt-2 text-2xl font-semibold">{count('Present')}</p></div>
          <div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Absent</p><p className="mt-2 text-2xl font-semibold">{count('Absent')}</p></div>
          <div className="rounded-2xl border bg-card p-5"><p className="text-sm text-muted-foreground">Late</p><p className="mt-2 text-2xl font-semibold">{count('Late')}</p></div>
        </div>
        <section className="mt-6 rounded-2xl border bg-card">
          <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-semibold">Today's attendance</h2><p className="mt-1 text-sm text-muted-foreground">Mark each student as present, absent, or late.</p></div>
            <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="w-full rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm outline-none" /></div>
          </div>
          <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b text-muted-foreground"><th className="px-4 py-3 font-medium">Student</th><th className="px-4 py-3 font-medium">Class</th><th className="px-4 py-3 font-medium">Attendance</th></tr></thead><tbody>{filtered.map(student => <tr key={student.id} className="border-b last:border-0"><td className="px-4 py-4 font-medium">{student.name}</td><td className="px-4 py-4">{student.className}</td><td className="px-4 py-4"><div className="flex flex-wrap gap-2">{(['Present', 'Absent', 'Late'] as Status[]).map(status => <button key={status} onClick={() => update(student.id, status)} className={"rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"}>{status}</button>)}</div></td></tr>)}</tbody></table></div>
        </section>
      </div>
    </main>
  )
}

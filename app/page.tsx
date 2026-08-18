'use client'

import { useState } from 'react'
import {
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

type Role = 'admin' | 'staff' | 'client'

const adminNav = [
  { label: 'Admin overview', icon: LayoutDashboard },
  { label: 'Branches', icon: Building2 },
  { label: 'Staff access', icon: Users },
  { label: 'Reports', icon: FileText },
  { label: 'Settings', icon: Settings },
]

const staffNav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Students', icon: Users },
  { label: 'Attendance', icon: ClipboardCheck },
  { label: 'Classes', icon: BookOpen },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Messages', icon: MessageSquare, count: 4 },
]

const clientNav = [
  { label: 'My dashboard', icon: LayoutDashboard },
  { label: 'My children', icon: Users },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Progress', icon: ClipboardCheck },
  { label: 'Messages', icon: MessageSquare, count: 2 },
  { label: 'Payments', icon: WalletCards },
]

const attendance = [
  { day: 'Mon', value: 92 },
  { day: 'Tue', value: 96 },
  { day: 'Wed', value: 89 },
  { day: 'Thu', value: 98 },
  { day: 'Fri', value: 94 },
]

const activities = [
  { initials: 'AM', name: 'Ava Mitchell', action: 'submitted an assignment', time: '8 min ago', tone: 'bg-secondary' },
  { initials: 'JL', name: 'James Lee', action: 'was marked absent', time: '26 min ago', tone: 'bg-accent' },
  { initials: 'SO', name: 'Sofia Ortiz', action: 'completed a lesson', time: '1 hr ago', tone: 'bg-primary text-primary-foreground' },
]

function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Users }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-card-foreground">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" /></span>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{detail}</p>
    </article>
  )
}

function Sidebar({ role, active, setActive, open, setOpen }: { role: Role; active: string; setActive: (label: string) => void; open: boolean; setOpen: (open: boolean) => void }) {
  const items = role === 'admin' ? adminNav : role === 'staff' ? staffNav : clientNav
  const roleLabel = role === 'admin' ? 'Branch admin' : role === 'staff' ? 'Branch staff' : 'Client account'
  return (
    <aside className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-sidebar px-4 py-5 transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><span className="font-serif text-lg">P</span></div>
          <div><p className="font-semibold text-sidebar-foreground">Perfect Wisdom</p><p className="text-xs text-muted-foreground">School portal</p></div>
        </div>
        <button className="rounded-lg p-2 text-muted-foreground lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
      </div>
      <div className="mt-8 rounded-xl bg-secondary px-3 py-3"><p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Viewing as</p><p className="mt-1 text-sm font-semibold text-foreground">{roleLabel}</p></div>
      <nav className="mt-6 flex flex-1 flex-col gap-1" aria-label="Main navigation">
        {items.map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => { setActive(item.label); setOpen(false) }} className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active === item.label ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}><span className="flex items-center gap-3"><Icon aria-hidden="true" />{item.label}</span>{item.count && <span className={`rounded-full px-2 py-0.5 text-xs ${active === item.label ? 'bg-primary-foreground/15' : 'bg-secondary'}`}>{item.count}</span>}</button> })}
      </nav>
      <div className="flex flex-col gap-1 border-t border-border pt-4"><button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent"><Settings aria-hidden="true" />Settings</button><button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent"><CircleHelp aria-hidden="true" />Help center</button></div>
    </aside>
  )
}

function StaffDashboard() {
  return <>
    <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-primary">Tuesday, October 8, 2024</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Good morning, Aisha</h1><p className="mt-2 text-sm text-muted-foreground">Here&apos;s what&apos;s happening across your branch today.</p></div><button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"><Plus aria-hidden="true" />Add student</button></section>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total students" value="248" detail="↑ 12% from last term" icon={Users} /><StatCard label="Attendance today" value="94.6%" detail="↑ 2.4% from yesterday" icon={ClipboardCheck} /><StatCard label="Active classes" value="18" detail="3 classes start today" icon={BookOpen} /><StatCard label="Pending tasks" value="07" detail="2 need your attention" icon={FileText} /></div>
    <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]"><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><div><h2 className="font-semibold text-card-foreground">Attendance overview</h2><p className="mt-1 text-sm text-muted-foreground">Average attendance this week</p></div><button aria-label="More attendance options" className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"><MoreHorizontal /></button></div><div className="mt-8 flex h-44 items-end justify-around gap-3 border-b border-border px-2">{attendance.map((item) => <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-semibold text-primary">{item.value}%</span><div className="w-full max-w-12 rounded-t-lg bg-primary/80" style={{ height: `${item.value * 1.2}px` }} /><span className="mb-[-25px] text-xs text-muted-foreground">{item.day}</span></div>)}</div><div className="mt-8 flex items-center justify-between text-xs text-muted-foreground"><span>Target: 95%</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-primary" />This week</span></div></article><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><div><h2 className="font-semibold text-card-foreground">Today&apos;s schedule</h2><p className="mt-1 text-sm text-muted-foreground">Tuesday, October 8</p></div><button className="text-sm font-semibold text-primary">View calendar</button></div><div className="mt-5 flex flex-col gap-4">{['09:00  Grade 4 · Mathematics', '11:00  Grade 2 · Reading', '13:30  Staff sync · Main office', '15:00  Parent conference · Room 3'].map((event, index) => <div key={event} className="flex gap-3"><div className={`mt-1 h-10 w-1 rounded-full ${index === 2 ? 'bg-accent' : 'bg-primary'}`} /><div><p className="text-xs font-semibold text-primary">{event.split('  ')[0]}</p><p className="mt-1 text-sm text-card-foreground">{event.split('  ')[1]}</p></div></div>)}</div></article></div>
    <div className="grid gap-5 xl:grid-cols-[1fr_1.35fr]"><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-card-foreground">Recent activity</h2><p className="mt-1 text-sm text-muted-foreground">Latest updates from your branch</p></div><button className="text-sm font-semibold text-primary">See all</button></div><div className="mt-5 flex flex-col gap-4">{activities.map((activity) => <div key={activity.name} className="flex items-center gap-3"><div className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${activity.tone}`}>{activity.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-sm text-card-foreground"><span className="font-semibold">{activity.name}</span> {activity.action}</p><p className="mt-1 text-xs text-muted-foreground">{activity.time}</p></div></div>)}</div></article><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-card-foreground">Quick actions</h2><p className="mt-1 text-sm text-muted-foreground">Common tasks for your day</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><button className="flex flex-col gap-3 rounded-xl border border-border p-4 text-left hover:bg-secondary"><Users className="text-primary" /><span className="text-sm font-semibold">Manage students</span><span className="text-xs text-muted-foreground">View profiles and records</span></button><button className="flex flex-col gap-3 rounded-xl border border-border p-4 text-left hover:bg-secondary"><ClipboardCheck className="text-primary" /><span className="text-sm font-semibold">Take attendance</span><span className="text-xs text-muted-foreground">Mark today&apos;s classes</span></button><button className="flex flex-col gap-3 rounded-xl border border-border p-4 text-left hover:bg-secondary"><MessageSquare className="text-primary" /><span className="text-sm font-semibold">Send an update</span><span className="text-xs text-muted-foreground">Message families</span></button></div></article></div>
  </>
}

function ClientDashboard() {
  return <><section><p className="text-sm font-medium text-primary">Tuesday, October 8, 2024</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Welcome back, Jordan</h1><p className="mt-2 text-sm text-muted-foreground">Keep up with your children&apos;s learning journey.</p></section><div className="grid gap-4 sm:grid-cols-3"><StatCard label="Overall progress" value="78%" detail="↑ 8% this month" icon={ClipboardCheck} /><StatCard label="Attendance" value="96%" detail="Excellent attendance" icon={CalendarDays} /><StatCard label="Next payment" value="$180" detail="Due October 15" icon={WalletCards} /></div><div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]"><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-card-foreground">Your children</h2><p className="mt-1 text-sm text-muted-foreground">A snapshot of their latest progress</p></div><button className="text-sm font-semibold text-primary">View all</button></div><div className="mt-5 flex flex-col gap-4"><div className="flex items-center gap-4 rounded-xl bg-secondary p-4"><div className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">AM</div><div className="flex-1"><p className="font-semibold text-card-foreground">Ava Mitchell</p><p className="mt-1 text-xs text-muted-foreground">Grade 4 · Class A</p></div><div className="text-right"><p className="text-lg font-semibold text-primary">84%</p><p className="text-xs text-muted-foreground">progress</p></div></div><div className="flex items-center gap-4 rounded-xl bg-secondary p-4"><div className="flex size-12 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">JL</div><div className="flex-1"><p className="font-semibold text-card-foreground">James Lee</p><p className="mt-1 text-xs text-muted-foreground">Grade 2 · Class B</p></div><div className="text-right"><p className="text-lg font-semibold text-primary">72%</p><p className="text-xs text-muted-foreground">progress</p></div></div></div></article><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><h2 className="font-semibold text-card-foreground">Upcoming</h2><p className="mt-1 text-sm text-muted-foreground">Important dates for your family</p><div className="mt-5 flex flex-col gap-4"><div className="flex gap-3"><div className="rounded-xl bg-primary px-2.5 py-2 text-center text-primary-foreground"><span className="block text-xs">OCT</span><span className="text-lg font-bold">10</span></div><div><p className="font-medium text-card-foreground">Parent-teacher meeting</p><p className="mt-1 text-xs text-muted-foreground">4:00 PM · Main office</p></div></div><div className="flex gap-3"><div className="rounded-xl bg-secondary px-2.5 py-2 text-center text-primary"><span className="block text-xs">OCT</span><span className="text-lg font-bold">15</span></div><div><p className="font-medium text-card-foreground">Tuition payment due</p><p className="mt-1 text-xs text-muted-foreground">$180.00 · Monthly tuition</p></div></div></div></article></div><div className="grid gap-5 xl:grid-cols-2"><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><h2 className="font-semibold text-card-foreground">Announcements</h2><div className="mt-4 flex flex-col gap-4"><div className="border-l-2 border-primary pl-4"><p className="font-medium text-card-foreground">Autumn term showcase</p><p className="mt-1 text-sm text-muted-foreground">Join us on October 25 for an evening of student presentations.</p></div><div className="border-l-2 border-accent pl-4"><p className="font-medium text-card-foreground">School holiday reminder</p><p className="mt-1 text-sm text-muted-foreground">The school will be closed on October 21.</p></div></div></article><article className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-semibold text-card-foreground">Quick links</h2><button className="text-sm font-semibold text-primary">See all</button></div><div className="mt-4 grid grid-cols-2 gap-3"><button className="flex items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-secondary"><FileText className="text-primary" /><span className="text-sm font-medium">Report cards</span></button><button className="flex items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-secondary"><WalletCards className="text-primary" /><span className="text-sm font-medium">Payments</span></button><button className="flex items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-secondary"><MessageSquare className="text-primary" /><span className="text-sm font-medium">Contact school</span></button><button className="flex items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-secondary"><CalendarDays className="text-primary" /><span className="text-sm font-medium">School calendar</span></button></div></article></div></>
}

export default function Page() {
  const [role, setRole] = useState<Role>('staff')
  const [active, setActive] = useState('Overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const switchRole = (next: Role) => { setRole(next); setActive(next === 'admin' ? 'Admin overview' : next === 'staff' ? 'Overview' : 'My dashboard') }
  return <main className="min-h-screen bg-background"><div className="flex min-h-screen"><Sidebar role={role} active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} /><div className="min-w-0 flex-1"><header className="flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 sm:px-8"><div className="flex items-center gap-3"><button className="rounded-xl p-2 text-muted-foreground hover:bg-secondary lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu /></button><div className="relative hidden md:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input aria-label="Search" placeholder="Search students, classes..." className="h-10 w-64 rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></div></div><div className="flex items-center gap-3"><div className="flex rounded-xl border border-border bg-card p-1"><button onClick={() => switchRole('admin')} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${role === 'admin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Admin</button><button onClick={() => switchRole('staff')} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${role === 'staff' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Staff</button><button onClick={() => switchRole('client')} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${role === 'client' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Client</button></div><button className="relative rounded-xl p-2 text-muted-foreground hover:bg-secondary" aria-label="Notifications"><Bell /><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" /></button><div className="hidden items-center gap-2 border-l border-border pl-3 sm:flex"><div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{role === 'admin' ? 'AD' : role === 'staff' ? 'AK' : 'JD'}</div><div className="hidden lg:block"><p className="text-sm font-semibold text-foreground">{role === 'admin' ? 'Amara Daniels' : role === 'staff' ? 'Aisha Khan' : 'Jordan Davis'}</p><p className="text-xs text-muted-foreground">{role === 'admin' ? 'School administrator' : role === 'staff' ? 'Branch coordinator' : 'Parent account'}</p></div><ChevronDown className="text-muted-foreground" /></div></div></header><div className="mx-auto flex max-w-[1500px] flex-col gap-7 p-5 sm:p-8">{role === 'client' ? <ClientDashboard /> : <StaffDashboard />}</div></div></div></main>
}

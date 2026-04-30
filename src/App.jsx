import { useMemo, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { appointments as initialAppointments, records as initialRecords, services as initialServices, monthly } from './data/sampleData'

const card = 'rounded-2xl bg-white p-4 shadow-sm border border-rose-100'

function currency(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export default function App() {
  const [records, setRecords] = useState(initialRecords)
  const [services, setServices] = useState(initialServices)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [view, setView] = useState('dashboard')

  const metrics = useMemo(() => {
    const income = records.reduce((s, r) => s + r.charged, 0)
    const expense = records.reduce((s, r) => s + r.cost, 0)
    const clients = [...new Set(records.map((r) => r.client))].length
    const avg = records.length ? income / records.length : 0
    const byService = records.reduce((acc, r) => ({ ...acc, [r.service]: (acc[r.service] || 0) + 1 }), {})
    const topService = Object.entries(byService).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
    return { income, expense, net: income - expense, clients, avg, topService }
  }, [records])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="mx-auto flex max-w-7xl gap-4 p-4">
        <aside className="w-64 rounded-3xl bg-white p-4 shadow-sm border border-rose-100 hidden md:block">
          <h1 className="text-xl font-semibold text-mauve">Brillo & Liso</h1>
          <p className="text-sm text-slate-500 mb-4">Gestión de peluquería</p>
          {['dashboard', 'datos', 'agenda', 'servicios', 'clientes', 'metricas', 'proyeccion'].map((item) => (
            <button key={item} onClick={() => setView(item)} className={`w-full text-left px-3 py-2 rounded-xl mb-1 ${view === item ? 'bg-rose-100 text-rose-700' : 'hover:bg-rose-50'}`}>
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </aside>
        <main className="flex-1 space-y-4">
          <div className="md:hidden flex gap-2 overflow-auto pb-2">{['dashboard', 'datos', 'agenda', 'servicios', 'clientes', 'metricas', 'proyeccion'].map((item) => <button key={item} onClick={() => setView(item)} className="px-3 py-2 rounded-xl bg-white border border-rose-100 text-sm">{item}</button>)}</div>

          {view === 'dashboard' && <Dashboard metrics={metrics} appointments={appointments} />}
          {view === 'datos' && <DataEntry setRecords={setRecords} />}
          {view === 'agenda' && <Agenda appointments={appointments} setAppointments={setAppointments} />}
          {view === 'servicios' && <ServiceManager services={services} setServices={setServices} />}
          {view === 'clientes' && <Clients records={records} />}
          {view === 'metricas' && <Metrics services={services} />}
          {view === 'proyeccion' && <Projection metrics={metrics} />}
        </main>
      </div>
    </div>
  )
}

function Dashboard({ metrics, appointments }) {
  const next = appointments.filter((a) => a.status !== 'cancelado').slice(0, 4)
  const data = [
    ['Ingresos', currency(metrics.income)], ['Egresos', currency(metrics.expense)], ['Ganancia neta', currency(metrics.net)],
    ['Clientes', metrics.clients], ['Ticket promedio', currency(metrics.avg)], ['Servicio más vendido', metrics.topService],
  ]
  return <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{data.map(([k, v]) => <div key={k} className={card}><p className="text-sm text-slate-500">{k}</p><p className="text-xl font-semibold">{v}</p></div>)}<div className={`${card} md:col-span-2 xl:col-span-3`}><h3 className="font-semibold mb-2">Próximos turnos</h3>{next.map((a) => <p key={a.id} className="text-sm">{a.date} {a.time} · {a.client} · {a.service}</p>)}</div></div>
}

function DataEntry({ setRecords }) {
  const [form, setForm] = useState({ date: '', client: '', phone: '', service: '', charged: '', cost: '', payment: '', notes: '' })
  return <div className={card}><h2 className="font-semibold mb-3">Carga de datos</h2><div className="grid md:grid-cols-2 gap-3">{Object.keys(form).map((k) => <input key={k} placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="rounded-xl border border-rose-200 px-3 py-2" />)}</div><button onClick={() => setRecords((prev) => [...prev, { ...form, id: Date.now(), charged: Number(form.charged), cost: Number(form.cost) }])} className="mt-3 rounded-xl bg-rose-600 text-white px-4 py-2">Guardar registro</button></div>
}

function Agenda({ appointments, setAppointments }) {
  const [newApp, setNewApp] = useState({ date: '', time: '', client: '', service: '', status: 'pendiente' })
  return <div className={card}><h2 className="font-semibold mb-2">Agenda semanal y mensual</h2><div className="grid md:grid-cols-2 gap-2 mb-3">{appointments.map((a) => <div key={a.id} className="rounded-xl border border-rose-100 p-2 text-sm">{a.date} {a.time} - {a.client} ({a.status})</div>)}</div><div className="grid md:grid-cols-5 gap-2">{Object.keys(newApp).map((k) => <input key={k} value={newApp[k]} onChange={(e) => setNewApp({ ...newApp, [k]: e.target.value })} placeholder={k} className="rounded-xl border border-rose-200 px-2 py-1" />)}</div><button onClick={() => setAppointments((p) => [...p, { ...newApp, id: Date.now() }])} className="mt-3 rounded-xl bg-purple-600 text-white px-4 py-2">Agregar nuevo turno</button></div>
}

function ServiceManager({ services, setServices }) {
  const [draft, setDraft] = useState({ name: '', price: '', duration: '', cost: '' })
  return <div className={card}><h2 className="font-semibold mb-2">Gestión de servicios</h2>{services.map((s) => <div key={s.id} className="rounded-xl border border-rose-100 p-2 mb-2 flex justify-between text-sm"><span>{s.name} · {currency(s.price)} · {s.duration} min · Margen {Math.round(((s.price - s.cost) / s.price) * 100)}%</span><button onClick={() => setServices((prev) => prev.filter((x) => x.id !== s.id))} className="text-rose-600">Eliminar</button></div>)}<div className="grid md:grid-cols-4 gap-2">{Object.keys(draft).map((k) => <input key={k} placeholder={k} value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} className="rounded-xl border border-rose-200 px-2 py-1" />)}</div><button className="mt-3 rounded-xl bg-rose-600 text-white px-4 py-2" onClick={() => setServices((p) => [...p, { ...draft, id: Date.now(), price: Number(draft.price), duration: Number(draft.duration), cost: Number(draft.cost), sold: 0 }])}>Agregar servicio</button></div>
}

function Clients({ records }) {
  const data = Object.values(records.reduce((acc, r) => {
    acc[r.client] = acc[r.client] || { name: r.client, visits: 0, spent: 0, lastVisit: r.date }
    acc[r.client].visits += 1
    acc[r.client].spent += r.charged
    if (r.date > acc[r.client].lastVisit) acc[r.client].lastVisit = r.date
    return acc
  }, {}))
  return <div className={card}><h2 className="font-semibold mb-2">Gestión de clientes</h2>{data.map((c) => <div key={c.name} className="rounded-xl border border-rose-100 p-2 mb-2"><p className="font-medium">{c.name}</p><p className="text-sm">Historial de visitas: {c.visits} · Gasto total: {currency(c.spent)} · Última visita: {c.lastVisit}</p><p className="text-sm text-slate-500">Notas importantes: seguimiento personalizado y recordatorio de turno.</p></div>)}</div>
}

function Metrics({ services }) {
  const incomeChart = monthly.map((m) => ({ ...m, gain: m.income - m.expense }))
  const rank = [...services].sort((a, b) => b.sold - a.sold)
  return <div className="space-y-4"><div className={`${card} h-80`}><h2 className="font-semibold mb-2">Ingresos por mes y evolución de ganancias</h2><ResponsiveContainer width="100%" height="90%"><LineChart data={incomeChart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="income" stroke="#be185d" /><Line type="monotone" dataKey="gain" stroke="#7e22ce" /></LineChart></ResponsiveContainer></div><div className={`${card} h-72`}><h2 className="font-semibold mb-2">Ranking de servicios más vendidos</h2><ResponsiveContainer width="100%" height="90%"><BarChart data={rank}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="sold" fill="#c08497" /></BarChart></ResponsiveContainer></div></div>
}

function Projection({ metrics }) {
  const [weeklyTurns, setWeeklyTurns] = useState(25)
  const [clientGrowth, setClientGrowth] = useState(12)
  const [premiumRate, setPremiumRate] = useState(20)
  const estimated = Math.round(weeklyTurns * metrics.avg * 4.2 * (1 + clientGrowth / 100) * (1 + premiumRate / 200))

  return <div className={card}><h2 className="font-semibold mb-2">Proyección de crecimiento</h2><div className="grid md:grid-cols-3 gap-3 text-sm"><label>Turnos semanales<input type="range" min="5" max="80" value={weeklyTurns} onChange={(e) => setWeeklyTurns(Number(e.target.value))} className="w-full" />{weeklyTurns}</label><label>Aumento de clientes (%)<input type="range" min="0" max="50" value={clientGrowth} onChange={(e) => setClientGrowth(Number(e.target.value))} className="w-full" />{clientGrowth}%</label><label>Servicios premium (%)<input type="range" min="0" max="80" value={premiumRate} onChange={(e) => setPremiumRate(Number(e.target.value))} className="w-full" />{premiumRate}%</label></div><p className="mt-4 text-lg">Ganancia estimada mensual: <span className="font-semibold text-rose-700">{currency(estimated)}</span></p><p className="text-sm text-slate-500">Basado en ticket promedio actual, aumento de clientes y adopción de servicios premium.</p></div>
}

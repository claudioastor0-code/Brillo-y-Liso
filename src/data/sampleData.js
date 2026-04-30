export const services = [
  { id: 1, name: 'Corte femenino', price: 18000, duration: 50, cost: 6000, sold: 48 },
  { id: 2, name: 'Coloración completa', price: 42000, duration: 130, cost: 17000, sold: 31 },
  { id: 3, name: 'Brushing', price: 14000, duration: 40, cost: 4000, sold: 54 },
  { id: 4, name: 'Nutrición capilar premium', price: 36000, duration: 75, cost: 12000, sold: 19 },
]

export const records = [
  { id: 1, date: '2026-04-04', client: 'María López', phone: '11-4567-3321', service: 'Corte femenino', charged: 18000, cost: 6000, payment: 'Transferencia', notes: 'Prefiere turno temprano' },
  { id: 2, date: '2026-04-06', client: 'Lucía Pérez', phone: '11-5521-9488', service: 'Brushing', charged: 14000, cost: 4000, payment: 'Efectivo', notes: 'Producto anti-frizz recomendado' },
  { id: 3, date: '2026-04-08', client: 'Camila Ruiz', phone: '11-7894-1152', service: 'Coloración completa', charged: 42000, cost: 17000, payment: 'Tarjeta', notes: 'Primer cambio de tono' },
  { id: 4, date: '2026-04-10', client: 'Sofía Gómez', phone: '11-9642-5561', service: 'Nutrición capilar premium', charged: 36000, cost: 12000, payment: 'Transferencia', notes: 'Alérgica a sulfatos' },
  { id: 5, date: '2026-04-15', client: 'María López', phone: '11-4567-3321', service: 'Brushing', charged: 14000, cost: 4000, payment: 'Efectivo', notes: 'Cliente frecuente' },
  { id: 6, date: '2026-04-20', client: 'Valentina Díaz', phone: '11-3399-1100', service: 'Coloración completa', charged: 42000, cost: 17000, payment: 'Tarjeta', notes: 'Quiere mantener color cada 6 semanas' },
]

export const appointments = [
  { id: 1, date: '2026-05-01', time: '09:00', client: 'María López', service: 'Corte femenino', status: 'confirmado' },
  { id: 2, date: '2026-05-01', time: '12:00', client: 'Lucía Pérez', service: 'Brushing', status: 'pendiente' },
  { id: 3, date: '2026-05-02', time: '11:00', client: 'Camila Ruiz', service: 'Coloración completa', status: 'confirmado' },
  { id: 4, date: '2026-05-03', time: '17:00', client: 'Sofía Gómez', service: 'Nutrición capilar premium', status: 'realizado' },
  { id: 5, date: '2026-05-05', time: '10:30', client: 'Valentina Díaz', service: 'Corte femenino', status: 'cancelado' },
]

export const monthly = [
  { month: 'Ene', income: 210000, expense: 83000 },
  { month: 'Feb', income: 245000, expense: 95000 },
  { month: 'Mar', income: 275000, expense: 104000 },
  { month: 'Abr', income: 312000, expense: 116000 },
]

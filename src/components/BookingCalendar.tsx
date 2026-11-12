import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './BookingCalendar.css'

const bookingServices = [
  'Corte infantil',
  'Primer corte',
  'Mechitas de colores',
  'Corte para hermanos (2 por $200)',
  'Peinados de fantasía',
  'Pinta caritas',
]

const whatsappNumber = '524921255814'
const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function dateKey(date: Date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(date)
}

function getSuggestedTimes(date: Date) {
  const weekend = date.getDay() === 0 || date.getDay() === 6
  const openingMinutes = weekend ? 10 * 60 : 13 * 60
  const closingMinutes = weekend ? 17 * 60 : 19 * 60
  const times: string[] = []

  for (let time = openingMinutes; time + 45 <= closingMinutes; time += 45) {
    times.push(String(Math.floor(time / 60)).padStart(2, '0') + ':' + String(time % 60).padStart(2, '0'))
  }
  return times
}

export default function BookingCalendar() {
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [customerName, setCustomerName] = useState('')

  const firstWeekday = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const calendarCells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1)),
  ]
  const times = selectedDate ? getSuggestedTimes(selectedDate) : []

  const changeMonth = (offset: number) => {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
    setSelectedDate(null)
    setSelectedTime('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedDate || !selectedTime || !selectedService) return

    const message = [
      'Hola, quiero solicitar una cita en Pingo Club.',
      'Nombre: ' + customerName.trim(),
      'Servicio: ' + selectedService,
      'Fecha: ' + formatDate(selectedDate),
      'Hora solicitada: ' + selectedTime,
      '¿Me confirman si este horario está disponible?',
    ].join('\n')

    window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="booking-section section-pad" id="citas" aria-labelledby="booking-title">
      <div className="section-kicker">03 / TU VISITA PINGO</div>
      <div className="booking-heading">
        <div>
          <h2 id="booking-title">Agenda un momento<br /><span>para sonreír.</span></h2>
          <p>Elige el día, la hora y el servicio. Te ayudamos a coordinar la visita por WhatsApp.</p>
        </div>
        <span className="booking-duration"><b>45</b> min<br />por cita</span>
      </div>

      <form className="booking-card" onSubmit={handleSubmit} aria-labelledby="booking-form-title">
        <div className="booking-calendar-panel">
          <div className="booking-panel-title">
            <div><span className="booking-step">PASO 1</span><h3 id="booking-form-title">Elige un día</h3></div>
            <div className="month-controls">
              <button type="button" aria-label="Mes anterior" onClick={() => changeMonth(-1)} disabled={month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth()}>‹</button>
              <span>{new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(month)}</span>
              <button type="button" aria-label="Mes siguiente" onClick={() => changeMonth(1)}>›</button>
            </div>
          </div>
          <div className="calendar-grid" role="grid" aria-label="Calendario de citas">
            {weekdays.map((day) => <span className="calendar-weekday" key={day} role="columnheader">{day}</span>)}
            {calendarCells.map((date, index) => {
              if (!date) return <span className="calendar-empty" aria-hidden="true" key={'empty-' + index} />
              const isPast = date < today
              const isSelected = selectedDate !== null && dateKey(date) === dateKey(selectedDate)
              const isToday = dateKey(date) === dateKey(today)
              return <button
                type="button"
                role="gridcell"
                className={'calendar-day' + (isSelected ? ' is-selected' : '') + (isToday ? ' is-today' : '')}
                key={dateKey(date)}
                aria-label={formatDate(date)}
                aria-pressed={isSelected}
                disabled={isPast}
                onClick={() => { setSelectedDate(date); setSelectedTime('') }}
              >{date.getDate()}</button>
            })}
          </div>
          <p className="booking-hours-note"><span aria-hidden="true">✳</span> Lun–vie 1:00–7:00 p. m. · Sáb–dom 10:00 a. m.–5:00 p. m.</p>
        </div>

        <div className="booking-details-panel">
          <div className="booking-step">PASO 2</div>
          <h3>{selectedDate ? 'Horarios para el ' + formatDate(selectedDate) : 'Primero elige una fecha'}</h3>
          {selectedDate ? <>
            <p className="slot-disclaimer">Selecciona una hora para solicitar. Confirmaremos disponibilidad por WhatsApp.</p>
            <div className="time-slots" aria-label="Horas para solicitar">
              {times.map((time) => <button type="button" className={selectedTime === time ? 'time-slot is-selected' : 'time-slot'} key={time} aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}>{time}</button>)}
            </div>
          </> : <p className="slot-placeholder">Al seleccionar el día verás los horarios de atención para solicitar.</p>}

          <label className="booking-field" htmlFor="booking-service">
            <span>Servicio</span>
            <select id="booking-service" name="service" required value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>
              <option value="">Selecciona un servicio</option>
              {bookingServices.map((service) => <option value={service} key={service}>{service}</option>)}
            </select>
          </label>
          <label className="booking-field" htmlFor="booking-name">
            <span>Nombre de mamá, papá o tutor</span>
            <input id="booking-name" name="customer_name" autoComplete="name" required maxLength={80} value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Tu nombre" />
          </label>
          <button className="booking-submit" type="submit" disabled={!selectedDate || !selectedTime || !selectedService || !customerName.trim()}>
            Solicitar por WhatsApp <span aria-hidden="true">↗</span>
          </button>
          <p className="booking-confirmation-note" role="status">La cita no queda confirmada al elegirla. WhatsApp abrirá un mensaje para coordinar y confirmar con Pingo Club.</p>
        </div>
      </form>
    </section>
  )
}

import { useMemo, useRef, useState } from 'react'
import {
  Camera,
  Check,
  Copy,
  ImageUp,
  Images,
  Plus,
  Receipt,
  RotateCcw,
  Trash2,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

interface Person {
  id: string
  name: string
  color: string
}

interface Item {
  id: string
  dish: string
  amount: number
  personIds: string[]
  x: number
  y: number
}

const PERSON_COLORS = [
  '#f59e0b',
  '#22c55e',
  '#3b82f6',
  '#ec4899',
  '#a855f7',
  '#ef4444',
  '#06b6d4',
  '#eab308',
]

function formatMoney(n: number) {
  return n.toLocaleString('es-CO', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export default function BillSplitter() {
  const [photo, setPhoto] = useState<string | null>(null)
  const [people, setPeople] = useState<Person[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [newPersonName, setNewPersonName] = useState('')
  const [pendingMark, setPendingMark] = useState<{ x: number; y: number } | null>(null)
  const [formDish, setFormDish] = useState('')
  const [formAmount, setFormAmount] = useState('')
  const [formPeople, setFormPeople] = useState<string[]>([])
  const [extraCharge, setExtraCharge] = useState('')
  const [extraMode, setExtraMode] = useState<'proportional' | 'equal'>('proportional')
  const [copied, setCopied] = useState(false)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const libraryInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const addPerson = () => {
    const name = newPersonName.trim()
    if (!name) return
    const color = PERSON_COLORS[people.length % PERSON_COLORS.length]
    setPeople([...people, { id: uid(), name, color }])
    setNewPersonName('')
  }

  const removePerson = (id: string) => {
    setPeople(people.filter((p) => p.id !== id))
    setItems(items.map((it) => ({ ...it, personIds: it.personIds.filter((pid) => pid !== id) })))
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (people.length === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPendingMark({ x, y })
    setFormDish('')
    setFormAmount('')
    setFormPeople([])
  }

  const togglePersonForItem = (id: string) => {
    setFormPeople((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const confirmMark = () => {
    const amount = Number.parseFloat(formAmount)
    if (!formDish.trim() || !Number.isFinite(amount) || amount <= 0 || formPeople.length === 0 || !pendingMark) return
    setItems([
      ...items,
      {
        id: uid(),
        dish: formDish.trim(),
        amount,
        personIds: formPeople,
        x: pendingMark.x,
        y: pendingMark.y,
      },
    ])
    setPendingMark(null)
    setFormDish('')
    setFormAmount('')
    setFormPeople([])
  }

  const addItemManually = () => {
    setPendingMark({ x: 50, y: 50 })
    setFormDish('')
    setFormAmount('')
    setFormPeople([])
  }

  const removeItem = (id: string) => setItems(items.filter((it) => it.id !== id))

  const totals = useMemo(() => {
    const byPerson: Record<string, number> = {}
    for (const p of people) byPerson[p.id] = 0

    for (const item of items) {
      const share = item.amount / item.personIds.length
      for (const pid of item.personIds) {
        if (byPerson[pid] === undefined) continue
        byPerson[pid] += share
      }
    }

    const subtotal = Object.values(byPerson).reduce((a, b) => a + b, 0)
    const extra = Number.parseFloat(extraCharge) || 0

    const finalTotals: Record<string, number> = { ...byPerson }
    if (extra > 0 && subtotal > 0) {
      if (extraMode === 'proportional') {
        for (const p of people) {
          finalTotals[p.id] = byPerson[p.id] + (byPerson[p.id] / subtotal) * extra
        }
      } else {
        const peopleWithItems = people.filter((p) => byPerson[p.id] > 0)
        const share = extra / (peopleWithItems.length || people.length || 1)
        for (const p of people) {
          finalTotals[p.id] = byPerson[p.id] + (byPerson[p.id] > 0 ? share : 0)
        }
      }
    }

    const grandTotal = Object.values(finalTotals).reduce((a, b) => a + b, 0)
    return { byPerson: finalTotals, subtotal, grandTotal, extra }
  }, [people, items, extraCharge, extraMode])

  const reset = () => {
    setPhoto(null)
    setPeople([])
    setItems([])
    setPendingMark(null)
    setExtraCharge('')
    if (cameraInputRef.current) cameraInputRef.current.value = ''
    if (libraryInputRef.current) libraryInputRef.current.value = ''
  }

  const copySummary = () => {
    const lines = [
      'Resumen de la cuenta',
      ...people.map((p) => `${p.name}: ${formatMoney(totals.byPerson[p.id] || 0)}`),
      `Total: ${formatMoney(totals.grandTotal)}`,
    ]
    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900/60 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-6 w-6 text-amber-400" />
            <h1 className="text-lg font-bold">Divide la Cuenta</h1>
          </div>
          {(photo || people.length > 0 || items.length > 0) && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reiniciar
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6">
          {!photo ? (
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center bg-gray-900/40">
              <ImageUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Sube la foto de la factura</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Toma una foto o sube una imagen del recibo para empezar a marcar los platos y dividir la cuenta entre tus amigos.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  Tomar foto
                </button>
                <button
                  onClick={() => libraryInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Images className="h-5 w-5" />
                  Elegir de galería
                </button>
              </div>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <input
                ref={libraryInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div
                ref={imageRef}
                onClick={handleImageClick}
                className={`relative rounded-xl overflow-hidden border border-gray-800 bg-black select-none ${
                  people.length > 0 ? 'cursor-crosshair' : 'cursor-not-allowed'
                }`}
              >
                <img src={photo} alt="Factura" className="w-full h-auto block" draggable={false} />
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-gray-900 shadow-lg ring-2 ring-white/80"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      backgroundColor: item.personIds.length === 1
                        ? people.find((p) => p.id === item.personIds[0])?.color || '#f59e0b'
                        : '#f59e0b',
                    }}
                    title={item.dish}
                  >
                    {idx + 1}
                  </div>
                ))}
                {pendingMark && (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-dashed border-amber-400 animate-pulse"
                    style={{ left: `${pendingMark.x}%`, top: `${pendingMark.y}%` }}
                  />
                )}
              </div>
              {people.length === 0 ? (
                <p className="text-sm text-amber-400">Agrega al menos una persona antes de marcar los platos.</p>
              ) : (
                <p className="text-sm text-gray-400">
                  Toca sobre el plato en la foto para marcarlo, o usa "Agregar plato" para hacerlo manualmente.
                </p>
              )}
              <button
                onClick={addItemManually}
                disabled={people.length === 0}
                className="inline-flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Agregar plato manualmente
              </button>
            </div>
          )}

          {items.length > 0 && (
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
              <h3 className="font-semibold mb-4">Platos marcados</h3>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-gray-800/60 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 text-gray-900 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{item.dish}</div>
                        <div className="text-xs text-gray-400 truncate">
                          {item.personIds
                            .map((pid) => people.find((p) => p.id === pid)?.name)
                            .filter(Boolean)
                            .join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-semibold text-amber-400">{formatMoney(item.amount)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-400" />
              Personas
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPerson()}
                placeholder="Nombre"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={addPerson}
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-lg px-3 flex items-center justify-center transition-colors"
              >
                <UserPlus className="h-4 w-4" />
              </button>
            </div>
            {people.length === 0 ? (
              <p className="text-sm text-gray-500">Aún no has agregado a nadie.</p>
            ) : (
              <ul className="space-y-2">
                {people.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </span>
                    <button
                      onClick={() => removePerson(p.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
              <h3 className="font-semibold mb-4">Propina / cargos extra</h3>
              <input
                type="number"
                min="0"
                step="0.01"
                value={extraCharge}
                onChange={(e) => setExtraCharge(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-amber-400"
              />
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setExtraMode('proportional')}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    extraMode === 'proportional' ? 'bg-amber-400 text-gray-900 font-semibold' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  Proporcional
                </button>
                <button
                  onClick={() => setExtraMode('equal')}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    extraMode === 'equal' ? 'bg-amber-400 text-gray-900 font-semibold' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  En partes iguales
                </button>
              </div>
            </div>
          )}

          {people.length > 0 && items.length > 0 && (
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
              <h3 className="font-semibold mb-4">Total por persona</h3>
              <ul className="space-y-3 mb-4">
                {people.map((p) => (
                  <li key={p.id} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </span>
                    <span className="font-bold text-amber-400">{formatMoney(totals.byPerson[p.id] || 0)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-800 pt-3 flex items-center justify-between font-bold">
                <span>Total</span>
                <span>{formatMoney(totals.grandTotal)}</span>
              </div>
              <button
                onClick={copySummary}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-sm py-2 rounded-lg transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copiado' : 'Copiar resumen'}
              </button>
            </div>
          )}
        </aside>
      </main>

      {pendingMark && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Marcar plato</h3>
              <button onClick={() => setPendingMark(null)} className="text-gray-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <label className="block text-xs text-gray-400 mb-1">Nombre del plato</label>
            <input
              autoFocus
              value={formDish}
              onChange={(e) => setFormDish(e.target.value)}
              placeholder="Ej: Hamburguesa"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-amber-400"
            />
            <label className="block text-xs text-gray-400 mb-1">Monto</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formAmount}
              onChange={(e) => setFormAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-amber-400"
            />
            <label className="block text-xs text-gray-400 mb-2">¿Quién lo pide?</label>
            <div className="flex flex-wrap gap-2 mb-5">
              {people.map((p) => (
                <button
                  key={p.id}
                  onClick={() => togglePersonForItem(p.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    formPeople.includes(p.id)
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-gray-700 text-gray-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </button>
              ))}
            </div>
            <button
              onClick={confirmMark}
              disabled={!formDish.trim() || !formAmount || formPeople.length === 0}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-900 font-bold py-2.5 rounded-lg transition-colors"
            >
              Agregar plato
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

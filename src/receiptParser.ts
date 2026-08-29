export interface ParsedItem {
  dish: string
  amount: number
}

const NOISE_KEYWORDS = [
  'total',
  'subtotal',
  'sub total',
  'iva',
  'impuesto',
  'servicio',
  'propina',
  'cambio',
  'vuelto',
  'recibido',
  'efectivo',
  'tarjeta',
  'credito',
  'crédito',
  'debito',
  'débito',
  'gracias',
  'factura',
  'nit',
  'rtn',
  'cufe',
  'mesa',
  'mesero',
  'mesera',
  'cajero',
  'cajera',
  'caja',
  'fecha',
  'hora',
  'cliente',
  'direccion',
  'dirección',
  'telefono',
  'teléfono',
  'resolucion',
  'resolución',
  'consecutivo',
  'autorizacion',
  'autorización',
  'vendedor',
  'orden',
  'pedido',
  'descuento',
  'punto de venta',
  'terminal',
  'www.',
  '.com',
]

const MAX_AMOUNT = 999_999
const MAX_ITEMS = 30

function normalizeAmount(raw: string): number | null {
  let s = raw.replace(/[^\d.,]/g, '')
  if (!s) return null

  const lastComma = s.lastIndexOf(',')
  const lastDot = s.lastIndexOf('.')

  if (lastComma !== -1 && lastDot !== -1) {
    if (lastComma > lastDot) {
      s = s.replace(/\./g, '').replace(',', '.')
    } else {
      s = s.replace(/,/g, '')
    }
  } else if (lastComma !== -1) {
    const decimals = s.length - lastComma - 1
    s = decimals === 2 ? s.replace(',', '.') : s.replace(/,/g, '')
  } else if (lastDot !== -1) {
    const decimals = s.length - lastDot - 1
    if (decimals === 3) s = s.replace(/\./g, '')
  }

  const n = Number.parseFloat(s)
  return Number.isFinite(n) ? n : null
}

function parseLine(line: string): ParsedItem | null {
  const trimmed = line.trim()
  if (trimmed.length < 3) return null

  const lower = trimmed.toLowerCase()
  if (NOISE_KEYWORDS.some((k) => lower.includes(k))) return null

  const match = trimmed.match(/([\d][\d.,]*\d|\d)\s*$/)
  if (!match || match.index === undefined) return null

  const amount = normalizeAmount(match[1])
  if (amount === null || amount <= 0 || amount > MAX_AMOUNT) return null

  let dish = trimmed.slice(0, match.index).trim()
  dish = dish.replace(/^[$\-–—.:]+/, '').trim()
  dish = dish.replace(/^\d+\s*[xX]\s*/, '')
  dish = dish.replace(/^\d+\s+/, '')
  dish = dish.replace(/[$\-–—.:]+$/, '').trim()

  const letterCount = (dish.match(/[a-zA-ZÀ-ÿ]/g) || []).length
  if (letterCount < 2) return null

  return { dish: dish.length > 60 ? dish.slice(0, 60) : dish, amount }
}

export function parseReceiptText(text: string): ParsedItem[] {
  const results: ParsedItem[] = []
  for (const line of text.split(/\r?\n/)) {
    const parsed = parseLine(line)
    if (parsed) results.push(parsed)
    if (results.length >= MAX_ITEMS) break
  }
  return results
}

/**
 * Framework de hooking e inicio de videos.
 *
 * Basado en la lógica del reel de @epifaniaemprendedora (Beltrán Briones):
 * "Apuntarle a todo el mundo es la forma más rápida de no venderle a nadie".
 * El hook de FILTRO le habla en los primeros segundos al perfil exacto del
 * comprador; el algoritmo entrega el video a quien encaja y quien no encaja
 * se va solo ("se van todos corriendo").
 *
 * Estructura del video analizado (57 s):
 *   0-3s    Insight/tesis        "el algoritmo funciona cada vez mejor"
 *   3-20s   HOOK DE FILTRO       "si sos [perfil], tenés [edad], [situación]..."
 *   20-23s  Puente a la oferta   "dejame mostrarte este proyecto en Palermo"
 *   23-26s  Prueba               "empezaron a seguirme 300 jugadores"
 *   26-31s  Réplica              "lo mismo con el rugby, con el polo"
 *   31-40s  Objeción + remate    "no apuntes a este nicho" -> "me siguen todos"
 *   41-57s  Segundo ejemplo      corbata/Recoleta + cierre "le pegás al target"
 */

export type HookType =
  | 'filtro' // habla al perfil exacto (el del reel)
  | 'resultado' // empieza por el resultado
  | 'contradiccion' // rompe una creencia común
  | 'pregunta' // pregunta que el perfil se hace
  | 'error' // error costoso que comete el perfil

export interface Brief {
  /** Quién es el comprador ideal. Ej: "futbolista de primera división" */
  perfil: string
  /** Rasgos que filtran (edad, ingreso, ciudad, etapa). Ej: ["25 a 30 años", "ganas muy bien"] */
  filtros: string[]
  /** Dolor o deseo sin resolver. Ej: "no sabés qué hacer con tus ahorros" */
  tension: string
  /** Oferta concreta. Ej: "este proyecto de departamentos en Palermo" */
  oferta: string
  /** Prueba corta y numérica, opcional. Ej: "300 jugadores me siguieron" */
  prueba?: string
  /** Resultado deseable para hooks de tipo resultado. */
  resultado?: string
  /** Creencia común a romper, para tipo contradiccion. */
  creenciaComun?: string
  /** Error costoso del perfil, para tipo error. */
  errorComun?: string
}

export interface HookVariant {
  tipo: HookType
  texto: string
  /** Texto corto para overlay fijo en pantalla (≤ 8 palabras). */
  overlay: string
}

const lista = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`

/** Genera un hook por cada tipo posible con la información del brief. */
export function generarHooks(b: Brief): HookVariant[] {
  const out: HookVariant[] = []

  out.push({
    tipo: 'filtro',
    texto: `Hola, si sos ${b.perfil}, ${lista(b.filtros)} y ${b.tension}, dejame mostrarte ${b.oferta}.`,
    overlay: `Si sos ${b.perfil}`,
  })

  if (b.resultado) {
    out.push({
      tipo: 'resultado',
      texto: `${b.resultado}. Esto es lo que hice para ${b.perfil} que ${b.tension}.`,
      overlay: b.resultado,
    })
  }

  if (b.creenciaComun) {
    out.push({
      tipo: 'contradiccion',
      texto: `${b.creenciaComun} es falso si sos ${b.perfil}. Te explico por qué.`,
      overlay: `Mito para ${b.perfil}`,
    })
  }

  out.push({
    tipo: 'pregunta',
    texto: `¿Sos ${b.perfil}, ${lista(b.filtros)} y todavía ${b.tension}?`,
    overlay: `¿Sos ${b.perfil}?`,
  })

  if (b.errorComun) {
    out.push({
      tipo: 'error',
      texto: `Si sos ${b.perfil}, estás cometiendo este error: ${b.errorComun}.`,
      overlay: `Error de ${b.perfil}`,
    })
  }

  return out
}

/** Guion completo de apertura siguiendo la estructura del reel. */
export interface Beat {
  rango: string
  funcion: string
  guia: string
  texto: string
}

export function guionDeInicio(b: Brief): Beat[] {
  const hook = generarHooks(b)[0]
  return [
    {
      rango: '0-3s',
      funcion: 'Filtro',
      guia: 'Nombra al perfil exacto. Sin saludo largo ni presentación.',
      texto: `Si sos ${b.perfil}, ${lista(b.filtros)}...`,
    },
    {
      rango: '3-8s',
      funcion: 'Tensión',
      guia: 'Dolor o deseo sin resolver, en lenguaje del perfil.',
      texto: `...y ${b.tension}.`,
    },
    {
      rango: '8-12s',
      funcion: 'Puente a la oferta',
      guia: 'Una sola cosa concreta, con lugar o nombre propio.',
      texto: `Dejame mostrarte ${b.oferta}.`,
    },
    {
      rango: '12-20s',
      funcion: 'Prueba',
      guia: 'Número o caso real. Corto.',
      texto: b.prueba ?? '[agrega un número o caso real]',
    },
    {
      rango: '20-30s',
      funcion: 'Réplica',
      guia: 'Muestra que funciona en otro nicho: el filtro es repetible.',
      texto: 'Lo mismo hice con [otro perfil] y [otro perfil].',
    },
    {
      rango: '30-40s',
      funcion: 'Objeción y remate',
      guia: 'Trae la duda ("no apuntes tan chico") y refútala con un resultado.',
      texto: 'Me decían que era muy chico... y [resultado que lo desmiente].',
    },
    {
      rango: 'cierre',
      funcion: 'Reencuadre',
      guia: 'Cierra con la idea central: hablarle a uno le llega al target.',
      texto: `Quien no es ${b.perfil} se va; quien sí lo es, se queda. Ese es el filtro. (${hook.overlay})`,
    },
  ]
}

/** Checklist visual/de edición observada en el reel. */
export const checklistProduccion: readonly string[] = [
  'Overlay fijo arriba/centro con la promesa del video durante todo el clip.',
  'Subtítulos palabra por palabra, grandes, sobre el rostro (nunca tapándolo).',
  'Plano cerrado, fondo oscuro y cálido: foco en la cara y las manos.',
  'Corte de reacción a la otra persona en el momento del remate (~50 s).',
  'Cero intro: la primera palabra ya es el filtro o la tesis.',
  'Subtítulo en color distinto en la frase que cierra la idea.',
]

export interface Puntaje {
  total: number
  detalle: Record<string, number>
  consejos: string[]
}

const GENERICAS = [
  'todos',
  'todo el mundo',
  'cualquiera',
  'emprendedores',
  'personas',
  'gente',
]

/** Puntúa un hook (0-100) por especificidad, tensión y velocidad. */
export function puntuarHook(texto: string): Puntaje {
  const t = texto.toLowerCase()
  const palabras = t.split(/\s+/).filter(Boolean)
  const detalle: Record<string, number> = {}
  const consejos: string[] = []

  // Especificidad: cifras, "si sos/eres", lugares con mayúscula, sin genéricos.
  let esp = 0
  if (/\d/.test(t)) esp += 15
  if (/\bsi (sos|eres|tienes|tenés|tu)\b/.test(t)) esp += 15
  if (/[A-ZÁÉÍÓÚ][a-záéíóú]{3,}/.test(texto.slice(1))) esp += 5
  if (GENERICAS.some((g) => t.includes(g))) {
    esp -= 15
    consejos.push('Evita genéricos ("todos", "gente"): nombra un perfil concreto.')
  }
  detalle.especificidad = Math.max(0, Math.min(35, esp + 10))

  // Tensión: dolor/deseo.
  const tens = /(no sab|no sé|no logr|perd|problema|error|quebr|sin |todavía|aún|miedo|ahorr|ganando)/.test(t)
  detalle.tension = tens ? 25 : 8
  if (!tens) consejos.push('Añade una tensión: algo que el perfil quiere y no tiene resuelto.')

  // Velocidad: ≤ 25 palabras se dicen en ~7 s.
  detalle.velocidad = palabras.length <= 25 ? 20 : palabras.length <= 40 ? 12 : 4
  if (palabras.length > 25) consejos.push('Recorta: el filtro debe caber en ~7 segundos.')

  // Promesa/oferta explícita.
  const promesa = /(mostrar|te explico|te cuento|mirá|mira|descubr|así)/.test(t)
  detalle.promesa = promesa ? 20 : 6
  if (!promesa) consejos.push('Cierra con un puente: "dejame mostrarte…", "te explico…".')

  const total = Object.values(detalle).reduce((a, b) => a + b, 0)
  return { total: Math.min(100, total), detalle, consejos }
}

// Waagerechtes Wischen in einer Sitzung: Finger von links nach rechts = zurück,
// von rechts nach links = wieder vor (nur nach dem Zurückblättern).
// Nur für Finger und Stift – am PC gibt es dafür den Zurück-Knopf.

import { useRef, type MouseEvent, type PointerEvent } from 'react'

/** Abstand zum Bildschirmrand (px): Dort gehört die Geste dem Browser (Safari: Seite zurück) */
const EDGE = 24
/** Weg (px), ab dem sich entscheidet, ob waagerecht oder senkrecht gewischt wird */
const DECIDE = 12
/** Anteil der Breite, ab dem umgeblättert wird */
const DISTANCE = 0.22
/** Schnelles Wischen (px/ms) reicht auch bei kurzem Weg */
const FLICK = 0.5
/** Hier wird nicht geblättert: Code scrollt seitlich, Regler werden gezogen */
const IGNORE = 'pre, .code-block, input, textarea, select'

interface Drag {
  id: number
  x: number
  y: number
  t: number
  dx: number
  active: boolean
}

export function useSwipe<T extends HTMLElement>({
  canBack,
  canForward,
  onBack,
  onForward,
}: {
  canBack: boolean
  canForward: boolean
  onBack: () => void
  onForward: () => void
}) {
  const ref = useRef<T>(null)
  const drag = useRef<Drag | null>(null)
  /** Nach einem Wisch keinen Klick auf den Knopf unter dem Finger auslösen */
  const swallowClick = useRef(false)

  const move = (dx: number, animate: boolean) => {
    const el = ref.current
    if (!el) return
    el.style.transition = animate ? 'transform 0.2s ease' : 'none'
    el.style.transform = dx === 0 ? '' : `translateX(${dx}px)`
  }

  const onPointerDown = (event: PointerEvent<T>) => {
    if (event.pointerType === 'mouse' || (!canBack && !canForward)) return
    if (event.clientX < EDGE || event.clientX > window.innerWidth - EDGE) return
    if ((event.target as Element).closest(IGNORE)) return
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: event.timeStamp, dx: 0, active: false }
  }

  const onPointerMove = (event: PointerEvent<T>) => {
    const d = drag.current
    if (!d || d.id !== event.pointerId) return
    const dx = event.clientX - d.x
    const dy = event.clientY - d.y
    if (!d.active) {
      if (Math.abs(dx) < DECIDE && Math.abs(dy) < DECIDE) return
      // Senkrecht oder in eine Richtung, in die es nicht weitergeht → dem Scrollen überlassen
      if (Math.abs(dy) * 1.2 > Math.abs(dx) || (dx > 0 ? !canBack : !canForward)) {
        drag.current = null
        return
      }
      d.active = true
      try {
        ref.current?.setPointerCapture(event.pointerId)
      } catch {
        // Zeiger schon weg – dann eben ohne Festhalten
      }
    }
    d.dx = dx > 0 ? (canBack ? dx : 0) : canForward ? dx : 0
    move(d.dx, false)
  }

  const end = (event: PointerEvent<T>, cancelled: boolean) => {
    const d = drag.current
    if (!d || d.id !== event.pointerId) return
    drag.current = null
    if (!d.active) return
    swallowClick.current = true
    const width = ref.current?.clientWidth ?? window.innerWidth
    const speed = Math.abs(d.dx) / Math.max(1, event.timeStamp - d.t)
    const far = Math.abs(d.dx) > width * DISTANCE || (speed > FLICK && Math.abs(d.dx) > 40)
    if (cancelled || !far) {
      move(0, true)
      return
    }
    move(0, false)
    if (d.dx > 0) onBack()
    else onForward()
  }

  const onClickCapture = (event: MouseEvent<T>) => {
    if (!swallowClick.current) return
    swallowClick.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: (event: PointerEvent<T>) => end(event, false),
      onPointerCancel: (event: PointerEvent<T>) => end(event, true),
      // Klick kommt nur direkt nach dem Loslassen; spätere Klicks wieder zulassen
      onPointerDownCapture: () => {
        swallowClick.current = false
      },
      onClickCapture,
    },
  }
}

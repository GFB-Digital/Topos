import type { CSSProperties } from 'react'
import type { SessionItem } from '../../lib/session.ts'
import { Icon } from '../Icon.tsx'

/**
 * Leiste oben: ein Punkt pro Seite, ein Schild pro Frage, Ringe für
 * Einleitung und Rückblick. Angehängte Wiederholungen erscheinen hinten.
 * Mit `colorOf` (Wiederholung über mehrere Kurse) hat jedes Schild die Farbe
 * seines Kurses – so sieht man, wie viele Fragen welches Kurses noch kommen.
 */
export function SessionProgress({
  items,
  index,
  furthest,
  retries,
  colorOf,
}: {
  items: SessionItem[]
  index: number
  /** weitester erreichter Schritt (nach dem Zurückblättern sind die Schritte dazwischen schon erledigt) */
  furthest: number
  retries: number
  colorOf?: (courseId: string) => string
}) {
  return (
    <div className="session-progress">
      <div
        className={colorOf ? 'session-track session-track--courses' : 'session-track'}
        role="progressbar"
        aria-label="Fortschritt"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={Math.min(furthest, items.length)}
      >
        {items.map((item, i) => {
          const shape =
            item.kind === 'question' ? (item.retry ? 'retry' : 'question') : item.kind === 'page' ? 'page' : 'ring'
          const state = i === index ? 'current' : i < Math.max(index, furthest) ? 'done' : 'todo'
          const style = colorOf ? ({ '--marker': colorOf(item.courseId) } as CSSProperties) : undefined
          return <span key={i} className={`marker marker--${shape} marker--${state}`} style={style} />
        })}
      </div>
      {retries > 0 && (
        <span className="retry-chip" title="Fragen, die noch einmal kommen">
          <Icon name="shieldFilled" size={14} />
          {retries}
        </span>
      )}
    </div>
  )
}

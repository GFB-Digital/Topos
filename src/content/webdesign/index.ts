import type { Course, Tile } from '../../lib/types.ts'
import { CSS_TILES } from './css.ts'
import { HTML_TILES } from './html.ts'
import { LAB_TILES } from './labore.ts'
import { LAYOUT_TILES } from './layout.ts'
import { WEB_TILES } from './web.ts'

// Fest eingebauter Kurs „Webdesign“ (WS 2026/27): Grundlagen aus den Vorlesungen
// in eigenen Worten, dazu „Dein Labor“ mit den eigenen Abgaben.
// Er kommt mit jedem App-Update automatisch mit – kein Import nötig.
//
// WICHTIG beim Erweitern: Kurs-ID, Kachel-IDs und Fragetexte nie ändern,
// sonst geht der Lernstand dieser Fragen verloren. Neue Kacheln einfach einfügen.

const all = [...WEB_TILES, ...HTML_TILES, ...CSS_TILES, ...LAYOUT_TILES, ...LAB_TILES]
const byId = new Map(all.map((tile) => [tile.id, tile]))

/** Lernreihenfolge: jedes Labor direkt nach dem Thema, zu dem es gehört */
const ORDER = [
  'v2-1', 'v2-2', 'v2-3', 'v2-4', 'v2-5', 'l1-1',
  'v3-1', 'v3-2', 'v3-3', 'v3-4', 'l2-1', 'v4-1',
  'v4-2', 'v4-3', 'l3-1', 'v5-1', 'v5-2', 'v5-3',
  'v6-1', 'v6-2', 'l4-1', 'l4-2', 'v6-3', 'l5-1',
  'v7-1', 'v7-2', 'l6-1', 'v8-1', 'v8-2', 'l7-1',
]

function ordered(): Tile[] {
  const tiles = ORDER.map((id) => byId.get(id))
  const missing = ORDER.filter((_, i) => !tiles[i])
  const unlisted = all.filter((tile) => !ORDER.includes(tile.id))
  if (missing.length > 0 || unlisted.length > 0) {
    throw new Error(`Webdesign-Kurs: Reihenfolge passt nicht (fehlt: ${missing.join(', ')}; nicht eingeordnet: ${unlisted.map((t) => t.id).join(', ')})`)
  }
  return tiles as Tile[]
}

export const WEBDESIGN_COURSE: Course = {
  id: 'webdesign-ws2627',
  title: 'Webdesign',
  emoji: '💻',
  color: 'tuerkis',
  description: 'HTML, CSS und das Web verstehen – mit den Vorlesungsthemen und deinen eigenen Laborabgaben.',
  tiles: ordered(),
}

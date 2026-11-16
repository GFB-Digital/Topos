import type { TileMove } from '../../lib/moves.ts'
import type { Course, Tile } from '../../lib/types.ts'
import { CSS_TILES } from './css.ts'
import { HTML_TILES } from './html.ts'
import { LAB_TILES } from './labore.ts'
import { LAYOUT_TILES } from './layout.ts'
import { WEB_TILES } from './web.ts'

// Zwei fest eingebaute Kurse zum Modul Webdesign (WS 2026/27), Inhalte in eigenen
// Worten plus „Dein Labor“ mit den eigenen Abgaben. Sie kommen mit jedem
// App-Update automatisch mit – kein Import nötig.
//
// - „Webdesign“: HTML und CSS programmieren (später auch JavaScript)
// - „World Wide Web“: wie das Web funktioniert, vom Server bis zum Bildschirm
//
// WICHTIG beim Erweitern: Kurs-IDs, Kachel-IDs und Fragetexte nie ändern, sonst
// geht der Lernstand dieser Fragen verloren. Neue Kacheln in ORDER eintragen.
// Zieht eine Kachel in den anderen Kurs um, gehört sie in MOVED_TILES.

const all = [...WEB_TILES, ...HTML_TILES, ...CSS_TILES, ...LAYOUT_TILES, ...LAB_TILES]
const byId = new Map(all.map((tile) => [tile.id, tile]))

/** Lernreihenfolge „Webdesign“: jedes Labor direkt nach dem Thema, zu dem es gehört */
const WEBDESIGN_ORDER = [
  'v3-1', 'v3-2', 'v3-3', 'v3-4', 'l2-1', 'v4-1',
  'v4-2', 'v4-3', 'l3-1', 'v5-1', 'v5-2', 'v5-3',
  'v6-1', 'v6-2', 'l4-1', 'l4-2', 'v6-3', 'l5-1',
  'v7-1', 'v7-2', 'l6-1', 'v8-1', 'v8-2', 'l7-1',
]

/** Lernreihenfolge „World Wide Web“ */
const WWW_ORDER = ['v2-1', 'v2-2', 'v2-3', 'v2-4', 'v2-5', 'l1-1', 'w-browser']

function pick(order: string[]): Tile[] {
  return order.map((id) => {
    const tile = byId.get(id)
    if (!tile) throw new Error(`Webdesign-Kurse: Kachel „${id}“ gibt es nicht`)
    return tile
  })
}

const unlisted = all.filter((tile) => !WEBDESIGN_ORDER.includes(tile.id) && !WWW_ORDER.includes(tile.id))
if (unlisted.length > 0) {
  throw new Error(`Webdesign-Kurse: nicht eingeordnet: ${unlisted.map((tile) => tile.id).join(', ')}`)
}

export const WEBDESIGN_COURSE: Course = {
  id: 'webdesign-ws2627',
  title: 'Webdesign',
  emoji: '💻',
  color: 'tuerkis',
  group: 'Web',
  description: 'HTML und CSS programmieren – an deinen eigenen Laboraufgaben. JavaScript folgt.',
  tiles: pick(WEBDESIGN_ORDER),
}

export const WWW_COURSE: Course = {
  id: 'www-ws2627',
  title: 'World Wide Web',
  emoji: '🌐',
  color: 'blau',
  group: 'Web',
  description: 'Wie das Web funktioniert: Adressen, DNS, HTTP und was der Browser mit dem Code macht.',
  tiles: pick(WWW_ORDER),
}

/**
 * Am 16.11.2026 aus „Webdesign“ in „World Wide Web“ umgezogen. Der Lernstand
 * dieser Kacheln wird beim Start einmalig übernommen (applyTileMoves).
 */
export const MOVED_TILES: TileMove[] = [
  { from: WEBDESIGN_COURSE.id, to: WWW_COURSE.id, tiles: ['v2-1', 'v2-2', 'v2-3', 'v2-4', 'v2-5', 'l1-1'] },
]

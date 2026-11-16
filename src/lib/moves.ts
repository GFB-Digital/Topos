// Kacheln, die in einen anderen Kurs umgezogen sind, nehmen ihren Lernstand mit.
// Reine Funktion → moves.test.ts.

import type { LearnState } from './types.ts'

export interface TileMove {
  from: string
  to: string
  tiles: string[]
}

/**
 * Verschiebt Kachel-Status und Gedächtnis-Stände von `from` nach `to`.
 * Hat der Zielkurs für eine Kachel schon einen Stand, bleibt dieser (der Umzug
 * läuft nur einmal und überschreibt nie Neueres).
 */
export function applyTileMoves(learn: LearnState, moves: TileMove[]): { learn: LearnState; changed: boolean } {
  let changed = false
  const tiles = { ...learn.tiles }
  const cards = { ...learn.cards }
  for (const move of moves) {
    for (const tileId of move.tiles) {
      const old = tiles[move.from]?.[tileId]
      if (old && !tiles[move.to]?.[tileId]) {
        tiles[move.to] = { ...tiles[move.to], [tileId]: old }
        changed = true
      }
      if (old) {
        const rest = { ...tiles[move.from] }
        delete rest[tileId]
        tiles[move.from] = rest
        changed = true
      }
      const prefix = `${move.from}::${tileId}::`
      for (const key of Object.keys(cards)) {
        if (!key.startsWith(prefix)) continue
        const target = `${move.to}::${tileId}::${key.slice(prefix.length)}`
        if (!(target in cards)) cards[target] = cards[key]
        delete cards[key]
        changed = true
      }
    }
  }
  return changed ? { learn: { ...learn, tiles, cards }, changed } : { learn, changed }
}

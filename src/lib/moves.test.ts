// Tests für den Umzug von Kacheln zwischen Kursen. Aufruf: npm test

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { applyTileMoves, type TileMove } from './moves.ts'
import { newCard } from './srs.ts'
import { EMPTY_LEARN, type LearnState } from './types.ts'

const MOVES: TileMove[] = [{ from: 'alt', to: 'neu', tiles: ['k1', 'k2'] }]
const card = newCard(true, 1000)

const before: LearnState = {
  ...EMPTY_LEARN,
  tiles: {
    alt: {
      k1: { status: 'done', startedAt: 1, completedAt: 2 },
      bleibt: { status: 'learning', startedAt: 3 },
    },
  },
  cards: { 'alt::k1::abc': card, 'alt::bleibt::xyz': card, 'alt::k10::q': card },
}

describe('Kacheln umziehen', () => {
  it('nimmt Kachel-Status und Gedächtnis-Stände mit', () => {
    const { learn, changed } = applyTileMoves(before, MOVES)
    assert.equal(changed, true)
    assert.deepEqual(learn.tiles.neu, { k1: { status: 'done', startedAt: 1, completedAt: 2 } })
    assert.deepEqual(Object.keys(learn.tiles.alt), ['bleibt'])
    assert.deepEqual(Object.keys(learn.cards).sort(), ['alt::bleibt::xyz', 'alt::k10::q', 'neu::k1::abc'])
  })

  it('läuft nur einmal und ändert danach nichts mehr', () => {
    const once = applyTileMoves(before, MOVES).learn
    const twice = applyTileMoves(once, MOVES)
    assert.equal(twice.changed, false)
    assert.equal(twice.learn, once)
  })

  it('überschreibt keinen neueren Stand im Zielkurs', () => {
    const newer = { status: 'done' as const, startedAt: 50, completedAt: 60 }
    const learn: LearnState = {
      ...before,
      tiles: { ...before.tiles, neu: { k1: newer } },
      cards: { ...before.cards, 'neu::k1::abc': { ...card, reps: 9 } },
    }
    const result = applyTileMoves(learn, MOVES).learn
    assert.deepEqual(result.tiles.neu.k1, newer)
    assert.equal(result.cards['neu::k1::abc'].reps, 9)
    assert.ok(!('alt::k1::abc' in result.cards))
  })

  it('ohne passenden Lernstand bleibt alles gleich', () => {
    const { learn, changed } = applyTileMoves(EMPTY_LEARN, MOVES)
    assert.equal(changed, false)
    assert.equal(learn, EMPTY_LEARN)
  })
})

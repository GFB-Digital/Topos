// Tests für die fest eingebauten Kurse. Aufruf: npm test

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { SAMPLE_COURSE } from '../content/sample-course.ts'
import { WEBDESIGN_COURSE } from '../content/webdesign/index.ts'
import { parseCourses, LONG_PAGE_WORDS } from './importer.ts'
import { cardKey, stripMarkup, textBlocks, tileQuestions } from './model.ts'
import { isQuestion } from './types.ts'

describe('Eingebauter Kurs Webdesign', () => {
  const course = WEBDESIGN_COURSE

  it('besteht die Import-Prüfung ohne Hinweise', () => {
    const outcome = parseCourses(JSON.stringify(course))
    assert.equal(outcome.ok, true, outcome.ok ? '' : outcome.errors.join('\n'))
    if (outcome.ok) assert.deepEqual(outcome.notes, [])
  })

  it('hat eindeutige IDs und keine doppelten Fragen', () => {
    assert.notEqual(course.id, SAMPLE_COURSE.id)
    const ids = course.tiles.map((tile) => tile.id)
    assert.equal(new Set(ids).size, ids.length)
    const keys = course.tiles.flatMap((tile) => tileQuestions(tile).map(({ step }) => cardKey(course.id, tile.id, step)))
    assert.equal(new Set(keys).size, keys.length)
  })

  it('jede Kachel hat Leitfragen, Seiten, Fragen und Rückblick', () => {
    for (const tile of course.tiles) {
      assert.ok((tile.intro?.length ?? 0) >= 2, `${tile.id}: intro`)
      assert.ok((tile.recap?.length ?? 0) >= 3, `${tile.id}: recap`)
      assert.ok(tile.steps.filter((step) => step.type === 'text').length >= 2, `${tile.id}: Seiten`)
      assert.ok(tile.steps.filter(isQuestion).length >= 3, `${tile.id}: Fragen`)
    }
  })

  it('Seiten sind kurz, Codeblöcke höchstens 12 Zeilen', () => {
    for (const tile of course.tiles) {
      for (const step of tile.steps) {
        const texts = step.type === 'text' ? [step.text] : []
        if (isQuestion(step) && step.type !== 'truefalse' && step.type !== 'cloze') texts.push(step.question)
        for (const text of texts) {
          for (const block of textBlocks(text)) {
            if (block.kind === 'code') assert.ok(block.code.split('\n').length <= 12, `${tile.id}: Codeblock zu lang`)
          }
        }
        if (step.type === 'text') {
          const words = stripMarkup(step.text).split(/\s+/).length
          assert.ok(words <= LONG_PAGE_WORDS, `${tile.id}: Seite mit ${words} Wörtern`)
        }
      }
    }
  })

  it('enthält keine persönlichen Angaben aus den Laborabgaben', () => {
    // Der Kurs ist öffentlich (GitHub, App) – Namen, Adressen und Matrikelnummern gehören nicht hinein
    const text = JSON.stringify(course)
    for (const forbidden of ['Nico', 'Steiner', 'Norderstr', '@gmail', 'Bolay', '811479', 'Extrablatt', '24938']) {
      assert.ok(!text.includes(forbidden), `„${forbidden}“ steht im Kurs`)
    }
  })
})

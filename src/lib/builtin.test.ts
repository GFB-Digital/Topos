// Tests für die fest eingebauten Kurse. Aufruf: npm test

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { SAMPLE_COURSE } from '../content/sample-course.ts'
import { MOVED_TILES, WEBDESIGN_COURSE, WWW_COURSE } from '../content/webdesign/index.ts'
import { parseCourses, LONG_PAGE_WORDS } from './importer.ts'
import { cardKey, questionText, stripMarkup, textBlocks, tileQuestions } from './model.ts'
import { isQuestion } from './types.ts'

const COURSES = [WEBDESIGN_COURSE, WWW_COURSE]

describe('Eingebaute Kurse Webdesign und World Wide Web', () => {
  it('bestehen die Import-Prüfung ohne Hinweise', () => {
    for (const course of COURSES) {
      const outcome = parseCourses(JSON.stringify(course))
      assert.equal(outcome.ok, true, outcome.ok ? '' : outcome.errors.join('\n'))
      if (outcome.ok) assert.deepEqual(outcome.notes, [], course.id)
    }
  })

  it('haben eindeutige IDs und keine doppelten Fragen', () => {
    const courseIds = [SAMPLE_COURSE.id, ...COURSES.map((course) => course.id)]
    assert.equal(new Set(courseIds).size, courseIds.length)
    // Jede Kachel gehört zu genau einem Kurs
    const tileIds = COURSES.flatMap((course) => course.tiles.map((tile) => tile.id))
    assert.equal(new Set(tileIds).size, tileIds.length)
    for (const course of COURSES) {
      const keys = course.tiles.flatMap((tile) => tileQuestions(tile).map(({ step }) => cardKey(course.id, tile.id, step)))
      assert.equal(new Set(keys).size, keys.length, course.id)
    }
  })

  it('der Webdesign-Kurs beginnt direkt mit HTML', () => {
    assert.equal(WEBDESIGN_COURSE.tiles[0].id, 'v3-1')
    assert.ok(WEBDESIGN_COURSE.tiles.every((tile) => !tile.id.startsWith('v2-') && tile.id !== 'l1-1'))
  })

  it('umgezogene Kacheln stehen im Zielkurs', () => {
    for (const move of MOVED_TILES) {
      const target = COURSES.find((course) => course.id === move.to)
      const source = COURSES.find((course) => course.id === move.from)
      for (const tileId of move.tiles) {
        assert.ok(target?.tiles.some((tile) => tile.id === tileId), `${tileId} fehlt in ${move.to}`)
        assert.ok(!source?.tiles.some((tile) => tile.id === tileId), `${tileId} steht noch in ${move.from}`)
      }
    }
  })

  it('jede Kachel hat Leitfragen, Seiten, Fragen und Rückblick', () => {
    for (const tile of COURSES.flatMap((course) => course.tiles)) {
      assert.ok((tile.intro?.length ?? 0) >= 2, `${tile.id}: intro`)
      assert.ok((tile.recap?.length ?? 0) >= 3, `${tile.id}: recap`)
      assert.ok(tile.steps.filter((step) => step.type === 'text').length >= 2, `${tile.id}: Seiten`)
      assert.ok(tile.steps.filter(isQuestion).length >= 3, `${tile.id}: Fragen`)
    }
  })

  it('Seiten sind kurz, Codeblöcke höchstens 12 Zeilen', () => {
    for (const tile of COURSES.flatMap((course) => course.tiles)) {
      for (const step of tile.steps) {
        const texts = step.type === 'text' ? [step.text] : []
        const questions = isQuestion(step) ? [step, ...(step.variants ?? [])] : []
        for (const question of questions) texts.push(questionText(question))
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

  it('jede Webdesign-Frage hat eine Variante, die anders fragt', () => {
    for (const tile of WEBDESIGN_COURSE.tiles) {
      for (const { step } of tileQuestions(tile)) {
        assert.ok(step.variants?.length, `${tile.id}: „${questionText(step).slice(0, 40)}“ ohne Variante`)
        for (const variant of step.variants ?? []) {
          assert.notEqual(questionText(variant), questionText(step), `${tile.id}: Variante gleich der Frage`)
        }
      }
    }
  })

  it('enthalten keine persönlichen Angaben aus den Laborabgaben', () => {
    // Die Kurse sind öffentlich (GitHub, App) – Namen, Adressen und Matrikelnummern gehören nicht hinein
    const text = JSON.stringify(COURSES)
    for (const forbidden of ['Nico', 'Steiner', 'Norderstr', '@gmail', 'Bolay', '811479', 'Extrablatt', '24938']) {
      assert.ok(!text.includes(forbidden), `„${forbidden}“ steht im Kurs`)
    }
  })
})

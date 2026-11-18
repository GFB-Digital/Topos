// Tests für Fragen-Varianten und freies Abrufen. Aufruf: npm test

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { parseCourses } from './importer.ts'
import { cardKey } from './model.ts'
import { DAY, newCard } from './srs.ts'
import type { CardState, ChoiceStep, ClozeStep, Course, QuestionStep } from './types.ts'
import {
  choosePresentation,
  nextVariant,
  presentedStep,
  recallDue,
  recallForm,
  RECALL_FROM_DAYS,
  withPresentation,
} from './variants.ts'
import { EMPTY_LEARN } from './types.ts'

const T0 = new Date(2026, 10, 18, 9).getTime()

const main: ChoiceStep = {
  type: 'choice',
  question: 'Wer entwickelte die Lernkartei mit Fächern?',
  options: ['Leitner', 'Ebbinghaus', 'Karpicke'],
  answer: 0,
  explanation: 'Sebastian Leitner, 1972.',
  variants: [
    { type: 'truefalse', statement: 'Die Lernkartei mit Fächern stammt von Ebbinghaus.', answer: false },
    { type: 'recall', question: 'Wie heißt der Erfinder der Lernkartei?', answer: 'Sebastian Leitner' },
  ],
}

const card = (patch: Partial<CardState> = {}): CardState => ({ ...newCard(true, T0), ...patch })

describe('Varianten', () => {
  it('wechselt reihum: Hauptfrage → Variante 1 → Variante 2 → Hauptfrage', () => {
    assert.equal(nextVariant(main, undefined), 0) // noch nie gelernt
    assert.equal(nextVariant(main, card()), 1) // nach dem Lernen (Hauptfrage)
    assert.equal(nextVariant(main, card({ v: 1 })), 2)
    assert.equal(nextVariant(main, card({ v: 2 })), 0)
    assert.equal(nextVariant({ ...main, variants: undefined }, card({ v: 3 })), 0)
  })

  it('zeigt die gewählte Variante, behält aber den Schlüssel der Hauptfrage', () => {
    assert.equal(presentedStep(main, { variant: 1 }).type, 'truefalse')
    assert.equal(presentedStep(main, { variant: 2 }).type, 'recall')
    assert.equal(presentedStep(main, { variant: 9 }), main) // unbekannt → Hauptfrage
    assert.equal(cardKey('k', 't', main), cardKey('k', 't', { ...main, variants: undefined }))
  })

  it('legt für eine Runde Variante und Darstellung fest', () => {
    const course: Course = { id: 'k', title: 'K', tiles: [{ id: 't', title: 'T', steps: [{ type: 'text', text: 'x' }, main] }] }
    const learn = { ...EMPTY_LEARN, cards: { [cardKey('k', 't', main)]: card({ v: 1 }) } }
    const [ref] = withPresentation([{ courseId: 'k', tileId: 't', step: 1 }], [course], learn, true)
    assert.equal(ref.variant, 2)
  })
})

describe('Freies Abrufen', () => {
  it('macht aus Lückentext und kurzen Auswahlfragen eine Karteikarte', () => {
    const cloze: ClozeStep = { type: 'cloze', text: 'Die Lernkartei stammt von ___.', options: ['Leitner', 'Karpicke'], answer: 0 }
    assert.deepEqual(recallForm(cloze), { type: 'recall', question: 'Die Lernkartei stammt von ___.', answer: 'Leitner' })
    const recall = recallForm(main)
    assert.equal(recall?.answer, 'Leitner')
    assert.equal(recall?.explanation, 'Sebastian Leitner, 1972.')
  })

  it('lässt Fragen in Ruhe, die ohne Antworten keinen Sinn ergeben', () => {
    const ask = (question: string, answer = 'Kurz'): QuestionStep => ({ type: 'choice', question, options: [answer, 'Anders'], answer: 0 })
    assert.equal(recallForm(ask('Welche Aussage stimmt?')), null)
    assert.equal(recallForm(ask('Welcher der folgenden Selektoren ist am spezifischsten?')), null)
    assert.equal(recallForm(ask('Was gehört nicht in den head?')), null)
    assert.equal(recallForm(ask('Was zeigte die Studie?', 'Wer sich selbst abgefragt hatte, erinnerte sich deutlich besser')), null)
    assert.equal(recallForm({ type: 'binary', question: 'Oben oder unten?', options: ['A', 'B'], answer: 0 }), null)
    assert.equal(recallForm({ type: 'truefalse', statement: 'X', answer: true }), null)
  })

  it('kommt nur bei gefestigten Fragen, und dann jede zweite Wiederholung', () => {
    assert.equal(recallDue(undefined), false)
    assert.equal(recallDue(card({ s: RECALL_FROM_DAYS - 1, reps: 3 })), false)
    assert.equal(recallDue(card({ s: RECALL_FROM_DAYS, reps: 3 })), true)
    assert.equal(recallDue(card({ s: 30, reps: 4 })), false)
    const plain = { ...main, variants: undefined }
    assert.deepEqual(choosePresentation(plain, card({ s: 10, reps: 3, last: T0 - 10 * DAY }), true), { variant: 0, recall: true })
    // In Prüfungen nie
    assert.deepEqual(choosePresentation(plain, card({ s: 10, reps: 3 }), false), { variant: 0, recall: false })
    assert.equal(presentedStep(plain, { variant: 0, recall: true }).type, 'recall')
  })
})

describe('Import von Varianten', () => {
  const wrap = (step: unknown) =>
    JSON.stringify({ id: 'k', title: 'Kurs', tiles: [{ id: 't', title: 'Kachel', steps: [{ type: 'text', text: 'Hallo' }, step] }] })

  it('übernimmt gültige Varianten', () => {
    const outcome = parseCourses(wrap(main))
    assert.equal(outcome.ok, true)
    const step = outcome.ok ? outcome.courses[0].tiles[0].steps[1] : null
    assert.equal(step && step.type !== 'text' ? step.variants?.length : 0, 2)
  })

  it('meldet Fehler in Varianten mit Ort', () => {
    const bad = parseCourses(wrap({ ...main, variants: [{ type: 'choice', question: 'Ohne Antworten' }] }))
    assert.equal(bad.ok, false)
    assert.match(bad.ok ? '' : bad.errors.join('\n'), /Schritt 2 \(Frage\) › Variante 1: „options“/)
    const nested = parseCourses(wrap({ ...main, variants: [{ ...main }] }))
    assert.match(nested.ok ? '' : nested.errors.join('\n'), /keine eigenen Varianten/)
    const page = parseCourses(wrap({ ...main, variants: [{ type: 'text', text: 'Seite' }] }))
    assert.match(page.ok ? '' : page.errors.join('\n'), /muss eine Frage sein/)
    const notList = parseCourses(wrap({ ...main, variants: 'nein' }))
    assert.match(notList.ok ? '' : notList.errors.join('\n'), /„variants“ muss eine Liste/)
  })

  it('prüft auch Codeblöcke in Varianten', () => {
    const open = parseCourses(wrap({ ...main, variants: [{ type: 'recall', question: 'Was zeigt\n```html\n<p>', answer: 'x' }] }))
    assert.match(open.ok ? '' : open.errors.join('\n'), /nicht wieder geschlossen/)
  })
})

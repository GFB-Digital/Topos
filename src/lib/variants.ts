// Abwechslung bei Wiederholungen: Fragen-Varianten und freies Abrufen.
// Reine Funktionen → variants.test.ts.
//
// - Varianten: Eine Frage kann `variants` haben. Bei jeder Wiederholung kommt die
//   nächste (Hauptfrage → Variante 1 → Variante 2 → Hauptfrage …). Der Lernstand
//   bleibt bei der Hauptfrage.
// - Freies Abrufen: Sitzt eine Frage schon gut, kommt sie jede zweite Wiederholung
//   als Karteikarte – ohne Antworten zum Wiedererkennen. Selbst erinnern festigt
//   stärker als wiedererkennen.

import { CLOZE_GAP } from './importer.ts'
import { cardKey, correctLabel, hasCodeBlock, stripMarkup } from './model.ts'
import { lookupQuestion, type QuestionRef } from './session.ts'
import type { CardState, Course, LearnState, QuestionStep, RecallStep } from './types.ts'

/** Ab dieser Stabilität (Tage) kommt eine Frage auch als Karteikarte */
export const RECALL_FROM_DAYS = 7

/** So wird eine Frage in dieser Runde gezeigt */
export interface Presentation {
  /** 0 = Hauptfrage, 1 = erste Variante … */
  variant: number
  /** als Karteikarte ohne Antwortmöglichkeiten */
  recall: boolean
}

export function variantCount(step: QuestionStep): number {
  return 1 + (step.variants?.length ?? 0)
}

/** Nächste Variante nach der zuletzt gezeigten (ohne Gedächtnis-Stand: die Hauptfrage) */
export function nextVariant(step: QuestionStep, card: CardState | undefined): number {
  const count = variantCount(step)
  if (!card || count === 1) return 0
  return ((card.v ?? 0) + 1) % count
}

/**
 * Lässt sich die Frage ohne Antwortmöglichkeiten sinnvoll stellen?
 * - Lückentext: immer (man ergänzt die Lücke im Kopf).
 * - Auswahl: nur bei kurzer Antwort und wenn die Frage nicht auf die Antworten
 *   verweist („Welche Aussage …“, „Welche der folgenden …“, Verneinungen).
 * - Entweder-oder, Stimmt-das, Reihenfolge, Karteikarte: nein.
 */
export function recallForm(step: QuestionStep): RecallStep | null {
  if (step.type === 'cloze') {
    const answer = step.options[step.answer]
    return withExplanation({ type: 'recall', question: step.text.replace(CLOZE_GAP, '___'), answer }, step)
  }
  if (step.type !== 'choice') return null
  const answer = step.options[step.answer]
  const words = stripMarkup(answer).split(/\s+/).filter(Boolean).length
  if (words > 6 || answer.length > 60 || hasCodeBlock(answer) || hasCodeBlock(step.question)) return null
  if (/folgend|aussage|trifft|stimmt|richtig|falsch|nicht|kein|oben|unten|antwort/i.test(stripMarkup(step.question))) return null
  return withExplanation({ type: 'recall', question: step.question, answer: correctLabel(step) }, step)
}

function withExplanation(recall: RecallStep, from: QuestionStep): RecallStep {
  return from.explanation ? { ...recall, explanation: from.explanation } : recall
}

/** Gefestigt und diesmal an der Reihe (jede zweite Wiederholung) */
export function recallDue(card: CardState | undefined): boolean {
  return card !== undefined && card.s >= RECALL_FROM_DAYS && card.reps % 2 === 1
}

export function choosePresentation(step: QuestionStep, card: CardState | undefined, allowRecall: boolean): Presentation {
  const variant = nextVariant(step, card)
  const shown = variantStep(step, variant)
  return { variant, recall: allowRecall && recallDue(card) && recallForm(shown) !== null }
}

/** Die Frage einer Variante (0 = Hauptfrage; ungültige Nummer → Hauptfrage) */
export function variantStep(step: QuestionStep, variant: number): QuestionStep {
  return (variant > 0 && step.variants?.[variant - 1]) || step
}

/** Was tatsächlich angezeigt wird */
export function presentedStep(step: QuestionStep, presentation: Partial<Presentation> | undefined): QuestionStep {
  const shown = variantStep(step, presentation?.variant ?? 0)
  return (presentation?.recall && recallForm(shown)) || shown
}

/**
 * Für eine Wiederholungsrunde oder Prüfung festlegen, wie jede Frage gezeigt wird.
 * In Prüfungen (`allowRecall` = false) keine Karteikarten, weil es dort keine
 * Rückmeldung gibt und Selbstbewertung nicht passt.
 */
export function withPresentation<T extends QuestionRef>(
  refs: T[],
  courses: Course[],
  learn: LearnState,
  allowRecall: boolean,
): (T & Presentation)[] {
  return refs.map((ref) => {
    const found = lookupQuestion(courses, ref)
    if (!found) return { ...ref, variant: 0, recall: false }
    const card = learn.cards[cardKey(ref.courseId, ref.tileId, found.step)]
    return { ...ref, ...choosePresentation(found.step, card, allowRecall) }
  })
}

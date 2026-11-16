// Hilfsfunktionen rund um Kurse, Kacheln und Fragen (ohne Seiteneffekte)

import {
  isQuestion,
  type Course,
  type LearnState,
  type OptionStep,
  type QuestionStep,
  type Tile,
  type TileState,
  type TrueFalseStep,
} from './types.ts'

export function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`
}

// ---------------------------------------------------------------------------
// Text

/** Text in Absätze zerlegen (getrennt durch eine Leerzeile) */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

/** Abschnitt eines Textes: normaler Text oder Codeblock (```…```) */
export type TextBlock = { kind: 'text'; text: string } | { kind: 'code'; code: string; lang: string }

/** Zeile, die einen Codeblock öffnet oder schließt: ``` oder ```html */
const FENCE = /^\s*```\s*([\w+-]*)\s*$/

/**
 * Text in normalen Text und Codeblöcke zerlegen. Ein Codeblock beginnt mit einer
 * Zeile ``` (optional mit Sprache, z. B. ```html) und endet mit einer Zeile ```.
 * Im Code bleiben Einrückungen und Leerzeilen erhalten. Ein nicht geschlossener
 * Block reicht bis zum Ende (der Import meldet das, siehe `unclosedFence`).
 */
export function textBlocks(text: string): TextBlock[] {
  const blocks: TextBlock[] = []
  let prose: string[] = []
  let code: string[] | null = null
  let lang = ''
  const flushProse = () => {
    const joined = prose.join('\n').trim()
    if (joined) blocks.push({ kind: 'text', text: joined })
    prose = []
  }
  for (const line of text.split('\n')) {
    const fence = FENCE.exec(line)
    if (code === null) {
      if (fence) {
        flushProse()
        code = []
        lang = fence[1].toLowerCase()
      } else {
        prose.push(line)
      }
    } else if (fence && fence[1] === '') {
      blocks.push({ kind: 'code', code: code.join('\n').replace(/\s+$/, ''), lang })
      code = null
    } else {
      code.push(line)
    }
  }
  if (code !== null) blocks.push({ kind: 'code', code: code.join('\n').replace(/\s+$/, ''), lang })
  flushProse()
  return blocks
}

/** Wie `textBlocks`, aber normaler Text zusätzlich in Absätze zerlegt (für Leseseiten) */
export function pageBlocks(text: string): TextBlock[] {
  return textBlocks(text).flatMap((block) =>
    block.kind === 'code' ? [block] : paragraphs(block.text).map((p): TextBlock => ({ kind: 'text', text: p })),
  )
}

/** Hat der Text einen Codeblock? */
export function hasCodeBlock(text: string): boolean {
  return textBlocks(text).some((block) => block.kind === 'code')
}

/** Öffnet der Text einen Codeblock, der nie geschlossen wird? */
export function unclosedFence(text: string): boolean {
  let open = false
  for (const line of text.split('\n')) {
    const fence = FENCE.exec(line)
    if (fence && (open ? fence[1] === '' : true)) open = !open
  }
  return open
}

export interface InlineSegment {
  text: string
  kind: 'plain' | 'bold' | 'code'
}

/** „**fett**“ und „`Code`“ im Satz → Abschnitte. Im Code gilt ** nicht als fett. */
export function inlineSegments(text: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  for (const part of text.split(/(`[^`\n]+`)/)) {
    if (!part) continue
    if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
      segments.push({ text: part.slice(1, -1), kind: 'code' })
      continue
    }
    for (const piece of part.split(/(\*\*[^*]+\*\*)/)) {
      if (!piece) continue
      segments.push(
        piece.startsWith('**') && piece.endsWith('**') && piece.length > 4
          ? { text: piece.slice(2, -2), kind: 'bold' }
          : { text: piece, kind: 'plain' },
      )
    }
  }
  return segments
}

/**
 * Markierungen entfernen (für Speed-Reader, Suche, Bildschirmleser): ** und `
 * verschwinden. Ganze Codeblöcke werden durch „(Codebeispiel)“ ersetzt –
 * oder mit `keepCode` als Text behalten (für die Suche).
 */
export function stripMarkup(text: string, keepCode = false): string {
  return textBlocks(text)
    .map((block) =>
      block.kind === 'code'
        ? keepCode
          ? block.code
          : '(Codebeispiel)'
        : block.text.replace(/\*\*/g, '').replace(/`([^`\n]+)`/g, '$1'),
    )
    .join('\n\n')
}

/** Zufällige Reihenfolge der Zahlen 0 … count-1 (Fisher-Yates) */
export function shuffledIndices(count: number, random: () => number = Math.random): number[] {
  const result = Array.from({ length: count }, (_, i) => i)
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// ---------------------------------------------------------------------------
// Fragen

export interface Choice {
  /** Original-Index der Antwort (bei Richtig/Falsch: 1 = stimmt, 0 = stimmt nicht) */
  value: number
  label: string
}

export function questionText(step: QuestionStep): string {
  switch (step.type) {
    case 'truefalse':
      return step.statement
    case 'cloze':
      return step.text
    default:
      return step.question
  }
}

export function questionChoices(step: OptionStep | TrueFalseStep, order: number[]): Choice[] {
  if (step.type === 'truefalse') {
    return [
      { value: 1, label: 'Stimmt' },
      { value: 0, label: 'Stimmt nicht' },
    ]
  }
  const options = step.options as string[]
  const indices = order.length === options.length ? order : options.map((_, i) => i)
  return indices.map((i) => ({ value: i, label: options[i] }))
}

export function correctValue(step: OptionStep | TrueFalseStep): number {
  if (step.type === 'truefalse') return step.answer ? 1 : 0
  return step.answer
}

export function correctLabel(step: QuestionStep): string {
  if (step.type === 'truefalse') return step.answer ? 'Die Aussage stimmt.' : 'Die Aussage stimmt nicht.'
  if (step.type === 'recall') return step.answer
  if (step.type === 'order') return step.items.join(' → ')
  return step.options[step.answer]
}

/**
 * Wie wahrscheinlich man die Frage durch bloßes Raten richtig hat (0–1).
 * Richtig geratene Antworten sollen den Wiederholungsabstand weniger verlängern.
 */
export function guessChance(step: QuestionStep): number {
  if (step.type === 'recall' || step.type === 'order') return 0
  if (step.type === 'truefalse') return 0.5
  return 1 / step.options.length
}

/** Kurzer, stabiler Fingerabdruck einer Frage (FNV-1a) */
export function questionKey(step: QuestionStep): string {
  let hash = 0x811c9dc5
  for (const char of `${step.type}|${questionText(step)}`) {
    hash ^= char.charCodeAt(0)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash.toString(36)
}

/** Schlüssel einer Frage im Lernstand */
export function cardKey(courseId: string, tileId: string, step: QuestionStep): string {
  return `${courseId}::${tileId}::${questionKey(step)}`
}

export function tileQuestions(tile: Tile): { step: QuestionStep; index: number }[] {
  return tile.steps.flatMap((step, index) => (isQuestion(step) ? [{ step, index }] : []))
}

export function tileStats(tile: Tile) {
  const questions = tile.steps.filter(isQuestion).length
  return { pages: tile.steps.length - questions, questions }
}

// ---------------------------------------------------------------------------
// Lernstand

export function tileState(learn: LearnState, courseId: string, tileId: string): TileState | undefined {
  return learn.tiles[courseId]?.[tileId]
}

export function tileStatus(learn: LearnState, courseId: string, tileId: string): 'new' | 'learning' | 'done' {
  return tileState(learn, courseId, tileId)?.status ?? 'new'
}

export function courseStats(course: Course, learn: LearnState) {
  const done = course.tiles.filter((tile) => tileStatus(learn, course.id, tile.id) === 'done').length
  const total = course.tiles.length
  return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
}

/** Nächste Kachel zum Lernen: zuerst eine angefangene, sonst die erste neue */
export function nextTile(course: Course, learn: LearnState): Tile | undefined {
  return (
    course.tiles.find((tile) => tileStatus(learn, course.id, tile.id) === 'learning') ??
    course.tiles.find((tile) => tileStatus(learn, course.id, tile.id) === 'new')
  )
}

/** „2 h 15 min“, „12 min“, „< 1 min“ */
export function formatStudyTime(ms: number): string {
  const minutes = Math.floor(ms / 60_000)
  if (minutes < 1) return ms > 0 ? '< 1 min' : '0 min'
  const hours = Math.floor(minutes / 60)
  return hours > 0 ? `${hours} h ${minutes % 60} min` : `${minutes} min`
}

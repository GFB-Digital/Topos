// Tests für Textauszeichnung: **fett**, `Code` im Satz und Codeblöcke. Aufruf: npm test

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { extractJson, parseCourses } from './importer.ts'
import { hasCodeBlock, inlineSegments, pageBlocks, stripMarkup, textBlocks, unclosedFence } from './model.ts'
import { tokenize } from './orp.ts'

const FENCE = '```'
const block = (lang: string, ...lines: string[]) => [FENCE + lang, ...lines, FENCE].join('\n')

describe('Code im Satz', () => {
  it('erkennt `Code` neben **fett**', () => {
    assert.deepEqual(inlineSegments('Mit `display: flex` wird es **ein Flex-Container**.'), [
      { text: 'Mit ', kind: 'plain' },
      { text: 'display: flex', kind: 'code' },
      { text: ' wird es ', kind: 'plain' },
      { text: 'ein Flex-Container', kind: 'bold' },
      { text: '.', kind: 'plain' },
    ])
  })

  it('behandelt ** im Code nicht als fett und behält Einrückung', () => {
    assert.deepEqual(inlineSegments('`a ** b`'), [{ text: 'a ** b', kind: 'code' }])
    assert.deepEqual(inlineSegments('`  <li>`'), [{ text: '  <li>', kind: 'code' }])
  })

  it('lässt einzelne Backticks stehen', () => {
    assert.deepEqual(inlineSegments('Ein ` allein'), [{ text: 'Ein ` allein', kind: 'plain' }])
  })
})

describe('Codeblöcke', () => {
  const text = ['Vorher.', '', block('html', '<ul>', '', '  <li>Eins</li>', '</ul>'), '', 'Nachher.'].join('\n')

  it('trennt Text und Code, Leerzeilen und Einrückung im Code bleiben', () => {
    assert.deepEqual(textBlocks(text), [
      { kind: 'text', text: 'Vorher.' },
      { kind: 'code', code: '<ul>\n\n  <li>Eins</li>\n</ul>', lang: 'html' },
      { kind: 'text', text: 'Nachher.' },
    ])
    assert.equal(hasCodeBlock(text), true)
    assert.equal(hasCodeBlock('Nur `Code` im Satz.'), false)
  })

  it('zerlegt Leseseiten zusätzlich in Absätze', () => {
    const page = pageBlocks(`Eins.\n\nZwei.\n\n${block('css', 'p { color: red; }')}`)
    assert.deepEqual(
      page.map((b) => b.kind),
      ['text', 'text', 'code'],
    )
  })

  it('erkennt nicht geschlossene Blöcke', () => {
    assert.equal(unclosedFence(text), false)
    assert.equal(unclosedFence(`Text\n${FENCE}html\n<p>`), true)
    // Ein ```html im offenen Block schließt ihn nicht
    assert.equal(unclosedFence(`${FENCE}\n${FENCE}html\n`), true)
  })

  it('entfernt Markierungen für Speed-Reader und Suche', () => {
    assert.equal(stripMarkup('Mit `flex` **fett**.'), 'Mit flex fett.')
    assert.equal(stripMarkup(text), 'Vorher.\n\n(Codebeispiel)\n\nNachher.')
    assert.match(stripMarkup(text, true), /<li>Eins<\/li>/)
  })

  it('der Speed-Reader liest keinen Code Wort für Wort', () => {
    const words = tokenize(text).map((token) => token.text)
    assert.ok(!words.some((word) => word.includes('<li>')))
    assert.ok(words.includes('(Codebeispiel)'))
  })
})

describe('Code im Kurs-Import', () => {
  const course = (step: object) =>
    JSON.stringify({
      id: 'code-kurs',
      title: 'Code',
      tiles: [{ id: 't1', title: 'Kachel', steps: [{ type: 'text', text: 'Seite.' }, step] }],
    })

  it('nimmt Codeblöcke in Seiten und Fragen an', () => {
    const outcome = parseCourses(
      course({
        type: 'order',
        question: `Bring die Zeilen in die richtige Reihenfolge:\n\n${block('html', '<!-- Liste -->')}`,
        items: ['`<ul>`', '`  <li>Eins</li>`', '`</ul>`'],
      }),
    )
    assert.equal(outcome.ok, true)
    if (outcome.ok) {
      const step = outcome.courses[0].tiles[0].steps[1]
      assert.equal(step.type === 'order' && step.items[1], '`  <li>Eins</li>`')
    }
  })

  it('meldet einen nicht geschlossenen Codeblock mit Ort', () => {
    const outcome = parseCourses(course({ type: 'recall', question: 'Was zeigt das?', answer: `${FENCE}html\n<p>` }))
    assert.equal(outcome.ok, false)
    if (!outcome.ok) assert.match(outcome.errors.join('\n'), /Kachel.*Schritt 2.*nicht wieder geschlossen/)
  })

  it('verbietet Codeblöcke im Lückentext', () => {
    const outcome = parseCourses(
      course({ type: 'cloze', text: `Ergänze ___:\n\n${block('css', 'p {}')}`, options: ['a', 'b'], answer: 0 }),
    )
    assert.equal(outcome.ok, false)
  })

  it('Codeblöcke in Kurstexten stören das Entfernen des ```json-Rahmens nicht', () => {
    const raw = course({ type: 'recall', question: `Was ist das?\n\n${block('html', '<p>Hallo</p>')}`, answer: 'Ein Absatz' })
    const framed = `Hier dein Kurs:\n${FENCE}json\n${raw}\n${FENCE}\nViel Spaß!`
    assert.equal(extractJson(framed), raw)
    assert.equal(parseCourses(framed).ok, true)
  })
})

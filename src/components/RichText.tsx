import { Fragment } from 'react'
import { inlineSegments, paragraphs, textBlocks } from '../lib/model.ts'

// Code wird immer als Text gezeigt (React maskiert ihn) – nie als HTML ausgeführt.

/** Text im Satz mit **fett** und `Code` */
export function InlineText({ text }: { text: string }) {
  return (
    <>
      {inlineSegments(text).map((segment, i) =>
        segment.kind === 'bold' ? (
          <strong key={i}>{segment.text}</strong>
        ) : segment.kind === 'code' ? (
          <code key={i} className="code-inline">
            {segment.text}
          </code>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        ),
      )}
    </>
  )
}

/**
 * Text für Fragen, Antworten, Erklärungen und Aufdeck-Einträge: Absätze,
 * `Code` im Satz und Codeblöcke. Nutzt nur Elemente, die auch in Überschriften
 * und Buttons erlaubt sind (`<code>` als Block statt `<pre>`).
 */
export function RichText({ text }: { text: string }) {
  const blocks = textBlocks(text)
  // Häufigster Fall: ein einfacher Satz → keine zusätzlichen Elemente
  if (blocks.length === 1 && blocks[0].kind === 'text' && paragraphs(blocks[0].text).length === 1) {
    return <InlineText text={blocks[0].text} />
  }
  return (
    <>
      {blocks.flatMap((block, b) =>
        block.kind === 'code'
          ? [
              <code key={b} className="code-block" data-lang={block.lang || undefined}>
                {block.code}
              </code>,
            ]
          : paragraphs(block.text).map((paragraph, p) => (
              <span key={`${b}-${p}`} className="rich-par">
                <InlineText text={paragraph} />
              </span>
            )),
      )}
    </>
  )
}

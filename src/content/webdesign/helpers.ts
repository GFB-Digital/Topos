// Kleine Helfer zum Schreiben des Webdesign-Kurses.
// Achtung: Fragetexte nach dem Veröffentlichen nicht mehr ändern – der Lernstand
// einer Frage hängt an ihrem Text (cardKey). Kachel-IDs ebenso.

const FENCE = '```'

/** Codeblock aus einzelnen Zeilen, z. B. code('html', '<ul>', '  <li>Eins</li>', '</ul>') */
export function code(lang: string, ...lines: string[]): string {
  return `${FENCE}${lang}\n${lines.join('\n')}\n${FENCE}`
}

/** Absätze und Codeblöcke zu einem Seitentext verbinden */
export function page(...parts: string[]): string {
  return parts.join('\n\n')
}

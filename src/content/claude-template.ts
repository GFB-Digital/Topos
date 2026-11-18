// Vorlage, die man bei Claude einfügt, um einen Kurs im Topos-Format zu bekommen.
// Das heutige Datum steckt in der ID → neue Kurse überschneiden sich nicht.

import { COURSE_COLOR_NAMES } from '../lib/colors.ts'

function dateStamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
}

export function claudeTemplate(today: Date = new Date()): string {
  const stamp = dateStamp(today)
  return `Erstelle mir einen Lernkurs für meine Lern-App „ΤΟΠΟΣ“.

Thema: [HIER DEIN THEMA EINTRAGEN]
Umfang: [z. B. 6 Kacheln]

So ist ein Kurs aufgebaut:
- Ein Kurs besteht aus Kacheln. Jede Kachel ist eine kurze Lerneinheit zu einem Teilthema (z. B. beim Kurs „Das Gehirn“ eine Kachel pro Hirnregion). Ordne die Kacheln so, dass sie aufeinander aufbauen.
- Jede Kachel beginnt mit 2 Leitfragen („intro“): Was lernt man in dieser Kachel?
- Dann folgen 3 bis 4 Leseseiten. Nach jeder Seite kommt genau eine Frage zu genau dieser Seite. Am Ende dürfen noch ein bis zwei Fragen zur ganzen Kachel stehen.
- Jede Kachel endet mit einem Rückblick („recap“): 3 kurze Kernaussagen.

Inhalt:
- Sprache: Deutsch, lebendig und anschaulich, wie ein gutes Sachbuch.
- Jede Seite hat 80 bis 140 Wörter. Absätze innerhalb einer Seite trennst du mit \\n\\n.
- Erzähle Hintergründe: Wer hat etwas entdeckt, erfunden oder erforscht, wann, wie und warum? Beschreibe Experimente, Geschichten und konkrete Beispiele.
- Markiere 1 bis 2 Schlüsselbegriffe pro Seite mit **zwei Sternchen** (fett).
- Nur gesicherte Fakten, nichts erfinden. Bei Unsicherheit lieber weglassen.
- Keine Gedankenstriche (– oder —). Schreibe stattdessen kurze Sätze und nutze Punkt, Komma, Doppelpunkt oder Klammern. Bereiche schreibst du mit „bis“ (z. B. „80 bis 140“).
- Keine Verweise auf die Quelle im Text, also nicht „laut Vorlesung“, „die Vorlesung zeigt“, „in der Übung“, „laut Folie“. Schreib den Inhalt einfach direkt hin. Nur wenn die Quelle fachlich wichtig ist (z. B. weil sie vom Standard abweicht), darf ein kurzer Hinweis stehen.
- Fragen prüfen das Verständnis, nicht den genauen Wortlaut. Jede Frage bekommt eine kurze Erklärung (1 bis 2 Sätze).
- Mische die Fragetypen:
  - "choice": Auswahlfrage mit 3 oder 4 plausiblen Antworten, genau eine richtig. Die richtige steht nicht immer an derselben Stelle.
  - "binary": Entweder-oder mit genau 2 Antworten, gut für Fallbeispiele („Anna macht … Was passiert?“).
  - "truefalse": eine Aussage, die stimmt oder nicht stimmt.
  - "cloze": ein Satz mit genau einer Lücke ___ und 3 Antworten zum Einsetzen.
  - "recall": Karteikarte. Eine offene Frage ("question") und die Musterantwort ("answer", 1 bis 2 Sätze). Man überlegt sich die Antwort selbst, deckt sie auf und bewertet sich. Gut für „Warum …?“, „Erkläre …“, Definitionen und Formeln. Etwa eine pro Kachel, am besten als letzte Frage.
  - "order": Reihenfolge. Eine Aufgabe ("question") und 3 bis 5 kurze Einträge ("items") in der RICHTIGEN Reihenfolge. Die App mischt sie. Gut für Abläufe, Prozessketten und zeitliche Abfolgen. Nur verwenden, wenn die Reihenfolge eindeutig ist.
- Varianten: Gib jeder Frage 1 bis 2 Varianten in "variants". Eine Variante fragt dasselbe Wissen anders ab, mit einem anderen Beispiel, aus einer anderen Richtung oder als anderer Fragetyp. Bei jeder Wiederholung zeigt die App eine andere Variante, so lernt man den Inhalt statt den Wortlaut. Varianten haben dieselben Felder wie Fragen, aber keine eigenen "variants". Die Antwort darf nicht schon in der Hauptfrage stehen und umgekehrt.

Bilder (freiwillig):
- Nur wenn du dir sicher bist, dass es das Bild gibt: "image" mit einer direkten Adresse von upload.wikimedia.org und einer Quellenangabe in "credit" (Wer, Lizenz, „via Wikimedia Commons“).
- Bist du nicht ganz sicher, lass "image" weg. Ein falscher Link wird als fehlendes Bild angezeigt.

Code (nur bei Kursen übers Programmieren, z. B. HTML, CSS, JavaScript):
- Code im Satz steht in Backticks: \`display: flex\`. Das geht in allen Texten, auch in Antworten und in "items".
- Längerer Code steht in einem Codeblock: eine Zeile \`\`\`html (oder css, js), dann der Code, dann eine Zeile \`\`\`. Im JSON sind die Zeilenumbrüche \\n, z. B. "text": "Ein Beispiel:\\n\\n\`\`\`html\\n<ul>\\n  <li>Eins</li>\\n</ul>\\n\`\`\`". Einrückungen mit Leerzeichen bleiben erhalten. Codeblöcke gehen in Seiten, Fragen, Antworten, Erklärungen und Karteikarten, aber nicht im Lückentext. Höchstens etwa 12 Zeilen pro Block.
- Gute Fragen zu Code: „Was zeigt der Browser?“ (choice mit Codeblock in der Frage), „Wo steckt der Fehler?“ (choice), Code-Zeilen in die richtige Reihenfolge bringen ("order", jede Zeile in Backticks, Einrückung innerhalb der Backticks: "\`  <li>Eins</li>\`"), „Was bewirkt …?“ ("recall").

Format:
Antworte ausschließlich mit gültigem JSON in einem \`\`\`json-Codeblock, ohne Text davor oder danach. Halte dich genau an diese Struktur:

\`\`\`json
{
  "id": "thema-${stamp}",
  "title": "Titel des Kurses",
  "emoji": "📘",
  "color": "blau",
  "description": "Ein Satz, worum es in dem Kurs geht.",
  "tiles": [
    {
      "id": "kachel-1",
      "title": "Titel der Kachel",
      "emoji": "🔬",
      "intro": ["Erste Leitfrage?", "Zweite Leitfrage?"],
      "steps": [
        { "type": "text", "title": "Überschrift der Seite", "text": "Erster Absatz mit einem **Schlüsselbegriff** …\\n\\nZweiter Absatz …" },
        { "type": "choice", "question": "Frage zur Seite?", "options": ["Antwort A", "Antwort B", "Antwort C"], "answer": 1, "explanation": "Warum Antwort B stimmt.", "variants": [
          { "type": "choice", "question": "Dieselbe Sache an einem anderen Beispiel?", "options": ["Antwort X", "Antwort Y", "Antwort Z"], "answer": 2, "explanation": "Warum Z stimmt." },
          { "type": "truefalse", "statement": "Eine Aussage, die dasselbe Wissen prüft.", "answer": true, "explanation": "Warum." }
        ] },
        { "type": "text", "title": "Nächste Seite", "text": "…", "image": { "src": "https://upload.wikimedia.org/…", "credit": "Bild: Name, Lizenz, via Wikimedia Commons" } },
        { "type": "binary", "question": "Ein Fallbeispiel: Was ist richtig?", "options": ["Erste Möglichkeit", "Zweite Möglichkeit"], "answer": 0, "explanation": "Warum." },
        { "type": "text", "title": "Dritte Seite", "text": "…" },
        { "type": "cloze", "text": "Ein Satz mit einer ___ darin.", "options": ["Lücke", "Wand", "Tür"], "answer": 0, "explanation": "Warum." },
        { "type": "truefalse", "statement": "Eine Aussage zur ganzen Kachel.", "answer": false, "explanation": "Warum sie nicht stimmt." },
        { "type": "order", "question": "Bringe die Schritte in die richtige Reihenfolge.", "items": ["Erster Schritt", "Zweiter Schritt", "Dritter Schritt"], "explanation": "Warum diese Reihenfolge." },
        { "type": "recall", "question": "Eine offene Frage zur ganzen Kachel: Warum ist das so?", "answer": "Die Musterantwort in ein bis zwei Sätzen.", "explanation": "Optional: ein zusätzlicher Hinweis." }
      ],
      "recap": ["Erste Kernaussage.", "Zweite Kernaussage.", "Dritte Kernaussage."]
    }
  ]
}
\`\`\`

Regeln für das JSON:
- "id" des Kurses: kurzer Name zum Thema aus Kleinbuchstaben, Ziffern und Bindestrichen, gefolgt von -${stamp} (z. B. "photosynthese-${stamp}"). So überschneidet er sich nicht mit anderen Kursen.
- Jede Kachel hat eine eigene "id" ("kachel-1", "kachel-2", …) und ein passendes Emoji.
- "color" ist einer dieser Namen: ${COURSE_COLOR_NAMES.join(', ')}.
- "answer" bei "choice", "binary" und "cloze" ist die Nummer der richtigen Antwort in "options", gezählt ab 0 (0 = erste Antwort).
- "answer" bei "truefalse" ist true oder false (ohne Anführungszeichen).
- Der Lückentext enthält genau eine Lücke aus drei Unterstrichen: ___
- "recall" hat "question" und "answer" (beides Text), keine "options". "order" hat "question" und "items" (3 bis 6 verschiedene Einträge in der richtigen Reihenfolge), kein "answer".
- "variants" ist eine Liste mit 1 bis 5 Fragen (keine Seiten) und steht nur bei Fragen.
- Gehören mehrere Kurse zum selben Themengebiet (z. B. mehrere Teile einer Vorlesung), gib ihnen dasselbe "group" (z. B. "group": "Fertigungstechnik"). Sie stehen dann auf der Karte beieinander. Sonst lass "group" weg.
- Nur gerade Anführungszeichen ("), keine Kommentare, kein Komma nach dem letzten Element einer Liste.

Wenn ich dich später bitte, einen bestehenden Kurs zu überarbeiten, behalte seine "id", die IDs der Kacheln und den Wortlaut der bestehenden Fragen bei. Dann ersetzt die App den alten Kurs und mein Fortschritt bleibt erhalten. Neue Varianten darfst du jederzeit ergänzen; sie ändern den Fortschritt nicht.`
}

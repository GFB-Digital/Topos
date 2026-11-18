import type { Tile } from '../../lib/types.ts'
import { code, page } from './helpers.ts'

// Teil 1 – CSS-Grundlagen (Vorlesungen 4 und 5)

export const CSS_TILES: Tile[] = [
  {
    id: 'v4-2',
    title: 'CSS: Regeln und Selektoren',
    intro: ['Wie ist eine CSS-Regel aufgebaut?', 'Wie wählt man genau die richtigen Elemente aus?'],
    steps: [
      {
        type: 'text',
        title: 'Aufbau einer Regel',
        text: page(
          'HTML sagt, *was* auf der Seite steht. **CSS** (Cascading Style Sheets) sagt, *wie* es aussieht: Farben, Schriften, Abstände, Layout. Eine CSS-Regel sieht so aus:',
          code('css', 'p {', '  color: red;', '}'),
          '`p` ist der **Selektor**: Er wählt aus, für welche Elemente die Regel gilt – hier alle Absätze. In den geschweiften Klammern stehen **Deklarationen**. Jede besteht aus einer **Eigenschaft** (`color`) und einem **Wert** (`red`), getrennt durch einen Doppelpunkt und abgeschlossen mit einem Semikolon.',
        ),
      },
      {
        type: 'choice',
        question: 'Was ist in dieser Regel die Eigenschaft?\n\n' + code('css', 'h1 { font-size: 2rem; }'),
        options: ['`font-size`', '`h1`', '`2rem`', '`{ }`'],
        answer: 0,
        explanation: 'h1 ist der Selektor, font-size die Eigenschaft, 2rem der Wert.',
        variants: [
          {
            type: 'choice',
            question: 'Was ist in dieser Regel der Wert?\n\n' + code('css', 'nav { background-color: navy; }'),
            options: ['`navy`', '`background-color`', '`nav`', '`;`'],
            answer: 0,
            explanation: 'nav ist der Selektor, background-color die Eigenschaft, navy der Wert.',
          },
        ],
      },
      {
        type: 'text',
        title: 'CSS einbinden',
        text: page(
          'Es gibt zwei übliche Wege: CSS direkt in einem `style`-Element im **head** – oder, besser für größere Seiten, in einer eigenen Datei, die du mit `link` einbindest:',
          code('html', '<head>', '  <link rel="stylesheet" href="style.css">', '</head>'),
          'Die eigene Datei hat Vorteile: Mehrere Seiten können dasselbe Stylesheet nutzen, und HTML und Gestaltung bleiben getrennt. Beide Wege gehören in den head – ein `style`-Element mitten im Dokument oder nach dem body ist falsch, auch wenn der Browser es oft trotzdem anwendet.',
        ),
      },
      {
        type: 'binary',
        question: 'Wo bindest du eine CSS-Datei mit `<link rel="stylesheet" href="style.css">` ein?',
        options: ['Im `head`', 'Am Ende nach `</body>`'],
        answer: 0,
        explanation: 'link-Elemente für Stylesheets gehören in den head. Nach dem body darf nichts mehr stehen.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Ein `<style>`-Element darf nach `</body>` stehen, weil der Browser es trotzdem anwendet.',
            answer: false,
            explanation: 'Dass der Browser es oft trotzdem anwendet, macht den Code nicht richtig. style gehört in den head.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Typ, Klasse, ID',
        text: page(
          'Die drei wichtigsten Selektoren:',
          code('css', 'p { … }          /* Typ: alle p-Elemente */', '.hinweis { … }   /* Klasse: alle mit class="hinweis" */', '#start { … }     /* ID: das Element mit id="start" */'),
          'Eine **Klasse** darf beliebig oft vorkommen, und ein Element kann mehrere Klassen haben: `class="hinweis gross"`. Eine **ID** soll es auf einer Seite nur einmal geben.',
          'Mehrere Selektoren mit Komma teilen sich eine Regel: `h1, h2, h3 { color: darkblue; }`. Ein Sternchen `*` wählt alle Elemente aus.',
        ),
      },
      {
        type: 'cloze',
        text: 'Ein Klassen-Selektor beginnt in CSS mit einem ___.',
        options: ['Punkt `.`', 'Rautezeichen `#`', 'Sternchen `*`'],
        answer: 0,
        explanation: '`.name` wählt eine Klasse, `#name` eine ID, `*` alle Elemente.',
        variants: [
          {
            type: 'choice',
            question: 'Welcher Selektor trifft `<div id="kopf">`?',
            options: ['`#kopf`', '`.kopf`', '`kopf`', '`*kopf`'],
            answer: 0,
            explanation: 'Eine ID wählst du mit #. `.kopf` würde eine Klasse suchen, `kopf` ein Element namens kopf.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was ist der Unterschied zwischen einer Klasse und einer ID?',
        answer: 'Eine Klasse (Selektor .name) darf beliebig oft vorkommen und ein Element kann mehrere haben. Eine ID (Selektor #name) ist auf der Seite eindeutig.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Ein Element kann mehrere Klassen gleichzeitig haben, z. B. `class="hinweis gross"`.',
            answer: true,
            explanation: 'Klassen werden durch Leerzeichen getrennt. Dann gelten die Regeln für .hinweis und für .gross.',
          },
        ],
      },
    ],
    recap: [
      'CSS-Regel = Selektor { Eigenschaft: Wert; }',
      'CSS gehört in ein style-Element im head oder in eine eigene Datei, eingebunden mit link im head.',
      'Selektoren: p (Typ), .klasse (Klasse), #id (ID); mit Komma mehrere auf einmal.',
    ],
  },
  {
    id: 'v4-3',
    title: 'Text gestalten',
    intro: ['Wie gibt man Farben in CSS an?', 'Was ist der Unterschied zwischen px, em und rem?'],
    steps: [
      {
        type: 'text',
        title: 'Farben',
        text: page(
          '`color` ändert die Textfarbe, `background-color` die Hintergrundfarbe. Farben kannst du auf mehrere Arten angeben:',
          code('css', 'color: red;                     /* Name */', 'color: #ff0000;                 /* Hex-Wert */', 'color: rgb(255, 0, 0);          /* Rot, Grün, Blau */', 'color: rgba(255, 0, 0, 0.5);    /* halb durchsichtig */'),
          'Bei `rgb` geht jeder Kanal von 0 bis 255. Der vierte Wert bei `rgba` ist die Deckkraft von 0 (unsichtbar) bis 1 (deckend). Es gibt außerdem `hsl` (Farbton, Sättigung, Helligkeit). Namen wie `bisque` oder `lightblue` sind bequem, Hex-Werte genauer.',
        ),
      },
      {
        type: 'choice',
        question: 'Was bewirkt `rgba(0, 0, 255, 0.5)`?',
        options: ['Blau, halb durchsichtig', 'Rot, halb durchsichtig', 'Blau, halb so hell', 'Grün mit 50 % Sättigung'],
        answer: 0,
        explanation: 'Die Werte sind Rot, Grün, Blau, Deckkraft. 0, 0, 255 ist reines Blau, 0.5 heißt halb durchsichtig.',
        variants: [
          {
            type: 'choice',
            question: 'Welche Farbe ergibt `rgb(0, 255, 0)`?',
            options: ['Grün', 'Rot', 'Blau', 'Schwarz'],
            answer: 0,
            explanation: 'Die Reihenfolge ist Rot, Grün, Blau – hier ist nur der Grün-Kanal voll.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Schrift',
        text: page(
          '`font-family` wählt die Schriftart. Gib eine Liste an – der Browser nimmt die erste, die er hat. Am Ende steht eine allgemeine Familie als Rückfall: `serif`, `sans-serif` oder `monospace`.',
          code('css', 'body {', '  font-family: Arial, sans-serif;', '}'),
          '`font-size` setzt die Größe. **px** sind feste Pixel. **em** bezieht sich auf die Schriftgröße des Elternelements: `2em` ist doppelt so groß. **rem** bezieht sich immer auf die Schriftgröße des Wurzelelements `html` und ist darum leichter vorherzusagen.',
          '`font-weight` regelt die Strichstärke: `normal`, `bold` oder Zahlen in Hunderterschritten von 100 bis 900.',
        ),
      },
      {
        type: 'binary',
        question: 'Du willst, dass eine Größe immer relativ zur Schriftgröße von `html` ist, egal wie tief das Element steckt. Welche Einheit nimmst du?',
        options: ['`rem`', '`em`'],
        answer: 0,
        explanation: 'rem = root em, bezieht sich immer auf html. em hängt vom jeweiligen Elternelement ab und kann sich beim Verschachteln aufschaukeln.',
        variants: [
          {
            type: 'choice',
            question: 'Das Elternelement hat `font-size: 20px`. Wie groß ist darin ein Text mit `font-size: 1.5em`?',
            options: ['30 px', '20 px', '15 px', '24 px'],
            answer: 0,
            explanation: 'em bezieht sich auf die Schriftgröße des Elternelements: 1,5 × 20 px = 30 px.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Ausrichtung und Verzierung',
        text: page(
          '`text-align` richtet Text aus: `left`, `right`, `center` oder `justify` (Blocksatz). `text-decoration` setzt Linien: `underline`, `overline`, `line-through`, auch mit Farbe und Stil, etwa `underline wavy red`. `text-transform` ändert die Schreibweise (`uppercase`, `lowercase`, `capitalize`), `font-style: italic` macht kursiv.',
          '`text-shadow` erzeugt einen Schatten mit vier Angaben: horizontaler Versatz, vertikaler Versatz, Unschärfe, Farbe.',
          code('css', 'h1 {', '  text-shadow: 2px 2px 4px gray;', '}'),
          'Tipp: Unterstrichener blauer Text sieht für viele Menschen wie ein Link aus. Nutze diese Kombination nur für echte Links.',
        ),
      },
      {
        type: 'order',
        question: 'In welcher Reihenfolge stehen die Werte bei `text-shadow`?',
        items: ['horizontaler Versatz', 'vertikaler Versatz', 'Unschärfe (Blur)', 'Farbe'],
        explanation: 'Beispiel: `text-shadow: 2px 2px 4px gray;` – erst x, dann y, dann Unschärfe, dann Farbe.',
        variants: [
          {
            type: 'choice',
            question: 'Was legt der dritte Wert in `text-shadow: 3px 1px 6px black;` fest?',
            options: ['Die Unschärfe', 'Den senkrechten Versatz', 'Die Schriftgröße', 'Den waagerechten Versatz'],
            answer: 0,
            explanation: 'Erst waagerechter, dann senkrechter Versatz, dann Unschärfe (hier 6px), zuletzt die Farbe.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Warum schreibt man bei `font-family` mehrere Schriften und am Ende z. B. `sans-serif`?',
        answer: 'Der Browser nimmt die erste verfügbare Schrift der Liste. Die allgemeine Familie am Ende ist der Rückfall, falls keine der genannten Schriften vorhanden ist.',
        variants: [
          {
            type: 'choice',
            question: 'Bei `font-family: Verdana, Arial, sans-serif;` fehlt Verdana auf dem Gerät, Arial ist vorhanden. Welche Schrift erscheint?',
            options: ['Arial', 'Verdana', 'Irgendeine serifenlose Schrift', 'Die Standardschrift des Browsers'],
            answer: 0,
            explanation: 'Der Browser geht die Liste von vorn durch und nimmt die erste vorhandene Schrift. sans-serif käme erst, wenn auch Arial fehlt.',
          },
        ],
      },
    ],
    recap: [
      'Farben als Name, Hex (#ff0000), rgb() oder rgba() mit Deckkraft.',
      'px ist fest, em relativ zum Elternelement, rem relativ zu html.',
      'font-family mit Rückfall-Liste; text-align, text-decoration, text-shadow für den Feinschliff.',
    ],
  },
  {
    id: 'v5-1',
    title: 'Selektoren kombinieren',
    intro: ['Was ist der Unterschied zwischen `A B` und `A > B`?', 'Was sind Pseudo-Klassen?'],
    steps: [
      {
        type: 'text',
        title: 'Nachfahren, Kinder, Geschwister',
        text: page(
          'Selektoren lassen sich kombinieren. Das Zeichen dazwischen bestimmt die Beziehung:',
          code('css', 'footer p     /* alle p irgendwo im footer (Nachfahren) */', 'footer > p   /* nur p direkt im footer (Kinder) */', 'h2 + p       /* das p direkt nach einem h2 */', 'h2 ~ p       /* alle p, die nach einem h2 folgen (Geschwister) */'),
          'Das Leerzeichen ist also nicht egal! `footer p` trifft auch ein p, das in einer section im footer steckt. `footer > p` trifft nur Absätze, deren direkter Elternknoten der footer ist.',
        ),
      },
      {
        type: 'binary',
        question: 'Ein `p` steckt in einer `section`, die im `footer` steht. Welcher Selektor trifft es?',
        options: ['`footer p`', '`footer > p`'],
        answer: 0,
        explanation: 'Mit Leerzeichen zählen alle Nachfahren. `>` verlangt, dass p ein direktes Kind von footer ist – hier liegt die section dazwischen.',
        variants: [
          {
            type: 'choice',
            question: 'Welche Elemente trifft `nav > a`?',
            options: [
              'Nur Links, die direkt im nav stehen',
              'Alle Links irgendwo im nav',
              'Den ersten Link nach einem nav',
              'Alle nav-Elemente, die einen Link enthalten',
            ],
            answer: 0,
            explanation: '`>` verlangt ein direktes Kind. Ein Link in einem li innerhalb von nav wird also nicht getroffen – dafür bräuchte es `nav a`.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Pseudo-Klassen',
        text: page(
          'Mit einem Doppelpunkt wählst du Elemente in einem bestimmten **Zustand** oder an einer bestimmten **Stelle im Baum**:',
          code('css', 'a:hover              /* Maus über dem Link */', 'a:visited            /* schon besuchter Link */', 'li:first-child       /* erstes Kind seines Elternelements */', 'aside:first-of-type  /* erstes aside unter seinen Geschwistern */', 'p:nth-of-type(2)     /* zweites p */', 'li:nth-child(2n)     /* jedes zweite li */'),
          'Der Unterschied: `first-child` verlangt, dass das Element das allererste Kind ist. `first-of-type` zählt nur Geschwister **desselben Typs**. In einem body mit header, aside, main, aside trifft `aside:first-of-type` das erste aside, obwohl davor ein header steht.',
        ),
      },
      {
        type: 'choice',
        question: 'Im body stehen nacheinander `header`, `aside`, `main`, `aside`. Was trifft `body > aside:last-of-type`?',
        options: ['Das zweite aside', 'Das erste aside', 'Nichts, weil aside nicht das letzte Kind ist', 'Beide aside'],
        answer: 0,
        explanation: 'last-of-type zählt nur die aside-Geschwister. Das letzte davon ist das zweite aside – auch wenn danach noch andere Elemente kämen.',
        variants: [
          {
            type: 'choice',
            question: 'In einer Liste stehen fünf `li`. Welche trifft `li:nth-child(2n)`?',
            options: ['Das zweite und das vierte', 'Das erste, dritte und fünfte', 'Nur das zweite', 'Alle ab dem zweiten'],
            answer: 0,
            explanation: '2n heißt 2, 4, 6 … – also jedes zweite li, beginnend beim zweiten.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Attribute und Pseudo-Elemente',
        text: page(
          'Auch nach Attributen lässt sich auswählen: `[href]` trifft alles mit einem href, `[href^="https"]` alles, dessen href mit „https“ beginnt, `$=` heißt „endet mit“, `*=` heißt „enthält“.',
          'Mit zwei Doppelpunkten wählst du **Pseudo-Elemente** – Teile, die nicht als eigenes Element im HTML stehen: `::first-letter` (erster Buchstabe), `::first-line`, `::selection` (markierter Text). Mit `::before` und `::after` fügst du über die Eigenschaft `content` etwas ein:',
          code('css', 'a[href^="https"]::after {', '  content: " ↗";', '}'),
        ),
      },
      {
        type: 'cloze',
        text: 'Pseudo-Klassen wie `:hover` haben einen Doppelpunkt, Pseudo-Elemente wie `::before` haben ___.',
        options: ['zwei Doppelpunkte', 'ein Rautezeichen', 'eckige Klammern'],
        answer: 0,
        explanation: 'Ein Doppelpunkt für Zustände und Positionen, zwei für Teile wie ::before, ::after oder ::first-letter.',
        variants: [
          {
            type: 'truefalse',
            statement: '`a:hover` ist ein Pseudo-Element.',
            answer: false,
            explanation: 'hover beschreibt einen Zustand – eine Pseudo-Klasse mit einem Doppelpunkt. Pseudo-Elemente wie ::before haben zwei.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was ist der Unterschied zwischen `li:first-child` und `li:first-of-type`?',
        answer: 'first-child trifft ein li nur, wenn es das allererste Kind seines Elternelements ist. first-of-type trifft das erste li unter seinen Geschwistern, auch wenn davor andere Elemente stehen.',
        variants: [
          {
            type: 'choice',
            question: 'Was trifft `p:first-child` hier?\n\n' + code('html', '<section>', '  <h2>Titel</h2>', '  <p>Eins</p>', '  <p>Zwei</p>', '</section>'),
            options: ['Nichts – das erste Kind ist das h2', 'Den Absatz „Eins“', 'Den Absatz „Zwei“', 'Beide Absätze'],
            answer: 0,
            explanation: 'first-child verlangt, dass das p das allererste Kind ist. Hier steht das h2 davor. `p:first-of-type` würde „Eins“ treffen.',
          },
        ],
      },
    ],
    recap: [
      'Leerzeichen = Nachfahren, > = direkte Kinder, + = direkt folgendes Geschwister, ~ = folgende Geschwister.',
      'Pseudo-Klassen mit einem Doppelpunkt: :hover, :first-child, :nth-of-type(2) …',
      'Pseudo-Elemente mit zwei Doppelpunkten: ::before, ::after, ::first-letter.',
    ],
  },
  {
    id: 'v5-2',
    title: 'Die Kaskade: Wer gewinnt?',
    intro: ['Was passiert, wenn zwei Regeln sich widersprechen?', 'Welche Eigenschaften werden vererbt?'],
    steps: [
      {
        type: 'text',
        title: 'Spätere Regeln gewinnen',
        text: page(
          'Oft treffen mehrere Regeln dasselbe Element und widersprechen sich. Welche gilt, entscheidet die **Kaskade** – das „C“ in CSS.',
          'Die einfachste Regel: Sind zwei Selektoren gleich spezifisch, gewinnt die **spätere**:',
          code('css', 'p { color: blue; }', 'p { color: green; }   /* gewinnt */'),
          'Außerdem zählt die **Herkunft**: Der Browser hat eigene Standard-Styles (deshalb sind Überschriften ohne CSS schon groß und fett). Deine Regeln als Autor der Seite überschreiben diese.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Bei zwei gleich spezifischen Regeln gewinnt die, die weiter oben im CSS steht.',
        answer: false,
        explanation: 'Umgekehrt: Bei gleicher Spezifität gewinnt die Regel, die später kommt.',
        variants: [
          {
            type: 'choice',
            question: 'Welche Farbe haben die Absätze?\n\n' + code('css', 'p { color: blue; }', 'p { color: green; }'),
            options: ['Grün', 'Blau', 'Eine Mischfarbe', 'Schwarz'],
            answer: 0,
            explanation: 'Beide Selektoren sind gleich spezifisch, also gewinnt die spätere Regel.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Spezifität',
        text: page(
          'Wichtiger als die Reihenfolge ist die **Spezifität**: Je genauer ein Selektor ein Element trifft, desto stärker ist er – auch wenn er früher steht.',
          'Die Rangfolge: **ID** schlägt **Klasse**, Klasse schlägt **Typ**. Mehrere Klassen schlagen eine Klasse.',
          code('css', '#start { color: red; }     /* gewinnt: ID */', '.titel { color: blue; }', 'h1 { color: green; }'),
          'Mit `!important` hinter einem Wert drehst du die Kaskade um. Das solltest du vermeiden: Es macht CSS schwer durchschaubar, und am Ende kämpfen mehrere `!important` gegeneinander.',
          'In den Entwicklerwerkzeugen des Browsers siehst du für jedes Element, welche Regeln gelten und welche durchgestrichen sind.',
        ),
      },
      {
        type: 'choice',
        question: 'Welche Farbe hat die Überschrift?\n\n' + code('html', '<h1 id="start" class="titel">Hallo</h1>') + '\n\n' + code('css', '#start { color: red; }', '.titel { color: blue; }', 'h1 { color: green; }'),
        options: ['Rot', 'Blau', 'Grün', 'Schwarz'],
        answer: 0,
        explanation: 'Der ID-Selektor ist am spezifischsten und gewinnt, obwohl die anderen Regeln später kommen.',
        variants: [
          {
            type: 'choice',
            question: 'Welche Farbe hat der Absatz?\n\n' + code('html', '<p class="hinweis">Achtung</p>') + '\n\n' + code('css', '.hinweis { color: orange; }', 'p { color: gray; }'),
            options: ['Orange', 'Grau', 'Schwarz'],
            answer: 0,
            explanation: 'Der Klassen-Selektor ist spezifischer als der Typ-Selektor – dass `p` später steht, hilft ihm nicht.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Vererbung',
        text: page(
          'Manche Eigenschaften **erben** Kinder von ihren Eltern. Setzt du `font-family` oder `color` am body, gilt das für die ganze Seite – außer ein Element bekommt etwas anderes.',
          'Vererbt werden vor allem Texteigenschaften: Farbe, Schrift, Schriftgröße, Zeilenhöhe. **Nicht** vererbt werden Eigenschaften der Box: `margin`, `padding`, `border`, `width`, `background-color`. Sonst hätte jedes Kind denselben Rahmen wie sein Elternelement.',
          code('css', 'html {', '  font-family: Arial;   /* gilt für alles */', '}'),
        ),
      },
      {
        type: 'binary',
        question: 'Du gibst dem body einen `border`. Bekommen alle Absätze darin auch einen Rahmen?',
        options: ['Nein, border wird nicht vererbt', 'Ja, alle Kinder erben den Rahmen'],
        answer: 0,
        explanation: 'Box-Eigenschaften wie border, margin und padding werden nicht vererbt – Texteigenschaften wie color und font-family schon.',
        variants: [
          {
            type: 'binary',
            question: 'Du setzt `color: navy` am body. Werden die Absätze darin auch dunkelblau?',
            options: ['Ja, color wird vererbt', 'Nein, Farben werden nicht vererbt'],
            answer: 0,
            explanation: 'Texteigenschaften wie color werden vererbt – solange kein Absatz eine eigene Farbe bekommt.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Nenne die Rangfolge der Selektoren nach Spezifität und was bei Gleichstand entscheidet.',
        answer: 'ID schlägt Klasse, Klasse schlägt Typ (mehr Klassen schlagen weniger). Bei gleicher Spezifität gewinnt die Regel, die später steht.',
        variants: [
          {
            type: 'order',
            question: 'Ordne die Selektoren nach Spezifität, vom stärksten zum schwächsten.',
            items: ['`#start`', '`.titel.gross`', '`.titel`', '`h1`'],
            explanation: 'Die ID gewinnt, dann zwei Klassen vor einer Klasse, der Typ-Selektor ist am schwächsten.',
          },
        ],
      },
    ],
    recap: [
      'Bei gleicher Spezifität gewinnt die spätere Regel.',
      'Spezifität: ID > Klasse > Typ; !important dreht die Kaskade um – vermeiden.',
      'Texteigenschaften werden vererbt, Box-Eigenschaften wie margin, padding, border nicht.',
    ],
  },
  {
    id: 'v5-3',
    title: 'Das Box-Modell',
    intro: ['Was ist der Unterschied zwischen padding und margin?', 'Was macht box-sizing: border-box?'],
    steps: [
      {
        type: 'text',
        title: 'Block und inline',
        text: page(
          'Ohne weitere Angaben ordnet der Browser Elemente im **Flow-Layout** an. Es gibt zwei Sorten:',
          '**Block-Elemente** wie `p`, `div`, `section` oder `h1` beginnen in einer neuen Zeile und sind so breit wie ihr Elternelement. Ihre Höhe richtet sich nach dem Inhalt.',
          '**Inline-Elemente** wie `a`, `strong` oder `span` stehen im Textfluss, ohne Zeilenumbruch, und sind nur so breit wie ihr Inhalt.',
          'Mit `width` und `height` kannst du Größen festlegen: in `px`, in `%` vom Elternelement, in `vw`/`vh` (Prozent der Fensterbreite bzw. -höhe) oder in `em`/`rem`.',
        ),
      },
      {
        type: 'binary',
        question: 'Wie breit ist ein `p`-Element ohne CSS?',
        options: ['So breit wie sein Elternelement', 'So breit wie sein Text'],
        answer: 0,
        explanation: 'p ist ein Block-Element und nimmt die volle Breite ein. Nur Inline-Elemente sind so breit wie ihr Inhalt.',
        variants: [
          {
            type: 'binary',
            question: 'Wie breit ist ein `<a>`-Element ohne CSS?',
            options: ['So breit wie sein Text', 'So breit wie sein Elternelement'],
            answer: 0,
            explanation: 'a ist ein Inline-Element: Es steht im Textfluss und ist nur so breit wie sein Inhalt.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Innen, Rand, außen',
        text: page(
          'Jedes Element ist eine **Box** aus vier Schichten, von innen nach außen:',
          '**Inhalt** – der Text oder das Bild. **Padding** – Innenabstand zwischen Inhalt und Rahmen. **Border** – der Rahmen. **Margin** – Außenabstand zu anderen Elementen.',
          code('css', 'section {', '  padding: 10px;', '  border: 5px solid beige;', '  border-radius: 2rem;   /* runde Ecken */', '  margin-bottom: 20px;', '}'),
          'Ein Hintergrund reicht bis zum Rahmen, also auch unter das padding – aber nicht in den margin.',
        ),
      },
      {
        type: 'order',
        question: 'Bring die Schichten der Box in die Reihenfolge von innen nach außen.',
        items: ['Inhalt', 'padding', 'border', 'margin'],
        explanation: 'Innen der Inhalt, dann der Innenabstand, dann der Rahmen, außen der Abstand zu den Nachbarn.',
        variants: [
          {
            type: 'choice',
            question: 'Bis wohin reicht die Hintergrundfarbe eines Elements?',
            options: ['Bis zum Rahmen, also auch unter das padding', 'Nur unter den Inhalt', 'Bis in den margin hinein', 'Nur unter den Rahmen'],
            answer: 0,
            explanation: 'Der Hintergrund liegt unter Inhalt, padding und Rahmen. Der margin bleibt durchsichtig.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Kurzschreibweisen und Zentrieren',
        text: page(
          '`padding` und `margin` nehmen bis zu vier Werte, **im Uhrzeigersinn ab oben**: oben, rechts, unten, links. Bei zwei Werten gilt der erste für oben und unten, der zweite für rechts und links.',
          code('css', 'margin: 10px 20px 30px 40px;  /* oben rechts unten links */', 'margin: 0 auto;                /* oben/unten 0, links/rechts automatisch */'),
          '`margin: 0 auto` **zentriert** ein Block-Element mit fester Breite: Links und rechts wird gleich viel freier Platz verteilt.',
          'Und noch ein Stolperstein: Normalerweise kommen padding und border zur `width` **dazu** (`box-sizing: content-box`). Mit `box-sizing: border-box` sind sie in der Breite schon enthalten – das rechnet sich viel leichter, deshalb stellen es die meisten Entwickler für alle Elemente so ein.',
        ),
      },
      {
        type: 'choice',
        question: 'Ein Element hat `width: 200px; padding: 10px; border: 5px solid;` und `box-sizing: content-box`. Wie breit ist es insgesamt?',
        options: ['230 px', '200 px', '215 px', '210 px'],
        answer: 0,
        explanation: 'Bei content-box kommen padding und border links und rechts dazu: 200 + 2 × 10 + 2 × 5 = 230 px. Mit border-box wären es genau 200 px.',
        variants: [
          {
            type: 'choice',
            question: 'Ein Element hat `width: 300px; padding: 20px; border: 2px solid;` und `box-sizing: border-box`. Wie breit ist es insgesamt?',
            options: ['300 px', '344 px', '340 px', '322 px'],
            answer: 0,
            explanation: 'Bei border-box sind padding und border schon in der width enthalten. Mit content-box wären es 300 + 40 + 4 = 344 px.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was bedeutet `margin: 10px 20px;`?',
        answer: 'Oben und unten 10 px Außenabstand, rechts und links 20 px.',
        variants: [
          {
            type: 'choice',
            question: 'Was bedeutet `padding: 5px 0 15px 0;`?',
            options: [
              'Oben 5 px, unten 15 px, links und rechts 0',
              'Links 5 px, rechts 15 px, oben und unten 0',
              'Oben 5 px, rechts 0, links 15 px, unten 0',
              'Überall zwischen 5 und 15 px',
            ],
            answer: 0,
            explanation: 'Vier Werte gelten im Uhrzeigersinn ab oben: oben 5px, rechts 0, unten 15px, links 0.',
          },
        ],
      },
    ],
    recap: [
      'Block-Elemente nehmen die volle Breite, Inline-Elemente nur die Breite ihres Inhalts.',
      'Box von innen nach außen: Inhalt, padding, border, margin.',
      'Mehrere Werte im Uhrzeigersinn ab oben; margin: 0 auto zentriert; border-box rechnet padding und border in die Breite ein.',
    ],
  },
]

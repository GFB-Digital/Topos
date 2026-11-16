import type { Tile } from '../../lib/types.ts'
import { code, page } from './helpers.ts'

// Teil 1 – Layout mit Grid, Flexbox und Responsive Design (Vorlesungen 5–8)

export const LAYOUT_TILES: Tile[] = [
  {
    id: 'v6-1',
    title: 'Grid: Spalten und Zeilen',
    intro: ['Wie macht man aus einem Element ein Raster?', 'Was bedeutet die Einheit fr?'],
    steps: [
      {
        type: 'text',
        title: 'display: grid',
        text: page(
          'Mit `display: grid` wird ein Element zum **Grid-Container**. Seine direkten Kinder werden zu **Grid-Items**, die in einem Raster aus Zeilen und Spalten liegen.',
          'Zuerst passiert scheinbar nichts: Das Grid hat nur eine Spalte und so viele Zeilen wie Kinder. Erst mit `grid-template-columns` legst du Spalten an:',
          code('css', 'body {', '  display: grid;', '  grid-template-columns: 100px 1fr 100px;', '}'),
          'Gibt es mehr Kinder als Spalten, beginnt automatisch eine neue Zeile. Die Kinder werden von links nach rechts und von oben nach unten einsortiert – in der Reihenfolge, in der sie im HTML stehen.',
        ),
      },
      {
        type: 'binary',
        question: 'Auf welche Elemente wirkt `display: grid` direkt als Raster?',
        options: ['Auf die direkten Kinder des Containers', 'Auf alle Nachfahren des Containers'],
        answer: 0,
        explanation: 'Nur direkte Kinder werden Grid-Items. Enkel liegen in ihrem Elternelement und werden nicht ins Raster einsortiert.',
      },
      {
        type: 'text',
        title: 'Die Einheit fr',
        text: page(
          '**fr** steht für „fraction“, also Anteil. Alle fr-Spalten teilen sich den Platz, der **nach Abzug der festen Spalten** übrig bleibt:',
          code('css', 'grid-template-columns: 100px 1fr 3fr 100px;'),
          'Hier sind die äußeren Spalten je 100 px breit. Vom Rest bekommt die zweite Spalte 1 von 4 Anteilen, die dritte 3 von 4.',
          '`repeat(3, 1fr)` ist die Kurzform für `1fr 1fr 1fr`. `auto` macht eine Spalte so breit wie ihr Inhalt. `minmax(100px, 1fr)` heißt: mindestens 100 px, höchstens ein Anteil.',
        ),
      },
      {
        type: 'choice',
        question: 'Ein Container ist 600 px breit und hat `grid-template-columns: 200px 1fr 1fr;`. Wie breit ist die zweite Spalte (ohne gap)?',
        options: ['200 px', '300 px', '400 px', '100 px'],
        answer: 0,
        explanation: 'Nach Abzug der festen 200 px bleiben 400 px. Die zwei fr-Spalten teilen sie sich: je 200 px.',
      },
      {
        type: 'text',
        title: 'Zeilen und Lücken',
        text: page(
          'Zeilen funktionieren genauso mit `grid-template-rows`. Ohne Angabe sind Zeilen so hoch wie ihr höchster Inhalt. Damit fr bei Zeilen etwas bedeutet, braucht der Container eine Höhe, zum Beispiel `height: 100vh` (volle Fensterhöhe).',
          'Zeilen, die automatisch dazukommen, heißen **implizite Zeilen**. Ihre Höhe setzt du mit `grid-auto-rows`.',
          '`gap` erzeugt Lücken zwischen Zeilen und Spalten, `row-gap` und `column-gap` jeweils nur in einer Richtung:',
          code('css', '.galerie {', '  display: grid;', '  grid-template-columns: repeat(3, 1fr);', '  gap: 1rem;', '}'),
        ),
      },
      {
        type: 'cloze',
        text: 'Statt `1fr 1fr 1fr 1fr` schreibst du kürzer ___.',
        options: ['`repeat(4, 1fr)`', '`4fr`', '`auto 4`'],
        answer: 0,
        explanation: '`4fr` wäre eine einzige Spalte mit 4 Anteilen. repeat wiederholt die Angabe.',
      },
      {
        type: 'recall',
        question: 'Was macht `grid-template-columns: 100px 1fr 100px;`?',
        answer: 'Drei Spalten: links und rechts je 100 px fest, die mittlere nimmt den ganzen restlichen Platz. Das ist das Grundgerüst des Holy-Grail-Layouts.',
      },
    ],
    recap: [
      'display: grid macht ein Element zum Raster; seine direkten Kinder sind die Items.',
      'fr verteilt den Platz, der nach festen Spalten übrig bleibt; repeat und minmax sparen Arbeit.',
      'gap setzt Lücken; grid-auto-rows bestimmt die Höhe automatisch angelegter Zeilen.',
    ],
  },
  {
    id: 'v6-2',
    title: 'Grid: Elemente platzieren',
    intro: ['Wie lässt man ein Element über mehrere Zellen reichen?', 'Wie funktionieren grid-template-areas?'],
    steps: [
      {
        type: 'text',
        title: 'Linien statt Zellen',
        text: page(
          'Die Linien des Rasters sind **nummeriert**: Die senkrechten Linien von links nach rechts ab 1, die waagerechten von oben nach unten ab 1. Drei Spalten haben also vier senkrechte Linien.',
          'Mit `grid-column` und `grid-row` sagst du, von welcher Linie bis zu welcher Linie ein Element reicht:',
          code('css', 'header {', '  grid-column: 1 / 4;   /* von Linie 1 bis 4 = alle 3 Spalten */', '  grid-row: 1 / 2;      /* erste Zeile */', '}'),
          'Negative Zahlen zählen von hinten: `1 / -1` reicht immer über die ganze Breite. Mit `span 2` überspannt ein Element zwei Zellen ab seinem normalen Startpunkt.',
        ),
      },
      {
        type: 'choice',
        question: 'Ein Grid hat 3 Spalten. Welche Angabe lässt den footer über die ganze Breite gehen?',
        options: ['`grid-column: 1 / 4;`', '`grid-column: 1 / 3;`', '`grid-column: 3;`', '`grid-column: 0 / 3;`'],
        answer: 0,
        explanation: 'Drei Spalten haben die Linien 1 bis 4. Von 1 bis 4 heißt: alle drei Spalten. `1 / -1` ginge auch.',
      },
      {
        type: 'text',
        title: 'Flächen mit Namen',
        text: page(
          'Übersichtlicher geht es mit **benannten Flächen**. Jedes Item bekommt mit `grid-area` einen Namen. Der Container zeichnet das Layout dann wie eine kleine Karte – ein Text in Anführungszeichen pro Zeile, ein Name pro Spalte:',
          code('css', 'body {', '  display: grid;', '  grid-template-areas:', '    "kopf kopf kopf"', '    "links mitte rechts"', '    "fuss fuss fuss";', '}', 'header { grid-area: kopf; }'),
          'Ein Element erstreckt sich über alle Zellen, in denen sein Name steht. Ein Punkt `.` markiert eine leere Zelle. Die Fläche eines Namens muss ein Rechteck sein.',
        ),
      },
      {
        type: 'binary',
        question: 'Was bedeutet der Punkt in `"p4 . p2"` bei `grid-template-areas`?',
        options: ['Diese Zelle bleibt leer', 'Hier steht das nächste freie Element'],
        answer: 0,
        explanation: 'Der Punkt ist eine leere Zelle. Kein benanntes Element wird dort platziert.',
      },
      {
        type: 'text',
        title: 'Reihenfolge und Lücken füllen',
        text: page(
          'Elemente ohne eigene Angabe werden einfach hinter den platzierten einsortiert. Mit `grid-auto-flow: dense` füllt das Grid stattdessen frühere Lücken auf.',
          'Mit `order` kannst du die Reihenfolge ändern, in der Items ins Grid kommen, ohne das HTML umzustellen.',
          'Ein wichtiger Tipp: Platziere mit dem Grid, nicht mit `margin`. Wer ein Element mit `margin-left: 300px` an seinen Platz schiebt, bekommt ein Layout, das nur bei einer einzigen Fensterbreite stimmt.',
          'Die Entwicklerwerkzeuge können die Grid-Linien samt Nummern einblenden – sehr hilfreich beim Platzieren.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Ein Element mit `margin-left: 300px` an seinen Platz im Grid zu schieben, ist eine robuste Lösung für alle Bildschirmbreiten.',
        answer: false,
        explanation: 'Feste Außenabstände passen nur bei einer Breite. Besser: das Element mit grid-column, grid-row oder grid-area in die richtige Zelle setzen.',
      },
      {
        type: 'recall',
        question: 'Wie viele senkrechte Linien hat ein Grid mit 3 Spalten, und wie spannst du ein Element über alle?',
        answer: 'Vier Linien (1 bis 4). Über alle Spalten mit grid-column: 1 / 4 oder grid-column: 1 / -1.',
      },
    ],
    recap: [
      'Grid-Linien sind ab 1 nummeriert; grid-column: 1 / 4 reicht von Linie 1 bis 4.',
      'grid-template-areas zeichnet das Layout mit Namen; grid-area ordnet ein Element zu; . ist leer.',
      'Mit dem Grid platzieren, nicht mit großen festen margins schieben.',
    ],
  },
  {
    id: 'v6-3',
    title: 'Grid ausrichten und zentrieren',
    intro: ['Wie zentriert man ein ganzes Grid?', 'Was ist der Unterschied zwischen -content und -items?'],
    steps: [
      {
        type: 'text',
        title: 'Das ganze Raster verschieben',
        text: page(
          'Ist das Raster kleiner als sein Container – etwa weil die Spalten feste Breiten haben –, bleibt Platz übrig. Wohin das Raster rückt, regeln zwei Eigenschaften am Container:',
          '`justify-content` verschiebt das Raster **waagerecht**, `align-content` **senkrecht**. Werte sind `start`, `end`, `center`, `space-between`, `space-around` und `space-evenly`.',
          code('css', 'body {', '  display: grid;', '  grid-template-columns: 360px 360px;', '  justify-content: center;', '}'),
          'Achtung: `right` gibt es dabei nicht. Unbekannte Werte ignoriert der Browser stillschweigend – im Code steht dann etwas, das nichts bewirkt.',
        ),
      },
      {
        type: 'choice',
        question: 'Was passiert bei `align-content: right;` in einem Grid-Container?',
        options: [
          'Nichts – der Wert ist ungültig und wird ignoriert',
          'Das Raster rückt nach rechts',
          'Das Raster rückt nach unten',
          'Die Items werden rechtsbündig',
        ],
        answer: 0,
        explanation: 'right ist kein gültiger Wert für align-content. Der Browser überspringt die Zeile. Gültig wären z. B. start, end oder center.',
      },
      {
        type: 'text',
        title: 'Items in ihrer Zelle',
        text: page(
          'Etwas anderes ist die Ausrichtung **innerhalb jeder Zelle**. Normalerweise füllt ein Item seine Zelle ganz aus (`stretch`). Mit `justify-items` (waagerecht) und `align-items` (senkrecht) am Container – Werte `stretch`, `start`, `end`, `center` – änderst du das für alle Items.',
          'Merkhilfe: **-content** bewegt das ganze Raster im Container, **-items** bewegt die Items in ihren Zellen. **justify** ist waagerecht, **align** senkrecht.',
        ),
      },
      {
        type: 'binary',
        question: 'Du willst das ganze Grid in der Mitte der Seite haben, die Items sollen ihre Zellen aber weiter ausfüllen. Was nimmst du?',
        options: ['`justify-content: center;`', '`justify-items: center;`'],
        answer: 0,
        explanation: '-content verschiebt das Raster als Ganzes. -items würde die Items in ihren Zellen zentrieren und sie dabei schrumpfen lassen.',
      },
      {
        type: 'text',
        title: 'Beides auf einmal',
        text: page(
          '`place-content` setzt `align-content` und `justify-content` zugleich, `place-items` dasselbe für die Items. Mit einem Wert gilt er für beide Richtungen:',
          code('css', 'body {', '  display: grid;', '  min-height: 100vh;', '  place-content: center;   /* Raster genau in die Mitte */', '}'),
          'Damit senkrechtes Zentrieren sichtbar wird, braucht der Container eine Höhe – hier mindestens die volle Fensterhöhe.',
        ),
      },
      {
        type: 'order',
        question: 'Bring die Zeilen in die richtige Reihenfolge, um ein Grid mitten im Fenster zu zentrieren.',
        items: ['`body {`', '`  display: grid;`', '`  min-height: 100vh;`', '`  place-content: center;`', '`}`'],
        explanation: 'Erst den Container zum Grid machen, ihm eine Höhe geben und das Raster dann mit place-content in beide Richtungen zentrieren.',
      },
      {
        type: 'recall',
        question: 'Was ist der Unterschied zwischen `justify-content` und `justify-items` im Grid?',
        answer: 'justify-content verschiebt das ganze Raster waagerecht im Container. justify-items richtet jedes Item waagerecht innerhalb seiner Zelle aus.',
      },
    ],
    recap: [
      '-content verschiebt das ganze Raster, -items die Items in ihren Zellen.',
      'justify = waagerecht, align = senkrecht; place-… setzt beides zugleich.',
      'Ungültige Werte wie right ignoriert der Browser ohne Fehlermeldung.',
    ],
  },
  {
    id: 'v7-1',
    title: 'Flexbox: Elemente entlang einer Achse',
    intro: ['Wann nimmt man Flexbox statt Grid?', 'Was sind Hauptachse und Kreuzachse?'],
    steps: [
      {
        type: 'text',
        title: 'Eine Richtung',
        text: page(
          'Grid ordnet Elemente **zweidimensional** in Zeilen und Spalten. **Flexbox** ordnet sie entlang **einer Achse** – nebeneinander oder untereinander. Typisch ist eine Navigationsleiste:',
          code('css', 'nav ul {', '  display: flex;', '  gap: 1rem;', '  list-style: none;   /* keine Aufzählungspunkte */', '}'),
          'Die Richtung bestimmt `flex-direction`: `row` (Standard, nebeneinander), `column` (untereinander) sowie `row-reverse` und `column-reverse` (umgekehrt). Diese Richtung heißt **Hauptachse**, die Richtung quer dazu **Kreuzachse**.',
        ),
      },
      {
        type: 'binary',
        question: 'Bei `flex-direction: column;` – in welche Richtung verläuft die Hauptachse?',
        options: ['Senkrecht', 'Waagerecht'],
        answer: 0,
        explanation: 'Die Hauptachse folgt flex-direction. Bei column stehen die Elemente untereinander, die Hauptachse ist also senkrecht.',
      },
      {
        type: 'text',
        title: 'Ausrichten',
        text: page(
          '`justify-content` verteilt die Elemente **entlang der Hauptachse**: `flex-start`, `flex-end`, `center`, `space-between` (erstes und letztes Element an den Rand, Rest gleichmäßig), `space-around`, `space-evenly`.',
          '`align-items` richtet sie **auf der Kreuzachse** aus: `stretch` (Standard, auf volle Höhe strecken), `flex-start`, `flex-end`, `center`, `baseline`.',
          code('css', 'header {', '  display: flex;', '  justify-content: space-between;  /* Titel links, Menü rechts */', '  align-items: center;             /* senkrecht mittig */', '}'),
          'Einzelne Elemente können mit `align-self` eine eigene Ausrichtung auf der Kreuzachse bekommen.',
        ),
      },
      {
        type: 'choice',
        question: 'Ein header mit `display: flex` enthält einen Titel und ein Menü. Welche Angabe schiebt den Titel ganz nach links und das Menü ganz nach rechts?',
        options: ['`justify-content: space-between;`', '`align-items: center;`', '`justify-content: center;`', '`flex-direction: row-reverse;`'],
        answer: 0,
        explanation: 'space-between legt das erste und letzte Element an die Ränder der Hauptachse und verteilt den Platz dazwischen.',
      },
      {
        type: 'text',
        title: 'Umbrechen',
        text: page(
          'Standardmäßig bleibt alles in einer Reihe, auch wenn es eng wird (`flex-wrap: nowrap`). Mit `flex-wrap: wrap` beginnt eine neue Reihe, wenn der Platz entlang der Hauptachse aufgebraucht ist.',
          '`flex-flow` ist die Kurzform für Richtung und Umbruch: `flex-flow: row wrap;`. Haben sich mehrere Reihen gebildet, verteilt `align-content` diese Reihen im Container. `gap` funktioniert wie beim Grid.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'In einem Flex-Container brechen Elemente standardmäßig in eine neue Zeile um, wenn der Platz nicht reicht.',
        answer: false,
        explanation: 'Der Standard ist flex-wrap: nowrap – die Elemente bleiben in einer Reihe und schrumpfen. Umbrechen erst mit flex-wrap: wrap.',
      },
      {
        type: 'recall',
        question: 'Was regeln `justify-content` und `align-items` in einem Flex-Container?',
        answer: 'justify-content verteilt die Elemente entlang der Hauptachse (Richtung von flex-direction). align-items richtet sie quer dazu auf der Kreuzachse aus.',
      },
    ],
    recap: [
      'Flexbox ordnet entlang einer Achse; flex-direction legt die Hauptachse fest.',
      'justify-content = Hauptachse, align-items = Kreuzachse.',
      'Standard ist nowrap; mit flex-wrap: wrap brechen Elemente in neue Reihen um.',
    ],
  },
  {
    id: 'v7-2',
    title: 'Flexbox: wachsen und schrumpfen',
    intro: ['Wie nimmt sich ein Element den restlichen Platz?', 'Was bedeutet `flex: 0 0 200px`?'],
    steps: [
      {
        type: 'text',
        title: 'grow, shrink, basis',
        text: page(
          'Die Kinder eines Flex-Containers haben drei eigene Eigenschaften:',
          '`flex-basis` ist die **Grundgröße** entlang der Hauptachse. `flex-grow` sagt, ob das Element **wachsen** darf, wenn Platz übrig ist (1 = ja, 0 = nein). `flex-shrink` sagt, ob es unter seine Grundgröße **schrumpfen** darf, wenn es eng wird.',
          'Haben mehrere Elemente `flex-grow`, teilen sie den übrigen Platz im Verhältnis ihrer Werte – ähnlich wie fr beim Grid.',
        ),
      },
      {
        type: 'choice',
        question: 'Was bewirkt `flex-grow: 0;`?',
        options: [
          'Das Element wächst nicht über seine Grundgröße hinaus',
          'Das Element wird unsichtbar',
          'Das Element schrumpft auf 0',
          'Das Element nimmt den ganzen Platz ein',
        ],
        answer: 0,
        explanation: 'flex-grow 0 heißt: übrigen Platz nicht nutzen. Das Element bleibt bei seiner flex-basis.',
      },
      {
        type: 'text',
        title: 'Die Kurzform flex',
        text: page(
          '`flex` fasst alle drei zusammen, in der Reihenfolge **grow, shrink, basis**:',
          code('css', 'aside {', '  flex: 0 0 200px;   /* fest 200 px: nicht wachsen, nicht schrumpfen */', '}', 'main {', '  flex: 1;           /* wächst in den ganzen Rest */', '}'),
          '`flex: 1` allein ist kurz für `1 1 0%`: wachsen, schrumpfen, Grundgröße 0. So nimmt sich main genau den Platz, den die festen asides übrig lassen.',
        ),
      },
      {
        type: 'order',
        question: 'In welcher Reihenfolge stehen die Werte in der Kurzform `flex`?',
        items: ['flex-grow', 'flex-shrink', 'flex-basis'],
        explanation: 'flex: grow shrink basis – zum Beispiel flex: 0 0 200px.',
      },
      {
        type: 'text',
        title: 'Flexbox oder Grid?',
        text: page(
          'Grid ist das mächtigere Werkzeug: Alles, was Flexbox kann, geht auch mit Grid. Grid ist besser, wenn Elemente in Zeilen **und** Spalten zueinander ausgerichtet sein sollen, zum Beispiel gleich breite Karten.',
          'Flexbox ist praktisch für Dinge in **einer Reihe**, deren Größe sich nach dem Inhalt richtet: Menüs, Knopfleisten, Kopfzeilen. Beide Layouts lassen sich verschachteln – etwa ein Grid für die Seite und Flexbox im header.',
          'Beide sind von sich aus **responsiv**: Flexbox durch Wachsen und Schrumpfen, Grid durch fr und automatische Zeilen.',
        ),
      },
      {
        type: 'binary',
        question: 'Du willst zwölf gleich große Karten in sauberen Zeilen und Spalten. Was passt besser?',
        options: ['Grid', 'Flexbox'],
        answer: 0,
        explanation: 'Grid richtet in zwei Richtungen aus, damit werden alle Karten gleich breit und stehen sauber untereinander.',
      },
      {
        type: 'recall',
        question: 'Was bedeuten `flex: 0 0 200px` und `flex: 1`?',
        answer: 'flex: 0 0 200px = feste Größe 200 px, weder wachsen noch schrumpfen. flex: 1 = darf wachsen und schrumpfen und nimmt sich den restlichen Platz.',
      },
    ],
    recap: [
      'flex-basis = Grundgröße, flex-grow = wachsen, flex-shrink = schrumpfen.',
      'Kurzform flex: grow shrink basis; flex: 1 nimmt den restlichen Platz.',
      'Grid für zwei Richtungen, Flexbox für eine Reihe; beide sind von sich aus responsiv.',
    ],
  },
  {
    id: 'v8-1',
    title: 'Responsive Design',
    intro: ['Was macht eine Seite „responsive“?', 'Wozu dient das viewport-meta-Tag?'],
    steps: [
      {
        type: 'text',
        title: 'Eine Seite für alle Bildschirme',
        text: page(
          '**Responsive Design** heißt: Eine Seite sieht auf jedem Bildschirm gut aus und lässt sich gut bedienen – vom Handy bis zum großen Monitor. Den Begriff prägte der Webdesigner **Ethan Marcotte** 2010. Ihn inspirierte die Idee einer Architektur, die auf ihre Umgebung reagiert.',
          'Nach Marcotte besteht responsives Design aus drei Zutaten: **flexible Raster** (fluid grids), **flexible Bilder** und **Media Queries**.',
          'Heute ist das kein Extra mehr, sondern Pflicht: Ein Großteil der Aufrufe kommt von Handys, und Google bewertet Seiten auch danach, wie gut sie auf Mobilgeräten funktionieren.',
        ),
      },
      {
        type: 'order',
        question: 'Nenne die drei Zutaten des responsiven Designs nach Ethan Marcotte (in seiner Reihenfolge).',
        items: ['Flexible Raster (fluid grids)', 'Flexible Bilder', 'Media Queries'],
        explanation: 'Fluid grids, flexible images, media queries – so beschrieb Marcotte es in seinem Artikel von 2010.',
      },
      {
        type: 'text',
        title: 'Das viewport-meta-Tag',
        text: page(
          'Ohne besondere Angabe tun Handys so, als wäre der Bildschirm etwa 980 px breit, und zoomen die Seite winzig klein heraus. Damit eine Seite die echte Breite des Geräts nutzt, gehört diese Zeile in den head:',
          code('html', '<meta name="viewport" content="width=device-width, initial-scale=1.0">'),
          'Emmet fügt sie mit `!` automatisch ein. Fehlt sie, greifen auch die schönsten Media Queries auf dem Handy nicht richtig.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Ohne `<meta name="viewport" …>` zeigt ein iPhone eine Seite so an, als wäre der Bildschirm etwa 980 px breit.',
        answer: true,
        explanation: 'Deshalb wirken Seiten ohne diese Zeile auf dem Handy winzig. width=device-width sorgt für die echte Gerätebreite.',
      },
      {
        type: 'text',
        title: 'Bilder und Texte',
        text: page(
          '**Flexible Bilder** sind nie breiter als ihr Container: `max-width: 100%`. Mit `object-fit: cover` füllt ein Bild eine feste Fläche, ohne verzerrt zu werden, `aspect-ratio: 16 / 9` legt ein Seitenverhältnis fest.',
          '**Responsive Typografie**: Zu breite Textzeilen lesen sich schlecht. Die Einheit `ch` entspricht der Breite der Ziffer 0 – empfohlen sind etwa 50 bis 60 ch pro Zeile. `clamp()` gibt Schrift eine flexible Größe mit Unter- und Obergrenze:',
          code('css', 'p { max-width: 60ch; }', 'h1 { font-size: clamp(1.5rem, 1rem + 2vw, 3rem); }'),
        ),
      },
      {
        type: 'choice',
        question: 'Was bewirkt `font-size: clamp(1rem, 2vw, 2rem);`?',
        options: [
          'Die Schrift folgt 2vw, wird aber nie kleiner als 1rem und nie größer als 2rem',
          'Die Schrift wechselt zwischen 1rem und 2rem hin und her',
          'Die Schrift ist immer genau 2vw groß',
          'Die Schrift ist auf Handys 1rem, auf dem PC 2rem',
        ],
        answer: 0,
        explanation: 'clamp(min, bevorzugt, max): Der mittlere Wert gilt, solange er zwischen den Grenzen liegt.',
      },
      {
        type: 'recall',
        question: 'Was bedeutet „Mobile First“?',
        answer: 'Man gestaltet zuerst für kleine Bildschirme und verbessert die Darstellung für größere Bildschirme danach mit Media Queries.',
      },
    ],
    recap: [
      'Responsive = gut auf jedem Bildschirm; Zutaten: flexible Raster, flexible Bilder, Media Queries.',
      'Das viewport-meta-Tag sorgt dafür, dass Handys die echte Gerätebreite nutzen.',
      'Bilder mit max-width: 100 %, Textzeilen etwa 50–60 ch, Schrift mit clamp().',
    ],
  },
  {
    id: 'v8-2',
    title: 'Media Queries und Karten-Layouts',
    intro: ['Wie gilt CSS nur ab einer bestimmten Breite?', 'Wie baut man Karten, die sich anpassen oder seitlich scrollen?'],
    steps: [
      {
        type: 'text',
        title: '@media',
        text: page(
          'Eine **Media Query** lässt CSS nur gelten, wenn eine Bedingung erfüllt ist – etwa eine Mindestbreite, ein Medientyp (`screen`, `print`) oder Hoch-/Querformat:',
          code('css', '.karten {', '  grid-template-columns: repeat(2, 1fr);', '}', '@media (width > 500px) {', '  .karten {', '    grid-template-columns: repeat(4, 1fr);', '  }', '}'),
          'Die ältere Schreibweise `(min-width: 500px)` heißt „mindestens 500 px“, die neuere `(width > 500px)` „breiter als 500 px“. Bedingungen lassen sich mit `and`, `or` und `not` verknüpfen.',
        ),
      },
      {
        type: 'choice',
        question: 'Wie viele Spalten hat `.karten` mit dem CSS oben in einem 400 px breiten Fenster?',
        options: ['2', '4', '1', '6'],
        answer: 0,
        explanation: '400 px ist nicht breiter als 500 px, die Media Query greift also nicht. Es bleibt bei repeat(2, 1fr).',
      },
      {
        type: 'text',
        title: 'Karten ohne Media Query',
        text: page(
          'Modernes CSS braucht oft gar keine Media Query. Dieses Grid legt automatisch so viele Spalten an, wie mit mindestens 200 px hineinpassen, und verteilt den Rest gleichmäßig:',
          code('css', '.karten {', '  display: grid;', '  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));', '  gap: 1rem;', '}'),
          '`auto-fill` legt ebenfalls so viele Spalten an, wie passen, lässt aber leere Spalten stehen, wenn zu wenige Karten da sind. `auto-fit` streckt die vorhandenen Karten dagegen auf die volle Breite.',
          'Media Queries nutzt man heute vor allem, um größere Umbauten zu schalten: etwa die `flex-direction` auf schmalen Bildschirmen auf `column` zu stellen.',
        ),
      },
      {
        type: 'binary',
        question: 'Was macht `repeat(auto-fit, minmax(200px, 1fr))`?',
        options: [
          'So viele Spalten wie mit mindestens 200 px hineinpassen',
          'Immer genau 200 Spalten mit 1fr Breite',
        ],
        answer: 0,
        explanation: 'auto-fit berechnet die Spaltenzahl aus der verfügbaren Breite; minmax sorgt für mindestens 200 px pro Spalte.',
      },
      {
        type: 'text',
        title: 'Seitlich scrollen wie bei Netflix',
        text: page(
          'Manchmal sollen Karten nicht umbrechen, sondern in einer Reihe **seitlich scrollbar** sein:',
          code('css', '.reihe {', '  display: flex;', '  overflow-x: auto;', '  gap: 1rem;', '}', '.reihe article {', '  flex: 0 0 200px;', '}'),
          '`overflow-x` erlaubt Scrollen in waagerechter Richtung: `auto` zeigt eine Scrollleiste nur bei Bedarf, `scroll` immer. Wichtig ist `flex: 0 0 200px` – sonst schrumpfen die Karten, statt überzustehen. Mit `scroll-snap-type` rastet das Scrollen am Rand einer Karte ein.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Ohne `flex-shrink: 0` (etwa über `flex: 0 0 200px`) würden die Karten in der scrollbaren Reihe schrumpfen, statt überzustehen.',
        answer: true,
        explanation: 'Flex-Elemente dürfen standardmäßig schrumpfen. Erst wenn sie es nicht dürfen, ragen sie über den Container hinaus und man kann scrollen.',
      },
      {
        type: 'recall',
        question: 'Was ist der Unterschied zwischen `@media (min-width: 600px)` und `@media (width > 600px)`?',
        answer: 'min-width: 600px gilt ab genau 600 px (mindestens 600). width > 600px gilt erst bei mehr als 600 px. Die zweite ist die neuere Schreibweise.',
      },
    ],
    recap: [
      '@media (width > 500px) { … } lässt CSS nur ab einer Breite gelten.',
      'repeat(auto-fit, minmax(200px, 1fr)) macht Karten-Raster ganz ohne Media Query responsiv.',
      'Seitlich scrollende Reihen: display: flex, overflow-x: auto, Karten mit flex: 0 0 Breite.',
    ],
  },
]

import type { Tile } from '../../lib/types.ts'
import { code, page } from './helpers.ts'

// Teil 1 – HTML (Vorlesungen 3, 4, 5 und 7)

export const HTML_TILES: Tile[] = [
  {
    id: 'v3-1',
    title: 'Tags, Elemente und der Baum',
    intro: ['Was ist ein Tag, was ein Element?', 'Warum ist eine HTML-Seite ein Baum?'],
    steps: [
      {
        type: 'text',
        title: 'Markup heißt Auszeichnung',
        text: page(
          'HTML ist eine **Auszeichnungssprache** (Markup Language). Du schreibst normalen Text und zeichnest ihn mit Zusatzinformationen aus, die selbst nicht angezeigt werden. Diese Auszeichnungen heißen **Tags**.',
          'Ein öffnender Tag steht in spitzen Klammern, zum Beispiel `<p>`. Der schließende Tag hat zusätzlich einen Schrägstrich: `</p>`. Öffnender Tag, Inhalt und schließender Tag zusammen bilden ein **Element**, hier ein p-Element, also einen Absatz (paragraph).',
          code('html', '<p>Das ist ein Absatz.</p>'),
        ),
      },
      {
        type: 'choice',
        question: 'Was ist an diesem Code ein Element?\n\n' + code('html', '<p>Hallo</p>'),
        options: ['Alles zusammen: `<p>Hallo</p>`', 'Nur `<p>`', 'Nur `Hallo`', 'Nur `</p>`'],
        answer: 0,
        explanation: '`<p>` und `</p>` sind die Tags. Zusammen mit dem Inhalt dazwischen bilden sie das Element.',
        variants: [
          {
            type: 'choice',
            question: 'Welche Teile von `<h2>Willkommen</h2>` sind die Tags?',
            options: ['`<h2>` und `</h2>`', 'Nur `Willkommen`', 'Das ganze `<h2>Willkommen</h2>`', 'Nur `</h2>`'],
            answer: 0,
            explanation: 'Tags sind die Auszeichnungen in spitzen Klammern. Erst zusammen mit dem Inhalt bilden sie das Element.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Elemente in Elementen',
        text: page(
          'Die meisten Elemente können außer Text auch andere Elemente enthalten. Man nennt das **Schachtelung**:',
          code('html', '<body>', '  <p>Das ist <strong>wichtig</strong>.</p>', '</body>'),
          'Dadurch entsteht eine **Baumstruktur**. Die Wurzel ist das html-Element. Jedes Element ist ein **Knoten** (Node). Direkt enthaltene Elemente sind **Kinder** (children), das umschließende Element ist der **Elternknoten** (parent). Kinder und Kindeskinder zusammen heißen **Nachfahren**, Elemente mit demselben Elternknoten sind **Geschwister** (siblings).',
          'Wichtig: Ein Element muss geschlossen werden, bevor sein Elternelement endet. Tags dürfen sich nicht überkreuzen.',
        ),
      },
      {
        type: 'binary',
        question: 'Im Code `<p>Das ist <strong>wichtig</strong>.</p>`: Wie steht das strong-Element zum p-Element?',
        options: ['Es ist ein Kind des p-Elements', 'Es ist ein Geschwister des p-Elements'],
        answer: 0,
        explanation: 'strong steht innerhalb von p, also ist p der Elternknoten und strong sein Kind.',
        variants: [
          {
            type: 'binary',
            question: 'Wie stehen die beiden li-Elemente zueinander?\n\n' + code('html', '<ul>', '  <li>HTML</li>', '  <li>CSS</li>', '</ul>'),
            options: ['Sie sind Geschwister', 'Das zweite ist ein Kind des ersten'],
            answer: 0,
            explanation: 'Beide haben dasselbe Elternelement ul, also sind sie Geschwister.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Attribute und Kommentare',
        text: page(
          'Elemente können **Attribute** haben. Sie stehen im öffnenden Tag als `name="wert"`:',
          code('html', '<a href="kontakt.html" class="link">Kontakt</a>'),
          'Hier hat das a-Element zwei Attribute: `href` (wohin der Link führt) und `class` (eine Klasse für CSS). Häufig sind auch `id` (ein eindeutiger Name für genau ein Element), `src` und `alt` bei Bildern.',
          'Ein **Kommentar** wird nicht angezeigt. Er hilft dir und anderen, den Code zu verstehen:',
          code('html', '<!-- Navigation kommt später -->'),
        ),
      },
      {
        type: 'cloze',
        text: 'Ein HTML-Kommentar beginnt mit ___ und endet mit `-->`.',
        options: ['`<!--`', '`//`', '`/*`'],
        answer: 0,
        explanation: '`//` und `/* */` sind Kommentare in JavaScript bzw. CSS. In HTML heißt es `<!-- … -->`.',
        variants: [
          {
            type: 'truefalse',
            statement: 'In HTML schreibt man einen Kommentar als `// Kommentar`.',
            answer: false,
            explanation: '`//` ist ein Kommentar in JavaScript. In HTML heißt es `<!-- Kommentar -->`.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Erkläre die Begriffe Kind, Elternknoten und Geschwister im HTML-Baum.',
        answer: 'Ein Kind steht direkt in einem anderen Element, dieses ist sein Elternknoten. Geschwister sind Elemente mit demselben Elternknoten.',
        variants: [
          {
            type: 'choice',
            question: 'Im Code `<nav><ul><li>Start</li></ul></nav>`: Was ist das li-Element für das nav-Element?',
            options: ['Ein Nachfahre, aber kein Kind', 'Ein Kind', 'Ein Geschwister', 'Der Elternknoten'],
            answer: 0,
            explanation: 'Zwischen nav und li liegt noch ul. Das einzige Kind von nav ist ul; li ist ein Kindeskind, also ein Nachfahre.',
          },
        ],
      },
    ],
    recap: [
      'Tag = Auszeichnung in spitzen Klammern; Element = öffnender Tag + Inhalt + schließender Tag.',
      'Geschachtelte Elemente bilden einen Baum mit Eltern, Kindern, Nachfahren und Geschwistern.',
      'Attribute stehen im öffnenden Tag als name="wert"; Kommentare mit <!-- … -->.',
    ],
  },
  {
    id: 'v3-2',
    title: 'Das HTML-Grundgerüst',
    intro: ['Wie ist jedes HTML-Dokument aufgebaut?', 'Was darf in den head, was muss in den body?'],
    steps: [
      {
        type: 'text',
        title: 'Immer dasselbe Gerüst',
        text: page(
          'Jedes HTML5-Dokument hat denselben Aufbau:',
          code(
            'html',
            '<!DOCTYPE html>',
            '<html lang="de">',
            '  <head>',
            '    <meta charset="UTF-8">',
            '    <title>Meine Seite</title>',
            '  </head>',
            '  <body>',
            '    <h1>Hallo</h1>',
            '  </body>',
            '</html>',
          ),
          '`<!DOCTYPE html>` sagt dem Browser: Das ist modernes HTML5. Die Wurzel `html` hat genau zwei Kinder: erst `head`, dann `body`. Es darf von jedem nur eines geben.',
        ),
      },
      {
        type: 'order',
        question: 'Bring die Zeilen des Grundgerüsts in die richtige Reihenfolge.',
        items: ['`<!DOCTYPE html>`', '`<html lang="de">`', '`  <head>…</head>`', '`  <body>…</body>`', '`</html>`'],
        explanation: 'Doctype zuerst, dann html als Wurzel mit head und body als Kindern, in genau dieser Reihenfolge.',
        variants: [
          {
            type: 'choice',
            question: 'Wie viele body-Elemente darf ein HTML-Dokument haben?',
            options: ['Genau eines', 'Beliebig viele', 'Höchstens zwei', 'Keines, body ist freiwillig'],
            answer: 0,
            explanation: 'Die Wurzel html hat genau einen head und genau einen body.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Kopf: Infos über die Seite',
        text: page(
          'Der **head** enthält Informationen *über* die Seite, die nicht direkt angezeigt werden. Erlaubt sind dort nur: `meta`, `title`, `style`, `link`, `script`, `noscript`, `base` und `template`.',
          '`<meta charset="UTF-8">` legt die Zeichenkodierung fest, damit Umlaute richtig erscheinen. `<title>` ist der Text im Browser-Tab. Mit `<link rel="stylesheet" href="style.css">` bindest du eine CSS-Datei ein.',
          'Alles, was der Nutzer sehen soll (Überschriften, Texte, Bilder, Navigation), gehört in den **body**. Steht so etwas im head, versucht der Browser zwar zu retten, was geht, aber der Code ist falsch.',
        ),
      },
      {
        type: 'choice',
        question: 'Welches dieser Elemente darf im `head` stehen?',
        options: ['`<link>`', '`<h1>`', '`<nav>`', '`<img>`'],
        answer: 0,
        explanation: 'Im head sind nur Elemente über die Seite erlaubt, etwa meta, title, style und link. Alles Sichtbare gehört in den body.',
        variants: [
          {
            type: 'choice',
            question: 'Welches dieser Elemente gehört **nicht** in den `head`?',
            options: ['`<footer>`', '`<title>`', '`<meta>`', '`<style>`'],
            answer: 0,
            explanation: 'footer ist sichtbarer Inhalt und gehört in den body. title, meta und style sind Informationen über die Seite.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Schneller tippen mit Emmet',
        text: page(
          'In VS Code ist **Emmet** eingebaut: Kurzschreibweisen, die mit Enter zu fertigem HTML werden. `!` erzeugt das komplette Grundgerüst. `ul>li*3` erzeugt eine Liste mit drei Einträgen. `>` heißt „Kind“, `+` heißt „Geschwister“, `*3` heißt „dreimal“.',
          '`h2.titel` wird zu einem h2 mit der Klasse `titel`, `h2#start` zu einem h2 mit der id `start`. Mit `{Text}` gibst du Inhalt mit, mit `$` zählst du hoch:',
          code('text', 'ul>li*3{Punkt $}'),
          'wird zu drei Listeneinträgen „Punkt 1“, „Punkt 2“, „Punkt 3“. Den **Live Server** in VS Code nutzt du, um Änderungen sofort im Browser zu sehen.',
        ),
      },
      {
        type: 'binary',
        question: 'Was erzeugt die Emmet-Abkürzung `nav>ul>li*4`?',
        options: ['Ein nav mit einer Liste aus 4 Einträgen', '4 nav-Elemente mit je einer Liste'],
        answer: 0,
        explanation: '`>` geht eine Ebene tiefer, `*4` gilt nur für li. Also: nav, darin ul, darin 4 li.',
        variants: [
          {
            type: 'choice',
            question: 'Was erzeugt die Emmet-Abkürzung `header+main+footer`?',
            options: [
              'header, main und footer nebeneinander als Geschwister',
              'Einen header, darin main, darin footer',
              'Einen header mit dem Text „main+footer“',
            ],
            answer: 0,
            explanation: '`+` erzeugt Geschwister auf derselben Ebene. Für „darin“ bräuchte es `>`.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was ist der Unterschied zwischen head und body?',
        answer: 'Der head enthält Informationen über die Seite (z. B. Titel, Zeichensatz, CSS-Einbindung), die nicht angezeigt werden. Im body steht alles, was der Nutzer sieht.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Eine Überschrift `<h1>` darf im `head` stehen, wenn sie nach dem `title` kommt.',
            answer: false,
            explanation: 'Alles Sichtbare gehört in den body, egal an welcher Stelle im head es stünde.',
          },
        ],
      },
    ],
    recap: [
      'Grundgerüst: <!DOCTYPE html>, dann html mit genau einem head und einem body.',
      'Im head nur meta, title, style, link, script und Ähnliches. Alles Sichtbare kommt in den body.',
      'Emmet spart Tipparbeit: ! für das Grundgerüst, > für Kinder, + für Geschwister, * zum Vervielfachen.',
    ],
  },
  {
    id: 'v3-3',
    title: 'Semantische Seitenstruktur',
    intro: ['Was bedeutet „semantisches HTML“?', 'Wofür sind header, nav, main, aside und footer da?'],
    steps: [
      {
        type: 'text',
        title: 'Bedeutung statt nur Aussehen',
        text: page(
          '**Semantik** ist die Lehre von der Bedeutung. Semantisches HTML heißt: Du wählst das Element, das sagt, *was* ein Teil der Seite ist, nicht nur, wie er aussehen soll.',
          'Davon profitieren Maschinen: Screenreader für blinde Menschen springen direkt zum Hauptinhalt, Suchmaschinen erkennen Überschriften und Navigation. Tim Berners-Lee träumte schon früh von einem „Semantic Web“, in dem Programme verstehen, welche Rolle jedes Stück einer Seite spielt.',
          'Viele dieser Elemente sehen ohne CSS ganz unauffällig aus. Ihr Nutzen liegt in der Bedeutung.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Das main-Element verändert, wie sein Inhalt aussieht.',
        answer: false,
        explanation: 'main hat keinen Einfluss auf das Aussehen. Es kennzeichnet den Hauptinhalt, was z. B. Screenreadern hilft.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Ein `nav`-Element macht seine Links automatisch zu einer waagerechten Menüleiste.',
            answer: false,
            explanation: 'nav hat kein besonderes Aussehen. Es sagt nur, dass hier Navigation steht. Die Menüleiste baust du mit CSS.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Die Bausteine einer Seite',
        text: page(
          '`header`: einleitender Bereich, oft mit Logo, Titel und Navigation.',
          '`nav`: Navigation, also eine Gruppe von Links.',
          '`main`: der Hauptinhalt der Seite, nur einmal pro Seite.',
          '`aside`: Zusatzinformationen, die den Hauptinhalt ergänzen, aber nicht direkt dazugehören, etwa eine Seitenleiste.',
          '`footer`: abschließende Informationen wie Impressum oder Kontakt.',
          '`article`: ein für sich stehender Teil, etwa ein Blogbeitrag. `section`: ein Abschnitt, wenn kein passenderes Element existiert. `h1` bis `h6`: Überschriften, h1 ist die wichtigste.',
        ),
      },
      {
        type: 'choice',
        question: 'Deine Seite hat am Rand eine Leiste mit „Fähigkeiten“, die den Lebenslauf ergänzt. Welches Element passt?',
        options: ['`<aside>`', '`<main>`', '`<nav>`', '`<footer>`'],
        answer: 0,
        explanation: 'aside steht für ergänzende Informationen neben dem Hauptinhalt, genau wie eine Seitenleiste.',
        variants: [
          {
            type: 'choice',
            question: 'Ganz unten auf der Seite stehen Impressum und Kontaktdaten. Welches Element passt?',
            options: ['`<footer>`', '`<aside>`', '`<header>`', '`<nav>`'],
            answer: 0,
            explanation: 'footer ist für abschließende Informationen wie Impressum und Kontakt gedacht.',
          },
        ],
      },
      {
        type: 'text',
        title: 'div nur als letzte Wahl',
        text: page(
          'Das `div`-Element hat **keine Bedeutung** und kein eigenes Aussehen. Es ist ein reiner Behälter, den man mit CSS gestalten kann.',
          'Die Regel: Nimm immer das passendste Element. Ein `div` nur dann, wenn du einen Behälter für CSS brauchst und es kein passenderes Element gibt, zum Beispiel einen `.container`, der drei Spalten nebeneinander anordnet.',
          code('html', '<div class="container">', '  <aside>…</aside>', '  <main>…</main>', '  <aside>…</aside>', '</div>'),
          'Früher bestanden ganze Seiten aus verschachtelten divs. Heute gilt das als schlechter Stil.',
        ),
      },
      {
        type: 'binary',
        question: 'Du brauchst einen Behälter nur, um drei Bereiche mit CSS nebeneinanderzustellen. Was nimmst du?',
        options: ['`<div>`', '`<article>`'],
        answer: 0,
        explanation: 'Ohne eigene Bedeutung ist div richtig. article würde behaupten, der Inhalt sei ein eigenständiger Beitrag.',
        variants: [
          {
            type: 'binary',
            question: 'Du schreibst einen Blogbeitrag, der auch für sich allein verständlich ist. Was nimmst du?',
            options: ['`<article>`', '`<div>`'],
            answer: 0,
            explanation: 'article steht für einen eigenständigen Inhalt. Ein div hätte keine Bedeutung.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Warum soll man semantische Elemente wie nav oder main statt div verwenden?',
        answer: 'Sie sagen, welche Rolle ein Bereich hat. Das hilft Screenreadern, Suchmaschinen und anderen Entwicklern, die Seite zu verstehen.',
        variants: [
          {
            type: 'choice',
            question: 'Was gewinnst du, wenn du für den Hauptinhalt `main` statt `div` nimmst?',
            options: [
              'Screenreader können direkt zum Hauptinhalt springen',
              'Die Seite lädt schneller',
              'Der Inhalt wird automatisch zentriert',
              'Nichts, beide Elemente sind gleichwertig',
            ],
            answer: 0,
            explanation: 'main ändert weder Tempo noch Aussehen, sagt aber, welche Rolle der Bereich hat. Das nutzen Screenreader und Suchmaschinen.',
          },
        ],
      },
    ],
    recap: [
      'Semantisches HTML wählt Elemente nach ihrer Bedeutung, nicht nach dem Aussehen.',
      'header, nav, main, aside, footer, article und section gliedern eine Seite.',
      'div hat keine Bedeutung. Nur verwenden, wenn kein passenderes Element existiert.',
    ],
  },
  {
    id: 'v3-4',
    title: 'Texte, Listen, Links und Bilder',
    intro: ['Wie baut man Listen und Links?', 'Wofür ist das alt-Attribut bei Bildern?'],
    steps: [
      {
        type: 'text',
        title: 'Listen',
        text: page(
          'Für Aufzählungen gibt es drei Listen. `ul` (unordered list) zeigt Punkte, `ol` (ordered list) Nummern. In beiden steht jeder Eintrag in einem `li` (list item):',
          code('html', '<ul>', '  <li>HTML</li>', '  <li>CSS</li>', '</ul>'),
          'Wichtig: In `ul` und `ol` dürfen als Kinder **nur** `li`-Elemente stehen. Ein Link in einer Liste kommt also in ein `li`, nicht direkt in das `ul`.',
          'Die dritte Liste ist `dl` für Begriffe mit Erklärung: `dt` ist der Begriff, `dd` die Erklärung.',
        ),
      },
      {
        type: 'choice',
        question: 'Welcher Code ist richtig?',
        options: [
          code('html', '<ul>', '  <li><a href="a.html">A</a></li>', '</ul>'),
          code('html', '<ul>', '  <a href="a.html">A</a>', '</ul>'),
          code('html', '<li>', '  <ul>A</ul>', '</li>'),
        ],
        answer: 0,
        explanation: 'In ul dürfen nur li-Elemente als Kinder stehen. Der Link gehört also in ein li.',
        variants: [
          {
            type: 'choice',
            question: 'Welcher Code ist **falsch**?',
            options: [
              code('html', '<ol>', '  <p>Schritt 1</p>', '</ol>'),
              code('html', '<ol>', '  <li>Schritt 1</li>', '</ol>'),
              code('html', '<ul>', '  <li><strong>Neu</strong></li>', '</ul>'),
            ],
            answer: 0,
            explanation: 'Auch in ol dürfen als Kinder nur li stehen. Im li selbst darf dann anderes stehen, etwa strong.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Links',
        text: page(
          'Links baust du mit dem **a-Element** (anchor). Das Attribut `href` enthält die Adresse, der Inhalt des Elements ist der klickbare Text:',
          code('html', '<a href="kontakt.html">Kontakt</a>', '<a href="https://hs-flensburg.de">Hochschule</a>'),
          'Ein Link auf eine eigene Datei wie `kontakt.html` ist **relativ**: Er sucht die Datei im selben Ordner. Der Name muss dabei **genau** stimmen, auf vielen Servern auch Groß- und Kleinschreibung. Steht im Link `holy-grail.html`, die Datei heißt aber `Holygrail.html`, gibt es den Fehler 404.',
          'Zum Hervorheben im Text: `strong` (stark betont) und `em` (betont) tragen Bedeutung, `b` und `i` sind nur fett bzw. kursiv.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Der Link `<a href="holy-grail.html">` öffnet auch eine Datei namens `Holygrail.html`.',
        answer: false,
        explanation: 'Der Dateiname muss genau stimmen. Hier fehlt der Bindestrich und die Großschreibung weicht ab. Der Browser findet die Datei nicht.',
        variants: [
          {
            type: 'choice',
            question: 'Die Datei `kontakt.html` liegt im selben Ordner. Welcher Link öffnet sie zuverlässig?',
            options: ['`<a href="kontakt.html">`', '`<a href="Kontakt.html">`', '`<a href="kontakt">`', '`<a src="kontakt.html">`'],
            answer: 0,
            explanation: 'Name und Endung müssen genau stimmen, und die Adresse steht im Attribut href. src gibt es beim a-Element nicht.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Bilder, Tabellen und vorformatierter Text',
        text: page(
          'Ein Bild bindest du mit `img` ein. `src` ist die Adresse der Datei, `alt` ein **Alternativtext**:',
          code('html', '<figure>', '  <img src="foto.png" alt="Porträt von Max Muster">', '  <figcaption>Max Muster</figcaption>', '</figure>'),
          'Der alt-Text erscheint, wenn das Bild nicht lädt, und Screenreader lesen ihn vor. Nur bei reinen Schmuckbildern bleibt er leer. `figure` umschließt eigenständigen Inhalt wie Bilder, `figcaption` ist die Bildunterschrift. `img` hat übrigens keinen schließenden Tag.',
          'Tabellen bestehen aus `table`, Zeilen `tr`, Kopfzellen `th` und Zellen `td`, aber nur für tabellarische Daten, nie fürs Seitenlayout. `pre` zeigt Text mit festen Zeilenumbrüchen in Festbreitenschrift, etwa Quellcode.',
        ),
      },
      {
        type: 'choice',
        question: 'Wozu dient das `alt`-Attribut bei einem Bild?',
        options: [
          'Es beschreibt das Bild, wenn es nicht angezeigt werden kann oder vorgelesen wird',
          'Es legt eine alternative Bildgröße fest',
          'Es nennt ein Ersatzbild, falls das erste fehlt',
          'Es zeigt beim Überfahren mit der Maus einen Tooltip',
        ],
        answer: 0,
        explanation: 'alt ist der Textersatz für das Bild, wichtig für Barrierefreiheit und wenn das Bild nicht lädt.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Bei einem Foto, das wichtige Inhalte zeigt, darf das alt-Attribut leer bleiben.',
            answer: false,
            explanation: 'Leer bleibt alt nur bei reinen Schmuckbildern. Bilder mit Inhalt brauchen eine Beschreibung.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was ist der Unterschied zwischen `ul` und `ol`, und was muss in beiden stehen?',
        answer: 'ul ist eine Liste mit Punkten, ol eine nummerierte Liste. In beiden stehen als Kinder nur li-Elemente.',
        variants: [
          {
            type: 'binary',
            question: 'Du schreibst eine Anleitung, deren Schritte in fester Reihenfolge kommen. Welche Liste passt?',
            options: ['`<ol>`', '`<ul>`'],
            answer: 0,
            explanation: 'ol nummeriert die Einträge. Das passt, wenn die Reihenfolge zählt. ul zeigt nur Punkte.',
          },
        ],
      },
    ],
    recap: [
      'ul (Punkte) und ol (Nummern) enthalten als Kinder nur li-Elemente.',
      'Links: <a href="…">Text</a>. Der Dateiname im href muss genau stimmen.',
      'Bilder brauchen einen sinnvollen alt-Text; Tabellen nur für Daten, nie fürs Layout.',
    ],
  },
  {
    id: 'v4-1',
    title: 'Formulare',
    intro: ['Wie schickt ein Formular Daten an den Server?', 'Wie verbindet man Beschriftung und Eingabefeld?'],
    steps: [
      {
        type: 'text',
        title: 'Das form-Element',
        text: page(
          'Ein `form`-Element fasst Eingabefelder zusammen. Beim Abschicken gehen die Eingaben an die Adresse im Attribut `action`. Das Attribut `method` legt die HTTP-Methode fest, meist **POST**, möglich ist auch GET.',
          code('html', '<form action="/anmelden" method="post">', '  <input type="email" name="mail">', '  <button type="submit">Senden</button>', '</form>'),
          'Ohne Absende-Knopf (`type="submit"`) lässt sich ein Formular in der Regel nicht abschicken. Das Attribut `name` bestimmt, unter welchem Namen ein Wert beim Server ankommt.',
        ),
      },
      {
        type: 'cloze',
        text: 'Die Adresse, an die ein Formular seine Daten schickt, steht im Attribut ___.',
        options: ['`action`', '`method`', '`href`'],
        answer: 0,
        explanation: 'action ist das Ziel, method die HTTP-Methode (z. B. post).',
        variants: [
          {
            type: 'cloze',
            text: 'Mit welcher HTTP-Methode ein Formular seine Daten schickt, steht im Attribut ___.',
            options: ['`method`', '`action`', '`type`'],
            answer: 0,
            explanation: 'method legt die Methode fest (meist post), action das Ziel.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Viele Arten von Eingaben',
        text: page(
          'Das `input`-Element ändert mit dem Attribut `type` seine Art: `text`, `password` (Punkte statt Zeichen), `email`, `tel` und `url` (passende Handytastatur, teils mit Prüfung), `number`, `date`, `color`, `range` (Schieberegler), `checkbox`, `radio`, `file` und `hidden` (unsichtbar, wird trotzdem mitgeschickt).',
          '**Radio-Buttons** gehören zusammen, wenn sie denselben `name` haben. Dann ist immer nur einer auswählbar. `placeholder` zeigt einen grauen Hinweistext, `value` einen Startwert.',
          'Für längere Texte gibt es `textarea`, für Auswahllisten `select` mit `option`-Einträgen. `fieldset` gruppiert zusammengehörige Felder, `legend` gibt der Gruppe eine Überschrift.',
        ),
      },
      {
        type: 'binary',
        question: 'Du baust drei Radio-Buttons für „klein“, „mittel“, „groß“. Was müssen sie gemeinsam haben, damit nur einer wählbar ist?',
        options: ['Denselben `name`', 'Dasselbe `value`'],
        answer: 0,
        explanation: 'Radio-Buttons mit gleichem name bilden eine Gruppe. Das value muss sich unterscheiden, sonst weiß der Server nicht, was gewählt wurde.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Zwei Checkboxen mit demselben `name` lassen sich nicht gleichzeitig ankreuzen.',
            answer: false,
            explanation: 'Das gilt nur für Radio-Buttons. Checkboxen sind unabhängig voneinander, auch mit gleichem name.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Beschriftungen richtig verbinden',
        text: page(
          'Jedes Eingabefeld braucht eine Beschriftung mit `label`. Verbunden werden beide, indem das `for`-Attribut des Labels auf die **id** des Eingabefelds zeigt oder indem das Feld direkt im Label steht:',
          code('html', '<label for="mail">E-Mail</label>', '<input type="email" id="mail" name="mail">'),
          'Dann setzt ein Klick auf die Beschriftung den Cursor ins Feld, und Screenreader lesen die Beschriftung vor. (In den Folien steht, `for` verweise auf den `name`. Laut HTML-Standard ist es die `id`.)',
          'Beim Abschicken kodiert der Browser Sonderzeichen für die Adresse, zum Beispiel ein Leerzeichen als `%20`.',
        ),
      },
      {
        type: 'choice',
        question: 'Worauf verweist das `for`-Attribut eines `label`?',
        options: ['Auf die `id` des Eingabefelds', 'Auf den `name` des Formulars', 'Auf die `action` des Formulars', 'Auf den `type` des Eingabefelds'],
        answer: 0,
        explanation: 'for und id gehören zusammen. Alternativ steht das input direkt im label.',
        variants: [
          {
            type: 'choice',
            question: 'Welches label gehört zu `<input type="text" id="vorname" name="vn">`?',
            options: ['`<label for="vorname">`', '`<label for="vn">`', '`<label id="vorname">`', '`<label name="vorname">`'],
            answer: 0,
            explanation: 'for zeigt auf die id des Feldes, hier „vorname“. Der name „vn“ ist nur für den Server.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Wozu dienen die Attribute `name` und `id` bei einem Eingabefeld?',
        answer: 'name bestimmt, unter welchem Namen der Wert an den Server geschickt wird. id identifiziert das Feld eindeutig, z. B. für das for-Attribut eines label.',
        variants: [
          {
            type: 'binary',
            question: 'Der Server soll den Wert eines Feldes unter `plz` bekommen. Welches Attribut setzt du?',
            options: ['`name="plz"`', '`id="plz"`'],
            answer: 0,
            explanation: 'Der Server bekommt die Werte unter ihrem name. Die id wirkt nur innerhalb der Seite, z. B. für label oder CSS.',
          },
        ],
      },
    ],
    recap: [
      'form schickt Daten an die Adresse in action, mit der Methode aus method (meist post).',
      'input hat viele Typen; Radio-Buttons mit gleichem name bilden eine Gruppe.',
      'label for="…" verweist auf die id des Eingabefelds.',
    ],
  },
]

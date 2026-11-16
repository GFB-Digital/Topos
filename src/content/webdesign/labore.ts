import type { Tile } from '../../lib/types.ts'
import { code, page } from './helpers.ts'

// Teil 2 – „Dein Labor“: die eigenen Abgaben, Stück für Stück erklärt.
// Persönliche Angaben aus den Abgaben sind durch „Max Muster“ ersetzt.

export const LAB_TILES: Tile[] = [
  {
    id: 'l1-1',
    title: 'Labor 1: Server befragen',
    intro: ['Was zeigen nslookup und curl?', 'Woher kommen die vielen Anfragen in den Entwicklerwerkzeugen?'],
    steps: [
      {
        type: 'text',
        title: 'Die Aufgabe',
        text: page(
          'In Labor 1 hast du drei Websites untersucht: mit `nslookup` ihre DNS-Einträge, mit `curl` die HTTP-Antworten und mit den Entwicklerwerkzeugen des Browsers alle Anfragen beim Laden der Seite. Dazu solltest du HTTP und den Aufbau einer URI in eigenen Worten beschreiben.',
          'So läuft eine Abfrage mit nslookup in der PowerShell:',
          code('text', 'nslookup', '> set q=MX', '> hs-flensburg.de'),
          'Ohne `set q=…` fragt nslookup nach dem A-Record. Manchmal bekommst du statt einer IP erst einen anderen Namen (CNAME) zurück – dann musst du diesem Namen weiter folgen, bis eine IP-Adresse kommt.',
        ),
      },
      {
        type: 'choice',
        question: 'Du tippst in nslookup nur einen Domainnamen ein, ohne `set q=…`. Nach welchem Eintrag wird gefragt?',
        options: ['A-Record (IPv4-Adresse)', 'MX-Record', 'NS-Record', 'Alle Einträge gleichzeitig'],
        answer: 0,
        explanation: 'Standard ist der A-Record. Für Mail- oder Nameserver stellst du vorher set q=MX bzw. set q=NS ein.',
      },
      {
        type: 'text',
        title: 'Was curl verrät',
        text: page(
          '`curl -i -X GET https://<domain>` zeigt dir die rohe HTTP-Antwort. Ganz oben steht die Statuszeile, darunter die Header, nach einer Leerzeile der HTML-Code:',
          code('http', 'HTTP/1.1 301 Moved Permanently', 'Location: https://www.beispiel.de/', 'Set-Cookie: sitzung=ab12cd', 'Content-Type: text/html; charset=UTF-8'),
          'Ein **301** mit `Location` heißt: Die Seite ist umgezogen, frag dort nach. Das passiert oft, wenn eine Domain ohne „www“ auf die Variante mit „www“ weiterleitet. `Set-Cookie` legt ein Cookie an, `Content-Type` sagt, welches Format der Rumpf hat.',
        ),
      },
      {
        type: 'binary',
        question: 'curl zeigt `301 Moved Permanently` und eine Zeile `Location: …`. Was bedeutet das?',
        options: ['Die Seite liegt jetzt unter der Adresse in Location', 'Der Server ist überlastet'],
        answer: 0,
        explanation: '3xx-Codes sind Umleitungen. Der Browser folgt der Adresse in Location automatisch, curl ohne Zusatzoption nicht.',
      },
      {
        type: 'text',
        title: 'Viele Anfragen für eine Seite',
        text: page(
          'Im Netzwerk-Reiter der Entwicklerwerkzeuge siehst du beim Aufruf einer einzigen Seite oft Dutzende Anfragen. Der Grund: Die HTML-Datei verweist auf viele weitere Dateien – Stylesheets, Bilder, Schriften, Skripte. Jede wird mit einer eigenen HTTP-Anfrage geladen, teils von ganz anderen Servern, etwa für Schriften, Videos oder Statistik-Dienste.',
          'Für jede Anfrage zeigen die Entwicklerwerkzeuge Methode, Statuscode, Dateityp, Größe und Ladezeit. Klickst du eine an, siehst du dieselben Header wie bei curl.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Alle Anfragen beim Laden einer Seite gehen immer an denselben Server wie die HTML-Datei.',
        answer: false,
        explanation: 'Viele Seiten laden Schriften, Videos, Skripte oder Statistik-Dienste von fremden Servern. Auch das siehst du im Netzwerk-Reiter.',
      },
      {
        type: 'recall',
        question: 'Wie würdest du einer Kommilitonin in zwei Sätzen erklären, was beim Aufruf einer Webseite passiert?',
        answer: 'Der Browser fragt per DNS nach der IP-Adresse des Servers und schickt ihm dann eine HTTP-Anfrage. Der Server antwortet mit Statuscode, Headern und den Daten, und der Browser lädt anschließend alle verknüpften Dateien nach.',
      },
    ],
    recap: [
      'nslookup fragt DNS-Einträge ab; set q=MX, NS … wählt den Typ, Standard ist A.',
      'curl -i zeigt Statuszeile, Header und Rumpf; 301 + Location bedeutet Umleitung.',
      'Eine Seite löst viele Anfragen aus, weil CSS, Bilder, Schriften und Skripte einzeln geladen werden.',
    ],
  },
  {
    id: 'l2-1',
    title: 'Labor 2: Dein Lebenslauf in HTML',
    intro: ['Was gehört in den head, was in den body?', 'Welche Fehler korrigiert der Browser heimlich?'],
    steps: [
      {
        type: 'text',
        title: 'Überschrift und Foto im head',
        text: page(
          'In Labor 2 hast du eine „Über mich“-Seite mit reinem HTML gebaut und die Wahl jedes Elements in einem Kommentar begründet – das hast du gut gemacht. Am Anfang deiner Abgabe stand allerdings:',
          code('html', '<head>', '<h1>Lebenslauf</h1>', '<p>Dies ist mein Lebenslauf</p>', '<figure>', '<img src="foto.png" alt="" width="150">', '</figure>', '</head>'),
          'Überschrift, Absatz und Bild sind sichtbare Inhalte und gehören in den **body**. Der Browser merkt das, schließt den head beim h1 automatisch und schiebt alles in den body. Deshalb sah die Seite trotzdem richtig aus – der Code ist aber falsch. Richtig wäre ein `header` am Anfang des body.',
        ),
      },
      {
        type: 'choice',
        question: 'Warum wurde deine Überschrift angezeigt, obwohl sie im `head` stand?',
        options: [
          'Der Browser repariert den Fehler und verschiebt sie in den body',
          'Im head ist h1 erlaubt',
          'Der head wird immer mit angezeigt',
          'Das liegt am Live Server in VS Code',
        ],
        answer: 0,
        explanation: 'Browser sind sehr fehlertolerant. Sie schließen den head beim ersten sichtbaren Element und setzen den Rest in den body. Auf Fehlertoleranz sollte man sich aber nicht verlassen.',
      },
      {
        type: 'text',
        title: 'Was sonst noch fehlte',
        text: page(
          'Im Gerüst fehlten drei Dinge, die jede Seite haben sollte: `lang="de"` am html-Element (damit Screenreader deutsch vorlesen), `<meta charset="UTF-8">` (damit Umlaute sicher stimmen) und ein `<title>` (der Text im Browser-Tab – er ist sogar Pflicht).',
          'Und dein Foto hatte `alt=""`. Ein leerer alt-Text sagt: „Reine Dekoration, bitte ignorieren.“ Ein Porträt auf einer Lebenslauf-Seite ist aber Inhalt. Besser:',
          code('html', '<img src="foto.png" alt="Porträt von Max Muster" width="150">'),
        ),
      },
      {
        type: 'order',
        question: 'Bring den Anfang deiner korrigierten Seite in die richtige Reihenfolge.',
        items: ['`<!DOCTYPE html>`', '`<html lang="de">`', '`<head>` mit charset und title', '`<body>`', '`<header>` mit der h1'],
        explanation: 'Doctype, html mit Sprache, head mit Zeichensatz und Titel, dann im body ein header mit der Überschrift.',
      },
      {
        type: 'text',
        title: 'Liste ohne Einträge, footer hinter dem body',
        text: page(
          'Deine vorbereitete Navigation sah so aus:',
          code('html', '<nav>', '<ul>', '<a href="#"></a>', '<a href="#"></a>', '</ul>', '</nav>'),
          'In einem `ul` dürfen nur `li` stehen – jeder Link braucht also ein li drumherum. Außerdem sind die Links leer: Ohne Text kann man sie weder sehen noch anklicken.',
          'Weiter unten standen `aside` und `nav` **in einem p** – ein Absatz darf aber keine solchen Bereiche enthalten, der Browser beendet das p davor einfach. Und der `footer` stand **nach** `</body>`. Nach dem body darf nichts mehr kommen; auch der footer gehört in den body.',
        ),
      },
      {
        type: 'choice',
        question: 'Welche Version deiner Navigation ist korrekt?',
        options: [
          code('html', '<nav>', '  <ul>', '    <li><a href="#ausbildung">Ausbildung</a></li>', '  </ul>', '</nav>'),
          code('html', '<nav>', '  <ul>', '    <a href="#ausbildung">Ausbildung</a>', '  </ul>', '</nav>'),
          code('html', '<nav>', '  <li>', '    <a href="#ausbildung">Ausbildung</a>', '  </li>', '</nav>'),
        ],
        answer: 0,
        explanation: 'li gehört direkt in ul, der Link in das li – und ein Link braucht sichtbaren Text.',
      },
      {
        type: 'recall',
        question: 'Nenne drei Fehler aus deiner Abgabe zu Labor 2 und wie man sie behebt.',
        answer: 'Sichtbare Inhalte (h1, p, Bild) standen im head → in einen header im body. Links standen ohne li im ul → jeden Link in ein li. Der footer stand nach </body> → in den body verschieben. (Außerdem: title, charset, lang und ein sinnvoller alt-Text fehlten.)',
      },
    ],
    recap: [
      'Sichtbares gehört in den body – der Browser repariert Fehler heimlich, verlassen sollte man sich darauf nicht.',
      'Jede Seite braucht lang, meta charset und title; Porträts brauchen einen echten alt-Text.',
      'In ul nur li, kein aside oder nav in einem p, nach </body> nichts mehr.',
    ],
  },
  {
    id: 'l3-1',
    title: 'Labor 3: Dein Text mit CSS',
    intro: ['Wohin gehört das CSS?', 'Was verrät dein Stylesheet über Vererbung?'],
    steps: [
      {
        type: 'text',
        title: 'Deine Regeln',
        text: page(
          'In Labor 3 solltest du den Text deiner Seite mit mindestens fünf CSS-Eigenschaften gestalten. Ein Auszug aus deinem CSS:',
          code('css', 'html {', '  background-color: bisque;', '  font-family: Arial;', '}', '.Info { color: gray; }', '.Impressum {', '  color: blue;', '  font-size: 11px;', '  text-decoration: underline blue;', '  text-align: right;', '}'),
          'Schön genutzt hast du die **Vererbung**: `font-family` steht nur einmal am html-Element und gilt trotzdem für jeden Text der Seite. Ein kleiner Verbesserungsvorschlag: eine Rückfall-Schrift ergänzen, also `font-family: Arial, sans-serif;`.',
        ),
      },
      {
        type: 'binary',
        question: 'Du setzt `font-family: Arial;` nur am `html`-Element. Gilt die Schrift auch für die Absätze im footer?',
        options: ['Ja, font-family wird vererbt', 'Nein, jedes Element braucht eine eigene Regel'],
        answer: 0,
        explanation: 'Schrift-Eigenschaften werden an alle Nachfahren vererbt, solange keine andere Regel sie überschreibt.',
      },
      {
        type: 'text',
        title: 'Wo das CSS stand',
        text: page(
          'Dein `<style>`-Element stand ganz am Ende der Datei, nach `</body>`. Der Browser hat es trotzdem angewendet – richtig ist aber: `style` gehört in den **head**.',
          'In Labor 4 hast du das CSS dann in eine eigene Datei `style.css` ausgelagert und mit `<link rel="stylesheet" href="style.css">` im head eingebunden. Das ist der bessere Weg: HTML und Gestaltung sind getrennt, und mehrere Seiten können dasselbe Stylesheet nutzen.',
        ),
      },
      {
        type: 'choice',
        question: 'Wo sollte ein `<style>`-Element stehen?',
        options: ['Im head', 'Direkt nach `</body>`', 'Am Ende des body', 'Egal – der Browser findet es überall'],
        answer: 0,
        explanation: 'style gehört in den head. Dass der Browser es auch anderswo anwendet, ist Fehlertoleranz – kein gültiges HTML.',
      },
      {
        type: 'text',
        title: 'Kleinigkeiten mit Wirkung',
        text: page(
          '**Blau und unterstrichen** – so sehen für fast alle Menschen Links aus. Dein Impressum-Text ist aber kein Link. Wer ihn anklickt, wundert sich. Nutze diese Kombination nur für echte Links.',
          '**Klassennamen** wie `.Fähigkeiten` funktionieren zwar, üblich sind aber Kleinbuchstaben ohne Umlaute und mit Bindestrichen, etwa `.faehigkeiten` oder `.kontakt-info`. Das vermeidet Probleme mit Zeichensätzen und Tippfehlern bei der Groß- und Kleinschreibung.',
          '**font-size: 11px** ist sehr klein und wächst nicht mit, wenn jemand im Browser eine größere Grundschrift einstellt. Mit `rem` (z. B. `0.75rem`) bleibt die Größe relativ zur Grundschrift.',
          '`font-weight: 1000` funktioniert in modernen Browsern, üblich sind aber Werte von 100 bis 900 – `bold` entspricht 700.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Blauer, unterstrichener Text, der kein Link ist, kann Nutzer verwirren.',
        answer: true,
        explanation: 'Diese Kombination ist die bekannteste Kennzeichnung für Links. Nutzer versuchen, ihn anzuklicken.',
      },
      {
        type: 'recall',
        question: 'Warum ist `font-size: 0.75rem` oft besser als `font-size: 11px`?',
        answer: 'rem richtet sich nach der Grundschriftgröße. Stellt jemand im Browser größere Schrift ein, wächst der Text mit – feste Pixel bleiben klein.',
      },
    ],
    recap: [
      'Vererbung nutzen: Schrift einmal am html oder body setzen – mit Rückfall wie sans-serif.',
      'CSS gehört in den head oder in eine eigene Datei, eingebunden mit link.',
      'Blau + unterstrichen nur für Links; Klassennamen klein und ohne Umlaute; Schriftgrößen in rem.',
    ],
  },
  {
    id: 'l4-1',
    title: 'Labor 4: Holy Grail mit Grid',
    intro: ['Wie baut man das Holy-Grail-Layout mit Grid?', 'Welche Zeile in deiner HTML-Datei war falsch?'],
    steps: [
      {
        type: 'text',
        title: 'Dein Raster',
        text: page(
          'Das **Holy-Grail-Layout** ist ein Klassiker: Kopf oben, Fuß unten, dazwischen der Hauptinhalt mit je einer Seitenleiste links und rechts. Lange war es mit CSS schwer zu bauen – daher der Name „heiliger Gral“. Mit Grid ist es einfach. Dein Container:',
          code('css', 'body {', '  display: grid;', '  grid-template-columns: 100px 1fr 100px;', '  grid-template-rows: 100px 1fr 100px;', '  height: 100vh;', '  gap: 0.5rem;', '}'),
          'Drei Spalten (links und rechts fest, Mitte flexibel) und drei Zeilen (oben und unten fest, Mitte flexibel). `height: 100vh` gibt dem Grid die volle Fensterhöhe, damit `1fr` bei den Zeilen etwas zu verteilen hat.',
        ),
      },
      {
        type: 'choice',
        question: 'Warum brauchte dein Grid `height: 100vh`?',
        options: [
          'Damit die mittlere Zeile mit 1fr die restliche Fensterhöhe füllen kann',
          'Damit die Spalten gleich breit werden',
          'Damit der footer eine Hintergrundfarbe bekommt',
          'Ohne height funktioniert display: grid gar nicht',
        ],
        answer: 0,
        explanation: 'Ohne feste Höhe ist das Grid nur so hoch wie sein Inhalt. Dann gibt es keinen Rest, den 1fr verteilen könnte.',
      },
      {
        type: 'text',
        title: 'Die Bereiche platzieren',
        text: page(
          'Jeden Bereich hast du mit Linien platziert:',
          code('css', 'header { grid-column: 1 / 4; grid-row: 1 / 2; }', 'body > aside:first-of-type { grid-column: 1 / 2; grid-row: 2 / 3; }', 'main { grid-column: 2 / 3; grid-row: 2 / 3; }', 'body > aside:last-of-type { grid-column: 3 / 4; grid-row: 2 / 3; }', 'footer { grid-column: 1 / 4; grid-row: 3 / 4; }'),
          'Header und footer reichen von Linie 1 bis 4, also über alle drei Spalten. Die beiden asides unterscheidest du mit `:first-of-type` und `:last-of-type`. Das ist sauber gelöst! Mit `grid-template-areas` ginge es noch lesbarer – das kommt in Labor 5.',
        ),
      },
      {
        type: 'order',
        question: 'Bring die Zeilen der Holy-Grail-Fläche in die richtige Reihenfolge (von oben nach unten).',
        items: ['`"kopf kopf kopf"`', '`"links mitte rechts"`', '`"fuss fuss fuss"`'],
        explanation: 'Oben der Kopf über drei Spalten, in der Mitte Seitenleiste – Inhalt – Seitenleiste, unten der Fuß über drei Spalten.',
      },
      {
        type: 'text',
        title: 'nav im head',
        text: page(
          'In deiner `Holygrail.html` stand:',
          code('html', '<head>', '<nav>', '<link rel="stylesheet" href="Holygrail.css">', '</nav>', '</head>'),
          'Ein `nav` hat im head nichts zu suchen – es ist ein sichtbarer Bereich für Links. Das CSS wurde trotzdem geladen, weil der Browser nav und link in den body verschoben hat und dort ein link ebenfalls wirkt. Richtig ist das link-Element allein im head.',
          'Und noch ein Stolperstein aus Labor 4: Auf deiner Lebenslauf-Seite zeigte der Link auf `holy-grail.html`, die Datei hieß aber `Holygrail.html`. Der Link führt so ins Leere (Fehler 404).',
        ),
      },
      {
        type: 'binary',
        question: 'Deine Datei heißt `Holygrail.html`. Welcher Link funktioniert?',
        options: ['`<a href="Holygrail.html">`', '`<a href="holy-grail.html">`'],
        answer: 0,
        explanation: 'Der Dateiname im href muss exakt stimmen – Bindestriche und auf vielen Servern auch Groß- und Kleinschreibung.',
      },
      {
        type: 'recall',
        question: 'Beschreibe in Worten, wie dein Holy-Grail-Grid aufgebaut ist.',
        answer: 'Drei Spalten (100px, 1fr, 100px) und drei Zeilen (100px, 1fr, 100px) bei voller Fensterhöhe. Header und footer reichen über alle Spalten, die asides stehen links und rechts, main in der Mitte.',
      },
    ],
    recap: [
      'Holy Grail mit Grid: 100px 1fr 100px in Spalten und Zeilen, height: 100vh.',
      'Header und footer mit grid-column: 1 / 4 über die volle Breite; asides per :first-of-type / :last-of-type.',
      'link gehört allein in den head; Dateinamen in Links müssen exakt stimmen.',
    ],
  },
  {
    id: 'l4-2',
    title: 'Labor 4: Dein Lebenslauf im Grid',
    intro: ['Warum ist ein Layout mit großen margins zerbrechlich?', 'Wie kann ein Grid in einem Grid stecken?'],
    steps: [
      {
        type: 'text',
        title: 'Mit margin zurechtgeschoben',
        text: page(
          'Für deine Lebenslauf-Seite hast du dasselbe Raster wie beim Holy Grail benutzt. Die Bereiche hast du dann so platziert:',
          code('css', 'body > aside:last-of-type {', '  grid-column: 2 / 4;', '  grid-row: 2 / 3;', '  margin-left: 300px;', '}', 'main {', '  grid-column: 2 / 3;', '  grid-row: 1 / 3;', '  margin-left: 85px;', '}'),
          'Das zweite aside reicht über die Spalten 2 bis 4 und überlappt dadurch main. Erst `margin-left: 300px` schiebt seinen Inhalt aus dem Weg. Auf deinem Bildschirm sah das gut aus – in einem schmaleren Fenster passt es nicht mehr, weil 300 px dann zu viel oder zu wenig sind.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Ein Layout, bei dem Bereiche mit `margin-left: 300px` aus dem Weg geschoben werden, passt bei jeder Fensterbreite.',
        answer: false,
        explanation: 'Feste Abstände stimmen nur bei der Breite, bei der sie ausprobiert wurden. Besser ist es, jedem Bereich eine eigene Zelle zu geben.',
      },
      {
        type: 'text',
        title: 'Besser: jedem Bereich seine Zelle',
        text: page(
          'Robuster ist es, wenn sich die Bereiche gar nicht überlappen. Mit benannten Flächen sieht man das Layout direkt im Code:',
          code('css', 'body {', '  display: grid;', '  grid-template-columns: 200px 1fr 200px;', '  grid-template-areas:', '    "kopf kopf kopf"', '    "steckbrief foto faehigkeiten"', '    "fuss fuss fuss";', '}', 'main { grid-area: foto; }'),
          'Jeder Bereich bekommt mit `grid-area` seinen Namen. Keine Überlappung, keine Schiebe-Abstände, und die mittlere Spalte passt sich mit 1fr jeder Breite an.',
        ),
      },
      {
        type: 'choice',
        question: 'Was ist der Hauptvorteil von `grid-template-areas` gegenüber Platzieren mit Überlappung und margin?',
        options: [
          'Jeder Bereich hat eine eigene Zelle, das Layout passt sich jeder Breite an',
          'Die Seite lädt schneller',
          'Man braucht kein display: grid mehr',
          'Die Schrift wird automatisch größer',
        ],
        answer: 0,
        explanation: 'Ohne Überlappung braucht es keine Schiebe-Abstände. Das Raster selbst verteilt den Platz.',
      },
      {
        type: 'text',
        title: 'Ein Grid im Grid',
        text: page(
          'Gut gelöst war dein footer: Er ist selbst wieder ein Grid mit zwei Spalten und zwei Zeilen.',
          code('css', 'footer {', '  display: grid;', '  grid-template-columns: 1fr 1fr;', '  grid-template-rows: 1fr 1fr;', '  border: 5px solid beige;', '  border-radius: 2rem;', '}', 'footer > section:first-of-type {', '  grid-row: 1 / 3;', '}'),
          'Die erste section (die Anschrift) reicht über beide Zeilen links, rechts stehen Navigation und Impressum übereinander. Ein Element kann gleichzeitig **Item** im äußeren Grid und **Container** für ein inneres Grid sein.',
        ),
      },
      {
        type: 'binary',
        question: 'Dein footer ist ein Item im Grid des body. Darf er selbst `display: grid` haben?',
        options: ['Ja, Grids lassen sich verschachteln', 'Nein, ein Grid-Item kann kein Container sein'],
        answer: 0,
        explanation: 'Jedes Element kann Container für seine eigenen Kinder sein – auch wenn es selbst in einem Grid liegt.',
      },
      {
        type: 'recall',
        question: 'Warum ist `grid-row: 1 / 3` für die Anschrift-section in deinem footer sinnvoll?',
        answer: 'Sie reicht damit über beide Zeilen des footer-Grids und steht links neben den beiden anderen sections, die rechts übereinander stehen.',
      },
    ],
    recap: [
      'Überlappen und mit margin zurechtschieben ist zerbrechlich – es passt nur bei einer Breite.',
      'grid-template-areas gibt jedem Bereich eine eigene Zelle und macht das Layout lesbar.',
      'Grids lassen sich verschachteln: Ein Item kann selbst Grid-Container sein.',
    ],
  },
  {
    id: 'l5-1',
    title: 'Labor 5: Mit Linien und mit Flächen',
    intro: ['Wie baut man dasselbe Layout einmal mit Linien und einmal mit grid-area?', 'Was fehlte beim Zentrieren?'],
    steps: [
      {
        type: 'text',
        title: 'Variante 1: Linien',
        text: page(
          'In Labor 5 solltest du ein 3×3-Raster mit vier Elementen bauen – einmal ohne und einmal mit `grid-area`. Deine erste Variante:',
          code('css', '.grid1 p:first-of-type { grid-column: 1 / 3; grid-row: 1 / 2; }', '.grid1 p:nth-of-type(2) { grid-column: 3 / 4; grid-row: 1 / 3; }', '.grid1 p:nth-of-type(3) { grid-column: 2 / 4; grid-row: 3 / 4; }', '.grid1 p:nth-of-type(4) { grid-column: 1 / 2; grid-row: 2 / 4; }'),
          'Die vier Elemente drehen sich wie ein Windrad um die Mitte: p1 oben über zwei Spalten, p2 rechts über zwei Zeilen, p3 unten, p4 links. Die Zelle in der Mitte bleibt frei.',
        ),
      },
      {
        type: 'choice',
        question: 'Welche Zellen belegt `grid-column: 3 / 4; grid-row: 1 / 3;` in einem 3×3-Raster?',
        options: [
          'Die rechte Spalte in den oberen zwei Zeilen',
          'Die unteren zwei Zeilen der mittleren Spalte',
          'Nur die Zelle oben rechts',
          'Die ganze rechte Spalte',
        ],
        answer: 0,
        explanation: 'Spalte von Linie 3 bis 4 ist die dritte Spalte; Zeile von Linie 1 bis 3 sind die ersten beiden Zeilen.',
      },
      {
        type: 'text',
        title: 'Variante 2: Flächen',
        text: page(
          'Dasselbe mit benannten Flächen – hier sieht man das Windrad direkt:',
          code('css', '.grid2 {', '  display: grid;', '  grid-template-areas:', '    "p1 p1 p2"', '    "p4 .  p2"', '    "p4 p3 p3";', '}', '.grid2 p:first-of-type { grid-area: p1; }'),
          'Der Punkt in der Mitte ist die leere Zelle. Ein Tipp für weniger Tipparbeit: Rahmen, Hintergrund und `margin: 0` waren bei dir für jedes p einzeln wiederholt. Eine gemeinsame Regel `.grid2 p { … }` setzt sie für alle vier auf einmal. Einzeln steht dann nur noch das, was sich unterscheidet: die Fläche.',
        ),
      },
      {
        type: 'binary',
        question: 'Vier Regeln wiederholen jeweils `border`, `background-color` und `margin: 0`. Was ist besser?',
        options: ['Eine gemeinsame Regel `.grid2 p { … }` für alle', 'Die Wiederholung lassen, das ist übersichtlicher'],
        answer: 0,
        explanation: 'Gemeinsames gehört in eine Regel. Ändert sich später die Farbe, änderst du sie an einer Stelle statt an vier.',
      },
      {
        type: 'text',
        title: 'Das Zentrieren',
        text: page(
          'Die Aufgabe verlangte außerdem, das Grid zu zentrieren. In deinem Code stand dazu:',
          code('css', '.grid2 {', '  align-content: right;', '}'),
          '`right` ist kein gültiger Wert – der Browser ignoriert die Zeile. Und `align-content` am Grid selbst würde ohnehin nur dessen eigene Zeilen verschieben. Um die beiden Raster auf der Seite zu zentrieren, braucht es eine Angabe am **Container**, also am body:',
          code('css', 'body {', '  display: grid;', '  grid-template-columns: 360px 360px;', '  place-content: center;', '  min-height: 100vh;', '}'),
        ),
      },
      {
        type: 'choice',
        question: 'Wie zentrierst du zwei feste Raster von je 360 px waagerecht und senkrecht im Fenster, wenn der body das äußere Grid ist?',
        options: [
          '`place-content: center;` und `min-height: 100vh;` am body',
          '`align-content: right;` an jedem Raster',
          '`text-align: center;` am body',
          '`margin-left: 300px;` am ersten Raster',
        ],
        answer: 0,
        explanation: 'place-content verschiebt das Raster des body in beide Richtungen; die Höhe braucht es, damit auch senkrecht Platz zum Zentrieren da ist.',
      },
      {
        type: 'recall',
        question: 'Wie sieht die Zeile `"p4 . p2"` in deinem Raster aus?',
        answer: 'Links steht p4, in der Mitte bleibt eine leere Zelle, rechts steht p2.',
      },
    ],
    recap: [
      'Dasselbe Layout geht mit Linien (grid-column / grid-row) oder mit Flächen (grid-template-areas).',
      'Gemeinsame Eigenschaften in eine Regel für alle, Unterschiede einzeln.',
      'Ungültige Werte wie right werden ignoriert; zentriert wird am Container, z. B. mit place-content: center.',
    ],
  },
  {
    id: 'l6-1',
    title: 'Labor 6: Holy Grail mit Flexbox',
    intro: ['Wie baut man das Holy-Grail-Layout ohne Grid?', 'Wie nimmt sich main den restlichen Platz?'],
    steps: [
      {
        type: 'text',
        title: 'Zwei Flex-Ebenen',
        text: page(
          'In Labor 6 gab es das HTML vor, und du solltest es nur mit Flexbox gestalten – ohne Grid. Deine Lösung arbeitet mit zwei Ebenen:',
          code('css', 'body {', '  margin: 0;', '  min-height: 100vh;', '  display: flex;', '  flex-direction: column;', '}', '.container {', '  display: flex;', '  flex: 1;', '}'),
          'Der body stellt header, `.container` und footer **untereinander**. Der Container bekommt `flex: 1` und wächst damit in die ganze restliche Höhe. Er ist selbst ein Flex-Container und stellt aside, main und aside **nebeneinander**.',
        ),
      },
      {
        type: 'binary',
        question: 'Warum hat `.container` die Angabe `flex: 1`?',
        options: ['Damit er die restliche Höhe zwischen header und footer füllt', 'Damit seine Kinder nebeneinander stehen'],
        answer: 0,
        explanation: 'Im senkrechten Flex-Container body ist die Hauptachse senkrecht. flex: 1 lässt den Container entlang dieser Achse wachsen. Nebeneinander stehen die Kinder durch sein eigenes display: flex.',
      },
      {
        type: 'text',
        title: 'Feste Seiten, flexible Mitte',
        text: page(
          'In der Reihe sorgen diese Regeln für feste Seitenleisten und eine flexible Mitte:',
          code('css', 'aside {', '  flex: 0 0 200px;', '}', 'main {', '  flex: 1 1 0;', '}'),
          '`flex: 0 0 200px` heißt: nicht wachsen, nicht schrumpfen, Grundgröße 200 px – die asides bleiben genau 200 px breit. `flex: 1 1 0` lässt main bei einer Grundgröße von 0 wachsen und schrumpfen, also nimmt es sich allen Platz, der übrig bleibt.',
        ),
      },
      {
        type: 'order',
        question: 'Bring die Zeilen der Regel für die Seitenleisten in die richtige Reihenfolge.',
        items: ['`aside {`', '`  flex: 0 0 200px;`', '`}`'],
        explanation: 'Selektor, dann die Deklaration mit grow 0, shrink 0, basis 200px, dann die schließende Klammer.',
      },
      {
        type: 'text',
        title: 'Kopf- und Fußleiste',
        text: page(
          'Auch header und footer sind Flex-Container:',
          code('css', 'header, footer {', '  display: flex;', '  justify-content: space-between;', '  align-items: center;', '}', 'header ul, footer ul {', '  display: flex;', '  gap: 1rem;', '  list-style: none;', '  margin: 0;', '  padding: 0;', '}'),
          '`space-between` schiebt die Überschrift nach links und die Linkliste nach rechts, `align-items: center` setzt beide auf dieselbe Höhe. Die Liste wird selbst zur Reihe; `list-style: none` entfernt die Punkte, `margin: 0` und `padding: 0` die Standard-Abstände des Browsers für Listen.',
        ),
      },
      {
        type: 'choice',
        question: 'Wozu dienen `margin: 0;` und `padding: 0;` bei der Linkliste?',
        options: [
          'Sie entfernen die Standard-Abstände, die der Browser Listen gibt',
          'Sie machen die Liste unsichtbar',
          'Sie stellen die Einträge nebeneinander',
          'Sie entfernen die Aufzählungspunkte',
        ],
        answer: 0,
        explanation: 'Browser geben ul einen Außenabstand oben/unten und einen Innenabstand links für die Punkte. Die Punkte selbst entfernt list-style: none.',
      },
      {
        type: 'recall',
        question: 'Erkläre, wie in deiner Lösung main „den restlichen Platz“ bekommt.',
        answer: 'Die asides haben flex: 0 0 200px und bleiben fest 200 px breit. main hat flex: 1 1 0, startet bei 0 und wächst in allen Platz, der in der Reihe übrig bleibt.',
      },
    ],
    recap: [
      'Zwei Flex-Ebenen: body senkrecht (column), .container waagerecht mit flex: 1.',
      'asides mit flex: 0 0 200px fest, main mit flex: 1 1 0 flexibel.',
      'header und footer: space-between und align-items: center; Liste mit list-style: none, margin: 0, padding: 0.',
    ],
  },
  {
    id: 'l7-1',
    title: 'Labor 7: Karten mit Grid und Flexbox',
    intro: ['Wie wechselt ein Grid ab 500 px auf vier Spalten?', 'Wie entsteht eine seitlich scrollende Reihe?'],
    steps: [
      {
        type: 'text',
        title: 'Zwei oder vier Spalten',
        text: page(
          'Aufgabe 1 in Labor 7: zwölf Karten, zwei pro Zeile – ab einer Breite von mehr als 500 px vier pro Zeile. Deine Lösung:',
          code('css', 'body {', '  display: grid;', '  grid-template-columns: repeat(2, 1fr);', '  gap: 1rem;', '}', '@media (width > 500px) {', '  body {', '    grid-template-columns: repeat(4, 1fr);', '  }', '}'),
          'Das ist genau richtig und **Mobile First**: Erst die schmale Variante als Standard, dann die Media Query für breite Bildschirme. Gut ist auch das `viewport`-meta-Tag in deinem head – ohne es würde das Handy die Media Query falsch auswerten.',
        ),
      },
      {
        type: 'choice',
        question: 'Wie viele Karten stehen mit deinem CSS in einem genau 500 px breiten Fenster nebeneinander?',
        options: ['2', '4', '3', '12'],
        answer: 0,
        explanation: '`width > 500px` verlangt mehr als 500 px. Bei genau 500 px greift die Media Query noch nicht. Mit `min-width: 500px` wären es 4.',
      },
      {
        type: 'text',
        title: 'Die Netflix-Reihe',
        text: page(
          'Aufgabe 2: Die Karten stehen in einer Reihe und lassen sich seitlich scrollen, wenn sie nicht auf den Bildschirm passen. Deine Lösung:',
          code('css', '.cards {', '  display: flex;', '  overflow-x: scroll;', '  gap: 1rem;', '}', 'article {', '  flex: 0 0 200px;', '}'),
          'Entscheidend ist `flex: 0 0 200px`: Die Karten dürfen nicht schrumpfen, also ragen sie über den Container hinaus. `overflow-x` macht diesen Überstand scrollbar. Kleiner Feinschliff: Mit `overflow-x: auto` erscheint die Scrollleiste nur, wenn es wirklich etwas zu scrollen gibt.',
        ),
      },
      {
        type: 'binary',
        question: 'Was würde passieren, wenn die Karten statt `flex: 0 0 200px` nur `width: 200px` hätten?',
        options: ['Sie würden schrumpfen, damit alle in die Breite passen', 'Es würde genauso funktionieren'],
        answer: 0,
        explanation: 'Flex-Items dürfen standardmäßig schrumpfen (flex-shrink: 1). Dann passen alle hinein, und es gibt nichts zu scrollen.',
      },
      {
        type: 'text',
        title: 'Noch eine Idee',
        text: page(
          'Für Aufgabe 1 hast du den body selbst zum Grid gemacht. Das funktioniert, solange auf der Seite nur Karten stehen. Kommen ein header oder footer dazu, landen sie mit im Raster. Üblich ist darum ein eigener Container, etwa `<main class="karten">`, der die Karten enthält.',
          'Und falls die Aufgabe einmal nicht genau „2 oder 4“ verlangt: `repeat(auto-fit, minmax(200px, 1fr))` passt die Spaltenzahl ganz ohne Media Query an die Breite an.',
          code('html', '<main class="karten">', '  <article>Ass</article>', '  <article>König</article>', '</main>'),
        ),
      },
      {
        type: 'truefalse',
        statement: 'Wenn der body selbst das Karten-Grid ist, würde ein zusätzlicher header ebenfalls als Zelle im Raster landen.',
        answer: true,
        explanation: 'Alle direkten Kinder des Grid-Containers werden Items. Ein eigener Container für die Karten hält das Raster sauber.',
      },
      {
        type: 'recall',
        question: 'Welche zwei Angaben machen deine Netflix-Reihe seitlich scrollbar, und warum braucht es beide?',
        answer: 'flex: 0 0 200px verhindert, dass die Karten schrumpfen, sodass sie über den Container hinausragen. overflow-x: scroll (oder auto) macht diesen Überstand scrollbar.',
      },
    ],
    recap: [
      'Mobile First: repeat(2, 1fr) als Standard, @media (width > 500px) für vier Spalten.',
      'Seitlich scrollen: display: flex, overflow-x: auto, Karten mit flex: 0 0 200px.',
      'Karten in einen eigenen Container statt direkt in den body.',
    ],
  },
]

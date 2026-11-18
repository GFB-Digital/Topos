import type { Tile } from '../../lib/types.ts'
import { code, page } from './helpers.ts'

// Teil 1 – Wie das Web funktioniert (Vorlesungen 1 und 2)

export const WEB_TILES: Tile[] = [
  {
    id: 'v2-1',
    title: 'Internet und Web',
    intro: ['Ist das Web dasselbe wie das Internet?', 'Auf welchen drei Standards baut das Web auf?'],
    steps: [
      {
        type: 'text',
        title: 'Zwei verschiedene Dinge',
        text: page(
          'Das **Internet** ist das weltweite Netz aus verbundenen Computern. Über dieses Netz laufen viele verschiedene Dienste: E-Mail, Online-Spiele, Dateiübertragung per FTP und eben das **World Wide Web**, kurz Web.',
          'Das Web ist also nur ein Dienst im Internet, wenn auch der bekannteste. Wer „Internet“ sagt, meint im Alltag meistens das Web. Für Webentwickler lohnt sich die Unterscheidung: Das Internet sorgt dafür, dass Daten überhaupt von A nach B kommen. Das Web legt fest, wie Seiten aussehen, wie man sie anfragt und wie sie aufeinander verweisen.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'E-Mail ist ein Teil des World Wide Web.',
        answer: false,
        explanation: 'E-Mail ist ein eigener Dienst im Internet, genau wie das Web. Beide nutzen das Internet, sind aber verschiedene Dienste.',
        variants: [
          {
            type: 'choice',
            question: 'Welches davon nutzt zwar das Internet, gehört aber **nicht** zum World Wide Web?',
            options: ['Dateiübertragung per FTP', 'Eine Webseite im Browser', 'Ein Link von einer Seite zur nächsten', 'Eine per HTTP geladene Bilddatei'],
            answer: 0,
            explanation: 'FTP ist ein eigener Dienst im Internet. Seiten, Links und per HTTP geladene Dateien gehören zum Web.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Hypertext vom CERN',
        text: page(
          'Ende der 1980er-Jahre arbeitete **Tim Berners-Lee** am Forschungszentrum CERN bei Genf. Wissenschaftler wollten Dokumente austauschen, doch das war mühsam: Dateien lagen auf FTP-Servern, und von einem Dokument auf ein anderes zu verweisen, ging kaum.',
          'Berners-Lee schlug 1989 ein System aus **Hypertext** vor: Texte, die über Links miteinander verbunden sind. Ein Buch liest man von vorne nach hinten. Im Hypertext dagegen springt man hin und her. 1990 liefen der erste Webserver und der erste Browser. Übrigens: Das „www.“ vor vielen Adressen stammt aus dieser Zeit, als man Dienste noch am Namen unterschied. Technisch nötig ist es nicht.',
        ),
      },
      {
        type: 'choice',
        question: 'Was ist Hypertext?',
        options: [
          'Text, der über Links mit anderen Texten verbunden ist',
          'Besonders schnell übertragener Text',
          'Text mit Formatierungen wie fett und kursiv',
          'Text, der nur auf einem Server gespeichert ist',
        ],
        answer: 0,
        explanation: 'Hypertext liest man nicht linear wie ein Buch, sondern springt über Links von Dokument zu Dokument.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Hypertext liest man wie ein Buch von vorne nach hinten.',
            answer: false,
            explanation: 'Gerade nicht: Über Links springt man zwischen Texten hin und her.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Die drei Kernstandards',
        text: page(
          'Das Web ruht auf drei Standards, die Berners-Lee von Anfang an mitgedacht hat:',
          '**HTML** (HyperText Markup Language) beschreibt, woraus eine Seite besteht: Überschriften, Absätze, Bilder, Links.',
          '**HTTP** (HyperText Transfer Protocol) regelt, wie ein Client (meistens der Browser) eine Seite bei einem Server anfragt und wie der Server antwortet.',
          '**URI** (Uniform Resource Identifier) gibt jeder Seite und jeder Datei eine eindeutige Adresse. Ohne Adresse könnte man nichts verlinken.',
          'Merksatz: HTML ist der Inhalt, HTTP der Transport, die URI die Adresse.',
        ),
      },
      {
        type: 'order',
        question: 'Ordne zu: erst die Adresse, dann der Transport, dann der Inhalt einer Seite.',
        items: ['URI', 'HTTP', 'HTML'],
        explanation: 'Der Browser braucht zuerst die Adresse (URI), fragt dann per HTTP an und bekommt als Antwort meistens HTML.',
        variants: [
          {
            type: 'choice',
            question: 'Welcher der drei Kernstandards regelt, wie der Browser eine Seite beim Server anfragt?',
            options: ['HTTP', 'HTML', 'URI', 'CSS'],
            answer: 0,
            explanation: 'HTTP ist das Protokoll für Anfrage und Antwort. HTML ist der Inhalt, die URI die Adresse.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Wofür stehen HTML, HTTP und URI, und was macht jeder dieser Standards?',
        answer: 'HTML beschreibt den Inhalt einer Seite, HTTP regelt Anfrage und Antwort zwischen Browser und Server, die URI ist die eindeutige Adresse einer Ressource.',
        variants: [
          {
            type: 'cloze',
            text: 'Merksatz: HTML ist der Inhalt, HTTP der Transport, die ___ die Adresse.',
            options: ['URI', 'DNS', 'IP'],
            answer: 0,
            explanation: 'Die URI gibt jeder Ressource eine eindeutige Adresse. Ohne sie könnte man nichts verlinken.',
          },
        ],
      },
    ],
    recap: [
      'Das Web ist ein Dienst im Internet, nicht dasselbe wie das Internet.',
      'Tim Berners-Lee entwickelte das Web um 1990 am CERN als Hypertext-System.',
      'Kernstandards: HTML (Inhalt), HTTP (Transport), URI (Adresse).',
    ],
  },
  {
    id: 'v2-2',
    title: 'Aufbau einer URI',
    intro: ['Aus welchen Teilen besteht eine Webadresse?', 'Welche Teile darf man weglassen?'],
    steps: [
      {
        type: 'text',
        title: 'Eine Adresse für Maschinen',
        text: page(
          '„Frag den Server der Hochschule auf Port 443 verschlüsselt nach der Startseite“: Das verstehen Menschen, für Programme ist es zu ungenau. Deshalb gibt es ein festes Format: die **URI**. Die bekannte Bezeichnung **URL** meint im Alltag dasselbe. Fachlich korrekt ist heute URI, Fachleute verstehen aber beides.',
          'Eine URI beginnt immer mit dem **Schema**, zum Beispiel `https`. Das Schema legt fest, wie der Rest nach dem Doppelpunkt zu lesen ist. Für uns sind `http` und `https` am wichtigsten. Das „s“ steht für eine verschlüsselte Verbindung.',
          'Hinweis: In den Folien steht „Unified Resource Identifier“, im Standard (RFC 3986) heißt es „Uniform“.',
        ),
      },
      {
        type: 'choice',
        question: 'Was bedeutet das „s“ in `https`?',
        options: ['Die Verbindung ist verschlüsselt', 'Die Seite ist statisch', 'Der Server ist schnell', 'Es ist eine sichere Domain'],
        answer: 0,
        explanation: 'HTTPS ist HTTP über eine verschlüsselte Verbindung. Wer mitliest, sieht nur Datensalat.',
        variants: [
          {
            type: 'binary',
            question: 'Jemand liest die Übertragung einer Seite über `http://` (ohne s) mit. Was sieht er?',
            options: ['Den Inhalt im Klartext', 'Nur Datensalat'],
            answer: 0,
            explanation: 'Ohne s ist nichts verschlüsselt. Erst HTTPS macht die Übertragung für Mitleser unlesbar.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Alle Teile im Überblick',
        text: page(
          'Eine vollständige URI kann so aussehen:',
          code('text', 'https://max@hs-flensburg.de:443/hochschule/personen?lang=de#lehre'),
          '`https` ist das **Schema**. `max@` ist ein optionaler Benutzer. `hs-flensburg.de` ist der **Host**, also der Server. `:443` ist der **Port**. `/hochschule/personen` ist der **Pfad** zur Ressource. `?lang=de` ist die **Query** mit Parametern. `#lehre` ist das **Fragment**, ein bestimmter Teil der Seite.',
          'Benutzer, Query und Fragment sind optional. Den Port lässt man meist weg: Bei HTTPS ist er automatisch 443, bei HTTP 80.',
        ),
      },
      {
        type: 'order',
        question: 'Bring die Teile der URI in die richtige Reihenfolge.',
        items: ['Schema `https://`', 'Host `hs-flensburg.de`', 'Pfad `/hochschule/personen`', 'Query `?lang=de`', 'Fragment `#lehre`'],
        explanation: 'Schema, Host (mit Port), Pfad, Query, Fragment: In dieser Reihenfolge steht es immer.',
        variants: [
          {
            type: 'choice',
            question: 'Was ist in `https://beispiel.de/shop/schuhe?farbe=rot` die Query?',
            options: ['`?farbe=rot`', '`/shop/schuhe`', '`beispiel.de`', '`https`'],
            answer: 0,
            explanation: 'Die Query beginnt mit dem Fragezeichen. Davor stehen Schema, Host und Pfad.',
          },
        ],
      },
      {
        type: 'cloze',
        text: 'Lässt man bei einer `https`-Adresse den Port weg, wird automatisch Port ___ genutzt.',
        options: ['443', '80', '8080'],
        answer: 0,
        explanation: 'HTTPS nutzt standardmäßig Port 443, unverschlüsseltes HTTP Port 80.',
        variants: [
          {
            type: 'choice',
            question: 'Welcher Port wird bei `http://beispiel.de` genutzt, wenn keiner angegeben ist?',
            options: ['80', '443', '8080', '21'],
            answer: 0,
            explanation: 'Unverschlüsseltes HTTP nutzt standardmäßig Port 80, HTTPS Port 443.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Wer legt das fest?',
        text: page(
          'Standards im Internet erscheinen oft als **RFC** („Request for Comments“) bei der IETF. Die URI ist in RFC 3986 beschrieben. Für Standards im Web ist das **W3C** (World Wide Web Consortium) zuständig.',
          'Die Namen der Schemata wie `http`, `https`, `ftp`, `file` oder `mailto` verwaltet die IANA. Ein neues Schema muss dort angemeldet werden. So ist sichergestellt, dass jedes Programm auf der Welt eine URI gleich versteht.',
        ),
      },
      {
        type: 'binary',
        question: 'Du willst auf einen bestimmten Abschnitt einer Seite verlinken. Welcher Teil der URI macht das?',
        options: ['Das Fragment `#abschnitt`', 'Die Query `?abschnitt`'],
        answer: 0,
        explanation: 'Das Fragment nach dem # zeigt auf einen Teil der Seite. Die Query nach dem ? übergibt Parameter an den Server.',
        variants: [
          {
            type: 'choice',
            question: 'Welcher Teil der URI übergibt Parameter wie `lang=de` an den Server?',
            options: ['Die Query nach dem `?`', 'Das Fragment nach dem `#`', 'Der Pfad nach dem `/`', 'Das Schema vor dem `:`'],
            answer: 0,
            explanation: 'Parameter stehen in der Query. Das Fragment zeigt nur auf einen Teil der Seite.',
          },
        ],
      },
    ],
    recap: [
      'Eine URI besteht aus Schema, Host, Port, Pfad, Query und Fragment.',
      'Standard-Ports: 443 für HTTPS, 80 für HTTP. Man lässt sie meist weg.',
      'Fachlich korrekt ist „URI“, „URL“ wird als Alltagswort verstanden.',
    ],
  },
  {
    id: 'v2-3',
    title: 'DNS, das Telefonbuch des Internets',
    intro: ['Wie wird aus einem Namen wie hs-flensburg.de eine IP-Adresse?', 'Welche DNS-Einträge gibt es?'],
    steps: [
      {
        type: 'text',
        title: 'Namen statt Zahlen',
        text: page(
          'Server werden über ihre **IP-Adresse** angesprochen, etwa `193.175.191.141`. Solche Zahlen kann sich niemand merken. Deshalb haben Server **Domainnamen** wie `hs-flensburg.de`.',
          'Das **DNS** (Domain Name System) ist eine Art Telefonbuch: Es ordnet Domainnamen den passenden IP-Adressen zu. Tippst du eine Adresse in den Browser, fragt er zuerst beim DNS nach, welche IP dahintersteckt. Erst dann kann er den Server überhaupt erreichen.',
        ),
      },
      {
        type: 'choice',
        question: 'Wozu dient das DNS?',
        options: [
          'Es übersetzt Domainnamen in IP-Adressen',
          'Es verschlüsselt die Verbindung zum Server',
          'Es speichert die Webseiten',
          'Es zeigt Webseiten im Browser an',
        ],
        answer: 0,
        explanation: 'Das DNS ist das Telefonbuch: Name rein, IP-Adresse raus.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Kennt man die IP-Adresse eines Servers, kann man ihn auch ohne DNS erreichen.',
            answer: true,
            explanation: 'Das DNS liefert nur die Übersetzung vom Namen zur IP-Adresse. Wer die IP schon kennt, braucht diesen Schritt nicht.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Verschiedene Einträge',
        text: page(
          'Im DNS gibt es verschiedene Arten von Einträgen, sogenannte **Records**:',
          '**A**: die IPv4-Adresse des Servers. **AAAA**: dasselbe für IPv6. **MX**: die Mailserver der Domain. **NS**: der zuständige (autoritative) DNS-Server. **CNAME**: ein anderer Name für dieselbe Domain. **TXT**: zusätzliche Texte, etwa Regeln gegen gefälschte E-Mails.',
          'Mit dem Werkzeug `nslookup` kannst du das selbst abfragen. Nach dem Start stellst du mit `set q=MX` den gewünschten Typ ein und gibst dann den Domainnamen ein. Genau das war Aufgabe 1 in Labor 1.',
        ),
      },
      {
        type: 'binary',
        question: 'Du willst wissen, welcher Server die E-Mails einer Domain annimmt. Welchen Record fragst du ab?',
        options: ['MX', 'A'],
        answer: 0,
        explanation: 'MX steht für „Mail Exchange“ und nennt die Mailserver. Der A-Record nennt die IPv4-Adresse des Webservers.',
        variants: [
          {
            type: 'choice',
            question: 'Welcher Record enthält die IPv6-Adresse eines Servers?',
            options: ['AAAA', 'A', 'MX', 'CNAME'],
            answer: 0,
            explanation: 'A steht für IPv4, AAAA für das längere IPv6.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Eine Kette von Servern',
        text: page(
          'Das DNS ist **hierarchisch** aufgebaut. Ganz oben stehen die **Root-Server**. Sie kennen die Server der Top-Level-Domains wie `.de`. Diese wiederum kennen die **autoritativen DNS-Server**, die für eine bestimmte Domain zuständig sind.',
          'Fragt dein Rechner nach `hs-flensburg.de`, läuft die Anfrage über einen **Resolver**: Er fragt einen Root-Server nach dem Server für `.de`, diesen nach dem Server für `hs-flensburg.de`, und der nennt schließlich die IP. Damit das nicht jedes Mal passiert, speichern DNS-Server Antworten eine Zeit lang zwischen (**Caching**).',
        ),
      },
      {
        type: 'order',
        question: 'In welcher Reihenfolge fragt der Resolver bei einer neuen Domain nach?',
        items: ['Root-Server', 'Server der Top-Level-Domain (.de)', 'Autoritativer DNS-Server der Domain'],
        explanation: 'Von oben nach unten: Root kennt .de, .de kennt den zuständigen Server, der kennt die IP.',
        variants: [
          {
            type: 'choice',
            question: 'Warum muss nicht jede DNS-Anfrage bis zu einem Root-Server hinauf?',
            options: [
              'DNS-Server speichern Antworten eine Zeit lang zwischen',
              'Der Browser kennt alle IP-Adressen auswendig',
              'Root-Server werden nur einmal im Jahr gefragt',
              'Jede Domain enthält ihre IP-Adresse im Namen',
            ],
            answer: 0,
            explanation: 'Dank Caching kennen Resolver häufige Antworten schon und müssen die Kette nicht jedes Mal neu durchlaufen.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was ist ein A-Record und was ein NS-Record?',
        answer: 'Ein A-Record enthält die IPv4-Adresse eines Servers. Ein NS-Record nennt den autoritativen DNS-Server, der für die Domain zuständig ist.',
        variants: [
          {
            type: 'binary',
            question: 'Ein Eintrag sagt: `www.beispiel.de` ist ein anderer Name für `beispiel.de`. Welcher Record ist das?',
            options: ['CNAME', 'NS'],
            answer: 0,
            explanation: 'CNAME ist ein Alias, also ein anderer Name. NS nennt den zuständigen DNS-Server.',
          },
        ],
      },
    ],
    recap: [
      'DNS übersetzt Domainnamen in IP-Adressen.',
      'Wichtige Records: A (IPv4), AAAA (IPv6), MX (Mail), NS (zuständiger DNS-Server), CNAME (Alias).',
      'Die Abfrage läuft von Root-Server über TLD-Server zum autoritativen Server; Antworten werden zwischengespeichert.',
    ],
  },
  {
    id: 'v2-4',
    title: 'HTTP: Anfrage und Antwort',
    intro: ['Was passiert, wenn du eine Webseite aufrufst?', 'Wie ist eine HTTP-Antwort aufgebaut?'],
    steps: [
      {
        type: 'text',
        title: 'Client fragt, Server antwortet',
        text: page(
          'Das Web folgt dem **Client-Server-Modell**: Der Client (meistens dein Browser) stellt eine Anfrage (**Request**), der Server schickt eine Antwort (**Response**). Die Regeln dafür legt **HTTP** fest.',
          'Ruft du eine Seite auf, passiert Folgendes: Der Browser holt sich per DNS die IP des Servers. Dann schickt er eine HTTP-Anfrage. Gibt es die Seite, antwortet der Server mit „200 OK“ und schickt die Daten in kleinen Paketen. Der Browser setzt sie zusammen und zeigt die Seite an. Den eigentlichen Transport der Pakete übernehmen die Protokolle **TCP/IP**.',
        ),
      },
      {
        type: 'order',
        question: 'Was passiert beim Aufruf einer Webseite? Bring die Schritte in die richtige Reihenfolge.',
        items: [
          'Browser fragt per DNS nach der IP-Adresse',
          'Browser schickt eine HTTP-Anfrage an den Server',
          'Server antwortet mit „200 OK“ und den Daten',
          'Browser setzt die Pakete zusammen und zeigt die Seite',
        ],
        explanation: 'Erst die Adresse auflösen, dann anfragen, dann antworten, dann anzeigen.',
        variants: [
          {
            type: 'choice',
            question: 'Welche Protokolle übernehmen beim Seitenaufruf den eigentlichen Transport der Datenpakete?',
            options: ['TCP/IP', 'HTML', 'DNS', 'CSS'],
            answer: 0,
            explanation: 'HTTP legt fest, was gefragt und geantwortet wird; TCP/IP sorgt dafür, dass die Pakete ankommen.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Eine Anfrage ist einfacher Text',
        text: page(
          'HTTP ist ein **textbasiertes** Protokoll. Eine Anfrage nach der Startseite sieht so aus:',
          code('http', 'GET / HTTP/1.1', 'Host: hs-flensburg.de'),
          '`GET` ist das Kommando, `/` der Pfad, `HTTP/1.1` die Version. Die Zeile `Host` nennt die Domain. Das ist wichtig, wenn ein Server mehrere Domains bedient. Eine Leerzeile schickt die Anfrage ab.',
          'Außerdem ist HTTP **zustandslos**: Nach der Antwort hat der Server die Anfrage vergessen. Jede neue Anfrage beginnt bei null.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Ein HTTP-Server merkt sich von selbst, welche Seiten ein Browser vorher abgerufen hat.',
        answer: false,
        explanation: 'HTTP ist zustandslos: Jede Anfrage steht für sich. Damit der Server einen Browser wiedererkennt, braucht es zum Beispiel Cookies.',
        variants: [
          {
            type: 'binary',
            question: 'Du rufst zwei Seiten desselben Shops nacheinander auf. Woran erkennt der Server, dass beide Anfragen von dir kommen?',
            options: ['An einem Cookie, das dein Browser mitschickt', 'HTTP merkt sich das von selbst'],
            answer: 0,
            explanation: 'HTTP ist zustandslos. Erst das mitgeschickte Cookie verbindet die Anfragen.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Kopf und Rumpf der Antwort',
        text: page(
          'Eine HTTP-Antwort hat zwei Teile, getrennt durch eine Leerzeile:',
          code('http', 'HTTP/1.1 200 OK', 'Content-Type: text/html', '', '<!DOCTYPE html>', '<html>…</html>'),
          'Der **Kopf** (Head, auch Header) enthält Metadaten: den **Statuscode**, das Format des Inhalts, seine Länge, Cookies. Der **Rumpf** (Body) enthält die eigentlichen Daten, etwa HTML, Text oder JSON.',
          'Wichtige Statuscodes: **200** OK, **201** erstellt, **204** kein Inhalt, **301** dauerhaft umgezogen, **400** fehlerhafte Anfrage, **403** verboten, **404** nicht gefunden, **500** Fehler im Server.',
        ),
      },
      {
        type: 'choice',
        question: 'Du rufst eine Seite auf, die es nicht gibt. Welchen Statuscode bekommst du?',
        options: ['404', '200', '500', '301'],
        answer: 0,
        explanation: '404 heißt „Not Found“. 500 wäre ein Fehler im Server selbst, 301 eine Umleitung.',
        variants: [
          {
            type: 'choice',
            question: 'Im Programm auf dem Server tritt ein Fehler auf. Welchen Statuscode schickt er?',
            options: ['500', '404', '403', '200'],
            answer: 0,
            explanation: '5xx heißt: Fehler beim Server. 404 wäre „nicht gefunden“, 403 „verboten“.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was bedeutet „HTTP ist zustandslos“?',
        answer: 'Der Server merkt sich nach einer Antwort nichts über den Client. Jede Anfrage wird für sich behandelt; Wiedererkennung braucht z. B. Cookies.',
        variants: [
          {
            type: 'choice',
            question: 'Was steht im Rumpf (Body) einer HTTP-Antwort?',
            options: ['Die eigentlichen Daten, z. B. das HTML', 'Der Statuscode', 'Die Cookies', 'Die IP-Adresse des Servers'],
            answer: 0,
            explanation: 'Statuscode, Format und Cookies stehen im Kopf. Der Rumpf nach der Leerzeile enthält die Daten.',
          },
        ],
      },
    ],
    recap: [
      'Der Browser (Client) schickt eine Anfrage, der Server eine Antwort. Das regelt HTTP.',
      'Eine Antwort hat einen Kopf (Statuscode, Metadaten) und einen Rumpf (die Daten).',
      'HTTP ist textbasiert und zustandslos.',
    ],
  },
  {
    id: 'v2-5',
    title: 'HTTP-Methoden und Cookies',
    intro: ['Welche Kommandos kennt HTTP außer GET?', 'Wie erkennt ein Server einen Browser wieder?'],
    steps: [
      {
        type: 'text',
        title: 'Lesen, anlegen, ändern, löschen',
        text: page(
          'Das einfachste Kommando ist **GET**: Es fordert eine Ressource an. Will der Client Daten zum Server schicken, etwa aus einem Formular, nutzt er meist **POST**. Damit entsteht in der Regel etwas Neues auf dem Server.',
          '**PUT** speichert eine Ressource unter einer Adresse. PUT ist **idempotent**: Schickt man dieselbe Anfrage zweimal, ändert sich danach nichts mehr. **PATCH** ändert nur einen Teil einer Ressource. **DELETE** löscht sie. Alle ändernden Kommandos funktionieren natürlich nur, wenn der Client das darf.',
          'Dazu kommen **HEAD** (nur der Kopf der Antwort, ohne Inhalt) und **OPTIONS** (welche Kommandos erlaubt der Server?).',
        ),
      },
      {
        type: 'choice',
        question: 'Du schickst ein Kontaktformular ab. Welche HTTP-Methode wird dafür typischerweise genutzt?',
        options: ['POST', 'GET', 'DELETE', 'HEAD'],
        answer: 0,
        explanation: 'POST überträgt Daten an den Server, zum Beispiel Formulareingaben.',
        variants: [
          {
            type: 'choice',
            question: 'Mit welcher Methode bittet ein Client den Server, eine Ressource zu löschen?',
            options: ['DELETE', 'POST', 'GET', 'HEAD'],
            answer: 0,
            explanation: 'DELETE löscht, sofern der Client das darf. GET liest, POST schickt Daten, HEAD holt nur den Kopf.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Cookies',
        text: page(
          'Weil HTTP zustandslos ist, braucht es einen Trick, um einen Browser wiederzuerkennen: **Cookies**. Der Server schickt im Kopf seiner Antwort ein Cookie mit. Der Browser speichert es und schickt es bei jeder weiteren Anfrage an diesen Server automatisch zurück.',
          'Der Browser muss nicht wissen, was im Cookie steht. Oft ist es nur eine ID, zu der der Server in seiner Datenbank Dinge speichert, zum Beispiel, dass du eingeloggt bist. So entsteht eine **Session**.',
        ),
      },
      {
        type: 'truefalse',
        statement: 'Cookies werden vom Browser bei jeder weiteren Anfrage an denselben Server mitgeschickt.',
        answer: true,
        explanation: 'Genau dadurch kann der Server den Browser wiedererkennen, obwohl HTTP selbst zustandslos ist.',
        variants: [
          {
            type: 'choice',
            question: 'Was steht in einem Session-Cookie oft nur drin?',
            options: [
              'Eine ID, zu der der Server Daten in seiner Datenbank speichert',
              'Dein Passwort im Klartext',
              'Die ganze zuletzt besuchte Seite',
              'Die IP-Adresse des Servers',
            ],
            answer: 0,
            explanation: 'Der Browser muss den Inhalt nicht verstehen. Die ID genügt, damit der Server weiß, wer du bist und z. B. dass du eingeloggt bist.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Selbst hineinschauen',
        text: page(
          'Mit dem Kommandozeilenwerkzeug **curl** kannst du HTTP-Anfragen von Hand schicken:',
          code('bash', 'curl -i -X GET https://hs-flensburg.de'),
          '`-X GET` wählt das Kommando, `-i` zeigt zusätzlich den Kopf der Antwort mit Statuscode und Cookies.',
          'Noch bequemer sind die **Entwicklerwerkzeuge** im Browser: Rechtsklick auf die Seite, „Untersuchen“, dann der Reiter **Netzwerk**. Dort siehst du jede einzelne Anfrage. Meistens sind es viele, denn Bilder, CSS-Dateien, Schriften und Skripte werden jeweils extra geladen.',
        ),
      },
      {
        type: 'binary',
        question: 'Du willst bei `curl` auch den Statuscode und die Header sehen. Welche Option brauchst du?',
        options: ['`-i`', '`-X`'],
        answer: 0,
        explanation: '`-i` gibt den Kopf der Antwort mit aus. `-X` wählt nur die Methode, zum Beispiel GET.',
        variants: [
          {
            type: 'choice',
            question: 'Was bewirkt `-X GET` in `curl -i -X GET https://hs-flensburg.de`?',
            options: ['Es wählt die HTTP-Methode GET', 'Es zeigt die Header an', 'Es speichert die Seite als Datei', 'Es folgt Umleitungen'],
            answer: 0,
            explanation: '-X legt die Methode fest. Die Header zeigt -i, Umleitungen folgt curl erst mit -L.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Warum siehst du im Netzwerk-Reiter der Entwicklerwerkzeuge beim Aufruf einer einzigen Seite viele Anfragen?',
        answer: 'Die HTML-Seite verweist auf weitere Dateien wie CSS, Bilder, Schriften und Skripte. Der Browser lädt jede davon mit einer eigenen Anfrage.',
        variants: [
          {
            type: 'truefalse',
            statement: 'Bilder und CSS-Dateien einer Seite kommen in derselben HTTP-Antwort wie das HTML.',
            answer: false,
            explanation: 'Jede Datei wird mit einer eigenen Anfrage geladen. Deshalb stehen im Netzwerk-Reiter so viele Einträge.',
          },
        ],
      },
    ],
    recap: [
      'GET liest, POST schickt Daten, PUT speichert, PATCH ändert teilweise, DELETE löscht.',
      'Cookies speichert der Browser und schickt sie bei jeder Anfrage mit. So entstehen Sessions.',
      'Mit curl -i und dem Netzwerk-Reiter der Entwicklerwerkzeuge siehst du HTTP live.',
    ],
  },
  {
    id: 'w-browser',
    title: 'Vom Code zur Seite',
    intro: ['Was macht der Browser mit dem Code, den er bekommt?', 'Welche Aufgabe haben HTML, CSS und JavaScript?'],
    steps: [
      {
        type: 'text',
        title: 'Code ist einfacher Text',
        text: page(
          'Eine Webseite besteht aus gewöhnlichen **Textdateien**: HTML, CSS und JavaScript. Du kannst sie mit jedem Editor öffnen. Der Server schickt sie per HTTP an den Browser, zuerst die HTML-Datei.',
          'Beim Lesen stößt der Browser auf Verweise wie `<link href="style.css">`, `<img src="foto.png">` oder `<script src="app.js">` und lädt jede dieser Dateien mit einer eigenen Anfrage nach.',
          'Liegen die Dateien fertig auf dem Server und sind für alle gleich, spricht man von einer **statischen** Seite. Genau das baust du in Webdesign. Erzeugt der Server die Seite bei jeder Anfrage neu, etwa aus einer Datenbank, ist sie **dynamisch** (Backend). Ändert JavaScript die Seite erst im Browser, ist das dynamisch im Frontend.',
        ),
      },
      {
        type: 'binary',
        question: 'Deine Labor-Seite besteht aus fertigen HTML- und CSS-Dateien, die für jeden Besucher gleich sind. Was ist sie?',
        options: ['Eine statische Seite', 'Eine dynamische Seite'],
        answer: 0,
        explanation: 'Statisch heißt: Die Dateien liegen fertig auf dem Server und werden unverändert ausgeliefert.',
        variants: [
          {
            type: 'binary',
            question: 'Ein Onlineshop erzeugt jede Seite beim Aufruf auf dem Server neu aus seiner Datenbank. Was ist sie?',
            options: ['Eine dynamische Seite', 'Eine statische Seite'],
            answer: 0,
            explanation: 'Wird die Seite bei jeder Anfrage neu erzeugt, ist sie dynamisch. Das passiert im Backend.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Aus Text wird ein Baum',
        text: page(
          'Der Browser liest das HTML Zeichen für Zeichen und baut daraus einen Baum im Speicher: das **DOM** (Document Object Model). Jedes Element wird ein Knoten mit Eltern, Kindern und Geschwistern, genau der Baum, den du aus HTML kennst.',
          'Dabei ist der Browser sehr **fehlertolerant**: Steht eine Überschrift im head oder fehlt ein schließender Tag, repariert er das stillschweigend. Darum sieht fehlerhafter Code oft trotzdem richtig aus.',
          'Danach geht es in Schritten weiter: Der Browser ordnet jedem Knoten die passenden **CSS-Regeln** zu, berechnet Größe und Position jedes Elements (**Layout**) und malt schließlich die Pixel auf den Bildschirm (**Paint**).',
        ),
      },
      {
        type: 'order',
        question: 'Wie wird aus Code eine sichtbare Seite? Bring die Schritte des Browsers in die richtige Reihenfolge.',
        items: [
          'HTML-Datei per HTTP laden',
          'HTML lesen und den DOM-Baum bauen',
          'CSS-Regeln den Elementen zuordnen',
          'Größe und Position berechnen (Layout)',
          'Pixel auf den Bildschirm malen (Paint)',
        ],
        explanation: 'Erst laden, dann den Baum bauen, dann die Styles zuordnen, dann das Layout berechnen und zuletzt malen.',
        variants: [
          {
            type: 'choice',
            question: 'Was berechnet der Browser im Schritt **Layout**?',
            options: ['Größe und Position jedes Elements', 'Die Farbe jedes Pixels', 'Den DOM-Baum aus dem HTML', 'Welche Dateien er nachladen muss'],
            answer: 0,
            explanation: 'Layout heißt: Wo steht was, wie groß ist es? Die Pixel malt erst der nächste Schritt, Paint.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Drei Sprachen, drei Aufgaben',
        text: page(
          '**HTML** legt die Struktur fest: Was steht auf der Seite, und welche Rolle hat es? **CSS** legt das Aussehen fest: Farben, Schriften, Abstände, Layout. **JavaScript** legt das Verhalten fest: Was passiert bei einem Klick, beim Tippen, beim Laden neuer Daten?',
          'Genau genommen sind HTML und CSS keine Programmiersprachen: HTML ist eine Auszeichnungssprache, CSS eine Stylesheet-Sprache. Mit ihnen beschreibst du, *was* da sein und *wie* es aussehen soll. Erst JavaScript kennt Variablen, Bedingungen und Schleifen. Damit beschreibst du, was Schritt für Schritt *passieren* soll. JavaScript kann den DOM-Baum lesen und verändern, also die Seite ändern, während sie schon angezeigt wird.',
          code('html', '<button onclick="alert(\'Hallo!\')">Klick mich</button>'),
        ),
      },
      {
        type: 'choice',
        question: 'Auf deiner Seite soll beim Klick auf einen Knopf ein Menü aufgehen. Welche Sprache ist dafür üblicherweise zuständig?',
        options: ['JavaScript', 'HTML', 'CSS', 'HTTP'],
        answer: 0,
        explanation: 'Verhalten bei Klicks ist die Aufgabe von JavaScript. (Für einfache Fälle gibt es auch reine CSS-Tricks, etwa mit einer versteckten Checkbox.)',
        variants: [
          {
            type: 'choice',
            question: 'Welche Sprache legt fest, in welcher Farbe und Schrift eine Überschrift erscheint?',
            options: ['CSS', 'HTML', 'JavaScript', 'HTTP'],
            answer: 0,
            explanation: 'Aussehen ist Sache von CSS. HTML sagt nur, dass es eine Überschrift ist.',
          },
        ],
      },
      {
        type: 'truefalse',
        statement: 'HTML ist im engeren Sinn eine Programmiersprache.',
        answer: false,
        explanation: 'HTML ist eine Auszeichnungssprache: Es beschreibt Struktur, kennt aber keine Variablen, Bedingungen oder Schleifen. Das kann erst JavaScript.',
        variants: [
          {
            type: 'choice',
            question: 'Welche der drei Sprachen kennt Variablen, Bedingungen und Schleifen?',
            options: ['JavaScript', 'HTML', 'CSS', 'Alle drei'],
            answer: 0,
            explanation: 'HTML (Auszeichnung) und CSS (Stylesheets) beschreiben nur. Schritt-für-Schritt-Abläufe kann erst JavaScript.',
          },
        ],
      },
      {
        type: 'recall',
        question: 'Was ist das DOM?',
        answer: 'Der Baum aus Knoten, den der Browser aus dem HTML im Speicher aufbaut. CSS wird darauf angewendet, und JavaScript kann ihn lesen und verändern.',
        variants: [
          {
            type: 'truefalse',
            statement: 'JavaScript kann den DOM-Baum verändern, während die Seite schon angezeigt wird.',
            answer: true,
            explanation: 'Genau so entstehen z. B. aufklappende Menüs: JavaScript ändert den DOM, der Browser zeichnet neu.',
          },
        ],
      },
    ],
    recap: [
      'Webseiten sind Textdateien; der Browser lädt erst das HTML und dann alles, worauf es verweist.',
      'Aus dem HTML baut der Browser den DOM-Baum, ordnet CSS zu, berechnet das Layout und malt.',
      'HTML = Struktur, CSS = Aussehen, JavaScript = Verhalten.',
    ],
  },
]

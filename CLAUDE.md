# ΤΟΠΟΣ (Topos, früher Locus und Leenli) – Hinweise für Claude

Claude Code liest diese Datei zu Beginn jeder Sitzung automatisch. Die beiden folgenden Dateien werden damit ebenfalls geladen:

@PLAN.md
@FORTSCHRITT.md

## Arbeitsweise
- Der Nutzer ist Anfänger und arbeitet unter Windows mit VS Code und PowerShell. Terminal-Befehle kurz erklären und in PowerShell-Schreibweise angeben.
- Antworten und gesamte App-Oberfläche auf Deutsch.
- In Phasen arbeiten und nach jeder Phase anhalten: sagen, was getestet werden soll, und einen Commit vorschlagen (`git add`, `commit`, `push`). Der Nutzer committet selbst.
- Vor größeren Umbauten nachfragen.
- Nach jeder Phase **FORTSCHRITT.md aktualisieren**: Erledigtes, Entscheidungen, nächste Schritte.
- Vor dem Abschluss einer Phase prüfen: `npm run build` (enthält die Typprüfung) und `npm test` (Speed-Reader, Import, Wiederholung, Sitzung, Karte, Beherrschung, Sicherung, Suche, Code-Darstellung, eingebaute Kurse).
- **Neue Webdesign-Kacheln** (z. B. aus `C:\Users\PCUser\Webdesign\labor-XX\topos-notizen.md`): in [src/content/webdesign/](src/content/webdesign/) ergänzen (Labore in `labore.ts`, ID `l<Labor>-<n>`), in `WEBDESIGN_ORDER` in `index.ts` eintragen, eigene Worte statt Folientext, keine persönlichen Daten. Jede Frage bekommt eine Variante (`variants`) mit anderem Beispiel oder aus anderer Richtung. Bestehende Kurs-/Kachel-IDs und Fragetexte nie ändern – Varianten dürfen jederzeit ergänzt werden. `npm test` prüft die eingebauten Kurse.
- **Schreibstil in allen Kursen** (Wunsch des Nutzers, 18.11.2026): keine Gedankenstriche (– oder —), stattdessen kurze Sätze mit Punkt, Komma, Doppelpunkt oder Klammern; Bereiche mit „bis“. Keine Verweise wie „laut Vorlesung“, „die Vorlesung zeigt“, „in der Übung“, „laut Übersicht“: den Inhalt direkt hinschreiben. Ein Hinweis auf die Quelle nur, wenn er fachlich wichtig ist (z. B. Folie weicht vom Standard ab). Ein Test prüft das für die eingebauten Kurse.
- Achtung beim Schreiben von Dateien: Escape-Folgen wie `\u00a0` im Code wurden beim Speichern zu unsichtbaren Zeichen. Danach mit `grep -F '\u'` prüfen oder die Zeichen per Node-Skript (`String.fromCharCode`) einsetzen.

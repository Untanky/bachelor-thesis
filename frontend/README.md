# Web-Frontend

Das Web-Frontend kann auch die Backend-Server zu greifen.

## Testen der Anwendung

Zum Testen der Anwendung muss lediglich `yarn test` ausgeführt werden.

## Starten ohne Docker

Es wird eine Node.js Installation benötigt.

0. Anpassen der Konfiguration:
  * In `./src/service.conf.json` die Ports auf die Ports der jeweiligen Anwendung ändern.
1. Terminal in diesem Ordner (`~/frontend`) öffenen.
2. `yarn install` ausführen. Dies installiert die Abhängigkeiten.
3. `yarn start` ausführen. Dies startet einen Development-Server mit der Web-Anwendung.
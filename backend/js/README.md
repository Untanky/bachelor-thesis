# JavaScript Implementierungen

Dieser Ordner enthält die JavaScript Implementierungen.

## Starten ohne Docker

Es werden Node und Yarn benötigt.

### Express 

1. Terminal im Express-Ordner öffnen (`./express`).
2. `yarn install`
3. In der Datei `./dao/src/config/sequelize` Zeile 3: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
4. `yarn start` (Startet das REST-Anwendung auf Port `8080`)

### Restify 

1. Terminal im Restify-Ordner öffnen (`./restify`).
2. `yarn install`
3. In der Datei `./dao/src/config/sequelize` Zeile 3: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
4. `yarn start` (Startet das REST-Anwendung auf Port `8080`)

## Unit-Tests

Es werden Node und Yarn benötigt.

### DAO 

1. Terminal im DAO-Ordner öffnen (`./dao`).
2. `yarn install`
3. `yarn test`

### Express 

0. Terminal im Express-Ordner öffnen (`./express`).
2. `yarn install`
3. `yarn test`

### Restify 

0. Terminal im Restify-Ordner öffnen (`./restify`).
2. `yarn install`
3. `yarn test`
# Webschnittstellen - Vergleich von verschiedenen Programmiersprachen und Frameworks zur Erstellung von REST-Schnittstellen 

_Bachelorarbeit von [Lukas Grimm](https://lukasgrimm.me) an der [Hochschule für Technik und Wirtschaft in Berlin](https://www.htw-berlin.de)

### Web Services - Comparison of different programming languages and frameworks with focus on creating REST interfaces

_Bachelor Thesis by [Lukas Grimm](https://lukasgrimm.me) at the [University of Applied Sciences Berlin](https://www.htw-berlin.de)_

English Version -> [README_EN.md](/README_EN.md)

## Dateistruktur

Das Basis-Verzeichnis (in diesem befindet sich diese `README`) ist der Projektursprung.

Im Rahmen der Arbeit wurde ein Frontend entwickelt, welches die Schnittstellen anspricht. Dieses kann im Verzeichnis `frontend` gefunden werden.

Die entwickelten Schnittstellen befinden sich im Verzeichnis `backend`.

Informationen und Daten die zu Datenbanken gehören, sind dem Verzeichnis `database` zu entnehmen.

Die Systemtest könnnen `tests` gefunden werden.

In jedem dieser Verzeichnisse befindet sich eine `README`, die genauere Informationen zum Inhalt der Verzeichnisse gibt.

```
.
├── LICENSE
├── README.md
├── README_EN.md
├── docker-compose.yaml
├── service.conf.json
├── swagger.yaml
├── backend
│   ├── README.md
│   ├── README_EN.md
│   ├── csharp
│   │   ├── README.md
│   │   ├── README_EN.md
│   │   ├── dao
│   │   ├── dao.Tests
│   │   ├── asp-net
│   │   └── asp-net.Tests
│   ├── java   
│   │   ├── README.md
│   │   ├── README_EN.md
│   │   ├── bachelor.iml
│   │   ├── pom.xml
│   │   ├── jaxrs
│   │   ├── spring
│   │   ├── src // DAO
│   │   └── target // DAO Output
│   ├── js
│   │   ├── README.md
│   │   ├── README_EN.md
│   │   ├── dao
│   │   ├── express
│   │   └── restify
│   ├── php
│   │   ├── README.md
│   │   ├── README_EN.md
│   │   ├── code-igniter
│   │   ├── dao
│   │   └── laravel
│   └── python
│       ├── README.md
│       ├── README_EN.md
│       ├── dao
│       ├── django
│       └── flask
├── database
│   ├── README.md
│   ├── README_EN.md
│   └── scripts
├── frontend
│   ├── README.md
│   ├── README_EN.md
│   ├── package.json
│   ├── public
│   ├── src
│   └── yarn.lock
└── tests
    ├── README.md
    ├── README_EN.md
    ├── benchmark_all.sh
    ├── docker-compose.yaml
    ├── response.txt
    ├── system_test_all.sh
    ├── benchmark
    ├── common
    ├── data
    ├── database
    ├── results
    └── system
```


## Deployment

Diese Verzeichnis enthält eine [`docker-compose.yaml`](/docker-compose.yaml), die dazu genutzt werden kann, alle Komponenten zu kompilieren und zu starten. Mit `docker-compose up -d` werden alle Container gestartet.

Wenn das System ohne Docker gestartet werden soll, müssen Konfigurationen in den Orderner angepasst werden.


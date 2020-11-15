# Java Implementierungen

Dieser Ordner enthält die Java Implementierungen.

## Starten ohne Docker

Es werden JDK und Maven benötigt.

### Spring 

1. Terminal im Java-Ordner öffnen (`./`).
2. `mvn clean install` (DAO lokal installieren)
3. `cd spring`
4. In der Datei `./spring/src/main/resources/META-INF/persistence.xml` Zeilen 11-13: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
5. `mvn clean package`
6. `java --jar ./string/target/spring-blog-0.1.0.jar` (Startet das REST-Anwendung auf Port `8080`)

### Jersey

1. Tomcat installieren
2. Terminal im Java-Ordner öffnen (`./`).
3. `mvn clean install` (DAO lokal installieren)
4. `cd jaxrs`
5. In der Datei `./jaxrs/src/main/resources/META-INF/persistence.xml` Zeilen 11-13: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
6. `mvn clean package`
7. `./jaxrs/target/jaxrs.blog-0.1.0` in webapp-Ordner einer Tomcat Anwendung kopieren.

## Unit-Tests

Es werden Python 3 und PiP benötigt.

### DAO 

0. Terminal im Java-Ordner öffnen (`.`).
1. `mvn clean test`

### Spring 

0. Terminal im Spring-Ordner öffnen (`./spring`).
1. `mvn clean test`

### Jersey 

0. Terminal im Jersey-Ordner öffnen (`./jaxrs`).
1. `mvn clean test`
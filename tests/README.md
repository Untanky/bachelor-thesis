# System-Tests

Dieser Ordner beinhaltet die System tests.

## System-Test

Die System-Tests können durch folgendes Skript gestartet werden: `./system_test_all.sh`. Das Ergebnis kann im Terminal Fenster erkannt werden.

## Benchmark-Test

Benchmark-Test können durch folgendes Skript gestartet werden: `./benchmark_test_all.sh`. Die Ergebnisse lassen sich in folgendem Ordner finden: `./results`. Dies sind unverarbeitete `.csv` Dateien mit den Messwerten.

Die Anzahl der Messwerte kann in der Datei mit den Variablen `warmup` and `repitions` verändert werden. Die ersten `warmup` Ausführungen werden nicht gemessen.

## Starting without Docker

Es ist unmöglich die Systemtests ohne Docker zu startet. Der Speicherverbrauch wird durch Docker-Werkzeuge erstellt. Außerdem werden die Anwendungen durch Docker auf eine einheitliche Weise gestartet.

Es würde große Umschreibungen des Code benötigen, die Test ohne Docker startbar zu machen.

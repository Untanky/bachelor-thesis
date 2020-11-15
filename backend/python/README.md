# Python Implementierungen

Dieser Ordner enthält die Python Implementierungen.

## Starten ohne Docker

Es werden Python 3 und PiP benötigt.

### Django 

0. Terminal im Django-Ordner öffnen (`./django`).
1. (optional) Virtuelle Python Umgebung erzeugen.
   1. `python3 -m venv env` (Umgebung erzeugen)
   2. `source env/bin/activate` (Umgebung aktivieren)
2. `pip install requirements.txt`
3. In der Datei `./django/rest/blog/views.py` Zeile 8: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
4. `python manage.py runserver 0.0.0.0:8000` (Startet das REST-Anwendung auf Port `8000`)

### Flask 

0. Terminal im Flask-Ordner öffnen (`./flask_app`).
1. (optional) Virtuelle Python Umgebung erzeugen.
   1. `python3 -m venv env` (Umgebung erzeugen)
   2. `source env/bin/activate` (Umgebung aktivieren)
2. `pip install requirements.txt`
3. In der Datei `./flask_app/app.py` Zeile 15: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
4. `python app.py` (Startet das REST-Anwendung auf Port `5000`)

## Unit-Tests

Es werden Python 3 und PiP benötigt.

### DAO 

0. Terminal im DAO-Ordner öffnen (`./dao`).
1. (optional) Virtuelle Python Umgebung erzeugen.
   1. `python3 -m venv env` (Umgebung erzeugen)
   2. `source env/bin/activate` (Umgebung aktivieren)
2. `pip install SQLAlchemy test/TestPostDAO`
3. `pytest tests/TestPostDAO.py`

### Django 

0. Terminal im Django-Ordner öffnen (`./django`).
1. (optional) Virtuelle Python Umgebung erzeugen.
   1. `python3 -m venv env` (Umgebung erzeugen)
   2. `source env/bin/activate` (Umgebung aktivieren)
2. `pip install requirements`
3. `python manage.py test`

### Flask 

0. Terminal im Flask-Ordner öffnen (`./flask_app`).
1. (optional) Virtuelle Python Umgebung erzeugen.
   1. `python3 -m venv env` (Umgebung erzeugen)
   2. `source env/bin/activate` (Umgebung aktivieren)
2. `pip install requirements`
3. `pytest test_controller.py`
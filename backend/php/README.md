# PHP Implementierungen

Dieser Ordner enthält die PHP Implementierungen.

## Starten ohne Docker

Es werden PHP 7 und Composer benötigt.

### Laravel 

1. Terminal im Laravel-Ordner öffnen (`./laravel`).
2. `composer install`
3. In der Datei `./laravel/app/Providers/AppServiceProvider` Zeile 26: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
4. `php artisan.php serve --host 0.0.0.0` (Startet das REST-Anwendung auf Port `8000`)

### CodeIgniter 

1. Terminal im Django-Ordner öffnen (`./code-igniter`).
2. `composer install`
3. In der Datei `./code-igniter/app/Config/Services.py` Zeile 32: Datenbank-URL durch aktualisierte Datenbank-URL ersetzten, z.B. `postgres://<user>:<passwd>@localhost:5432/blog`.
4. `php artisan.php spark --host 0.0.0.0` (Startet das REST-Anwendung auf Port `8080`)

## Unit-Tests

Es werden PHP 7 und Composer benötigt.

### DAO 

1. Terminal im Django-Ordner öffnen (`./dao`).
2. `composer install`
3. `php vendor/bin/codecept run`

### Laravel

1. Terminal im Django-Ordner öffnen (`./laravel`).
2. `composer install`
3. `php vendor/bin/codecept run`

### CodeIgniter

1. Terminal im Django-Ordner öffnen (`./code-igniter`).
2. `composer install`
3. `php vendor/bin/codecept run`
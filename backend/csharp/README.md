# C# Implementierungen

Dieser Ordner enthält die C# Implementierungen.

## Starten ohne Docker

Es wird dotnet benötigt.

### ASP.NET

1. Terminal im ASP.NET-Ordner öffnen (`./asp-net`).
2. `dotnet restore `
3. In der Datei `./asp-net/PostContext` Zeile 8: Datenbank-Informationen durch aktualisierte Datenbank-Informationen ersetzten, z.B. `Host=localhost;Database=blog;Username=<user>;Password=<passwd>`.
4. `dotnet run asp-net` (Startet das REST-Anwendung auf Port `5000`)

## Unit-Tests

Es werden Python 3 und PiP benötigt.

### DAO 

1. Terminal im C#-Ordner öffnen (`.`).
2. `dotnet restore dao`
3. `dotnet test dao.Tests`

### Django 

1. Terminal im C#-Ordner öffnen (`,`).
2. `dotnet restore asp-net`
3. `dotnet test asp-net.Tests`
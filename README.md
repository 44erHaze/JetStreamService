# JetstreamService

Ein modernes Webservice-Tool zur Verwaltung von Serviceaufträgen.

## 📋 Anforderungen

- **.NET SDK 7.0 oder höher**
- **Node.js** und **npm** (für das Frontend)
- **SQL Server** (für die Datenbank)
- **Postman** (für API-Tests, optional)

## 🚀 Installation und Setup

### 1. Repository klonen
```bash
git clone https://github.com/DEIN_USERNAME/JetstreamService.git
cd JetstreamService
2. Backend einrichten
Abhängigkeiten installieren:
bash
Code kopieren
dotnet restore
Datenbank konfigurieren:
Bearbeite die appsettings.json im Ordner JetstreamService.
Beispiel:
json
Code kopieren
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DEIN_SQL_SERVER;Database=JetstreamServiceDB;Trusted_Connection=True;"
  }
}
Migrationen anwenden und Datenbank erstellen:
bash
Code kopieren
dotnet ef database update
Backend starten:
bash
Code kopieren
dotnet run
3. Frontend einrichten
In den Frontend-Ordner wechseln:
bash
Code kopieren
cd frontend
Abhängigkeiten installieren:
bash
Code kopieren
npm install
Frontend starten:
bash
Code kopieren
npm start
4. API testen
Öffne http://localhost:5133/swagger, um die API-Dokumentation aufzurufen.
Verwende Postman oder Swagger, um die Endpunkte zu testen.
📖 Features
Benutzer-Authentifizierung: JWT-basierte Authentifizierung.
CRUD-Operationen: Verwalte Serviceaufträge.
Responsives Frontend: Benutzerfreundliches Design.
🛠 Entwicklung
Migration hinzufügen:
bash
Code kopieren
dotnet ef migrations add MigrationName
Tests ausführen:
bash
Code kopieren
dotnet test
🧾 Lizenz
Dieses Projekt steht unter der MIT-Lizenz. 

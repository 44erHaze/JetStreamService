| Test-ID | Testbeschreibung                              | Erwartetes Ergebnis                          | Status | Notizen                       |
|---------|------------------------------------------------|---------------------------------------------|--------|-------------------------------|
| T1      | Auftragsliste abrufen (GET /serviceorders)     | Gibt eine Liste von Aufträgen zurück.       | ✅     | Funktioniert wie erwartet     |
| T2      | Aufträge nach Priorität filtern               | Gibt gefilterte Ergebnisse zurück.          | ✅     | Funktioniert wie erwartet     |
| T3      | Neuen Auftrag erstellen (POST)                | Auftrag wird in der DB gespeichert.         | ✅     | Funktioniert wie erwartet     |
| T4      | Status eines Auftrags ändern (PUT)            | Status wird erfolgreich aktualisiert.       | ✅     |                               |
| T5      | Auftrag löschen (DELETE)                      | Auftrag wird als gelöscht markiert.         | ✅     |                               |
| T6      | Login eines Mitarbeiters                      | JWT-Token wird ausgegeben.                  | ✅     |                               |
| T7      | Falscher Login                                | Gibt "Unauthorized" zurück.                | ✅     |                               |

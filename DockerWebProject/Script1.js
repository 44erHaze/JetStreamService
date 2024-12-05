function zeigeAutoInformationen() {
    var markenAuswahl = document.getElementById("markenAuswahl");
    var ausgewaehlteMarke = markenAuswahl.value;

    var autoInformationenElement = document.getElementById("autoInformationen");

    if (ausgewaehlteMarke === "audi") {
        autoInformationenElement.innerHTML = "<p>Marke: Audi</p><p>Modell: A4</p><p>Baujahr: 2022</p>";
    } else if (ausgewaehlteMarke === "bmw") {
        autoInformationenElement.innerHTML = "<p>Marke: BMW</p><p>Modell: 3er</p><p>Baujahr: 2021</p>";
    } else if (ausgewaehlteMarke === "mercedes") {
        autoInformationenElement.innerHTML = "<p>Marke: Mercedes</p><p>Modell: C-Klasse</p><p>Baujahr: 2020</p>";
    } else if (ausgewaehlteMarke === "volkswagen") {
        autoInformationenElement.innerHTML = "<p>Marke: Volkswagen</p><p>Modell: Golf</p><p>Baujahr: 2023</p>";
    }
}
// JavaScript source code

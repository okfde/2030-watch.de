
var getDataByCountry = function (countryName, filter) {
    var extractor = function (object, index) {
        try {
            var value = object["country"][countryName].value;
        }
        catch (error) {
            var value = null;
        }
        try {
            var score = object["country"][countryName].score;
        }
        catch (error) {
            var score = 6;
        }
        try {
            var title = object["our title"];
        }
        catch (error) {
            var title = '(kein Titel)';
        }
        return {"index": index, "value": value, "score": score, "country": countryName, "title": title};
    }
    return indicators.map(extractor);
};

var countryList = ["Germany", "France", "UK", "Italy", "USA", "Canada", "Japan", "Australia",
                   "Netherlands", "Ireland", "Austria", "Norway", "Finland", "Belgium", "Luxembourg",
                   "South Korea", "Slovenia", "Portugal", "Greece", "Estonia", "Czech Republic",
                   "Slovakia", "Lithuania", "Latvia", "Poland", "Hungary", "Croatia", "Iceland",
                   "Russia", "Denmark", "China", "India", "New Zealand", "Israel", "Mexico", "Chile",
                   "South Africa", "Spain", "Sweden", "Switzerland", "Turkey"];

var translate = function (countryName) {

    var translation = {"Germany": "Deutschland",
                       "France": "Frankreich",
                       "UK": "Großbritannien",
                       "Italy": "Italien",
                       "USA": "USA",
                       "Canada": "Kanada",
                       "Japan": "Japan",
                       "Australia": "Australien",
                       "Netherlands": "Niederlande",
                       "Ireland": "Irland",
                       "Austria": "Österreich",
                       "Norway": "Norwegen",
                       "Finland": "Finnland",
                       "Belgium": "Belgien",
                       "Luxembourg": "Luxemburg",
                       "South Korea": "Südkorea",
                       "Slovenia": "Slowenien",
                       "Portugal": "Portugal",
                       "Greece": "Griechenland",
                       "Estonia": "Estland",
                       "Czech Republic": "Tschechien",
                       "Slovakia": "Slowakei",
                       "Lithuania": "Litauen",
                       "Latvia": "Lettland",
                       "Poland": "Polen",
                       "Hungary": "Ungarn",
                       "Croatia": "Kroatien",
                       "Iceland": "Island",
                       "Russia": "Russland",
                       "Denmark": "Dänemark",
                       "China": "China",
                       "India": "Indien",
                       "New Zealand": "Neuseeland",
                       "Israel": "Israel",
                       "Mexico": "Mexiko",
                       "Chile": "Chile",
                       "South Africa": "Südafrika",
                       "Spain": "Spanien",
                       "Sweden": "Schweden",
                       "Switzerland": "Schweiz",
                       "Turkey": "Türkei"};
    try { return translation[countryName];
        }
    catch (error) { return '(no name)'; }
};

var responsibilities = [{"BMWI":  "Bundesministerium für Wirtschaft und Energie"},
                        {"AA":    "Auswärtiges Amt"},
                        {"BMI":   "Bundesministerium des Innern"},
                        {"BMJ":   "Bundesministerium der Justiz und für Verbraucherschutz"},
                        {"BMF":   "Bundesministerium der Finanzen"},
                        {"BMAS":  "Bundesministerium für Arbeit und Soziales"},
                        {"BMELV": "Bundesministerium für Ernährung und Landwirtschaft"},
                        {"BMVG":  "Bundesministerium der Verteidigung"},
                        {"BMFSJF":"Bundesministerium für Familie, Senioren, Frauen und Jugend"},
                        {"BMG":   "Bundesministerium für Gesundheit"},
                        {"BMVBS": "Bundesministerium für Verkehr und digitale Infrastruktur"},
                        {"BMUB":   "Bundesministerium für Umwelt, Naturschutz, Bau und Reaktorsicherheit"},
                        {"BMBF":  "Bundesministerium für Bildung und Forschung"},
                        {"BMZ":   "Bundesministerium für wirtschaftliche Zusammenarbeitund Entwicklung"},
                        {"BKAmt": "Bundeskanzleramt"}];

var responsibilitiesShort = responsibilities.map(function (elt) {return Object.keys(elt)[0];});

var getInfos = function (country, index) {

    var translation = ["sehr gut", "gut", "mittel", "schlecht", "sehr schlecht", "(keine Bewertung)"];

    try {
        var indicator = indicators[index];
    }
    catch (error) {
        var indicator = "unbekannt";
    }

    try {
        var title = indicator["our title"];
    }
    catch (error) {
        var title = '(kein Indicator vorhanden)';
    }

    try {
        var value = indicator["country"][country].value;
    }
    catch (error) {
        var value = 'nicht vorhanden';
    }

    try {
        var score = indicator["country"][country].score;
    }
    catch (error) {
        var score = 6;
    }

    try {
        var unit = indicator["unit"];
    }
    catch (error) {
        var unit = '';
    }

    return title + " Wert " + value + ' ' + unit + ' <b> ' + translation[score-1] + '</b>';
};

var fillIndicatorDetails = function (index) {

    try {
        var indicator = indicators[index];
    }
    catch (error) {
        var indicator = "unbekannt";
    }

    try {
        var source = indicator["indicator source"];
    }
    catch (error) {
        var source = "unbekannt";
    }

    try {
        var responsibility = indicator["ministerial responsibility"];
        var longResp = 'unbekannt';

        for(var i=0; i<responsibilities.length; i++) {
            if (responsibilities[i][responsibility] != undefined) {
                longResp = responsibilities[i][responsibility];
            }
        };

        responsibility = responsibility + ' - ' + longResp;
    }
    catch (error) {
        var responsibility = "unbekannt";
    }

    document.getElementById('indicatorDetailSource').innerHTML=source;
    document.getElementById('indicatorDetailResponsibility').innerHTML=responsibility;
};



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
                       "UK": "Groß Britannien",
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

    return title + "Wert " + value + ' ' + unit + ' <b> ' + translation[score-1] + '</b>';
};

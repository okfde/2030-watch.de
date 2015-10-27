
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

---
---
var src_indicators = [

    {% for datafile in site.data.datasets.online %}
        {"{{ datafile[0] }}": {{ datafile[1] | jsonify }} },
    {%endfor %}
]

var indicators = []

var sponsors = [

    {% for datafile in site.data.sponsors %}
        {{ datafile[1] | jsonify }},
    {%endfor %}
]

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
    if (global_lang === "en") return countryName;
    if(translation[countryName] === undefined){
        Object.keys(translation).forEach(function (key) {
            if(translation[key] === countryName){
                countryName = key;
            }
        });
        return countryName;
    }else{
        return translation[countryName];
    }
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

var colorScheme = ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c", "#DDDDDD"];

//Convoluted way of preserving the filenames from Jekyll
src_indicators.forEach(function(ind) {
   for (var filename in ind) {
       var indicator = ind[filename];
       indicator.filename = filename;
       indicator.int_name = {"en": indicator.original_title, "de": indicator.title};
       indicators.push(indicator);
       break; //Only one property per object
   }
});

indicators.forEach(function(ind){
	if(ind.target.rating === undefined) return;
    ind.scoring.scores.forEach(function(scoreset){
        scoreset.countries.forEach(function(country){
          if(country.value === -1){
              country.score = 6;
          }else{
              calcScore(ind.target.rating, country, ind.target.type);
          }
        });
    });
    if (ind.sponsor) {
        ind.sponsor = _.findWhere(sponsors, {name: ind.sponsor});
    }
});

function calcScore(rating, datum, type){
    if(type === 'more'){
		 calcMore(rating, datum);
    }else if(type=== 'less'){
        calcLess(rating, datum);
    }
}

function calcMore(rating, datum){
	datum.score = 5;
	for(var i = 0; i < rating.length; i++){
		if(datum.value >= rating[i]){
			datum.score = i+1;
			break;
		}
	}
}

function calcLess(rating, datum){
	datum.score = 5;
	for(var i = 0; i < rating.length; i++){
		if(datum.value <= rating[i]){
			datum.score = i+1;
			break;
		}
	}
}

var indicatorProvider = {
    "entries" : indicators,
    "getAllScoringsForCountryByIndicator" : function(country, indicatorid) {
        var result = [];
        var indicator = this.entries[indicatorid];

        if (!indicator) {
            console.error("did not find indicator with id: " + indicatorid)
            return;
        }

        for (var j = 0; j < indicator.scoring.scores.length; j++) {
            var currentScoring = indicator.scoring.scores[j];
            for (var k = 0; k < currentScoring.countries.length; k++) {
                var currentCountry = currentScoring.countries[k];
                if (currentCountry.name === country) {
                    result.push({"value" : currentCountry.value, "score" : currentCountry.score, "timestamp": currentScoring.timestamp})
                }
            }
        }
        return result;
    },
    "getLastScoringForCountryByIndicator" : function(country, indicatorid) {
        var allScorings = this.getAllScoringsForCountryByIndicator(country, indicatorid);
        return allScorings[allScorings.length - 1];
    },
    "getLastScoringByCountryForIndicator" : function(indicatorid) {
        var currentIndicator = this.entries[indicatorid];
        return currentIndicator.scoring.scores[currentIndicator.scoring.scores.length - 1].countries;
    },
    "getIndicatorsByProperty" : function(property, value) {
        var results = [];
        for (var i = 0; i < this.entries.length; i++) {
            var currentEntry = this.entries[i];
            if (currentEntry[property] === value) {
                results.push(i);
            }
        }
        return results;
    },
    "getIndicatorByTitle" : function(title) {
        return this.getIndicatorsByProperty('title', title)[0];
    },
    "getIndicatorByIndex" : function(index) {
        return indicators[index];
    },
    "getAllScoringsForCountry" : function(country) {
        return this.entries.map(function(indicator, index) {
            return indicator.scoring.scores.map(function(scoring) {
                //Note: only first year is handled!
                var scorings = scoring.countries.filter(function(scoringItem) {
                    return scoringItem.name === country;
                });
                var intName = {"en": indicator.original_title, "de": indicator.title};
                return ({
                    "indicator" : index,
                    "name" : indicator.title,
                    "int_name": indicator.int_name,
                    "unit" : indicator.target.baseunit,
                    "optimum_value": indicator.target.value,
                    "timestamp_data_host" : scoring.timestamp_data_host,
                    "timestamp" : scoring.timestamp,
                    "value" : scorings[0] ? scorings[0].value : -1,
                    "score": scorings[0] ? scorings[0].score : 6,
                    "sdg": indicator.sdg,
                    "responsibility": indicator.ministerial_responsibility,
                    "type": indicator.source.type
                });
            });
        });
    },
    "getLastScoringForCountry" : function(country) {
        scorings = this.getAllScoringsForCountry(country);
        result = scorings.map(function(indicator) {
            return indicator[indicator.length - 1];
        });
        return result;
    },
    "getLastScoringForCountryAndIndicator" : function(country, indicator) {
        scorings = this.getLastScoringForCountry(country);
        for (var i = 0; i < scorings.length; i++) {
            if (scorings[i].indicator == indicator) {
                return scorings[i];
            }
        }
        if (indicator)
            console.error('Did not find indicator ' + this.getIndicatorByIndex(indicator).title + ' for ' + country);
        else
            console.error('Indicator is undefined');
        return -1;
    },
    "getLastScoringForIndicator" : function(indicatorid) {
        var scoring = this.entries[indicatorid].scoring;
        return scoring[scoring.length - 1];
    },
    "getAllScoringsByCountry" : function() {
        var me = this;
        var result = {};
        var countries = this.getSupportedCountries();
        countries.forEach(function(country) {
            result[country] = me.getAllScoringsForCountry(country);
        });
        return result;
    },
    "getLastScoringByCountry" : function() {
        var me = this;
        var result = {};
        var countries = this.getSupportedCountries();
        countries.forEach(function(country) {
            result[country] = me.getLastScoringForCountry(country);
        });
        return result;
    },

    "getSupportedCountries" : function() {

        return ["Germany", "France", "UK", "Italy", "USA", "Canada", "Japan", "Australia",
            "Netherlands", "Ireland", "Austria", "Norway", "Finland", "Belgium", "Luxembourg",
            "South Korea", "Slovenia", "Portugal", "Greece", "Estonia", "Czech Republic",
            "Slovakia", "Lithuania", "Latvia", "Poland", "Hungary", "Croatia", "Iceland",
            "Russia", "Denmark", "China", "India", "New Zealand", "Israel", "Mexico", "Chile",
            "South Africa", "Spain", "Sweden", "Switzerland", "Turkey"];
    },

    "getAllIndicators" : function() {
        return this.entries;
    }
};

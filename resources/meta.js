
var meta = function () {

    for(i=0; i<indicators.length; i++) {

        var indicator = indicators[i];

        var title = indicator["our title"];
        var originalTitle = indicator["original-title"];
        var description = indicator["indicator description"];
        var unit = indicator["unit"];
        var scoring = indicator["scoring"];
        var indicatorType = indicator["indicator type"];
        var indicatorSource = indicator["indicator source"];
        var responsibility = indicator["ministerial responsibility"];
        var year = indicator["most recent year"];
        var sdg = indicator["sdg"];
        var type = indicator["type"];
        var sourceData = indicator["source of data"];
        var sourceNote = indicator["source_note"];
        var link = indicator["link"];

        document.write("<div style='width:800px; margin:30px;'>");
        document.write("[our title] <b>" + title + "</b>" + "<br>");
        document.write("[original-title] " + originalTitle + "<br>");
        document.write("[indicator description] " + description + "<br>");
        document.write("[unit] " + unit + "<br>");
        document.write("[scoring] " + scoring + "<br>");
        document.write("[source of data] " + sourceData + "<br>");
        document.write("[source_note] " + sourceNote + "<br>");
        document.write("[indicator type] " + indicatorType + "<br>");
        document.write("[indicator source] " + indicatorSource + "<br>");
        document.write("[responsibility] " + responsibility + "<br>");
        document.write("[link] " + link + "<br>");
        document.write("[type] " + type + "<br>");
        document.write("[sdg] " + sdg + "<br>");
        document.write("[most recent year] " + year + "<br>");


        document.write("</div>");

    };

}

meta();

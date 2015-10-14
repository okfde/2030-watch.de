
var meta = function () {

    for(i=0; i<indicators.length; i++) {

        var indicator = indicators[i];

        var title = indicator["our title"];
        var originalTitle = indicator["original-title"];
        var scoring = indicator["scoring"];
        var indicatorType = indicator["indicator type"];
        var indicatorSource = indicator["indicator source"];
        var responsibility = indicator["ministerial responsibility"];
        var year = indicator["most recent year"];

        document.write("<div style='width:800px; margin:30px;'>");
        document.write("[our title] <b>" + title + "</b>" + "<br>");
        document.write("[original-title] " + originalTitle + "<br>");
        document.write("[scoring] " + scoring + "<br>");
        document.write("[indicator type] " + indicatorType + "<br>");
        document.write("[indicator source] " + indicatorSource + "<br>");
        document.write("[responsibility] " + responsibility + "<br>");
        document.write("[year] " + year + "<br>");


        document.write("</div>");

    };

}

meta();

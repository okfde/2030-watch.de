
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
        document.write("<b>[our title]</b> <b><h4>" + title + "</h4></b>" + "<br>");
        document.write("<b>[original-title]</b> " + originalTitle + "<br>");
        document.write("<b>[indicator description]</b> " + description + "<br>");
        document.write("<b>[unit]</b> " + unit + "<br>");
        document.write("<b>[scoring]</b> " + scoring + "<br>");
        document.write("<b>[source of data]</b> " + sourceData + "<br>");
        document.write("<b>[source_note]</b> " + sourceNote + "<br>");
        document.write("<b>[indicator type]</b> " + indicatorType + "<br>");
        document.write("<b>[indicator source]</b> " + indicatorSource + "<br>");
        document.write("<b>[responsibility]</b> " + responsibility + "<br>");
        document.write("<b>[link]</b> " + link + "<br>");
        document.write("<b>[type]</b> " + type + "<br>");
        document.write("<b>[sdg]</b> " + sdg + "<br>");
        document.write("<b>[most recent year]</b> " + year + "<br>");


        document.write("</div>");

    };

}

meta();

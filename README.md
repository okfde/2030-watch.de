# 2030-watch.de - The frontend for <a href="https://2030-watch.de/en/methodik/">2030 Watch</a>

## Overview
2030-watch.de showcases around 60 indicators (measurements) of countries' progress towards the UN 2030 Sustainability goals. Not only the scores of the countries are important but also a host of metadata about how the indicator was put together and calculated and by whom.

## Technical Overview
The site uses Jekyll, a static website generator. What that means is you can write HTML and Javascript in a way that is data dependent, but the site becomes static against a certain version of the data. The approach is suited for websites whose data change only intermittantly and not constantly. This is well suited for the 2030 Watch project as data is updated only time to time. For the processes of updating the site data based on the latest edited data (coming from Google Sheets), see the <a href="https://github.com/okfde/2030-watch-dataprocessing">2030-watch-dataprocessing repository</a>. Note that the site is not suitable for deployment directly on gh-pages due to the use of the multilanguage module (see below).

Bootstrap is used for layout, SCSS for styling. This gets automatically compiled into CSS by Jekyll. D3 and Highcharts are used for the visualizations. JQuery and Markdown are used as required.

## Starting development

  - Install Ruby and <a href="https://jekyllrb.com/">Jekyll</a> if necessary
  - Install the jekyll-polyglot module. A Gemfile is included in the repo
  
(sorry about the lack of detailed Ruby environment instructions, but this is an area in which the author has had a lot of bad experiences and prefers not to give specific advice)

## Data locations
Indicators are provided as JSON files, one per indicator, in the folder <code>_data/datasets/online</code> - this makes them available to Jekyll. A Jekyll-templated Javascript then makes the data available in Javascript (database.js). Reviewing that file shows how to access the data both from Jekyll and in Javascript; data is accessed in the visualizations via pre-processing functions.

The JSON files should never be created directly but instead using the <a href="https://github.com/okfde/2030-watch-dataprocessing">2030-watch-dataprocessing repository</a> which turns tabular Google Sheets into valid JSON files (and does a certain amount to ensure conformity).

Data on sponsors (organizations that maintain an indicator) is in the folder <code>_data/sponsors</code>. At this time it is recommended when creating a new sponsor to just copy an existing one and change the values. Logos for the sponsors are found in the folder <code>static/img/logos</code> and should be 200 pixels wide. The name of the sponsor in the sponsor JSON needs to match the name of the "sponsor" key in the indicator JSON. If this sponsor does not exist this is OK.

Data on the SDGs can be found in <code>_data/sdgs.json</code>. The "content" properties are currently not used and are therefore also not translated into English.

Translated strings are in <code>config.yml</code>. They can be accessed in templates by adding <code>{{ site.t.NAME_OF_STRING_HERE[site.active_lang]</code> and in Javascript by <code>global_t['NAME_OF_STRING_HERE'][global_lang]</code>.

## Intro to the visualisations
key files (database.js, indicators.js?, others?) - D3, injection of translations into the javascript - TODO

### Other TODOs
github branches

preview features/future work

embedding



---
---
var indicators = [
    {% for datafile in site.data.datasets.online %}
        {{ datafile[1] | jsonify }},
    {% endfor %}
]
/*
Formatters for the Rivet JS Framework
*/

/*
    Date Formatter
 */
rivets.formatters.day = function(value){
    return new Date(value).getDate();
};

rivets.formatters.month = function(value){
    return new Date(value).getDate();
};

rivets.formatters.year = function(value){
    return new Date(value).getDate();
};

rivets.formatters.dayOfWeek = function(value, language){
    var days = {
        'en' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursay', 'Friday','Saturday'],
        'de' : ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
    };
    return days[language][new Date(value).getDay()];
};


var indicatorUtils = {
    sortScoringAsc : function(a, b) {
        if (!a)
            return b;
        if (!b)
            return a;
        if (a.timestamp < b.timestamp)
            return -1;
        if (a.timestamp > b.timestamp) {
            return 1;
        }
        return 0;
    }
};
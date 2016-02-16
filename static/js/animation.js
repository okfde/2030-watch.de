/**
 * Created by knutator on 16.02.16.
 */
$(document).ready(function() {
    $('a.smooth-scroll').click(function(event) {
        event.preventDefault();
        var target = event.currentTarget.href.split('#')[1]
        scrollToAnchor(target);
    })
});

function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},1000, 'swing');
}
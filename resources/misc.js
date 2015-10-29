
$('a').click(function(){


    var tag='[name="' + $.attr(this, 'href').substr(1) + '"]';

    try {
        $('html, body').animate({
            scrollTop: $(tag).offset().top
        }, 800);
    }
    catch (error) {
        return true;
    }
    return false;
});

function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

// $('a').click(function(){
//     $('html, body').animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 500);
//     return false;
// });

// filter tabs
$('#sdgFilter a').click(function (e) {
    alert('SDG');

});
$('#respFilter a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

//$(window).bind('resize', function(e)
//               {
//                   if (window.RT) clearTimeout(window.RT);
//                   window.RT = setTimeout(function()
//                                          {
//                                              this.location.reload(false); /* false to get page from cache */
//                                          }, 100);
//               });

var getIndicatorList = function () {

    return indicators.map(function (elt) {
        return elt["our title"];
    });
}

$('.alpha').tooltip();

$('.sdgIcon').tooltip();

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) +
        ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}

var alertShown = getCookie("alpha");

if (alertShown === "alertShown") {
    setTimeout(function () {
        $("#alphaAlert").fadeTo(5000,500).slideUp(500, function(){
            $('#alphaAlert').alert('close');
        });
    });
}

$('#alphaAlertButton').on('click', function (e) {
    setCookie('alpha', 'alertShown', 7);
});

// fill single indicators dropdown from database
for(i=1; i<=indicators.length; i++) {
    document.getElementById('indicatorSelector' + i).innerHTML=indicators[i-1]["our title"];
};

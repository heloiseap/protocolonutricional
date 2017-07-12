$(document).ready(function () { 

    $('input[type=date]').each(function(i,el){
        $(el).val('1980-01-01');
    });

    $('input[type=radio]').each(function(i,el){
        if ($(el).val() == 0) {
            $(el).attr('checked', 'checked');
        }
    });

});
jQuery(function($) {

    $('a.panel').click(function() {

        var $target = $($(this).attr('href')),
            $other = $target.siblings('.active');

	//Start animation in canvas if this is panel 303
        if ($(this).attr('href') == '#panel303') {
	    start();
	}
        
        if (!$target.hasClass('active')) {
            $other.each(function(index, self) {
                var $this = $(this);
                $this.removeClass('active').stop().animate({
                    left: $this.width(),
                }, 500);
            });

            $target.addClass('active').show().css({
                left: -($target.width()),
            }).stop().animate({ left: 0 }, 500);
        }
    });


    //Give the life image a hover animation
    var src = $('img#life_img').attr('src');
    $('img#life_img').hover(function() {
        $(this).attr('src', src.replace('img/shuttle_static.gif', 'img/shuttle.gif'));
    }, function(){
      $(this).attr('src', src);
    });

});

$(document).ready(function() {
	$("div#left").find("a#defaultPanel").trigger('click');
});


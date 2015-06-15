jQuery(function($) {

    $('a.panel').hover(function() {

        var $target = $($(this).attr('href')),
            $other = $target.siblings('.active');
        
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

});
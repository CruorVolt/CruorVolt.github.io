jQuery(function($) {

    $('a.panel').click(function() {


        var $target = $($(this).attr('href')),
            $other = $target.siblings('.active');
        
        if (!$target.hasClass('active')) {
	    $(this).find("img").addClass('border');
            $other.each(function(index, self) {
                var $this = $(this);
                $this.removeClass('active').stop().animate({
                    left: $this.width(),
                }, 500);
		$this.find("img").removeClass('border');
		console.log("REMOVING");
            });

            $target.addClass('active').show().css({
                left: -($target.width()),
            }).stop().animate({ left: 0 }, 500);
        }
    });

});

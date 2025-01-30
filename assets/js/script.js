$(function() {

    $('.navbar-toggle').click(function() {
        $(this).toggleClass('act');
            if($(this).hasClass('act')) {
                $('.main-menu').addClass('act');
            }
            else {
                $('.main-menu').removeClass('act');
            }
    });

    
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

	/* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
	    $('.progress .progress-bar').progressbar({
	        transition_delay: 500
	    });
    }
    
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length>0) {
        $(".section-counters .start").each(function() {
            var stat_item = $(this),
            offset = stat_item.offset().top;
            $(window).scroll(function() {
                if($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

	// another custom callback for counting to infinity
	$('#infinity').data('countToOptions', {
		onComplete: function (value) {
            count.call(this, {
            from: value,
            to: value + 1
            });
		}
	});

	$('#infinity').each(count);

	function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
            forceHeight: false,
            smoothScrolling: false,
            mobileDeceleration: 0.004,
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
    });
    
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const messageContainer = document.createElement("div"); 

    messageContainer.id = "message-container";
    messageContainer.style.position = "absolute";
    messageContainer.style.bottom = "50%"; 
    messageContainer.style.left = "50%";
    messageContainer.style.transform = "translateX(-50%)"; 
    messageContainer.style.marginBottom = "10px"; 
    messageContainer.style.opacity = "0"; 
    messageContainer.style.transition = "opacity 0.5s ease"; 
    messageContainer.style.padding = "5px 25px"; 
    messageContainer.style.border = "1px solid green"; 
    messageContainer.style.backgroundColor = "green"; 

    form.style.position = "relative"; 
    form.appendChild(messageContainer);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("contact.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    messageContainer.textContent = data.message;
                    messageContainer.style.color = "white";
                    messageContainer.style.opacity = "1"; // Показуємо повідомлення
                    form.reset();

                    setTimeout(() => {
                        messageContainer.style.opacity = "0"; // Ховаємо повідомлення
                    }, 5000);
                } else {
                    messageContainer.textContent = data.message;
                    messageContainer.style.color = "red";
                    messageContainer.style.opacity = "1"; // Показуємо повідомлення

                    setTimeout(() => {
                        messageContainer.style.opacity = "0"; // Ховаємо повідомлення
                    }, 5000);
                }
            })
            .catch(error => {
                messageContainer.textContent =
                    "An error occurred. Please try again later.";
                messageContainer.style.color = "red";
                messageContainer.style.opacity = "1"; // Показуємо повідомлення

                setTimeout(() => {
                    messageContainer.style.opacity = "0"; // Ховаємо повідомлення
                }, 5000);

                console.error("Error:", error);
            });
    });
});

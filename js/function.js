(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}	
	
		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}	
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Back to Top Button Show/Hide */
	$(window).on('scroll touchmove', function() {
		if ($(this).scrollTop() > 100) {
			$('#back-to-top').addClass('is-visible');
		} else {
			$('#back-to-top').removeClass('is-visible');
		}
	});

	/* Hero Slider Layout JS */
	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
		effect: 'fade',
		slidesPerView : 1,
		speed: 1000,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.hero-pagination',
			clickable: true,
		},
	});

	/* About Images Slider JS */
	if ($('.about-images .swiper').length) {
		const about_images_slider = new Swiper('.about-images .swiper', {
			slidesPerView: 1,
			speed: 800,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768:{
					slidesPerView: 1,
				},
				991:{
					slidesPerView: 1,
				}
			}
		});
	}

	/* Reviews Slider JS */
	if ($('.reviews-slider .swiper').length) {
		const reviews_slider = new Swiper('.reviews-slider .swiper', {
			speed: 800,
			loop: true,
			centeredSlides: true,
			slideToClickedSlide: true,
			watchSlidesProgress: true,
			observer: true,
			observeParents: true,
			spaceBetween: 24,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},
			pagination: {
				el: '.reviews-slider .swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					centeredSlides: false,
				},
				768: {
					slidesPerView: 1,
					centeredSlides: false,
				},
				992: {
					slidesPerView: 3,
					centeredSlides: true,
				},
			},
		});

		if (reviews_slider.autoplay && typeof reviews_slider.autoplay.start === 'function') {
			reviews_slider.autoplay.start();
		}

		reviews_slider.on('click', function(swiper){
			if (!swiper || typeof swiper.clickedIndex !== 'number') {
				return;
			}
			if (window.innerWidth < 992) {
				return;
			}
			swiper.slideToLoop(swiper.clickedIndex);
		});
	}

	/* Company Support Slider JS */
	if ($('.company-supports-slider').length) {
		const agency_supports_slider = new Swiper('.company-supports-slider .swiper', {
			slidesPerView : 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768:{
				  	slidesPerView: 4,
				},
				991:{
				  	slidesPerView: 5,
				}
			}
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
				});
		});		
	}
	
	if ($('.text-anime-style-2').length) {				
		let	 staggerAmount 		= 0.03,
			 translateXValue	= 20,
			 delayValue 		= 0.1,
			 easeType 			= "power2.out",
			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}
	
	if ($('.text-anime-style-3').length) {		
		let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		
		 animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element,	start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});		
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Hero Image Magnifier */
	(function initHeroMagnifier(){
		var $heroImg = $('.hero-image img');
		if (!$heroImg.length) {
			return;
		}

		var img = $heroImg[0];
		var $container = $heroImg.closest('.hero-image');
		if (!$container.length) {
			return;
		}

		var lens = document.createElement('div');
		lens.className = 'img-magnifier-lens';
		$container[0].appendChild(lens);

		var zoom = 3.5;
		var lensSize = 192;
		var half =lensSize / 2;
		var lastRect = null;

		function updateBackground(){
			lens.style.backgroundImage = "url('" + img.src + "')";
			lens.style.backgroundSize = (img.width * zoom) + 'px ' + (img.height * zoom) + 'px';
		}

		function getPos(evt){
			var e = evt;
			if (e.touches && e.touches.length) {
				e = e.touches[0];
			}
			return { x: e.clientX, y: e.clientY };
		}

		function moveLens(evt){
			if (!lastRect) {
				lastRect = img.getBoundingClientRect();
			}
			var p = getPos(evt);
			var x = p.x - lastRect.left;
			var y = p.y - lastRect.top;

			if (x < 0 || y < 0 || x > lastRect.width || y > lastRect.height) {
				lens.style.display = 'none';
				return;
			}

			var left = x - half;
			var top = y - half;
			if (left < 0) left = 0;
			if (top < 0) top = 0;
			if (left > lastRect.width - lensSize) left = lastRect.width - lensSize;
			if (top > lastRect.height - lensSize) top = lastRect.height - lensSize;

			lens.style.left = left + 'px';
			lens.style.top = top + 'px';

			var bgX = -((left + half) * zoom - half);
			var bgY = -((top + half) * zoom - half);
			lens.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
			lens.style.display = 'block';
		}

		function handleEnter(){
			lastRect = img.getBoundingClientRect();
			updateBackground();
			lens.style.display = 'block';
		}

		function handleLeave(){
			lens.style.display = 'none';
		}

		if (img.complete) {
			updateBackground();
		} else {
			img.addEventListener('load', updateBackground);
		}

		$container.on('mousemove', moveLens);
		$container.on('mouseenter', handleEnter);
		$container.on('mouseleave', handleLeave);
		$container.on('touchstart', handleEnter);
		$container.on('touchmove', moveLens);
		$container.on('touchend touchcancel', handleLeave);

		$window.on('resize', function(){
			lastRect = img.getBoundingClientRect();
			updateBackground();
		});
	})();

	/* Contact form validation - simplified */
	var $contactform = $("#contactForm");
	if ($contactform.length) {
		$contactform.on("submit", function (event) {
			var action = ($contactform.attr("action") || "").toLowerCase();
			if (action.indexOf("https://api.web3forms.com/submit") === 0) {
				return;
			}
			event.preventDefault();
			// Simple form submission without validation
			submitForm();
		});
	}

	function submitForm(){
		/* Ajax call to submit form */
		if ($contactform && $contactform.length) {
			$.ajax({
				type: "POST",
				url: "form-process.php",
				data: $contactform.serialize(),
				success : function(text){
					if (text === "success"){
						formSuccess();
					} else {
						submitMSG(false,text);
					}
				}
			});
		}
	}

	function formSuccess(){
		if ($contactform && $contactform.length) {
			$contactform[0].reset();
			submitMSG(true, "Your message has been received by our support team. They will respond soon.")
		}
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		var msgElement = $("#msgSubmit");
		if (msgElement.length) {
			msgElement.removeClass().addClass(msgClasses).text(msg);
		}
	}
	/* Contact form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	// Countdown timer - only run if elements exist
	const daysElement = document.getElementById("days");
	const hoursElement = document.getElementById("hours");
	const minutesElement = document.getElementById("minutes");
	const secondsElement = document.getElementById("seconds");

	/* Cookie Consent (disabled)
	(function initCookieConsent(){
		var consentEl = document.getElementById('cookie-consent');
		if (!consentEl) {
			return;
		}

		var STORAGE_KEY = 'cookie_consent';
		var existing = null;
		try {
			existing = window.localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			existing = null;
		}

		if (existing === 'accepted' || existing === 'declined') {
			consentEl.hidden = true;
			$body.removeClass('cookie-consent-open');
			return;
		}

		consentEl.hidden = false;
		$body.addClass('cookie-consent-open');

		var acceptBtn = document.getElementById('cookie-consent-accept');
		var declineBtn = document.getElementById('cookie-consent-decline');

		function saveChoice(value){
			try {
				window.localStorage.setItem(STORAGE_KEY, value);
			} catch (e) {
				// ignore
			}
			consentEl.hidden = true;
			$body.removeClass('cookie-consent-open');
		}

		if (acceptBtn) {
			acceptBtn.addEventListener('click', function(){
				saveChoice('accepted');
			});
		}
		if (declineBtn) {
			declineBtn.addEventListener('click', function(){
				saveChoice('declined');
			});
		}
	})();
	*/
	
	if (daysElement && hoursElement && minutesElement && secondsElement) {
		// Set the date we're counting down to (2 days from now)
		const countDownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);

		// Update the countdown every 1 second
		const x = setInterval(function() {
		// Get today's date and time
		const now = new Date().getTime();

		// Find the distance between now and the countdown date
		const distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result
		daysElement.innerHTML = days.toString().padStart(2, '0');
		hoursElement.innerHTML = hours.toString().padStart(2, '0');
		minutesElement.innerHTML = minutes.toString().padStart(2, '0');
		secondsElement.innerHTML = seconds.toString().padStart(2, '0');

		// If the countdown is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			daysElement.innerHTML = "00";
			hoursElement.innerHTML = "00";
			minutesElement.innerHTML = "00";
			secondsElement.innerHTML = "00";
		}
		}, 1000);
	}
	
})(jQuery);

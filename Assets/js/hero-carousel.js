(function ($) {
	"use strict";

	$(function () {
		var $hero = $("#homeHeroCarousel");

		if (!$hero.length) {
			return;
		}

		function applyHeroAutoplay() {
			if (!$hero.hasClass("slick-initialized")) {
				return;
			}

			$hero.slick("slickSetOption", "autoplay", true, false);
			$hero.slick("slickSetOption", "autoplaySpeed", 8000, true);
		}

		$hero.on("init", applyHeroAutoplay);
		applyHeroAutoplay();
	});
})(jQuery);

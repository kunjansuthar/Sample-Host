(function ($) {
	"use strict";

	var $input = $("#faqSearch");
	if (!$input.length) {
		return;
	}

	$(".faq-search-form").on("submit", function (e) {
		e.preventDefault();
	});

	$input.on("input", function () {
		var query = $(this).val().toLowerCase().trim();
		var visibleItems = 0;

		$(".faq-section-row").each(function () {
			var $row = $(this);
			var rowVisible = 0;

			$row.find(".faq-item").each(function () {
				var text = String($(this).data("faq-text") || $(this).text()).toLowerCase();
				var match = !query || text.indexOf(query) !== -1;
				$(this).toggle(match);
				if (match) {
					rowVisible += 1;
					visibleItems += 1;
				}
			});

			$row.toggle(rowVisible > 0);
		});

		$("#faqNoResults").toggleClass("d-none", !query || visibleItems > 0);
	});
})(jQuery);

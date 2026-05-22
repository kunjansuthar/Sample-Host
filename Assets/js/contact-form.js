(function ($) {
	'use strict';

	var $form = $('#contactForm');
	if (!$form.length) {
		return;
	}

	var phpEndpoint = 'form-process.php';
	var formSubmitDefault = 'https://formsubmit.co/ajax/info@crilof.com';

	function showMessage($msg, type, text) {
		$msg.removeClass('text-success text-danger text-body-secondary');
		if (type === 'success') {
			$msg.addClass('text-success');
		} else if (type === 'error') {
			$msg.addClass('text-danger');
		} else {
			$msg.addClass('text-body-secondary');
		}
		$msg.text(text);
	}

	function showSuccess($msg) {
		$form[0].reset();
		showMessage(
			$msg,
			'success',
			'Your message has been received by our support team. They will respond soon.'
		);
	}

	function sendViaFormSubmit($msg, $btn) {
		var action = $form.attr('action') || formSubmitDefault;

		return $.ajax({
			type: 'POST',
			url: action,
			data: $form.serialize(),
			dataType: 'json'
		}).done(function (data) {
			if (data && data.success) {
				showSuccess($msg);
			} else {
				showMessage($msg, 'error', (data && data.message) || 'Unable to send your message. Please try again.');
			}
		}).fail(function (xhr) {
			var message = 'Unable to send your message right now. Please email us at info@crilof.com.';
			if (xhr.responseJSON && xhr.responseJSON.message) {
				message = xhr.responseJSON.message;
			} else if (xhr.responseText) {
				message = xhr.responseText.trim();
			}
			showMessage($msg, 'error', message);
		}).always(function () {
			$btn.prop('disabled', false);
		});
	}

	function sendViaPhp($msg, $btn) {
		return $.ajax({
			type: 'POST',
			url: phpEndpoint,
			data: $form.serialize(),
			dataType: 'text'
		}).done(function (text) {
			if ((text || '').trim() === 'success') {
				showSuccess($msg);
			} else {
				showMessage($msg, 'error', (text || '').trim() || 'Unable to send your message. Please try again.');
			}
			$btn.prop('disabled', false);
		}).fail(function (xhr) {
			if (xhr.status === 405 || xhr.status === 404 || xhr.status === 0) {
				sendViaFormSubmit($msg, $btn);
				return;
			}

			var message = (xhr.responseText || '').trim() ||
				'Unable to send your message right now. Please email us at info@crilof.com.';
			showMessage($msg, 'error', message);
			$btn.prop('disabled', false);
		});
	}

	$form.on('submit', function (event) {
		event.preventDefault();

		var $btn = $form.find('[type="submit"]');
		var $msg = $('#msgSubmit');
		var action = ($form.attr('action') || '').toLowerCase();
		var useFormSubmit = action.indexOf('formsubmit.co') !== -1;

		$btn.prop('disabled', true);
		showMessage($msg, 'pending', 'Sending...');

		if (useFormSubmit) {
			sendViaFormSubmit($msg, $btn);
		} else {
			sendViaPhp($msg, $btn);
		}
	});
})(jQuery);

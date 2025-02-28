(function ($) {
	'use strict';

	/**
	 * All of the code for plugin admin JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed we will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables us to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 */
	
	$(document).on('click', '.delete-comment', function(e) {
		e.preventDefault();
		if (!confirm("Are you sure you want to delete this comment?")) return;

		let button = $(this);
        let commentId = button.data('comment-id');
        let postId = $('#post_ID').val();
        let postData = {
            action: 'delete_comment',
            nonce: smartyFormSubmissions.nonce,
            post_id: postId,
            comment_id: commentId
        };

		$.post(smartyFormSubmissions.ajax_url, postData, function(response) {
			if (response.success) {
				button.closest('div').remove();
				window.location.reload(true);
			} else {
				console.error('Error: ' + response.data.message);
			}
		});
	});

	// Auto-hide the admin notices
	$(document).ready(function($) {
		$('#smarty-fs-delete-logs-button').on('click', function(e) {
			e.preventDefault();
			if (confirm('Are you sure you want to delete all logs?')) {
				$.post(
					smartyFormSubmissions.ajaxUrl,
					{
						action: 'smarty_fs_clear_logs',
						nonce: smartyFormSubmissions.nonce,
					},
					function(response) {
						if (response.success) {
							alert('Logs cleared.');
							location.reload();
						} else {
							alert('Failed to clear logs.');
						}
					}
				);
			}
		});

		//console.log('Setting up auto-hide for admin notices');
		setTimeout(function() {
			$(".smarty-fs-auto-hide-notice").fadeTo(500, 0).slideUp(500, function(){
				$(this).remove(); 
				//console.log('Admin notice auto-hidden');
			});
		}, 3000);
	});
})(jQuery);
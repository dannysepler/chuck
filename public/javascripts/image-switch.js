var images = ["wolf", "tree", "lake", "mountain", "sunset"];
var i = 0;

$('img').on('click', '.centerpiece', function(e) {
	// alert('working');

	$(this).slideToggle('fast');
	/*$(this).attr('src', 'images/' + images[i % 5] + '.jpg');
	i++;
	$(this).slideToggle('fast');*/
});

$('img').click();
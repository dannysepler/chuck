$(document).ready(function() {
	// making banner clickable
	/*$("#banner").click(function(){
     	window.location='/dev/'; 
     	return false;
	});*/ 	// disabled this for now
			// if you're going to turn it on,
			// make sure to uncomment the 
			// "cursor: pointer;" css

	// displaying album names onclick
	$('#albums a').click(function() {
		$('#albumnames').slideToggle('fast');
	});

	$('.navbar-toggle').click(function() {
		$('.content').css('margin-top', function() {
			// if ($('.navbar-collapse').is(":visible")) {
			if ($('.navbar-collapse').css('display') == 'none') {
				//alert('is visible');
				return '100px';
			}
			//alert('not visible');
			return '0px';

			/*var margintop = $('.content').css('margin-top').replace("px","");
			var newmargintop = 100 - parseInt(margintop);
			// alert('new margin top is '+newmargintop);
			return "" + newmargintop + "px";*/
		});
		$('.navbar-collapse').slideToggle('fast');

	});
});
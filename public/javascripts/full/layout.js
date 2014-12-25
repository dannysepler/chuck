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
		$('.navbar-collapse').slideToggle('fast');
		$('.content').css('margin-top', function() {
			var margintop = $('.content').css('margin-top').replace("px","");
			var newmargintop = 100 - parseInt(margintop);
			// alert('new margin top is '+newmargintop);
			return "" + newmargintop + "px";
		})
	});
});
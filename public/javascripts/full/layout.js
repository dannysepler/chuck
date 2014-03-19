$(document).ready(function() {
	// making banner clickable
	$("#banner").click(function(){
     	window.location='/dev/'; 
     	return false;
	});

	// displaying album names onclick
	$('#albums a').click(function() {
		$('#albumnames').slideToggle('fast');
	});

});
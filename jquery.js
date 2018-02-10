$(document).ready(function() {
	var headUls = $("#header").find("ul");
	var proj = headUls.find("li").first();
	var about = headUls.find("li").last();

	headUls.hide();
	$("#header").fadeIn("slow");

	$("#header").hover(function() {
		$(this).css("background-color", "#BC95A0");
		// $(this).animate({'font-size': '+=3px'}, "50");
		var span = $(this).find("span");
		span.animate({'letter-spacing': '+=1px'}, "fast");
		span.animate({'margin-left': '-=25%'}, "fast");
		headUls.fadeIn("fast");
	}, function() {
		$(this).css("background-color", "#BC8FA0");
		// $(this).animate({'font-size': '-=3px'}, "5");
		var span = $(this).find("span");
		span.animate({'letter-spacing': '-=1px'}, "fast");
		span.animate({'margin-left': '+=25%'}, "fast");
		headUls.fadeOut("fast");	
	});

	headUls.children().hover(function() {
		$(this).css("background-color", "#FAF0FD");
	}, function() {
		$(this).css("background-color", "#BCA0D0");
	});
});

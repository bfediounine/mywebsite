$(document).ready(function() {
	var headUls = $("#header").find("ul");
	var miscUls = $("#miscellaneous").find("ul");
	var proj = headUls.find("li").first();
	var about = headUls.find("li").last();
	var modal = document.getElementById("newUser");

	var d = new Date(); // needed for fancy box cosmetics

	var $nuserdiv = $("#newuservalue"),
		$nname = $("#newname"),
		$npass = $("#newpass"),
		$nsub = $("#newsubmit"),
		$nform = $("#newuserform");
	$nname.val('');
	$npass.val('');

	headUls.hide();
	$("#header").fadeIn("slow");
	$("#miscellaneous").find("ul").slideDown(1000);
	$("#miscellaneous").find("span").animate({
		'padding-right': screen.width}, "slow"); 

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

	miscUls.children().hover(function() {
		$(this).css("-webkit-animation", "miscButton 2s infinite");
		$(this).css("-moz-animation", "miscButton 2s infinite");
	}, function() {
		$(this).css("background-color", "#BDA0A0");
		$(this).css("-webkit-animation", "unset");
		$(this).css("-moz-animation", "unset");
	});

	miscUls.children('li').first().click(function() {
		modal.style.display = "block";
	});

	$("span.close").click(function() {
		modal.style.display = "none";
	});

	$(window).click(function(event) {
		if (event.target == modal)
			modal.style.display = "none";
	});

	$nform.submit(function(event) {
		if (validateForm()) {
			alert("Thank you for registering. Visit your profile page for settings.");
			event.preventDefault();
			console.log("Making POST request...");
			$.ajax({
				url: "http://localhost:8080/newuser",
				headers: {"Content-type": "application/json"},
				method: "POST",
				data: JSON.stringify({"name": $nname.val(),
					"pass": $npass.val()}),
				success: function(response) {
					console.log(response);
				},
				error: function(jqXHR, status, errorThrown) {
					console.log(jqXHR);
				}
			});
			console.log("POST request complete.");
		} else alert("Invalid username or password.");
		$(this).focusout();
	});  
	
	/* $nuserdiv.children().focusin(function() {
		$(this).value = "";
	});
	$nuserdiv.children().focusout(function() {
		if ($(this).value === "")
			$this.value = $(this).defaultValue;
	}); */
});

// form validator TODO
function validateForm() {
	alert(document.forms["newuserform"]["newname"].value);
	return true;
}




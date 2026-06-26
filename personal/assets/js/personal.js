$(document).ready(function () {
	const sections = {
		me: "#meContent",
		achievements: "#achievementsContent",
		pastpositions: "#pastpositionsContent",
	};

	Object.values(sections).forEach((selector) => {
		if (selector !== "#meContent") $(selector).hide();
	});

	$("#theme").hide();
	$("#lan").hide();

	Object.keys(sections).forEach((id) => {
		$(`#${id}`).click(function (e) {
			if (!$(e.target).hasClass("active")) {
				clearActiveLinks();
				activateLink(e);
				clearActiveDivs();
				activateDiv(sections[id]);
			}
		});
	});

	if (localStorage.getItem("theme") === null) {
		localStorage.theme = "light";
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			localStorage.theme = "dark";
		}
	}

	$("<link>").appendTo("head").attr({
		type: "text/css",
		rel: "stylesheet",
		href: "../assets/css/light.css",
	});

	if (localStorage.theme === "dark") {
		$("link[href='../assets/css/light.css']").remove();
		$("<link>").appendTo("head").attr({
			type: "text/css",
			rel: "stylesheet",
			href: "../assets/css/dark.css",
		});
		$("#theme").empty().append("<i class='fa-duotone fa-lightbulb-slash'></i>");
	}

	$("#options-toggler").click(function (e) {
		if (!$(e.currentTarget).hasClass("active")) {
			$(e.currentTarget).addClass("active");
			$("#theme").show("fast");
		} else {
			$(e.currentTarget).removeClass("active");
			$("#theme").hide("fast");
		}
	});

	$("#theme").click(function () {
		if (localStorage.theme !== "dark") {
			$("#theme").empty().append("<i class='fa-duotone fa-lightbulb-slash'></i>");
			localStorage.theme = "dark";
			$("link[href='../assets/css/light.css']").remove();
			$("<link>").appendTo("head").attr({
				type: "text/css",
				rel: "stylesheet",
				href: "../assets/css/dark.css",
			});
		} else {
			$("#theme").empty().append("<i class='fa-duotone fa-lightbulb'></i>");
			localStorage.theme = "light";
			$("link[href='../assets/css/dark.css']").remove();
			$("<link>").appendTo("head").attr({
				type: "text/css",
				rel: "stylesheet",
				href: "../assets/css/light.css",
			});
		}
	});
});

function clearActiveLinks() {
	$("#navbarList .nav-item .nav-link").each(function () {
		$(this).removeClass("active");
	});
}

function clearActiveDivs() {
	$(".container .content .active").each(function () {
		$(this).removeClass("active");
		$(this).hide();
	});
}

function activateLink(e) {
	$(e.target).addClass("active");
}

function activateDiv(divId) {
	$(divId).addClass("active");
	$(divId).show();

	if ($(window).width() < 751) {
		$("html, body").animate({ scrollTop: $(divId).offset().top }, 1);
	}
}

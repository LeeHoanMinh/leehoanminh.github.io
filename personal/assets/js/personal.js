$(document).ready(function () {
	const sections = {
		me: "#meContent",
		achievements: "#achievementsContent",
		experiences: "#experiencesContent",
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

	$(document).on("click", ".academic-strip-prev", function () {
		const track = $(this).closest(".academic-photo-strip").find(".academic-photo-strip-track")[0];
		if (track) track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
	});
	$(document).on("click", ".academic-strip-next", function () {
		const track = $(this).closest(".academic-photo-strip").find(".academic-photo-strip-track")[0];
		if (track) track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
	});

	const experiencePhotoModalEl = document.getElementById("experiencePhotoModal");
	const experiencePhotoModal = experiencePhotoModalEl
		? new bootstrap.Modal(experiencePhotoModalEl)
		: null;

	let experienceGalleryImages = [];
	let experienceGalleryIndex = 0;

	function getExperienceBlockImages(clickedImg) {
		return clickedImg
			.closest(".academic-activity-block")
			.find(".academic-photo-img")
			.map(function () {
				return {
					src: $(this).attr("src"),
					alt: $(this).attr("alt") || "",
				};
			})
			.get();
	}

	function updateExperiencePhotoModal() {
		const total = experienceGalleryImages.length;
		const current = experienceGalleryImages[experienceGalleryIndex];
		if (!current || total === 0) return;

		$("#experiencePhotoModalImg").attr({
			src: current.src,
			alt: current.alt,
		});
		$("#experiencePhotoModalLabel").text(current.alt);
		$("#experiencePhotoModalCounter").text(`${experienceGalleryIndex + 1} / ${total}`);

		const showNav = total > 1;
		$("#experiencePhotoModalPrev").prop("disabled", !showNav || experienceGalleryIndex === 0).toggle(showNav);
		$("#experiencePhotoModalNext")
			.prop("disabled", !showNav || experienceGalleryIndex === total - 1)
			.toggle(showNav);
		$("#experiencePhotoModalCounter").toggle(showNav);
	}

	function openExperiencePhotoModal(images, startIndex) {
		if (!experiencePhotoModal || !images.length) return;

		experienceGalleryImages = images;
		experienceGalleryIndex = startIndex;
		updateExperiencePhotoModal();
		experiencePhotoModal.show();
	}

	$("#experiencesContent").on("click", ".academic-photo-img", function () {
		const images = getExperienceBlockImages($(this));
		const startIndex = images.findIndex((item) => item.src === $(this).attr("src"));
		openExperiencePhotoModal(images, startIndex >= 0 ? startIndex : 0);
	});

	$("#experiencePhotoModalPrev").on("click", function () {
		if (experienceGalleryIndex > 0) {
			experienceGalleryIndex -= 1;
			updateExperiencePhotoModal();
		}
	});

	$("#experiencePhotoModalNext").on("click", function () {
		if (experienceGalleryIndex < experienceGalleryImages.length - 1) {
			experienceGalleryIndex += 1;
			updateExperiencePhotoModal();
		}
	});

	$(document).on("keydown", function (e) {
		if (!experiencePhotoModalEl || !experiencePhotoModalEl.classList.contains("show")) return;

		if (e.key === "ArrowLeft") {
			$("#experiencePhotoModalPrev").trigger("click");
		} else if (e.key === "ArrowRight") {
			$("#experiencePhotoModalNext").trigger("click");
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

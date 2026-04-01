function navCode() {

	//NAV CODE
	const menuIcon = document.querySelector('.menu');
	const cancelMenuIcon = document.querySelector('.canceli');
	const mobileNavbar = document.querySelector('.mnav');
	const bodySelect = document.querySelector('body');


	menuIcon.addEventListener('click', () => {

		mobileNavbar.classList.add('menu-active');
		document.querySelector('html').style.overflow = "hidden";
	});

	cancelMenuIcon.addEventListener('click', () => {

		mobileNavbar.classList.remove('menu-active');
		document.querySelector('html').style.overflow = "scroll";
	});

	const mobileNavLinks = document.querySelectorAll('.mlinks');

	mobileNavLinks.forEach((link) => {

		link.addEventListener('click', () => {
			setTimeout(function () {

				mobileNavbar.classList.remove('menu-active');
				document.querySelector('html').style.overflow = "scroll";
			}, 300);
		});
	});

};
navCode();

function customCursorNew() {
	const coords = { x: 0, y: 0 };
	const circles = document.querySelectorAll(".circle");
	const hero = document.querySelector(".hero");

	const colors = [
		"#2776B7", "#2f7fc4", "#3b8bcf", "#4a98d8",
		"#5aa4e0", "#6fb1e7", "#84bdec", "#9bc9f0",
		"#b2d5f3", "#c7e1f6", "#d9ecf9", "#eaf6fc"
	];

	let isLightBG = false;
	let isInsideHero = false;

	// 🔥 Color adjust
	function adjustColor(hex, amount) {
		let col = hex.replace("#", "");
		let num = parseInt(col, 16);

		let r = (num >> 16) + amount;
		let g = ((num >> 8) & 0x00FF) + amount;
		let b = (num & 0x0000FF) + amount;

		r = Math.max(Math.min(255, r), 0);
		g = Math.max(Math.min(255, g), 0);
		b = Math.max(Math.min(255, b), 0);

		return `rgb(${r}, ${g}, ${b})`;
	}

	// 🔥 Detect if inside hero
	function detectHero() {
		const rect = hero.getBoundingClientRect();
		isInsideHero =
			coords.y >= rect.top && coords.y <= rect.bottom;
	}

	// 🔥 Detect background (ONLY if not in hero)
	function detectBackground() {
		if (isInsideHero) return;

		const el = document.elementFromPoint(coords.x, coords.y);
		if (!el) return;

		const bg = getComputedStyle(el).backgroundColor;
		const rgb = bg.match(/\d+/g);
		if (!rgb) return;

		const brightness =
			(parseInt(rgb[0]) * 299 +
				parseInt(rgb[1]) * 587 +
				parseInt(rgb[2]) * 114) / 1000;

		isLightBG = brightness > 150;
	}

	// 🔥 Apply colors
	function updateColors() {
		circles.forEach((circle, index) => {
			const baseColor = colors[index % colors.length];

			let adjusted;

			if (isInsideHero) {
				// 🎯 FORCE DARK in hero
				adjusted = adjustColor(baseColor, -170);
			} else {
				// 🎯 Auto outside hero
				adjusted = isLightBG
					? adjustColor(baseColor, -170)
					: adjustColor(baseColor, +200);
			}

			circle.style.backgroundColor = adjusted;
		});
	}

	// 🔥 Unified update
	function updateAll() {
		detectHero();
		detectBackground();
		updateColors();
	}

	// 🔥 Mouse move
	window.addEventListener("mousemove", (e) => {
		coords.x = e.clientX;
		coords.y = e.clientY;
		updateAll();
	});

	// 🔥 FIX: scroll update
	window.addEventListener("scroll", updateAll);

	// animation
	circles.forEach((circle) => {
		circle.x = 0;
		circle.y = 0;
	});

	function animateCircles() {
		let x = coords.x;
		let y = coords.y;

		circles.forEach(function (circle, index) {
			circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${(circles.length - index) / circles.length})`;

			circle.x = x;
			circle.y = y;

			const nextCircle = circles[index + 1] || circles[0];
			x += (nextCircle.x - x) * 0.3;
			y += (nextCircle.y - y) * 0.3;
		});

		requestAnimationFrame(animateCircles);
	}

	animateCircles();
}

customCursorNew();

function soundPlayer() {

	//SOUND PLAYER CODE
	const themeAudio = new Audio('./assets/theme.mp3');
	themeAudio.loop = true;
	themeAudio.volume = 0.15;
	themeAudio.pause();

	const soundBtn = document.querySelector('.sound-lottie');
	const lottie = document.querySelector('.onoffbtn');
	const soundMain = document.querySelector('.sound-main');


	let soundPlaying = false;

	soundBtn.addEventListener('click', () => {

		if (!soundPlaying) {

			themeAudio.play();
			soundMain.innerHTML = `<dotlottie-wc src="https://lottie.host/cba0e2ca-ef96-4592-be25-b0b6d7b6e52a/CxboA3pfnw.lottie" speed="1"
			style="width: 60px; height: 60px " mode="forward" loop autoplay class="onoffbtn"></dotlottie-wc>`





			soundPlaying = true;

		} else {

			themeAudio.pause();
			//improve the code, and change some css
			soundMain.innerHTML = `<dotlottie-wc src="https://lottie.host/cba0e2ca-ef96-4592-be25-b0b6d7b6e52a/CxboA3pfnw.lottie" speed="1"
			style="width: 60px; height: 60px " mode="forward" loop class="onoffbtn"></dotlottie-wc>`


			soundPlaying = false;

		}

	});


};
soundPlayer();

function gsapWordScrollReveal() {
	// GSAP WORD SCROLL REVEAL

	gsap.registerPlugin(ScrollTrigger, SplitText);

	const split = new SplitText(".mainpbtext", {
		type: "words"
	});

	const words = split.words;

	gsap.set(words, {
		opacity: 0.2
	});

	gsap.to(words, {
		opacity: 1,
		stagger: {
			each: 0.5
		},
		ease: "none",
		scrollTrigger: {
			trigger: ".problemtxt",
			start: "top top",
			end: "+=200%",
			scrub: true,
			pin: true,

		}
	});

};
gsapWordScrollReveal();

function tApSectionFunctionality() {
	// TAP SECTION FUNCTIONALITY

	const buttons = document.querySelectorAll(".btns");
	const tImage = document.querySelector(".tmainimg img");
	const tMainTxt = document.querySelector(".tmaintxt");

	const tapContent = [
		{
			img: "./assets/HT/we innovatet.webp",
			text: "We deal the complexity of modern web trends and technologies with innovative approaches and measures, so that it can reach everyone regardless of their current stature."
		},
		{
			img: "./assets/HT/we revolutionizet.webp",
			text: "We refine and utilize complex revolutionary technologies into thoughtful, elegant solutions, and help brands step into the future of the web with confidence."
		},
		{
			img: "./assets/HT/we servet.webp",
			text: "We ensure that your brand or personal presence doesn’t remain left out amongst the crowd and dirt. So, you can tell your story the way it is, without noise."
		}
	];

	buttons.forEach((btn, index) => {

		btn.addEventListener("click", () => {

			// activate correct button
			const btnClickAudio = new Audio('./assets/HT/sfxclickt.mp3');
			btnClickAudio.volume = 0.2;

			buttons.forEach(b => b.classList.remove("btnactive"));
			btn.classList.add("btnactive");
			btnClickAudio.play();

			// change content
			tImage.src = tapContent[index].img;
			tMainTxt.innerHTML = tapContent[index].text;

			// animation
			gsap.from(tImage, {
				opacity: 0,
				x: -60,
				duration: 1.1,
				ease: "power2.out"
			});

			gsap.from(tMainTxt, {
				opacity: 0,
				x: 60,
				duration: 1.1,
				ease: "power2.out",
				onComplete: () => {
					tImage.style.opacity = "1";
					tMainTxt.style.opacity = ".4";
				}
			});

		});

	});

	//Mobile tAP section

	const tBtnOne = document.querySelector('.btnt1');
	const tBtnTwo = document.querySelector('.btnt2');
	const tBtnThree = document.querySelector('.btnt3');


	tBtnOne.addEventListener('click', () => {

		tBtnOne.classList.toggle('btnactive');
		tBtnTwo.classList.remove('btnactive');
		tBtnThree.classList.remove('btnactive');
		tImage.src = "./assets/HT/we innovatet.webp";
		tMainTxt.innerHTML = "We deal the complexity of modern web trends and technologies with innovative approaches and measures, so that it can reach everyone regardless of their current stature.";

		gsap.from(tImage, {
			opacity: 0,
			x: -60,
			stagger: 0.1,
			duration: 1.5,
			ease: "power2.out"
		});

		gsap.from(tMainTxt, {
			opacity: 0,
			x: 60,
			stagger: 0.1,
			duration: 1.5,
			ease: "power2.out"
		});

		function opacityFix() {

			tImage.style.opacity = '1';
			tMainTxt.style.opacity = '.4';
			tMainTxt.style.transform = 'translate(0px, 0px);'
			tImage.style.transform = 'translate(0px, 0px);'
		};


		setTimeout(opacityFix, 1501);

	})

	tBtnTwo.addEventListener('click', () => {

		tBtnTwo.classList.toggle('btnactive');
		tBtnOne.classList.remove('btnactive');
		tBtnThree.classList.remove('btnactive');
		tImage.src = "./assets/HT/we revolutionizet.webp";
		tMainTxt.innerHTML = "We refine and utilize complex revolutionary technologies into thoughtful, elegant solutions, and help brands step into the future of the web with confidence.";

		gsap.from(tImage, {
			opacity: 0,
			x: -60,
			stagger: 0.1,
			duration: 1.5,
			ease: "power2.out"
		});

		gsap.from(tMainTxt, {
			opacity: 0,
			x: 60,
			stagger: 0.1,
			duration: 1.5,
			ease: "power2.out"
		});
		function opacityFix() {

			tImage.style.opacity = '1';
			tMainTxt.style.opacity = '.4';
			tMainTxt.style.transform = 'translate(0px, 0px);'
			tImage.style.transform = 'translate(0px, 0px);'
		};


		setTimeout(opacityFix, 1501);
	})

	tBtnThree.addEventListener('click', () => {

		tBtnThree.classList.toggle('btnactive');
		tBtnOne.classList.remove('btnactive');
		tBtnTwo.classList.remove('btnactive');
		tImage.src = "./assets/HT/we servet.webp";
		tMainTxt.innerHTML = "We ensure that your brand or personal presence doesn’t remain left out amongst the crowd and dirt. So, you can tell your story the way it is, without noise.";

		gsap.from(tImage, {
			opacity: 0,
			x: -60,
			stagger: 0.1,
			duration: 1.5,
			ease: "power2.out"
		});

		gsap.from(tMainTxt, {
			opacity: 0,
			x: 60,
			stagger: 0.1,
			duration: 1.5,
			ease: "power2.out"
		});
		function opacityFix() {

			tImage.style.opacity = '1';
			tMainTxt.style.opacity = '.4';
			tMainTxt.style.transform = 'translate(0px, 0px);'
			tImage.style.transform = 'translate(0px, 0px);'
		};


		setTimeout(opacityFix, 1501);
	})
};
tApSectionFunctionality();

function workSectionFunctionality() {

	//WORK SECTION
	const wsb1Audio = new Audio('./assets/HT/sfxacfastt.mp3');
	wsb1Audio.volume = 0.05;
	const wsb2Audio = new Audio('./assets/HT/sfxacfastt.mp3');
	wsb2Audio.volume = 0.05;
	const wsb3Audio = new Audio('./assets/HT/sfxacfastt.mp3');
	wsb3Audio.volume = 0.05;

	function hoverIntent(el, callback, delay = 0.3) {
		let t;

		el.addEventListener("mouseenter", () => {
			t = gsap.delayedCall(delay, callback);
		});

		el.addEventListener("mouseleave", () => t && t.kill());
	}

	hoverIntent(document.querySelector(".wsb1"), () => wsb1Audio.play());
	hoverIntent(document.querySelector(".wsb2"), () => wsb2Audio.play());
	hoverIntent(document.querySelector(".wsb3"), () => wsb3Audio.play());

};
workSectionFunctionality();

function cardFunctionality() {


	//CARD FUNCTIONALITY

	const cardContainer = document.querySelector(".card-container");
	const stickyHeader = document.querySelector(".sticky-header");
	const cards = document.querySelectorAll(".card");

	let isGapAnimationCompleted = false;
	let isFlipAnimationCompleted = false;

	/* --------------------------
	 Animation timelines
	 -------------------------- */
	// gap timeline - creates visual gap + minor offsets + border-radius changes
	const gapTl = gsap.timeline({ paused: true });
	gapTl
		.to(cardContainer, { gap: 30, duration: 1, ease: "power3.out" }, 0)
		.to("#card1", { x: -10, duration: 1, ease: "power3.out" }, 0)
		.to("#card3", { x: 10, duration: 1, ease: "power3.out" }, 0)
		.to(cards, { borderRadius: "20px", duration: 1, ease: "power3.out" }, 0);

	// gapTl.play();

	// flip timeline - rotates cards and adds z/position offsets for outer cards
	const flipTl = gsap.timeline({ paused: true });
	flipTl
		.to(
			".card",
			{
				rotationY: 180,
				duration: 1,
				ease: "power3.inOut",
				stagger: 0.1,
				transformOrigin: "center center"
			},
			0
		)
		.to(
			["#card1", "#card3"],
			{
				y: 30,
				rotationZ: (i) => (i === 0 ? -15 : 15),
				duration: 1,
				ease: "power3.inOut"
			},
			0
		);

	// flipTl.play();

	/* --------------------------
	 Helper - Functions
	 -------------------------- */
	function setDefaults() {
		// remove inline styles we control (safe-reset)
		document
			.querySelectorAll(".card, .card-container, .sticky-header h1")
			.forEach((el) => {
				if (el && el.style) el.style.cssText = "";
			});

		// reset timeline states
		gapTl.pause(0);
		flipTl.pause(0);
		isGapAnimationCompleted = false;
		isFlipAnimationCompleted = false;
	}

	function updateHeader(progress) {
		// header appears between 0.1 - 0.35
		if (progress >= 0.1 && progress <= 0.35) {
			const headerProgress = gsap.utils.mapRange(0.1, 0.35, 0, 1, progress);
			const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
			const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);
			gsap.set(stickyHeader, { y: yValue, opacity: opacityValue });
		} else if (progress < 0.1) {
			gsap.set(stickyHeader, { y: 40, opacity: 0 });
		} else {
			gsap.set(stickyHeader, { y: 0, opacity: 1 });
		}
	}

	function getEffectiveViewportWidth() {
		return Math.min(window.innerWidth, 1440);
	}

	function updateCardWidth(progress) {

		const viewport = getEffectiveViewportWidth();

		if (progress <= 0.35) {

			const widthPercentage = gsap.utils.mapRange(0, 0.35, 75, 60, progress);

			// convert % to px using clamped viewport
			const baseWidth = viewport * (widthPercentage / 100);

			gsap.set(cardContainer, {
				width: `${baseWidth}px`
			});

		} else {

			const baseWidth = viewport * 0.60;

			gsap.set(cardContainer, {
				width: `${baseWidth}px`
			});

		}
	}

	function handleGapAnimation(progress) {
		// trigger gap animation when crossing 0.35
		if (progress >= 0.45 && !isGapAnimationCompleted) {
			gapTl.play();
			isGapAnimationCompleted = true;
		} else if (progress < 0.45 && isGapAnimationCompleted) {
			gapTl.reverse();
			isGapAnimationCompleted = false;
		}
	}

	function handleFlipAnimation(progress) {
		// trigger flip near 0.5
		if (progress >= 0.7 && !isFlipAnimationCompleted) {
			flipTl.play();
			isFlipAnimationCompleted = true;
		} else if (progress < 0.7 && isFlipAnimationCompleted) {
			flipTl.reverse();
			isFlipAnimationCompleted = false;
		}
	}

	/* --------------------------
	 Main - Function
	 -------------------------- */
	function initAnimations() {


		let cardScrollTrigger;
		// kill old triggers & reset DOM inline styles
		if (cardScrollTrigger) {
			cardScrollTrigger.kill();
		}
		setDefaults();

		const mm = gsap.matchMedia();

		// small screens - don't pin, simply reset styles
		mm.add("(max-width: 999px)", () => {
			// ensure header & container are back to default styles
			setDefaults();
			return () => { };
		});

		// desktop: pinned behaviour
		mm.add("(min-width: 1225px)", () => {
			cardScrollTrigger = ScrollTrigger.create({
				trigger: ".sticky",
				start: "top top",
				end: `+=${window.innerHeight * 2}px`,
				scrub: 1,
				pin: true,
				pinSpacing: true,
				onUpdate(self) {
					const progress = self.progress;

					// break responsibilities into helpers for clarity
					updateHeader(progress);
					updateCardWidth(progress);
					handleGapAnimation(progress);
					handleFlipAnimation(progress);
				}
			});

			// return cleanup for this mm scope if needed
			return () => cardScrollTrigger.kill();
		});

		// return function used by outer code to revert matchMedia if required
		return () => mm.revert();
	}

	/* --------------------------
	 re-init (debounced)
	 -------------------------- */
	initAnimations();
};
cardFunctionality();

//GSAP SMOOTH SCROLL TO SECTIONS
document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();

		const target = document.querySelector(link.getAttribute('href'));

		gsap.to(window, {
			duration: 1,
			scrollTo: {
				y: target,
				offsetY: 50 // adjust if needed
			},
			ease: "power2.out"
		});
	});
});


//CLICKING AUDIO
const clickSound = new Audio("./assets/HT/sfxallclickt.mp3");
clickSound.volume = 0.1;

// 🎯 elements where sound should NOT play
const excludedSelectors = [
	".btns",
	".gitbtnname",
	".seeworkbtn"
];

document.addEventListener("click", (e) => {
	const isExcluded = excludedSelectors.some(selector =>
		e.target.closest(selector)
	);

	if (!isExcluded) {
		clickSound.currentTime = 0; // restart sound if rapid clicks
		clickSound.play();
	}
});

//GSAP Playground


class MaskedLineReveal {
	constructor() {
		this.init();
	}

	init() {
		gsap.utils.toArray(".mask-reveal").forEach((el) => {

			// Split into lines
			const split = new SplitText(el, {
				type: "lines",
				linesClass: "line"
			});

			// Wrap each line with inner div
			split.lines.forEach((line) => {
				const wrapper = document.createElement("div");
				wrapper.classList.add("line-inner");

				wrapper.innerHTML = line.innerHTML;
				line.innerHTML = "";
				line.appendChild(wrapper);
			});

			// Animate inner lines (NOT the mask)
			gsap.from(el.querySelectorAll(".line-inner"), {
				yPercent: 100,
				duration: 1.2,
				stagger: 0.1,
				delay: .1,
				ease: "expo.out",
				scrollTrigger: {
					trigger: el,
					start: "top 85%"
				}

			});
		});
	}
}

new MaskedLineReveal();


class GSAPTextPro {
	constructor() {
		this.init();
	}
	init() {
		this.blurReveal();
	}

	blurReveal() {
		gsap.utils.toArray(".blur-reveal").forEach((el) => {
			gsap.fromTo(
				el,
				{ filter: "blur(12px)", opacity: 0 },
				{
					filter: "blur(0px)",
					opacity: 1,
					duration: 1,
					delay: .1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: el,
						start: "top 85%"
					}
				}
			);
		});
	}

}

new GSAPTextPro();

gsap.to(".wsmainmask", {


	height: '0%',
	delay: 0,
	duration: .5,
	scrub: true,
	ease: "expo.out",
	scrollTrigger: {
		trigger: ".wsmain",
		start: "top 70%",
		toggleActions: "play none none none", // run once
	}
});

gsap.from(".tmainimg img", {


	x: '-20%',
	opacity: 0,
	delay: 0,
	duration: 2,
	scrub: true,
	ease: "expo.out",
	scrollTrigger: {
		trigger: ".tapmain",
		start: "top 70%",
		toggleActions: "play none none none", // run once
	}
});



//counter

document.querySelectorAll(".counter").forEach((el) => {
	const target = +el.getAttribute("data-target");

	let obj = { val: 0 };

	gsap.to(obj, {
		val: target,
		duration: 2,
		ease: "power2.out",

		onUpdate: () => {
			el.textContent = Math.floor(obj.val);
		},

		scrollTrigger: {
			trigger: el,
			start: "top 80%",
			toggleActions: "play none none none", // run once
		}
	});
});


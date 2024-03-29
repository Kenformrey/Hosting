$(function () {
	let header = $('#header')
	let intro = $('#intro')
	let introH = intro.innerHeight()
	let scrollPos = $(window).scrollTop()

	checkScroll(scrollPos, introH)

	$(window).on('scroll resize', function () {
		introH = intro.innerHeight()
		scrollPos = $(this).scrollTop()
		checkScroll(scrollPos, introH)
	})

	function checkScroll(scrollPos, introH) {
		if (scrollPos > introH) {
			header.addClass('fixed')
		} else {
			header.removeClass('fixed')
		}
	}
})

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		)
	},
}

// Menu Burger
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('_active')
	})
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
if (menuLinks.length > 0) {
	menuLinks.forEach((menuLink) => {
		menuLink.addEventListener('click', onMenuLinkClick)
	})
	function onMenuLinkClick(e) {
		const menuLink = e.target
		// Проверка заполнен ли данный атрибут
		// и существуте ли объект на который ссылается данный атрибут
		if (
			menuLink.dataset.goto &&
			document.querySelector(menuLink.dataset.goto)
		) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto) // Object
			// Местоположение на странице в px + кол-во прокрученный px(pageYOffset)
			// - высота шапки
			const gotoBlockValue =
				gotoBlock.getBoundingClientRect().top +
				pageYOffset -
				document.querySelector('header').offsetHeight
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock')
				iconMenu.classList.remove('_active')
				menuBody.classList.remove('_active')
			}

			// Плавная прокрутка
			window.scrollTo({
				top: gotoBlockValue, // прокрутка сверху
				behavior: 'smooth', // прокрутка будет плавной
			})
			e.preventDefault()
		}
	}
}


function testWebP(callback) {
	var webP = new Image()
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2)
	}
	webP.src =
		'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp')
	} else {
		document.querySelector('body').classList.add('no-webp')
	}
})

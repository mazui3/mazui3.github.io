/*
 * Copyright (c) 2022 Marketify
 * Author: Marketify
 * This file is made for CURRENT TEMPLATE
*/

jQuery(document).ready(function(){

	"use strict";

	// here all ready functions

	tokyo_tm_modalbox();
	tokyo_tm_page_transition();
	tokyo_tm_trigger_menu();
	tokyo_tm_service_popup();
	tokyo_tm_modalbox_news();
	tokyo_tm_modalbox_portfolio();
	tokyo_tm_gallery_lightbox();
	tokyo_tm_my_progress();
	tokyo_tm_projects();
	tokyo_tm_portfolio();
	tokyo_tm_gallery();
	tokyo_tm_cursor();
	tokyo_tm_imgtosvg();
	tokyo_tm_popup();
	tokyo_tm_data_images();
	// tokyo_tm_contact_form();
	tokyo_tm_owl_carousel();

	jQuery(window).load('body', function(){
		tokyo_tm_my_load();
	});

});

// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

// -----------------------------------------------------
// --------------------   MODALBOX    ------------------
// -----------------------------------------------------

function tokyo_tm_modalbox(){
	"use strict";

	jQuery('.tokyo_tm_all_wrap').prepend('<div class="tokyo_tm_modalbox"><div class="box_inner"><div class="close"><a href="#"><i class="icon-cancel"></i></a></div><div class="description_wrap"></div></div></div>');
}

// -----------------------------------------------------
// -------------   PAGE TRANSITION    ------------------
// -----------------------------------------------------

function tokyo_tm_page_transition(){

	"use strict";

	var section 		= jQuery('.tokyo_tm_section');
	var allLi 			= jQuery('.transition_link li');
	var button			= jQuery('.transition_link a');
	var wrapper 		= jQuery('.tokyo_tm_all_wrap');
	var enter	 		= wrapper.data('enter');
	var exit		 	= wrapper.data('exit');

	button.on('click',function(){
		var element 	= jQuery(this);
		var href		= element.attr('href');
		if(element.parent().hasClass('tokyo_tm_button')){
			jQuery('.menu .transition_link a[href="'+href+'"]').trigger('click');
			hashtag();
			return false;
		}
		var sectionID 	= jQuery(href);
		var parent	 	= element.closest('li');
			if(!parent.hasClass('active')) {
				allLi.removeClass('active');
				wrapper.find(section).removeClass('animated '+enter);
				if(wrapper.hasClass('opened')) {
					wrapper.find(section).addClass('animated '+exit);
				}
				parent.addClass('active');
				wrapper.addClass('opened');
				wrapper.find(sectionID).removeClass('animated '+exit).addClass('animated '+enter);
				jQuery(section).addClass('hidden');
				jQuery(sectionID).removeClass('hidden').addClass('active');
			}
		return false;
	});
}

// -----------------------------------------------------
// ---------------   TRIGGER MENU    -------------------
// -----------------------------------------------------

function tokyo_tm_trigger_menu(){

	"use strict";

	var hamburger 		= jQuery('.tokyo_tm_topbar .trigger .hamburger');
	var mobileMenu		= jQuery('.tokyo_tm_mobile_menu');
	var mobileMenuList	= jQuery('.tokyo_tm_mobile_menu ul li a');

	hamburger.on('click',function(){
		var element 	= jQuery(this);

		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.removeClass('opened');
		}else{
			element.addClass('is-active');
			mobileMenu.addClass('opened');
		}
		return false;
	});

	mobileMenuList.on('click',function(){
		jQuery('.tokyo_tm_topbar .trigger .hamburger').removeClass('is-active');
		mobileMenu.removeClass('opened');
		return false;
	});
}

// -------------------------------------------------
// -------------  SERVICE POPUP  -------------------
// -------------------------------------------------

function tokyo_tm_service_popup(){

	"use strict";

	var modalBox		= jQuery('.tokyo_tm_modalbox');
	var button			= jQuery('.tokyo_tm_services .tokyo_tm_full_link');
	var closePopup		= modalBox.find('.close');

	button.on('click',function(){
		var element = jQuery(this);
		var parent	= element.closest('.tokyo_tm_services .list ul li');
		var elImage	= parent.find('.popup_service_image').attr('src');
		var title	= parent.find('.title').text();
		var content = parent.find('.service_hidden_details').html();
		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(content);
		modalBox.find('.service_popup_informations').prepend('<div class="image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="'+elImage+'"></div></div>');
		tokyo_tm_data_images();
		modalBox.find('.service_popup_informations .image').after('<div class="main_title"><h3>'+title+'</h3></div>');
		return false;
	});
	closePopup.on('click',function(){
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		return false;
	});
}

// -------------------------------------------------
// -------------  MODALBOX NEWS  -------------------
// -------------------------------------------------

function tokyo_tm_modalbox_news(){

	"use strict";

	var modalBox	= jQuery('.tokyo_tm_modalbox');
	var list 		= jQuery('.tokyo_tm_news ul li');
	var closePopup	= modalBox.find('.close');

	list.each(function(){
		var element 	= jQuery(this);
		var details 	= element.find('.list_inner').html();
		var buttons 	= element.find('.details .title a,.tokyo_tm_full_link,.tokyo_tm_read_more a');
		var mainImage	= element.find('.main');
		var imgData		= mainImage.data('img-url');
		var title		= element.find('.title');
		var titleHref	= element.find('.title a').html();
		buttons.on('click',function(){
			jQuery('body').addClass('modal');
			modalBox.addClass('opened');
			modalBox.find('.description_wrap').html(details);
			mainImage = modalBox.find('.main');
			mainImage.css({backgroundImage: 'url('+imgData+')'});
			title = modalBox.find('.title');
			title.html(titleHref);
			tokyo_tm_imgtosvg();
			return false;
		});
	});
	closePopup.on('click',function(){
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		jQuery('body').removeClass('modal');
		return false;
	});
}

// -------------------------------------------------
// -------------  MODALBOX PORTFOLIO  --------------
// -------------------------------------------------

function tokyo_tm_modalbox_portfolio(){

	"use strict";

	var modalBox	= jQuery('.tokyo_tm_modalbox');
	var button		= jQuery('.tokyo_tm_portfolio .popup_info');

	button.on('click',function(){
		var element 	= jQuery(this);
		var parent		= element.closest('li');
		var image		= parent.find('.abs_image').data('img-url');
		var details 	= parent.find('.details_all_wrap').html();
		var title 		= parent.find('.entry').data('title');
		var category 	= parent.find('.entry').data('category');
		console.log(image);

		modalBox.addClass('opened');
		modalBox.find('.description_wrap').html(details);
		modalBox.find('.popup_details').prepend('<div class="top_image"><img src="img/thumbs/4-2.jpg" alt="" /><div class="main" data-img-url="'+image+'"></div></div>');
		modalBox.find('.popup_details .top_image').after('<div class="portfolio_main_title"><h3>'+title+'</h3><span>'+category+'</span><div>');
		tokyo_tm_data_images();
		return false;
	});
}

// -------------------------------------------------
// -------------  GALLERY LIGHTBOX  ----------------
// -------------------------------------------------

// Full screen viewer, deliberately NOT the tokyo_tm_modalbox: the image
// takes the whole stage on the left and a narrow column on the right holds
// the description / date / optional fields.
// One wall item can carry a group of images that share a single set of
// informations. The wall only shows the cover, the group is walked through
// with the arrows, the arrow keys or a swipe.

function tokyo_tm_gallery_lightbox(){

	"use strict";

	var wall = jQuery('.tokyo_tm_gallery');

	if(!wall.length){
		return;
	}

	jQuery('.tokyo_tm_all_wrap').prepend(
		'<div class="tokyo_tm_gallery_lightbox">'+
			'<div class="lightbox_inner">'+
				'<div class="lightbox_stage">'+
					'<div class="lightbox_close"><a href="#"><i class="icon-cancel"></i></a></div>'+
					'<a class="lightbox_nav prev" href="#"><i class="icon-left-open"></i></a>'+
					'<a class="lightbox_nav next" href="#"><i class="icon-right-open"></i></a>'+
					'<img class="lightbox_image" src="" alt="" />'+
					'<div class="lightbox_counter"><span class="current"></span> / <span class="total"></span></div>'+
				'</div>'+
				'<div class="lightbox_side">'+
					'<div class="lightbox_head"><h3></h3><span class="category"></span></div>'+
					'<div class="lightbox_desc"></div>'+
					'<div class="lightbox_meta"></div>'+
				'</div>'+
			'</div>'+
		'</div>'
	);

	var box		 = jQuery('.tokyo_tm_gallery_lightbox');
	var stageImg = box.find('.lightbox_image');
	var group	 = [];
	var index	 = 0;

	function render(){
		if(!group.length){
			return;
		}
		stageImg.attr('src',group[index]);
		box.find('.lightbox_counter .current').text(index + 1);
		box.find('.lightbox_counter .total').text(group.length);
	}

	function step(dir){
		if(group.length < 2){
			return;
		}
		index = (index + dir + group.length) % group.length;
		render();
	}

	function close(){
		box.removeClass('opened');
		jQuery('body').removeClass('modal');
		stageImg.attr('src','');
		group = [];
	}

	wall.find('.gallery_popup').on('click',function(){
		var element	= jQuery(this);
		var parent	= element.closest('.gallery_list > li');
		var details	= parent.find('.gallery_details_wrap');
		var entry	= parent.find('.entry');

		group = [];
		details.find('.gallery_group > li').each(function(){
			group.push(jQuery(this).data('img'));
		});
		// no group declared -> the wall image is the only one
		if(!group.length){
			group.push(element.find('img').attr('src'));
		}
		index = 0;

		box.find('.lightbox_head h3').text(entry.data('title'));
		box.find('.lightbox_head .category').text(entry.data('category'));
		box.find('.lightbox_desc').empty().append(details.find('.gallery_desc').clone());
		box.find('.lightbox_meta').empty().append(details.find('.gallery_meta').clone());
		box.toggleClass('single_image',group.length < 2);

		render();
		jQuery('body').addClass('modal');
		box.addClass('opened');
		return false;
	});

	box.find('.lightbox_nav.prev').on('click',function(){
		step(-1);
		return false;
	});
	box.find('.lightbox_nav.next').on('click',function(){
		step(1);
		return false;
	});
	box.find('.lightbox_close a').on('click',function(){
		close();
		return false;
	});

	// clicking the empty space around the image closes the viewer
	box.find('.lightbox_stage').on('click',function(e){
		if(jQuery(e.target).closest('.lightbox_image,.lightbox_nav,.lightbox_close').length){
			return;
		}
		close();
	});

	jQuery(document).on('keydown',function(e){
		if(!box.hasClass('opened')){
			return;
		}
		if(e.keyCode === 27){close();}
		if(e.keyCode === 37){step(-1);}
		if(e.keyCode === 39){step(1);}
	});

	// swipe on touch devices
	var touchX = null;
	box.find('.lightbox_stage').on('touchstart',function(e){
		touchX = e.originalEvent.changedTouches[0].clientX;
	}).on('touchend',function(e){
		if(touchX === null){
			return;
		}
		var diff = e.originalEvent.changedTouches[0].clientX - touchX;
		if(Math.abs(diff) > 50){
			step(diff < 0 ? 1 : -1);
		}
		touchX = null;
	});
}

// -------------------------------------------------
// -------------------  GALLERY  -------------------
// -------------------------------------------------

// filterable. no isotope here: the wall is a css multi-column layout,
// so hiding an item is enough and the columns reflow on their own.
// The survivors then slide to their new spots with a FLIP pass, which is
// what gives the same feel as the isotope powered DiskDrive wall.

function tokyo_tm_gallery(){

	"use strict";

	var list	= jQuery('.tokyo_tm_gallery .gallery_list > li');
	var filter	= jQuery('.tokyo_tm_gallery .gallery_filter ul');

	if(!filter.length){
		return;
	}

	// same timing isotope uses on the DiskDrive wall
	var duration = 400;

	// getBoundingClientRect of every item, null while it is display:none
	function positions(){
		var map = [];
		list.each(function(i){
			map[i] = this.offsetParent === null ? null : this.getBoundingClientRect();
		});
		return map;
	}

	filter.find('a').on('click',function(){
		var element		= jQuery(this);
		var selector	= element.attr('data-filter');

		// FIRST: where everything sits right now. Read before anything is
		// cleared so a fast second click continues from what is on screen
		// instead of jumping.
		var before = positions();

		// drop whatever the previous run left behind
		list.each(function(){
			this.style.transition	= 'none';
			this.style.transform	= '';
			this.style.opacity		= '';
		});

		filter.find('a').removeClass('current');
		element.addClass('current');

		if(selector === '*'){
			list.removeClass('filtered_out');
		}else{
			list.addClass('filtered_out').filter(selector).removeClass('filtered_out');
		}

		// LAST: the columns have reflowed, read the new resting places
		var after	 = positions();
		var moved	 = [];
		var appeared = [];

		// INVERT: shove everything back to where it just was
		list.each(function(i){
			if(after[i] === null){
				return;					// filtered out, nothing to animate
			}
			if(before[i] === null){
				this.style.opacity = 0;	// was hidden, fade it in where it landed
				appeared.push(this);
				return;
			}
			var dx = before[i].left - after[i].left;
			var dy = before[i].top  - after[i].top;
			if(dx || dy){
				this.style.transform = 'translate('+dx+'px,'+dy+'px)';
				moved.push(this);
			}
		});

		// one forced reflow, so the inverted state above is committed before
		// the transitions below are switched on
		if(list.length){
			list[0].getBoundingClientRect();
		}

		// PLAY: let them travel to the new positions
		jQuery(moved).each(function(){
			this.style.transition	= 'transform '+duration+'ms ease';
			this.style.transform	= '';
		});
		jQuery(appeared).each(function(){
			this.style.transition	= 'opacity '+duration+'ms ease';
			this.style.opacity		= '';
		});

		return false;
	});
}

// -------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

function tokyo_tm_projects() {

	"use strict";

	jQuery('.tokyo_tm_portfolio_animation_wrap').each(function() {
		jQuery(this).on('mouseenter', function() {
			if (jQuery(this).data('title')) {
				jQuery('.tokyo_tm_portfolio_titles').html(jQuery(this).data('title') + '<span class="work__cat">' + jQuery(this).data('category') + '</span>');
				jQuery('.tokyo_tm_portfolio_titles').addClass('visible');
			}

			jQuery(document).on('mousemove', function(e) {
				jQuery('.tokyo_tm_portfolio_titles').css({
					left: e.clientX - 10,
					top: e.clientY + 25
				});
			});
		}).on('mouseleave', function() {
			jQuery('.tokyo_tm_portfolio_titles').removeClass('visible');
		});
	});
}

// filterable

function tokyo_tm_portfolio(){

	"use strict";

	if(jQuery().isotope) {

		// Needed variables
		var list 		 = jQuery('.tokyo_tm_portfolio .portfolio_list');
		var filter		 = jQuery('.tokyo_tm_portfolio .portfolio_filter ul');

		if(filter.length){
			// Isotope Filter
			filter.find('a').on('click', function(){
				var selector = jQuery(this).attr('data-filter');
				list.isotope({
					filter				: selector,
					// plain fade instead of a zoom, to match the Gallery wall.
					// isotope's own hiddenStyle default is
					// {opacity:0, transform:'scale(0.001)'} and that transform
					// is where the zoom in came from, so both are overridden.
					hiddenStyle			: {opacity: 0},
					visibleStyle		: {opacity: 1}
				});
				return false;
			});

			// Change active element class
			filter.find('a').on('click', function() {
				filter.find('a').removeClass('current');
				jQuery(this).addClass('current');
				return false;
			});
		}
	}
}

// -------------------------------------------------
// -------------  PROGRESS BAR  --------------------
// -------------------------------------------------

function tokyo_tm_my_progress(){
	"use strict";

	var list = jQuery('.tokyo_progress .progress_inner');
	list.each(function(){
		var element = jQuery(this);
		var bar		= element.find('.bar_in');
		var number	= element.data('value');
		bar.css({width:number+'%'});
	});

}

// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function tokyo_tm_preloader(){

	"use strict";

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');

	if (!isMobile) {
		setTimeout(function() {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function() {
			preloader.remove();
		}, 2000);

	} else {
		preloader.remove();
	}
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function tokyo_tm_my_load(){

	"use strict";

	var speed	= 500;
	setTimeout(function(){tokyo_tm_preloader();},speed);
}

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function tokyo_tm_cursor(){
    "use strict";

	var myCursor	= jQuery('.mouse-cursor');

	if(myCursor.length){
		if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n, i = 0,
            o = !1;
        window.onmousemove = function (s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
        }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
        }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
        }), e.style.visibility = "visible", t.style.visibility = "visible"
    }
	}
};

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function tokyo_tm_imgtosvg(){

	"use strict";

	jQuery('img.svg').each(function(){

		var jQueryimg 		= jQuery(this);
		var imgClass		= jQueryimg.attr('class');
		var imgURL			= jQueryimg.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function tokyo_tm_popup(){

	"use strict";

	jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-youtube, .popup-vimeo').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});

	jQuery('.soundcloude_link').magnificPopup({
	  type : 'image',
	   gallery: {
		   enabled: true,
	   },
	});
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function tokyo_tm_data_images(){

	"use strict";

	var data			= jQuery('*[data-img-url]');

	data.each(function(){
		var element			= jQuery(this);
		var url				= element.data('img-url');
		element.css({backgroundImage: 'url('+url+')'});
	});
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function tokyo_tm_contact_form(){

	"use strict";

	jQuery(".contact_form #send_message").on('click', function(){

		var name 		= jQuery(".contact_form #name").val();
		var email 		= jQuery(".contact_form #email").val();
		var message 	= jQuery(".contact_form #message").val();
		var subject 	= jQuery(".contact_form #subject").val();
		var success     = jQuery(".contact_form .returnmessage").data('success');

		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields
		if(name===''||email===''||message===''){

			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else{
			// Returns successful data submission message when the entered information is stored in database.
			jQuery.post("modal/contact.php",{ ajax_name: name, ajax_email: email, ajax_message:message, ajax_subject: subject}, function(data) {

				jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


				if(jQuery(".contact_form .returnmessage span.contact_error").length){
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
				}else{
					jQuery(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>");
					jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
				}

				if(data===""){
					jQuery("#contact_form")[0].reset();//To reset form fields on success
				}

			});
		}
		return false;
	});
}

// -----------------------------------------------------
// ----------------    OWL CAROUSEL    -----------------
// -----------------------------------------------------

function tokyo_tm_owl_carousel(){

	"use strict";

	var carousel			= jQuery('.tokyo_tm_testimonials .owl-carousel');

	carousel.owlCarousel({
		loop: true,
		items: 2,
		lazyLoad: false,
		margin: 30,
		autoplay: true,
		autoplayTimeout: 7000,
		dots: false,
		nav: false,
		navSpeed: false,
		responsive : {
			0 : {
				items: 1
			},
			768 : {
				items: 2
			}
		}
	});
}

$(document).ready(function() {
	/* ==========================================================================
   		Pre Loading 
   	   ========================================================================== */
	
	(function(image){
		image.onload = function(){ 
	    	$('body').addClass('ak-loaded');
	 	};
	  	image.src    = "img/background.jpg";
	})(new Image());


	/* ==========================================================================
   		Map
   	   ========================================================================== */

	let mapOptions = {
        center:[40.712776, -74.005974],
        zoom:17,
    }
    let map = new L.map(document.getElementById("map") , mapOptions);
    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a  target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
    map.addLayer(layer);

    let customIcon = {
      iconUrl:"img/map-marker.png",
      iconSize:[57,67]
    }
    let myIcon = L.icon(customIcon);
    let iconOptions = {
        title:"Akordian",
        icon:myIcon
    }
    let marker = new L.Marker([40.712776, -74.005974] , iconOptions);
    marker.addTo(map);


	/* ==========================================================================
   		Testomonial & Client Slider
   	   ========================================================================== */
    
    if($('.client-slider').length){
    	let clientSlider = tns({
		  container: '.client-slider',
		  items:1,
		  gutter: 30,
		  nav: false,
		  speed: 500,
		  slideBy: 'page',
		  loop: false,
		  controls: false,
		  mouseDrag: true,
		  responsive: {
		      640: {
		        items: 2
		      },
		      760: {
		        items: 3
		      },
		      1024: {
		        items: 4
		      },
		      1280: {
		        items: 5
		      },
		    }
		});
    }
    if($('.testomonial-slider').length){
		let testimonialSlider = tns({
		  container: '.testomonial-slider',
		  items: 1,
		  gutter: 1,
		  nav: false,
		  navPosition:'bottom',
		  speed: 500,
		  loop: true,
		  controls: true,
		  controlsContainer: '.testomonial-slider-controls',
		});
	}

	if($('.about-slider').length){
		let aboutSlider = tns({
		  container: '.about-slider',
		  items: 1,
		  gutter: 1,
		  nav: false,
		  speed: 500,
		  loop: true,
		  controls: true,
		  controlsContainer: '.about-slider-controls',
		  onInit: function(info) {
		    info.container.closest('.tns-outer').classList.add('about-slider-outer');
		  }
		});
		aboutSlider.events.on("transitionStart", data => {
		  var {displayIndex} = data;
		  $('.current-slide').text( numberToWords(displayIndex) );
		});
	}	

	/* ==========================================================================
   		Tabs
   	   ========================================================================== */


	$('.tabs-nav li a:not(:first)').addClass('inactive');
	$('.tabs-container').hide();
	$('.tabs-container:first').show();

	$('.tabs-nav li a').on( "click", function(e) {
		e.preventDefault();
	  	let t = $(this).attr('id');
	  	if (skillTimeout !== null) { 
		    clearTimeout(skillTimeout); 
		    skillTimeout = null;
		}
	  	if($('#'+ t + '-content .skill-bar').length){
	  		animateLine();
	  	}
	  	else{
	  		$('.skill-bar ').removeClass('enabled');
	  	}
		if($(this).hasClass('inactive')){
		    $('.tabs-nav li a').addClass('inactive');           
		    $(this).removeClass('inactive');
            $('.tabs-container').hide();
            $('#'+ t + '-content').fadeIn(400);
	 	}

	});

	/* ==========================================================================
   		Line Animations
   	   ========================================================================== */
   	let skillTimeout = null;
	function animateLine(){
		$('hr').each(function(){
			let line = $(this);
			if(line.visible(true)){
				line.addClass('enabled');
			}
		});
		$('.skill-bar').each(function(i){
			let line = $(this);
			if(line.visible(true)){
				skillTimeout = setTimeout(function() {
					line.addClass('enabled');
				}, 250*i);
			}
		});
	}
	$('.content').scroll(function(){
		animateLine();
	})
	
/* ==========================================================================
   	Heading Animations
   ========================================================================== */

	const letters = 'abcdefghijklmnopqrstuvwxyz';
	let interval = null;
	let captionInterval = null;
	let hoverTimeout = null;

	function animateHeading(t){
		let iteration = 0,
			heading = t;
		interval = setInterval(() => {
			heading.text( 
			heading.text().split("")
		      .map((letter, index) => {
		        if(index < iteration) {
		          return heading.data("value")[index];
		        }
		        return letters[Math.floor(Math.random() * 26)]
		      }).join("")
		      );
			if(iteration >= heading.data("value").length){ 
		      clearInterval(interval);
		    }
		    iteration += 1 / 2;
		}, 20);

	}

	function animatecaption(){
		$( '.portfolio-container li figcaption div' ).each(function(){
			let txt = $(this);
			let	container = $(this).parent();
			container.mouseenter(function() {
				if (hoverTimeout !== null) { 
			        clearTimeout(hoverTimeout); 
			        hoverTimeout = null;
			    }
				clearInterval(captionInterval);
				hoverTimeout = setTimeout(function(){ 
					let iter = 0;
					captionInterval = setInterval(() => {
						txt.text( 
						txt.text().split("")
					    .map((letter, index) => {
					        if(index < iter) {
						        return txt.data("value")[index];
						    }
						    return letters[Math.floor(Math.random() * 26)]
						    }).join("")
						);
						if(iter >= txt.data("value").length){ 
						    clearInterval(captionInterval);
						}
						iter += 1 / 2;
					}, 20);
					
				}, 250);
			});
			container.mouseleave(function() {
				if (hoverTimeout !== null) { 
			        clearTimeout(hoverTimeout); 
			        hoverTimeout = null;
			    }
				clearInterval(captionInterval);
			});
		});
	}

	/* ==========================================================================
   		Main Menu / Page Transitions
   	   ========================================================================== */

    $('.page header:not(.page:first-child header)').on( 'click', function() {
    	if(!$(this).parent().hasClass('active')){
    		let oldContent = $(this).parent().siblings('.active'),
	    		newContent = $(this).parent();
			    clearTimeout(skillTimeout); 
	    	$('.active .content').fadeOut( 200, function() {
	    		oldContent.removeClass('active loaded');
	    		newContent.addClass('active');
	    		$('.active hr, .active .skill-bar ').removeClass('enabled');
	    		setTimeout(function(){ 
	    			$('.active .content').fadeIn(400, function(){
	    				newContent.addClass('loaded');
	    			})
	    			animateLine();
	    			animateHeading(newContent.find('.page-header h1'));
	    			window.dispatchEvent(new Event('resize'));
	    			if(newContent.find('.portfolio-container').length){
	    				animatecaption();
	    			}
	    		}, 400);
	  		});
	    }
    });

   	$('.logo').on( 'click', function(e) {
    	e.preventDefault();
    	if(!$(this).parent().parent().hasClass('active')){
    		var oldContent = $(this).parent().parent().siblings('.active'),
	    		newContent = $(this).parent().parent();
	    	$('.active hr, .active .skill-bar ').removeClass('enabled');
	    	$('.active .content').fadeOut( 200, function() {
	    		oldContent.removeClass('active loaded');
	    		newContent.addClass('active');
	    		setTimeout(function(){ 
	    			$('.active .content').fadeIn(400, function(){
	    				newContent.addClass('loaded');
	    			});
	    		}, 400);
	  		});
	    }
    });

    /* ==========================================================================
   		Homepage Text Ticker
   	   ========================================================================== */
    $('.write').typed({
        strings: ["web designer.", "front end developer.", "coffee drinker."],
        typeSpeed: 100,
        backSpeed: 50,
        loop:true,
        startDelay:0,
    });

    /* ==========================================================================
   		Portfolio Filter & Popup
   	   ========================================================================== */
    if($('.portfolio-container').length){
	 	var Shuffle = window.Shuffle;
		var element = document.querySelector('.portfolio-container');
		var shuffleInstance = new Shuffle(element, {
		  itemSelector: 'li',
		  speed: 0
		});
	} 
	$('.portfolio-filter li').on('click',function(e){
		e.preventDefault();
		$('.portfolio-filter li').removeClass('selected');
		$(this).addClass('selected'); 
		var keyword = $(this).attr('data-target');
		shuffleInstance.filter(keyword);
	});
	$('.popup-iframe a').magnificPopup({
        type: 'iframe',
        closeOnContentClick: true,
         callbacks: {
	        close: function() {
			   mouse.removeClass('zoom-out');
			}
		}
	}); 
    $('.popup-image a').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        callbacks: {
	        close: function() {
			   mouse.removeClass('zoom-out');
			}
		}
	});
    $('.portfolio-container li a').click(function(){
    	mouse.addClass('zoom-out');
    });

	/* ==========================================================================
   		Contact Form
   	   ========================================================================== */ 

 	$('#send').on( "click", function() {	
		let valid;	
		valid = validateContact();
		if(valid) {
			jQuery.ajax({
			url: "contact_mail.php",
			data:'userName='+$("#userName").val()+'&userEmail='+$("#userEmail").val()+'&subject='+$("#subject").val()+'&content='+$(content).val(),
			type: "POST",
			success:function(data){
			$("#mail-status").html(data);
			},
			error:function (){}
			});
		}
	});
	function validateContact() {
		let valid = true;	
		$(".demoInputBox").css('background-color','');
		$(".info").html('');
		
		if(!$("#userName").val()) {
			$("#userName-info").html("(Required)");
			valid = false;
		}
		if(!$("#userEmail").val()) {
			$("#userEmail-info").html("(Required)");
			valid = false;
		}
		if(!$("#userEmail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
			$("#userEmail-info").html("(Invalid)");
			valid = false;
		}
		if(!$("#subject").val()) {
			$("#subject-info").html("(Required)");
			valid = false;
		}
		if(!$("#content").val()) {
			$("#content-info").html("(Required)");
			valid = false;
		}
		return valid;
	}
	
	/* ==========================================================================
   		Mobile Nav & Blog Sidebar
   	   ========================================================================== */

	$(document).on('click', '.toggle-sidebar', function() { 
	    $('body').toggleClass('sidebar-open');
	});
	$(document).on('click', '.toggle-nav', function() { 
	    $('body').toggleClass('nav-open');
	});
	$(document).on('click', '.mobile-nav a, .logo a', function(e) {
		e.preventDefault();
		$('body').removeClass('nav-open');

		let link = $(this).attr('href'),
			currentTop = $(window).scrollTop(),
            rate = 0.2, 
            target = $(link).offset();
            distance = Math.abs(currentTop - target.top);
        setTimeout(function(){ 
	    	$([document.documentElement, document.body]).animate({
		        scrollTop: $(link).offset().top
		    }, distance * rate);
	    }, 100);


	});

	$(window).on('scroll', function(){
		if ($(window).width() < 960){
			$('.page').each(function(){
				let page = $(this);
				if(page.visible(true)){
					page.addClass('active')
					page.siblings().removeClass('active');
					page.find('.content').css('display', 'block');
					page.siblings().find('.content').removeAttr('style');
				}
			});
		}
	});
	/* ==========================================================================
   		Load Blog Pages
   	   ========================================================================== */
	$(document).on('click','.blog-recent-post-item a:not("a.dummy"), #nav-above a:not("a.dummy, a.blog-home")', function(e) { 
		e.preventDefault();
		let href = $(this).attr('href'),
			current,
			contentNow;
		$('.active .content').children().fadeOut(400).promise().done(function() {
		    $('.active .content').html('<i class="loader lni lni-spinner-solid"></i>');
		    $.ajax({
			   url:href,
			   type:'POST',
			   success: function(data){
			   		$("#circle").removeClass('hover');
				   	$('.loader').fadeOut(400).promise().done(function() {
				   		$('body').addClass('single-post');
				   		$('.active .content').hide().html($(data).find('.content').html()).fadeIn(400).promise().done(function(){
				   			$('.page-header hr').addClass('full');
				   		});;
				   	});
				   	
			   }
			});
		});
		if(!$('body').hasClass('single-post')){
			current = $('.active .content');
			contentNow = $('.active .content').html();
		}
		$('.page header').click(function(){
			if($('body').hasClass('single-post')){
				setTimeout(function(){ 
					current.html(contentNow);
					$('body').removeClass('single-post');
				}, 500);
			}
			
		});
	});
	$(document).on('click','.blog-home', function(e) { 
		e.preventDefault();
		$('.active .content').children().fadeOut(400).promise().done(function() {
		    $('.active .content').html('<i class="loader lni lni-spinner-solid"></i>');
			$('.page.active header').trigger('click');
		});
	});

	/* ==========================================================================
   		Mouse Trailer
   	   ========================================================================== */

	let mouse = $(".mouse"),
		mouseX = 0, 
		mouseY = 0,
		pageX = 0,
		pageY = 0,
		backgroundX = 0,
       	backgroundY = 0,
       	movementStrength = 370,
       	height = movementStrength / $(window).height(),
       	width = movementStrength / $(window).width(),
       	h = document.querySelector('h1'),
		p = h.getBoundingClientRect();

    function mousePosition(){
		$(document).on('mousemove', function(e) {	
			   pageX = e.pageX - ($(window).width() / 6);
		       pageY = e.pageY - ($(window).height() / 6);
		       backgroundX = width * pageX * -0.8 - 30;
		       backgroundY = height * pageY * -0.8 - 30;
		       	if ($('#home-background:hover').length != 0) {
				   	mouseX = e.pageX;
			   		mouseY = e.pageY;
			   		mouse.removeClass('regular');
				}
				else{
					mouse.addClass('regular');
					mouseX = e.pageX;
					mouseY = e.pageY;
				}
				if ($('a:hover, .testomonial-slider-controls:hover, .about-slider-controls:hover, .portfolio-filter:hover,'
					+ ' .tabs-nav:hover, .page:not(.active) header:hover, .toggle-sidebar:hover, input[type=submit]:hover, button:hover').length != 0) {
					mouse.addClass('hover');
				}
				else{
					mouse.removeClass('hover');
				}
				if($('.portfolio-container li a:hover').length != 0){
					mouse.addClass('zoom');	
				}
				else{
					mouse.removeClass('zoom');
				}
		});
		let xp = 0, yp = 0, bxp = 0, byp = 0, mw = 0, mh = 0;
		let loop = setInterval(function(){
			    if ($(window).width() > 960){
				    xp += Math.round( (mouseX - xp) / 6 );
				    yp += Math.round( (mouseY - yp) / 6 );
				    bxp += Math.round( (backgroundX - bxp) / 12 );
				    byp += Math.round( (backgroundY - byp) / 12 );

				    $('h1').each(function(){
				    	var offset = $(this).offset();
				    	if ($('#home-background:hover').length != 0 ) {
					    	$(this).css({
					    		'--x' : (xp - offset.left) + 'px',
					    		'--y': (yp - offset.top) +'px',
					    		'--size': '125px',
					    	})
				    	}
				    	else{
				    		$(this).removeAttr('style');
			  			}
				    })
				    mouse.css({
				    	left: xp, 
				    	top: yp,
				    	backgroundPosition : bxp + "px " + Math.min(byp, 0) + "px",
				    });
				}
		}, 20);
	}
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	if(!isMobile) {
		mousePosition();
	}
});


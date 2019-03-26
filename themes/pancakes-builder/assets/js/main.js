$(document).ready(function(){
  //create an accordian
  $('.accordion-title').click(function(e) {
    if($(e.target).is('.active')) {
      closeAccordion();
    } else {
      closeAccordion();
      $(this).addClass('active');
      $('.accordion ' + $(this).attr('href')).slideDown(400).addClass('open');
    }
    e.preventDefault();
  });
  
  function closeAccordion() {
    $('.accordion .accordion-title').removeClass('active');
    $('.accordion .accordion-content').slideUp(400).removeClass('open');
  }

  //mobile menu
    var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
    var hamburgers = document.querySelectorAll(".hamburger");
    var mobilemenu = document.querySelectorAll("#mobile-menu");
    if (hamburgers.length > 0) {
      forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
          this.classList.toggle("is-active");
          $("#mobile-menu").toggle("is-active");
        }, false);
      });
    }

});

// Page anchor smooth scroll
$(function(){
  $('.sub > section ul li a').bind('click',function(event){
  var $anchor=$(this);
    $('html, body').stop().animate(
      {scrollTop:$($anchor.attr('href')).offset().top},2000,'easeInOutExpo');
      event.preventDefault();
    });
 });

// Add target blank to external links
$(document.links).filter(function() {
  return this.hostname != window.location.hostname;
  }).attr('target', '_blank');

  // Image comparison slider
  jQuery(document).ready(function($){
    var dragging = false,
        scrolling = false,
        resizing = false;
    var imageComparisonContainers = $('.slider-image-container');
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function(){
        if( !scrolling) {
            scrolling =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
        }
    });
    
    imageComparisonContainers.each(function(){
        var actual = $(this);
      drags(actual.find('.slider-handle'), actual.find('.slider-resize-img'), actual, actual.find('.slider-image-label[data-type="modified"]'), actual.find('.slider-image-label[data-type="original"]'));
    });

    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkPosition(container) {
        container.each(function(){
            var actualContainer = $(this);
            if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function(){
            var actual = $(this);
            updateLabel(actual.find('.slider-image-label[data-type="original"]'), actual.find('.slider-resize-img'), 'left');
            updateLabel(actual.find('.slider-image-label[data-type="modified"]'), actual.find('.slider-resize-img'), 'right');
        });

        resizing = false;
    }

    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;
        if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }
});
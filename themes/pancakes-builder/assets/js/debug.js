$(document).ready(function(){

//button vars
var debug_button = $(".enable-debug")
var inspect_button = $(".inspect-mode")
var dbg_options_panel = $('.dbg_options_panel')


//build the dbg menu items on load
$('.dbg-each-menu .dbg-style-padding .dbg-style-padding-bottom-title').after("<li data-select-name='padding-none-bottom'>none</li><li data-select-name='padding-s-bottom'>S</li><li data-select-name='padding-m-bottom'>M</li><li data-select-name='padding-l-bottom'>L</li><li data-select-name='padding-xl-bottom'>XL</li><li data-select-name='padding-xxl-bottom'>XXL</li><li data-select-name='padding-xxxl-bottom'>XXXL</li>");

$('#section-dbg-menu.dbg-each-menu .dbg-style-padding .dbg-style-padding-top-title').after("<li data-select-name='padding-none-top'>none</li><li data-select-name='padding-s-top'>S</li><li data-select-name='padding-m-top'>M</li><li data-select-name='padding-l-top'>L</li><li data-select-name='padding-xl-top'>XL</li><li data-select-name='padding-xxl-top'>XXL</li><li data-select-name='padding-xxxl-top'>XXXL</li>");

//build section height debug menu items
$('#section-dbg-menu.dbg-each-menu .dbg-style-section-height .dbg-style-section-height-options').append("<li data-select-name='full-height'>full-height</li><li data-select-name='height-auto'>auto</li>");

$('#row-dbg-menu.dbg-each-menu .dbg-style-row-alignment .dbg-style-row-alignment-options').append("<li data-select-name='h_content_space-between'>space between</li><li data-select-name='h_content_space-around'>space around</li><li data-select-name='h_content_start'>Start</li><li data-select-name='h_content_center'>center</li><li data-select-name='h_content_end'>End</li>");

$('#row-dbg-menu.dbg-each-menu .dbg-style-row-size .dbg-style-row-size-options').append("<li data-select-name='container'>container</li><li data-select-name='container-large'>container-large</li><li data-select-name='fullwidth'>fullwidth</li>");

//column size options
$('#col-dbg-menu.dbg-each-menu .dbg-style-col-size .dbg-style-col-size-options').append("<li data-select-name='col-2'>2</li><li data-select-name='col-3'>3</li><li data-select-name='col-4'>4</li><li data-select-name='col-5'>5</li><li data-select-name='col-6'>6</li><li data-select-name='col-7'>7</li><li data-select-name='col-8'>8</li><li data-select-name='col-9'>9</li><li data-select-name='col-10'>10</li><li data-select-name='col-11'>11</li><li data-select-name='col-12'>12</li>");

//column content alignment
$('#col-dbg-menu.dbg-each-menu .dbg-style-vertical-align .dbg-style-align-vertical-title').after("<li data-select-name='v_content_center'>center</li><li data-select-name='v_content_start'>start</li><li data-select-name='v_content_end'>end</li>");
$('#col-dbg-menu.dbg-each-menu .dbg-style-horizontal-align .dbg-style-align-horizontal-title').after("<li data-select-name='h_content_center'>center</li><li data-select-name='h_content_start'>start</li><li data-select-name='h_content_end'>end</li>");

//construct the dbg hover box options for each section and row
//this is the dropdowns and the pullout menu

$('.dbg-each-menu .fa-pen-square').click(function() {

$(".dbg-each-menu").removeClass("active");
//open this menu and stick it
$(this).parents().toggleClass("active");

var section_id = '#' + $(this).parents("section").attr('id');

//clear the active classes
$(".dbg-style-menu").find(".dbg-style-section-height-options li").removeClass("active");

//set section height value
if ($(this).parents("section.debug").hasClass('full-height') ) {
var section_height = "full-height";
$(".dbg-style-menu .dbg-style-section-height-options").find("li[data-select-name*='" + section_height + "']").toggleClass("active");
} else {
//Ben note: reset this to other values if the option is available
var section_height = "auto";
$(".dbg-style-menu .dbg-style-section-height-options").find("li[data-select-name*='" + section_height + "']").toggleClass("active");
}
console.log("section height", section_height);

//set active class on the current value if the class exists in the section markup


$(this).parents("section").toggleClass('active');

if ( $(this).parents().hasClass('row') ) {
  console.log("has the row class");
  $(this).parents(".row").toggleClass('active');

  var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
  console.log(row_id);
  var row_padding_bottom = $(this).closest(".row").attr("class").match(/[\w-]*bottom[\w-]*/g);
  var row_alignment = $(this).closest(".row").attr("class").match(/[\w-]*h_content[\w-]*/g);
  
  //set row container size value
  if  ($(this).parents(".row").hasClass('container-large') ) {
    var row_size = "container-large";
  } else if ($(this).parents(".row").hasClass('fullwidth') ) {
    var row_size = "fullwidth";  
  } else if ($(this).parents(".row").hasClass('container') ) {
    var row_size = "container";  
  }
  
  
  console.log(row_padding_bottom, row_alignment, row_size);
    
  $(".dbg-style-menu").find("li").removeClass("active");
  $(".dbg-style-menu").find("li[data-select-name*='" + row_padding_bottom + "']").toggleClass("active");
  $(".dbg-style-menu").find("li[data-select-name*='" + row_alignment + "']").toggleClass("active");
  $(".dbg-style-menu").find("li[data-select-name='" + row_size + "']").toggleClass("active");

  $('.debug .row').mouseover(function() {
    $(this).parents().find(".debug #section-dbg-menu.dbg-each-menu").css('display', 'none');
  });
  $('.debug .row').mouseleave(function() {
    $(this).parents().find(".debug #section-dbg-menu.dbg-each-menu").css("display", "flex");
  });

  //if column has a row as parent
  if ( $(this).parents().hasClass('column') ) {

    //find the current column size
    var column_size = $(this).parents(".column").attr("class").match(/[\w-]*col-[\w-]*/g);

    var column_v_align = $(this).parents(".column").attr("class").match(/[\w-]*v_content_[\w-]*/g);
    var column_h_align = $(this).parents(".column").attr("class").match(/[\w-]*h_content_[\w-]*/g);

    //find the current column size in the dbg menu and highlight it
    $(".dbg-style-menu").find("li[data-select-name='" + column_size + "']").toggleClass("active");
    $(".dbg-style-menu").find("li[data-select-name='" + column_v_align + "']").toggleClass("active");
    $(".dbg-style-menu").find("li[data-select-name='" + column_h_align + "']").toggleClass("active");

    console.log("column conditional statement works", column_size)
  }
} else {
  
  $(".row").removeClass('active');

  var section_padding_top = $(this).parents("section").attr("class").match(/[\w-]*top[\w-]*/g);
  var section_padding_bottom = $(this).parents("section").attr("class").match(/[\w-]*bottom[\w-]*/g);
  
  console.log("section:", section_padding_top);
    
  //clear any old active classes
  $(".dbg-style-menu").find("li").removeClass("active");

  //find the padding classes in the menu and highlight them
  $("#section-dbg-menu .dbg-style-menu").find("li[data-select-name*='" + section_padding_top + "']").toggleClass("active");
  $(".dbg-style-menu").find("li[data-select-name*='" + section_padding_bottom + "']").toggleClass("active");
}

});

//remove css

$('span.dbg-style-sub-parent').click(function() {
  //$("ul.dbg-style-sub-parent").removeClass("active");

  //toggle state of dropdowns in dbg menu
  $(this).parents("ul.dbg-style-sub-parent").toggleClass("active").siblings().removeClass("active");
});

//activate the side panel
$("ul.dbg-style-sub-parent.dbg-style-background").click(function() {

  $(".dbg_options_panel").toggleClass("dbg_options_panel_active");

});

$(".dbg_options_panel .dbg_panel_close").click(function() {
  console.log("close");
  $(".dbg_options_panel").removeClass("dbg_options_panel_active");
});  
//create the side panel
$("ul.dbg-style-sub-parent.dbg-style-background").on('click', function() {

  $(".dbg_options_panel .dbg_options_wrap").empty(); 

  //create the background options

  var section_id = '#' + $(this).parents("section").attr('id');
  console.log("section selected", section_id);



  $("<p>Section name: " + section_id + "</p>").appendTo('.dbg_options_panel .dbg_options_wrap');

  $("<label for='section_background_color'>Background Color</label><input id='section_background_color' class='dbg_options_rgba' value='rgba(52, 64, 158, 0.5)' type='text'>").appendTo('.dbg_options_panel .dbg_options_wrap');
  
  //https://bgrins.github.io/spectrum/#why-customizable
  $('.dbg_options_rgba').spectrum({
    showAlpha: true,
    preferredFormat: "rgb",
    showInput: true,
    showPalette: true,
    showInitial: true,
    showInput: true,
    showButtons: false,
    chooseText: "Update Color",
    cancelText: "Cancel",
    //change this to presets
    palette: [
        ['black', 'white', 'blanchedalmond'],
        ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
    ]
});

  $("<label for='section_background_image'>Background Image URL</label><input id='section_background_image' value='https://res.cloudinary.com/dzttfmzl7/image/upload/v1533067282/Static/pexels-photo-373965_hu3d03a01dcc18bc5be0e67db3d8d209a6_495630_1920x0_resize_q100_box.jpg' type='text'>").appendTo('.dbg_options_panel .dbg_options_wrap');
  
  $('<select class="select" id="dbg_bg_size"><option value="contain">Contain</option><option value="cover">Cover</option></select><br>').appendTo(".dbg_options_panel .dbg_options_wrap");
  
  $('<select class="select" id="dbg_bg_repeat"><option value="no-repeat">no-repeat</option><option value="repeat">repeat</option></select><br>').appendTo(".dbg_options_panel .dbg_options_wrap");

  $('<button class="button-save">Save</button>').appendTo(".dbg_options_panel .dbg_options_wrap");
  //add starting background values
  
  $(".dbg_options_panel .sp-choose").click(function() {
    $("input#section_background_color").spectrum("set", $(".dbg_options_panel .sp-input").val());
  });

  console.log(section_background_color);

  //apply the background options to the selected section
  function generateStylesContent(){
    var section_background_color = $("#section_background_color").val();
    var section_background_image = $("#section_background_image").val();
    var section_background_image_size = $("#dbg_bg_size").val();
    var section_background_image_repeat = $("#dbg_bg_repeat").val();

    var changed_section_background_color = $(section_id).css('background-color', section_background_color);
    var changed_section_background_image = $(section_id).css('background-image', 'url(' + section_background_image + ')');
    var changed_section_background_image_size = $(section_id).css('background-size', section_background_image_size);
    var changed_section_background_image_repeat = $(section_id).css('background-repeat', section_background_image_repeat);
  };

  $('.button-save').on('click', function(){
      generateStylesContent();    
  })


});


//calc the height between the row and the section, then show the height on hover.
//modify section on click
//section padding bottom options

$('#section-dbg-menu .dbg-style-menu').find('.dbg-style-padding-bottom li').click(function() {
  if ( $("section").hasClass("active") ) {
    var section_id = '#' + $(this).parents("section").attr('id');
    var section_template_name = $(this).parents("section").attr('data-section-name');
    console.log(section_id, section_template_name);
    } else {
      var section_id = "no class defined";
      var section_template_name = "no template defined";
    }
  var section_padding_bottom_class = $(this).attr('data-select-name')
  console.log("menu padding class", section_padding_bottom_class)
  $('#section-dbg-menu .dbg-style-padding-bottom > li').removeClass('active')
  $(this).toggleClass('active')
  //remove any other classes related to padding top

  $(section_id).removeClass('padding-none-bottom padding-xs-bottom padding-s-bottom padding-m-bottom padding-l-bottom padding-xl-bottom padding-xxl-bottom padding-xxxl-bottom')
  $(section_id).toggleClass(section_padding_bottom_class);
  console.log("class added", section_id);

});
//section padding top options
$('#section-dbg-menu .dbg-style-menu').find('.dbg-style-padding-top > li').click(function() {
  if ( $("section").hasClass("active") ) {
    var section_id = '#' + $(this).parents("section").attr('id');
    var section_template_name = $(this).parents("section").attr('data-section-name');
    console.log(section_id, section_template_name);
    } else {
      var section_id = "no class defined";
      var section_template_name = "no template defined";
    }
  var section_padding_top_class = $(this).attr('data-select-name')
  console.log("menu padding class", section_padding_top_class)
  $('#section-dbg-menu .dbg-style-padding-top > li').removeClass('active')
  $(this).toggleClass('active')
  //remove any other classes related to padding top

  $(section_id).removeClass('padding-none-top padding-xs-top padding-s-top padding-m-top padding-l-top padding-xl-top padding-xxl-top padding-xxxl-top')
  $(section_id).toggleClass(section_padding_top_class);
  console.log("class added", section_id);

});

//section height options
$('#section-dbg-menu .dbg-style-menu').find('.dbg-style-section-height-options li').click(function() {
  if ( $("section").hasClass("active") ) {
    var section_id = '#' + $(this).parents("section").attr('id');
    var section_template_name = $(this).parents("section").attr('data-section-name');
    console.log(section_id, section_template_name);
    } else {
      var section_id = "no class defined";
      var section_template_name = "no template defined";
    }
  var section_height = $(this).attr('data-select-name')
  console.log("SECTION CLASS CLICKED: ",section_id, section_height)
  $('#section-dbg-menu .dbg-style-section-height-options li').removeClass('active')
  $(this).toggleClass('active')
  //remove any other classes related to padding top

  $(section_id).removeClass('full-height height-auto')
  $(section_id).toggleClass(section_height);
  console.log("class added", section_id), section_height;

});

//row padding bottom options

$('#row-dbg-menu .dbg-style-menu').find('.dbg-style-padding-bottom li').click(function() {

    var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
    console.log(row_id);
    var active_padding_bottom = $(this).closest(".row").attr("class").match(/[\w-]*bottom[\w-]*/g);
    console.log(row_id, active_padding_bottom);

    var active_padding_bottom = $(this).attr('data-select-name')

  $('#row-dbg-menu .dbg-style-padding-bottom > li').removeClass('active')
  $(this).toggleClass('active')
  //remove any other classes related to padding top

  $(row_id).removeClass('padding-none-bottom padding-xs-bottom padding-s-bottom padding-m-bottom padding-l-bottom padding-xl-bottom padding-xxl-bottom padding-xxxl-bottom')
  $(row_id).toggleClass(active_padding_bottom);
  console.log("class added", row_id);

});

//row alignment options

$('#row-dbg-menu .dbg-style-menu').find('.dbg-style-row-alignment li').click(function() {

  var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
  console.log(row_id);
  var active_alignment = $(this).closest(".row").attr("class").match(/[\w-]*h_content[\w-]*/g);
  console.log(row_id, active_alignment);

  var active_alignment = $(this).attr('data-select-name')

$('#row-dbg-menu .dbg-style-row-alignment li').removeClass('active')
$(this).toggleClass('active')
//remove any other classes related to padding top

$(row_id).removeClass('h_content_space-between h_content_space-around h_content_center h_content_start h_content_end');
$(row_id).toggleClass(active_alignment);
console.log("class added", row_id);

});

//row size options

$('#row-dbg-menu .dbg-style-menu').find('.dbg-style-row-size li').click(function() {

  var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
  console.log(row_id);
  var row_size = $(this).closest(".row").attr("class").match(/[\w-]*h_content[\w-]*/g);
  console.log(row_id, row_size);

  var row_size = $(this).attr('data-select-name')

$('#row-dbg-menu .dbg-style-row-size-options li').removeClass('active')
$(this).toggleClass('active')
//remove any other classes related to padding top

$(row_id).removeClass('container container-large fullwidth');
$(row_id).toggleClass(row_size);
console.log("class added", row_size);

});

$('#col-dbg-menu .dbg-style-menu').find('.dbg-style-col-size li').click(function() {

  var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
  var column_id = row_id + '#' + $(this).parents(".column");
  var this_column = $(this).parents(".column");

  console.log(row_id);

  var column_size = this_column.attr("class").match(/[\w-]*col-[\w-]*/g);

  console.log(row_id, column_size);

  var column_size = $(this).attr('data-select-name')

$(this).toggleClass('active').siblings().removeClass('active');
//remove any other classes related to padding top

$(this_column).removeClass('col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12');
$(this_column).toggleClass(column_size);
console.log("class added", column_size);

});

//column v alignment
$('#col-dbg-menu .dbg-style-menu').find('.dbg-style-vertical-align > li').click(function() {

  var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
  var column_id = row_id + '#' + $(this).parents(".column");
  var this_column = $(this).parents(".column");

  console.log(row_id);

  var column_v_align = this_column.attr("class").match(/[\w-]*v_content_[\w-]*/g);

  console.log(row_id, column_v_align);

  var column_v_align = $(this).attr('data-select-name')

$(this).toggleClass('active').siblings().removeClass('active');
//remove any other classes related to padding top

$(this_column).removeClass('v_content_center v_content_start v_content_end');
$(this_column).toggleClass(column_v_align);
console.log("class added", column_v_align);

});

//column h alignment
$('#col-dbg-menu .dbg-style-menu').find('.dbg-style-vertical-align .dbg-style-horizontal-align > li').click(function() {

  var row_id = '#' + $(this).parents("section").attr('id') + ' #' + $(this).closest(".row").attr('id') + ".row";
  var column_id = row_id + '#' + $(this).parents(".column");
  var this_column = $(this).parents(".column");

  console.log(row_id);

  var column_h_align = this_column.attr("class").match(/[\w-]*h_content_[\w-]*/g);

  console.log(row_id, column_h_align);

  var column_h_align = $(this).attr('data-select-name')

$(this).toggleClass('active').siblings().removeClass('active');
//remove any other classes related to padding top

$(this_column).removeClass('h_content_center h_content_start h_content_end');
$(this_column).toggleClass(column_h_align);
console.log("class added", column_h_align);

});

//change text on click
var oriVal;
$(".text-wrapper").on('dblclick', 'p', function () {
    oriVal = $(this).text();
    $(this).text("");
    $("<input type='text'>").appendTo(this).focus();
});
$(".text-wrapper").on('focusout', 'p > input', function () {
    var $this = $(this);
    $this.parent().text($this.val() || oriVal); // Use current or original val.
    $this.remove();                      // Don't just hide, remove the element.
});

//create the front matter
$(inspect_button).click(function() {
  $(".dbg_preview_options_panel ul.list_sections_data").empty();  
$( function sidebar_loop() {
    //console.log("running this function...sidebar-loop");
    //get the section names
    
    $( "main section" ).each(function(i, section) {
      var section = $(this);
      var section_name = $(this).attr('data-section-name');

      if ( $(this).attr("class").match("full-height") ) {
      var full_height_section = true
        console.log(full_height_section);
      } else {
      var full_height_section = false;
      }

      var padding_top = $(this).attr("class").match(/[\w-]*top[\w-]*/g);
      var padding_bottom = $(this).attr("class").match(/[\w-]*bottom[\w-]*/g);

      console.log("padding bottomm", padding_bottom);

      $(".dbg_preview_options_panel ul.list_sections_data").append('<li class="li-section-name" data-sb-item-name="' + section_name + '">- template: ' + section_name + '</li>' );
      //console.log(section_name);
      $(".dbg_preview_options_panel ul.list_sections_data").append('<li class="li-section-name" data-sb-item-name="' + padding_top + '"> section_top_padding: ' + padding_top + '</li>' );
      $(".dbg_preview_options_panel ul.list_sections_data").append('<li class="li-section-name" data-sb-item-name="' + padding_bottom + '"> section_padding_bottom: ' + padding_bottom + '</li>' );
      $(".dbg_preview_options_panel ul.list_sections_data").append('<li class="li-section-name" data-sb-item-name="' + full_height_section + '"> full_height_section: ' + full_height_section + '</li>' );
      //get the the row ids
      section.children("#row").each(function() {
        var row = $(this);
        var row_name = $(this).attr('id');
        var h_content = $(this).attr("class").match(/[\w-]*h_content[\w-]*/g);
        console.log(h_content);
        $(".dbg_preview_options_panel ul.list_sections_data").append('<li class="li-row-name" data-sb-item-name="' + row_name + '">' + row_name + '\:' + '</li>' );
        //console.log(row_name);

        //get the column sizes
        row.children(".column").each(function() {
          var col_name = $(this).attr('data-column-size');
          $(".dbg_preview_options_panel ul.list_sections_data").append('<li class="li-col-size" data-sb-item-name="' + col_name + '">' + col_name + '</li>' );
          //console.log(col_name);
        });
      });
        
    });
    $(".dbg_preview_options_panel").toggleClass("dbg_preview_options_panel_active");
    });
  //enable draggable sections when the preview button is active

});
$( function sorting() {
  $( "main" ).sortable({
    hoverClass: "drop-hover",
    handle: 'i.fa-arrows-alt',
    placeholder: "ui-state-highlight",
    start: function(event, ui) {
      $("html").addClass("dbg-dragging");
    },
    update: function() {
      //$(".dbg_preview_options_panel ul.list_sections_data").empty();
      //sidebar_loop();
    },
    over: function() {
      $(this).css("border-color", "blue");
    }
  });
  $( ".row" ).sortable({
    hoverClass: "drop-hover",
    handle: '#col-dbg-menu',
    placeholder: "ui-state-highlighter",
    start: function(event, ui) {
      $("html").addClass("dbg-dragging");
    },
    update: function() {
      //$(".dbg_preview_options_panel ul.list_sections_data").empty();
      //sidebar_loop();
    },
    over: function() {
      $(this).css("border-color", "blue");
    }
  });
  console.log("clicked");
  $( "main" ).disableSelection(function(){
    
    //console.log("disabled");
  })
//generate the list of sections in the debug sidebar
});
//make the list match the order in the page


    //testing conditional load
    //fetchInject([
    //'https://cdn.jsdelivr.net/lodash/4.17.4/lodash.min.js'
  //]).then(() => {
    //console.log(`Successfully loaded Lodash ${_.VERSION}`)
  //})
var pageURL = $(location).attr("href");
//set this 
//var pageURL = "https://stkwj-ex0ajxzg.preview.forestry.io/posts/preview-url/"

//if (window.location.href.indexOf("app") > -1) {
//var editor_prefix = "https://app.forestry.io/sites/";
//} else {
//var getUrl = window.location;
//var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
//var editor_prefix = baseUrl + "admin";
//}

var parts = pageURL.split('/');
var interestingPart = parts[2]
var editor_prefix = "https://app.forestry.io/sites/";
var part2 = interestingPart.substr(0, interestingPart.indexOf('.'));

console.log(part2);
//gen the preview link
//set the preview link in the menu

var previewLink = editor_prefix + part2 + "/#/pages/" + "content-{{ $.page.Scratch.Get "preview_page_path" }}/"
console.log(previewLink);

$(".prepend-me").attr('href', function (_, ctx) {
  return ctx.replace("site_id", part2);
});

$('.preview-link li a').attr('href',previewLink);



$('main section.debug').hover(function() {

  console.log("found div");
//toggle active class on menu
//$(this).find('.dbg-each-menu').css("display", "flex");
var section_id = '#' + $(this).attr('id')
var section_template_name = $(this).attr('data-section-name')
if ( $(".dbg_preview_options_panel:contains('" + section_template_name + "')") ) {
  $(".dbg_preview_options_panel li").removeClass('active')
  $(".dbg_preview_options_panel").find("li[data-sb-item-name*='" + section_template_name + "']").toggleClass("active")
  
  var topPos = $(".dbg_preview_options_panel li").offset();
  var innerListItem = $(".dbg_preview_options_panel li");
  console.log("top position after div click", topPos);
  var parentDiv = $('.dbg_preview_options_panel');
  parentDiv.scrollTop( parentDiv.scrollTop() + innerListItem.position());
  //add function to center the panel
  //nailed it
}

//create the options panel class based on the section id 
});

debug_button.click(function() {
//define the options panel

debug_button.toggleClass("debug-on active")


//check for toggled options
if ($('input[type=checkbox]').prop('checked')) {
$("section").toggleClass("debug")
}

//clean the iframe of the debugging UI

$("iframe").contents().find("html, section, header, .column, .container, .container-large, .fullwidth, .elements-wrapper").toggleClass("debug")
$("iframe").contents().find("header, section, footer").css("width", "100%")
$("iframe").contents().find(".dbg_options_panel").css("display", "none")
$("iframe").contents().find("iframe").css("display", "none")
$("header").toggleClass("debug")
$(".container").toggleClass("debug")
$(".container-large").toggleClass("debug")
$(".fullwidth").toggleClass("debug")
$(".column").toggleClass("debug")
$(".elements-wrapper").toggleClass("debug")
$("html").toggleClass("debug");

$('section.debug').click(function() {
  
  $('section.debug.active').removeClass("active")
  $(this).toggleClass("active")
  $(this).data('clicked', true)
  console.log(section_template_name)
  var section_id = '#' + $(this).attr('id')
  var section_template_name = $(this).attr('data-section-name')
  //get the section id we clicked so we can apply styling only to this section

  

    if ( $(".dbg_preview_options_panel_active:contains('" + section_template_name + "')") ) {
      $(function highlight_list_item() {
      $(".dbg_preview_options_panel_active li").removeClass('active')
      $(".dbg_preview_options_panel_active").find("li[data-sb-item-name*='" + section_template_name + "']").toggleClass("active")
      
      var topPos = $(".dbg_preview_options_panel_active li.active").offset();
      var innerListItem = $(".dbg_preview_options_panel_active li.active");
      console.log("dbg_options_panel topPos 174:", topPos);
      var parentDiv = $('.dbg_preview_options_panel_active');
      parentDiv.scrollTop(parentDiv.scrollTop() + innerListItem.position());
      //add function to center the panel
      //nailed it
      })
  } else {
    //console.log("false");
  }
  
  //create the options panel class based on the section id 

//need to add for elements**
//add selected class to the targeted column
$('section').find('.column').click(function() {
  //console.log('Column')
  $('column-selected').removeClass('column-selected')
  dbg_column_selected = $(this).toggleClass('column-selected')
  //console.log(dbg_column_selected);
});

//column size
//$(dbg_options_panel).find('.dbg_options_panel_ops.dbg_column_size li').click(function() {
//  var section_dbg_column_class = $(this).attr('data-select-name')
//  $(dbg_options_panel).find('.db_column_title').text(section_dbg_column_class)
//  //console.log(section_dbg_column_class)
//  $('.dbg_options_panel_ops.dbg_column_size li').removeClass('active')
//  $(this).toggleClass('active')
//  if ( $(section_id).hasClass("active") ) {
//  //UPDATE the psuedo element text for the column using .text() otherwise the name doesn't appear.
//  //https://stackoverflow.com/questions/10495243/how-change-content-value-of-pseudo-before-element-by-javascript/42000085#42000085
  //remove any other classes related to padding top
//    $(section_id).find('.column-selected').removeClass('col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12');
//    $(section_id).find('.column-selected').addClass(section_dbg_column_class);
  //console.log(section_id);
//  }
//});

//section and row container size
//$(dbg_options_panel).find('.dbg_options_panel_ops.dbg_size li').click(function() {
//  var section_dbg_size_class = $(this).attr('data-select-name')
//  console.log(section_dbg_size_class)

//  $('.dbg_options_panel_ops.dbg_size li').removeClass('active')
//  $(this).toggleClass('active')
//  if ( $(section_id).hasClass("active") ) {
//  //remove any other classes related to padding top
//    $(section_id).find('.row').removeClass('container container-large fullwidth');
//    $(section_id).find('.row').toggleClass(section_dbg_size_class);
//  }
//});
//$(dbg_options_panel).find('.dbg_options_panel_ops.dbg_alignment li').click(function() {
//  var section_dbg_alignment_class = $(this).attr('data-select-name')
//  console.log(section_dbg_alignment_class)
//
//  $('.dbg_options_panel_ops.dbg_alignment li').removeClass('active')
//  $(this).toggleClass('active')
//  if ( $(section_id).hasClass("active") ) {
//  //remove any other classes related to padding top
//    $(section_id).find('.row').removeClass('h_content_space-between h_content_center h_content_start h_content_end')
//    $(section_id).find('.row').toggleClass(section_dbg_alignment_class);
//  }
//});
      
//section padding top options
//$(dbg_options_panel).find('.dbg_options_panel_ops.padding-top li').click(function() {
//  var section_padding_top_class = $(this).attr('data-select-name')
//  console.log(section_padding_top_class)

//  $('.dbg_options_panel_ops.padding-top li').removeClass('active')
//  $(this).toggleClass('active')
//  if ( $(section_id).hasClass("active") ) {
    //remove any other classes related to padding 
//    $(section_id).removeClass('padding-xs-top').removeClass('padding-s-top').removeClass('padding-m-top').removeClass('padding-l-top').removeClass('padding-xl-top').removeClass('padding-xxl-top')
//    $(section_id).toggleClass(section_padding_top_class);
//  }
//});


  
});//enable debug function end
});//click function end
//filter out the elements from the iframe
$('.m-bar').click(function() {
    $("iframe").contents().find(".debugging-bar").css("display", "none")
    $("iframe").contents().find(".debug header, .debug section, .debug footer, .debug main").css("width", "100%")
    $("iframe").contents().find("iframe").css("display", "none");
});
  
//toggle options
$('.dbg-options-toggle input[type=checkbox]').click(function() { 
if ( (debug_button.hasClass("debug-on")) && ($('input[type=checkbox]').prop('checked')) ) {
    $("section").toggleClass("debug")
  } else {
    $("section").removeClass("debug")
  }
});
//activate inspect mode on click
//adds class to the button
$(debug_button).click(function() {
    $(".debugging-bar", debug_button).toggleClass("active");
});
  
//activate the pages menu on click
$('.dbg-pages').click(function() {
  $(".dbg-pages-container").toggleClass("debug-menu-active")
  $('.dbg-pages.dbg-btn').toggleClass("active")
  $("html").removeClass();

  $('.dbg-pages-menu-close').click(function() {
    $(".dbg-pages-container").removeClass("debug-menu-active");
  })
});

//create mobile views
$('.debugging-bar .m-bar.dbg-btn').click(function() {
      $(".mobile-preview-frame .d_screen-mobile-s").toggleClass("active")
      $('.debugging-bar .m-bar.dbg-btn').toggleClass("active")
      $("html").toggleClass("m-bar d_screen-mobile-s");
});
$('.mobile-preview-frame .m-bar .d_screen-mobile-s').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-mobile-s");
});
$('.m-bar .d_screen-mobile-m').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-mobile-m");
});
$('.m-bar .d_screen-mobile-l').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-mobile-l");
});
$('.m-bar .d_screen-tablet-s').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-tablet-s");
});
$('.m-bar .d_screen-tablet').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-tablet");
});
$('.m-bar .d_screen-laptop').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-laptop");
});
$('.m-bar .d_screen-desktop-s').click(function() {
      $(".m-bar li").removeClass("active")
      $(this).toggleClass("active")
      $("html").removeClass()
      $("html").toggleClass("m-bar d_screen-desktop-s");
});
$('.m-bar .d_screen-desktop-l').click(function() {
      $("html").removeClass();
});

//refresh list when the code editor is opened


//popup editor window
$(".part-edit").click(function() {
  newwindow = window.open($(this).attr('href'),'','height=600,width=500');
  if (window.focus) {newwindow.focus()}
  return false;
});
});//document ready
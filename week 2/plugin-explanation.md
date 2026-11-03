# Style My Tooltips jQuery Plugin Explanation

## 1. Introduction
Style My Tooltips is a jQuery plugin that shows a small box with text when we move the mouse over an element.

**Source:** http://manos.malihu.gr/style-my-tooltips-jquery-plugin

## 2. Function and Methods
The code uses a function to keep the plugin code organized. The `methods` object contains different functions to control the tooltip.

## 3. Init Method
The `init()` method starts the plugin. It sets default options like delay time, fade speed, and whether the tooltip follows the cursor. It also creates the tooltip element if it does not already exist.

## 4. Cursor Position
The `smtGetCursorCoords()` function gets the mouse position using `pageX` and `pageY`. It sends these values to the position method.

## 5. Mouse Events
The plugin uses `mouseover`, `mouseout`, `mousedown`, and `click` events. When we move the mouse over an element, it reads the title and prepares the tooltip. When we leave or click, it hides the tooltip and restores the original title.

## 6. Update Method
The `update()` method changes the tooltip text and sets the delay before showing it. It also stops any previous animation.

## 7. Show Method
The `show()` method makes the tooltip visible using the `fadeTo()` function. It also stops tracking the cursor when it is not needed.

## 8. Hide Method
The `hide()` method makes the tooltip disappear slowly by changing its opacity to zero. After that, it changes the `z-index`.

## 9. Position Method
The `position()` method decides where the tooltip should appear. It checks the screen space and tries to place the tooltip near the cursor without going outside the visible area.

## 10. jQuery Plugin Function
The `$.fn.style_my_tooltips` function makes the plugin usable with jQuery. It checks which method is called and runs it. If an invalid method is given, it shows an error.

## 11. Closing Function
The last line passes jQuery into the main function and closes it.

## 12. Conclusion
This plugin uses jQuery events, CSS, animations, and functions to create custom tooltips. Its different methods make the code easier to understand and manage.
   




   
(//style-my-tootltips by malihu (http\://manos.malihu.gr)\
//plugin home http\://manos.malihu.gr/style-my-tooltips-jquery-plugin\
(function($) {\
&#x20;   var methods = {\
&#x20;       init: function(options) {\
&#x20;           var defaults = {\
&#x20;               tip_follows_cursor: false, //tooltip follows cursor: boolean\
&#x20;               tip_delay_time: 700, //tooltip delay before displaying: milliseconds\
&#x20;               tip_fade_speed: 300, //tooltip fade in/out speed: milliseconds\
&#x20;               attribute: "title" //tooltip text come from this attribute\
&#x20;           },\
&#x20;               options = $.extend(defaults, options);\
&#x20;           if ($("#s-m-t-tooltip").length === 0) {\
&#x20;               $("body").append("\<div id='s-m-t-tooltip'>\<div>\</div>\</div>");\
&#x20;           }\
&#x20;           var smtTooltip = $("#s-m-t-tooltip");\
&#x20;           smtTooltip.css({\
&#x20;               "position": "absolute",\
&#x20;               "display": "none"\
&#x20;           }).data("smt-z-index", smtTooltip.css("z-index")).children("div").css({\
&#x20;               "width": "100%",\
&#x20;               "height": "100%"\
&#x20;           });\
\
&#x20;           function smtGetCursorCoords(event) {\
&#x20;               var smtCursorCoordsX = event.pageX,\
&#x20;                   smtCursorCoordsY = event.pageY;\
&#x20;               smtTooltip.style_my_tooltips("position", {\
&#x20;                   smtCursorCoordsX: smtCursorCoordsX,\
&#x20;                   smtCursorCoordsY: smtCursorCoordsY\
&#x20;               });\
&#x20;           }\
&#x20;           $(document).on("mouseout mousedown click", ".smt-current-element", function() {\
&#x20;               var $this = $(this);\
&#x20;               clearTimeout(smtTooltip_delay);\
&#x20;               smtTooltip.style_my_tooltips("hide", {\
&#x20;                   speed: $this.data("smt-fade-speed")\
&#x20;               });\
&#x20;               $(document).unbind("mousemove");\
&#x20;               $this.removeClass("smt-current-element");\
&#x20;               if ($this.attr(options.attribute) === "") {\
&#x20;                   $this.attr(options.attribute, $this.data("smt-title"));\
&#x20;               }\
&#x20;           });\
&#x20;           return this["on"]\("mouseover", function(event) {\
&#x20;               var $this = $(this),\
&#x20;                   title = $this.attr(options.attribute);\
&#x20;               $this.addClass("smt-current-element").data({\
&#x20;                   "smt-title": title,\
&#x20;                   "smt-fade-speed": options.tip_fade_speed\
&#x20;               }).attr(options.attribute, "");\
&#x20;               smtTooltip.style_my_tooltips("update", {\
&#x20;                   title: title,\
&#x20;                   speed: options.tip_fade_speed,\
&#x20;                   delay: options.tip_delay_time,\
&#x20;                   tip_follows_cursor: options.tip_follows_cursor\
&#x20;               });\
&#x20;               $(document).bind("mousemove", function(event) {\
&#x20;                   smtGetCursorCoords(event);\
&#x20;               });\
&#x20;           });\
&#x20;       },\
&#x20;       update: function(options) {\
&#x20;           var $this = $(this);\
&#x20;           $this.stop().css({\
&#x20;               "display": "none",\
&#x20;               "z-index": $this.data("smt-z-index")\
&#x20;           }).children("div").text(options.title);\
&#x20;           smtTooltip_delay = setTimeout(function() {\
&#x20;               $this.style_my_tooltips("show", {\
&#x20;                   speed: options.speed,\
&#x20;                   tip_follows_cursor: options.tip_follows_cursor\
&#x20;               })\
&#x20;           }, options.delay);\
&#x20;       },\
&#x20;       show: function(options) {\
&#x20;           var $this = $(this);\
&#x20;           $this.stop().fadeTo(options.speed, 1);\
&#x20;           if (!options.tip_follows_cursor) {\
&#x20;               $(document).unbind("mousemove");\
&#x20;           }\
&#x20;       },\
&#x20;       hide: function(options) {\
&#x20;           var $this = $(this);\
&#x20;           $this.stop().fadeTo(options.speed, 0, function() {\
&#x20;               $this.css({\
&#x20;                   "z-index": "-1"\
&#x20;               });\
&#x20;           });\
&#x20;       },\
&#x20;       position: function(options) {\
&#x20;           var $this = $(this),\
&#x20;               winScrollX = $(window).scrollLeft(),\
&#x20;               winScrollY = $(window).scrollTop(),\
&#x20;               tipWidth = $this.outerWidth(true),\
&#x20;               tipHeight = $this.outerHeight(true),\
&#x20;               leftOffset = (options.smtCursorCoordsX + tipWidth) - winScrollX,\
&#x20;               topOffset = (options.smtCursorCoordsY + tipHeight) - winScrollY;\
&#x20;           if (leftOffset <= $(window).width() && leftOffset <= $(document).width()) {\
&#x20;               $this.css("left", options.smtCursorCoordsX);\
&#x20;           } else {\
&#x20;               var thePosX = options.smtCursorCoordsX - tipWidth;\
&#x20;               if (thePosX >= winScrollX) {\
&#x20;                   $this.css("left", thePosX);\
&#x20;               } else {\
&#x20;                   $this.css("left", winScrollX);\
&#x20;               }\
&#x20;           }\
&#x20;           if (topOffset <= $(window).height() && topOffset <= $(document).height()) {\
&#x20;               $this.css("top", options.smtCursorCoordsY);\
&#x20;           } else {\
&#x20;               var thePosY = options.smtCursorCoordsY - tipHeight;\
&#x20;               if (thePosY >= winScrollY) {\
&#x20;                   $this.css("top", thePosY);\
&#x20;               } else {\
&#x20;                   $this.css("top", winScrollY);\
&#x20;               }\
&#x20;           }\
&#x20;       }\
&#x20;   }\
&#x20;   $.fn.style_my_tooltips = function(method) {\
&#x20;       if (methods[method]) {\
&#x20;           return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));\
&#x20;       } else if (typeof method === "object" || !method) {\
&#x20;           return methods.init.apply(this, arguments);\
&#x20;       } else {\
&#x20;           $.error("Method " + method + " does not exist");\
&#x20;       }\
&#x20;   };\
})(jQuery);)
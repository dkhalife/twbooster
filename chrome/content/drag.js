jQuery(document).ready(function ($) {
        $('tr.row2 tr').css('backgroundColor', '#eeeeee');
        $('#demo tbody .control').click(function (e) {
            e.preventDefault();
            var tr = $(this);
            var iterations = 0;
            while(tr.attr('tagName') != 'TR') {
                tr = tr.parent();
                iterations += 1;
                if (iterations == 100) {
                    return false;
                }
            }
        if ($(this).attr('rel') == 'up' && tr.prev().length)
            tr.fadeTo('medium', 0.1, function () {
                tr.insertBefore(tr.prev()).fadeTo('fast', 1);
                reorder();
            });
        else if ($(this).attr('rel') == 'down' && tr.next().length)
            tr.fadeTo('fast', 0.1, function () {
                tr.insertAfter(tr.next()).fadeTo('fast', 1);
           	reorder();
            });
        else
            //Can't do anything with these
            return ;

       return false;
        });
//Capture the mouse x and y positions (only Y is needed for this task but there's no harm in getting
// both axis. 
// Declare global variables so they can be accessed anywhere.
// The lastX and lastY variables will be used to keep track of which direction the mouse is heading
// when moving the TR elements
var mouseX, mouseY, lastX, lastY = 0;

//IE Doesn't stop selecting text when mousedown returns false we need to check
// That onselectstart exists and return false if it does -- we won't check if the browser is IE
// As thy may very well change this at some point
var need_select_workaround = typeof $(document).attr('onselectstart') != 'undefined';

// This function captures the x and y positions anytime the mouse moves in the document.
$().mousemove(function(e) { mouseX = e.pageX; mouseY = e.pageY; });
   
// The first order of business is to bind a function to the mousedown event 
// on all TR elements inside the tbody. I am using the jQuery live() function because my content is loaded through
// ajax. simply use mousedown() if you do not need to load this on dynamic functions

    $('#demo2 tbody tr').mousedown(function (e) {
	 
        // Store the current location Y axis position of the mouse at the time the 
        // mouse button was pushed down. This will determine which direction to move the table row
        lastY = mouseY;

        // store $(this) tr element in a variable to allow faster access in the functions soon to be declared
        var tr = $(this);

        // This is just for flashiness. It fades the TR element out to an opacity of 0.2 while it is being moved.
        tr.find('td').fadeTo('fast', 0.2);
        
	
	
	
        // jQuery has a fantastic function called mouseenter() which fires when the mouse enters
        // This code fires a function each time the mouse enters over any TR inside the tbody -- except $(this) one
        $('tr', tr.parent() ).not(this).bind('mouseenter', function(){
            // Check mouse coordinates to see whether to pop this before or after
            // If mouseY has decreased, we are moving UP the page and insert tr before $(this) tr where 
            // $(this) is the tr that is being hovered over. If mouseY has decreased, we insert after           
            if (mouseY > lastY) {
                    $(this).after(tr);
            } else {
                    $(this).before(tr);
            }
            // Store the current location of the mouse for next time a mouseenter event triggers
            lastY = mouseY;
        });

        // Now, bind a function that runs on the very next mouseup event that occurs on the page
        // This checks for a mouse up *anywhere*, not just on table rows so that the function runs even
        // if the mouse is dragged outside of the table.
        $('body').mouseup(function () {
           //Fade the TR element back to full opacity
           tr.find('td').fadeTo('fast', 1);
           // Remove the mouseenter events from the tbody so that the TR element stops being moved
           $('tr', tr.parent()).unbind('mouseenter');
           // Remove this mouseup function until next time
           $('body').unbind('mouseup');

	    // Make text selectable for IE again with
	    // The workaround for IE based browers
	    //if (need_select_workaround)
		//$(document).unbind('selectstart');
           reorder(); // This function just renumbers the position and adjusts the zebra striping, not required at all
	   //window.openerx.twb_.lib.TWB_Farm_Edit(window);
        });


        
        // This part if important. Preventing the default action and returning false will
        // Stop any text in the table from being highlighted (this can cause problems when dragging elements)
        
	e.preventDefault();
	
	// The workaround for IE based browers
	//if (need_select_workaround)
	//    $(document).bind('selectstart', function () { return false; });
        //return false;
 
    }).css('cursor', 'move');

        function reorder () {
		window.old="";
		window.num=0;
		var position = 1;
       		$('#demo tbody tr, #demo2 tbody tr').each(function () {
		obj=$('td:first a', $(this))[0];
		if(obj){
			extra='id="'+obj.id+'" name="'+obj.name+'"';
			$('td:first', $(this)).html('<a class="meffect" href=javascript:void(0); '+extra+' onclick=window.openerx.twb_.lib.TWB_SSF("'+(position-1)+'")>'+position+"</a>");
			// Blue ID restore
			INP=$('td', $(this))[1].innerHTML;
			INP=(INP.match("</font>"))?INP.split("</font> ")[1]:INP;
			cur=INP.split("value=")[1].split(" type")[0];
			if(cur!=window.old){window.old=cur; window.num++; DAI="<font color=blue>#"+window.num+"</font> ";}else{DAI="<font style='opacity:0' color=blue>#"+window.num+"</font> ";}
			$('td', $(this))[1].innerHTML=DAI+INP;
			//$('td', $(this)).css('backgroundColor', position % 2 ? '' : '#eeeeee'); // Commented out because we are styling from window now
			position += 1;
		}
	});
	tooltip();
 	}
    });

// Tooltip
this.tooltip = function(){
	/* CONFIG */
		xOffset = 10;
		yOffset = 20;
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
	/* END CONFIG */
	$(".meffect").hover(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.css("position","absolute")
			.fadeIn("fast");
		window.openerx.twb_.lib.TWB_Show_Extra_Start($(this)[0].id,$(this)[0].name,window);
	},
	function(){ $("#tooltip").fadeOut("fast"); });
	$(".meffect").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});
};

// starting the script on page load
$(document).ready(function(){
	tooltip();
});

// Tooltip
function tooltp(){
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
		window.openerx.twb_.lib.TWB_Load_Attack($(this)[0].id,document);
	},
	function(){ $("#tooltip").fadeOut("fast"); });
	$(".meffect").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});
};

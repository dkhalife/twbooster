// @Plugin = Event Manager
// @Version = 1.5
// @Icons = 0

merge(twb_.lib,{
	TWB_EVT : function(){
		with(twb_.lib){
			if(!local.event_fired && TWB_Scr()=="overview_villages" && TWB_URL().match("game")){
				now=new Date();
				start=local.event_s;
				end=local.event_e;
				if(now.getTime()>start.getTime() && now.getTime()<end.getTime()){
					T=win();
					if(T){
						hold=dce("div",T);
						hold.setAttribute("align","center");
						// SWF
						if(local.event_swf){
							obj=dce("embed",T);
							obj.setAttribute("width",500);
							obj.setAttribute("height",375);
							obj.setAttribute("src",host+"event.swf");
							obj.setAttribute("type","application/x-shockwave-flash");
							obj.setAttribute("pluginspage","http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash");
						}
						else{
							obj=dce("div",T);
							obj.innerHTML=local.event_msg;
						}
						hold.appendChild(obj);
						hatch=$xp("//table[@class='vis']//th",9).parentNode.parentNode.parentNode;
						// Add continue element:
						if(local.event_swf){
							link=$xp("//a[contains(@href,'overview_villages')]",9);
							hold.innerHTML+="<br><a href='"+link.href+"'> >>"+lang("cont")+"</a>";
						}
						if(hatch){
							hatch.parentNode.insertBefore(hold,hatch);
							hatch.style.display="none";
						}
					}
					local.event_fired=true;
				}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof local.event_swf=="undefined"){
				// Event props
				local.event_swf=false;
				local.event_s=new Date("12/20/2010");
				local.event_e=new Date("12/26/2010");
				local.event_msg="<div align=center><img src='http://twbooster.com/phpBB3/twb/event2010.jpg'></div>";
				local.event_fired=false;
				Engines.State.add_p("event","TWB_EVT()","*",false);
			}
		}
	}
});
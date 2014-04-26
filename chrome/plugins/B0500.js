// @Plugin = Page Auto Clickers
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	TWB_Int : function(){
		with(twb_.lib){
			try{
				if(!local.stopINT){
					if(twb()){
						test=true;
						scr=TWB_Scr();
						mde=TWB_Mode();
						url=TWB_URL();
						if($get_var("skiptry")=="true" || local.skined==true){
							// Catapult
							if(typeof twb_.cat!="undefined" && twb_.cat!=""){
								el=$xp("//select/option[@value='"+twb_.cat+"']",9,twb_.pWIN.document);
								if(el){
									el.selected="true";
									delete twb_.cat;
								}
							}
							// Skip confirmation
							test=(content.location.href.match("&tag")===null)?true:false;
							test2=(content.frames[0])?(content.frames[0].location.href.match("&tag")===null?true:false):true;
							// Noble planner fix
							test4=$xp("//h3[@class='error']",9,twb_.pWIN.document)==null || $get_var("fanerror")=="false";
							// Test for sending cats possibly 
							test3=$xp("//select[@name='building']",9,twb_.pWIN.document);
							if(url.match("try=confirm") && $xp("//*[@class='attack']",9,twb_.pWIN.document)===null && $xp("//*[@id='inputx']",9,twb_.pWIN.document)===null && test3===null && test && test2 && test4){
								setTimeout(function(){
									elo=$xp("//*[@type='submit']",9,twb_.pWIN.document);
									if(elo){
										elo.click();
									}
								},50);
							}
						}
						if($get_var("mapico")=="true"){
							if(scr=="map" && typeof twb_.mpacoi=="undefined"){
								//twb_.mpacoi=window.setInterval(TWB_Map_Icons,$get_var("latency"));
								setI(TWB_Map_Icons,$get_var("latency"),"mpacoi");
							}
							if(scr!="map" && typeof twb_.mpacoi!="undefined"){
								clearInterval(twb_.mpacoi);
								delete twb_.mpacoi;
							}
						}
						TWB_Market_Fil(1);
					}
					if($get_var("highco")=="true"){
						doc=win(TWB_Map_Server().split(".")[0]);
						if(doc!==null){
							doc.jQuery("#adds").hide();
							Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
							for(fID in Dfarms){
								if(!doc.vars["villages"][fID]){
									doc.highlight.add(fID,'village');
								}
							}
						}
					}
					if(typeof twb_.attackinfo=="object" && TWB_URL().match("&pass")===null && TWB_URL().match("try=confirm")===null){
						$inc=$xp("//a[contains(@href,'type=own')]",6,twb_.pWIN.document);
						largest=new Number(0);
						for(i=0; i<$inc.length; i++){
							currne=new Number(tmo=$inc[i].href.match(/id=(\d+)/)[1]);
							if(currne>largest){
								largest=tmo;
							}
						}
						twb_.attackinfo.actionid=largest;
						data.cache[local.curVillage]=(typeof data.cache[local.curVillage]=="undefined")?new Array():data.cache[local.curVillage];
						data.cache[local.curVillage].push(twb_.attackinfo);
						delete twb_.attackinfo;
					}
				}
			}catch(e){log('Page Auto-Clickers',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.INT=="undefined"){
				Engines.State.add_p("INT","TWB_Int()","*",false);
				TWB_New_Set("main",[lang("xon19"),{id:"skiptry",type:"checkbox",checked:"skiptry"}]);
				TWB_New_Set("main",[lang("intset"),{id:"intset",type:"checkbox",checked:"intset"}]);
				TWB_New_Set("main",[lang("imgico"),{id:"mapico",type:"checkbox",checked:"mapico"}]);
				TWB_New_Set("main",[lang("highco"),{id:"highco",type:"checkbox",checked:"highco"}]);
				TWB_New_Set("main",[lang("fanerror"),{id:"fanerror",type:"checkbox",checked:"fanerror"}]);
			}
		}
	}
});
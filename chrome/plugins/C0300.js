// @Plugin = TW Stats Link
// @Version = 1.3
// @Icons = stats
merge(twb_.lib,{
	TWB_GetIds : function(){
		with(twb_.lib){
			try{
				WN=win();
				if(typeof WN.wrappedJSObject!="undefined"){
					WN=WN.wrappedJSObject;
				}
				local.TWB_I=WN.game_data.player.id;
				local.TWB_J=WN.game_data.player.ally_id;
			}catch(e){log('TW Stats',e);}
		}
	},
	TWB_Stats : function(){
		with(twb_.lib){
			try{
				TWB_GetIds();
				ur=local.TWB_I;
				ow=local.TWB_J;
				url=TWB_URL();
				scr=TWB_Scr();mode=TWB_Mode();
				if(scr=="info_player"){
					his=url.match(/id=\d+/)[0].replace("id=","");
					TWB_L_Stats(his,1);
				}
				else{
					if(scr=="ally"){
						TWB_L_Stats(ow,0);
					}
					else{
						if(scr=="info_ally"){
							his=url.match(/id=\d+/)[0].replace("id=","");
							TWB_L_Stats(his,0);
						}
						else{
							if(scr=="info_village"){
								opz=url.match(/id=\d+/)[0].replace("id=","");
								TWB_L_Stats(opz,3);
							}
							else{
								TWB_L_Stats(ur,1);
							}
						}
					}
				}
			}catch(e){log('TW Stats',e);}
		}
	},
	TWB_L_Stats : function(h,k){
		with(twb_.lib){
			try{
				UR=(k=="1")?"player":((k=="0")?"tribe":"village");
				sub=local.TWB_Lang+".";
				if(sub=="en."){
					sub="www.";
				}
				url="http://"+sub+"twstats.com/"+TWB_World(0)+"/index.php?page="+UR+"&id="+h;
				var doc=openW('',url);
			}catch(e){log('TW Stats',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-Stats")==null){
				BTN("toolbarbutton",{id:"TWB-Stats",type:"button",tooltiptext:"TW Stats Profile Link",oncommand:"try{twb_.lib.TWB_Stats();}catch(e){twb_.lib.log('Main',e);}"});
			}
		}
	}
});
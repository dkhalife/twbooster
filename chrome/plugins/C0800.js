// @Plugin = TWM Enhancements
// @Version = 1.1
// @Icons = twm
merge(twb_.lib,{
	TWB_Map_Server : function(){
		with(twb_.lib){
			try{
				vra=TWB_World(0).replace(/\d+/,"");
				switch(vra){
					case "en": result="tribalwarsmap.com"; break;
					case "uk": result="tribalwarsmap.co.uk"; break;
					case "pl" : result="plemionamapa.pl"; break;
					case "de": result="diestaemmekarte.de"; break;
					case "nl": result="tribalwarsmap.com/nl"; break;
					case "se": result="tribalwarsmap.com/se"; break;
					case "br": result="tribalwarsmap.com/br"; break;
					case "pt": result="tribalwarsmap.com/pt"; break;
					case "cz": result="tribalwarsmap.com/cz"; break;
					case "ro": result="tribalwarsmap.com/ro"; break;
					case "gr": result="tribalwarsmap.com/gr"; break;
					case "no": result="tribalwarsmap.com/no"; break;
					case "sk": result="tribalwarsmap.com/sk"; break;
					case "hu": result="tribalwarsmap.com/hu"; break;
					case "dk": result="tribalwarsmap.com/dk"; break;
					case "es": result="tribalwarsmap.com/es"; break;
					case "ba": result="tribalwarsmap.com/ba"; break;
					case "si": result="tribalwarsmap.com/si"; break;
					case "hr": result="tribalwarsmap.com/hr"; break;
					default: result="tribalwarsmap.com"; break;
				}
				return result;
			}catch(e){log('TWM Enhancements',e);}
		}
	},
	TWB_Map_Int : function(){
		with(twb_.lib){
			if(twb()){
				try{
					scr=TWB_Scr();
					if(scr=="map"){
						ust=ust=$xp("//td[contains(@onclick,'startMapScroll')]/a",6)[1].href;
						usx=ust.match(/x=(\d+)/)[1];
						usy=ust.match(/y=(\d+)/)[1];
						vst=ust=$xp("//td[contains(@onclick,'startMapScroll')]/a",6)[2].href
						vsx=vst.match(/x=(\d+)/)[1];
						vsy=vst.match(/y=(\d+)/)[1];
						wsx=usx-(usx-vsx)/2;
						wsy=usy-(usy-vsy)/2;
						DC=win(TWB_Map_Server());
						if(DC===null){
							zo=TWB_World(0);
							srv="http://"+zo+"."+TWB_Map_Server()+"/"+zo.replace(/\d+/,'')+"/?x="+wsx+"&y="+wsy;
							doc=openW('',srv);
						}
						else{
							DC.mov(wsx,wsy);
						}
					}
					else{
						Engines.State.add_p("router","TWB_Map_Int()","*",true);
						TWB_GoTo("map");
					}
				}catch(e){log('TWM Enhancements',e);}
			}
			else{
				$twb(TWB_Map_Int);
			}
		}
	},
	TWB_Mape : function(){
		with(twb_.lib){
			if(!twb_.pWIN.document.location.href.match(TWB_Map_Server())){
				return;
			}
			setTimeout(function(){
				// Turn off that console
				twb_.pWIN.wrappedJSObject.display.panel('messages',0,1);
				// Add farms
				for(fID in Dfarms){
					if(typeof twb_.pWIN.wrappedJSObject.vars.villages[fID]!="undefined"){
						continue;
					}
					twb_.pWIN.wrappedJSObject.highlight.add(fID,'village');
					twb_.pWIN.wrappedJSObject.highlight.edicol(fID, '#04B404', 'village')
				}
			},$get_var(0));
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-MMap")==null){
				// Add Button
				BTN("toolbarbutton",{id:"TWB-MMap",type:"button",tooltiptext:"TWM Map",oncommand:"try{twb_.lib.TWB_Map_Int();}catch(e){twb_.lib.log('Main',e);}"});
				if(typeof Engines.State.processes.mape=="undefined"){
					Engines.State.add_p("mape","TWB_Mape()","*",false);
				}
			}
		}
	}
});
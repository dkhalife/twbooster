// @Plugin = Command Center
// @Version = 1.7
// @Icons = ccenter
merge(twb_.lib,{
	TWB_Make_HTML : function(){
		with(twb_.lib){
			try{
				htmz='<div id="BuildingSummary" class="corners block" style="display: none;"><h1 align=center>'+TWB_RefBtn(0)+' '+TWB_RefBtn(0,1)+' '+lang("bsum")+'</h1>'+TWB_Make_Bsum()+'<br /><br /></div>';
				htmz+='<div id="TroopSummary" class="corners block" style="display: none;"><h1 align=center>'+TWB_RefBtn(1)+' '+TWB_RefBtn(1,1)+' '+lang("tsum")+'</h1>'+TWB_Make_Tsum()+'<br /><br /></div>';
				htmz+='<div id="Movements" class="corners block" style="display: none;"><h1 align=center>'+TWB_RefBtn(2)+' '+lang("msum")+'</h1>'+TWB_Make_Msum()+'<br /><br /></div>';
				htmz+='<div id="Research" class="corners block" style="display: none;"><h1 align=center>'+TWB_RefBtn(3)+' '+TWB_RefBtn(3,1)+' '+lang("rsum")+'</h1>'+TWB_Make_Rsum()+'<br /><br /></div>';
				htmz+='<div id="Queues" class="corners block" style="display: none;"><h1 align=center>'+TWB_RefBtn(4)+' '+lang("qsum")+'</h1>'+TWB_Make_Qsum()+'<br /><br /></div>';
				htmz+='<div id="Reports" class="corners block" style="display: none;"><h1 align=center>'+TWB_RefBtn(5)+' '+lang("title11")+'</h1>'+TWB_Make_RCsum()+'<br /><br /></div>';
				htmz+='<div id="Display" style="display :;" class="corners block"><h1 align="center">'+lang("title5")+'</h1><h3 align="center">Brought to you by:</h3><table align="center"><tbody><tr><td><img src="http://twbooster.com/phpBB3/download/file.php?avatar=249_1275914713.gif"></td><td></td><td><img src="http://twbooster.com/phpBB3/download/file.php?avatar=2_1274977686.gif"></td></tr><tr><td align="center"><b>ocdcsv</b></td><td>&amp;</td><td align="center"><b>enduo</b></td></tr></tbody></table><br><br></div><br /></div></BODY></HTML>';
				return htmz;
			}catch(e){log('Command Center',e);}
		}
	},
	TWB_RefBtn : function(z,t){
		if(typeof t=="undefined"){
			return "<a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_RE_CMD(window,'"+z+"')><img height=20 width=20 border=0 src='data:image/gif;base64,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'></a>";
		}
		else{
			return "";
			return "<a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_RE_CMD(window,'"+z+"','"+t+"')><img height=20 width=20 border=0 src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKCSURBVDiNjZNdSNNhGMV/7/8//5tZal8YZqVpw49S3NCFWJGT7MrlRdDWJwZSF3XXXVBBBIGEhlRgkRkaSgbSTWjYIitcH4JKaRRimR84sSTTSvd0YcqaUR144YXznMPh4TyICCIC5ai5f+jLLnQnZxe6U//EaQCpterU9ni6E6pVHSFwuDwJsTEr2+NWxTx3uDzWUF4DSFzG7vz1WFNWsiusQmWEzBQeLT5kOVZSHA4UhRqYAN6N0aor4rr9dEwH6AweUEo5szYmY9I1dF3PB84vSPDKLUcae0jrHWObHJdAUHxTcmJC3vCX7/R/niI1af0Wh8tjXmAAgM6UHBcJSZhlT0+LuP/hK80fprBtSjMDOQsMMupUWZGV7qSbqlmhVBDvtNvsPBicpmXgB3abDcC5YAerI8nPiGHF5He2vr9AuuOhpwMwmw2jIH1DPI+ffiSgNFIL1mI2jB0Ol+cs8K2tsVZml+inYfwbS/o+0Z750D0SuTiiO82aZF0XF8ub0UkmJAyl6XT5pyja6czq6x+Y7Op5O+RweezzheA6ll+lKThZWiEiIs8+jsuBJr9EXRuW6Cq/7GsZF9/AhIiInC67ItmFbuf8EiO+sEGdUSagufnRk5rbTV6U0vGOaOhhZvQwM62jJgSNu97H3PM+agC8GoDjjqrcm4kvOYlWn+2WJiIHSy9V1vR2+mjIsxC1yExkuEF9rmK45wXnyi83BAKBPW2NtTMaQKTB5mgLlrhoMozlpLQ11s7MmfR1+KjPhfocYej1y2DxNDB7QGuq1YmlBgdHJng+eFgOBRVJV0rdOFq8f6+hm7h4teo38bzB3+BweXSgBIgCSoPF/2XwL/wEuKorXrRfE0wAAAAASUVORK5CYII='></a>";
		}
	},
	TWB_Make_Bsum : function(filter){
		with(twb_.lib){
			try{
				BOT_PF=TWB_OVE("profiles_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				BOT_SF=TWB_OVE("bots_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				C=cN(gei("TWB-Villages"));
				DD=data.buildings;
				setting=(typeof filter!="undefined");
				perpage=$get_var("vilnbr");pages=0;
				var htm='<table class="example table-autosort:2 table-autopage:'+perpage+' sort vis" border="1" width="100%"><thead><tr><th class="table-sortable:default table-sortable">'+lang("TWB-Village")+'</th><th class="table-sortable:default table-sortable">'+lang("assign")+'</th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/main.png" title="'+lang("TWB-Main")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/barracks.png" title="'+lang("TWB-Barracks")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/stable.png" title="'+lang("TWB-Stable")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/garage.png" title="'+lang("TWB-Workshop")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/snob.png" title="'+lang("TWB-Snob")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/smith.png" title="'+lang("TWB-Smithy")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/place.png" title="'+lang("TWB-Place")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/market.png" title="'+lang("TWB-Market")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/wood.png" title="'+lang("TWB-Wood")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/stone.png" title="'+lang("TWB-Stone")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/iron.png" title="'+lang("TWB-Iron")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/farm.png" title="'+lang("TWB-Farm")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/storage.png" title="'+lang("TWB-Storage")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/hide.png" title="'+lang("TWB-Hide")+'" alt="" width="16" height="16"></th><th class="table-sortable:numeric table-sortable"><img oncontextmenu="return false;" border=0 src="http://'+TWB_World()+'graphic/buildings/wall.png" title="'+lang("TWB-Wall")+'" alt="" width="16" height="16"></th><th class="table-sortable:default table-sortable">'+lang("TWB-Sort10")+'</th><th class="table-sortable:default table-sortable">'+lang("TWB-AL")+'</th><th class="table-sortable:default table-sortable">'+lang("updated")+'</th><th class="table-sortable:default table-sortable">'+lang("expires")+'</th></tr></thead><tbody>';
				for(i1=0; i1<C.length; i1++){
					// Data
					vil=C[i1].getAttribute("id");
					dta=data.buildings;
					filtered=false;
					SF=TWB_GetO(local.curVillage,BOT_SF,"vil");
					SF=(SF===null)?null:TWB_GetO(SF.selected,BOT_PF,"name");
					if(typeof DD!="undefined"){
						D=DD[local.curVillage];
						if(SF!==null && typeof D!="undefined"){
							SF=SF.builds;
							main=TWB_CompF(D.main,SF.new_main);
							barracks=TWB_CompF(D.barracks,SF.new_bar);
							stable=TWB_CompF(D.stable,SF.new_sta);
							workshop=TWB_CompF(D.garage,SF.new_wor);
							academy=TWB_CompF(D.snob,SF.new_aca);
							smithy=TWB_CompF(D.smith,SF.new_smi);
							place=TWB_CompF(D.place,"1");
							market=TWB_CompF(D.market,SF.new_mar);
							wood=TWB_CompF(D.wood,SF.new_woo);
							clay=TWB_CompF(D.stone,SF.new_cla);
							iron=TWB_CompF(D.iron,SF.new_iro);
							farm=TWB_CompF(D.farm,SF.new_far);
							warehouse=TWB_CompF(D.storage,SF.new_war);
							hide=TWB_CompF(D.hide,SF.new_hid);
							wall=TWB_CompF(D.wall,SF.new_wal);
							filtered=(main || barracks || stable || workshop || academy || smithy || place || market || wood || clay || iron || farm || warehouse || hide || wall);
						}
					}
					if(typeof dta!="undefined" && typeof (dta[vil])!="undefined" && (setting==false || !filtered)){
						dta=dta[vil];
						assign=(typeof dta.assign!="undefined")?dta.assign:"<a align=center>-</a>";
						main=TWB_GetB("main",dta);
						barracks=TWB_GetB("barracks",dta);
						stable=TWB_GetB("stable",dta);
						garage=TWB_GetB("garage",dta);
						snob=TWB_GetB("snob",dta);
						smith=TWB_GetB("smith",dta);
						place=TWB_GetB("place",dta);
						market=TWB_GetB("market",dta);
						wood=TWB_GetB("wood",dta);
						stone=TWB_GetB("stone",dta);
						iron=TWB_GetB("iron",dta);
						farm=TWB_GetB("farm",dta);
						storage=TWB_GetB("storage",dta);
						hide=TWB_GetB("hide",dta);
						wall=TWB_GetB("wall",dta);
						CheckDST();
						servertime=getTime("1%3");
						now=Math.round(servertime.getTime()/1000);
						timestamp=dta.timestamp;
						group=(typeof groups[vil]=="undefined")?"N/A":groups[vil];
						alias=alias_[vil];
						fno=gei(vil).getAttribute("tooltiptext");
						finish=(typeof dta.assign!="undefined" && !isNaN(dta.timefinish))?dta.timefinish:"<a align=center>-</a>";
						updated=Math.round((now-timestamp)/60)+" "+lang("min")+" "+lang("ago");
						expires=(typeof dta.assign=="undefined" || isNaN(dta.timefinish))?finish:lang("in")+" "+Math.round((finish-now)/60)+" "+lang("min");
						name=TWB_GA(vil);
						if(name.match(/\[.+\]/)){
							name=name.split("[")[1].split("]")[0];
						}
						pages++;
						htm+='<tr id="'+vil+'_1"><td><a name="'+vil+'_" title="'+fno+'" href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx("'+vil+'",1)>'+name+'</a> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Ren("'+vil+'",window)></a></td><td>'+assign+'</td><td>'+main+'</td><td>'+barracks+'</td><td>'+stable+'</td><td>'+garage+'</td><td>'+snob+'</td><td>'+smith+'</td><td>'+place+'</td><td>'+market+'</td><td>'+wood+'</td><td>'+stone+'</td><td>'+iron+'</td><td>'+farm+'</td><td>'+storage+'</td><td>'+hide+'</td><td>'+wall+'</td><td align="center"><span name="'+vil+'">'+group+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Group_Ren("'+vil+'",window)></a></td><td align="center"><span id="'+vil+'_">'+alias+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Alias("'+vil+'",window)></a></td><td>'+updated+'</td><td>'+expires+'</td></tr>';
					}
				}
				htm+="</tbody><tfoot><th colspan=21>";
				// Pagination
				pages=Math.ceil(pages/perpage);
				for(i=0; i<pages; i++){
					Cl="";
					if(i==0){
						Cl=" currentpage";
					}
					htm+='<a onclick="pageexample('+i+',this.parentNode.parentNode.parentNode); return false;" class="pagelink'+Cl+'" id="page'+(i-(-1))+'" href="javascript:;">'+(i-(-1))+'</a>';
				}
				htm+="</th></tfoot></table>";
			}catch(e){log('Command Center',e);}
			return htm;
		}
	},
	TWB_Make_Tsum : function(filter){
		with(twb_.lib){
			try{
				show_archer=(TWB_WorldSet("game/archer")!=0)?"":"display: none;";
				show_knight=(TWB_WorldSet("game/knight")!=0)?"":"display: none;";
				BOT_PF=TWB_OVE("profiles_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				BOT_SF=TWB_OVE("bots_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				groups=TWB_OVE("groups_" + TWB_World(0) + "[" + twb_myID + "].twb",{});
				C=cN(gei("TWB-Villages"));
				DD=data.units;
				setting=(typeof filter!="undefined");
				perpage=$get_var("vilnbr");pages=0;
				var htm='<table class="example table-autosort:2 table-autopage:'+perpage+' sort vis" border="1" width="100%"><thead><tr><th class="table-sortable:default table-sortable">'+lang("TWB-Village")+'</th><th class="table-sortable:default table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_spear.png" title="'+lang("uni1")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_sword.png" title="'+lang("uni2")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_axe.png" title="'+lang("uni3")+' alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable" style="'+show_archer+'"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_archer.png" title="'+lang("uni4")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_spy.png" title="'+lang("uni5")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_light.png" title="'+lang("uni6")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable" style="'+show_archer+'"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_marcher.png" title="'+lang("uni7")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_heavy.png" title="'+lang("uni8")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_ram.png" title="'+lang("uni9")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_catapult.png" title="'+lang("uni10")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable" style="'+show_knight+'"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_knight.png" title="'+lang("uni11")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_snob.png" title="'+lang("uni12")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/holz.png" title="'+lang("TWB-Farm")+'" alt=""></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/lehm.png" title="'+lang("TWB-Farm")+'" alt=""></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/eisen.png" title="'+lang("TWB-Farm")+'" alt=""></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/face.png" title="'+lang("TWB-Farm")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/face.png" title="'+lang("TWB-Farm")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable">Diff</th><th class="table-sortable:default table-sortable">'+lang("TWB-Sort10")+'</th><th class="table-sortable:default table-sortable">'+lang("updated")+'</th></tr></thead><tbody>';
				for(i2 = 0; i2<C.length; i2++){
					// Data
					vil = C[i2].getAttribute("id");
					dta = data.units;
					filtered=false;
					SF=TWB_GetO(local.curVillage,BOT_SF,"vil");
					SF=(SF===null)?null:TWB_GetO(SF.selected,BOT_PF,"name");
					if(typeof DD!="undefined"){
						D=DD[local.curVillage];
						if(SF!==null && typeof D!="undefined"){
							SF=SF.units;
							spear=TWB_CompF(D.spear,SF.new_spear);
							sword=TWB_CompF(D.sword,SF.new_sword);
							axe=TWB_CompF(D.axe,SF.new_axe);
							archer=TWB_CompF(D.archer,SF.new_archer);
							spy=TWB_CompF(D.spy,SF.new_spy);
							light=TWB_CompF(D.light,SF.new_light);
							marcher=TWB_CompF(D.marcher,SF.new_marcher);
							heavy=TWB_CompF(D.heavy,SF.new_heavy);
							ram=TWB_CompF(D.ram,SF.new_ram);
							cat=TWB_CompF(D.catapult,SF.new_catapult);
							filtered=(spear || sword || axe || archer || spy || light || marcher || heavy || ram || cat);
						}
					}
					if(typeof dta!="undefined" && typeof (dta[vil])!="undefined" && (setting==false || !filtered)){
						dta=dta[vil];
						spear=TWB_GetB("spear",dta);
						sword=TWB_GetB("sword",dta);
						axe=TWB_GetB("axe",dta);
						archer=TWB_GetB("archer",dta);
						spy=TWB_GetB("spy",dta);
						light=TWB_GetB("light",dta);
						marcher=TWB_GetB("marcher",dta);
						heavy=TWB_GetB("heavy",dta);
						ram=TWB_GetB("ram",dta);
						catapult=TWB_GetB("catapult",dta);
						snob=TWB_GetB("snob",dta);
						knight=TWB_GetB("knight",dta);
						CheckDST();
						servertime=getTime("1%3");
						now=Math.round(servertime.getTime()/1000);
						timestamp=dta.timestamp;
						popu1=popu2=popudiff=" - ";
						if(typeof dta.population!="undefined"){
							popu1=parseInt(dta.population.split("/")[0]);
							popu2=parseInt(dta.population.split("/")[1]);
							popudiff=popu2-popu1;
						}
						if(typeof dta.resources!="undefined"){
							X=Math.round(parseInt(dta.resources[0])/1000);
							Y=Math.round(parseInt(dta.resources[1])/1000);
							Z=Math.round(parseInt(dta.resources[2])/1000);
						}
						updated=Math.round((now-timestamp)/60)+" "+lang("min")+" "+lang("ago");
						fno=gei(vil).getAttribute("tooltiptext");
						group=(typeof groups[vil]=="undefined")?"N/A":groups[vil];
						name=TWB_GA(vil);
						if(name.match(/\[.+\]/)){
							name=name.split("[")[1].split("]")[0];
						}
						// Outside
						dtaO=data.units[vil].outside=(typeof data.units[vil].outside=="object")?data.units[vil].outside:new Object();
						updatedO=dtaO.timestamp;
						if(typeof updatedO=="undefined"){
							updatedO="-";
						}
						else{
							updatedO=Math.round((now-updatedO)/60)+" "+lang("min")+" "+lang("ago");
						}
						spearO=TWB_GetB("spear",dtaO);
						swordO=TWB_GetB("sword",dtaO);
						axeO=TWB_GetB("axe",dtaO);
						archerO=TWB_GetB("archer",dtaO);
						spyO=TWB_GetB("spy",dtaO);
						lightO=TWB_GetB("light",dtaO);
						marcherO=TWB_GetB("marcher",dtaO);
						heavyO=TWB_GetB("heavy",dtaO);
						ramO=TWB_GetB("ram",dtaO);
						catapultO=TWB_GetB("catapult",dtaO);
						snobO=TWB_GetB("snob",dtaO);
						knightO=TWB_GetB("knight",dtaO);
						// Total
						upd1=updated.match(/\d+/);
						upd2=updatedO.match(/\d+/);
						updatedT=-1;
						if(upd1 || upd2){
							upd1=typeof upd1!="undefined"?upd1:0;
							upd2=typeof upd2!="undefined"?upd2:0;
							updatedT=sm(upd1,upd2,1)+" "+lang("min")+" "+lang("ago");
						}
						else{
							updatedT="-";
						}
						spearT=spear-(-spearO);
						swordT=sword-(-swordO);
						axeT=axe-(-axeO);
						archerT=archer-(-archerO);
						spyT=spy-(-spyO);
						lightT=light-(-lightO);
						marcherT=marcher-(-marcherO);
						heavyT=heavy-(-heavyO);
						ramT=ram-(-ramO);
						catapultT=catapult-(-catapultO);
						snobT=snob-(-snobO);
						knightT=knight-(-knightO);
						pages++;
						// Inside
						htm+='<tr id="'+vil+'_2"><td align="center"><a title="'+fno+'" href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_Go_Ral("'+vil+'",1) name="'+vil+'_">'+name+'</a> <a href=javascript:void(0)><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Ren("'+vil+'",window)></a></td><td align="center">'+spear+'<br>'+spearO+'<br>'+spearT+'</td><td align="center">'+sword+'<br>'+swordO+'<br>'+swordT+'</td><td align="center">'+axe+'<br>'+axeO+'<br>'+axeT+'</td><td align="center" style="'+show_archer+'">'+archer+'<br>'+archerO+'<br>'+archerT+'</td><td align="center">'+spy+'<br>'+spyO+'<br>'+spyT+'</td><td align="center">'+light+'<br>'+lightO+'<br>'+lightT+'</td><td align="center" style="'+show_archer+'">'+marcher+'<br>'+marcherO+'<br>'+marcherT+'</td><td align="center">'+heavy+'<br>'+heavyO+'<br>'+heavyT+'</td><td align="center">'+ram+'<br>'+ramO+'<br>'+ramT+'</td><td align="center">'+catapult+'<br>'+catapultO+'<br>'+catapultT+'</td><td align="center" style="'+show_knight+'">'+knight+'<br>'+knightO+'<br>'+knightT+'</td><td align="center">'+snob+'<br>'+snobO+'<br>'+snobT+'</td><td align="center">'+X+'</td><td align="center">'+Y+'</td><td align="center">'+Z+'</td><td align="center">'+popu1+'</td><td align="center">'+popu2+'</td><td align="center">'+popudiff+'</td><td align="center"><span name="'+vil+'">'+group+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Group_Ren("'+vil+'",window)></a></td><td align="center">'+updated+'</td></tr>';
					}
				}
				htm+="</tbody><tfoot><th colspan=21>";
				// Pagination
				pages=Math.ceil(pages/perpage);
				for(i=0; i<pages; i++){
					Cl="";
					if(i==0){
						Cl=" currentpage";
					}
					htm+='<a onclick="pageexample('+i+',this.parentNode.parentNode.parentNode); return false;" class="pagelink'+Cl+'" id="page'+(i-(-1))+'" href="javascript:;">'+(i-(-1))+'</a>';
				}
				htm+="</th></tfoot></table>";
			}catch (e) {log("Command Center",e); } 
			return htm;
		}
	},
	TWB_Make_Msum : function(){
		with(twb_.lib){
			try{
				world=TWB_World(0);
				inbound=new Array();
				outbound=new Array();
				support=new Array();
				expired_cmd=new Array();
				C=cN(gei("TWB-Villages"));
				for(i3=0; i3<C.length; i3++){
					vil=C[i3].getAttribute("id");
					dta=data.cache;
					if(typeof dta!="undefined" && typeof (dta[vil])!="undefined"){
						dta=dta[vil];
						if(typeof dta!="undefined"){
							name=TWB_GA(vil);
							if(name.match(/\[.+\]/)){
								name=name.split("[")[1].split("]")[0];
							}
							for(j=0; j<dta.length; j++){
								formtype=dta[j].formtype;
								actionid=dta[j].actionid;
								CheckDST();
								servertime=getTime("1%3");
								timestamp=Math.round(servertime.getTime()/1000);
								timefinish=dta[j].timefinish;
								if((timefinish-timestamp)>0){
									switch(formtype){
										case 'incoming' : inbound.push(actionid,vil); break;
										case 'support' : 
										case 'isupport' : support.push(actionid,vil); break;
										default: outbound.push(actionid,vil); break;
									}
								}
								else{
									expired_cmd.push(actionid,vil);
								}
							}
						}
					}
				}
				if($get_var("delex")=="true"){
					TWB_DEL_CMD(expired_cmd);
				}
				var htm='<table width=100% border=1 class="example sort vis"><thead>';
				htm+='<tr><th colspan=7><b>'+lang("outb")+'</b></th></tr><tr><th>'+lang("anid")+'</th><th>From</th><th>To</th><th>'+lang("typ")+'</th><th>'+lang("arriv")+'</th><th>'+lang("arriv")+'</th><th>'+lang("label")+'</th></tr></thead><tbody>'; //**OCDCSV ADDED
				//htm+='<tr><td colspan=5><b>'+lang("outb")+'</b></td></tr><tr><th colspan=2>'+lang("desc")+'</th><th>'+lang("typ")+'</th><th>'+lang("arriv")+'</th><th>'+lang("label")+'</th></tr>'; //**OCDCSV DISABLED
				for(i=0; i<outbound.length; i=i+2){
					actionid=outbound[i];
					vil=outbound[i+1];
					if(typeof vil!="undefined" && typeof data.cache[vil]!="undefined"){
						dta=TWB_GetD(actionid,data.cache[vil]);
						if(typeof dta!="undefined"){
							type=dta.formtype;
							actionid=dta.actionid;
							CheckDST();
							servertime=getTime("1%3");
							now=Math.round(servertime.getTime()/1000);
							finish=dta.timefinish;
							timeleft=finish-now;
							hrs=Math.floor(timeleft/3600);
							min=Math.floor((timeleft-(3600*hrs))/60);
							sec=Math.floor(timeleft-(3600*hrs)-(60*min));
							if (hrs < 10) hrs = "0" + hrs; //**OCDCSV ADDED
							if (min < 10) min = "0" + min; //**OCDCSV ADDED
							if (sec < 10) sec = "0" + sec; //**OCDCSV ADDED
							arrival=hrs+":"+min+":"+sec;
							label=dta.label;
							//attackto=dta.targetcoords + " " + dta.troops; //**OCDCSV ADDED
							X=gei(vil);
							attackto=TWB_Parse_Url("<a class='meffect' id='"+actionid+"|"+vil+"' href='http://"+TWB_World()+"game.php?vilage="+X.getAttribute("id")+"&screen=place' target='_blank'>"+TWB_GA(X)+" "+X.getAttribute("tooltiptext")+"</a>"); //**OCDCSV ADDED -> Fixed enduo
							if(label.match("game.php")){
								label=label.split('<a')[0]+label.split('href')[1].split(">")[1];
							}
							foimg=(type=="rattack")?"return":"attack";
							name=TWB_Parse_Url(dta.name,actionid,vil);
							//htm+='<tr class="odd"><td colspan=2 align="center"><img src="http://'+TWB_World()+'graphic/command/'+foimg+'.png">'+name+'</td><td align="center">'+type+'</td><td align="center"><span class="timer" name="timer_'+actionid+'">'+arrival+'</span></td><td align="center"><span id="'+actionid+'">'+label+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Label_Ren("'+actionid+'","'+vil+'",window)></a></td></tr>'; //**OCDCSV DISABLED
							htm+='<tr><td>'+actionid+'</td><td>'+attackto+'</td><td align="center">'+dta.player+' <img src="http://'+TWB_World()+'graphic/command/'+foimg+'.png">'+name+'</td><td align="center">'+type+'</td><td align="center"><span class="timer" name="timer_'+actionid+'">'+arrival+'</span></td><td align="right">'+timeleft+'</td><td align="center"><span id="'+actionid+'">'+label+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Label_Ren("'+actionid+'","'+vil+'",window)></a></td></tr>'; //**OCDCSV ADDED
						}
					}
				}
				//htm+='<tr><td colspan=5><b>'+lang("inb")+'</b></td></tr><tbody id="attacks"><tr><th><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_SortThis(this.parentNode.parentNode.parentNode,0,window,5)>#</a></th><th>'+lang("desc")+'</th><th>'+lang("f2")+'</th><th><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_SortThis(this.parentNode.parentNode.parentNode,3,window,5)>'+lang("arriv")+'</a></th><th>'+lang("guess")+'</th></tr>'; //**OCDCSV DISABLED
				htm+='</tbody><thead><tr><th colspan=7><b>'+lang("inb")+'</b></th></tr><tr><th class="table-sortable:numeric table-sortable">#</th><th>'+lang("desc")+'</th><th>'+lang("f2")+'</th><th>'+lang("typ")+'</th><th class="table-sortable:numeric table-sortable">'+lang("arriv")+'</th><th>'+lang("arriv")+'</th><th>'+lang("guess")+'</th></tr></thead><tbody id="attacks">'; //**OCDCSV ADDED
				for(i=0; i<inbound.length; i=i+2){
					vil=inbound[i+1];
					actionid=inbound[i];
					if(typeof vil!="undefined" && typeof data.cache[vil]!="undefined"){
						dta=TWB_GetD(actionid,data.cache[vil]);
						type=dta.formtype; //**OCDCSV ADDED
						attacker=TWB_Parse_Url(dta.attacker);
						coords=TWB_Parse_Url(dta.from);
						CheckDST();
						servertime=getTime("1%3");
						timestamp=Math.round(servertime.getTime()/1000);
						timefinish=dta.timefinish;
						timeleft=timefinish-timestamp;
						hrs=Math.floor(timeleft/3600);
						min=Math.floor((timeleft-(3600*hrs))/60);
						sec=Math.floor(timeleft-(3600*hrs)-(60*min));
						if (hrs < 10) hrs = "0" + hrs; //**OCDCSV ADDED
						if (min < 10) min = "0" + min; //**OCDCSV ADDED
						if (sec < 10) sec = "0" + sec; //**OCDCSV ADDED
						arrival=hrs+":"+min+":"+sec;
						guess=dta.guess;
						SRC="http://"+TWB_World()+"graphic/unit/unit_";
						switch(guess){
							case "spaxar": guess="<img src='"+SRC+"spear.png'> <img src='"+SRC+"axe.png'> <img src='"+SRC+"archer.png'>"; break;
							case "sw": guess="<img src='"+SRC+"sword.png'>"; break;
							case "sc": guess="<img src='"+SRC+"spy.png'>"; break;
							case "lcma": guess="<img src='"+SRC+"light.png'> <img src='"+SRC+"marcher.png'>"; break;
							case "hc": guess="<img src='"+SRC+"heavy.png'>"; break;
							case "raca": guess="<img src='"+SRC+"ram.png'> <img src='"+SRC+"catapult.png'>"; break;
							case "nob": guess="<img src='"+SRC+"snob.png'>"; break;
							case "N/A": break;
						}
						name=TWB_Parse_Url(dta.name);
						//htm+='<tr class="odd" name="attacks" id="'+vil+'_'+actionid+'_2"><td align="center">'+actionid+'</td><td align="center"><img src="http://'+TWB_World()+'graphic/command/attack.png"> '+name+'</td><td align="center">'+attacker+' - '+coords+'</td><td align="center"><span class="timer" name="timer2_'+actionid+'">'+arrival+'</span></td><td align="center">'+guess+'</td></tr>'; //**OCDCSV DISABLED
						htm+='<tr name="attacks" id="'+vil+'_'+actionid+'_2"><td align="center">'+actionid+'</td><td align="center"><img src="http://'+TWB_World()+'graphic/command/attack.png"> '+name+'</td><td align="center">'+attacker+' - '+coords+'</td><td align="center">'+type+'</td><td align="center"><span class="timer" name="timer2_'+actionid+'">'+arrival+'</span></td><td align="right">'+timeleft+'</td><td align="center">'+guess+'</td></tr>'; //**OCDCSV ADDED
					}
				}
				//htm+='</tbody><tr><td colspan=5><b>'+lang("TWB-Sort8")+'</b></td></tr><tr><th colspan=2>'+lang("desc")+'</th><th>'+lang("f2")+'/'+lang("to")+'</th><th>'+lang("arriv")+'</th><th>'+lang("label")+'</th></tr>'; //**OCDCSV DISABLED
				htm+='</tbody><thead><tr><th colspan=7><b>'+lang("TWB-Sort8")+'</b></th></tr><tr><th>'+lang("anid")+'</th><th>'+lang("desc")+'</th><th>'+lang("f2")+'/'+lang("to")+'</th><th>'+lang("typ")+'</th><th>'+lang("arriv")+'</th><th>'+lang("arriv")+'</th><th>'+lang("label")+'</th></tr></thead><tbody>'; //**OCDCSV ADDED
				for(i=0; i<support.length; i=i+2){
					vil=support[i+1];
					actionid=support[i];
					if(typeof vil!="undefined" && typeof data.cache[vil]!="undefined"){ //**OCDCSV ADDED
						dta=TWB_GetD(actionid,data.cache[vil]);
						if(typeof dta!="undefined"){ //**OCDCSV ADDED
							type=dta.formtype; //**OCDCSV ADDED
							plat=(typeof dta.player=="undefined")?dta.attacker:dta.player;
							plat=TWB_Parse_Url(plat);
							label=TWB_Parse_Url(dta.label);
							servertime=getTime("1%3");
							timestamp=Math.round(servertime.getTime()/1000);
							timefinish=dta.timefinish; // Added by ocdcsv
							timeleft=timefinish-timestamp;
							hrs=Math.floor(timeleft/3600);
							min=Math.floor((timeleft-(3600*hrs))/60);
							sec=Math.floor(timeleft-(3600*hrs)-(60*min));
							if (hrs < 10) hrs = '0' + hrs; //**OCDCSV ADDED 
							if (min < 10) min = '0' + min; //**OCDCSV ADDED 
							if (sec < 10) sec = '0' + sec; //**OCDCSV ADDED
							arrival=hrs+":"+min+":"+sec;
							label=dta.label;
							name=TWB_Parse_Url(dta.name,actionid,vil);
							//htm+='<tr class="odd"><td colspan=2 align="center"><img src="http://'+TWB_World()+'graphic/command/support.png"> '+name+'</td><td align="center">'+plat+'</td><td align="center"><span class="timer">'+arrival+'</span></td><td align="center">'+label+' <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Label_Ren("'+actionid+'","'+vil+'",window)></a></td></tr>'; // **OCDCSV DISABLED
							htm+='<tr><td>'+actionid+'</td><td align="center"><img src="http://'+TWB_World()+'graphic/command/support.png"> '+name+'</td><td align="center">'+plat+'</td><td align="center">'+type+'</td><td align="center"><span class="timer">'+arrival+'</span></td><td align="right">'+timeleft+'</td><td align="center">'+label+' <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Label_Ren("'+actionid+'","'+vil+'",window)></a></td></tr>'; //**OCDCSV ADDED
						} //**OCDCSV ADDED
					} //**OCDCSV ADDED
				}
				htm+='</tbody></table>';
			}catch(e){log('Command Center',e);}
			return htm;
		}
	},
	TWB_Make_Rsum : function(filter){
		with(twb_.lib){
			try{
				show_archer=(TWB_WorldSet("game/archer")!=0)?"":"display: none;";
				BOT_PF=TWB_OVE("profiles_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				BOT_SF=TWB_OVE("bots_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				DD=data.techs;
				setting=(typeof filter!="undefined");
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				perpage=$get_var("vilnbr");pages=0;
				var htm='<table class="example table-autosort:2 table-autopage:'+perpage+' sort vis" border="1" width="100%"><thead><tr><th  class="table-sortable:default table-sortable">'+lang("TWB-Village")+'</th><th  class="table-sortable:default table-sortable">'+lang("assign")+'</th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_spear.png" title="'+lang("uni1")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_sword.png" title="'+lang("uni2")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_axe.png" title="'+lang("uni3")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable" style="'+show_archer+'"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_archer.png" title="'+lang("uni4")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_spy.png" title="'+lang("uni5")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_light.png" title="'+lang("uni6")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable" style="'+show_archer+'"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_marcher.png" title="'+lang("uni7")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_heavy.png" title="'+lang("uni8")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_ram.png" title="'+lang("uni9")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/unit/unit_catapult.png" title="'+lang("uni10")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable">Total</th><th class="table-sortable:default table-sortable">'+lang("TWB-Sort10")+'</th><th class="table-sortable:default table-sortable">'+lang("updated")+'</th><th class="table-sortable:default table-sortable">'+lang("expires")+'</th></tr></thead><tbody>';
				C=cN(gei("TWB-Villages"));
				for(i4=0; i4<C.length; i4++) {
					// Data
					vil=C[i4].getAttribute("id");
					dta=data.techs;
					filtered=false;
					SF=TWB_GetO(local.curVillage,BOT_SF,"vil");
					SF=(SF===null)?null:TWB_GetO(SF.selected,BOT_PF,"name");
					if(typeof DD!="undefined"){
						D=DD[local.curVillage];
						if(SF!==null && typeof D!="undefined"){
							SF=SF.techs;
							spear=TWB_CompF(D.spear,SF.new__spear);
							sword=TWB_CompF(D.sword,SF.new__sword);
							axe=TWB_CompF(D.axe,SF.new__axe);
							archer=TWB_CompF(D.archer,SF.new__archer);
							spy=TWB_CompF(D.spy,SF.new__spy);
							light=TWB_CompF(D.light,SF.new__light);
							marcher=TWB_CompF(D.marcher,SF.new__marcher);
							heavy=TWB_CompF(D.heavy,SF.new__heavy);
							ram=TWB_CompF(D.ram,SF.new__ram);
							cat=TWB_CompF(D.catapult,SF.new__catapult);
							filtered=(spear || sword || axe || archer || spy || light || marcher || heavy || ram || cat);
						}
					}
					if(typeof dta!="undefined" && typeof (dta[vil])!="undefined" && (setting==false || !filtered)){
						dta=dta[vil];
						spear=TWB_GetB("spear",dta);
						sword=TWB_GetB("sword",dta);
						axe=TWB_GetB("axe",dta);
						archer=TWB_GetB("archer",dta);
						spy=TWB_GetB("spy",dta);
						light=TWB_GetB("light",dta);
						marcher=TWB_GetB("marcher",dta);
						heavy=TWB_GetB("heavy",dta);
						ram=TWB_GetB("ram",dta);
						catapult=TWB_GetB("catapult",dta);
						total=parseInt(spear)+parseInt(sword)+parseInt(axe)+parseInt(archer)+parseInt(spy)+parseInt(light)+parseInt(marcher)+parseInt(heavy)+parseInt(ram)+parseInt(catapult);
						CheckDST();
						servertime=getTime("1%3");
						now=Math.round(servertime.getTime()/1000);
						timestamp=dta.timestamp;
						finish=dta.timefinish;
						assign=dta.assign;
						updated=Math.round((now-timestamp)/60)+" "+lang("min")+" "+lang("ago");
						expires=(assign=="-")?"-":lang("in")+" "+Math.round((finish-now)/60)+" "+lang("min");
						fno=gei(vil).getAttribute("tooltiptext");
						group=(typeof groups[vil]=="undefined")?"N/A":groups[vil];
						name=TWB_GA(vil);
						if(name.match(/\[.+\]/)){
							name=name.split("[")[1].split("]")[0];
						}
						pages++;
						htm+='<tr id="'+vil+'_3"><td align="center"><a title="'+fno+'" href=javascript:void(0); name="'+vil+'_" onclick=javascript:window.openerx.twb_.lib.TWB_Go_Smi("'+vil+'",1)>'+name+'</a> <a href=javascript:void(0)><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Ren("'+vil+'",window)></a></td><td align="center">'+assign+'</td><td align="center">'+spear+'</td><td align="center">'+sword+'</td><td align="center">'+axe+'</td><td align="center" style="'+show_archer+'">'+archer+'</td><td align="center">'+spy+'</td><td align="center">'+light+'</td><td align="center" style="'+show_archer+'">'+marcher+'</td><td align="center">'+heavy+'</td><td align="center">'+ram+'</td><td align="center">'+catapult+'</td><td align="center">'+total+'</td><td align="center"><span name="'+vil+'">'+group+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Group_Ren("'+vil+'",window)></a></td><td align="center">'+updated+'</td><td align="center">'+expires+'</td></tr>';
					}
				}
				htm+="</tbody><tfoot><th colspan=16>";
				// Pagination
				pages=Math.ceil(pages/perpage);
				for(i=0; i<pages; i++){
					Cl="";
					if(i==0){
						Cl=" currentpage";
					}
					htm+='<a onclick="pageexample('+i+',this.parentNode.parentNode.parentNode); return false;" class="pagelink'+Cl+'" id="page'+(i-(-1))+'" href="javascript:;">'+(i-(-1))+'</a>';
				}
				htm+="</th></tfoot></table>";
			}catch (e) { log("Command Center",e); }
			return htm;
		}
	},
	TWB_Make_Qsum : function(){
		with(twb_.lib){
			try{
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				perpage=$get_var("vilnbr");pages=0;
				var htm='<table class="example table-autosort:2 table-autopage:'+perpage+' sort vis" border="1" width="100%"><thead><tr><th class="table-sortable:default table-sortable">'+lang("TWB-Village")+'</th><th colspan=3>'+lang("assign")+'</th><th class="table-sortable:default table-sortable">'+lang("TWB-Sort10")+'</th><th class="table-sortable:default table-sortable">'+lang("TWB-AL")+'</th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/holz.png" title="'+lang("TWB-Farm")+'" alt=""></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/lehm.png" title="'+lang("TWB-Farm")+'" alt=""></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/eisen.png" title="'+lang("TWB-Farm")+'" alt=""></th><th class="table-sortable:numeric table-sortable"><img border=0 src="http://'+TWB_World()+'graphic/face.png" title="'+lang("TWB-Farm")+'" alt="" width="18" height="18"></th><th class="table-sortable:numeric table-sortable">Expires</th><th class="table-sortable:numeric table-sortable">Diff</th><th class="table-sortable:default table-sortable">'+lang("updated")+'</th></tr></thead><tbody>'; //**OCDCSV MODIFIED
				C=cN(gei("TWB-Villages"));
				for(i5=0; i5<C.length; i5++){
					// Data
					vil=C[i5].getAttribute("id");
					dta2=data.units;
					dta=data.queues;
					expires_1=expires_2=expires_3="99999999"; //**OCDCSV ADDED
					queu_1=queu_2=queu_3="";
					updated1=updated2=updated3="-";
					if(typeof dta!="undefined" && typeof dta[vil]!="undefined"){
						dta=dta[vil];
						spear=TWB_GetB("spear",dta);
						sword=TWB_GetB("sword",dta);
						axe=TWB_GetB("axe",dta);
						archer=TWB_GetB("archer",dta);
						spy=TWB_GetB("spy",dta);
						light=TWB_GetB("light",dta);
						marcher=TWB_GetB("marcher",dta);
						heavy=TWB_GetB("heavy",dta);
						ram=TWB_GetB("ram",dta);
						catapult=TWB_GetB("catapult",dta);
						CheckDST();
						servertime=getTime("1%3");
						now=Math.round(servertime.getTime()/1000);
						// Queues Part I
						if(typeof dta.timestamp1!="undefined"){
							updated1=Math.round((now-dta.timestamp1)/60)+" "+lang("min")+" "+lang("ago")
							queu=dta.queu1;
							finish=-dta.timestamp1-(-now);
							for(vi=0; vi<queu.length; vi++){
								queu_1+=queu[vi][0];
								finish=-(queu[vi][2]-finish);
								expires=lang("in")+" "+Math.round(-finish/60)+" "+lang("min");
								expires_1=Math.round(-finish/60); //**OCDCSV ADDED
								queu_1=queu_1.replace(lang("uni1"),"<img src='http://"+TWB_World()+"graphic/unit/unit_spear.png' title='"+queu[vi][1]+" "+expires+"'> ");
								queu_1=queu_1.replace(lang("uni3"),"<img src='http://"+TWB_World()+"graphic/unit/unit_axe.png' title='"+queu[vi][1]+" "+expires+"'> ");
								queu_1=queu_1.replace(lang("uni2"),"<img src='http://"+TWB_World()+"graphic/unit/unit_sword.png' title='"+queu[vi][1]+" "+expires+"'> ");
								queu_1=queu_1.replace(lang("uni4"),"<img src='http://"+TWB_World()+"graphic/unit/unit_archer.png' title='"+queu[vi][1]+" "+expires+"'> ");
							}
						}
						// Queues Part II
						if(typeof dta.timestamp2!="undefined"){
							updated2=Math.round((now-dta.timestamp2)/60)+" "+lang("min")+" "+lang("ago")
							queu=dta.queu2;
							finish=-dta.timestamp2-(-now);
							for(vi=0; vi<queu.length; vi++){
								queu_2+=queu[vi][0];
								finish=-(queu[vi][2]-finish);
								expires=lang("in")+" "+Math.round(-finish/60)+" "+lang("min");
								expires_2=Math.round(-finish/60); //**OCDCSV ADDED
								queu_2=queu_2.replace(lang("uni5"),"<img src='http://"+TWB_World()+"graphic/unit/unit_spy.png' title='"+spy+" "+expires+"'>");
								queu_2=queu_2.replace(lang("uni6"),"<img src='http://"+TWB_World()+"graphic/unit/unit_light.png' title='"+light+" "+expires+"'>");
								queu_2=queu_2.replace(lang("uni8"),"<img src='http://"+TWB_World()+"graphic/unit/unit_heavy.png' title='"+heavy+" "+expires+"'>");
								queu_2=queu_2.replace(lang("uni7"),"<img src='http://"+TWB_World()+"graphic/unit/unit_marcher.png' title='"+heavy+" "+expires+"'>");
							}
						}
						// Queues Part III
						if(typeof dta.timestamp3!="undefined"){
							updated3=Math.round((now-dta.timestamp3)/60)+" "+lang("min")+" "+lang("ago")
							queu=dta.queu3;
							finish=-dta.timestamp3-(-now);
							for(vi=0; vi<queu.length; vi++){
								queu_3+=queu[vi][0];
								finish=-(queu[vi][2]-finish);
								expires=lang("in")+" "+Math.round(-finish/60)+" "+lang("min");
								expires_3=Math.round(-finish/60); //**OCDCSV ADDED
								queu_3=queu_3.replace(lang("uni9"),"<img src='http://"+TWB_World()+"graphic/unit/unit_ram.png' title='"+ram+" "+expires+"'>");
								queu_3=queu_3.replace(lang("uni10"),"<img src='http://"+TWB_World()+"graphic/unit/unit_catapult.png' title='"+catapult+" "+expires+"'>");
							}
						}
					}
					// Only add when there is valuable data
					if(typeof dta2!="undefined" && typeof dta2[vil]!="undefined"){
						if((typeof dta2[vil].population!="undefined" && parseInt(dta2[vil].population.split("/")[0]) < 23000) || queu_1.length>0 || queu_2.length>0 || queu_3.length>0){ //**OCDCSV MODIFIED
							// Enhancements
							//dta2=dta2[vil];
							popu1=popu2=popudiff=X=Y=Z=" - ";
							if(typeof dta2[vil].population!="undefined"){
								popu1=parseInt(dta2[vil].population.split("/")[0]);
								popu2=parseInt(dta2[vil].population.split("/")[1]);
								popudiff=popu2-popu1;
							}
							if(typeof dta2[vil].resources!="undefined"){
								X=Math.round(parseInt(dta2[vil].resources[0])/1000);
								Y=Math.round(parseInt(dta2[vil].resources[1])/1000);
								Z=Math.round(parseInt(dta2[vil].resources[2])/1000)
							}
							fno=gei(vil).getAttribute("tooltiptext");
							updated=updated1+","+updated2+","+updated3;
							alias=alias_[vil];
							group=(typeof groups[vil]=="undefined")?"N/A":groups[vil];
							name=TWB_GA(vil);
							if(name.match(/\[.+\]/)){
								name=name.split("[")[1].split("]")[0];
							}
							pages++;
							htm+='<tr id="'+vil+'_4"><td align="center"><a title="'+fno+'" href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx("'+vil+'",1) name="'+vil+'_">'+name+'</a> <a href=javascript:void(0)><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Ren("'+vil+'",window)></a></td><td>'+queu_1+'</td><td>'+queu_2+'</td><td>'+queu_3+'</td><td align="center"><span name="'+vil+'">'+group+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Group_Ren("'+vil+'",window)></a></td><td align="center"><span id="'+vil+'_">'+alias+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Alias("'+vil+'",window)></a></td><td align="center">'+X+'</td><td align="center">'+Y+'</td><td align="center">'+Z+'</td><td align="center">'+popu1+'</td><td align="center">'+sm(expires_1,sm(expires_2,expires_3))+'</td><td align="center">'+popudiff+'</td><td>'+updated+'</td></tr>'; //**OCDCSV MODIFIED
						}
					}
				}
				htm+="</tbody><tfoot><th colspan=21>";
				// Pagination
				pages=Math.ceil(pages/perpage);
				for(i=0; i<pages; i++){
					Cl="";
					if(i==0){
						Cl=" currentpage";
					}
					htm+='<a onclick="pageexample('+i+',this.parentNode.parentNode.parentNode); return false;" class="pagelink'+Cl+'" id="page'+(i-(-1))+'" href="javascript:;">'+(i-(-1))+'</a>';
				}
				htm+="</th></tfoot></table>";
			}catch(e){log("Command Center",e);}
			return htm;
		}
	},
	TWB_Load_Attack : function(o,d){
		with(twb_.lib){
			try{
				// Show attack contents
				SRC="http://"+TWB_World()+"graphic/";
				o=o.split("|");
				dt=data.cache[o[1]];
				for(i=0; i<dt.length; i++){
					if(dt[i].actionid==o[0]){
						dta=dt[i];
						break;
					}
				}
				dta=dta.troops;
				sp=dta[0];
				sw=dta[1];
				ax=dta[2];
				ar=dta[3];
				sc=dta[4];
				li=dta[5];
				ma=dta[6];
				he=dta[7];
				ra=dta[8];
				ca=dta[9];
				sn=dta[10];
				ki=dta[11];
				gei("tooltip",d).innerHTML='<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#804000" id="demo2"><tr><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_spear.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_sword.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_axe.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_archer.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_spy.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_light.png"></td></tr><tr><td bgcolor="#F1EDE1" align="center">'+sp+'</td><td bgcolor="#F1EDE1" align="center">'+sw+'</td><td bgcolor="#F1EDE1" align="center">'+ax+'</td><td bgcolor="#F1EDE1" align="center">'+ar+'</td><td bgcolor="#F1EDE1" align="center">'+sc+'</td><td bgcolor="#F1EDE1" align="center">'+li+'</td></tr><tr><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_marcher.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_heavy.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_ram.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_catapult.png"></td><td width=50 bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_snob.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_knight.png"></td></tr><tr><td bgcolor="#F1EDE1" align="center">'+ma+'</td><td bgcolor="#F1EDE1" align="center">'+he+'</td><td bgcolor="#F1EDE1" align="center">'+ra+'</td><td bgcolor="#F1EDE1" align="center">'+ca+'</td><td bgcolor="#F1EDE1" align="center">'+sn+'</td><td bgcolor="#F1EDE1" align="center">'+ki+'</td></tr></table>';
			}catch(e){log('Command Center',e);}
		}
	},
	TWB_Make_RCsum : function(){
		with(twb_.lib){
			try{
				perpage=$get_var("vilnbr");pages=0;
				var htm='<div id=rctable><table class="example table-autosort:1 table-autopage:'+perpage+' sort vis" border="1" width="100%"><thead><tr><th class="table-sortable:numeric table-sortable">'+lang("TWB-Sort14")+'</th><th class="table-sortable:default table-sortable">'+lang("tori")+'</th><th class="table-sortable:default table-sortable">'+lang("ao1")+'</th><th class="table-sortable:numeric table-sortable">'+lang("attk")+'</th><th class="table-sortable:numeric table-sortable">'+lang("defd")+'</th><th class="table-sortable:default table-sortable">'+lang("uni5")+'</th><th class="table-sortable:numeric table-sortable">'+lang("rleftuni")+'</th><th class="table-sortable:numeric table-sortable">'+lang("routsuni")+'</th><th class="table-sortable:numeric table-sortable">'+lang("TWB-Wall")+'</th><th colspan="2">'+lang("walldmg")+'</th><th class="table-sortable:date table-sortable">'+lang("updated")+'</th></tr></thead><tbody>';
				for(i6=0; i6<reports.length; i6++){
					try{
						dta=reports[i6];
						label=dta.name;
						RID=dta.id;
						date=dta.dtime;
						// Parse links
						defender=TWB_Parse_Url(dta.defender);
						dvillage=TWB_Parse_Url(dta.dvillage);
						// Lets calculate the K instead since some servers have C instead of K
						coords=getC(dvillage);
						K=+10*(Math.floor(coords[1]/100))+Math.floor(coords[0]/100);
						wall=(dta.buildings.wall)?dta.buildings.wall:"-";
						xy=getC(dvillage).join("|");
						// Get Units : defender
						dunits=dta.units.defender;
						a1_spy=dta.units.attacker[0].spy;
						d1_spear=(dunits[0].spear)?dunits[0].spear:0;
						d1_sword=(dunits[0].sword)?dunits[0].sword:0;
						d1_axe=(dunits[0].axe)?dunits[0].axe:0;
						d1_archer=(dunits[0].archer)?dunits[0].archer:0;
						d1_spy=(dunits[0].spy)?dunits[0].spy:0;
						d1_light=(dunits[0].light)?dunits[0].light:0;
						d1_marcher=(dunits[0].marcher)?dunits[0].marcher:0;
						d1_heavy=(dunits[0].heavy)?dunits[0].heavy:0;
						d1_ram=(dunits[0].ram)?dunits[0].ram:0;
						d1_catapult=(dunits[0].catapult)?dunits[0].catapult:0;
						d1_snob=(dunits[0].snob)?dunits[0].snob:0;
						d1_knight=(dunits[0].knight)?dunits[0].knight:0;
						d2_spear=(dunits[1].spear)?dunits[1].spear:0;
						d2_sword=(dunits[1].sword)?dunits[1].sword:0;
						d2_axe=(dunits[1].axe)?dunits[1].axe:0;
						d2_archer=(dunits[1].archer)?dunits[1].archer:0;
						d2_spy=(dunits[1].spy)?dunits[1].spy:0;
						d2_light=(dunits[1].light)?dunits[1].light:0;
						d2_marcher=(dunits[1].marcher)?dunits[1].marcher:0;
						d2_heavy=(dunits[1].heavy)?dunits[1].heavy:0;
						d2_ram=(dunits[1].ram)?dunits[1].ram:0;
						d2_catapult=(dunits[1].catapult)?dunits[1].catapult:0;
						d2_snob=(dunits[1].snob)?dunits[1].snob:0;
						d2_knight=(dunits[1].knight)?dunits[1].knight:0;
						TroopsLeft=(d1_spear-d2_spear)+","+(d1_sword-d2_sword)+","+(d1_axe-d2_axe)+","+(d1_archer-d2_archer)+","+(d1_spy-d2_spy)+","+(d1_light-d2_light)+","+(d1_marcher-d2_marcher)+","+(d1_heavy-d2_heavy)+","+(d1_ram-d2_ram)+","+(d1_catapult-d2_catapult)+","+(d1_snob-d2_snob)+","+(d1_knight-d2_knight);
						// Troops Outside
						TroopsOut="";
						if(typeof dta.outside!="undefined"){
							for(type in dta.outside){
								TroopsOut+=","+dta.outside[type];
							}
							// Now trim the first comma
							TroopsOut=TroopsOut.substr(1);
						}
						id1=dta.attackerid;
						id2=dta.defenderid;
						isscout=(typeof a1_spy!="undefined" && a1_spy>0)?"X":"";
						// Wall damage ?
						wall_from="-";
						wall_to="-";
						if(typeof dta.wall!="undefined"){
							wall_from=dta.wall.from;
							wall_to=dta.wall.to;
						}
						htm+="<tr><td align=center>"+K+"</td><td align=center>"+defender+"</td><td align=center>"+dvillage+"</td><td align=center>"+id1+"</td><td align=center>"+id2+"</td><td align=center>"+isscout+"</td><td align=center>"+TroopsLeft+"</td><td align=center>"+TroopsOut+"</td><td align=center>"+wall+"</td><td align=center>"+wall_from+"</td><td align=center>"+wall_to+"</td><td align=center>"+date+"</td></tr>";
					}catch(e){
						log("Command Center",e);
						continue;
					}
				}
				htm+="</tbody><tfoot><th colspan=21>";
				// Pagination
				pages=Math.ceil(pages/perpage);
				for(i=0; i<pages; i++){
					Cl="";
					if(i==0){
						Cl=" currentpage";
					}
					htm+='<a onclick="pageexample('+i+',this.parentNode.parentNode.parentNode); return false;" class="pagelink'+Cl+'" id="page'+(i-(-1))+'" href="javascript:;">'+(i-(-1))+'</a>';
				}
				htm+="</th></tfoot></table></div>";
				// BBcoce implementation
				htm+="<div align=center style='display:none'><textarea id=rcbbcode cols=120 rows=10></textarea></div><br><div align=center><input type=button value='"+lang("BB")+"' id='RCBB'></div>";
			}catch(e){log("Command Center",e);}
			return htm;
		}
	},
	TWB_CMD_CNT : function(){
		with(twb_.lib){
			try{
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				html='<HTML><HEAD><TITLE>'+lang("title5")+'</TITLE><link media="all" href="'+src+'sorter.css" type="text/css" rel="stylesheet"><script src="'+src+'sorter.js"></script><script src="'+src+'timer.js"></script><style type="text/css">table.menu tr td { background-color:transparent; background-image:url("none") !important } .vis, table.menu table { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); border-left:1px #DED3B9 solid; border-top:1px #DED3B9 solid; border-collapse:collapse; margin:1px }table.vis tr td { background-color:transparent; background-image:url("none"); border-bottom:1px solid #DED3B9; border-right:1px solid #DED3B9; ; padding-left:3px; padding-right:3px; padding-top:2px; padding-bottom:2px }table.vis tr.odd {background-color: #f9e9c3;}table.vis table.vis, table.vis table.vis td { border:0px !important }table.vis th { padding:3px 3px }</style><br><div align=center class="corners block" id="menu"><table width=100% border=0 cellpadding=0><tr><td width=1* align=center><a href="javascript:void(0);" onmouseover=toggle(this,1); onmouseout=toggle(this,0); onclick=showhide("BuildingSummary");><img height="80" width="80" style="opacity:0.4" border=0 src="http://'+TWB_World()+'graphic/visual/garage3.png"></a></td><td align=center width=1*><a href="javascript:void(0);" onmouseover=toggle(this,1); onmouseout=toggle(this,0); onclick=showhide("TroopSummary");><img height="80" width="80" style="opacity:0.4" border=0 src="http://'+TWB_World()+'graphic/visual/stable3.png"></a></td><td align=center width=1*><a href="javascript:void(0);" onmouseover=toggle(this,1); onmouseout=toggle(this,0); onclick=showhide("Movements");><img height="80" width="80" style="opacity:0.4" border=0 src="http://'+TWB_World()+'graphic/visual/barracks3.png"></a></td><td align=center width=1*><a href="javascript:void(0);" onmouseover=toggle(this,1); onmouseout=toggle(this,0); onclick=showhide("Research");><img height="80" width="80" style="opacity:0.4" border=0 src="http://'+TWB_World()+'graphic/big_buildings/smith3.png"></a></td><td align=center width=1*><a href="javascript:void(0);" onmouseover=toggle(this,1); onmouseout=toggle(this,0); onclick=showhide("Queues");><img height="80" width="80" style="opacity:0.4" border=0 src="http://'+TWB_World()+'graphic/big_buildings/main3.png"></a></td><td align=center width=1*><a href="javascript:void(0);" onmouseover=toggle(this,1); onmouseout=toggle(this,0); onclick=showhide("Reports");><img height="80" width="80" style="opacity:0.4" border=0 src="http://'+TWB_World()+'graphic/big_buildings/place1.png"></a></td></tr></table></a></div></HEAD><BODY class=vis><div id=container>';
				html+=TWB_Make_HTML();
				html+="<span id=tooltip></span>";
				html+='<script src="'+src+'jquery.js"></script><script src="'+src+'cmd.js"></script>';
				html+='<script>function showhide(id){obj=document.getElementById(id);if (obj.style.display == "none"){obj.style.display = "";} else {obj.style.display = "none";} divs=["BuildingSummary","TroopSummary","Movements","Research","Queues","Reports"];test=true;for(i=0; i<divs.length; i++){if(document.getElementById(divs[i]).style.display==""){test=false;}} if(test){document.getElementById("Display").style.display="";}else{document.getElementById("Display").style.display="none";}}';
				html+='function toggle(id,thz){if(thz==1){id.childNodes[0].style.opacity=1;}else{id.childNodes[0].style.opacity=0.4;}}tooltp();startTimer();';
				html+='function pageexample(page,t) { var res; if (page == "previous") { res = Table.pagePrevious(t); } else if (page == "next") { res = Table.pageNext(t); } else { res = Table.page(t, page); } var currentPage = res.page + 1; $(".pagelink").removeClass("currentpage"); $("#page" + currentPage).addClass("currentpage"); }</script>';
				doc=openW(html);
			}catch(e){log('Command Center',e);}
		}
	},
	TWB_RE_CMD : function(obj,wat,filter){
		with(twb_.lib){
			try{
				dobj=obj.document;
				filter=(typeof filter!="undefined")?filter:"";
				s1=gei("BuildingSummary",dobj).style.display;
				s2=gei("TroopSummary",dobj).style.display;
				s3=gei("Movements",dobj).style.display;
				s4=gei("Research",dobj).style.display;
				s5=gei("Queues",dobj).style.display;
				// Reload the selected table
				switch(wat){
					case "0": gei("BuildingSummary",dobj).innerHTML='<HR><h3>'+lang("bsum")+' '+TWB_RefBtn(0)+' '+TWB_RefBtn(0,1)+'</h3>'+TWB_Make_Bsum(filter); break;
					case "1": gei("TroopSummary",dobj).innerHTML='<HR><h3>'+lang("tsum")+' '+TWB_RefBtn(1)+' '+TWB_RefBtn(1,1)+'</h3>'+TWB_Make_Tsum(filter); break;
					case "2": gei("Movements",dobj).innerHTML='<HR><H3><font size="4">'+lang("msum")+' '+TWB_RefBtn(2)+'</font></H3>'+TWB_Make_Msum(); break;
					case "3": gei("Research",dobj).innerHTML='<HR><H3><font size="4">'+lang("rsum")+' '+TWB_RefBtn(3)+' '+TWB_RefBtn(3,1)+'</font></H3>'+TWB_Make_Rsum(filter); break;
					case "4": gei("Queues",dobj).innerHTML='<HR><H3><font size="4">'+lang("qsum")+' '+TWB_RefBtn(4)+'</font></H3>'+TWB_Make_Qsum(); break;
				}
				gei("BuildingSummary",dobj).style.display=s1;
				gei("TroopSummary",dobj).style.display=s2;
				gei("Movements",dobj).style.display=s3;
				gei("Research",dobj).style.display=s4;
				gei("Queues",dobj).style.display=s5;
				obj.tooltp();
				// Resort
				obj.Table.auto()
				// New timers refresh
				if(obj.startTimer){
					obj.startTimer();
				}
			}catch(e){log('Command Center',e);}
		}
	},
	TWB_DEL_CMD : function(todel){
		with(twb_.lib){
			for(i=0; i<todel.length; i=i+2){
				actionid=todel[i];
				dta=data.cache[todel[i+1]];
				for(j=0; j<dta.length; j++){
					if(dta[j].actionid==actionid){
						dta.splice(j,1);
						break;
					}
				}
			}
		}
	},
	TWB_Label_Ren : function(aid,vil,wz){
		with(twb_.lib){
			try{
				dta=data.cache[vil]
				for(j=0; j<dta.length; j++){
					if(dta[j].actionid==aid){
					z=dta[j].label;
						nwe=prpt(lang("newl"),z.substr(0,z.indexOf("<"))+z.substr(z.indexOf(">")+1).replace("</a>",""));
						if(nwe!==null){
							dta[j].label=nwe;
							gei(aid,wz.document).innerHTML=nwe;
						}
						break;
					}
				}
			}catch(e){log("Command Center",e);}
		}
	},
	TWB_Group_Ren : function(vil,wz){
		with(twb_.lib){
			try{
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				old=(typeof groups[vil]=="undefined")?"N/A":groups[vil];
				nwe=prpt(lang("newg"),old);
				if(nwe!==null){
					groups[vil]=nwe;
					evl=wz.document.getElementsByName(vil);
					for(z=0; z<evl.length; z++){
						evl[z].innerHTML=nwe;
					}
				}
				TWB_S(uneval(groups),"groups_"+TWB_World(0)+"["+twb_myID+"].twb");
			}catch(e){log("Command Center",e);}
		}
	},
	TWB_Trim : function(str){
		try{
			return str.textContent;
		}catch(e){log("Command Center",e);}
	},
	TWB_CompF : function(a,b){
		return !(a==b || (typeof a=="undefined" && b=="0"));
	},
	TWB_Alias : function(oid,wz){
		with(twb_.lib){
			try{
				noid=prpt(lang("nalias"),alias_[oid]);
				if(noid!==null){
					OLD=TWB_GA(oid);
					if(OLD.match(/\[.+\]/)){
						OLD=OLD.split(" [")[1].split("]")[0];
					}
					gei(oid).setAttribute("label",noid+" ["+OLD+"]");
					alias_[oid]=noid;
					gei(oid+"_",wz.document).innerHTML=noid;
					TWB_Save_Session(0);
				}
			}catch(e){log("Command Center",e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-CMD-Q")==null){
				BTN("toolbarbutton",{id:"TWB-CMD-Q",type:"button",tooltiptext:"Command Center",oncommand:"try{twb_.lib.TWB_CMD_CNT();}catch(e){twb_.lib.log('Main',e);}"});
				TWB_New_Set("main",[lang("delex"),{id:"delex",type:"checkbox",checked:"delex"}]);
			}
		}
	}
});
// @Plugin = Farm Tool
// @Version = 3.7
// @Icons = farm
merge(twb_.lib,{
	TWB_Add_Farm : function(zip,_TRO){
		with(twb_.lib){
			if(twb()){
				try{
					if(typeof zip!="undefined"){
						Engines.State.kill_p("rep_af");
					}
					if(TWB_Scr()=="info_village"){
						if(local.curVillage!="null"){
							scoords=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]",9).innerHTML;
							faid=$xp("//table/tbody/tr/td/a",6);
							for(i=0; i<faid.length; i++){
								if(faid[i].href.match(/target=(\d+)/)){
									faid=faid[i].href.match(/target=(\d+)/)[1];
									break;
								}
							}
							Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
							pID=$xp("//*[@id='menu_row2']/td[1]/a",9).href.match(/\d+\&/)[0].replace("&","");
							// In case farm is not in db yet
							if(typeof Dfarms[faid]=="undefined"){
								if(typeof _TRO=="undefined"){
									troops=TWB_UCMD(lang("f1")+scoords+lang("f2")+getC(gei(local.curVillage)).join("|"));
								}
								else{
									troops=_TRO;
								}
								if(troops!==null){
									Dfarms[faid]=new Object();
									Dfarms[faid].pID=pID;
									Dfarms[faid].scoords=scoords;
									Dfarms[faid].troops=troops;
									Dfarms[faid].label="-";
									TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
								}
							}
							else{
								// Already in
								if(Dfarms[faid].pID!=pID){
									if(cf(lang("sfar"))){
										Dfarms[faid].pID=pID;
										troops=TWB_UCMD(lang("f1")+scoords+lang("f2")+getC(gei(local.curVillage)).join("|"),Dfarms[faid].troops);
										if(troops!==null){
											Dfarms[faid].troops=troops;
										}
										TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
									}
								}
								else{
									// Same farm from same village
									pq(lang("m3"),0);
								}
							}
						}
						else{
							pq(lang("m3"),0);
						}
					}
					else{
						pq(lang("pvil"),0);
					}
				}catch(e){log('Farm Tool',2,e);}
			}
			else{
				$twb(TWB_Add_Farm);
			}
		}
	},
	TWB_Addx_Farm : function(){
		with(twb_.lib){
			TWB_Add_Farm(undefined,$get_var("faiun"));
		}
	},
	TWB_AddM_Farm : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="report" && (TWB_Mode()===null || TWB_Mode()=="all")){
						$l=$xp("//a[contains(@href,'view=')]",6);
						onu=new Array();
						ch=prpt(lang("repfa"),"");
						$m=ch.match(/\d+\-\d+/);
						if($m!==null){
							for(i=new Number($m[0].split("-")[0])-1; i<=$m[0].split("-")[1]-1; i++){
								onu.push($l[i].href);
							}
						}
						else{
							$m=ch.match(/\d+/g);
							for(k=0; k<$m.length; k++){
								onu.push($l[$m[k]-1]);
							}
						}
						twb_.onu=onu;
						link=twb_.onu[0];
						ar=[];
						for(i=1; i<twb_.onu.length; i++){
							ar.push(twb_.onu[i]);
						}
						twb_.onu=ar;
						delete ar;
						if(typeof link!="undefined"){
							Engines.State.add_p("freport","TWB_AF_Report()","*",false);
							TWB_Mast_Url(link);
						}
					}
					else{
						pq(lang("rlok"),0);
					}
				}catch(e){log('Farm Tool',e);}
			}
			else{
				$twb(TWB_AddM_Farm);
			}
		}
	},
	TWB_AddC_Farm : function(str){
		with(twb_.lib){
			if(twb()){
				try{
					local.stopINT=true;
					Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
					faid=(typeof str=="undefined")?prpt(lang("fcoords"),""):str;
					if(faid && faid.match(/\d+\|\d+/g)){
						all=faid.match(/\d+\|\d+/g);
						// add a process to execute on try confirm and it kills itself after executing
						twb_.BPA=[];
						twb_.RL=all;
						twb_.TRP=TWB_UCMD(lang("ftroops"));
						Engines.State.add_p("addcf","TWB_SSAFF()","screen=place",false);
						TWB_GoTo("place","command");
					}
				}catch(e){log('Farm Tool',e);}
			}
			else{
				$twb(TWB_AddC_Farm);
			}
		}
	},
	TWB_SSAFF : function(){
		with(twb_.lib){
			try{
				if($xp("//*[@class='attack']",9)){
					// send attack
					coord=twb_.RL[twb_.BPA.length];
					if(typeof twb_.LR=="undefined"){ twb_.LR=[];}
					if(typeof coord!="undefined"){
						// form filters
						test=true;
						if(twb_.LR.indexOf(coord)>-1){
							// search for next
							last=twb_.LR[twb_.LR.length-1];
							ind=twb_.RL.indexOf(last)+1;
							coord=twb_.RL[ind];
							test=(typeof coord!="undefined");
						}
						if(test){
							twb_.LR.push(coord);
							coord=coord.split("|");
							$xp("//form",9).action+="&tag&pass";
							$xp("//*[@id='inputx']",9).value=coord[0];
							$xp("//*[@id='inputy']",9).value=coord[1];
							// send all units (fake just for possible start of world only if units are not put yet
							TWB_Insert_Uni("all");
							$xp("//input[@type='submit']",9).click();
						}
						else{
							TWB_KSFA();
						}
					}
					else{
						TWB_KSFA();
					}
				}
				else{
					// capture fID and add farm
					faid=$xp("//a[contains(@href,'info_village')]",9).href.match(/&id=(\d+)/)[1];
					if(typeof Dfarms[faid]=="undefined"){
						pID=local.curVillage;
						Dfarms[faid]=new Object();
						Dfarms[faid].pID=pID;
						Dfarms[faid].scoords=twb_.LR[twb_.LR.length-1];
						Dfarms[faid].troops=twb_.TRP;
						Dfarms[faid].label="-";
						TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
					}
					TWB_Mast_Url(TWB_URL().replace("&try=confirm",""));
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_KSFA : function(){
		with(twb_.lib){
			delete twb_.RL;
			delete twb_.LR;
			delete twb_.BPA;
			delete twb_.TRP;
			Engines.State.kill_p("addcf");
			local.stopINT=false;
		}
	},
	TWB_AF_Report : function(){
		with(twb_.lib){
			try{
				faid=$xp("//a[contains(@href,'info_village')]",6)[1].href.match(/id=(\d+)/)[1];
				Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				if(typeof Dfarms[faid]=="undefined"){
					pID=$xp("//a[contains(@href,'info_village')]",9).href.match(/id=\d+/)[0].replace("id=","");
					Dfarms[faid]=new Object();
					Dfarms[faid].pID=pID;
					Dfarms[faid].scoords=getC($xp("//a[contains(@href,'info_village')]",6)[1].innerHTML).join("|");
					Dfarms[faid].troops="s";
					Dfarms[faid].label="-";
					TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
				}
				link=twb_.onu[0];
				ar=[];
				for(i=1; i<twb_.onu.length; i++){
					ar.push(twb_.onu[i]);
				}
				twb_.onu=ar;
				delete ar;
				if(typeof link!="undefined"){
					TWB_Mast_Url(link);
				}
				else{
					TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
					Engines.State.kill_p("freport");
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Flabel : function(fID,w2){
		with(twb_.lib){
			try{
				noid=prpt(lang("nflabel"),Dfarms[fID].label);
				if(noid!==null){
					Dfarms[fID].label=noid;
					TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
					gei(fID,w2.document).innerHTML=noid;
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_SSF : function(ffa){
		with(twb_.lib){
			try{
				twb_.BFA=new Array();
				nbr=0;
				for(fID in Dfarms){
					if(nbr==ffa){
						pID=Dfarms[fID].pID;
						scoords=Dfarms[fID].scoords;
						troops=Dfarms[fID].troops;
						twb_.BFA.push(pID+"|"+scoords+"|"+troops+"|"+fID);
						break;
					}
					nbr++;
				}
				twb_.aID="";
				Engines.State.add_p("fned","TWB_FCH()","*",false);
				TWB_Go_Ral(pID);
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Show_Extra_Start : function(pID,fID,wdow){
		with(twb_.lib){
			try{
				gei("tooltip",wdow.document).innerHTML="";
				htm=TWB_Load_Extra(pID,fID,wdow);
				gei("tooltip",wdow.document).innerHTML=htm;
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Set_Extra : function(wc){
		with(twb_.lib){
			try{
				way=prpt(lang("fest"));
				if(way){
					farml=0;
					for(fID in Dfarms){
						farml++;
					}
					range=way.match(/\d+-\d+/);
					range=(range==null || way===0)?((way.match(/\d+/) && way!="0")?[way,way]:["1",farml]):range[0].split("-");
					strat=new Number(range[0]-1);
					ned=(range[1]>farml)?farml:range[1];
					ned=new Number(ned);
					links=xp("//tr/td[1]/a",6,wc.document);
					for(O=strat; O<ned; O++){
						// Wipe out prev data
						report=null;
						pID=links[O].id;
						fID=links[O].name;
						// Get report
						for(u=0; u<reports.length; u++){
							if(reports[u].villageid==fID){
								report=reports[u];
								break;
							}
						}
						if(report!=null){
							if(typeof report.buildings!="undefined"){
								B=report.buildings;
								// Check if we have warehouse and all res
								if(typeof B!="undefined"){
									if(typeof B.iron!="undefined" && typeof B.wood!="undefined" && typeof B.stone!="undefined"){
										// Constants
										cap_x=10;
										cap_lc=80;
										cap=capacity[buildings.storage-1];
										hrs=$get_var("fahrs");
										// Production per fahrs
										I=production[B.iron-1]*hrs;
										W=production[B.wood-1]*hrs;
										S=production[B.stone-1]*hrs;
										I=sm(I,cap);
										W=sm(W,cap);
										S=sm(S,cap);
										TOT=I-(-W)-(-S);
										// Check what units we have in that village
										cap=cap_lc;TAG="l";
										if(data.units && data.units[pID]){
											if(!(data.units[pID].light>0)){
												cap=cap_x;
												TAG="x";
											}
										}
										unit=Math.ceil(TOT/cap);
										if(unit!==null){
											scoords=Dfarms[fID].scoords;
											xp("//input[@name='troops_"+scoords+"']",9,wc.document).value=unit+TAG;
											xp("//span[@id='troops2_"+scoords+"']",9,wc.document).innerHTML=unit+TAG;
										}
									}
								}
							}
						}
					}
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Load_Extra : function(pID,fID,wdow){
		with(twb_.lib){
			try{
				link="http://"+TWB_World()+"game.php?screen=info_village&id="+fID;
				link2="/game.php?screen=info_village&id="+fID;
				htmlz=$.ajax({url:link,async:false}).responseText;
				isbarb="<img width='18' heigh='18' src='http://www.icondatenbank.com/data/media/318/war0"+((htmlz.match(/info_player/)==null)?"3":"2")+".ico'>";
				name=isbarb+" "+htmlz;
				try{
					name=isbarb+" "+htmlz.split("<th")[1].split(">")[1].split("</th")[0];
				}catch(e){}
				report="";
				// Get report
				for(u=0; u<reports.length; u++){
					if(reports[u].villageid==fID){
						report=reports[u];
						break;
					}
				}
				// Report cache info
				res="-";
				times="-";
				lvls="-";
				warewall="-";
				units="-";
				if(report!=""){
					dta=report;
					date=dta.dtime;
					servertime=new Date();
					servertime.setHours(servertime.getHours()-(-$get_var("dtime")));
					time=servertime.getTime()/1000;
					timestamp=new Date(date);
					timestamp=timestamp.getTime()/1000;
					SRC="http://"+TWB_World()+"graphic/";
					// Get buildings + do calculations OR -
					buildings=dta.buildings;
					s_wood=(dta.scout_wood)?dta.scout_wood:"-";
					s_clay=(dta.scout_stone)?dta.scout_stone:"-";
					s_iron=(dta.scout_iron)?dta.scout_iron:"-";
					// Remove span from all
					s_wood=(s_wood.match("grey"))?s_wood.replace("<span class=\"grey\">.</span>",""):s_wood;
					s_clay=(s_clay.match("grey"))?s_clay.replace("<span class=\"grey\">.</span>",""):s_clay;
					s_iron=(s_iron.match("grey"))?s_iron.replace("<span class=\"grey\">.</span>",""):s_iron;
					// Time to fill for each res OR -
					ware=(buildings.storage)?buildings.storage:"-";
					wall=(buildings.wall)?buildings.wall:"-";
					if(ware!="-" && wall!="-"){
						warewall=ware+" - "+wall;
					}
					lvl1=(buildings.wood)?buildings.wood:"-";
					lvl2=(buildings.stone)?buildings.stone:"-";
					lvl3=(buildings.iron)?buildings.iron:"-";
					if(lvl1!="-" && lvl2!="-" && lvl3!="-"){
						lvls=lvl1+" - "+lvl2+" - "+lvl3;
					}
					// Server Speed
					speed=TWB_Speed()[0];
					// Warehouse
					cap=capacity[buildings.storage-1];
					perH1=(lvl1!="-")?Math.floor(production[lvl1-1]*speed):"-";
					perH2=(lvl2!="-")?Math.floor(production[lvl2-1]*speed):"-";
					perH3=(lvl3!="-")?Math.floor(production[lvl3-1]*speed):"-";
					// Elapsed time and produced res
					elapsed=(time-timestamp)/3600;
					// Produced meanwhile
					prod1=(s_wood=="-" || perH1=="-")?"-":elapsed*perH1;
					prod2=(s_clay=="-" || perH2=="-")?"-":elapsed*perH2;
					prod3=(s_iron=="-" || perH3=="-")?"-":elapsed*perH3;
					// Currently Rounded
					now1=(prod1=="-")?"-":Math.round(s_wood-(-prod1));
					now2=(prod2=="-")?"-":Math.round(s_clay-(-prod2));
					now3=(prod3=="-")?"-":Math.round(s_iron-(-prod3));
					// Round to max
					now1=sm(now1,cap);
					now2=sm(now2,cap);
					now3=sm(now3,cap);
					if(now1!=="-" && now2!=="-" && now3!=="-"){
						res="<img src='"+SRC+"holz.png'> "+now1+" <img src='"+SRC+"lehm.png'> "+now2+" <img src='"+SRC+"eisen.png'> "+now3;
					}
					// Left space in warehouse
					left1=(typeof cap!="undefined" && now1!="-")?cap-now1:"-";
					left2=(typeof cap!="undefined" && now2!="-")?cap-now2:"-";
					left3=(typeof cap!="undefined" && now3!="-")?cap-now3:"-";
					// Time to fill
					t_wood=(left1!="-")?((left1<0)?lang("full"):Math.round((left1/prod1)*60)):"-";
					t_clay=(left2!="-")?((left2<0)?lang("full"):Math.round((left2/prod2)*60)):"-";
					t_iron=(left3!="-")?((left3<0)?lang("full"):Math.round((left2/prod2)*60)):"-";
					if(t_wood!="-" && t_clay!="-" && t_iron!="-"){
						times=t_wood+" - "+t_clay+" - "+t_iron;
					}
					// Units to clear them all
					all=(now1!="-" && now2!="-" && now3!="-")?now1-(-now2)-(-now3):"-";
					n_axe=(all!="-")?Math.round(all/10):0;
					n_light=(all!="-")?Math.round(all/80):0;
					if(n_axe!="-" && n_light!="-"){
						units=n_axe+" <img src='"+SRC+"unit/unit_axe.png'> "+n_light+" <img src='"+SRC+"unit/unit_light.png'>";
					}
					// Time for cavalry
					curco=getC(gei(pID).getAttribute("tooltiptext"));
					hisco=Dfarms[fID].scoords.split("|");
					dist=Math.sqrt(Math.pow(curco[0]-hisco[0],2)+Math.pow(curco[1]-hisco[1],2));
					secs=600*dist;
					hrs=Math.floor(secs/3600);
					mins=Math.floor((secs-(hrs*3600))/60);
					secs=Math.round(secs-hrs*3600-mins*60);
					dtime=hrs+":"+mins+":"+secs;
					hrs=$get_var("fahrs");
					perH=(perH1-(-perH2)-(-perH3))*hrs;
					lc=perH/80;
					lc=isNaN(lc)?0:Math.ceil(lc);
					unitz=dta.units.defender[0];
					sp=(unitz.spear)?unitz.spear:0;
					sw=(unitz.sword)?unitz.sword:0;
					ax=(unitz.axe)?unitz.axe:0;
					ar=(unitz.archer)?unitz.archer:0;
					sc=(unitz.spy)?unitz.spy:0;
					li=(unitz.light)?unitz.light:0;
					ma=(unitz.marcher)?unitz.marcher:0;
					he=(unitz.heavy)?unitz.heavy:0;
					ra=(unitz.ram)?unitz.ram:0;
					ca=(unitz.catapult)?unitz.catapult:0;
					sn=(unitz.snob)?unitz.snob:0;
					iH='<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#804000" id="demo2"><thead><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Village:</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+name+'</td></tr></thead><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Current resources:</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+res+'</td></tr><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Time to fill warehouse:</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+times+'</td></tr><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Resources levels:</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+lvls+'</td></tr><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Warehouse and Wall:</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+warewall+'</td></tr><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Time to travel (for LC):</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+dtime+'</td></tr><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Needed Units:</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+units+'</td></tr><tr><td bgcolor="#F1EDE1" align="center" colspan="4"><u><b>Needed LC ('+hrs+')</b></u></td><td bgcolor="#F1EDE1" align="center" colspan="2">'+lc+'</td></tr><tr><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_spear.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_sword.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_axe.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_archer.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_spy.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_light.png"></td></tr><tr><td bgcolor="#F1EDE1" align="center">'+sp+'</td><td bgcolor="#F1EDE1" align="center">'+sw+'</td><td bgcolor="#F1EDE1" align="center">'+ax+'</td><td bgcolor="#F1EDE1" align="center">'+ar+'</td><td bgcolor="#F1EDE1" align="center">'+sc+'</td><td bgcolor="#F1EDE1" align="center">'+li+'</td></tr><tr><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_marcher.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_heavy.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_ram.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_catapult.png"></td><td bgcolor="#F1EDE1" align="center"><img src="'+SRC+'unit/unit_snob.png"></td><td bgcolor="#F1EDE1" align="center" rowspan="2">&nbsp;</td></tr><tr><td bgcolor="#F1EDE1" align="center">'+ma+'</td><td bgcolor="#F1EDE1" align="center">'+he+'</td><td bgcolor="#F1EDE1" align="center">'+ra+'</td><td bgcolor="#F1EDE1" align="center">'+ca+'</td><td bgcolor="#F1EDE1" align="center">'+sn+'</td></tr></table>';
				}
				else{
					iH='<table border="2" cellpadding="0" cellspacing="0" bgcolor="#F1EDE1" style="border-collapse: collapse" bordercolor="#804000" id="demo2"><tr><td>No report found. \nPlease scout the farm and update the report cache.</td></tr></table>';
				}
				return iH;
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_FDEL_ALL : function(w){
		with(twb_.lib){
			try{
				if(cf(lang("rdaf"))){
					w=w.document.getElementsByTagName("tr");
					for(i=w.length-1; i>0; i--){
						if(w[i].getAttribute("id").match(/f\d+/)){
							w[i].parentNode.removeChild(w[i]);
						}
					}
					Dfarms={};
					TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Show_Farms : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(cN(gei("TWB-Villages")).length>0){
						perpage=$get_var("fpage");
						Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
						src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
						var head='<html><head><style>.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1} .vis, table.menu table { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7");}</style><link media="all" href="'+src+'sorter.css" type="text/css" rel="stylesheet"><script src="'+src+'sorter.js"></script><script src="'+src+'jquery.js"></script><script>function pageexample(page,t) { var res; if (page == "previous") { res = Table.pagePrevious(t); } else if (page == "next") { res = Table.pageNext(t); } else { res = Table.page(t, page); } var currentPage = res.page + 1; $(".pagelink").removeClass("currentpage"); $("#page" + currentPage).addClass("currentpage"); }</script><script src="'+src+'drag.js"></script><title>'+lang("title13")+'</title><meta http-equiv="Content-Language" content="en-us"><style>a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}</style></head><div align=center style="width:100%;height:100%;position:absolute;top:0;left:0;"><div class="corners block"><h1 align=center>'+lang("title13")+'</h1></div><br /><div class="block corners" style="padding:10px"><br/><center><table class="example table-autosort:1 table-autopage:'+perpage+' sort vis" width="100%" id="demo2">';
						var body='<body class="vis"><thead><tr><th class="table-sortable:numeric table-sortable" align="center">#</th><th class="table-sortable:numeric table-sortable" align="center">'+lang('TWB-Vil')+'</th><th class="table-sortable:numeric table-sortable" align="center">'+lang('TWB-Sort9')+'</th><th align="center">'+lang('TWB-Fvil')+'</th><th align="center">'+lang('TWB-Unit')+'</th><th class="table-sortable:default table-sortable" align="center">'+lang('label')+'</th><th align="center"><a href=javascript:void(0); onclick=window.openerx.twb_.lib.TWB_FDEL_ALL(window)>'+lang('delete')+'</th></tr></thead><tbody>';
						test=true;lastF="";GID=0;isbarb="";pages=0;
						for(fID in Dfarms){
							pID=Dfarms[fID].pID;
							if(gei(pID)){
								scoords=Dfarms[fID].scoords;
								troops=Dfarms[fID].troops;
								label=Dfarms[fID].label;
								pID=Dfarms[fID].pID;
								U=scoords.split("|");
								if($get_var("faico")=="true"){
									link="http://"+TWB_World()+"game.php?screen=info_village&id="+fID;
									html=$.ajax({url:link,async:false}).responseText;
									isbarb="<img width='18' heigh='18' src='http://www.icondatenbank.com/data/media/318/war0"+((html.match(/info_player/)==null)?"3":"2")+".ico'>";
								}
								V=getC(gei(pID).getAttribute("tooltiptext"));
								dist=Math.round((Math.sqrt(Math.pow(V[1]-U[1],2)+Math.pow(V[0]-U[0],2)))*100)/100;
								if(lastF!=pID){GID++;lastF=pID;insert="<font color=blue>#"+GID+"</font> ";}else{insert="<font style='opacity:0' color=blue>#"+GID+"</font> ";}
								lbl=TWB_GA(pID);
								if(lbl.match(/\[.+\]/)){
									lbl=lbl.split("[")[1].split("]")[0];
								}
								body+='<tr id=f'+fID+'><td align="center" oncontextmenu=window.openerx.twb_.lib.TWB_Start_Farming("'+(pages-(-1))+'",1)><a id="'+pID+'" name="'+fID+'" href=javascript:void(0); class="meffect">'+(pages-(-1))+'</a></td><td align="center">'+isbarb+"  "+insert+' '+lbl+'<input type="hidden" name="vil_'+scoords+'" id="'+pID+'" size="20" value="'+lbl+'"></td><td align="center">'+dist+'</td><td align="center">'+scoords+'<input type="hidden" name="farm_'+scoords+'" size="10" value="'+scoords+'"></td><td align="center"><span id="troops2_'+scoords+'">'+troops+'</span><input type="hidden" name="troops_'+scoords+'" size="20" value="'+troops+'">&nbsp;&nbsp;<img src="http://t2.gstatic.com/images?q=tbn:TuiaSnZvYRDC3M:http://pwdpunjab.gov.in/images/expandIcon.jpg" onclick=a=window.openerx.twb_.lib.prpt(window.openerx.twb_.lib.lang("wawtt"),document.getElementsByName("troops_'+scoords+'")[0].value);if(a!==null){document.getElementsByName("troops_'+scoords+'")[0].value=a;document.getElementById("troops2_'+scoords+'").innerHTML=a;} oncontextmenu=\'a=window.openerx.twb_.lib.TWB_UCMD(undefined,document.getElementsByName("troops_'+scoords+'")[0].value);if(a!==null){document.getElementsByName("troops_'+scoords+'")[0].value=a;document.getElementById("troops2_'+scoords+'").innerHTML=a;}\'></td><td align="center"><span id="'+fID+'">'+label+'</span> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Flabel("'+fID+'",window)></a></td><td align="center"><a href=javascript:void(0); onclick=window.openerx.twb_.lib.TWB_Del_Farm("'+fID+'",window)>'+lang('delete')+'</a></td></tr>';
								pages++;
							}
							else{
								log("","Farm Tool -> Missing Village : "+pID+" - Removed from list",2);
							}
						}
						if(test){
							var down="</tbody><tfoot><th colspan=7>";
							// Pagination
							pages=Math.ceil(pages/perpage);
							for(i=0; i<pages; i++){
								Cl="";
								if(i==0){
									Cl=" currentpage";
								}
								down+='<a onclick="pageexample('+i+',this.parentNode.parentNode.parentNode); return false;" class="pagelink'+Cl+'" id="page'+(i-(-1))+'" href="javascript:;">'+(i-(-1))+'</a>';
							}
							down+='</th></tfoot></table><br></div><br><div class="corners block"><br><p align="center"><input type="button" class="z1" id="SC" value="'+lang("xon9")+'" onclick=window.openerx.twb_.lib.TWB_Farm_Edit(window,1);>&nbsp;&nbsp;<input type="button" class="z1" id="SC" value="'+lang("TWB-Sync1")+'" onclick=window.openerx.twb_.lib.TWB_Schedule_Farm();>&nbsp;&nbsp;<input type="button" class="z1" id="SC" value="'+lang("TWB-FGR")+'" onclick=window.openerx.twb_.lib.TWB_Group_Farm(window);>&nbsp;&nbsp;<input type="button" class="z1" id="SC" value="'+lang("TWB_SFALL")+'" onclick=window.openerx.twb_.lib.TWB_Set_FALL(window);>&nbsp;&nbsp;<input type="button" class="z1" id="SC" value="'+lang("TWB_SGER")+'" onclick=window.openerx.twb_.lib.TWB_Set_Extra(window);></p><br></div>';
							down+='</div><div id="tooltip" style="display:none;position:absolute"></div></body></html>';
							toaddh=head+body+down;
							var doc=openW(toaddh);
						}
						else{
							pq(lang("uneq"),0);
						}
					}
					else{
						pq(lang("m3"),0);
					}
				}catch(e){log('Farm Tool',e);}
			}
			else{
				$twb(TWB_Show_Farms);
			}
		}
	},
	TWB_Set_FALL : function(wxz){
		with(twb_.lib){
			try{
				wi=prpt(lang("fallz"));
				if(wi){
					els=wxz.document.getElementsByTagName("input");
					for(i=0; i<els.length; i++){
						if(els[i].name.match(/troops\_.+/)){
							els[i].value=wi;
							// Display to user
							gei(els[i].name.replace("troops","troops2"),wxz.document).innerHTML=wi;
						}
					}
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Farms_Server : function(){
		with(twb_.lib){
			try{
				vra=TWB_World(0).replace(/\d+/,"");
				switch(vra){
					//case "en": result="http://en{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "en": result="http://zomgtw.net/en/{nworld}/farmfinder/farms2.php?world={nworld}||player0={my_id}&v0={vil_id}&output=coords&type=0&barbmin=26&barbmax=12000&number=1&playercounter=1&world={nworld}&{vil_id}=1.05&distance={RAD}|||POST"; break;
					
					case "de": result="http://de{nworld}.twplus.org/calculator/locator/||v_x={xy[0]}&v_y={xy[1]}&t=L&min=1000&max=3000|||GET"; break;
					case "se": result="http://se{nworld}.twplus.org/calculator/locator/||v_x={xy[0]}&v_y={xy[1]}&t=L&min=1000&max=3000|||GET"; break;
					case "es": result="http://es{nworld}.twplus.org/calculator/locator/||v_x={xy[0]}&v_y={xy[1]}&t=L&min=1000&max=3000|||GET"; break;
					
					case "uk": result="http://uk{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "br": result="http://br{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "pt": result="http://pt{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "ro": result="http://ro{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "gr": result="http://gt{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "no": result="http://no{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "dk": result="http://dk{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "nl": result="http://nl{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "ba": result="http://ba{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "si": result="http://si{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "hr": result="http://hr{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "sv": result="http://sv{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "ae": result="http://ae{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;
					case "it": result="http://it{nworld}.twmentor.com/?tool=finder||barab=1&minptsb=26&maxptsb=12000&script=1&idia=0&dia={RAD}&coordinate={xy[0]}|{xy[1]}&minpts=26&maxpts=12000&submit=Find Farms!|||POST"; break;

					default: result="|||"; break;
				}
				return result;
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Find_Farms : function(){
		with(twb_.lib){
			try{
				if(twb()){
					cur=local.curVillage.match(/\d+/);
					if(cur){
						cur=gei(cur[0]);
						if(cur){
							qworld=TWB_World(0).replace(/\d+/,"");
							link=TWB_Farms_Server().split("|||");
							method=link[1];
							link=link[0];
							if(link!=""){
								xy=getC(cur.getAttribute("tooltiptext"));
								nworld=TWB_World(0).replace(qworld,"");
								qworld=TWB_World(0);
								params=link.split("||")[1];
								rad=prpt(lang("frad"),"10");
								all_villages=cN(gei("TWB-Villages")).length;
								if(rad){
									params=params.replace(/\{my_id\}/g,twb_myID).replace(/\{vil_id\}/g,local.curVillage).replace(/\{vil_id\}/g,local.curVillage).replace(/\{all_villages\}/g,all_villages)
									params=params.replace(/\{qworld\}/g,qworld).replace(/\{nworld\}/g,nworld).replace(/\{xy\[0\]\}/g,xy[0]).replace(/\{xy\[1\]\}/g,xy[1]).replace(/\{RAD\}/g,rad);
									link=link.split("||")[0].replace(/\{qworld\}/g,qworld).replace(/\{nworld\}/g,nworld);
									link=(method=="POST")?link:link+"?"+params;
									params=(method=="POST")?params:"";
									xhr3=new XMLHttpRequest();
									xhr3.open(method,link,false);
									xhr3.setRequestHeader("Content-type","application/x-www-form-urlencoded");
									xhr3.setRequestHeader("Content-length",params.length);
									xhr3.send(params);
									tmp=xhr3.responseText;
									if(TWB_World(0).match("en")){
										//R=tmp.split("</fieldset>")[0].split("</legend>")[1];
										R=tmp.split("cols='80'>")[1].split("<")[0];
									}
									else{
										// Match these correctly with UK for example
										R=tmp.match(/\d+\|\d+/g);
										// Lets trim the current village
										while(R.indexOf(xy.join("|"))>-1){
											R.splice(R.indexOf(xy.join("|")),1);
										}
										R=(R!==null && R.length>0)?R.join("\n"):"";
									}
									TWB_Eval_Farms(R);
								}
							}
							else{
								pq(lang("uns"),0);
							}
						}
						else{
							pq(lang("uneq"),0);
						}
					}
					else{
						pq(lang("m3"),0);
					}
				}
				else{
					$twb(TWB_Find_Farms);
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Rej_Farm : function(ar,coord){
		with(twb_.lib){
			arz=[];
			for(f in ar){
				if(ar[f]!=coord){
					arz.push(ar[f]);
				}
			}
			return arz;
		}
	},
	TWB_Eval_Farms : function(response){
		with(twb_.lib){
			try{
				all=[];
				coords=response.match(/\d+\|\d+/g);
				if(coords){
					for(i=0; i<coords.length; i++){
						all.push(coords[i].replace("|","x"));
					}
					for(faid in Dfarms){
						if(all.indexOf(Dfarms[faid].scoords.replace("|","x"))!=-1){
							all=TWB_Rej_Farm(all,Dfarms[faid].scoords.replace("|","x"));
						}
					}
					if(all.length>0){
						nbr=prpt(all.length+lang("hmfar"));
						if(nbr>0){
							str="";
							for(i=0; i<nbr; i++){
								str+=all[i].replace("x","|")+" ";
							}
							TWB_AddC_Farm(str);
						}
					}
					else{
						pq(lang("nofar"));
					}
				}
				else{
					pq(lang("nofar"));
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Export : function(){
		with(twb_.lib){
			try{
				test=true;
				line="#,"+lang('TWB-Vil')+",,"+lang('TWB-Fvil')+","+lang('TWB-Unit')+","+lang('label');
				ID=0;
				for(faid in Dfarms){
					dta=Dfarms[faid];
					scoords=dta.scoords;
					U=scoords.split("|");
					if(gei(dta.pID)){
						nma=TWB_GA(dta.pID);
						if(nma.match(/\[.+\]/)){
							nma=nma.split("[")[1].split("]")[0];
						}
						line+="\n"+ID+","+nma+","+getC(gei(dta.pID)).join("|")+","+scoords+","+dta.troops+","+dta.label+","+faid+","+dta.pID;
						ID=ID+1;
					}
					else{
						test=false;
						pq(lang("uneq"),0);
						break;
					}
				}
				// ask for export name
				if(test){
					F=prpt(lang("floc"),"");
					if(F){
						TWB_S(line,F+".csv");
					}
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Import : function(){
		with(twb_.lib){
			try{
				F=prpt(lang("eloc"),"");
				if(F){
					frs=TWB_R(F+".csv");
					frs=(isEmpty(frs))?"":frs.substr(frs.indexOf("\n")+1).split("\n");
					i=-1;
					if(frs!==""){
						Dfarms={};
						for(i=0; i<frs.length; i++){
							O=frs[i].split(",");
							if(O.length>=7){
								Dfarms[O[6]]={pID:O[7].match(/\d+/)[0],scoords:O[3],troops:O[4],label:O[5]};
							}
						}
					}
					if(i>-1){
						TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
						pq(lang("ims"),0);
					}
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Group_Farm : function(WDE){
		with(twb_.lib){
			try{
				var temp={};
				Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				for(fa in Dfarms){
					pID=Dfarms[fa].pID;
					sc=Dfarms[fa].scoords.split("|");
					cu=getC(gei(pID));
					dist=(Math.sqrt(Math.pow(sc[0]-cu[0],2)+Math.pow(sc[1]-cu[1],2)))/1000;
					if(typeof temp[pID]=="undefined"){
						temp[pID]=[[dist,fa,Dfarms[fa]]];
					}
					else{
						temp[pID].push([dist,fa,Dfarms[fa]]);
					}
				}
				for(PID in temp){
					temp[PID].sort();
				}
				Dfarms={};
				for(PID in temp){
					for(i=0; i<temp[PID].length; i++){
						Dfarms[temp[PID][i][1]]=temp[PID][i][2];
					}
				}
				TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
				WDE.content.close();
				$twb(TWB_Show_Farms);
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Schedule_Farm : function(wop,waz){
		with(twb_.lib){
			try{
				nwo=new Date();
				datt=(typeof waz!="undefined")?waz:TWB_DCMD(lang("ao4"),"local");
				if(datt){
					T=datt.match("L")!==null;
					datt=datt.replace("L","");
					fentr=(typeof wop!="undefined")?wop:prpt(lang("fent"));
					// Calculate time for first startup
					time=$xp("//*[@id='serverTime']",9).innerHTML.split(":");
					date=$xp("//*[@id='serverDate']",9).innerHTML.split("/");
					now=new Date(date[2],date[1]-1,date[0],time[0],time[1],time[2]);
					//now.setHours(now.getHours()-(-$get_var("dtime")));
					timetostart=(new Date(datt).getTime()-now.getTime());
					// Check method
					if(timetostart>0){
						if(!T){
							// Set Start only using setT
							setT("twb_.lib.TWB_Start_Farming('"+fentr+"');twb_.lib.unsetT('scheduled_farmT');",timetostart,"scheduled_farmT");
						}
						else{
							// Set onStart setI powered by setT
							setT("twb_.lib.TWB_Sched_Farm('"+fentr+"');twb_.lib.unsetT('scheduled_farmI');",timetostart,"scheduled_farmI");
						}
					}
					else{
						pq(lang("cansn"));
					}
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Sched_Farm : function(par){
		with(twb_.lib){
			try{
				TWB_Start_Farming(par);
				ttos=eval($get_var("fahrs"))*3600000;
				setTimeout(function(){
					setI("twb_.lib.TWB_Start_Farming('"+par+"')",ttos,"scheduled_farmI");
				},$get_var("latency")/2);
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Del_Farm : function(fid,wop){
		with(twb_.lib){
			try{
				if(typeof Dfarms[fid]!="undefined"){
					Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
					COI=Dfarms[fid].scoords;
					if(cf(lang("fdel")+" : "+COI)){
						delete Dfarms[fid];
						X=gei("f"+fid,wop.document);
						X.parentNode.removeChild(X);
						TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
					}
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Farm_Edit : function(wc,wi){
		with(twb_.lib){
			try{
				Dfarms={};
				rows=$xp("//tbody/tr",6,wc.document);
				for(i=0; i<rows.length; i++){
					fID=rows[i].id.replace("f","");
					Dfarms[fID]=new Object();
					Dfarms[fID].scoords=rows[i].childNodes[3].textContent;
					Dfarms[fID].label=rows[i].childNodes[5].childNodes[0].innerHTML;
					Dfarms[fID].pID=wc.document.getElementsByName("vil_"+Dfarms[fID].scoords)[0].id;
					Dfarms[fID].troops=wc.document.getElementsByName("troops_"+Dfarms[fID].scoords)[0].value;
				}
				TWB_S(uneval(Dfarms),"farms_"+TWB_World(0)+"["+twb_myID+"].twb");
				if(wi==1){wc.content.close();}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Group_Send : function(){
		with(twb_.lib){
			if(twb()){
				// Get groups like in show farms + append attacks using FCH method
				Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				lastF="";grouped=[];GID=0;test=true;
				for(fID in Dfarms){
					pID=Dfarms[fID].pID;
					if(gei(pID)){
						scoords=Dfarms[fID].scoords;
						troops=Dfarms[fID].troops;
						pID=Dfarms[fID].pID;
						if(lastF!=pID){
							lastF=pID;
							GID++;
							grouped[GID]=new Array(); 
						}
						grouped[GID].push({scoords:scoords,troops:troops,pID:pID,fID:fID});
					}
					else{
						test=false;
					}
				}
				if(test){
					twb_.BFA=new Array();k=0;
					for(i=0; i<grouped.length; i++){
						dra=grouped[i];
						if(typeof dra!="undefined"){
							for(j=0; j<dra.length; j++){
								pID=dra[j].pID;if(j==0){cID=pID;}
								scoords=dra[j].scoords;
								troops=dra[j].troops;
								fID=dra[j].fID;
								twb_.BFA.push(pID+"|"+scoords+"|"+troops+"|"+fID);
							}
						}
					}
					Engines.State.add_p("fned","TWB_FCH()","*",false);
					urlx="http://"+TWB_World()+"staemme.php?village="+cID+"&screen=place&mode=command";
					TWB_All_Url(urlx,1,1);
				}
				else{
					pq(lang("uneq"),0);
				}
			}
			else{
				$twb(TWB_Group_Send);
			}
		}
	},
	TWB_Start_Farming : function(way,tox){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="place" && (TWB_Mode()=="command" || TWB_Mode()==null)){
					// Read vars
					way=typeof twb_.way=="undefined"?way:twb_.way;
					tox=typeof twb_.tox=="undefined"?tox:twb_.tox;
					Dfarms=TWB_OVE("farms_"+TWB_World(0)+"["+twb_myID+"].twb",{});
					if($get_var("skiptry")!="true"){
						local.skined=true;
					}
					twb_.BFA=new Array();
					way=(typeof way=="undefined")?prpt(lang("fent")):way;
					farml=0;
					for(fID in Dfarms){
						farml++;
					}
					if(way!==null){
						if(way.match("~")){
							range=way.match(/(.+)~(.+)/);
							i=-1;
							for(faid in Dfarms){
								i++;
								if(typeof strat=="undefined" && Dfarms[faid].label==range[1]){
									strat=new Number(i);
								}
								if(typeof ned=="undefined" && Dfarms[faid].label==range[2]){
									ned=new Number(i);
								}
							}
						}
						else{
							range=way.match(/\d+-\d+/);
							range=(range==null || way===0)?((way.match(/\d+/) && way!="0")?[way,way]:["1",farml]):range[0].split("-");
							strat=new Number(range[0]-1);
							ned=(range[1]>farml)?farml:range[1];
							ned=new Number(ned);
						}
						ubx=0;
						for(fID in Dfarms){
							if(ubx>=strat && ubx<ned){
								pID=Dfarms[fID].pID;
								if(ubx==strat){cID=pID;}
								scoords=Dfarms[fID].scoords;
								troops=Dfarms[fID].troops;
								// BFA will have all command attacks (from - to - troops)
								twb_.BFA.push(pID+"|"+scoords+"|"+troops+"|"+fID);
							}
							ubx++;
						}
						log("","Number of Farms Loaded -> "+twb_.BFA.length,1);
						Engines.State.add_p("fned","TWB_FCH()","*",false);
						delete twb_.way;
						delete twb_.tox;
						if(typeof tox=="undefined"){
							TWB_Go_Ral(cID);
						}
						else{
							urlx="http://"+TWB_World()+"staemme.php?village="+cID+"&screen=place&mode=command";
							TWB_All_Url(urlx,1,1);
						}
					}
				}
				else{
					twb_.way=way;
					twb_.tox=tox;
					Engines.State.add_p("router","TWB_Start_Farming()","*",true);
					TWB_GoTo("place","command");
				}
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_RRHC : function(ar,ab){
		with(twb_.lib){
			// search for the first non available unit that can be sent
			Z=null;
			for(unit in ar){
				if(ar[unit]>0 && !ab[unit]){
					Z=[unit,ar[unit]];
				}
			}
			return Z;
		}
	},
	TWB_F_Min : function(){
		with(twb_.lib){
			tmp=[];
			for(zo=1; zo<twb_.BFA.length; zo++){
				tmp.push(twb_.BFA[zo]);
			}
			twb_.BFA=tmp;
			delete tmp;
		}
	},
	TWB_FCH : function(DTFS){
		with(twb_.lib){
			try{
				// Block if we are on confirmation page
				if(TWB_URL().match("try=confirm")!=null){
					return;
				}
				// Append Delay Execution
				DELAY=typeof DTFS=="undefined"?($get_var("fadly")*1000):0;
				setTimeout(function(){
					// IF on rally point but with error msg
					// Need to manually skip this
					nact=twb_.BFA[0];
					if(typeof nact!="undefined"){
						inff=nact.split("|");
						if(TWB_URL().match(/village=(\d+)/)[1]!=inff[0]){
							TWB_Mast_Url(TWB_URL().replace(/village=\d+/,"village="+inff[0]).replace("try=confirm",""));
						}
						else{
							if($xp("//h3[@class='error']",9)!=null && $get_var("fanerror")=="true"){
								TWB_Mast_Url(TWB_GoTo("place","command",1).replace("&try=confirm",""));
							}
							else{
								// Check for sending errors in TW and remove farm
								if($xp("//div[contains(@style,'color: red')]",9)!==null){
									TWB_F_Min();
								}
								nact=twb_.BFA[0];
								log("","Starting Farms-> "+nact,1);
								if(typeof nact!="undefined"){
									log("","Number of Farms Left to process-> "+twb_.BFA.length,2);
									inff=nact.split("|");
									XZ=0;
									for(ti=0; ti<twb_.BFA.length; ti++){
										if(twb_.BFA[ti].split("|")[0]==inff[0]){
											XZ=XZ-(-1);
										}
									}
									if(TWB_URL().match(/village=(\d+)/)[1]==inff[0]){
										log("","Village number matched-> "+inff[0],3);
										if($xp("//*[@type='submit']",6).length==2){
											pr=inff[3];
											// Check for profiles and replace with value
											for(zi=0; zi<FAR_PF.length; zi++){
												REA=new RegExp("\\{"+FAR_PF[zi].name+"\\}");
												pr=pr.replace(REA,FAR_PF[zi].new_unit);
											}
											// Replace non existing profiles too
											pr=pr.replace(/\{\w+\}/,"");
											catx=pr.match(/=(\w+)=/);
											if(catx){
												pr=pr.replace(catx[0],"");
											}
											prm=pr.toLowerCase().match(/[srpwlxemhcnk]/g);
											log("","PRM Data-> "+prm,3);
											if(prm){
												// Fetch Report Data
												report=null;
												pID=local.curVillage;
												fID=inff[4];
												// Get report
												log("","Number of Reports-> "+reports.length,3);
												for(u=0; u<reports.length; u++){
													if(reports[u].villageid==fID){
														report=reports[u];
														log("","Report Reference Found -> "+u,1);
														break;
													}
												}
												TOT=false;
												log("","Exit Report Scanning-> "+report,3);
												//if(typeof report!="undefined"){
												if(report!=null){
													log("","Processing Found Report-> "+report.buildings,1);
													B=report.buildings;
													// Check if we have warehouse and all res
													if(typeof B!="undefined"){
														if(typeof B.iron!="undefined" && typeof B.wood!="undefined" && typeof B.stone!="undefined"){
															// Constants
															cap_x=10;
															cap_lc=80;
															cap=B.storage;
															hrs=$get_var("fahrs");
															if(B.iron<1){
																B.iron=1;
															}
															if(B.wood<1){
																B.wood=1;
															}
															if(B.stone<1){
																B.stone=1;
															}
															if(B.storage<1){
																B.storage=1;
															}
															// Production per fahrs
															I=production[B.iron-1]*hrs;
															W=production[B.wood-1]*hrs;
															S=production[B.stone-1]*hrs;
															cap=capacity[B.storage-1];
															I=sm(I,cap);
															S=sm(S,cap);
															W=sm(W,cap);
															TOT=I-(-W)-(-S);
														}
													}
												}
												log("","Finished in Reports Section-> ",3);
												spt=$xp("//*[@name='spear']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												swt=$xp("//*[@name='sword']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												axx=$xp("//*[@name='axe']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												arz=$xp("//*[@name='archer']",9);
												arz=(arz===null)?0:arz.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												sct=$xp("//*[@name='spy']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												lig=$xp("//*[@name='light']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												marr=$xp("//*[@name='marcher']",9);
												marr=(marr===null)?0:marr.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												hiv=$xp("//*[@name='heavy']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												rrt=$xp("//*[@name='ram']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												cat=$xp("//*[@name='catapult']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												nob=$xp("//*[@name='snob']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												kit=$xp("//*[@name='knight']",9);
												kit=(kit===null)?0:kit.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
												n1=pr.match(/\d+s/);
												if(n1!==null){
													n1=n1[0].replace("s","");
													if(n1==0){
														n1=Math.floor(sct/XZ);
													}
												}
												else{
													if(pr.match("s")===null){
														n1="0";
													}
													else{
														n1=1;
													}
												}
												n1=sm(n1,sct);
												n2=pr.match(/\d+r/);
												if(n2!==null){
													n2=n2[0].replace("r","");
													if(n2==0){
														n2=Math.floor(rrt/XZ);
													}
												}
												else{
													if(pr.match("r")===null){
														n2="0";
													}
													else{
														n2=1;
													}
												}
												n2=sm(n2,rrt);
												n3=pr.match(/\d+p/);
												if(n3!==null){
													n3=n3[0].replace("p","");
													if(n3==0){
														if(TOT){
															n3=Math.ceil(TOT/25);
														}
														else{
															n3=Math.floor(spt/XZ);
														}
													}
												}
												else{
													if(pr.match("p")===null){
														n3="0";
													}
													else{
														n3=1;
													}
												}
												n3=sm(n3,spt);
												n4=pr.match(/\d+w/);
												if(n4!==null){
													n4=n4[0].replace("w","");
													if(n4==0){
														if(TOT){
															n4=Math.ceil(TOT/15);
														}
														else{
															n4=Math.floor(swt/XZ);
														}
													}
												}
												else{
													if(pr.match("w")===null){
														n4="0";
													}
													else{
														n4=1;
													}
												}
												n4=sm(n4,swt);
												n5=pr.match(/\d+l/);
												if(n5!==null){
													n5=n5[0].replace("l","");
													if(n5==0){
														if(TOT){
															n5=Math.ceil(TOT/80);
														}
														else{
															n5=Math.floor(lig/XZ);
														}
													}
												}
												else{
													if(pr.match("l")===null){
														n5="0";
													}
													else{
														n5=1;
													}
												}
												n5=sm(n5,lig);
												n6=pr.match(/\d+x/);
												if(n6!==null){
													n6=n6[0].replace("x","");
													if(n6==0){
														if(TOT){
															n6=Math.ceil(TOT/10);
														}
														else{
															n6=Math.floor(axx/XZ);
														}
													}
												}
												else{
													if(pr.match("x")===null){
														n6="0";
													}
													else{
														n6=1;
													}
												}
												n6=sm(n6,axx);
												n7=pr.match(/\d+e/);
												if(n7!==null){
													n7=n7[0].replace("e","");
													if(n7==0){
														if(TOT){
															n7=Math.ceil(TOT/10);
														}
														else{
															n7=Math.floor(arz/XZ);
														}
													}
												}
												else{
													if(pr.match("e")===null){
														n7="0";
													}
													else{
														n7=1;
													}
												}
												n7=sm(n7,arz);
												n8=pr.match(/\d+m/);
												if(n8!==null){
													n8=n8[0].replace("m","");
													if(n8==0){
														if(TOT){
															n8=Math.ceil(TOT/50);
														}
														else{
															n8=Math.floor(marr/XZ);
														}
													}
												}
												else{
													if(pr.match("m")===null){
														n8="0";
													}
													else{
														n8=1;
													}
												}
												n8=sm(n8,marr);
												n9=pr.match(/\d+h/);
												if(n9!==null){
													n9=n9[0].replace("h","");
													if(n9==0){
														if(TOT){
															n9=Math.ceil(TOT/50);
														}
														else{
															n9=Math.floor(hiv/XZ);
														}
													}
												}
												else{
													if(pr.match("h")===null){
														n9="0";
													}
													else{
														n9=1;
													}
												}
												n9=sm(n9,hiv);
												n10=pr.match(/\d+c/);
												if(n10!==null){
													n10=n10[0].replace("c","");
													if(n10==0){
														n10=Math.floor(cat/XZ);
													}
												}
												else{
													if(pr.match("c")===null){
														n10="0";
													}
													else{
														n10=1;
													}
												}
												n10=sm(n10,cat);
												n11=pr.match(/\d+n/);
												if(n11!==null){
													n11=n11[0].replace("c","");
													if(n11==0){
														n11=Math.floor(nob/XZ);
													}
												}
												else{
													if(pr.match("n")===null){
														n11="0";
													}
													else{
														n11=1;
													}
												}
												n11=sm(n11,nob);
												n12=pr.match(/\d+k/);
												if(n12!==null){
													n12=n12[0].replace("k","");
												}
												else{
													if(pr.match("k")===null){
														n12="0";
													}
													else{
														n12=1;
													}
												}
												n12=sm(n12,kit);
												n1=new Number(n1+"");
												n2=new Number(n2+"");
												n3=new Number(n3+"");
												n4=new Number(n4+"");
												n5=new Number(n5+"");
												n6=new Number(n6+"");
												n7=new Number(n7+"");
												n8=new Number(n8+"");
												n9=new Number(n9+"");
												n10=new Number(n10+"");
												n11=new Number(n11+"");
												n12=new Number(n12+"");
												MIN=$get_var("minun");
												// Wildcard
												if(pr.match(/\*/)){
													choice=TWB_RRHC({n5:lig,n6:axx,n8:marr,n9:hiv,n3:spt,n4:swt,n7:arz},{n5:n5>0,n6:n6>0,n8:n8>0,n9:n9>0,n3:n3>0,n4:n4>0,n7:n7>0});
													if(choice){
														switch(choice[0]){
															case "n1" : n1=choice[1]; break;
															case "n2" : n2=choice[1]; break;
															case "n3" : n3=choice[1]; break;
															case "n4" : n4=choice[1]; break;
															case "n5" : n5=choice[1]; break;
															case "n6" : n6=choice[1]; break;
															case "n7" : n7=choice[1]; break;
															case "n8" : n8=choice[1]; break;
															case "n9" : n9=choice[1]; break;
															case "n10" : n10=choice[1]; break;
															case "n11" : n11=choice[1]; break;
														}
													}
												}
												if(n1>0){$xp("//*[@name='spy']",9).value=n1;}
												if(n2>=MIN){$xp("//*[@name='ram']",9).value=n2;}
												if(n3>=MIN){$xp("//*[@name='spear']",9).value=n3;}
												if(n4>=MIN){$xp("//*[@name='sword']",9).value=n4;}
												if(n5>=MIN){$xp("//*[@name='light']",9).value=n5;}
												if(n6>=MIN){$xp("//*[@name='axe']",9).value=n6;}
												if(TWB_WorldSet("game/archer")==1 && n7>=MIN){$xp("//*[@name='archer']",9).value=n7;}
												if(TWB_WorldSet("game/archer")==1 && n8>=MIN){$xp("//*[@name='marcher']",9).value=n8;}
												if(n9>=MIN){$xp("//*[@name='heavy']",9).value=n9;}
												if(n10>=MIN){$xp("//*[@name='catapult']",9).value=n10;}
												if(n11>=MIN){$xp("//*[@name='snob']",9).value=n11;}
												if(TWB_WorldSet("game/knight")>=1 && n12>0){$xp("//*[@name='knight']",9).value=n12;}
												twb_.cat=(catx)?catx[1]:"";
												if(n1>0 || n2>=MIN || n3>=MIN || n4>=MIN || n5>=MIN || n6>=MIN || n7>=MIN || n8>=MIN || n9>=MIN || n10>=MIN || n11>=MIN || n12>0){
													$xp("//*[@id='inputx']",9).value=inff[1];
													$xp("//*[@id='inputy']",9).value=inff[2];
													twb_.lastFunc="farm";
													$xp("//*[@type='submit']",9).click();
													// Remove once submitted 
													log("","Farm Village finished Processed-> "+inff[1]+"|"+inff[2],1);
													TWB_F_Min();
												}
												else{
													log("","Farm Village Reject : Total troops at "+inff[1]+"|"+inff[2]+" less than min ("+MIN+") "+n1+","+n2+","+n3+","+n4+","+n5+","+n6+","+n7+","+n8+","+n9+","+n10+","+n11+","+n12,1);
													// Recall to check for next command
													TWB_F_Min();
													TWB_FCH(0);
												}
											}
											else{
												// No desired match was found, not even any unit:
												log("","No Match Found-> ",1);
												TWB_F_Min();
												TWB_FCH(0);
											}
										}
									}
									else{
										log("","Village number not matched (Change village)-> ",1);
										if(TWB_Scr()!="place"){
											// Move to vil only on rally point
											log("","Go to Rally Point-> ",3);
											if($xp("//input[@type='submit']",6).length==2){
												TWB_Mast_Url(TWB_URL().replace(/village=\d+/,"village="+inff[0]).replace("try=confirm",""));
											}
										}
										else{
											// We are on rally point but not in the correct village
											log("","Incorrect Village Rally Point Load-> "+inff[0],3);
											//TWB_LoadVil(inff[0]);
											TWB_Mast_Url(TWB_URL().replace(/village=\d+/,"village="+inff[0]).replace("try=confirm",""));
											log("","Incorrect Village Rally Point Finished-> "+inff[0],3);
										}
									}
								}
								else{
									Engines.State.kill_p("fned");
									if($get_var("skiptry")!="true"){
										local.skined=false;
									}
								}
							}
						}
					}
					else{
						// This should normally trigger at end
						// Farm tool is done
						Engines.State.kill_p("fned");
						if($get_var("skiptry")!="true"){
							local.skined=false;
						}
					}
				},DELAY);
			}catch(e){log('Farm Tool',e);}
		}
	},
	TWB_Show_Farms_PF : function(){
		with(twb_.lib){
			try{
				FAR_PF=TWB_OVE("fprofiles_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
				script='<script>function starter(){';
				for(i=0; i<FAR_PF.length; i++){
					script+='make_row('+uneval(FAR_PF[i])+');';
					script+='profiles.push('+uneval(FAR_PF[i])+');';
				}
				script+="}window.setTimeout(starter,1000);</script>";
				// Startup script to add rows and push profiles
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				htm='<HTML><HEAD><link media="all" href="'+src+'sorter.css" type="text/css" rel="stylesheet"><script src="'+src+'sorter.js"></script><meta http-equiv="Content-Language" content="en-us"><TITLE>'+lang("title9")+'</TITLE><style type="text/css">table.menu tr td { background-color:transparent; background-image:url("none") !important } .vis, table.menu table { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); border-left:1px solid #DED3B9; border-top:1px solid #DED3B9; border-collapse:collapse; margin:1px }table.vis tr td { background-color:transparent; background-image:url("none"); border-bottom:1px solid #DED3B9; border-right:1px solid #DED3B9; ; padding-left:3px; padding-right:3px; padding-top:2px; padding-bottom:2px }table.vis tr.odd {background-color: #f9e9c3;}table.vis table.vis, table.vis table.vis td { border:0px !important }table.vis th { padding:3px 3px } .z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style><script src="'+src+'jquery.js"></script><script src="'+src+'farm.js"></script></HEAD><BODY class="vis"><br /><div class="corners block"><h1 align=center>Farm Profiles:</h1></div><br /><div class="corners block" id=container><br /><div align="center"><center><table class="example" border="1" width="80%"><thead><tr><th width="20%" align="center" colspan=2 height="21"><p align="center"><u><b>Profiles:</b></u></th></tr><tr id="new"><th width="100%" align="center" colspan="2" height="21"><p align="center"><u><b>New Profile:</b></u></th></tr></thead><tbody><tr><td width="30%" align="center" class="odd" rowspan="3"><p align="center"><b><u>Name:</u> </b></p><p align="center"><input type="text" name="new_name" size="10" class="z2"></td></tr><tr><td width="80%" align="center" class="odd"><p align="center">'+lang("TWB-Unit")+'</td></tr><tr><td width="80%" align="center" class="odd" dir="ltr"><input type="text" onclick="this.value=window.openerx.twb_.lib.TWB_UCMD()" name="new_unit" size="20" class="z2"></td></tr></tbody><tfoot><tr><th width="100%" align="center" class="odd" colspan="2" height="21"><p align="center"><u><b><a href="javascript:void(0)" onclick="add()">Add</a></b></u></th></tr></tfoot></table></center></div><br /></div><p align="center"><input type="button" class="z1" id="SC" value="'+lang("xon9")+'" onclick="save_all(1);">';
				htm+=script;
				doc=openW(htm);
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Add_FProfile : function(obj){
		with(twb_.lib){
			try{
				test=true;
				for(i=0; i<FAR_PF.length; i++){
					if(FAR_PF[i].name==obj.name){
						test=false;
						break;
					}
				}
				if(test){
					FAR_PF.push(obj);
				}
				return test;
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Save_FProfiles : function(AR,WD,U){
		with(twb_.lib){
			try{
				FAR_PF=AR;
				TWB_S(uneval(FAR_PF),"fprofiles_"+TWB_World(0)+"["+twb_myID+"].twb");
				if(U=="1"){
					WD.content.close();
				}
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Delete_FProfile : function(nma){
		with(twb_.lib){
			try{
				for(i=0; i<FAR_PF.length; i++){
					if(FAR_PF[i].name==nma){
						FAR_PF.splice(i,1);
						break;
					}
				}
			}catch(e){log('Report Options',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof settings.farm=="undefined"){
				// Add Buttons
				B1=BTN("toolbarbutton",{disabled:"true",id:"TWB-Farm",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-Farms"},B1);
				B3=BTN("menuitem",{id:"TWB_F_Add",label:"Add Farm",oncommand:"try{twb_.lib.TWB_Add_Farm();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{id:"TWB_F_AddC",label:"Add Farms From Coords",oncommand:"try{twb_.lib.TWB_AddC_Farm();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B5=BTN("menuitem",{id:"TWB_F_AddM",label:"Add Farms From Reports",oncommand:"try{twb_.lib.TWB_AddM_Farm();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B6=BTN("menuitem",{id:"TWB_F_FFR",label:"Find Farms",oncommand:"try{twb_.lib.TWB_Find_Farms();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B7=BTN("menuseparator",{},B2);
				B8=BTN("menuitem",{id:"TWB_F_Sho",label:"Show Farms",oncommand:"try{twb_.lib.TWB_Show_Farms();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B9=BTN("menuitem",{id:"TWB_F_Pro",label:"Farm Profiles",oncommand:"try{twb_.lib.TWB_Show_Farms_PF();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B10=BTN("menuitem",{id:"TWB_F_Sta",label:"Start Farming",oncommand:"try{twb_.lib.TWB_Start_Farming();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B11=BTN("menuitem",{id:"TWB_F_GSt",label:"Group Farming",oncommand:"try{twb_.lib.TWB_Group_Send();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B12=BTN("menuseparator",{},B2);
				B13=BTN("menuitem",{id:"TWB_F_Imp",label:"Import Farms",oncommand:"try{twb_.lib.TWB_Import();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B14=BTN("menuitem",{id:"TWB_F_Exp",label:"Export Farms",oncommand:"try{twb_.lib.TWB_Export();}catch(e){twb_.lib.log('Main',e);}"},B2);
				// Shortcut
				TWB_New_Set("keys",[lang("fastc"),{id:"fastc",type:"textbox",maxlength:"1",value:"fastc"}]);
				shortcuts[$get_var("fastc")]="TWB_Addx_Farm();";
				TWB_New_Group_Set("farm",lang("TWB-Farm"));
				TWB_New_Set("farm",[lang("fahrs"),{id:"fahrs",type:"textbox",value:"fahrs"}]);
				TWB_New_Set("farm",[lang("perpage"),{id:"fpage",type:"textbox",value:"fpage"}]);
				TWB_New_Set("farm",[lang("faico"),{id:"faico",type:"checkbox",checked:"faico"}]);
				TWB_New_Set("farm",[lang("faiun"),{id:"faiun",type:"textbox",value:"faiun"}]);
				TWB_New_Set("farm",[lang("fadly"),{id:"fadly",type:"textbox",value:"fadly"}]);
			}
		}
	}
});
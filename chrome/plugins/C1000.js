// @Plugin = Attack Options
// @Version = 1.6
// @Icons = gr5
merge(twb_.lib,{
	TWB_Fake : function(){
		with(twb_.lib){
			if(twb()){
				try{
					F=TWB_FCMD();
					if(F!==null){
						if(F.from.length>0 && F.to.length>0){
							twb_.FAKES=F;
							// Conver to INT so that if they are empty it treats them as 0
							twb_.FAKES.fat=new Number(twb_.FAKES.fat);
							twb_.FAKES.fsup=new Number(twb_.FAKES.fsup);
							// Set DEFAULT config
							twb_.thisFake={att:0,sup:0,to:[]};
							if(F.rand){
								if(twb_.FAKES.fat>0){
									// Assign Random Fake Attacks
									// 0 < RAND < 6
									rand=0;
									while(rand<1){
										rand=Math.round(Math.random()*5);
									}
									twb_.FAKES.fat=rand;
								}
								if(twb_.FAKES.fsup>0){
									// Assign Random Fake Supports
									rand=0;
									while(rand<1){
										rand=Math.round(Math.random()*5);
									}
									rand=Math.round(Math.random()*5);
									twb_.FAKES.fsup=rand;
								}
							}
							// We always need the Auto Clicker functions ON
							local.skined=true;
							// Launch
							Engines.State.add_p("fcmed","TWB_SF()","*",false);
							TWB_Go_Ral(F.from[0]);
						}
					}
				}catch(e){log('Attack Options',e);}
			}
			else{
				$twb(TWB_Fake);
			}
		}
	},
	TWB_CSF : function(){
		with(twb_.lib){
			A=twb_.FAKES;
			B=twb_.thisFake;
			if(B.att==A.fat && B.sup==A.fsup && B.to.length==A.to.length){
				return true;
			}
			else{
				// Did not finish attacks
				if(!(B.att==A.fat)){
					return "att";
				}
				// Finished attacks but not supports
				if(B.att==A.fat && !(B.sup==A.fsup)){
					return "sup";
				}
				// Finished attacks and supports
				if(B.att==A.fat && B.sup==A.fsup){
					// Move one target
					twb_.thisFake.to.push("");
					if(typeof twb_.FAKES.to[twb_.thisFake.to.length]!="undefined"){
						return "move";
					}
					else{
						// Go to next vil, no more targets : This should normally not trigger this way
						return true;
					}
				}
			}
		}
	},
	TWB_SF : function(){
		with(twb_.lib){
			try{
				// Rally point only
				if(TWB_Scr()=="place" && (TWB_Mode()=="command" || TWB_Mode()===null)){
					// No errors, not on confirm page 
					url=TWB_URL(0);
					if(url.match("try=confirm")===null && $xp("//*[@class='attack']",9)!==null){
						// Check if we have sent everything from this village
						test_csf=TWB_CSF();
						switch(test_csf){
							case true:
								// Rremove the first item of the from list
								twb_.FAKES.from=twb_.FAKES.from.slice(1,twb_.FAKES.from.length)
								if(twb_.FAKES.from.length>0){
									// Renew current data
									twb_.thisFake={att:0,sup:0,to:[]};
									// Launch new vil
									TWB_Go_Ral(twb_.FAKES.from[0]);
								}
								else{
									// No more froms. STOP
									Engines.State.kill_p("fcmed");
									delete twb_.FAKES;
									delete twb_.thisFake;
									// Restore the command for auto clickers to normal
									local.skined=false;
								}
							break;
							
							// Send what's left
							case "move" :
								// Reset att and supp but keep to stored
								twb_.thisFake={att:0,sup:0,to:twb_.thisFake.to};
								// Randomize
								if(twb_.FAKES.rand){
									if(twb_.FAKES.fat>0){
										// Assign Random Fake Attacks
										// 0 < RAND < 6
										rand=0;
										while(rand<1){
											rand=Math.round(Math.random()*5);
										}
										twb_.FAKES.fat=rand;
									}
									if(twb_.FAKES.fsup>0){
										// Assign Random Fake Supports
										rand=0;
										while(rand<1){
											rand=Math.round(Math.random()*5);
										}
										rand=Math.round(Math.random()*5);
										twb_.FAKES.fsup=rand;
									}
								}
								// Rerun
								TWB_SF();
							break;
							
							default:
								// Add target if not added yet
								IND=twb_.FAKES.to[twb_.thisFake.to.length];
								// Fill coords
								co=IND.split("|");
								$xp("//input[@name='x']",9).value=co[0];
								$xp("//input[@name='y']",9).value=co[1];
								// Fill Units
								U=twb_.FAKES.units;
								$xp("//input[@name='spear']",9).value=U.spear;
								$xp("//input[@name='sword']",9).value=U.sword;
								$xp("//input[@name='axe']",9).value=U.axe;
								if(TWB_WorldSet("game/archer")==1){
									$xp("//input[@name='archer']",9).value=U.archer;
								}
								$xp("//input[@name='spy']",9).value=U.spy;
								$xp("//input[@name='light']",9).value=U.light;
								if(TWB_WorldSet("game/archer")==1){
									$xp("//input[@name='marcher']",9).value=U.marcher;
								}
								$xp("//input[@name='heavy']",9).value=U.heavy;
								$xp("//input[@name='ram']",9).value=U.ram;
								$xp("//input[@name='catapult']",9).value=U.catapult;
								// Launch commands
								if(test_csf=="att"){
									// Increase attacks
									twb_.thisFake.att=twb_.thisFake.att-(-1);
									// Send as attack
									$xp("//input[@type='submit']",6)[0].click();
								}
								if(test_csf=="sup"){
									// Increase supports
									twb_.thisFake.sup=twb_.thisFake.sup-(-1);
									// Send as support
									$xp("//input[@type='submit']",6)[1].click();
								}
							break;
						}
					}
					else{
						// TW Error Output, DEAL With it
						if(url.match("try=confirm")==null){
							// Red error msg : Simply reload CMD , Process will take over from there
							TWB_Mast_Url(TWB_URL().replace("try=confirm",""));
						}
					}
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_Noble : function(){
		with(twb_.lib){
			try{
				// DEBUG:
				strOUT_="";
				
				// Open GUI + retrieve inputs
				T=TWB_NCMD();
				// Make sure coords are ok
				if(T!==null){
					coords=T.coords.match(/\d+\|\d+/);
					strOUT_+="coords="+coords+" \n";
					if(coords){
						coords=coords[0].split("|");
						// Check date syntax
						delay=T.delay;
						strOUT_+="delay="+delay+" \n";
						type=T.type;
						strOUT_+="type="+type+" \n";
						A=T.arrival.match(/\d+\s\d+\s\d+\s\d+:\d+:\d+/);
						strOUT_+="arrival_date"+A+" \n";
						if(A){
							// Store now
							NOW=new Date();
							// Append difference to NOW instead
							NOW.setHours(NOW.getHours()-(-$get_var("dtime")));
							strOUT_+="NOW_HOURS="+NOW.getHours()+" \n";
							NOW=NOW.getTime();
							strOUT_+="NOW="+NOW+" \n";
							// Store arrival date
							por=A[0].match(/\d+/g);
							arrival_date=new Date();
							arrival_date.setDate(por[2])
							arrival_date.setMonth(por[1]-1)
							arrival_date.setFullYear(por[0])
							arrival_date.setHours(por[3]);
							arrival_date.setMinutes(por[4]);
							arrival_date.setSeconds(por[5]);
							strOUT_+="arrival_date="+arrival_date+" \n";
							// Check attacks
							Y=T.attacks;
							SPEED=TWB_Speed();
							strOUT_+="Server speed="+SPEED+" \n";
							// Check if already open
							OP=null;
							LAST=0;
							for(nxi = 0; nxi < winx.frames.length; nxi++){
								ZOP=winx.frames[nxi];
								TOP=xp("//tr[contains(@name,'row_')]",6,ZOP.document);
								if(TOP.length>0){
									LAST=TOP.length;
									OP=ZOP;
									break;
								}
							}
							// Check if any attacks already
							if(typeof twb_.nobles=="undefined" || OP==null){
								twb_.nobles=[];
							}
							htm='';
							src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
							if(OP==null){
								htm+='<HTML><HEAD><script src="'+src+'timer.js"></script><script src="'+src+'edit.js"></script><TITLE>'+lang("title15")+'</TITLE><style type="text/css">table.menu tr td { background-color:transparent; background-image:url("none") !important }table.vis, table.menu table { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); border-left:1px solid #DED3B9; border-top:1px solid #DED3B9; border-collapse:collapse;margin:1px }table.vis tr td { background-color:transparent; background-image:url("none"); border-bottom:1px solid #DED3B9; border-right:1px solid #DED3B9; ; padding-left:3px; padding-right:3px; padding-top:2px; padding-bottom:2px }table.vis tr.odd {background-color: #f9e9c3;}table.vis table.vis, table.vis table.vis td { border:0px !important } table.vis th { padding:3px 3px }body {background-color: #E6DEC8;}</style></head><body onbeforeunload="return false" bgcolor="#E6DEC8"><p align="center"><u><font size="5"><b>'+lang("title15")+'</b></font></u></p>';
								htm+='<table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%" class="vis" height="56">';
								htm+='<tr><td align="center" class="vis" height="32"><b>'+lang("att")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("f2")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("to")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("sendin")+'</b></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_spear.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_sword.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_axe.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_archer.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_spy.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_light.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_marcher.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_heavy.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_ram.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_catapult.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_knight.png" width="18" height="18"></td><td align="center" class="vis" dir="ltr" height="32"><img border=0 src="http://' + TWB_World() + 'graphic/unit/unit_snob.png" width="18" height="18"></td><td align="center" class="vis" height="32"><b>'+lang("estla")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("estar")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("arrival")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("link")+'</b></td><td align="center" class="vis" height="32"><b>'+lang("canc")+'</b></td></tr>';
							}
							for(i=LAST; i<Y.length-(-LAST); i++){
								strOUT_+="Loop #"+i+" \n";
								var SendIn=-1;
								// Check if from exists
								C=gei(Y[i-LAST].from);
								if(C){
									if(type==0){
										  ///////////////////////////////////////
										// This is the one for timed arrival //
										 ///////////////////////////////////////
										 
										// Slowest unit is noble : Make sure all targets can send + calculate time
										slowest=(Y[i-LAST].snob>0) ? "n":((Y[i-LAST].catapult>0 || Y[i-LAST].ram>0)?"c":((Y[i-LAST].sword>0)?"w":((Y[i-LAST].spear>0 || Y[i-LAST].axe>0 || Y[i-LAST].archer>0)?"p":((Y[i-LAST].heavy>0)? "h" :((Y[i-LAST].light>0 || Y[i-LAST].marcher>0)?"l":((Y[i-LAST].spy>0)?"s":"k"))))));
										sl_sped={"n":35,"c":30,"w":22,"p":18,"h":11,"l":10,"s":9,"k":10};
										// Speed is time (s) needed to travel 1 box
										current_speed=Math.round(sl_sped[slowest]/SPEED[1]/SPEED[0]*60);
										cur=getC(C.getAttribute("tooltiptext"));
										dist=Math.sqrt(Math.pow(coords[0]-cur[0],2)+Math.pow(coords[1]-cur[1],2));
										time_needed=dist*current_speed;
										// compare dates
										sendAt=(arrival_date.getTime()/1000-time_needed)*1000;
										strOUT_+="slowest="+slowest+" \n";
										strOUT_+="speed="+current_speed+" \n";
										strOUT_+="dist="+dist+" \n";
										strOUT_+="arrival_timestamp="+arrival_date.getTime()/1000+" \n";
										strOUT_+="time_needed="+time_needed+" \n";
										strOUT_+="send_at="+sendAt/1000+" \n";
									}
									else{
										  ////////////////////////////////////
										// This is the one for timed send //
										 ////////////////////////////////////
										sendAt=arrival_date.getTime();
									}
									SendIn=(sendAt-NOW)/1000;
									strOUT_+="SendIn="+SendIn+" \n";
									Y[i-LAST].x=coords[0];
									Y[i-LAST].y=coords[1];
									from=TWB_GA(C);
									typex=Y[i-LAST].support=="true"?"http://www.veryicon.com/icon/preview/Media/Buttons/Button%20Cancel%20Icon.jpg":"http://vxmyr.freehostia.com/2.jpg";
									typex="<img height=24 width=24 src='"+typex+"' border=0>";
									to=coords[0]+"|"+coords[1];
									// Set object local
									twb_.nobles[i]=Y[i-LAST];
									if(SendIn>0){
										// Update Info for Attack Sender
										delayed=new Number(delay)*i;
										A=SendIn-(-delayed/1000);
										HRS=Math.floor(A/3600);
										MIN=(Math.floor(A/60)-60*HRS);
										SEC=Math.round(A-60*MIN-3600*HRS);
										timeleft=HRS+":"+MIN+":"+SEC;
										strOUT_+="timeleft_timer="+timeleft+" \n";
										B=new Date();
										B.setTime(arrival_date.getTime());
										if(type==1){
											  ////////////////////////////////////
											// This is the one for timed send //
											 ////////////////////////////////////
											
											// Slowest unit is noble : Make sure all targets can send + calculate time
											slowest=(Y[i-LAST].snob>0) ? "n":((Y[i-LAST].catapult>0 || Y[i-LAST].ram>0)?"c":((Y[i-LAST].sword>0)?"w":((Y[i-LAST].spear>0 || Y[i-LAST].axe>0 || Y[i-LAST].archer>0)?"p":((Y[i-LAST].heavy>0)? "h" :((Y[i-LAST].light>0 || Y[i-LAST].marcher>0)?"l":((Y[i-LAST].spy>0)?"s":"k"))))));
											sl_sped={"n":35,"c":30,"w":22,"p":18,"h":11,"l":10,"s":9,"k":10};
											// Speed is time (s) needed to travel 1 box
											current_speed=Math.round(sl_sped[slowest]/SPEED[1]/SPEED[0]*60);
											cur=getC(C.getAttribute("tooltiptext"));
											dist=Math.sqrt(Math.pow(coords[0]-cur[0],2)+Math.pow(coords[1]-cur[1],2));
											time_needed=dist*current_speed;
											B.setTime(B.getTime()-(-time_needed*1000));
										}
										B.setHours(B.getHours()-$get_var("dtime"));
										B.setMonth(B.getMonth()-(-1));
										// Add delay to estimated
										B.setTime(B.getTime()-(-delayed));
										// Time difference
										B.setHours(B.getHours()-(-$get_var("dtime")));
										strOUT_+="estimated_arrival="+(B.getTime()/1000)+" \n";
										estimated=B.getDate()+"/"+B.getMonth()+"/"+B.getFullYear()+" "+B.getHours()+":"+B.getMinutes()+":"+B.getSeconds();
										C=arrival_date;
										if(type==0){
											C.setTime(C.getTime()-time_needed*1000);
										}
										ltime=C.getDate()+"/"+(C.getMonth()-(-1))+"/"+C.getFullYear()+" "+C.getHours()+":"+C.getMinutes()+":"+C.getSeconds();
										strOUT_+="land_time_display="+(C.getTime()/1000)+" \n";
										htm+="<tr name='row_"+i+"' class='odd'><td align='center' dir='ltr' height='23'>"+typex+"</td><td align='center' dir='ltr' height='23'>"+from+"</td><td align='center' dir='ltr' height='23'>"+to+"</td><td align='center' dir='ltr' height='23'><span name='noble_"+i+"' class=timer>"+timeleft+"</span></td><td align='center' dir='ltr' class='editable' height='23' name=spear>"+Y[i-LAST].spear+"</td><td align='center' dir='ltr' class='editable' height='23' name=sword>"+Y[i-LAST].sword+"</td><td align='center' dir='ltr' class='editable' height='23' name=axe>"+Y[i-LAST].axe+"</td><td align='center' dir='ltr' class='editable' height='23' name=archer>"+Y[i-LAST].archer+"</td><td align='center' dir='ltr' class='editable' height='23' name=spy>"+Y[i-LAST].spy+"</td><td align='center' dir='ltr' class='editable' height='23' name=light>"+Y[i-LAST].light+"</td><td align='center' dir='ltr' class='editable' height='23' name=marcher>"+Y[i-LAST].marcher+"</td><td align='center' dir='ltr' class='editable' height='23' name=heavy>"+Y[i-LAST].heavy+"</td><td align='center' dir='ltr' class='editable' height='23' name=ram>"+Y[i-LAST].ram+"</td><td align='center' dir='ltr' class='editable' height='23' name=catapult>"+Y[i-LAST].catapult+"</td><td align='center' dir='ltr' class='editable' height='23' name=snob>"+Y[i-LAST].knight+"</td><td align='center' dir='ltr' class='editable' height='23' name=snob>"+Y[i-LAST].snob+"</td><td align='center' dir='ltr' height='23'>"+ltime+"</td><td align='center' dir='ltr' height='23'>"+estimated+"</td><td align='center' dir='ltr' height='23'><span name='arrival_"+i+"'>-</span></td><td align='center' dir='ltr' height='23'><span name='link_"+i+"'>-</span></td><td align='center' dir='ltr' height='23'><a id='del_"+i+"' href=javascript:; onclick=window.openerx.twb_.lib.TWB_N_Cancel('"+i+"',this,window)>"+lang('canc')+"</a></td></tr>";
										twb_.nobles[i].sendAt=new String(SendIn*1000-(-delayed));
										Engines.Time.add_p('TWB_Send_Attack("'+i+'")',new String(SendIn*1000-(-delayed)));
									}
									else{
										// Cannot send this attack
										// Output That Attack Cannot Be sent
										htm+="<tr name='row_"+i+"' class='odd'><td align='center' dir='ltr' height='23'>"+typex+"</td><td align='center' dir='ltr' height='23'>"+from+"</td><td align='center' dir='ltr' height='23'>"+to+"</td><td align='center' dir='ltr' height='23'><span name='noble_"+i+"'>"+lang('cansn')+"</span></td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].spear+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].sword+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].axe+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].archer+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].spy+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].light+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].marcher+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].heavy+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].ram+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].catapult+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].knight+"</td><td align='center' dir='ltr' height='23'>"+Y[i-LAST].snob+"</td><td align='center' dir='ltr' height='23'>-</td><td align='center' dir='ltr' height='23'>-</td><td align='center' dir='ltr' height='23'><span name='arrival_"+i+"'>-</span></td><td align='center' dir='ltr' height='23'><span name='link_"+i+"'>-</span></td><td align='center' dir='ltr' height='23'><a href=javascript:; onclick=window.openerx.twb_.lib.TWB_N_Cancel('"+i+"',this,window)>"+lang('canc')+"</a></td></tr>";
									}
								}
							}
							// Open page with HTML 
							if(OP==null){
								htm+='</table><script>startTimer();startEdit();</script>';
								htm+='</body></html>';
								doc=openW(htm);
							}
							else{
								ZOP.document.getElementsByTagName("table")[0].childNodes[0].innerHTML+=htm;
								// Restart scripts
								ZOP.startTimer();
								ZOP.startEdit();
							}
						}
						else{
							// Malformed Date
							pq(lang("maldate"));
						}
					}
					else{
						// Malformed Coords
						pq(lang("malcoord"));
					}
				}
				TWB_S(strOUT_,"debug_noble_sender.log");
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_N_Cancel : function(I,wobj,WI){
		with(twb_.lib){
			// Restore object
			obj=twb_.nobles[I];
			PID=obj.sendAt+"_"+'TWB_Send_Attack("'+I+'")';
			// Kill timer
			Engines.Time.kill_p(PID);
			// Now also cancel from TW if sent already
			if(typeof wobj!="undefined" && wobj.getAttribute("name")!=null){
				largest=wobj.getAttribute("name").match(/id=(\d+)/)[1];
				hvar=WI.HVAR;
				vil=wobj.getAttribute("name").match(/village=(\d+)/)[1];
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=place&action=cancel&id="+largest+"&h="+hvar;
				$.ajax({url:link,async:false});
			}
			// Now update page by deleting row
			for(nxi = 0; nxi < winx.frames.length; nxi++){
				ZOP=winx.frames[nxi];
				TOP=xp("//tr[@name='row_"+I+"']",9,ZOP.document);
				if(TOP){
					TOP.parentNode.removeChild(TOP);
					break;
				}
			}
		}
	},
	TWB_Send_Attack : function(I){
		with(twb_.lib){
			try{
				// Convert passed obj
				type2=twb_.nobles[I].support=="true"?"http://www.veryicon.com/icon/preview/Media/Buttons/Button%20Cancel%20Icon.jpg":"http://vxmyr.freehostia.com/2.jpg";
				type2="<img height=24 width=24 src='"+type2+"' border=0>";
				type=twb_.nobles[I].support=="true"?"support=Support":"attack=Attack";
				URL="http://"+TWB_World()+"game.php?village="+twb_.nobles[I].from+"&screen=place&try=confirm";
				DATA_="spear="+twb_.nobles[I].spear+"&sword="+twb_.nobles[I].sword+"&axe="+twb_.nobles[I].axe+"&archer="+twb_.nobles[I].archer+"&spy="+twb_.nobles[I].spy+"&light="+twb_.nobles[I].light+"&marcher="+twb_.nobles[I].marcher+"&heavy="+twb_.nobles[I].heavy+"&ram="+twb_.nobles[I].ram+"&catapult="+twb_.nobles[I].catapult+"&knight="+twb_.nobles[I].knight+"&snob="+twb_.nobles[I].snob+"&x="+twb_.nobles[I].x+"&y="+twb_.nobles[I].y+"&"+type;
				// Make objects that would make multiple trains use different processors
				IK=Math.round(Math.random()*20);
				// Send request for attack
				$.ajax({type: "POST", async:true, url: URL, data: DATA_, success: function(tmp){
					try{
						// Confirm attack
						H=tmp.match(/command&amp;h=(\w+)/)[1];
						aid=tmp.match(/name="action_id"\svalue=\"(\d+)\"/)[1];
						OK=tmp.match(/\sname="submit"\stype="submit"\sonload=".+"\svalue="(.+)"\sstyle/)[1];
						STR=(twb_.nobles[I].catapult>0)?"&building="+twb_.nobles[I].cat:"";
						URL2="http://"+TWB_World()+"game.php?village="+twb_.nobles[I].from+"&screen=place&action=command&h="+H;
						type=twb_.nobles[I].support=="true"?"support":"attack";
						DATA2=type+"=true&x="+twb_.nobles[I].x+"&y="+twb_.nobles[I].y+"&action_id="+aid+"&spear="+twb_.nobles[I].spear+"&sword="+twb_.nobles[I].sword+"&axe="+twb_.nobles[I].axe+"&archer="+twb_.nobles[I].archer+"&spy="+twb_.nobles[I].spy+"&light="+twb_.nobles[I].light+"&marcher="+twb_.nobles[I].marcher+"&heavy="+twb_.nobles[I].heavy+"&ram="+twb_.nobles[I].ram+"&catapult="+twb_.nobles[I].catapult+"&knight="+twb_.nobles[I].knight+"&snob="+twb_.nobles[I].snob+STR+"&submit="+OK;
						IK=Math.round(Math.random()*20);
						$.ajax({type: "POST", async:true, url: URL2, data: DATA2, success: function(tmp2){
							TWB_Noble_(twb_.nobles[I],tmp2,I);
						}});
					}catch(e){
						// Some error appeared
						// POST to page 
						// Now update page by deleting row
						for(nxi = 0; nxi < winx.frames.length; nxi++){
							ZOP=winx.frames[nxi];
							TOP=xp("//tr[@name='row_"+I+"']",9,ZOP.document);
							if(TOP){
								TOP.innerHTML="<td align='center' dir='ltr' height='23'>"+type2+"</td><td align='center' dir='ltr' height='23'>"+from+"</td><td align='center' dir='ltr' height='23'>"+to+"</td><td align='center' dir='ltr' height='23'><span name='noble_"+i+"' title='"+e.message+"'>"+lang('erroc')+"</span></td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].spear+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].sword+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].axe+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].archer+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].spy+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].light+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].marcher+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].heavy+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].ram+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].catapult+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].knight+"</td><td align='center' dir='ltr' height='23'>"+twb_.nobles[I].snob+"</td><td align='center' dir='ltr' height='23'>-</td><td align='center' dir='ltr' height='23'>"+estimated+"</td><td align='center' dir='ltr' height='23'><span name='arrival_"+i+"'>-</span></td><td align='center' dir='ltr' height='23'><span name='link_"+i+"'>-</span></td><td align='center' dir='ltr' height='23'><a href=javascript:; onclick=window.openerx.twb_.lib.TWB_N_Cancel('"+i+"',this,window)>"+lang('canc')+"</a></td>";
								break;
							}
						}
					}
				}});
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_Noble_ : function(obj,tmp,I){
		with(twb_.lib){
			// Process info to update page if exists
			IVS=tmp.match(/info_command&amp;id=\d+&amp;type=own/g);
			H="";
			cmd={};
			largest=0;
			for(i=0; i<IVS.length; i++){
				X=IVS[i].match(/\d+/)[0];
				if(X>largest){
					largest=X;
				}
				cmd[X]=tmp.split("info_command&amp;id="+X+"&amp;type=own")[1].split("</tr>")[0].split("<td>")[1].split("</td>")[0];
			}
			link="<a target=_blank href='http://"+TWB_World()+"game.php?screen=info_command&id="+largest+"&type=own'>"+lang("link")+"</a>";
			// Find window and insert values
			for(nxi = 0; nxi < winx.frames.length; nxi++){
				ZOP=winx.frames[nxi];
				TOP=xp("//span[@name='link_"+I+"']",9,ZOP.document);
				TOP2=xp("//span[@name='arrival_"+I+"']",9,ZOP.document);
				if(TOP){
					TOP.innerHTML=link;
					// GRAB S and Ms Arrival time
					LINKED="http://"+TWB_World()+"game.php?screen=info_command&id="+largest+"&type=own";
					RT=$.ajax({url:LINKED,async:false}).responseText;
					S=RT.match(/(\d+)<span class="small hidden">:/)[1];
					MS=RT.split('small hidden">:')[1].split('</span')[0];
					TOP2.innerHTML=cmd[X]+":"+S+":"+MS;
					// Add delete param
					TOP=xp("//a[@id='del_"+I+"']",9,ZOP.document);
					vil=tmp.match(/village=(\d+)/)[1];
					h=tmp.match(/h=(\w+)/)[1];
					TOP.setAttribute('name',"http://"+TWB_World()+"game.php?village="+vil+"&screen=info_command&id="+largest+"&type=own&h="+h);
					// Assign cancel H
					ZOP.window.HVAR=tmp.split("action=cancel")[1].split("&amp;h=")[1].split("\"")[0];
					// Remove editable
					TOP2=xp("//tr[@name='row_"+I+"']/td",6,ZOP.document);
					for(i=0; i<TOP2.length; i++){
						TOP2[i].className="";
					}
					break;
				}
			} 
		}
	},
	TWB_SUS : function(){
		with(twb_.lib){
			try{
				A = prpt(lang("suask"));
				if(A){
					C=cN(gei("TWB-Villages"));
					vil=t=null;
					for(i=0; i<C.length; i++){
						if(getC(C[i]).join("|").replace("|")==A.replace(/\|/g).split(" ")[0]){
							vil=C[i].getAttribute("id");
						}
						if(getC(C[i]).join("|").replace("|")==A.replace(/\|/g).split(" ")[1]){
							t=C[i].getAttribute("id");
						}
					}
					if(vil && t){
						link="http://"+TWB_World()+"game.php?village="+vil+"&screen=place&mode=command&target="+t;
						TWB_Mast_Url(link);
					}
					else{
						pq(lang("sufor"));
					}
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_BSB : function(){
		with(twb_.lib){
			try{
				range=prpt(lang("susb"));
				if(range){
					range=range.match(/\d+\-\d+/);
					if(range){
						C=cN(gei("TWB-Villages"));
						range=range[0].split("-");
						start=(range[0]<0)?0:range[0]-1;
						endx=(range[1]>C.length)?C.length-1:range[1];
						// Total to be used for %
						twb_.SID=[];
						for(i=start; i<endx; i++){
							twb_.SID.push(C[i].getAttribute("id"));
						}
						twb_.suscout=twb_.SID.length;
						Engines.State.add_p("ssbh","TWB_UHB()","*",false);
						gei("TWB_U_HB").setAttribute("label","0%");
						gei("TWB_U_HB").setAttribute("hidden","false");
						link="http://"+TWB_World()+"game.php?village="+(C[range[0]-1].getAttribute("id"))+"&screen=place&mode=units";
						TWB_Mast_Url(link);
					}
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_UHB : function(){
		with(twb_.lib){
			try{
				links=$xp("//a[contains(@href,'action=all_back')]",6);
				for(j=0; j<links.length; j++){
					$.ajax({url:links[j].href,async: false});
				}
				// Move to next village
				tmp=[];
				for(i=1; i<twb_.SID.length; i++){
					tmp.push(twb_.SID[i]);
				}
				if(tmp.length>0){
					twb_.SID=tmp;
					per=Math.round(((twb_.suscout-tmp.length)*100)/twb_.suscout);
					gei("TWB_U_HB").setAttribute("label",per+"%");
					link="http://"+TWB_World()+"game.php?village="+twb_.SID[0]+"&screen=place&mode=units";
					TWB_Mast_Url(link);
				}
				else{
					delete tmp;
					delete twb_.SID;
					delete twb_.suscout;
					Engines.State.kill_p("ssbh");
					gei("TWB_U_HB").setAttribute("hidden","true");
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_L_Tag : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="overview"){
					twb_.tager=cf(lang("tagall"));
					TWB_Tag();
				}
				else{
					Engines.State.add_p("router","TWB_L_Tag()","*",true);
					TWB_GoTo("overview");
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_Tag : function(){
		with(twb_.lib){
			try{
				setTimeout(function(){
					$lns=$xp("//tbody/tr/td[2]/form/table/tbody/tr/td[1]/span/a[1]",6);
					$dur=$xp("//tbody/tr/td/table/tbody/tr/td[2]/form/table/tbody/tr/td[3]/span",6);
					$cur=getC($gei("menu_row2_village").nextSibling.innerHTML);
					for(o=0; o<$dur.length; o++){
						tmp=$.ajax({url:$lns[o].href,async: false}).responseText;
						HIS_XY=getC(tmp.split(lang("twvil"))[2].split("/a>")[0]);
						DUR=$dur[o].innerHTML.split(":");
						DUR=DUR[0]*3600-(-DUR[1]*60)-(-DUR[2]);
						DTC=new Array();
						xwop=TWB_World(0).match(/[a-z]+/)[0];
						dis=new Number(Math.sqrt(Math.pow($cur[0]-HIS_XY[0],2)+Math.pow($cur[1]-HIS_XY[1],2)));
						SPEED=TWB_Speed();
						FACTOR=SPEED[0]*SPEED[1];
						val=(dis*RD.get(xwop)[0]*60)/FACTOR;R1=val-DUR;R1=(R1<0)?Math.pow(9,9):R1;DTC["spar"]=R1;
						val=(dis*RD.get(xwop)[1]*60)/FACTOR;R2=val-DUR;R2=(R2<0)?Math.pow(9,9):R2;DTC["swo"]=R2;
						val=(dis*RD.get(xwop)[2]*60)/FACTOR;R3=val-DUR;R3=(R3<0)?Math.pow(9,9):R3;DTC["spy"]=R3;
						val=(dis*RD.get(xwop)[3]*60)/FACTOR;R4=val-DUR;R4=(R4<0)?Math.pow(9,9):R4;DTC["lcma"]=R4;
						val=(dis*RD.get(xwop)[4]*60)/FACTOR;R5=val-DUR;R5=(R5<0)?Math.pow(9,9):R5;DTC["hc"]=R5;
						val=(dis*RD.get(xwop)[5]*60)/FACTOR;R6=val-DUR;R6=(R6<0)?Math.pow(9,9):R6;DTC["rac"]=R6;
						val=(dis*RD.get(xwop)[7]*60)/FACTOR;R8=val-DUR;R8=(R8<0)?Math.pow(9,9):R8;DTC["snob"]=R8;
						ECT=sm(DTC["spar"],sm(DTC["swo"],sm(DTC["spy"],sm(DTC["lcma"],sm(DTC["hc"],sm(DTC["rac"],DTC["snob"]))))));
						TAG_SPEAR="Spear";
						TAG_LC="LC";
						if(TWB_WorldSet("game/archer")==1){
							TAG_SPEAR="Spear / Archer";
							TAG_LC="LC / M. Archer";
						}
						if(TWB_WorldSet("game/knight")==1){
							TAG_LC+=" / Paladin";
						}
						switch(ECT){
							case DTC["spar"]: UNIT=TAG_SPEAR; break;
							case DTC["swo"]: UNIT="Sword"; break;
							case DTC["spy"]: UNIT="Spy"; break;
							case DTC["lcma"]: UNIT=TAG_LC; break;
							case DTC["hc"]: UNIT="HC"; break;
							case DTC["rac"]: UNIT="Ram / Cat"; break;
							case DTC["snob"]: UNIT="Nobleman"; break;
							default : UNIT="Unknown"; break;
						}
						$btnid=$lns[o].href.match(/\d+/g)[2];
						eval("A=win();if(A.wrappedJSObject){A=A.wrappedJSObject;} A.editToggle('label["+$btnid+"]','edit["+$btnid+"]');");
						$xp("id('editInput["+$btnid+"]')",9).value="Attack["+UNIT+"]";
						$xp("id('editInput["+$btnid+"]')",9).nextSibling.nextSibling.click();
					}
					if(twb_.tager){
						if(gei(local.curVillage).nextSibling.getAttribute("id")!="seperator"){
							TWB_Next();
							window.setTimeout(TWB_Tag,$get_var("latency"));
						}
					}
				},1000);
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_GAID : function(){
		with(twb_.lib){
			try{
				if(typeof local.AID=="undefined"){
					if(TWB_Scr()=="place"){
						C=cN(gei("TWB-Villages"));
						for(i=0; i<C.length; i++){
							if(C[i].getAttribute('id')!=local.curVillage){
								target=C[i].getAttribute('tooltiptext').match(/(\d+)\|(\d+)/);
								break;
							}
						}
						units=TWB_UCMD(lang("ounit"));
						grab=units.match(/\d+([a-z])/)[1];
						count=units.match(/(\d+)[a-z]/)[1];
						switch(grab){
							case 'p' : un='spear'; break;
							case 'w' : un='sword'; break;
							case 'x' : un='axe'; break;
							case 'e' : un='archer'; break;
							case 's' : un='spy'; break;
							case 'l' : un='light'; break;
							case 'm' : un='marcher'; break;
							case 'h' : un='heavy'; break;
							case 'r' : un='ram'; break;
							case 'c' : un='catapult'; break;
							case 'k' : un='knight'; break;
							default : un='spy'; break;
						}
						UN=$xp("//a[contains(@href,'document.forms[0]."+un+"')]",9).href.match(/%20(\d+)/)[1];
						if(UN>=count){
							$xp("//*[@name='"+un+"']",9).value=count;
							$gei("inputx").value=target[1];
							$gei("inputy").value=target[2];
							$xp("//*[@type='submit']",9).click();
							// Launch process listener
							Engines.State.add_p("gaid","TWB_Grab()","*",false);
						}
						else{
							// Need scouts to perform operation
							pq(lang("ndes"));
						}
					}
					else{
						Engines.State.add_p("router","TWB_GAID()","*",true);
						TWB_GoTo("place","command");
					}
				}
				else{
					// Post on forum
					if(TWB_Mode()=="forum"){
						O=$xp("//textarea",9,win().document);
						if(O){
							O.value+="\n"+lang("aid")+": "+local.AID;
						}
						delete local.AID
						gei("TWB-GAID").style.color="";
					}
					else{
						// Need to be on forum
						pq(lang("ndfr"));
					}
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_Grab : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="place" && TWB_URL().match(/try=confirm/)===null){
					T=$xp("//a[contains(@href,'action=cancel')]",6);
					local.AID=0;last=null;
					for(i=0; i<T.length; i++){
						t=T[i].href.match(/id=(\d+)/)[1]
						local.AID=sm(t,local.AID,1);
						if(local.AID==t){
							last=i;
						}
					}
					Engines.State.kill_p("gaid");
					TWB_Mast_Url(T[last].href);
					// Highlight the Attack options to make it ready
					gei("TWB-GAID").style.color="green";
				}
			}catch(e){log('Attack Options',e);}
		}
	},
	/*TWB_APlan : function(){
		with(twb_.lib){
			try{
				grset=[];
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				if(uneval(groups)!="({})"){
					for(gr in groups){
						// First split each if we have multiple groups
						groups[gr]=groups[gr].split(",");
						for(U=0; U<groups[gr].length; U++){
							// Add each group if it is not found
							if(grset.indexOf(groups[gr][U])==-1){
								grset.push(groups[gr][U]);
							}
						}
					}
				}
				grstr="";
				for(i=0; i<grset.length; i++){
					grstr+="<a href='javascript:;' class=group id='"+grset[i]+"'>["+grset[i]+"]</a>&nbsp;&nbsp;";
				}
				grstr+="<a href='javascript:;' class=group id='"+lang("all")+"'>>"+lang("all")+"<</a>";
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				html='<html><head><link media="all" href="'+src+'sorter.css" type="text/css" rel="stylesheet"><script src="'+src+'sorter.js"></script><script src="'+src+'jquery.js"></script><title>'+lang("title18")+'</title><style>.vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } .block2 { -moz-border-radius: 25px; background-color: #804000; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head>';
				html+='<body class="vis"><form name=planner><div align=center><div class=block><a href=javascript:;><h1 align=center>'+lang("title18")+' :</h1></a></div><br><div class=block2><h2><b><a href="javascript:;" class="section" style="color:black;font-size:20" id="section1">-</a></b> '+lang("TWB-Village")+'</h2></div><div id="section1_" class="z2" style="padding: 10px; -moz-border-radius: 20px; background-color:#E6DEC8"><table id="villages" class="example vis table-autosort:1"><thead><tr><th colspan=2>'+grstr+'</th></tr><tr><th>'+lang("TWB-Village")+'</th><th>'+lang("typ")+'</th></tr></thead><tbody>';
				C=cN(gei("TWB-Villages"));
				for(z=0; z<C.length; z++){
					vid=C[z].id;
					name=C[z].label;
					grpclass=groups[vid];
					if(typeof grpclass!="undefined"){
						grpclass=grpclass.join(" ")+" "+lang("all");
					}
					else{
						grpclass=lang("all");
					}
					html+='<tr id="'+vid+'" class="'+grpclass+'"><td><input class="own" type="checkbox" value="_'+vid+'">&nbsp;&nbsp;'+name+'</td><td><input type="radio" value="fat" name="'+vid+'" id="'+vid+'">'+lang("fs2")+' &nbsp;&nbsp;<input type="radio" value="fsup"  name="'+vid+'" id="'+vid+'">'+lang("fs3")+' &nbsp;&nbsp;<input type="radio" value="nuke" name="'+vid+'" id="'+vid+'">'+lang("nuke")+' &nbsp;&nbsp;<input type="radio" value="noble" name="'+vid+'" id="'+vid+'">'+lang("nobl")+'</td></tr>';
				}
				html+='</tbody></table><br>'+lang("selall")+':&nbsp;&nbsp;<input type="checkbox" id="selectall">&nbsp;&nbsp;'+lang("TWB-Village")+'&nbsp;&nbsp;<input type="radio" name="all_" id="selectall1">'+lang("fs2")+' &nbsp;&nbsp;<input type="radio" name="all_" id="selectall2">'+lang("fs3")+' &nbsp;&nbsp;<input type="radio" name="all_" id="selectall3">'+lang("nuke")+' &nbsp;&nbsp;<input type="radio" name="all_" id="selectall4">'+lang("nobl")+'<br><input class="z1" type="button" onclick="chosen1();" value='+lang("ok")+' name="B1"></div><br><div class=block2><h2><b><a href="javascript:;" class="section" style="color:black;font-size:20" id="section2">+</a></b> '+lang("TWB-Settings")+'</h2></div><div id="section2_" class="z2" style="display:none;padding: 10px; -moz-border-radius: 20px; background-color:#E6DEC8"><table class="example vis"><thead><tr><th>'+lang("dur")+'</th></tr></thead><tbody><tr><td align=center><input style="text-align:center" type="text" id="dur" value="24" size="10"></td></tr></tbody></table><br><input class="z1" type="button" onclick="chosen2();" value='+lang("ok")+' name="B1"></div><br><div class=block2><h2><b><a href="javascript:;" class="section" style="color:black;font-size:20" id="section3">+</a></b> '+lang("tori")+'</h2></div><div id="section3_" class="z2" style="display:none;padding: 10px; -moz-border-radius: 20px; background-color:#E6DEC8"><input style="text-align:center" type="text" id="target" value="" size="10"><input class="z1" type="button" onclick="chosen3();" value='+lang("ok")+' name="B1"></div><br><div class=block2><h2><b><a href="javascript:;" class="section" style="color:black;font-size:20" id="section4">+</a></b> '+lang("result")+'</h2></div><div id="section4_" class="z2" style="display:none;padding: 10px; -moz-border-radius: 20px; background-color:#E6DEC8"></div><br><div align=center><input class="z1" type="reset" onclick="restart();" value='+lang("reset")+' name="B1"></div></div><script src="'+src+'planner.js"></script></form></body></html>';
				var doc=openW(html);
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_APlan_Calc : function(fncu,BIG){
		with(twb_.lib){
			$.ajax({
				type: "POST",
				url: host+"planner.php",
				data: BIG,
				success: fncu
			});
		}
	},
	TWB_APlan_Search : function(fncu,player){
		with(twb_.lib){
			try{
				$.ajax({
					type: "POST",
					url: "http://"+TWB_World()+"guest.php?screen=ranking&mode=player&search",
					data: "name="+player,
					success: fncu
				});
			}catch(e){log('Attack Options',e);}
		}
	},
	TWB_APlan_Villages : function(fncu,his_id){
		with(twb_.lib){
			try{
				$.ajax({
					type: "GET",
					url: "http://"+TWB_World()+"guest.php?screen=info_player&id="+his_id,
					success: fncu
				});
			}catch(e){log('Attack Options',e);}
		}
	},*/
	init : function(){
		with(twb_.lib){
			if(gei("TWB-GR5")==null){
				B1=BTN("toolbarbutton",{disabled:"true",id:"TWB-GR5",tooltiptext:"",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-ARL"},B1);
				B3=BTN("menuitem",{id:"TWB-Fake",label:"Fake Sender",oncommand:"try{twb_.lib.TWB_Fake();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{id:"TWB-Noble",label:"Attack Sender",oncommand:"try{twb_.lib.TWB_Noble();}catch(e){twb_.lib.log('Main',e);}"},B2);
				//B5=BTN("menuitem",{id:"TWB-Planner",label:"Attack Planner",oncommand:"try{twb_.lib.TWB_APlan();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B6=BTN("menuitem",{id:"TWB-GAID",label:"Grab AID",oncommand:"try{twb_.lib.TWB_GAID();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B7=BTN("menuseparator",{},B2);
				B8=BTN("menuitem",{id:"TWB-SUS",label:"Support Yourself",oncommand:"try{twb_.lib.TWB_SUS();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B9=BTN("menuitem",{id:"TWB-BSB",label:"Bring Supports Home",oncommand:"try{twb_.lib.TWB_BSB();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B10=BTN("toolbarbutton",{disabled:"true",id:"TWB_U_HB",label:"0",type:"button",hidden:"true"},undefined,gei("TWB-GR5").nextSibling);
				B11=BTN("menuitem",{id:"TWB-Tag",label:"Attack Tagger",oncommand:"try{twb_.lib.TWB_L_Tag();}catch(e){twb_.lib.log('Main',e);}"},B2);
				// Settings for attack planner
				UNITS=[["p",lang("uni1")+" / "+lang("uni4")],["w",lang("uni2")],["spy",lang("uni5")],["lcma",lang("uni6")+" / "+lang("uni7")],["hc",lang("uni8")],["r",lang("uni9")+" / "+lang("uni10"),],["n",lang("uni12"),]];
				TWB_New_Group_Set("planner",lang("aplanset"));
				TWB_New_Set("planner",[lang("slowestfat"),{id:"slowestfat",type:"menupop",selected:"slowestfat",values:UNITS}]);
				TWB_New_Set("planner",[lang("slowestfsup"),{id:"slowestfsup",type:"menupop",selected:"slowestfsup",values:UNITS}]);
				TWB_New_Set("planner",[lang("slowestnuke"),{id:"slowestnuke",type:"menupop",selected:"slowestnuke",values:UNITS}]);
				TWB_New_Set("planner",[lang("slowestnoble"),{id:"slowestnoble",type:"menupop",selected:"slowestnoble",values:UNITS}]);
			}
		}
	}
});
// @Plugin = Full Update Pack
// @Version = 2.1
// @Icons = uall
merge(twb_.lib,{
	TWB_UALL1 : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(gei(local.curVillage)===null){
						name=$xp("//tr[@id='menu_row2']/td[5]",9).childNodes[0].innerHTML;
						titl=$xp("//tr[@id='menu_row2']/td[6]",9).childNodes[0].innerHTML;
						tempButton=dce("menuitem");
						aliases[local.curVillage]=name;
						wtr1=(typeof aliases[local.curVillage]!="undefined" && aliases[local.curVillage]!=="")?aliases[local.curVillage]:name;
						disp=$get_var("alias")=="true"?wtr1+" ["+names[i]+"]":name;
						tempButton.setAttribute("label", disp);
						tempButton.setAttribute("id", local.curVillage);
						tempButton.setAttribute("oncommand", "twb_.lib.TWB_LoadVil('"+local.curVillage+"')");
						tempButton.addEventListener("contextmenu",TWB_Rename,false);
						tempButton.setAttribute("tooltiptext", titl);
						gei("TWB-Villages").appendChild(tempButton);
					}
					twb_.stage=0;
					local.last_Lookup=0;
					twb_.snif=TWB_ACMD(1);
					if(twb_.snif!==null){
						twb_.snif=twb_.snif.replace("7","123456").match(/\d/g);
						if(twb_.snif!==null){
							setI(TWB_UCH2,$get_var("latency"),"zned");
						}
					}
				}catch(e){log('Full Update',e);}
			}
			else{
				$twb(TWB_UALL1);
			}
		}
	},
	TWB_UALL2 : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="overview_villages" && (TWB_Mode()=="prod" || TWB_Mode()==null)){
						twb_.stage=0;
						twb_.snif=TWB_ACMD();
						if(twb_.snif!==null){
							twb_.snif=twb_.snif.replace("7","0123456").match(/\d/g);
							if(twb_.snif!==null){
								if(twb_.snif.indexOf("6")>-1){
									twb_.rmax=prpt(lang("maxrep"));
								}
								TWB_UCH();
							}
						}
					}
					else{
						if(typeof twb_.uallcf=="undefined" && hasPrem()){
							twb_.uallcf=$get_var("newuall");
						}
						Engines.State.add_p("router","TWB_UALL2()","*",true);
						if(hasPrem() && twb_.uallcf){
							TWB_Mast_Url(TWB_GoTo("overview_villages","prod",1,true,true)+"&group=0&page=-1");
							setT(function(){
								linkC=TWB_GoTo("overview_villages","prod",1,true,true)+"&group=0&page=0";
								$.ajax({url:linkC,async:true});
								unsetT("restore");
							},$get_var(0),"restore");
						}
						else{
							TWB_GoTo("overview_villages","prod");
						}
					}
				}catch(e){log('Full Update',e);}
			}
			else{
				$twb(TWB_UALL2);
			}
		}
	},
	TWB_UALL3 : function(){
		with(twb_.lib){
			try{
				// 1 week makes these info expire
				setExpire=7 * 24 * 60 * 60;
				NOW=Math.round(new Date().getTime()/1000);
				// Load links into array
				twb_.toLinks=[];
				// Units
				for(vid in data.units){
					updated=data.units[vid].timestamp;
					if(NOW-updated>setExpire){
						twb_.toLinks.push("village="+vid+"&screen=place&mode=command");
					}
					// Units outside
					try{
						if(NOW-data.units[cvil].outside.timestamp>setExpire){
							twb_.toLinks.push("village="+vid+"&screen=place&mode=units");
						}
					}catch(e){}
				}
				// Buildings
				for(vid in data.buildings){
					updated=data.buildings[vid].timestamp;
					if(NOW-updated>setExpire){
						twb_.toLinks.push("village="+vid+"&screen=main");
					}
				}
				// Research
				for(vid in data.techs){
					updated=data.techs[vid].timestamp;
					if(NOW-updated>setExpire){
						twb_.toLinks.push("village="+vid+"&screen=smith");
					}
				}
				// Queues
				for(vid in data.queues){
					updated1=data.queues[vid].timestamp1;
					updated2=data.queues[vid].timestamp2;
					updated3=data.queues[vid].timestamp3;
					if(typeof updated1!="undefined" && NOW-updated1>setExpire){
						twb_.toLinks.push("village="+vid+"&screen=barracks");
					}
					if(typeof updated2!="undefined" && NOW-updated2>setExpire){
						twb_.toLinks.push("village="+vid+"&screen=stable");
					}
					if(typeof updated3!="undefined" && NOW-updated3>setExpire){
						twb_.toLinks.push("village="+vid+"&screen=garage");
					}
				}
				twb_.toLinksL=twb_.toLinks.length;
				// Shuffling
				twb_.toLinks=TWB_Shuffle(twb_.toLinks);
				// Start Tracking
				AOP=gei("TWB-UALL");
				AOP.setAttribute("disabled",true);
				AOP=gei("TWB-UALLX");
				AOP.setAttribute("label","0%");
				// Setting up progress meter
				meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
				meter.label1=lang("total");
				meter.value1=0;
				meter.label2=lang("total");
				meter.value2=0;
				TWB_Popup(TWB_UCancel3);
				// Start links
				Engines.State.add_p("uall_out","TWB_UCH3()","*",false);
				TWB_UCH3();
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_UALL4 : function(){
		with(twb_.lib){
			try{
				// Update Groups
				// Get list of groups to update
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				if(uneval(groups)!="({})"){
					grset=[];
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
					grp=TWB_GCMD(lang("fg3"),grset);
					if(grp!=null){
						// Get list of what to update
						update=TWB_ACMD(1);
						update=update.replace("7","12345");
						// Add links
						twb_.toLinks=[];
						// Add perms for the lookup process
						twb_.zned="";
						// Villages we want to update
						C=cN(gei("TWB-Villages"));
						for(i=0; i<C.length; i++){
							// Each vil's groups were already split so just move on each
							vilGroups=groups[C[i].getAttribute("id")];
							if(typeof vilGroups=="undefined"){vilGroups=[];}
							for(U=0; U<vilGroups.length; U++){
								if(grp.indexOf(vilGroups[U])!=-1){
									vil=C[i].getAttribute("id");
									if(update.match("1")){
										// Units and troop moves
										twb_.toLinks.push("village="+vil+"&screen=place&mode=command");
									}
									if(update.match("2")){
										// Outside village
										twb_.toLinks.push("village="+vil+"&screen=place&mode=units");
									}
									if(update.match("3")){
										// Buildings
										twb_.toLinks.push("village="+vil+"&screen=main");
									}
									if(update.match("4")){
										// Research
										twb_.toLinks.push("village="+vil+"&screen=smith");
									}
									if(update.match("5")){
										// Queues
										twb_.toLinks.push("village="+vil+"&screen=barracks");
										twb_.toLinks.push("village="+vil+"&screen=stable");
										twb_.toLinks.push("village="+vil+"&screen=garage");
									}
									// Only add each vil once
									break;
								}
							}
						}
						twb_.toLinksL=twb_.toLinks.length;
						// Shuffling
						twb_.toLinks=TWB_Shuffle(twb_.toLinks);
						// Start Tracking
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",true);
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","0%");
						// Setting up progress meter
						meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
						meter.label1=lang("total");
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=0;
						TWB_Popup(TWB_UCancel4);
						// Start links
						Engines.State.add_p("uall_grp","TWB_UCH4()","*",false);
						TWB_UCH4();
					}
				}
				else{
					pq(lang("fg1"));
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_UALL5 : function(){
		with(twb_.lib){
			// Call a specific switchboard
			update=TWB_ACMD(3);
			update=update.replace("7","12345");
			if(update.length>0 && data.queues && data.units){
				// Add links
				twb_.toLinks=[];
				// Add perms for the lookup process
				twb_.zned="";
				// Villages we want to update
				C=cN(gei("TWB-Villages"));
				queu_1=queu_2=queu_3="";
				for(i=0; i<C.length; i++){
					vil=C[i].getAttribute("id");
					dta=data.queues[vil];
					dta2=data.units[vil];
					if(dta && dta2){
						if(typeof dta.timestamp1!="undefined"){
							queu=dta.queu1;
							for(vi=0; vi<queu.length; vi++){
								queu_1+=queu[vi][0];
							}
						}
						if(typeof dta.timestamp2!="undefined"){
							queu=dta.queu2;
							for(vi=0; vi<queu.length; vi++){
								queu_2+=queu[vi][0];
							}
						}
						if(typeof dta.timestamp3!="undefined"){
							queu=dta.queu3;
							for(vi=0; vi<queu.length; vi++){
								queu_3+=queu[vi][0];
							}
						}
						if((typeof dta2.population!="undefined" && parseInt(dta2.population.split("/")[0]) < 23000) || queu_1.length>0 || queu_2.length>0 || queu_3.length>0){
							// Village is OK, now what should we update for it ?
							if(update.match("1")){
								// Units and troop moves
								twb_.toLinks.push("village="+vil+"&screen=place&mode=command");
							}
							if(update.match("2")){
								// Outside village
								twb_.toLinks.push("village="+vil+"&screen=place&mode=units");
							}
							if(update.match("3")){
								// Buildings
								twb_.toLinks.push("village="+vil+"&screen=main");
							}
							if(update.match("4")){
								// Research
								twb_.toLinks.push("village="+vil+"&screen=smith");
							}
							if(update.match("5")){
								// Queues
								twb_.toLinks.push("village="+vil+"&screen=barracks");
								twb_.toLinks.push("village="+vil+"&screen=stable");
								twb_.toLinks.push("village="+vil+"&screen=garage");
							}
						}
					}
				}
				twb_.toLinksL=twb_.toLinks.length;
				// Shuffling
				twb_.toLinks=TWB_Shuffle(twb_.toLinks);
				// Start Tracking
				AOP=gei("TWB-UALL");
				AOP.setAttribute("disabled",true);
				AOP=gei("TWB-UALLX");
				AOP.setAttribute("label","0%");
				// Setting up progress meter
				meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
				meter.label1=lang("total");
				meter.value1=0;
				meter.label2=lang("total");
				meter.value2=0;
				TWB_Popup(TWB_UCancel5);
				// Start links
				Engines.State.add_p("uall_special","TWB_UCH5()","*",false);
				TWB_UCH5();
			}
		}
	},
	TWB_UALL6 : function(){
		with(twb_.lib){
			// Add links
			twb_.toLinks=[];
			// Villages we want to update
			C=cN(gei("TWB-Villages"));
			for(i=0; i<C.length; i++){
				vil=C[i].getAttribute("id");
				twb_.toLinks.push("village="+vil+"&screen=overview");
			}
			// Shuffling
			twb_.toLinks=TWB_Shuffle(twb_.toLinks);
			// Start Tracking
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",true);
			AOP=gei("TWB-UALLX");
			AOP.setAttribute("label","0%");
			// Setting up progress meter
			meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
			meter.label1=lang("total");
			meter.value1=0;
			meter.label2=lang("total");
			meter.value2=0;
			TWB_Popup(TWB_UCancel6);
			// Start links
			Engines.State.add_p("uall_special","TWB_UCH6()","*",false);
			TWB_UCH6();
		}
	},
	// Begin Cancel Func #1
	TWB_UCancel1 : function(){
		with(twb_.lib){
			M=gei("TWB-Toolbar");
			T=gei("TWB-Per");
			T2=gei("TWB-Per2");
			T3=gei("TWB-Per3");
			T4=gei("TWB-Per4");
			T5=gei("TWB-Per5");
			T6=gei("TWB-Per6");
			T8=gei("TWB-Per8");
			if(T){M.removeChild(T);}
			if(T2){M.removeChild(T2);}
			if(T3){M.removeChild(T3);}
			if(T4){M.removeChild(T4);}
			if(T5){M.removeChild(T5);}
			if(T6){M.removeChild(T6);}
			if(T8){M.removeChild(T8);}
			Engines.State.kill_p("autoup_n1");
			Engines.State.kill_p("autoup_n2");
			Engines.State.kill_p("autoup_n3");
			Engines.State.kill_p("autoup_n4");
			Engines.State.kill_p("autoup_n5");
			Engines.State.kill_p("autoup_n6");
			Engines.State.kill_p("autoup_n8");
			clearInterval(twb_.zned);
			delete twb_.zned;
			delete twb_.snif;
			delete twb_.stage;
			delete twb_.uallcf;
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			meter.label2=lang("total");
			meter.value2=100;
		}
	},
	// Extra fnc
	TWB_UCancel1_ : function(I){
		with(twb_.lib){
			// Kill all processes related
			meter.value2=100;
			TWB_unPopup();
			delete twb_.syncGRP;
			delete twb_.snif;
			delete twb_.usetint;
			Engines.State.kill_p("preuall1");
			Engines.State.kill_p("preuall2");
			Engines.State.kill_p("preuall3");
			Engines.State.kill_p("preuall4");
			Engines.State.kill_p("preuall5");
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			if(typeof I=="undefined"){
				pq(lang("aluip"));
			}
		}
	},
	// End Cancel Func #1
	TWB_UCH : function(){
		with(twb_.lib){
			try{
				if(typeof twb_.uallcf=="undefined" && hasPrem()){
					twb_.uallcf=$get_var("newuall");
				}
				if(hasPrem() && twb_.uallcf=="true"){
					if(twb_.snif.indexOf("0")=="0" || cN(gei("TWB-Villages")).length==1){
						// Ask if we want to sync groups
						twb_.syncGRP=$get_var("groupsync");
						// We are now on overviews prod
						// Meter
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",true);
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","0% [1]");
						// Setting up progress meter
						meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
						meter.label1=lang("total");
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=0;
						TWB_Popup(TWB_UCancel1_);
						// Grab villages, resources, farm and recruit
						W=$xp("//*[@id='production_table']//tr[@class]",6);
						world=TWB_World(0);
						aliases=new Object();
						session=TWB_OVE("session_"+world+"["+twb_myID+"].twb","");
						if(!isEmpty(session)){
							tmp=session.list;
							for(TRID in tmp){
								aliases[TRID]=tmp[TRID].alias;
							}
						}
						ids=new Array();
						titles=new Array();
						names=new Array();
						for(imm=0; imm<W.length; imm++){
							idk=W[imm].childNodes[1].childNodes[1].id.split("_")[1];
							tit=W[imm].childNodes[1].childNodes[1].textContent.match(/\(\d+\|\d+\)\s\w\d+/)[0];
							ids.push(idk);
							names.push(W[imm].childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent.replace(" "+tit,""));
							titles.push(tit);
							// Get farm res
							data.units=TWB_Get("units");
							data.units[idk]=(typeof data.units[idk]=="object")?data.units[idk]:new Object();
							data.units[idk].population=W[imm].childNodes[11].textContent;
							res=W[imm].childNodes[5].textContent.split(" ");
							data.units[idk].resources=[res[0].replace(".",""),res[1].replace(".",""),res[2].replace(".","")];
							if(twb_.snif.indexOf("5")!="-1" || twb_.snif.indexOf("6")!="-1" || twb_.snif.indexOf("7")!="-1"){
								// TODO : Get queues
								data.queues=TWB_Get("queues");
								data.queues[idk]=(typeof data.queues[idk]=="object")?data.queues[idk]:new Object();
								data.queues[idk].timefinish1="-";
								TWB_U_Add(data.queues[idk],"",0,["spear","sword","axe","archer"]);	
								data.queues[idk].queu1=[];
								data.queues[idk].queu2=[];
								data.queues[idk].queu3=[];
								CheckDST();
								servertime=getTime("1%3");
								data.queues[idk].timestamp1=Math.round(servertime.getTime()/1000);
								data.queues[idk].timestamp2=Math.round(servertime.getTime()/1000);
								data.queues[idk].timestamp3=Math.round(servertime.getTime()/1000);
								data.queues[idk].timefinish1=data.queues[idk].timestamp1-(-999999);
								data.queues[idk].timefinish2=data.queues[idk].timestamp2-(-999999);
								data.queues[idk].timefinish3=data.queues[idk].timestamp3-(-999999);
								_tasks=W[imm].lastChild.previousSibling.childNodes;
								for(klm=0; klm<_tasks.length; klm++){
									details=_tasks[klm].title.split(" - ");
									count=details[0];
									type=_tasks[klm].src.match(/unit_(\w+)\./)[1];
									type='<img alt="" title="'+count+'" src="/graphic/unit/unit_'+type+'.png?1">';
									switch(type){
										case "spear" :
										case "sword" :
										case "axe" :
										case "archer" : data.queues[idk].queu1.push([type,count,999999]); break;
										case "spy" :
										case "light" :
										case "marcher" :
										case "heavy" : data.queues[idk].queu2.push([type,count,999999]); break;
										case "ram" :
										case "catapult" : data.queues[idk].queu3.push([type,count,999999]); break;
									}
								}
							}
						}
						cur=$xp("//title",9).innerHTML.split(" -")[0].match(/\d+\|\d+/);
						cur=(cur===null)?titles[0].match(/\d+\|\d+/)[0]:cur[0];
						var container=gei("TWB-Villages");
						// Clean
						if(cN(container).length>0){
							for(i=cN(container).length; i>0; i--) {
								container.removeChild(cN(container,0));
							}
						}
						for(var i=0; ids.length>i; i++) {
							if(titles[i].match(cur)){
								cur=ids[i];
							}
							wtr1=(typeof aliases[ids[i]]!="undefined" && aliases[ids[i]]!=="")?aliases[ids[i]]:names[i];
							tempButton=dce("menuitem");
							disp=$get_var("alias")=="true"?wtr1+" ["+names[i]+"]":names[i];
							alias_[ids[i]]=wtr1;
							if($get_var("fnbr")=="true"){
								nbr=0;
								for(fID in Dfarms){
									if(Dfarms[fID].pID==ids[i]){
										nbr++;
									}
								}
								disp+=" ("+nbr+")";
							}
							tempButton.setAttribute("id", ids[i]);
							tempButton.setAttribute("label", disp);
							tempButton.className="menuitem-iconic";
							tempButton.setAttribute("src","http://"+TWB_World()+"graphic/dots/"+TWB_ICOVIL(ids[i])+".png");
							tempButton.setAttribute("oncommand", "twb_.lib.TWB_LoadVil('"+ids[i]+"')");
							tempButton.addEventListener("contextmenu",TWB_Rename,false);
							tempButton.setAttribute("tooltiptext", titles[i]);
							container.appendChild(tempButton);
						}
						local.curVillage=cur;
						TWB_Median();
					}
					if(twb_.snif.indexOf("1")!="-1" || twb_.snif.indexOf("2")!="-1"){
						meter.value2=meter.value1=16;
						// Next go to troops and grab in and out 
						Engines.State.add_p("preuall1","TWB_PRUA1()","*",true);
						TWB_Mast_Url(TWB_GoTo("overview_villages","units",1,true,true)+"&group=0&page=-1");
						setT(function(){
							linkC=TWB_GoTo("overview_villages","units",1,true,true)+"&group=0&page=0";
							$.ajax({url:linkC,async:true});
							unsetT("restore");
						},$get_var(0),"restore");
					}
					else{
						// Buildings
						if(twb_.snif.indexOf("3")!="-1"){
							meter.value2=meter.value1=33;
							// Next go to buildings
							Engines.State.add_p("preuall2","TWB_PRUA2()","*",true);
							TWB_Mast_Url(TWB_GoTo("overview_villages","buildings",1,true,true)+"&group=0&page=-1");
							setT(function(){
								linkC=TWB_GoTo("overview_villages","buildings",1,true,true)+"&group=0&page=0";
								$.ajax({url:linkC,async:true});
								unsetT("restore");
							},$get_var(0),"restore");
						}
						else{
							// Smithy
							if(twb_.snif.indexOf("4")!="-1"){
								meter.value2=meter.value1=49;
								// Next go to research
								Engines.State.add_p("preuall3","TWB_PRUA3()","*",true);
								TWB_Mast_Url(TWB_GoTo("overview_villages","tech",1,true,true)+"&group=0&page=-1");
								setT(function(){
									linkC=TWB_GoTo("overview_villages","tech",1,true,true)+"&group=0&page=0";
									$.ajax({url:linkC,async:true});
									unsetT("restore");
								},$get_var(0),"restore");
							}
							else{
								// Groups
								if(twb_.syncGRP){
									meter.value2=meter.value1=67;
									// Next sync groups
									Engines.State.add_p("preuall4","TWB_PRUA4()","*",true);
									TWB_Mast_Url(TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=-1");
									setT(function(){
										linkC=TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=0";
										$.ajax({url:linkC,async:true});
										unsetT("restore");
									},$get_var(0),"restore");
								}
								else{
									// Reports
									if(twb_.snif.indexOf("8")!="-1"){
										meter.value2=meter.value1=83;
										Engines.State.add_p("preuall5","TWB_PRUA5()","*",true);
										// Go to reports + initiate
										TWB_GoTo("report","all");
									}
									else{
										// Done
										TWB_UCancel1_(0);
									}
								}
							}
						}
					}
				}
				else{
					if(typeof twb_.usetint=="undefined"){
						setI(TWB_UCH,$get_var("latency"),"zned");
						twb_.usetint=true;
					}
					if(twb_.stage==9 && gei("TWB-Per7")===null){
						clearInterval(twb_.zned);
						delete twb_.zned;
						delete twb_.snif;
						delete twb_.stage;
						delete twb_.uallcf;
						delete twb_.usetint;
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",false);
						meter.label2=lang("total");
						meter.value2=100;
						pq(lang("aluip"),0);
					}
					if(twb_.stage==8 && gei("TWB-Per6")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","88% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[6];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=88;
						if(twb_.snif.indexOf("6")!="-1"){TWB_Report_Update();}
						twb_.stage=9;
					}
					if(twb_.stage==7 && gei("TWB-Per5")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","77% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[5];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=77;
						if(twb_.snif.indexOf("5")!="-1"){TWB_Garage_Update();}
						twb_.stage=8;
					}
					if(twb_.stage==6 && gei("TWB-Per4")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","66% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[5];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=66;
						if(twb_.snif.indexOf("5")!="-1"){TWB_Stable_Update();}
						twb_.stage=7;
					}
					if(twb_.stage==5 && gei("TWB-Per3")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","55% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[5];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=55;
						if(twb_.snif.indexOf("5")!="-1"){TWB_Barracks_Update();}
						twb_.stage=6;
					}
					if(twb_.stage==4 && gei("TWB-Per2")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","44% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[4];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=44;
						if(twb_.snif.indexOf("4")!="-1"){TWB_Smithy_Update();}
						twb_.stage=5;
					}
					if(twb_.stage==3 && gei("TWB-Per8")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","33% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[3];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=33;
						if(twb_.snif.indexOf("3")!="-1"){TWB_Building_Update();}
						twb_.stage=4;
					}
					if(twb_.stage==2 && gei("TWB-Per")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","22% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[2];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=22;
						if(twb_.snif.indexOf("2")!="-1"){TWB_UnitsOutside_Update();}
						twb_.stage=3;
					}
					if(twb_.stage==1 && gei("TWB_V_VH")===null){
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","11% ["+twb_.stage+"]");
						meter.label1=lang("ualx").split(" | ")[1];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=11;
						if(twb_.snif.indexOf("1")!="-1"){TWB_UnitsTroops_Update();}
						twb_.stage=2;
					}
					if(twb_.stage===0){
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",true);
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("label","0% ["+twb_.stage+"]");
						// Setting up progress meter
						meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
						meter.label1=lang("ualx").split(" | ")[0];
						meter.value1=0;
						meter.label2=lang("total");
						meter.value2=0;
						TWB_Popup(TWB_UCancel1);
						if(twb_.snif.indexOf("0")=="0" || cN(gei("TWB-Villages")).length==1){TWB_Villages_Update();TWB_Median();}
						twb_.stage=1;
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_PRUA1 : function(){
		with(twb_.lib){
			// Grab units 
			_rows1=$xp("//*[@id='units_table']//tr",6);
			unilist=[];
			data.units=TWB_Get("units");
			CheckDST();
			servertime=getTime("1%3");
			for(imm=4; imm<_rows1[0].childNodes.length-3; imm++){
				unilist.push(_rows1[0].childNodes[imm].childNodes[0].src.match(/unit_(\w+)/)[1]);
			}
			for(imm=1; imm<_rows1.length-4; imm+=5){
				// ID
				vid=_rows1[imm].childNodes[1].childNodes[1].id.split("_")[1];
				data.units[vid]=(typeof data.units[vid]=="object")?data.units[vid]:new Object();
				data.units[vid].outside=(typeof data.units[vid].outside=="object")?data.units[vid].outside:new Object();
				// Using this method to avoid link between variables
				_units=unilist.join(",").split(",");
				// Total Units Inside
				for(u=2; u<_rows1[imm+2].childNodes.length; u++){
					if(_rows1[imm+2].childNodes[u].nodeName!="#text"){
						unit=_units[0];
						if(typeof unit!="undefined"){
							// Trim a unit
							_units.splice(0,1);
							count=_rows1[imm+1].childNodes[u].textContent;
							data.units[vid][unit]=count;
						}
					}
				}
				_units=unilist.join(",").split(",");
				// Total Units Outside = Own - Inside
				for(u=2; u<_rows1[imm+1].childNodes.length; u++){
					if(_rows1[imm+1].childNodes[u].nodeName!="#text"){
						unit=_units[0];
						if(typeof unit!="undefined"){
							// Trim a unit
							_units.splice(0,1);
							inside=_rows1[imm+1].childNodes[u].textContent;
							count=data.units[vid][unit]-inside;
							data.units[vid].outside[unit]=count;
						}
					}
				}
				// Timestamps
				data.units[vid].timestamp=Math.round(servertime.getTime()/1000);
				data.units[vid].outside.timestamp=Math.round(servertime.getTime()/1000);
			}
			if(twb_.snif.indexOf("3")!="-1"){
				meter.value2=meter.value1=33;
				// Next go to buildings
				Engines.State.add_p("preuall2","TWB_PRUA2()","*",true);
				TWB_Mast_Url(TWB_GoTo("overview_villages","buildings",1,true,true)+"&group=0&page=-1");
				setT(function(){
					linkC=TWB_GoTo("overview_villages","buildings",1,true,true)+"&group=0&page=0";
					$.ajax({url:linkC,async:true});
					unsetT("restore");
				},$get_var(0),"restore");
			}
			else{
				// Smithy
				if(twb_.snif.indexOf("4")!="-1"){
					meter.value2=meter.value1=49;
					// Next go to research
					Engines.State.add_p("preuall3","TWB_PRUA3()","*",true);
					TWB_Mast_Url(TWB_GoTo("overview_villages","tech",1,true,true)+"&group=0&page=-1");
					setT(function(){
						linkC=TWB_GoTo("overview_villages","tech",1,true,true)+"&group=0&page=0";
						$.ajax({url:linkC,async:true});
						unsetT("restore");
					},$get_var(0),"restore");
				}
				else{
					// Groups
					if(twb_.syncGRP){
						meter.value2=meter.value1=67;
						// Next sync groups
						Engines.State.add_p("preuall4","TWB_PRUA4()","*",true);
						TWB_Mast_Url(TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=-1");
						setT(function(){
							linkC=TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=0";
							$.ajax({url:linkC,async:true});
							unsetT("restore");
						},$get_var(0),"restore");
					}
					else{
						// Reports
						if(twb_.snif.indexOf("6")!="-1"){
							meter.value2=meter.value1=83;
							Engines.State.add_p("preuall5","TWB_PRUA5()","*",true);
							// Go to reports + initiate
							TWB_GoTo("report","all");
						}
						else{
							// Done
							TWB_UCancel1_(0);
						}
					}
				}
			}
		}
	},
	TWB_PRUA2 : function(){
		with(twb_.lib){
			buildlist=[];
			_rows2=$xp("//*[@id='buildings_table']/tbody/tr[not(@class)]//img[contains(@src,'buildings')]",6);
			data.buildings=TWB_Get("buildings");
			CheckDST();
			servertime=getTime("1%3");
			for(imm=0; imm<_rows2.length; imm++){
				buildlist.push(_rows2[imm].src.match(/\/(\w+)\.p/)[1]);
			}
			// Grab buildings
			rows=$xp("//*[@id='buildings_table']/tbody/tr[@class]",6);
			for(imm=0; imm<rows.length; imm++){
				vid=rows[imm].childNodes[3].childNodes[1].id.split("_")[1];
				data.buildings[vid]=(typeof data.buildings[vid]=="object")?data.buildings[vid]:new Object();
				_builds=buildlist.join(",").split(",");
				for(u=4; u<rows[imm].childNodes.length; u++){
					if(rows[imm].childNodes[u].nodeName!="#text"){
						build=_builds[0];
						if(typeof build!="undefined"){
							// Trim a build
							_builds.splice(0,1);
							level=rows[imm].childNodes[u].textContent;
							data.buildings[vid][build]=level;
						}
					}
				}
				// Timestamp
				data.buildings[vid].timestamp=Math.round(servertime.getTime()/1000);
			}
			if(twb_.snif.indexOf("4")!="-1"){
				meter.value2=meter.value1=49;
				// Next go to research
				Engines.State.add_p("preuall3","TWB_PRUA3()","*",true);
				TWB_Mast_Url(TWB_GoTo("overview_villages","tech",1,true,true)+"&group=0&page=-1");
				setT(function(){
					linkC=TWB_GoTo("overview_villages","tech",1,true,true)+"&group=0&page=0";
					$.ajax({url:linkC,async:true});
					unsetT("restore");
				},$get_var(0),"restore");
			}
			else{
				// Groups
				if(twb_.syncGRP){
					meter.value2=meter.value1=67;
					// Next sync groups
					Engines.State.add_p("preuall4","TWB_PRUA4()","*",true);
					TWB_Mast_Url(TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=-1");
					setT(function(){
						linkC=TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=0";
						$.ajax({url:linkC,async:true});
						unsetT("restore");
					},$get_var(0),"restore");
				}
				else{
					// Reports
					if(twb_.snif.indexOf("6")!="-1"){
						meter.value2=meter.value1=83;
						Engines.State.add_p("preuall5","TWB_PRUA5()","*",true);
						// Go to reports + initiate
						TWB_GoTo("report","all");
					}
					else{
						// Done
						TWB_UCancel1_(0);
					}
				}
			}
		}
	},
	TWB_PRUA3 : function(){
		with(twb_.lib){
			techlist=[];
			_rows3=$xp("//*[@id='techs_table']/tbody/tr[not(@class)]//img",6);
			data.techs=TWB_Get("techs");
			CheckDST();
			servertime=getTime("1%3");
			for(imm=0; imm<_rows3.length; imm++){
				techlist.push(_rows3[imm].src.match(/unit_(\w+)\./)[1]);
			}
			// Grab techs
			rows=$xp("//*[@id='techs_table']/tbody/tr[@class]",6);
			for(imm=0; imm<rows.length; imm++){
				vid=rows[imm].childNodes[1].childNodes[1].id.split("_")[1];
				data.techs[vid]=(typeof data.techs[vid]=="object")?data.techs[vid]:new Object();
				_techs=techlist.join(",").split(",");
				for(u=4; u<rows[imm].childNodes.length; u++){
					if(rows[imm].childNodes[u].nodeName!="#text"){
						tech=_techs[0];
						if(typeof tech!="undefined"){
							// Trim a tech
							_techs.splice(0,1);
							level=rows[imm].childNodes[u].textContent;
							data.techs[vid][tech]=level;
						}
					}
				}
				// Timestamp
				data.techs[vid].timestamp=Math.round(servertime.getTime()/1000);
			}
			if(twb_.syncGRP){
				meter.value2=meter.value1=67;
				// Next sync groups
				Engines.State.add_p("preuall4","TWB_PRUA4()","*",true);
				TWB_Mast_Url(TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=-1");
				setT(function(){
					linkC=TWB_GoTo("overview_villages","groups",1,true,true)+"&group=0&page=0";
					$.ajax({url:linkC,async:true});
					unsetT("restore");
				},$get_var(0),"restore");
			}
			else{
				// Reports
				if(twb_.snif.indexOf("6")!="-1"){
					meter.value2=meter.value1=83;
					Engines.State.add_p("preuall5","TWB_PRUA5()","*",true);
					// Go to reports + initiate
					TWB_GoTo("report","all");
				}
				else{
					// Done
					TWB_UCancel1_(0);
				}
			}
		}
	},
	TWB_PRUA4 : function(){
		with(twb_.lib){
			if(twb_.syncGRP){
				// Update groups
				rows=$xp("//*[@id='group_assign_table']//span[contains(@id,'label')]",6);
				groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				for(imm=0; imm<rows.length; imm++){
					vid=rows[imm].id.split("_")[1];
					// Comma separate
					if(vid=="text"){
						continue;
					}
					_GRP=$gei("assigned_groups_"+vid+"_names").textContent.replace(/;\s/g,",");
					groups[vid]=_GRP;
				}
				TWB_S(uneval(groups),"groups_"+TWB_World(0)+"["+twb_myID+"].twb");
			}
			if(twb_.snif.indexOf("6")!="-1"){
				meter.value2=meter.value1=83;
				Engines.State.add_p("preuall5","TWB_PRUA5()","*",true);
				// Go to reports + initiate
				TWB_GoTo("report","all");
			}
			else{
				// End
				TWB_UCancel1_(0);
			}
		}
	},
	TWB_PRUA5 : function(){
		with(twb_.lib){
			if(twb_.snif.indexOf("8")!="-1"){
				TWB_ATN2();
			}
			else{
				// End
				TWB_UCancel1_(0);
			}
		}
	},
	// Begin Cancel Func #2
	TWB_UCancel2 : function(){
		with(twb_.lib){
			M=gei("TWB-Toolbar");
			T=gei("TWB-Per");
			T2=gei("TWB-Per2");
			T3=gei("TWB-Per3");
			T4=gei("TWB-Per4");
			T5=gei("TWB-Per5");
			T6=gei("TWB-Per6");
			T8=gei("TWB-Per8");
			if(T){M.removeChild(T);}
			if(T2){M.removeChild(T2);}
			if(T3){M.removeChild(T3);}
			if(T4){M.removeChild(T4);}
			if(T5){M.removeChild(T5);}
			if(T6){M.removeChild(T6);}
			if(T8){M.removeChild(T8);}
			clearInterval(twb_.zned);
			delete twb_.zned;
			delete twb_.snif;
			delete twb_.stage;
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			meter.value2=100;
			Engines.State.kill_p("autoup_nx");
		}
	},
	// End Cancel Func #2
	TWB_UCH2 : function(){
		with(twb_.lib){
			try{
				if(twb_.stage==7 && gei("TWB-Per6")===null){
					clearInterval(twb_.zned);
					delete twb_.zned;
					delete twb_.snif;
					delete twb_.stage;
					AOP=gei("TWB-UALL");
					AOP.setAttribute("disabled",false);
					meter.value2=100;
					Engines.State.kill_p("autoup_nx");
					pq(lang("aluip"),0);
				}
				if(twb_.stage==6 && gei("TWB-Per5")===null){
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","85% ["+twb_.stage+"]");
					meter.label1=lang("ualx").split(" | ")[5];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=85;
					if(twb_.snif.indexOf("5")!="-1"){TWB_Garage_Update_();}
					twb_.stage=7;
				}
				if(twb_.stage==5 && gei("TWB-Per4")===null){
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","71% ["+twb_.stage+"]");
					meter.label1=lang("ualx").split(" | ")[5];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=71;
					if(twb_.snif.indexOf("5")!="-1"){TWB_Stable_Update_();}
					twb_.stage=6;
				}
				if(twb_.stage==4 && gei("TWB-Per3")===null){
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","57% ["+twb_.stage+"]");
					meter.label1=lang("ualx").split(" | ")[5];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=57;
					if(twb_.snif.indexOf("5")!="-1"){TWB_Barracks_Update_();}
					twb_.stage=5;
				}
				if(twb_.stage==3 && gei("TWB-Per2")===null){
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","42% ["+twb_.stage+"]");
					meter.label1=lang("ualx").split(" | ")[4];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=42;
					if(twb_.snif.indexOf("4")!="-1"){TWB_Smithy_Update_();}
					twb_.stage=4;
				}
				if(twb_.stage==2 && gei("TWB-Per")===null){
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","28% ["+twb_.stage+"]");
					meter.label1=lang("ualx").split(" | ")[3];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=28;
					if(twb_.snif.indexOf("3")!="-1"){TWB_Building_Update_();}
					twb_.stage=3;
				}
				if(twb_.stage==1 && gei("TWB-Per")===null){
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","14% ["+twb_.stage+"]");
					meter.label1=lang("ualx").split(" | ")[2];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=14;
					if(twb_.snif.indexOf("2")!="-1"){TWB_UnitsOutside_Update_();}
					twb_.stage=2;
				}
				if(twb_.stage==0){
					AOP=gei("TWB-UALL");
					AOP.setAttribute("disabled",true);
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("label","0% ["+twb_.stage+"]");
					Engines.State.add_p("autoup_nx","TWB_ATNX()","*",false);
					// Setting up progress meter
					meter.caption=gei("TWB-UALL").getAttribute("tooltiptext");
					meter.label1=lang("ualx").split(" | ")[1];
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=0;
					TWB_Popup(TWB_UCancel2);
					if(twb_.snif.indexOf("1")!="-1"){TWB_UnitsTroops_Update_();}
					twb_.stage=1;
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Shuffle : function(o){
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	},
	// Begin Cancel Func #3
	TWB_UCancel3 : function(){
		with(twb_.lib){
			meter.value2=100;
			delete twb_.toLinks;
			Engines.State.kill_p("uall_out");
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			AOP=gei("TWB-UALLX");
			AOP.setAttribute("hidden",true);
		}
	},
	// End Cancel Func #3
	TWB_UCH3 : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()!="info_command" && !local.allow_commands){
					// Launch first link
					CUR=twb_.toLinks[0];
					if(typeof CUR!="undefined"){
						// Update percentage
						AOP=gei("TWB-UALLX");
						per=Math.round(100*(twb_.toLinksL-twb_.toLinks.length)/twb_.toLinksL);
						AOP.setAttribute("label",per+"%");
						meter.value1=per;
						meter.value2=per;
						// Remove first from links
						twb_.toLinks=twb_.toLinks.slice(1,twb_.toLinks.length);
						// Go to link
						TWB_Mast_Url("http://"+TWB_World()+"game.php?"+CUR);
					}
					else{
						// Done, STOP
						delete twb_.toLinks;
						Engines.State.kill_p("uall_out");
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",false);
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("hidden",true);
						pq(lang("aluip"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	// Begin Cancel Func #4
	TWB_UCancel4 : function(){
		with(twb_.lib){
			delete twb_.zned;
			delete twb_.toLinks;
			Engines.State.kill_p("uall_grp");
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			AOP=gei("TWB-UALLX");
			AOP.setAttribute("hidden",true);
			// Kill the meter
			meter.value2=100;
		}
	},
	// End Cancel Func #4
	TWB_UCH4 : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()!="info_command" && !local.allow_commands){
					// Launch first link
					CUR=twb_.toLinks[0];
					if(typeof CUR!="undefined"){
						// Update percentage
						AOP=gei("TWB-UALLX");
						per=Math.round(100*(twb_.toLinksL-twb_.toLinks.length)/twb_.toLinksL);
						AOP.setAttribute("label",per+"%");
						meter.value1=per;
						meter.value2=per;
						// Remove first from links
						twb_.toLinks=twb_.toLinks.slice(1,twb_.toLinks.length);
						// Go to link
						TWB_Mast_Url("http://"+TWB_World()+"game.php?"+CUR);
					}
					else{
						// Done, STOP
						delete twb_.zned;
						delete twb_.toLinks;
						Engines.State.kill_p("uall_grp");
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",false);
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("hidden",true);
						pq(lang("aluip"),0);
						// Kill the meter
						meter.value2=100;
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	// Begin Cancel Func #5
	TWB_UCancel5 : function(){
		with(twb_.lib){
			delete twb_.zned;
			delete twb_.toLinks;
			Engines.State.kill_p("uall_special");
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			AOP=gei("TWB-UALLX");
			AOP.setAttribute("hidden",true);
			// Kill the meter
			meter.value2=100;
		}
	},
	// End Cancel Func #5
	TWB_UCH5 : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()!="info_command" && !local.allow_commands){
					// Launch first link
					CUR=twb_.toLinks[0];
					if(typeof CUR!="undefined"){
						// Update percentage
						AOP=gei("TWB-UALLX");
						per=Math.round(100*(twb_.toLinksL-twb_.toLinks.length)/twb_.toLinksL);
						AOP.setAttribute("label",per+"%");
						meter.value1=per;
						meter.value2=per;
						// Remove first from links
						twb_.toLinks=twb_.toLinks.slice(1,twb_.toLinks.length);
						// Go to link
						TWB_Mast_Url("http://"+TWB_World()+"game.php?"+CUR);
					}
					else{
						// Done, STOP
						delete twb_.zned;
						delete twb_.toLinks;
						Engines.State.kill_p("uall_special");
						AOP=gei("TWB-UALL");
						AOP.setAttribute("disabled",false);
						AOP=gei("TWB-UALLX");
						AOP.setAttribute("hidden",true);
						pq(lang("aluip"),0);
						// Kill the meter
						meter.value2=100;
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_UnitsTroops_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n1","TWB_ATN()","*",false);
						TWB_Go_Ral(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_UnitsOutside_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per8");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n8","TWB_ATN()","*",false);
						TWB_Go_Ral_Troop(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Building_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per2");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n2","TWB_ATN()","*",false);
						TWB_Go_Ma(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Smithy_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per3");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n3","TWB_ATN()","*",false);
						TWB_Go_Smi(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Barracks_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per4");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n4","TWB_ATN()","*",false);
						TWB_Go_Bar(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Stable_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per5");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n5","TWB_ATN()","*",false);
						TWB_Go_Sta(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Garage_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per6");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						Engines.State.add_p("autoup_n6","TWB_ATN()","*",false);
						TWB_Go_Gar(cN(gei("TWB-Villages"),0).getAttribute("id"));
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Report_Update : function(){
		with(twb_.lib){
			try{
				if(twb()){
					M=gei("TWB-Toolbar");
					T=dce("toolbarbutton");
					T.setAttribute("id","TWB-Per7");
					T.setAttribute("hidden",true);
					M.appendChild(T);
					Engines.State.add_p("autoup_n7","TWB_ATN2()","*",false);
					TWB_GoTo("report");
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_ATN : function(){
		with(twb_.lib){
			try{
				if(gei(local.curVillage).nextSibling!==null){
					if(!local.allow_commands){
						T=gei("TWB-Per");
						T2=gei("TWB-Per2");
						T3=gei("TWB-Per3");
						T4=gei("TWB-Per4");
						T5=gei("TWB-Per5");
						T6=gei("TWB-Per6");
						T8=gei("TWB-Per8");
						AOP=gei("TWB-UALLX");
						NXE=100*((curN(local.curVillage,gei("TWB-Villages"))+1)/cN(gei("TWB-Villages")).length);
						if(T){AOP.setAttribute("label",Math.round(11+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(11+(NXE/9));}
						if(T8){AOP.setAttribute("label",Math.round(22+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(22+(NXE/9));}
						if(T2){AOP.setAttribute("label",Math.round(33+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(33+(NXE/9));}
						if(T3){AOP.setAttribute("label",Math.round(44+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(44+(NXE/9));}
						if(T4){AOP.setAttribute("label",Math.round(55+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(55+(NXE/9));}
						if(T5){AOP.setAttribute("label",Math.round(66+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(66+(NXE/9));}
						if(T6){AOP.setAttribute("label",Math.round(77+(NXE/9))+"% ["+twb_.stage+"]"); meter.value2=Math.round(77+(NXE/9));}
						meter.value1=Math.round(NXE);
						TWB_LoadVil(gei(local.curVillage).nextSibling.getAttribute("id"));
					}
				}
				else{
					M=gei("TWB-Toolbar");
					T=gei("TWB-Per");
					T2=gei("TWB-Per2");
					T3=gei("TWB-Per3");
					T4=gei("TWB-Per4");
					T5=gei("TWB-Per5");
					T6=gei("TWB-Per6");
					T8=gei("TWB-Per8");
					if(T){M.removeChild(T);}
					if(T2){M.removeChild(T2);}
					if(T3){M.removeChild(T3);}
					if(T4){M.removeChild(T4);}
					if(T5){M.removeChild(T5);}
					if(T6){M.removeChild(T6);}
					if(T8){M.removeChild(T8);}
					Engines.State.kill_p("autoup_n1");
					Engines.State.kill_p("autoup_n2");
					Engines.State.kill_p("autoup_n3");
					Engines.State.kill_p("autoup_n4");
					Engines.State.kill_p("autoup_n5");
					Engines.State.kill_p("autoup_n6");
					Engines.State.kill_p("autoup_n8");
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_ATN2 : function(){
		with(twb_.lib){
			try{
				twb_.links=[];
				Engines.State.kill_p("autoup_n7");
				links=$xp("//a[contains(@href,'view=')]",6);
				max=(twb_.rmax==0 || twb_.rmax===null)?999:twb_.rmax;
				for(o=0; (o<links.length && twb_.links.length<max); o++){
					twb_.links.push(links[o].href);
				}
				pages=$xp("//a[contains(@href,'from=')]",6);
				for(o=0; (o<pages.length && twb_.links.length<max); o++){
					tmp=$.ajax({url:pages[o].href,async: false}).responseText;
					L=tmp.match(/view=\d+/g);
					for(p=0; (p<L.length && twb_.links.length<max); p++){
						twb_.links.push("http://"+TWB_World()+"game.php?village="+local.curVillage+"&screen=report&mode=all&view="+L[p].match(/\d+/)[0]);
					}
				}
				if(twb_.links.length>0){
					twb_.linksID=0;
					Engines.State.add_p("autoup_n7_","TWB_ATN2_()","*",false);
					TWB_Mast_Url(twb_.links[0]);
				}
				else{
					if(typeof twb_.syncGRP=="undefined"){
						M=gei("TWB-Toolbar");
						T7=gei("TWB-Per7");
						if(T7){M.removeChild(T7);}
					}
					else{
						TWB_UCancel1_(0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_ATN2_ : function(){
		with(twb_.lib){
			try{
				twb_.linksID++;
				AOP=gei("TWB-UALLX");
				nextl=twb_.links[twb_.linksID];
				NXE=100*(twb_.linksID/twb_.links.length);
				AOP.setAttribute("label",Math.round(88+(NXE/9))+"% ["+twb_.stage+"]");
				meter.value1=Math.round(NXE);
				meter.value2=Math.round(88+(NXE/9));
				if(typeof nextl!="undefined"){
					TWB_Mast_Url(nextl);
				}
				else{
					M=gei("TWB-Toolbar");
					T7=gei("TWB-Per7");
					if(T7){M.removeChild(T7);}
					Engines.State.kill_p("autoup_n7_");
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_UnitsTroops_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_Go_Ral(local.curVillage);
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_UnitsOutside_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per8");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_GoTo("command","units");
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Building_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per2");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_Go_Ma(local.curVillage);
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Smithy_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per3");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_Go_Smi(local.curVillage);
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Barracks_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per4");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_Go_Bar(local.curVillage);
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Stable_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per5");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_Go_Sta(local.curVillage);
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_Garage_Update_ : function(){
		with(twb_.lib){
			try{
				if(twb()){
					if(local.curVillage!="null"){
						M=gei("TWB-Toolbar");
						T=dce("toolbarbutton");
						T.setAttribute("id","TWB-Per6");
						T.setAttribute("hidden",true);
						M.appendChild(T);
						TWB_Go_Gar(local.curVillage);
					}
					else{
						pq(lang("m3"),0);
					}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	TWB_ATNX : function(){
		with(twb_.lib){
			try{
				if(local.allow_commands==false){
					M=gei("TWB-Toolbar");
					T=gei("TWB-Per");
					T2=gei("TWB-Per2");
					T3=gei("TWB-Per3");
					T4=gei("TWB-Per4");
					T5=gei("TWB-Per5");
					T6=gei("TWB-Per6");
					T8=gei("TWB-Per8");
					if(T){M.removeChild(T);}
					if(T2){M.removeChild(T2);}
					if(T3){M.removeChild(T3);}
					if(T4){M.removeChild(T4);}
					if(T5){M.removeChild(T5);}
					if(T6){M.removeChild(T6);}
					if(T8){M.removeChild(T8);}
				}
			}catch(e){log('Full Update',e);}
		}
	},
	// Begin Cancel Func #5
	TWB_UCancel6 : function(){
		with(twb_.lib){
			delete twb_.toLinks;
			Engines.State.kill_p("uall_special");
			AOP=gei("TWB-UALL");
			AOP.setAttribute("disabled",false);
			AOP=gei("TWB-UALLX");
			AOP.setAttribute("hidden",true);
			// Kill the meter
			meter.value2=100;
		}
	},
	// End Cancel Func #5
	TWB_UCH6 : function(){
		with(twb_.lib){
			try{
				// Launch first link
				CUR=twb_.toLinks[0];
				if(typeof CUR!="undefined"){
					// Update percentage
					AOP=gei("TWB-UALLX");
					per=Math.round(100*(cN(gei("TWB-Villages")).length-twb_.toLinks.length)/cN(gei("TWB-Villages")).length);
					AOP.setAttribute("label",per+"%");
					meter.value1=per;
					meter.value2=per;
					// Remove first from links
					twb_.toLinks=twb_.toLinks.slice(1,twb_.toLinks.length);
					// Go to link
					TWB_Mast_Url("http://"+TWB_World()+"game.php?"+CUR);
				}
				else{
					// Done, STOP
					delete twb_.toLinks;
					Engines.State.kill_p("uall_special");
					AOP=gei("TWB-UALL");
					AOP.setAttribute("disabled",false);
					AOP=gei("TWB-UALLX");
					AOP.setAttribute("hidden",true);
					pq(lang("aluip"),0);
					// Kill the meter
					meter.value2=100;
				}
			}catch(e){log('Full Update',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-UALL")==null){
				TWB_New_Group_Set("uall",lang("TWB-UALL"));
				TWB_New_Set("uall",[lang("newuall"),{id:"newuall",type:"checkbox",checked:"newuall"}]);
				TWB_New_Set("uall",[lang("groupsync"),{id:"groupsync",type:"checkbox",checked:"groupsync"}]);
				
				B1=BTN("toolbarbutton",{disabled:"true",id:"TWB-UALL",type:"menu",tooltiptext:"Full Update"});
				B2=BTN("menupopup",{id:"TWB-UALLS"},B1);
				B3=BTN("menuitem",{id:"TWB-UALL1",label:"Current Village",oncommand:"try{twb_.lib.TWB_UALL1();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{id:"TWB-UALL3",label:"Outdated Data",oncommand:"try{twb_.lib.TWB_UALL3();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B5=BTN("menuitem",{id:"TWB-UALL4",label:"Select Groups",oncommand:"try{twb_.lib.TWB_UALL4();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B6=BTN("menuitem",{id:"TWB-UALL5",label:"Effective",oncommand:"try{twb_.lib.TWB_UALL5();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B7=BTN("menuitem",{id:"TWB-UALL6",label:"Loyalty",oncommand:"try{twb_.lib.TWB_UALL6();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B8=BTN("menuitem",{id:"TWB-UALL2",label:"All Village List",oncommand:"try{twb_.lib.TWB_UALL2();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B9=BTN("toolbarbutton",{disabled:"true",id:"TWB-UALLX",type:"button",label:"",hidden:"true"});
				BTN("toolbarseparator",{});
			}
		}
	}
});
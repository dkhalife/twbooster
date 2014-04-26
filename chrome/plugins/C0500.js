// @Plugin = Session Manager
// @Version = 1.7
// @Icons = gr3
merge(twb_.lib,{
	TWB_Loader : function(){
		with(twb_.lib){
			try{
				if(cf(lang("loex")+" "+TWB_World(0)+"?")){
					TWB_Load_Session(TWB_World(0));
					pq(lang("lof"),0);
				}
			}catch(e){log("Main",e);}
		}
	},
	TWB_RD : function(){
		with(twb_.lib){
			try{
				CheckDST();
				servertime=getTime("1%3");
				now=Math.round(servertime.getTime()/1000);
				MP=["faint","noble","fned","autoup_nx","autoup_n1","autoup_n2","autoup_n3","autoup_n4","autoup_n5","autoup_n6","autoup_n7_"];
				for(i=0; i<MP.length; i++){
					if(typeof Engines.State.processes[MP[i]]!="undefined"){
						return false;
					}
				}
				if((now-twb_idle)<600 || (TWB_Scr()!="overview_villages" && TWB_URL().match(/village=\d+/)!==null)){
					return false;
				}
				return true;
			}catch(e){log('Session Manager',e);}
		}			
	},
	TWB_SVR : function(){
		with(twb_.lib){
			// Match current URL to a DB server
			tmp=content.window.location.href.match(/http\:\/\/(.+)\.(.+)\.(.+)\/game\.php/);
			if(tmp && (tmp[2]+"."+tmp[3])==TWB_CWORLD(tmp[1].replace(/\d+/,"")) && local.TWB_Lang!=tmp[1].replace(/\d+/,"")){
				chto=tmp[1].replace(/\d+/,"");
				if(typeof chto!="undefined" && chto!=""){
					local.TWB_Lang=chto;
				}
			}
		}
	},
	TWB_Savlo : function(){
		with(twb_.lib){
			try{
				if(twb() && cN(gei("TWB-Villages")).length===0){
					X=TWB_URL().match(/village=(\d+)/);
					local.curVillage=(X && X.length>1)?X[1]:local.curVillage;
					TWB_Get_SiID();
					if(TWB_RD()){
						TWB_Get_MyID();
					}
					Engines.Time.clearAll();
					inu=TWB_R("attacks_"+TWB_World(0)+"["+twb_myID+"].twb");
					inu=(!isEmpty(inu))?B62.d(inu):"";
					inu=inu.split("}///");
					for(iu=0; iu<inu.length-1; iu++){
						info=inu[iu].split(",");
						datt=info[0].replace("{","");
						zorig=info[1];
						tori=info[2];
						units=info[3];
						day=new Date().getDate();
						mont=new Date().getMonth();
						year=new Date().getFullYear();
						d=datt.split(" ");
						if(d[0]-day==0 && d[1]-mont==0 && d[2]-year==0){
							Engines.Time.add_p("TWB_S_AT_O('"+zorig+"','"+tori+"','"+units+"')",datt.split(" ")[3]);
						}
					}
					if($get_var("savlo")=="true"){
						TWB_Load_Session(TWB_World(0));
						TWB_Marqd();
					}
					// Now connect to TWB if setting is on and not already connected
					if($get_var("logodbl")=="true" && TWB_Scr()!="ranking" && gei("TWB-GR2").getAttribute("disabled")=="true"){
						TWB_Connect();
					}
				}
			}catch(e){log('Session Manager',e);}
		}
	},
	TWB_Save_Session : function(alomin,world){
		with(twb_.lib){
			try{
				world=(typeof world=="undefined")?TWB_World(0):world;
				X=cN(gei("TWB-Villages"));
				if(X.length>0){
					total={};
					list=new Object();
					for(i=0; i<X.length; i++){
						idn=X[i].getAttribute("id");
						list[idn]=new Object();
						list[idn].title=X[i].getAttribute("tooltiptext");
						list[idn].alias=alias_[idn];
						list[idn].name=TWB_GA(X[i]);
						if(list[idn].name.match(/\[.+\]/)){
							list[idn].name=list[idn].name.split(" [")[1].split("]")[0];
						}
						if($get_var("fnbr")=="true"){
							list[idn].name=list[idn].name.replace(/\s\(\d+\)/,'');
						}
					}
					total.list=list;
					total.data=data;
					total.I=local.TWB_I;
					total.J=local.TWB_J;
					TWB_S(uneval(total),"session_"+world+"["+twb_myID+"].twb");
					if(typeof alomin=="undefined"){
						pq(lang("ses"),0);
					}
					TWB_S(uneval(reports),"reports_"+world+"["+twb_myID+"].twb");
				}
				else{
					if(typeof alomin=="undefined"){
						pq(lang("m3"));
					}
				}
			}catch(e){log('Session Manager',e);}
		}
	},
	TWB_Load_Session : function(world){
		with(twb_.lib){
			try{
				TWB_Backup();
				if(typeof world=="undefined"){
					world=TWB_World(0);
				}
				TWB_Get_SiID();
				TWB_Get_MyID();
				C=gei("TWB-Villages");
				if(cN(C).length>0){
					for(i=cN(C).length; i>0; i--) {
						C.removeChild(cN(C,0));
					}
				}
				session=TWB_OVE("session_"+world+"["+twb_myID+"].twb","");
				if(!isEmpty(session)){
					list=session.list;
					data=session.data;
					for(vil in list){
						tmpbtn=dce("menuitem");
						alias_[vil]=list[vil].alias;
						disp=$get_var("alias")=="true"?list[vil].alias+" ["+list[vil].name+"]":list[vil].name;
						if($get_var("fnbr")=="true"){
							nbr=0;
							for(fID in Dfarms){
								if(Dfarms[fID].pID==vil){
									nbr++;
								}
							}
							disp+=" ("+nbr+")";
						}
						tmpbtn.setAttribute("label", disp);
						tmpbtn.setAttribute("id", vil);
						tmpbtn.className="menuitem-iconic";
						tmpbtn.setAttribute("src","http://twbooster.com/phpBB3/twb/icons/dots/"+TWB_ICOVIL(vil)+".png");
						tmpbtn.setAttribute("oncommand", "twb_.lib.TWB_LoadVil('"+vil+"')");
						tmpbtn.addEventListener("contextmenu",TWB_Rename,false);
						tmpbtn.setAttribute("tooltiptext", list[vil].title);
						C.appendChild(tmpbtn);
					}
					local.TWB_I=session.I;
					local.TWB_J=session.J;
					local.curVillage=cN(C,0).getAttribute("id");
					reports=TWB_OVE("reports_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					FAR_PF=TWB_OVE("fprofiles_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					BOT_PF=TWB_OVE("profiles_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					BOT_SF=TWB_OVE("bots_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					TWB_Median();
				}
			}catch(e){log('Session Manager',e);}
		}
	},
	TWB_Get_MyID : function(){
		with(twb_.lib){
			try{
				WN=win();
				if(typeof WN.wrappedJSObject!="undefined"){
					WN=WN.wrappedJSObject;
				}
				twb_myID=WN.game_data.player.id;
			}catch(e){log('Session Manager',e);}
		}
	},
	TWB_Get_SiID : function(){
		with(twb_.lib){
			WN=win();
			if(typeof WN.wrappedJSObject!="undefined"){
				WN=WN.wrappedJSObject;
			}
			T=WN.game_data.player.sitter_id;
			return (T!=0)?T:"";
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.savlo=="undefined"){
				B1=BTN("toolbarbutton",{id:"TWB-GR3",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-Ses"},B1);
				B3=BTN("menuitem",{id:"TWB-Load",label:"Load Session",oncommand:"try{twb_.lib.TWB_Loader();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{id:"TWB-Save",label:"Save Session",oncommand:"try{twb_.lib.TWB_Save_Session();}catch(e){twb_.lib.log('Main',e);}"},B2);
				BTN("toolbarseparator",{});
				Engines.State.add_p("savlo","TWB_Savlo()","*",false);
			}
		}
	},
	post_init : function(){
		with(twb_.lib){
			if($get_var("autodet").length>0){
				Engines.State.add_p("serv","TWB_SVR()","*",false);
			}
		}
	}
});
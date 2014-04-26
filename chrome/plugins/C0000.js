// @Plugin = Settings Shell and Quick Options
// @Version = 1.5
// @Icons = settings
merge(twb_.lib,{
	TWB_R_SET : function(){
		with(twb_.lib){
			try{
				sets=TWB_OVE("","",0);
				sets=sets.split(";");
				for(i=0; i<sets.length; i++){
					I=sets[i].indexOf("=");
					set=sets[i].substr(0,I);
					if(set!=""){
						setto=sets[i].substr(I-(-1));
						local.settings[set]=setto;
					}
				}
			}catch(e){log('SETX Shell',e);}
		}
	},
	TWB_SETX : function(){
		with(twb_.lib){
			try{
				setz=[];
				for(group in settings){
					// Group header
					setz.push(settings[group].label);
					for(j=0; j<settings[group].sets.length; j++){
						setz.push(settings[group].sets[j]);
					}
				}
				params={inn:setz,out:null};
				window.openDialog("chrome://twbdialer/content/settings.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", lang("title7"), lang("xon9"), params, window);
				G=params.out;
				if(G){
					TWB_Save(G);
				}
			}catch(e){log("SETX Shell",e);}
		}
	},
	IA : function(ar){
		try{
			X=true;
			for(i=0; i<ar.length; i++){
				Z=ar[i];
				ar[i]="";
				// Allow Empty values
				if(Z!="" && ar.indexOf(Z)>-1){
					X=false;
				}
			}
			return X;
		}catch(e){log("Main",e);}
	},
	TWB_Save : function(G){
		with(twb_.lib){
			try{
				old=TWB_R();
				if(!isEmpty(old)){
					if(old.match("langx=")===null){
						old=B62.d(old);
					}
				}
				test=["~",G.fastc,G.back,G.next,G.overviews,G.overview,G.map,G.hq,G.bar,G.sta,G.aca,G.wor,G.smi,G.place,G.mar,G.statue,G.coin,G.coinx,G.p1,G.p2,G.p3,G.p4,G.tro,G.des,G.ofu,G.defu];
				if(IA(test)){
					encoded=["tuser","tpass","copl","user","pass","hash"];
					for(i=0; i<encoded.length; i++){
						G[encoded[i]]=B62.e(G[encoded[i]]);
					}
					// Replace with for loop
					total="";
					for(tag in G){
						total+=tag+"="+G[tag]+";";
					}
					if(total!=old){
						TWB_S(total);
						TWB_R_SET();
						TWB_TNI(G.theme);
						unlanch();
						TWB_SNI();
						TWB_ONI();
						lanch();
						local.TWB_Lang=G.langx;
						local.TWB_Langx=G.langxx;
						TWB_Update_Language();
						Engines.State.kill_p("home");
						Engines.State.kill_p("sigm");
						Engines.State.kill_p("serv");
						if($get_var("img")=="true"){
							Engines.State.add_p("home","TWB_Home()","*",false);
						}
						if($get_var("tsig").length>0){
							Engines.State.add_p("sigm","TWB_Sig()","*",false);
						}
						if($get_var("autodet").length>0){
							Engines.State.add_p("serv","TWB_SVR()","*",false);
						}
					}
				}
				else{
					pq(lang("xon10"));
				}
			}catch(e){log("SETX Shell",e);}
		}
	},
	TWB_QSwitch : function(){
		with(twb_.lib){
			if(local.TWB_qkeys=="on"){
				local.TWB_qkeys="off";
				gei("TWB-QKEYS").setAttribute("label",lang("TWB-QKEYS")+" ("+lang("off")+")");
			}
			else{
				local.TWB_qkeys="on";
				gei("TWB-QKEYS").setAttribute("label",lang("TWB-QKEYS")+" ("+lang("on")+")");
			}
		}
	},
	TWB_QKS : function(key){
		with(twb_.lib){
			WOW=String.fromCharCode(key.which);
			if((twb() && local.status==1) || WOW=="~"){
				if(local.TWB_qkeys=="on" || WOW=="~"){
					gee=win().document.activeElement.nodeName;
					if(shortcuts[WOW] && gee!="INPUT" && gee!="TEXTAREA"){
						eval(shortcuts[WOW]);
						if(shortcuts[WOW].match("TWB_Recruit") && $get_var("autonex")=="true"){
							Engines.State.add_p("anext","TWB_Next()","*",true);
						}
					}
				}
			}
		}
	},
	TWB_Recruit_Uni : function(t){
		with(twb_.lib){
			bar=["spear","sword","axe","archer"];
			sta=["spy","light","marcher","heavy"];
			wor=["ram","catapult"];
			p=0;
			if(twb()){
				try{
					zobda=win();
					w=zobda.window;
					tmp=w.document.childNodes[1].innerHTML;
					scr=TWB_Scr();
					reg=new RegExp("max.\\s\\d+","g");
					x=tmp.match(reg);
					switch(scr){
						case "barracks" : if(t<4){p=1;t=bar[t];max=$gei(t).parentNode.childNodes[2].innerHTML.replace("(max. ","").replace(")","");} break;
						case "stable" : if(t<4){p=1;t=sta[t];max=$gei(t).parentNode.childNodes[2].innerHTML.replace("(max. ","").replace(")","");} break;
						case "garage" : if(t<2){p=1;t=wor[t];max=$gei(t).parentNode.childNodes[2].innerHTML.replace("(max. ","").replace(")","");} break;
						default : break;
					}
					if(p==1){
						tmp=$xp("//input[@id='"+t+"']",9);
						if(tmp!==null){
							tmp.value=max.replace("max. ","");
							$xp("//form//input[@type='submit']",9).click();
						}
					}
				}catch(e){log("SETX Shell",e);}
			}
		}
	},
	TWB_Insert_Uni : function(pt,ac){
		with(twb_.lib){
			if(twb()){
				try{
					scr=TWB_Scr();
					if(scr=="place"){
						if(pt===0){
							defz=["spear","sword","archer"];
						}
						if(pt==1){
							defz=["axe","spy","light","marcher","ram","catapult"];
						}
						if(pt=="all"){
							defz=["spear", "sword", "archer","axe", "spy", "light", "marcher", "ram", "catapult","heavy"];
						}
						if(pt!="all" && cf(lang("ahcc"))){
							defz.push("heavy");
						}
						for(zx=0; zx<defz.length; zx++){
							obj=$xp("//form//input[@name='"+defz[zx]+"']",9);
							if(obj){
								max=obj.parentNode.childNodes[4].innerHTML.match(/\(\d+\)/)[0].replace("(","").replace(")","");
								obj.value=max;
							}
						}
					}
				}catch(e){log("SETX Shell",e);}
			}
		}
	},
	TWB_VSwitch : function(){
		with(twb_.lib){
			if(local.TWB_vkeys=="on"){
				TWB_HFV(0);
				local.TWB_vkeys="off";
				gei("TWB-VKEYS").setAttribute("label",lang("TWB-VKEYS")+" ("+lang("off")+")");
			}
			else{
				TWB_HFV(1);
				local.TWB_vkeys="on";
				gei("TWB-VKEYS").setAttribute("label",lang("TWB-VKEYS")+" ("+lang("on")+")");
			}
		}
	},
	TWB_HFV : function(inr){
		with(twb_.lib){
			twb_.VStatus=inr;
		}
	},
	TWB_HFP : function(Dreading){
		with(twb_.lib){
			if(twb_.VStatus=="1" && local.status==1){
				Dreading=Dreading.toLowerCase();
				znty="";testy=false;
				for(keyword in dictionary){
					if(Dreading.match(keyword)){
						znty=dictionary[keyword];
						testy=true;
						break;
					}
				}
				if(testy){
					if(znty!=""){
						eval(znty);
					}
				}
				else{
					// Check for nbrs 
					ATNx=TWB_WTN(Dreading);
					if(ATNx>0){
						C=cN(gei("TWB-Villages"));
						ATNx=C[ATNx-1];
						if(ATNx){
							ATNx.click();
						}
					}
					else{
						if(TWB_WWrite){
							TWB_WWrite(Dreading);
						}
					}
				}
			}
		}
	},
	TWB_Report : function(){
		with(twb_.lib){
			try{
				request="";
				for(i=0; i<errors.length; i++){
					request+=errors[i]+"<br>";
				}
				request=B62.e(request);
				// get user input
				inp=prpt(lang("repin"));
				if(inp!==null){
					inp=B62.e(inp);
					c=twb_.ENTRY;
					$.get(host+"update.php?mode=report&c="+c+"&req="+request+"&inp="+inp,function(tmp){
						if(tmp.match("success")){
							if(typeof popx=="undefined"){pq(lang("erops"),0);}
							errors=[];
						}
						else{
							if(typeof popx=="undefined"){pq(lang("eropf"),0);}
						}
					});
				}
			}catch(e){log("SETX Shell",e);}
		}
	},
	TWB_Switch : function(){
		with(twb_.lib){
			if(local.status==1){
				local.status=0;
				local.pause=true;
			}
			else{
				local.status=1;
				local.pause=false;
			}
		}
	},
	TWB_PurgeCache : function(){
		with(twb_.lib){
			if(cf(lang("pcacf"))){
				file=Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				try{
					file.initWithPath(LOCO);
					fsd=file.directoryEntries;
					while(fsd.hasMoreElements()){
						cutd=fsd.getNext();
						pthd=cutd.QueryInterface(Components.interfaces.nsILocalFile).path.split("TWB")[1];
						if(!pthd.match(/farms|bqd|dat|conf/)){
							cutd.remove(true);
						}
					}
				}catch(e){}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof twb_.Vlistener=="undefined"){
				// Add Settings Menu
				B1=BTN("toolbarbutton",{id:"TWB-Settings",type:"menu",tooltiptext:"Settings"},undefined);
				B2=BTN("menupopup",{},B1);
				B3=BTN("menuitem",{label:"Keyboard Shortcuts (Off)",id:"TWB-QKEYS",oncommand:"try{twb_.lib.TWB_QSwitch();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{label:"Voice Recognition (Off)",id:"TWB-VKEYS",oncommand:"try{twb_.lib.TWB_VSwitch();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B5=BTN("menuitem",{label:"TWB Settings",id:"TWB-SETX",oncommand:"try{twb_.lib.TWB_SETX();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B6=BTN("menuitem",{label:"Running Processes",id:"TWB-RUNX",oncommand:"try{twb_.lib.TWB_RCMD(twb_.lib.lang('TWB-RUNX'));}catch(e){twb_.lib.log('Main',e);}"},B2);
				B7=BTN("menuitem",{label:"Report Error",disabled:"true",id:"TWB-REP",oncommand:"try{twb_.lib.TWB_Report();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B8=BTN("menuitem",{label:"Purge Cache",id:"TWB-PCA",oncommand:"try{twb_.lib.TWB_PurgeCache();}catch(e){twb_.lib.log('Main',e);}"},B2);
				
				// TWB Switch
				shortcuts["~"]="TWB_Switch();";
				
				// Start the listener 
				twb_.Vlistener = {
					onSocketAccepted : function(socket, transport){
						try {
							var stream = transport.openInputStream(0,0,0);
							var instream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
							instream.init(stream);
							var dataListener = {
								onStartRequest: function(request, context){},
								onStopRequest: function(request, context, status){
									instream.close();
									stream.close();
									outstream.close();
								},
								onDataAvailable: function(request, context, inputStream, offset,count){
									TWB_HFP(instream.read(count));
								}
							};
							var pump = Cc["@mozilla.org/network/input-stream-pump;1"].createInstance(Ci.nsIInputStreamPump);
							pump.init(stream, -1, -1, 0, 0, true);
							pump.asyncRead(dataListener,null);
							var transprop = 'Listening...';
							var outstream = transport.openOutputStream(0,0,0);
							outstream.write(transprop,transprop.length);
						}catch(e){log(1,3,e);}
					},
					onStopListening : function(socket, status){}
				};
				twb_.serverSocket = Cc["@mozilla.org/network/server-socket;1"].createInstance(Ci.nsIServerSocket);
				twb_.serverSocket.init(202020,false,-1);
				twb_.serverSocket.asyncListen(twb_.Vlistener);
				
				TWB_New_Group_Set("keys",lang("xon6"));
				TWB_New_Set("keys",[lang("TWB-Back"),{id:"back",type:"textbox",maxlength:"1",value:"back"}]);
				TWB_New_Set("keys",[lang("TWB-Next"),{id:"next",type:"textbox",maxlength:"1",value:"next"}]);
				TWB_New_Set("keys",[lang("TWB-Overviews"),{id:"overviews",type:"textbox",maxlength:"1",value:"overviews"}]);
				TWB_New_Set("keys",[lang("TWB-Map"),{id:"map",type:"textbox",maxlength:"1",value:"map"}]);
				TWB_New_Set("keys",[lang("TWB-Overview"),{id:"overview",type:"textbox",maxlength:"1",value:"overview"}]);
				TWB_New_Set("keys",[lang("TWB-Main"),{id:"hq",type:"textbox",maxlength:"1",value:"hq"}]);
				TWB_New_Set("keys",[lang("TWB-Des"),{id:"des",type:"textbox",maxlength:"1",value:"des"}]);
				TWB_New_Set("keys",[lang("TWB-Barracks"),{id:"bar",type:"textbox",maxlength:"1",value:"bar"}]);
				TWB_New_Set("keys",[lang("TWB-Stable"),{id:"sta",type:"textbox",maxlength:"1",value:"sta"}]);
				TWB_New_Set("keys",[lang("TWB-Workshop"),{id:"wor",type:"textbox",maxlength:"1",value:"wor"}]);
				TWB_New_Set("keys",[lang("TWB-Smithy"),{id:"smi",type:"textbox",maxlength:"1",value:"smi"}]);
				TWB_New_Set("keys",[lang("TWB-Snob"),{id:"aca",type:"textbox",maxlength:"1",value:"aca"}]);
				TWB_New_Set("keys",[lang("TWB-Place"),{id:"place",type:"textbox",maxlength:"1",value:"place"}]);
				TWB_New_Set("keys",[lang("TWB-Tro"),{id:"tro",type:"textbox",maxlength:"1",value:"tro"}]);
				TWB_New_Set("keys",[lang("TWB-Market"),{id:"mar",type:"textbox",maxlength:"1",value:"mar"}]);
				TWB_New_Set("keys",[lang("TWB-Statue"),{id:"statue",type:"textbox",maxlength:"1",value:"statue"}]);
				TWB_New_Set("keys",[lang("xon7"),{id:"coin",type:"textbox",maxlength:"1",value:"coin"}]);
				TWB_New_Set("keys",[lang("xon8"),{id:"coinx",type:"textbox",maxlength:"1",value:"coinx"}]);
				TWB_New_Set("keys",[lang("xon14"),{id:"p1",type:"textbox",maxlength:"1",value:"p1"}]);
				TWB_New_Set("keys",[lang("xon15"),{id:"p2",type:"textbox",maxlength:"1",value:"p2"}]);
				TWB_New_Set("keys",[lang("xon16"),{id:"p3",type:"textbox",maxlength:"1",value:"p3"}]);
				TWB_New_Set("keys",[lang("xon17"),{id:"p4",type:"textbox",maxlength:"1",value:"p4"}]);
				TWB_New_Set("keys",[lang("offu"),{id:"ofu",type:"textbox",maxlength:"1",value:"ofu"}]);
				TWB_New_Set("keys",[lang("defu"),{id:"defu",type:"textbox",maxlength:"1",value:"defu"}]);
				TWB_New_Set("keys",[lang("north"),{id:"north",type:"textbox",maxlength:"1",value:"north"}]);
				TWB_New_Set("keys",[lang("west"),{id:"west",type:"textbox",maxlength:"1",value:"west"}]);
				TWB_New_Set("keys",[lang("south"),{id:"south",type:"textbox",maxlength:"1",value:"south"}]);
				TWB_New_Set("keys",[lang("east"),{id:"east",type:"textbox",maxlength:"1",value:"east"}]);
				TWB_New_Set("keys",[lang("rback"),{id:"rback",type:"textbox",maxlength:"1",value:"rback"}]);
				TWB_New_Set("keys",[lang("rnext"),{id:"rnext",type:"textbox",maxlength:"1",value:"rnext"}]);
			}
		}
	}
});
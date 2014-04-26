// @Plugin = Connection Manager
// @Version = 2.0
// @Icons = 0
merge(twb_.lib,{
	TWB_VLD : function(){
		with(twb_.lib){
			if(gei("TWB-GR2").getAttribute("disabled")=="true"){
				TWB_Connect();
			}
			else{
				TWB_DisConnect();
			}
		}
	},
	TWB_Server : function(cas){
		with(twb_.lib){
			switch(cas){
				case 'forum' : F="../"; break;
				case 'wiki' : F="../wiki.php"; break;
				case 'cpanel' : F="../cpanel.php"; break;
				case 'pmanager' : F="check/"; break;
				default : F=""; break;
			}
			TWB_All_Url(host+F,'1','1');
		}
	},
	TWB_Connect : function(){
		with(twb_.lib){
			try{
				if(twb()){
					WN=win();
					if(typeof WN.wrappedJSObject!="undefined"){
						WN=WN.wrappedJSObject;
					}
					try{
						user=WN.game_data.player.name;
						twb_.wrl=WN.game_data.world;
					}catch(e){
						user="[Not Found]";
						twb_.wrl="[Not Found]";
					}
					twb_.unm=user;
					tuser=$get_var("tuser");
					tpass=$get_var("tpass");
					if(tuser==="" || tpass===""){
						var prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
						username = {value:""};
						password = {value:""};
						check = {};
						result = prompts.promptUsernameAndPassword(window, lang("TWB-Lo"), lang("TWB-L1")+" "+lang("TWB-User").toLowerCase()+" "+lang("and")+" "+lang("TWB-Pass").toLowerCase()+":", username, password, '', check);
						twb_.ENTRY=username.value;
						ZType=$.ajax({url:host+"update.php?mode=Zquery&c="+username.value,async: false}).responseText;
						if(result){
							TWB_St1(username.value,password.value);
						}
					}
					else{
						twb_.ENTRY=tuser;
						ZType=$.ajax({url:host+"update.php?mode=Zquery&c="+tuser,async: false}).responseText;
						TWB_St1(B62.d(tuser),B62.d(tpass));
					}
				}
				else{
					$twb(TWB_Connect);
				}
			}catch(e){log("Connection Manager",e);}
		}
	},
	TWB_St1 : function(Sx,Px){
		with(twb_.lib){
			try{
				twb_.l=Sx;
				twb_.p=B62.e(Px).replace("=","TWBEQ");
				result=$.ajax({url:host+"ajax.php?mode=xjsp1&unm="+twb_.unm+"&wrl="+twb_.wrl+"&c="+twb_.l+"&l="+twb_.p+"&ver="+version(),async: false}).responseText;
				switch(result){
					case "0": pq(lang("msg2")); break;
					case "1": pq(lang("msg1")); break;
					case "2": pq(lang("msg5")); break;
					case "3": pq(lang("msg3")); break;
					case "4": pq(lang("msg4")); break;
					default :
						TWB_CL(result);
					break;
				}
			}catch(e){log("Connection Manager",e);}
		}
	},
	TWB_CL : function(z){
		with(twb_.lib){
			try{
				if($get_var("autoupnt")=="true"){
					if(z.match("Outdated")){
						// Check if autoupdate is on and notify
						last_server_update=z.match(/Outdated\{(\d+)\}/)[1];
						last_local_update=TWB_OVE("autoupdate.dat",[0,0]);
						if(last_local_update[0]-last_server_update<0){
							timestamp=Math.round(new Date().getTime()/1000);;
							last_local_update[0]=timestamp;
							TWB_Notify(lang("updateav"),"Update",[{value:"Update",func:TWB_Update},{value:"Close",func:TWB_Update_Close}]);
						}
						TWB_S(uneval(last_local_update),"autoupdate.dat");
					}
					else{
						// Add code to DL details for plugins and compare + put other msg for plugins
						// But give priority for toolbar update
						// Grab details from server
						last_server_update=$.ajax({url:host+"plugs.php",async:false}).responseText;
						last_local_update=TWB_OVE("autoupdate.dat",[0,0]);
						if(last_local_update[1]-last_server_update<0){
							timestamp=Math.round(new Date().getTime()/1000);
							last_local_update[1]=timestamp;
							Z=$.ajax({url:host+"manager.php",async:false}).responseText;
							eval("Z="+Z);
							// Grab details from client
							ZP={};
							loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"plugins";
							netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
							f = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
							f.initWithPath(loc);
							fs=f.directoryEntries;
							while(fs.hasMoreElements()){
								cut=fs.getNext();
								is = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
								is.init(cut,0x01,00004,null);
								sz = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
								sz.init(is);
								cts = sz.read(sz.available());
								sz.close();
								try{
									N=cts.match(/\@Plugin\s=\s(.+)/);
									V=cts.match(/\@Version\s=\s(.+)/);
									N=(N && N.length>1)?N[1]:"Unknown";
									V=(V && V.length>1)?V[1]:"Unknown";
									ZP[N]=V;
								}catch(e){}
							}
							// Compare and directly trigger if there is an update
							// Compare Mine to Server : So that we dnt check for uninstalled
							plugs="";
							for(PLUG in ZP){
								if(new Number(ZP[PLUG])-new Number(Z[PLUG])<0){
									plugs+=", "+PLUG;
								}
							}
							if(plugs.length>0){
								plugs=plugs.substr(2);
								//Engines.State.add_p("aupdate2","TWB_St3('"+plugs+"')","*",true);
								TWB_St3(plugs);
							}
						}
						TWB_S(uneval(last_local_update),"autoupdate.dat");
					}
				}
				// Now we are connected : 
				TWB_Connected();
				if($get_var("savlo")=="true"){
					TWB_Load_Session(TWB_World(0));
				}
				// See if we have premium stuff to do
				TWB_Auth();
			}catch(e){log("Connection Manager",e);}
		}
	},
	TWB_St3 : function(plugs){
		with(twb_.lib){
			TWB_Notify(lang("updateav2")+plugs,"Update",[{value:"Launch Plugin Manager",func:TWB_PManage2},{value:"Close",func:TWB_Update_Close}]);
		}
	},
	TWB_PManage2 : function(){
		with(twb_.lib){
			// Shut the notify box
			twb_.NOTIFY[twb_.NOTIFY.length-1].close();
			TWB_PManage();
		}
	},
	TWB_Update : function(){
		with(twb_.lib){
			try{
				// Shut the notify box
				TWB_Update_Close();
				// Update
				$.get(host+"dl.php?ref=autoupdate",function(vero){
					var params = {
						"TWB Dialer" : { 
							"URL" : host+"download/TWB v"+vero+".xpi", toString: function(){ return this.URL; }
							}
						};
					InstallTrigger.install(params);
				});
			}catch(e){log("Connection Manager",e);}
		}
	},
	TWB_Update_Close : function(){
		with(twb_.lib){
			// Shut the notify box
			twb_.NOTIFY[twb_.NOTIFY.length-1].close();
		}
	},
	Clear_Cache : function(){
		with(twb_.lib){
			file=Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			try{
				file.initWithPath(LOCO+"tmp"+SL);
				file.remove(true);
			}catch(e){}
		}
	},
	TWB_Auth : function(){
		with(twb_.lib){
			result=$.ajax({url:host+"update.php?mode=extra&c="+twb_.l+"&l="+twb_.p,async: false}).responseText;
			if(result>0){
				// Start Meter
				meter.caption="Premium Loading...";
				meter.label1="Accessing...";
				meter.value1=0;
				meter.label2="Progress";
				meter.value2=-1;
				// Load Extras
				result=$.ajax({url:host+"update.php?mode=fileauth&c="+twb_.l+"&l="+twb_.p,async: false}).responseText;
				if(result!=""){
					files=result.split(",");
					loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"TWB"+SL+"extras"+SL;
					TWB_unPopup(1);
					TWB_Popup();
					for(o=0; o<files.length; o++){
						files[o]=files[o].split("|");
						meter.label1="File: "+files[o][0];
						f = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
						f.initWithPath(loc+files[o][0]+".js");
						if(f.exists() && f.isFile()){
							contents=TWB_R(files[o][0]+".js",loc);
							vers=contents.match(/VERSION=(\d+)/)[1];
							if(vers<files[o][1]){ 
								result=$.ajax({url:host+"update.php?mode=filefetch&c="+twb_.l+"&l="+twb_.p+"&f="+files[o][0],async: false}).responseText;
								TWB_S(result,files[o][0]+".js",loc);
							}
							TWB_Auth_Load(contents,files,o);
						}
						else{
							result=$.ajax({url:host+"update.php?mode=filefetch&c="+twb_.l+"&l="+twb_.p+"&f="+files[o][0],async: false}).responseText;
							TWB_S(result,files[o][0]+".js",loc);
							contents=TWB_R(files[o][0]+".js",loc);
							TWB_Auth_Load(contents,files,o);
						}
						meter.value2=Math.round(100*(o+1)/files.length);
					}
				}
				else{
					meter.value2=100;
					if(typeof twb_.POPUP!="undefined"){
						TWB_unPopup();
					}
				}
			}
			else{
				// Delete Extras
				f = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				f1 = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				loc1=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"TWB"+SL;
				loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"TWB"+SL+"extras"+SL;
				f1.initWithPath(loc1);
				if(f1.exists() && f1.isDirectory()){
					f.initWithPath(loc);
					if(f.exists() && f.isDirectory()){
						fs=f.directoryEntries;
						while(fs.hasMoreElements()){
							// Recursive removal
							cut=fs.getNext();
							file.initWithPath(cut.QueryInterface(Components.interfaces.nsILocalFile).path);
							file.remove(true);
						}
					}
				}
			}
		}
	},
	TWB_Auth_Load : function(contents,files,o){
		// Load the auth
		regkey=contents.match(/SN=(\w+)/)[1];
		result=twb_.lib.$.ajax({url:twb_.lib.host+"auth.php?mode=extra&user="+twb_.lib.twb_.l+"&l="+twb_.lib.twb_.p+"&f="+files[o][0]+"&hash="+(twb_.lib.hex_md5(twb_.lib.B62.e(regkey+twb_.lib.twb_.l.toLowerCase()))),async: false}).responseText;
		if(result!="null"){
			for(u=0; u<=100; u++){
				try{
					if(twb_.lib.hex_md5(twb_.lib.B62.e((u-(-1))+twb_.lib.twb_.l.toLowerCase()))==result){
						//merge(twb_.lib,eval("T="+twb_.lib.GibberishAES.dec(contents.split("@End")[0],u-(-1))+";"));
						merge(twb_.lib,eval("T="+contents.split("@End")[0]));
						delete T;
						return;
					}
				}catch(e){
					continue;
				}
			}
			twb_.lib.log("","Unable to load plugin : "+files[o][0],2);
		}
		else{
			twb_.lib.log("","Bad plugin serial : "+files[o][0],2);
		}
	},
	TWB_DisConnect : function(){
		with(twb_.lib){
			try{
				imix=gen("toolbarbutton");
				for(mix=0; imix.length>mix; mix++){
					if(imix[mix].getAttribute("id").match("TWB")){
						imix[mix].setAttribute("disabled",true);
					}
				}
				local.sessionID=0;
				items=["TWB-Notepad","TWB-MainMenu","TWB-Settings","TWB-VHandle","TWB-Stats","TWB-Sort","TWB-GR3","TWB-Back","TWB-Next","TWB-Light","TWB-Alog","TWB-Map","TWB-Overviews","TWB-Overview","TWB-Main","TWB-Barracks","TWB-Stable","TWB-Workshop","TWB-Smithy","TWB-Snob","TWB-Place","TWB-Statue","TWB-Market","TWB-Icons","TWB-Shop","TWB-MMap","TWB-Script","TWB-GR4","TWB-CMD-Q"];
				gei('TWB-Lit').setAttribute('id','TWB-Light');
				for(i=0; i<items.length; i++){
					if(gei(items[i])){
						gei(items[i]).setAttribute('disabled',false);
					}
				}
				if(gei('TWB-RCache')){
					gei('TWB-RCache').setAttribute('disabled',true);
				}
				unsetI("ping");
				clearInterval(twb_.ping);
				delete twb_.ping;
				unsetI("ping2");
				clearInterval(twb_.ping2);
				delete twb_.ping2;
				// First lets get your SID
				if($get_var("server_logout")=="true"){
					$.ajax({url:host+"../index.php",async:false,success:function(Tmp){
						SID=Tmp.match(/ucp\.php\?mode=logout&amp;sid=(\w+)/)[1];
						// Inform server of the logout
						$.ajax({url:host+"../ucp.php?mode=logout&sid="+SID,async:true,success:function(){
							TWB_TNI();
						}});
					}});
				}
				else{
					TWB_TNI();
				}
			}catch(e){log("Connection Manager",e);}
		}
	}
});
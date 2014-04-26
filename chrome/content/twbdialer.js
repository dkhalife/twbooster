// Only when the toolbar is visible
if(window.toolbar.visible){
	var twb_ = {
		lib : {
			flist : [],
			errors : [],
			__init : [],
			Cc : Components.classes,
			Ci : Components.interfaces,
			csClass : this.Cc['@mozilla.org/consoleservice;1'],
			cN : function(ara,i){
				if(typeof i=="undefined"){
					r=ara.childNodes;
				}
				else{
					if(i>=0){
						r=ara.childNodes[i];
					}
					else{
						r=null;
					}
				}
				return r;
			},
			insertAt : function(ara,vItem,iIndex){
				ara.splice(iIndex, 0, vItem);
				return ara;
			},
		},
		initialize : function() {
			twb_.lib.gBrowser=gBrowser;
			twb_.lib.dstZones = new Array ();
			twb_.lib.qReport = new Array ();
			twb_.lib.TableTimes = new Array();
			twb_.lib.currentQuery = null;
			twb_.lib.Local = new Date();
			twb_.lib.GMToffset = twb_.lib.Local.getTimezoneOffset();
			if (navigator.appName == "Netscape"){ if (twb_.lib.GMToffset < 0) {twb_.lib.GMToffset = Math.abs(twb_.lib.GMToffset)} else {twb_.lib.GMToffset = twb_.lib.GMToffset - (Math.abs(twb_.lib.GMToffset) *2)} }
			SL=(navigator.platform.indexOf("Linux")==-1 && navigator.platform.indexOf("Mac")==-1)?"\\":"/";
			twb_.lib.SL=SL;
			delete SL;
			(function(){
				jsLoader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
				jsLoader.loadSubScript("chrome://twbdialer/content/jquery.js");
				jsLoader.loadSubScript("chrome://twbdialer/content/hash.js");
				//jsLoader.loadSubScript("chrome://twbdialer/content/dumper.js");
			})();
			twb_.lib.$=twb_.lib.jQuery=jQuery;
			jQuery=jQuery.noConflict();
		},
		shutdown : function() {
			with(twb_.lib){
				if($get_var("savlo")=="true"){
					if(local.lastWorld!==""){
						TWB_Save_Session(0,local.lastWorld);
					}
				}
				if(twb_.serverSocket){
					twb_.serverSocket.close();
				}
			}
			twb_.lib.Clear_Cache();
			window.removeEventListener("load", twb_.initialize, false);
			window.removeEventListener("unload", twb_.shutdown, false);
			for(prop in twb_){
				delete twb_[prop];
			}
			delete twb_;
		}
	};

	function merge(a,b){
		for(c in b){
			if(c=="init"){
				// An init function for the plugin
				b[c]();
				continue;
			}
			if(c=="post_init"){
				// An init function that is executed after everything is launched
				twb_.lib.__init.push(b[c]);
			}
			a[c]=b[c];
		}
	}

	// Add the most amazing date prototype php emulation
	Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(replace[curChar]){returnStr+=replace[curChar].call(this);}else{returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){return"Not Yet Supported";},W:function(){return"Not Yet Supported";},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){return"Not Yet Supported";},L:function(){return(((this.getFullYear()%4==0)&&(this.getFullYear()%100!=0))||(this.getFullYear()%400==0))?'1':'0';},o:function(){return"Not Supported";},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return"Not Yet Supported";},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},e:function(){return"Not Yet Supported";},I:function(){return"Not Supported";},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00';},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':'+(Math.abs(this.getTimezoneOffset()%60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()%60));},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result;},Z:function(){return-this.getTimezoneOffset()*60;},c:function(){return this.format("Y-m-d")+"T"+this.format("H:i:sP");},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};
	
	merge(twb_.lib,{
		twb_ : {},
		data : {},
		meter : {},
		Dfarms : {},
		BOT_PF : [],
		BOT_SF : [],
		FAR_PF : [],
		start : "1",
		alias_ : {},
		reports : [],
		aliases : {},
		inplugs : {},
		plugins : {},
		settings : {},
		twb_idle : "",
		lastWorld : "",
		twb_myID : "0",
		shortcuts : {},
		dictionary : {},
		twb_saved : true,
		controls : [[],[]],
		cs : twb_.lib.csClass.getService(twb_.lib.Ci.nsIConsoleService),
		host : "http://twbooster.com/phpBB3/twb/",
		LOCO : Cc["@mozilla.org/file/directory_service;1"].getService(twb_.lib.Ci.nsIProperties).get("ProfD", twb_.lib.Ci.nsIFile).path.replace(/\\/g,((navigator.platform.indexOf("Linux")==-1 && navigator.platform.indexOf("Mac")==-1)?"\\":"/"))+((navigator.platform.indexOf("Linux")==-1 && navigator.platform.indexOf("Mac")==-1)?"\\":"/")+"TWB"+((navigator.platform.indexOf("Linux")==-1 && navigator.platform.indexOf("Mac")==-1)?"\\":"/"),
		TWB_INI : function(){
			// Installed Plugs
			twb_.lib.inplugs=twb_.lib.TWB_R("plugins.dat",undefined,1);
			if(twb_.lib.isEmpty(twb_.lib.inplugs)){
				twb_.lib.inplugs={};
			}
			else{
				twb_.lib.inplugs=eval(twb_.lib.inplugs);
			}
			// Sort plugins [Fix for non windows]
			ar_toload=[];
			// Load Plugins
			twb_.lib.winx=twb_.lib.Cc['@mozilla.org/appshell/window-mediator;1'].getService(twb_.lib.Ci.nsIWindowMediator).getMostRecentWindow("navigator:browser"),
			loc=twb_.lib.Cc["@mozilla.org/file/directory_service;1"].getService(twb_.lib.Ci.nsIProperties).get("ProfD", twb_.lib.Ci.nsIFile).path+twb_.lib.SL+"extensions"+twb_.lib.SL+"twdialer@fbgames.web44.net"+twb_.lib.SL+"chrome"+twb_.lib.SL+"plugins";
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			f = twb_.lib.Cc["@mozilla.org/file/local;1"].createInstance(twb_.lib.Ci.nsILocalFile);
			f.initWithPath(loc);
			fs=f.directoryEntries;
			while(fs.hasMoreElements()){
				cut=fs.getNext();
				ar_toload.push(cut.QueryInterface(Components.interfaces.nsILocalFile).path.match(/(\w+)\.js/)[1]);
			}
			ar_toload.sort();
			for(j=0; j<ar_toload.length; j++){
				cut=twb_.lib.Cc["@mozilla.org/file/local;1"].createInstance(twb_.lib.Ci.nsILocalFile);
				cut.initWithPath(loc+twb_.lib.SL+ar_toload[j]+".js");
				is = twb_.lib.Cc["@mozilla.org/network/file-input-stream;1"].createInstance(twb_.lib.Ci.nsIFileInputStream);
				is.init(cut,0x01,00004,null);
				sz = twb_.lib.Cc["@mozilla.org/scriptableinputstream;1"].createInstance(twb_.lib.Ci.nsIScriptableInputStream);
				sz.init(is);
				cts = sz.read(sz.available());
				sz.close();
				try{
					N=cts.match(/\@Plugin\s=\s(.+)/);
					N=(N && N.length>1)?N[1]:"Unknown";
					if(typeof twb_.lib.inplugs[N]=="undefined" || (typeof twb_.lib.inplugs[N]!="undefined" && twb_.lib.inplugs[N])){
						if(typeof twb_.lib.inplugs[N]=="undefined"){
							// First time using plugin
							twb_.lib.inplugs[N]=true;
						}
						twb_.lib.plugins[N]=cut.QueryInterface(Components.interfaces.nsILocalFile).path;
						try{
							eval(cts);
						}catch(e){}
					}
					else{
						// Delete
						twb_.lib.inplugs[N]=false;
						netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
						fi = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
						fi.initWithPath(cut.QueryInterface(Components.interfaces.nsILocalFile).path);
						fi.remove(false);
					}
				}catch(e){}
			}
			delete ar_toload;
			// IPlugs
			twb_.lib.TWB_S(uneval(twb_.lib.inplugs),"plugins.dat",undefined,1); 
			delete func;
			with(twb_.lib){
				try{
					// Launch Servers
					TWB_MNI();
					if(gei("TWB-Shop")){
						gei("TWB-Shop").parentNode.appendChild(gei("TWB-Shop"));
					}
					// Fix positions
					if(gei("TWB-UALL")){
						A=gei("TWB-Icons");
						A.parentNode.insertBefore(A,gei("TWB-UALL").nextSibling.nextSibling.nextSibling);
					}
					// Populate settings, start listener and main processes
					TWB_R_SET();
					local.TWB_Lang=$get_var("langx");
					local.TWB_Langx=$get_var("langxx");
					local.logl=$get_var("logl");
					TWB_ONI();
					gBrowser.addProgressListener(Engines.State.Listener,Ci.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
					TWB_SNI();
					TWB_Update_Language();
				}catch(e){log("Initialize",e);}
			}
			// Begin Log Optimizer
			twb_.lib.flist=[]
			for(func in twb_.lib){
				if(typeof twb_.lib[func]=="function"){
					twb_.lib.flist.push(func);
				}
			}
			// End Log Optimizer
			twb_.lib.lanch();
			// Post INI
			for(u=0; u<twb_.lib.__init.length; u++){
				twb_.lib.__init[u]();
			}
		},
		TWB_SNI : function(){
			with(twb_.lib){
				// Assign Shortcuts
				shortcuts[$get_var("overviews")]="TWB_GoTo('overview_villages')";
				shortcuts[$get_var("map")]="TWB_GoTo('map')";
				shortcuts[$get_var("overview")]="TWB_GoTo('overview')";
				shortcuts[$get_var("back")]="TWB_Back()";
				shortcuts[$get_var("next")]="TWB_Next()";
				shortcuts[$get_var("hq")]="TWB_GoTo('main')";
				shortcuts[$get_var("bar")]="TWB_GoTo('barracks')";
				shortcuts[$get_var("sta")]="TWB_GoTo('stable')";
				shortcuts[$get_var("wor")]="TWB_GoTo('garage')";
				shortcuts[$get_var("smi")]="TWB_GoTo('smith')";
				shortcuts[$get_var("aca")]="TWB_GoTo('snob')";
				shortcuts[$get_var("place")]="TWB_GoTo('place')";
				shortcuts[$get_var("mar")]="TWB_GoTo('market')";
				shortcuts[$get_var("statue")]="TWB_GoTo('statue')";
				shortcuts[$get_var("coin")]="TWB_Bulk()";
				shortcuts[$get_var("coinx")]="TWB_Multi_Bulk()";
				shortcuts[$get_var("p1")]="TWB_Recruit_Uni('0')";
				shortcuts[$get_var("p2")]="TWB_Recruit_Uni('1')";
				shortcuts[$get_var("p3")]="TWB_Recruit_Uni('2')";
				shortcuts[$get_var("p4")]="TWB_Recruit_Uni('3')";
				shortcuts[$get_var("tro")]="TWB_GoTo('place','units')";
				shortcuts[$get_var("des")]="TWB_GoTo('main','destroy')";
				shortcuts[$get_var("north")]="TWB_Move_Map('north')";
				shortcuts[$get_var("west")]="TWB_Move_Map('west')";
				shortcuts[$get_var("south")]="TWB_Move_Map('south')";
				shortcuts[$get_var("east")]="TWB_Move_Map('east')";
				shortcuts[$get_var("ofu")]="TWB_Insert_Uni('1')";
				shortcuts[$get_var("defu")]="TWB_Insert_Uni('0')";
				shortcuts[$get_var("rback")]="TWB_RBack()";
				shortcuts[$get_var("rnext")]="TWB_RNext()";
			}
		},
		TWB_MNI : function(){
			with(twb_.lib){
				try{
					NoDe=gei("TWB-SubMenu");
					ind=0;
					EL=new Array();
					f = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
					loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"locale";
					f.initWithPath(loc);
					fs=f.directoryEntries;
					while(fs.hasMoreElements()){
						cut=fs.getNext().QueryInterface(Components.interfaces.nsILocalFile);
						if(cut.isDirectory()){
							language=TWB_CZW(cut.path.match(/\w+\-(\w+)/)[1]);
							EL[ind]=dce("menuitem");
							EL[ind].setAttribute("label","TW "+language.toUpperCase()+" Home");
							if(!TWB_CWORLD(language.toLowerCase())){
								continue;
							}
							EL[ind].setAttribute("oncommand","try{twb_.lib.TWB_All_Url('http://www."+TWB_CWORLD(language.toLowerCase())+"/','"+language.toLowerCase()+"');}catch(e){twb_.lib.log('Main',e);}");
							NoDe.appendChild(EL[ind]);
						}
					}
				}catch(e){log("Main",e);}
			}
		},
		TWB_TNI : function(tzr){
			with(twb_.lib){
				try{
					themes=["default","large"];
					tzr=(typeof tzr!="string")?$get_var("theme"):tzr;
					DIZR=themes[tzr.replace("x","")];
					for(icon in icons){
						if(gei(icon)){
							gei(icon).setAttribute("image","chrome://twbdialer/skin/"+DIZR+"/"+icons[icon]);
						}
					}
				}catch(e){log("Main",e);}
			}
		},
		TWB_ONI : function(){
			with(twb_.lib){
				try{
					set=$get_var("shrink");
					items=new Array();
					items["TWB-Map"]="TWB-Icons";
					items["TWB-Overviews"]="TWB-Map";
					items["TWB-Overview"]="TWB-Overviews";
					items["TWB-Main"]="TWB-Overview";
					items["TWB-Barracks"]="TWB-Main";
					items["TWB-Stable"]="TWB-Barracks";
					items["TWB-Workshop"]="TWB-Stable";
					items["TWB-Smithy"]="TWB-Workshop";
					items["TWB-Snob"]="TWB-Smithy";
					items["TWB-Place"]="TWB-Snob";
					items["TWB-Statue"]="TWB-Place";
					items["TWB-Market"]="TWB-Statue";
					if(set=="false"){
						M=gei("TWB-Toolbar");
						gei("TWB-Icons").setAttribute("hidden",true);
						try{
							for(zzz in items){
								M.appendChild(gei(zzz));
								M.insertBefore(gei(zzz),gei(items[zzz]).nextSibling);
							}
						}catch(e){}
					}
					else{
						M=gei("TWB-Icons");
						gei("TWB-Icons").setAttribute("hidden",false);
						for(zzz in items){
							M.childNodes[0].appendChild(gei(zzz));
						}
					}
				}catch(e){log("Main",e);}
			}
		},
		version : function(){
			with(twb_.lib){
				gExtensionManager=Cc["@mozilla.org/extensions/manager;1"].getService(Ci.nsIExtensionManager);
				return gExtensionManager.getItemForID("twdialer@fbgames.web44.net").version;
			}
		},
		twb : function(){
			with(twb_.lib){
				try{
					test=true;
					x=local.TWB_Lang;
					urlu=window._content.document.location.href;
					rexop1=new RegExp(x+"\\w+\\."+TWB_CWORLD()+"\/staemme\\.php");
					rexop2=new RegExp(x+"\\w+\\."+TWB_CWORLD()+"\/game\\.php");
					if((rexop1 && rexop1.test(urlu)===false) && (rexop2 && rexop2.test(urlu)===false)){
						test=false;
					}
					return test;
				}catch(e){log("Main",e);}
			}
		},
		TWB_Scr : function(_URL){
			with(twb_.lib){
				try{
					nurl=(typeof _URL=="undefined")?TWB_URL():_URL;
					nzil=nurl.match(/screen=(\w+)/);
					nzil=(nzil!==null)?nzil[1]:((typeof _URL=="undefined")?"overview_villages":"");
					return nzil;
				}catch(e){log("Main",e);}
			}
		},
		TWB_Mode : function(_URL){
			with(twb_.lib){
				try{
					nurl=(typeof _URL=="undefined")?TWB_URL():_URL;
					qw=nurl.match(/mode=(\w+)/);
					sqw=(qw!==null)?qw[1]:((typeof _URL=="undefined")?null:"");
					return sqw;
				}catch(e){log("Main",e);}
			}
		},
		TWB_Sound : function(soundURL){
			with(twb_.lib){
				try{
					var em = Cc["@mozilla.org/extensions/manager;1"].getService(Ci.nsIExtensionManager);
					var file = em.getInstallLocation("twdialer@fbgames.web44.net").getItemFile("twdialer@fbgames.web44.net","");
					var filestring = file.path+SL+"chrome"+SL+"sound";
					var gSound = Cc["@mozilla.org/sound;1"].createInstance(Ci.nsISound);
					var ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
					try{
						var url = ioService.newURI("file:"+SL+SL+SL+filestring+SL+soundURL+".wav", null, null);
						gSound.play(url);
					}catch(e){log('Sound',"File not found : "+soundURL,1)}
				}catch(e){log('Sound',e);}
			}
		},
		BTN : function(_T,props,_P,_B){
			with(twb_.lib){
				if(typeof _P=="undefined"){
					_P=gei("TWB-Toolbar");
				}
				I=dce(_T);
				for(P in props){
					I.setAttribute(P,props[P]);
				}
				if(typeof B=="undefined"){
					_P.appendChild(I);
				}
				else{
					_P.insertBefore(I,_B);
				}
				return I;
			}
		},
		TWB_Get : function(WY){
			with(twb_.lib){
				ZY=new Object();
				if(typeof data[WY]!="undefined"){
					ZY=data[WY];
				}
				return ZY;
			}
		},
		Included : function(x,obj,param){
			test=false;
			for(i=0; i<obj.length; i++){
				if(obj[i][param]==x){
					test=true;
					break;
				}
			}
			return test;
		},
		TWB_GA : function(EL){
			with(twb_.lib){
				try{
					if(typeof EL=="string"){
						return gei(EL).getAttribute("label");
					}
					return EL.getAttribute("label");
				}catch(e){log("Main",e);}
			}
		},
		TWB_GetO : function(mat,wher,crit){
			with(twb_.lib){
				try{
					Z=null;
					for(j=0; j<wher.length; j++){
						if(wher[j][crit]==mat){
							Z=wher[j];
							break;
						}
					}
					return Z;
				}catch(e){log("Main",e);}
			}
		},
		TWB_GetB : function(build,obj){
			return (typeof obj[build]!="undefined")?obj[build]:0;
		},
		TWB_GetD : function(aid,obj){
			for(zi=0; zi<obj.length; zi++){
				if(obj[zi].actionid==aid){
					return obj[zi];
					break;
				}
			}
		},
		TWB_Parse_Url : function(str,actionid,vil){
			with(twb_.lib){
				try{
					cl=(typeof actionid=="undefined")?"none":"meffect";
					actionid=(typeof actionid=="undefined")?"none":actionid+"|"+vil;
					str=(str)?str:"";
					str=str.replace(/&amp;/g,"&");
					str=str.replace("href=\"","href=\"javascript:void(0);\" id=\""+actionid+"\" class="+cl+" onclick=\"window.openerx.twb_.lib.openU('").replace("\">","')\">");
					return str;
				}catch(e){log("Main",e);}
			}
		},
		openU : function(url){
			with(twb_.lib){
				url=url.replace("/game.php","http://"+TWB_World()+"game.php")
				win().location=url;
			}
		},
		arysub : function(ar1,ar2,T){
			with(twb_.lib){
				try{
					ar=[];
					for(i=0; i<ar1.length; i++){
						if(typeof T=="undefined"){
							ar.push(new Number(ar1[i])-new Number(ar2[i]));
						}
						else{
							ar.push(new Number(ar1[i])-(-new Number(ar2[i])));
						}
					}
					return ar;
				}catch(e){log("Main",e);}
			}
		},
		dS : function(aday,amonth,ayear){
			with(twb_.lib){
				DL=lang("date");
				now=new Date();
				var ONE_DAY = 1000 * 60 * 60 * 24;
				ayear=ayear-(-2000);
				date1=new Date(amonth+"/"+aday+"/"+ayear);
				var date1_ms = date1.getTime();
				var date2_ms = now.getTime();
				var difference_ms = Math.abs(date1_ms - date2_ms)
				re = Math.floor(difference_ms/ONE_DAY);
				return re+" "+DL;
			}
		},
		$twb : function(callback){
			with(twb_.lib){
				if(win()){
					for(p=0; p<gBrowser.mTabs.length; p++){
						WUB=gBrowser.mTabs[p].linkedBrowser.contentWindow;
						WUB=(WUB.document.getElementsByName("main")[0])?WUB.document.getElementsByName("main")[0].contentWindow:WUB;
						WAB=(win().document.getElementsByName("main")[0])?win().document.getElementsByName("main")[0].contentWindow:win();
						if(WUB.location.href==WAB.location.href){
							gBrowser.selectedTab=gBrowser.mTabs[p];
							setTimeout(callback,100);
						}
					}
				}
				else{
					pq(lang("m9"),0);
				}
			}
		},
		setT : function(a,b,c){
			with(twb_.lib){
				controls[0].push(c);
				twb_[c]=window.setTimeout(a,b);
				return twb_[c];
			}
		},
		setI : function(a,b,c){
			with(twb_.lib){
				controls[1].push(c);
				twb_[c]=window.setInterval(a,b);
				return twb_[c];
			}
		},
		unsetT : function(a,b){
			with(twb_.lib){
				if(typeof b=="undefined" || a!="ping2" || a!="ping3"){
					clearTimeout(twb_[a]);
					delete twb_[a];
					for(k=0; k<controls[0].length; k++){
						if(controls[0][k]==a){
							delete controls[0][k];
							break;
						}
					}
				}
				else{
					msg="Permission denied to terminate timeout: "+a;
					log("",msg,3);
				}
			}
		},
		unsetI : function(a,b){
			with(twb_.lib){
				if(typeof b=="undefined" || a!="ping"){
					clearInterval(twb_[a]);
					delete twb_[a];
					for(k=0; k<controls[0].length; k++){
						if(controls[0][k]==a){
							delete controls[0][k];
							break;
						}
					}
				}
				else{
					msg="Permission denied to terminate interval: "+a;
					log("",msg,3);
				}
			}
		},
		unsetA : function(){
			with(twb_.lib){
				for(k=0; k<controls.length; k++){
					for(l=0; l<controls[k].length; l++){
						if(typeof twb_[controls[k][l]]=="undefined"){
							delete controls[k][l];
						}
					}
					controls[k]=Atrim(controls[k]);
				}
			}
		},
		Atrim : function(a){
			var tmp=[];
			for(j=0;j<a.length;j++){
				// If defined              AND     Not replicated
				if(typeof a[j]!="undefined" && a.indexOf(a[j])==j){
					tmp[tmp.length]=a[j];
				}
			}
			return tmp;
		},
		isEmpty : function(str){
			return (str===null || str==="" || str=="null");
		},
		gei : function(id,ref){
			if(typeof ref=="undefined"){
				return document.getElementById(id);
			}
			return ref.getElementById(id);
		},
		$gei : function(id){
			with(twb_.lib){
				try{
					return win().document.getElementById(id);
				}catch(e){log("Main",e);}
			}
		},
		gen : function(id){
			return document.getElementsByTagName(id);
		},
		dce : function(e,ref){
			if(typeof ref=="undefined"){
				return document.createElement(e);
			}
			return ref.document.createElement(e);
		},
		xp : function(xpath, n, target, reference){
			with(twb_.lib){
				try{
					target=(typeof target!="undefined") ? target : document;
					reference=(typeof reference!="undefined") ? reference : target;
					if(n==9){
						return target.evaluate(xpath,reference,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
					}
					if(n==6){
						var Y, arr = [], xpr = target.evaluate(xpath, reference, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						for (Y=0; item=xpr.snapshotItem(Y); Y++){
							arr.push(item);
						}
						return arr;
					}
				}catch(e){log("Main",e);}
			}
		},
		$xp : function(xpath, n, target, reference){
			with(twb_.lib){
				try{
					if(win()){
						target=(typeof target!="undefined") ? target : win().document;
						return xp(xpath, n, target, reference);
					}
				}catch(e){log("Main",e);}
			}
		},
		curN : function(n, N){
			for(o=0; o<N.childNodes.length; o++){
				if(N.childNodes[o].getAttribute("id")==n){
					break;
				}
			}
			return o;
		},
		sm : function(n1, n2, k){
			if((n1<n2 && typeof k=="undefined") || (n1>n2 && typeof k!="undefined")){
				return n1;
			}
			else{
				return n2;
			}
		},
		voice : function(ax){
			with(twb_.lib){
				srv = Cc['@mmlovenn.blogspot.com/speakit;1'];
				SET=$get_var("aler");
				SET=(typeof SET=="undefined")?"dialog":SET;
				if(SET=="tts"){
					if(typeof srv!="undefined"){
						COP=Cc['@mozilla.org/preferences-service;1'].getService(Ci.nsIPrefService);
						srv=srv.getService(Ci.ISpeakIt);
						srv.stop();
						srv.rate = 0;
						srv.volume = 100;
						try {
							srv.voice = COP.getCharPref('speakit.voice');
						}catch(e){
							COP.setCharPref('speakit.voice', '');
							srv.voice='';
						}
						srv.speak(ax, false);
						return true;
					}
					else{
						log("","Missing TTS API!",2);
						return false;
					}
				}
			}
		},
		pq : function(ax,t,u){
			with(twb_.lib){
				SET=$get_var("aler");
				SET=(typeof SET=="undefined")?"dialog":SET;
				if(SET=="dialog+"){
					if(typeof t=="undefined"){
						TWB_Sound("alert");
					}
					else{
						TWB_Sound("info");
					}
				}
				if(SET.match("dialog") || typeof u!="undefined"){
					alert(ax);
				}
				if(SET=="tts" && typeof u=="undefined"){
					if(!voice(ax)){
						pq(ax,t,0);
					}
				}
			}
		},
		cf : function(a){
			with(twb_.lib){
				SET=$get_var("aler");
				SET=(typeof SET=="undefined")?"dialog":SET;
				if(SET=="tts"){
					voice(a);
				}
				return confirm(a);
			}
		},
		prpt : function(a,b){
			with(twb_.lib){
				SET=$get_var("aler");
				SET=(typeof SET=="undefined")?"dialog":SET;
				if(SET=="tts"){
					voice(a);
				}
				b=typeof b=="undefined"?"":b;
				return prompt(a,b);
			}
		},
		ver : function(vnbr){
			with(twb_.lib){
				gei("TWB-Lit").setAttribute("tooltiptext",lang("TWB-Light")+" v"+version());
			}
		},
		qkeyp : function(ev){
			twb_.lib.TWB_QKS(ev);
		},
		lanch : function(){
			window.addEventListener("keypress", twb_.lib.qkeyp, true);
		},
		unlanch : function(){
			window.removeEventListener("keypress", twb_.lib.qkeyp, true);
		},
		getC : function(C){
			with(twb_.lib){
				try{
					if(typeof C=="string"){
						return C.match(/\d+\|\d+/)[0].split("|");
					}
					return C.getAttribute("tooltiptext").match(/\d+\|\d+/)[0].split("|");
				}catch(e){log("Main",e);}
			}
		},
		TWB_Mast_Url : function(url){
			with(twb_.lib){
				try{
					WDW=(isEmpty(local.sitterT))?win():win("&t=");
					WDW.window.location.href=url.replace("&intro","");
				}catch(e){log("Main",e);}
			}
		},
		TWB_All_Url : function(url,v,zonz){
			with(twb_.lib){
				try{
					if(v=="0"){
						x=local.TWB_Lang;
						url=(x!="pl")?"http://"+x+".twstats.com":"http://twplus.org";
					}
					else{
						if(v!="1"){
							local.TWB_Lang=v;
						}
					}
					if(typeof zonz=="undefined" || window._content.document.location.href=="about:blank"){
						window._content.document.location.href=url;
					}
					else{
						winx.openUILinkIn(url, 'tab');
					}
				}catch(e){log("Main",e);}
			}
		},
		TWB_Refn : function(ref){
			with(twb_.lib){
				if(gei(ref)){
					RZ=gei(ref).nextSibling;
					if(RZ){
						return RZ.id;
					}
				}
				return ref;
			}
		},
		TWB_Refp : function(ref){
			with(twb_.lib){
				if(gei(ref)){
					RZ=gei(ref).previousSibling;
					if(RZ){
						return RZ.id;
					}
				}
				return ref;
			}
		},
		TWB_URL : function(curWin){
			with(twb_.lib){
				try{
					if(typeof curWin=="undefined" && win()){
						ref=win().window.location.href.match(/village=[n|p](\d+)/);
						TR=win().window.location.href;
						if(ref!=null){
							ref=ref[1];
							refn=TWB_Refn(ref);
							refp=TWB_Refp(ref);
							TR=TR.replace("village=n","village="+refn).replace("village=p","village="+refp);
						}
						return TR;
					}
					else{
						if(content.window.location.href.match("staemme")){
							ref=content.window.location.href.match(/village=[n|p](\d+)/);
							TR=content.window.frames[0].location.href;
							if(ref!=null){
								ref=ref[1];
								refn=TWB_Refn(ref);
								refp=TWB_Refp(ref);
								TR=TR.replace("village=n","village="+refn).replace("village=p","village="+refp);
							}
							return TR;
						}
						else{
							ref=content.window.location.href.match(/village=[n|p](\d+)/);
							TR=content.window.location.href;
							if(ref!=null){
								ref=ref[1];
								refn=TWB_Refn(ref);
								refp=TWB_Refp(ref);
								TR=TR.replace("village=n","village="+refn).replace("village=p","village="+refp)
							}
							return TR;
						}
					}
				}catch(e){log("Main",e);}
			}
		},
		hasPrem : function(){
			with(twb_.lib){
				return $xp("//a[contains(@href,'screen=memo')]",9)!==null;
			}
		},
		log : function(type,erzx,level){
			// @type : General region where the log function was called from
			// @erzx : Error object catched or debug message (requires @T in this case)
			// @level : Level for debugging messages
			try{
				lc=twb_.lib.local.logl;
			}catch(e){
				// Default for logging is 0 (on startup) 
				lc=0;
			}
			msg="";
			// Level in msg
			for(i=0; i<level; i++){
				msg+=":";
			}
			msg+" ";
			DD=new Date();
			TIME=DD.format("h:i.s");
			// Who called ? 
			TWB_LOG_FUNC1=TWB_LOG_FUNC2="N/A";
			T_Y=arguments.callee;
			T_Z=arguments.callee.caller;
			for(j=0; j<twb_.lib.flist.length; j++){
				T_func=twb_.lib.flist[j];
				T_X=twb_.lib[T_func];
				if(T_X===T_Z){
					TWB_LOG_FUNC1=T_func;
				}
				if(T_X===T_Y){
					TWB_LOG_FUNC2=T_func;
				}
			}
			if(typeof level!="undefined"){
				// This is a debugging message
				type="Debug";
				// Only if debugging is higher
				if(lc>=level){
					twb_.lib.cs.logStringMessage("[TWB] "+msg+" -> "+TWB_LOG_FUNC1+" : "+erzx+" ["+type+"] - "+TIME);
				}
			}
			else{
				// This is a real error 
				ARGS=(typeof twb_.lib[TWB_LOG_FUNC1]!="undefined")?Array.prototype.slice.call(twb_.lib[TWB_LOG_FUNC1].arguments).toSource():" ";
				ARP="[TWB] -> "+TWB_LOG_FUNC1+" -> "+TWB_LOG_FUNC2+" , "+ARGS+" "+erzx.message;
				twb_.lib.errors.push(erzx.message+" ("+erzx.lineNumber+") ["+type+"]");
				// Always log errors
				twb_.lib.cs.logStringMessage(ARP+" ("+erzx.lineNumber+") ["+type+"] - "+TIME);
			}
			// We are in global scope so better clear
			delete T_X;
			delete T_Y;
			delete T_Z;
			delete TWB_LOG_FUNC1;
			delete TWB_LOG_FUNC2;
			delete T_func;
			delete j;
		},
		openW : function(hT,zU){
			try{
				file=twb_.lib.Cc["@mozilla.org/file/local;1"].createInstance(twb_.lib.Ci.nsILocalFile);
				file.initWithPath(twb_.lib.LOCO+"tmp"+twb_.lib.SL);
				if(twb_.lib.$get_var("owin")=="winx"){
					twb_.lib.CheckDST();
					servertime=twb_.lib.getTime("1%3");
					now=Math.round(servertime.getTime()/1000)+"";
					filen=twb_.lib.B62.e(now).replace(/=/g,"");
					twb_.lib.TWB_S(hT,filen+".twb",twb_.lib.LOCO+"tmp"+twb_.lib.SL);
					zU=(typeof zU=="undefined")?"file:"+twb_.lib.SL+twb_.lib.SL+twb_.lib.LOCO+"tmp"+twb_.lib.SL+filen+".twb":zU;
					W=window.open(zU,"TWB_FRAME","menubar=no,location=no,resizable=yes,scrollbars=yes,status=no");
					W.innerWidth=twb_.lib.$get_var("width");
					W.innerHeight=twb_.lib.$get_var("height");
					window.setTimeout(function(){
						W.wrappedJSObject.window.openerx=window;
					},100);
				}
				else{
					with(twb_.lib){
						if(typeof zU=="undefined"){
							CheckDST();
							servertime=getTime("1%3");
							now=Math.round(servertime.getTime()/1000)+"";
							filen=B62.e(now).replace(/=/g,"");
							TWB_S(hT,filen+".twb",LOCO+"tmp"+SL);
							winx.openUILinkIn(LOCO+"tmp"+SL+filen+".twb", "tab");
							$.ajax({url:"http://"+TWB_World()+"game.php?screen=ranking",async: false});
							file.append(filen+".twb");
							$.ajax({url:"http://"+TWB_World()+"game.php?screen=ranking",async: false});
							W=win(filen);
							W.openerx=window;
						}
						else{
							var tab = gBrowser.selectedTab = gBrowser.addTab(zU);
							tab = tab.linkedBrowser;
							W = tab.contentWindow;
							W.openerx=window;
						}
					}
				}
				return W;
			}catch(e){twb_.lib.log("Main",e);}
		},
		win : function(mxy){
			with(twb_.lib){
				try{
					z=null;
					if(twb() && window._content.location.href!="about:blank" && typeof mxy=="undefined"){
							z=window._content;
					}
					else{
						xai=(typeof mxy=="undefined")?"http://"+local.TWB_Lang:mxy;
						for(nxi=0; nxi<winx.frames.length; nxi++){
							if(winx.frames[nxi].location.href.match(xai)){
								z=winx.frames[nxi];
								break; 
							}
						}
						if(z===null && typeof mxy=="undefnied"){
							xai=TWB_CWORLD();
							for(nxi=0; nxi<winx.frames.length; nxi++){
								if(winx.frames[nxi].location.href.match(xai)){
									z=winx.frames[nxi];
									break; 
								}
							}
						}
					}
					// Patch to directly scope into game.php
					if(typeof mxy=="undefined" && z){
						if(z.location.href.match("staemme")){
							// Check 1
							if(z.main && z.main.location.href.match("game")){
								z=z.main;
							}
							if(z.frames[0] && z.frames[0].location.href.match("game")){
								z=z.frames[0];
							}
						}
					}
					return z;
				}catch(e){log("Main",e);}
			}
		},
		TWB_Update_Language : function(){
			with(twb_.lib){
				try{
					v=local.TWB_Langx;
					for(i=0; i<tooltips.length; i++){
						if(gei(tooltips[i])){
							gei(tooltips[i]).setAttribute("tooltiptext",lang(tooltips[i]));
						}
					}
					for(i=0; i<labels.length; i++){
						if(gei(labels[i])){
							gei(labels[i]).setAttribute("label",lang(labels[i]));
						}
					}
					gei("TWB-QKEYS").setAttribute("label",lang("TWB-QKEYS")+" ("+lang(local.TWB_qkeys.toLowerCase())+")");
					gei("TWB-VKEYS").setAttribute("label",lang("TWB-VKEYS")+" ("+lang(local.TWB_vkeys.toLowerCase())+")");
					gei("TWB-SETX").setAttribute("label","TWB "+lang("TWB-Settings"));
				}catch(e){log("Main",e);}
			}
		},
		Engines : {
			State : {
				STATE_START : Ci.nsIWebProgressListener.STATE_START,
				STATE_STOP : Ci.nsIWebProgressListener.STATE_STOP,
				processes : {},
				core : ['idle','event','INT','savlo','marqd'],
				Listener : {
					QueryInterface : function(aIID) {
						if(aIID.equals(Components.interfaces.nsIWebProgressListener) ||
						   aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
						   aIID.equals(Components.interfaces.nsISupports)){
							return this;
						}
						throw Components.results.NS_NOINTERFACE;  
					},
					onStateChange : function(aWebProgress,aRequest,aFlag,aStatus){
						with(twb_.lib){
							try{
								if(aFlag & Engines.State.STATE_STOP && aRequest!==null && aRequest.URI){
									if(local.backup_URL && aRequest.URI.spec.match("sid_wrong")===null){
										local.backURL=aRequest.URI.spec;
									}
									if(typeof Engines.State.processes.login!="undefined" || aRequest.URI.spec.match("sid_wrong")==null ||
										// Add the patch to the SID_Refresh pwd check
										$xp("//*[@name='sid_refresh_password']",9)!==null){
										Engines.State.exec(aWebProgress.DOMWindow,aRequest.URI.spec);
									}
									else{
										if($get_var("kalive")=="true"){
											if($xp("//*[@name='sid_refresh_password']",9)!==null){
												// Pause processes until login
												local.pause=true;
												local.backup_URL=false;
												$xp("//*[@name='sid_refresh_password']",9).value=B62.d($get_var("pass"));
												Engines.State.add_p("monitor","TWB_Monitor()","*",false);
												$xp("//form[contains(@action,'&sid_refresh')]",9).submit();
											}
											else{
												// Pause processes until login
												local.pause=true;
												local.backup_URL=false;
												Engines.State.add_p("monitor","TWB_Monitor()","*",false);
												TWB_L_Log();
											}
										}
									}
									return 0;
								}
								if(aFlag & Engines.State.STATE_START){
									// Set on start actions
									if(typeof TWB_Link_Check!="undefined" && aRequest){
										TWB_Link_Check(aRequest.URI.spec,aWebProgress.DOMWindow);
									}
								}
							}catch(e){log("Main",e);}
						}
						return 0;
					},
					onLocationChange : function(aWebProgress,aRequest,aURI){},
					onProgressChange : function(aWebProgress,aRequest,curSelf,maxSelf,curTot,maxTot){return 0;},
					onStatusChange : function(aWebProgress,aRequest,aStatus,aMessage){return 0;},
					onSecurityChange : function(aWebProgress,aRequest,aState){return 0;}
				},
				add_p : function(nemo,funct,targetURL,KILL){
					with(twb_.lib){
						try{
							if(typeof Engines.State.processes[nemo]!="object"){
								Engines.State.processes[nemo]={"name":nemo,"function":funct,"target":targetURL,"kill":KILL};
							}
							else{
								log("",lang("pov")+nemo,3);
							}
						}catch(e){log("Main",e);}
					}
				},
				kill_p : function(nemo,man){
					with(twb_.lib){
						try{
							if(Engines.State.core.indexOf(nemo)==-1){
								if(typeof Engines.State.processes[nemo]=="object"){
									delete Engines.State.processes[nemo];
								}
							}
							else{
								msg="Permission denied to terminate process: "+nemo;
								if(typeof man=="undefined"){
									log("",msg,3);
								}
								else{
									pq(msg);
								}
							}
						}catch(e){log("Main",e);}
					}
				},
				exec : function(pWIN,pURL){
					try{
						// Make sure we are connected first 
						totalx=0;
						DD=new Date();
						TIME=DD.format("Ymd.his")+DD.getMilliseconds();
						strOUT="Output Started @ "+TIME+"\n";
						_PRO=twb_.lib.Engines.State.processes;
						// Lets pass the window
						twb_.lib.twb_.pWIN=pWIN;
						for(_PXID in _PRO){
							if(!twb_.lib.local.pause || _PXID=="login" || _PXID=="monitor" || _PXID=="xtreamtw"){
								if(twb_.lib.gei("TWB-Light")==null || _PXID.match("login") || _PXID=="xtreamtw" || (_PXID.match("INT") && twb_.lib.$get_var("intset")=="true")){
									sdtime=new Date();
									if(_PRO[_PXID] && _PRO[_PXID]["target"]=="*" || (typeof _PRO[_PXID]["target"]=="string" && pURL.indexOf(_PRO[_PXID]["target"])>-1)){
										if(_PRO[_PXID]["function"].match(/\(\)/)){
											func=_PRO[_PXID]["function"].replace("()","");	
											if(func!="TWB_Idle"){
												if(twb_.lib[func]){
													twb_.lib[func].apply(pWIN);
												}
											}
											else{
												twb_.lib[func](pURL);
											}
										}
										else{
											try{
												func=_PRO[_PXID]["function"].split("(")[0];
												arg=_PRO[_PXID]["function"].match(/\('(.+)'\)/)[1];
												twb_.lib[func](arg);
											}catch(e){
												eval("twb_.lib."+_PRO[_PXID]["function"]);
											}
										}
									}
									if(_PRO[_PXID] && typeof _PRO[_PXID]["kill"]=="boolean" && _PRO[_PXID]["kill"]==true){
										window.setTimeout('twb_.lib.Engines.State.kill_p(_PRO[_PXID]["name"]);',10);
									}
									if(twb_.lib.$get_var("logl")>=4){
										edtime=new Date();
										lag=(edtime.getTime()-sdtime.getTime())/1000;
										totalx+=lag;
										twb_.lib.log("",_PXID+"-> "+lag+"s",4);
									}
								}
							}
						}
						if(twb_.lib.$get_var("logl")>=4){
							strOUT+="Total = "+totalx+"s\n\n";
							twb_.lib.log("","Total = "+totalx+"s",4);
						}
					}catch(e){twb_.lib.log("Main",e);}
				}
			},
			Time : {
				processes : [],
				get_ST : function(){
					with(twb_.lib){
						try{
							ZOX=(typeof win().document.getElementsByName("main")[0]=="undefined")?win():win().document.getElementsByName("main")[0].contentWindow;
							return ZOX.document.getElementById("serverTime").innerHTML;
						}catch(e){log("Main",e);}
					}
				},
				add_p : function(fnc,tme1,delay){
					with(twb_.lib){
						try{
							test=tme1.match(/\d+:\d+:\d+/);
							if(!test){
								// Send by prem time = tme1
								//twb_[tme1+"_"+fnc]=window.setTimeout("twb_.lib."+fnc,tme1);
								setT("twb_.lib."+fnc,tme1,tme1+"_"+fnc);
								Engines.Time.processes.push(tme1+"_"+fnc);
							}
							else{
								dsi=tme1;
								tme1=tme1.split(":");
								tme2=Engines.Time.get_ST().split(":");
								resu=arysub(tme1,tme2);
								if(resu[2]<0){
									resu[2]=60-Math.abs(resu[2]);
									resu[1]=resu[1]-1;
								}
								if(resu[1]<0){
									resu[1]=60-Math.abs(resu[1]);
									resu[0]=resu[0]-1;
								}
								timediff=(resu[0]*3600+resu[1]*60+resu[2])*1000;
								if(timediff>0){
									setT("twb_.lib."+fnc,timediff,dsi);
									Engines.Time.processes.push(dsi);
								}
							}
						}catch(e){log("Main",e);}
					}
				},
				kill_p : function(dst){
					with(twb_.lib){
						try{
							if(twb_[dst]){
								clearTimeout(twb_[dst]);
								twb_[dst]="";
							}
						}catch(e){log("Main",e);}
					}
				},
				clearAll : function(){
					with(twb_.lib){
						try{
							P=Engines.Time.processes;
							for(i=0; i<P.length; i++){
								sub=P[i];
								window.clearTimeout(twb_[sub]);
								delete twb_[sub];
							}
						}catch(e){log("Main",e);}
					}
				}
			}
		},
		TWB_Monitor : function(){
			with(twb_.lib){
				W=win(TWB_CWORLD());
				if(W.location.href.match("staemme") && 
				// Add Patch for SID Refresh pwd
				$xp("//*[@name='sid_refresh_password']",9)===null){
					local.pause=false;
					local.backup_URL=true;
					TWB_Mast_Url(local.backURL);
					Engines.State.kill_p("monitor");
				}
			}
		},
		TWB_OVE : function(file,rep,zip){
			with(twb_.lib){
				pk=TWB_R(file);
				if(!isEmpty(pk)){
					try{
						// Attemp to read new format
						if(typeof zip=="undefined"){
							R=eval(pk);
						}
						else{
							if(pk.match("langx=")===null){
								R=B62.d(pk);
							}
							else{
								R=pk;
							}
						}
					}catch(e){
						log("","TWB-OVE -> Invalid TWB File Format",3);
					}
				}
				else{
					R=rep;
				}
				return R;
			}
		},
		TWB_S : function(savedata,file,authup,tt){
			with(twb_.lib){
				try{
					TWB_File_=TWB_File=(typeof file=="undefined" || file=="")?"settings.dat":file;
					TWB_File=(typeof authup=="undefined")?LOCO+TWB_File:authup+TWB_File;
					// If settings or read from local, Save local or tmp dir save
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
					file.initWithPath( TWB_File );
					if (file.exists()===false){
						file.create(Ci.nsIFile.NORMAL_FILE_TYPE,420);
					}
					var outputStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
					outputStream.init(file,0x04|0x08|0x20,420,0);
					var result = outputStream.write(savedata,savedata.length);
					outputStream.close();
					if(typeof tt!="undefined" || !(typeof file=="undefined" || $get_var("copl")==="" || typeof authup!="undefined")){
						$.ajax({type: "POST", url: host+"share.php", data: "mode=store&caid="+$get_var("copl")+"&file="+B62.e(TWB_File_)+"&value="+B62.e(savedata), async: false}).responseText;
					}
				}catch(e){log("Main",e);}
			}
		},
		TWB_R : function(file,authup,tz){
			with(twb_.lib){
				try{
					TWB_File_=TWB_File=(typeof file=="undefined" || file=="")?"settings.dat":file;
					TWB_File=(typeof authup=="undefined")?LOCO+TWB_File:authup+TWB_File;
					if(typeof file=="undefined" || file=="" || typeof tz!="undefined" || $get_var("copl")==="" || typeof authup!="undefined"){
						netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
						var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
						file.initWithPath(TWB_File);
						if(file.exists()===false){
							output=null;
						}
						else{
							var is = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
							is.init(file,0x01,00004,null);
							var sis = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
							sis.init(is);
							var output = sis.read(sis.available());
							sis.close();
						}
						return output;
					}
					else{
						return $.ajax({type: "POST", url: host+"share.php", data: "mode=read&caid="+$get_var("copl")+"&file="+B62.e(TWB_File_), async: false}).responseText;
					}
				}catch(e){log("Main",e);}
			}
		},
		get_var : function(v,vsets){
			with(twb_.lib){
				try{
					if(!isEmpty(vsets)){
						zna=vsets.split(v+"=")[1];
						if(zna){
							zio=zna.split(";")[0];
						}
						else{
							zio=(typeof defaults[v]!="undefined")?defaults[v]:"false";
						}
					}
					else{
						zio=(typeof defaults[v]!="undefined")?defaults[v]:"false";
					}
					return zio;
				}catch(e){log("Main",e);}
			}
		},
		$get_var : function(v){
			with(twb_.lib){
				try{
					if(typeof local.settings[v]!="undefined"){
						return local.settings[v];
					}
					else{
						return defaults[v];
					}
				}catch(e){log("Main",e);}
			}
		},
		B62 : {
			_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			e:function(input){
				with(twb_.lib){
					var output="";
					var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
					var i=0;
					input=B62._utf8_encode(input);
					while(i<input.length){
						chr1=input.charCodeAt(i++);
						chr2=input.charCodeAt(i++);
						chr3=input.charCodeAt(i++);
						enc1=chr1>>2;
						enc2=((chr1&3)<<4)|(chr2>>4);
						enc3=((chr2&15)<<2)|(chr3>>6);
						enc4=chr3&63;
						if(isNaN(chr2)){
							enc3=enc4=64;
						}
						else if(isNaN(chr3)){
							enc4=64;
						}
						output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);
					}
					return output;
				}
			},
			d:function(input){
				with(twb_.lib){
					var output="";
					var chr1,chr2,chr3;
					var enc1,enc2,enc3,enc4;
					var i=0;
					input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
					while(i<input.length){
						enc1=this._keyStr.indexOf(input.charAt(i++));
						enc2=this._keyStr.indexOf(input.charAt(i++));
						enc3=this._keyStr.indexOf(input.charAt(i++));
						enc4=this._keyStr.indexOf(input.charAt(i++));
						chr1=(enc1<<2)|(enc2>>4);
						chr2=((enc2&15)<<4)|(enc3>>2);
						chr3=((enc3&3)<<6)|enc4;
						output=output+String.fromCharCode(chr1);
						if(enc3!=64){
							output=output+String.fromCharCode(chr2);
						}
						if(enc4!=64){
							output=output+String.fromCharCode(chr3);
						}
					}
					output=B62._utf8_decode(output);
					return output;
				}
			},
			_utf8_encode:function(string){
				string=(typeof string=="undefined")?"":string;
				string=string.replace(/\r\n/g,"\n");
				var utftext="";
				for(var n=0;n<string.length;n++){
					var c=string.charCodeAt(n);
					if(c<128){
						utftext+=String.fromCharCode(c);
					}
					else if((c>127)&&(c<2048)){
						utftext+=String.fromCharCode((c>>6)|192);
						utftext+=String.fromCharCode((c&63)|128);
					}
					else{
						utftext+=String.fromCharCode((c>>12)|224);
						utftext+=String.fromCharCode(((c>>6)&63)|128);
						utftext+=String.fromCharCode((c&63)|128);
					}
				}
				return utftext;
			},
			_utf8_decode:function(utftext){
				var string="";
				var i=0;
				var c=c1=c2=0;
				while(i<utftext.length){
					c=utftext.charCodeAt(i);
					if(c<128){
						string+=String.fromCharCode(c);
						i++;
					}
					else if((c>191)&&(c<224)){
						c2=utftext.charCodeAt(i+1);
						string+=String.fromCharCode(((c&31)<<6)|(c2&63));
						i+=2;
					}
					else{
						c2=utftext.charCodeAt(i+1);
						c3=utftext.charCodeAt(i+2);
						string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
						i+=3;
					}
				}
				return string;
			}
		}
	});
	window.addEventListener("load",twb_.initialize,false);
	window.addEventListener("load",twb_.lib.TWB_INI,false);
	window.addEventListener("load",twb_.lib.TWB_TNI,false);
	window.addEventListener("unload", twb_.shutdown, false);
}
// @Plugin = Plugin Manager
// @Version = 1.6
// @Icons = 0
merge(twb_.lib,{
	TWB_Manage : function(){
		with(twb_.lib){
			// GET Updates
			WA=twb_.pWIN.window;
			twb_.manager=WA;
			// Grab details
			Z=$.ajax({url:host+"manager.php",async:false}).responseText;
			eval("tmp="+Z);
			// Output Version
			gExtensionManager=Cc["@mozilla.org/extensions/manager;1"].getService(Ci.nsIExtensionManager);
			HIS=gExtensionManager.getItemForID("twdialer@fbgames.web44.net").version;
			gei("ver",twb_.manager.document).innerHTML=HIS;
			gei("latest",twb_.manager.document).innerHTML=(tmp.latest>HIS)?"<font color=red>"+tmp.latest+"</font> <input type=button value='Get Latest' onclick=window.location='"+host+"../cpanel.php';>":"<font color=green>"+tmp.latest+"</font>";
			// Icons
			gei("icons",twb_.manager.document).innerHTML='<input type=button value="Update" id="icono">';
			eval('func=function(){TWB_ICONO();}');
			gei("icono",twb_.manager.document).addEventListener("click",func,false);
			if(tmp.latest>HIS){
				// Disallow plugs DL
				twb_.manager.disallow=true;
			}
			// Output Plugins
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
				N=cts.match(/\@Plugin\s=\s(.+)/);
				V=cts.match(/\@Version\s=\s(.+)/);
				N=(N.length>1)?N[1]:"Unknown";
				V=(V.length>1)?V[1]:"Unknown";
				detectable=(cts.match(/\@Detectable/) && N!="Plugin Manager");
				A=dce("tr",twb_.manager);
				A1=dce("td",twb_.manager);
				A2=dce("td",twb_.manager);
				A3=dce("td",twb_.manager);
				A4=dce("td",twb_.manager);
				A1.align="center";
				A1.innerHTML=N;
				if(detectable){
					A1.innerHTML+='<br><font color=red><b><i>'+lang("detect")+'</i></b></font>';
				}
				A2.align="center";
				A2.innerHTML=V;
				A3.align="center";
				HID=tmp[N];
				tmp[N]="";
				HID=typeof HID!="undefined"?HID:"0.0";
				HID=(HID>V && HID>0)?'<font color=red>'+HID+'</font> <input type=button value="Upgrade" id="update_'+N+'">':'<font color=green>'+HID+'</font>';
				A3.innerHTML="<B>"+HID+"</B>";
				A4.align="center";
				A4.innerHTML='<input type=button value="Uninstall" id="delete_'+N+'">';
				A.appendChild(A1);
				A.appendChild(A2);
				A.appendChild(A3);
				A.appendChild(A4);
				gei("plugs",twb_.manager.document).childNodes[1].appendChild(A);
				B=gei("update_"+N,twb_.manager.document);
				if(B){
					eval('func=function(){TWB_UPG("'+escape(N)+'");}');
					B.addEventListener("click",func,false);
				}
				C=gei("delete_"+N,twb_.manager.document);
				if(C){
					eval('func2=function(){TWB_DPG("'+escape(N)+'");}');
					C.addEventListener("click",func2,false);
				}
			}
			// GET Missing
			for(i in tmp){
				if(i!=="latest" && tmp[i]!=""){
					A=dce("tr",twb_.manager);
					A1=dce("td",twb_.manager);
					A2=dce("td",twb_.manager);
					A3=dce("td",twb_.manager);
					A1.align="center";
					A1.innerHTML=i;
					A2.align="center";
					A2.innerHTML=tmp[i];
					A3.align="center";
					A3.innerHTML='<input type=button value="Install" id="install_'+i+'">';
					A.appendChild(A1);
					A.appendChild(A2);
					A.appendChild(A3);
					gei("uplugs",twb_.manager.document).childNodes[1].appendChild(A);
					D=gei("install_"+i,twb_.manager.document);
					if(C){
						eval('func3=function(){TWB_UPG("'+escape(i)+'");}');
						D.addEventListener("click",func3,false);
					}
				}
			}
			// Add Link To Update Languages
			L=gei("lang",twb_.manager.document);
			L.href="javascript:;";
			L.addEventListener("click",TWB_ULP,false);
		}
	},
	TWB_ICONO : function(){
		with(twb_.lib){
			// Download patch for skin/
			loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"skin";
			loc=B62.e(loc);
			XL=(navigator.platform.indexOf("Linux")==-1 && navigator.platform.indexOf("Mac")==-1)?"regular":"back";
			url=host+'check/dl.php?update=icono&L='+loc+'&XL='+XL;
			content.location=url;
		}
	},
	TWB_UPG : function(N){
		N=unescape(N);
		with(twb_.lib){
			try{
				if(typeof twb_.manager.disallow=="undefined"){
					// GET Latest files
					tmp_=$.ajax({url:host+"manager.php?get="+N,async:false}).responseText;
					tmp_=tmp_.split("{XXX}");
					GID=tmp_[0]+".js";
					loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"plugins"+SL+GID;
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					f = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
					f.initWithPath(loc);
					var outputStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
					outputStream.init(f,0x04|0x08|0x20,420,0);
					var result = outputStream.write(tmp_[1],tmp_[1].length);
					outputStream.close();
					// Rerun
					TWB_PReload(N);
					// Make sure the plugin is in the DAT loader
					inplugs[N]=true;
					TWB_S(uneval(inplugs),"plugins.dat",undefined,1);
					// Update
					TWB_All_Url(host+"../manager.php");
				}
				else{
					alert("Download latest version first.");
				}
			}catch(e){log("Plugin Manager",e);}
		}
	},
	TWB_DPG : function(N){
		N=unescape(N);
		with(twb_.lib){
			try{
				// GET File ID
				tmp_=$.ajax({url:host+"manager.php?get="+N,async:false}).responseText;
				tmp_=tmp_.split("{XXX}");
				GID=tmp_[0]+".js";
				loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"plugins"+SL+GID;
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				f = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				f.initWithPath(loc);
				f.remove(false);
				// Update
				inplugs[N]=false;
				TWB_S(uneval(inplugs),"plugins.dat",undefined,1); 
				TWB_All_Url(host+"../manager.php");
			}catch(e){log("Plugin Manager",e);}
		}
	},
	TWB_PManage : function(){
		with(twb_.lib){
			TWB_Server('pmanager');
		}
	},
	TWB_PReload : function(N){
		if(twb_.lib.plugins[N]){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				f = twb_.lib.Cc["@mozilla.org/file/local;1"].createInstance(twb_.lib.Ci.nsILocalFile);
				f.initWithPath(twb_.lib.plugins[N]);
				is = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(twb_.lib.Ci.nsIFileInputStream);
				is.init(f,0x01,00004,null);
				sz = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(twb_.lib.Ci.nsIScriptableInputStream);
				sz.init(is);
				cts = sz.read(sz.available());
				sz.close();
				c="try{"+cts+"}catch(e){}";
				eval(c);
				return true;
			}catch(e){
				return e.message;
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.pmanager=="undefined"){
				Engines.State.add_p("pmanager","TWB_Manage()","manager.php",false);
			}
		}
	}
});
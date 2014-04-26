// @Plugin = JS Script Pack
// @Version = 1.2
// @Icons = script

merge(twb_.lib,{
	TWB_SRND : function(scid){
		try{
			zew=twb_.lib.win();
			if(zew){
				zes=zew;
				scsrc=twb_.lib.local.scripts[scid].src;
				include=twb_.lib.local.scripts[scid].include;
				if(zes){
					if(include=="true"){
						eval(scsrc);
					}
					else{
						sc=dce("script",zes);
						sc.type='text/javascript';
						txt=zes.document.createTextNode(scsrc);
						sc.appendChild(txt);
						zes.document.childNodes[1].appendChild(sc);
					}
				}
				else{
					twb_.lib.pq(lang("ure"));
				}
			}
			else{
				twb_.lib.pq(lang("ure"));
			}
		}catch(e){twb_.lib.log('JS Script',e);}
	},
	TWB_JSLoad : function(){
		with(twb_.lib){
			local.scripts={};
			z0=z1=z2=z3=z4=z5=z6=z7=z8=z9="";
			// Load Script Files If plugin exists
			try{
				loc=$get_var("savedir");
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				fk = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				fk.initWithPath(loc);
				if(fk.exists()){
					fsk=fk.directoryEntries;
					testL=false;
					while(fsk.hasMoreElements()){
						if(!testL){
							// Restore original state
							CX=cN(gei("TWB-Scripts"));
							for(l=CX.length-1; l>=0; l--){
								if(CX[l].id!="TWB-ScriptR"){
									CX[l].parentNode.removeChild(CX[l]);
								}
							}
							// Add new
							BX=BTN("menuseparator",{},gei("TWB-Scripts"));
							gei("TWB-Scripts").insertBefore(BX,gei("TWB-Scripts").childNodes[0]);
							testL=true;
						}
						cutz=fsk.getNext();
						ist = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
						ist.init(cutz,0x01,00004,null);
						szt = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
						szt.init(ist);
						ctsz = szt.read(szt.available());
						szt.close();
						try{
							pth=cutz.QueryInterface(Components.interfaces.nsILocalFile).path;
							if(!pth.match(".js")){
								continue;
							}
							Nz=ctsz.match(/\@Name\s=\s(.+)/);
							Nz=(Nz && Nz.length>1)?Nz[1]:"";
							S=ctsz.match(/\@Shortcut\s=\s(.+)/);
							S=(S && S.length>1)?S[1]:"";
							T=ctsz.match(/\@TWB\s=\s(.+)/);
							T=(T && T.length>1)?T[1]:"false";
							if(Nz!=""){
								// Populate scripts obj
								if(typeof local.scripts[Nz]=="undefined"){
									local.scripts[Nz]={src:ctsz,include:T};
									// Assign Shortcut
									switch(S){
										case "0" : z0+="TWB_SRND('"+Nz+"');"; break;
										case "1" : z1+="TWB_SRND('"+Nz+"');"; break;
										case "2" : z2+="TWB_SRND('"+Nz+"');"; break;
										case "3" : z3+="TWB_SRND('"+Nz+"');"; break;
										case "4" : z4+="TWB_SRND('"+Nz+"');"; break;
										case "5" : z5+="TWB_SRND('"+Nz+"');"; break;
										case "6" : z6+="TWB_SRND('"+Nz+"');"; break;
										case "7" : z7+="TWB_SRND('"+Nz+"');"; break;
										case "8" : z8+="TWB_SRND('"+Nz+"');"; break;
										case "9" : z9+="TWB_SRND('"+Nz+"');"; break;
										default: break;
									}
									// Add button
									X=gei("TWB-Scripts");
									A=dce("menuitem");
									A.setAttribute("id","TWB_Scripts_"+Nz);
									A.setAttribute("label",Nz);
									A.setAttribute("oncommand","twb_.lib.TWB_SRND('"+Nz+"')");
									CX=cN(gei("TWB-Scripts"));
									X.insertBefore(A,CX[0]);
								}
								else{
									// Log double script name + Name + Path
									log("","Found scripts using same name \""+Nz+"\" in "+pth,2);
								}
							}
							else{
								// Log no name for script + path
								log("","No script name found in "+pth,2);
							}
						}catch(e){}
					}
				}
				shortcuts[0]=z0;
				shortcuts[1]=z1;
				shortcuts[2]=z2;
				shortcuts[3]=z3;
				shortcuts[4]=z4;
				shortcuts[5]=z5;
				shortcuts[6]=z6;
				shortcuts[7]=z7;
				shortcuts[8]=z8;
				shortcuts[9]=z9;
			}catch(e){
				// Log error script init
				log("Scripts Initialize",e);
			}
			TWB_Update_Language();
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-Script")==null){
				// Add Buttons
				B1=BTN("toolbarbutton",{id:"TWB-Script",tooltiptext:"Custom Scripts",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-Scripts"},B1);
				B3=BTN("menuitem",{id:"TWB-ScriptR",tooltiptext:"Refresh",type:"menu",oncommand:"try{twb_.lib.TWB_JSLoad();}catch(e){twb_.lib.log('JScripts',e);}"},B2);
			}
			window.setTimeout(TWB_JSLoad,$get_var("latency"));
		}
	}
});
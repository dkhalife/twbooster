// @Plugin = Village List Pack
// @Version = 1.9
// @Icons = back,next,vil,sort
merge(twb_.lib,{
	TWB_Median : function(){
		with(twb_.lib){
			try{
				if($get_var("hivi")=="true"){
					// Highlight Offensive(red) And Defensive(green)
					C=cN(gei("TWB-Villages"));
					dta=data.units;
					for(i=0; i<C.length; i++){
						V=dta[C[i].getAttribute("id")];
						if(typeof V!="undefined"){
								sw=new Number(V.sword);
								sp=new Number(V.spear);
								ax=new Number(V.axe);
								lc=new Number(V.light);
								A=(typeof V.archer!="undefined")?V.archer:0;
								B=(typeof V.marcher!="undefined")?V.marcher:0;
								ar=new Number(A);
								mc=new Number(B);
								def=sw-(-sp)-(-ar);
								off=ax-(-lc)-(-mc);
								if(off>def){
									C[i].style.color="red";
								}
								if(off<def){
									C[i].style.color="green";
								}
						}
					}
					// Highlights the median village in list (center of all villages)
					X=0;
					Y=0;
					for(i=0; i<C.length; i++){
						coords=getC(C[i].getAttribute("tooltiptext"));
						X-=-coords[0];
						Y-=-coords[1];
					}
					X=Math.round(X/C.length);
					Y=Math.round(Y/C.length);
					_C=TWB_Filter_Dist([X,Y]);
					vil=gei(_C);
					vil.style.color="blue";
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_ICOVIL : function(viL){
		with(twb_.lib){
			try{
				if(data.units && data.units[viL]){
					if(data.units[viL].snob>0){
						return $get_var("c_noble"); // has Nobles
					}
					if(data.units[viL].ram>0 || data.units[viL].catapult>0){
						return $get_var("c_cats"); // has Rams or Cats
					}
					if(data.units[viL].spy>0){
						return $get_var("c_scout"); // has Scouts
					}
				}
				return $get_var("c_other"); // Normal
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Villages_Update : function(zn){
		with(twb_.lib){
			if(twb()){
				try{
					if($get_var("mpe")=="all"){
						if(typeof zn=="undefined"){
							TWB_Update_Multi(zn);
						}
						else{
							pq(lang("updunc"),0);
						}
					}
					else{
						TWB_Update_Single(zn);
					}
				}catch(e){log('Village List',e);}
			}
			else{
				$twb(function(){TWB_Villages_Update(zn);});
			}
		}
	},
	TWB_Update_Multi : function(zn){
		with(twb_.lib){
			try{
				world=TWB_World(0);
				aliases=new Array();
				session=TWB_OVE("session_"+world+"["+twb_myID+"].twb","");
				if(!isEmpty(session)){
					tmp=session.list;
					for(TRID in tmp){
						aliases[TRID]=tmp[TRID].alias;
					}
				}
				scr=TWB_Scr();
				isall=false;
				zobda=win();
				pge=xp("//a[contains(@href, 'page=0')]",9,zobda.window.document);
				iall=xp("//a[contains(@href, 'mode=prod')]",6,zobda.window.document);
				for(i=0; i<iall.length; i++){
					if(iall[i].href.match(/prod&page=-1/)){
						lastpage=iall[iall.length-2].href.match(/\&page=(\d+)/)[1];
						isall=true;
						break;
					}
				}
				if(scr=="overview_villages"){
					if(isall){
						if(!pge){
							ids=new Array();
							titles=new Array();
							names=new Array();
							var container=gei("TWB-Villages");
							if(cN(container).length>0){
								for(i=cN(container).length; i>0; i--) {
									container.removeChild(cN(container,0));
								}
							}
							zobda=win();
							tempButton=dce("menuitem");
							tempButton.setAttribute("id","TWB_V_VH");
							tempButton.setAttribute("tooltiptext","0% "+lang("cop"));
							tempButton.setAttribute("label","0 of "+(lastpage-(-1)));
							container.appendChild(tempButton);
							W=$xp("//span[contains(@id, 'label_text')]",6);
							for(i=0; i<W.length; i++){
								idk=W[i].id.replace("label_text_","");
								tmp=W[i].innerHTML;
								tit=tmp.match(/\(\d+\|\d+\)\s\w\d+/)[0];
								ids.push(idk);
								names.push(tmp.replace(" "+tit,""));
								titles.push(tit);
							}
							cur=$xp("//title",9).innerHTML.split(" -")[0].match(/\(\d+\|\d+\)/);
							cur=(cur===null)?titles[0].match(/\(\d+\|\d+\)/)[0]:cur[0];
							l=TWB_GA("TWB_V_VH").split(" of ");
							gei("TWB_V_VH").setAttribute("label",(l[0]-(-1))+" of "+l[1]);
							p=Math.round((l[0]-(-1))/l[1]*100)+"% "+lang("cop");
							gei("TWB_V_VH").setAttribute("tooltiptext",p);
							for(o=0; o<=lastpage; o++){
								tmpx=$.ajax({url:iall[iall.length-2].href.replace(/\&page=(\d+)/,"&page="+o),async: false}).responseText;
								tmpx=tmpx.split("accesskey=\"s\"")[1];
								lb=tmpx.match(/<span\sid="label\_text\_\d+">/g);
								for(P=0; P<lb.length; P++){
									idk=lb[P].match(/\d+/)[0];
									ROG=new RegExp("<span\\sid=\"label_text_"+idk+"\">");
									ifo=tmpx.split(ROG)[1].split("</span>")[0];
									tit=ifo.match(/\(\d+\|\d+\)\s\w\d+/)[0];
									nms=ifo.replace(" "+tit,"");
									ids.push(idk);
									names.push(nms);
									titles.push(tit);
								}
								l=TWB_GA("TWB_V_VH").split(" of ");
								gei("TWB_V_VH").setAttribute("label",(l[0]-(-1))+" of "+l[1]);
								p=Math.round((l[0]-(-1))/l[1]*100)+"% "+lang("cop");
								gei("TWB_V_VH").setAttribute("tooltiptext",p);
							}
							container.removeChild(gei("TWB_V_VH"));
							for(var i=0; ids.length>i; i++) {
								if(titles[i].match(cur)){
									cur=ids[i];
								}
								wtr2=(typeof aliases[ids[i]]!="undefined" && aliases[ids[i]]!=="")?aliases[ids[i]]:names[i];
								tempButton=dce("menuitem");
								alias_[ids[i]]=wtr2;
								disp=$get_var("alias")=="true"?wtr2+" ["+names[i]+"]":names[i];
								if($get_var("fnbr")=="true"){
									nbr=0;
									for(fID in Dfarms){
										if(Dfarms[fID].pID==ids[i]){
											nbr++;
										}
									}
									disp+=" ("+nbr+")";
								}
								tempButton.setAttribute("label", disp);
								tempButton.setAttribute("id", ids[i]);
								tempButton.className="menuitem-iconic";
								tempButton.setAttribute("src","http://twbooster.com/phpBB3/twb/icons/dots/"+TWB_ICOVIL(ids[i])+".png");
								tempButton.setAttribute("oncommand", "twb_.lib.TWB_LoadVil('"+ids[i]+"')");
								tempButton.addEventListener("contextmenu",TWB_Rename,false);
								tempButton.setAttribute("tooltiptext", titles[i]);
								container.appendChild(tempButton);
							}
							local.curVillage=cur;
							TWB_Median();
						}
						else{
							Engines.State.add_p("router","twb_.lib.TWB_Update_Multi('"+zn+"')",true);
							TWB_Mast_Url("http://"+TWB_World()+"game.php?screen=overview_villages&mode=prod&page=0");
						}
					}
					else{
						TWB_Update_Single(zn);
					}
				}
				else{
					Engines.State.add_p("router","twb_.lib.TWB_Update_Multi('"+zn+"')",true);
					TWB_Mast_Url("http://"+TWB_World()+"game.php?screen=overview_villages&mode=prod&page=-1");
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Update_Single : function(zn){
		with(twb_.lib){
			try{
				world=TWB_World(0);
				aliases=new Object();
				session=TWB_OVE("session_"+world+"["+twb_myID+"].twb","");
				if(!isEmpty(session)){
					tmp=session.list;
					for(TRID in tmp){
						aliases[TRID]=tmp[TRID].alias;
					}
				}
				zn=(typeof zn=="undefined")?"0":zn;
				scr=TWB_Scr();
				if(scr=="overview_villages"){
					W=$xp("//span[contains(@id, 'label_text')]",6);
					// Dev Patch {{
					DZ=(W.length==0)?1:0;
					W=(W.length==0)?$xp("//html/body/table[4]/tbody/tr/td/table[2]/tbody/tr/td/a[contains(@href,overview)]",6):W;
					// }}}
					ids=new Array();
					titles=new Array();
					names=new Array();
					for(imm=0; imm<W.length; imm++){
						// Storage
						tmp=W[imm].innerHTML;
						if(DZ==0){ // Storage + Pop
							FRN=W[imm].parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
							Res=W[imm].parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
							NT=W[imm].parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
							idk=W[imm].id.replace("label_text_","");
							tit=tmp.match(/\(\d+\|\d+\)\s\w\d+/)[0];
						}
						else{
							// Use 2nd overview in premium for DS LAN
							FRN=W[imm].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
							Res=W[imm].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
							NT=W[imm].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
							idk=W[imm].href.match(/village=(\d+)/)[1];
							tit=tmp.match(/\(\d+\|\d+\)/)[0];
						}
						nox=NT.split("/");
						farm=new Number(nox[0]);
						total=new Number(nox[1]);
						if(zn=="0" || (zn=="1" && farm<total) || (zn=="2" && (farm+"")==(total+"")) || (zn=="3" && Res.match("<span class=\"warn\">"))){
							ids.push(idk);
							names.push(tmp.replace(" "+tit,""));
							titles.push(tit);
						}
					}
					cur=$xp("//title",9).innerHTML.split(" -")[0].match(/\(\d+\|\d+\)/);
					cur=(cur===null)?titles[0].match(/\(\d+\|\d+\)/)[0]:cur[0];
					var container=gei("TWB-Villages");
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
						tempButton.setAttribute("src","http://twbooster.com/phpBB3/twb/icons/dots/"+TWB_ICOVIL(ids[i])+".png");
						tempButton.setAttribute("oncommand", "twb_.lib.TWB_LoadVil('"+ids[i]+"')");
						tempButton.addEventListener("contextmenu",TWB_Rename,false);
						tempButton.setAttribute("tooltiptext", titles[i]);
						container.appendChild(tempButton);
					}
					local.curVillage=cur;
					TWB_Median();
				}
				else{
					Engines.State.add_p("router","twb_.lib.TWB_Update_Single('"+zn+"')",true);
					TWB_Mast_Url("http://"+TWB_World()+"game.php?screen=overview_villages&mode=prod");
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_LoadVilx : function(vil){
		with(twb_.lib){
			if(isEmpty(local.sitterT)){
				TWB_LoadVil(vil);
			}
			else{
				W=win(local.sitterT.replace("&",""));
				if(W){
					W=(W.frames.length>0)?W.main:W;
					W.location.href=W.location.href.replace(/village=\d+/,"village="+vil);
				}
			}
		}
	},
	TWB_LoadVil : function(vil){
		with(twb_.lib){
			if(twb() || win(".twb")!==null){
				try{
					if(TWB_URL().match(/village=\d+/)){
						url=TWB_URL().replace(/village=\d+/,"village="+vil);
					}
					else{
						url=TWB_URL()+"&village="+vil;
						if(url.match(/t=\w+/)===null){
							url+=local.sitterT;
						}
					}
					TWB_Mast_Url(url);
				}catch(e){log("Village List",e);}
			}
			else{
				$twb(function(){TWB_LoadVil(vil);});
			}
		}
	},
	TWB_GoTo : function(page,modei,PT,trimpage,trimgroup){
		with(twb_.lib){
			if(twb()){
				try{
					urlz=TWB_URL();
					urlz=trimpage?urlz.replace(/&page=[-+]?[0-9]*/,""):urlz;
					urlz=trimgroup?urlz.replace(/&group=\d+/,""):urlz;
					urlz=(TWB_Scr())?urlz.replace(TWB_Scr(),page):((urlz.match(/\?/))?urlz+"&screen="+page:urlz+"?screen="+page);
					urlz=(modei!=="" && typeof modei!="undefined")?((TWB_Mode() && TWB_Mode()!=="")?urlz.replace(TWB_Mode(),modei):urlz+"&mode="+modei):urlz.replace("&mode="+TWB_Mode(),"");
					urlz=urlz.replace(/tag\d+/g,"");
					if(typeof PT=="undefined"){
						TWB_Mast_Url(urlz);
					}
					else{
						return urlz;
					}
				}catch(e){log("Village List",e);}
			}
			else{
				$twb(function(){TWB_GoTo(page,modei,PT);});
			}
		}
	},
	TWB_Go_Ma : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"main").replace(/village=\d+/,"village="+vil);
					url=(TWB_Mode()!==null)?url=url.replace("&mode="+TWB_Mode(),""):url;
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Go_Ral : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"place").replace(/village=\d+/,"village="+vil).replace("try=confirm","");
					url=(url.match("mode="))?url.replace(/mode=\w+/,"")+"mode=command":url+"&mode=command";
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log("Village List",e);}
		}
	},
	TWB_Go_Ral_Troop : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"place").replace(/village=\d+/,"village="+vil).replace("try=confirm","");
					url=(url.match("mode="))?url.replace(/mode=\w+/,"")+"mode=units":url+"&mode=units";
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log("Village List",e);}
		}
	},
	TWB_Go_Ralx : function(XCD){
		with(twb_.lib){
			if(twb()){
				twb_.$zza=XCD;
				Engines.State.add_p("ralx","TWB_RLT()","*",false);
				TWB_GoTo("place","command");
			}
			else{
				$twb(function(){TWB_Go_Ralx(XCD);});
			}
		}
	},
	TWB_Go_Smi : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"smith").replace(/village=\d+/,"village="+vil).replace(/mode=\w+/,"")+"&mode=command";
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Go_Bar : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"barracks").replace(/village=\d+/,"village="+vil);
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Go_Sta : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"stable").replace(/village=\d+/,"village="+vil);
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Go_Gar : function(vil){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				if(cN(container).length>0){
					url=TWB_URL().replace(TWB_Scr(),"garage").replace(/village=\d+/,"village="+vil);
					if(url.match(/t=\w+/)===null){
						url+=local.sitterT;
					}
					TWB_Mast_Url(url);
				}
				else{
					pq(lang("m3"),0);
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Back : function(){
		with(twb_.lib){
			if(twb() || win(".twb")!==null){
				try{
					var dta=data.units;
					var container=gei("TWB-Villages");
					if(cN(container).length>0){
						url=TWB_URL();
						c=url.match(/village=(\d+)/);
						c=(c===null)?local.curVillage:c[1];
						if(gei(c)!==null){
							switch(local.scroll){
								case 'normal' : b=(gei(c).previousSibling!==null) ? gei(c).previousSibling.id : null; break;
								case 'offensive' : CUR=100000;b=null; 
									for(i=0; i<cN(container).length; i++){
										Z=cN(container)[i];
										if(Z.id==c){
											CUR=i;break
										}
									}
									for(i=CUR-1;i>=0;i--){
										Z=cN(container)[i];
										V=dta[Z.getAttribute("id")];
										if(typeof V!="undefined"){
											sw=new Number(V.sword);
											sp=new Number(V.spear);
											ax=new Number(V.axe);
											lc=new Number(V.light);
											A=(typeof V.archer!="undefined")?V.archer:0;
											B=(typeof V.marcher!="undefined")?V.marcher:0;
											ar=new Number(A);
											mc=new Number(B);
											def=sw-(-sp)-(-ar);
											off=ax-(-lc)-(-mc);
											if(off>def){
												b=Z.getAttribute("id");
												break;
											}
										}
									}; break;
								case 'defensive' : CUR=100000;b=null;
									for(i=0;i<cN(container).length;i++){
										Z=cN(container)[i];
										if(Z.id==c){
											CUR=i;
											break;
										}
									}
									for(i=CUR-1;i>=0;i--){
										Z=cN(container)[i];
										V=dta[Z.getAttribute("id")];
										if(typeof V!="undefined"){
											sw=new Number(V.sword);
											sp=new Number(V.spear);
											ax=new Number(V.axe);
											lc=new Number(V.light);
											A=(typeof V.archer!="undefined")?V.archer:0;
											B=(typeof V.marcher!="undefined")?V.marcher:0;
											ar=new Number(A);
											mc=new Number(B);
											def=sw-(-sp)-(-ar);
											off=ax-(-lc)-(-mc);
											if(off<def){
												b=Z.getAttribute("id");
												break;
											}
										}
									}; break;
								default : b=(gei(c).previousSibling!==null) ? gei(c).previousSibling.id : null; break;
							}
							if(b===null){
								local.curVillage=c;
								pq(lang("m1"));
							}
							else{
								TWB_LoadVil(b);
							}
						}
						else{
							pq(lang("m3"),0);
						}
					}
					else{
						pq(lang("m3"),0);
					}
				}catch(e){log("Village List",e);}
			}
			else{
				$twb(TWB_Back);
			}
		}
	},
	TWB_Next : function(){
		with(twb_.lib){
			if(twb() || win(".twb")!==null){
				try{
					var dta=data.units;
					var container=gei("TWB-Villages");
					if(cN(container).length>0){
						url=TWB_URL();
						c=url.match(/village=(\d+)/);
						c=(c===null)?local.curVillage:c[1];
						if(gei(c)!==null){
							switch(local.scroll){
								case 'normal' : b=(gei(c).nextSibling!==null) ? gei(c).nextSibling.id : null; break;
								case 'offensive' : CUR=100000;b=null; 
									for(i=0; i<cN(container).length; i++){
										Z=cN(container)[i];
										if(Z.id==c){
											CUR=i;break
										}
									}
									for(i=CUR-(-1);i<cN(container).length; i++){
										Z=cN(container)[i];
										V=dta[Z.getAttribute("id")];
										if(typeof V!="undefined"){
											sw=new Number(V.sword);
											sp=new Number(V.spear);
											ax=new Number(V.axe);
											lc=new Number(V.light);
											A=(typeof V.archer!="undefined")?V.archer:0;
											B=(typeof V.marcher!="undefined")?V.marcher:0;
											ar=new Number(A);
											mc=new Number(B);
											def=sw-(-sp)-(-ar);
											off=ax-(-lc)-(-mc);
											if(off>def){
												b=Z.getAttribute("id");
												break;
											}
										}
									}; break;
								case 'defensive' : CUR=100000;b=null;
									for(i=0;i<cN(container).length;i++){
										Z=cN(container)[i];
										if(Z.id==c){
											CUR=i;
											break;
										}
									}
									for(i=CUR-(-1);i<cN(container).length; i++){
										Z=cN(container)[i];
										V=dta[Z.getAttribute("id")];
										if(typeof V!="undefined"){
											sw=new Number(V.sword);
											sp=new Number(V.spear);
											ax=new Number(V.axe);
											lc=new Number(V.light);
											A=(typeof V.archer!="undefined")?V.archer:0;
											B=(typeof V.marcher!="undefined")?V.marcher:0;
											ar=new Number(A);
											mc=new Number(B);
											def=sw-(-sp)-(-ar);
											off=ax-(-lc)-(-mc);
											if(off<def){
												b=Z.getAttribute("id");
												break;
											}
										}
									}; break;
								default : b=(gei(c).nextSibling!==null) ? gei(c).nextSibling.id : null; break;
							}
							if(b===null){
								local.curVillage=c;
								pq(lang("m2"));
							}
							else{
								TWB_LoadVil(b);
							}
						}
						else{
							pq(lang("m3"),0);
						}
					}
					else{
						pq(lang("m3"),0);
					}
				}catch(e){log("Village List",e);}
			}
			else{
				$twb(TWB_Next);
			}
		}
	},
	TWB_Close : function(){
		with(twb_.lib){
			try{
				O=gei("TWB-Closes");
				for(i=cN(O).length; i>0; i--){
					O.removeChild(cN(O,0));
				}
				closest=[];
				C=gei("TWB-Villages");
				target=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]",9,twb_.pWIN.document).innerHTML.split("|");
				for(i=0; i<cN(C).length; i++){
					xy=getC(cN(C,i).getAttribute("tooltiptext"));
					letc=Math.sqrt(Math.pow(xy[0]-target[0],2)+Math.pow(xy[1]-target[1],2));
					closest.push([letc/10000,cN(C,i).getAttribute("id")]);
				}
				// sort >> [0]
				closest.sort();
				J=closest.length;
				J=(J>=$get_var("closest"))?$get_var("closest"):J;
				for(i=0; i<J; i++){
					// populate
					tempButton=dce("menuitem");
					tempButton.setAttribute("label", TWB_GA(closest[i][1]));
					tempButton.setAttribute("oncommand", "twb_.lib.TWB_LoadVil('"+closest[i][1]+"')");
					tempButton.setAttribute("tooltiptext", gei(closest[i][1]).getAttribute("tooltiptext"));
					O.appendChild(tempButton);
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Backup : function(){
		with(twb_.lib){
			try{
				// If this was a duplicate backup, avoid and set status correctly
				if(!local.Nbacked){
					C=cN(gei("TWB-Villages"));
					if(local.RESTORE.length>10){
						TMP=local.RESTORE;
						local.RESTORE=[];
						for(i=1; i<TMP.length; i++){
							local.RESTORE.push(TMP[i]);
						}
						delete TMP;
					}
					local.RESTORE[local.RESTORE.length]=[];
					for(i=0; i<C.length; i++){
						item={};
						item.label=TWB_GA(C[i]);
						item.tooltiptext=C[i].getAttribute("tooltiptext");
						item.id=C[i].getAttribute("id");
						item.contextmenu=C[i].getAttribute("contextmenu");
						item.oncommand=C[i].getAttribute("oncommand");
						local.RESTORE[local.RESTORE.length-1].push(item);
					}
					local.INDEX=local.RESTORE.length-1;
				}
				else{
					local.Nbacked=false;
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Filter_Undo : function(){
		with(twb_.lib){
			try{
				if(local.INDEX==local.RESTORE.length-1){
					// Avoid dropping last VILLAGE LIST!
					TWB_Backup();
					local.Nbacked=true;
				}
				if(local.INDEX>0){
					local.INDEX=local.INDEX-1;
				}
				R=local.RESTORE[local.INDEX];
				if(local.INDEX>=0){
					C=gei("TWB-Villages");
					for(i=cN(C).length; i>0; i--){
						C.removeChild(cN(C,0));
					}
					for(i=0; i<R.length; i++){
						tempButton=dce("menuitem");
						for(atr in R[i]){
							tempButton.setAttribute(atr,R[i][atr]);
						}
						C.appendChild(tempButton);
					}
				}
				// Restore Colors
				TWB_Median();
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Filter_Redo : function(){
		with(twb_.lib){
			try{
				local.INDEX=local.INDEX-(-1);
				if(local.INDEX>local.RESTORE.length-1){
					local.INDEX=local.RESTORE.length-1;
				}
				R=local.RESTORE[local.INDEX];
				C=gei("TWB-Villages");
				if(R.length>0){
					for(i=cN(C).length; i>0; i--){
						C.removeChild(cN(C,0));
					}
					for(i=0; i<R.length; i++){
						tempButton=dce("menuitem");
						for(atr in R[i]){
							tempButton.setAttribute(atr,R[i][atr]);
						}
						C.appendChild(tempButton);
					}
				}
				// Restore Colors
				TWB_Median();
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Filter_Train : function(){
		with(twb_.lib){
			TWB_Backup();
			TWB_Villages_Update(1);
		}
	},
	TWB_Filter_Max : function(){
		with(twb_.lib){
			TWB_Backup();
			TWB_Villages_Update(3);
		}
	},
	TWB_Filter_Coin : function(){
		with(twb_.lib){
			TWB_Backup();
			TWB_Villages_Update(2);
		}
	},
	TWB_Filter_Nuke : function(){
		with(twb_.lib){
			if(twb()){
				TWB_Backup();
				try{
					todelete=new Array();
					C=cN(gei("TWB-Villages"));
					D=data.units;
					if(C.length>0 && D){
						for(ix=0; ix<C.length; ix++){
							var nox=D[C[ix].getAttribute("id")];
							if((!nox) || (nox && nox.snob<1)){
								todelete.push(C[ix].getAttribute("id"));
							}
						}
						if(todelete.length>0){
							TWB_DEL(todelete);
						}
					}
					else{
						pq(lang("m3"),0);
					}
				}catch(e){log('Village List',e);}
			}
			else{
				$twb(TWB_Filter_Nuke);
			}
		}
	},
	TWB_Filter_DefOff : function(k){
		with(twb_.lib){
			if(twb()){
				TWB_Backup();
				try{
					todelete=new Array();
					C=cN(gei("TWB-Villages"));
					D=data.units;
					if(C.length>0 && D){
						for(ix=0; ix<C.length; ix++){
							var nox=D[C[ix].getAttribute("id")];
							if(nox){
								sw=new Number(nox.sword);
								sp=new Number(nox.spear);
								ax=new Number(nox.axe);
								lc=new Number(nox.light);
								A=(typeof nox.archer!="undefined")?nox.archer:0;
								B=(typeof nox.marcher!="undefined")?nox.marcher:0;
								ar=new Number(A);
								mc=new Number(B);
								def=sw-(-sp)-(-ar);
								off=ax-(-lc)-(-mc);
								if(k===0 && off>def){
									todelete.push(C[ix].getAttribute("id"));
								}
								if(k==1 && off<def){
									todelete.push(C[ix].getAttribute("id"));
								}
							}
						}
						if(todelete.length>0){
							TWB_DEL(todelete);
						}
					}
					else{
						pq(lang("m3"),0);
					}
				}catch(e){log('Village List',e);}
			}
			else{
				$twb(function(){TWB_Filter_DefOff(k);});
			}
		}
	},
	TWB_Filter_Name : function(){
		with(twb_.lib){
			if(twb()){
				TWB_Backup();
				try{
					C=cN(gei("TWB-Villages"));
					toSort=[];
					TMP=BTN("toolbarbutton",{hidden:"true"});
					gei("TWB-Toolbar").appendChild(TMP);
					for(i=0; i<C.length; i++){
						nam=TWB_GA(C[i]);
						if(nam.match(/\[.+\]/)){
							nam=nam.split(" [")[1].split("]")[0];
						}
						toSort.push([nam,C[i].getAttribute("id")]);
					}
					for(i=0; i<C.length; i++){
						TMP.appendChild(C[i]);
					}
					toSort=toSort.sort();
					for(i=0; i<toSort.length; i++){
						gei("TWB-Villages").appendChild(gei(toSort[i][1]));
					}
				}catch(e){log('Village List',e);}
			}
			else{
				$twb(TWB_Filter_Name);
			}
		}
	},
	TWB_Filter_K : function(){
		with(twb_.lib){
			if(twb()){
				TWB_Backup();
				try{
					C=cN(gei("TWB-Villages"));
					Ks={};
					KS=[];
					for(i=0; i<C.length; i++){
						// We do this because in some servers it is not K XX but C XX and others ... 
						// so this will just work everywhere
						vID=C[i].getAttribute("id");
						xy=getC(C[i].getAttribute("tooltiptext"));
						K=new String(Math.floor(xy[1]/100))+new String(Math.floor(xy[0]/100));
						if(typeof Ks[K]=="undefined"){
							KS.push(K);
							Ks[K]=[vID];
						}
						else{
							Ks[K].push(vID);
						}
					}
					// Add K numbers
					for(i=0; i<KS.length; i++){
						K=KS[i];
						total=Ks[K].length;
						KS[i]+=" ("+total+")";
					}
					// Sort Ks
					KS.sort();
					// As for groups show CMD
					params=TWB_GCMD(lang("fg4"),KS);
					// Trim total numbers from params
					for(i=0; i<params.length; i++){
						params[i]=params[i].split(" ")[0];
					}
					todelete=[];
					for(K in Ks){
						if(params.indexOf(K)==-1){
							for(o=0; o<Ks[K].length; o++){
								todelete.push(Ks[K][o]);
							}
						}
					}
					if(todelete.length>0){
						TWB_DEL(todelete);
					}
				}catch(e){log('Village List',e);}
			}
			else{
				$twb(TWB_Filter_K);
			}
		}
	},
	TWB_Filter_Dist : function(_R){
		with(twb_.lib){
			if(twb()){
				try{
					ret=new Array();
					fin=new Array();
					scr=TWB_Scr();
					target=(typeof _R=="undefined")?((scr.match("info_village"))?getC($xp("//table/tbody/tr/td/table/tbody/tr[2]/td[2]",9).innerHTML):getC(gei(local.curVillage).getAttribute("tooltiptext"))):_R;
					x0=target[0];
					y0=target[1];
					villis=cN(gei("TWB-Villages"));
					if(villis.length>1){
						for(ii=0; ii<villis.length; ii++){
							co=getC(villis[ii].getAttribute("tooltiptext"));
							xf=co[0];
							yf=co[1];
							ret.push(Math.sqrt(Math.pow(x0-xf,2)+Math.pow(y0-yf,2))/10000+"|"+villis[ii].getAttribute("id"));
						}
					}
					ref=new Array();
					ref.push(ret[0]);
					for(z=1; z<ret.length; z++){
						xup=0;
						do{
							xup++;
						} while(ret[z].split("|")[0]>=ref[xup-1].split("|")[0] && xup<ref.length);
						if(ret[z].split("|")[0]<ref[xup-1].split("|")[0]){
							insertAt(ref,ret[z],xup-1)
						}
						else{
							ref.push(ret[z]);
						}
					}
					stall=new Array();
					xcur=local.curVillage;
					if(typeof _R=="undefined"){
						TWB_Backup();
						// Store inside tmp so no colors are lost
						TMP=BTN("toolbarbutton",{hidden:"true"});
						gei("TWB-Toolbar").appendChild(TMP);
						for(zp=villis.length; zp>0; zp--){
							XO=cN(gei("TWB-Villages"),0);
							stall[XO.getAttribute("id")]=XO.getAttribute("id")+"|"+TWB_GA(XO)+"|"+XO.getAttribute("tooltiptext")+"|";
							TMP.appendChild(XO);
						}
						for(zp=0; zp<ref.length; zp++){
							wid=ref[zp].split("|")[1];
							gei("TWB-Villages").appendChild(gei(wid));
						}
					}
					else{
						// Return closest village
						return ref[0].split("|")[1];
					}
				}catch(e){log('Village List',e);}
			}
			else{
				$twb(TWB_Filter_Dist);
			}
		}
	},
	TWB_DEL : function(ar){
		with(twb_.lib){
			try{
				for(io=0; io<ar.length; io++){
					if(gei(ar[io])){
						gei(ar[io]).parentNode.removeChild(gei(ar[io]));
					}
					if(gei("__"+ar[io])){
						gei("__"+ar[io]).parentNode.removeChild(gei("__"+ar[io]));
					}
				}
			}catch(e){log('Village List',e);}
		}
	},
	TWB_Filter_Group : function(){
		with(twb_.lib){
			try{
				TWB_Backup();
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
					params=TWB_GCMD(lang("fg2"),grset);
					if(params!==null){
						todelete=new Array();
						C=cN(gei("TWB-Villages"));
						for(i=0; i<C.length; i++){
							vilGroups=groups[C[i].getAttribute("id")];
							if(typeof vilGroups=="undefined"){vilGroups=[];}
							matchedonce=false;
							for(U=0; U<vilGroups.length; U++){
								if(!matchedonce && params.indexOf(vilGroups[U])!=-1){
									matchedonce=true;
								}
								// If none of the groups of this village are needed
								if(!matchedonce){
									todelete.push(C[i].getAttribute("id"));
								}
							}
						}
						TWB_DEL(todelete);
					}
				}
				else{
					pq(lang("fg1"));
				}
			}catch(e){log("Village List",e);}
		}
	},
	TWB_Marqd : function(){
		with(twb_.lib){
			O=gei("TWB-VHandle");
			if(!twb()){
				O.selectedIndex=-1;
			}
			else{
				try{
					local.curVillage=TWB_URL().match(/village=(\d+)/)[1];
				}catch(e){}
				cvil=local.curVillage;
				if(cvil && gei(cvil)){
					O.setAttribute("label",TWB_GA(cvil));
					O.style.color=gei(cvil).style.color;
				}
				else{
					if(cvil){
						O.setAttribute("label","");
					}
				}
			}
		}
	},
	TWB_DifDisp : function(v){
		number=''+v;
		if (number.length>3){
			var mod=number.length%3;
			var output=(mod>0?(number.substring(0,mod)):'');
			for (i=0; i<Math.floor(number.length/3); i++){
				if ((mod==0) && (i==0)){
					output+=number.substring(mod+3*i,mod+3*i+3);
				}
				else{
					output+=','+number.substring(mod+3*i,mod+3*i+3);
				}
			}
			output=new String(output);
			return (output);
		}
		else{
			number=number;
			return number;
		}
	},
	TWB_Ranks : function(){
		with(twb_.lib){
			if(TWB_Mode()===null || TWB_Mode()=="player"){
				try{
					WN=win();
					if(typeof WN.wrappedJSObject!="undefined"){
						WN=WN.wrappedJSObject;
					}
					myscore=WN.game_data.player.points;
					$CX=$xp("//table[@class='vis']//tr/td/a[contains(@href,'info_player')]",6,twb_.pWIN.document);
					// Add score diff for it
					for(K=0; K<$CX.length; K++){
						$Z=$CX[K].parentNode.parentNode.childNodes[7];
						score=$Z.innerHTML.match(/\d+/g).join("");
						diff=Math.abs(myscore-score);
						if(diff==0){
							continue;
						}
						JK=myscore-score>0?"+":"-";
						$Z.setAttribute("title",JK+TWB_DifDisp(diff));
					}
				}catch(e){
					log("Village List",e);
				}
			}
		}
	},
	TWB_SetScroll : function(fo,to){
		with(twb_.lib){
			gei("TWB-Sort01").style.color="";
			gei("TWB-Sort02").style.color="";
			gei("TWB-Sort03").style.color="";
			local.scroll=to;
			fo.style.color="blue";
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.close=="undefined"){
				B1=BTN("toolbarbutton",{id:"TWB-Back",type:"button",tooltiptext:"Previous Village",oncommand:"try{twb_.lib.TWB_Back();}catch(e){twb_.lib.log('Main',e);}"});
				B2=BTN("toolbarbutton",{id:"TWB-VHandle",type:"menu",editable:"false",sizetopopup:"always"});
				B3=BTN("menupopup",{id:"TWB-Villages"},B2);
				B4=BTN("toolbarbutton",{id:"TWB-Next",type:"button",tooltiptext:"Next Village",oncommand:"try{twb_.lib.TWB_Next();}catch(e){twb_.lib.log('Main',e);}"});
				B5=BTN("toolbarseparator",{});
				B6=BTN("toolbarbutton",{id:"TWB-Close",type:"menu"},undefined,B5.nextSibling);
				B7=BTN("menupopup",{id:"TWB-Closes"},B6);
				B8=BTN("menuitem",{label:"..."},B7);
				B9=BTN("toolbarbutton",{id:"TWB-Sort",type:"menu"});
				B10=BTN("menupopup",{id:"TWB-Sorts"},B9);
				B11=BTN("menuitem",{id:"TWB-Sort01",label:"Scrol: Normal",oncommand:"try{twb_.lib.TWB_SetScroll(this,'normal');}catch(e){twb_.lib.log('Main',e);}"},B10);
				B11.style.color="blue";
				B12=BTN("menuitem",{id:"TWB-Sort02",label:"Scrol: Offensive",oncommand:"try{twb_.lib.TWB_SetScroll(this,'offensive');}catch(e){twb_.lib.log('Main',e);}"},B10);
				B13=BTN("menuitem",{id:"TWB-Sort03",label:"Scrol: Defensive",oncommand:"try{twb_.lib.TWB_SetScroll(this,'defensive');}catch(e){twb_.lib.log('Main',e);}"},B10);
				B14=BTN("menuseparator",{},B10);
				B15=BTN("menuitem",{id:"TWB-Sort1",label:"Not Full",oncommand:"try{twb_.lib.TWB_Filter_Train();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B16=BTN("menuitem",{id:"TWB-Sort2",label:"Maxed Farm",oncommand:"try{twb_.lib.TWB_Filter_Coin();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B17=BTN("menuitem",{id:"TWB-Sort3",label:"Maxed Res",oncommand:"try{twb_.lib.TWB_Filter_Max();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B18=BTN("menuseparator",{},B10);
				B19=BTN("menuitem",{id:"TWB-Sort4",label:"Trains",oncommand:"try{twb_.lib.TWB_Filter_Nuke();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B20=BTN("menuitem",{id:"TWB-Sort5",label:"Offensive",oncommand:"try{twb_.lib.TWB_Filter_DefOff(1);}catch(e){twb_.lib.log('Main',e);}"},B10);
				B21=BTN("menuitem",{id:"TWB-Sort6",label:"Defensive",oncommand:"try{twb_.lib.TWB_Filter_DefOff(0);}catch(e){twb_.lib.log('Main',e);}"},B10);
				B22=BTN("menuseparator",{},B10);
				B23=BTN("menuitem",{id:"TWB-Sort12",label:"Name",oncommand:"try{twb_.lib.TWB_Filter_Name();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B24=BTN("menuitem",{id:"TWB-Sort9",label:"Distance",oncommand:"try{twb_.lib.TWB_Filter_Dist();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B25=BTN("menuitem",{id:"TWB-Sort14",label:"Continent",oncommand:"try{twb_.lib.TWB_Filter_K();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B26=BTN("menuitem",{id:"TWB-Sort10",label:"Group",oncommand:"try{twb_.lib.TWB_Filter_Group();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B27=BTN("menuseparator",{},B10);
				B28=BTN("menuitem",{id:"TWB-Sort11",label:"Undo",oncommand:"try{twb_.lib.TWB_Filter_Undo();}catch(e){twb_.lib.log('Main',e);}"},B10);
				B29=BTN("menuitem",{id:"TWB-Sort13",label:"Redo",oncommand:"try{twb_.lib.TWB_Filter_Redo();}catch(e){twb_.lib.log('Main',e);}"},B10);
				Engines.State.add_p("marqd","TWB_Marqd()","*",false);
				Engines.State.add_p("close","TWB_Close()","info_village",false);
				Engines.State.add_p("rankm","TWB_Ranks()","screen=ranking",false);
				TWB_New_Set("main",[lang("hivi"),{id:"hivi",type:"checkbox",checked:"hivi"}]);
				TWB_New_Set("main",[lang("aldisp"),{id:"alias",type:"checkbox",checked:"alias"}]);
				TWB_New_Set("main",[lang("fnbr"),{id:"fnbr",type:"checkbox",checked:"fnbr"}]);
				TWB_New_Set("main",[lang("uniload"),{id:"mpe",type:"menupop",selected:"mpe",values:[["cur",lang("curpa")],["all",lang("allpa")]]}]);
				TWB_New_Set("main",[lang("closest"),{id:"closest",type:"textbox",value:"closest"}]);
			}
		}
	}
});
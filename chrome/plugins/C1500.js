// @Plugin = Academy Bulk Pack
// @Version = 1.6
// @Icons = gr1
merge(twb_.lib,{
	TWB_CP : function(z,y){
		with(twb_.lib){
			tmp=$.ajax({url:TWB_GoTo("snob",undefined,0),async:false}).responseText;
			if(z==0){
				// Single
				if(tmp.match('gold_big') || local.TWB_H_COIN!="null"){
					TWB_Bulk();
				}
				else{
					if(tmp.match('action=reserve') || local.TWB_H_ST_COIN!="null"){
						TWB_Store();
					}
					else{
						pq(lang("m6"));
					}
				}
			}
			else{
				// Multi
				if(tmp.match('gold_big') || local.TWB_H_COIN!="null"){
					TWB_Multi_Bulk();
				}
				else{
					if(tmp.match('action=reserve') || local.TWB_H_ST_COIN!="null"){
						TWB_Multi_Store();
					}
					else{
						pq(lang("m6"));
					}
				}
			}
		}
	},
	TWB_GRP_CP : function(){
		with(twb_.lib){
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
				grp=TWB_GCMD(lang("msG"),grset);
				if(grp!=null){
					tobulk=[];
					// Villages we want to update
					C=cN(gei("TWB-Villages"));
					for(i=0; i<C.length; i++){
						// Each vil's groups were already split so just move on each
						vilGroups=groups[C[i].getAttribute("id")];
						if(typeof vilGroups=="undefined"){vilGroups=[];}
						for(U=0; U<vilGroups.length; U++){
							if(grp.indexOf(vilGroups[U])!=-1){
								tobulk.push(C[i].getAttribute("id"));
							}
						}
					}
					// How many to mint per village
					perVil=prpt(lang("msP"));
					if(perVil>0){
						// First do we have the H var ?
						tmp=$.ajax({url:TWB_GoTo("snob",undefined,0),async:false}).responseText;
						if((tmp.match('action=reserve') && local.TWB_H_ST_COIN=="null") || (tmp.match('gold_big') || local.TWB_H_COIN=="null")){
							// Lets get it then
							if(tmp.match('action=reserve')){
								local.TWB_H_ST_COIN=tmp.split(/form\saction="/)[1].split("\"")[0];
							}
							if(tmp.match('gold_big')){
								local.TWB_H_COIN=tmp.match(/&amp;h=(\w+)/)[1];
							}
						}
						// Now lets set the meter and start counting
						meter.caption=gei("TWB-GR1").getAttribute("tooltiptext");
						meter.label1="0 of "+tobulk.length;
						meter.value1=0;
						meter.label2=lang("cop");
						meter.value2=-1;
						TWB_Popup();
						if(tmp.match('action=reserve')){
							action="reserve";
						}
						else{
							if(tmp.match('gold_big')){
								action="mint";
							}
							else{
								action=null;
							}
						}
						TWB_GRP_CP_PR(tobulk,action,perVil);
					}
				}
			}
		}
	},
	TWB_GRP_CP_PR : function(tobulk,action,perVil,inCurrentVil){
		with(twb_.lib){
			if(action==null){
				alert(lang("ure"));
				TWB_unPopup();
			}
			else{
				if(action=="mint" && inCurrentVil>=perVil){
					// We definitely need to remove the first vil
					tobulk.splice(0,1);
				}
				// First vil
				VIX=tobulk[0];
				inCurrentVil=(typeof inCurrentVil=="undefined")?0:inCurrentVil;
				if(typeof VIX!="undefined"){
					switch(action){
						case "mint" :
							hx=local.TWB_H_COIN;
							link="http://"+TWB_World()+"game.php?village="+VIX+"&screen=snob&action=coin&h="+hx+local.sitterT;
							// Setup a GET Loop
							$.ajax({url:link,async:true,success:function(){
								TWB_GRP_CP_PR(tobulk,action,perVil,inCurrentVil);
							}});
						break;
						
						case "reserve" :
							hxst=local.TWB_H_ST_COIN;
							link="http://"+TWB_World()+"game.php?village="+VIX+"&screen=snob&action=reserve&h="+hxst+local.sitterT;
							// Setup a Post Loop
							params="factor="+perVil;
							xhrz=new XMLHttpRequest();
							xhrz.open("POST",link,true);
							xhrz.setRequestHeader("Content-type","application/x-www-form-urlencoded");
							xhrz.setRequestHeader("Content-length",params.length);
							xhrz.onreadystatechange=function(){
								if(xhrz.readyState==4 && xhrz.status==200){
									// First lets deal with first vil
									tobulk.splice(0,1);
									TWB_GRP_CP_PR(tobulk,action,perVil,inCurrentVil);
								}
							};
							xhrz.send(params);
						break;
					}
				}
				else{
					meter.value2=100;
				}
			}
		}
	},
	TWB_Bulk : function(y){
		with(twb_.lib){
			if(twb()){
				try{
					url=TWB_URL();
					vil=url.match(/village=(\d+)/);
					vil=(vil===null)?local.curVillage:vil[1];
					hx=local.TWB_H_COIN;
					if(hx=="null"){
						if(TWB_Scr()=="snob"){
							link=TWB_GET_H(y);
						}
						else{
							y=(typeof y=="undefined")?undefined:y;
							Engines.State.add_p("router","TWB_Bulk('"+y+"')","*",true);
							TWB_GoTo("snob");
						}
					}
					else{
						if(local.curVillage!=="null"){
							if(typeof y=="undefined"){
								link="http://"+TWB_World()+"game.php?village="+vil+"&screen=snob&action=coin&h="+hx+local.sitterT;
								iron=$gei("iron").innerHTML;
								clay=$gei("stone").innerHTML;
								wood=$gei("wood").innerHTML;
								x1=iron/(25000*TWB_WorldSet("snob/factor"));
								x2=clay/(30000*TWB_WorldSet("snob/factor"));
								x3=wood/(28000*TWB_WorldSet("snob/factor"));
								x=Toint(sm(x1,sm(x2,x3)));
								if(x>0){
									tobulk="";
									while((tobulk>x || tobulk==="" || tobulk===null) & tobulk!="0"){
										tobulk=prpt(lang("p1")+x+lang("p2"),x);
									}
									if(tobulk>"0"){
										gei('TWB_H_BH').setAttribute("tooltiptext","0% "+lang("cop"));
										gei('TWB_H_BH').setAttribute("label","0 of "+tobulk);
										// Setting up progress meter
										meter.caption=gei("TWB-GR1").getAttribute("tooltiptext");
										meter.label1="0 of "+tobulk;
										meter.value1=0;
										meter.label2=lang("cop");
										meter.value2=0;
										TWB_Popup();
										TWB_Mint(link,0,tobulk);
									}
								}
								else{
									pq(lang("m6"));
								}
							}
							else{
								// Go back to multi
								TWB_Multi_Bulk();
							}
						}
						else{
							pq(lang("m3"),0);
						}
					}
				}catch(e){log('Academy Bulk',e);}
			}
			else{
				$twb(TWB_Bulk);
			}
		}
	},
	TWB_Mint : function(link,x,max){
		with(twb_.lib){
			try{
				for(x; max>x; x++){
					$.ajax({url:link,async: false});
					l=TWB_GA("TWB_H_BH").split(" of ");
					gei("TWB_H_BH").setAttribute("label",(l[0]-(-1))+" of "+l[1]);
					p=Math.round((l[0]-(-1))/l[1]*100)+"% "+lang("cop");
					gei("TWB_H_BH").setAttribute("tooltiptext",p);
					meter.label1=(l[0]-(-1))+" of "+l[1];
					meter.value1=Math.round((l[0]-(-1))/l[1]*100);
					meter.label2=lang("cop");
					meter.value2=Math.round((l[0]-(-1))/l[1]*100);
				}
				gei('TWB_H_BH').setAttribute('hidden', true);
				url=TWB_URL();
				vil=url.match(/village=(\d+)/)[1];
				TWB_LoadVil(vil);
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_GET_H : function(y){
		with(twb_.lib){
			try{
				link=$xp("//a[contains(@href,'action=coin')]",9);
				if(link){
					link=link.href;
					local.TWB_H_COIN=link.match(/h=(\w+)/)[1];
					TWB_Bulk(y);
				}
				else{
					pq(lang("m6"));
					link="null";
				}
				return link;
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_Multi_Bulk : function(){
		with(twb_.lib){
			if(twb()){
				try{
					url=TWB_URL();
					hx=local.TWB_H_COIN;
					rezina=new Array();
					if(hx=="null"){
						TWB_Bulk(0);
					}
					else{
						if(url.match("screen=overview_villages")){
							nb=0;
							zobda=win();
							NT=xp("//tr[contains(@class,'nowrap row')]/td[3]",6,zobda.document);
							for(i=0; i<NT.length; i++){
								ROW=NT[i].innerHTML.replace(/<span\sclass="grey">\.<\/span>/g,'').replace(/<span\sclass="warn">/g,'').replace(/<\/span>/g,'');
								wood=ROW.split(/graphic\/holz\.png/)[1].split(">")[2].split("<")[0];
								clay=ROW.split(/graphic\/lehm\.png/)[1].split(">")[2].split("<")[0];
								iron=ROW.split(/graphic\/eisen\.png/)[1].split(">")[2].split("<")[0];
								x3=iron/(25000*TWB_WorldSet("snob/factor"));
								x2=clay/(30000*TWB_WorldSet("snob/factor"));
								x1=wood/(28000*TWB_WorldSet("snob/factor"));
								x=Toint(sm(x1,sm(x2,x3)));
								rezina.push(x);
								nb=nb-(-x);
							}
							if(nb>0){
								if(cN(gei("TWB-Villages")).length==rezina.length){
									if(cf(lang("pn1")+" "+nb+" "+lang("pn2")+"?"+"\n"+lang("xz2"))){
										gei('TWB_H_HB').setAttribute("tooltiptext","0% "+lang("cop"));
										gei('TWB_H_HB').setAttribute('hidden', false);
										gei('TWB_H_HB').setAttribute("label","0 of "+nb);
										// Setting up progress meter
										meter.caption=gei("TWB-GR1").getAttribute("tooltiptext");
										meter.label1="0 of "+nb;
										meter.value1=0;
										meter.label2=lang("cop");
										meter.value2=0;
										TWB_Popup();
										TWB_Init_Bulkx(0,rezina);
									}
									else{
										JI=prpt(lang("mxs1"),"1");
										if(JI!==null){
											gei('TWB_H_HB').setAttribute("tooltiptext","0% "+lang("cop"));
											gei('TWB_H_HB').setAttribute('hidden', false);
											gei('TWB_H_HB').setAttribute("label","0 of "+nb);
											// Setting up progress meter
											meter.caption=gei("TWB-GR1").getAttribute("tooltiptext");
											meter.label1="0 of "+nb;
											meter.value1=0;
											meter.label2=lang("cop");
											meter.value2=0;
											TWB_Popup();
											TWB_Init_Bulkx(0,rezina,JI);
										}
									}
								}
								else{
									pq(lang("uneq"),0);
								}
							}
							else{
								pq(lang("m6"));
							}
						}
						else{
							Engines.State.add_p("router2","TWB_Multi_Bulk()","*",true);
							TWB_GoTo("overview_villages","prod");
						}
					}
				}catch(e){log('Academy Bulk',e);}
			}
			else{
				$twb(TWB_Multi_Bulk);
			}
		}
	},
	TWB_Init_Bulkx : function(n,rezina,JO){
		with(twb_.lib){
			try{
				villas=cN(gei("TWB-Villages"));
				var inx="0";
				vil=villas[n].id;
				max=(typeof JO=="undefined")?rezina[n]:JO;
				if(typeof villas[n-(-1)]=="undefined"){
					TWB_Mint2(vil,0,max,"1",rezina,n,JO);
				}
				else{
					TWB_Mint2(vil,0,max,"0",rezina,n,JO);
				}
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_Mint2 : function(vil,x1,max,fina,rezina,n,JO){
		with(twb_.lib){
			try{
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=snob&action=coin&h="+local.TWB_H_COIN+local.sitterT;
				for(x1; max>x1; x1++){
					$.ajax({url:link,async: false});
					l=TWB_GA("TWB_H_HB").split(" of ");
					gei("TWB_H_HB").setAttribute("label",(l[0]-(-1))+" of "+l[1]);
					p=Math.round((l[0]-(-1))/l[1]*100)+"% "+lang("cop");
					gei("TWB_H_HB").setAttribute("tooltiptext",p);
					meter.label1=(l[0]-(-1))+" of "+l[1];
					meter.value1=Math.round((l[0]-(-1))/l[1]*100);
					meter.label2=lang("cop");
					meter.value2=Math.round((l[0]-(-1))/l[1]*100);
				}
				if(fina=="1"){
					url=TWB_URL();
					vil=url.match(/village=(\d+)/)[1];
					gei('TWB_H_HB').setAttribute('hidden', true);
					TWB_LoadVil(vil);
				}
				else{
					TWB_Init_Bulkx(n-(-1),rezina,JO);
				}
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_Store : function(y){
		with(twb_.lib){
			if(twb()){
				try{
					urlo=TWB_URL();
					vil=urlo.match(/village=(\d+)/);
					vil=(vil===null)?local.curVillage:vil[1];
					hxst=local.TWB_H_ST_COIN;
					if(hxst=="null"){
						if(TWB_Scr()=="snob"){
							link=TWB_GET_H_ST(y);
						}
						else{
							y=(typeof y=="undefined")?undefined:y;
							Engines.State.add_p("router","TWB_Store('"+y+"')","*",true);
							TWB_GoTo("snob");
						}
					}
					else{
						if(typeof y=="undefined"){
							if(local.curVillage!="null"){
								link="http://"+TWB_World()+"game.php?village="+vil+"&screen=snob&action=reserve&h="+hxst+local.sitterT;
								wood=$gei("wood").innerHTML;
								clay=$gei("stone").innerHTML;
								iron=$gei("iron").innerHTML;
								x3=iron/(25000*TWB_WorldSet("snob/factor"));
								x2=clay/(30000*TWB_WorldSet("snob/factor"));
								x1=wood/(28000*TWB_WorldSet("snob/factor"));
								x=Math.floor(sm(x1,sm(x2,x3)));
								if(x>0){
									topack="";
									while((topack>x || topack==="" || topack===null) && topack!="0"){
										topack=new Number(prpt(lang("px1")+x+lang("px2"),x));
									}
									if(topack>0){
										TWB_Store_X(link,topack);
									}
								}
								else{
									pq(lang("m6"));
								}
							}
							else{
								pq(lang("m3"),0);
							}
						}
						else{
							// Go back multi
							TWB_Multi_Store();
						}
					}
				}catch(e){log('Academy Bulk',e);}
			}
			else{
				$twb(TWB_Store);
			}
		}
	},
	TWB_Store_X : function(link,max){
		with(twb_.lib){
			try{
				params="factor="+max;
				xhr3=new XMLHttpRequest();
				xhr3.open("POST",link,true);
				xhr3.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr3.setRequestHeader("Content-length",params.length);
				xhr3.onreadystatechange=function(){
					if(xhr3.readyState==4 && xhr3.status==200){
						url=TWB_URL();
						vil=url.match(/village=(\d+)/)[1];
						TWB_LoadVil(vil);
					}
				};
				xhr3.send(params);
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_GET_H_ST : function(y){
		with(twb_.lib){
			try{
				to=$xp("//form[contains(@action,'action=reserve')]",9);
				if(typeof to!="undefined"){
					local.TWB_H_ST_COIN=to.action;
					TWB_Store(y);
				}
				else{
					pq(lang("m6"));
				}
				return local.TWB_H_ST_COIN;
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_Multi_Store : function(){
		with(twb_.lib){
			if(twb()){
				try{
					url=TWB_URL();
					hxzt=local.TWB_H_ST_COIN;
					rezina=new Array();
					if(hxzt=="null"){
						TWB_Store(0);
					}
					else{
						if(TWB_Scr()=="overview_villages"){
							zobda=win();
							NT=xp("//tr[contains(@class,'nowrap row')]/td[3]",6,zobda.document);
							nb=0;
							villies=0;
							for(i=0; i<NT.length; i++){
								ROW=NT[i].innerHTML.replace(/<span\sclass="grey">\.<\/span>/g,'').replace(/<span\sclass="warn">/g,'').replace(/<\/span>/g,'');
								wood=ROW.split(/graphic\/holz\.png/)[1].split(">")[2].split("<")[0];
								clay=ROW.split(/graphic\/lehm\.png/)[1].split(">")[2].split("<")[0];
								iron=ROW.split(/graphic\/eisen\.png/)[1].split(">")[2].split("<")[0];
								x3=iron/(25000*TWB_WorldSet("snob/factor"));
								x2=clay/(30000*TWB_WorldSet("snob/factor"));
								x1=wood/(28000*TWB_WorldSet("snob/factor"));
								x=Toint(sm(x1,sm(x2,x3)));
								rezina.push(x);
								nb=nb-(-x);
								if(nb>0){
									villies=villies-(-1);
								}
							}
							if(nb>0){
								if(cN((gei("TWB-Villages"))).length==rezina.length){
									if(cf(lang("p1x")+" "+nb+" "+lang("p2x")+"?"+"\n"+lang("xz2"))){
										gei('TWB_H_Z').setAttribute("tooltiptext","0% "+lang("cop"));
										gei('TWB_H_Z').setAttribute("label","0 of "+villies);
										// Setting up progress meter
										meter.caption=gei("TWB-GR1").getAttribute("tooltiptext");
										meter.label1="0 of "+villies;
										meter.value1=0;
										meter.label2=lang("cop");
										meter.value2=0;
										TWB_Popup();
										TWB_Init_Storex(0,rezina);
									}
									else{
										JI=prpt(lang("mxs1"),"1");
										if(JI!==null){
											gei('TWB_H_Z').setAttribute("tooltiptext","0% "+lang("cop"));
											gei('TWB_H_Z').setAttribute('hidden', false);
											gei('TWB_H_Z').setAttribute("label","0 of "+villies);
											// Setting up progress meter
											meter.caption=gei("TWB-GR1").getAttribute("tooltiptext");
											meter.label1="0 of "+villies;
											meter.value1=0;
											meter.label2=lang("cop");
											meter.value2=0;
											TWB_Popup();
											TWB_Init_Storex(0,rezina,JI);
										}
									}
								}
								else{
									pq(lang("uneq"),0);
								}
							}
							else{
								pq(lang("m6"));
							}
						}
						else{
							Engines.State.add_p("router2","TWB_Multi_Store()","*",true);
							TWB_GoTo("overview_villages","prod");
						}
					}
				}catch(e){log('Academy Bulk',e);}
			}
			else{
				$twb(TWB_Multi_Store);
			}
		}
	},
	TWB_Init_Storex : function(n,rezina,JQ){
		with(twb_.lib){
			try{
				villas=cN(gei("TWB-Villages"));
				var inx="0";
				vil=villas[n].id;
				max=(typeof JQ=="undefined")?rezina[n]:JQ;
				if(typeof villas[n-(-1)]=="undefined"){
					TWB_Store_X2(vil,max,"1",rezina,n,JQ);
				}
				else{
					TWB_Store_X2(vil,max,"0",rezina,n,JQ);
				}
			}catch(e){log('Academy Bulk',e);}
		}
	},
	TWB_Store_X2 : function(vil,max,fina,rezina,n,JQ){
		with(twb_.lib){
			try{
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=snob&action=reserve&h="+local.TWB_H_ST_COIN+local.sitterT;
				params="factor="+max;
				xhr3= new XMLHttpRequest();
				xhr3.open("POST", link, true);
				xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr3.setRequestHeader("Content-length", params.length);
				xhr3.onreadystatechange=function(){
					if(xhr3.readyState==4 && xhr3.status==200){
						l=gei('TWB_H_Z').getAttribute('label').split(" of ");
						gei('TWB_H_Z').setAttribute("label",(l[0]-(-1))+" of "+l[1]);
						p=Math.round((l[0]-(-1))/l[1]*100)+"% "+lang("cop");
						gei('TWB_H_Z').setAttribute("tooltiptext",p);
						meter.label1=(l[0]-(-1))+" of "+l[1];
						meter.value1=Math.round((l[0]-(-1))/l[1]*100);
						meter.label2=lang("cop");
						meter.value2=Math.round((l[0]-(-1))/l[1]*100);
						if(fina=="1"){
							gei('TWB_H_Z').setAttribute('hidden', true);
							url=TWB_URL();
							vil=url.match(/village=(\d+)/)[1];
							TWB_LoadVil(vil);
						}
						else{
							TWB_Init_Storex(n-(-1),rezina,JQ);
						}
					}
				};
				xhr3.send(params);
			}catch(e){log('Academy Bulk',e);}
		}
	},
	Toint : function(x){
		x=x+" ";
		if(x.match(/\./)){
			x=x.split(".")[0].replace(" ","");
		}
		return x;
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-GR1")==null){
				// Add Buttons:
				B1=BTN("toolbarbutton",{disabled:"true",id:"TWB-GR1",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-Golds"},B1);
				B3=BTN("menuitem",{id:"TWB-MS1",label:"Single Mint/Store",oncommand:"try{twb_.lib.TWB_CP(0);}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{id:"TWB-MS2",label:"Multi Mint/Store",oncommand:"try{twb_.lib.TWB_CP(1);}catch(e){twb_.lib.log('Main',e);}"},B2);
				B5=BTN("menuitem",{id:"TWB-MS3",label:"Group Mint/Store",oncommand:"try{twb_.lib.TWB_GRP_CP();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B6=BTN("toolbarbutton",{disabled:"true",id:"TWB_H_BH",label:"0",type:"button",hidden:true});
				B7=BTN("toolbarbutton",{disabled:"true",id:"TWB_H_HB",label:"0",type:"button",hidden:true});
				B8=BTN("toolbarbutton",{disabled:"true",id:"TWB_H_Z",label:"0",type:"button",hidden:true});
			}
		}
	}
});
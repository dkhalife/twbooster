// @Plugin = Queues Counter
// @Version = 1.5
// @Icons = 0
merge(twb_.lib,{
	TWB_Calc_Q : function(){
		with(twb_.lib){
			if($gei("qcounter")){
				return;
			}
		
			switch(TWB_Scr(TWB_URL(1))){
				case "barracks" : TWB_Calc_Bar(); break;
				case "stable" : TWB_Calc_Sta(); break;
				case "garage" : TWB_Calc_Wor(); break;
				case "market" : TWB_Calc_Mar(); break;
				case "train" : TWB_Calc_Mass(); break;
				default : break;
			}
		}
	},
	TWB_Calc_Bar : function(){
		with(twb_.lib){
			try{
				tmp={spear:0,sword:0,axe:0,archer:0};
				cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				for(p=0; p<cells.length; p++){
					cell=cells[p].parentNode.parentNode.childNodes[1];
					type=cell.innerHTML.replace(/\d+\s/,'');
					count=cell.innerHTML.match(/\d+/)[0];
					if(type.match(lang("uni1").substr(0,4))){
						TWB_U_Add(tmp,"spear",count);
					}
					if(type.match(lang("uni2").substr(0,4))){
						TWB_U_Add(tmp,"sword",count);	
					}
					if(type.match(lang("uni3").substr(0,4))){
						TWB_U_Add(tmp,"axe",count);
					}
					if(type.match(lang("uni4").substr(0,4))){
						TWB_U_Add(tmp,"archer",count);
					}
				}
				TWB_Q_Show(tmp);
				delete tmp;
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Calc_Sta : function(){
		with(twb_.lib){
			try{
				tmp={spy:0,light:0,marcher:0,heavy:0};
				cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				for(p=0; p<cells.length; p++){
					cell=cells[p].parentNode.parentNode.childNodes[1];
					type=cell.innerHTML.replace(/\d+\s/,'');
					count=cell.innerHTML.match(/\d+/)[0];
					if(type.match(lang("uni5").substr(0,4))){
						TWB_U_Add(tmp,"spy",count);
					}
					if(type.match(lang("uni6").substr(0,4))){
						TWB_U_Add(tmp,"light",count);	
					}
					if(type.match(lang("uni7").substr(0,4))){
						TWB_U_Add(tmp,"marcher",count);
					}
					if(type.match(lang("uni8").substr(0,4))){
						TWB_U_Add(tmp,"heavy",count);
					}
				}
				TWB_Q_Show(tmp);
				delete tmp;
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Calc_Wor : function(){
		with(twb_.lib){
			try{
				tmp={ram:0,catapult:0};
				cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				for(p=0; p<cells.length; p++){
					cell=cells[p].parentNode.parentNode.childNodes[1];
					type=cell.innerHTML.replace(/\d+\s/,'');
					count=cell.innerHTML.match(/\d+/)[0];
					if(type.match(lang("uni9").substr(0,4))){
						TWB_U_Add(tmp,"ram",count);
					}
					if(type.match(lang("uni10").substr(0,4))){
						TWB_U_Add(tmp,"catapult",count);	
					}
				}
				TWB_Q_Show(tmp);
				delete tmp;
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Q_Show : function(T){
		with(twb_.lib){
			try{
				test=false;
				for(I in T){
					if(T[I]>0){
						test=true;
					}
				}
				if(test){
					WIN=win();
					if(typeof WIN!="undefined"){
						// Bypass security warning
						if(WIN.wrappedJSObject){
							WIN=WIN.wrappedJSObject;
						}
						// At least one is being trained
						TABLE=dce("table",WIN);
						TABLE.className="vis";
						TABLE.id="qcounter";
						TABLE.innerHTML='<tbody><tr><th width="150">'+lang("TWB-Unit")+'</th><th width="120">'+lang("total")+'</th><th width="120">'+lang("total")+' + '+lang("inside")+'</th></tr>';
						for(I in T){
							if(T[I]>0){
								IMG="<img src='http://"+TWB_World()+"graphic/unit/unit_"+I+".png'>";
								CT=$xp("//tr[contains(@class,'row_')]//img[contains(@src,'"+I+"')]",9,twb_.pWIN.document).parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split("/")[1];
								TT=T[I]-(-CT);
								TABLE.innerHTML+='<tr><td align=center>'+IMG+'</td><td align=center>'+T[I]+'</td><td align=center>'+TT+'</td></tr>';
							}
						}
						TABLE.innerHTML+='</tbody>';
						FORM=$xp("//form",9,twb_.pWIN.document);
						FORM.parentNode.insertBefore(TABLE,FORM);
						BR=dce("br",WIN);
						FORM.parentNode.insertBefore(BR,FORM);
					}
				}
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Calc_Mar : function(){
		with(twb_.lib){
			try{
				if(TWB_Mode()=="send" || TWB_Mode()==null){
					// Get current resources
					wood=$gei("wood").innerHTML;
					stone=$gei("stone").innerHTML;
					iron=$gei("iron").innerHTML;
					// Count resources incoming
					trans=$xp("//table[@class='vis']/tbody/tr/td[2]",6,twb_.pWIN.document);
					res=[0,0,0];
					for(i=1; i<trans.length; i++){
						if(trans[i].parentNode.childNodes.length==9){
							R=trans[i].innerHTML.replace(/<span\sclass="grey">\.<\/span>/g,'');
							m1=R.match("graphic/holz.png");
							m2=R.match("graphic/lehm.png");
							m3=R.match("graphic/eisen.png");
							if(m1){
								res[0]-=-R.split(/graphic\/holz\.png/)[1].split(">")[1].split("<")[0];
							}
							if(m2){
								res[1]-=-R.split(/graphic\/lehm\.png/)[1].split(">")[1].split("<")[0];
							}
							if(m3){
								res[2]-=-R.split(/graphic\/eisen\.png/)[1].split(">")[1].split("<")[0];
							}
						}
					}
					// Total
					wood-=-res[0];
					stone-=-res[1];
					iron-=-res[2];
					// Only show if there is any incoming trans
					if(res[0]>0 || res[1]>0 || res[2]>0){
						res0=res[0];
						res1=res[1];
						res2=res[2];
						// Make Ks
						if(wood>=1000){
							wood1=Math.floor(wood/1000); wood2=String(wood-wood1*1000); while(wood2.length<3){ wood2+="0"; }
							wood=wood1+'<span class="grey">.</span>'+wood2;
						}
						if(stone>=1000){
							stone1=Math.floor(stone/1000); stone2=String(stone-stone1*1000); while(stone2.length<3){ stone2+="0"; }
							stone=stone1+'<span class="grey">.</span>'+stone2;
						}
						if(iron>=1000){
							iron1=Math.floor(iron/1000); iron2=String(iron-iron1*1000); while(iron2.length<3){ iron2+="0"; }
							iron=iron1+'<span class="grey">.</span>'+iron2;
						}
						if(res[0]>=1000){
							res01=Math.floor(res[0]/1000); res02=String(res[0]-res01*1000); while(res02.length<3){ res02+="0"; }
							res0=res01+'<span class="grey">.</span>'+res02;
						}
						if(res[1]>=1000){
							res11=Math.floor(res[1]/1000); res12=String(res[1]-res11*1000); while(res12.length<3){ res12+="0"; }
							res1=res11+'<span class="grey">.</span>'+res12;
						}
						if(res[2]>=1000){
							res21=Math.floor(res[2]/1000); res22=String(res[2]-res21*1000); while(res22.length<3){ res22+="0"; }
							res2=res21+'<span class="grey">.</span>'+res22;
						}
						// max
						MAX=$gei("storage").textContent.replace(/\s/g,'');
						wood=wood>=MAX?"<span class=warn>"+wood+"</span>":wood;
						stone=stone>=MAX?"<span class=warn>"+stone+"</span>":stone;
						iron=iron>=MAX?"<span class=warn>"+iron+"</span>":iron;
						WIN=win();
						if(WIN.wrappedJSObject){
							WIN=WIN.wrappedJSObject;
						}
						// At least one is being trained
						TABLE=dce("table",WIN);
						TABLE.className="vis";
						TABLE.innerHTML='<tbody><tr><th></th><th><img src="/graphic/holz.png?1"></th><th><img src="/graphic/lehm.png?1"></th><th><img src="/graphic/eisen.png?1"></th></tr>';
						TABLE.innerHTML+='<tr><th>'+lang('incm')+'</th><td align=center>'+res0+'</td><td align=center>'+res1+'</td><td align=center>'+res2+'</td></tr>';
						TABLE.innerHTML+='<tr><th>'+lang('total')+'</th><td align=center>'+wood+'</td><td align=center>'+stone+'</td><td align=center>'+iron+'</td></tr>';
						TABLE.innerHTML+='</tbody>';
						FORM=$xp("//h3",6,twb_.pWIN.document)[1];
						H3=dce("h3",WIN);
						H3.innerHTML=lang("qsum");
						FORM.parentNode.appendChild(H3);
						FORM.parentNode.appendChild(TABLE);
					}
				}
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Calc_Mass : function(){
		with(twb_.lib){
			try{
				if(TWB_Mode()=="train" || TWB_Mode()==null){
					tmp={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,heavy:0,marcher:0,ram:0,catapult:0};
					cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
					for(p=0; p<cells.length; p++){
						cell=cells[p].parentNode.parentNode.childNodes[1];
						type=cell.innerHTML.replace(/\d+\s/,'');
						count=cell.innerHTML.match(/\d+/)[0];
						if(type.match(lang("uni1").substr(0,4))){
							TWB_U_Add(tmp,"spear",count);
						}
						if(type.match(lang("uni2").substr(0,4))){
							TWB_U_Add(tmp,"sword",count);	
						}
						if(type.match(lang("uni3").substr(0,4))){
							TWB_U_Add(tmp,"axe",count);
						}
						if(type.match(lang("uni4").substr(0,4))){
							TWB_U_Add(tmp,"archer",count);
						}
						if(type.match(lang("uni5").substr(0,4))){
							TWB_U_Add(tmp,"spy",count);
						}
						if(type.match(lang("uni6").substr(0,4))){
							TWB_U_Add(tmp,"light",count);	
						}
						if(type.match(lang("uni7").substr(0,4))){
							TWB_U_Add(tmp,"marcher",count);
						}
						if(type.match(lang("uni8").substr(0,4))){
							TWB_U_Add(tmp,"heavy",count);
						}
						if(type.match(lang("uni9").substr(0,4))){
							TWB_U_Add(tmp,"ram",count);
						}
						if(type.match(lang("uni10").substr(0,4))){
							TWB_U_Add(tmp,"catapult",count);	
						}
					}
					TWB_Q_Show(tmp);
					delete tmp;
				}
			}catch(e){log('Queues Counter',e);}
		}
	},
	// MAP VERSION
	TWB_Calc_MarV2 : function(vil){
		with(twb_.lib){
			try{
				// Show loading 
				WIN=win();
				if(WIN.wrappedJSObject){
					WIN=WIN.wrappedJSObject;
				}
				H=$xp("//h2",9,WIN.document);
				H.innerHTML+='<img width="18" src="graphic/throbber.gif" id="load-">';
				// Call it
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=market&mode=send";
				$.ajax({url:link,async:true,success:function(dataG){
					// Get current resources
					wood=dataG.match(/span id="wood".+>(\d+)<\//)[1];
					stone=dataG.match(/span id="stone".+>(\d+)<\//)[1];
					iron=dataG.match(/span id="iron".+>(\d+)<\//)[1];
					MAX=dataG.split('<td id="storage">')[1].split("</td>")[0];
					res=[0,0,0];
					// Count resources incoming
					try{
						trans=dataG.split(/setImageTitles/)[1].split("</table>")[0].split("<table")[1].split("<tr");					
						for(z=2; z<trans.length; z++){
							// If we don't have the right number of TDs lets skip
							if(trans[z].match(/<td>/g).length!=4){
								continue;
							}
							R=trans[z].split("<td>")[2].replace(/<span\sclass="grey">\.<\/span>/g,'');
							m1=R.match("graphic/holz.png");
							m2=R.match("graphic/lehm.png");
							m3=R.match("graphic/eisen.png");
							if(m1){
								res[0]-=-R.split(/graphic\/holz\.png/)[1].split(">")[1].split("<")[0];
							}
							if(m2){
								res[1]-=-R.split(/graphic\/lehm\.png/)[1].split(">")[1].split("<")[0];
							}
							if(m3){
								res[2]-=-R.split(/graphic\/eisen\.png/)[1].split(">")[1].split("<")[0];
							}
						}
						TWB_Show_MarV2(wood,stone,iron,res,MAX);
					}catch(e){
						TWB_Show_MarV2(wood,stone,iron,res,MAX);
					}
				}});
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Show_MarV2 : function(wood,stone,iron,res,MAX){
		with(twb_.lib){
			try{
				// Total
				wood-=-res[0];
				stone-=-res[1];
				iron-=-res[2];
				if(res[0]>0 || res[1]>0 || res[2]>0){
					res0=res[0];
					res1=res[1];
					res2=res[2];
					// Make Ks
					if(wood>=1000){
						wood1=Math.floor(wood/1000); wood2=String(wood-wood1*1000); while(wood2.length<3){ wood2+="0"; }
						wood=wood1+'<span class="grey">.</span>'+wood2;
					}
					if(stone>=1000){
						stone1=Math.floor(stone/1000); stone2=String(stone-stone1*1000); while(stone2.length<3){ stone2+="0"; }
						stone=stone1+'<span class="grey">.</span>'+stone2;
					}
					if(iron>=1000){
						iron1=Math.floor(iron/1000); iron2=String(iron-iron1*1000); while(iron2.length<3){ iron2+="0"; }
						iron=iron1+'<span class="grey">.</span>'+iron2;
					}
					if(res[0]>=1000){
						res01=Math.floor(res[0]/1000); res02=String(res[0]-res01*1000); while(res02.length<3){ res02+="0"; }
						res0=res01+'<span class="grey">.</span>'+res02;
					}
					if(res[1]>=1000){
						res11=Math.floor(res[1]/1000); res12=String(res[1]-res11*1000); while(res12.length<3){ res12+="0"; }
						res1=res11+'<span class="grey">.</span>'+res12;
					}
					if(res[2]>=1000){
						res21=Math.floor(res[2]/1000); res22=String(res[2]-res21*1000); while(res22.length<3){ res22+="0"; }
						res2=res21+'<span class="grey">.</span>'+res22;
					}
					// max
					wood=wood>=MAX?"<span class=warn>"+wood+"</span>":wood;
					stone=stone>=MAX?"<span class=warn>"+stone+"</span>":stone;
					iron=iron>=MAX?"<span class=warn>"+iron+"</span>":iron;
				}
				else{
					// Zero
					res0=res1=res2=0;
				}
				WIN=win();
				if(WIN.wrappedJSObject){
					WIN=WIN.wrappedJSObject;
				}
				TABLE=dce("table",WIN);
				TABLE.id="rcount";
				TABLE.className="vis";
				TABLE.innerHTML='<tbody><tr><th></th><th><img src="/graphic/holz.png?1"></th><th><img src="/graphic/lehm.png?1"></th><th><img src="/graphic/eisen.png?1"></th></tr>';
				TABLE.innerHTML+='<tr><th>'+lang('incm')+'</th><td align=center>'+res0+'</td><td align=center>'+res1+'</td><td align=center>'+res2+'</td></tr>';
				TABLE.innerHTML+='<tr><th>'+lang('total')+'</th><td align=center>'+wood+'</td><td align=center>'+stone+'</td><td align=center>'+iron+'</td></tr>';
				TABLE.innerHTML+='</tbody>';
				H3=dce("h3",WIN);
				H3.innerHTML=lang("qsum");
				D=WIN.document;
				// Remove Previous
				try{
					rem=$xp("//*[@id='load-']",9,D);
					rem.parentNode.removeChild(rem);
					rem=$xp("//*[@id='map_big']/h3",9,D);
					rem.parentNode.removeChild(rem);
					rem=$xp("//*[@id='rcount']",9,D);
					rem.parentNode.removeChild(rem);
				}catch(e){}
				// Append both items to map !
				cont=gei("map_big",D);
				befo=$xp("//*[@id='map_big']/script",9,D);
				cont.insertBefore(H3,befo);
				cont.insertBefore(TABLE,befo);
			}catch(e){log('Queues Counter',e);}
		}
	},
	TWB_Calc_Q_Map : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()!="map"){
					return;
				}
			
				WIN=win();
				if(WIN.wrappedJSObject){
					WIN=WIN.wrappedJSObject;
				}
				if(typeof WIN.Map=="undefined"){
					return;
				}
				if(WIN.map_setup){
					return;
				}
				WIN.map_setup=true;
				CHANG="CC=title.match(/\\d+\\|\\d+/)[0];CC_=cN(gei('TWB-Villages'));for(g=0; g<CC_.length; g++){if(CC_[g].getAttribute('tooltiptext').match(/\\d+\\|\\d+/)[0]==CC){TWB_Calc_MarV2(CC_[g].id);break;}}";
				OLD=new String(WIN.Map.map_popup).split("max_loot, newbie_protect) {")[1];
				OLD=OLD.substr(0,OLD.length-1);
				eval("WIN.Map.map_popup=function (event, title, bonus_image, bonus_text, points, owner, ally, reserved_by, reserved_till, village_groups, moral, id, url, last_attack_date, last_attack_dot, last_attack_max_loot, newbie_protect) {with(WIN){"+OLD+"}\n"+CHANG+"}");
				delete OLD;
				delete CHANG;
			}catch(e){log('Queues Counter',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.qcalc=="undefined"){
				Engines.State.add_p("qcalc","TWB_Calc_Q()","*",false);
				// Bind new method to look for mouse over village
				Engines.State.add_p("qcalc_map","TWB_Calc_Q_Map()","*",false);
			}
		}
	}
});
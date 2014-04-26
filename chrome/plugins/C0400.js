// @Plugin = TWB BOTs
// @Version = 2.1
// @Icons = gr2
merge(twb_.lib,{
	TWB_Market_Fil : function(zop){
		with(twb_.lib){
			if(twb()){
				try{
					ifto=$get_var("tmat");
					scr=TWB_Scr();
					mde=TWB_Mode();
					if(scr=="market" && mde=="own_offer"){
						if((ifto=="1o" && zop=="1") || (ifto=="0o" && zop=="0")){
							$xp("//input[@type='text']",6)[0].value=$get_var("offer");
							$xp("//input[@type='text']",6)[1].value=$get_var("forx");
							$xp("//input[@type='text']",6)[2].value=$get_var("dur");
						}
					}
					else{
						if(zop=="0"){
							Engines.State.add_p("router","TWB_Market_Fil('"+zop+"')","*",true);
							TWB_GoTo("market","own_offer");
						}
					}
				}catch(e){log('TWBBot',e);}
			}
			else{
				if(zop=="0"){
					$twb(function(){TWB_Market_Fil(zop);});
				}
			}
		}
	},
	TWB_Start_Equi : function(sil){
		with(twb_.lib){
			if(twb()){
				if(cN(gei("TWB-Villages")).length>0){
					per=(typeof twb_.per=="undefined")?prpt(lang("wlimit"),"50%").match(/\d+/)[0]:twb_.per;
					if(per){
						rat=(typeof twb_.rat=="undefined")?prpt(lang("roffer"),"1"):twb_.rat;
						if(rat){
							twb_.per=per;
							twb_.rat=rat;
							if(typeof Engines.State.processes.mbot=="undefined"){Engines.State.add_p("mbot","TWB_Equi_Res()","*",false);}
							local.curVillage=(typeof sil=="undefined")?cN(gei("TWB-Villages"),0).getAttribute("id"):sil;
							link="http://"+TWB_World()+"game.php?village="+local.curVillage+"&screen=market&mode=own_offer";
							TWB_Mast_Url(link);
						}
					}
				}
				else{
					pq(lang("m3"),0);
				}
			}
			else{
				$twb(TWB_Start_Equi);
			}
		}
	},
	TWB_Equi_Res : function(){
		with(twb_.lib){
			try{
				scr=TWB_Scr();
				mde=TWB_Mode();
				if(scr=="market" && mde=="own_offer"){
					DEL=$xp("//html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr/th[2]",9);
					if(DEL && typeof twb_.offers=="undefined"){
						// Get current res
						wood=new Number($gei("wood").innerHTML.replace(/<span class="\w+"><\/span>/,""));
						clay=new Number($gei("stone").innerHTML.replace(/<span class="\w+"><\/span>/,""));
						iron=new Number($gei("iron").innerHTML.replace(/<span class="\w+"><\/span>/,""));
						war=new Number($gei("storage").innerHTML.replace(/<span class="\w+"><\/span>/,""));
						// Get max rounded to 1000s
						mea=Math.round(((war*twb_.per)/100)/1000)*1000;
						// Deviations from max
						dev1=Math.floor((wood-mea)/1000)*1000;
						dev2=Math.floor((clay-mea)/1000)*1000;
						dev3=Math.floor((iron-mea)/1000)*1000;
						// Total resources to get rid of + how much can make in offer
						tot=0;
						tot=(dev1>0)?tot-(-dev1):tot;
						tot=(dev2>0)?tot-(-dev2):tot;
						tot=(dev3>0)?tot-(-dev3):tot;
						trans=DEL.innerHTML.match(/\d+/)[0];
						// Save offers so that next loop won't redo again
						twb_.offers=new Array();
						if(tot<trans){
							if(dev1>0){twb_.offers.push(dev1);}else{twb_.offers.push("");}
							if(dev2>0){twb_.offers.push(dev2);}else{twb_.offers.push("");}
							if(dev3>0){twb_.offers.push(dev3);}else{twb_.offers.push("");}
							TWB_Sub_Offer(wood,clay,iron,dev1,dev2,dev3);
						}
						else{
							dev=Math.floor(trans/3000)*1000;
							if(dev>0){
								if(dev1>0){twb_.offers.push(dev);}else{twb_.offers.push("");}
								if(dev2>0){twb_.offers.push(dev);}else{twb_.offers.push("");}
								if(dev3>0){twb_.offers.push(dev);}else{twb_.offers.push("");}
								TWB_Sub_Offer(wood,clay,iron,dev1,dev2,dev3);
							}
							else{
								TWB_Res_Next(wood,clay,iron,dev1,dev2,dev3);
							}
						}
					}
					else{
						if(DEL){
							// Check for remaining array elements OR DELETE + Next
							TWB_Sub_Offer(wood,clay,iron,dev1,dev2,dev3);
						}
						else{
							TWB_Res_Next();
						}
					}
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Sub_Offer : function(wood,clay,iron,dev1,dev2,dev3){
		with(twb_.lib){
			try{
				n=0;
				while(n<3 && twb_.offers[n]==""){ n++; }
				if(typeof twb_.offers[n]!="undefined" && (twb_.offers[n]+"").match(/\d+/)){
					// index is for resource
					offer=twb_.offers[n];
					nbroffer=Math.round(offer/1000);
					offer=Math.round((offer/nbroffer)/100)*100;
					forre=Math.round((offer*twb_.rat)/100)*100;
					$xp("//input[@type='text']",6)[0].value=offer;
					$xp("//input[@type='text']",6)[1].value=forre;
					$xp("//input[@type='text']",6)[2].value=$get_var("dur");
					$xp("//input[@type='text']",6)[3].value=nbroffer;
					// Select Radio
					of=(n==0)?"wood":(n==1)?"stone":"iron";
					sma=(n==0)?sm(clay,iron):(n==1)?sm(wood,iron):sm(wood,clay);
					to=(sma==clay)?"stone":(sma==iron)?"iron":"wood";
					$gei("res_sell_"+of).checked=true;
					$gei("res_buy_"+to).checked=true;
					twb_.offers[n]="";
					$xp("//input[@type='submit']",9).click();
				}
				else{
					TWB_Res_Next();
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Res_Next : function(){
		with(twb_.lib){
			try{
				delete twb_.offers;
				next=gei(local.curVillage).nextSibling;
				if(next){
					TWB_Start_Equi(next.getAttribute("id"));
				}
				else{
					delete twb_.per;
					delete twb_.rat;
					Engines.State.kill_p("mbot");
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Start_Equi2 : function(sil){
		with(twb_.lib){
			if(twb()){
				if(cN(gei("TWB-Villages")).length>0){
					per=(typeof twb_.per=="undefined")?prpt(lang("wlimit"),"50%").match(/\d+/)[0]:twb_.per;
					if(per){
						twb_.per=per;
						if(typeof Engines.State.processes.abot=="undefined"){Engines.State.add_p("abot","TWB_Equi_Res2()","*",false);}
						local.curVillage=(typeof sil=="undefined")?cN(gei("TWB-Villages"),0).getAttribute("id"):sil;
						link="http://"+TWB_World()+"game.php?village="+local.curVillage+"&screen=market&mode=send";
						TWB_Mast_Url(link);
					}
				}
				else{
					pq(lang("m3"),0);
				}
			}
			else{
				$twb(TWB_Start_Equi);
			}
		}
	},
	TWB_Equi_Res2 : function(){
		with(twb_.lib){
			try{
				scr=TWB_Scr();
				mde=TWB_Mode();
				if(scr=="market" && mde=="send"){
					DEL=$xp("//html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr/th[2]",9);
					if(DEL && typeof twb_.sends=="undefined"){
						// If no academy in village
						if(data.buildings && data.buildings[local.curVillage] && (typeof data.buildings[local.curVillage].snob=="undefined" || data.buildings[local.curVillage].snob==0)){
							// Get current res
							wood=new Number($gei("wood").innerHTML.replace(/<span class="\w+"><\/span>/,""));
							clay=new Number($gei("stone").innerHTML.replace(/<span class="\w+"><\/span>/,""));
							iron=new Number($gei("iron").innerHTML.replace(/<span class="\w+"><\/span>/,""));
							war=new Number($gei("storage").innerHTML.replace(/<span class="\w+"><\/span>/,""));
							// Get max rounded to 1000s
							mea=Math.round((war*(twb_.per/100))/1000)*1000;
							// Deviations from max
							dev1=Math.floor((wood-mea)/1000)*1000;
							dev2=Math.floor((clay-mea)/1000)*1000;
							dev3=Math.floor((iron-mea)/1000)*1000;
							// Total resources to get rid of + how much can make in offer
							tot=0;
							tot=(dev1>0)?tot-(-dev1):tot;
							tot=(dev2>0)?tot-(-dev2):tot;
							tot=(dev3>0)?tot-(-dev3):tot;
							trans=DEL.innerHTML.match(/\d+/)[0];
							// Save offers so that next loop won't redo again
							twb_.sends=new Array();
							if(tot<trans){
								if(dev1>0){twb_.sends.push(dev1);}else{twb_.sends.push("");}
								if(dev2>0){twb_.sends.push(dev2);}else{twb_.sends.push("");}
								if(dev3>0){twb_.sends.push(dev3);}else{twb_.sends.push("");}
								TWB_Sub_Send();
							}
							else{
								dev=Math.floor(trans/3000)*1000;
								if(dev>0){
									if(dev1>0){twb_.sends.push(dev);}else{twb_.sends.push("");}
									if(dev2>0){twb_.sends.push(dev);}else{twb_.sends.push("");}
									if(dev3>0){twb_.sends.push(dev);}else{twb_.sends.push("");}
									TWB_Sub_Send();
								}
								else{
									TWB_Res_Next2();
								}
							}
						}
						else{
							TWB_Res_Next2();
						}
					}
					else{
						if(DEL && DEL.innerHTML.match(/\d+/)[0]>0){
							// Check for remaining array elements OR DELETE + Next
							TWB_Sub_Send();
						}
						else{
							TWB_Res_Next2();
						}
					}
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Sub_Send : function(){
		with(twb_.lib){
			try{
				test=false;
				for(o=0; o<twb_.sends.length; o++){
					if(twb_.sends[o]>0){
						test=true;
						break;
					}
				}
				if(test){
					$xp("//input[@name='wood']",9).value=twb_.sends[0];
					$xp("//input[@name='stone']",9).value=twb_.sends[1];
					$xp("//input[@name='iron']",9).value=twb_.sends[2];
					// Nearest Vil
					curXY=gei(local.curVillage).getAttribute("tooltiptext").match(/\d+/g);
					C=cN(gei("TWB-Villages"));
					distance=9999999;
					nearest="";
					for(i=0; i<C.length; i++){
						locXY=C[i].getAttribute("tooltiptext").match(/\d+/g);
						dist=Math.sqrt(Math.pow(locXY[0]-curXY[0],2)+Math.pow(locXY[1]-curXY[1],2));
						if(dist<distance && dist>0){
							distance=dist;
							nearest=[locXY[0],locXY[1]];
						}
					}
					twb_.sends[o]="";
					$xp("//*[@id='inputx']",9).value=nearest[0];
					$xp("//*[@id='inputy']",9).value=nearest[1];
					$xp("//*[@type='submit']",9).click();
				}
				else{
					TWB_Res_Next2();
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Res_Next2 : function(){
		with(twb_.lib){
			try{
				delete twb_.sends;
				next=gei(local.curVillage).nextSibling;
				if(next){
					TWB_Start_Equi2(next.getAttribute("id"));
				}
				else{
					delete twb_.per;
					Engines.State.kill_p("abot");
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	
	TWB_Start_Equi3 : function(){
		with(twb_.lib){
			selection=TWB_RMCMD();
			if(selection){
				if($get_var("skiptry")!="true"){
					local.skined=true;
				}
				// Meter
				meter.caption=lang("TWB-RBot");
				meter.label1=lang("total");
				meter.value1=0;
				meter.label2=lang("total");
				meter.value2=0;
				TWB_Popup(TWB_Kill_Res3);
				twb_.selection=selection;
				twb_.selection_=selection.length;
				Engines.State.add_p("ebot","TWB_Equi_Res3()","*",false);
				TWB_GoTo("market","send");
			}
		}
	},	
	TWB_Equi_Res3 : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="market" && (TWB_Mode()=="send" || TWB_Mode()===null)){
					if(TWB_URL().match("try=confirm")===null){
						YT=twb_.selection[0];
						if(typeof YT!="undefined"){
							// Vil check
							if(YT.from==local.curVillage){
								// Delete first
								twb_.selection.splice(0,1);
								// Coords
								to=getC(gei(YT.to).getAttribute("tooltiptext"));
								$xp("//*[@id='inputx']",9,twb_.pWIN.document).value=to[0];
								$xp("//*[@id='inputy']",9,twb_.pWIN.document).value=to[1];
								// Available 
								MER=$xp("//table[@class='main']//table[@class='vis']/tbody/tr/th",9,twb_.pWIN.document).innerHTML.match(/\d+/)[0];
								WOOD=$xp("//a[contains(@href,'.wood')]",9,twb_.pWIN.document).href.split("%20")[1].replace(")","");
								CLAY=$xp("//a[contains(@href,'.stone')]",9,twb_.pWIN.document).href.split("%20")[1].replace(")","");
								IRON=$xp("//a[contains(@href,'.iron')]",9,twb_.pWIN.document).href.split("%20")[1].replace(")","");
								// Wanted
								wood_=sm(YT.res[0],MER*1000);
								clay_=sm(YT.res[1],MER*1000);
								iron_=sm(YT.res[2],MER*1000);
								// Total merchs needed
								tot=wood_-(-clay_)-(-iron_);
								tot=Math.ceil(tot/1000);
								// Do calcs, if OK send, otherwise recall this function
								if(tot<=MER){
									$xp("//*[@name='wood']",9,twb_.pWIN.document).value=wood_;
									$xp("//*[@name='stone']",9,twb_.pWIN.document).value=clay_;
									$xp("//*[@name='iron']",9,twb_.pWIN.document).value=iron_;
									$xp("//*[@type='submit']",9,twb_.pWIN.document).click();
								}
								else{
									TWB_Equi_Res3();
								}
							}
							else{
								TWB_LoadVil(YT.from);
							}
						}
						else{
							TWB_Kill_Res3();
						}
					}
					else{
						// Increase
						per=Math.round(100*(twb_.selection_-twb_.selection.length)/twb_.selection_);
						meter.value1=meter.value2=per;
					}
				}
				else{
					TWB_GoTo("market","send");
				}
			}catch(e){log('TWBBot',e)}
		}
	},
	TWB_Kill_Res3 : function(){
		with(twb_.lib){
			delete twb_.selection;
			if($get_var("skiptry")!="true"){
				local.skined=false;
			}
			meter.value2=100;
			Engines.State.kill_p("ebot");
		}
	},
	TWB_Find_Me_Resources : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if($get_var("skiptry")!="true"){
						local.skined=true;
					}
					// Redirect to info_village in order to sort
					vil=local.curVillage;
					Engines.State.add_p("fmres","TWB_FMRES()","*",true);
					TWB_Mast_Url(TWB_URL().replace(TWB_Scr(),"info_village")+"&id="+vil);
				}catch(e){log('TWBBot',e);}
			}
			else{
				$twb(TWB_Find_Me_Res);
			}
		}
	},
	TWB_FMRES : function(){
		with(twb_.lib){
			try{
				// Start by sorting villagelist
				TWB_Filter_Dist();
				C=cN(gei("TWB-Villages"));
				D=data.units;
				B=data.buildings;
				// Grab current res
				wood=$xp("//*[@id='wood']",9).innerHTML.match(/\d+/)[0];
				clay=$xp("//*[@id='stone']",9).innerHTML.match(/\d+/)[0];
				iron=$xp("//*[@id='iron']",9).innerHTML.match(/\d+/)[0];
				ware=$xp("//*[@id='storage']",9).innerHTML.match(/\d+/)[0];
				// Start at 1 to skip current village
				test=false;
				twb_.senders=[];
				twb_.para=[wood,clay,iron,ware];
				for(i=1; i<C.length; i++){
					vil=C[i].getAttribute("id");
					if(D && typeof D[vil]!="undefined" && B && typeof B[vil]!="undefined"){
						R=D[vil].resources;
						if(typeof R!="undefined"){
							market=B[vil].market;
							// Get the villages that have a market and more of any resource
							if(market>0 && (wood<R[0] || clay<R[1] || iron<R[2])){
								test=true;
								twb_.senders.push(vil);
							}
						}
					}
				}
				// Restore village list:
				TWB_Filter_Undo();
				if(!test){
					pq(lang("needr"),0);
				}
				else{
					// Setting up progress meter
					meter.caption=lang("TWB-BMRES");
					meter.label1=lang("total");
					meter.value1=-1;
					meter.label2=lang("total");
					meter.value2=-1;
					TWB_Popup(TWB_UCancelRES);
					// Load first vil
					twb_.sendTo=local.curVillage;
					Engines.State.add_p("mfl","TWB_MFL()","*",false);
					TWB_Mast_Url(TWB_URL().replace(/village=(\d+)/,"village="+twb_.senders[0]).replace(TWB_Scr(),"market").replace(/&id=\d+/,"&mode=send&target="+twb_.sendTo));
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_UCancelRES : function(){
		with(twb_.lib){
			delete twb_.sendTo;
			delete twb_.para;
			Engines.State.kill_p("mfl");
			if($get_var("skiptry")!="true"){
				local.skined=false;
			}
			meter.value1=0;
			meter.value2=100;
		}
	},
	TWB_SFL : function(a,b,c){
		with(twb_.lib){
			// Filter them
			a=(a<0)?0:a;
			b=(b<0)?0:b;
			c=(c<0)?0:c;
			DI=win();
			if(DI.wrappedJSObject){
				DI=DI.wrappedJSObject;
			}
			td=dce("td",DI);
			td.setAttribute("valign","top");
			table=dce("table",DI);
			table.className="vis";
			R1=dce("tr",DI);
			TH=dce("th",DI);
			TH.innerHTML=lang("TWB-BMRESS");
			R1.appendChild(TH);
			R2=dce("tr",DI);
			TD2=dce("td",DI);
			TD2.setAttribute("align","center");
			TD2.innerHTML+='<img alt="" title="Wood" src="/graphic/holz.png?1"> '+a;
			R2.appendChild(TD2);
			R3=dce("tr",DI);
			TD3=dce("td",DI);
			TD3.setAttribute("align","center");
			TD3.innerHTML+='<img alt="" title="Clay" src="/graphic/lehm.png?1"> '+b;
			R3.appendChild(TD3);
			R4=dce("tr",DI);
			TD4=dce("td",DI);
			TD4.setAttribute("align","center");
			TD4.innerHTML+='<img alt="" title="Iron" src="/graphic/eisen.png?1"> '+c;
			R4.appendChild(TD4);
			table.appendChild(R1);
			table.appendChild(R2);
			table.appendChild(R3);
			table.appendChild(R4);
			td.appendChild(table);
			// Append element
			BEF=$xp("//td[@valign='top']/table[@class='vis']",6)[3];
			BEF.parentNode.insertBefore(td,BEF);
		}
	},
	TWB_MFL : function(){
		with(twb_.lib){
			try{
				if(TWB_URL().match("try=confirm")===null){
					// Village contents
					O=twb_.para;
					wood=O[0];
					clay=O[1];
					stone=O[2];
					ware=O[3];
					// Qtity to full the village
					qty1=ware-wood;
					qty2=ware-clay;
					qty3=ware-stone;
					// Show the remaining resources
					TWB_SFL(qty1,qty2,qty3);
					largest=sm(qty1,sm(qty2,qty3,0),0);
					if(largest>0){
						A=$xp("//*[@id='inputx']",9);
						B=$xp("//*[@id='inputy']",9);
						if(A){
							// Merchants Able to send
							total=$xp("//html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr/th[2]",9).innerHTML;
							total=total.match(/\d+/)[0];
							// Max of each res
							max1=$xp("//a[contains(@href,'document.forms[0].wood')]",9).href.match(/%20(\d+)/)[1];
							max2=$xp("//a[contains(@href,'document.forms[0].stone')]",9).href.match(/%20(\d+)/)[1];
							max3=$xp("//a[contains(@href,'document.forms[0].iron')]",9).href.match(/%20(\d+)/)[1];
							// Remove current sender
							tmp=[];
							for(i=1; i<twb_.senders.length; i++){
								tmp.push(twb_.senders[i]);
							}
							twb_.senders=tmp;
							// Check if can send using merchants
							if(total>0){
								// Add coords in case they were not added 
								C=getC(gei(twb_.sendTo).getAttribute("tooltiptext"));
								A.value=C[0];
								B.value=C[1];
								// Which resource to send ? the one with highest demand
								if(largest==qty1){
									// Send wood 
									total=(total>qty1)?qty1:total;
									// Do not send more than max !!
									total=(total>max1)?max1:total;
									max=$xp("//*[contains(@href,'.wood')]",9).innerHTML.match(/\d+/)[0];
									total=(total>max)?max:total;
									if(total>0){
										twb_.para[0]=twb_.para[0]-(-total);
										$xp("//input[@name='wood']",9).value=total;
										$xp("//input[@type='submit']",9).click();
									}
									else{
										TWB_Mast_Url(TWB_URL().replace(/village=(\d+)/,"village="+twb_.senders[0]).replace(TWB_Scr(),"market").replace(/&id=\d+/,"&mode=send&target="+twb_.sendTo));
									}
								}
								if(largest==qty2){
									// Send clay
									total=(total>qty2)?qty2:total;
									// Do not send more than max !!
									total=(total>max2)?max2:total;
									max=$xp("//*[contains(@href,'.stone')]",9).innerHTML.match(/\d+/)[0];
									total=(total>max)?max:total;
									if(total>0){
										twb_.para[1]=twb_.para[1]-(-total);
										$xp("//input[@name='stone']",9).value=total;
										$xp("//input[@type='submit']",9).click();
									}
									else{
										TWB_Mast_Url(TWB_URL().replace(/village=(\d+)/,"village="+twb_.senders[0]).replace(TWB_Scr(),"market").replace(/&id=\d+/,"&mode=send&target="+twb_.sendTo));
									}
								}
								if(largest==qty3){
									// Send stone
									total=(total>qty3)?qty3:total;
									// Do not send more than max !!
									total=(total>max3)?max3:total;
									max=$xp("//*[contains(@href,'.iron')]",9).innerHTML.match(/\d+/)[0];
									total=(total>max)?max:total;
									if(total>0){
										twb_.para[2]=twb_.para[2]-(-total);
										$xp("//input[@name='iron']",9).value=total;
										$xp("//input[@type='submit']",9).click();
									}
									else{
										TWB_Mast_Url(TWB_URL().replace(/village=(\d+)/,"village="+twb_.senders[0]).replace(TWB_Scr(),"market").replace(/&id=\d+/,"&mode=send&target="+twb_.sendTo));
									}
								}
							}
							else{
								if(twb_.senders.length>0){
									// Move to next
									TWB_Mast_Url(TWB_URL().replace(/village=(\d+)/,"village="+twb_.senders[0]).replace(TWB_Scr(),"market").replace(/&id=\d+/,"&mode=send&target="+twb_.sendTo));
								}
								else{
									// Stop :: No more next
									TWB_UCancelRES();
								}
							}
						}
						else{
							if(twb_.senders.length>0){
								// Move to next
								TWB_Mast_Url(TWB_URL().replace(/village=(\d+)/,"village="+twb_.senders[0]).replace(TWB_Scr(),"market").replace(/&id=\d+/,"&mode=send&target="+twb_.sendTo));
							}
							else{
								// Stop :: No more next
								TWB_UCancelRES();
							}
						}
					}
					else{
						// Stop :: No resources needed anymore
						TWB_UCancelRES();
					}
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Check_Villages : function(){
		with(twb_.lib){
			try{
				notes=TWB_R("checklist.twb");
				notes=(isEmpty(notes))?"":notes;
				XF=unescape(notes);
				html='<html><head><title>'+lang("title16")+'</title><style>.vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align=center style="width:100%;height:100%;position:absolute;top:0;left:0;"><div class=block><a href=javascript:;><h1 align=center>'+lang("title16")+' :</h1></a></div><br><div class=block><br><textarea style="padding: 10px; -moz-border-radius: 20px;" class="c2" rows="12" name="list" cols="120">'+XF+'</textarea><br><br></div><br><div class="block"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_CheckList_Save(window);" value="'+lang("xon9")+'" name="B1">&nbsp;&nbsp;<input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_CheckList_SaveRun(window);" value="'+lang("xon99")+'" name="B1"><br><br></div></body></html>';
				var doc=openW(html);
			}catch(e){log('TWB Bots',e);}
		}
	},
	TWB_CheckList_Save : function(wx,X){
		with(twb_.lib){
			try{
				if(wx=="0"){
					tosv=X;
				}
				else{
					tosv=escape(wx.document.getElementsByTagName("textarea")[0].value);
					wx.content.close();
				}
				TWB_S(tosv,"checklist.twb");
			}catch(e){log('TWB Bots',e);}
		}
	},
	TWB_CheckList_SaveRun : function(wx){
		with(twb_.lib){
			try{
				tosv=escape(wx.document.getElementsByTagName("textarea")[0].value);
				wx.content.close();
				TWB_CheckList_Save("0",tosv);
				tosv=unescape(tosv);
				// Now parse the villages
				villages=tosv.match(/\d{1,3}\|\d{1,3}/g);
				if(villages==null){
					log("","No villages were found in the check list",2);
					return;
				}
				twb_.CHECKLIST=[];
				twb_.CHECKED=[];
				// There are villages, so resume
				for(i=0; i<villages.length; i++){
					twb_.CHECKLIST.push(villages[i].split("|"));
				}
				// Page Auto Clicker will not interfere
				Engines.State.add_p("checklist","TWB_CheckList()","*",false);
				TWB_Mast_Url(TWB_GoTo("map",undefined,"1")+"&x="+twb_.CHECKLIST[0][0]+"&y="+twb_.CHECKLIST[0][1]);
			}catch(e){log('TWB Bots',e);}
		}
	},
	TWB_CheckList : function(skip){
		with(twb_.lib){
			try{
				if(skip || TWB_Scr()=="info_village"){
					isBarb=$xp("//a[contains(@href,'info_player')]",9)===null;
					twb_.CHECKED.push(isBarb);
					A=twb_.CHECKLIST[twb_.CHECKED.length];
					if(typeof A=="undefined"){
						Engines.State.kill_p("checklist");
						TWB_CheckList_Report();
						return ;
					}
					TWB_Mast_Url(TWB_GoTo("map",undefined,"1")+"&x="+A[0]+"&y="+A[1]);
				}
				else{
					// Click on center tile
					rows=$xp("//table[@class='map']//tr",6);
					cols=$xp("//table[@class='map']//tr/td[1]",6);
					centerTile=$xp("//table[@class='map']//tr["+(((rows.length-1)/2)-(-1))+"]/td["+(((cols.length-1)/2)-(-1))+"]",9);
					// What if the coord led to an empty Tile
					if(centerTile.childNodes[0].href!=undefined){
						TWB_Mast_Url(centerTile.childNodes[0].href);
					}
					else{
						twb_.CHECKED.push(false);
						TWB_CheckList(true);
					}
				}
			}catch(e){log('TWB Bots',e);}
		}
	},
	TWB_CheckList_Report : function(){
		with(twb_.lib){
			try{
				delete twb_.nosubmit;
				// Update saved checklist
				notes=TWB_R("checklist.twb");
				notes=(isEmpty(notes))?"":notes;
				XF=unescape(notes);
				for(i=0; i<twb_.CHECKED.length; i++){
					// Replace non barb with a symbol
					if(!twb_.CHECKED[i]){
						ZZ=twb_.CHECKLIST[i];
						XF=XF.replace(ZZ[0]+"|"+ZZ[1],"{{"+ZZ[0]+"-"+ZZ[1]+"}}");
					}
				}
				XF=escape(XF);
				TWB_S(XF,"checklist.twb");
				// Now show back 
				TWB_Check_Villages();
			}catch(e){log('TWB Bots',e);}
		}
	},
	// Recruiter
	TWB_Train_Show : function(){
		with(twb_.lib){
			try{
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				html='<html><head><title>'+lang("title19")+'</title><script src="'+src+'jquery.js" type="text/javascript"></script><script src="'+src+'dnd.js"></script><style type="text/css">.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align="center"><div class="block"><h1><a href="javascript:;">'+lang("title19")+' :</a></h1></div><br /><div class="block"><p align="left"><br />&nbsp;&nbsp;&nbsp; <u><b>'+lang("botchose")+' :</b></u></p><div id="section1"><table class="block vis" width="50%" id="_profiles"><tr><th width="33%" align="center"><u><b>'+lang("TWB-Sort12")+'</b></u></th><th width="33%" align="center"><u><b>'+lang("load")+'</b></u></th><th width="33%" align="center"><u><b>'+lang("delete")+'</b></u></th></tr>';
				for(nname in _PFR){
					html+='<tr><td width="33%" align="center">'+nname+'</td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_Load(this,window)">'+lang("load")+'</a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_Del(this,window)">'+lang("delete")+'</a></td></tr>';
				}
				html+='<tr id="newp"><th width="100%" align="center" colspan="3"><u><b><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_New(window)">'+lang("newp")+'</a></b></u></th></tr></table></div><br /></div><br /><div class="block"><br /><p align="left">&nbsp;&nbsp;&nbsp; <u><b>'+lang("botcur")+' :</b></u></p><div id="section2" style="display:none"><table border="0"><tr><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/spear.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/sword.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/axe.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/archer.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/spy.png" border="0" /></td></tr><tr><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/light.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/marcher.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/heavy.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/ram.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/catapult.png" border="0" /></td></tr></table><br /><div id="options" style="display:none"><u><b>'+lang("count")+' :</b></u> <input type="text" size="5" name="count">&nbsp;<input type="button" value="'+lang("ok")+'" onclick="window.openerx.twb_.lib.TWB_Train_OK(window,this)" /><br /><br /></div><div align="center"><center><table class="block vis" width="30%" id="profile"><tr id="NOT"><td align="center"><u><b>'+lang("unit")+'</b></u></td><td align="center"><u><b>'+lang("count")+'</b></u></td><td align="center"><u><b>'+lang("delete")+'</b></u></td></tr></table></center></div><p><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Train_Save(window);" value="'+lang("save")+'" name="B1" /></p><br /></div><br /></div><br /><div class="block" align="center"><br /><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Train_Close(window);" value="'+lang("close")+'" name="B1" /><br /><br /></div></div><script type="text/javascript">';
				html+='$("img.icon").hover(function(){$(this).css("opacity","1");},function(){$(this).css("opacity","0.6");});$("img.icon").click(function(){window.openerx.twb_.lib.TWB_Train_Icon(this,window);});';
				html+='</script></body></html>';
				openW(html);
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Icon : function(icon,wd){
		with(twb_.lib){
			icon=icon.src.match(/\/(\w+)\.png/)[1];
			wd.$("#options input[type=text]")[0].name=icon;
			wd.$("#options input[type=text]")[0].value="";
			wd.$("#options").slideDown('slow',function(){});
		}
	},
	TWB_Train_Save : function(wd){
		with(twb_.lib){
			try{
				// Read levels and save
				if(typeof _PFR=="undefined"){
					_PFR={};
				}
				nname=wd.nname;
				_PFR[nname]=[];
				wd.$("#profile").find("tr").each(function(o){
					if(o>=1){
						RID=this.id;
						icon=gei(RID,wd.document).childNodes[0].childNodes[0].src.match(/\/unit_(\w+)\.png/)[1];
						count=gei(RID,wd.document).childNodes[1].textContent;
						_PFR[nname].push([icon,count]);
					}
				});
				TWB_S(uneval(_PFR),"pfr_"+TWB_World(0)+"["+twb_myID+"].twb");
				// Cleanup
				TWB_Train_Empty(wd);
				wd.$("#section2").slideUp('slow',function(){
					wd.$("#section1").slideDown('slow',function(){});
				});
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Empty : function(wd){
		with(twb_.lib){
			try{
				wd.$("#profile").find("tr").each(function(){
					if(this.getAttribute('id')!="NOT"){
						this.parentNode.removeChild(this);
					}
				});
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Close : function(wd){
		with(twb_.lib){
			wd.close();
		}
	},
	TWB_Train_ToIco : function(ico){
		with(twb_.lib){
			return "<img src='http://"+TWB_World()+"graphic/unit/unit_"+ico+".png'>";
		}
	},
	TWB_Train_OK : function(wd,obj){
		with(twb_.lib){
			try{
				sel=wd.$("#options input[type=text]")[0];
				wd.$("#options").slideUp('slow',function(){});
				icon=TWB_Train_ToIco(sel.name);
				_PFR[nname].push([sel.name,sel.value]);
				// Add row
				tr=dce("tr",wd);
				tr.id=Math.round(Math.random()*50000);
				wd.$("#profile")[0].appendChild(tr);
				tr.innerHTML='<td align="center">'+icon+'</td><td align="center">'+sel.value+'</td><td align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_Del_(this,window)">'+lang("delete")+'</a></td>';
				wd.$("#profile").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Del_ : function(el,wd){
		with(twb_.lib){
			try{
				RID=el.parentNode.parentNode.id;
				wd.$("#profile").find("tr").each(function(o){
					if(this.id==RID){
						K=o-1;
						_PFR[wd.nname].splice(K,1);
					}
				});
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_New : function(wd){
		with(twb_.lib){
			try{
				znname=prpt(lang("PFDN"));
				if(znname!=null){
					znname=znname.replace(/\s/g,"_");
					if(typeof _PFR[znname]=="undefined"){
						el=wd.$("#newp")[0];
						tr=dce("tr",wd);
						el.parentNode.insertBefore(tr,el);
						tr.innerHTML='<td width="33%" align="center">'+znname+'</td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_Load(this,window)">'+lang("load")+'</a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_Del(this,window)">'+lang("delete")+'</a></td>';
						// Save _PFR
						_PFR[znname]=[];
						TWB_S(uneval(_PFR),"pfr_"+TWB_World(0)+"["+twb_myID+"].twb");
					}
					else{
						pq(lang("pfnot"));
					}
				}
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Del : function(el,wd){
		with(twb_.lib){
			try{
				nname=wd.$(el.parentNode.parentNode).find("td")[0].textContent;
				delete _PFR[nname];
				el=el.parentNode.parentNode;
				el.parentNode.removeChild(el);
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Load : function(el,wd){
		with(twb_.lib){
			try{
				nname=wd.$(el.parentNode.parentNode).find("td")[0].textContent;
				wd.nname=nname;
				for(k=0; k<_PFR[nname].length; k++){
					tr=dce("tr",wd);
					tr.id=Math.round(Math.random()*50000);
					wd.$("#profile")[0].appendChild(tr);
					icon=TWB_Train_ToIco(_PFR[nname][k][0]);
					count=_PFR[nname][k][1];
					tr.innerHTML='<td align="center">'+icon+'</td><td align="center">'+count+'</td><td align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Train_Del_(this,window)">'+lang("delete")+'</a></td>';
				}
				wd.$("#section1").slideUp('slow',function(){
					wd.$("#section2").slideDown('slow',function(){});
				});
				wd.$("#bot").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Train_Choose : function(){
		with(twb_.lib){
			profiles=[];
			for(Q in _PFR){
				profiles.push(Q);
			}
			src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
			html='<html><head><title>'+lang("title19")+'</title><script src="'+src+'jquery.js"></script><script src="'+src+'dnd.js"></script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align=center><div class="block"><a href=javascript:;><h1>'+lang("title19")+' :</h1></a></div><br /><div class="block"><p align="left"><br />&nbsp;&nbsp;&nbsp; <u><b>'+lang("botchose")+' :</b></u></p><b><div class="block vis" style="width:50%"><u><b>'+lang("profs")+'</b></u><br><br><table>';
			qhtml="<tr>";
			for(j=0; j<profiles.length; j++){
				if(j>0 && j%3==0){
					qhtml+="</tr><tr>";
				}
				qhtml+='<td align=center><b>'+profiles[j]+'</b><br><br><select multiple size=10 id="'+profiles[j]+'" class="profile"></select><br><br><input type=button value="<<" onclick=add("'+profiles[j]+'")>&nbsp;&nbsp;<input type=button onclick=restore("'+profiles[j]+'") value=">>"></td>';
			}
			html+=qhtml;
			html+='</table></div></b><BR><div id=section1><table class="block vis" width="50%" id="_profiles"><tr><th rowspan="3" align="center"><u><b>'+lang("TWB-Village")+'</b></u><br><br>'
			groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
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
			grpstr="";
			for(k=0; k<grset.length; k++){
				grpstr+="&nbsp;&nbsp;<a href=javascript:void('"+grset[k]+"') onclick=group('"+grset[k]+"')>["+grset[k]+"]</a>";
			}
			grpstr+="&nbsp;&nbsp;<a href=javascript:void('"+lang("all")+"') onclick=group('all')>>"+lang("all")+"<</a>";
			html+=grpstr;
			html+='<br><Br><select size=10 id=vils multiple>';
			C=cN(gei("TWB-Villages"));
			for(i=0; i<C.length; i++){
				GRP="all";
				if(typeof groups[C[i].id]!="undefined"){
					GRP+=" "+groups[C[i].id].join(" ");
				}
				html+='<option class="'+GRP+'" value="'+C[i].id+'" id="'+C[i].id+'">'+TWB_GA(C[i])+' '+C[i].getAttribute("tooltiptext")+'</option>';
			}
			html+='</select></th></tr></table></div><br></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Train_CloseC(window);" value="'+lang("xon9")+'" name="B1"><br /><br /></div></div>';
			scripts="<script>";
			scripts+='function group(gid){opt=$("option");for(i=0; i<opt.length; i++){G=opt[i].className.split(" ");if(G.indexOf(gid)>-1){opt[i].style.display="";}else{opt[i].style.display="none";}}}';
			scripts+='function add(towhere){val=$("#vils").val();for(i=0; i<val.length; i++){$("#"+towhere).append($("#"+val[i])[0]);}sort(towhere);}';
			scripts+='function restore(towhere){val=$("#"+towhere).val();for(i=0; i<val.length; i++){$("#vils")[0].appendChild($("#"+val[i])[0]);}sort("vils");}';
			scripts+='function sort(towhere){$("#"+towhere).sortOptionsByText();}';
			scripts+='function _move(vid,towhere){if(typeof $("#"+towhere)[0]!="undefined"){$("#"+towhere)[0].appendChild($("#"+vid)[0]);}}';
			scripts+='jQuery.fn.sort = function(){return this.pushStack([].sort.apply(this, arguments), []);};jQuery.fn.sortOptions = function(sortCallback){jQuery("option", this).sort(sortCallback).appendTo(this);return this;};jQuery.fn.sortOptionsByText = function(){var byTextSortCallback = function(x, y){var xText = jQuery(x).text().toUpperCase();var yText = jQuery(y).text().toUpperCase();return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;};return this.sortOptions(byTextSortCallback);};jQuery.fn.sortOptionsByValue = function(){var byValueSortCallback = function(x, y){var xVal = jQuery(x).val();var yVal = jQuery(y).val();return (xVal < yVal) ? -1 : (xVal > yVal) ? 1 : 0;};return this.sortOptions(byValueSortCallback);};';
			scripts+='$(document).ready(function(){';
			// Load saved data
			for(towhere in _PFRC){
				for(L=0; L<_PFRC[towhere].length; L++){
					scripts+="_move('"+_PFRC[towhere][L]+"','"+towhere+"');";
				}
			}
			scripts+="});</script>";
			html+=scripts;
			html+='</body></html>';
			openW(html);
		}
	},
	TWB_Train_CloseC : function(wd){
		with(twb_.lib){
			sels=wd.$("select.profile");
			for(i=0; i<sels.length; i++){
				ST=wd.$("#"+sels[i].id+" option");
				_PFRC[sels[i].id]=[];
				for(k=0; k<ST.length; k++){
					_PFRC[sels[i].id].push(ST[k].id);
				}
			}
			// Save
			TWB_S(uneval(_PFRC),"pfrc_"+TWB_World(0)+"["+twb_myID+"].twb");
			// Close
			wd.close();
		}
	},
	// Tech
	TWB_Tech_Show : function(){
		with(twb_.lib){
			try{
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				html='<html><head><title>'+lang("title20")+'</title><script src="'+src+'jquery.js" type="text/javascript"></script><script src="'+src+'dnd.js"></script><style type="text/css">.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align="center"><div class="block"><h1><a href="javascript:;">'+lang("title20")+' :</a></h1></div><br /><div class="block"><p align="left"><br />&nbsp;&nbsp;&nbsp; <u><b>'+lang("botchose")+' :</b></u></p><div id="section1"><table class="block vis" width="50%" id="_profiles"><tr><th width="33%" align="center"><u><b>'+lang("TWB-Sort12")+'</b></u></th><th width="33%" align="center"><u><b>'+lang("load")+'</b></u></th><th width="33%" align="center"><u><b>'+lang("delete")+'</b></u></th></tr>';
				for(nname in _PFS){
					html+='<tr><td width="33%" align="center">'+nname+'</td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_Load(this,window)">'+lang("load")+'</a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_Del(this,window)">'+lang("delete")+'</a></td></tr>';
				}
				html+='<tr id="newp"><th width="100%" align="center" colspan="3"><u><b><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_New(window)">'+lang("newp")+'</a></b></u></th></tr></table></div><br /></div><br /><div class="block"><br /><p align="left">&nbsp;&nbsp;&nbsp; <u><b>'+lang("botcur")+' :</b></u></p><div id="section2" style="display:none"><table border="0"><tr><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/spear.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/sword.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/axe.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/archer.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/spy.png" border="0" /></td></tr><tr><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/light.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/marcher.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/heavy.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/ram.png" border="0" /></td><td align="center" style="width:55px" class="vis icon"><img class="icon" src="http://twbooster.com/phpBB3/twb/icons/catapult.png" border="0" /></td></tr></table><br /><div id="options" style="display:none"><u><b>'+lang("level")+' :</b></u> <select size="1" name="level"><option value="1">1</option>';
				if(TWB_WorldSet("game/tech")=="1"){
					html+='<option value="2">2</option><option value="3">3</option>';
				}
				html+='</select>&nbsp;<input type="button" value="'+lang("ok")+'" onclick="window.openerx.twb_.lib.TWB_Tech_OK(window,this)" /><br /><br /></div><div align="center"><center><table class="block vis" width="30%" id="profile"><tr id="NOT"><td align="center"><u><b>'+lang("unit")+'</b></u></td><td align="center"><u><b>'+lang("level")+'</b></u></td><td align="center"><u><b>'+lang("delete")+'</b></u></td></tr></table></center></div><p><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Tech_Save(window);" value="'+lang("save")+'" name="B1" /></p><br /></div><br /></div><br /><div class="block" align="center"><br /><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Tech_Close(window);" value="'+lang("close")+'" name="B1" /><br /><br /></div></div><script type="text/javascript">';
				html+='$("img.icon").hover(function(){$(this).css("opacity","1");},function(){$(this).css("opacity","0.6");});$("img.icon").click(function(){window.openerx.twb_.lib.TWB_Tech_Icon(this,window);});';
				html+='</script></body></html>';
				openW(html);
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Icon : function(icon,wd){
		with(twb_.lib){
			icon=icon.src.match(/\/(\w+)\.png/)[1];
			wd.$("#options select")[0].name=icon;
			wd.$("#options").slideDown('slow',function(){});
		}
	},
	TWB_Tech_Save : function(wd){
		with(twb_.lib){
			try{
				// Read levels and save
				if(typeof _PFS=="undefined"){
					_PFS=TWB_OVE("pfs_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				}
				nname=wd.nname;
				_PFS[nname]=[];
				wd.$("#profile").find("tr").each(function(o){
					if(o>=1){
						RID=this.id;
						icon=gei(RID,wd.document).childNodes[0].childNodes[0].src.match(/\/unit_(\w+)\.png/)[1];
						level=gei(RID,wd.document).childNodes[1].textContent;
						_PFS[nname].push([icon,level]);
					}
				});
				TWB_S(uneval(_PFS),"pfs_"+TWB_World(0)+"["+twb_myID+"].twb");
				// Cleanup
				TWB_Tech_Empty(wd);
				wd.$("#section2").slideUp('slow',function(){
					wd.$("#section1").slideDown('slow',function(){});
				});
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Empty : function(wd){
		with(twb_.lib){
			try{
				wd.$("#profile").find("tr").each(function(){
					if(this.getAttribute('id')!="NOT"){
						this.parentNode.removeChild(this);
					}
				});
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Close : function(wd){
		with(twb_.lib){
			wd.close();
		}
	},
	TWB_Tech_ToIco : function(ico){
		with(twb_.lib){
			return "<img src='http://"+TWB_World()+"graphic/unit/unit_"+ico+".png'>";
		}
	},
	TWB_Tech_OK : function(wd,obj){
		with(twb_.lib){
			try{
				sel=wd.$("#options select")[0];
				wd.$("#options").slideUp('slow',function(){});
				icon=TWB_Tech_ToIco(sel.name);
				_PFS[nname].push([sel.name,sel.value]);
				// Add row
				tr=dce("tr",wd);
				tr.id=Math.round(Math.random()*50000);
				wd.$("#profile")[0].appendChild(tr);
				tr.innerHTML='<td align="center">'+icon+'</td><td align="center">'+sel.value+'</td><td align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_Del_(this,window)">'+lang("delete")+'</a></td>';
				wd.$("#profile").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Del_ : function(el,wd){
		with(twb_.lib){
			try{
				RID=el.parentNode.parentNode.id;
				wd.$("#profile").find("tr").each(function(o){
					if(this.id==RID){
						K=o-1;
						_PFS[wd.nname].splice(K,1);
					}
				});
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_New : function(wd){
		with(twb_.lib){
			try{
				znname=prpt(lang("PFDN"));
				if(znname!=null){
					znname=znname.replace(/\s/g,"_");
					if(typeof _PFS[znname]=="undefined"){
						el=wd.$("#newp")[0];
						tr=dce("tr",wd);
						el.parentNode.insertBefore(tr,el);
						tr.innerHTML='<td width="33%" align="center">'+znname+'</td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_Load(this,window)">'+lang("load")+'</a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_Del(this,window)">'+lang("delete")+'</a></td>';
						// Save _PFS
						_PFS[znname]=[];
						TWB_S(uneval(_PFS),"pfs_"+TWB_World(0)+"["+twb_myID+"].twb");
					}
					else{
						pq(lang("pfnot"));
					}
				}
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Del : function(el,wd){
		with(twb_.lib){
			try{
				nname=wd.$(el.parentNode.parentNode).find("td")[0].textContent;
				delete _PFS[nname];
				el=el.parentNode.parentNode;
				el.parentNode.removeChild(el);
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Load : function(el,wd){
		with(twb_.lib){
			try{
				nname=wd.$(el.parentNode.parentNode).find("td")[0].textContent;
				wd.nname=nname;
				for(k=0; k<_PFS[nname].length; k++){
					tr=dce("tr",wd);
					tr.id=Math.round(Math.random()*50000);
					wd.$("#profile")[0].appendChild(tr);
					icon=TWB_Tech_ToIco(_PFS[nname][k][0]);
					level=_PFS[nname][k][1];
					tr.innerHTML='<td align="center">'+icon+'</td><td align="center">'+level+'</td><td align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_Tech_Del_(this,window)">'+lang("delete")+'</a></td>';
				}
				wd.$("#section1").slideUp('slow',function(){
					wd.$("#section2").slideDown('slow',function(){});
				});
				wd.$("#bot").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });
			}catch(e){
				log('TWB Bots',e);
			}
		}
	},
	TWB_Tech_Choose : function(){
		with(twb_.lib){
			profiles=[];
			for(Q in _PFS){
				profiles.push(Q);
			}
			src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
			html='<html><head><title>'+lang("title20")+'</title><script src="'+src+'jquery.js"></script><script src="'+src+'dnd.js"></script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align=center><div class="block"><a href=javascript:;><h1>'+lang("title20")+' :</h1></a></div><br /><div class="block"><p align="left"><br />&nbsp;&nbsp;&nbsp; <u><b>'+lang("botchose")+' :</b></u></p><b><div class="block vis" style="width:50%"><u><b>'+lang("profs")+'</b></u><br><br><table>';
			qhtml="<tr>";
			for(j=0; j<profiles.length; j++){
				if(j>0 && j%3==0){
					qhtml+="</tr><tr>";
				}
				qhtml+='<td align=center><b>'+profiles[j]+'</b><br><br><select multiple size=10 id="'+profiles[j]+'" class="profile"></select><br><br><input type=button value="<<" onclick=add("'+profiles[j]+'")>&nbsp;&nbsp;<input type=button onclick=restore("'+profiles[j]+'") value=">>"></td>';
			}
			html+=qhtml;
			html+='</table></div></b><BR><div id=section1><table class="block vis" width="50%" id="_profiles"><tr><th rowspan="3" align="center"><u><b>'+lang("TWB-Village")+'</b></u><br><br>'
			groups=TWB_OVE("groups_"+TWB_World(0)+"["+twb_myID+"].twb",{});
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
			grpstr="";
			for(k=0; k<grset.length; k++){
				grpstr+="&nbsp;&nbsp;<a href=javascript:void('"+grset[k]+"') onclick=group('"+grset[k]+"')>["+grset[k]+"]</a>";
			}
			grpstr+="&nbsp;&nbsp;<a href=javascript:void('"+lang("all")+"') onclick=group('all')>>"+lang("all")+"<</a>";
			html+=grpstr;
			html+='<br><Br><select size=10 id=vils multiple>';
			C=cN(gei("TWB-Villages"));
			for(i=0; i<C.length; i++){
				GRP="all";
				if(typeof groups[C[i].id]!="undefined"){
					GRP+=" "+groups[C[i].id].join(" ");
				}
				html+='<option class="'+GRP+'" value="'+C[i].id+'" id="'+C[i].id+'">'+TWB_GA(C[i])+' '+C[i].getAttribute("tooltiptext")+'</option>';
			}
			html+='</select></th></tr></table></div><br></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Tech_CloseC(window);" value="'+lang("xon9")+'" name="B1"><br /><br /></div></div>';
			scripts="<script>";
			scripts+='function group(gid){opt=$("option");for(i=0; i<opt.length; i++){G=opt[i].className.split(" ");if(G.indexOf(gid)>-1){opt[i].style.display="";}else{opt[i].style.display="none";}}}';
			scripts+='function add(towhere){val=$("#vils").val();for(i=0; i<val.length; i++){$("#"+towhere).append($("#"+val[i])[0]);}sort(towhere);}';
			scripts+='function restore(towhere){val=$("#"+towhere).val();for(i=0; i<val.length; i++){$("#vils")[0].appendChild($("#"+val[i])[0]);}sort("vils");}';
			scripts+='function sort(towhere){$("#"+towhere).sortOptionsByText();}';
			scripts+='function _move(vid,towhere){if(typeof $("#"+towhere)[0]!="undefined"){$("#"+towhere)[0].appendChild($("#"+vid)[0]);}}';
			scripts+='jQuery.fn.sort = function(){return this.pushStack([].sort.apply(this, arguments), []);};jQuery.fn.sortOptions = function(sortCallback){jQuery("option", this).sort(sortCallback).appendTo(this);return this;};jQuery.fn.sortOptionsByText = function(){var byTextSortCallback = function(x, y){var xText = jQuery(x).text().toUpperCase();var yText = jQuery(y).text().toUpperCase();return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;};return this.sortOptions(byTextSortCallback);};jQuery.fn.sortOptionsByValue = function(){var byValueSortCallback = function(x, y){var xVal = jQuery(x).val();var yVal = jQuery(y).val();return (xVal < yVal) ? -1 : (xVal > yVal) ? 1 : 0;};return this.sortOptions(byValueSortCallback);};';
			scripts+='$(document).ready(function(){';
			// Load saved data
			for(towhere in _PFSC){
				for(L=0; L<_PFSC[towhere].length; L++){
					scripts+="_move('"+_PFSC[towhere][L]+"','"+towhere+"');";
				}
			}
			scripts+="});</script>";
			html+=scripts;
			html+='</body></html>';
			openW(html);
		}
	},
	TWB_Tech_CloseC : function(wd){
		with(twb_.lib){
			sels=wd.$("select.profile");
			for(i=0; i<sels.length; i++){
				ST=wd.$("#"+sels[i].id+" option");
				_PFSC[sels[i].id]=[];
				for(k=0; k<ST.length; k++){
					_PFSC[sels[i].id].push(ST[k].id);
				}
			}
			// Save
			TWB_S(uneval(_PFSC),"pfsc_"+TWB_World(0)+"["+twb_myID+"].twb");
			// Close
			wd.close();
		}
	},
	// Starters 
	TWB_Train_Start : function(){
		with(twb_.lib){
			_PFR=TWB_OVE("pfr_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			_PFRC=TWB_OVE("pfrc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
			html='<html><head><title>'+lang("TWB-BotR1")+'</title><script src="'+src+'jquery.js"></script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align="center"><div class="block"><a href="javascript:;"><h1>'+lang("TWB-BotR1")+' :</h1></a></div><br /><div class="block"><p align="left"><br /><br></p><b><div class="block vis" style="width:50%"><br><u><b>'+lang("ccv")+':</b></u> <span id=CUR_VIL></span><br><b><span id=vil></span></b><br><br><u><b>'+lang("usp")+':</b></u> <span id=CUR_Q></span><br><b><span id=nname></span></b><br><br><u><b>'+lang("btc")+':</b></u> <span id=UNIT></span><br><b></b><br><br><img id=loader style="display:none" src="http://twbooster.com/phpBB3/twb/icons/ajax-loader.gif"><br><br></div></b><br><div id="section1" style="width:50%"><div class="block vis"><br><u><b>'+lang("logqueue")+'</b></u><br><div align=left id="debugger" style="padding: 15px 20px;overflow:auto;height:200"></div><br></div></div><br><br></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Train_Stop(window);" value="'+lang("stop")+'" name="B1"><br /><br /></div></div></body></html>';
			twb_.TRWindow=openW(html);
			setT(function(){
				loop=$get_var("traintimer");
				// Start First
				TWB_Train_Looper();
				// Queue others
				setI(TWB_Train_Looper,loop*60000,"traintimer");
				this.addEventListener("unload",TWB_Train_Stop,false);
			},$get_var(0),"trainstart");
		}
	},
	TWB_Train_Looper : function(){
		with(twb_.lib){
			// First queue
			if(typeof twb_.TRWindow!="undefined" && twb_.TRWindow.document!=null){
				twb_.TRWindow.curQ=TWB_Train_NextQ();
				twb_.TRWindow.curV=TWB_Train_NextV(twb_.TRWindow.curQ);
				TWB_Train_Loop();
			}
		}
	},
	TWB_Train_NextQ : function(){
		with(twb_.lib){
			_Q=twb_.TRWindow.curQ;
			last=null;
			for(Q in _PFR){
				// First call, set first not empty queue
				if(typeof _Q=="undefined" && _PFR[Q].length>0){
					return Q;
				}
				if(typeof _Q!="undefined" && last==_Q){
					// Predefined
					if(_PFR[Q].length>0){
						// Targetted & Found
						return Q;
					}
					else{
						// Shift one up
						_Q=Q;
					}
				}
				last=Q;
			}
			// Last call, ending
			return null;
		}
	},
	TWB_Train_NextV : function(Q,V,T){
		with(twb_.lib){
			if(typeof V=="undefined"){
				if(typeof T=="undefined"){
					if(typeof _PFRC[Q]!="undefined"){
						return _PFRC[Q][0];
					}
					else{
						return undefined;
					}
				}
				else{
					return undefined;
				}
			}
			else{
				return _PFRC[Q][_PFRC[Q].indexOf(V)-(-1)];
			}
		}
	},
	TWB_Train_Loop : function(){
		with(twb_.lib){
			if(twb_.TRWindow.curQ!=null){
				if(typeof twb_.TRWindow._H1=="undefined"){
					if(typeof local.twb_TRH1!="undefined"){
						// Been previously scraped
						twb_.TRWindow._H1=local.twb_TRH1;
					}
					else{
						TWB_Train_GetH();
						return;
						// Stop here, we will call back
					}
				}
				// Queue is already set
				// Check village
				if(typeof twb_.TRWindow.curV=="undefined"){
					twb_.TRWindow.curV=TWB_Train_NextV(twb_.TRWindow.curQ,twb_.TRWindow.curV,0);
					// Still ?
					if(typeof twb_.TRWindow.curV=="undefined"){
						// New queue
						twb_.TRWindow.curQ=TWB_Train_NextQ();
						// And call back
						TWB_Train_Loop();
						return;
					}
				}
				// Display Queue and Vil and loader icon
				TWB_Train_Log("queue");
				TWB_Train_Log("vil");
				TWB_Train_Log("load");
				// Get XHR Main
				
				
				
				// CONTINUE PARSING
				
				
				
				
				link="http://"+TWB_World()+"game.php?village="+twb_.TRWindow.curV+"&screen=main";
				$.ajax({url:link,async:true,success:function(datax){
					// Get table
					dataU=datax.split("id=\"buildings\"")[1].split("</table>")[0];
					// Get rows
					dataU=dataU.split("<tr");
					_builds={};
					LocalQ={
						build:{},
						demolish:{}
					}
					demolishes=0;
					// Read TW Queue
					try{
						D=datax.split("build_queue")[1].split("</table>")[0].split("<tr");
						for(K=2; K<D.length; K++){
							building=D[K].split("</td>")[0].split(">")[2].split(" (")[0].toLowerCase();
							// Math the building
							items=["TWB-Main","TWB-Barracks","TWB-Stable","TWB-Workshop","TWB-Smithy","TWB-Snob","TWB-Place","TWB-Market","TWB-Statue","TWB-Wood","TWB-Stone","TWB-Iron","TWB-Storage","TWB-Hide","TWB-Wall"];
							results=["main","barracks","stable","garage","smith","snob","place","market","statue","wood","stone","iron","storage","hide","wall"];
							for(M=0; M<items.length; M++){
								if(lang(items[M]).toLowerCase().match(building)){
									building=results[M];
								}
							}
							type=(D[K].split("/td")[0].split(/td.+>/)[1].match(/\d+/)!=null)?"build":"demolish";
							if(type=="demolish"){
								demolishes++;
							}
							
							if(typeof LocalQ[type][building]=="undefined"){
								LocalQ[type][building]=1;
							}
							else{
								LocalQ[type][building]++;
							}
						}
					}catch(e){}
					for(u=2; u<dataU.length; u++){
						// Get cells
						if(dataU[u].match("togglerow")!=null){
							continue;
						}
						inf=dataU[u].split("<td");
						build=inf[1].split("<img")[1].split("?")[0].match(/(\w+)\./)[1];
						level=inf[1].split("class=\"nowrap\">")[1].split("</span")[0].match(/\d+/);
						level=level==null?0:level[0];
						Reg="action=build&amp;h=\\w+&amp;id="+build;
						Reg2="action=build&amp;h=\\w+&amp;id="+build+"&amp;force";
						ulink=datax.match(Reg);
						ulink2=datax.match(Reg2);
						// If it is also part of the queue, do the math
						if(typeof LocalQ.build[build]!="undefined"){
							level-=-LocalQ.build[build];
						}
						if(typeof LocalQ.demolish[build]!="undefined"){
							level-=LocalQ.demolish[build];
						}
						_builds[build]={
							level: level,
							upgradable: (ulink!=null && ulink2==null)
						}
					}
					// Get position on queue
					QZ=_BQD[twb_.BQWindow.curQ];
					for(z=0; z<QZ.length; z++){
						B=QZ[z][0];
						L=QZ[z][1];
						build=B;
						if(typeof _builds[B]!="undefined" && _builds[B].level!=L){
							action=(_builds[B].level-L>0)?"destroy":"build";
							equal=_builds[B].level-L==0;
							if(!equal){
								if(action=="destroy"){
									link2="http://"+TWB_World()+"game.php?village="+twb_.BQWindow.curV+"&screen=overview";
									dataz=$.ajax({url:link2,async:false}).responseText;
									// Loyalty is 100 when it doesnt exist
									loy=dataz.match(/<th>\d+<\/th>/g);
									if(demolishes<5 && loy==null){
										cando=true;
									}
									else{
										cando=false;
									}
								}else{
									if(action=="build" && _builds[B].upgradable){
										cando=true;
									}
									else{
										cando=false;
									}
								}
								// Stop here, this is our position in the queue
								break;
							}
						}
					}
					if(typeof cando!="undefined" && cando==true){
						// Can build : Link exists without &force
						TWB_BQD_Log("build",build);
						TWB_BQD_Log("log",lang("logbq1")+lang(action)+" "+TWB_BQD_ToIco(build)+" "+lang("in")+" "+TWB_BQD_NVil(twb_.BQWindow.curV)+".","darkblue");
						// Load XHR and on success loop back
						switch(action){
							case "build" : 
								link="http://"+TWB_World()+"game.php?village="+twb_.BQWindow.curV+"&screen=main&action=build&h="+twb_.BQWindow._H+"&id="+build;
							break;
							
							default :
								link="http://"+TWB_World()+"game.php?village="+twb_.BQWindow.curV+"&screen=main&action=destroy&h="+twb_.BQWindow._H+"&building_id="+build;
							break;
						}
						$.ajax({url:link,async:true,success:function(datax){
							delete cando;
							delete action;
							TWB_BQD_Log("log",lang("succ"));
							TWB_BQD_Log("stop");
							TWB_BQD_Loop();
						}});
					}
					else{
						if(typeof action!="undefined" && typeof cando!="undefined" && !cando){
							TWB_BQD_Log("log",lang("logbq2")+lang(action)+" "+TWB_BQD_ToIco(build)+" "+lang("in")+" "+TWB_BQD_NVil(twb_.BQWindow.curV)+lang("logbq3"),"red");
						}
						else{
							TWB_BQD_Log("log",lang("logbq4")+lang("in")+" "+TWB_BQD_NVil(twb_.BQWindow.curV)+lang("logbq3"),"grey");
						}
						// If not then no need to continue, lets move to next vil
						delete cando;
						delete action;
						TWB_BQD_Log("stop");
						twb_.BQWindow.curV=TWB_BQD_NextV(twb_.BQWindow.curQ,twb_.BQWindow.curV);
						TWB_BQD_Loop();
					}
				}});
				
				
				
				// STOP PARSING HERE
				
				
				
				
			}
			else{
				// End
				twb_.TRWindow.curQ="";
				twb_.TRWindow.curV="";
				
				TWB_Train_Log("stop");
				TWB_Train_Log("vil",0);
				TWB_Train_Log("queue",0);
				TWB_Train_Log("build",0);
				
				delete cando;
				delete action;
				delete twb_.TRWindow.curQ;
				delete twb_.TRWindow.curV;
				
				log("BotT","End",3);
			}
		}
	},
	TWB_Train_GetH : function(O,OO){
		with(twb_.lib){
			O=typeof O=="undefined"?0:O;
			OO=typeof OO=="undefined"?"0":OO;
			// Loop until found
			vil=cN(gei("TWB-Villages"),O).id;
			TWB_Train_Log("load");
			if(OO=="0"){
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=barracks";
				$.ajax({url:link,async:true,success:function(dataH){
					H=dataH.match(/train&amp;h=(\w+)/);
					found=H!==null;
					if(found){
						local.twb_TRH1=H[1];
						twb_.TRWindow._H1=H[1];
						// Call For Second One
						TWB_Train_GetH(0,1);
					}
					else{
						O++;
						TWB_Train_GetH(O,0);
					}
				}});
			}
			if(OO=="1"){
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=stable";
				$.ajax({url:link,async:true,success:function(dataH){
					H=dataH.match(/train&amp;h=(\w+)/);
					found=H!==null;
					if(found){
						local.twb_TRH2=H[1];
						twb_.TRWindow._H2=H[1];
						// Call For Third One
						TWB_Train_GetH(0,2);
					}
					else{
						O++;
						TWB_Train_GetH(O,1);
					}
				}});
			}
			if(OO=="2"){
				link="http://"+TWB_World()+"game.php?village="+vil+"&screen=garage";
				$.ajax({url:link,async:true,success:function(dataH){
					H=dataH.match(/train&amp;h=(\w+)/);
					found=H!==null;
					if(found){
						local.twb_TRH3=H[1];
						twb_.TRWindow._H3=H[1];
						// Call Back
						TWB_Train_Loop();
					}
					else{
						O++;
						TWB_Train_GetH(O,2);
					}
				}});
			}
		}
	},
	TWB_Train_Log : function(mode,str,color){
		with(twb_.lib){
			color=(typeof color=="undefined" || color==1)?"green":color;
			switch(mode){
				case "load" :
					gei("loader",twb_.TRWindow.document).style.display="";
				break;
				
				case "stop" : 
					gei("loader",twb_.TRWindow.document).style.display="none";
				break;
				
				case "log" : 
					logger=gei("debugger",twb_.TRWindow.document);
					logger.innerHTML="<font color="+color+">"+str+"</font><br>"+logger.innerHTML;
				break;
				
				case "unit" :
					logger=gei("UNIT",twb_.TRWindow.document);
					if(str==0){
						str="";
					}
					else{
						str=TWB_Bot_ToIco(str);
					}
					logger.innerHTML=str;
				break;
				
				case "queue" :
					logger=gei("CUR_Q",twb_.TRWindow.document);
					if(str==0){
						str="";
					}
					else{
						str=twb_.TRWindow.curQ;
					}
					logger.innerHTML=str;
				break;
				
				case "vil" :
					logger=gei("CUR_VIL",twb_.TRWindow.document);
					if(str==0){
						str="";
					}
					else{
						vil=twb_.TRWindow.curV;
						nzm=TWB_GA(vil)+" "+gei(vil).getAttribute("tooltiptext");
						str='<a href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx("'+vil+'",1)>'+nzm+'</a>';
					}
					logger.innerHTML=str;
				break;
			}
		}
	},
	TWB_Train_Stop : function(wd){
		with(twb_.lib){
			unsetI("traintimer");
			wd.close();
			delete twb_.TRWindow;
			return true;
		}
	},
	TWB_Tech_Start : function(){
		with(twb_.lib){
			_PFS=TWB_OVE("pfs_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			_PFSC=TWB_OVE("pfsc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
			html='<html><head><title>'+lang("TWB-BotT1")+'</title><script src="'+src+'jquery.js"></script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align="center"><div class="block"><a href="javascript:;"><h1>'+lang("TWB-BotT1")+' :</h1></a></div><br /><div class="block"><p align="left"><br /><br></p><b><div class="block vis" style="width:50%"><br><u><b>'+lang("ccv")+':</b></u> <span id=CUR_VIL></span><br><b><span id=vil></span></b><br><br><u><b>'+lang("usp")+':</b></u> <span id=CUR_Q></span><br><b><span id=nname></span></b><br><br><u><b>'+lang("btr")+':</b></u> <span id=UNIT></span><br><b></b><br><br><img id=loader style="display:none" src="http://twbooster.com/phpBB3/twb/icons/ajax-loader.gif"><br><br></div></b><br><div id="section1" style="width:50%"><div class="block vis"><br><u><b>'+lang("logqueue")+'</b></u><br><div align=left id="debugger" style="padding: 15px 20px;overflow:auto;height:200"></div><br></div></div><br><br></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Tech_Stop(window);" value="'+lang("stop")+'" name="B1"><br /><br /></div></div></body></html>';
			twb_.RSWindow=openW(html);
			setT(function(){
				loop=$get_var("techtimer");
				// Start First
				TWB_Tech_Looper();
				// Queue others
				setI(TWB_Tech_Looper,loop*60000,"techtimer");
				this.addEventListener("unload",TWB_Tech_Stop,false);
			},$get_var(0),"techstart");
		}
	},
	TWB_Tech_Looper : function(){
		with(twb_.lib){
			// First queue
			if(typeof twb_.RSWindow!="undefined" && twb_.RSWindow.document!=null){
				twb_.RSWindow.curQ=TWB_Tech_NextQ();
				twb_.RSWindow.curV=TWB_Tech_NextV(twb_.RSWindow.curQ);
				TWB_Tech_Loop();
			}
		}
	},
	TWB_Tech_NextQ : function(){
		with(twb_.lib){
			_Q=twb_.RSWindow.curQ;
			last=null;
			for(Q in _PFS){
				// First call, set first not empty queue
				if(typeof _Q=="undefined" && _PFS[Q].length>0){
					return Q;
				}
				if(typeof _Q!="undefined" && last==_Q){
					// Predefined
					if(_PFS[Q].length>0){
						// Targetted & Found
						return Q;
					}
					else{
						// Shift one up
						_Q=Q;
					}
				}
				last=Q;
			}
			// Last call, ending
			return null;
		}
	},
	TWB_Tech_NextV : function(Q,V,T){
		with(twb_.lib){
			if(typeof V=="undefined"){
				if(typeof T=="undefined"){
					if(typeof _PFSC[Q]!="undefined"){
						return _PFSC[Q][0];
					}
					else{
						return undefined;
					}
				}
				else{
					return undefined;
				}
			}
			else{
				return _PFSC[Q][_PFSC[Q].indexOf(V)-(-1)];
			}
		}
	},
	TWB_Tech_Loop : function(){
		with(twb_.lib){
			if(twb_.RSWindow.curQ!=null){
				if(typeof twb_.RSWindow._H=="undefined"){
					if(typeof local.twb_RSH!="undefined"){
						// Been previously scraped
						twb_.RSWindow._H=local.twb_RSH;
					}
					else{
						TWB_Tech_GetH();
						return;
						// Stop here, we will call back
					}
				}
				// Queue is already set
				// Check village
				if(typeof twb_.RSWindow.curV=="undefined"){
					twb_.RSWindow.curV=TWB_Tech_NextV(twb_.RSWindow.curQ,twb_.RSWindow.curV,0);
					// Still ?
					if(typeof twb_.RSWindow.curV=="undefined"){
						// New queue
						twb_.RSWindow.curQ=TWB_Tech_NextQ();
						// And call back
						TWB_Tech_Loop();
						return;
					}
				}
				// Display Queue and Vil and loader icon
				TWB_Tech_Log("queue");
				TWB_Tech_Log("vil");
				TWB_Tech_Log("load");
				// Get XHR Smith
				link="http://"+TWB_World()+"game.php?village="+twb_.TRWindow.curV+"&screen=smith";
				$.ajax({url:link,async:true,success:function(datax){
					// Get table
					dataU=datax.split("id=\"content_value\"")[1].split("</table>")[1];
					// Get rows
					dataU=dataU.split("<tr");
					_builds={};
					LocalQ={
						build:{},
						demolish:{}
					}
					// Read TW Queue
					try{
						D=datax.split("content_value")[1].split(/<br[\s]{0,1}\/>/g)[1].split("<tr");
						for(K=2; K<D.length; K++){
							unit=D[K].split("<a h")[1].split(">")[1].split("</a")[0];
							// Math the unit
							items=["uni1","uni2","uni3","uni4","uni5","uni6","uni7","uni8","uni9","uni10"];
							results=["spear","sword","axe","archer","spy","light","heavy","marcher","ram","catapult"];
							for(M=0; M<items.length; M++){
								if(lang(items[M]).toLowerCase().match(unit.toLowerCase())){
									unit=results[M];
								}
							}
							type=(D[K].split("/td")[0].split(/td.+>/)[1].match(/\d+/)!=null)?"research":"remove";
							if(typeof LocalQ[type][unit]=="undefined"){
								LocalQ[type][unit]=1;
							}
							else{
								LocalQ[type][unit]++;
							}
						}
					}catch(e){}
					for(u=2; u<dataU.length; u++){
						// Get cells
						inf=dataU[u].split("<td");
						unit=inf[1].match(/unit=(\w+)/)[1]
						level=inf[1].split("</a>")[1].match(/\d+/);
						level=level==null?0:level[0];
						Reg="action=research&amp;h=\\w+&amp;id="+unit;
						ulink=datax.match(Reg);
						// If it is also part of the queue, do the math
						if(typeof LocalQ.build[unit]!="undefined"){
							level-=-LocalQ.build[unit];
						}
						if(typeof LocalQ.demolish[unit]!="undefined"){
							level-=LocalQ.demolish[unit];
						}
						_builds[unit]={
							level: level,
							upgradable: ulink!=null
						}
					}
					// Get position on queue
					QZ=_PFS[twb_.RSWindow.curQ];
					for(z=0; z<QZ.length; z++){
						B=QZ[z][0];
						L=QZ[z][1];
						unit=B;
						if(typeof _builds[B]!="undefined" && _builds[B].level!=L){
							action=(_builds[B].level-L>0)?"remove":"research";
							equal=_builds[B].level-L==0;
							if(!equal){
								if(action=="remove"){
									link2="http://"+TWB_World()+"game.php?village="+twb_.BQWindow.curV+"&screen=smith";
									dataz=$.ajax({url:link2,async:false}).responseText;
									// Check if link exists
									canr=new RegExp("action=remove&amp;h=\\w+&amp;id="+unit);
									if(dataz.match(canr)){
										cando=true;
									}
									else{
										cando=false;
									}
								}else{
									if(action=="research" && _builds[B].upgradable){
										cando=true;
									}
									else{
										cando=false;
									}
								}
								// Stop here, this is our position in the queue
								break;
							}
						}
					}
					if(typeof cando!="undefined" && cando==true){
						// Can research
						TWB_Tech_Log("unit",build);
						TWB_Tech_Log("log",lang("logbq1")+lang(action)+" "+TWB_Bot_ToIco(unit)+" "+lang("in")+" "+TWB_Bot_NVil(twb_.RSWindow.curV)+".","darkblue");
						// Load XHR and on success loop back
						switch(action){
							case "research" : 
								link="http://"+TWB_World()+"game.php?village="+twb_.RSWindow.curV+"&screen=smith&action=research&h="+twb_.RSWindow._H+"&id="+unit;
							break;
							
							default :
								link="http://"+TWB_World()+"game.php?village="+twb_.RSWindow.curV+"&screen=smith&action=remove&h="+twb_.RSWindow._H+"&building_id="+unit;
							break;
						}
						$.ajax({url:link,async:true,success:function(datax){
							delete cando;
							delete action;
							TWB_Tech_Log("log",lang("succ"));
							TWB_Tech_Log("stop");
							TWB_Tech_Loop();
						}});
					}
					else{
						if(typeof action!="undefined" && typeof cando!="undefined" && !cando){
							TWB_Tech_Log("log",lang("logbq2")+lang(action)+" "+TWB_Bot_ToIco(build)+" "+lang("in")+" "+TWB_Tech_NVil(twb_.RSWindow.curV)+lang("logbq3"),"red");
						}
						else{
							TWB_Tech_Log("log",lang("logbq4")+lang("in")+" "+TWB_Bot_NVil(twb_.RSWindow.curV)+lang("logbq3"),"grey");
						}
						// If not then no need to continue, lets move to next vil
						delete cando;
						delete action;
						TWB_Tech_Log("stop");
						twb_.RSWindow.curV=TWB_Tech_NextV(twb_.RSWindow.curQ,twb_.RSWindow.curV);
						TWB_Tech_Loop();
					}
				}});
			}
			else{
				// End
				twb_.RSWindow.curQ="";
				twb_.RSWindow.curV="";
				
				TWB_Tech_Log("stop");
				TWB_Tech_Log("vil",0);
				TWB_Tech_Log("queue",0);
				TWB_Tech_Log("build",0);
				
				delete cando;
				delete action;
				delete twb_.RSWindow.curQ;
				delete twb_.RSWindow.curV;
				
				log("BotR","End",3);
			}
		}
	},
	TWB_Bot_NVil : function(VO){
		with(twb_.lib){
			return "<a href=javascript:; onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx('"+VO+"',1)>"+TWB_GA(VO)+"</a>";
		}
	},
	TWB_Tech_GetH : function(O){
		with(twb_.lib){
			O=typeof O=="undefined"?0:O;
			// Loop until found
			vil=cN(gei("TWB-Villages"),O).id;
			TWB_Tech_Log("load");
			link="http://"+TWB_World()+"game.php?village="+vil+"&screen=smith";
			$.ajax({url:link,async:true,success:function(dataH){
				H=dataH.match(/research&amp;h=(\w+)/);
				found=H!==null;
				if(found){
					local.twb_RSH=H[1];
					twb_.RSWindow._RSH=H[1];
					// Call Back
					TWB_Tech_Loop();
				}
				else{
					O++;
					TWB_Tech_GetH(O);
				}
			}});
		}
	},
	TWB_Bot_ToIco : function(ico){
		with(twb_.lib){
			return "<img src='http://"+TWB_World()+"graphic/unit/unit_"+ico+".png'>";
		}
	},
	TWB_Tech_Log : function(mode,str,color){
		with(twb_.lib){
			color=(typeof color=="undefined" || color==1)?"green":color;
			switch(mode){
				case "load" :
					gei("loader",twb_.RSWindow.document).style.display="";
				break;
				
				case "stop" : 
					gei("loader",twb_.RSWindow.document).style.display="none";
				break;
				
				case "log" : 
					logger=gei("debugger",twb_.RSWindow.document);
					logger.innerHTML="<font color="+color+">"+str+"</font><br>"+logger.innerHTML;
				break;
				
				case "unit" :
					logger=gei("UNIT",twb_.RSWindow.document);
					if(str==0){
						str="";
					}
					else{
						str=TWB_Bot_ToIco(str);
					}
					logger.innerHTML=str;
				break;
				
				case "queue" :
					logger=gei("CUR_Q",twb_.RSWindow.document);
					if(str==0){
						str="";
					}
					else{
						str=twb_.RSWindow.curQ;
					}
					logger.innerHTML=str;
				break;
				
				case "vil" :
					logger=gei("CUR_VIL",twb_.RSWindow.document);
					if(str==0){
						str="";
					}
					else{
						vil=twb_.RSWindow.curV;
						nzm=TWB_GA(vil)+" "+gei(vil).getAttribute("tooltiptext");
						str='<a href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx("'+vil+'",1)>'+nzm+'</a>';
					}
					logger.innerHTML=str;
				break;
			}
		}
	},
	TWB_Tech_Stop : function(wd){
		with(twb_.lib){
			unsetI("techtimer");
			wd.close();
			delete twb_.RSWindow;
			return true;
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof settings.twbot=="undefined"){
				B1=BTN("toolbarbutton",{disabled:"true",id:"TWB-GR2",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-Bots"},B1);
				B9=BTN("menuitem",{id:"TWB-MBot",label:"Resources Manager Bot 1",oncommand:"try{twb_.lib.TWB_Start_Equi();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B10=BTN("menuitem",{id:"TWB-ABot",label:"Resources Manager Bot 2",oncommand:"try{twb_.lib.TWB_Start_Equi2();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B10=BTN("menuitem",{id:"TWB-RBot",label:"Resources Manager Bot 3",oncommand:"try{twb_.lib.TWB_Start_Equi3();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B11=BTN("menuitem",{id:"TWB-BMRES",label:"Bring Me Resources",oncommand:"try{twb_.lib.TWB_Find_Me_Resources();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B12=BTN("menuitem",{id:"TWB-CCF",label:"Check villages",oncommand:"try{twb_.lib.TWB_Check_Villages();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B13=BTN("toolbarbutton",{disabled:"true",id:"TWB-BOTX",type:"button",label:"",hidden:"true"});
				B14=BTN("toolbarbutton",{id:"TWB-Shop",type:"button",tooltiptext:"Autofill Offer",oncommand:"try{twb_.lib.TWB_Market_Fil(0);}catch(e){twb_.lib.log('Main',e);}"});
				
				B15=BTN("menuseparator",{},gei("TWB-Bots"));
				B16=BTN("menuitem",{id:"TWB-BotR1",label:"Recruiter BOT",oncommand:"try{twb_.lib.TWB_Train_Show();}catch(e){twb_.lib.log('TWB Bots',e);}"},gei("TWB-Bots"));
				B17=BTN("menuitem",{id:"TWB-BotR2",label:"Assign Villages",oncommand:"try{twb_.lib.TWB_Train_Choose();}catch(e){twb_.lib.log('TWB Bots',e);}"},gei("TWB-Bots"));
				B18=BTN("menuitem",{id:"TWB-BotR3",label:"Launch Recruiter",oncommand:"try{twb_.lib.TWB_Train_Start();}catch(e){twb_.lib.log('TWB Bots',e);}"},gei("TWB-Bots"));
				
				B19=BTN("menuseparator",{},gei("TWB-Bots"));
				B20=BTN("menuitem",{id:"TWB-BotT1",label:"Researcher BOT",oncommand:"try{twb_.lib.TWB_Tech_Show();}catch(e){twb_.lib.log('TWB Bots',e);}"},gei("TWB-Bots"));
				B21=BTN("menuitem",{id:"TWB-BotT2",label:"Assign Villages",oncommand:"try{twb_.lib.TWB_Tech_Choose();}catch(e){twb_.lib.log('TWB Bots',e);}"},gei("TWB-Bots"));
				B22=BTN("menuitem",{id:"TWB-BotT3",label:"Launch Researcher",oncommand:"try{twb_.lib.TWB_Tech_Start();}catch(e){twb_.lib.log('TWB Bots',e);}"},gei("TWB-Bots"));
				
				TWB_New_Group_Set("market",lang("xon21"));
				TWB_New_Set("market",[lang("typ"),{id:"tmat",type:"menupop",selected:"tmat",values:[["1o",lang("auto")],["0o",lang("manu")]]}]);
				TWB_New_Set("market",[lang("offer"),{id:"offer",type:"textbox",value:"offer"}]);
				TWB_New_Set("market",[lang("forx"),{id:"forx",type:"textbox",value:"forx"}]);
				TWB_New_Set("market",[lang("dur"),{id:"dur",type:"textbox",value:"dur"}]);
				
				TWB_New_Group_Set("bots",lang("bots"));
				TWB_New_Set("bots",[lang("traintimer"),{id:"traintimer",type:"menupop",selected:"traintimer",values:[["5","5"],["10","10"],["20","20"],["30","30"],["60","60"],["90","90"],["120","120"],["150","150"]]}]);
				TWB_New_Set("bots",[lang("techtimer"),{id:"techtimer",type:"menupop",selected:"techtimer",values:[["5","5"],["10","10"],["20","20"],["30","30"],["60","60"],["90","90"],["120","120"],["150","150"]]}]);
			}
		}
		twb_.lib._PFR=twb_.lib.TWB_OVE("pfr_"+twb_.lib.TWB_World(0)+"["+twb_.lib.twb_myID+"].twb",{});
		twb_.lib._PFRC=twb_.lib.TWB_OVE("pfrc_"+twb_.lib.TWB_World(0)+"["+twb_.lib.twb_myID+"].twb",{});
		twb_.lib._PFS=twb_.lib.TWB_OVE("pfs_"+twb_.lib.TWB_World(0)+"["+twb_.lib.twb_myID+"].twb",{});
		twb_.lib._PFSC=twb_.lib.TWB_OVE("pfsc_"+twb_.lib.TWB_World(0)+"["+twb_.lib.twb_myID+"].twb",{});
	}
});
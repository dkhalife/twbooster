// @Plugin = Backtime Calculator
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	TWB_BTime : function(){
		with(twb_.lib){
			try{
				if(twb() && $get_var("btime")=="true"){
					//WIN=win();
					WIN=twb_.pWIN;
					// Bypass security warning
					if(WIN.wrappedJSObject){
						WIN=WIN.wrappedJSObject;
					}
					tab=gei('btab',WIN.document);
					if(TWB_Scr()=="place" && (TWB_Mode()=="command" || TWB_Mode()===null) && tab==null){
						inca=$xp("//a[contains(@href,'type=other')]",6);
						for(u=0; u<inca.length; u++){
							// Append function to update data
							inca[u].addEventListener("mouseover",function(){TWB_Disp_Times(this);},false);
						}
						// Insert header
						par=$xp("//td[@width='*' and @valign='top']",9);
						if(par){
							h3=dce("h3",WIN);
							h3.innerHTML=lang("backtim");
							par.appendChild(h3);
							// Insert table
							tab=dce("table",WIN);
							tab.className="vis";
							tab.setAttribute("id","btab");
							par.appendChild(tab);
							// cache SSpeed
							twb_.SPEED=TWB_Speed();
						}
					}
				}
			}catch(e){log('Backtimer',e);}
		}
	},
	TWB_Disp_Times : function(obj){
		with(twb_.lib){
			try{
				twb_.obj=obj;
				if(gei(local.curVillage)){
					// XHR to get coords
					$.ajax({url:twb_.obj.href,async:true,success:function(tmp){
						WIN=win();
						if(WIN.wrappedJSObject){
							WIN=WIN.wrappedJSObject;
						}
						tab=gei('btab',WIN.document);
						xy0=getC(gei(local.curVillage).getAttribute("tooltiptext"));
						xy1=getC(tmp.split("screen=info_village")[1]);
						// Distance
						d=Math.sqrt(Math.pow(xy0[0]-xy1[0],2)-(-Math.pow(xy0[1]-xy1[1],2)));
						// Travel speed
						SPEED=twb_.SPEED;
						sl_sped={"n":35,"c":30,"w":22,"p":18,"h":11,"l":10,"s":9,"k":10};
						// Speed is time (s) needed to travel 1 box
						spear=Math.round(sl_sped["p"]/SPEED[1]/SPEED[0]) * 60;
						sword=Math.round(sl_sped["w"]/SPEED[1]/SPEED[0]) * 60;
						axe=Math.round(sl_sped["p"]/SPEED[1]/SPEED[0]) * 60;
						if(TWB_WorldSet("game/archer")==1){
							archer=Math.round(sl_sped["p"]/SPEED[1]/SPEED[0]) * 60;
						}
						spy=Math.round(sl_sped["s"]/SPEED[1]/SPEED[0]) * 60;
						light=Math.round(sl_sped["l"]/SPEED[1]/SPEED[0]) * 60;
						if(TWB_WorldSet("game/archer")==1){
							marcher=Math.round(sl_sped["l"]/SPEED[1]/SPEED[0]) * 60;
						}
						heavy=Math.round(sl_sped["h"]/SPEED[1]/SPEED[0]) * 60;
						ram=Math.round(sl_sped["c"]/SPEED[1]/SPEED[0]) * 60;
						catapult=Math.round(sl_sped["c"]/SPEED[1]/SPEED[0]) * 60;
						snob=Math.round(sl_sped["n"]/SPEED[1]/SPEED[0]) * 60;
						if(TWB_WorldSet("game/knight")==1){
							knight=Math.round(sl_sped["k"]/SPEED[1]/SPEED[0]) * 60;
						}
						// Arrival In
						arrival_IN=twb_.obj.parentNode.parentNode.parentNode.childNodes[5].innerHTML.match(/\d+/g);
						arrival_IN=(arrival_IN[0]*3600)-(-arrival_IN[1]*60)-(-arrival_IN[2]);
						// Backtimes in (s)
						// U =  arrival  + time need to go back
						spear=arrival_IN- (-spear * d);
						sword=arrival_IN- (-sword * d);
						axe=arrival_IN- (-axe * d);
						if(TWB_WorldSet("game/archer")==1){
							archer=arrival_IN- (-archer * d);
						}
						spy=arrival_IN- (-spy * d);
						light=arrival_IN- (-light * d);
						if(TWB_WorldSet("game/archer")==1){
							marcher=arrival_IN- (-marcher * d);
						}
						heavy=arrival_IN- (-heavy * d);
						ram=arrival_IN- (-ram * d);
						catapult=arrival_IN- (-catapult * d);
						snob=arrival_IN- (-snob * d);
						if(TWB_WorldSet("game/knight")==1){
							knight=arrival_IN- (-knight * d);
						}
						// Arrival on ST
						DI=$xp("//*[@id='serverDate']",9).innerHTML.split("/");
						DI=DI[1]+" "+DI[0]+" "+DI[2];
						DZ=new Date(DI+" "+$xp("//*[@id='serverTime']",9).innerHTML);
						spear2=new Date(new Date().setSeconds(DZ.getSeconds()-(-spear)));
						sword2=new Date(new Date().setSeconds(DZ.getSeconds()-(-sword)));
						axe2=new Date(new Date().setSeconds(DZ.getSeconds()-(-axe)));
						if(TWB_WorldSet("game/archer")==1){
							archer2=new Date(new Date().setSeconds(DZ.getSeconds()-(-archer)));
						}
						spy2=new Date(new Date().setSeconds(DZ.getSeconds()-(-spy)));
						light2=new Date(new Date().setSeconds(DZ.getSeconds()-(-light)));
						if(TWB_WorldSet("game/archer")==1){
							marcher2=new Date(new Date().setSeconds(DZ.getSeconds()-(-marcher)));
						}
						heavy2=new Date(new Date().setSeconds(DZ.getSeconds()-(-heavy)));
						ram2=new Date(new Date().setSeconds(DZ.getSeconds()-(-ram)));
						catapult2=new Date(new Date().setSeconds(DZ.getSeconds()-(-catapult)));
						snob2=new Date(new Date().setSeconds(DZ.getSeconds()-(-snob)));
						if(TWB_WorldSet("game/knight")==1){
							knight2=new Date(new Date().setSeconds(DZ.getSeconds()-(-knight)));
						}
						// Convert to format
						theFormat="d/m/y h:i:s";
						spear2=spear2.format(theFormat);
						sword2=sword2.format(theFormat);
						axe2=axe2.format(theFormat);
						if(TWB_WorldSet("game/archer")==1){
							archer2=archer2.format(theFormat);
						}
						spy2=spy2.format(theFormat);
						light2=light2.format(theFormat);
						if(TWB_WorldSet("game/archer")==1){
							marcher2=marcher2.format(theFormat);
						}
						heavy2=heavy2.format(theFormat);
						ram2=ram2.format(theFormat);
						catapult2=catapult2.format(theFormat);
						snob2=snob2.format(theFormat);
						if(TWB_WorldSet("game/knight")==1){
							knight2=knight2.format(theFormat);
						}
						// Conver back to timer format
						spear=Math.floor(spear/3600)+":"+(Math.floor(spear/60)-Math.floor(spear/3600)*60)+":"+(spear-(Math.floor(spear/60)*60));
						sword=Math.floor(sword/3600)+":"+(Math.floor(sword/60)-Math.floor(sword/3600)*60)+":"+(sword-(Math.floor(sword/60)*60));
						axe=Math.floor(axe/3600)+":"+(Math.floor(axe/60)-Math.floor(axe/3600)*60)+":"+(axe-(Math.floor(axe/60)*60));
						if(TWB_WorldSet("game/archer")==1){
							archer=Math.floor(archer/3600)+":"+(Math.floor(archer/60)-Math.floor(archer/3600)*60)+":"+(archer-(Math.floor(archer/60)*60));
						}
						spy=Math.floor(spy/3600)+":"+(Math.floor(spy/60)-Math.floor(spy/3600)*60)+":"+(spy-(Math.floor(spy/60)*60));
						light=Math.floor(light/3600)+":"+(Math.floor(light/60)-Math.floor(light/3600)*60)+":"+(light-(Math.floor(light/60)*60));
						if(TWB_WorldSet("game/archer")==1){
							marcher=Math.floor(marcher/3600)+":"+(Math.floor(marcher/60)-Math.floor(marcher/3600)*60)+":"+(marcher-(Math.floor(marcher/60)*60));
						}
						heavy=Math.floor(heavy/3600)+":"+(Math.floor(heavy/60)-Math.floor(heavy/3600)*60)+":"+(heavy-(Math.floor(heavy/60)*60));
						ram=Math.floor(ram/3600)+":"+(Math.floor(ram/60)-Math.floor(ram/3600)*60)+":"+(ram-(Math.floor(ram/60)*60));
						catapult=Math.floor(catapult/3600)+":"+(Math.floor(catapult/60)-Math.floor(catapult/3600)*60)+":"+(catapult-(Math.floor(catapult/60)*60));
						snob=Math.floor(snob/3600)+":"+(Math.floor(snob/60)-Math.floor(snob/3600)*60)+":"+(snob-(Math.floor(snob/60)*60));
						if(TWB_WorldSet("game/knight")==1){
							knight=Math.floor(knight/3600)+":"+(Math.floor(knight/60)-Math.floor(knight/3600)*60)+":"+(knight-(Math.floor(knight/60)*60));
						}
						xhtml="<tr>";
							xhtml+="<th>"+lang("TWB-Unit")+"</th>";
							xhtml+="<th>"+lang("estarv")+"</th>";
							xhtml+="<th>"+lang("backariv")+"</th>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_spear.png?1'></td>";
							xhtml+="<td align=center>"+spear+"</td>";
							xhtml+="<td align=center>"+spear2+"</td>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_sword.png?1'></td>";
							xhtml+="<td align=center>"+sword+"</td>";
							xhtml+="<td align=center>"+sword2+"</td>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_axe.png?1'></td>";
							xhtml+="<td align=center>"+axe+"</td>";
							xhtml+="<td align=center>"+axe2+"</td>";
						xhtml+="</tr>";
						if(TWB_WorldSet("game/archer")==1){
							xhtml+="<tr>";
								xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_archer.png?1'></td>";
								xhtml+="<td align=center>"+archer+"</td>";
								xhtml+="<td align=center>"+archer2+"</td>";
							xhtml+="</tr>";
						}
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_spy.png?1'></td>";
							xhtml+="<td align=center>"+spy+"</td>";
							xhtml+="<td align=center>"+spy2+"</td>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_light.png?1'></td>";
							xhtml+="<td align=center>"+light+"</td>";
							xhtml+="<td align=center>"+light2+"</td>";
						xhtml+="</tr>";
						if(TWB_WorldSet("game/archer")==1){
							xhtml+="<tr>";
								xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_marcher.png?1'></td>";
								xhtml+="<td align=center>"+marcher+"</td>";
								xhtml+="<td align=center>"+marcher2+"</td>";
							xhtml+="</tr>";
						}
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_heavy.png?1'></td>";
							xhtml+="<td align=center>"+heavy+"</td>";
							xhtml+="<td align=center>"+heavy2+"</td>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_ram.png?1'></td>";
							xhtml+="<td align=center>"+ram+"</td>";
							xhtml+="<td align=center>"+ram2+"</td>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_catapult.png?1'></td>";
							xhtml+="<td align=center>"+catapult+"</td>";
							xhtml+="<td align=center>"+catapult2+"</td>";
						xhtml+="</tr>";
						xhtml+="<tr>";
							xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_snob.png?1'></td>";
							xhtml+="<td align=center>"+snob+"</td>";
							xhtml+="<td align=center>"+snob2+"</td>";
						xhtml+="</tr>";
						if(TWB_WorldSet("game/knight")==1){
							xhtml+="<tr>";
								xhtml+="<td align=center><img alt='' src='/graphic/unit/unit_knight.png?1'></td>";
								xhtml+="<td align=center>"+knight+"</td>";
								xhtml+="<td align=center>"+knight2+"</td>";
							xhtml+="</tr>";
						}
						tab.innerHTML=xhtml;
					}});
				}
			}catch(e){log('Backtimer',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof settings.backtime=="undefined"){
				TWB_New_Group_Set("backtime",lang("backtim"));
				TWB_New_Set("backtime",[lang("btime"),{id:"btime",type:"checkbox",checked:"btime"}]);
				Engines.State.add_p("btimer","TWB_BTime()","*",false);
			}
		}
	}
});
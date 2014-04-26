// @Plugin = Report Options
// @Version = 1.6
// @Icons = gr4
merge(twb_.lib,{
	// Back and next
	TWB_RBack : function(){
		with(twb_.lib){
			BLinks=$xp("//a[contains(@href,'all&view=')]",6,twb_.pWIN.document);
			for(j=0; j<BLinks.length; j++){
				if(BLinks[j].innerHTML=="&lt;&lt;"){
					TWB_Mast_Url(BLinks[j].href);
					break;
				}
			}
		}
	},
	TWB_RNext : function(){
		with(twb_.lib){
			BLinks=$xp("//a[contains(@href,'all&view=')]",6,twb_.pWIN.document);
			for(j=0; j<BLinks.length; j++){
				if(BLinks[j].innerHTML=="&gt;&gt;"){
					TWB_Mast_Url(BLinks[j].href);
					break;
				}
			}
		}
	},
	// Report Cache
	TWB_Cache_Load : function(){
		with(twb_.lib){
			try{
				// Local Time
				CheckDST();
				servertime=getTime("1%3");
				// Server Speed
				speed=TWB_Speed()[0];
				UN={};
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				htm='<HTML><HEAD><link media="all" href="'+src+'sorter.css" type="text/css" rel="stylesheet"><script src="'+src+'sorter.js"></script><script src="'+src+'jquery.js"></script>{SCRIPT}<script src="'+src+'rc.js"></script><TITLE>'+lang("title11")+'</TITLE><style type="text/css">.vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } table.menu tr td { background-color:transparent; background-image:url("none") !important }table.vis, table.menu table { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); border-left:1px solid #DED3B9; border-top:1px solid #DED3B9; border-collapse:collapse;margin:1px }table.vis tr td { background-color:transparent; background-image:url("none"); border-bottom:1px solid #DED3B9; border-right:1px solid #DED3B9; ; padding-left:3px; padding-right:3px; padding-top:2px; padding-bottom:2px }table.vis tr.odd {background-color: #f9e9c3;}table.vis table.vis, table.vis table.vis td { border:0px !important } table.vis th { padding:3px 3px }</style></head><body class="vis"><div class="corners block"><h1 align=center>'+lang("title11")+':</h1></div><br /><span id=tooltip></span><div class="corners block" style="padding:10px"><br /><table border="2" cellpadding="0" cellspacing="0" style="border-collapse: collapse;" bordercolor="#111111" width="100%" class="example sort table-autosort:1 vis"><thead><tr><th align="center" colspan="18"><p align="right"><b>'+lang("rfrom")+'</b> <select size="1" name="D1" onchange="window.openerx.twb_.lib.TWB_Rep_Fil(this.value,window)"><option value=0>'+lang("today")+'</option><option value=1>'+lang("yest")+'</option><option value=7>'+lang("week")+'</option><option value=31">'+lang("mont")+'</option><option value=900">'+lang("all")+'</option></select></th></tr><tr id="header"><th class="table-sortable:default table-sortable" align="center">'+lang("age")+' - '+lang("luck")+' - '+lang("morale")+' - '+lang("rel")+'</th><th class="table-sortable:numeric table-sortable" align="center">'+lang("attk")+'</th><th class="table-sortable:numeric table-sortable" align="center">'+lang("defd")+'</th><th class="table-sortable:default table-sortable" align="center">'+lang("attk")+'</th><th class="table-sortable:default table-sortable" align="center">'+lang("defd")+'</th><th class="table-sortable:default table-sortable" align="center">'+lang("uni5")+'</th><th class="table-sortable:numeric table-sortable" align="center">'+lang("TWB-Wall")+'</th><th colspan=2 align="center">'+lang("walldmg")+'</th><th class="table-sortable:numeric table-sortable" align="center">'+lang("scres")+'</th><th class="table-sortable:numeric table-sortable" align="center">'+lang("crres")+'</th><th class="table-sortable:default table-sortable" align="center">'+lang("label")+'</th><th align="center">'+lang("resvil")+'</th><th align="center">'+lang("targvil")+'</th><th align="center">'+lang("TWB-Att")+'</th><th align="center">'+lang("TWB-Att2")+'</th><th align="center">'+lang("TWB-Farmx")+'</th><th align="center">'+lang("delete")+'</th></tr></thead><tbody>';
				for(k=0; k<reports.length; k++){
					try{
						dta=reports[k];
						id1=dta.attackerid;
						id2=dta.defenderid;
						label=dta.name;
						RID=dta.id;
						date=dta.dtime;
						timestamp=dta.timestamp;
						date=new Date(date);
						age=dS(date.getDate(),date.getMonth()+1,date.getYear()-100);
						morale=dta.morale.match(/\d+/)+"%";
						luck=dta.luck;
						religion=dta.religion;
						// Parse links
						attacker=TWB_Parse_Url(dta.attacker);
						avillage=TWB_Parse_Url(dta.avillage);
						defender=TWB_Parse_Url(dta.defender);
						dvillage=TWB_Parse_Url(dta.dvillage);
						wall=(dta.buildings.wall)?dta.buildings.wall:"-";
						xy=getC(dvillage).join("|");
						// Get units : attacker
						aunits=dta.units.attacker;
						a1_spear=(aunits[0].spear)?aunits[0].spear:0;
						a1_sword=(aunits[0].sword)?aunits[0].sword:0;
						a1_axe=(aunits[0].axe)?aunits[0].axe:0;
						a1_archer=(aunits[0].archer)?aunits[0].archer:0;
						a1_spy=(aunits[0].spy)?aunits[0].spy:0;
						a1_light=(aunits[0].light)?aunits[0].light:0;
						a1_marcher=(aunits[0].marcher)?aunits[0].marcher:0;
						a1_heavy=(aunits[0].heavy)?aunits[0].heavy:0;
						a1_ram=(aunits[0].ram)?aunits[0].ram:0;
						a1_catapult=(aunits[0].catapult)?aunits[0].catapult:0;
						a1_snob=(aunits[0].snob)?aunits[0].snob:0;
						a1_knight=(aunits[0].knight)?aunits[0].knight:0;
						a2_spear=(aunits[1].spear)?aunits[1].spear:0;
						a2_sword=(aunits[1].sword)?aunits[1].sword:0;
						a2_axe=(aunits[1].axe)?aunits[1].axe:0;
						a2_archer=(aunits[1].archer)?aunits[1].archer:0;
						a2_spy=(aunits[1].spy)?aunits[1].spy:0;
						a2_light=(aunits[1].light)?aunits[1].light:0;
						a2_marcher=(aunits[1].marcher)?aunits[1].marcher:0;
						a2_heavy=(aunits[1].heavy)?aunits[1].heavy:0;
						a2_ram=(aunits[1].ram)?aunits[1].ram:0;
						a2_catapult=(aunits[1].catapult)?aunits[1].catapult:0;
						a2_snob=(aunits[1].snob)?aunits[1].snob:0;
						a2_knight=(aunits[1].knight)?aunits[1].knight:0;
						// Patch Units for attacker
						UN[RID]=[]
						UN[RID].push([[a1_spear,a1_sword,a1_axe,a1_archer,a1_spy,a1_light,a1_marcher,a1_heavy,a1_ram,a1_catapult,a1_snob,a1_knight],[a2_spear,a2_sword,a2_axe,a2_archer,a2_spy,a2_light,a2_marcher,a2_heavy,a2_ram,a2_catapult,a2_snob,a2_knight]]);
						// Get Units : defender
						dunits=dta.units.defender;
						d1_spear=(dunits[0].spear)?dunits[0].spear:0;
						d1_sword=(dunits[0].sword)?dunits[0].sword:0;
						d1_axe=(dunits[0].axe)?dunits[0].axe:0;
						d1_archer=(dunits[0].archer)?dunits[0].archer:0;
						d1_spy=(dunits[0].spy)?dunits[0].spy:0;
						d1_light=(dunits[0].light)?dunits[0].light:0;
						d1_marcher=(dunits[0].marcher)?dunits[0].marcher:0;
						d1_heavy=(dunits[0].heavy)?dunits[0].heavy:0;
						d1_ram=(dunits[0].ram)?dunits[0].ram:0;
						d1_catapult=(dunits[0].catapult)?dunits[0].catapult:0;
						d1_snob=(dunits[0].snob)?dunits[0].snob:0;
						d1_knight=(dunits[0].knight)?dunits[0].knight:0;
						d2_spear=(dunits[1].spear)?dunits[1].spear:0;
						d2_sword=(dunits[1].sword)?dunits[1].sword:0;
						d2_axe=(dunits[1].axe)?dunits[1].axe:0;
						d2_archer=(dunits[1].archer)?dunits[1].archer:0;
						d2_spy=(dunits[1].spy)?dunits[1].spy:0;
						d2_light=(dunits[1].light)?dunits[1].light:0;
						d2_marcher=(dunits[1].marcher)?dunits[1].marcher:0;
						d2_heavy=(dunits[1].heavy)?dunits[1].heavy:0;
						d2_ram=(dunits[1].ram)?dunits[1].ram:0;
						d2_catapult=(dunits[1].catapult)?dunits[1].catapult:0;
						d2_snob=(dunits[1].snob)?dunits[1].snob:0;
						d2_knight=(dunits[1].knight)?dunits[1].knight:0;
						// Patch Units for defender
						UN[RID].push([[d1_spear,d1_sword,d1_axe,d1_archer,d1_spy,d1_light,d1_marcher,d1_heavy,d1_ram,d1_catapult,d1_snob,d1_knight],[d2_spear,d2_sword,d2_axe,d2_archer,d2_spy,d2_light,d2_marcher,d2_heavy,d2_ram,d2_catapult,d2_snob,d2_knight]]);
						// Get buildings + do calculations OR -
						buildings=dta.buildings;
						s_wood=(dta.scout_wood)?dta.scout_wood:"-";
						s_clay=(dta.scout_stone)?dta.scout_stone:"-";
						s_iron=(dta.scout_iron)?dta.scout_iron:"-";
						// Remove span from all
						s_wood=(s_wood.match("grey"))?s_wood.replace("<span class=\"grey\">.</span>",""):s_wood;
						s_clay=(s_clay.match("grey"))?s_clay.replace("<span class=\"grey\">.</span>",""):s_clay;
						s_iron=(s_iron.match("grey"))?s_iron.replace("<span class=\"grey\">.</span>",""):s_iron;
						// Time to fill for each res OR -
						ware=(buildings.storage)?buildings.storage:"-";
						lvl1=(buildings.wood)?buildings.wood:"-";
						lvl2=(buildings.stone)?buildings.stone:"-";
						lvl3=(buildings.iron)?buildings.iron:"-";
						// Warehouse
						cap=capacity[buildings.storage-1];
						perH1=(lvl1!="-")?Math.floor(production[lvl1-1]*speed):"-";
						perH2=(lvl2!="-")?Math.floor(production[lvl2-1]*speed):"-";
						perH3=(lvl3!="-")?Math.floor(production[lvl3-1]*speed):"-";
						// Elapsed time and produced res
						local.twb_now=Math.round(new Date().getTime()/1000);
						elapsed=(local.twb_now-timestamp)/3600;
						// Produced meanwhile
						prod1=(s_wood=="-" || perH1=="-")?"-":elapsed*perH1;
						prod2=(s_clay=="-" || perH2=="-")?"-":elapsed*perH2;
						prod3=(s_iron=="-" || perH3=="-")?"-":elapsed*perH3;
						// Currently Rounded
						now1=(prod1=="-")?"-":Math.round(s_wood-(-prod1));
						now2=(prod2=="-")?"-":Math.round(s_clay-(-prod2));
						now3=(prod3=="-")?"-":Math.round(s_iron-(-prod3));
						// Units to clear them all
						all=(now1!="-" && now2!="-" && now3!="-")?now1-(-now2)-(-now3):"-";
						n_spear=(all!="-")?Math.round(all/25):0;
						n_sword=(all!="-")?Math.round(all/15):0;
						n_axe=(all!="-")?Math.round(all/10):0;
						n_archer=(all!="-")?Math.round(all/10):0;
						n_light=(all!="-")?Math.round(all/80):0;
						n_marcher=(all!="-")?Math.round(all/50):0;
						UN[RID].push([[n_spear,n_sword,n_axe,n_archer,0,n_light,n_marcher,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]]);
						// Left space in warehouse
						left1=(typeof cap!="undefined" && now1!="-")?cap-now1:"-";
						left2=(typeof cap!="undefined" && now2!="-")?cap-now2:"-";
						left3=(typeof cap!="undefined" && now3!="-")?cap-now3:"-";
						// Time to fill
						t_wood=(left1!="-")?((left1<0)?lang("full"):"["+lang("in")+" "+Math.round((left1/prod1)*60)+" "+lang("min")+"]"):"-";
						t_clay=(left2!="-")?((left2<0)?lang("full"):"["+lang("in")+" "+Math.round((left2/prod2)*60)+" "+lang("min")+"]"):"-";
						t_iron=(left3!="-")?((left3<0)?lang("full"):"["+lang("in")+" "+Math.round((left2/prod2)*60)+" "+lang("min")+"]"):"-";
						// check if farm and add link to farm village or make it add as farm + make link
						func="TWB_Rep_Afarm";
						isfarmlink=lang("TWB_F_Add");
						if(TWB_CFarm(dta.villageid)){
							func="TWB_Rep_Sfarm";
							isfarmlink=lang("TWB_F_Att");
						}
						SRC="http://"+TWB_World()+"graphic/";
						// Filter Scouted to Ks
						if(s_wood!="-"){
							s_wood=Math.round(s_wood/1000);
							s_clay=Math.round(s_clay/1000);
							s_iron=Math.round(s_iron/1000);
							s_res="<img src='"+SRC+"holz.png'> "+s_wood+" <img src='"+SRC+"lehm.png'> "+s_clay+" <img src='"+SRC+"eisen.png'> "+s_iron;
						}
						else{
							s_res="-";
						}
						if(now1!="-"){
							// Round to max if surpassed
							now1=(now1>cap)?cap:now1;
							now2=(now2>cap)?cap:now2;
							now3=(now3>cap)?cap:now3;
							// in K
							now1=Math.round(now1/1000);
							now2=Math.round(now2/1000);
							now3=Math.round(now3/1000);
							c_res="<img src='"+SRC+"holz.png'> "+now1+" <img src='"+SRC+"lehm.png'> "+now2+" <img src='"+SRC+"eisen.png'> "+now3;
						}
						else{
							c_res="-";
						}
						isscout=(typeof a1_spy!="undefined" && a1_spy>0)?"X":"";
						// Wall damage ?
						wall_from="-";
						wall_to="-";
						if(typeof dta.wall!="undefined"){
							wall_from=dta.wall.from;
							wall_to=dta.wall.to;
						}
						htm+='<tr id="_'+RID+'_" class="odd"><td align="center" dir="ltr">'+age+' - '+luck+' - '+morale+' - '+religion+'</td><td align="center" dir="ltr">'+id1+'</td><td align="center" dir="ltr">'+id2+'</td><td align="center" dir="ltr"><font size=2><span id="'+RID+'-" class="meffect">'+attacker+' <br>('+avillage+')</span></font></td><td align="center" dir="ltr"><font size=2><span id="'+RID+'_" class="meffect">'+defender+' <br>('+dvillage+')</span></font></td><td align=center>'+isscout+'</td><td align="center" dir="ltr">'+wall+'</td><td align="center" dir="ltr">'+wall_from+'</td><td align="center" dir="ltr">'+wall_to+'</td><td align="center" dir="ltr">'+s_res+'</td><td align="center" dir="ltr"><span onclick=window.openerx.twb_.lib.TWB_SRALL("'+n_spear+'","'+n_sword+'","'+n_axe+'","'+n_archer+'","'+n_light+'","'+n_marcher+'","'+xy+'") id="'+RID+'~" class="meffect">'+c_res+'</span></td><td align="center" dir="ltr"><span id="'+RID+'">'+label+'</span></a> <a href="javascript:void(0)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png" onclick=window.openerx.twb_.lib.TWB_Rlabel("'+RID+'",window)></a></td><td align="center" dir="ltr"><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_Rep_AVA("'+RID+'")>'+lang("att")+'</a></td><td align="center" dir="ltr"><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_Rep_TV("'+RID+'")>'+lang("att")+'</a></td><td align="center" dir="ltr"><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_Rep_AS("'+RID+'")>'+lang("att")+'</a></td><td align="center" dir="ltr"><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_Rep_AA("'+RID+'")>'+lang("att")+'</a></td><td align="center" dir="ltr"><a href=javascript:void(0) onclick=window.openerx.twb_.lib.'+func+'("'+dta.villageid+'")>'+isfarmlink+'</a></td><td align="center" dir="ltr"><a href=javascript:void(0) onclick=window.openerx.twb_.lib.TWB_Rep_Del("'+RID+'",window)>'+lang("delete")+'</a></td></tr>';
					}catch(e){
						log('Report Options',e);
						continue;
					}
				}
				// Apply Units Patch
				htm=htm.replace("{SCRIPT}","<script>units="+uneval(UN)+";</script>");
				htm+='</tbody></table><br/><script>tooltp();</script></div></body></html>';
				doc=openW(htm);
				doc.name=local.twb_now;
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_Fil : function(t,w){
		with(twb_.lib){
			// Show all
			items=w.document.getElementsByTagName("tr");
			all={};
			for(i=0; i<items.length; i++){
				if(items[i].id && items[i].id.match(/\_\d+\_/)){
					all[items[i].id]=items[i];
					all[items[i].id].style.display="";
				}
			}
			for(k=0; k<reports.length; k++){
				RID=reports[k].id;
				date=new Date(reports[k].dtime);
				d=dS(date.getDate(),date.getMonth()+1,date.getYear()-100).match(/\d+/)[0];
				if(d-t>0){
					// Hide 
					all["_"+RID+"_"].style.display="none";
				}
			}
		}
	},
	TWB_Load_DUN : function(id,d,un){
		with(twb_.lib){
			try{
				// Show attack contents
				src="http://"+TWB_World()+"graphic/unit/unit_";
				str="";
				if(id.match("_")){		
					arr=un[id.replace("_","")][1]
				}
				else{
					if(id.match("-")){
						arr=un[id.replace("-","")][0];
					}
					else{
						arr=un[id.replace("~","")][2];
						str="style='display:none'";
					}
				}
				gei("tooltip",d).innerHTML='<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="50%" class="vis"><tr><th align="center"><img border="0" src="'+src+'spear.png?1"></th><th align="center"><img border="0" src="'+src+'sword.png?1"></th><th align="center"><img border="0" src="'+src+'axe.png?1"></th><th align="center"><img border="0" src="'+src+'archer.png?1"></th><th align="center"><img border="0" src="'+src+'spy.png?1"></th><th align="center"><img border="0" src="'+src+'light.png?1"></th><th align="center"><img border="0" src="'+src+'marcher.png?1"></th><th align="center"><img border="0" src="'+src+'heavy.png?1"></th><th align="center"><img border="0" src="'+src+'ram.png?1"></th><th align="center"><img border="0" src="'+src+'catapult.png?1"></th><th align="center"><img border="0" src="'+src+'snob.png?1"></th><th align="center"><img border="0" src="'+src+'knight.png?1"></th></tr><tr class="odd"><th align="center">'+arr[0][0]+'</th><th align="center">'+arr[0][1]+'</th><th align="center">'+arr[0][2]+'</th><th align="center">'+arr[0][3]+'</th><th align="center">'+arr[0][4]+'</th><th align="center">'+arr[0][5]+'</th><th align="center">'+arr[0][6]+'</th><th align="center">'+arr[0][7]+'</th><th align="center">'+arr[0][8]+'</th><th align="center">'+arr[0][9]+'</th><th align="center">'+arr[0][10]+'</th><th align="center">'+arr[0][11]+'</th></tr><tr '+str+' class="odd"><th align="center">'+arr[1][0]+'</th><th align="center">'+arr[1][1]+'</th><th align="center">'+arr[1][2]+'</th><th align="center">'+arr[1][3]+'</th><th align="center">'+arr[1][4]+'</th><th align="center">'+arr[1][5]+'</th><th align="center">'+arr[1][6]+'</th><th align="center">'+arr[1][7]+'</th><th align="center">'+arr[1][8]+'</th><th align="center">'+arr[1][9]+'</th><th align="center">'+arr[1][10]+'</th><th align="center">'+arr[1][11]+'</th></tr></table>';
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_AWTT : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="place" && TWB_Mode()=="command" && twb_.trop){
					MIN=$get_var("minun");
					n=twb_.trop;
					spt=$xp("//*[@name='spear']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
					swt=$xp("//*[@name='sword']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
					axx=$xp("//*[@name='axe']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
					arz=$xp("//*[@name='archer']",9);arz=(arz===null)?0:arz.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
					lig=$xp("//*[@name='light']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
					marr=$xp("//*[@name='marcher']",9);marr=(marr===null)?0:marr.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
					n[0]=n[0]>spt?spt:n[0];
					n[1]=n[1]>swt?swt:n[1];
					n[2]=n[2]>axx?axx:n[2];
					n[3]=n[3]>arz?arz:n[3];
					n[4]=n[4]>lig?lig:n[4];
					n[5]=n[5]>marr?marr:n[5];
					t=false;
					if(n[0]>=MIN){t=true;$xp("//*[@name='spear']",9).value=n[0];}
					if(n[1]>=MIN){t=true;$xp("//*[@name='sword']",9).value=n[1];}
					if(n[2]>=MIN){t=true;$xp("//*[@name='axe']",9).value=n[2];}
					if(n[4]>=MIN){t=true;$xp("//*[@name='light']",9).value=n[4];}
					if($xp("//*[@name='archer']",9)!==null && n[3]>=MIN){t=true;$xp("//*[@name='archer']",9).value=n[3];}
					if($xp("//*[@name='marcher']",9)!==null && n[5]>=MIN){t=true;$xp("//*[@name='marcher']",9).value=n[5];}
					delete twb_.trop;
					Engines.State.kill_p("awtt");
					if(t){
						$xp("//*[@id='inputx']",9).value=n[6].split("|")[0];
						$xp("//*[@id='inputy']",9).value=n[6].split("|")[1];
						$xp("//input[@type='submit']",9).click();
					}
				}
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_CFarm : function(fID){
		with(twb_.lib){
			try{
				Z=false;
				for(FID in Dfarms){
					if(fID==FID){
						Z=true;
						break;
					}
				}
				return Z;
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_Afarm : function(fID){
		with(twb_.lib){
			try{
				link="http://"+TWB_World()+"staemme.php?village="+local.curVillage+"&screen=info_village&id="+fID;
				Engines.State.add_p("rep_af","TWB_Add_Farm('1')","*",false);
				TWB_All_Url(link,1,1);
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_Sfarm : function(fID){
		with(twb_.lib){
			try{
				NBR=1;
				for(FID in Dfarms){
					if(FID==fID){
						break;
					}
					NBR++;
				}
				TWB_Start_Farming(NBR+"",1);
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_Del : function(RID,wop){
		with(twb_.lib){
			try{
				// Remove row
				Z=gei("_"+RID+"_",wop.document);
				Z.parentNode.removeChild(Z);
				// Remove entry
				for(o=0; o<reports.length; o++){
					if(reports[o].id==RID){
						reports.splice(o,1);
						break;
					}
				}
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rlabel : function(RID,wop){
		with(twb_.lib){
			try{
				noid=prpt(lang("nrlabel"),gei(RID,wop.document).innerHTML);
				if(noid!==null){
					for(i=0; i<reports.length; i++){
						if(reports[i].id==RID){
							rID=i;
							break;
						}
					}
					reports[rID].name=noid;
					TWB_S(uneval(reports),"reports_"+TWB_World(0)+"["+twb_myID+"].twb");
					gei(RID,wop.document).innerHTML=noid;
				}
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_AS : function(RID){
		with(twb_.lib){
			try{
				Engines.State.add_p("rawst","TWB_AWST()","*",true);
				link=TWB_URL().replace(TWB_Scr(),"report").replace("game.php","staemme.php");
				link=(link.match("mode"))?link.replace("mode="+TWB_Mode(),"mode=all"):link+"&mode=all";
				link=(link.match("view"))?link.replace(/view=\d+/,"view="+RID):link+"&view="+RID;
				TWB_All_Url(link,1,1);
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_AA : function(RID){
		with(twb_.lib){
			try{
				Engines.State.add_p("rawat","TWB_AWAT()","*",true);
				link=TWB_URL().replace(TWB_Scr(),"report").replace("game.php","staemme.php");
				link=(link.match("mode"))?link.replace("mode="+TWB_Mode(),"mode=all"):link+"&mode=all";
				link=(link.match("view"))?link.replace(/view=\d+/,"view="+RID):link+"&view="+RID;
				TWB_All_Url(link,1,1);
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_Rep_TV : function(RID){
		with(twb_.lib){
			for(i=0; i<reports.length; i++){
				if(reports[i].id==RID){
					vid=reports[i].dvillage.match(/id=(\d+)/)[1];
					break;
				}
			}
			TWB_All_Url("http://"+TWB_World()+"staemme.php?village="+local.curVillage+"&screen=place&mode=command&target="+vid,1,1);
		}
	},
	TWB_Rep_AVA : function(RID){
		with(twb_.lib){
			Engines.State.add_p("scv","TWB_Rep_SCV()","*",false);
			TWB_Rep_TV(RID);
		}
	},
	TWB_Rep_SCV : function(){
		with(twb_.lib){
			scouts=$xp("//input[@name='spy']",9);
			vals=$xp("//a[contains(@href,'.spy')]",9).href.match(/%20(\d+)/)[1];
			if(vals>0){
				scouts.value=$get_var("minun");
				$xp("//*[@type='submit']",9).click();
				Engines.State.kill_p("scv");
			}
			else{
				pq(lang("nouniv"));
			}
		}
	},
	TWB_SRALL : function(a,b,c,d,e,f,g){
		with(twb_.lib){
			try{
				pr=TWB_UCMD(lang("wawtt"));
				if(pr){
					spear=pr.match("p")?a:0;
					sword=pr.match("w")?b:0;
					axe=pr.match("x")?c:0;
					archer=pr.match("e")?d:0;
					light=pr.match("l")?e:0;
					marcher=pr.match("m")?f:0;
					twb_.trop=[spear,sword,axe,archer,light,marcher,g];
					Engines.State.add_p("awtt","TWB_AWTT()","*",false);
					link=TWB_URL().replace(TWB_Scr(),"place");
					link=(link.match("mode"))?link.replace(TWB_Mode(),"command"):link+"&mode=command";
					TWB_All_Url(link,1,1);
				}
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_OR : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="report"){
						$l=$xp("//a[contains(@href,'view=')]",6);
						onu=new Array();
						ch=prpt(lang("repop"),"");
						$m=ch.match(/\d+\-\d+/);
						if($m!==null){
							for(i=new Number($m[0].split("-")[0])-1; i<=$m[0].split("-")[1]-1; i++){
								onu.push($l[i].href);
							}
						}
						else{
							$m=ch.match(/\d+/g);
							for(k=0; k<$m.length; k++){
								onu.push($l[$m[k]-1]);
							}
						}
						for(p=0; p<onu.length; p++){
							winx.openUILinkIn(onu[p], "tab");
						}
					}
					else{
						pq(lang("gtr"),0);
					}
				}catch(e){log('Report Options',e);}
			}
			else{
				$twb(TWB_OR);
			}
		}
	},
	TWB_RR3 : function(){
		with(twb_.lib){
			if(twb()){
				try{
					zes=win();
					if(zes){
						scsrc="function e(){var n='fnScoutReportEvaluator',s='http://legion.problemsolver.co.uk/SlowTarget/ScoutReportEvaluator.js';var a=(window.frames.length>0)?window.main:window;function c(m){a.document.body.appendChild(a.document.createTextNode(m));a.document.body.appendChild(a.document.createElement('br'));}if(a.document.getElementById(n)==null){c(\"Creating script entry in doc head...\");var A=a.document.createElement('script');A.id=n;A.type='text/javascript';A.src=s;a.document.getElementsByTagName(\"head\")[0].appendChild(A);setTimeout(e,500);return;}if(typeof(a.fnScoutReportEvaluator)=='undefined'){c(\"Loading script...\");setTimeout(e,200);return 0;}c(\"Loaded\");eval(\"a.fnScoutReportEvaluator(true,4000,180,0,false,10)\");}e();";
						A=dce("script",zes);
						A.type='text/javascript';
						txt=zes.document.createTextNode(scsrc);
						A.appendChild(txt);
						zes.document.childNodes[1].appendChild(A);
					}
					else{
						pq(lang("ure"));
					}
				}catch(e){log('Report Options',e);}
			}
			else{
				$twb(TWB_RR3);
			}
		}
	},
	TWB_Simulate : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="report" && TWB_URL().match("view=")){
						twb_.attacker={};
						twb_.defender={};
						// Get row of images for attacker
						morale=$xp("//h4",6)[1];
						morale=(typeof morale!="undefined" && morale.innerHTML.match(lang("morale")))?morale.innerHTML.match(/\d+/)[0]:"0";
						luck=$xp("//tr[3]/td/table/tbody/tr/td/b",9).innerHTML.match(/\d+/)[0];
						frow=$xp("//img[contains(@src,'unit_spear')]",9).parentNode.parentNode;
						// Get position of that row and build up the other lines
						for(i=0; i<frow.parentNode.childNodes.length; i++){
							if(frow.innerHTML==frow.parentNode.childNodes[i].innerHTML){
								break;
							}
						}
						// Attacking
						frow1=frow.parentNode.childNodes[i-(-2)];
						// Losses
						frow2=frow.parentNode.childNodes[i-(-4)];
						// Push items for attacker
						for(j=0; j<frow.childNodes.length; j++){
							if(frow.childNodes[j].childNodes[0] && frow.childNodes[j].childNodes[0].nodeName=="IMG"){
								twb_.attacker[frow.childNodes[j].childNodes[0].src.match(/unit_(\w+)/)[1]]=frow1.childNodes[j].innerHTML-frow2.childNodes[j].innerHTML;
							}
						}
						// Get row of images for defender if it exists
						srow=$xp("//img[contains(@src,'unit_spear')]",6);
						if(srow.length>1){
							srow=srow[1].parentNode.parentNode;
							// Get position of that row and build up the other lines
							for(i=0; i<srow.parentNode.childNodes.length; i++){
								if(srow.innerHTML==srow.parentNode.childNodes[i].innerHTML){
									break;
								}
							}
							// Attacking
							srow1=srow.parentNode.childNodes[i-(-2)];
							// Losses
							srow2=srow.parentNode.childNodes[i-(-4)];
							// Push items for attacker
							for(j=0; j<srow.childNodes.length; j++){
								if(srow.childNodes[j].childNodes[0] && srow.childNodes[j].childNodes[0].nodeName=="IMG"){
									twb_.defender[srow.childNodes[j].childNodes[0].src.match(/unit_(\w+)/)[1]]=srow1.childNodes[j].innerHTML-srow2.childNodes[j].innerHTML;
								}
							}
						}
						// Get wall level
						R=new RegExp(lang("TWB-Wall")+"\\s\\(.+\\d+.+\\)");
						T=$xp("//html",9).textContent.match(R);
						if(T){
							twb_.defender.wall=T[0].match(/\d+/)[0];
						}
						else{
							twb_.defender.wall=0;
						}
						// Get religion
						ROW=$xp("//a[contains(@href,'info_player')]",9).parentNode.parentNode.parentNode.innerHTML;
						religion=ROW.match(lang("relig"))===null?0:1;
						twb_.religion=religion;
						twb_.luck=luck;
						twb_.morale=morale;
						Engines.State.add_p("zclti","TWB_InsT2()","*",true);
						TWB_GoTo("place","sim");
					}
					else{
						pq(lang("gtr"),0);
					}
				}catch(e){log('Report Options',e);}
			}
			else{
				$twb(TWB_Simulate);
			}
		}
	},
	TWB_InsT2 : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="place" && TWB_Mode()=="sim"){
						for(obj in twb_.attacker){
							$xp("//*[@name='att_"+obj+"']",9).value=twb_.attacker[obj];
						}
						for(obj in twb_.defender){
							$xp("//*[@name='def_"+obj+"']",9).value=twb_.defender[obj];
						}
						$xp("//*[@name='moral']",9).value=twb_.morale;
						$xp("//*[@name='luck']",9).value=twb_.luck;
						if(twb_.religion==1){
							$xp("//*[@name='belief_att']",9).setAttribute("checked",true);
						}
						delete twb_.attacker;
						delete twb_.defender;
						delete twb_.luck;
						delete twb_.morale;
						delete twb_.religion;
					}
				}catch(e){log('Report Options',e);}
			}
		}
	},
	TWB_RConvert : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="report" && TWB_URL().match("view=")){
						if($get_var("repcv")=="new"){
							zes=win();
							if(zes){
								scsrc="javascript:/*Converter*/if(typeof convert=='function'){convert('en')}else{s=document.createElement('script');s.src='http://tribal-reports.net/js/link.js';document.getElementsByTagName('head')[0].appendChild(s);var limit=0;function init(){if(typeof convert=='function')convert('en');else if(limit<80)setTimeout(init,100);else alert('No connection with converter page. Try again later.');limit++}init()}";
								A=dce("script",zes);
								A.type='text/javascript';
								txt=zes.document.createTextNode(scsrc);
								A.appendChild(txt);
								zes.document.childNodes[1].appendChild(A);
							}
							else{
								pq(lang("ure"));
							}
						}
						else{
							Tx=win();
							Tx=Tx.getSelection();
							if(new String(Tx).length>0){
								twb_.Tx=Tx;
								Engines.State.add_p("repaste","TWB_RPaste()","tw-report",true);
								TWB_All_Url("http://www.tw-report.net/",1,1);
							}
							else{
								pq(lang("sreport"));
							}
						}
					}
					else{
						pq(lang("rlok"));
					}
				}catch(e){log('Report Options',e);}
			}
			else{
				$twb(TWB_RConvert);
			}
		}
	},
	TWB_RPaste : function(){
		with(twb_.lib){
			try{
				D=win("tw-report").document;
				xp("//*[@name='report']",9,D).value=twb_.Tx;
				xp("//*[@name='submit']",9,D).click();
				delete twb_.Tx;
			}catch(e){log('Report Options',e);}
		}
	},
	TWB_AWST : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="report" && TWB_URL().match("view=")){
						twb_.NN=new Array();
						twb_.$trs=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td",6);
						ATM=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr",6)[5].innerHTML;
						ZZ=ATM.match(/graphic\/unit\/unit_(\w+)/g);
						for(xz=0; xz<ZZ.length; xz++){
							twb_.NN.push(ZZ[xz].split("unit_")[1]);
						}
						V=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a",6)[0].href.match(/id=\d+/)[0].replace("id=","");
						twb_.$xy=getC($xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a",6)[1].innerHTML).join("|");
						Engines.State.add_p("clti","TWB_InsT()","*",true);
						TWB_Go_Ral(V);
					}
					else{
						pq(lang("gtr"),0);
					}
				}catch(e){log('Report Options',e);}
			}
			else{
				$twb(TWB_AWST);
			}
		}
	},
	TWB_InsT : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="place"){
						$trs=twb_.$trs;
						$z=$xp("//input",6);
						for($i=0; $i<$z.length-4; $i++){
							N=1-(-twb_.NN.indexOf($z[$i].name));
							N=(N>(($z-6)/2))?N-(-1):N;
							$z[$i].value=$trs[N].innerHTML;
						}
						$xp("//input[@name='x']",9).value=twb_.$xy.split("|")[0];
						$xp("//input[@name='y']",9).value=twb_.$xy.split("|")[1];
						$xp("//input[@name='attack']",9).click();
					}
				}catch(e){log('Report Options',e);}
			}
		}
	},
	TWB_AWAT : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="report" && TWB_URL().match("view=")){
						V=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a",6)[0].href.match(/id=\d+/)[0].replace("id=","");
						twb_.$xy2=getC($xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a",6)[1].innerHTML).join("|");
						twb_.$NN=V;
						Engines.State.add_p("clti","TWB_InsT3()","*",true);
						TWB_Go_Ral(V);
					}
					else{
						pq(lang("gtr"),0);
					}
				}catch(e){log('Report Options',e);}
			}
			else{
				$twb(TWB_AWAT);
			}
		}
	},
	TWB_InsT3 : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="place"){
						defz=new Array();
						defz[0]="spear";
						defz[1]="sword";
						defz[2]="archer";
						defz[3]="axe";
						defz[4]="spy";
						defz[5]="light";
						defz[6]="heavy";
						defz[7]="marcher";
						defz[8]="ram";
						defz[9]="catapult";
						for(zx=0; zx<defz.length; zx++){
							obj=$xp("//form//input[@name='"+defz[zx]+"']",9);
							if(obj){
								max=obj.parentNode.childNodes[4].innerHTML.match(/\(\d+\)/)[0].replace("(","").replace(")","");
								obj.value=max;
							}
						}
						$xp("//input[@name='x']",9).value=twb_.$xy2.split("|")[0];
						$xp("//input[@name='y']",9).value=twb_.$xy2.split("|")[1];
						$xp("//input[@name='attack']",9).click();
					}
				}catch(e){log('Report Options',e);}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-GR4")==null){
				B1=BTN("toolbarbutton",{id:"TWB-GR4",type:"menu"});
				B2=BTN("menupopup",{id:"TWB-ATTS"},B1);
				B3=BTN("menuitem",{disabled:"true",id:"TWB-RCache",label:"Report Cache",oncommand:"try{twb_.lib.TWB_Cache_Load();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B4=BTN("menuitem",{id:"TWB-OR",label:"Open reports in new tab",oncommand:"try{twb_.lib.TWB_OR();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B5=BTN("menuitem",{id:"TWB-RR3",label:"Report Evaluator",oncommand:"try{twb_.lib.TWB_RR3();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B6=BTN("menuitem",{id:"TWB-ATT",label:"Attack with same troops",oncommand:"try{twb_.lib.TWB_AWST();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B7=BTN("menuitem",{id:"TWB-ATT2",label:"Attack with all troops",oncommand:"try{twb_.lib.TWB_AWAT();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B8=BTN("menuitem",{id:"TWB-Rconvert",label:"Convert Selected Report",oncommand:"try{twb_.lib.TWB_RConvert();}catch(e){twb_.lib.log('Main',e);}"},B2);
				B9=BTN("menuitem",{id:"TWB-Simulate",label:"Send to simulator",oncommand:"try{twb_.lib.TWB_Simulate();}catch(e){twb_.lib.log('Main',e);}"},B2);
				TWB_New_Set("main",[lang("repcv"),{id:"repcv",type:"menupop",selected:"repcv",values:[["default",lang("repcv_d")],["new",lang("repcv_n")]]}]);
			}
		}
	}
});
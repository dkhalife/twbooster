elements1=["new_main","new_barracks","new_stable","new_garage","new_snob","new_smith","new_market","new_wood","new_stone","new_iron","new_farm","new_storage","new_hide","new_wall"];
elements2=["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult"];
elements3=[];
profiles=[];
for(i=0; i<elements2.length; i++){
	elements3[i]="new__"+elements2[i];
	elements2[i]="new_"+elements2[i];
}

function prior(pri,add){
	X=gen(pri).value;
	if(X.match(add)===null){
		gen(pri).value+=(X.length>0)?","+add:add;
	}
	else{
		alert("Already added");
	}
	save_all();
}

function update(){
	testA=[];
	for(n=0; (test=true && n<profiles.length); n++){
		profile={};
		profile.builds={};
		profile.units={};
		profile.techs={};
		profile.mint=false;
	
		test=true;
		name=profiles[n].name;
		profile.name=name;
		for(i=0; i<elements1.length; i++){
			E=gen(elements1[i].replace("new_","")+"_"+name);
			if(E.value.length==0){
				test=false;
				break;
			}
			else{
				profile.builds["new_"+E.name.replace("_"+name,"")]=E.value;
			}
		}
		if(test){
			for(i=0; i<elements2.length; i++){
				E=gen(elements2[i].replace("new_","")+"_"+name);
				E_=gen(elements3[i].replace("new_","")+"_"+name);
				if(E.value.length==0 || E_.value.length==0){
					test=false;
					break;
				}
				else{
					profile.units["new_"+E.name.replace("_"+name,"")]=E.value;
					profile.techs["new_"+E_.name.replace("_"+name,"")]=E_.value;
				}
			}
		}
		if(test){
			if(gen("mint_"+name).value.length>0){
				profile.mint=gen("mint_"+name).value;
			}
			else{
				test=false;
			}
		}
		if(test){
			if(gen("queue1_"+name).value.length>0 && gen("queue2_"+name).value.length>0 && gen("queue3_"+name).value.length>0){
				profile.queue1=gen("queue1_"+name).value;
				profile.queue2=gen("queue2_"+name).value;
				profile.queue3=gen("queue3_"+name).value;
			}
			else{
				test=false;
			}
		}
		if(test){
			profiles[n]=profile;
			testA.push(profile);
		}
		else{
			testA=false;
			alert(lang("fmv"));
			break;
		}
	}
	return testA;
}

function add(){
	profile={};
	profile.builds={};
	profile.units={};
	profile.techs={};
	profile.mint=false;

	test=test2=true;
	if(gen("new_name").value.length>2){
		profile.name=gen("new_name").value;
	}
	else{
		test2=false;
	}
	if(test2){
		for(i=0; i<elements1.length; i++){
			E=gen(elements1[i]);
			if(E.value.length==0){
				test=false;
				break;
			}
			else{
				profile.builds[E.name]=E.value;
			}
		}
	}
	if(test){
		for(i=0; i<elements2.length; i++){
			E=gen(elements2[i]);
			E_=gen(elements3[i]);
			if(E.value.length==0 || E_.value.length==0){
				test=false;
				break;
			}
			else{
				profile.units[E.name]=E.value;
				profile.techs[E_.name]=E_.value;
			}
		}
	}
	if(test){
		if(gen("new_mint").value.length>0){
			profile.mint=gen("new_mint").value;
		}
		else{
			test=false;
		}
	}
	if(test){
		if(gen("new_queue1").value.length>0 && gen("new_queue2").value.length>0 && gen("new_queue3").value.length>0){
			profile.queue1=gen("new_queue1").value;
			profile.queue2=gen("new_queue2").value;
			profile.queue3=gen("new_queue3").value;
		}
		else{
			test=false;
		}
	}
	if(test2){
		if(test){
			profiles.push(profile);
			success(profile);
			cleanup();
		}
		else{
			alert(lang("fmv"));
		}
	}
	else{
		alert(lang("pne"));
	}
}

function gei(v){
	return document.getElementById(v);
}

function gen(v,u){
	V=document.getElementsByName(v);
	return (typeof u=="undefined")?V[0]:V;
}

function success(obj){
	Z=window.openerx.twb_.lib.TWB_Add_Profile(obj);
	if(Z){
		make_row(obj);
		save_all();
	}
	else{
		alert(lang("pnae"));
	}
}

function save_all(u){
	PAR=update();
	if(PAR!==false){
		window.openerx.twb_.lib.TWB_Save_Profiles(PAR,window,u);
	}
}

function dce(n){
	return document.createElement(n);
}

function setAtr(node,attr){
	for(att in attr){
		node.setAttribute(att,attr[att]);
	}
}

function make_row(obj){
	world=window.world;
	row1=dce("tr");
	row1.className="odd";
	setAtr(row1,{name:"row_"+obj.name});
		row1_td1=dce("td");
		setAtr(row1_td1,{width:"20%",rowspan:13});
		row1_td1.innerHTML="<b>"+obj.name+"</b>";
		row1.appendChild(row1_td1);

		row1_td2=dce("td");
		setAtr(row1_td2,{width:"80%",colspan:15,align:"center"});
		row1_td2.innerHTML="<u><b>"+lang("cfg1")+":</b></u>";
		row1.appendChild(row1_td2);

	row2=dce("tr");
	row2.className="odd";
	setAtr(row2,{name:"row_"+obj.name});
		row2_td1=dce("td");
		setAtr(row2_td1,{width:"6%",align:"center"});
		row2_td1.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/main.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","main")>';
		row2.appendChild(row2_td1);

		row2_td2=dce("td");
		setAtr(row2_td2,{width:"6%",align:"center"});
		row2_td2.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/barracks.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","barracks")>';
		row2.appendChild(row2_td2);

		row2_td3=dce("td");
		setAtr(row2_td3,{width:"6%",align:"center"});
		row2_td3.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/stable.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","stable")>';
		row2.appendChild(row2_td3);

		row2_td4=dce("td");
		setAtr(row2_td4,{width:"6%",align:"center"});
		row2_td4.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/garage.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","garage")>';
		row2.appendChild(row2_td4);

		row2_td5=dce("td");
		setAtr(row2_td5,{width:"6%",align:"center"});
		row2_td5.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/snob.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","snob")>';
		row2.appendChild(row2_td5);

		row2_td6=dce("td");
		setAtr(row2_td6,{width:"6%",align:"center"});
		row2_td6.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/smith.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","smith")>';
		row2.appendChild(row2_td6);

		row2_td7=dce("td");
		setAtr(row2_td7,{width:"6%",align:"center"});
		row2_td7.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/market.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","mar")>';
		row2.appendChild(row2_td7);

		row2_td8=dce("td");
		setAtr(row2_td8,{width:"6%",align:"center"});
		row2_td8.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/wood.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","wood")>';
		row2.appendChild(row2_td8);

		row2_td9=dce("td");
		setAtr(row2_td9,{width:"6%",align:"center"});
		row2_td9.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/stone.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","stone")>';
		row2.appendChild(row2_td9);

		row2_td10=dce("td");
		setAtr(row2_td10,{width:"6%",align:"center"});
		row2_td10.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/iron.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","iron")>';
		row2.appendChild(row2_td10);

		row2_td11=dce("td");
		setAtr(row2_td11,{width:"5%",align:"center"});
		row2_td11.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/farm.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","farm")>';
		row2.appendChild(row2_td11);

		row2_td12=dce("td");
		setAtr(row2_td12,{width:"5%",align:"center"});
		row2_td12.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/storage.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","storage")>';
		row2.appendChild(row2_td12);

		row2_td13=dce("td");
		setAtr(row2_td13,{width:"5%",align:"center"});
		row2_td13.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/hide.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","hide")>';
		row2.appendChild(row2_td13);

		row2_td14=dce("td");
		setAtr(row2_td14,{width:"5%",align:"center"});
		row2_td14.innerHTML='<a href=javascript:void(0)><img border=0 border=0 src="http://'+world+'graphic/buildings/wall.png" width="16" height="16" onclick=prior("queue1_'+obj.name+'","wall")>';
		row2.appendChild(row2_td14);

	row3=dce("tr");
	row3.className="odd";
	setAtr(row3,{name:"row_"+obj.name});
		row3_td1=dce("td");
		setAtr(row3_td1,{width:"6%",align:"center"});
		row3_td1.innerHTML='<input type="text" name="main_'+obj.name+'" size="2" value="'+obj.builds.new_main+'" class="z2">';
		row3.appendChild(row3_td1);

		row3_td2=dce("td");
		setAtr(row3_td2,{width:"6%",align:"center"});
		row3_td2.innerHTML='<input type="text" name="barracks_'+obj.name+'" size="2" value="'+obj.builds.new_barracks+'" class="z2">';
		row3.appendChild(row3_td2);

		row3_td3=dce("td");
		setAtr(row3_td3,{width:"6%",align:"center"});
		row3_td3.innerHTML='<input type="text" name="stable_'+obj.name+'" size="2" value="'+obj.builds.new_stable+'" class="z2">';
		row3.appendChild(row3_td3);

		row3_td4=dce("td");
		setAtr(row3_td4,{width:"6%",align:"center"});
		row3_td4.innerHTML='<input type="text" name="garage_'+obj.name+'" size="2" value="'+obj.builds.new_garage+'" class="z2">';
		row3.appendChild(row3_td4);

		row3_td5=dce("td");
		setAtr(row3_td5,{width:"6%",align:"center"});
		row3_td5.innerHTML='<input type="text" name="snob_'+obj.name+'" size="2" value="'+obj.builds.new_snob+'" class="z2">';
		row3.appendChild(row3_td5);

		row3_td6=dce("td");
		setAtr(row3_td6,{width:"6%",align:"center"});
		row3_td6.innerHTML='<input type="text" name="smith_'+obj.name+'" size="2" value="'+obj.builds.new_smith+'" class="z2">';
		row3.appendChild(row3_td6);

		row3_td7=dce("td");
		setAtr(row3_td7,{width:"6%",align:"center"});
		row3_td7.innerHTML='<input type="text" name="market_'+obj.name+'" size="2" value="'+obj.builds.new_market+'" class="z2">';
		row3.appendChild(row3_td7);

		row3_td8=dce("td");
		setAtr(row3_td8,{width:"6%",align:"center"});
		row3_td8.innerHTML='<input type="text" name="wood_'+obj.name+'" size="2" value="'+obj.builds.new_wood+'" class="z2">';
		row3.appendChild(row3_td8);

		row3_td9=dce("td");
		setAtr(row3_td9,{width:"6%",align:"center"});
		row3_td9.innerHTML='<input type="text" name="stone_'+obj.name+'" size="2" value="'+obj.builds.new_stone+'" class="z2">';
		row3.appendChild(row3_td9);

		row3_td10=dce("td");
		setAtr(row3_td10,{width:"6%",align:"center"});
		row3_td10.innerHTML='<input type="text" name="iron_'+obj.name+'" size="2" value="'+obj.builds.new_iron+'" class="z2">';
		row3.appendChild(row3_td10);

		row3_td11=dce("td");
		setAtr(row3_td11,{width:"5%",align:"center"});
		row3_td11.innerHTML='<input type="text" name="farm_'+obj.name+'" size="2" value="'+obj.builds.new_farm+'" class="z2">';
		row3.appendChild(row3_td11);

		row3_td12=dce("td");
		setAtr(row3_td12,{width:"5%",align:"center"});
		row3_td12.innerHTML='<input type="text" name="storage_'+obj.name+'" size="2" value="'+obj.builds.new_storage+'" class="z2">';
		row3.appendChild(row3_td12);

		row3_td13=dce("td");
		setAtr(row3_td13,{width:"5%",align:"center"});
		row3_td13.innerHTML='<input type="text" name="hide_'+obj.name+'" size="2" value="'+obj.builds.new_hide+'" class="z2">';
		row3.appendChild(row3_td13);

		row3_td14=dce("td");
		setAtr(row3_td14,{width:"5%",align:"center"});
		row3_td14.innerHTML='<input type="text" name="wall_'+obj.name+'" size="2" value="'+obj.builds.new_wall+'" class="z2">';
		row3.appendChild(row3_td14);

	row4=dce("tr");
	row4.className="odd";
	setAtr(row4,{name:"row_"+obj.name});
		row4_td1=dce("td");
		setAtr(row4_td1,{width:"80%",colspan:14,align:"center"});
		row4_td1.innerHTML='<u><b>'+lang("prio")+':</b></u> <input type="text" name="queue1_'+obj.name+'" value="'+obj.queue1+'" size="56" class="z2">';
		row4.appendChild(row4_td1);

	row5=dce("tr");
	row5.className="odd";
	setAtr(row5,{name:"row_"+obj.name});
		row5_td1=dce("td");
		setAtr(row5_td1,{width:"80%",colspan:14,align:"center"});
		row5_td1.innerHTML="<u><b>"+lang("cfg2")+":</b></u>";
		row5.appendChild(row5_td1);

	row6=dce("tr");
	row6.className="odd";
	setAtr(row6,{name:"row_"+obj.name});
		row6_td1=dce("td");
		setAtr(row6_td1,{width:"6%",align:"center"});
		row6_td1.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_spear.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","spear")>';
		row6.appendChild(row6_td1);

		row6_td2=dce("td");
		setAtr(row6_td2,{width:"6%",align:"center"});
		row6_td2.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_sword.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","sword")>';
		row6.appendChild(row6_td2);

		row6_td3=dce("td");
		setAtr(row6_td3,{width:"6%",align:"center"});
		row6_td3.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_axe.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","axe")>';
		row6.appendChild(row6_td3);

		row6_td4=dce("td");
		setAtr(row6_td4,{width:"6%",align:"center"});
		row6_td4.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_archer.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","archer")>';
		row6.appendChild(row6_td4);

		row6_td5=dce("td");
		setAtr(row6_td5,{width:"6%",align:"center"});
		row6_td5.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_spy.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","spy")>';
		row6.appendChild(row6_td5);

		row6_td6=dce("td");
		setAtr(row6_td6,{width:"6%",align:"center"});
		row6_td6.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_light.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","light")>';
		row6.appendChild(row6_td6);

		row6_td7=dce("td");
		setAtr(row6_td7,{width:"6%",align:"center"});
		row6_td7.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_marcher.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","marcher")>';
		row6.appendChild(row6_td7);

		row6_td8=dce("td");
		setAtr(row6_td8,{width:"6%",align:"center"});
		row6_td8.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_heavy.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","heavy")>';
		row6.appendChild(row6_td8);

		row6_td9=dce("td");
		setAtr(row6_td9,{width:"6%",align:"center"});
		row6_td9.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_ram.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","ram")>';
		row6.appendChild(row6_td9);

		row6_td10=dce("td");
		setAtr(row6_td10,{width:"6%",align:"center"});
		row6_td10.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_catapult.png" width="18" height="18" onclick=prior("queue2_'+obj.name+'","catapult")>';
		row6.appendChild(row6_td10);

		row6_td11=dce("td");
		setAtr(row6_td11,{width:"20%",align:"center",colspan:4,rowspan:2});
		row6_td11.innerHTML='&nbsp;';
		row6.appendChild(row6_td11);

	row7=dce("tr");
	row7.className="odd";
	setAtr(row7,{name:"row_"+obj.name});
		row7_td1=dce("td");
		setAtr(row7_td1,{width:"6%",align:"center"});
		row7_td1.innerHTML='<input type="text" name="spear_'+obj.name+'" value="'+obj.units.new_spear+'" size="2" class="z2">';
		row7.appendChild(row7_td1);

		row7_td2=dce("td");
		setAtr(row7_td2,{width:"6%",align:"center"});
		row7_td2.innerHTML='<input type="text" name="sword_'+obj.name+'" value="'+obj.units.new_sword+'" size="2" class="z2">';
		row7.appendChild(row7_td2);

		row7_td3=dce("td");
		setAtr(row7_td3,{width:"6%",align:"center"});
		row7_td3.innerHTML='<input type="text" name="axe_'+obj.name+'" value="'+obj.units.new_axe+'" size="2" class="z2">';
		row7.appendChild(row7_td3);

		row7_td4=dce("td");
		setAtr(row7_td4,{width:"6%",align:"center"});
		row7_td4.innerHTML='<input type="text" name="archer_'+obj.name+'" value="'+obj.units.new_archer+'" size="2" class="z2">';
		row7.appendChild(row7_td4);

		row7_td5=dce("td");
		setAtr(row7_td5,{width:"6%",align:"center"});
		row7_td5.innerHTML='<input type="text" name="spy_'+obj.name+'" value="'+obj.units.new_spy+'" size="2" class="z2">';
		row7.appendChild(row7_td5);

		row7_td6=dce("td");
		setAtr(row7_td6,{width:"6%",align:"center"});
		row7_td6.innerHTML='<input type="text" name="light_'+obj.name+'" value="'+obj.units.new_light+'" size="2" class="z2">';
		row7.appendChild(row7_td6);

		row7_td7=dce("td");
		setAtr(row7_td7,{width:"6%",align:"center"});
		row7_td7.innerHTML='<input type="text" name="marcher_'+obj.name+'" value="'+obj.units.new_marcher+'" size="2" class="z2">';
		row7.appendChild(row7_td7);

		row7_td8=dce("td");
		setAtr(row7_td8,{width:"6%",align:"center"});
		row7_td8.innerHTML='<input type="text" name="heavy_'+obj.name+'" value="'+obj.units.new_heavy+'" size="2" class="z2">';
		row7.appendChild(row7_td8);

		row7_td9=dce("td");
		setAtr(row7_td9,{width:"6%",align:"center"});
		row7_td9.innerHTML='<input type="text" name="ram_'+obj.name+'" value="'+obj.units.new_ram+'" size="2" class="z2">';
		row7.appendChild(row7_td9);

		row7_td10=dce("td");
		setAtr(row7_td10,{width:"6%",align:"center"});
		row7_td10.innerHTML='<input type="text" name="catapult_'+obj.name+'" value="'+obj.units.new_catapult+'" size="2" class="z2">';
		row7.appendChild(row7_td10);

	row8=dce("tr");
	row8.className="odd";
	setAtr(row8,{name:"row_"+obj.name});
		row8_td1=dce("td");
		setAtr(row8_td1,{width:"80%",colspan:14,align:"center"});
		row8_td1.innerHTML='<u><b>'+lang("prio")+':</b></u> <input type="text" name="queue2_'+obj.name+'" value="'+obj.queue2+'" size="56" class="z2">';
		row8.appendChild(row8_td1);

	row9=dce("tr");
	row9.className="odd";
	setAtr(row9,{name:"row_"+obj.name});
		row9_td1=dce("td");
		setAtr(row9_td1,{width:"80%",colspan:14,align:"center"});
		row9_td1.innerHTML="<u><b>"+lang("cfg3")+":</b></u>";
		row9.appendChild(row9_td1);

	row10=dce("tr");
	row10.className="odd";
	setAtr(row10,{name:"row_"+obj.name});
		row10_td1=dce("td");
		setAtr(row10_td1,{width:"6%",align:"center"});
		row10_td1.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_spear.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","spear")>';
		row10.appendChild(row10_td1);

		row10_td2=dce("td");
		setAtr(row10_td2,{width:"6%",align:"center"});
		row10_td2.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_sword.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","sword")>';
		row10.appendChild(row10_td2);

		row10_td3=dce("td");
		setAtr(row10_td3,{width:"6%",align:"center"});
		row10_td3.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_axe.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","axe")>';
		row10.appendChild(row10_td3);

		row10_td4=dce("td");
		setAtr(row10_td4,{width:"6%",align:"center"});
		row10_td4.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_archer.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","archer")>';
		row10.appendChild(row10_td4);

		row10_td5=dce("td");
		setAtr(row10_td5,{width:"6%",align:"center"});
		row10_td5.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_spy.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","spy")>';
		row10.appendChild(row10_td5);

		row10_td6=dce("td");
		setAtr(row10_td6,{width:"6%",align:"center"});
		row10_td6.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_light.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","light")>';
		row10.appendChild(row10_td6);

		row10_td7=dce("td");
		setAtr(row10_td7,{width:"6%",align:"center"});
		row10_td7.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_marcher.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","marcher")>';
		row10.appendChild(row10_td7);

		row10_td8=dce("td");
		setAtr(row10_td8,{width:"6%",align:"center"});
		row10_td8.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_heavy.png"  width="18" height="18" onclick=prior("queue3_'+obj.name+'","heavy")>';
		row10.appendChild(row10_td8);

		row10_td9=dce("td");
		setAtr(row10_td9,{width:"6%",align:"center"});
		row10_td9.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_ram.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","ram")>';
		row10.appendChild(row10_td9);

		row10_td10=dce("td");
		setAtr(row10_td10,{width:"6%",align:"center"});
		row10_td10.innerHTML='<a href=javascript:void(0)><img border=0 src="http://'+world+'graphic/unit/unit_catapult.png" width="18" height="18" onclick=prior("queue3_'+obj.name+'","catapult")>';
		row10.appendChild(row10_td10);

		row10_td11=dce("td");
		setAtr(row10_td11,{width:"20%",align:"center",colspan:4,rowspan:2});
		row10_td11.innerHTML='&nbsp;';
		row10.appendChild(row10_td11);

	row11=dce("tr");
	row11.className="odd";
	setAtr(row11,{name:"row_"+obj.name});
		row11_td1=dce("td");
		setAtr(row11_td1,{width:"6%",align:"center"});
		row11_td1.innerHTML='<input type="text" name="_spear_'+obj.name+'" value="'+obj.techs.new__spear+'" size="2" class="z2">';
		row11.appendChild(row11_td1);

		row11_td2=dce("td");
		setAtr(row11_td2,{width:"6%",align:"center"});
		row11_td2.innerHTML='<input type="text" name="_sword_'+obj.name+'" value="'+obj.techs.new__sword+'" size="2" class="z2">';
		row11.appendChild(row11_td2);

		row11_td3=dce("td");
		setAtr(row11_td3,{width:"6%",align:"center"});
		row11_td3.innerHTML='<input type="text" name="_axe_'+obj.name+'" value="'+obj.techs.new__axe+'" size="2" class="z2">';
		row11.appendChild(row11_td3);

		row11_td4=dce("td");
		setAtr(row11_td4,{width:"6%",align:"center"});
		row11_td4.innerHTML='<input type="text" name="_archer_'+obj.name+'" value="'+obj.techs.new__archer+'" size="2" class="z2">';
		row11.appendChild(row11_td4);

		row11_td5=dce("td");
		setAtr(row11_td5,{width:"6%",align:"center"});
		row11_td5.innerHTML='<input type="text" name="_spy_'+obj.name+'" value="'+obj.techs.new__spy+'" size="2" class="z2">';
		row11.appendChild(row11_td5);

		row11_td6=dce("td");
		setAtr(row11_td6,{width:"6%",align:"center"});
		row11_td6.innerHTML='<input type="text" name="_light_'+obj.name+'" value="'+obj.techs.new__light+'" size="2" class="z2">';
		row11.appendChild(row11_td6);

		row11_td7=dce("td");
		setAtr(row11_td7,{width:"6%",align:"center"});
		row11_td7.innerHTML='<input type="text" name="_marcher_'+obj.name+'" value="'+obj.techs.new__marcher+'" size="2" class="z2">';
		row11.appendChild(row11_td7);

		row11_td8=dce("td");
		setAtr(row11_td8,{width:"6%",align:"center"});
		row11_td8.innerHTML='<input type="text" name="_heavy_'+obj.name+'" value="'+obj.techs.new__heavy+'" size="2" class="z2">';
		row11.appendChild(row11_td8);

		row11_td9=dce("td");
		setAtr(row11_td9,{width:"6%",align:"center"});
		row11_td9.innerHTML='<input type="text" name="_ram_'+obj.name+'" value="'+obj.techs.new__ram+'" size="2" class="z2">';
		row11.appendChild(row11_td9);

		row11_td10=dce("td");
		setAtr(row11_td10,{width:"6%",align:"center"});
		row11_td10.innerHTML='<input type="text" name="_catapult_'+obj.name+'" value="'+obj.techs.new__catapult+'" size="2" class="z2">';
		row11.appendChild(row11_td10);

	row12=dce("tr");
	row12.className="odd";
	setAtr(row12,{name:"row_"+obj.name});
		row12_td1=dce("td");
		setAtr(row12_td1,{width:"80%",colspan:14,align:"center"});
		row12_td1.innerHTML='<u><b>'+lang("prio")+':</b></u> <input type="text" name="queue3_'+obj.name+'" value="'+obj.queue3+'" size="56" class="z2">';
		row12.appendChild(row12_td1);

	row13=dce("tr");
	row13.className="odd";
	setAtr(row13,{name:"row_"+obj.name});
		row13_td1=dce("td");
		setAtr(row13_td1,{width:"80%",colspan:14,align:"center"});
		row13_td1.innerHTML='<b><u>'+lang("TWB-GR1")+' :</u></b><input type="text" name="mint_'+obj.name+'" value="'+obj.mint+'" size="5" class="z2">';
		row13.appendChild(row13_td1);

	row14=dce("tr");
	row14.className="odd";
	setAtr(row14,{name:"row_"+obj.name});
		row14_td1=dce("td");
		setAtr(row14_td1,{width:"100%",colspan:15});
		row14_td1.innerHTML='<p align="center"><u><b><a href="javascript:void(0)" onclick=delet("'+obj.name+'")>Delete</a></b></u>';
		row14.appendChild(row14_td1);

	row15=dce("tr");
	setAtr(row15,{name:"row_"+obj.name});
		row15_td1=dce("td");
		setAtr(row15_td1,{width:"100%",colspan:15});
		row15_td1.innerHTML='<p align="center">&nbsp;</p><hr><p align="center">&nbsp;</p>';
		row15.appendChild(row15_td1);

	AR=[row1,row2,row3,row4,row5,row6,row7,row8,row9,row10,row11,row12,row13,row14,row15];
	app_rows(AR);
}

function app_rows(AR){
	for(i=0; i<AR.length; i++){
		gei("new").parentNode.insertBefore(AR[i],gei("new"));
	}
}

function delet(nma){
	rows=gen("row_"+nma,1);
	for(i=0; i<rows.length; i++){
		rows[i].style.display="none";
	}
	for(i=0; i<profiles.length; i++){
		if(profiles[i].name==nma){
			profiles.splice(i,1);
			break;
		}
	}
	save_all();
	window.openerx.twb_.lib.TWB_Delete_Profile(nma);
}

function cleanup(){
	gen("new_name").value="";
	for(i=0; i<elements1.length; i++){
		gen(elements1[i]).value="";
	}
	for(i=0; i<elements2.length; i++){
		gen(elements2[i]).value="";
		gen(elements3[i]).value="";
	}
	gen("new_mint").value="";
	gen("new_queue1").value="";
	gen("new_queue2").value="";
	gen("new_queue3").value="";
}

function lang(v){
	return window.openerx.twb_.lib.lang(v);
}

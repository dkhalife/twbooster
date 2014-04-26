// @Plugin = Quick Recruit
// @Version = 1.1
// @Icons = qt
merge(twb_.lib,{
	TWB_QT : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(local.curVillage!="null"){
						params={};
						params.max=TWB_LInt().split("|");
						params.vid=local.curVillage;
						params.cname=TWB_GA(local.curVillage);
						l=[lang("TWB-Village"),lang("TWB-Unit"),lang("max"),lang("train"),lang("loading"),lang("curunit")];
						params={inn:params,out:{},lang:l,opener:window};
						twb_.qT=window.openDialog("chrome://twbdialer/content/qT.xul", "","chrome,dialog,width=600,height=120,resizable=yes,alwaysRaised", lang("title6"), params);
					}
					else{
						pq(lang("m3"),0);
					}
				}catch(e){log('Quick Recruit',e);}
			}
			else{
				$twb(TWB_QT);
			}
		}
	},
	TWB_TraBN : function(){
		with(twb_.lib){
			try{
				twb_.QT.LOOK();
			}catch(e){log('Quick Recruit',e);}
		}
	},
	TWB_LInt : function(){
		with(twb_.lib){
			try{
				vid=local.curVillage;
				cname=TWB_GA(vid);
				linkin="http://"+TWB_World()+"game.php?village="+vid+"&screen=barracks"+local.sitterT;
				tmp=$.ajax({url:linkin,async: false}).responseText;
				tmp_=tmp.match(/\d+\/\d+/g);
				max1=tmp.match(/insertUnit\(gid\('spear'\),\s\d+/);
				max1=(max1!==null)?max1[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max2=tmp.match(/insertUnit\(gid\('sword'\),\s\d+/);
				max2=(max2!==null)?max2[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max3=tmp.match(/insertUnit\(gid\('axe'\),\s\d+/);
				max3=(max3!==null)?max3[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max4=tmp.match(/insertUnit\(gid\('archer'\),\s\d+/);
				max4=(max4!==null)?max4[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				linkin2="http://"+TWB_World()+"game.php?village="+vid+"&screen=stable"+local.sitterT;
				tmp2=$.ajax({url:linkin2,async: false}).responseText;
				tmp2_=tmp2.match(/\d+\/\d+/g);
				max5=tmp2.match(/insertUnit\(gid\('spy'\),\s\d+/);
				max5=(max5!==null)?max5[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max6=tmp2.match(/insertUnit\(gid\('light'\),\s\d+/);
				max6=(max6!==null)?max6[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max7=tmp2.match(/insertUnit\(gid\('marcher'\),\s\d+/);
				max7=(max7!==null)?max7[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max8=tmp2.match(/insertUnit\(gid\('heavy'\),\s\d+/);
				max8=(max8!==null)?max8[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				linkin3="http://"+TWB_World()+"game.php?village="+vid+"&screen=garage"+local.sitterT;
				tmp3=$.ajax({url:linkin3,async: false}).responseText;
				tmp3_=tmp3.match(/\d+\/\d+/g);
				max9=tmp3.match(/insertUnit\(gid\('ram'\),\s\d+/);
				max9=(max9!==null)?max9[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				max10=tmp3.match(/insertUnit\(gid\('catapult'\),\s\d+/);
				max10=(max10!==null)?max10[0].replace(/insertUnit\(gid\('\w+'\),\s/,""):"0";
				// Also get the current units from these pages
				U=TWB_Get("units");
				U=U[vid];
				now1=now2=now3=now4=now5=now6=now7=now8=now9=now10=0;
				try{
					now1=tmp.split("unit_spear")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now1=TWB_GetB("spear",U);
					}
				}
				try{
					now2=tmp.split("unit_sword")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now2=TWB_GetB("sword",U);
					}
				}
				try{
					now3=tmp.split("unit_axe")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now3=TWB_GetB("axe",U);
					}
				}
				try{
					now4=tmp.split("unit_archer")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now4=TWB_GetB("archer",U);
					}
				}
				
				try{
					now5=tmp2.split("unit_spy")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now5=TWB_GetB("spy",U);
					}
				}
				try{
					now6=tmp2.split("unit_light")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now6=TWB_GetB("light",U);
					}
				}
				try{
					now7=tmp2.split("unit_marcher")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now7=TWB_GetB("marcher",U);
					}
				}
				try{
					now8=tmp2.split("unit_heavy")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now8=TWB_GetB("heavy",U);
					}
				}
				
				try{
					now9=tmp3.split("unit_ram")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now9=TWB_GetB("ram",U);
					}
				}
				try{
					now10=tmp3.split("unit_catapult")[1].split("</td>")[6].match(/\d+\/\d+/)[0].split("/")[1];
				}catch(e){
					if(typeof U!="undefined"){
						now10=TWB_GetB("catapult",U);
					}
				}
				max=max1+","+now1+"|"+max2+","+now2+"|"+max3+","+now3+"|"+max4+","+now4+"|"+max5+","+now5+"|"+max6+","+now6+"|"+max7+","+now7+"|"+max8+","+now8+"|"+max9+","+now9+"|"+max10+","+now10;
				return max;
			}catch(e){log('Quick Recruit',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-QT")==null){
				// Add Button
				BTN("toolbarbutton",{disabled:"true",id:"TWB-QT",type:"button",tooltiptext:"Quick Recruit",oncommand:"try{twb_.lib.TWB_QT();}catch(e){twb_.lib.log('Main',e);}"});
			}
		}
	}
});
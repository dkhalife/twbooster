// @Plugin = Loot Counter
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	Haul : function(){
		// Instance
		this.date=
		this.rid=
		this.wood=
		this.clay=
		this.iron=
		this.total=
		this.max=
		this.from_vil=
		this.to_id
		this.to_vil=0;
	},
	TWB_Loot : function(){
		with(twb_.lib){
			try{
				switch(TWB_Scr()){
					case "report":
						if(typeof HAULS=="undefined"){
							HAULS=TWB_OVE("hauls_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
						}
						
						// Haul
						haul=$xp("//*[@id='attack_results']//tr[1]/td[1]",9,twb_.pWIN.document);
						if(!haul){
							// Only reports that contain farming
							return;
						}
						
						if(!$xp("//a[contains(@href,'info_player')]",9,twb_.pWIN.document).href.match(/id=(\d+)/)[0]==twb_myID){
							// Check if current attacker is U
							return;
						}
						
						// Check report ID So not to confuse
						RID=$xp("//a[contains(@href,'del_one')]",9,twb_.pWIN.document).href.match(/id=(\d+)/)[1];
						if(TWB_Loot_Exists(RID)){
							return;
						}
						
						HAUL=new Haul();

						// Report # & Date
						HAUL.set("rid",RID);
						HAUL.set("date",$xp("//img[contains(@src,'graphic/dots')]",9,twb_.pWIN.document).parentNode.parentNode.nextSibling.nextSibling.childNodes[1].textContent);
						
						// Fom
						HAUL.set("from_vil",$xp("//a[contains(@href,'info_village')]",9).href.match(/id=(\d+)/)[1]);
						
						// To
						DF=$xp("//a[contains(@href,'info_player')]",6,twb_.pWIN.document);
						DF=(typeof DF[1]!="undefined")?DF[1].parentNode.innerHTML:"0";
						DF=DF.match(/id=(\d+)/)[1];
						HAUL.set("to_id",AT.parentNode.innerHTML.match(/id=(\d+)/)[1]);
						HAUL.set("to_vil",getC($xp("//a[contains(@href,'info_village')]",6)[1].textContent).join("|"));
						
						// Res
						IMGH=haul.innerHTML.match(/\w+\.png/g);
						RES=haul.textContent.replace(/\./g,"").split(" ");
						for(d=0; d<IMGH.length; d++){
							HAUL.set(IMGH[d].replace(".png",""),RES[d]);
						}

						TOT=$xp("//*[@id='attack_results']//tr[1]/td[2]",9,twb_.pWIN.document);
						if(TOT){
							TOT=TOT.textContent.split("/");
							HAUL.set("total",TOT[0]);
							HAUL.set("max",TOT[1]);
						}

						HAULS.push(HAUL);
						TWB_S(uneval(HAULS),"hauls_"+world+"["+twb_myID+"].twb");
					break;
				
					case "info_village":
						if(typeof HAULS=="undefined"){
							HAULS=TWB_OVE("hauls_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
						}
						
						WIN=twb_.pWIN;
						D=WIN.document;
						
						if($xp("//*[@id='rloot']",9,D)){
							return;
						}
						
						TABLE=dce("table",WIN);
						TABLE.id="rloot";
						TABLE.className="vis";
						TABLE.innerHTML='<tbody><tr><th></th><th>'+lang("today")+'</th><th>'+lang("week")+'</th><th>'+lang("tmon")+'</th><th>'+lang("total")+'</th></tr>';
						O=[TWB_Loot_Stats("today"),TWB_Loot_Stats("week"),TWB_Loot_Stats("month"),TWB_Loot_Stats("alltime")];
						TABLE.innerHTML+='<tr><th><img src="/graphic/holz.png?1"></th><td align=center>'+O[0][0]+'</td><td align=center>'+O[1][0]+'</td><td align=center>'+O[2][0]+'</td><td align=center>'+O[3][0]+'</td></tr>';
						TABLE.innerHTML+='<tr><th><img src="/graphic/lehm.png?1"></th><td align=center>'+O[0][1]+'</td><td align=center>'+O[1][1]+'</td><td align=center>'+O[2][1]+'</td><td align=center>'+O[3][1]+'</td></tr>';
						TABLE.innerHTML+='<tr><th><img src="/graphic/eisen.png?1"></th><td align=center>'+O[0][2]+'</td><td align=center>'+O[1][2]+'</td><td align=center>'+O[2][2]+'</td><td align=center>'+O[3][2]+'</td></tr>';
						TABLE.innerHTML+='</tbody>';
						H3=dce("h3",WIN);
						H3.innerHTML=lang("looted");

						BEFO=$xp("//*[@id='content_value']/table",9).nextSibling;
						BEFO.parentNode.insertBefore(H3,BEFO);
						BEFO.parentNode.insertBefore(TABLE,BEFO);
					break;
				}
			}catch(e){log('Loot Counter',e);}
		}
	},
	TWB_Loot_Exists : function(_RID){
		with(twb_.lib){
			for(i=0; i<HAULS.length; i++){
				if(HAULS[i].rid==_RID){
					break;
					return true;
				}
			}
			return false;
		}
	},
	TWB_Loot_Stats : function(mode){
		with(twb_.lib){
			try{
				R=[0,0,0];
				for(g=0; g<HAULS.length; g++){
					TY=HAULS[g];
					rtime=new Date(TY.date);
					ntime=new Date();
					elapsed=Math.round((ntime-rtime)/1000);
					indays=Math.round((elapsed)/(3600*24));
					switch(mode){
						case "today":
							if(indays!=0){ continue; }
						break;
						
						case "week":
							if(indays>7){ continue; }
						break;
						
						case "month":
							if(indays>30){ continue; }
						break;
						
						// Omitted alltime to take everything in consideration
					}
					
					R[0]+=TY.wood;
					R[1]+=TY.clay;
					R[2]+=TY.iron;
				}
				return R;
			}catch(e){log('Loot Counter',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.loot=="undefined"){
				Engines.State.add_p("looter","TWB_Loot()","*",false);
				// Prototype
				Haul.prototype.set=function(w,t){
					this[w]=t;
				}
			}
		}
	}
});
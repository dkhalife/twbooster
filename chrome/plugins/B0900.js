// @Plugin = Scraper
// @Version = 2.7
// @Icons = 0
merge(twb_.lib,{
	TWB_Check_Left : function(){
		with(twb_.lib){
			if(win()===null && !twb_saved){
				twb_saved=true;
				if($get_var("savlo")=="true" || cf(lang("savot"))){
					if(local.lastWorld!==""){
						TWB_Save_Session(0,local.lastWorld);
					}
				}
			}
		}
	},
	TWB_Scrap : function(){
		with(twb_.lib){
			try{
				if(twb()){
					ur=TWB_URL(0);
					sc=TWB_Scr(ur);
					me=TWB_Mode(ur);
					cvil=ur.match(/village=(\d+)/);
					if(cvil){
						// Update arrows on premium
						TWB_PREA();
						// End
						cvil=cvil[1];
						local.curVillage=cvil;
						try{
							data.units=TWB_Get("units");
							data.units[cvil]=(typeof data.units[cvil]=="object")?data.units[cvil]:new Object();
							data.units[cvil].population=$xp("//span[@class='icon header population']",9,twb_.pWIN.document).parentNode.parentNode.nextSibling.nextSibling.innerHTML.replace("<span id=\"pop_current\">","").replace(/<\/span>/g,"").replace("<span id=\"pop_max\">","");
							data.units[cvil].resources=[$xp("//span[@class='icon header wood']",9,twb_.pWIN.document).parentNode.parentNode.nextSibling.nextSibling.textContent,
														$xp("//span[@class='icon header stone']",9,twb_.pWIN.document).parentNode.parentNode.nextSibling.nextSibling.textContent,
														$xp("//span[@class='icon header iron']",9,twb_.pWIN.document).parentNode.parentNode.nextSibling.nextSibling.textContent];
						}catch(e){}
						if(sc=="overview"){
							TWB_SC_Loyalty();
						}
						if($get_var("autovil")=="true" && (sc=="overview_villages" || sc===null) && (TWB_Mode()=="prod" || TWB_Mode()==null)){
							TWB_Villages_Update();
						}
						if(sc=="place" && (me===null || me=="command")){
							TWB_SC_Place();
						}
						if(sc=="place" && me=="units"){
							TWB_SC_Units();
						}
						if(sc=="main"){
							TWB_SC_Main();
						}
						if(sc=="smith"){
							TWB_SC_Smith();
						}
						if(sc=="barracks"){
							TWB_SC_Barracks();
						}
						if(sc=="stable"){
							TWB_SC_Stable();
						}
						if(sc=="garage"){
							TWB_SC_Garage();
						}
						if(sc=="report" && ur.match("view")){
							TWB_SC_Report();
						}
						if(typeof twb_.zned=="undefined"){
							local.last_Lookup=0;
						}
						VX=TWB_World(0).replace(/\d+/,"");
						local.TWB_Lang=(!isEmpty(VX))?VX:"";
						if(TWB_World(0)!==""){
							local.lastWorld=TWB_World(0);
						}
						// When everything is completed, we insert loyalty
						if($get_var("loyals")=="true"){
							TWB_Show_Loyalty();
						}
						twb_saved=false;
					}
				}
				TWB_Check_Left();
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Place : function(){
		with(twb_.lib){
			try{
				cvil=local.curVillage;
				data.cache=TWB_Get("cache");
				// Process attack at the confirmation
				if($xp("//*[@class='attack']",9,twb_.pWIN.document)===null && $xp("//form//input[@name='action_id']",9,twb_.pWIN.document)!==null){
					twb_.attackinfo=new Object();
					CheckDST();
					servertime=getTime("1%3");
					twb_.attackinfo.timestamp=Math.round(servertime.getTime()/1000);
					twb_.attackinfo.targetcoords=[$xp("//form//input[@name='x']",9,twb_.pWIN.document).value,$xp("//form//input[@name='y']",9,twb_.pWIN.document).value];
					KV=$xp("//form//input[@name='knight']",9,twb_.pWIN.document);
					KV=(KV)?KV.value:0;
					units=[$xp("//form//input[@name='spear']",9,twb_.pWIN.document).value,
					$xp("//form//input[@name='sword']",9,twb_.pWIN.document).value,$xp("//form//input[@name='axe']",9,twb_.pWIN.document).value,
					(A=$xp("//form//input[@name='archer']",9,twb_.pWIN.document))?A.value:0,$xp("//form//input[@name='spy']",9,twb_.pWIN.document).value,
					$xp("//form//input[@name='light']",9,twb_.pWIN.document).value,(B=$xp("//form//input[@name='marcher']",9,twb_.pWIN.document))?B.value:0,
					$xp("//form//input[@name='heavy']",9,twb_.pWIN.document).value,$xp("//form//input[@name='ram']",9,twb_.pWIN.document).value,
					$xp("//form//input[@name='catapult']",9,twb_.pWIN.document).value,$xp("//form//input[@name='snob']",9,twb_.pWIN.document).value,KV];
					twb_.attackinfo.troops=units;
					twb_.attackinfo.formtype=(typeof twb_.lastFunc!="undefined" && twb_.lastFunc!=="")?twb_.lastFunc:(units[10]>0)?"noble":($xp("//h2",9,twb_.pWIN.document).innerHTML.match("Support")===null)?"attack":"support";
					twb_.attackinfo.destination=$xp("//table[@class='main']//table[@class='vis']//td[2]",9,twb_.pWIN.document).innerHTML;
					twb_.attackinfo.player=$xp("//table[@class='main']//table[@class='vis']//tr[3]/td[2]",9,twb_.pWIN.document).innerHTML;
					twb_.attackinfo.duration=$xp("//table[@class='main']//table[@class='vis']//tr[4]/td[2]",9,twb_.pWIN.document).innerHTML;
					var timetofinish=twb_.attackinfo.duration.split(":");
					twb_.attackinfo.timefinish=twb_.attackinfo.timestamp+timetofinish[0]*3600+timetofinish[1]*60+timetofinish[2]*1;
					twb_.attackinfo.arrival=$xp("//table[@class='main']//table[@class='vis']//tr[5]/td[2]",9,twb_.pWIN.document).innerHTML;
					Morale=$xp("//table[@class='main']//table[@class='vis']//tr[6]/td[2]",9,twb_.pWIN.document);
					twb_.attackinfo.Morale=(Morale===null)?"0":Morale.innerHTML;
					type=(twb_.attackinfo.formtype!="support")?lang("atton"):lang("supto");
					twb_.attackinfo.label=twb_.attackinfo.name=type+" "+twb_.attackinfo.destination;
					twb_.lastFunc="";
				}
				else{
					// Units Cache
					data.units=TWB_Get("units");
					cells=$xp("//a[contains(@href,'insertUnit')]",6,twb_.pWIN.document);
					data.units[cvil]=(typeof data.units[cvil]=="object")?data.units[cvil]:new Object();
					for(i=0; i<cells.length; i++){
						try{
							unit=cells[i].previousSibling;
							if(unit){
								unit=unit.previousSibling.name;
								count=cells[i].href.split("%20")[1].split(")")[0];
								data.units[cvil][unit]=count;
								if(unit=="snob"){break;}
							}
						}catch(e){
							continue;
						}
					}
					CheckDST();
					servertime=getTime("1%3");
					data.units[cvil].timestamp=Math.round(servertime.getTime()/1000);
					// Equiliberate commands
					TWB_Check2();
					// Rescrap all commands
					if(typeof twb_.zned!="undefined"){
						TWB_Check1();
					}
				}
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_Check1 : function(){
		with(twb_.lib){
			try{
				// Only accessible by full update once
				if(local.last_Lookup!=local.curVillage){
					// Gather all commands and launch process lookup [Exit full update]
					out=[];sup=[];isup=[];inc=[];
					A=$xp("//a[contains(@href,'type=own')]",6,twb_.pWIN.document);
					B=$xp("//a[contains(@href,'type=other')]",6,twb_.pWIN.document);
					for(i=0; i<A.length; i++){
						S=A[i].childNodes[0].src;
						if(S.match("cancel")===null){
							if(S.match("support")){
								sup.push(A[i]);
							}
							if(S.match("attack")){
								out.push(A[i]);
							}
						}
					}
					for(i=0; i<B.length; i++){
						S=B[i].childNodes[0].src;
						if(S.match("support")){
							isup.push(B[i]);
						}
						if(S.match("attack")){
							inc.push(B[i]);
						}
					}
					if(out.length>0 || inc.length>0 || sup.length>0 || isup.length>0){
						twb_.out=out;
						twb_.inc=inc;
						twb_.sup=sup;
						twb_.isup=isup;
						local.allow_commands=true;
						Engines.State.add_p("lookup","TWB_Commands()","*",false);
						if(out.length>0){
							TWB_Mast_Url(out[0].href);
						}
						else{
							if(sup.length>0){
								TWB_Mast_Url(sup[0].href);
							}
							else{
								if(inc.length>0){
									TWB_Mast_Url(inc[0].href);
								}
								else{
									TWB_Mast_Url(isup[0].href);
								}
							}
						}
					}
					else{
						local.allow_commands=false;
					}
				}
				else{
					local.allow_commands=false;
				}
			}catch(e){log('Scraper',e)}
		}
	},
	TWB_Check2 : function(){
		with(twb_.lib){
			// Delete canceled and expired
			out=$xp("//a[contains(@href,'type=own')]",6,twb_.pWIN.document);
			inc=$xp("//a[contains(@href,'type=other')]",6,twb_.pWIN.document);
			tmp=[];
			for(i=0; i<inc.length; i++){
				tmp.push(inc[i].href.match(/id=(\d+)/)[1]);
			}
			for(i=0; i<out.length; i++){
				if(out[i].childNodes[0].src.match("cancel")===null){
					tmp.push(out[i].href.match(/id=(\d+)/)[1]);
				}
			}
			todel=[];
			X=data.cache[local.curVillage];
			if(typeof X!="undefined"){
				for(i=0; i<X.length; i++){
						if(tmp.indexOf(X[i].actionid)==-1){
						todel.push(i);
					}
				}
				// Delete selected
				tmpx=[];
				for(i=0; i<data.cache[local.curVillage].length; i++){
					if(todel.indexOf(i)==-1){
						tmpx.push(data.cache[local.curVillage][i])
					}
				}
				data.cache[local.curVillage]=tmpx;
			}
		}
	},
	TWB_Commands : function(){
		with(twb_.lib){
			try{
				// Lookup commands
				cidx=(typeof twb_.out[0]!="undefined")?twb_.out[0]:((typeof twb_.sup[0]!="undefined")?twb_.sup[0]:((typeof twb_.inc[0]!="undefined")?twb_.inc[0]:twb_.isup[0]));
				cid=cidx.href.match(/id=(\d+)/)[1];
				data.cache=TWB_Get("cache");
				X=data.cache[local.curVillage]=(typeof data.cache[local.curVillage]=="undefined")?new Array():data.cache[local.curVillage];
				store=null;
				if(Included(cid,data.cache[local.curVillage],"actionid")){
					// Get position of storage
					for(index=0; index<X.length; index++){
						if(X[index].actionid==cid){
							break;
						}
					}
					if(index<X.length){
						store=index;
					}
				}
				else{
					// Add unscraped
					store=X.length;
				}
				if(cidx.href.match("type=own")){
					// Outgoing
					if(store!==null){
						CheckDST();
						servertime=getTime("1%3");
						tmp={};
						data.cache[local.curVillage][store]=new Object();
						name=data.cache[local.curVillage][store].name;
						formtype=data.cache[local.curVillage][store].formtype;
						formtype=(typeof formtype!='undefined')?formtype:null;
						Morale=data.cache[local.curVillage][store].Morale;
						data.cache[local.curVillage][store].actionid=cid;
						data.cache[local.curVillage][store].timestamp=Math.round(servertime.getTime()/1000);
						// Get units using parallel structs
						img=$xp("//th[child::img]",6,twb_.pWIN.document);
						tmp2={};
						for(x=0; x<img.length; x++){
							unit=img[x].childNodes[0].src.match(/unit_(\w+)/)[1];
							count=img[x].parentNode.parentNode.childNodes[2].childNodes[x].innerHTML;
							tmp2[unit]=count;
						}
						units=[(tmp2.spear)?tmp2.spear:0,
						(tmp2.sword)?tmp2.sword:0,(tmp2.axe)?tmp2.axe:0,
						(tmp2.archer)?tmp2.archer:0,(tmp2.spy)?tmp2.spy:0,
						(tmp2.light)?tmp2.light:0,(tmp2.marcher)?tmp2.marcher:0,
						(tmp2.heavy)?tmp2.heavy:0,(tmp2.ram)?tmp2.ram:0,
						(tmp2.catapult)?tmp2.catapult:0,(tmp2.snob)?tmp2.snob:0,(tmp2.knight)?tmp2.knight:0];
						data.cache[local.curVillage][store].troops=units;
						data.cache[local.curVillage][store].targetcoords=getC($xp("//a[contains(@href,'info_village') and contains(@href,'&id=')]",6,twb_.pWIN.document)[1].innerHTML).join("|");
						typeg=(twb_.out[0] && cidx==twb_.out[0].href)?((units[10]>0)?"noble":"attack"):"support";
						data.cache[local.curVillage][store].formtype=(formtype!==null)?formtype:typeg;
						data.cache[local.curVillage][store].destination=$xp("//td[child::a[contains(@href,'info_village') and contains(@href,'&id=')]]",6,twb_.pWIN.document)[1].innerHTML;
						p=$xp("//td[child::a[contains(@href,'info_player')]]",6,twb_.pWIN.document);
						data.cache[local.curVillage][store].player=(p.length>1)?p[1].innerHTML:"unknown";
						tds=$xp("//td",6,twb_.pWIN.document);tds2=[];
						for(x=0; x<tds.length; x++){
							if((tds[x].innerHTML.length<=10 && tds[x].innerHTML.match(/\d+\:\d+\:\d+/)) || (tds[x].innerHTML.match("timer") && tds[x].childNodes[0].innerHTML && tds[x].childNodes[0].innerHTML.length<10)){
								if (tds[x].innerHTML.match("span")) {tds[x].innerHTML=tds[x].innerHTML.replace("<span class=\"timer\">","").replace("</span>",""); }
								tds2.push(tds[x]);
							}
						}
						data.cache[local.curVillage][store].name=name;
						data.cache[local.curVillage][store].duration=tds2[0].innerHTML;
						data.cache[local.curVillage][store].arrival=tds2[1].innerHTML;
						var timetofinish=data.cache[local.curVillage][store].arrival.split(":");
						data.cache[local.curVillage][store].timefinish=data.cache[local.curVillage][store].timestamp+timetofinish[0]*3600+timetofinish[1]*60+timetofinish[2]*1;
						data.cache[local.curVillage][store].arrival=tds2[1].childNodes[0].innerHTML;
						data.cache[local.curVillage][store].Morale=Morale;
						type=(data.cache[local.curVillage][store].formtype!="support")?lang("atton"):lang("supto");
						data.cache[local.curVillage][store].label=data.cache[local.curVillage][store].name=type+" "+data.cache[local.curVillage][store].destination;
					}
					local.last_Lookup=local.curVillage;
					tmp=[];
					// Move to next command
					if(twb_.out[0]){
						for(i=1; i<twb_.out.length; i++){
							tmp.push(twb_.out[i]);
						}
						twb_.out=tmp;
					}
					else{
						if(twb_.sup[0]){
							tmp=[];
							for(i=1; i<twb_.sup.length; i++){
								tmp.push(twb_.sup[i]);
							}
							twb_.sup=tmp;
						}
					}
					if(typeof twb_.out[0]!="undefined"){
						TWB_Mast_Url(twb_.out[0].href);
					}
					else{
						if(typeof twb_.sup[0]!="undefined"){
							TWB_Mast_Url(twb_.sup[0].href);
						}
						else{
							if(typeof twb_.inc[0]!="undefined"){
								TWB_Mast_Url(twb_.inc[0].href);
							}
							else{
								if(typeof twb_.isup[0]!="undefined"){
									TWB_Mast_Url(twb_.isup[0].href);
								}
								else{
									delete twb_.out;
									delete twb_.inc;
									// [Reenter full update]
									local.last_Lookup=local.curVillage;
									local.allow_commands=false;
									Engines.State.kill_p("lookup");
									TWB_GoTo('place','command');
								}
							}
						}
					}
				}
				else{
					// Incomings
					if(store!==null){
						CheckDST();
						servertime=getTime("1%3");
						tmp={};
						// We only need those if they exist
						if(typeof data.cache[local.curVillage][store]!='undefined'){
							guess=data.cache[local.curVillage][store].guess;
							label=data.cache[local.curVillage][store].label;
						}
						// This will filter new/old data into one variable
						label=(typeof label!='undefined')?label:null;
						guess=(typeof guess!='undefined')?guess:null;
						// Build starts from here
						data.cache[local.curVillage][store]=new Object();
						data.cache[local.curVillage][store].actionid=cid;
						data.cache[local.curVillage][store].timestamp=Math.round(servertime.getTime()/1000);
						data.cache[local.curVillage][store].formtype=(twb_.inc[0] && cidx==twb_.inc[0])?"incoming":"isupport";
						data.cache[local.curVillage][store].attacker=$xp("//a[contains(@href,'info_player')]",9,twb_.pWIN.document).parentNode.innerHTML;
						data.cache[local.curVillage][store].from=$xp("//a[contains(@href,'info_village') and contains(@href,'&id=')]",9,twb_.pWIN.document).parentNode.innerHTML;
						tds=$xp("//td",6,twb_.pWIN.document);tds2=[];
						for(x=0; x<tds.length; x++){
							if((tds[x].innerHTML.length<=10 && tds[x].innerHTML.match(/\d+\:\d+\:\d+/)) || (tds[x].innerHTML.match("timer") && tds[x].childNodes[0].innerHTML && tds[x].childNodes[0].innerHTML.length<10)){
								tds[x].innerHTML=tds[x].innerHTML.replace("<span class=\"timer\">","").replace("</span>","");
								tds2.push(tds[x]);
							}
						}
						data.cache[local.curVillage][store].arrival=tds2[0].innerHTML; // Fixed by ocdcsv [0] <- [1]
						var timetofinish=data.cache[local.curVillage][store].arrival.split(":");
						if(guess==null){
							// Guess slowest unit
							ntime=timetofinish[0]*3600+timetofinish[1]*60+timetofinish[2]*1;
							his=getC(data.cache[local.curVillage][store].from);
							mine=getC(gei(local.curVillage).getAttribute("tooltiptext"));
							dist=Math.sqrt(Math.pow(his[0]-mine[0],2)+Math.pow(his[1]-mine[1],2));
							// This will load speed once per session
							if(typeof local.speed=="undefined" || local.speed[0]!=TWB_World(0)){
								local.speed=[TWB_World(0),TWB_Speed()];
							}
							SPEED=local.speed[1];
							// Possible times in seconds
							dst=RD.get();
							spr=Math.round((dst[0]/SPEED[1]/SPEED[0])*60)*dist; // Spear axe arch
							swd=Math.round((dst[1]/SPEED[1]/SPEED[0])*60)*dist; // Sword
							sct=Math.round((dst[2]/SPEED[1]/SPEED[0])*60)*dist; // Scout
							lcm=Math.round((dst[3]/SPEED[1]/SPEED[0])*60)*dist; // LC March Paladin
							hiv=Math.round((dst[4]/SPEED[1]/SPEED[0])*60)*dist; // Heavy
							rca=Math.round((dst[5]/SPEED[1]/SPEED[0])*60)*dist; // Ram Cat
							nob=Math.round((dst[7]/SPEED[1]/SPEED[0])*60)*dist; // Noble
							// Error calculation and smallest
							R1=spr-ntime; R1=(R1<0)?Math.pow(9,9):R1;
							R2=swd-ntime; R2=(R2<0)?Math.pow(9,9):R2;
							R3=sct-ntime; R3=(R3<0)?Math.pow(9,9):R3;
							R4=lcm-ntime; R4=(R4<0)?Math.pow(9,9):R4;
							R5=hiv-ntime; R5=(R5<0)?Math.pow(9,9):R5;
							R6=rca-ntime; R6=(R6<0)?Math.pow(9,9):R6;
							R7=nob-ntime; R7=(R7<0)?Math.pow(9,9):R7;
							R=[R1,R2,R3,R4,R5,R6,R7];
							smalst=sm(R[0],sm(R[1],sm(R[2],sm(R[3],sm(R[4],sm(R[5],R[6]))))));
							switch(smalst){
								case R[0]: nguess="spaxar"; break;
								case R[1]: nguess="sw"; break;
								case R[2]: nguess="sc"; break;
								case R[3]: nguess="lcma"; break;
								case R[4]: nguess="hc"; break;
								case R[5]: nguess="raca"; break;
								case R[6]: nguess="nob"; break;
								default : nguess="N/A"; break;
							}
							guess=nguess;
						}
						// Get new guess if newly scraped, or old one
						data.cache[local.curVillage][store].guess=guess;
						data.cache[local.curVillage][store].destination=$xp("//a[contains(@href,'info_village') and contains(@href,'&id=')]",6,twb_.pWIN.document)[1].parentNode.innerHTML;
						data.cache[local.curVillage][store].timefinish=data.cache[local.curVillage][store].timestamp+timetofinish[0]*3600+timetofinish[1]*60+timetofinish[2]*1;
						data.cache[local.curVillage][store].name=data.cache[local.curVillage][store].destination;
						data.cache[local.curVillage][store].label=(typeof label!="undefined")?label:data.cache[local.curVillage][store].name;
					}
					// Move to next command
					tmp=[];
					if(twb_.inc[0]){
						for(i=1; i<twb_.inc.length; i++){
							tmp.push(twb_.inc[i]);
						}
						twb_.inc=tmp;
					}
					else{
						if(twb_.isup[0]){
							tmp=[];
							for(i=1; i<twb_.isup.length; i++){
								tmp.push(twb_.isup[i]);
							}
							twb_.isup=tmp;
						}
					}
					if(typeof twb_.inc[0]!="undefined"){
						TWB_Mast_Url(twb_.inc[0].href);
					}
					else{
						if(typeof twb_.isup[0]!="undefined"){
							TWB_Mast_Url(twb_.isup[0].href);
						}
						else{
							delete twb_.out;
							delete twb_.inc;
							// [Reenter full update]
							local.last_Lookup=local.curVillage;
							Engines.State.kill_p("lookup");
							local.allow_commands=false;
							TWB_GoTo('place','command');
						}
					}
				}
			}catch(e){log('Scraper',e)}
		}
	},
	TWB_SC_Units : function(){
		with(twb_.lib){
			try{
				// Units Cache outside
				data.units=TWB_Get("units");
				cvil=local.curVillage;
				data.units[cvil]=(typeof data.units[cvil]=="object")?data.units[cvil]:new Object();
				data.units[cvil].outside=(typeof data.units[cvil].outside=="object")?data.units[cvil].outside:new Object();
				cells=$xp("//th/img",6,twb_.pWIN.document);
				// Search for cancel links and count units
				lnks=$xp("//a[contains(@href,'all_back')]",6,twb_.pWIN.document);
				NYU={};
				for(i=0; i<lnks.length; i++){
					ref=lnks[0].parentNode.parentNode;
					for(j=2; j<ref.childNodes.length-2; j++){
						unit=ref.parentNode.firstChild.childNodes[j].childNodes[0].src.match(/unit_(\w+)/)[1];
						count=ref.childNodes[j].innerHTML;
						NYU[unit]=(NYU[unit]>0)?NYU[unit]-(-count):count;
					}
				}
				for(unit in NYU){
					data.units[cvil].outside[unit]=NYU[unit];
				}
				delete NYU;
				CheckDST();
				servertime=getTime("1%3");
				data.units[cvil].outside.timestamp=Math.round(servertime.getTime()/1000);
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Smith : function(){
		with(twb_.lib){
			try{
				data.techs=TWB_Get("techs");
				cells=$xp("//a[contains(@href,'level=')]",6,twb_.pWIN.document);
				cvil=local.curVillage;
				data.techs[cvil]=(typeof data.techs[cvil]=="object")?data.techs[cvil]:new Object();
				assign=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[1]",9,twb_.pWIN.document).innerHTML;
				for(i=0; i<cells.length; i++){
					unit=cells[i].href.match(/unit=(\w+)/);
					unit=(unit===null)?0:unit[1];
					level=cells[i].href.match(/level=(\d+)/);
					level=(level===null)?0:level[1];
					data.techs[cvil][unit]=level;
				}
				if(typeof assign!="undefined"){
					if(assign.length>20){assign="-";}
				}
				else{
					assign="-";
				}
				data.techs[cvil].assign=assign;
				CheckDST();
				servertime=getTime("1%3");
				data.techs[cvil].timestamp=Math.round(servertime.getTime()/1000);
				var timetofinish=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/span",9,twb_.pWIN.document);
				timetofinish=(timetofinish)?timetofinish.innerHTML.split(":"):"99:99:99".split(":");
				data.techs[cvil].timefinish=data.techs[cvil].timestamp+timetofinish[0]*3600+timetofinish[1]*60+timetofinish[2]*1;
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Main : function(){
		with(twb_.lib){
			try{
				data.buildings=TWB_Get("buildings");
				mcells=$xp("//img[contains(@src,'buildings') and not(contains(@src,'big'))]",6,twb_.pWIN.document);
				cvil=local.curVillage;
				data.buildings[cvil]=(typeof data.buildings[cvil]=="object")?data.buildings[cvil]:new Object();
				for(i=0; i<mcells.length; i++){
					cell=mcells[i];
					build=cell.src.split("/")[5].split(".png")[0];
					level=cell.parentNode.parentNode.innerHTML.split("</a>")[1].match(/\d+/);
					level=(level===null)?0:level[0];
					data.buildings[cvil][build]=level;
					if(build=="wall"){break;}
				}
				assign=$xp("//*[@id='buildqueue']/tr[2]/td[1]",9,twb_.pWIN.document);
				if(assign===null || assign.innerHTML.length>30){assign="<a align=center>-</a>";}else{assign=assign.innerHTML}
				data.buildings[cvil].assign=assign;
				// Patch for BQ : Putting all assignments
				data.buildings[cvil].tasks=[];
				tasks=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				nlangs=["main","barracks","stable","garage","smith","snob","place","market","stone","iron","wood","farm","storage","hide","statue","wall"];
				slangs=[lang("TWB-Main"),lang("TWB-Barracks"),lang("TWB-Stable"),lang("TWB-Workshop"),lang("TWB-Smithy"),lang("TWB-Snob"),lang("TWB-Place"),lang("TWB-Market"),lang("TWB-Stone"),lang("TWB-Iron"),lang("TWB-Wood"),lang("TWB-Farmx"),lang("TWB-Storage"),lang("TWB-Hide"),lang("TWB-Statue"),lang("TWB-Wall")];
				for(y=0; y<tasks.length; y++){
					bname=tasks[y].parentNode.parentNode.childNodes[1].textContent.split(" (")[0];
					// Identify the building
					for(uy=0; uy<slangs.length; uy++){
						if(bname.toLowerCase()==slangs[uy].toLowerCase()){
							bname=nlangs[uy];
							break;
						}
					}
					data.buildings[cvil].tasks.push(bname);
				}
				CheckDST();
				servertime=getTime("1%3");
				data.buildings[cvil].timestamp=Math.round(servertime.getTime()/1000);
				timetofinish=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/span",9,twb_.pWIN.document);
				if(timetofinish){timetofinish=timetofinish.innerHTML.split(":");}
				if(assign.lengt>20){timetofinish=["99","99","99"];}
				data.buildings[cvil].timefinish=data.buildings[cvil].timestamp+timetofinish[0]*3600+timetofinish[1]*60+timetofinish[2]*1;
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_U_Add : function(obj,tyn,cnt,tyo){
		with(twb_.lib){
			if(cnt>0){
				if(typeof obj[tyn]!="undefined"){
					obj[tyn]=obj[tyn]-(-cnt);
				}
				else{
					obj[tyn]=cnt;
				}
			}
			else{
				for(u=0; u<tyo.length; u++){
					obj[tyo[u]]=0;
				}
			}
		}
	},
	TWB_SC_Barracks : function(){
		with(twb_.lib){
			try{
				times=0;
				data.queues=TWB_Get("queues");
				cvil=local.curVillage;
				data.queues[cvil]=(typeof data.queues[cvil]=="object")?data.queues[cvil]:new Object();
				data.queues[cvil].timefinish1="-";
				TWB_U_Add(data.queues[cvil],"",0,["spear","sword","axe","archer"]);	
				data.queues[cvil].queu1=[];
				cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				times=0;
				CheckDST();
				servertime=getTime("1%3");
				data.queues[cvil].timestamp1=Math.round(servertime.getTime()/1000);
				for(p=0; p<cells.length; p++){
					cell=cells[p].parentNode.parentNode.childNodes[1];
					type=cell.innerHTML.replace(/\d+\s/,'');
					count=cell.innerHTML.match(/\d+/)[0];
					ti=cells[p].parentNode.parentNode.childNodes[3].innerHTML.match(/\d+\:\d+\:\d+/)[0].split(":");
					time=-ti[0]*3600-ti[1]*60-ti[2];
					times=times-time;
					if(type.match(lang("uni1").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"spear",count);
					}
					if(type.match(lang("uni2").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"sword",count);	
					}
					if(type.match(lang("uni3").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"axe",count);
					}
					if(type.match(lang("uni4").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"archer",count);
					}
					data.queues[cvil].queu1.push([type,count,-time]);
				}
				if(cells.length>0){
					data.queues[cvil].timefinish1=data.queues[cvil].timestamp1-(-times);
				}
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Stable : function(){
		with(twb_.lib){
			try{
				times=0;
				data.queues=TWB_Get("queues");
				cvil=local.curVillage;
				data.queues[cvil]=(typeof data.queues[cvil]=="object")?data.queues[cvil]:new Object();
				data.queues[cvil].timefinish2="-";
				TWB_U_Add(data.queues[cvil],"",0,["spy","light","marcher","heavy"]);
				data.queues[cvil].queu2=[];
				cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				times=0;
				CheckDST();
				servertime=getTime("1%3");
				data.queues[cvil].timestamp2=Math.round(servertime.getTime()/1000);
				for(p=0; p<cells.length; p++){
					cell=cells[p].parentNode.parentNode.childNodes[1];
					type=cell.innerHTML.replace(/\d+\s/,'');
					count=cell.innerHTML.match(/\d+/)[0];
					ti=cells[p].parentNode.parentNode.childNodes[3].innerHTML.match(/\d+\:\d+\:\d+/)[0].split(":");
					time=-ti[0]*3600-ti[1]*60-ti[2];
					times=times-time;
					if(type.match(lang("uni5").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"spy",count);
					}
					if(type.match(lang("uni6").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"light",count);	
					}
					if(type.match(lang("uni7").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"marcher",count);
					}
					if(type.match(lang("uni8").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"heavy",count);
					}
					data.queues[cvil].queu2.push([type,count,-time]);
				}
				if(cells.length>0){
					data.queues[cvil].timefinish2=data.queues[cvil].timestamp2-(-times);
				}
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Garage : function(){
		with(twb_.lib){
			try{
				times=0;
				data.queues=TWB_Get("queues");
				cvil=local.curVillage;
				data.queues[cvil]=(typeof data.queues[cvil]=="object")?data.queues[cvil]:new Object();
				data.queues[cvil].timefinish3="-";
				TWB_U_Add(data.queues[cvil],"",0,["ram","catapult"]);
				data.queues[cvil].queu3=[];
				cells=$xp("//a[contains(@href,'action=cancel')]",6,twb_.pWIN.document);
				times=0;
				CheckDST();
				servertime=getTime("1%3");
				data.queues[cvil].timestamp3=Math.round(servertime.getTime()/1000);
				for(p=0; p<cells.length; p++){
					cell=cells[p].parentNode.parentNode.childNodes[1];
					type=cell.innerHTML.replace(/\d+\s/,'');
					count=cell.innerHTML.match(/\d+/)[0];
					ti=cells[p].parentNode.parentNode.childNodes[3].innerHTML.match(/\d+\:\d+\:\d+/)[0].split(":");
					time=-ti[0]*3600-ti[1]*60-ti[2];
					times=times-time;
					if(type.match(lang("uni9").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"ram",count);
					}
					if(type.match(lang("uni10").substr(0,4))){
						TWB_U_Add(data.queues[cvil],"catapult",count);	
					}
					data.queues[cvil].queu3.push([type,count,-time]);
				}
				if(cells.length>0){
					data.queues[cvil].timefinish3=data.queues[cvil].timestamp3-(-times);
				}
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Report : function(){
		with(twb_.lib){
			try{
				report=new Object();
				EL=$xp("//*[contains(@href,'report_id=')]",9,twb_.pWIN.document);
				// We only want reports that can be publicized : that is attacks 
				if(EL){
					report.id=EL.href.split("report_id=")[1];
					report.name=$xp("//*[@id='labelText']",9,twb_.pWIN.document).innerHTML;
					report.dtime=$xp("//html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]",9,twb_.pWIN.document).innerHTML;
					morale=$xp("//h4",6,twb_.pWIN.document)[1];
					report.morale=(typeof morale!="undefined" && morale.innerHTML.match(lang("morale")))?morale.innerHTML:"-";
					try{
						report.luck=$xp("//td/b[contains(string(),'%')]",9,twb_.pWIN.document).innerHTML;
					}catch(e){
						// Misc report
						delete report;
						log('Scraper','Misc report detected. Scraping Aborted.',3);
						return;
					}
					morale=$xp("//h4",6,twb_.pWIN.document)[1];
					report.religion=(typeof morale!="undefined")?morale.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML:0;
					if(report.religion!=0){
						report.religion=(report.religion.match(lang("relig")))?1:0;
					}
					// From To
					AT=$xp("//*[@id='attack_info_att']/tbody/tr/th[2]/a",9,twb_.pWIN.document);
					DF=$xp("//a[contains(@href,'info_village') and contains(@href,'&id=')]",6,twb_.pWIN.document)[1];
					report.attacker=AT.parentNode.innerHTML;
					report.attackerid=AT.parentNode.innerHTML.match(/id=(\d+)/)[1];
					report.avillage=$xp("//a[contains(@href,'info_village') and contains(@href,'&id=')]",6,twb_.pWIN.document)[0].parentNode.innerHTML;
					report.defender=$xp("//a[contains(@href,'info_player') and contains(@href,'&id=')]",6,twb_.pWIN.document);
					report.defender=(typeof report.defender[1]!="undefined")?report.defender[1].parentNode.innerHTML:"unknown";
					report.dvillage=DF.parentNode.innerHTML;
					report.defenderid=(report.defender!="unknown")?report.defender.match(/id=(\d+)/)[1]:0;
					// Target id to keep 1 report per target
					report.villageid=report.dvillage.match(/id=(\d+)/)[1];
					// Units All rows + images
					report.units=new Object();
					report.units.attacker=new Array();
					report.units.attacker[0]=new Object();
					report.units.attacker[1]=new Object();
					report.units.defender=new Array();
					report.units.defender[0]=new Object();
					report.units.defender[1]=new Object();
					
					// attacker
					rows=$xp("//*[@id='attack_info_att_units']//tr",6,twb_.pWIN.document);
					for(i=3; i<rows[0].childNodes.length-1; i++){
						unit=rows[0].childNodes[i].childNodes[0].src.match(/unit_(\w+)/)[1];
						report.units.attacker[0][unit]=rows[1].childNodes[i].innerHTML;
						report.units.attacker[1][unit]=rows[2].childNodes[i].innerHTML;
					}
					
					// defender if exists (in case of failed attack)
					rows=$xp("//*[@id='attack_info_def_units']//tr",6,twb_.pWIN.document);
					if(rows.length==3){ // Correct Exception
						for(i=3; i<rows[0].childNodes.length-1; i++){
							unit=rows[0].childNodes[i].childNodes[0].src.match(/unit_(\w+)/)[1];
							report.units.defender[0][unit]=rows[1].childNodes[i].innerHTML;
							report.units.defender[1][unit]=rows[2].childNodes[i].innerHTML;
						}
					}
					// scouted resources + buildings
					holds="";
					holds2="";
					ths=$xp("//th",6,twb_.pWIN.document);
					report.buildings={};
					for(i=0; i<ths.length; i++){
						if(ths[i].nextSibling && ths[i].nextSibling.innerHTML && ths[i].nextSibling.innerHTML.match(lang("TWB-Main"))){
							holds2=ths[i].nextSibling.innerHTML;
						}
					}
					if(holds2){
						holds2=holds2.split("<br>");
						for(i=0; i<holds2.length; i++){
							split=holds2[i].replace(/\n|\t/g,"").split(" <b>");
							build=split[0];
							if(build){
								if(build.match(lang("TWB-Main"))){build="main";}
								if(build.match(lang("TWB-Barracks"))){build="barracks";}
								if(build.match(lang("TWB-Stable"))){build="stable";}
								if(build.match(lang("TWB-Workshop"))){build="garage";}
								if(build.match(lang("TWB-Smithy"))){build="smith";}
								if(build.match(lang("TWB-Snob"))){build="snob";}
								if(build.match(lang("TWB-Place"))){build="place";}
								if(build.match(lang("TWB-Statue"))){build="statue";}
								if(build.match(lang("TWB-Market"))){build="market";}
								if(build.match(lang("TWB-Wood"))){build="wood";}
								if(build.match(lang("TWB-Stone"))){build="stone";}
								if(build.match(lang("TWB-Iron"))){build="iron";}
								if(build.match(lang("TWB-Farmx"))){build="farm";}
								if(build.match(lang("TWB-Storage"))){build="storage";}
								if(build.match(lang("TWB-Hide"))){build="hide";}
								if(build.match(lang("TWB-Wall"))){build="wall";}
								if(split[1]){
									level=split[1].match(/\d+/)[0];
									report.buildings[build]=level;
								}
							}
						}
					}
					// Scouted resources
					mt=$xp("//img[contains(@src,'holz')]",6,twb_.pWIN.document);
					if(mt.length>1){
						// scouted are always at 2nd position image
						ishaul=mt[1].parentNode.nextSibling;
						// in case there is next to it a haul format xxx/xxx this is NOT it
						if(!ishaul){
							TWB_SCO_RES(mt[1].parentNode.innerHTML,report);
						}
						else{
							// no scouted res in that case
							report.scout_wood=0;
							report.scout_stone=0;
							report.scout_iron=0;
						}
					}
					// Are there any units outside target village
					icons=$xp("//*[@id='attack_spy']//table//tbody//th",6,twb_.pWIN.document);
					matches=$xp("//*[@id='attack_spy']//table//tbody//td",6,twb_.pWIN.document);
					report.outside={};
					for(i=0; i<icons.length; i++){
						unit=icons[i].childNodes[0].src.match(/unit_(\w+)/)[1];
						nbrF=matches[i].textContent;
						report.outside[unit]=nbrF;
					}
					// Do we have wall damage ? 
					ARes=$xp("//*[@id='attack_results']",9);
					if(ARes){
						 ARes=ARes.textContent.match(lang("wallmsg").replace(/\{d\+\}/g,"\\d+"));
						 if(ARes){
							ARes=ARes[0].match(/\d+/g);
							report.wall={
								from : ARes[0],
								to : ARes[1]
							};
						 }
					}
					CheckDST();
					servertime=getTime("1%3");
					report.timestamp=Math.round(servertime.getTime()/1000);
					isincluded=Included(report.villageid,reports,"villageid");
					if(isincluded){
						// Replace Old report if this is newer
						for(i=0; i<reports.length; i++){
							if(reports[i].villageid==report.villageid){
								date_stored=Math.round(new Date(reports[i].dtime).getTime()/1000);
								date_scraped=Math.round(new Date(report.dtime).getTime()/1000);
								if(date_stored<date_scraped){
									reports[i]=report;
								}
								break;
							}
						}
					}
					else{
						// Add new one
						reports.push(report);
					}
					TWB_S(uneval(reports),"reports_"+TWB_World(0)+"["+twb_myID+"].twb");
				}
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SCO_RES : function(spli,report){
		with(twb_.lib){
			try{
				report.scout_wood=spli.split("holz.png?1")[1];
				report.scout_wood=(typeof report.scout_wood!="undefined")?report.scout_wood.split("\"\">")[1].split("<img")[0]:0;
				report.scout_stone=spli.split("lehm.png?1")[1];
				report.scout_stone=(typeof report.scout_stone!="undefined")?report.scout_stone.split("\"\">")[1].split("<img")[0]:0;
				report.scout_iron=spli.split("eisen.png?1")[1];
				report.scout_iron=(typeof report.scout_iron!="undefined")?report.scout_iron.split("\"\">")[1].split("<img")[0]:0;
			}catch(e){log('Scraper',e);}
		}
	},
	TWB_SC_Loyalty : function(){
		with(twb_.lib){
			if(typeof twb_.snif!="undefined"){
				// Not during Full Update
				return;
			}
			// The longer the xpath , the more accurate
			var loyalty=100;
			tables=$xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody",6,twb_.pWIN.document);
			for(k=0; k<tables.length; k++){
				if(tables[k].childNodes[0].childNodes[0].textContent.replace(":","")==lang("loyal")){
					// This is the loyatly table
					loyalty=tables[k].childNodes[0].childNodes[1].textContent;
				}
			}
			
			D=$gei("serverDate").textContent.split("/");
			T=$gei("serverTime").textContent.split(":");
			now_=new Date();
			now_.setDate(D[0]);
			now_.setMonth(D[1]-1);
			now_.setFullYear(D[2]);
			now_.setHours(T[0]);
			now_.setMinutes(T[1]);
			now_.setSeconds(T[2]);
			timest=Math.floor(now_.getTime()/1000);
			cvil=local.curVillage;
			data.loyalty=TWB_Get("loyalty");
			data.loyalty[cvil]={
				value : loyalty,
				timestamp : timest
			}
		}
	},
	TWB_Show_Loyalty: function(){
		with(twb_.lib){
			if(typeof twb_.snif!="undefined"){
				// Not during Full Update
				return;
			}
			// Loyalty might not be scraped for all villages
			try{
				if($gei("loyalty")){
					// Already added, exit
					return;
				}
			
				try{
					// Calculate loyalty of cur village using hour difference + flooring it
					data.loyalty=TWB_Get("loyalty");
					// Clean
					delete loyalty;
					if(typeof data.loyalty[local.curVillage]!='undefined'){
						var loyalty=data.loyalty[local.curVillage].value;
						perhour=TWB_Speed()[0];
						D=$gei("serverDate").textContent.split("/");
						T=$gei("serverTime").textContent.split(":");
						now_=new Date();
						now_.setDate(D[0]);
						now_.setMonth(D[1]-1);
						now_.setFullYear(D[2]);
						now_.setHours(T[0]);
						now_.setMinutes(T[1]);
						now_.setSeconds(T[2]);
						now=Math.floor(now_.getTime()/1000);
						timestamp=data.loyalty[local.curVillage].timestamp;
						elapsed=Math.floor(((now-timestamp)/3600)/perhour);
						loyalty-=-elapsed;
						loyalty=sm(loyalty,100);
					}
					else{
						loyalty=" - ";
					}
					// Create box
					TD=dce("td",twb_.pWIN);
					TD.innerHTML='<table id="loyalty" class="navi-border menu_block_right"><tbody><tr><td><table cellspacing="0" style="margin: 0pt; padding: 0pt;" class="box"><tbody><tr style="margin: 0pt; padding: 0pt;"><td class="icon-box"><a href="/game.php?village='+local.curVillage+'&amp;screen=overview"><span class="icon" style="background-image:url(/graphic/unit/unit_snob.png)"> </span></a></td><td align="center" style="margin: 0pt; padding: 0pt;">'+loyalty+'</td></tr></tbody></table></td></tr></tbody></table>';
					// Append it
					$gei("header_info").childNodes[1].childNodes[0].appendChild(TD);
				}catch(e){}
				
				// Are we on an overview page?
				if(TWB_Scr()=="overview_villages"){
					perhour=TWB_Speed()[0];
					if(hasPrem()){
						mode=$xp("//td[@class='selected']/a",9).href.match(/mode=(\w+)/)[1];
						switch(mode){
							case "prod":
								TABLE=$gei("production_table").childNodes[1].childNodes;
							break;
							
							case "combined":
								TABLE=$gei("combined_table").childNodes[1].childNodes;
							break;
							
							case "units":
								TABLE=$gei("units_table").childNodes[1].childNodes;
								
								var TD=dce("th",twb_.pWIN);
								TD.innerHTML=lang("loyal");
								TABLE[0].appendChild(TD);
								for(u=1; u<TABLE.length; u++){
									if(TABLE[u].nodeName=="#text" || TABLE[u].className!="units_home"){
										continue;
									}
									
									vil=TABLE[u].lastChild.previousSibling.innerHTML.match(/\d+/)[0];
									
									try{
										var loyalty=data.loyalty[vil].value;
										D=$gei("serverDate").textContent.split("/");
										T=$gei("serverTime").textContent.split(":");
										now_=new Date();
										now_.setDate(D[0]);
										now_.setMonth(D[1]-1);
										now_.setFullYear(D[2]);
										now_.setHours(T[0]);
										now_.setMinutes(T[1]);
										now_.setSeconds(T[2]);
										now=Math.floor(now_.getTime()/1000);
										timestamp=data.loyalty[vil].timestamp;
										elapsed=Math.floor(((now-timestamp)/3600)/perhour);
										loyalty-=-elapsed;
										loyalty=sm(loyalty,100);
									}catch(e){
										loyalty=" - ";
									}
									var TD=dce("td",twb_.pWIN);
									TD.innerHTML=loyalty;
									TD.setAttribute("rowspan",5);
									TD.setAttribute("valign","top");
									TD.setAttribute("align","center");
									TABLE[u].appendChild(TD);
								}
								return;
							break;
							
							case "buildings":
								TABLE=$gei("buildings_table").childNodes[3].childNodes;
							break;
							
							case "tech":
								TABLE=$gei("techs_table").childNodes[1].childNodes;
							break;
							
							case "groups":
								TABLE=$gei("group_assign_table").childNodes[1].childNodes;
							break;
						}
						var TD=dce("th",twb_.pWIN);
						TD.innerHTML=lang("loyal");
						TABLE[0].appendChild(TD);
						for(u=1; u<TABLE.length; u++){
							if(TABLE[u].nodeName=="#text"){
								continue;
							}
							
							try{
								vil=TABLE[u].childNodes[1].childNodes[1].id.match(/\d+/)[0];
							}catch(e){
								try{
									vil=TABLE[u].childNodes[1].childNodes[0].id.match(/\d+/)[0];
								}catch(e){
									vil=TABLE[u].childNodes[3].childNodes[1].id.match(/\d+/)[0];
								}
							}
							
							try{
								var loyalty=data.loyalty[vil].value;
								D=$gei("serverDate").textContent.split("/");
								T=$gei("serverTime").textContent.split(":");
								now_=new Date();
								now_.setDate(D[0]);
								now_.setMonth(D[1]-1);
								now_.setFullYear(D[2]);
								now_.setHours(T[0]);
								now_.setMinutes(T[1]);
								now_.setSeconds(T[2]);
								now=Math.floor(now_.getTime()/1000);
								timestamp=data.loyalty[vil].timestamp;
								elapsed=Math.floor(((now-timestamp)/3600)/perhour);
								loyalty-=-elapsed;
								loyalty=sm(loyalty,100);
							}catch(e){
								loyalty=" - ";
							}
							
							var TD=dce("td",twb_.pWIN);
							TD.innerHTML=loyalty;
							TABLE[u].appendChild(TD);
						}
					}
					else{
						// Regular TW Loyalty disp
						TABLE=$gei("production_table").childNodes[1].childNodes;
						var TD=dce("th",twb_.pWIN);
						TD.innerHTML=lang("loyal");
						TABLE[0].appendChild(TD);
						for(u=1; u<TABLE.length; u++){
							if(TABLE[u].nodeName=="#text"){
								continue;
							}
							vil=TABLE[u].childNodes[1].childNodes[1].id.match(/\d+/)[0];
							try{
								var loyalty=data.loyalty[vil].value;
								D=$gei("serverDate").textContent.split("/");
								T=$gei("serverTime").textContent.split(":");
								now_=new Date();
								now_.setDate(D[0]);
								now_.setMonth(D[1]-1);
								now_.setFullYear(D[2]);
								now_.setHours(T[0]);
								now_.setMinutes(T[1]);
								now_.setSeconds(T[2]);
								now=Math.floor(now_.getTime()/1000);
								timestamp=data.loyalty[vil].timestamp;
								elapsed=Math.floor(((now-timestamp)/3600)/perhour);
								loyalty-=-elapsed;
								loyalty=sm(loyalty,100);
							}catch(e){
								loyalty=" - ";
							}
							
							var TD=dce("td",twb_.pWIN);
							TD.innerHTML=loyalty;
							TABLE[u].appendChild(TD);
						}
					}
				}
			}catch(e){}
		}
	},
	TWB_PREA : function(){
		with(twb_.lib){
			ad=$xp("//a[contains(@href,'village=p') or contains(@href,'village=n')]",6,twb_.pWIN.document);
			for(r=0; r<ad.length; r++){
				switch(ad[r].href.match(/village=(n|p)/)[1]){
					case "n" : ad[r].href="javascript:;"; ad[r].addEventListener("click",TWB_Next,false); break;
					case "p" : ad[r].href="javascript:;"; ad[r].addEventListener("click",TWB_Back,false); break; 
				}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.scraper=="undefined"){
				TWB_New_Set("main",[lang("autovil"),{id:"autovil",type:"checkbox",checked:"autovil"}]);
				TWB_New_Set("main",[lang("loyals"),{id:"loyals",type:"checkbox",checked:"loyals"}]);
				Engines.State.add_p("scraper","TWB_Scrap()","*",false);
			}
		}
	}
});
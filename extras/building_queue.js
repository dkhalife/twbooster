{
	// Setting up the queues
	TWB_BQD_New : function(wd){
		with(twb_.lib){
			try{
				znname=prpt(lang("BQDN"));
				if(znname!=null){
					znname=znname.replace(/\s/g,"_");
					if(typeof _BQD[znname]=="undefined"){
						el=wd.$("#newq")[0];
						tr=wd.document.createElement("tr");
						el.parentNode.insertBefore(tr,el);
						tr.innerHTML='<td width="30%" align="center">'+znname+'</td><td width="3%" align="left"><a onclick="window.openerx.twb_.lib.TWB_BQD_Ren(this,window)" href="javascript:;"><img border="0" src="http://'+TWB_World()+'graphic/rename.png"></a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Load(this,window)">'+lang("load")+'</a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Del(this,window)">'+lang("delete")+'</a></td>';
						// Save _BQD
						_BQD[znname]=[];
						_BQDC[znname]=[];
						TWB_S(uneval(_BQD),"bqd_"+TWB_World(0)+"["+twb_myID+"].twb");
						TWB_S(uneval(_BQDC),"bqdc_"+TWB_World(0)+"["+twb_myID+"].twb");
					}
					else{
						pq(lang("bqnot"));
					}
				}
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Ren : function(el,wd){
		with(twb_.lib){
			xnname=el.parentNode.previousSibling.textContent;
			znname=prpt(lang("BQDN"),xnname);
			if(typeof _BQD[znname]=="undefined"){
				if(znname){
					// Queues file
					_BQD[znname]=_BQD[xnname];
					delete _BQD[xnname];
					TWB_S(uneval(_BQD),"bqd_"+TWB_World(0)+"["+twb_myID+"].twb");
					// BQueues file
					_BQDC[znname]=_BQDC[xnname];
					delete _BQDC[xnname];
					TWB_S(uneval(_BQDC),"bqdc_"+TWB_World(0)+"["+twb_myID+"].twb");
					el.parentNode.previousSibling.innerHTML=znname;
				}
			}
			else{
				pq(lang("bqnot"));
			}
		}
	},
	TWB_BQD_Del : function(el,wd){
		with(twb_.lib){
			try{
				nname=wd.$(el.parentNode.parentNode).find("td")[0].textContent;
				delete _BQD[nname];
				TWB_S(uneval(_BQD),"bqd_"+TWB_World(0)+"["+twb_myID+"].twb");
				delete _BQDC[nname];
				TWB_S(uneval(_BQDC),"bqdc_"+TWB_World(0)+"["+twb_myID+"].twb");
				el=el.parentNode.parentNode;
				el.parentNode.removeChild(el);
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_ToIco : function(ico){
		with(twb_.lib){
			return "<img src='http://"+TWB_World()+"graphic/buildings/"+ico+".png'>";
		}
	},
	TWB_BQD_Load : function(el,wd){
		with(twb_.lib){
			try{
				_BQD=TWB_OVE("bqd_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				_BQDC=TWB_OVE("bqdc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				nname=wd.$(el.parentNode.parentNode).find("td")[0].textContent;
				wd.nname=nname;
				for(k=0; k<_BQD[nname].length; k++){
					tr=wd.document.createElement("tr");
					tr.id=Math.round(Math.random()*50000);
					wd.$("#queue")[0].appendChild(tr);
					icon=TWB_BQD_ToIco(_BQD[nname][k][0]);
					level=_BQD[nname][k][1];
					tr.innerHTML='<td align="center">'+icon+'</td><td align="center">'+level+'</td><td align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Del_(this,window)">'+lang("delete")+'</a></td>';
				}
				wd.$("#section1").slideUp('slow',function(){
					wd.$("#section2").slideDown('slow',function(){});
				});
				wd.$("#queue").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Empty : function(wd){
		with(twb_.lib){
			try{
				wd.$("#queue").find("tr").each(function(){
					if(this.getAttribute('id')!="NOT"){
						this.parentNode.removeChild(this);
					}
				});
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Save : function(wd){
		with(twb_.lib){
			try{
				// Read levels and save
				nname=wd.nname;
				_BQD[nname]=[];
				wd.$("#queue").find("tr").each(function(o){
					if(o>=1){
						RID=this.id;
						icon=wd.document.getElementById(RID).childNodes[0].childNodes[0].src.match(/\/(\w+)\.png/)[1];
						level=wd.document.getElementById(RID).childNodes[1].textContent;
						_BQD[nname].push([icon,level]);
					}
				});
				TWB_S(uneval(_BQD),"bqd_"+TWB_World(0)+"["+twb_myID+"].twb");
				// Cleanup
				TWB_BQD_Empty(wd);
				wd.$("#section2").slideUp('slow',function(){
					wd.$("#section1").slideDown('slow',function(){});
				});
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Cancel : function(wd){
		with(twb_.lib){
			// Cleanup
			TWB_BQD_Empty(wd);
			wd.$("#section2").slideUp('slow',function(){
				wd.$("#section1").slideDown('slow',function(){});
			});
		}
	},
	TWB_BQD_LVL : function(ico,wd,lastLVL){
		with(twb_.lib){
			try{
				max=levels[ico];
				wd.$("option").each(function(){
					this.parentNode.removeChild(this);
				});
				for(u=0; u<=max; u++){
					var opt=wd.document.createElement("option");
					opt.value=opt.innerHTML=u;
					opt.selected=u==lastLVL;
					wd.$("select")[0].appendChild(opt);
				}
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Icon : function(icon,wd){
		with(twb_.lib){
			icon=icon.src.match(/\/(\w+)\.png/)[1];
			wd.$("select")[0].name=icon;
			lastLVL=1;
			for(h=0; h<_BQD[wd.nname].length; h++){
				if(_BQD[wd.nname][h][0]==icon){
					lastLVL=_BQD[wd.nname][h][1];
				}
			}
			TWB_BQD_LVL(icon,wd,lastLVL);
			switch(icon){
				case "main": icon=lang("TWB-Main");
				break;
				case "barracks": icon=lang("TWB-Barracks");
				break;
				case "stable": icon=lang("TWB-Stable");
				break;
				case "garage": icon=lang("TWB-Workshop");
				break;
				case "wood": icon=lang("TWB-Wood");
				break;
				case "stone": icon=lang("TWB-Stone");
				break;
				case "iron": icon=lang("TWB-Iron");
				break;
				case "storage": icon=lang("TWB-Storage");
				break;
				case "hide": icon=lang("TWB-Hide");
				break;
				case "smith": icon=lang("TWB-Smithy");
				break;
				case "statue": icon=lang("TWB-Statue");
				break;
				case "snob": icon=lang("TWB-Snob");
				break;
				case "church": icon=lang("TWB-Church");
				break;
				case "market": icon=lang("TWB-Market");
				break;
				case "farm": icon=lang("TWB-Farm");
				break;
				case "wall": icon=lang("TWB-Wall");
				break;
			}
			wd.$("#builid")[0].innerHTML=icon;
			wd.$("#options").slideDown('slow',function(){});
		}
	},
	TWB_BQD_OK : function(wd){
		with(twb_.lib){
			try{
				sel=wd.$("select")[0];
				wd.$("#options").slideUp('slow',function(){});
				// Add level to queue
				icon=TWB_BQD_ToIco(sel.name);
				//_BQD[nname].push([sel.name,sel.value]);
				// Add row
				tr=wd.document.createElement("tr");
				tr.id=Math.round(Math.random()*50000);
				wd.$("#queue")[0].appendChild(tr);
				tr.innerHTML='<td align="center">'+icon+'</td><td align="center">'+sel.value+'</td><td align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Del_(this,window)">'+lang("delete")+'</a></td>';
				wd.$("#queue").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Del_ : function(el,wd){
		with(twb_.lib){
			try{
				RID=el.parentNode.parentNode.id;
				wd.$("#queue").find("tr").each(function(o){
					if(this.id==RID){
						K=o-1;
						_BQD[wd.nname].splice(K,1);
					}
				});
				el=el.parentNode.parentNode;
				el.parentNode.removeChild(el);
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_Close : function(wd){
		with(twb_.lib){
			wd.close();
		}
	},
	TWB_BQD_Show : function(){
		with(twb_.lib){
			try{
				_BQD=TWB_OVE("bqd_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				_BQDC=TWB_OVE("bqdc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				// Show HTML + Add existing Queues
				src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
				html='<html><head><title>'+lang("title17")+'</title><script src="'+src+'jquery.js"></script><script src="'+src+'dnd.js"></script><script src="'+src+'balloon.config.js"></script><script src="'+src+'balloon.js"></script><script src="'+src+'yahoo-dom-event.js"></script><script>var fader = new Balloon;BalloonConfig(fader,"GFade");</script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align=center><div class="block"><a href=javascript:;><h1>'+lang("title17")+' :</h1></a></div><br /><div class="block"><p align="left"><br />&nbsp;&nbsp;&nbsp; <u><b>'+lang("bqchose")+' :</b></u></p><div id=section1><table class="block vis" width="50%" id="_queues"><tr><th width="30%" align="center"><u><b>'+lang("TWB-Sort12")+'</b></u></th><th width="3%"></th><th width="33%" align="center"><u><b>'+lang("load")+'</b></u></th><th width="33%" align="center"><u><b>'+lang("delete")+'</b></u></th></tr>';
				for(nname in _BQD){
					html+='<tr><td width="30%" align="center">'+nname+'</td><td width="3%" align="left"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Ren(this,window)"><img border=0 src="http://'+TWB_World()+'graphic/rename.png"></a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Load(this,window)">'+lang("load")+'</a></td><td width="33%" align="center"><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_Del(this,window)">'+lang("delete")+'</a></td></tr>';
				}
				html+='<tr id="newq"><th width="100%" align="center" colspan="4"><u><b><a href="javascript:;" onclick="window.openerx.twb_.lib.TWB_BQD_New(window)">'+lang("newq")+'</a></b></u></th></tr></table></div><br></div><Br><div class="block"><br><p align="left">&nbsp;&nbsp;&nbsp; <u><b>'+lang("bqcur")+' :</b></u></p><div id="section2" style="display:none"><table border=0><tr><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Main")+'")\' src="http://twbooster.com/phpBB3/twb/icons/main.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Barracks")+'")\' src="http://twbooster.com/phpBB3/twb/icons/barracks.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Stable")+'")\' src="http://twbooster.com/phpBB3/twb/icons/stable.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Workshop")+'")\' src="http://twbooster.com/phpBB3/twb/icons/garage.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Wood")+'")\' src="http://twbooster.com/phpBB3/twb/icons/wood.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Stone")+'")\' src="http://twbooster.com/phpBB3/twb/icons/stone.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Iron")+'")\' src="http://twbooster.com/phpBB3/twb/icons/iron.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Storage")+'")\' src="http://twbooster.com/phpBB3/twb/icons/storage.png" border=0></td></tr><tr><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Hide")+'")\' src="http://twbooster.com/phpBB3/twb/icons/hide.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Smithy")+'")\' src="http://twbooster.com/phpBB3/twb/icons/smith.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Statue")+'")\' src="http://twbooster.com/phpBB3/twb/icons/statue.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Snob")+'")\' src="http://twbooster.com/phpBB3/twb/icons/snob.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Church")+'")\' src="http://twbooster.com/phpBB3/twb/icons/church.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Market")+'")\' src="http://twbooster.com/phpBB3/twb/icons/market.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Farm")+'")\' src="http://twbooster.com/phpBB3/twb/icons/farm.png" border=0></td><td align=center style="width:50px" class="vis icon"><img class=icon onmouseover=\'fader.showTooltip(event,"'+lang("TWB-Wall")+'")\' src="http://twbooster.com/phpBB3/twb/icons/wall.png" border=0></td></tr></table><br><div id=options style="display:none"><u><b>'+lang("buildd")+' :</b></u> <span id=builid></span><br><u><b>'+lang("level")+' :</b></u> <select size="1" name="level"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option></select>&nbsp;<input type=button value="'+lang("ok")+'" onclick="window.openerx.twb_.lib.TWB_BQD_OK(window,this)"><br /><br /></div><div align="center"><center><table class="block vis" width="30%" id="queue"><tr id="NOT"><td align="center"><u><b>'+lang("buildd")+'</b></u></td><td align="center"><u><b>'+lang("level")+'</b></u></td><td align="center"><u><b>'+lang("delete")+'</b></u></td></tr></table></center></div><p><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_BQD_Save(window);" value="'+lang("save")+'" name="B1">&nbsp;&nbsp;<input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_BQD_Cancel(window);" value="'+lang("canc")+'" name="B1"></p><br></div><br /></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_BQD_Close(window);" value="'+lang("close")+'" name="B1"><br /><br /></div></div><script>$("img.icon").hover(function(){$(this).css("opacity","1");},function(){$(this).css("opacity","0.6");});$("img.icon").click(function(){window.openerx.twb_.lib.TWB_BQD_Icon(this,window);});';
				html+='$(document).ready(function(){$("#queue").tableDnD({onDragClass: "dragndrop", onDrop: function(table, row){ /* var rows = table.tBodies[0].rows; */ /* Save rows */ }, onDragStart: function(table, row){} });});';
				html+='</script></body></html>';
				openW(html);
			}catch(e){
				log('Building Queue',e);
			}
		}
	},
	TWB_BQD_PickQ : function(seL,wd){
		with(twb_.lib){
			seL=seL.innerHTML;
			rows=wd.document.getElementsByTagName("tr");
			for(o=0; o<rows.length; o++){
				if(rows[o].id.match("row_")){
					rows[o].style.display="none";
				}
				if(rows[o].id=="row_"+seL){
					rows[o].style.display="";
				}
			}
			rows=wd.document.getElementsByTagName("span");
			for(o=0; o<rows.length; o++){
				if(rows[o].id.match("buttons_")){
					rows[o].style.display="none";
				}
				if(rows[o].id=="buttons_"+seL){
					rows[o].style.display="";
				}
			}
		}
	},
	TWB_BQD_Choose : function(){
		with(twb_.lib){
			_BQD=TWB_OVE("bqd_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			_BQDC=TWB_OVE("bqdc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			// Choosing queues
			queues=[];
			for(Q in _BQD){
				queues.push(Q);
			}
			src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
			html='<html><head><title>'+lang("title17")+'</title><script src="'+src+'jquery.js"></script><script src="'+src+'dnd.js"></script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align=center><div class="block"><a href=javascript:;><h1>'+lang("title17")+' :</h1></a></div><br /><div class="block"><p align="left"><br />&nbsp;&nbsp;&nbsp; <u><b>'+lang("bqchose")+' :</b></u></p><table width="100%"><tr><td width="23%" align=center><div class="block vis" style="height: 250px; width:50%; overflow:auto"><br>';
			for(j=0; j<queues.length; j++){
				html+='<p><a href="javascript:;" onclick=window.openerx.twb_.lib.TWB_BQD_PickQ(this,window)>'+queues[j]+'</a></p>';
			}
			html+='</div></td><td width="67%"><div class="block vis" style="height:100%; width:66%"><span style="padding:20px"><u><b>'+lang("queues")+'</b></u></span><br><br><table width="100%">';
			for(j=0; j<queues.length; j++){
				html+='<tr id="row_'+queues[j]+'" style="display:none"><td align=center><b>'+queues[j]+'</b><br><br><table border=0 width="80%"><tr><td width="60%" align=center><select multiple size=10 id="'+queues[j]+'" class="queue"></select></td><td width="40%" align=center><input type=button onclick="restore(\''+queues[j]+'\')" value="'+lang('remove')+'">&nbsp;&nbsp;<input type=button onclick="restore_all(\''+queues[j]+'\')" value="'+lang('remove')+" "+lang("all")+'"></td></tr></table></td>';
			}
			html+='</table></div></td></tr></table><BR><BR><div id=section1><table class="block vis" width="50%" id="_queues"><tr><th rowspan="3" align="center"><u><b>'+lang("TWB-Village")+'</b></u><br><br>'
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
				grpstr+="&nbsp;&nbsp;<a href=\"javascript:void('"+grset[k]+"')\" onclick=\"group('"+grset[k]+"')\">["+grset[k]+"]</a>";
			}
			grpstr+="&nbsp;&nbsp;<a href=\"javascript:void('"+lang("all")+"')\" onclick=\"group('all')\">>"+lang("all")+"<</a>";
			html+=grpstr;
			html+='<br><Br><table border=0 width="80%"><tr><td width="60%" align=center><select size=10 id=vils multiple>';
			C=cN(gei("TWB-Villages"));
			for(i=0; i<C.length; i++){
				GRP="all";
				if(typeof groups[C[i].id]!="undefined"){
					GRP+=" "+groups[C[i].id].join(" ");
				}
				html+='<option class="'+GRP+'" value="'+C[i].id+'" id="'+C[i].id+'">'+C[i].getAttribute("label")+' '+C[i].getAttribute("tooltiptext")+'</option>';
			}
			html+='</select></td><td width="40%" align=center>';
			for(j=0; j<queues.length; j++){
				html+='<span style="display:none" id="buttons_'+queues[j]+'"><input type=button value="'+lang('add')+'" onclick="add(\''+queues[j]+'\')">&nbsp;&nbsp;<input type=button value="'+lang('add')+" "+lang("all")+'" onclick="add_all(\''+queues[j]+'\')"><br></span>';
			}
			html+='</td></tr></table></th></tr></table></div><br></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_BQD_CloseC(window);" value="'+lang("close")+'" name="B1"><br /><br /></div></div>';
			scripts="<script>";
			scripts+='function group(gid){opt=$("#vils option");for(i=0; i<opt.length; i++){G=opt[i].className.split(" ");if(G.indexOf(gid)>-1){opt[i].style.display="";}else{opt[i].style.display="none";}}}';
			scripts+='function add(towhere){val=$("#vils").val();for(i=0; i<val.length; i++){$("#"+towhere).append($("#"+val[i])[0]);}sort(towhere); window.openerx.twb_.lib.TWB_BQD_SaveC(window);}';
			scripts+='function add_all(towhere){val=$("#vils option");for(i=0; i<val.length; i++){if(val[i].style.display!="none"){$("#"+towhere).append(val[i]);}}sort(towhere); window.openerx.twb_.lib.TWB_BQD_SaveC(window);}';
			scripts+='function restore(towhere){val=$("#"+towhere).val();for(i=0; i<val.length; i++){$("#vils")[0].appendChild($("#"+val[i])[0]);}sort("vils"); window.openerx.twb_.lib.TWB_BQD_SaveC(window);}';
			scripts+='function restore_all(towhere){val=$("#"+towhere+" option");for(i=0; i<val.length; i++){$("#vils")[0].appendChild(val[i]);}sort("vils"); window.openerx.twb_.lib.TWB_BQD_SaveC(window);}';
			scripts+='function sort(towhere){$("#"+towhere).sortOptionsByText();}';
			scripts+='function _move(vid,towhere){if(typeof $("#"+towhere)[0]!="undefined"){$("#"+towhere)[0].appendChild($("#"+vid)[0]);}}';
			scripts+='jQuery.fn.sort = function(){return this.pushStack([].sort.apply(this, arguments), []);};jQuery.fn.sortOptions = function(sortCallback){jQuery("option", this).sort(sortCallback).appendTo(this);return this;};jQuery.fn.sortOptionsByText = function(){var byTextSortCallback = function(x, y){var xText = jQuery(x).text().toUpperCase();var yText = jQuery(y).text().toUpperCase();return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;};return this.sortOptions(byTextSortCallback);};jQuery.fn.sortOptionsByValue = function(){var byValueSortCallback = function(x, y){var xVal = jQuery(x).val();var yVal = jQuery(y).val();return (xVal < yVal) ? -1 : (xVal > yVal) ? 1 : 0;};return this.sortOptions(byValueSortCallback);};';
			scripts+='$(document).ready(function(){';
			// Load saved data
			for(towhere in _BQDC){
				for(L=0; L<_BQDC[towhere].length; L++){
					scripts+="_move('"+_BQDC[towhere][L]+"','"+towhere+"');";
				}
			}
			scripts+="});</script>";
			html+=scripts;
			html+='</body></html>';
			openW(html);
		}
	},
	TWB_BQD_SaveC : function(wd){
		with(twb_.lib){
			sels=wd.$("select.queue");
			for(i=0; i<sels.length; i++){
				ST=wd.$("#"+sels[i].id+" option");
				_BQDC[sels[i].id]=[];
				for(k=0; k<ST.length; k++){
					_BQDC[sels[i].id].push(ST[k].id);
				}
			}
			// Save
			TWB_S(uneval(_BQDC),"bqdc_"+TWB_World(0)+"["+twb_myID+"].twb");
		}
	},
	TWB_BQD_CloseC : function(wd){
		with(twb_.lib){
			// Close
			wd.close();
		}
	},
	// Timer process
	TWB_BQD_Start : function(){
		with(twb_.lib){
			_BQD=TWB_OVE("bqd_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			_BQDC=TWB_OVE("bqdc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
			src="file:"+SL+SL+Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path.replace(/\\/g,SL)+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
			html='<html><head><title>'+lang("title17")+'</title><script src="'+src+'jquery.js"></script><style>.hide{ display:none; } .icon{ align:center; height: 80; -moz-border-radius: 20px; } img.icon{ opacity:0.6} .vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align="center"><div class="block"><a href="javascript:;"><h1>'+lang("title17")+' :</h1></a></div><br /><div class="block"><p align="left"><br /><br></p><b><div class="block vis" style="width:50%"><br><u><b>'+lang("ccv")+':</b></u> <span id=CUR_VIL></span><br><b><span id=vil></span></b><br><br><u><b>'+lang("usq")+':</b></u> <span id=CUR_Q></span><br><b><span id=nname></span></b><br><br><u><b>'+lang("btb")+':</b></u> <span id=BUILD></span><br><b></b><br><br><img id=loader style="display:none" src="http://twbooster.com/phpBB3/twb/icons/ajax-loader.gif"><br><br></div></b><br><div id="section1" style="width:50%"><div class="block vis"><br><u><b>'+lang("logqueue")+'</b></u><br><div align=left id="debugger" style="padding: 15px 20px;overflow:auto;height:200"></div><br></div></div><br><br></div><br /><div class="block" align="center"><br><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_BQD_Stop(window);" value="'+lang("stop")+'" name="B1"><br /><br /></div></div></body></html>';
			twb_.BQWindow=openW(html);
			setT(function(){
				loop=$get_var("bqtimer");
				// Start First
				TWB_BQD_Looper();
				// Queue others
				setI(TWB_BQD_Looper,loop*60000,"bqtimer");
				this.addEventListener("unload",TWB_BQD_Stop,false);
			},$get_var(0),"bqdstart");
		}
	},
	TWB_BQD_Looper : function(){
		with(twb_.lib){
			// First queue
			if(typeof twb_.BQWindow!="undefined" && twb_.BQWindow.document!=null){
				twb_.BQWindow.curQ=TWB_BQD_NextQ();
				twb_.BQWindow.curV=TWB_BQD_NextV(twb_.BQWindow.curQ);
				TWB_BQD_Loop();
			}
		}
	},
	TWB_BQD_Stop : function(wd){
		with(twb_.lib){
			unsetI("bqtimer");
			wd.close();
			delete twb_.BQWindow;
			return true;
		}
	},
	TWB_BQD_GetH : function(O){
		with(twb_.lib){
			O=typeof O=="undefined"?0:O;
			// Loop until found
			vil=cN(gei("TWB-Villages"),O);
			if(typeof vil=="undefined"){
				// We have no vil where we can grab a build ID, lets leave till next loop
				TWB_BQD_Log("stop");
				return ;
			}
			vil=vil.id;
			TWB_BQD_Log("load");
			link="http://"+TWB_World()+"game.php?village="+vil+"&screen=main";
			$.ajax({url:link,async:true,success:function(dataH){
				H=dataH.match(/build&amp;h=(\w+)/);
				found=H!==null;
				if(found){
					local.twb_H=H[1];
					twb_.BQWindow._H=H[1];
					// Call Back
					TWB_BQD_Loop();
				}
				else{
					O++;
					TWB_BQD_GetH(O);
				}
			}});
		}
	},
	TWB_BQD_NextQ : function(){
		with(twb_.lib){
			_Q=twb_.BQWindow.curQ;
			last=null;
			for(Q in _BQD){
				// First call, set first not empty queue
				if(typeof _Q=="undefined" && _BQD[Q].length>0){
					return Q;
				}
				if(typeof _Q!="undefined" && last==_Q){
					// Predefined
					if(_BQD[Q].length>0){
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
	TWB_BQD_NextV : function(Q,V,T){
		with(twb_.lib){
			if(typeof V=="undefined"){
				if(typeof T=="undefined"){
					if(typeof _BQDC[Q]!="undefined"){
						return _BQDC[Q][0];
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
				return _BQDC[Q][_BQDC[Q].indexOf(V)-(-1)];
			}
		}
	},
	TWB_BQD_Log : function(mode,str,color){
		with(twb_.lib){
			color=(typeof color=="undefined" || color==1)?"green":color;
			switch(mode){
				case "load" :
					twb_.BQWindow.document.getElementById("loader").style.display="";
				break;
				
				case "stop" : 
					twb_.BQWindow.document.getElementById("loader").style.display="none";
				break;
				
				case "log" : 
					logger=twb_.BQWindow.document.getElementById("debugger");
					logger.innerHTML="<font color="+color+">"+str+"</font><br>"+logger.innerHTML;
				break;
				
				case "build" :
					logger=twb_.BQWindow.document.getElementById("BUILD");
					if(str==0){
						str="";
					}
					else{
						str=TWB_BQD_ToIco(str);
					}
					logger.innerHTML=str;
				break;
				
				case "queue" :
					logger=twb_.BQWindow.document.getElementById("CUR_Q");
					if(str==0){
						str="";
					}
					else{
						str=twb_.BQWindow.curQ;
					}
					logger.innerHTML=str;
				break;
				
				case "vil" :
					logger=twb_.BQWindow.document.getElementById("CUR_VIL");
					if(str==0){
						str="";
					}
					else{
						vil=twb_.BQWindow.curV;
						nzm=gei(vil).getAttribute("label")+" "+gei(vil).getAttribute("tooltiptext");
						str='<a href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx("'+vil+'",1)>'+nzm+'</a>';
					}
					logger.innerHTML=str;
				break;
			}
		}
	},
	TWB_BQD_NVil : function(VO){
		with(twb_.lib){
			return "<a href=javascript:; onclick=javascript:window.openerx.twb_.lib.TWB_LoadVilx('"+VO+"',1)>"+gei(VO).getAttribute("label")+"</a>";
		}
	},
	TWB_BQD_Loop : function(){
		with(twb_.lib){
			if(twb_.BQWindow.curQ!=null){
				if(typeof twb_.BQWindow._H=="undefined"){
					if(typeof local.twb_H!="undefined"){
						// Been previously scraped
						twb_.BQWindow._H=local.twb_H;
					}
					else{
						TWB_BQD_GetH();
						return;
						// Stop here, we will call back
					}
				}
				// Queue is already set
				// Check village
				if(typeof twb_.BQWindow.curV=="undefined"){
					twb_.BQWindow.curV=TWB_BQD_NextV(twb_.BQWindow.curQ,twb_.BQWindow.curV,0);
					// Still ?
					if(typeof twb_.BQWindow.curV=="undefined"){
						// New queue
						twb_.BQWindow.curQ=TWB_BQD_NextQ();
						// And call back
						TWB_BQD_Loop();
						return;
					}
				}
				// Display Queue and Vil and loader icon
				TWB_BQD_Log("queue");
				TWB_BQD_Log("vil");
				TWB_BQD_Log("load");
				// Get XHR Main
				link="http://"+TWB_World()+"game.php?village="+twb_.BQWindow.curV+"&screen=main";
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
								if(lang(items[M]).toLowerCase().match(building.toLowerCase())){
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
			}
			else{
				// End
				twb_.BQWindow.curQ="";
				twb_.BQWindow.curV="";
				
				TWB_BQD_Log("stop");
				TWB_BQD_Log("vil",0);
				TWB_BQD_Log("queue",0);
				TWB_BQD_Log("build",0);
				
				delete cando;
				delete action;
				delete twb_.BQWindow.curQ;
				delete twb_.BQWindow.curV;
				
				log("BuildQ","End",3);
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof _BQD=="undefined"){
				_BQD=TWB_OVE("bqd_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				_BQDC=TWB_OVE("bqdc_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				
				B1=BTN("menuseparator",{},gei("TWB-Bots"));
				B2=BTN("menuitem",{id:"TWB-BotQ2",label:"Building Queue",oncommand:"try{twb_.lib.TWB_BQD_Show();}catch(e){twb_.lib.log('Building Queue',e);}"},gei("TWB-Bots"));
				B3=BTN("menuitem",{id:"TWB-BotQ2C",label:"Choose Queues",oncommand:"try{twb_.lib.TWB_BQD_Choose();}catch(e){twb_.lib.log('Building Queue',e);}"},gei("TWB-Bots"));
				B4=BTN("menuitem",{id:"TWB-BotQ2L",label:"Launch Queues",oncommand:"try{twb_.lib.TWB_BQD_Start();}catch(e){twb_.lib.log('Building Queue',e);}"},gei("TWB-Bots"));
				
				if(typeof settings.premium=="undefined"){
					// We do not want to add more than 1 cat for premium
					TWB_New_Group_Set("premium",lang("premium"));
				}
				TWB_New_Set("premium",[lang("bqtimer"),{id:"bqtimer",type:"menupop",selected:"bqtimer",values:[["5","5"],["10","10"],["20","20"],["30","30"],["60","60"],["90","90"],["120","120"],["150","150"]]}]);
			}
		}
	},
}
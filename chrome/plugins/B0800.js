// @Plugin = Mass Rename
// @Version = 1.3
// @Icons = 0
merge(twb_.lib,{
	TWB_Ren : function(v,w){
		with(twb_.lib){
			t=TWB_GA(v);
			curN=$get_var("alias")=="true"?t.split("[")[1].split("]")[0]:t;
			curN=$get_var("alias")=="true"?t.replace(/\s\(\d+\)/,""):t;
			posN=prpt(lang("rna"),curN);
			if(posN!==null){
				if(local.TWB_HB_Z=="null"){
					link="http://"+TWB_World()+"game.php?village="+v+"&screen=main"+local.sitterT;
					tmpx=$.ajax({url:link,async: false}).responseText;
					anh=tmpx.match(/&amp;h=\w+"\smethod="post"/)[0].replace("\" method=\"post\"","").replace("&amp;h=","");
					local.TWB_HB_Z=anh;
				}
				anh=local.TWB_HB_Z;
				url="http://"+TWB_World()+"game.php?village="+v+"&screen=main&action=change_name&h="+anh+local.sitterT;
				params="name="+posN;
				xhr2=new XMLHttpRequest();
				xhr2.open("POST", url, false);
				xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr2.setRequestHeader("Content-length", params.length);
				xhr2.send(params);
				// Update all on CMD
				X=w.document.getElementsByName(v+"_");
				for(k=0; k<X.length; k++){
					X[k].innerHTML=posN;
				}
				// Update village list
				newN=$get_var("alias")=="true"?alias_[v]+" ["+posN+"]":posN;
				nbr=0;
				for(fID in Dfarms){
					if(Dfarms[fID].pID==vil){
						nbr++;
					}
				}
				newN+=$get_var("alias")=="true"?" ("+nbr+")":"";
				gei(v).setAttribute("label",newN);
			}
		}
	},
	TWB_Rename : function(){
		with(twb_.lib){
			try{
				if(local.TWB_HB_Z=="null"){
					vil=local.curVillage;
					link="http://"+TWB_World()+"game.php?village="+vil+"&screen=main"+local.sitterT;
					tmpx=$.ajax({url:link,async: false}).responseText;
					anh=tmpx.match(/&amp;h=\w+"\smethod="post"/)[0].replace("\" method=\"post\"","").replace("&amp;h=","");
					local.TWB_HB_Z=anh;
				}
				old=TWB_GA(this.id);
				if(old.match(/\[.+\]/)){
					old=old.split(" [")[1].split("]")[0];
				}
				twb_.nme=prpt(lang("TWB-Ren"),old);
				if(twb_.nme!==null && twb_.nme.length>=3){
					twb_.r_indo=0;
					twb_.rnex=(cf(lang("tyf")))?"0":"1";
					meter.caption=lang("TWB-Ren");
					meter.label1=lang("total");
					meter.value1=0;
					meter.label2=lang("total");
					meter.value2=0;
					TWB_Popup(TWB_UCancelR);
					TWB_RNE(0);
				}
				else{
					if(nme!==null){
						pq(lang("renx"));
					}
				}
			}catch(e){log("Main",e);}
		}
	},
	TWB_UCancelR : function(){
		with(twb_.lib){
			twb_.cancelR=true;
		}
	},
	TWB_RNE : function(nba){
		with(twb_.lib){
			try{
				var container=gei("TWB-Villages");
				b=cN(container).length;
				// Progress of previous
				meter.value1=meter.value2=Math.round(100*nba/b);
				if(nba<b && typeof twb_.cancelR=="undefined"){
					vil=cN(container,nba).getAttribute("id");
					// Doit
					twb_.r_indo=twb_.r_indo-(-1);
					IND=(cN(gei("TWB-Villages")).length+" ").match(/\d/g).length;IDN="";
					DIF=IND-(twb_.r_indo+" ").match(/\d/g).length-(-1);
					for(iz=0; iz<DIF; iz++){ IDN+="0"; }
					nme=(twb_.rnex=="0")?twb_.nme:twb_.nme+" "+IDN+twb_.r_indo;
					old=TWB_GA(vil);
					if(old.match(/\[.+\]/)){
						old=old.split(" [")[1].split("]")[0];
					}
					anh=local.TWB_HB_Z;
					link="http://"+TWB_World()+"game.php?village="+vil+"&screen=main&action=change_name&h="+anh+local.sitterT;
					params="name="+nme;
					$.ajax({type:"POST", url:link, data:params, success:function(){
						origin=TWB_GA(vil);
						if(origin.match(/\[.+\]/)){
							origin=origin.split(" [")[1].split("]")[0];
						}
						finl=origin;
						if($get_var("alias")=="true"){
							finl=nme+" ["+orign+"]";
						}
						if($get_var("fnbr")=="true"){
							nbr=0;
							for(fID in Dfarms){
								if(Dfarms[fID].pID==vil){
									nbr++;
								}
							}
							finl+=" ("+nrb+")";
						}
						gei(vil).setAttribute("label",finl);
						nba++;
						TWB_RNE(nba);
					}});
				}
				else{
					delete twb_.cancelR;
					meter.value2=100;
					pq(lang("mcos"),0);
				}
			}catch(e){log('Mass Rename',e);}
		}
	}
});
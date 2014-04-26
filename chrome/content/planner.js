function chosen1(){
	$("#section1_").slideUp('slow', function(){
		$("#section1")[0].textContent="+";
		$("#section2_").slideDown('slow', function(){
			$("#section2")[0].textContent="-";
		});
	});
}

function chosen2(){
	$("#section2_").slideUp('slow', function(){
		$("#section2")[0].textContent="+";
		$("#section3_").slideDown('slow', function(){
			$("#section3")[0].textContent="-";
		});
	});
}

function chosen3(){
	$("#section3_").slideUp('slow', function(){
		$("#section3")[0].textContent="+";
		$("#section4_").slideDown('slow', function(){
			$("#section4")[0].textContent="-";
			// Shows the loading bar
			$("#section4_").html("<img src='http://twbooster.com/phpBB3/twb/29-0.gif'>");
			// Ajax
			player=$("#target")[0].value;
			window.openerx.twb_.lib.TWB_APlan_Search(resultIn,player);
		});
	});
}

function resultIn(q){
	// Lets see if there is a player with that name
	found=q.match('<tr class="lit">')!==null;
	if(found){
		// Grab his id
		his_id=q.split('<tr class="lit">')[1].split("</tr>")[0].match(/&amp;id=(\d+)/)[1];
		// Now make an XHR to get his villages
		window.openerx.twb_.lib.TWB_APlan_Villages(villagesIn,his_id);
	}
	else{
		// Output error 
		$("#section4_").html("<b><font color=red>"+lang("nosuchplayer")+"</font></b>");
		// Time a reset
		window.setTimeout(restart,3000);
	}
}

function villagesIn(q){
	target_vils={};
	own_vils={};
	output={};
	villages=q.split('<th width="80">')[1].split("</table>")[0].split("/th></tr>")[1].split("<tr>");
	for(i=1; i<villages.length; i++){
		clean=villages[i].replace(/<\/a>/g,'').replace(/<\/td>/g,'').replace(/<\/tr>/,'').split("<td>");
		vil_id=clean[1].match(/id=(\d+)/)[1];
		vil_name=clean[1].split(">")[1];
		vil_coords=clean[2].split("|");
		vil_points=clean[3].replace('<span class="grey">','').replace('</span>','');
		target_vils[vil_id]={
			name : vil_name,
			coords : vil_coords,
			points : vil_points
		}
	}
	dur=$("#dur")[0].value; // In hrs
	// Own villages we are using
	checked=$(".own:checked");
	for(i=0; i<checked.length; i++){
		vil_id=checked[i].value.split("_")[1];
		vil_name=checked[i].parentNode.innerHTML.split("&nbsp;&nbsp;")[1];
		vil_coords=window.openerx.twb_.lib.getC(window.openerx.twb_.lib.gei(vil_id).getAttribute("tooltiptext"));
		own_vils[vil_id]={
			name : vil_name,
			coords : vil_coords
		}
	}
	// Loop each own village that is checked
	for(own_id in own_vils){
		curC=own_vils[own_id].coords;
		// Type
		radio=$("#"+own_id+" > td > input:radio");
		type="fat";
		for(k=0; k<radio.length; k++){
			if(radio[k].checked){
				type=radio[k].value;
				break;
			}
		}
		own_vils[own_id].type=type;
	}
	TYPES={
		"fat" : window.openerx.twb_.lib.$get_var("slowestfat"),
		"fsup" : window.openerx.twb_.lib.$get_var("slowestfsup"),
		"nuke" : window.openerx.twb_.lib.$get_var("slowestnuke"),
		"noble" : window.openerx.twb_.lib.$get_var("slowestnoble")
	}
	sl_sped={"n":35,"c":30,"w":22,"p":18,"h":11,"l":10,"s":9,"k":10};
	SPEED=window.openerx.twb_.lib.TWB_Speed();
	// Start Dumping
	BIG="dur="+dur;
	BIG+="&speed="+SPEED[0]+","+SPEED[1];
	BIG+="&types=";
	for(T in TYPES){
		BIG+=TYPES[T]+",";
	}
	BIG+="&delay="+calc_delay(dur);
	BIG+="&targets=";
	for(target_id in target_vils){
		BIG+=target_vils[target_id].coords.join("|")+",";
	}
	BIG+="&own=";
	for(own_id in own_vils){
		BIG+=own_vils[own_id].coords.join("|")+",";
	}
	BIG+="&choices=";
	for(own_id in own_vils){
		BIG+=own_vils[own_id].type+",";
	}
	BIG+="&ids1=";
	for(target_id in target_vils){
		BIG+=target_id+",";
	}
	BIG+="&ids2=";
	for(own_id in own_vils){
		BIG+=own_id+",";
	}
	window.openerx.twb_.lib.TWB_APlan_Calc(outResult,BIG);
}

function calc_delay(dur){
	dev_30=dur%30;
	if(dev_30<1){
		dev_30=30;
	}
	return (dev_30)/10;
}

function two(x){
	return ((x>9)?"":"0")+x;
}

function three(x){
	return ((x>99)?"":"0")+((x>9)?"":"0")+x;
}

function convertT(t){
	s=Math.round(t);
	// Hrs
	hrs=s/3600;
	hrs=Math.floor(hrs);
	// Mins
	mins=(s-3600*hrs)/60;
	mins=Math.floor(mins);
	// Secs
	secs=s-3600*hrs-60*mins;
	return hrs+":"+mins+":"+secs;
}

function outResult(tmp){
	// Construct the obj
	eval("tmp="+tmp);
	// Display
	html='<table class="example vis"><thead><tr><th>'+lang("TWB-Village")+'</th><th>'+lang("coord")+'</th></tr></thead>';
	for(vil_id in tmp){
		vil_name=window.openerx.twb_.lib.gei(vil_id).getAttribute("label");
		vil_coords=tmp[vil_id];
		info="";
		for(ul=0; ul<vil_coords.length; ul++){
			info+=vil_coords[ul][0]+" ("+vil_coords[ul][1]+")<br>";
		}
		html+='<tr><td><a href=javascript:; onclick=window.openerx.twb_.lib.openU("/game.php?screen=info_village&id='+vil_id+'")>'+vil_name+'</a></td><td align=center>'+info+'</td></tr>';
	}	
	html+='</table>';
	$("#section4_").html(html);
}

function lang(v){
	return window.openerx.twb_.lib.lang(v);
}

function restart(){
	// Show / Hide
	$("#section4_").slideUp('slow', function(){});
	$("#section3_").slideUp('slow', function(){});
	$("#section2_").slideUp('slow', function(){});
	$("#section1_").slideDown('slow', function(){});
	$("#section1")[0].textContent="-";
	$("#section2")[0].textContent="+";
	$("#section3")[0].textContent="+";
	$("#section4")[0].textContent="+";
}

$(".section").each(function(i){
	$(this).click(function() {
		$('#'+this.id+"_").slideToggle('slow', function(){});
		if(this.textContent=="+"){
			this.textContent="-";
		}
		else{
			this.textContent="+";
		}
	});
});

$(".group").each(function(i){
	$(this).click(function(){
		// Restore all to []
		$(".group").each(function(i){
			take1=this.innerHTML.match(/\>(.+)\</);
			take2=this.innerHTML.match(/\[(.+)\]/);
			take3=this.innerHTML.match(/\&gt;(.+)\&lt;/);
			if(take1){
				this.innerHTML="["+take1[1]+"]";
			}
			else{
				if(take2){
					this.innerHTML="["+take2[1]+"]";
				}
				else{
					this.innerHTML="["+take3[1]+"]";
				}
			}
		});
		// This will be ><
		take1=this.innerHTML.match(/>(.+)</);
		take2=this.innerHTML.match(/\[(.+)\]/);
		take3=this.innerHTML.match(/\&gt;(.+)\&lt;/);
		if(take1){
			this.innerHTML=">"+take1[1]+"<";
		}
		else{
			if(take2){
				this.innerHTML=">"+take2[1]+"<";
			}
			else{
				this.innerHTML=">"+take3[1]+"<";
			}
		}
		// Filter
		$("#villages > tbody > tr").each(function(i){
			now=(take1 || take2 || take3)[1];
			memberOf=this.className.split(" ");
			if(memberOf.indexOf(now)==-1){
				this.style.display="none";
			}
			else{
				this.style.display="";
			}
		});
	});
});

$("#selectall").click(function(){
	var checked_status = this.checked;
	$("input.own").each(function(){
		this.checked = checked_status;
	});
});

$("#selectall1").click(function(){
	var checked_status = this.checked;
	$(":radio[value=fat]").each(function(){
		this.checked = checked_status;
	});
});

$("#selectall2").click(function(){
	var checked_status = this.checked;
	$(":radio[value=fsup]").each(function(){
		this.checked = checked_status;
	});
});

$("#selectall3").click(function(){
	var checked_status = this.checked;
	$(":radio[value=nuke]").each(function(){
		this.checked = checked_status;
	});
});

$("#selectall4").click(function(){
	var checked_status = this.checked;
	$(":radio[value=noble]").each(function(){
		this.checked = checked_status;
	});
});
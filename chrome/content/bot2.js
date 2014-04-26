BOT_SF=[];
function save_all(){
	fields=document.getElementsByTagName("select");
	for(i=0; i<fields.length; i++){
		opt="";
		R=document.getElementsByName(fields[i].name);
		for(j=1; j<R.length; j++){
			if(R[j].checked==true){
				opt+=R[j].value;
			}
		}
		BOT_SF.push({vil:fields[i].name,selected:fields[i].value,options:opt});
	}
	window.openerx.twb_.lib.TWB_Save_SF(BOT_SF,window);
}

function swith(page){
	all=document.getElementsByTagName("tr");
	for(i=0; i<all.length; i++){
		nme=all[i].getAttribute("name");
		if(nme!==null && nme.match(/page1_/)){
			all[i].style.display="none";
		}
	}
	ok=document.getElementsByName("page1_"+page);
	for(i=0; i<ok.length; i++){
		$(ok[i]).fadeIn("slow");
	}
}

function sablo(v){
	v=v.replace("<select ","<select onchange=setALL(this.value) ");
	gei("sallbo").innerHTML=v;
}

function setALL(v){
	INDX=0;
	ZI=document.getElementsByTagName("select");
	for(K=0; K<ZI[0].childNodes.length; K++){
		if(ZI[0].childNodes[K].getAttribute("value")==v){
			INDX=K;
			break;
		}
	}
	for(h=0; h<ZI.length; h++){
		ZI[h].selectedIndex=INDX;
	}
}

function add(sets,O,PER){
	selc="<select size=1 name={vil}>";
	selc+="<option value=\"\">----</option>";
	for(i=0; i<sets.length; i++){
		selc+="<option value=\""+sets[i]+"\">"+sets[i]+"</option>";
	}
	selc+="</select>";
	sablo(selc);
	selcts=label.split(" | ");
	for(i=0; i<selcts.length-1; i++){
		selc+="&nbsp;&nbsp;<acronym title='"+selcts[i]+"'>"+selcts[i][0].toUpperCase()+"</acronym>: <input name='{vil}' type=checkbox value='"+i+"'>";
	}
	pge=0;disp="";tot=0;perpage=PER;sca="";
	for(i=0; i<O.length; i++){
		// Pagination
		if(tot%perpage===0){pge++;}
		if(tot-(-1)>perpage){disp="none";}
		tot++;
		// STOP
		vil=O[i].vil;
		row=dce("tr");
		row.setAttribute("name","page1_"+pge);
		row.style.display=disp;
			row_td1=dce("td");
			row_td1.setAttribute("width","50%");
			row_td1.setAttribute("align","center");
			row_td1.innerHTML='<p align="center"><b>'+window.names[vil]+'</b></p>';
			row.appendChild(row_td1);
			
			row_td2=dce("td");
			row_td2.setAttribute("width","50%");
			row_td2.setAttribute("align","center");
			row_td2.innerHTML=selc.replace(/\{vil\}/g,vil).replace("value=\""+O[i].selected+"\"","value=\""+O[i].selected+"\" selected");
			for(k=0; k<O[i].options.length; k++){
				row_td2.innerHTML=row_td2.innerHTML.replace('value="'+O[i].options[k]+'"','value="'+O[i].options[k]+'" checked');
			}
			row.appendChild(row_td2);
		gei("new").parentNode.insertBefore(row,gei("new"));	
	}
	last=tot-1;
	if(last>(perpage-1)){
		panges=dce("th");
		panges.setAttribute("colspan","2");
		lrow=dce("tr");
		pages=Math.ceil((last-(-1))/perpage);
		for(i=0; i<pages; i++){
			panges.innerHTML+='<a href=javascript:void(0) onclick=swith("'+(i-(-1))+'")>['+(i-(-1))+']</a> ';
		}
		lrow.appendChild(panges);
		gei("new").parentNode.appendChild(lrow);
	}
}

function dce(v){
	return document.createElement(v);
}

function gei(v){
	return document.getElementById(v);
}

function lang(v){
	return window.openerx.twb_.lib.lang(v);
}

function start(PER){
	add(NAMES,TMP,PER);
}

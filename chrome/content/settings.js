function onOK(){
// process arguments
	rows=document.getElementsByTagName("row");
	setz={};
	for(i=0; i<rows.length; i++){
		if(rows[i].getAttribute("name")=="setting"){
			el=rows[i].childNodes[1];
			id=el.getAttribute("id");
			nd=el.nodeName;
			if(nd=="hbox"){
				el=el.childNodes[0];
				id=el.getAttribute("id");
				nd=el.nodeName;
			}
			if(nd=="textbox"){
				vals=el.value;
				if(typeof vals=="undefined"){
					vals=el.getAttribute("value");
				}
			}
			if(nd=="image"){
				vals=el.src.match(/\d+/)[0];
				if(typeof vals=="undefined"){
					vals=el.getAttribute("src").match(/\d+/)[0];
				}
			}
			if(nd=="toolbarbutton"){
				vals=el.getAttribute("value");
			}
			if(nd=="checkbox"){
				vals=new String(el.getAttribute("checked"));
				if(vals==""){
					vals="false";
				}
			}
			setz[id]=vals;
		}
	}
	window.arguments[2].out=setz;
}
function onLoad(){
	try{
		lastId=0;
		document.title=window.arguments[0];
		gei("TWB_SETX").buttons="accept";
		setz=window.arguments[2].inn;	
		GROUPS=[];
		for(i=0; i<setz.length; i++){
			if(typeof setz[i]=="string"){
				current_I=GROUPS.length;
				GROUPS.push({name:setz[i],contents:[]});
			}
			else{
				GROUPS[current_I].contents.push(setz[i]);
			}
		}
		// Sort By Type
		for(i=0; i<GROUPS.length; i++){
			X=GROUPS[i].contents;
			GROUPS[i].contents=[];
			for(k=0; k<X.length; k++){
				if(X[k][1].type=="menupop"){
					GROUPS[i].contents.push(X[k]);
				}
			}
			for(k=0; k<X.length; k++){
				if(X[k][1].type=="checkbox"){
					GROUPS[i].contents.push(X[k]);
				}
			}
			for(k=0; k<X.length; k++){
				if(X[k][1].type=="textbox"){
					GROUPS[i].contents.push(X[k]);
				}
			}
			for(k=0; k<X.length; k++){
				if(X[k][1].type=="color"){
					GROUPS[i].contents.push(X[k]);
				}
			}
		}
		for(k=0; k<GROUPS.length; k++){
			// Tab Header
			lastId++;
			tab=dce("tab");
			tab.setAttribute("label",GROUPS[k].name);
			tab.setAttribute("name",lastId);
			tab.setAttribute("class","tab-left");
			gei("tabs").appendChild(tab);
			tabb=dce("tabpanel");
			gei("panels").appendChild(tabb);
			vbox=dce("vbox");
			vbox.style.overflow="auto";
			vbox.setAttribute("flex","1");
			grid=dce("grid");
			cols=dce("columns");
			col1=dce("column");
			col1.setAttribute("flex","1");
			col2=dce("column");
			col2.setAttribute("flex","1");	
			cols.appendChild(col1);
			cols.appendChild(col2);
			rows=dce("rows");
			grid.appendChild(cols);
			grid.appendChild(rows);
			vbox.appendChild(grid);
			tabb.appendChild(vbox);
			setz=GROUPS[k].contents;
			for(i=0; i<setz.length; i++){
				S=setz[i][1];
				row=dce("row");
				row.setAttribute("name","setting");
				label=dce("label");
				label.setAttribute("flex","1");
				label.setAttribute("value",setz[i][0]);
				row.appendChild(label);
				if(S.type=="textbox"){
					var item=dce(S.type);
					item.setAttribute("id",S.id);
					item.setAttribute("value",$get_var(S.value));
					item.setAttribute("flex","0");
					item.setAttribute("onkeyup","update('"+S.id+"')");
					item.setAttribute("multiline",false);
					if(S.maxlength){
						item.setAttribute("maxlength",S.maxlength);
					}
					if(S.password){
						item.setAttribute("type","password");
					}
					if(S.rows){
						item.setAttribute("rows",S.rows);
						item.setAttribute("multiline",true);
					}
					if(S.onclick){
						item.addEventListener("click",window.arguments[3].twb_.lib[S.onclick],false);
					}
				}
				if(S.type=="menupop"){
					var item=dce("toolbarbutton");
					item.setAttribute("type","menu");
					item.setAttribute("id",S.id);
					var holder=dce("menupopup");
					var sel="";
					for(j=0; j<S.values.length; j++){
						option=dce("menuitem");
						option.setAttribute("label",S.values[j][1]);
						option.setAttribute("value",S.values[j][0]);
						option.setAttribute("oncommand","onSelect(this)");
						holder.appendChild(option);
						if(S.values[j][0]==$get_var(S.selected)){
							sel=S.values[j][1];
						}
					}
					item.value=$get_var(S.selected);
					item.setAttribute("value",$get_var(S.selected));
					item.setAttribute("label",sel);
					item.appendChild(holder);
				}
				if(S.type=="checkbox"){
					var item=dce("hbox");
					item1=dce("checkbox");
					item1.setAttribute("id",S.id);
					item1.setAttribute("checked",$get_var(S.checked));
					// Remove fuzz by adding invisble element
					item2=dce("hbox");
					item.appendChild(item1);
					item.appendChild(item2);
				}
				if(S.type=="color"){
					var item=dce("hbox");
					item1=dce("image");
					item1.setAttribute("id",S.id);
					item1.setAttribute("src","chrome://twbdialer/skin/default/dots/"+$get_var(S.value)+".png");
					item1.style.width="32px";
					item1.style.height="32px";
					item1.addEventListener("click",function(){
						this.src="chrome://twbdialer/skin/default/dots/"+window.arguments[3].twb_.lib.TWB_CCMD()+".png";
					},false);
					item2=dce("hbox");
					item.appendChild(item1);
					item.appendChild(item2);
					// Remove fuzz by adding invisble element
				}
				if(i%2==0){
					row.className="z1";
				}
				else{
					row.className="z2";
				}
				item.setAttribute("flex","3");
				row.appendChild(item);
				rows.appendChild(row);
			}
		}
	}catch(e){
		//alert(e.message);
	}
}
function dce(v){
	return document.createElement(v);
}
function gei(v){
	return document.getElementById(v);
}
function onSelect(obj){
	obj.parentNode.parentNode.setAttribute("label",obj.getAttribute("label"));
	obj.parentNode.parentNode.setAttribute("value",obj.getAttribute("value"));
}
function update(id){
	gei(id).setAttribute(id,gei(id).value);
}

function $get_var(v){
	encoded=["tuser","tpass","copl","user","pass","hash"];
	Z=window.arguments[3].twb_.lib.$get_var(v);
	if(encoded.indexOf(v)>-1){
		Z=window.arguments[3].twb_.lib.B62.d(Z);
	}
	return Z;
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
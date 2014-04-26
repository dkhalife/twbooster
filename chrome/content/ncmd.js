function onLoad() {
	X=window.arguments[0];
	document.title=X;
	inn=window.arguments[1].inn;
	// Fil vils
	C=window.arguments[2];
	for(i=0; i<C.length; i++){
		V=dce("menuitem");
		V.setAttribute("id",C[i].getAttribute("id"));
		V.setAttribute("label",C[i].getAttribute("label"));
		V.setAttribute("tooltiptext",C[i].getAttribute("tooltiptext"));
		V.setAttribute("oncommand","window.from.value=this.id;Me=this.getAttribute('label')+' '+this.getAttribute('tooltiptext');window.from.setAttribute('tooltiptext',Me);update(window.from.value);");
		gei("vils").appendChild(V);
	}
	// Add languages
	gei("timx").setAttribute("value",lang("ao2"));
	gei("fo1").setAttribute("label",lang("ao7"));
	gei("fo2").setAttribute("label",lang("ao8"));
	gei("delayx").setAttribute("value",lang("ao5"));
	gei("sulab").setAttribute("value",lang("ao6"));
	gei("ascap").setAttribute("label",X);
	gei("cattar").setAttribute("value",lang("cattar"));
	// Add delay
	selectedz=window.arguments[4];
	if(selectedz!==null){
		gei("delay").setAttribute("value",selectedz);
	}
	// Lets show/hide
	if(!inn.show_archer){
		document.getElementById("img_archer").style.visibility="hidden";
		document.getElementById("img_marcher").style.visibility="hidden";
		document.getElementById("archer_").style.visibility="hidden";
		document.getElementById("marcher_").style.visibility="hidden";
		document.getElementById("showarcher").value="hidden";
	}
	if(!inn.show_knight){
		document.getElementById("img_knight").style.visibility="hidden";
		document.getElementById("knight_").style.visibility="hidden";
		document.getElementById("showknight").value="hidden";
	}
	// Add first row
	addx();
}

function rem(o){
	row=o.parentNode;
	X=row.parentNode;
	if(X.childNodes.length>4){
		X.removeChild(row);
	}
	else{
		alert("At least one attack is required!");
	}
}

function addx(o){
	rows=(typeof o!="undefined")?o.parentNode.parentNode:gei("params");
	R=dce("row");
	R.setAttribute("align","center");
	R1=dce("label");
	R1.setAttribute("value",rows.childNodes.length-2);
	RR1=dce("textbox");
	RR1.setAttribute("id","from");
	RR1.setAttribute("onclick","window.from=this;");
	RR1.setAttribute("popup","vils");
	RR1.setAttribute("readonly",true);
	RR1.setAttribute("size","3");
	RR1.setAttribute("value","");
	RR1.addEventListener("mouseover",function(){update(this.value);},false);
	R2=dce("textbox");
	R2.setAttribute("id","spear");
	R2.setAttribute("size","3");
	R2.addEventListener("dblclick",sall,false);
	R3=dce("textbox");
	R3.setAttribute("id","sword");
	R3.setAttribute("size","3");
	R3.addEventListener("dblclick",sall,false);
	R4=dce("textbox");
	R4.setAttribute("id","axe");
	R4.setAttribute("size","3");
	R4.addEventListener("dblclick",sall,false);
	R5=dce("textbox");
	R5.setAttribute("id","archer");
	R5.setAttribute("size","3");
	R5.style.visibility=document.getElementById("showarcher").value;
	R5.addEventListener("dblclick",sall,false);
	R6=dce("textbox");
	R6.setAttribute("id","spy");
	R6.setAttribute("size","3");
	R6.addEventListener("dblclick",sall,false);
	R7=dce("textbox");
	R7.setAttribute("id","light");
	R7.setAttribute("size","3");
	R7.addEventListener("dblclick",sall,false);
	R8=dce("textbox");
	R8.setAttribute("id","marcher");
	R8.setAttribute("size","3");
	R8.style.visibility=document.getElementById("showarcher").value;
	R8.addEventListener("dblclick",sall,false);
	R9=dce("textbox");
	R9.setAttribute("id","heavy");
	R9.setAttribute("size","3");
	R9.addEventListener("dblclick",sall,false);
	R10=dce("textbox");
	R10.setAttribute("id","ram");
	R10.setAttribute("size","3");
	R10.addEventListener("dblclick",sall,false);
	R11=dce("textbox");
	R11.setAttribute("id","catapult");
	R11.setAttribute("size","3");
	R11.addEventListener("dblclick",sall,false);
	R12=dce("menulist");
	R12.setAttribute("id","cat");
	R12.setAttribute("selectedIndex","0");
	R12.setAttribute("size","3");
	R13=dce("textbox");
	R13.setAttribute("id","snob");
	R13.setAttribute("size","1");
	R13.addEventListener("dblclick",sall,false);
	R14=dce("textbox");
	R14.setAttribute("id","knight");
	R14.setAttribute("size","1");
	R14.style.visibility=document.getElementById("showknight").value;
	R14.addEventListener("dblclick",sall,false);
	R15=dce("checkbox");
	R15.setAttribute("id","support");
	R15.setAttribute("checked","false");
	A=dce("menupopup");
	A1=dce("menuitem");
	A1.setAttribute("value","");
	A1.setAttribute("label","-----");
	A2=dce("menuitem");
	A2.value="main";
	A2.setAttribute("label",window.arguments[1].lang[0]);
	A3=dce("menuitem");
	A3.value="barracks";
	A3.setAttribute("label",window.arguments[1].lang[1]);
	A4=dce("menuitem");
	A4.value="stable";
	A4.setAttribute("label",window.arguments[1].lang[2]);
	A5=dce("menuitem");
	A5.value="garage";
	A5.setAttribute("label",window.arguments[1].lang[3]);
	A6=dce("menuitem");
	A6.value="place";
	A6.setAttribute("label",window.arguments[1].lang[4]);
	A7=dce("menuitem");
	A7.value="smith";
	A7.setAttribute("label",window.arguments[1].lang[5]);
	A8=dce("menuitem");
	A8.value="snob";
	A8.setAttribute("label",window.arguments[1].lang[6]);
	A9=dce("menuitem");
	A9.value="market";
	A9.setAttribute("label",window.arguments[1].lang[7]);
	A10=dce("menuitem");
	A10.value="farm";
	A10.setAttribute("label",window.arguments[1].lang[8]);
	A11=dce("menuitem");
	A11.value="storage";
	A11.setAttribute("label",window.arguments[1].lang[9]);
	A12=dce("menuitem");
	A12.value="wall";
	A12.setAttribute("label",window.arguments[1].lang[10]);
	A.appendChild(A1);
	A.appendChild(A2);
	A.appendChild(A3);
	A.appendChild(A4);
	A.appendChild(A5);
	A.appendChild(A6);
	A.appendChild(A7);
	A.appendChild(A8);
	A.appendChild(A9);
	A.appendChild(A10);
	A.appendChild(A11);
	A.appendChild(A12);
	R12.appendChild(A);
	R16=dce("button");
	R16.setAttribute("label","-");
	R16.setAttribute("oncommand","rem(this)");
	R.appendChild(R1);
	R.appendChild(RR1);
	R.appendChild(R2);
	R.appendChild(R3);
	R.appendChild(R4);
	R.appendChild(R5);
	R.appendChild(R6);
	R.appendChild(R7);
	R.appendChild(R8);
	R.appendChild(R9);
	R.appendChild(R10);
	R.appendChild(R11);
	R.appendChild(R12);
	R.appendChild(R13);
	R.appendChild(R14);
	R.appendChild(R15);
	R.appendChild(R16);
	rows.appendChild(R);
}

function onOK() {
	out={};
	out.arrival=gei("arrive").value;
	out.coords=gei("targetx").value+"|"+gei("targety").value;
	out.delay=gei("delay").value;
	out.type=gei("type").selectedItem.value;
	out.attacks=[];
	G=gei("params").childNodes;
	for(i=3; i<G.length; i++){
		H=G[i].childNodes;
		out.attacks.push({
			from:H[1].value,
			spear:H[2].value,
			sword:H[3].value,
			axe:H[4].value,
			archer:H[5].value,
			spy:H[6].value,
			light:H[7].value,
			marcher:H[8].value,
			heavy:H[9].value,
			ram:H[10].value,
			catapult:H[11].value,
			cat:H[12].childNodes[0].childNodes[H[12].selectedIndex].value,
			snob:H[13].value,
			knight:H[14].value,
			support:H[15].getAttribute("checked")
		});
	}
	window.arguments[1].out=out;
	return true;
}

function onCancel() {
	window.arguments[1].out=null;
	return true;
}

function gei(v){
	return document.getElementById(v);
}

function dce(v){
	return document.createElement(v);
}

function val(v){
	return (typeof v=="undefined")?"-":v;
}

function update(v){
	if(v!=""){
		spear=sword=axe=archer=spy=light=heavy=marcher=ram=catapult=snob="-";
		data=window.arguments[3].twb_.lib.data;
		if(data && data.units){
			dta=data.units[v];
			if(dta){
				spear=val(dta.spear);
				sword=val(dta.sword);
				axe=val(dta.axe);
				archer=(typeof dta.archer=="undefined")?"-":dta.archer;
				spy=val(dta.spy);
				light=val(dta.light);
				heavy=val(dta.heavy);
				marcher=(typeof dta.marcher=="undefined")?"-":dta.marcher;
				ram=val(dta.ram);
				catapult=val(dta.catapult);
				snob=val(dta.snob);
				knight=val(dta.knight);
			}
		}
		gei("spear_").value=spear;
		gei("sword_").value=sword;
		gei("axe_").value=axe;
		gei("archer_").value=archer;
		gei("spy_").value=spy;
		gei("light_").value=light;
		gei("heavy_").value=heavy;
		gei("marcher_").value=marcher;
		gei("ram_").value=ram;
		gei("catapult_").value=catapult;
		gei("snob_").value=snob;
		gei("knight_").value=knight;
	}
}

function lang(v){
	return window.arguments[3].twb_.lib.lang(v);
}

function sall(e){
	e=e.target;
	idx=e.getAttribute("id");
	val=e.value;
	// Xpath all
	var i, arr = [], xpr = document.evaluate("//*[@id='"+idx+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i=0; item=xpr.snapshotItem(i); i++){
		item.value=val;
	} 
}

function xSplit(v){
	v=v.match(/\d+\|\d+/);
	if(v){
		v=v[0].split("|");
		gei("targetx").value=v[0];
		gei("targety").value=v[1];
	}
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
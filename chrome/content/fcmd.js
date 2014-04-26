function onLoad() {
	X=window.arguments[0];
	document.title=X;
	inn=window.arguments[1].inn;
	// Add first row
	addx1();
	addx2();
	// Fil vils
	C=window.arguments[2];
	for(i=0; i<C.length; i++){
		V=dce("menuitem");
		V.setAttribute("id",C[i].getAttribute("id"));
		V.setAttribute("label",C[i].getAttribute("label"));
		V.setAttribute("tooltiptext",C[i].getAttribute("tooltiptext"));
		V.setAttribute("oncommand","window.insert.value=this.id;Me=this.getAttribute('label')+' '+this.getAttribute('tooltiptext');window.insert.setAttribute('tooltiptext',Me);update(window.insert.value);");
		gei("vils").appendChild(V);
	}
	// Add langs
	gei("randx").setAttribute("value",lang("fs1"));
	gei("ffat").setAttribute("value",lang("fs2"));
	gei("ffsp").setAttribute("value",lang("fs3"));
	gei("frp").setAttribute("value",lang("fs4"));
	gei("trp").setAttribute("value",lang("fs5"));
	// Lets show/hide
	if(!inn.show_archer){
		document.getElementById("img_archer").style.display="none";
		document.getElementById("img_marcher").style.display="none";
		document.getElementById("archer").style.display="none";
		document.getElementById("marcher").style.display="none";
		document.getElementById("archer_").style.display="none";
		document.getElementById("marcher_").style.display="none";
	}
}

function addx1(){
	test=false;
	rows=gei("params").childNodes;
	for(i=7; i<rows.length; i++){
		// Check for last one that doesnt contain a from box
		last=rows[i];
		if(typeof last.childNodes[2].childNodes[0]=="undefined"){
			test=true;
			break;
		}
	}
	if(test){
		// Append a box to it
		T=dce("textbox"); T.setAttribute("mouseover","update(this.value);"); T.addEventListener("mouseover",function(){update(this.value);},false); T.setAttribute("onclick","this.focus();window.insert=this;"); T.setAttribute("popup","vils"); T.setAttribute("size","6");
		last.childNodes[2].appendChild(T);
	}
	else{
		// Add a new row
		R=dce("row");
		L1=dce("label");
		L2=dce("label");
		L3=dce("hbox"); L3.setAttribute("id","from"); T=dce("textbox"); T.addEventListener("mouseover",function(){update(this.value);},false); T.setAttribute("onclick","window.insert=this;"); T.setAttribute("popup","vils"); T.setAttribute("size","6"); L3.appendChild(T);
		L4=dce("label");
		L5=dce("hbox"); L5.setAttribute("id","to");
		L6=dce("label");
		L7=dce("label");
		R.appendChild(L1);
		R.appendChild(L2);
		R.appendChild(L3);
		R.appendChild(L4);
		R.appendChild(L5);
		R.appendChild(L6);
		R.appendChild(L7);
		gei("params").appendChild(R);
	}
}

function addx2(_U_){
	test=false;
	rows=gei("params").childNodes;
	COUNT=rows.length-9;
	for(i=7; i<rows.length; i++){
		// Check for last one that doesnt contain a to box
		last=rows[i];
		if(typeof last.childNodes[4].childNodes[0]=="undefined"){
			test=true;
			break;
		}
	}
	if(test){
		// Append a box to it
		T=dce("textbox"); T.setAttribute("size","6");
		if(COUNT==0){
			// This is our first, lets add parsing functions
			T.addEventListener("keyup",parseX,false);
		}
		last.childNodes[4].appendChild(T);
	}
	else{
		// Add a new row
		R=dce("row");
		L1=dce("label");
		L2=dce("label");
		L3=dce("hbox"); L3.setAttribute("id","from");
		L4=dce("label");
		L5=dce("hbox"); L5.setAttribute("id","to"); T=dce("textbox"); T.setAttribute("size","6"); 
			if(typeof _U_!="undefined"){
				T.setAttribute("value",_U_);
			}
			L5.appendChild(T);
		L6=dce("label");
		L7=dce("label");
		R.appendChild(L1);
		R.appendChild(L2);
		R.appendChild(L3);
		R.appendChild(L4);
		R.appendChild(L5);
		R.appendChild(L6);
		R.appendChild(L7);
		gei("params").appendChild(R);
	}
}

function parseX(G){
	G=G.target;
	V=G.value.match(/\d+\|\d+/g);
	if(V && V.length>1){
		G.value=V[0];
		for(h=1; h<V.length; h++){
			addx2(V[h]);
		}
	}
}

function onOK() {
	out={};
	out.fat=gei("fattacks").value;
	out.fsup=gei("fsupports").value;
	out.rand=gei("rand").getAttribute("checked");
	out.from=[];
	out.to=[];
	out.units = {
		spear : gei("spear").value,
		sword :  gei("sword").value,
		axe :  gei("axe").value,
		archer : gei("archer").value,
		spy : gei("spy").value,
		light : gei("light").value,
		marcher : gei("marcher").value,
		heavy : gei("heavy").value,
		ram : gei("ram").value,
		catapult : gei("catapult").value
	};
	G=gei("params").childNodes;
	for(i=8; i<G.length; i++){
		from=G[i].childNodes[2].childNodes[0];
		to=G[i].childNodes[4].childNodes[0];
		if(typeof from!="undefined" && from.value!=""){
			out.from.push(from.value);
		}
		if(typeof to!="undefined" && to.value!=""){
			out.to.push(to.value);
		}
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
		spear=sword=axe=archer=spy=light=heavy=marcher=ram=catapult="-";
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
	}
}

function lang(v){
	return window.arguments[3].twb_.lib.lang(v);
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
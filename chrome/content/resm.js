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
	gei("from").setAttribute("value",lang("f2"));
	gei("to").setAttribute("value",lang("to"));

	addx();
}

function addx(){
	rows=gei("params");	
	R=dce("row");
	R.setAttribute("align","center");
	R1=dce("label");
	T1=dce("textbox");
	T1.setAttribute("id","from");
	T1.setAttribute("onclick","window.from=this;");
	T1.setAttribute("popup","vils");
	T1.setAttribute("readonly",true);
	T1.setAttribute("size","6");
	T1.setAttribute("value","");

	R2=dce("label");
	T2=dce("textbox");
	T2.setAttribute("id","to");
	T2.setAttribute("onclick","window.from=this;");
	T2.setAttribute("popup","vils");
	T2.setAttribute("readonly",true);
	T2.setAttribute("size","6");
	T2.setAttribute("value","");	
	
	R3=dce("label");
	T3=dce("textbox");
	T3.setAttribute("id","wood");
	T3.setAttribute("size","6");
	T3.setAttribute("value","");	
	
	R4=dce("label");
	T4=dce("textbox");
	T4.setAttribute("id","clay");
	T4.setAttribute("size","6");
	T4.setAttribute("value","");	

	R5=dce("label");
	T5=dce("textbox");
	T5.setAttribute("id","iron");
	T5.setAttribute("size","6");
	T5.setAttribute("value","");	
	
	R6=dce("label");
	T6=dce("button");
	T6.setAttribute("label","-");
	T6.setAttribute("width","10px");
	T6.setAttribute("oncommand","rem(this)");	
	
	R7=dce("label");
	
	R.appendChild(R1);
	R.appendChild(T1);
	R.appendChild(R2);
	R.appendChild(T2);
	R.appendChild(R3);
	R.appendChild(T3);
	R.appendChild(R4);
	R.appendChild(T4);
	R.appendChild(R5);
	R.appendChild(T5);
	R.appendChild(R6);
	R.appendChild(T6);
	R.appendChild(R7);

	rows.appendChild(R);
}

function rem(T){
	rows=gei("params");	
	if(rows.childNodes.length>4){
		rows.removeChild(T.parentNode);
	}
	else{
		alert("At least one row is required!");
	}
}

function onOK() {
	out=[];
	
	rows=gei("params").childNodes;
	for(i=3; i<rows.length; i++){
		from=rows[i].childNodes[1].value;
		to=rows[i].childNodes[3].value;
		wood=rows[i].childNodes[5].value;
		clay=rows[i].childNodes[7].value;
		iron=rows[i].childNodes[9].value;
		out.push({
			from : from,
			to : to,
			res : [wood,clay,iron]
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

function lang(v){
	return window.arguments[3].twb_.lib.lang(v);
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
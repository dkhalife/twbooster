function onLoad() {
	T=window.arguments[0];
	document.title=T;
	X=window.arguments[1].inn;
	Z=gei("params");
	selected=window.arguments[2];
	selected=(selected===null)?"":new String(selected);
	for(i=0; i<X.length; i++){
		row=dce("row");
		check=dce("checkbox");
		check.setAttribute("value",i);
		if(selected.match(i)){
			check.setAttribute("checked",true);
		}
		row.appendChild(check);
		label=dce("label");
		if(typeof X[i]!="string"){
			label.setAttribute("value",X[i][0]);
			check.setAttribute("disabled",true);
		}
		else{
			label.setAttribute("value",X[i]);
		}
		row.appendChild(label);
		Z.appendChild(row);
	}
}

function onOK() {
	str="";
	X=gei("params").childNodes;
	for(i=0; i<X.length; i++){
		box=X[i].childNodes[0].checked;
		str+=(box)?i:"";
	}
	window.arguments[1].out=str;
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

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
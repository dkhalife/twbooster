function onLoad() {
	X=window.arguments[0];
	document.title=X;
	inn=window.arguments[1].inn;
	for(i=0; i<inn.length; i++){
		grp=inn[i];
		R=dce("row");
		R1=dce("label");
		R1.setAttribute("value","");
		R2=dce("label");
		R2.setAttribute("value",grp);
		R3=dce("checkbox");
		R3.setAttribute("value",grp);
		R4=dce("label");
		R4.setAttribute("value","");
		R.appendChild(R1);
		R.appendChild(R2);
		R.appendChild(R3);
		R.appendChild(R4);
		gei("params").appendChild(R);
	}
}

function onOK() {
	out=[];
	X=gei("params").childNodes;
	for(i=0; i<X.length; i++){
		if(X[i].childNodes[2].checked){
			out.push(X[i].childNodes[2].getAttribute("value"));
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

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
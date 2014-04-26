function onOK(){
	X=gei("loop").getAttribute("checked")=="true"?" L":"";
	result=gei("date").value.replace("-"," ")+" "+gei("time").value+X;
	window.arguments[1].out=result;
}
function onCancel(){
	window.arguments[1].out=null;
}
function onLoad(){
	gei("l").value=window.arguments[2];
	document.title=window.arguments[0];
	D=window.arguments[1].inn.split(" ");
	T=window.arguments[1].inn.split(" ")[3];
	D[0]=(D[0].length<2)?"0"+D[0]:D[0];
	D[1]=(D[1].length<2)?"0"+D[1]:D[1];
	gei("date").value=D[2]+"-"+D[1]+"-"+D[0];
	gei("time").value=T;
}
function gei(v){
	return document.getElementById(v);
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
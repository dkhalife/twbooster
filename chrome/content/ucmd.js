function onLoad() {
	X=window.arguments[0];
	document.title=X;
	inn=window.arguments[1].inn;
	if(typeof inn=="object"){
		for(el in inn){
			V=gei(el);
			if(V){
				V.value=inn[el];
			}
		}
	}
	else{
		unit=inn.match(/\d+[a-z]/g);
		for(i=0; i<unit.length; i++){
			unitt=unit[i].replace(/\d+/,'');
			count=unit[i].match(/\d+/)[0];
			switch(unitt){
				case 'p' : un='spear'; break;
				case 'w' : un='sword'; break;
				case 'x' : un='axe'; break;
				case 'e' : un='archer'; break;
				case 's' : un='spy'; break;
				case 'l' : un='light'; break;
				case 'm' : un='marcher'; break;
				case 'h' : un='heavy'; break;
				case 'r' : un='ram'; break;
				case 'c' : un='catapult'; break;
				case 'k' : un='knight'; break;
				default : un=''; break;
			}
			V=gei(un);
			if(V){
				V.value=count;
			}
		}
	}
	// Lets show/hide
	if(!inn.show_archer){
		document.getElementById("img_archer").style.display="none";
		document.getElementById("img_marcher").style.display="none";
		document.getElementById("archer").style.display="none";
		document.getElementById("marcher").style.display="none";
	}
	if(!inn.show_knight){
		document.getElementById("img_knight").style.display="none";
		document.getElementById("knight").style.display="none";
	}
	if(inn.rand){
		gei("rand").checked=true;
	}
	G=gei("cat").childNodes[0].childNodes;
	for(i=1; i<G.length; i++){
		G[i].setAttribute("label",window.arguments[1].lang[i-1]);
	}
	gei("rand").setAttribute("label",window.arguments[1].lang[11]);
	gei("allu").setAttribute("label",window.arguments[1].lang[12]);
}

function onOK() {
	U=gei("params").childNodes[1].childNodes;
	out={};
	for(j=0; j<U.length; j++){
		out[U[j].getAttribute("id")]=U[j].value;
	}
	out.rand=gei("rand").checked;
	out.all=gei("allu").checked;
	out.cat=gei("cat").childNodes[0].childNodes[gei("cat").selectedIndex].value;
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

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
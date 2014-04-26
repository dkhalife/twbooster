function onLoad() {
	X=window.arguments[0];
	document.title=X;
	update();
}

function onOK() {
	return true;
}

function onCancel() {
	return true;
}

function gei(v){
	return document.getElementById(v);
}

function dce(v){
	return document.createElement(v);
}

function clear(){
	A=gei("params").childNodes;
	while(typeof A[2]!="undefined"){
		gei("params").removeChild(A[2]);
	}
}

function update(){
	// Clear old list
	clear();
	// Get a list of active processes and display
	inn=window.arguments[2].twb_.lib;
	// Trim unwanted elemenst
	inn.unsetA();
	// Processes
	P=inn.Engines.State.processes;
	for(process in P){
		nam=process;
		R=dce("row");
		R1=dce("label");
		R1.setAttribute("value","");
		R2=dce("label");
		R2.setAttribute("value",nam);
		R3=dce("label");
		R3.setAttribute("value","function");
		R4=dce("label");
		R4.setAttribute("value",P[process].function.replace(/\(|\)/g,''));
		R5=dce("label");
		R5.setAttribute("value",!P[process].kill);
		R6=dce("button");
		R6.setAttribute("label","X");
		R6.setAttribute("oncommand","window.arguments[2].twb_.lib.Engines.State.kill_p('"+nam+"',1)");
		R7=dce("label");
		R7.setAttribute("value","");
		R.appendChild(R1);
		R.appendChild(R2);
		R.appendChild(R3);
		R.appendChild(R4);
		R.appendChild(R5);
		R.appendChild(R6);
		R.appendChild(R7);
		gei("params").appendChild(R);
	}
	// Timeouts and Intervals
	for(i=0; i<inn.controls.length; i++){
		switch(i){
			case 0 : T="timeout"; act="window.arguments[2].twb_.lib.unsetT('{nam}',1)"; break;
			case 1 : T="interval"; act="window.arguments[2].twb_.lib.unsetI('{nam}',1)"; break;
		}
		for(j=0; j<inn.controls[i].length; j++){
			nam=inn.controls[i][j];
			R=dce("row");
			R1=dce("label");
			R1.setAttribute("value","");
			R2=dce("label");
			R2.setAttribute("value",nam);
			R3=dce("label");
			R3.setAttribute("value",T);
			R4=dce("label");
			R4.setAttribute("value",'');
			R5=dce("label");
			R5.setAttribute("value",'');
			R6=dce("button");
			R6.setAttribute("label","X");
			R6.setAttribute("oncommand",act.replace(/\{nam\}/g,nam));
			R7=dce("label");
			R7.setAttribute("value","");
			R.appendChild(R1);
			R.appendChild(R2);
			R.appendChild(R3);
			R.appendChild(R4);
			R.appendChild(R5);
			R.appendChild(R6);
			R.appendChild(R7);
			gei("params").appendChild(R);
		}
	}
}

window.setInterval(update,1500);

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
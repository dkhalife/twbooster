function onLoad(A){
	params=A[0];

	if(typeof params.title=="undefined"){
		params.title="";
	}
	else{
		params.title=" - "+params.title;
	}
	window.title="TWBooster"+params.title;
	if(params.width){
		resizeTo(params.width,params.height)
	}

	if(params.type=="meter"){
		moveTo(0,0);
		gei("meter").setAttribute("hidden",false);
		
		meter = {
			label : gei("TWB-MLabel"),
			meter1 : gei("TWB-Meters1"),
			meter2 : gei("TWB-Meters2"),
			label1: gei("TWB-MLabel1"),
			label2: gei("TWB-MLabel2"),
		}
		
		meter.label.setAttribute("label",params.obj.caption);
		meter.label1.setAttribute("value",params.obj.label1 + " (" + params.obj.value1 + "%)");
		
		if(params.obj.value1>=0){
			meter.label1.setAttribute("value",params.obj.label1 + " (" + params.obj.value1 + "%)");
		}
		else{
			meter.label1.setAttribute("value",params.obj.label1);
		}
		
		if(params.obj.value2>=0){
			meter.label2.setAttribute("value",params.obj.label2 + " (" + params.obj.value2 + "%)");
		}
		else{
			meter.label2.setAttribute("value",params.obj.label2);
		}
		meter.meter1.setAttribute("value",params.obj.value1);
		meter.meter2.setAttribute("value",params.obj.value2);
		
		// Add animation to switch ends
		if(typeof params.cancelFunc=="undefined"){
			window.onmouseover=switchEnds;
		}
	}
	
	if(params.type=="notification"){
		gei("notify").setAttribute("hidden",false);

		gei("TWB-NLabel").setAttribute("label",params.label);
		gei("TWB_Msg").innerHTML=params.msg;
		
		// Buttons
		if(typeof params.btns!="undefined"){
			// First unhide the div
			gei("btnsdiv").style.display="";
			for(i=0; i<params.btns.length; i++){
				gei("button"+(i+1)).style.display="";
				gei("button"+(i+1)).addEventListener("click",params.btns[i].func,false);
				for(prop in params.btns[i]){
					if(prop!="func"){
						gei("button"+(i+1)).setAttribute(prop,params.btns[i][prop]);
					}
				}
			}
		}
		
		sizeToContent();
	}
	
	if(typeof params.timeout!="undefined"){
		setTimeout("window.close();", params.timeout);
	}
	
	if(typeof params.cancelFunc!="undefined"){
		gei("Cbtndiv").style.display="";
		gei("CBUTTON").addEventListener("click",params.cancelFunc,false);
	}
}

function gei(v){
	return document.getElementById(v);
}

function STC(){
	sizeToContent();
	//focus();
}

function switchEnds(){
	N=gei("TWB_Dialog");
	eman=N.getAttribute("name");
	if(typeof eman=="undefined"  || eman=="" || eman===null){
		eman="topleft";
	}

	speed=500;

	switch(eman){
		case "topleft" :
			N.setAttribute("name","topright");
			
			// Move to right
			moveTo(screen.availWidth-window.innerWidth,0);
		break;
		
		case "topright" :
			N.setAttribute("name","bottomright");
			
			// Move down
			moveTo(screenX,screen.availHeight-window.innerHeight);
		break;
		
		case "bottomright" :
			N.setAttribute("name","bottomleft");
			
			// Move left
			moveTo(0,screenY);
		break;
		
		case "bottomleft" :
			N.setAttribute("name","topleft");
			
			// Move up
			moveTo(screenX,0);
		break;
	}
}
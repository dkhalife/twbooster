function startEdit(){
	T=document.getElementsByTagName("td");
	for(i=0; i<T.length; i++){
		if(T[i].className=="editable"){
			T[i].addEventListener("click",edit,false);
			T[i].className="edit";
		}
	}
}

function edit(v){
	v=v.target;
	if(v.className=="edit"){	
		ra=Math.round(Math.random()*5000);
		v.innerHTML="<input id='"+ra+"' type=text size=4 maxlength=4 value='"+v.innerHTML+"' onblur='finish(this);'>";
		document.getElementById(ra).focus();
	}
}

function finish(v){
	// Grab I
	I=v.parentNode.parentNode.getAttribute("name").split("row_")[1];
	// Grab whats been done
	edit=v.parentNode.getAttribute("name");
	// Update attack
	window.openerx.twb_.lib.twb_.nobles[I][edit]=v.value;
	// Show
	v.parentNode.innerHTML=v.value;
}
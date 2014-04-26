elements=["new_unit"];
profiles=[]

function update(){
	testA=[];
	for(n=0; (test=true && n<profiles.length); n++){
		profile={};
	
		test=true;
		name=profiles[n].name;
		profile.name=name;
		for(i=0; i<elements.length; i++){
			E=gen(elements[i].replace("new_","")+"_"+name);
			if(E.value.length==0){
				test=false;
				break;
			}
			else{
				profile["new_"+E.name.replace("_"+name,"")]=E.value;
			}
		}
		if(test){
			profiles[n]=profile;
			testA.push(profile);
		}
		else{
			testA=false;
			alert("Some fields are missing values.");
			break;
		}
	}
	return testA;
}

function add(){
	profile={};
	test=true;
	NI=gen("new_name").value.replace(/\d+/g,"").toUpperCase();
	if(NI.length>0){
		profile.name=NI;
	}
	else{
		test=false;
	}
	if(test){
		for(i=0; i<elements.length; i++){
			E=gen(elements[i]);
			if(E.value.length==0){
				test=false;
				break;
			}
			else{
				profile[E.name]=E.value;
			}
		}
	}
	if(test){
		profiles.push(profile);
		success(profile);
		cleanup();
	}
	else{
		alert("Some fields are missing values.");
	}
}

function gei(v){
	return document.getElementById(v);
}

function gen(v,u){
	V=document.getElementsByName(v);
	return (typeof u=="undefined")?V[0]:V;
}

function success(obj){
	Z=window.openerx.twb_.lib.TWB_Add_FProfile(obj);
	if(Z){
		make_row(obj);
		save_all();
	}
	else{
		alert("Profile name exists already.");
	}
}

function save_all(u){
	PAR=update();
	if(PAR!==false){
		window.openerx.twb_.lib.TWB_Save_FProfiles(PAR,window,u);
	}
}

function dce(n){
	return document.createElement(n);
}

function setAtr(node,attr){
	for(att in attr){
		node.setAttribute(att,attr[att]);
	}
}

function make_row(obj){
	world=window.openerx.twb_.lib.TWB_World();

	row1=dce("tr");
	row1.className="odd";
	setAtr(row1,{name:"row_"+obj.name});
		row1_td1=dce("td");
		setAtr(row1_td1,{width:"30%",rowspan:3});
		row1_td1.innerHTML="<b><p align=center>"+obj.name+"</p></b>";
		row1.appendChild(row1_td1);

	row2=dce("tr");
	row2.className="odd";
	setAtr(row2,{name:"row_"+obj.name});
		row2_td1=dce("td");
		setAtr(row2_td1,{width:"70%"});
		row2_td1.innerHTML='<b><p align="center">'+lang("TWB-Unit")+'</b>';
		row2.appendChild(row2_td1);

	row3=dce("tr");
	row3.className="odd";
	setAtr(row3,{name:"row_"+obj.name});
		row3_td1=dce("td");
		setAtr(row3_td1,{width:"70%"});
		row3_td1.innerHTML='<b><p align="center"><input type="text" onclick="this.value=window.openerx.twb_.lib.TWB_UCMD()" name="unit_'+obj.name+'" size="20" value="'+obj.new_unit+'" class="z2"></b>';
		row3.appendChild(row3_td1);

	row4=dce("tr");
	row4.className="odd";
	setAtr(row4,{name:"row_"+obj.name});
		row4_td1=dce("td");
		setAtr(row4_td1,{width:"100%",colspan:2});
		row4_td1.innerHTML='<p align="center"><u><b><a href="javascript:void(0)" onclick=delet("'+obj.name+'")>Delete</a></b></u>';
		row4.appendChild(row4_td1);

	AR=[row1,row2,row3,row4];
	app_rows(AR);
}

function app_rows(AR){
	for(i=0; i<AR.length; i++){
		gei("new").parentNode.insertBefore(AR[i],gei("new"));
	}
}

function delet(nma){
	rows=gen("row_"+nma,1);
	for(i=0; i<rows.length; i++){
		rows[i].style.display="none";
	}
	for(i=0; i<profiles.length; i++){
		if(profiles[i].name==nma){
			profiles.splice(i,1);
			break;
		}
	}
	save_all();
	window.openerx.twb_.lib.TWB_Delete_FProfile(nma);
}

function cleanup(){
	gen("new_name").value="";
	for(i=0; i<elements.length; i++){
		gen(elements[i]).value="";
	}
}

function lang(v){
	return window.openerx.twb_.lib.lang(v);
}

function onLoad() {
	X=window.arguments[0];
	document.title=X;
	lang=window.arguments[1].lang;
	inn=window.arguments[1].inn;
	gei("villages").setAttribute("value",lang[0]);
	// Build village list
	C=$gei("TWB-Villages").childNodes;
	for(i=0; i<C.length; i++){
		var X=dce("menuitem");
		X.setAttribute("id",C[i].getAttribute("id"));
		X.setAttribute("label",C[i].getAttribute("label"));
		X.setAttribute("tooltiptext",C[i].getAttribute("tooltiptext"));
		X.setAttribute("oncommand","changevil('"+C[i].getAttribute("id")+"')");
		gei("vil_").appendChild(X);
	}
	gei("units").setAttribute("value",lang[1]);
	gei("vil").setAttribute("label",inn.cname);
	gei("max").setAttribute("value",lang[2]);
	gei("train").setAttribute("value",lang[3]);
	gei("train_").setAttribute("label",lang[3]);
	gei("load").setAttribute("value",lang[4]);
	gei("now").setAttribute("value",lang[5]);
	// Max
	gei("spear_").setAttribute("value",inn.max[0].split(",")[0]);
	gei("_spear").setAttribute("value",inn.max[0].split(",")[1]);
	gei("sword_").setAttribute("value",inn.max[1].split(",")[0]);
	gei("_sword").setAttribute("value",inn.max[1].split(",")[1]);
	gei("axe_").setAttribute("value",inn.max[2].split(",")[0]);
	gei("_axe").setAttribute("value",inn.max[2].split(",")[1]);
	gei("archer_").setAttribute("value",inn.max[3].split(",")[0]);
	gei("_archer").setAttribute("value",inn.max[3].split(",")[1]);
	gei("spy_").setAttribute("value",inn.max[4].split(",")[0]);
	gei("_spy").setAttribute("value",inn.max[4].split(",")[1]);
	gei("light_").setAttribute("value",inn.max[5].split(",")[0]);
	gei("_light").setAttribute("value",inn.max[5].split(",")[1]);
	gei("marcher_").setAttribute("value",inn.max[6].split(",")[0]);
	gei("_marcher").setAttribute("value",inn.max[6].split(",")[1]);
	gei("heavy_").setAttribute("value",inn.max[7].split(",")[0]);
	gei("_heavy").setAttribute("value",inn.max[7].split(",")[1]);
	gei("ram_").setAttribute("value",inn.max[8].split(",")[0]);
	gei("_ram").setAttribute("value",inn.max[8].split(",")[1]);
	gei("catapult_").setAttribute("value",inn.max[9].split(",")[0]);
	gei("_catapult").setAttribute("value",inn.max[9].split(",")[1]);
	gei("back").addEventListener("click",traback,false);
	gei("next").addEventListener("click",tranext,false);
}

function onOK() {
	window.arguments[1].out=null;
	return true;
}

function onCancel() {
	window.arguments[1].out=null;
	return true;
}

function gei(v){
	return document.getElementById(v);
}

function $gei(v){
	return window.arguments[1].opener.twb_.lib.gei(v);
}

function TWB_World(){
	return window.arguments[1].opener.twb_.lib.TWB_World();
}

function dce(v){
	return document.createElement(v);
}

function qtrain(){
	try{
		$=window.arguments[1].opener.twb_.lib.$;
		local=window.arguments[1].opener.twb_.lib.local;
		v1=gei("spear").value;
		v2=gei("sword").value;
		v3=gei("axe").value;
		v4=gei("archer").value;
		v5=gei("spy").value;
		v6=gei("light").value;
		v7=gei("marcher").value;
		v8=gei("heavy").value;
		v9=gei("ram").value;
		v10=gei("catapult").value;
		test1=test2=test3=true;
		gei("upda").hidden=false;
		vid=local.curVillage;
		cname=$gei(vid).getAttribute("label");
		linkin4="http://"+TWB_World()+"game.php?village="+vid+"&screen=barracks"+local.sitterT;
		tmp4=$.ajax({url:linkin4,async: false}).responseText;
		try{
			h_bar=tmp4.match(/form\saction="\/game.php\?village=\d+&amp;screen=\w+&amp;action=\w+&amp;h=\w+/)[0].replace(/form\saction="\/game.php\?village=\d+&amp;screen=\w+&amp;action=\w+&amp;h=/,"");
		}catch(e){
			h_bar="";
			test1=false;
		}
		linkin5="http://"+TWB_World()+"game.php?village="+vid+"&screen=stable"+local.sitterT;
		tmp5=$.ajax({url:linkin5,async: false}).responseText;
		try{
			h_sta=tmp5.match(/form\saction="\/game.php\?village=\d+&amp;screen=\w+&amp;action=\w+&amp;h=\w+/)[0].replace(/form\saction="\/game.php\?village=\d+&amp;screen=\w+&amp;action=\w+&amp;h=/,"");
		}catch(e){
			h_sta="";
			test2=false;
		}
		linkin6="http://"+TWB_World()+"game.php?village="+vid+"&screen=garage"+local.sitterT;
		tmp6=$.ajax({url:linkin6,async: false}).responseText;
		try{
			h_wor=tmp6.match(/form\saction="\/game.php\?village=\d+&amp;screen=\w+&amp;action=\w+&amp;h=\w+/)[0].replace(/form\saction="\/game.php\?village=\d+&amp;screen=\w+&amp;action=\w+&amp;h=/,"");
		}catch(e){
			h_wor="";
			test3=false;
		}
		submit1="http://"+TWB_World()+"game.php?village="+vid+"&screen=barracks&action=train&h="+h_bar+local.sitterT;
		if((v1>0 || v2>0 || v3>0 || v4>0) && test1){
			v1=(v1===0)?"":v1;
			v2=(v2===0)?"":v2;
			v3=(v3===0)?"":v3;
			v4=(v4===0)?"":v4;
			params="spear="+v1+"&sword="+v2+"&axe="+v3+"&archer="+v4;
			xhr19=new XMLHttpRequest();
			xhr19.open("POST", submit1, false);
			xhr19.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr19.setRequestHeader("Content-length", params.length);
			xhr19.send(params);
		}
		submit2="http://"+TWB_World()+"game.php?village="+vid+"&screen=stable&action=train&h="+h_sta+local.sitterT;
		if((v5>0 || v6>0 || v7>0 || v8>0) && test2){
			v5=(v5===0)?"":v5;
			v6=(v6===0)?"":v6;
			v7=(v7===0)?"":v7;
			v8=(v8===0)?"":v8;
			params="spy="+v5+"&light="+v6+"&marcher="+v7+"&heavy="+v8;
			xhr20=new XMLHttpRequest();
			xhr20.open("POST", submit2, false);
			xhr20.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr20.setRequestHeader("Content-length", params.length);
			xhr20.send(params);
		}
		submit3="http://"+TWB_World()+"game.php?village="+vid+"&screen=garage&action=train&h="+h_wor+local.sitterT;
		if((v9>0 || v10>0) && test3){
			v9=(v9===0)?"":v9;
			v10=(v10===0)?"":v10;
			params="ram="+v9+"&catapult="+v10;
			xhr21=new XMLHttpRequest();
			xhr21.open("POST", submit3, false);
			xhr21.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr21.setRequestHeader("Content-length", params.length);
			xhr21.send(params);
		}
		LOOK();
		gei("upda").hidden=true;
		gei("spear").value="";
		gei("sword").value="";
		gei("axe").value="";
		gei("archer").value="";
		gei("spy").value="";
		gei("light").value="";
		gei("marcher").value="";
		gei("heavy").value="";
		gei("ram").value="";
		gei("catapult").value="";
	}catch(e){
		window.arguments[1].opener.twb_.lib.log("QT",e);
	}
}

function LOOK(){
	vals=window.arguments[1].opener.twb_.lib.TWB_LInt().split("|");
	gei("spear_").setAttribute("value",vals[0].split(",")[0]);
	gei("_spear").setAttribute("value",vals[0].split(",")[1]);
	gei("sword_").setAttribute("value",vals[1].split(",")[0]);
	gei("_sword").setAttribute("value",vals[1].split(",")[1]);
	gei("axe_").setAttribute("value",vals[2].split(",")[0]);
	gei("_axe").setAttribute("value",vals[2].split(",")[1]);
	gei("archer_").setAttribute("value",vals[3].split(",")[0]);
	gei("_archer").setAttribute("value",vals[3].split(",")[1]);
	gei("spy_").setAttribute("value",vals[4].split(",")[0]);
	gei("_spy").setAttribute("value",vals[4].split(",")[1]);
	gei("light_").setAttribute("value",vals[5].split(",")[0]);
	gei("_light").setAttribute("value",vals[5].split(",")[1]);
	gei("marcher_").setAttribute("value",vals[6].split(",")[0]);
	gei("_marcher").setAttribute("value",vals[6].split(",")[1]);
	gei("heavy_").setAttribute("value",vals[7].split(",")[0]);
	gei("_heavy").setAttribute("value",vals[7].split(",")[1]);
	gei("ram_").setAttribute("value",vals[8].split(",")[0]);
	gei("_ram").setAttribute("value",vals[8].split(",")[1]);
	gei("catapult_").setAttribute("value",vals[9].split(",")[0]);
	gei("_catapult").setAttribute("value",vals[9].split(",")[1]);
	local=window.arguments[1].opener.twb_.lib.local;
	vid=local.curVillage;
	cname=$gei(vid).getAttribute("label");
	gei("vil").setAttribute("label",cname);
	gei("upda").hidden=true;
}

function traback(){
	gei("upda").hidden=false;
	window.arguments[1].opener.twb_.lib.twb_.QT=window;
	window.arguments[1].opener.twb_.lib.Engines.State.add_p("trabn","TWB_TraBN()","*",true);
	window.arguments[1].opener.twb_.lib.TWB_Back();
}

function tranext(){
	gei("upda").hidden=false;
	window.arguments[1].opener.twb_.lib.twb_.QT=window;
	window.arguments[1].opener.twb_.lib.Engines.State.add_p("trabn","TWB_TraBN()","*",true);
	window.arguments[1].opener.twb_.lib.TWB_Next();
}

function changevil(v){
	gei("upda").hidden=false;
	window.arguments[1].opener.twb_.lib.twb_.QT=window;
	window.arguments[1].opener.twb_.lib.Engines.State.add_p("tralo","TWB_TraBN()","*",true);
	window.arguments[1].opener.twb_.lib.TWB_LoadVil(v);
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
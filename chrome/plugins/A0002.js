// @Plugin = TWB Servers
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	TWB_Speed : function(){
		with(twb_.lib){
			return [TWB_WorldSet("speed"),TWB_WorldSet("unit_speed")];
		}
	},
	TWB_World : function(w){
		with(twb_.lib){
			try{
				x=local.TWB_Lang;
				RT=new RegExp(x+"\\w+");
				world=TWB_URL().replace("http","").match(RT);
				if(world){
					world=world[0];
					ext="."+TWB_CWORLD()+"/";
					if(typeof w=="undefined"){
						world+=ext;
					}
				}
				else{
					world="";
				}
				return world;
			}catch(e){log("Main",e);}
		}
	},
	TWB_CZW : function(ZXC){
		with(twb_.lib){
			xio=(typeof ZXC=="undefined")?local.TWB_Lang:ZXC;
			switch(xio.toLowerCase()){
				case "us" : return "en";
				case "se" : return "sv";
				case "nb" : return "no";
				default: return xio.toLowerCase();
			}
		}
	},
	TWB_CWORLD : function(ZXC){
		with(twb_.lib){
			xio=(typeof ZXC=="undefined")?local.TWB_Lang:ZXC;
			switch(xio.toLowerCase()){
				case "en" : rxext="tribalwars.net"; break;
				case "ro" : rxext="triburile.ro"; break;
				case "pl" : rxext="plemiona.pl"; break;
				case "sv" : rxext="tribalwars.se"; break;
				case "gr" : rxext="fyletikesmaxes.gr"; break;
				case "nl" : rxext="tribalwars.nl"; break;
				case "tr" : rxext="klanlar.org"; break;
				case "no" : rxext="tribalwars.no.com"; break;
				case "de" : rxext="die-staemme.de"; break;
				case "br" : rxext="tribalwars.com.br"; break;
				case "dk" : rxext="tribalwars.dk"; break;
				case "es" : rxext="guerrastribales.es"; break;
				case "hr" : rxext="plemena.com.hr"; break;
				case "fr" : rxext="guerretribale.fr"; break;
				case "hu" : rxext="klanhaboru.hu"; break;
				case "pt" : rxext="tribalwars.com.pt"; break;
				case "ba" : rxext="plemena.net"; break;
				case "cs" : rxext="divokekmeny.cz"; break;
				case "it" : rxext="tribals.it"; break;
				case "fi" : rxext="tribalwars.fi"; break;
				case "ae" : rxext="tribalwars.ae"; break;
				case "uk" : rxext="tribalwars.co.uk"; break;
				case "sk" : rxext="divoke-kmene.sk"; break;
				case "si" : rxext="vojnaplemen.si"; break;
				case "lt" : rxext="genciukarai.lt"; break;
				case "id" : rxext="perangkaum.net"; break;
				case "il" : rxext="tribal-wars.co.il"; break;
				case "ru" : rxext="voyna-plemyon.ru"; break;
				default: rxext=null; break;
			}
			return rxext;
		}
	},
	TWB_ZWORLD : function(ZXC){
		with(twb_.lib){
			xio=(typeof ZXC=="undefined")?local.TWB_Lang:ZXC;
			switch(xio){
				case "en" : rxext="English"; break;
				case "ro" : rxext="Romanian"; break;
				case "pl" : rxext="Polish"; break;
				case "sv" : rxext="Sweedish"; break;
				case "gr" : rxext="Greek"; break;
				case "nl" : rxext="Dutch"; break;
				case "tr" : rxext="Turkish"; break;
				case "no" : rxext="Norwigen"; break;
				case "de" : rxext="German"; break;
				case "br" : rxext="Brazilian"; break;
				case "dk" : rxext="Danish"; break;
				case "es" : rxext="Spanish"; break;
				case "hr" : rxext="Croatian"; break;
				case "fr" : rxext="French"; break;
				case "hu" : rxext="Hungarian"; break;
				case "pt" : rxext="Portugeese"; break;
				case "ba" : rxext="Croatian (BA)"; break;
				case "cs" : rxext="Czech"; break;
				case "it" : rxext="Italian"; break;
				case "fi" : rxext="Finish"; break;
				case "ae" : rxext="Arabic"; break;
				case "uk" : rxext="English UK"; break;
				case "sk" : rxext="Slovak"; break;
				case "si" : rxext="Slovanian"; break;
				case "lt" : rxext="Lithuanian"; break;
				case "id" : rxext="Indonesian"; break;
				case "il" : rxext="Israel"; break;
				case "ru" : rxext="Ukraine"; break;
				default: rxext="English"; break;
			}
			return rxext;
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof twb_.LVals=="undefined"){
				// Start Patch For Languages
				twb_.LVals=[];
				fx = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				locz=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"locale";
				fx.initWithPath(locz);
				fsz=fx.directoryEntries;
				while(fsz.hasMoreElements()){
					cutZ=fsz.getNext().QueryInterface(Ci.nsILocalFile);
					if(cutZ.isDirectory()){
						twb_.LVals.push([TWB_CZW(cutZ.path.match(/\w+\-(\w+)/)[1]),TWB_ZWORLD(TWB_CZW(cutZ.path.match(/\w+\-(\w+)/)[1]))]);
					}
				}
				// End Patch
				TWB_New_Set("main",[lang("xon2"),{id:"langx",type:"menupop",selected:"langx",values:twb_.LVals}]);
				//TWB_New_Set("main",[lang("xon2xxx"),{id:"langxx",type:"menupop",selected:"langxx",values:twb_.LVals}]);
			}
		}
	}
});
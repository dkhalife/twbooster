// @Plugin = Overviews Sorter
// @Version = 1.0
// @Icons = 0
merge(twb_.lib,{
	TWB_OSort : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="overview_villages"){
					switch(TWB_Mode()){
						case null:
						case "prod":
							TABLE=$gei("production_table");
							HEADERS=TABLE.childNodes[1].childNodes[0].childNodes;
							SORTING=["default","numeric","default","numeric","numeric",""];
						break;
					}
					
					if(typeof  HEADERS=="undefined"){
						// Quit
						return;
					}
					
					// Assign Sorting Patterns
					for(h=0; h<HEADERS.length; h++){
						HEADERS[h].className="table-sortable table-sortable:"+SORTING[h];
					}
					
					// Alter table
					TABLE.className+=" sort table-autosort:0";
					TTH=dce("thead",win());
					TTH.appendChild(TABLE.childNodes[1].childNodes[0]);
					TABLE.insertBefore(TTH,TABLE.childNodes[1]);
					
					// Patch the classer
					loc=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"extensions"+SL+"twdialer@fbgames.web44.net"+SL+"chrome"+SL+"content"+SL;
					scsrc=TWB_R("sorter.css",loc);
					sc=dce("style",win());
					txt=win().document.createTextNode(scsrc);
					sc.appendChild(txt);
					$xp("//head",9,win().document).appendChild(sc);
					
					scsrc=TWB_R("sorter.js",loc);
					sc=dce("script",win());
					txt=win().document.createTextNode(scsrc);
					sc.appendChild(txt);
					$xp("//head",9,win().document).appendChild(sc);
				}
			}catch(e){log('Overviews Sorter',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.osort=="undefined"){
				Engines.State.add_p("osort","TWB_OSort()","*",false);
			}
		}
	}
});
// @Plugin = Default Configuration
// @Version = 1.9
// @Icons = 0
merge(twb_.lib,{
	WORLD_SET : {},
	local : {
		"INDEX" : 0,
		"status" : 1,
		"DEV" : true,
		"logl" : "3",
		"lastATN" : 0,
		"RESTORE" : [],
		"sitterT" : "",
		"CTask" : true,
		"scripts" : {},
		"RESTORE" : [],
		"pause" : false,
		"sessionID" : 0,
		"settings" : {},
		"TWB_I" : "null",
		"TWB_J" : "null",
		"skined" : false,
		"stopINT" : false,
		"TWB_Lang" : "en",
		"TWB_Langx" : "en",
		"TWB_qkeys" : "off",
		"TWB_vkeys" : "off",
		"TWB_HB_Z" : "null",
		"backup_URL" : true,
		"TWB_SET_L" : "null",
		"last_Lookup" : null,
		"curVillage" : "null",
		"TWB_H_COIN" : "null",
		"pageloading" : "false",
		"allow_commands" : false,
		"TWB_H_ST_COIN" : "null"
	},
	tooltips : ["TWB-Light","TWB-MainMenu","TWB-Stats","TWB-Back","TWB-Sort","TWB-Next","TWB-Sort","TWB-Overviews","TWB-Map","TWB-MMap","TWB-Overview","TWB-Main","TWB-Barracks","TWB-Stable","TWB-Workshop","TWB-Smithy","TWB-Snob","TWB-Place","TWB-Statue","TWB-Market","TWB-Alog","TWB-Shop","TWB-GR1","TWB-GR2","TWB-GR3","TWB-GR4","TWB-GR5","TWB-Settings","TWB-Notepad","TWB-QT","TWB-CMD-Q","TWB-Script","TWB-Farm","TWB-UALL","TWB-UALL6","TWB-Close","TWB-GR2"],
	labels : ["TWB-Sort01","TWB-Sort02","TWB-Sort03","TWB-SETX","TWB-Sort1","TWB-Sort2","TWB-Sort3","TWB-Sort4","TWB-Sort5","TWB-Sort6","TWB-Sort9","TWB-Sort10","TWB-Sort11","TWB-MS1","TWB-MS2","TWB-MS3","TWB-BotM","TWB-BotC","TWB-BotOn","TWB-Load","TWB-Save","TWB-ATT","TWB-ATT2","TWB-OR","TWB-RCache","TWB-RR3","TWB-Simulate","TWB-Fake","TWB-Tag","TWB-Noble","TWB-REP","TWB-SMA","TWB-SMS","TWB_F_Add","TWB_F_Sho","TWB_F_Sta","TWB-MBot","TWB-ABot","TWB_F_AddM","TWB_F_AddC","TWB_F_GSt","TWB_F_Imp","TWB_F_Exp","TWB_F_Pro","TWB_F_FFR","TWB-SUS","TWB-BSB","TWB-BMRES","TWB-Rconvert","TWB-SubMenu","TWB-BotT","TWB-GAID","TWB-Sort12","TWB-ULP","TWB-UALL1","TWB-UALL2","TWB-UALL3","TWB-UALL4","TWB-RUNX","TWB-Sort14","TWB-BotSc","TWB-CCF","TWB-UALL5","TWB-Planner","TWB-PCA","TWB-BotR1","TWB-BotR2","TWB-BotR3","TWB-ScriptR","TWB-RBot"],
	production : [30,35,41,47,55,64,74,86,100,117,136,158,184,214,249,289,337,391,455,530,616,717,833,969,1127,1311,1525,1744,2063,2400],
	capacity : [1000,1229,1512,1859,2285,2810,3454,4247,5222,6420,7893,9705,11932,14670,18037,22177,27266,33523,41217,50675,62305,76604,94184,115798,142373,175047,215219,264611,325337,400000],
	RD : {
		"z" : {"0" : "18","1" : "22","2" : "9","3" : "10","4" : "11","5" : "30","6" : "10","7" : "35"},
		"sv" : {"0" : "16","1" : "19.56","2" : "8","3" : "8.89","4" : "9.78","5" : "26.67","6" : "8.9","7" : "31.11"},
		"get" : function(envo){
			with(twb_.lib){
				r=RD[envo];
				r=(typeof r!="undefined")?r:RD["z"];
				return r;
			}
		}
	},
	icons : {
		"TWB-Light" : "red.png",
		"TWB-Lit" : "green.png",
		"TWB-MainMenu" : "menu.png",
		"TWB-Alog" : "login.png",
		"TWB-Settings" : "settings.png",
		"TWB-Notepad" : "note.png",
		"TWB-Calculator" : "calc.png",
		"TWB-Close" : "vil.png",
		"TWB-Stats" : "stats.png",
		"TWB-GR2" : "gr2.png",
		"TWB-GR3" : "gr3.png",
		"TWB-Back" : "back.png",
		"TWB-UALL" : "uall.png",
		"TWB-Sort" : "sort.png",
		"TWB-Next" : "next.png",
		"TWB-CMD-Q" : "ccenter.png",
		"TWB-MMap" : "twm.png",
		"TWB-Map" : "map.png",
		"TWB-Overviews" : "overviews.png",
		"TWB-Overview" : "overview.png",
		"TWB-Main" : "main.png",
		"TWB-Barracks" : "barracks.png",
		"TWB-Stable" : "stable.png",
		"TWB-Workshop" : "garage.png",
		"TWB-QT" : "qt.png",
		"TWB-Smithy" : "smithy.png",
		"TWB-Snob" : "snob.png",
		"TWB-Place" : "place.png",
		"TWB-GR5" : "gr5.png",
		"TWB-GR4" : "gr4.png",
		"TWB-ATTS" : "atts.png",
		"TWB-Farm" : "farm.png",
		"TWB-Statue" : "statue.png",
		"TWB-Market" : "market.png",
		"TWB-Shop" : "shop.png",
		"TWB-Script" : "script.png",
		"TWB-GR1" : "gr1.png",
		"TWB-Icons" : "booty.png",
		"Truckin" : "truckin.png",
		"TWB-Farm2" : "farm2.png",
	},
	levels : {
		"main" : 30,
		"barracks" : 25,
		"stable" : 20,
		"garage" : 15,
		"wood" : 30,
		"stone" : 30,
		"iron" : 30,
		"storage" : 30,
		"hide" : 10,
		"smith" : 20,
		"statue" : 1,
		"snob" : 3,
		"church" : 1,
		"market" : 25,
		"farm" : 30,
		"wall" : 20,
	},
	defaults : {
		"latency" : "2500", // 00 //
		"back" : "[",
		"next" : "]",
		"overviews" : "i",
		"map" : "o",
		"overview" : "p",
		"hq" : "h",
		"bar" : "g",
		"sta" : "w",
		"wor" : "e",
		"smi" : "r", // 10 //
		"aca" : "t",
		"place" : "a",
		"mar" : "s",
		"statue" : "d",
		"coin" : "f",
		"coinx" : "j",	
		"p1" : "m",	
		"p2" : ",",
		"p3" : ".",
		"p4" : "/", // 20 //
		"autonex" : "false",
		"skiptry" : "false",
		"panic" : "off",
		"tro" : "z",
		"des" : "x",
		"offer" : "1000",
		"forx" : "1000",
		"dur" : "5",
		"north" : "g",
		"west" : "c", // 30 //
		"south" : "v",
		"east" : "b",
		"mpe" : "cur",
		"ofu" : "y",
		"defu" : "u",
		"tmat" : "0o",
		"width" : "750",
		"height" : "300",
		"user" : "",
		"pass" : "", // 40 //
		"deft" : "",
		"img" : "false",
		"kalive" : "false",
		"owin" : "winx",
		"logl" : "3",
		"theme" : "0x",
		"mapico" : "false",
		"savlo" : "false",
		"delex" : "true",
		"highco" : "false", // 50 //
		"autovil" :"false",
		"tuser" : "",
		"tpass" : "",
		"copl" : "",
		"langx" : "en",
		"fahrs" : "3",
		"minun" : "20",
		"shrink" : "false",
		"autodet" : "false",
		"dtime" : "0", // 60 //
		"fpage" : "50",
		"logmode" : "redirect",
		"hash" : "",
		"langxx" : "en",
		"alias" : "true",
		"fnbr" : "false",
		"aler" : "dialog",
		"closest" : "5",
		"tsig" : "",
		"faico" : "false", // 70 //
		"vilnbr" : "25",
		"hivi" : "false",
		"twemsize" : "7",
		"twemena" : "false",
		"autoupnt" : "true",
		"logodbl" : "false",
		"ajaxf" : "false",
		"faiun" : "",
		"fastc" : "l",
		"fanerror" : "true", // 80 //
		"bohrs" : "3",
		"repcv" : "default",
		"fadly" : "5",
		"server_logout" : "true",
		"btime" : "true",
		"bqueue" : "true",
		"bqtimer" : "1",
		"slowestfat" : "p",
		"slowestfsup" : "p",
		"slowestnuke" : "r", // 90 //
		"slowestnoble" : "n",
		"savedir" : "",
		"intset" : "false",
		"newuall" : "false",
		"groupsync" : "false",
		"loyals" : "false",
		"c_scout" : "6",
		"c_noble" : "5",
		"c_cats" : "2",
		"c_other" : "4", // 100 //
		"rback" : "+",
		"rnext" : "-",
		"traintimer" : "1",
		"techtimer" : "1",
	},
	dictionary : {
		"notepad" : "TWB_Note()",
		"stats" : "TWB_Stats()",
		"key" : "TWB_L_Log()",
		"bot profiles" : "TWB_Profiles_Bot()",
		"bot choose" : "TWB_Assign_Bot()",
		"bot launch" : "TWB_Start_Bot()",
		"first bot" : "TWB_Start_Equi()",
		"second bot" : "TWB_Start_Equi2()",
		"save" : "TWB_Save_Session()",
		"load" : "TWB_Loader()",
		"back" : "TWB_Back()",
		"next" : "TWB_Next()",
		"command center" : "TWB_CMD_CNT()",
		"world" : "TWB_Map_Int()",
		"map" : "TWB_GoTo('map')",
		"overviews" : "TWB_GoTo('overview_villages')",
		"overview" : "TWB_GoTo('overview')",
		"main" : "TWB_GoTo('main')",
		"barracks" : "TWB_GoTo('barracks')",
		"stable" : "TWB_GoTo('stable')",
		"workshop" : "TWB_GoTo('garage')",
		"recruit" : "TWB_QT()",
		"smithy" : "TWB_GoTo('smith')",
		"academy" : "TWB_GoTo('snob')",
		"rally point" : "TWB_GoTo('place','command')",
		"fake" : "TWB_Fake()",
		"noble" : "TWB_Noble()",
		"timed attack" : "TWB_ASY()",
		"report cache" : "TWB_Cache_Load()",
		"report tabs" : "TWB_OR()",
		"same" : "TWB_AWST()",
		"all" : "TWB_AWAT()",
		"simulate" : "TWB_Simulate()",
		"add farm" : "TWB_Add_Farm()",
		"add farms" : "TWB_AddM_Farm()",
		"show farms" : "TWB_Show_Farms()",
		"start farming" : "TWB_Start_Farming()",
		"statue" : "TWB_GoTo('statue')",
		"market" : "TWB_GoTo('market')",
		"shop" : "TWB_Market_Fil(0)",
		"coin" : "TWB_Bulk()",
		"coins" : "TWB_Multi_Bulk()",
		"package" : "TWB_Store()",
		"packages" : "TWB_Multi_Store()",
		"north" : "TWB_Move_Map('north')",
		"south" : "TWB_Move_Map('south')",
		"west" : "TWB_Move_Map('west')",
		"east" : "TWB_Move_Map('east')",
		"recruit first" : "TWB_Recruit_Uni('0')",
		"recruit second" : "TWB_Recruit_Uni('1')",
		"recruit third" : "TWB_Recruit_Uni('2')",
		"recruit fourth" : "TWB_Recruit_Uni('3')",
		"offensive" : "TWB_Insert_Uni('1')",
		"defensive" : "TWB_Insert_Uni('0')",
	},
	TWB_WorldSet : function(sett){
		with(twb_.lib){
			// Usage is very simple : Examples of sett
			// fake_limit
			// coord/func          Func is a member of the coord group ...
			// Lets see if the world settings are cached
			if(typeof WORLD_SET[TWB_World()]=="undefined"){
				// Lets cache them 
				link="http://"+TWB_World()+"interface.php?func=get_config";
				var req = new XMLHttpRequest();
				req.open("GET", link, false);
				req.send(null);
				WORLD_SET[TWB_World()]=req.responseXML;
			}
			// Make sure all arguments are there so that XPF won't bark
			if(typeof sett!="undefined"){
				// Load a particular setting
				var nsResolver = WORLD_SET[TWB_World()].createNSResolver(WORLD_SET[TWB_World()].ownerDocument==null?WORLD_SET[TWB_World()].documentElement:WORLD_SET[TWB_World()].ownerDocument.documentElement);
				element = WORLD_SET[TWB_World()].evaluate('//'+sett,WORLD_SET[TWB_World()],nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
				if(element!==null){
					return element.textContent;
				}
				else{
					return null;
				}
			}
		}
	},
	TWB_New_Group_Set : function(nme,label){
		with(twb_.lib){
			// Add setting to local settings + insert Before
			if(typeof settings[nme]=="undefined"){
				settings[nme]={label:label,sets:[]};
			}
		}
	},
	TWB_New_Set : function(group,nset){
		with(twb_.lib){
			settings[group].sets.push(nset);
		}
	},
	lang : function(v,ar){
		with(twb_.lib){
			ar=(typeof ar!="undefined")?ar:[];
			try{
				return gei("TWB-Language").getFormattedString(v, ar);
			}catch(e){
				// If it was not found
				return null;
			}
		}
	},
	TWB_PickSaveDir : function(e){
		with(twb_.lib){
			var filepicker=Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
			filepicker.init(window,lang("savedir"),filepicker.modeGetFolder);
			filepicker.appendFilters(filepicker.filterAll);
			filepicker.show();
			if(filepicker.file){
				e.target.value=filepicker.file.path+SL;
			}
			else{
				// Verify if current textbox location is a dir otherwise reappend default
				f=Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				f.initWithPath(e.target.value);
				if(!f.exists() || !f.isDirectory()){
					e.target.value=defaults["savedir"];
				}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof settings.main=="undefined"){
				defaults["savedir"]=Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfD", Ci.nsIFile).path+SL+"TWB"+SL+"scripts"+SL;
				
				TWB_New_Group_Set("main",lang("xon1"));
				TWB_New_Set("main",[lang("theme"),{id:"theme",type:"menupop",selected:"theme",values:[["0x","Default"],["1x","Large Icons"]]}]);
				TWB_New_Set("main",[lang("xon4"),{id:"latency",type:"menupop",selected:"latency",values:[["1000","1s"],["1250","1.25s"],["1500","1.5s"],["1750","1.75s"],["2000","2s"],["2250","2.25s"],["2500","2.5s"],["2750","2.75s"],["3000","3s"],["3250","3.25s"],["3500","3.5s"],["3750","3.75s"],["4000","4s"],["4250","4.25s"],["4500","4.5s"],["4750","4.75s"],["5000","5s"]]}]);				
				TWB_New_Set("main",[lang("xon3"),{id:"aler",type:"menupop",selected:"aler",values:[["dialog",lang("xon31")],["dialog+",lang("xon32")],["tts",lang("xon33")]]}]);
				TWB_New_Set("main",[lang("shrink"),{id:"shrink",type:"checkbox",checked:"shrink"}]);
				TWB_New_Set("main",[lang("xon5"),{id:"autonex",type:"checkbox",checked:"autonex"}]);
				TWB_New_Set("main",[lang("savlo"),{id:"savlo",type:"checkbox",checked:"savlo"}]);
				TWB_New_Set("main",[lang("autodet"),{id:"autodet",type:"checkbox",checked:"autodet"}]);
				TWB_New_Set("main",[lang("xon23"),{id:"img",type:"checkbox",checked:"img"}]);
				//TWB_New_Set("main",[lang("winsize1"),{id:"width",type:"textbox",value:"width"}]);
				//TWB_New_Set("main",[lang("winsize2"),{id:"height",type:"textbox",value:"height"}]);
				TWB_New_Set("main",[lang("owin"),{id:"owin",type:"menupop",selected:"owin",values:[["winx",lang("neww")],["tabx",lang("ntab")]]}]);
				TWB_New_Set("main",[lang("logl"),{id:"logl",type:"menupop",selected:"logl",values:[["0","0"],["1","1"],["2","2"],["3","3"],["4","4"]]}]);
				TWB_New_Set("main",[lang("minun"),{id:"minun",type:"textbox",value:"minun"}]);
				TWB_New_Set("main",[lang("dtime"),{id:"dtime",type:"textbox",value:"dtime"}]);
				TWB_New_Set("main",[lang("vilnbr"),{id:"vilnbr",type:"textbox",value:"vilnbr"}]);
				TWB_New_Set("main",[lang("savedir"),{id:"savedir",type:"textbox",value:"savedir",onclick:"TWB_PickSaveDir"}]);
				
				TWB_New_Group_Set("twb",lang("TWB-Acc"));
				TWB_New_Set("twb",[lang("TWB-User"),{id:"tuser",type:"textbox",value:"tuser"}]);
				TWB_New_Set("twb",[lang("TWB-Pass"),{id:"tpass",type:"textbox",password:true,value:"tpass"}]);
				TWB_New_Set("twb",[lang("TWB-Copl"),{id:"copl",type:"textbox",password:true,value:"copl"}]);
				TWB_New_Set("twb",[lang("autoupnt"),{id:"autoupnt",type:"checkbox",checked:"autoupnt"}]);
				TWB_New_Set("twb",[lang("server_logout"),{id:"server_logout",type:"checkbox",checked:"server_logout"}]);
				
				TWB_New_Group_Set("colors",lang("colcode"));
				TWB_New_Set("colors",[lang("c_scout"),{id:"c_scout",type:"color",value:"c_scout"}]);
				TWB_New_Set("colors",[lang("c_noble"),{id:"c_noble",type:"color",value:"c_noble"}]);
				TWB_New_Set("colors",[lang("c_cats"),{id:"c_cats",type:"color",value:"c_cats"}]);
				TWB_New_Set("colors",[lang("c_other"),{id:"c_other",type:"color",value:"c_other"}]);
			}
		}	
	}
});
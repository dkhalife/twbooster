// @Plugin = Idle Process
// @Version = 1.3
// @Icons = 0
merge(twb_.lib,{
	TWB_Idle : function(UR){
		with(twb_.lib){
			try{
				if(twb()){
					CheckDST();
					servertime=getTime("1%3");
					twb_idle=Math.round(servertime.getTime()/1000);
				}
			}catch(e){log('Idle Process',e);}
		}
	},
	TWB_Idle_ : function(){
		with(twb_.lib){
			try{
				CheckDST();
				servertime=getTime("1%3");
				now=Math.round(servertime.getTime()/1000);
				if((now-twb_idle)>120){
					TWB_Panic();
					if($get_var("kalive")=="true"){
						TWB_Active();
					}
				}
			}catch(e){log('Idle Process',e);}
		}
	},
	TWB_Active : function(){
		with(twb_.lib){
			try{
				TX=win();
				if(TX){
					if(TX.wrappedJSObject){
						TX=TX.wrappedJSObject;
					}
					TX.location=TX.location;
				}
			}catch(e){log('Idle Process',e);}
		}
	},
	TWB_Panic : function(){
		with(twb_.lib){
			try{
				if($get_var("panic")!="off"){
					found=false;
					link="http://"+TWB_World()+"game.php?screen=overview"+local.sitterT;
					tmpx=$.ajax({url:link,async: false}).responseText;
					current=tmpx.match(/att\.png/);
					if(current==null){
						current=0;
					}
					else{
						current=tmpx.split(/att\.png/)[1].split("<td")[1].split(")</td>")[0].split(">(")[1];
					}
					prev=local.lastATN;
					if(current && current){
						local.lastATN=current;
					}
					else{
						local.lastATN=0;
					}
					if(current>prev){
						twb_.lastURL=TWB_URL();
						Engines.State.add_p("panic_i","TWB_Panic_I()","*",true);
						TWB_Mast_Url(TWB_GoTo("overview_villages","prod",1)+"&page=-1");
					}
				}
			}catch(e){log('TWBBot',e);}
		}
	},
	TWB_Panic_I : function(){
		with(twb_.lib){
			// Analyze and scrape
			twb_.ids=[];
			twb_.scraped=[];
			VILZ="";
			ALL=$xp("//img[contains(@src,'attack.png')]",6);
			for(i=0; i<ALL.length; i++){
				VIDZ=ALL[i].parentNode.href.match(/village=(\d+)/)[1];
				linkz1="<a href='http://"+TWB_World()+"game.php?village="+VIDZ+"&screen=place'>";
				NAMZ=gei(VIDZ);
				NAMZ=TWB_GA(NAMZ)+" "+NAMZ.getAttribute("tooltiptext");
				linkz2="</a><br>";
				VILZ+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+linkz1+NAMZ+linkz2;
				twb_.ids.push(VIDZ);
			}
			// Make a copy for later reference 
			twb_.vilids=twb_.ids;
			if($get_var("panic").match("email")){
				// Send email by server : send user and pass 
				MGS=lang("panic").replace("{nbr}",local.lastATN);
				MGS=MGS.replace("{vils}",VILZ);
				$.get(host+"email.php?&c="+twb_.l+"&l="+twb_.p+"&msg="+escape(MGS),function(){});
			}
			if($get_var("panic").match("alert")){
				TWB_Sound("panic");
			}
			Engines.State.add_p("panic_l","TWB_Panic_L()","*",false);
			link="http://"+TWB_World()+"game.php?village="+twb_.ids[0]+"&screen=place&mode=command";
			TWB_Mast_Url(link);
		}
	},
	TWB_Panic_L : function(){
		with(twb_.lib){
			if(TWB_Scr()=="place" && (TWB_Mode()=="command" || TWB_Mode()==null) && TWB_URL().match("try=confirm")==null){
				if(typeof twb_.ids[0]!="undefined"){
					if(twb_.ids[0]==local.curVillage){
						// Delete first 1
						tmp=[];
						for(i=1; i<twb_.ids.length; i++){
							tmp.push(twb_.ids[i]);
						}
						twb_.ids=tmp;
						delete tmp;
						TWB_Check1();
					}
					else{
						// move to next village
						ind=twb_.ids.indexOf(local.curVillage);
						if(typeof twb_.ids[ind-(-1)]!="undefined"){
							link="http://"+TWB_World()+"game.php?village="+twb_.ids[ind-(-1)]+"&screen=place&mode=command";
							TWB_Mast_Url(link);
						}
					}
				}
				else{
					// We are empty
					delete twb_.ids;
					delete twb_.scraped;
					Engines.State.kill_p("panic_l");
					TWB_GOBack();
				}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.idle=="undefined"){
				Engines.State.add_p("idle","TWB_Idle()","*",false);
				TWB_New_Set("main",[lang("kal"),{id:"kalive",type:"checkbox",checked:"kalive"}]);
				setI(TWB_Idle_,5*60*1000,"panic");
				TWB_New_Set("main",[lang("xon20"),{id:"panic",type:"menupop",selected:"panic",values:[["off",lang("off")],["alert",lang("al")],["email",lang("pm")],["alertemail",lang("both")]]}]);
			}
		}
	}
});
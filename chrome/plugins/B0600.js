// @Plugin = TW Signature
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	TWB_Sig : function(){
		with(twb_.lib){
			try{
				if(TWB_Scr()=="mail" && (TWB_Mode()=="view" || TWB_Mode()=="new")){
					window.setTimeout(function(){
						$xp("//input[@type='submit']",6,twb_.pWIN.document)[1].addEventListener("click",TWB_Sigm1,false);
					},1000);
				}
				if(TWB_Mode()=="forum"){
					//twb_.DD=win();
					twb_.DD=twb_.pWIN;
					LD=twb_.DD.location.href;
					if(LD.match("screen=view_thread") && LD.match("answer=true")){
						window.setTimeout(function(){
							$xp("//input[@type='submit']",9,twb_.DD.document).addEventListener("click",TWB_Sigm2,false);
						},1000);
					}
				}
			}catch(e){log('TW Signature',e);}
		}
	},
	TWB_Sigm1 : function(){
		with(twb_.lib){
			$xp("//textarea",9,twb_.pWIN.document).value+="\n\n"+$get_var("tsig");
		}
	},
	TWB_Sigm2 : function(){
		with(twb_.lib){
			$xp("//textarea",9,twb_.DD.document).value+="\n\n"+$get_var("tsig");
		}
	},
	post_init : function(){
		if($get_var("tsig").length>0){
			Engines.State.add_p("sigm","TWB_Sig()","*",false);
		}
	},
});
// @Plugin = onConnect Events
// @Version = 1.5
// @Icons = 0
merge(twb_.lib,{
	TWB_Connected : function(Vend){
		with(twb_.lib){
			try{
				// Refresh page
				imix=gen("toolbarbutton");
				for(mix=0; imix.length>mix; mix++){
					if(imix[mix].getAttribute("id").match("TWB")){
						imix[mix].setAttribute("disabled",false);
					}
				}
				gei('TWB-Light').setAttribute('id','TWB-Lit');
				TWB_TNI();
				TWB_Get_MyID();
				if(gei('TWB-REP')){
					gei('TWB-REP').setAttribute('disabled',false);
				}
				if(gei('TWB-RCache')){
					gei('TWB-RCache').setAttribute('disabled',false);
				}
				// Set version
				ver();
				if(typeof Vend=="undefined"){
					setI("twb_.lib.TWB_Render()",90000,"ping");
					setI("twb_.lib.TWB_Render2()",60000,"ping2");
				}
			}catch(e){
				log("onConnect",e);
			}
		}
	}
});
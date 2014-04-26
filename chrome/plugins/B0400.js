// @Plugin = Enhance Home page
// @Version = 1.0
// @Icons = 0

merge(twb_.lib,{
	TWB_Home : function(){
		with(twb_.lib){
			try{
				opxs="http://www."+TWB_CWORLD();
				var zxwin1=win(opxs);
				opxs="http://"+TWB_CWORLD();
				var zxwin2=win(opxs);
				zop=(zxwin1!==null)?zxwin1:((zxwin2!==null)?zxwin2:null);
				if(zop!==null){
					modify='<img src="'+host+'twb.gif">';
					whelm=xp("//h1",9,zop.document);
					if(whelm!==null){
						whelm.innerHTML=modify;
					}
				}
			}catch(e){log('Enhance Home page',e);}
		}
	},
	post_init : function(){
		with(twb_.lib){
			if($get_var("img")=="true"){
				Engines.State.add_p("home","TWB_Home()","*",false);
			}
		}
	}
});
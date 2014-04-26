// @Name = Resource Balancer
// @Shortcut = 1
// @TWB = true

/*
	- Works on extremetw village list page
*/

try{
	u=content.location.href;

	merge(twb_.lib,{
		TWB_XTream : function(){
			with(twb_.lib){
				// Where are we
				if(twb_.pWIN.location.href.match("wood=")){
					// Read resources from URL
					$xp("//*[@name='wood']",9,twb_.pWIN.document).value=twb_.pWIN.location.href.match(/wood=(\d+)/)[1];;
					$xp("//*[@name='stone']",9,twb_.pWIN.document).value=twb_.pWIN.location.href.match(/clay=(\d+)/)[1];
					$xp("//*[@name='iron']",9,twb_.pWIN.document).value=twb_.pWIN.location.href.match(/iron=(\d+)/)[1];
					// Remove from link
					twb_.XTW.splice(0,1);
					// Click Next
					$xp("//input[@type='submit']",9,twb_.pWIN.document).click();
				}
				else{
					if(!twb_.pWIN.location.href.match("try=confirm_send")){
						// New link
						// If we have one , replace current url
						if(typeof twb_.XTW[0]!="undefined"){
							content.location=twb_.XTW[0];
						}
						else{
							// if we don't , close this tab and kill the process
							TWB_XTream_Kill();
							content.close();
						}
					}
				}
			}
		},
		TWB_XTream_Kill : function(){
			with(twb_.lib){
				Engines.State.kill_p("xtreamtw");
				delete twb_.XTW;
			}
		}
	});
	
	if(u.match("ResourceBalancerv4a")){
		with(twb_.lib){
			// Read links + Resources to send
			links=$xp("//a[contains(@href,'screen=market')]",6,win("ResourceBalancerv4a").document);
			twb_.XTW=[];
			for(i=0; i<links.length; i++){
				total=links[i].parentNode.parentNode.childNodes[9].textContent
				if(total>0){
					twb_.XTW.push(links[i]);
				}
			}
			
			delete links;
			
			if(twb_.XTW.length>0){
				// Process listener
				Engines.State.add_p("xtreamtw","TWB_XTream()","*",false);
				// Open first link
				TWB_All_Url(twb_.XTW[0],'1','1');
			}
			else{
				TWB_XTream_Kill();
			}
		}
	}
}catch(e){
	log("Resource Balancer",e);
}
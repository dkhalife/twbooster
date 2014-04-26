// @Plugin = Visual Dialog Prompts
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	TWB_Notify : function(msg,label,btns){
		with(twb_.lib){
			params={
				type : "notification",
				msg : msg,
				btns : btns,
				label : label,
			}
			X=Y=0;
			if(typeof twb_.NOTIFY=="undefined"){
				twb_.NOTIFY=[];
			}
			twb_.NOTIFY.push(window.openDialog('chrome://twbdialer/content/dialog.xul', '_blank', 'chrome,screenX='+X+',screenY='+Y, params));
		}
	},
	TWB_Popup : function(cancelFunc){
		with(twb_.lib){
			// No more than 1 can be opened
			if(typeof twb_.POPUP!="undefined"){
				return ;
			}
			params={
				type : "meter",
				obj : meter
			};
			
			if(typeof cancelFunc!="undefined"){
				params.cancelFunc=cancelFunc;
			}
			
			X=Y=0;
			setI(TWB_UPopup,250,"meter");
			twb_.POPUP=window.openDialog('chrome://twbdialer/content/dialog.xul', '_blank', 'chrome,screenX='+X+',screenY='+Y, params);
			window.setTimeout(function(){
				M=twb_.POPUP.meter;
				if(meter.value2==-1){
					M.meter1.setAttribute("mode","undetermined");
				}
				else{
					M.meter1.setAttribute("mode","determined");
				}
				if(meter.value2==-1){
					M.meter2.setAttribute("mode","undetermined");
				}
				else{
					M.meter2.setAttribute("mode","determined");
				}
			},100);
		}
	},
	TWB_UPopup : function(){
		with(twb_.lib){
			if(meter.value2!=100){
				try{
					twb_.POPUP.STC();
					M=twb_.POPUP.meter;
					if(typeof M!="undefined"){
						M.label.setAttribute("label",meter.caption);
						M.label1.setAttribute("value",meter.label1 + " (" + meter.value1 + "%)");
						if(meter.value1>=0){
							M.label1.setAttribute("value",meter.label1 + " (" + meter.value1 + "%)");
						}
						else{
							M.label1.setAttribute("value",meter.label1);
						}
						if(meter.value2>=0){
							M.label2.setAttribute("value",meter.label2 + " (" + meter.value2 + "%)");
						}
						else{
							M.label2.setAttribute("value",meter.label2);
						}
						M.meter1.setAttribute("value",meter.value1);
						M.meter2.setAttribute("value",meter.value2);
					}
				}catch(e){}
			}
			else{
				TWB_unPopup();
			}
		}
	},
	TWB_unPopup : function(v){
		with(twb_.lib){
			if(typeof v=="undefined"){
				unsetI("meter");
				twb_.POPUP.close();
				delete twb_.POPUP;
			}
			else{
				window.setTimeout(function(){
					M=twb_.POPUP.meter;
					switch(v){
						case 0 : M.meter2.setAttribute("mode","undetermined"); break;
						case 1 : M.meter1.setAttribute("mode","determined"); break;
					}
				},100);
			}
		}
	},
	TWB_CCMD : function(){
		with(twb_.lib){
			paramz={out:{}};
			window.openDialog("chrome://twbdialer/content/colors.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", lang("colors"), paramz);
			GP=paramz.out;
			return GP;
		}
	},
	TWB_DCMD : function(msg,params){
		with(twb_.lib){
			msg=(typeof msg=="undefined")?"":msg;
			voice(msg);
			params=(typeof params!="undefined")?params:"";
			if(params=="local"){
				D=new Date();
				time=$xp("//*[@id='serverTime']",9).innerHTML;
				date=$xp("//*[@id='serverDate']",9).innerHTML.split("/");
				params=date[0]+" "+date[1]+" "+D.getFullYear()+" "+time;
			}
			params={inn:params,out:{}};
			window.openDialog("chrome://twbdialer/content/dtime.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", msg, params, lang("loop"));
			G=params.out;
			return (G===null)?G:G.replace(/\-/," ");
		}
	},
	TWB_GCMD : function(msg,params){
		with(twb_.lib){
			params={inn:params,out:{}};
			voice(msg);
			window.openDialog("chrome://twbdialer/content/gcmd.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", msg, params, window);
			G=params.out;
			return G;
		}
	},
	TWB_RCMD : function(msg,params){
		with(twb_.lib){
			voice(msg);
			params=(typeof params!="undefined")?params:{};
			params={inn:params,out:{}};
			window.openDialog("chrome://twbdialer/content/runx.xul", "","chrome,dialog,resizable=yes,alwaysRaised", msg, params, window);
			return true;
		}
	},
	TWB_NCMD : function(){
		with(twb_.lib){
			tmp=TWB_R("ncmd.conf");
			selected=isEmpty(tmp)?null:tmp;
			msg=lang("TWB-Noble");
			voice(msg);
			l=[lang("TWB-Main"),lang("TWB-Barracks"),lang("TWB-Stable"),lang("TWB-Workshop"),lang("TWB-Place"),lang("TWB-Smithy"),lang("TWB-Snob"),lang("TWB-Market"),lang("TWB-Farmx"),lang("TWB-Storage"),lang("TWB-Wall"),lang("sru"),lang("sau")];
			params=(typeof params!="undefined")?params:{};
			params.show_archer=(TWB_WorldSet("game/archer")!=0);
			params.show_knight=(TWB_WorldSet("game/knight")!=0);
			params={inn:params,out:{},lang:l};
			window.openDialog("chrome://twbdialer/content/ncmd.xul", "","modal,chrome,dialog,,resizable=yes,alwaysRaised", msg, params, cN(gei("TWB-Villages")), window, selected);
			G=params.out;
			if(G){
				TWB_S(G.delay,"ncmd.conf");
			}
			else{
				TWB_S("","ncmd.conf");
			}
			return G;
		}
	},
	TWB_RMCMD : function(){
		with(twb_.lib){
			msg=lang("TWB-RBot");
			voice(msg);
			l=[];
			params=(typeof params!="undefined")?params:{};
			params={inn:params,out:{}};
			window.openDialog("chrome://twbdialer/content/resm.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", msg, params, cN(gei("TWB-Villages")), window);
			G=params.out;
			return G;
		}
	},
	TWB_FCMD : function(){
		with(twb_.lib){
			msg=lang("TWB-Fake");
			voice(msg);
			l=[];
			params=(typeof params!="undefined")?params:{};
			params.show_archer=(TWB_WorldSet("game/archer")!=0);
			params={inn:params,out:{},lang:l};
			window.openDialog("chrome://twbdialer/content/fcmd.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", msg, params, cN(gei("TWB-Villages")), window);
			G=params.out;
			return G;
		}
	},
	TWB_UCMD : function(msg,params){
		with(twb_.lib){
			msg=(typeof msg=="undefined")?"":msg;
			voice(msg);
			l=[lang("TWB-Main"),lang("TWB-Barracks"),lang("TWB-Stable"),lang("TWB-Workshop"),lang("TWB-Place"),lang("TWB-Smithy"),lang("TWB-Snob"),lang("TWB-Market"),lang("TWB-Farmx"),lang("TWB-Storage"),lang("TWB-Wall"),lang("sru"),lang("sau")];
			params=(typeof params!="undefined")?params:{};
			params.show_archer=(TWB_WorldSet("game/archer")!=0);
			params.show_knight=(TWB_WorldSet("game/knight")!=0);
			params={inn:params,out:{},lang:l};
			window.openDialog("chrome://twbdialer/content/ucmd.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", msg, params);
			G=params.out;
			cmd=null;
			if(G!==null){
				cmd="";
				cmd+=(G.spear!="")?G.spear+"p":"";
				cmd+=(G.sword!="")?G.sword+"w":"";
				cmd+=(G.axe!="")?G.axe+"x":"";
				cmd+=(G.archer!="")?G.archer+"e":"";
				cmd+=(G.spy!="")?G.spy+"s":"";
				cmd+=(G.light!="")?G.light+"l":"";
				cmd+=(G.marcher!="")?G.marcher+"m":"";
				cmd+=(G.heavy!="")?G.heavy+"h":"";
				cmd+=(G.ram!="")?G.ram+"r":"";
				cmd+=(G.catapult!="")?G.catapult+"c":"";
				cmd+=(G.snob!="")?G.snob+"n":"";
				cmd+=(G.knight!="")?G.knight+"k":"";
				cmd+=(G.rand===true)?"*":"";
				cmd+=(G.cat!="")?"="+G.cat+"=":"";
				if(G.all){
					cmd="0p0w0x0e0s0l0m0h0r0c";
				}
			}
			return cmd;
		}
	},
	TWB_ACMD : function(t){
		with(twb_.lib){
			params=lang("ualx").split(" | ");
			for(j=0; j<params.length; j++){
				if((j==0 && (t==1 || t==3)) || (j==5 && (t==1 || t==2)) || (j==6 && t==3)){
					params[j]=[params[j]];
				}
			}
			voice(lang("uall"));
			params={inn:params,out:{}};
			tmp=TWB_R("update.conf");
			selected=isEmpty(tmp)?null:tmp;
			window.openDialog("chrome://twbdialer/content/uall.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", lang("uall"), params, selected);
			if(params.out){
				TWB_S(params.out,"update.conf");
			}
			else{
				TWB_S("","update.conf");
			}
		}
		return params.out;
	},
	TWB_BCMD : function(t){
		with(twb_.lib){
			params=lang("balx").split(" | ");
			for(j=0; j<params.length; j++){
				if((j==0 && t==1) || (j==5 && (t==1 || t==2))){
					params[j]=[params[j]];
				}
			}
			params={inn:params,out:{}};
			voice(lang("ball"));
			tmp=TWB_R("bot.conf");
			selected=isEmpty(tmp)?null:tmp;
			window.openDialog("chrome://twbdialer/content/bot.xul", "","modal,chrome,dialog,resizable=yes,alwaysRaised", lang("ball"), params, selected);
			if(params.out){
				TWB_S(params.out,"bot.conf");
			}
			else{
				TWB_S("","bot.conf");
			}
		}
		return params.out;
	}
});
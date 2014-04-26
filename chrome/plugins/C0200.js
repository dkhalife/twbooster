// @Plugin = Notepad
// @Version = 1.0
// @Icons = note
merge(twb_.lib,{
	TWB_BB : function(tr){
		try{
			ar=new Array();
			Z=tr.match(/\[village\]\d+\|\d+\[\/village\]/g);
			if(Z){
				for(i=0; i<Z.length; i++){
					ar.push(getC(Z[i]).join("|"));
				}
			}
			return ar;
		}catch(e){log('Notepad',e);}
	},
	TWB_RLT : function(){
		with(twb_.lib){
			if(twb()){
				try{
					if(TWB_Scr()=="place"){
						$xp("//input[@name='x']",9).value=twb_.$zza.split("|")[0];
						$xp("//input[@name='y']",9).value=twb_.$zza.split("|")[1];
						Engines.State.kill_p("ralx");
					}
				}catch(e){log('Notepad',e);}
			}
		}
	},
	TWB_Note : function(){
		with(twb_.lib){
			try{
				notes=TWB_R("notepad.twb");
				notes=(isEmpty(notes))?"":notes;
				XF=TWB_BB(unescape(notes));
				CRV=codec="";
				for(ic=0; ic<XF.length; ic++){
					SCD=XF[ic].split("|");
					lni="http://www.twstats.com/"+TWB_World(0)+"/ajax.php?s="+TWB_World(0)+"&mode=mv&x="+SCD[0]+"&y="+SCD[1];
					tmpx=$.ajax({url:lni,async: false}).responseText;
					vname=(tmpx.match(/<th colspan=\"2\">/))?tmpx.split("<th colspan=\"2\">")[1].split("<a")[0]:"Invalid Village";
					codec+="<p><a href=javascript:void(0); onclick=javascript:window.openerx.twb_.lib.TWB_Go_Ralx('"+XF[ic]+"');>"+vname+"</a></p>";
				}
				if(XF.length>0){
					CRV='<p><a href=javascript:void(0);><u><b>'+lang("TWB-MBB")+' :</b></u></a></p><p>'+codec+'</p>';
				}
				html='<html><head><title>'+lang("title10")+'</title><style>.vis { background-image:url("data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7"); } .block { -moz-border-radius: 20px; background-color: #E6DEC8; } a:link{color:#804000;font-weight:bold;text-decoration:none;}a:visited {color:#804000;font-weight:bold;text-decoration:none;}a:active {color:#0082BE;font-weight:bold;text-decoration:none;}a:hover {color:#0082BE;font-weight:bold;text-decoration:none;}.z1 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #E6DEC8}.z2 {font-family : Verdana;font-size: 16px;color: #804000;background-color: #F1EDE1}.c1 {font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #E6DEC8}.c2{font-family : Verdana;border : 0px none;font-size: 16px;color: #804000;background-color: #F1EDE1}</style></head><body class="vis"><div align=center>'+CRV+'<div class="block"><a href=javascript:;><h1>'+lang("TWB-Notepad")+' :</h1></a></div><br /><div class="block"><br /><textarea style="padding: 10px; -moz-border-radius: 20px;" class="c2" rows="12" name="noted" cols="120">'+unescape(notes)+'</textarea><br /><br /></div><br /><div class="block" align="center"><br /><input class="z1" type="button" onclick="window.openerx.twb_.lib.TWB_Note_Save(window);" value="'+lang("xon9")+'" name="B1"><br /><br /></div></div></body></html>';
				var doc=openW(html);
			}catch(e){log('Notepad',e);}
		}
	},
	TWB_Note_Save : function(wx){
		with(twb_.lib){
			try{
				tosv=escape(wx.document.getElementsByTagName("textarea")[0].value);
				TWB_S(tosv,"notepad.twb");wx.content.close();
			}catch(e){log('Notepad',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(gei("TWB-Notepad")==null){
				BTN("toolbarbutton",{id:"TWB-Notepad",type:"button",tooltiptext:"Notepad",oncommand:"try{twb_.lib.TWB_Note();}catch(e){twb_.lib.log('Main',e);}"});
			}
		}
	}
});
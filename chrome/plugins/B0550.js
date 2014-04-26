// @Plugin = Village List BBCoder
// @Version = 1.7
// @Icons = 0
merge(twb_.lib,{
	TWB_BBC : function(){
		with(twb_.lib){
			try{
				if(twb() && TWB_Scr()=="info_village"){
					tid=$xp("//a[contains(@href,'info_player')]",9,twb_.pWIN.document);
					if(tid){
						tid=tid.href.match(/id=(\d+)/)[1];
						link="http://"+TWB_World()+"game.php?screen=info_player&id="+tid;
						$.ajax({url:link,async:true,success:function(tmp){
							vils=TWB_Aunique(tmp.split("&amp;screen=map")[1].match(/\d+\|\d+/g)).join(" ");
							TAB_=dce("table",twb_.pWIN);
							TAB_.class="vis";
							TAB=dce("tbody",twb_.pWIN);
							
							TR1=dce("tr",twb_.pWIN);
							TD1_1=$xp("//*[@id='content_value']/table//th",9).cloneNode(false);
							TD1_1.innerHTML=lang("TWB-Village");
							TR1.appendChild(TD1_1);
							TAB.appendChild(TR1);
							
							TR2=dce("tr",twb_.pWIN);
							TD2_1=dce("td",twb_.pWIN);
							A1=dce("a",twb_.pWIN);
							A1.href="javascript:;";
							A1.innerHTML=lang("BB");
							A1.addEventListener("click",TWB_BBC_BB,false);
							TD2_1.appendChild(A1);
							
							TD2_2=dce("td",twb_.pWIN);
							A2=dce("a",twb_.pWIN);
							A2.href="javascript:;";
							A2.innerHTML=lang("JS");
							A2.addEventListener("click",TWB_BBC_JS,false);
							TD2_2.appendChild(A2);
							
							TR2.appendChild(TD2_1);
							TR2.appendChild(TD2_2);
							TAB.appendChild(TR2);
							
							TR2_=dce("tr",twb_.pWIN);
							TD2__1=dce("td",twb_.pWIN);
							A1_=dce("a",twb_.pWIN);
							A1_.href="javascript:;";
							A1_.innerHTML=lang("TWB-Sort");
							A1_.addEventListener("click",TWB_BBC_BB_,false);
							TD2__1.appendChild(A1_);
							
							TD2__2=dce("td",twb_.pWIN);
							A2_=dce("a",twb_.pWIN);
							A2_.href="javascript:;";
							A2_.innerHTML=lang("TWB-Sort");
							A2_.addEventListener("click",TWB_BBC_JS_,false);
							TD2__2.appendChild(A2_);
							
							TR2_.appendChild(TD2__1);
							TR2_.appendChild(TD2__2);
							TAB.appendChild(TR2_);
							
							TR3=dce("tr",twb_.pWIN);
							TR3.style.display="none";
							TD3_1=$xp("//*[@id='content_value']/table//th",9).cloneNode(false);
							TD3_1.innerHTML='<textarea rows="5" cols="30" id="out1">'+vils.replace(/(\d+\|\d+)/g,"[village]$1[/village]\n").replace(/\s/g,'')+'</textarea>';
							TD3_1.colspan="2";
							TR3.appendChild(TD3_1);
							TAB.appendChild(TR3);
							
							TR4=dce("tr",twb_.pWIN);
							TR4.style.display="none";
							TD4_1=$xp("//*[@id='content_value']/table//th",9).cloneNode(false);
							TD4_1.innerHTML='<textarea rows="5" cols="30" id="out2">'+vils+'</textarea>';
							TD4_1.colspan="2";
							TR4.appendChild(TD4_1);
							TAB.appendChild(TR4);

							TR5=dce("tr",twb_.pWIN);
							TR5.style.display="none";
							TD5_1=$xp("//*[@id='content_value']/table//th",9).cloneNode(false);
							TD5_1.innerHTML='<textarea rows="5" cols="30" id="out3"></textarea>';
							TD5_1.colspan="2";
							TR5.appendChild(TD5_1);
							TAB.appendChild(TR5);
							
							TAB_.appendChild(TAB);
							BEFO=$xp("//*[@id='content_value']/table",9).nextSibling;
							BEFO.parentNode.insertBefore(TAB_,BEFO);
							// Set onclick events
						}});
					}
				}
			}catch(e){log('Village List BB',e);}
		}
	},
	TWB_BBC_BB : function(){
		with(twb_.lib){
			_wd=twb_.pWIN;
			try{
				gei("out1",_wd.document).parentNode.parentNode.style.display="";
				gei("out2",_wd.document).parentNode.parentNode.style.display="none";
				gei("out3",_wd.document).parentNode.parentNode.style.display="none";
			}catch(e){}
		}
	},
	TWB_BBC_JS : function(){
		with(twb_.lib){
			_wd=twb_.pWIN;
			try{
				gei("out1",_wd.document).parentNode.parentNode.style.display="none";
				gei("out2",_wd.document).parentNode.parentNode.style.display="";
				gei("out3",_wd.document).parentNode.parentNode.style.display="none";
			}catch(e){}
		}
	},
	TWB_BBC_JS_ : function(){
		with(twb_.lib){
			_wd=twb_.pWIN;
			try{
				gei("out1",_wd.document).parentNode.parentNode.style.display="none";
				gei("out2",_wd.document).parentNode.parentNode.style.display="none";
				C=gei("out1",_wd.document).value.match(/\d+\|\d+/g);
				Ks={};
				KS=[];
				for(i=0; i<C.length; i++){
					// We do this because in some servers it is not K XX but C XX and others ... 
					// so this will just work everywhere
					xy=C[i].split("|");
					K=new String(Math.floor(xy[1]/100))+new String(Math.floor(xy[0]/100));
					if(typeof Ks[K]=="undefined"){
						KS.push(K);
						Ks[K]=[C[i]];
					}
					else{
						Ks[K].push(C[i]);
					}
				}
				// Add K numbers
				for(i=0; i<KS.length; i++){
					K=KS[i];
					total=Ks[K].length;
					KS[i]+=" ("+total+")";
				}
				// Sort Ks
				KS.sort();
				// As for groups show CMD
				params=TWB_GCMD(lang("fg4"),KS);
				gei("out3",_wd.document).value="";
				for(i=0; i<params.length; i++){
					str=(i>0)?" ":"";
					gei("out3",_wd.document).value+=str+Ks[params[i].split(" (")[0]].join(" ");
				}
				gei("out3",_wd.document).parentNode.parentNode.style.display="";
			}catch(e){log('Village List BB',e);}
		}
	},
	TWB_BBC_BB_ : function(){
		with(twb_.lib){
			_wd=twb_.pWIN;
			try{
				gei("out1",_wd.document).parentNode.parentNode.style.display="none";
				gei("out2",_wd.document).parentNode.parentNode.style.display="none";
				C=gei("out1",_wd.document).value.match(/\d+\|\d+/g);
				Ks={};
				KS=[];
				for(i=0; i<C.length; i++){
					// We do this because in some servers it is not K XX but C XX and others ... 
					// so this will just work everywhere
					xy=C[i].split("|");
					K=new String(Math.floor(xy[1]/100))+new String(Math.floor(xy[0]/100));
					if(typeof Ks[K]=="undefined"){
						KS.push(K);
						Ks[K]=[C[i]];
					}
					else{
						Ks[K].push(C[i]);
					}
				}
				// Add K numbers
				for(i=0; i<KS.length; i++){
					K=KS[i];
					total=Ks[K].length;
					KS[i]+=" ("+total+")";
				}
				// Sort Ks
				KS.sort();
				// As for groups show CMD
				params=TWB_GCMD(lang("fg4"),KS);
				gei("out3",_wd.document).value="";
				for(i=0; i<params.length; i++){
					str=(i>0)?"\n":"";
					gei("out3",_wd.document).value+=str+Ks[params[i].split(" (")[0]].join(" ").replace(/(\d+\|\d+)/g,"[village]$1[/village]\n").replace(/\s/g,'');
				}
				gei("out3",_wd.document).parentNode.parentNode.style.display="";
			}catch(e){log('Village List BB',e);}
		}
	},
	TWB_Aunique : function(T){
		with(twb_.lib){
			var r = new Array();
			o:for(var i=0, n=T.length; i<n; i++){
				for(var x=0, y=r.length; x<y; x++){
					if(r[x]==T[i]){
						continue o;
					}
				}
				r[r.length] = T[i];
			}
			return r;
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.BBC=="undefined"){
				Engines.State.add_p("BBC","TWB_BBC()","*",false);
			}
		}
	}
});
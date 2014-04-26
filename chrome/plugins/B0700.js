// @Plugin = Map Enhancements
// @Version = 1.0
// @Icons = 0
merge(twb_.lib,{
	TWB_ADDM : function(imx,imy,retrp){
		with(twb_.lib){
			try{
				srcz1=(retrp==2)?"buildings/":"map/axe_";
				srcz2=(retrp==1)?"attack":((retrp==2)?"barracks":"return");
				WD=win();
				imt=dce("img",WD);
				imt.setAttribute("src","graphic/"+srcz1+srcz2+".png");
				imt.style.position="absolute";
				di=dce("div",WD);
				di.style.position="absolute";
				di.style.width="37px";
				di.style.height="37px";
				di.className="lay1";
				di.appendChild(imt);
				$x=$xp("id('map_x_axis')/td[2]",9).innerHTML;
				$y=$xp("id('mapCoords')/tbody/tr[1]/td[1]",9).innerHTML;
				imx=imx-$x;
				imy=imy-$y;
				HOLDER=$xp("//*[@id='tile_"+imx+"_"+imy+"']/img",9);
				if(HOLDER!==null){
					HOLDER.parentNode.insertBefore(di,HOLDER);
				}
			}catch(e){log('Map Enhancements',e);}
		}
	},
	TWB_Map_Icons : function(){
		with(twb_.lib){
			try{
				if(twb() && TWB_Scr()=="map"){
					dta=data.cache;
					if(typeof dta!="undefined"){
						for(vil in dta){
							for(i=0; i<dta[vil].length; i++){
								if(dta[vil][i].formtype=="rattack" || dta[vil][i].formtype=="rsupport"){
									co=getC(dta[vil][i].name);
									TWB_ADDM(co[1],co[2],"0");
								}
								else{
									if(dta[vil][i].formtype!="support"){
										co=dta[vil][i].targetcoords;
										if(typeof co=="undefined"){co=getC(dta[vil][i].label);}
										if(dta[vil][i].formtype=="farm"){
											TWB_ADDM(co[0],co[1],"2");
										}
										else{
											TWB_ADDM(co[0],co[1],"1");
										}
									}
								}
							}
						}
					}
				}
			}catch(e){log('Map Enhancements',e);}
		}
	},
	TWB_Move_Map : function(xa){
		with(twb_.lib){
			try{
				if(twb()){
					scr=TWB_Scr();
					if(scr=="map"){
						zes=zew=win();
						if(zes){
							scsrc="startMapScroll('"+xa+"');";
							sc=dce("script",zes);
							sc.type='text/javascript';
							txt=zes.document.createTextNode(scsrc);
							sc.appendChild(txt);
							zes.document.childNodes[1].appendChild(sc);
						}
					}
				}
				if(content.location.href.match(TWB_Map_Server())){
					switch(xa){
						case 'west' : Z="mov(data.xcord-data.width,data.ycord);"; break;
						case 'east' : Z="mov((data.xcord*1+data.width*1),data.ycord);"; break;
						case 'north' : Z="mov(data.xcord,data.ycord-data.height);"; break;
						case 'sout' : Z="mov(data.xcord,data.ycord*1+data.height*1);"; break;
					}
					D=content.document;
					sc=dce("script",zes);
					sc.type='text/javascript';
					txt=zes.document.createTextNode(Z);
					sc.appendChild(txt);
					D.childNodes[1].appendChild(sc);
				}
			}catch(e){log('Map Enhancements',e);}
		}
	},
	TWB_Mapi : function(){
		with(twb_.lib){
			if($get_var("hivi")=="true"){
				squares=$xp("//table/tbody/tr/td/table/tbody/tr/td/div/div/table/tbody/tr/td/img",6);
				for(j=0; j<squares.length; j++){
					// Check if its a village
					nbL=squares[j].src.match(/(v\d)\.png/);
					if(nbL!=null){
						nbL=nbL[1];
						VID=squares[j].parentNode.firstChild.href.match(/id=(\d+)/)[1];
						// Do we own that village?
						if(gei(VID)){
							squares[j].src="http://twbooster.com/phpBB3/twb/icons/vils/"+nbL+"_"+TWB_ICOVIL(VID)+".gif";
						}
					}
				}
			}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.mapi=="undefined"){
				Engines.State.add_p("mapi","TWB_Mapi()","screen=map",false);
			}
		}
	},
});
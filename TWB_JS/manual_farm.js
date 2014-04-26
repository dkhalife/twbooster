// @Name = Manual Farm
// @Shortcut = 1
// @TWB = true

/*
	This script does not support the auto calculate units parameters
	It does however support the wildcard and catapult targets
	
	Optional Requirement for this script :
	- Farms setup using the farm tool
	
	How it works:
	- When on a map, navigate to a village and when u are on its info screen run this script
	- Two cases occur :
			If that village is already one of your farms, it will be attacked by the current 
		village using the troops setup of that farm
			If it isn't it will use default troops to send and attack it
*/

merge(twb_.lib,{
	TWB_Man_Farm : function(){
		with(twb_.lib){
			Engines.State.kill_p("man_farm");
			dt=Dfarms[twb_.fman_];
			if(typeof dt=="undefined"){
				pr=$get_var("faiun");
			}
			else{
				pr=dt.troops;
			}
			spt=$xp("//*[@name='spear']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			swt=$xp("//*[@name='sword']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			axx=$xp("//*[@name='axe']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			arz=$xp("//*[@name='archer']",9);
			arz=(arz===null)?0:arz.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			sct=$xp("//*[@name='spy']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			lig=$xp("//*[@name='light']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			marr=$xp("//*[@name='marcher']",9);
			marr=(marr===null)?0:marr.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			hiv=$xp("//*[@name='heavy']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			rrt=$xp("//*[@name='ram']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			cat=$xp("//*[@name='catapult']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			nob=$xp("//*[@name='snob']",9).parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			kit=$xp("//*[@name='knight']",9);
			kit=(kit===null)?0:kit.parentNode.childNodes[4].innerHTML.match(/\d+/)[0]-(-1)-1;
			n1=pr.match(/\d+s/);
			if(n1!==null){
				n1=n1[0].replace("s","");
			}
			else{
				if(pr.match("s")===null){
					n1="0";
				}
				else{
					n1=1;
				}
			}
			n1=sm(n1,sct);
			n2=pr.match(/\d+r/);
			if(n2!==null){
				n2=n2[0].replace("r","");
			}
			else{
				if(pr.match("r")===null){
					n2="0";
				}
				else{
					n2=1;
				}
			}
			n2=sm(n2,rrt);
			n3=pr.match(/\d+p/);
			if(n3!==null){
				n3=n3[0].replace("p","");
			}
			else{
				if(pr.match("p")===null){
					n3="0";
				}
				else{
					n3=1;
				}
			}
			n3=sm(n3,spt);
			n4=pr.match(/\d+w/);
			if(n4!==null){
				n4=n4[0].replace("w","");
			}
			else{
				if(pr.match("w")===null){
					n4="0";
				}
				else{
					n4=1;
				}
			}
			n4=sm(n4,swt);
			n5=pr.match(/\d+l/);
			if(n5!==null){
				n5=n5[0].replace("l","");
			}
			else{
				if(pr.match("l")===null){
					n5="0";
				}
				else{
					n5=1;
				}
			}
			n5=sm(n5,lig);
			n6=pr.match(/\d+x/);
			if(n6!==null){
				n6=n6[0].replace("x","");
			}
			else{
				if(pr.match("x")===null){
					n6="0";
				}
				else{
					n6=1;
				}
			}
			n6=sm(n6,axx);
			n7=pr.match(/\d+e/);
			if(n7!==null){
				n7=n7[0].replace("e","");
			}
			else{
				if(pr.match("e")===null){
					n7="0";
				}
				else{
					n7=1;
				}
			}
			n7=sm(n7,arz);
			n8=pr.match(/\d+m/);
			if(n8!==null){
				n8=n8[0].replace("m","");
			}
			else{
				if(pr.match("m")===null){
					n8="0";
				}
				else{
					n8=1;
				}
			}
			n8=sm(n8,marr);
			n9=pr.match(/\d+h/);
			if(n9!==null){
				n9=n9[0].replace("h","");
			}
			else{
				if(pr.match("h")===null){
					n9="0";
				}
				else{
					n9=1;
				}
			}
			n9=sm(n9,hiv);
			n10=pr.match(/\d+c/);
			if(n10!==null){
				n10=n10[0].replace("c","");
			}
			else{
				if(pr.match("c")===null){
					n10="0";
				}
				else{
					n10=1;
				}
			}
			n10=sm(n10,cat);
			n11=pr.match(/\d+n/);
			if(n11!==null){
				n11=n11[0].replace("c","");
			}
			else{
				if(pr.match("n")===null){
					n11="0";
				}
				else{
					n11=1;
				}
			}
			n11=sm(n11,nob);
			n12=pr.match(/\d+k/);
			if(n12!==null){
				n12=n12[0].replace("k","");
			}
			else{
				if(pr.match("k")===null){
					n12="0";
				}
				else{
					n12=1;
				}
			}
			n12=sm(n12,kit);
			n1=new Number(n1+"");
			n2=new Number(n2+"");
			n3=new Number(n3+"");
			n4=new Number(n4+"");
			n5=new Number(n5+"");
			n6=new Number(n6+"");
			n7=new Number(n7+"");
			n8=new Number(n8+"");
			n9=new Number(n9+"");
			n10=new Number(n10+"");
			n11=new Number(n11+"");
			n12=new Number(n12+"");
			MIN=$get_var("minun");
			// Wildcard
			if(pr.match(/\*/)){
				choice=TWB_RRHC({n5:lig,n6:axx,n8:marr,n9:hiv,n3:spt,n4:swt,n7:arz},{n5:n5>0,n6:n6>0,n8:n8>0,n9:n9>0,n3:n3>0,n4:n4>0,n7:n7>0});
				if(choice){
					switch(choice[0]){
						case "n1" : n1=choice[1]; break;
						case "n2" : n2=choice[1]; break;
						case "n3" : n3=choice[1]; break;
						case "n4" : n4=choice[1]; break;
						case "n5" : n5=choice[1]; break;
						case "n6" : n6=choice[1]; break;
						case "n7" : n7=choice[1]; break;
						case "n8" : n8=choice[1]; break;
						case "n9" : n9=choice[1]; break;
						case "n10" : n10=choice[1]; break;
						case "n11" : n11=choice[1]; break;
					}
				}
			}
			if(n1>0){$xp("//*[@name='spy']",9).value=n1;}
			if(n2>=MIN){$xp("//*[@name='ram']",9).value=n2;}
			if(n3>=MIN){$xp("//*[@name='spear']",9).value=n3;}
			if(n4>=MIN){$xp("//*[@name='sword']",9).value=n4;}
			if(n5>=MIN){$xp("//*[@name='light']",9).value=n5;}
			if(n6>=MIN){$xp("//*[@name='axe']",9).value=n6;}
			if($xp("//*[@name='archer']",9)!==null && n7>=MIN){$xp("//*[@name='archer']",9).value=n7;}
			if($xp("//*[@name='marcher']",9)!==null && n8>=MIN){$xp("//*[@name='marcher']",9).value=n8;}
			if(n9>=MIN){$xp("//*[@name='heavy']",9).value=n9;}
			if(n10>=MIN){$xp("//*[@name='catapult']",9).value=n10;}
			if(n11>=MIN){$xp("//*[@name='snob']",9).value=n11;}
			if($xp("//*[@name='knight']",9)!==null && n12>0){$xp("//*[@name='knight']",9).value=n12;}
			catx=pr.match(/=(\w+)=/);
			if(catx){
				pr=pr.replace(catx[0],"");
			}
			twb_.cat=(catx)?catx[1]:"";
			if(n1>0 || n2>=MIN || n3>=MIN || n4>=MIN || n5>=MIN || n6>=MIN || n7>=MIN || n8>=MIN || n9>=MIN || n10>=MIN || n11>=MIN || n12>0){
				twb_.lastFunc="farm";
				$xp("//*[@type='submit']",9).click();
				// Add closing process
				Engines.State.add_p("man_farm","TWB_Man_Close()","game",false);
			}
			else{
				// Close immediately
				TWB_Man_Close();
			}
		}
	},
	TWB_Man_Close : function(){
		with(twb_.lib){
			if(TWB_URL().match("try=confirm")){
				win("target="+twb_.fman_).close();
				delete twb_.fman_;
				Engines.State.kill_p("man_farm");
			}
		}
	}
});

with(twb_.lib){
	if(TWB_Scr()=="info_village"){
		link=$xp("//a[contains(@href,'target=')]",9).href;
		twb_.fman_=link.match(/target=(\d+)/)[1];
		Engines.State.add_p("man_farm","TWB_Man_Farm()","game",false);
		TWB_All_Url(link, 1, 1);
	}
}
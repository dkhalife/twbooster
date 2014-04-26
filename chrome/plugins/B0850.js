// @Plugin = Forum Enhancer
// @Version = 1.2
// @Icons = 0
merge(twb_.lib,{
	TWB_FMGR : function(Y){
		with(twb_.lib){
			try{
				if(twb() && (TWB_Mode(TWB_URL(1))=="forum" || TWB_URL().match("forum.php"))){
					try{
						twb_.DDX=twb_.pWIN.frames[0];
					}catch(e){
						// Forum either in full screen or reloaded
						twb_.DDX=twb_.pWIN;
					}
					// Fix for undefined bug
					if(typeof twb_.DDX=="undefined"){
						twb_.DDX=twb_.pWIN;
					}
					// Get list of threads
					forums=$xp("//span[contains(@class,'forum')]",6,twb_.DDX.document);
					// Add ignore button
					IMG=[]
					for(i=0; i<forums.length; i++){
						FID=forums[i].childNodes[1].href.match(/forum_id=(\d+)/)[1];
						IMG[i]=dce("a",twb_.DDX);
						IMG[i].href="javascript:;";
						IMG[i].innerHTML="<img name='"+FID+"' border=0 height=15 width=15 src='"+host+"images/min.jpg'>";
						IMG[i].addEventListener("click",TWB_FMDL,false);
						forums[i].appendChild(IMG[i]);
						if($get_var("ajaxf")=="true"){
							// Add ajax to switch forums
							forums[i].childNodes[1].href="javascript:void('"+forums[i].childNodes[1].href+"');";
							forums[i].childNodes[1].addEventListener("click",TWB_FMLL,false);
						}
					}
					// Add ajax to switch topics + page changes
					if($get_var("ajaxf")=="true"){
						topics=$xp("//a[contains(@href,'view_thread') and not(contains(@href,'answer'))]",6,twb_.DDX.document);
						for(i=0; i<topics.length; i++){
							topics[i].href="javascript:void('"+topics[i].href+"');";
							topics[i].addEventListener("click",TWB_FMLL,false);
						}
					}
					// Retrive setting
					fsets=TWB_OVE("forums_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					TWB_FMDL(0,fsets);
				}
			}catch(e){log('Forum Enhancer',e);}
		}
	},
	TWB_FMLL : function(e){
		with(twb_.lib){
			try{
				e=e.target;
				e=(e.nodeName=="IMG")?e.parentNode:e;
				url=e.href.match(/\('(.+)'\)/)[1];
				// Set loading img
				img="<div align=center><BR><B><u><b><font size=5>"+lang("loading")+'</font></b></u><BR><br><image style="padding: 0em 2em 0em 2em;" src="http://twbooster.com/server/load.gif"/></span><BR>';
				body=$xp("//table[@class='main']",9,twb_.DDX.document).innerHTML=img;
				// Load in Ajax
				$.ajax({url:url,async:true,success:function(hrml){
					hrml=hrml.split('<body id="ds_body" >')[1].split("</body>")[0];
					twb_.DDX.document.body.innerHTML=hrml;
					TWB_FMGR();
				}}).responseText;
			}catch(e){log('Forum Enhancer',e);}
		}
	},
	TWB_FMDL : function(e,IDs){
		with(twb_.lib){
			try{
				if(typeof IDs!="undefined"){
					// Hide forums
					for(i=0; i<IDs.length; i++){
						FID=IDs[i];
						forum=$xp("//img[@name='"+[IDs[i]]+"']",9,twb_.DDX.document);
						if(typeof forum!="undefined"){
							FNM=forum.parentNode.previousSibling.previousSibling.innerHTML;
							forum.parentNode.parentNode.style.display="none";
							// Put Max button + tooltip = forum name
							A=dce("A",twb_.DDX);
							A.href="javascript:;";
							A.innerHTML="<img id='"+FID+"' border=0 width=15 height=15 title='"+FNM+"' src='"+host+"images/max.jpg"+"'>";
							A.addEventListener("click",TWB_FRES,false);
							DIV=forum.parentNode.parentNode.parentNode;
							DIV.insertBefore(A,forum.parentNode.parentNode);
						}
					}
				}
				else{
					e=e.target;
					F=e.parentNode.previousSibling.previousSibling;
					// GET ID and name
					FID=F.href.match(/forum_id=(\d+)/)[1];
					FNM=F.innerHTML;
					// Save to file
					fsets=TWB_OVE("forums_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					fsets.push(FID);
					TWB_S(uneval(fsets),"forums_"+TWB_World(0)+"["+twb_myID+"].twb");
					F.parentNode.style.display="none";
					// Put Max button + tooltip = forum name
					A=dce("A",twb_.DDX);
					A.href="javascript:;";
					A.innerHTML="<img id='"+FID+"' border=0 width=15 height=15 title='"+FNM+"' src='"+host+"images/max.jpg"+"'>";
					A.addEventListener("click",TWB_FRES,false);
					DIV=F.parentNode.parentNode;
					DIV.insertBefore(A,F.parentNode);
				}
			}catch(e){log('Forum Enhancer',e);}
		}
	},
	TWB_FRES : function(e){
		with(twb_.lib){
			try{
				e=e.target;
				forum=e.parentNode.nextSibling;
				if(typeof forum!="undefined"){
					fsets=TWB_OVE("forums_"+TWB_World(0)+"["+twb_myID+"].twb",[]);
					FID=e.getAttribute("id");
					tmp=[];
					for(i=0; i<fsets.length; i++){
						if(fsets[i]!=FID){
							tmp.push(fsets[i]);
						}
					}
					fsets=tmp;
					delete tmp;
					TWB_S(uneval(fsets),"forums_"+TWB_World(0)+"["+twb_myID+"].twb");
					forum.style.display="";
					// Remove max image
					A=e.parentNode;
					A.parentNode.removeChild(A);
				}
			}catch(e){log('Forum Enhancer',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.tfmngr=="undefined"){
				// Only run on forum
				Engines.State.add_p("tfmngr","TWB_FMGR()","*",false);
				TWB_New_Set("main",[lang("ajaxf"),{id:"ajaxf",type:"checkbox",checked:"ajaxf"}]);
			}
		}
	}
});
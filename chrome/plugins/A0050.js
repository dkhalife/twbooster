// @Plugin = Voice Recognition Expansion Pack
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	TWB_WClose : function(){
		content.window.close();
	},
	TWB_CC : function(){
		with(twb_.lib){
			T1=window.content;
			D1=xp("//div[@id='BuildingSummary']",9,T1.document);
			if(D1){
				return window.content;
			}
			for(i=0; i<gBrowser.mTabs.length; i++){
				T2=gBrowser.browsers[i].contentWindow;
				D2=xp("//div[@id='BuildingSummary']",9,T2.document);
				if(D2){
					gBrowser.selectedTab=gBrowser.mTabs[i];
					return T2;
				}
			}
			return false;
		}
	},
	TWB_WBuild : function(){
		with(twb_.lib){
			D=TWB_CC();
			if(D){
				D.wrappedJSObject.showhide("BuildingSummary");
			}
		}
	},
	TWB_WTroop : function(){
		with(twb_.lib){
			D=TWB_CC();
			if(D){
				D.wrappedJSObject.showhide("TroopSummary");
			}
		}
	},
	TWB_WMove : function(){
		with(twb_.lib){
			D=TWB_CC();
			if(D){
				D.wrappedJSObject.showhide("Movements");
			}
		}
	},
	TWB_WTech : function(){
		with(twb_.lib){
			D=TWB_CC();
			if(D){
				D.wrappedJSObject.showhide("Research");
			}
		}
	},
	TWB_WQueues : function(){
		with(twb_.lib){
			D=TWB_CC();
			if(D){
				D.wrappedJSObject.showhide("Queues");
			}
		}
	},
	TWB_WWrite : function(DX){
		with(twb_.lib){
			try{
				geez=Application.activeWindow;
				geez=geez.activeTab;
				if(geez.document.activeElement.nodeName=="#document" || geez.document.activeElement.nodeName=="FRAME"){
					geez=win(geez.document.location.hostname);
					if(geez){
						geez=geez.main.document;
						geez=geez.activeElement;
					}
				}
				else{
					geez=geez.document.activeElement;
				}
				if(geez.nodeName=="TEXTAREA" || geez.nodeName=="INPUT" || geez.nodeName=="textbox"){
					if(DX=="delete"){
						geez.value="";
					}
					else{
						geez.value+=DX;
					}
				}
			}catch(e){log('Voice Recog +',e);}
		}
	},
	TWB_NTW : function(v){
		with(twb_.lib){
			for(wordx in numbers){
				if(numbers[wordx]==v){
					return wordx;
				}
			}
			return ;
		}
	},
	TWB_WTN : function(v){
		with(twb_.lib){
			if(isNaN(v)){
				try{
					f_str="0";
					// Remove hundreds and thousands
					for(word in numbers){
						if(v.match(word+" "+TWB_NTW(100))){
							f_str+="+"+numbers[word]+"*100";
							v=v.replace(word+" "+TWB_NTW(100),"");
						}
						if(v.match(word+" "+TWB_NTW(1000))){
							f_str+="+"+numbers[word]+"*1000";
							v=v.replace(word+" "+TWB_NTW(1000),"");
						}
					}
					// Trim whitespaces
					v=v.replace(/\s+/g,' ');
					v=v.split(/\s/g);
					// Word matching
					for(i=0; i<v.length; i++){
						word=v[i].toLowerCase();
						if(numbers[word]){
							f_str+="+"+numbers[word];
						}
					}
					return eval(f_str);
				}catch(e){}
				// In case something was caught
				return 0;
			}
			else{
				return v;
			}
		}
	}
});

// Dictionary
merge(twb_.lib.dictionary,{
	"close" : "TWB_WClose()",
	"build summary" : "TWB_WBuild()",
	"unit summary" : "TWB_WTroop()",
	"move summary" : "TWB_WMove()",
	"research summary" : "TWB_WTech()",
	"queues summary" : "TWB_WQueues()"
});

// Numbers
merge(twb_.lib,{
	numbers : {
		"zero" : 0,
		"one" : 1,
		"two" : 2,
		"three" : 3,
		"four" : 4,
		"five" : 5,
		"six" : 6,
		"seven" : 7,
		"eight" : 8,
		"nine" : 9,
		"ten" : 10,
		"eleven" : 11,
		"twelve" : 12,
		"thriteen" : 13,
		"fourteen" : 14,
		"fifteen" : 15,
		"sixteen" : 16,
		"seventeen" : 17,
		"eighteen" : 18,
		"nineteen" : 19,
		"twenty" : 20,
		"thirty" : 30,
		"fourty" : 40,
		"fifty" : 50,
		"sixty" : 60,
		"seventy" : 70,
		"eighty" : 80,
		"nighty" : 90,
		"hundred" : 100,
		"thousand" : 1000
	}
});
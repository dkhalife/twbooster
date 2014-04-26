function startTimer(){
	T=document.getElementsByTagName("span");
	for(i=0; i<T.length; i++){
		if(T[i].className=="timer"){
			window.setInterval("updateTimer('"+T[i].getAttribute("name")+"')",1000);
			T[i].className="";
		}
	}
}

function updateTimer(v){
	v=document.getElementsByName(v)[0];
	if(typeof v!="undefined"){
		t=v.textContent.split(":");
		h=t[0];
		m=t[1];
		s=t[2];
		s--;
		if(s<0 && (m>0 || (m==0 && h>0))){
			m--;
			s=59;
		}
		if(m<0 && h>0){
			h--;
			m=59;
		}
		if(h<0){
			h=0;
		}
		if(s<0){
			s=0;
		}
		// Format time
		h=new Number(h);
		m=new Number(m);
		s=new Number(s);
		h=h<10?"0"+h:h;
		m=m<10?"0"+m:m;
		s=s<10?"0"+s:s;
		v.innerHTML=h+":"+m+":"+s;
	}
}
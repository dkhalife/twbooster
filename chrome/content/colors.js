function onOK(){
	img=document.getElementsByTagName("image");
	for(i=0; i<img.length; i++){
		if(img[i].clicked){
			window.arguments[1].out=img[i].src.match(/\d+/)[0];
		}
	}
}
function onCancel(){
	window.arguments[1].out=null;
}
function onLoad(){
	document.title=window.arguments[0];
	img=document.getElementsByTagName("image");
	for(i=0; i<img.length; i++){
		img[i].style.opacity=0.4;
		img[i].addEventListener("mouseover",function(){
			this.style.opacity=1;
		},false);
		img[i].addEventListener("mouseout",function(){
			if(!this.clicked){
				this.style.opacity=0.4;
			}
		},false);
		img[i].addEventListener("click",function(){
			imgz=document.getElementsByTagName("image");
			for(i=0; i<imgz.length; i++){
				imgz[i].clicked=false;
				imgz[i].style.opacity=0.4;
			}
			this.clicked=true;
			this.style.opacity=1;
		},false);
	}
}

/* Move to current Desktop
setY = window.screen.height - window.screen.availTop;
setX = window.screen.width - window.screen.availLeft;
window.moveTo(setX, setY);*/
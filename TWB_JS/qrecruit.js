// @Name = Smart Quick Recruit
// @Shortcut = 1
// @TWB = true

/*
	Requirements for this script :
	- TWB Quick Recruit Plugin
	- TWB Quick Recruit Must be Opened First
	- Set your configuration below as to maximum number of troop per unit in a village
	- Make sure your queues summary is UP TO DATE before using this as it relies on it 
	  to calculate the troops to recruit
*/

merge(twb_.lib,{
	configuration:[0,0,5900,0,50,2900,250,0,350,0],
	units:["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult"],
	costs:[[50,30,10,1],[30,30,70,1],[60,30,40,1],[100,30,60,1],[50,50,20,2],[125,100,250,4],[250,100,150,5],[200,150,600,6], [300,200,200,5],[320,400,100,8]],

	arrayMin : function(array){
		var value=array[0];
		for (var t=1;t<array.length;t++){
			if (array[t]<value){
				value=array[t];
			}
		}
		return value;
	},
	linearDivideArray : function(array1, array2){
		var value=[];
		if (array1.length==array2.length){
			for (var t=0;t<array1.length;t++){
				if (array2[t]!=0){
					value[t]=array1[t]*1.0/array2[t];
				}
				else{
					value[t]=0;
				}
			}
		}
		return value;
	}
});

with(twb_.lib){
	resources=[parseInt($gei("wood").innerHTML.replace(".",""),10),parseInt($gei("stone").innerHTML.replace(".",""),10),parseInt($gei("iron").innerHTML.replace(".",""),10),$gei("pop_max").innerHTML-$gei("pop_current").innerHTML];
	data.queues=TWB_Get("queues");
	VIL=local.curVillage;
	_D=(typeof data.queues[VIL]=="object")?data.queues[VIL]:new Object();
	_W=twb_.qT;
	produced=[];
	queued=[];
	values=[];
	total_costs=[0,0,0,0];
	for(i=0; i<configuration.length; i++){
		if(typeof _D.spear!="undefined"){
			produced[i]=_W.document.getElementById("_"+units[i]).value;
			queued[i]=_D[units[i]];
			V_=configuration[i]-produced[i]-queued[i];
			values[i]=sm(V_,0,1);
			for (var j=0;j<4;j++){
				total_costs[j]-=-costs[i][j]*values[i];
			}
		}
	}
	var factor=arrayMin(linearDivideArray(resources,total_costs));
	if (factor>1.0){
		factor=1.0;
	}
	for(i=0; i<units.length; i++){
		var number=values[i]*factor;
		if (number<0){
			number=0;
		}
		if(number>0){
			_W.document.getElementById(units[i]).value=parseInt(number,10);
		}
	}
}
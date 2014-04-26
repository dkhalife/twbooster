// @Name = Clean Identical Reports
// @Shortcut = 0
// @TWB = true

/*
	@Author = Enduo
	@Description = This script allows you to delete reports that are identical in title except the newest one
*/

with(twb_.lib){
	if(TWB_Scr()=="report"){
		text=[];
		reports=$xp("//a[contains(@href,'view=')]",6);
		for(i=0; i<reports.length; i++){
			text.push(reports[i].textContent.replace(/\s+/g," "));
		}
		for(i=0; i<reports.length; i++){
			index=text.indexOf(reports[i].textContent.replace(/\s+/g," "));
			if(index<i){
				$xp("//input[@type='checkbox']",6)[i].setAttribute("checked",true);
			}
		}
		if($xp("//input[@checked='true']",6).length>0){
			$xp("//*[@name='del']",9).click();
		}
	}
}
// @Plugin = Village Calculator
// @Version = 1.0
// @Icons = 0

// Translation
merge(twb_.lib,{
	VLF_variables : {},
	VLF_Read : function(a){
		with(twb_.lib){
			if(typeof VLF_variables[a]!="undefined"){
				return VLF_variables[a];
			}
			return null;
		}
	},
	VLF_Save : function(a,b){
		with(twb_.lib){
			VLF_variables[a]=b;
			TWB_S(uneval(VLF_variables),"vlf_"+TWB_World(0)+"["+twb_myID+"].twb");
		}
	},
	VLF_createField : function(){
		with(twb_.lib){
			try{
				var tab = gei("units_table",twb_.pWIN.document);
				var row = dce("tr",twb_.pWIN);
				row.setAttribute('width', 'auto');
				tab.insertBefore(row, tab.firstChild);
				
				var cell = dce("td",twb_.pWIN);
				cell.setAttribute("colspan", tab.getElementsByTagName("th").length + 1);
				cell.innerHTML = "Objective: ";
				row.appendChild(cell);
				
				var field_filter = dce("input",twb_.pWIN);
				field_filter.type = "text";
				field_filter.id = "filter";
				field_filter.size = "7";
				cell.appendChild(field_filter);
				cell.innerHTML += " From: ";

				var field_ambit = dce("input",twb_.pWIN);
				field_ambit.type = "text";
				field_ambit.size = "16";
				field_ambit.id = "beginTime";
				cell.appendChild(field_ambit);
				cell.innerHTML += " To: ";
				
				var field_ambit = dce("input",twb_.pWIN);
				field_ambit.type = "text";
				field_ambit.size = "16";
				field_ambit.id = "endTime";
				cell.appendChild(field_ambit);
				cell.innerHTML += " Villages: ";

				var select = dce('select',twb_.pWIN);
				select.id = "unitNumber";
				var option1 = dce('option',twb_.pWIN);
				option1.text = "All"
				option1.value = null;
				select.add(option1,null);
				var option2 = dce('option',twb_.pWIN);
				option2.text = "Pens";
				option2.value = "full";
				select.add(option2, null);
				var option3 = dce('option',twb_.pWIN);
				option3.text = "Fejki";
				option3.value = "fakes";
				select.add(option3, null);
				cell.appendChild(select);
				cell.innerHTML += "  Speed:";

				var speeds = ["35", "30", "22", "18", "11", "10", "9"];
				var select = dce('select',twb_.pWIN);
				select.id = "unitSpeed";
				for (var i = 0 ; i < 6; i++) {
					var option = dce('option',twb_.pWIN);
					option.text = speeds[i];
					option.value = speeds[i];
					select.add(option,null);
				}
				cell.appendChild(select);
				cell.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
				
				var field_ambit = dce("input",twb_.pWIN);
				field_ambit.type = "button";
				field_ambit.id = "confirm";
				field_ambit.value = "Filter";
				cell.appendChild(field_ambit);
				cell.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				
				var field_ambit = dce("input",twb_.pWIN);
				field_ambit.type = "button";
				field_ambit.id = "sendTimes";
				field_ambit.value = "Time sent";
				cell.appendChild(field_ambit);
				
				twb_.pWIN.addEventListener("click", function(event) { 
					if (event.target.id == "confirm") {filter_done = false; VLF_filter();}
					else if (event.target.id == "sendTimes") VLF_calculateSendTimes(); 
				}, true);
				VLF_fillSaved();
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_calculateSendTimes: function(){
		with(twb_.lib){
			try{
				var initialTime = VLF_Read("arrivalTime") != null ? VLF_Read("arrivalTime") : "";
				var arrivalTime = prpt("Time to reach troops:", initialTime);
				if(!arrivalTime){
					return;
				}
				var unitSpeed = gei("unitSpeed",twb_.pWIN.document).value;
				var tbody = gei("units_table",twb_.pWIN.document).tBodies[0];
				var rows = tbody.getElementsByTagName('tr');
				var target = gei("filter",twb_.pWIN.document).value;
				if (!target.match(/[0-9]+[|,\/ ]{1}[0-9]+/)) return;
				var targetX = parseInt(target.split(/[|,\/ ]/)[0]);
				var targetY = parseInt(target.split(/[|,\/ ]/)[1]);
				var arrivalTimeArray = arrivalTime.split(/[- :]/g);
				if (arrivalTimeArray.length == 7) {
					var j = 0;
					for (j = 0; j < 7; j++) {
						if (arrivalTimeArray[j] != parseInt(arrivalTimeArray[j])) break;
					}
					if (j == 7) {
						VLF_Save('arrivalTime', arrivalTime);
					} else {
						alert("Bad time format");
						return;
					}
				} else {
					alert("Bad time format");
					return
				}
				arrivalTime = new Date(arrivalTimeArray[2], arrivalTimeArray[1] - 1, arrivalTimeArray[0]);
				arrivalTime.setHours(arrivalTimeArray[3]);
				arrivalTime.setMinutes(arrivalTimeArray[4]);
				arrivalTime.setSeconds(arrivalTimeArray[5]);
				arrivalTime.setMilliseconds(arrivalTimeArray[6]);
				for( i = 1; i < this.rows.length-1; i+=2 ) {
					if (rows[i].style.display != "none") {
						var villageName = rows[i].textContent;
						var coords = villageName.substring(villageName.lastIndexOf("(") + 1, villageName.lastIndexOf(")"));
						var villageX = coords.split("|")[0];
						var villageY = coords.split("|")[1];
						var distance = Math.sqrt(Math.pow(targetX - villageX, 2) + Math.pow( targetY - villageY, 2));
						var travelTime = distance * unitSpeed * 60 * 1000;
						travelTime = travelTime / 1000;
						travelTime = Math.round(travelTime);
						travelTime = travelTime * 1000;
						var launchTime = new Date();
						launchTime.setTime(arrivalTime.getTime() - travelTime);
						if (rows[i+1].lastChild.nodeType == 3) {
							var cell = dce("td",twb_.pWIN);
							rows[i+1].appendChild(cell);
						}
						rows[i+1].lastChild.innerHTML = launchTime.format("d.m\u00a0H:i:s:x");
						rows[i+1].lastChild.id = -launchTime.getTime();
					} else {
						rows[i+1].lastChild.id = 0;
					}
				}
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_fillSaved : function() {
		with(twb_.lib){
			try{
				gei("beginTime",twb_.pWIN.document).value = VLF_Read("beginTime") != null ? VLF_Read("beginTime") : "";
				gei("endTime",twb_.pWIN.document).value = VLF_Read("endTime") != null ? VLF_Read("endTime") : "";
				gei("filter",twb_.pWIN.document).value = gei("vlf_coords",twb_.pWIN.document).name;
				gei("unitNumber",twb_.pWIN.document).selectedIndex = VLF_Read("unitNumber") != null ? VLF_Read("unitNumber") : 0;
				gei("unitSpeed",twb_.pWIN.document).selectedIndex = VLF_Read("unitSpeed") != null ? VLF_Read("unitSpeed") : 0;
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_saveForm : function() {
		with(twb_.lib){
			VLF_Save( 'beginTime', gei("beginTime",twb_.pWIN.document).value);
			VLF_Save( 'endTime', gei("endTime",twb_.pWIN.document).value);
			VLF_Save( 'calculatorTarget', gei("filter",twb_.pWIN.document).value);
			VLF_Save( 'unitNumber', gei("unitNumber",twb_.pWIN.document).selectedIndex);
			VLF_Save( 'unitSpeed', gei("unitSpeed",twb_.pWIN.document).selectedIndex);
		}
	},
	VLF_checkArmy : function(tableRow ) { 
		with(twb_.lib){
			try{
				var cells = tableRow.getElementsByTagName('td');
				var spaceSum = 0;
				var machinePresent = false;
				if (cells.length == 15 || cells.length == 14) {
					var space = [1, 1, 1, 1, 2, 4, 5, 6, 6, 8, 10, 100];
					var spaceSum = 0;
					for (i = 0; i < 12; i++ ) {
						spaceSum += (parseInt(cells[1 + i].textContent) * space[i]);
					}
					machinePresent = (parseInt(cells[9].textContent) > 0 || parseInt(cells[10].textContent) > 0)
				} else if (cells.length == 12) {
					var space = [1, 1, 1, 2, 4, 6, 6, 8, 100];
					var spaceSum = 0;
					for (i = 0; i < 9; i++ ) {
						spaceSum += (parseInt(cells[3 + i].textContent) * space[i]);
					}
					machinePresent = (parseInt(cells[9].textContent) > 0 || parseInt(cells[10].textContent) > 0)
				}
				if (gei("unitNumber",twb_.pWIN.document).value == "full") {
					return (spaceSum > 17500);
				} else if  (gei("unitNumber",twb_.pWIN.document).value == "fakes") {
					return (spaceSum > 120 && machinePresent); 
				} else {
					return true;
				}
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_filter : function(){
		with(twb_.lib){
			VLF_saveForm();
			var tbody = gei("units_table",twb_.pWIN.document).tBodies[0];
			var rows = tbody.getElementsByTagName('tr');
			var target = gei("filter",twb_.pWIN.document).value;
			if (!target.match(/[0-9]+[|,\/ ]{1}[0-9]+/)) return;
			var targetX = parseInt(target.split(/[|,\/ ]/)[0]);
			var targetY = parseInt(target.split(/[|,\/ ]/)[1]);
			VLF_checkRows(rows, targetX, targetY);
			var th = tbody.getElementsByTagName('th')[0];	
			if (th.parentNode.textContent.indexOf("Sort") == -1) {
				var newTH = dce("th",twb_.pWIN);
				newTH.innerHTML = "<a href='javascript:sort();'>Sort</a>";
				th.parentNode.appendChild(newTH);
			}
		}
	},
	VLF_rowsComparer : function(a,b) { 
		return a.lastChild.id > b.lastChild.id;	
	},
	VLF_nextRowsComparer : function(a, b) {	
		return a.nextElementSibling.lastChild.id > b.nextElementSibling.lastChild.id;	
	},
	VLF_Backgrounder : function( initialFunc ) {
		with(twb_.lib){
			try{
				this.timeout = null;
				
				this.schedule = function( func ) {
					var self = this;
					this.timeout = setTimeout( function() { self.execute( func ); }, 25 );
				}
				
				this.execute = function( func ) {
					this.timeout = null;
					func();
				}
				
				this.interrupt = function() {
					clearTimeout( this.timeout );
					this.timeout = null;
				}

				this.finished = function() {
					this.interrupt();
				}
				
				if( initialFunc != undefined ) { 
					initialFunc( this );
				}
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_checkRows : function(rows, targetX, targetY) {
		with(twb_.lib){
			try{
				this.inherits_from = VLF_Backgrounder;
				this.inherits_from();


				this.batchSize = 100;
				this.rows = rows;
				this.counter = 0;
				var arrivalTime = new Date();
				var unitSpeed = gei("unitSpeed",twb_.pWIN.document).value;
				
				var currentTime = gei("serverTime",twb_.pWIN.document).textContent;
				var currentDate = gei("serverDate",twb_.pWIN.document).textContent;
				var array =  (currentTime+" "+currentDate).split(/[: \/]/);
				var currentTime = new Date(array[5], array[4]-1, array[3], array[0], array[1], array[2], "0");
					
				var beginTime = gei("beginTime",twb_.pWIN.document).value != "" ? gei("beginTime",twb_.pWIN.document).value : "01-01-1970 00:00";
				var endTime = gei("endTime",twb_.pWIN.document).value != "" ? gei("endTime",twb_.pWIN.document).value : "31-12-2040 23:59";

				var beginTimeArray = beginTime.split(/[- :]/g);
				var endTimeArray = endTime.split(/[- :]/g);
				
				beginTime = new Date(beginTimeArray[2], beginTimeArray[1] - 1, beginTimeArray[0]);
				beginTime.setHours(beginTimeArray[3]);
				beginTime.setMinutes(beginTimeArray[4]);

				endTime = new Date(endTimeArray[2], endTimeArray[1] - 1, endTimeArray[0]);
				endTime.setHours(endTimeArray[3]);
				endTime.setMinutes(endTimeArray[4]);
				
				this.process = function( i ) {
					if( i < this.rows.length -1 ) {
						for( j = i; j < i + this.batchSize && j < this.rows.length-1; j+=2 ) {
							var villageName = rows[j].textContent;
							var coords = villageName.substring(villageName.lastIndexOf("(") + 1, villageName.lastIndexOf(")"));
							var villageX = coords.split("|")[0];
							var villageY = coords.split("|")[1];
							
							var distance = Math.sqrt(Math.pow(targetX - villageX, 2) + Math.pow( targetY - villageY, 2));
							var travelTime = distance * unitSpeed * 60 * 1000;
							arrivalTime.setTime(currentTime.getTime() + travelTime);
							
							if ( arrivalTime.getTime() >= beginTime.getTime() && arrivalTime.getTime() <= endTime.getTime() && VLF_checkArmy(rows[j+1]) ) {
								rows[j].removeAttribute('style');
								rows[j+1].removeAttribute('style');	
								var link = rows[j+1].getElementsByTagName('a')[0];
								link.href = link.href.replace(/place(&)?[^&]*/, "place&coords=" + gei('filter',twb_.pWIN.document).value);
								if (rows[j+1].lastChild.nodeType == 3) {
									var cell = dce("td",twb_.pWIN);
									rows[j+1].appendChild(cell);
								}
								rows[j+1].lastChild.innerHTML = arrivalTime.format("d.m\u00a0H:i");
								rows[j+1].lastChild.id = arrivalTime.getTime();
								this.counter++;
							} else {
								rows[j].style.display = "none";
								rows[j+1].style.display = "none";
								if (rows[j+1].lastChild.nodeType == 3) {
									var cell = dce("td",twb_.pWIN);
									rows[j+1].appendChild(cell);
								}
								rows[j+1].lastChild.id = arrivalTime.getTime();
							}	
						}
						var self = this;
						var nextBitOfWork = function() { self.process( i+self.batchSize ) };
						this.schedule( nextBitOfWork );
					} else {
						document.getElementsByTagName('th')[1].innerHTML = ("Wioska (" + this.counter +")");
					}
				}
				this.process( 1 );
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_reorderTable : function( tbody, array1, array2 ) {
		with(twb_.lib){
			try{
				this.inherits_from = VLF_Backgrounder;
				this.inherits_from();

				this.array1 = array1;
				this.array2 = array2;
				this.batchSize = 25;

				this.process = function( i ) {
					if( i < this.array1.length ) {
						for( j = i; j < i+this.batchSize && j < this.array1.length; ++j ) {
							tbody.appendChild(array1[j]);
							tbody.appendChild(array2[j]);
						}
						var self = this;
						var nextBitOfWork = function() { self.process( i+self.batchSize ) };
						this.schedule( nextBitOfWork );
					}
				}
				this.process( 0 );
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_Launch : function(){
		with(twb_.lib){
			try{
				// entry point
				if (TWB_Scr()=="place" && TWB_URL().match(/coords/)) {
					var coords = TWB_URL().substring(TWB_URL().indexOf("coords") + 7);
					var x = coords.split(/[|,\/ ]/)[0];
					var y = coords.split(/[|,\/ ]/)[1];
					gei("inputx",twb_.pWIN.document).value = x;
					gei("inputy",twb_.pWIN.document).value = y;		
				} 
				if (TWB_Scr()=="info_village") {
					var td = gei('content_value',twb_.pWIN.document);
					var table = td.getElementsByTagName('table')[0];
					var newRow = dce("tr",twb_.pWIN);
					var newCell = dce("td",twb_.pWIN);
					newCell.setAttribute("colspan", "2");
					//var coords = table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent;
					var coords = $xp("//table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]",9).innerHTML;
					var ah = dce("a",twb_.pWIN);
					ah.innerHTML="» Enter Calculator";
					ah.href="javascript:;"
					ah.id="vlf_coords";
					ah.name=coords;
					ah.addEventListener("click",VLF_Click,false);
					newCell.appendChild(ah);
					newRow.appendChild(newCell);
					table.getElementsByTagName('tbody')[0].appendChild(newRow);
				} 
				/*if(TWB_Scr()=="overview_villages" && TWB_Mode()=="units" && TWB_URL().match("type=own_home")){
					VLF_createField();
				}*/
			}catch(e){log('Calculator',e);}
		}
	},
	VLF_Click : function(e){
		with(twb_.lib){
			try{
				//coords=e.target.id;
				// Hide hyperlink
				e.target.parentNode.parentNode.style.display="none";
				// Create units table
				table=dce("table",twb_.pWIN);
				table.id="units_table";
				table.className="vis";
				tbody=dce("tbody",twb_.pWIN);
				tr1=dce("tr",twb_.pWIN);
				th1=dce("th",twb_.pWIN);
				th1.innerHTML=lang("TWB-Village");
				tr1.appendChild(th1);
				th2=dce("th",twb_.pWIN);
				th2.innerHTML="&nbsp;";
				tr1.appendChild(th2);
				th3=dce("th",twb_.pWIN);
				th3.width="35";
				img3=dce("img",twb_.pWIN);
				img3.src="graphic/unit/unit_spear.png?1";
				th3.appendChild(img3);
				tr1.appendChild(th3);
				th4=dce("th",twb_.pWIN);
				th4.width="35";
				img4=dce("img",twb_.pWIN);
				img4.src="graphic/unit/unit_sword.png?1";
				th4.appendChild(img4);
				tr1.appendChild(th4);
				th5=dce("th",twb_.pWIN);
				th5.width="35";
				img5=dce("img",twb_.pWIN);
				img5.src="graphic/unit/unit_axe.png?1";
				th5.appendChild(img5);
				tr1.appendChild(th5);
				if(TWB_WorldSet("game/archer")!=0){
					th6=dce("th",twb_.pWIN);
					th6.width="35";
					img6=dce("img",twb_.pWIN);
					img6.src="graphic/unit/unit_archer.png?1";
					th6.appendChild(img6);
					tr1.appendChild(th6);
				}
				
				th7=dce("th",twb_.pWIN);
				th7.width="35";
				img7=dce("img",twb_.pWIN);
				img7.src="graphic/unit/unit_spy.png?1";
				th7.appendChild(img7);
				tr1.appendChild(th7);
				th8=dce("th",twb_.pWIN);
				th8.width="35";
				img8=dce("img",twb_.pWIN);
				img8.src="graphic/unit/unit_light.png?1";
				th8.appendChild(img8);
				tr1.appendChild(th8);
				if(TWB_WorldSet("game/archer")!=0){
					th9=dce("th",twb_.pWIN);
					th9.width="35";
					img9=dce("img",twb_.pWIN);
					img9.src="graphic/unit/unit_marcher.png?1";
					th9.appendChild(img9);
					tr1.appendChild(th9);
				}
				
				th9=dce("th",twb_.pWIN);
				th9.width="35";
				img9=dce("img",twb_.pWIN);
				img9.src="graphic/unit/unit_heavy.png?1";
				th9.appendChild(img9);
				tr1.appendChild(th9);
				th10=dce("th",twb_.pWIN);
				th10.width="35";
				img10=dce("img",twb_.pWIN);
				img10.src="graphic/unit/unit_ram.png?1";
				th10.appendChild(img10);
				tr1.appendChild(th10);
				th11=dce("th",twb_.pWIN);
				th11.width="35";
				img11=dce("img",twb_.pWIN);
				img11.src="graphic/unit/unit_catapult.png?1";
				th11.appendChild(img11);
				tr1.appendChild(th11);
				if(TWB_WorldSet("game/knight")!=0){
					th12=dce("th",twb_.pWIN);
					th12.width="35";
					img12=dce("img",twb_.pWIN);
					img12.src="graphic/unit/unit_knight.png?1";
					th12.appendChild(img12);
					tr1.appendChild(th12);
				}
				th13=dce("th",twb_.pWIN);
				th13.width="35";
				img13=dce("img",twb_.pWIN);
				img13.src="graphic/unit/unit_snob.png?1";
				th13.appendChild(img13);
				tr1.appendChild(th13);
				th14=dce("th",twb_.pWIN);
				th14.innerHTML=lang("act");
				tr1.appendChild(th14);
				tbody.appendChild(tr1);
				C=cN(gei("TWB-Villages"));
				for(o=0; o<C.length; o++){
					dta=data.units;
					if(typeof dta[C[o].id]=="undefined"){
						// Skip village
						continue;
					}
					dta=dta[C[o].id];
					tr=dce("tr",twb_.pWIN);
					td=dce("td",twb_.pWIN);
					td.valign="top";
					td.setAttribute("rowspan","2");
					span=dce("span",twb_.pWIN);
					span.id="label_"+C[o].id;
					aa=dce("a",twb_.pWIN);
					aa.href="/game.php?village="+C[o].id+"&amp;screen=overview";
					span2=dce("span",twb_.pWIN);
					span2.id="label_text_"+C[o].id;
					span2.innerHTML=TWB_GA(C[o])+" "+C[o].getAttribute("tooltiptext");
					aa.appendChild(span2);
					aa2=dce("a",twb_.pWIN);
					aa2.href="javascript:editToggle('label_"+C[o].id+"', 'edit_"+C[o].id+"')";
					img=dce("img",twb_.pWIN);
					img.src="graphic/rename.png?1";
					aa2.appendChild(img);
					span.appendChild(aa);
					span.appendChild(aa2);
					span2=dce("span",twb_.pWIN);
					span2.style.display="none";
					span2.id="edit_"+C[o].id;
					input=dce("input",twb_.pWIN);
					input.addEventListener("keydown",function(){ if(event.keyCode==13){this.nextSibling.click();} return false; },false);
					input.value=TWB_GA(C[o])+" "+C[o].getAttribute("tooltiptext");
					input.id="edit_input_"+C[o].id;
					input2=dce("input",twb_.pWIN);
					input2.type="button";
					input2.addEventListener('click',function(){ twb_.pWIN.editSubmitNew('label_"+C[o].id+"', 'label_text_"+C[o].id+"', 'edit_"+C[o].id+"', 'edit_input_"+C[o].id+"', '/game.php?village="+C[o].id+"&amp;screen=main&amp;ajax=change_name'); },false);
					input2.value=lang("ok");
					span2.appendChild(input);
					span2.appendChild(input2);
					td.appendChild(span);
					td.appendChild(span2);
					tr.appendChild(td);
					tr_=dce("tr",twb_.pWIN);
					td_1=dce("td",twb_.pWIN);
					td_1.innerHTML="-";
					tr_.appendChild(td_1);
					td_2=dce("td",twb_.pWIN);
					td_2.innerHTML=dta.spear;
					if(dta.spear<1){
						td_2.className="hidden";
					}
					tr_.appendChild(td_2);
					td_3=dce("td",twb_.pWIN);
					td_3.innerHTML=dta.sword;
					if(dta.sword<1){
						td_3.className="hidden";
					}
					tr_.appendChild(td_3);
					td_4=dce("td",twb_.pWIN);
					td_4.innerHTML=dta.axe;
					if(dta.axe<1){
						td_4.className="hidden";
					}
					if(TWB_WorldSet("game/archer")!=0){
						tr_.appendChild(td_4);
						td_5=dce("td",twb_.pWIN);
						td_5.innerHTML=dta.archer;
						if(dta.archer<1){
							td_5.className="hidden";
						}
					}
					tr_.appendChild(td_5);
					td_6=dce("td",twb_.pWIN);
					td_6.innerHTML=dta.spy;
					if(dta.spy<1){
						td_6.className="hidden";
					}
					tr_.appendChild(td_6);
					td_7=dce("td",twb_.pWIN);
					td_7.innerHTML=dta.light;
					if(dta.light<1){
						td_7.className="hidden";
					}
					if(TWB_WorldSet("game/archer")!=0){
						tr_.appendChild(td_7);
						td_8=dce("td",twb_.pWIN);
						td_8.innerHTML=dta.marcher;
						if(dta.marcher<1){
							td_8.className="hidden";
						}
						tr_.appendChild(td_8);
					}
					td_9=dce("td",twb_.pWIN);
					td_9.innerHTML=dta.heavy;
					if(dta.heavy<1){
						td_9.className="hidden";
					}
					tr_.appendChild(td_9);
					td_10=dce("td",twb_.pWIN);
					td_10.innerHTML=dta.ram;
					if(dta.ram<1){
						td_10.className="hidden";
					}
					tr_.appendChild(td_10);
					td_11=dce("td",twb_.pWIN);
					td_11.innerHTML=dta.catapult;
					if(dta.catapult<1){
						td_11.className="hidden";
					}
					tr_.appendChild(td_11);
					if(TWB_WorldSet("game/knight")!=0){
						td_12=dce("td",twb_.pWIN);
						td_12.innerHTML=dta.knight;
						if(dta.knight<1){
							td_12.className="hidden";
						}
						tr_.appendChild(td_12);
					}
					td_13=dce("td",twb_.pWIN);
					td_13.innerHTML=dta.snob;
					if(dta.snob<1){
						td_13.className="hidden";
					}
					tr_.appendChild(td_13);
					td_14=dce("td",twb_.pWIN);
					ae=dce("a",twb_.pWIN);
					ae.href="/game.php?village="+C[o].id+"&amp;screen=place";
					ae.innerHTML=lang("com");
					td_14.appendChild(ae);
					tr_.appendChild(td_14);
					tbody.appendChild(tr);
					tbody.appendChild(tr_);
				}
				table.appendChild(tbody);
				BEFO=$xp("//*[@id='content_value']/table",9).nextSibling;
				BEFO.parentNode.insertBefore(table,BEFO);
				// Launch
				VLF_createField();
				// Add function
				twb_.pWIN.sort = function sort() {
					var tbody = gei("units_table",twb_.pWIN.document).tBodies[0];
					var rows = tbody.getElementsByTagName('tr');
					var villageNames = Array();
					var villageArmys = Array();
					for (var i = 1; i < rows.length-1; i+=2) villageNames[(i-1)/2] = rows[i];
					for (var i = 2; i < rows.length; i+=2) villageArmys[(i-2)/2] = rows[i];
					villageNames.sort(VLF_nextRowsComparer);
					villageArmys.sort(rowsComparer);	
					VLF_reorderTable(tbody, villageNames, villageArmys);
				}
			}catch(e){log('Calculator',e);}
		}
	},
	init : function(){
		with(twb_.lib){
			if(typeof Engines.State.processes.VLF=="undefined"){
				// Load variables
				VLF_variables=TWB_OVE("vlf_"+TWB_World(0)+"["+twb_myID+"].twb",{});
				Engines.State.add_p("VLF","VLF_Launch()","*",false);
				Date.prototype.format = function(format){
					var returnStr = '';
					var replace = Date.replaceChars;
					for (var i = 0; i < format.length; i++) {
						var curChar=format.charAt(i);
						if (replace[curChar]) { 
							returnStr += replace[curChar].call(this);
						} else { 
							returnStr+=curChar;
						}
					}
					return returnStr;
				}
				Date.replaceChars={
					d:function(){return(this.getDate()<10?'0':'')+this.getDate();},
					D:function(){return Date.replaceChars.shortDays[this.getDay()];},
					j:function(){return this.getDate();},
					l:function(){return Date.replaceChars.longDays[this.getDay()];},
					N:function(){return this.getDay();},
					S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},
					w:function(){return this.getDay();},z:function(){return"Not Yet Supported";},
					F:function(){return Date.replaceChars.longMonths[this.getMonth()];},
					m:function(){return(this.getMonth()+1<10?'0':'')+(this.getMonth()+1);},
					M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},
					n:function(){return this.getMonth();},t:function(){return"Not Yet Supported";},
					Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},
					a:function(){return this.getHours()<12?'am':'pm';},
					A:function(){return this.getHours()<12?'AM':'PM';},
					g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},
					h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},
					H:function(){return(this.getHours()<10?'0':'')+this.getHours();},
					i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},
					x:function(){return  (this.getMilliseconds() < 100 ? "0" + (this.getMilliseconds() < 10 ? "0" : "") : "") + this.getMilliseconds()  },
					s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},
					O:function(){return(this.getTimezoneOffset()<0?'-':'+')+(this.getTimezoneOffset()/60<10?'0':'')+(this.getTimezoneOffset()/60)+'00';},
					Z:function(){return this.getTimezoneOffset()*60;},
					r:function(){return this.toString();},
					U:function(){return this.getTime()/1000;}
				}
			}
		}
	}
});
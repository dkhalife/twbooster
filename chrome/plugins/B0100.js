// @Plugin = Time Conversion Tool
// @Version = 1.1
// @Icons = 0
merge(twb_.lib,{
	Into24hrs : function(time){
		if(time>1440){
			 time -= 1440
		}
		else{
			if(time<0){ 
				time = 1440+time
			}
		}
		return time;
	},
	GMTnow : function(GMT){
		with(twb_.lib){
			var time = new Date();
			hrs = time.getHours();
			mins = time.getMinutes();
			GMT = (hrs*60 + mins) - GMToffset;
			GMT = Into24hrs(GMT);
			return GMT;
		}
	},
	CheckDST : function(){
		with(twb_.lib){
			var uNow = new Date();
			var uMonth = uNow.getMonth();
			var uDate = uNow.getDate();
			var uDay = uNow.getDay();
			var FirstSun8Feb = ( (uMonth == 1 && uDate > 14) || uMonth > 1 ) ? true : false;
			if ((uMonth == 1)&&(uDate >= 8)) {
				var DaysLeft = 14  - uDate;
				FirstSun8Feb = (uDay + DaysLeft <= 6) ? true : false;
			}
			var FirstSun15Mar = ( (uMonth == 2 && uDate > 21) || uMonth > 2 ) ? true : false;
			if ((uMonth == 2)&&(uDate >= 15)) {
				DaysLeft = 21  - uDate;
				FirstSun15Mar = (uDay + DaysLeft <= 6) ? true : false;
			}
			var LastSunMar = (uMonth > 2) ? true : false;
			if ((uMonth == 2)&&(uDate >= 25)) {
				DaysLeft = 31  - uDate;
				LastSunMar = (uDay + DaysLeft <= 6) ? true : false;
			}
			var FirstSunApr = ( (uMonth == 3 && uDate > 7) || uMonth > 3 ) ? true : false;
			if ((uMonth == 3)&&(uDate <= 7)) {
				var DaysGone = 7  - uDate;
				FirstSunApr = (uDay - DaysGone >0) ? true : false;
			}
			var LastSunSep = (uMonth > 8) ? true : false;
			if ((uMonth == 8)&&(uDate >= 24)) {
				DaysLeft = 30  - uDate;
				LastSunSep = (uDay + DaysLeft <= 6) ? true : false;
			}
			var FirstSunOct = ( (uMonth == 9 && uDate > 7) || uMonth > 9  ) ? true : false;
			if (uMonth == 9 && uDate <= 7) {
				DaysGone = 7  - uDate;
				FirstSunOct = (uDay - DaysGone >0) ? true : false;
			}
			var FirstSun15Oct = ( (uMonth == 9)&&(uDate > 21) || (uMonth > 9) ) ? true : false;
			if ( uMonth == 9 && (uDate >= 15 || uDate <= 21) ) {
				DaysLeft = 21  - uDate;
				FirstSun15Oct = (uDay + DaysLeft <= 6) ? true : false;
			}
			var LastSunOct = (uMonth > 9) ? true : false;
			if ((uMonth == 9)&&(uDate >= 25)) {
				DaysLeft = 31  - uDate;
				LastSunOct = (uDay + DaysLeft <= 6) ? true : false;
			}
			dstZones[0] = "X";
			dstZones[1] = "?";
			dstZones[2] =  (FirstSunApr && !LastSunOct) ? "Y" : "N";//usa/canada
			dstZones[3] =  (LastSunMar && !LastSunOct) ? "Y" : "N";//uk/europe
			dstZones[4] =  (LastSunOct || !LastSunMar) ? "Y" : "N";//aus	
			dstZones[5] =  (FirstSunOct || !LastSunMar) ? "Y" : "N";//aus-tasmania
			dstZones[6] =  (FirstSunOct || !FirstSun15Mar) ? "Y" : "N";//nz
			dstZones[7] =  (LastSunMar && !LastSunSep) ? "Y" : "N";//russia
		}
	},
	getTime : function(ZoneData){
		with(twb_.lib){
			var qGMTparse = parseFloat(ZoneData);
			var qGMToffset_hrs = parseInt(qGMTparse, 10) ; 
			var qGMToffset_min= parseInt ( Math.round((qGMTparse-qGMToffset_hrs) * 100), 10);
			var qDSTperiod = ZoneData.charAt (ZoneData.length - 1);
			var qGMTperiod = 1440/60;
			if ( (qGMToffset_hrs > 12) || (qGMToffset_hrs <-11) ) {qReport[0] = "BAD DATA"; return};
			if (qDSTperiod > dstZones.length) {qReport[3] = "BAD DATA"};
			var relGMT = (qGMToffset_hrs * 60) + qGMToffset_min; 
			time = GMTnow()+relGMT;
			var fHours = Math.floor (time/60) ;
			var fMins = time - (fHours * 60);
			var ret = new Date();
			ret.setHours(fHours);
			ret.setMinutes(fMins);
			return ret;
		}
	}
});
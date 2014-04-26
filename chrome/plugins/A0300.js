// @Plugin = Link Watcher
// @Version = 2.1
// @Icons = 0

merge(twb_.lib,{
	_VALID : {
		settings : {
			"" : ["change_profile","change_text"],
			"profile" : ["change_profile","change_text"],
			"email" : ["change_email"],
			"settings" : ["change_settings","set_image_base"],
			"notify" : ["change_notifications"],
			"quickbar" : ["quickbar_save_global","quickbar_reset","quickbar_insert_linebreak","quickbar_edit","del"],
			"quickbar_edit" : [],
			"award" : ["change_award_settings","change_award_show"],
			"move" : [],
			"delete" : ["delete"],
			"share" : ["add_shared","del_shared"],
			"vacation" : ["sitter_offer_cancel","sitter_offer"],
			"logins" : [],
			"change_passwd" : ["change_passwd"],
			"poll" : [],
			"ticket" : [],
		},
		info_member : {
			"" : []
		},
		info_command : {
			"" : []
		},
		ally : {
			"" : ["exit"],
			"overview" : ["exit"],
			"profile" : ["exit"],
			"members" : ["exit"],
			"contracts" : ["exit"],
			"reservations" : ["exit"],
			"forum" : ["exit"]
		},
		overview_villages : {
			"" : ["change_page_size","bulk_edit_villages"],
			"combined" : ["change_page_size"],
			"prod" : ["change_page_size"],
			"trader" : ["change_page_size"],
			"units" : ["change_page_size"],
			"commands" : ["change_page_size"],
			"incomings" : ["change_page_size"],
			"buildings" : ["change_page_size"],
			"tech" : ["change_page_size"],
			"groups" : ["change_page_size","bulk_edit_villages"]
		},
		snob : {
			"" : ["train","reserve","coin"]
		},
		overview : {
			"" : ["set_visual"]
		},
		train : {
			"" : ["train"],
			"train" : ["train"],
			"mass" : ["train"]
		},
		map : {
			"" : ["activate_group","ajax_set_map_size"]
		},
		buddies : {
			"" : ["delete_buddy","cancel_buddy","add_buddy"]
		},
		memo : {
			"" : ["edit"]
		},
		mail : {
			"" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","answer"],
			"in" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","answer"],
			"mass_out" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","answer"],
			"new" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","answer"],
			"block" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","block_id","answer"],
			"address" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","answer"],
			"groups" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","answer"],
			"view" : ["set_filter","del_move_multiple","get_addresses","get_ally_members","get_buddies","send","block_name","unblock","add_address_name","del_address","add_group","rename_delete_group","forward_redirect","delete","export","answer"],
			"affront" : [],
		},
		report : {
			"" : [],
			"all" : ["change_page_size","del_arch","del_all","del_once"],
			"attack" : ["change_page_size","del_arch","del_all","del_once"],
			"defense" : ["change_page_size","del_arch","del_all","del_once"],
			"support" : ["change_page_size","del_arch","del_all","del_once"],
			"trade" : ["change_page_size","del_arch","del_all","del_once"],
			"other" : ["change_page_size","del_arch","del_all","del_once"],
			"forwarded" : ["change_page_size","del_arch","del_all","del_once"],
			"filter" : ["filter"],
			"block" : ["unblock","block"],
			"forward" : ["change_page_size","del_arch","del_all","del_once"],
			"move" : ["change_page_size","del_arch","del_all","del_once"],
			"publish" : ["change_page_size","del_arch","del_all","del_once"],
			"public" : ["change_page_size","del_arch","del_all","del_once"],
			"group_create" : ["change_page_size","del_arch","del_all","del_once"]
		},
		ranking : {
			"" : [],
			"ally" : [],
			"player" : [],
			"con_ally" : [],
			"con_player" : [],
			"kill_player" : [],
			"kill_ally" : [],
			"awards" : []
		},
		premium : {
			"" : [],
			"help" : [],
			"premium" : [],
			"points" : [],
			"transfer" : [],
			"log" : [],
			"free" : [],
		},
		main : {
			"" : ["build","destroy"],
			"build" : ["build"],
			"destroy" : ["destroy"],
		},
		barracks : {
			"" : ["train"]
		},
		stable : {
			"" : ["train"]
		},
		garage : {
			"" : ["train"]
		},
		smith : {
			"" : ["research","remove"]
		},
		place : {
			"" : [],
			// Check first 2 with attacks and support in other villages (bi-directional to both villages)
			// Some might also fall under the empty clause
			"command" : [],
			"units" : [],
			"sim" : [],
		},
		market : {
			"" : [],
			"send" : [],
			"own_offer" : [],
			"other_offer" : [],
			"traders" : [],
			"all_own_offer" : [],
		},
		wood : {
			"" : []
		},
		stone : {
			"" : []
		},
		iron : {
			"" : []
		},
		farm : {
			"" : []
		},
		storage : {
			"" : []
		},
		hide : {
			"" : []
		},
		wall : {
			"" : []
		},
		church : {
			"" : []
		},
		church_f : {
			"" : []
		},
		statue : {
			"" : []
		},
		// Invisible
		info_player : {
			"" : []
		},
		info_village : {
			"" : []
		},
		info_ally : {
			"" : []
		},
		"" : {
			"": ["logout"] 
		}
	},
	TWB_Link_Check : function(_UL,_WD){
		with(twb_.lib){
			rexop1=new RegExp(local.TWB_Lang+("\\w+\\."+TWB_CWORLD()+"/staemme\\.php"));
			rexop2=new RegExp(local.TWB_Lang+("\\w+\\."+TWB_CWORLD()+"/game\\.php"));
			if(!((rexop1 && rexop1.test(_UL)===true) || (rexop2 && rexop2.test(_UL)===true))){
				// We are not on TW, exit
				return;
			}
			if(_UL.match("game.php") || _UL.match("staemme.php")){
				try{scr=_UL.match(/screen=(\w+)/)[1];}catch(e){scr="";}
				try{mode==_UL.match(/mode=(\w+)/)[1];}catch(e){mode="";}
				try{action==_UL.match(/action=(\w+)/)[1];}catch(e){action="";}
				log("","[Catch] => screen="+scr+",mode="+mode+",action="+action,4);
				if(scr==""){
					return;
				}
				if(typeof _VALID[scr]=="undefined"){
					// No exceptions set for this URL
					TWB_Catch_Link(_UL,_WD);
					log("","Caught screen="+scr,4);
					return;
				}
				if(typeof _VALID[scr][mode]=="undefined"){
					// Not specified in list of valid modes, catch
					TWB_Catch_Link(_UL,_WD);
					log("","Caught mode="+mode,4);
					return;
				}
				// No action is OK
				if(action==""){
					return;
				}
				if(_VALID[scr][mode].indexOf(action)==-1){
					// Not specified in list of valid actions, catch
					TWB_Catch_Link(_UL,_WD);
					log("","Caught action="+action,4);
					return;
				}
			}
		}
	},
	TWB_Catch_Link : function(_UL,_WD){
		with(twb_.lib){
			_WD.stop();
			_WD.document.title=lang("iaction");
			_WD.document.body.innerHTML='<table width="800" style="margin: 25px auto auto; border-collapse: collapse;" class="navi-border"><tbody><tr><td><table width="800" align="center" class="main"><tbody><tr><td align=center><img src="http://twbooster.com/phpBB3/styles/prosilver/imageset/twblogo.gif"><br></td></tr><tr><td><h2>'+lang("iaction")+'</h2><p>'+lang("iaction_msg")+'</p><a target="_parent" href="javascript:history.go(-1)">'+lang("back")+'</a></td></tr></tbody></table></td></tr></tbody></table>';
		}
	}
});
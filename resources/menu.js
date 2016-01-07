
var actionVDAPL = Ext.create('Ext.Action', {
    itemId:             'actionVDAPL',
    text:               'Платформа',
    iconCls:            'icon-weather_cloud',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdapl_jrnl');
			if(j==null){
				j=VDAPL_Jrnl();
				j.iconCls='icon-weather_cloud';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDAPPR = Ext.create('Ext.Action', {
    itemId:             'actionVDAPPR',
    text:               'Статус модерации',
    iconCls:            'icon-accept',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdappr_jrnl');
			if(j==null){
				j=VDAPPR_Jrnl();
				j.iconCls='icon-accept';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDAST = Ext.create('Ext.Action', {
    itemId:             'actionVDAST',
    text:               'Статус объявления',
    iconCls:            'icon-pause_green',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdast_jrnl');
			if(j==null){
				j=VDAST_Jrnl();
				j.iconCls='icon-pause_green';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDBRW = Ext.create('Ext.Action', {
    itemId:             'actionVDBRW',
    text:               'Браузеры',
    iconCls:            'icon-world_link',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdbrw_jrnl');
			if(j==null){
				j=VDBRW_Jrnl();
				j.iconCls='icon-world_link';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDCAT = Ext.create('Ext.Action', {
    itemId:             'actionVDCAT',
    text:               'Категории',
    iconCls:            'icon-chart_organisation',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdcat_jrnl');
			if(j==null){
				j=VDCAT_Jrnl();
				j.iconCls='icon-chart_organisation';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDCN = Ext.create('Ext.Action', {
    itemId:             'actionVDCN',
    text:               'Страны',
    iconCls:            'icon-world',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdcn_jrnl');
			if(j==null){
				j=VDCN_Jrnl();
				j.iconCls='icon-world';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDCST = Ext.create('Ext.Action', {
    itemId:             'actionVDCST',
    text:               'Статус кампании',
    iconCls:            'icon-pause_blue',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdcst_jrnl');
			if(j==null){
				j=VDCST_Jrnl();
				j.iconCls='icon-pause_blue';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDDEV = Ext.create('Ext.Action', {
    itemId:             'actionVDDEV',
    text:               'Устройства',
    iconCls:            'icon-device_stylus',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vddev_jrnl');
			if(j==null){
				j=VDDEV_Jrnl();
				j.iconCls='icon-device_stylus';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDFRMT = Ext.create('Ext.Action', {
    itemId:             'actionVDFRMT',
    text:               'Формат объявления',
    iconCls:            'icon-page_white_code_red',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdfrmt_jrnl');
			if(j==null){
				j=VDFRMT_Jrnl();
				j.iconCls='icon-page_white_code_red';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDINTER = Ext.create('Ext.Action', {
    itemId:             'actionVDINTER',
    text:               'Интересы',
    iconCls:            'icon-drive_cdr',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdinter_jrnl');
			if(j==null){
				j=VDINTER_Jrnl();
				j.iconCls='icon-drive_cdr';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDMSTAT = Ext.create('Ext.Action', {
    itemId:             'actionVDMSTAT',
    text:               'Семейное положение',
    iconCls:            'icon-group',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdmstat_jrnl');
			if(j==null){
				j=VDMSTAT_Jrnl();
				j.iconCls='icon-group';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDOS = Ext.create('Ext.Action', {
    itemId:             'actionVDOS',
    text:               'ОС',
    iconCls:            'icon-computer',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdos_jrnl');
			if(j==null){
				j=VDOS_Jrnl();
				j.iconCls='icon-computer';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDPOS = Ext.create('Ext.Action', {
    itemId:             'actionVDPOS',
    text:               'Должности',
    iconCls:            'icon-user_orange',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdpos_jrnl');
			if(j==null){
				j=VDPOS_Jrnl();
				j.iconCls='icon-user_orange';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDPT = Ext.create('Ext.Action', {
    itemId:             'actionVDPT',
    text:               'Тип оплаты',
    iconCls:            'icon-money_dollar',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdpt_jrnl');
			if(j==null){
				j=VDPT_Jrnl();
				j.iconCls='icon-money_dollar';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDREL = Ext.create('Ext.Action', {
    itemId:             'actionVDREL',
    text:               'Религии',
    iconCls:            'icon-weather_cloudy_rain',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdrel_jrnl');
			if(j==null){
				j=VDREL_Jrnl();
				j.iconCls='icon-weather_cloudy_rain';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDRG = Ext.create('Ext.Action', {
    itemId:             'actionVDRG',
    text:               'Регионы',
    iconCls:            'icon-chart_pie',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdrg_jrnl');
			if(j==null){
				j=VDRG_Jrnl();
				j.iconCls='icon-chart_pie';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDT = Ext.create('Ext.Action', {
    itemId:             'actionVDT',
    text:               'Города',
    iconCls:            'icon-building',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdt_jrnl');
			if(j==null){
				j=VDT_Jrnl();
				j.iconCls='icon-building';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVDTT = Ext.create('Ext.Action', {
    itemId:             'actionVDTT',
    text:               'Типы задач',
    iconCls:            'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vdtt_jrnl');
			if(j==null){
				j=VDTT_Jrnl();
				j.iconCls='icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKADS = Ext.create('Ext.Action', {
    itemId:             'actionVKADS',
    text:               'Рекламное объявление',
    iconCls:            'icon-photo',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vkads_jrnl');
			if(j==null){
				j=VKADS_Jrnl();
				j.iconCls='icon-photo';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
				
				
				var view = j.items.getAt(0).getView();
				var tip = Ext.create('Ext.tip.ToolTip', {
					// The overall target element.
					target: view.el,
					// Each grid row causes its own separate show and hide.
					delegate: view.itemSelector,
					// Moving within the row should not hide the tip.
					trackMouse: true,
					// Render immediately so that tip.body can be referenced prior to the first show.
					renderTo: Ext.getBody(),
					listeners: {
						// Change content dynamically depending on which element triggered the show.
						beforeshow: function updateTipBody(tip) {
							var rec=view.getRecord(tip.triggerElement);
							/*  Ext.Ajax.request({
								   url:  rec.get('vk_adinfo_preview_link'),
								   success: function (result, request) {
									console.log(result);
									//var jsonData = Ext.util.JSON.decode(result.responseText);
									 tip.body.dom.innerHTML = jsonData;
									 //tip.update( result);
									
								   },
								   fail:function(){
									tip.update( rec.get('vk_adinfo_name'));
								   }
								  });
							*/
							
							
							/*var html= '<style>'+
							'a {  text-decoration: none;}'+
							'.ad_title {  font-weight: bold;  font-size: 11px;  margin: 0px 3px;  margin-top: 6px;  color: #36638E;  text-align: center}'+
							'.ad_domain {  margin-top: 3px;  font-size: 10px;  color: #909090;}.ad_box img {  margin-top: 9px}'+
							'.ad_desc {  margin: 0px 2px;  margin-top: 10px;  color: #000000;}'+
							'a.ad_box:hover {  text-decoration: none;}</style>'+
							*/
							var html='<div style="font-family: tahoma,arial,verdana,sans-serif; width:118px; font-weight: bold; margin: 0px 3px;  margin-top: 6px; font-size: 11px;  color: #36638E; background:#ffffff; text-align: center">'+rec.get('vk_adinfo_name')+'</div>';
							
							
							if(rec.get('vk_adinfo__description')!=''){
								html=html+'<div style="width:118px;  margin: 0px 3px; background:#ffffff; text-align: center; " ><img src="'+rec.get('vk_adinfo_image_src')+'" height="65" width="90" /></div>'
								html=html+'<div style="width:118px;  margin: 0px 3px;  font-size: 11px;  color: #000000; background:#ffffff; text-align: center">'+rec.get('vk_adinfo__description')+'</div>'							
							}else{
								html=html+'<div style="width:118px;  margin: 0px 3px; background:#ffffff; text-align: center; " ><img src="'+rec.get('vk_adinfo_image_src')+'" height="120" width="90" /></div>'
							}
							
							//console.log(html);
							//var html='<iframe src="' + rec.get('vk_adinfo_preview_link') + ' height="200" width="130" border="0" ></iframe>';
							tip.update( html);
						}
					}
				});
				
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKBRK = Ext.create('Ext.Action', {
    itemId:             'actionVKBRK',
    text:               'Брокер',
    iconCls:            'icon-money_euro',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vkbrk_jrnl');
			if(j==null){
				j=VKBRK_Jrnl();
				j.iconCls='icon-money_euro';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKCAM = Ext.create('Ext.Action', {
    itemId:             'actionVKCAM',
    text:               'Рекламная кампания',
    iconCls:            'icon-photos',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vkcam_jrnl');
			if(j==null){
				j=VKCAM_Jrnl();
				j.iconCls='icon-photos';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKPRJ = Ext.create('Ext.Action', {
    itemId:             'actionVKPRJ',
    text:               'Рекламный проект',
    iconCls:            'icon-folder_film',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vkprj_jrnl');
			if(j==null){
				j=VKPRJ_Jrnl();
				j.iconCls='icon-folder_film';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKROT = Ext.create('Ext.Action', {
    itemId:             'actionVKROT',
    text:               'Ротация',
    iconCls:            'icon-clock',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vkrot_jrnl');
			if(j==null){
				j=VKROT_Jrnl();
				j.iconCls='icon-clock';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKTRG = Ext.create('Ext.Action', {
    itemId:             'actionVKTRG',
    text:               'Ретаргетинг',
    iconCls:            'icon-group',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vktrg_jrnl');
			if(j==null){
				j=VKTRG_Jrnl();
				j.iconCls='icon-group';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKTSK = Ext.create('Ext.Action', {
    itemId:             'actionVKTSK',
    text:               'Задача',
    iconCls:            'icon-table_row_insert',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vktsk_jrnl');
			if(j==null){
				j=VKTSK_Jrnl();
				j.iconCls='icon-table_row_insert';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionVKUSR = Ext.create('Ext.Action', {
    itemId:             'actionVKUSR',
    text:               'ВК Аккаунт',
    iconCls:            'icon-user_b',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('vkusr_jrnl');
			if(j==null){
				j=VKUSR_Jrnl();
				j.iconCls='icon-user_b';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actionbpdi = Ext.create('Ext.Action', {
        itemId:  'actionbpdi',
        text:   'Интерфейс',
        iconCls:  'icon-application_side_tree',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('bpdi');
			if(j==null){
				j=eval('bpdi_Panel_'+OTEditMode('bpdi')+'(\'{5E0A4979-D5A3-44CA-9E04-C19705B9D8C7}\', true)');
        j.iconCls= 'icon-application_side_tree';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionbpdr = Ext.create('Ext.Action', {
        itemId:  'actionbpdr',
        text:   'Роль сотрудника',
        iconCls:  'icon-chart_org_inverted',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('bpdr');
			if(j==null){
				j=eval('bpdr_Panel_'+OTEditMode('bpdr')+'(\'{06FAA796-00D1-443E-BE0C-F19447CA0C1F}\', true)');
        j.iconCls= 'icon-chart_org_inverted';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZMetaModel = Ext.create('Ext.Action', {
        itemId:  'actionMTZMetaModel',
        text:   'Спец.: Метамодель системы',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtzmetamodel');
			if(j==null){
				j=eval('MTZMetaModel_Panel_'+OTEditMode('MTZMetaModel')+'(\'{88DEEBA4-69B1-454A-992A-FAE3CEBFBCA1}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZSystem = Ext.create('Ext.Action', {
        itemId:  'actionMTZSystem',
        text:   'Спец.: Системные данные',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtzsystem');
			if(j==null){
				j=eval('MTZSystem_Panel_'+OTEditMode('MTZSystem')+'(\'{C5A874A1-1D01-43F5-AA2B-5431031FD45C}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZUsers = Ext.create('Ext.Action', {
        itemId:  'actionMTZUsers',
        text:   'Справочник: пользователи',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtzusers');
			if(j==null){
				j=eval('MTZUsers_Panel_'+OTEditMode('MTZUsers')+'(\'{E0FB5E85-050E-4322-8505-9E0CA132E901}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDAGE = Ext.create('Ext.Action', {
        itemId:  'actionVDAGE',
        text:   'Возрастные ограничения',
        iconCls:  'icon-sport_soccer',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdage');
			if(j==null){
				j=eval('VDAGE_Panel_'+OTEditMode('VDAGE')+'(\'{61D4C4BA-5AAA-4FE6-AFD6-1A8A72781A2C}\', true)');
        j.iconCls= 'icon-sport_soccer';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDAPL = Ext.create('Ext.Action', {
        itemId:  'actionVDAPL',
        text:   'Платформа',
        iconCls:  'icon-weather_cloud',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdapl');
			if(j==null){
				j=eval('VDAPL_Panel_'+OTEditMode('VDAPL')+'(\'{E6FCD40D-6AF3-4540-9410-87D8ED1A0372}\', true)');
        j.iconCls= 'icon-weather_cloud';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDAPPR = Ext.create('Ext.Action', {
        itemId:  'actionVDAPPR',
        text:   'Статус модерации',
        iconCls:  'icon-accept',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdappr');
			if(j==null){
				j=eval('VDAPPR_Panel_'+OTEditMode('VDAPPR')+'(\'{76E323EA-A722-11E5-B975-DCA9718B8B15}\', true)');
        j.iconCls= 'icon-accept';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDAST = Ext.create('Ext.Action', {
        itemId:  'actionVDAST',
        text:   'Статус объявления',
        iconCls:  'icon-pause_green',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdast');
			if(j==null){
				j=eval('VDAST_Panel_'+OTEditMode('VDAST')+'(\'{06597CAD-D21D-48A0-B87D-87572EB8CAED}\', true)');
        j.iconCls= 'icon-pause_green';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDBRW = Ext.create('Ext.Action', {
        itemId:  'actionVDBRW',
        text:   'Браузеры',
        iconCls:  'icon-world_link',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdbrw');
			if(j==null){
				j=eval('VDBRW_Panel_'+OTEditMode('VDBRW')+'(\'{678498A5-EEFE-43A5-8391-A744BBB813E2}\', true)');
        j.iconCls= 'icon-world_link';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDCAT = Ext.create('Ext.Action', {
        itemId:  'actionVDCAT',
        text:   'Категории',
        iconCls:  'icon-chart_organisation',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdcat');
			if(j==null){
				j=eval('VDCAT_Panel_'+OTEditMode('VDCAT')+'(\'{EFB7DC6D-4FA2-4A45-8BF4-D8CEE3E9629C}\', true)');
        j.iconCls= 'icon-chart_organisation';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDCN = Ext.create('Ext.Action', {
        itemId:  'actionVDCN',
        text:   'Страны',
        iconCls:  'icon-world',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdcn');
			if(j==null){
				j=eval('VDCN_Panel_'+OTEditMode('VDCN')+'(\'{9404A229-9AEC-42DC-BF43-5FA23920FF34}\', true)');
        j.iconCls= 'icon-world';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDCST = Ext.create('Ext.Action', {
        itemId:  'actionVDCST',
        text:   'Статус кампании',
        iconCls:  'icon-pause_blue',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdcst');
			if(j==null){
				j=eval('VDCST_Panel_'+OTEditMode('VDCST')+'(\'{4E1BF8DB-9D10-499A-958A-ED1F91D42922}\', true)');
        j.iconCls= 'icon-pause_blue';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDDEV = Ext.create('Ext.Action', {
        itemId:  'actionVDDEV',
        text:   'Устройства',
        iconCls:  'icon-device_stylus',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vddev');
			if(j==null){
				j=eval('VDDEV_Panel_'+OTEditMode('VDDEV')+'(\'{7EAB742D-8FCA-4273-A8BC-9714BC5322E3}\', true)');
        j.iconCls= 'icon-device_stylus';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDFRMT = Ext.create('Ext.Action', {
        itemId:  'actionVDFRMT',
        text:   'Формат объявления',
        iconCls:  'icon-page_white_code_red',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdfrmt');
			if(j==null){
				j=eval('VDFRMT_Panel_'+OTEditMode('VDFRMT')+'(\'{4B0918C7-6D8C-4D3F-814B-E4433558E2B6}\', true)');
        j.iconCls= 'icon-page_white_code_red';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDINTER = Ext.create('Ext.Action', {
        itemId:  'actionVDINTER',
        text:   'Интересы',
        iconCls:  'icon-drive_cdr',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdinter');
			if(j==null){
				j=eval('VDINTER_Panel_'+OTEditMode('VDINTER')+'(\'{271C9FA4-F855-40BA-BB43-37094896C18B}\', true)');
        j.iconCls= 'icon-drive_cdr';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDMSTAT = Ext.create('Ext.Action', {
        itemId:  'actionVDMSTAT',
        text:   'Семейное положение',
        iconCls:  'icon-group',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdmstat');
			if(j==null){
				j=eval('VDMSTAT_Panel_'+OTEditMode('VDMSTAT')+'(\'{05A0E0B7-4FA7-432B-9AA5-35C3B665512D}\', true)');
        j.iconCls= 'icon-group';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDPOS = Ext.create('Ext.Action', {
        itemId:  'actionVDPOS',
        text:   'Должности',
        iconCls:  'icon-user_orange',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdpos');
			if(j==null){
				j=eval('VDPOS_Panel_'+OTEditMode('VDPOS')+'(\'{B3E25A1F-BD2B-48A6-BADE-0802030863F3}\', true)');
        j.iconCls= 'icon-user_orange';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDPT = Ext.create('Ext.Action', {
        itemId:  'actionVDPT',
        text:   'Тип оплаты',
        iconCls:  'icon-money_dollar',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdpt');
			if(j==null){
				j=eval('VDPT_Panel_'+OTEditMode('VDPT')+'(\'{EF9C6A11-0657-441E-B4C8-752C297F485A}\', true)');
        j.iconCls= 'icon-money_dollar';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDREL = Ext.create('Ext.Action', {
        itemId:  'actionVDREL',
        text:   'Религии',
        iconCls:  'icon-weather_cloudy_rain',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdrel');
			if(j==null){
				j=eval('VDREL_Panel_'+OTEditMode('VDREL')+'(\'{E987D5B4-87DA-471D-BEB2-1F250951AC50}\', true)');
        j.iconCls= 'icon-weather_cloudy_rain';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDRG = Ext.create('Ext.Action', {
        itemId:  'actionVDRG',
        text:   'Регионы',
        iconCls:  'icon-chart_pie',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdrg');
			if(j==null){
				j=eval('VDRG_Panel_'+OTEditMode('VDRG')+'(\'{EF53DB60-5DEB-4971-9798-B8E9D0EAEDAC}\', true)');
        j.iconCls= 'icon-chart_pie';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDT = Ext.create('Ext.Action', {
        itemId:  'actionVDT',
        text:   'Города',
        iconCls:  'icon-building',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdt');
			if(j==null){
				j=eval('VDT_Panel_'+OTEditMode('VDT')+'(\'{5FCB1238-AA3F-43F3-8EEA-5ED3AFA0AF2D}\', true)');
        j.iconCls= 'icon-building';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionVDTT = Ext.create('Ext.Action', {
        itemId:  'actionVDTT',
        text:   'Типы задач',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('vdtt');
			if(j==null){
				j=eval('VDTT_Panel_'+OTEditMode('VDTT')+'(\'{4DAB730F-DE5D-424C-9E6D-E0388D7B2A51}\', true)');
        j.iconCls= 'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
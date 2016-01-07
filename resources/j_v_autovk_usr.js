
var groupingFeature_autovk_usr = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autovk_usr;
Ext.define('grid_autovk_usr', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autovk_usr',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autovk_usr,
        features: [groupingFeature_autovk_usr],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        // viewConfig: {               enableTextSelection: true        },
        dockedItems: [{
                xtype:  'toolbar',
                     items: [{
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : this.onAddClick
                    }, {
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    }, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : this.onDeleteClick
                    }, {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : this.onRefreshClick
                   } , {
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: this.onExportClick
                }]
            }],
        columns: [
            {text: "id", width:120, dataIndex: 'vk_usr_vkid', sortable: true}
            ,
            {text: "Имя", width:120, dataIndex: 'vk_usr_first_name', sortable: true}
            ,
            {text: "Фамилия", width:120, dataIndex: 'vk_usr_last_name', sortable: true}
            ,
            {text: "Запись удалена", width:120, dataIndex: 'vk_usr_deactivated', sortable: true}
            ,
            {text: "Фото", width:120, dataIndex: 'vk_usr_photo_id', sortable: true}
            ,
            {text: "Пол", width:120, dataIndex: 'vk_usr_sex', sortable: true}
            ,
            {text: "дата рождения", width:120, dataIndex: 'vk_usr_bdate', sortable: true}
            ,
            {text: "Страна", width:120, dataIndex: 'vk_usr_country', sortable: true}
            ,
            {text: "Родной город", width:120, dataIndex: 'vk_usr_home_town', sortable: true}
            ,
            {text: "Есть фото", width:120, dataIndex: 'vk_usr_has_photo', sortable: true}
            ,
{ text     : 'Фото 50', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{vk_usr_photo_50}\' target=\'_blank\'>Фото 50</a>'}
            ,
{ text     : 'Фото 100', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{vk_usr_photo_100}\' target=\'_blank\'>Фото 100</a>'}
            ,
            {text: "On-Line", width:120, dataIndex: 'vk_usr_online', sortable: true}
            ,
            {text: "Статус", width:120, dataIndex: 'vk_usr_status', sortable: true}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autovk_usr,
        displayInfo: true,
        displayMsg:  'Показаны строки с {0} по {1} из {2}',
        emptyMsg: 'нет данных'
        
        })

, rbar:
                [
                {
                    xtype:  'form',
                    title:  'Фильтры',
                    iconCls:  'icon-find',
                    flex:1,
					collapsible:true,
                    collapseDirection:  'right',
					animCollapse: false, 
					titleCollapse:true,
					bodyPadding:5,
					width:200,
					minWidth:200,
					autoScroll:true,
                    buttonAlign:  'center',
					layout: {
                    type:   'vbox',
                    align:  'stretch'
				},
                defaultType:  'textfield',
				items: [
{

value:  '',
name:   'vk_usr_vkid',
itemId:   'vk_usr_vkid',
fieldLabel:  '',
emptyText:      'id',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'id'});}}
}
,
{

value:  '',
name:   'vk_usr_first_name',
itemId:   'vk_usr_first_name',
fieldLabel:  '',
emptyText:      'Имя',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Имя'});}}
}
,
{

value:  '',
name:   'vk_usr_last_name',
itemId:   'vk_usr_last_name',
fieldLabel:  '',
emptyText:      'Фамилия',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Фамилия'});}}
}
,
{

xtype:          'combobox',
editable: false,
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_YesNo,
valueField:     'value',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'vk_usr_deactivated_val',
itemId:   'vk_usr_deactivated_val',
fieldLabel:  '',
emptyText:      'Запись удалена',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Запись удалена'});}}
}
,
{

value:  '',
name:   'vk_usr_photo_id',
itemId:   'vk_usr_photo_id',
fieldLabel:  '',
emptyText:      'Фото',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Фото'});}}
}
,
{

xtype:          'combobox',
editable: false,
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_Sex,
valueField:     'value',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'vk_usr_sex_val',
itemId:   'vk_usr_sex_val',
fieldLabel:  '',
emptyText:      'Пол',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Пол'});}}
}
,
{

value:  '',
name:   'vk_usr_bdate',
itemId:   'vk_usr_bdate',
fieldLabel:  '',
emptyText:      'дата рождения',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'дата рождения'});}}
}
,
{

trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Страна'});} },
xtype:  'combobox',
store: cmbstore_vk_country,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_usr_country_id',
itemId:   'vk_usr_country_id',
fieldLabel:  '',
emptyText:      'Страна',
hideLabel:  true
}
,
{

trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Родной город'});} },
xtype:  'combobox',
store: cmbstore_vk_town,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_usr_home_town_id',
itemId:   'vk_usr_home_town_id',
fieldLabel:  '',
emptyText:      'Родной город',
hideLabel:  true
}
,
{

xtype:          'combobox',
editable: false,
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_YesNo,
valueField:     'value',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'vk_usr_has_photo_val',
itemId:   'vk_usr_has_photo_val',
fieldLabel:  '',
emptyText:      'Есть фото',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Есть фото'});}}
}
,
{

value:  '',
name:   'vk_usr_photo_50',
itemId:   'vk_usr_photo_50',
fieldLabel:  '',
emptyText:      'Фото 50',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Фото 50'});}}
}
,
{

value:  '',
name:   'vk_usr_photo_100',
itemId:   'vk_usr_photo_100',
fieldLabel:  '',
emptyText:      'Фото 100',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Фото 100'});}}
}
,
{

xtype:          'combobox',
editable: false,
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_YesNo,
valueField:     'value',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'vk_usr_online_val',
itemId:   'vk_usr_online_val',
fieldLabel:  '',
emptyText:      'On-Line',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'On-Line'});}}
}
,
{

value:  '',
name:   'vk_usr_status',
itemId:   'vk_usr_status',
fieldLabel:  '',
emptyText:      'Статус',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Статус'});}}
}
					],
                    buttons: 
                    [
                        {
                            text: 'Найти',
							iconCls:'icon-find',
                            formBind: true, 
                            disabled: false,
                            grid: this,
                            handler: function() {
                                var user_input =this.up('form').getForm().getValues(false,true);
                                var filters = new Array();
								if(this.grid.default_filter != null){
									for (var i=0; i< this.grid.default_filter.length;i++) {
										var kv=this.grid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
                                for (var key in user_input) {
                                    filters.push({property: key, value: user_input[key]});
                                }
                                if (this.grid.store.filters.length>0) 
                                    this.grid.store.filters.clear();
                                if (filters.length>0) 
                                    this.grid.store.filter(filters); 
                                else 
								   this.grid.store.load();
                            }
                        }, {
							text: 'Сбросить',
							iconCls:'icon-cancel',
                            grid: this,
                            handler: function() {
                                this.up('form').getForm().reset();
								var filters = new Array();
                                if(this.grid.default_filter!=null){
									for (var i=0; i< this.grid.default_filter.length;i++) {
										var kv=this.grid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
                                if (this.grid.store.filters.length>0) 
                                    this.grid.store.filters.clear();
                                if (filters.length>0) 
                                    this.grid.store.filter(filters); 
                                else 
								   this.grid.store.load();
                            }
                        }
                    ]
                }
            ]//rbar
        }
        );
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.store.load()
       },
        onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autovk_usr= setInterval(function() {  
        			//	store_v_autovk_usr.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autovk_usr);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autovk_usr/deleteRow',
            method:  'POST',
    		params: { 
    				instanceid: selection.get('instanceid')
    				}
    	});
    	this.store.remove(selection);
      }
    },
    onDeleteClick: function(){
      var selection = this.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	    if(CheckOperation('VKUSR.edit')!=0 && OTAllowDelete('VKUSR')){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			opt.caller.onDeleteConfirm(opt.selectedRow);
        	    }
        	},
            caller: this,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    },
    onAddClick: function(){
   	    if(CheckOperation('VKUSR.edit')!=0 && OTAllowAdd('VKUSR')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autovk_usr/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_usr';
                edit.setTitle('Создание документа:ВК Аккаунт') ;
                var p=eval('VKUSR_Panel_'+OTAddMode('VKUSR')+'( res.data, false,null )') ;
                edit.add(p);
                edit.show();
                }
            });
            this.store.load();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    },
    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('VKUSR.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_usr';
                edit.setTitle('Редактирование документа: ВК Аккаунт') ;
            var p=eval('VKUSR_Panel_'+OTEditMode('VKUSR')+'( selection.get(\'instanceid\'), false, selection )') ;
            edit.add(p);
            edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    },
    onRefreshClick: function(){
             this.store.load();
    }
    ,
     onExportClick: function(){ 
         	var config= {title:this.title, columns:this.columns };
    	var workbook = new Workbook(config);
    workbook.addWorksheet(this.store, config );
    var x= workbook.render();
    window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
     }
    }
    );
Ext.require([
'Ext.form.*'
]);
function VKUSR_Jrnl(){ 

  var VKUSR= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'vkusr_jrnl',
       title: 'ВК Аккаунт',
      layout: 'fit',
      flex: 1,
      fieldDefaults: {
         labelAlign:             'top',
          msgTarget:             'side'
        },
        defaults: {
        anchor:'100%'
        },

        items: [{
            itemId:'gr_autovk_usr',
            xtype:'g_v_autovk_usr',
            stateful: stateFulSystem,
            stateId:'j_v_autovk_usr',
            layout: 'fit',
            flex: 1,
            store: store_v_autovk_usr
    }] // tabpanel
    }); //Ext.Create
    return VKUSR;
}
Ext.define('ObjectWindow_vkusr', {
    extend:  'Ext.window.Window',
    maxHeight: 620,
    minHeight: 620,
    minWidth: 800,
    maxWidth: 1024,
    constrainHeader :true,
    layout:  'fit',
    autoShow: true,
    closeAction: 'destroy',
    modal: true,
    iconCls:  'icon-user_b',
    title:  'ВК Аккаунт',
    items:[ ]
	});
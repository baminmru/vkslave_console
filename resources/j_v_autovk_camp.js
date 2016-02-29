
var groupingFeature_autovk_camp = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autovk_camp;
Ext.define('grid_autovk_camp', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autovk_camp',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autovk_camp,
        features: [groupingFeature_autovk_camp],
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
            {text: "Пользователь", width:120, dataIndex: 'vk_camp_vk_usr', sortable: true}
            ,
            {text: "Кабинет", width:120, dataIndex: 'vk_camp_vk_cab', sortable: true}
            ,
            {text: "Название", width:120, dataIndex: 'vk_camp_name', sortable: true}
            ,
            {text: "ID", width:120, dataIndex: 'vk_camp_campagin_id', sortable: true}
            ,
            {text: "Статус", width:120, dataIndex: 'vk_camp_status', sortable: true}
            ,
            {text: "Общий лимит", width:120, dataIndex: 'vk_camp_all_limit', sortable: true}
            ,
            {text: "Дневной лимит", width:120, dataIndex: 'vk_camp_day_limit', sortable: true}
            ,
            {text: "Завершение", width:120, dataIndex: 'vk_camp_stop_time', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Начало", width:120, dataIndex: 'vk_camp_start_time', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Проект", width:120, dataIndex: 'vk_camp_prj', sortable: true}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autovk_camp,
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Пользователь'});} },
xtype:  'combobox',
store: cmbstore_vk_usr,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_camp_vk_usr_id',
itemId:   'vk_camp_vk_usr_id',
fieldLabel:  '',
emptyText:      'Пользователь',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Кабинет'});} },
xtype:  'combobox',
store: cmbstore_vk_cab,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_camp_vk_cab_id',
itemId:   'vk_camp_vk_cab_id',
fieldLabel:  '',
emptyText:      'Кабинет',
hideLabel:  true
}
,
{

value:  '',
name:   'vk_camp_name',
itemId:   'vk_camp_name',
fieldLabel:  '',
emptyText:      'Название',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Название'});}}
}
,
{

value:  '',
name:   'vk_camp_campagin_id',
itemId:   'vk_camp_campagin_id',
fieldLabel:  '',
emptyText:      'ID',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'ID'});}}
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Статус'});} },
xtype:  'combobox',
store: cmbstore_vk_castate,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_camp_status_id',
itemId:   'vk_camp_status_id',
fieldLabel:  '',
emptyText:      'Статус',
hideLabel:  true
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_camp_all_limit_ge',
itemId:   'vk_camp_all_limit_ge',
fieldLabel:  'Общий лимит >=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Общий лимит >='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_camp_all_limit_le',
itemId:   'vk_camp_all_limit_le',
fieldLabel:  'Общий лимит <=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Общий лимит <='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_camp_day_limit_ge',
itemId:   'vk_camp_day_limit_ge',
fieldLabel:  'Дневной лимит >=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дневной лимит >='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_camp_day_limit_le',
itemId:   'vk_camp_day_limit_le',
fieldLabel:  'Дневной лимит <=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дневной лимит <='});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_camp_stop_time_ge',
itemId: 'vk_camp_stop_time_ge',
fieldLabel: 'Завершение C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Завершение C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_camp_stop_time_le',
itemId: 'vk_camp_stop_time_le',
fieldLabel: 'Завершение по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Завершение по'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_camp_start_time_ge',
itemId: 'vk_camp_start_time_ge',
fieldLabel: 'Начало C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Начало C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_camp_start_time_le',
itemId: 'vk_camp_start_time_le',
fieldLabel: 'Начало по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Начало по'});}}
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Проект'});} },
xtype:  'combobox',
store: cmbstore_vk_prj,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_camp_prj_id',
itemId:   'vk_camp_prj_id',
fieldLabel:  '',
emptyText:      'Проект',
hideLabel:  true
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
        			//interval_autovk_camp= setInterval(function() {  
        			//	store_v_autovk_camp.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autovk_camp);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autovk_camp/deleteRow',
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
   	    if(CheckOperation('VKCAM.edit')!=0 && OTAllowDelete('VKCAM')){
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
   	    if(CheckOperation('VKCAM.edit')!=0 && OTAllowAdd('VKCAM')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autovk_camp/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_camp';
                edit.setTitle('Создание документа:Рекламная кампания') ;
                var p=eval('VKCAM_Panel_'+OTAddMode('VKCAM')+'( res.data, false,null )') ;
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
   	    if(CheckOperation('VKCAM.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_camp';
                edit.setTitle('Редактирование документа: Рекламная кампания') ;
            var p=eval('VKCAM_Panel_'+OTEditMode('VKCAM')+'( selection.get(\'instanceid\'), false, selection )') ;
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
function VKCAM_Jrnl(){ 

  var VKCAM= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'vkcam_jrnl',
       title: 'Рекламная кампания',
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
            itemId:'gr_autovk_camp',
            xtype:'g_v_autovk_camp',
            stateful: stateFulSystem,
            stateId:'j_v_autovk_camp',
            layout: 'fit',
            flex: 1,
            store: store_v_autovk_camp
    }] // tabpanel
    }); //Ext.Create
    return VKCAM;
}
Ext.define('ObjectWindow_vkcam', {
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
    iconCls:  'icon-photos',
    title:  'Рекламная кампания',
    items:[ ]
	});
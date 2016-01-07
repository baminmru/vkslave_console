
var groupingFeature_autovk_taskinfo = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autovk_taskinfo;
Ext.define('grid_autovk_taskinfo', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autovk_taskinfo',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autovk_taskinfo,
        features: [groupingFeature_autovk_taskinfo],
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
            {text: "Тип задачи", width:120, dataIndex: 'vk_taskinfo_tasktype', sortable: true}
            ,
            {text: "Название", width:120, dataIndex: 'vk_taskinfo_name', sortable: true}
            ,
            {text: "Дата создания", width:120, dataIndex: 'vk_taskinfo_crdate', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Время повтора (мин)", width:120, dataIndex: 'vk_taskinfo_repeat_interval', sortable: true}
            ,
            {text: "Дата  исполнения", width:120, dataIndex: 'vk_taskinfo_lastdate', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Результат", width:120, dataIndex: 'vk_taskinfo_result', sortable: true}
            ,
            {text: "Завершена", width:120, dataIndex: 'vk_taskinfo_isdone', sortable: true}
            ,
            {text: "Кабинет", width:120, dataIndex: 'vk_taskinfo_cab', sortable: true}
            ,
            {text: "Кампания", width:120, dataIndex: 'vk_taskinfo_camp', sortable: true}
            ,
            {text: "Объявление", width:120, dataIndex: 'vk_taskinfo_ads', sortable: true}
            ,
            {text: "Ротация", width:120, dataIndex: 'vk_taskinfo_rotation', sortable: true}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autovk_taskinfo,
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тип задачи'});} },
xtype:  'combobox',
store: cmbstore_vk_tasktype,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_taskinfo_tasktype_id',
itemId:   'vk_taskinfo_tasktype_id',
fieldLabel:  '',
emptyText:      'Тип задачи',
hideLabel:  true
}
,
{

value:  '',
name:   'vk_taskinfo_name',
itemId:   'vk_taskinfo_name',
fieldLabel:  '',
emptyText:      'Название',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Название'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_taskinfo_crdate_ge',
itemId: 'vk_taskinfo_crdate_ge',
fieldLabel: 'Дата создания C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата создания C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_taskinfo_crdate_le',
itemId: 'vk_taskinfo_crdate_le',
fieldLabel: 'Дата создания по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата создания по'});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_taskinfo_repeat_interval_ge',
itemId:   'vk_taskinfo_repeat_interval_ge',
fieldLabel:  'Время повтора (мин) >=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Время повтора (мин) >='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_taskinfo_repeat_interval_le',
itemId:   'vk_taskinfo_repeat_interval_le',
fieldLabel:  'Время повтора (мин) <=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Время повтора (мин) <='});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_taskinfo_lastdate_ge',
itemId: 'vk_taskinfo_lastdate_ge',
fieldLabel: 'Дата  исполнения C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата  исполнения C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'vk_taskinfo_lastdate_le',
itemId: 'vk_taskinfo_lastdate_le',
fieldLabel: 'Дата  исполнения по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата  исполнения по'});}}
}
,
{

value:  '',
name:   'vk_taskinfo_result',
itemId:   'vk_taskinfo_result',
fieldLabel:  '',
emptyText:      'Результат',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Результат'});}}
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
store: enum_Boolean,
valueField:     'value',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'vk_taskinfo_isdone_val',
itemId:   'vk_taskinfo_isdone_val',
fieldLabel:  '',
emptyText:      'Завершена',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Завершена'});}}
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
name:   'vk_taskinfo_cab_id',
itemId:   'vk_taskinfo_cab_id',
fieldLabel:  '',
emptyText:      'Кабинет',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Кампания'});} },
xtype:  'combobox',
store: cmbstore_vk_camp,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_taskinfo_camp_id',
itemId:   'vk_taskinfo_camp_id',
fieldLabel:  '',
emptyText:      'Кампания',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Объявление'});} },
xtype:  'combobox',
store: cmbstore_vk_adinfo,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_taskinfo_ads_id',
itemId:   'vk_taskinfo_ads_id',
fieldLabel:  '',
emptyText:      'Объявление',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Ротация'});} },
xtype:  'combobox',
store: cmbstore_vk_rotinfo,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_taskinfo_rotation_id',
itemId:   'vk_taskinfo_rotation_id',
fieldLabel:  '',
emptyText:      'Ротация',
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
        			//interval_autovk_taskinfo= setInterval(function() {  
        			//	store_v_autovk_taskinfo.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autovk_taskinfo);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autovk_taskinfo/deleteRow',
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
   	    if(CheckOperation('VKTSK.edit')!=0 && OTAllowDelete('VKTSK')){
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
   	    if(CheckOperation('VKTSK.edit')!=0 && OTAllowAdd('VKTSK')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autovk_taskinfo/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_taskinfo';
                edit.setTitle('Создание документа:Задача') ;
                var p=eval('VKTSK_Panel_'+OTAddMode('VKTSK')+'( res.data, false,null )') ;
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
   	    if(CheckOperation('VKTSK.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_taskinfo';
                edit.setTitle('Редактирование документа: Задача') ;
            var p=eval('VKTSK_Panel_'+OTEditMode('VKTSK')+'( selection.get(\'instanceid\'), false, selection )') ;
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
function VKTSK_Jrnl(){ 

  var VKTSK= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'vktsk_jrnl',
       title: 'Задача',
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
            itemId:'gr_autovk_taskinfo',
            xtype:'g_v_autovk_taskinfo',
            stateful: stateFulSystem,
            stateId:'j_v_autovk_taskinfo',
            layout: 'fit',
            flex: 1,
            store: store_v_autovk_taskinfo
    }] // tabpanel
    }); //Ext.Create
    return VKTSK;
}
Ext.define('ObjectWindow_vktsk', {
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
    iconCls:  'icon-table_row_insert',
    title:  'Задача',
    items:[ ]
	});
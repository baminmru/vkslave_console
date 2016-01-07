
var groupingFeature_autovk_adinfo = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autovk_adinfo;
Ext.define('grid_autovk_adinfo', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autovk_adinfo',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autovk_adinfo,
        features: [groupingFeature_autovk_adinfo],
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
            {text: "Название", width:120, dataIndex: 'vk_adinfo_name', sortable: true}
            ,
            {text: "ID", width:120, dataIndex: 'vk_adinfo_ads_id', sortable: true}
            ,
            {text: "Кампания", width:120, dataIndex: 'vk_adinfo_campaign_id', sortable: true}
            ,
            {text: "Формат", width:120, dataIndex: 'vk_adinfo_ad_format', sortable: true}
            ,
            {text: "Ограничение", width:120, dataIndex: 'vk_adinfo_age_restriction', sortable: true}
            ,
            {text: "тип оплаты", width:120, dataIndex: 'vk_adinfo_cost_type', sortable: true}
            ,
            {text: "За переход(коп)", width:120, dataIndex: 'vk_adinfo_cpc', sortable: true}
            ,
            {text: "За 1000 показов(коп)", width:120, dataIndex: 'vk_adinfo_cpm', sortable: true}
            ,
            {text: "Площадки", width:120, dataIndex: 'vk_adinfo_ad_platform', sortable: true}
            ,
            {text: "Категория 1", width:120, dataIndex: 'vk_adinfo_category1_id', sortable: true}
            ,
            {text: "Категория 2", width:120, dataIndex: 'vk_adinfo_category2_id', sortable: true}
            ,
            {text: "Статус", width:120, dataIndex: 'vk_adinfo_status', sortable: true}
            ,
            {text: "Ограничение показов", width:120, dataIndex: 'vk_adinfo_impression_limit', sortable: true}
            ,
            {text: "Лимит (руб)", width:120, dataIndex: 'vk_adinfo_all_limit', sortable: true}
            ,
            {text: "Модерация", width:120, dataIndex: 'vk_adinfo_approved', sortable: true}
            ,
            {text: "Реклама видео", width:120, dataIndex: 'vk_adinfo_video', sortable: true}
            ,
            {text: "Предупреждения", width:120, dataIndex: 'vk_adinfo_disclamer', sortable: true}
            ,
            {text: "Заголовок", width:120, dataIndex: 'vk_adinfo_title', sortable: true}
            ,
            {text: "Описание", width:120, dataIndex: 'vk_adinfo__description', sortable: true}
            ,
{ text     : 'Рекламируем', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{vk_adinfo_link_url}\' target=\'_blank\'>Рекламируем</a>'}
            ,
            {text: "Домен рекламы", width:120, dataIndex: 'vk_adinfo_link_domain', sortable: true}
            ,
{ text     : 'Превью', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{vk_adinfo_preview_link}\' target=\'_blank\'>Превью</a>'}
            ,
{ text     : 'Изображение', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{vk_adinfo_image_src}\' target=\'_blank\'>Изображение</a>'}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autovk_adinfo,
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
name:   'vk_adinfo_name',
itemId:   'vk_adinfo_name',
fieldLabel:  '',
emptyText:      'Название',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Название'});}}
}
,
{

value:  '',
name:   'vk_adinfo_ads_id',
itemId:   'vk_adinfo_ads_id',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Кампания'});} },
xtype:  'combobox',
store: cmbstore_vk_camp,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_campaign_id_id',
itemId:   'vk_adinfo_campaign_id_id',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Формат'});} },
xtype:  'combobox',
store: cmbstore_vk_adformat,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_ad_format_id',
itemId:   'vk_adinfo_ad_format_id',
fieldLabel:  '',
emptyText:      'Формат',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Ограничение'});} },
xtype:  'combobox',
store: cmbstore_vk_age,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_age_restriction_id',
itemId:   'vk_adinfo_age_restriction_id',
fieldLabel:  '',
emptyText:      'Ограничение',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'тип оплаты'});} },
xtype:  'combobox',
store: cmbstore_vk_paytype,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_cost_type_id',
itemId:   'vk_adinfo_cost_type_id',
fieldLabel:  '',
emptyText:      'тип оплаты',
hideLabel:  true
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_adinfo_cpc_ge',
itemId:   'vk_adinfo_cpc_ge',
fieldLabel:  'За переход(коп) >=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'За переход(коп) >='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_adinfo_cpc_le',
itemId:   'vk_adinfo_cpc_le',
fieldLabel:  'За переход(коп) <=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'За переход(коп) <='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_adinfo_cpm_ge',
itemId:   'vk_adinfo_cpm_ge',
fieldLabel:  'За 1000 показов(коп) >=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'За 1000 показов(коп) >='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_adinfo_cpm_le',
itemId:   'vk_adinfo_cpm_le',
fieldLabel:  'За 1000 показов(коп) <=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'За 1000 показов(коп) <='});}}
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Площадки'});} },
xtype:  'combobox',
store: cmbstore_vk_platform,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_ad_platform_id',
itemId:   'vk_adinfo_ad_platform_id',
fieldLabel:  '',
emptyText:      'Площадки',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Категория 1'});} },
xtype:  'combobox',
store: cmbstore_vk_category,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_category1_id_id',
itemId:   'vk_adinfo_category1_id_id',
fieldLabel:  '',
emptyText:      'Категория 1',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Категория 2'});} },
xtype:  'combobox',
store: cmbstore_vk_category,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_category2_id_id',
itemId:   'vk_adinfo_category2_id_id',
fieldLabel:  '',
emptyText:      'Категория 2',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Статус'});} },
xtype:  'combobox',
store: cmbstore_vk_adstate,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_status_id',
itemId:   'vk_adinfo_status_id',
fieldLabel:  '',
emptyText:      'Статус',
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
name:   'vk_adinfo_impression_limit_val',
itemId:   'vk_adinfo_impression_limit_val',
fieldLabel:  '',
emptyText:      'Ограничение показов',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Ограничение показов'});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_adinfo_all_limit_ge',
itemId:   'vk_adinfo_all_limit_ge',
fieldLabel:  'Лимит (руб) >=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Лимит (руб) >='});}}
}
,
{

xtype:  'numberfield',
value:  '0',
name:   'vk_adinfo_all_limit_le',
itemId:   'vk_adinfo_all_limit_le',
fieldLabel:  'Лимит (руб) <=',
emptyText:      'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Лимит (руб) <='});}}
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Модерация'});} },
xtype:  'combobox',
store: cmbstore_vk_approve,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'vk_adinfo_approved_id',
itemId:   'vk_adinfo_approved_id',
fieldLabel:  '',
emptyText:      'Модерация',
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
name:   'vk_adinfo_video_val',
itemId:   'vk_adinfo_video_val',
fieldLabel:  '',
emptyText:      'Реклама видео',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Реклама видео'});}}
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
name:   'vk_adinfo_disclamer_val',
itemId:   'vk_adinfo_disclamer_val',
fieldLabel:  '',
emptyText:      'Предупреждения',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Предупреждения'});}}
}
,
{

value:  '',
name:   'vk_adinfo_title',
itemId:   'vk_adinfo_title',
fieldLabel:  '',
emptyText:      'Заголовок',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Заголовок'});}}
}
,
{

value:  '',
name:   'vk_adinfo__description',
itemId:   'vk_adinfo__description',
fieldLabel:  '',
emptyText:      'Описание',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Описание'});}}
}
,
{

value:  '',
name:   'vk_adinfo_link_url',
itemId:   'vk_adinfo_link_url',
fieldLabel:  '',
emptyText:      'Рекламируем',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Рекламируем'});}}
}
,
{

value:  '',
name:   'vk_adinfo_link_domain',
itemId:   'vk_adinfo_link_domain',
fieldLabel:  '',
emptyText:      'Домен рекламы',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Домен рекламы'});}}
}
,
{

value:  '',
name:   'vk_adinfo_preview_link',
itemId:   'vk_adinfo_preview_link',
fieldLabel:  '',
emptyText:      'Превью',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Превью'});}}
}
,
{

value:  '',
name:   'vk_adinfo_image_src',
itemId:   'vk_adinfo_image_src',
fieldLabel:  '',
emptyText:      'Изображение',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Изображение'});}}
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
        			//interval_autovk_adinfo= setInterval(function() {  
        			//	store_v_autovk_adinfo.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autovk_adinfo);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autovk_adinfo/deleteRow',
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
   	    if(CheckOperation('VKADS.edit')!=0 && OTAllowDelete('VKADS')){
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
   	    if(CheckOperation('VKADS.edit')!=0 && OTAllowAdd('VKADS')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autovk_adinfo/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_adinfo';
                edit.setTitle('Создание документа:Рекламное объявление') ;
                var p=eval('VKADS_Panel_'+OTAddMode('VKADS')+'( res.data, false,null )') ;
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
   	    if(CheckOperation('VKADS.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autovk_adinfo';
                edit.setTitle('Редактирование документа: Рекламное объявление') ;
            var p=eval('VKADS_Panel_'+OTEditMode('VKADS')+'( selection.get(\'instanceid\'), false, selection )') ;
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
function VKADS_Jrnl(){ 

  var VKADS= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'vkads_jrnl',
       title: 'Рекламное объявление',
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
            itemId:'gr_autovk_adinfo',
            xtype:'g_v_autovk_adinfo',
            stateful: stateFulSystem,
            stateId:'j_v_autovk_adinfo',
            layout: 'fit',
            flex: 1,
            store: store_v_autovk_adinfo
    }] // tabpanel
    }); //Ext.Create
    return VKADS;
}
Ext.define('ObjectWindow_vkads', {
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
    iconCls:  'icon-photo',
    title:  'Рекламное объявление',
    items:[ ]
	});
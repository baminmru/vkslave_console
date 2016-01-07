
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_camstat_main(id,mystore){

var groupingFeature_vk_camstat = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_vk_camstat/deleteRow',
            method:  'POST',
    		params: { 
    				vk_camstatid: selection.get('vk_camstatid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('VKCAM.edit')!=0){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			onDeleteConfirm(opt.selectedRow);
        	    }
        	},
            caller: this,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    };
    function onAddClick(){
   	if(CheckOperation('VKCAM.edit')!=0){
                var edit = Ext.create('EditWindow_vk_camstatmain');
                p1.store.insert(0, new model_vk_camstat());
                record= p1.store.getAt(0);
                record.set('instanceid',p1.instanceid);
                edit.getComponent(0).setActiveRecord(record,p1.instanceid);
                edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    };
    function onRefreshClick(){
            p1.store.load({params:{instanceid: p1.instanceid}});
    };
    function onEditClick(){
        var selection = p1.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('VKCAM.edit')!=0){
            var edit = Ext.create('EditWindow_vk_camstatmain');
            edit.getComponent(0).setActiveRecord(selection,selection.get('instanceid'));
            edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    };
 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
      stateful:stateFulSystem,
       stateId:  'vk_camstatmain',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_vk_camstat ],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : onAddClick
                    }, {
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : onEditClick
                    }, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : onDeleteClick
                    }, {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : onRefreshClick
                }]
            }],
        columns: [
{text: "Подписки", width:60, dataIndex: 'join_rate', sortable: true}
            ,
{text: "Общая", width:60, dataIndex: 'overal', sortable: true}
            ,
{text: "День", width: 200, dataIndex: 's_day', sortable: true}
            ,
{text: "Потрачено", width:60, dataIndex: 'spent', sortable: true}
            ,
{text: "Просмотры", width:60, dataIndex: 'video_views', sortable: true}
            ,
{text: "Просмотры", width:60, dataIndex: 'impressions', sortable: true}
            ,
{text: "просмотры целого", width:60, dataIndex: 'video_views_full', sortable: true}
            ,
{text: "Охват", width:60, dataIndex: 'reach', sortable: true}
            ,
{text: "Месяц", width: 200, dataIndex: 's_month', sortable: true}
            ,
{text: "Просмотры половины", width:60, dataIndex: 'video_views_half', sortable: true}
            ,
{text: "Период", width: 200, dataIndex: 'period', sortable: true}
            ,
{text: "Клики", width:60, dataIndex: 'clicks', sortable: true}
            ,
{text: "Переходы на сайт", width:60, dataIndex: 'video_clicks_site', sortable: true}
        ]
       ,
    listeners: {
     render : function(grid){
                grid.store.on('load', function(store, records, options){
                        if(store.count() > 0) grid.getSelectionModel().select(0);      
                }); 
         },
        itemdblclick: function() { 
    	    onEditClick();
        },
          itemclick: function(view , record){
         p1.down('#delete').setDisabled(false);
         p1.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        p1.down('#delete').setDisabled(false);
        p1.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 p1.down('#delete').setDisabled(selections.length === 0);
    	 p1.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
return p1;
};
function DefineForms_vk_camstat_main(){


Ext.define('Form_vk_camstatmain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_camstatmain',
initComponent: function(){
    //this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'vk_camstat',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        closable:false,
        title:'',
        preventHeader:true,
        id:'vk_camstat-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'numberfield',
value:  '0',
name:   'join_rate',
itemId:   'join_rate',
fieldLabel:  'Подписки',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 55, 

xtype:  'numberfield',
value:  '0',
name:   'overal',
itemId:   'overal',
fieldLabel:  'Общая',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 110, 

xtype:  'textfield',
value:  '',
name:   's_day',
itemId:   's_day',
fieldLabel:  'День',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 165, 

xtype:  'numberfield',
value:  '0',
name:   'spent',
itemId:   'spent',
fieldLabel:  'Потрачено',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 220, 

xtype:  'numberfield',
value:  '0',
name:   'impressions',
itemId:   'impressions',
fieldLabel:  'Просмотры',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 275, 

xtype:  'numberfield',
value:  '0',
name:   'reach',
itemId:   'reach',
fieldLabel:  'Охват',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 330, 

xtype:  'textfield',
value:  '',
name:   's_month',
itemId:   's_month',
fieldLabel:  'Месяц',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 385, 

xtype:  'textfield',
value:  '',
name:   'period',
itemId:   'period',
fieldLabel:  'Период',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 440, 

xtype:  'numberfield',
value:  '0',
name:   'clicks',
itemId:   'clicks',
fieldLabel:  'Клики',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 515 
        }
,
        { 
        xtype:'panel', 
        id:'vk_camstat-1',
        title:      'Видео',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'numberfield',
value:  '0',
name:   'video_views',
itemId:   'video_views',
fieldLabel:  'Просмотры',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 55, 

xtype:  'numberfield',
value:  '0',
name:   'video_views_full',
itemId:   'video_views_full',
fieldLabel:  'просмотры целого',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 110, 

xtype:  'numberfield',
value:  '0',
name:   'video_views_half',
itemId:   'video_views_half',
fieldLabel:  'Просмотры половины',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 165, 

xtype:  'numberfield',
value:  '0',
name:   'video_clicks_site',
itemId:   'video_clicks_site',
fieldLabel:  'Переходы на сайт',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 290 
        } //group
          ],//items = part panel
        instanceid:'',
        dockedItems: [{
            xtype:  'toolbar',
            dock:   'bottom',
            ui:     'footer',
                items: ['->', {
                    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: true,
                    scope:  this,
                    handler : this.onSave
                }
               , {
                    iconCls:  'icon-cancel',
                    text:   'Закрыть',
                    scope:  this,
                    handler : this.onReset
                }
              ]
            }] // dockedItems
        }); //Ext.apply
        this.callParent();
    }, //initComponent 
    setActiveRecord: function(record,instid){
        this.activeRecord = record;
        this.instanceid = instid;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },
    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_vk_camstat/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_camstatid: active.get('vk_camstatid')
                    ,join_rate: active.get('join_rate') 
                    ,overal: active.get('overal') 
                    ,s_day: active.get('s_day') 
                    ,spent: active.get('spent') 
                    ,video_views: active.get('video_views') 
                    ,impressions: active.get('impressions') 
                    ,video_views_full: active.get('video_views_full') 
                    ,reach: active.get('reach') 
                    ,s_month: active.get('s_month') 
                    ,video_views_half: active.get('video_views_half') 
                    ,period: active.get('period') 
                    ,clicks: active.get('clicks') 
                    ,video_clicks_site: active.get('video_clicks_site') 
                }
                , success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
	            if(res.success==false){
	       	        Ext.MessageBox.show({
	       		        title:  'Ошибка',
	       		        msg:    res.msg,
	       		        buttons: Ext.MessageBox.OK,
	       		        icon:   Ext.MessageBox.ERROR
	       	            });
        		    StatusErr( 'Ошибка. '+res.msg);
	            }else{
                    if(active.get('vk_camstatid')==''){
               			active.set('vk_camstatid',res.data['vk_camstatid']);
                    }
        		    StatusReady('Изменения сохранены');
                form.owner.ownerCt.close();
                }
              }
            });
        }else{
        		Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Не все обязательные поля заполнены!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
        }
    },
    onReset: function(){
        if(this.activeRecord.get('vk_camstatid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_camstatmain', {
    extend:  'Ext.window.Window',
    maxHeight: 955,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:670,
    height:670,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Ежедневная статистика',
    items:[{
        xtype:  'f_vk_camstatmain'
	}]
	});
}
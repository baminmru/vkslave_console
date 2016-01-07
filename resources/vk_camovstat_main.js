
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_camovstat_main(id,mystore){

var p1 ; 
var p1_saved=false;
var p1_valid=false;
     function onSave(close_after_save,callaftersave){
        var active = p1.activeRecord,
        form = p1.getForm();
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_vk_camovstat/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,vk_camovstatid: active.get('vk_camovstatid')
                    ,join_rate: active.get('join_rate') 
                    ,spent: active.get('spent') 
                    ,clicks: active.get('clicks') 
                    ,impressions: active.get('impressions') 
                    ,video_views: active.get('video_views') 
                    ,video_clicks_site: active.get('video_clicks_site') 
                    ,video_views_half: active.get('video_views_half') 
                    ,video_views_full: active.get('video_views_full') 
                    ,reach: active.get('reach') 
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
        		        StatusErr('Ошибка. '+res.msg);
                        p1_saved=false;
	            }else{
                    if(active.get('vk_camovstatid')==''){
               			active.set('vk_camovstatid',res.data['vk_camovstatid']);
                    }
        		   /* Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    }); */
        		    StatusReady('Изменения сохранены');
                    p1_saved=true;
                   if(selection){
                     Ext.Ajax.request({
                        url: rootURL+'index.php/c_v_autovk_camovstat/getRows?&filter=[{"property":"vk_camovstatid","value":"'+ active.get('vk_camovstatid') + '"}]',
                        method:     'GET',
                        success: function(response){
                            var data = Ext.decode(response.responseText);
                            selection.set(data.rows[0]);
                            selection.commit();
                        }
                     });
                   }
                    if (close_after_save) { if (typeof(callaftersave) == 'function') callaftersave();  p1.up('window').close(); }
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
    };
     function onSave1(aftersave){onSave(false,aftersave);}
     function onSave2(aftersave){onSave(true,aftersave);}
    function onReset(){
        p1.setActiveRecord(null,null);
    }
p1=new Ext.form.Panel(
{
            itemId: id+'',
            autoScroll:true,
            border:0, 
            layout: 'absolute',
            activeRecord: null,
            selection: null,
            defaultType:  'textfield',
            doSave: onSave2,
            canClose: function(){
            	if( p1_valid){
            		if(! p1.getForm().isValid()  ) return true;
            		return true ;
            	}else{
            		if(! p1.getForm().isValid()  ) return false;
            		if(p1_saved) return  true;
            		return false;
            	}
            },
        id:'vk_camovstat',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'vk_camovstat-0',
        y: 0, 
        x: 0, 
        border:1, 
        layout:'absolute', 
        items: [
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'join_rate',
itemId:   'join_rate',
fieldLabel:  'Подписки',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 5, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'spent',
itemId:   'spent',
fieldLabel:  'Потрачено',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 40, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'clicks',
itemId:   'clicks',
fieldLabel:  'Клики',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 40, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'impressions',
itemId:   'impressions',
fieldLabel:  'Просмотры',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 75, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'reach',
itemId:   'reach',
fieldLabel:  'Охват',
allowBlank:true
}
       ],
       height: 130 
        }
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 135, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_camovstat_1',
        title:      'Видео',
        defaultType:  'textfield',
            items: [
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'video_views',
itemId:   'video_views',
fieldLabel:  'Просмотры',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 5, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'video_clicks_site',
itemId:   'video_clicks_site',
fieldLabel:  'Переходы на сайт',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 40, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'video_views_half',
itemId:   'video_views_half',
fieldLabel:  'Просмотры половины',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 40, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'video_views_full',
itemId:   'video_views_full',
fieldLabel:  'просмотры целого',
allowBlank:true
}
       ], 
       height: 135 
        } // group
          ],//items = part panel
        instanceid:''
    ,setActiveRecord: function(record,instid){
        p1.activeRecord = record;
        p1.instanceid = instid;
        if (record) {
            p1.getForm().loadRecord(record);
            p1_valid =p1.getForm().isValid();
        } else {
            p1.getForm().reset();
        }
    }
}); // 'Ext.Define

return p1;
};
function DefineForms_vk_camovstat_main(){


Ext.define('Form_vk_camovstatmain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_camovstatmain',
initComponent: function(){
    //this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'vk_camovstat',
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
        id:'vk_camovstat-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
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
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 0, 

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
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 0, 

xtype:  'numberfield',
value:  '0',
name:   'clicks',
itemId:   'clicks',
fieldLabel:  'Клики',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 55, 

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
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 55, 

xtype:  'numberfield',
value:  '0',
name:   'reach',
itemId:   'reach',
fieldLabel:  'Охват',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 130 
        }
,
        { 
        xtype:'panel', 
        id:'vk_camovstat-1',
        title:      'Видео',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
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
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 0, 

xtype:  'numberfield',
value:  '0',
name:   'video_clicks_site',
itemId:   'video_clicks_site',
fieldLabel:  'Переходы на сайт',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 0, 

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
        minWidth: 220,
        width: 220,
        maxWidth: 220,
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
       ], width: 760,
       height: 180 
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
                url: rootURL+'index.php/c_vk_camovstat/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_camovstatid: active.get('vk_camovstatid')
                    ,join_rate: active.get('join_rate') 
                    ,spent: active.get('spent') 
                    ,clicks: active.get('clicks') 
                    ,impressions: active.get('impressions') 
                    ,video_views: active.get('video_views') 
                    ,video_clicks_site: active.get('video_clicks_site') 
                    ,video_views_half: active.get('video_views_half') 
                    ,video_views_full: active.get('video_views_full') 
                    ,reach: active.get('reach') 
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
                    if(active.get('vk_camovstatid')==''){
               			active.set('vk_camovstatid',res.data['vk_camovstatid']);
                    }
        		    StatusReady('Изменения сохранены');
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
        if(this.activeRecord.get('vk_camovstatid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_camovstatmain', {
    extend:  'Ext.window.Window',
    maxHeight: 460,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:410,
    height:420,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Итоговая статистика',
    items:[{
        xtype:  'f_vk_camovstatmain'
	}]
	});
}
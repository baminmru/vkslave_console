
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_adsutm_main(id,mystore){

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
                url: rootURL+'index.php/c_vk_adsutm/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,vk_adsutmid: active.get('vk_adsutmid')
                    ,autoutm: active.get('autoutm') 
                    ,utm_source: active.get('utm_source') 
                    ,utm_medium: active.get('utm_medium') 
                    ,utm_term: active.get('utm_term') 
                    ,utm_content: active.get('utm_content') 
                    ,utm_campaign: active.get('utm_campaign') 
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
                    if(active.get('vk_adsutmid')==''){
               			active.set('vk_adsutmid',res.data['vk_adsutmid']);
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
                        url: rootURL+'index.php/c_v_autovk_adsutm/getRows?&filter=[{"property":"vk_adsutmid","value":"'+ active.get('vk_adsutmid') + '"}]',
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
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'vk_adsutm-0',
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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'autoutm_grid',
itemId:   'autoutm_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('autoutm', record.get('value'));}  },
fieldLabel:  'Стандартное',
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

xtype:  'textfield',
value:  '',
name:   'utm_source',
itemId:   'utm_source',
fieldLabel:  'Источник',
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

xtype:  'textfield',
value:  '',
name:   'utm_medium',
itemId:   'utm_medium',
fieldLabel:  'Канал',
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

xtype:  'textfield',
value:  '',
name:   'utm_term',
itemId:   'utm_term',
fieldLabel:  'Ключевое слово ',
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

xtype:  'textfield',
value:  '',
name:   'utm_content',
itemId:   'utm_content',
fieldLabel:  'Содержание ',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 75, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'utm_campaign',
itemId:   'utm_campaign',
fieldLabel:  'Название',
allowBlank:true
}
       ],
       height: 130 
        }
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
function DefineForms_vk_adsutm_main(){


Ext.define('Form_vk_adsutmmain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_adsutmmain',
initComponent: function(){
    //this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
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
        id:'vk_adsutm-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 0, 

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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'autoutm_grid',
itemId:   'autoutm_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('autoutm', record.get('value'));}  },
fieldLabel:  'Стандартное',
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

xtype:  'textfield',
value:  '',
name:   'utm_source',
itemId:   'utm_source',
fieldLabel:  'Источник',
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

xtype:  'textfield',
value:  '',
name:   'utm_medium',
itemId:   'utm_medium',
fieldLabel:  'Канал',
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

xtype:  'textfield',
value:  '',
name:   'utm_term',
itemId:   'utm_term',
fieldLabel:  'Ключевое слово ',
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

xtype:  'textfield',
value:  '',
name:   'utm_content',
itemId:   'utm_content',
fieldLabel:  'Содержание ',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 55, 

xtype:  'textfield',
value:  '',
name:   'utm_campaign',
itemId:   'utm_campaign',
fieldLabel:  'Название',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 130 
        }
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
                url: rootURL+'index.php/c_vk_adsutm/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_adsutmid: active.get('vk_adsutmid')
                    ,autoutm: active.get('autoutm') 
                    ,utm_source: active.get('utm_source') 
                    ,utm_medium: active.get('utm_medium') 
                    ,utm_term: active.get('utm_term') 
                    ,utm_content: active.get('utm_content') 
                    ,utm_campaign: active.get('utm_campaign') 
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
                    if(active.get('vk_adsutmid')==''){
               			active.set('vk_adsutmid',res.data['vk_adsutmid']);
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
        if(this.activeRecord.get('vk_adsutmid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_adsutmmain', {
    extend:  'Ext.window.Window',
    maxHeight: 270,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:220,
    height:230,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'UTM разметка',
    items:[{
        xtype:  'f_vk_adsutmmain'
	}]
	});
}
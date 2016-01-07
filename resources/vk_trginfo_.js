
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_trginfo_(id,mystore,selection){

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
                url: rootURL+'index.php/c_vk_trginfo/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,vk_trginfoid: active.get('vk_trginfoid')
                    ,name: active.get('name') 
                    ,cab: active.get('cab') 
                    ,vkid: active.get('vkid') 
                    ,info: active.get('info') 
                    ,trgdomain: active.get('trgdomain') 
                    ,audience_count: active.get('audience_count') 
                    ,lifetime: active.get('lifetime') 
                    ,pixel: active.get('pixel') 
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
                    if(active.get('vk_trginfoid')==''){
               			active.set('vk_trginfoid',res.data['vk_trginfoid']);
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
                        url: rootURL+'index.php/c_v_autovk_trginfo/getRows?&filter=[{"property":"vk_trginfoid","value":"'+ active.get('vk_trginfoid') + '"}]',
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
            selection: selection,
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
        id:'vk_trginfo-0',
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

xtype:  'textfield',
value:  '',
name:   'name',
itemId:   'name',
fieldLabel:  'Название',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('cab',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('cab', records.get('id'));}  },
store: cmbstore_vk_cab,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cab_grid',
itemId:   'cab_grid',
fieldLabel:  'Кабинет',
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
name:   'vkid',
itemId:   'vkid',
fieldLabel:  'ID',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 720,
        xtype: 'textarea', 
        x: 5, 
        y: 75, 
        height: 80, 
labelWidth:140,

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Описание',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 165, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'trgdomain',
itemId:   'trgdomain',
fieldLabel:  'Домен',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 165, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'audience_count',
itemId:   'audience_count',
fieldLabel:  'Аудитория',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 200, 
labelWidth:140,

xtype:  'numberfield',
value:  '0',
name:   'lifetime',
itemId:   'lifetime',
fieldLabel:  'Автоудаление через (дн.)',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 720,
        xtype: 'textarea', 
        x: 5, 
        y: 235, 
        height: 80, 
labelWidth:140,

value:  '',
name:   'pixel',
itemId:   'pixel',
fieldLabel:  'Код для вставки',
allowBlank:true
}
       ],
       height: 345 
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
function DefineForms_vk_trginfo_(){


Ext.define('Form_vk_trginfo', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_trginfo',
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
        id:'vk_trginfo-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'name',
itemId:   'name',
fieldLabel:  'Название',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('cab',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('cab', records.get('id'));}  },
store: cmbstore_vk_cab,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cab_grid',
itemId:   'cab_grid',
fieldLabel:  'Кабинет',
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
name:   'vkid',
itemId:   'vkid',
fieldLabel:  'ID',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 55, 
        height: 80, 

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Описание',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 145, 

xtype:  'textfield',
value:  '',
name:   'trgdomain',
itemId:   'trgdomain',
fieldLabel:  'Домен',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 145, 

xtype:  'numberfield',
value:  '0',
name:   'audience_count',
itemId:   'audience_count',
fieldLabel:  'Аудитория',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 145, 

xtype:  'numberfield',
value:  '0',
name:   'lifetime',
itemId:   'lifetime',
fieldLabel:  'Автоудаление через (дн.)',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 200, 
        height: 80, 

value:  '',
name:   'pixel',
itemId:   'pixel',
fieldLabel:  'Код для вставки',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 310 
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
                url: rootURL+'index.php/c_vk_trginfo/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_trginfoid: active.get('vk_trginfoid')
                    ,name: active.get('name') 
                    ,cab: active.get('cab') 
                    ,vkid: active.get('vkid') 
                    ,info: active.get('info') 
                    ,trgdomain: active.get('trgdomain') 
                    ,audience_count: active.get('audience_count') 
                    ,lifetime: active.get('lifetime') 
                    ,pixel: active.get('pixel') 
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
                    if(active.get('vk_trginfoid')==''){
               			active.set('vk_trginfoid',res.data['vk_trginfoid']);
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
        if(this.activeRecord.get('vk_trginfoid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_trginfo', {
    extend:  'Ext.window.Window',
    maxHeight: 450,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:400,
    height:410,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Описание',
    items:[{
        xtype:  'f_vk_trginfo'
	}]
	});
}
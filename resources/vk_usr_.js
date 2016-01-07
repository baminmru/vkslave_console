
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_usr_(id,mystore,selection){

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
                url: rootURL+'index.php/c_vk_usr/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,vk_usrid: active.get('vk_usrid')
                    ,vkid: active.get('vkid') 
                    ,first_name: active.get('first_name') 
                    ,last_name: active.get('last_name') 
                    ,deactivated: active.get('deactivated') 
                    ,photo_id: active.get('photo_id') 
                    ,sex: active.get('sex') 
                    ,bdate: active.get('bdate') 
                    ,country: active.get('country') 
                    ,home_town: active.get('home_town') 
                    ,has_photo: active.get('has_photo') 
                    ,photo_50: active.get('photo_50') 
                    ,photo_100: active.get('photo_100') 
                    ,online: active.get('online') 
                    ,status: active.get('status') 
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
                    if(active.get('vk_usrid')==''){
               			active.set('vk_usrid',res.data['vk_usrid']);
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
                        url: rootURL+'index.php/c_v_autovk_usr/getRows?&filter=[{"property":"vk_usrid","value":"'+ active.get('vk_usrid') + '"}]',
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
        id:'vk_usr-0',
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
name:   'vkid',
itemId:   'vkid',
fieldLabel:  'id',
editable: false,
readOnly: true,
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
name:   'first_name',
itemId:   'first_name',
fieldLabel:  'Имя',
editable: false,
readOnly: true,
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
name:   'last_name',
itemId:   'last_name',
fieldLabel:  'Фамилия',
editable: false,
readOnly: true,
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

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_YesNo,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'deactivated_grid',
itemId:   'deactivated_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('deactivated', record.get('value'));}  },
fieldLabel:  'Запись удалена',
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
name:   'photo_id',
itemId:   'photo_id',
fieldLabel:  'Фото',
editable: false,
readOnly: true,
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

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Sex,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'sex_grid',
itemId:   'sex_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('sex', record.get('value'));}  },
fieldLabel:  'Пол',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 110, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'bdate',
itemId:   'bdate',
fieldLabel:  'дата рождения',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 110, 
labelWidth:140,

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_vk_country,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'country_grid',
itemId:   'country_grid',
fieldLabel:  'Страна',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 145, 
labelWidth:140,

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_vk_town,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'home_town_grid',
itemId:   'home_town_grid',
fieldLabel:  'Родной город',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 145, 
labelWidth:140,

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_YesNo,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'has_photo_grid',
itemId:   'has_photo_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('has_photo', record.get('value'));}  },
fieldLabel:  'Есть фото',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 180, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'photo_50',
itemId:   'photo_50',
fieldLabel:  'Фото 50',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 180, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'photo_100',
itemId:   'photo_100',
fieldLabel:  'Фото 100',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 215, 
labelWidth:140,

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_YesNo,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'online_grid',
itemId:   'online_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('online', record.get('value'));}  },
fieldLabel:  'On-Line',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 215, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'status',
itemId:   'status',
fieldLabel:  'Статус',
editable: false,
readOnly: true,
allowBlank:true
}
       ],
       height: 270 
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
function DefineForms_vk_usr_(){


Ext.define('Form_vk_usr', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_usr',
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
        id:'vk_usr-0',
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
name:   'vkid',
itemId:   'vkid',
fieldLabel:  'id',
editable: false,
readOnly: true,
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
name:   'first_name',
itemId:   'first_name',
fieldLabel:  'Имя',
editable: false,
readOnly: true,
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
name:   'last_name',
itemId:   'last_name',
fieldLabel:  'Фамилия',
editable: false,
readOnly: true,
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

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_YesNo,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'deactivated_grid',
itemId:   'deactivated_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('deactivated', record.get('value'));}  },
fieldLabel:  'Запись удалена',
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
name:   'photo_id',
itemId:   'photo_id',
fieldLabel:  'Фото',
editable: false,
readOnly: true,
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

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Sex,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'sex_grid',
itemId:   'sex_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('sex', record.get('value'));}  },
fieldLabel:  'Пол',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 110, 

xtype:  'textfield',
value:  '',
name:   'bdate',
itemId:   'bdate',
fieldLabel:  'дата рождения',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 110, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_vk_country,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'country_grid',
itemId:   'country_grid',
fieldLabel:  'Страна',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 110, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_vk_town,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'home_town_grid',
itemId:   'home_town_grid',
fieldLabel:  'Родной город',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 165, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_YesNo,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'has_photo_grid',
itemId:   'has_photo_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('has_photo', record.get('value'));}  },
fieldLabel:  'Есть фото',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 165, 

xtype:  'textfield',
value:  '',
name:   'photo_50',
itemId:   'photo_50',
fieldLabel:  'Фото 50',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 165, 

xtype:  'textfield',
value:  '',
name:   'photo_100',
itemId:   'photo_100',
fieldLabel:  'Фото 100',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 220, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_YesNo,
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'online_grid',
itemId:   'online_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('online', record.get('value'));}  },
fieldLabel:  'On-Line',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 220, 

xtype:  'textfield',
value:  '',
name:   'status',
itemId:   'status',
fieldLabel:  'Статус',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 295 
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
                url: rootURL+'index.php/c_vk_usr/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_usrid: active.get('vk_usrid')
                    ,vkid: active.get('vkid') 
                    ,first_name: active.get('first_name') 
                    ,last_name: active.get('last_name') 
                    ,deactivated: active.get('deactivated') 
                    ,photo_id: active.get('photo_id') 
                    ,sex: active.get('sex') 
                    ,bdate: active.get('bdate') 
                    ,country: active.get('country') 
                    ,home_town: active.get('home_town') 
                    ,has_photo: active.get('has_photo') 
                    ,photo_50: active.get('photo_50') 
                    ,photo_100: active.get('photo_100') 
                    ,online: active.get('online') 
                    ,status: active.get('status') 
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
                    if(active.get('vk_usrid')==''){
               			active.set('vk_usrid',res.data['vk_usrid']);
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
        if(this.activeRecord.get('vk_usrid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_usr', {
    extend:  'Ext.window.Window',
    maxHeight: 435,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:385,
    height:395,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'ВК. Пользователь',
    items:[{
        xtype:  'f_vk_usr'
	}]
	});
}
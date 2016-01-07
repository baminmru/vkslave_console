
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_adinfo_main(id,mystore,selection){

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
                url: rootURL+'index.php/c_vk_adinfo/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,vk_adinfoid: active.get('vk_adinfoid')
                    ,name: active.get('name') 
                    ,ads_id: active.get('ads_id') 
                    ,campaign_id: active.get('campaign_id') 
                    ,ad_format: active.get('ad_format') 
                    ,age_restriction: active.get('age_restriction') 
                    ,cost_type: active.get('cost_type') 
                    ,cpc: active.get('cpc') 
                    ,cpm: active.get('cpm') 
                    ,ad_platform: active.get('ad_platform') 
                    ,category1_id: active.get('category1_id') 
                    ,category2_id: active.get('category2_id') 
                    ,status: active.get('status') 
                    ,impression_limit: active.get('impression_limit') 
                    ,all_limit: active.get('all_limit') 
                    ,approved: active.get('approved') 
                    ,video: active.get('video') 
                    ,disclamer: active.get('disclamer') 
                    ,title: active.get('title') 
                    ,_description: active.get('_description') 
                    ,link_url: active.get('link_url') 
                    ,link_domain: active.get('link_domain') 
                    ,preview_link: active.get('preview_link') 
                    ,image_src: active.get('image_src') 
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
                    if(active.get('vk_adinfoid')==''){
               			active.set('vk_adinfoid',res.data['vk_adinfoid']);
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
                        url: rootURL+'index.php/c_v_autovk_adinfo/getRows?&filter=[{"property":"vk_adinfoid","value":"'+ active.get('vk_adinfoid') + '"}]',
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
        id:'vk_adinfo',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'vk_adinfo-0',
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

xtype:  'textfield',
value:  '',
name:   'ads_id',
itemId:   'ads_id',
fieldLabel:  'ID',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 40, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('campaign_id', records.get('id'));}  },
store: cmbstore_vk_camp,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'campaign_id_grid',
itemId:   'campaign_id_grid',
fieldLabel:  'Кампания',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 40, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ad_format', records.get('id'));}  },
store: cmbstore_vk_adformat,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'ad_format_grid',
itemId:   'ad_format_grid',
fieldLabel:  'Формат',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 75, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('age_restriction',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('age_restriction', records.get('id'));}  },
store: cmbstore_vk_age,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'age_restriction_grid',
itemId:   'age_restriction_grid',
fieldLabel:  'Ограничение',
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

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ad_platform', records.get('id'));}  },
store: cmbstore_vk_platform,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'ad_platform_grid',
itemId:   'ad_platform_grid',
fieldLabel:  'Площадки',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 110, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('category1_id',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('category1_id', records.get('id'));}  },
store: cmbstore_vk_category,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'category1_id_grid',
itemId:   'category1_id_grid',
fieldLabel:  'Категория 1',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('category2_id',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('category2_id', records.get('id'));}  },
store: cmbstore_vk_category,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'category2_id_grid',
itemId:   'category2_id_grid',
fieldLabel:  'Категория 2',
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('status', records.get('id'));}  },
store: cmbstore_vk_adstate,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'status_grid',
itemId:   'status_grid',
fieldLabel:  'Статус',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'impression_limit_grid',
itemId:   'impression_limit_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('impression_limit', record.get('value'));}  },
fieldLabel:  'Ограничение показов',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('approved',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('approved', records.get('id'));}  },
store: cmbstore_vk_approve,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'approved_grid',
itemId:   'approved_grid',
fieldLabel:  'Модерация',
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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'video_grid',
itemId:   'video_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('video', record.get('value'));}  },
fieldLabel:  'Реклама видео',
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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'disclamer_grid',
itemId:   'disclamer_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('disclamer', record.get('value'));}  },
fieldLabel:  'Предупреждения',
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
name:   'title',
itemId:   'title',
fieldLabel:  'Заголовок',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 250, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   '_description',
itemId:   '_description',
fieldLabel:  'Описание',
allowBlank:true
}
       ],
       height: 305 
        }
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 310, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_adinfo_1',
        title:      'Оплата',
        defaultType:  'textfield',
            items: [
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('cost_type', records.get('id'));}  },
store: cmbstore_vk_paytype,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cost_type_grid',
itemId:   'cost_type_grid',
fieldLabel:  'тип оплаты',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
name:   'cpc',
itemId:   'cpc',
fieldLabel:  'За переход(коп)',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
name:   'cpm',
itemId:   'cpm',
fieldLabel:  'За 1000 показов(коп)',
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
name:   'all_limit',
itemId:   'all_limit',
fieldLabel:  'Лимит (руб)',
allowBlank:true
}
       ], 
       height: 135 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 450, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_adinfo_2',
        title:      'Ссылки',
        defaultType:  'textfield',
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
name:   'link_url',
itemId:   'link_url',
fieldLabel:  'Рекламируем',
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
name:   'link_domain',
itemId:   'link_domain',
fieldLabel:  'Домен рекламы',
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
name:   'preview_link',
itemId:   'preview_link',
fieldLabel:  'Превью',
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
name:   'image_src',
itemId:   'image_src',
fieldLabel:  'Изображение',
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
function DefineForms_vk_adinfo_main(){


Ext.define('Form_vk_adinfomain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_adinfomain',
initComponent: function(){
    //this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'vk_adinfo',
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
        id:'vk_adinfo-0',
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

xtype:  'textfield',
value:  '',
name:   'ads_id',
itemId:   'ads_id',
fieldLabel:  'ID',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 0, 

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('campaign_id', records.get('id'));}  },
store: cmbstore_vk_camp,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'campaign_id_grid',
itemId:   'campaign_id_grid',
fieldLabel:  'Кампания',
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
        y: 55, 

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ad_format', records.get('id'));}  },
store: cmbstore_vk_adformat,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'ad_format_grid',
itemId:   'ad_format_grid',
fieldLabel:  'Формат',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 55, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('age_restriction',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('age_restriction', records.get('id'));}  },
store: cmbstore_vk_age,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'age_restriction_grid',
itemId:   'age_restriction_grid',
fieldLabel:  'Ограничение',
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

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ad_platform', records.get('id'));}  },
store: cmbstore_vk_platform,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'ad_platform_grid',
itemId:   'ad_platform_grid',
fieldLabel:  'Площадки',
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
        y: 110, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('category1_id',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('category1_id', records.get('id'));}  },
store: cmbstore_vk_category,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'category1_id_grid',
itemId:   'category1_id_grid',
fieldLabel:  'Категория 1',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('category2_id',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('category2_id', records.get('id'));}  },
store: cmbstore_vk_category,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'category2_id_grid',
itemId:   'category2_id_grid',
fieldLabel:  'Категория 2',
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('status', records.get('id'));}  },
store: cmbstore_vk_adstate,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'status_grid',
itemId:   'status_grid',
fieldLabel:  'Статус',
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
        y: 165, 

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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'impression_limit_grid',
itemId:   'impression_limit_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('impression_limit', record.get('value'));}  },
fieldLabel:  'Ограничение показов',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('approved',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('approved', records.get('id'));}  },
store: cmbstore_vk_approve,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'approved_grid',
itemId:   'approved_grid',
fieldLabel:  'Модерация',
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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'video_grid',
itemId:   'video_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('video', record.get('value'));}  },
fieldLabel:  'Реклама видео',
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
valueField:     'name',
displayField:   'name',
//typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'disclamer_grid',
itemId:   'disclamer_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('disclamer', record.get('value'));}  },
fieldLabel:  'Предупреждения',
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
name:   'title',
itemId:   'title',
fieldLabel:  'Заголовок',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 220, 

xtype:  'textfield',
value:  '',
name:   '_description',
itemId:   '_description',
fieldLabel:  'Описание',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 295 
        }
,
        { 
        xtype:'panel', 
        id:'vk_adinfo-1',
        title:      'Оплата',
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

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('cost_type', records.get('id'));}  },
store: cmbstore_vk_paytype,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cost_type_grid',
itemId:   'cost_type_grid',
fieldLabel:  'тип оплаты',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
name:   'cpc',
itemId:   'cpc',
fieldLabel:  'За переход(коп)',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
name:   'cpm',
itemId:   'cpm',
fieldLabel:  'За 1000 показов(коп)',
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
name:   'all_limit',
itemId:   'all_limit',
fieldLabel:  'Лимит (руб)',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 180 
        } //group
,
        { 
        xtype:'panel', 
        id:'vk_adinfo-2',
        title:      'Ссылки',
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

xtype:  'textfield',
value:  '',
name:   'link_url',
itemId:   'link_url',
fieldLabel:  'Рекламируем',
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
name:   'link_domain',
itemId:   'link_domain',
fieldLabel:  'Домен рекламы',
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
name:   'preview_link',
itemId:   'preview_link',
fieldLabel:  'Превью',
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
name:   'image_src',
itemId:   'image_src',
fieldLabel:  'Изображение',
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
                url: rootURL+'index.php/c_vk_adinfo/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_adinfoid: active.get('vk_adinfoid')
                    ,name: active.get('name') 
                    ,ads_id: active.get('ads_id') 
                    ,campaign_id: active.get('campaign_id') 
                    ,ad_format: active.get('ad_format') 
                    ,age_restriction: active.get('age_restriction') 
                    ,cost_type: active.get('cost_type') 
                    ,cpc: active.get('cpc') 
                    ,cpm: active.get('cpm') 
                    ,ad_platform: active.get('ad_platform') 
                    ,category1_id: active.get('category1_id') 
                    ,category2_id: active.get('category2_id') 
                    ,status: active.get('status') 
                    ,impression_limit: active.get('impression_limit') 
                    ,all_limit: active.get('all_limit') 
                    ,approved: active.get('approved') 
                    ,video: active.get('video') 
                    ,disclamer: active.get('disclamer') 
                    ,title: active.get('title') 
                    ,_description: active.get('_description') 
                    ,link_url: active.get('link_url') 
                    ,link_domain: active.get('link_domain') 
                    ,preview_link: active.get('preview_link') 
                    ,image_src: active.get('image_src') 
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
                    if(active.get('vk_adinfoid')==''){
               			active.set('vk_adinfoid',res.data['vk_adinfoid']);
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
        if(this.activeRecord.get('vk_adinfoid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_adinfomain', {
    extend:  'Ext.window.Window',
    maxHeight: 815,
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
    title:  'Описание',
    items:[{
        xtype:  'f_vk_adinfomain'
	}]
	});
}
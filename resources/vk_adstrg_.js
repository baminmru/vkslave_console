
Ext.require([
'Ext.form.*'
]);

function DefineInterface_vk_adstrg_(id,mystore){

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
                url: rootURL+'index.php/c_vk_adstrg/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,vk_adstrgid: active.get('vk_adstrgid')
                    ,sex: active.get('sex') 
                    ,birthday: active.get('birthday') 
                    ,statuses: active.get('statuses') 
                    ,positions: active.get('positions') 
                    ,paying: active.get('paying') 
                    ,age_from: active.get('age_from') 
                    ,age_to: active.get('age_to') 
                    ,school_from: active.get('school_from') 
                    ,school_to: active.get('school_to') 
                    ,uni_from: active.get('uni_from') 
                    ,uni_to: active.get('uni_to') 
                    ,country: active.get('country') 
                    ,cities: active.get('cities') 
                    ,cities_not: active.get('cities_not') 
                    ,districts: active.get('districts') 
                    ,stations: active.get('stations') 
                    ,streets: active.get('streets') 
                    ,religions: active.get('religions') 
                    ,interests: active.get('interests') 
                    ,interest_categories: active.get('interest_categories') 
                    ,travellers: active.get('travellers') 
                    ,groups: active.get('groups') 
                    ,groups_not: active.get('groups_not') 
                    ,apps: active.get('apps') 
                    ,apps_not: active.get('apps_not') 
                    ,user_devices: active.get('user_devices') 
                    ,user_os: active.get('user_os') 
                    ,user_browsers: active.get('user_browsers') 
                    ,retargeting_groups: active.get('retargeting_groups') 
                    ,retargeting_groups_not: active.get('retargeting_groups_not') 
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
                    if(active.get('vk_adstrgid')==''){
               			active.set('vk_adstrgid',res.data['vk_adstrgid']);
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
                        url: rootURL+'index.php/c_v_autovk_adstrg/getRows?&filter=[{"property":"vk_adstrgid","value":"'+ active.get('vk_adstrgid') + '"}]',
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
        id:'vk_adstrg',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'vk_adstrg-0',
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
name:   'birthday',
itemId:   'birthday',
fieldLabel:  'День рождения',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('statuses',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('statuses', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_matrialstatus,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'statuses_grid',
itemId:   'statuses_grid',
fieldLabel:  'Семейное положение',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('positions',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('positions', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_position,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'positions_grid',
itemId:   'positions_grid',
fieldLabel:  'Должность',
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
name:   'paying',
itemId:   'paying',
fieldLabel:  'Использует голоса  ВК',
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
        id:'vk_adstrg_1',
        title:      'Возрастные',
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
name:   'age_from',
itemId:   'age_from',
fieldLabel:  'Возраст от',
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
name:   'age_to',
itemId:   'age_to',
fieldLabel:  'Возраст до',
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
name:   'school_from',
itemId:   'school_from',
fieldLabel:  'Окончание школы С',
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

xtype:  'numberfield',
value:  '0',
name:   'school_to',
itemId:   'school_to',
fieldLabel:  'Окончание школыПо',
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

xtype:  'numberfield',
value:  '0',
name:   'uni_from',
itemId:   'uni_from',
fieldLabel:  'Окончание вуза',
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

xtype:  'numberfield',
value:  '0',
name:   'uni_to',
itemId:   'uni_to',
fieldLabel:  'Окончание вуза',
allowBlank:true
}
       ], 
       height: 170 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 310, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_adstrg_2',
        title:      'Местоположение',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('country',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('country', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
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
        x: 375, 
        y: 5, 
labelWidth:140,

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('cities',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('cities', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_town,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cities_grid',
itemId:   'cities_grid',
fieldLabel:  'Города',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('cities_not',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('cities_not', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_town,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cities_not_grid',
itemId:   'cities_not_grid',
fieldLabel:  'Исключая города',
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
name:   'districts',
itemId:   'districts',
fieldLabel:  'Районы',
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
name:   'stations',
itemId:   'stations',
fieldLabel:  'Станции',
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
name:   'streets',
itemId:   'streets',
fieldLabel:  'Улицы',
allowBlank:true
}
       ], 
       height: 170 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 485, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_adstrg_3',
        title:      'Интересы',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('religions',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('religions', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_religion,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'religions_grid',
itemId:   'religions_grid',
fieldLabel:  'Религиозные вгляды',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('interests',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('interests', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_interest,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'interests_grid',
itemId:   'interests_grid',
fieldLabel:  'Интересы',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('interest_categories',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('interest_categories', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_category,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'interest_categories_grid',
itemId:   'interest_categories_grid',
fieldLabel:  'Категории',
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
name:   'travellers_grid',
itemId:   'travellers_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('travellers', record.get('value'));}  },
fieldLabel:  'Путешественники',
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
name:   'groups',
itemId:   'groups',
fieldLabel:  'Группы',
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
name:   'groups_not',
itemId:   'groups_not',
fieldLabel:  'Исключая группы',
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
name:   'apps',
itemId:   'apps',
fieldLabel:  'Приложения',
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

xtype:  'textfield',
value:  '',
name:   'apps_not',
itemId:   'apps_not',
fieldLabel:  'Исключая приложения',
allowBlank:true
}
       ], 
       height: 205 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 695, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_adstrg_4',
        title:      'Компьютер',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('user_devices',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('user_devices', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_device,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'user_devices_grid',
itemId:   'user_devices_grid',
fieldLabel:  'Устройства',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('user_os',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('user_os', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_os,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'user_os_grid',
itemId:   'user_os_grid',
fieldLabel:  'Оп. Системы',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('user_browsers',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('user_browsers', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_browser,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'user_browsers_grid',
itemId:   'user_browsers_grid',
fieldLabel:  'Браузеры',
allowBlank:true
}
       ], 
       height: 135 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        y: 835, 
        x: 0 , 
        layout:'absolute', 
        id:'vk_adstrg_5',
        title:      'Ретаргетинг',
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
name:   'retargeting_groups',
itemId:   'retargeting_groups',
fieldLabel:  'Группы ретаргетинга',
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
name:   'retargeting_groups_not',
itemId:   'retargeting_groups_not',
fieldLabel:  'Исключая группы',
allowBlank:true
}
       ], 
       height: 100 
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
function DefineForms_vk_adstrg_(){


Ext.define('Form_vk_adstrg', {
extend:  'Ext.form.Panel',
alias: 'widget.f_vk_adstrg',
initComponent: function(){
    //this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'vk_adstrg',
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
        id:'vk_adstrg-0',
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
name:   'birthday',
itemId:   'birthday',
fieldLabel:  'День рождения',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('statuses',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('statuses', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_matrialstatus,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'statuses_grid',
itemId:   'statuses_grid',
fieldLabel:  'Семейное положение',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('positions',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('positions', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_position,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'positions_grid',
itemId:   'positions_grid',
fieldLabel:  'Должность',
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
name:   'paying',
itemId:   'paying',
fieldLabel:  'Использует голоса  ВК',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 130 
        }
,
        { 
        xtype:'panel', 
        id:'vk_adstrg-1',
        title:      'Возрастные',
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
name:   'age_from',
itemId:   'age_from',
fieldLabel:  'Возраст от',
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
name:   'age_to',
itemId:   'age_to',
fieldLabel:  'Возраст до',
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
name:   'school_from',
itemId:   'school_from',
fieldLabel:  'Окончание школы С',
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

xtype:  'numberfield',
value:  '0',
name:   'school_to',
itemId:   'school_to',
fieldLabel:  'Окончание школыПо',
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

xtype:  'numberfield',
value:  '0',
name:   'uni_from',
itemId:   'uni_from',
fieldLabel:  'Окончание вуза',
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

xtype:  'numberfield',
value:  '0',
name:   'uni_to',
itemId:   'uni_to',
fieldLabel:  'Окончание вуза',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 180 
        } //group
,
        { 
        xtype:'panel', 
        id:'vk_adstrg-2',
        title:      'Местоположение',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('country',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('country', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
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
        x: 255, 
        y: 0, 

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('cities',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('cities', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_town,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cities_grid',
itemId:   'cities_grid',
fieldLabel:  'Города',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('cities_not',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('cities_not', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_town,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'cities_not_grid',
itemId:   'cities_not_grid',
fieldLabel:  'Исключая города',
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
name:   'districts',
itemId:   'districts',
fieldLabel:  'Районы',
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
name:   'stations',
itemId:   'stations',
fieldLabel:  'Станции',
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
name:   'streets',
itemId:   'streets',
fieldLabel:  'Улицы',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 180 
        } //group
,
        { 
        xtype:'panel', 
        id:'vk_adstrg-3',
        title:      'Интересы',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('religions',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('religions', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_religion,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'religions_grid',
itemId:   'religions_grid',
fieldLabel:  'Религиозные вгляды',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('interests',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('interests', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_interest,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'interests_grid',
itemId:   'interests_grid',
fieldLabel:  'Интересы',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('interest_categories',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('interest_categories', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_category,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'interest_categories_grid',
itemId:   'interest_categories_grid',
fieldLabel:  'Категории',
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
name:   'travellers_grid',
itemId:   'travellers_grid',
listeners:{  select: function ( combo, record, eOpts ) {combo.up('form' ).activeRecord.set('travellers', record.get('value'));}  },
fieldLabel:  'Путешественники',
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
name:   'groups',
itemId:   'groups',
fieldLabel:  'Группы',
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
name:   'groups_not',
itemId:   'groups_not',
fieldLabel:  'Исключая группы',
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
name:   'apps',
itemId:   'apps',
fieldLabel:  'Приложения',
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

xtype:  'textfield',
value:  '',
name:   'apps_not',
itemId:   'apps_not',
fieldLabel:  'Исключая приложения',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 235 
        } //group
,
        { 
        xtype:'panel', 
        id:'vk_adstrg-4',
        title:      'Компьютер',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('user_devices',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('user_devices', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_device,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'user_devices_grid',
itemId:   'user_devices_grid',
fieldLabel:  'Устройства',
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
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('user_os',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('user_os', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_os,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'user_os_grid',
itemId:   'user_os_grid',
fieldLabel:  'Оп. Системы',
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

xtype:  'combobox',
multiSelect : true,
delimiter:',', 
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('user_browsers',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			var cv = new String(this.getValue()); 
			var arrayOfStrings = cv.split(',');
			this.setValue(arrayOfStrings);
			this.expand();
		}
},
editable: false,
listeners:{  
select: function ( combo, records, eOpts ) {  
        var ids=''; 
        for(i=0;i<records.length;i++)  
        {
	        if(ids!=''){
		        ids=ids+';';
	        }
	        ids=ids+records[i].get('id');
        }
        combo.up('form' ).activeRecord.set('user_browsers', ids   );}  
,focus: function()   {  if(this.store.count(false)==0) this.store.load();  } 
},
store: cmbstore_vk_browser,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
emptyText:      '',
name:   'user_browsers_grid',
itemId:   'user_browsers_grid',
fieldLabel:  'Браузеры',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 125 
        } //group
,
        { 
        xtype:'panel', 
        id:'vk_adstrg-5',
        title:      'Ретаргетинг',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
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
name:   'retargeting_groups',
itemId:   'retargeting_groups',
fieldLabel:  'Группы ретаргетинга',
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
name:   'retargeting_groups_not',
itemId:   'retargeting_groups_not',
fieldLabel:  'Исключая группы',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 125 
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
                url: rootURL+'index.php/c_vk_adstrg/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,vk_adstrgid: active.get('vk_adstrgid')
                    ,sex: active.get('sex') 
                    ,birthday: active.get('birthday') 
                    ,statuses: active.get('statuses') 
                    ,positions: active.get('positions') 
                    ,paying: active.get('paying') 
                    ,age_from: active.get('age_from') 
                    ,age_to: active.get('age_to') 
                    ,school_from: active.get('school_from') 
                    ,school_to: active.get('school_to') 
                    ,uni_from: active.get('uni_from') 
                    ,uni_to: active.get('uni_to') 
                    ,country: active.get('country') 
                    ,cities: active.get('cities') 
                    ,cities_not: active.get('cities_not') 
                    ,districts: active.get('districts') 
                    ,stations: active.get('stations') 
                    ,streets: active.get('streets') 
                    ,religions: active.get('religions') 
                    ,interests: active.get('interests') 
                    ,interest_categories: active.get('interest_categories') 
                    ,travellers: active.get('travellers') 
                    ,groups: active.get('groups') 
                    ,groups_not: active.get('groups_not') 
                    ,apps: active.get('apps') 
                    ,apps_not: active.get('apps_not') 
                    ,user_devices: active.get('user_devices') 
                    ,user_os: active.get('user_os') 
                    ,user_browsers: active.get('user_browsers') 
                    ,retargeting_groups: active.get('retargeting_groups') 
                    ,retargeting_groups_not: active.get('retargeting_groups_not') 
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
                    if(active.get('vk_adstrgid')==''){
               			active.set('vk_adstrgid',res.data['vk_adstrgid']);
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
        if(this.activeRecord.get('vk_adstrgid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_vk_adstrg', {
    extend:  'Ext.window.Window',
    maxHeight: 1165,
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
    title:  'Таргетинг',
    items:[{
        xtype:  'f_vk_adstrg'
	}]
	});
}
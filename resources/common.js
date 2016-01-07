Ext.define('iu.window', {
	extend: 'Ext.window.Window',
	closeAction:'destroy',
	modal : true,
	constrainHeader:true,
	resizable : false,
	labelAlign: 'right',	
	title:'',
	buttonOkCaption: 'Сохранить и закрыть',
	buttonOkDisabled: false,
	buttonOkHidden: false,	
	buttonOkIconCls: 'icon-accept',		
	buttonCancelCaption: 'Отмена',
	buttonCancelDisabled: false,
	buttonCancelHidden: false,
	buttonCancelIconCls: 'icon-cancel',		
	initComponent:function() 
	{
		Ext.apply(this, 
		{		
			buttons:
			[		
				{
					id: this.id+'_buttonOk',
					iconCls:  this.buttonOkIconCls,					
					text: this.buttonOkCaption,					
					disabled: this.buttonOkDisabled,
					hidden: this.buttonOkHidden,					
					handler: Ext.bind(this.onButtonOk, this)
				},
				{
					id: this.id+'_buttonCancel',
					iconCls:  this.buttonCancelIconCls,				
					text: this.buttonCancelCaption,
					disabled: this.buttonCancelDisabled,
					hidden: this.buttonCancelHidden,					
					handler: Ext.bind(this.onButtonCancel, this)
				}
			]
		});
		this.callParent();
	},
	formSave: function()
	{
		var me = this;
		var form =  me.down('#form').getForm();
		if(form.isValid())
		{		
			form.submit(
			{
				url: me.url+'/setRow',
				waitMsg: 'Сохранение...',
				success: function(f, response)
				{	
					var result = response.result;
					
					if(result.success==false)
					{
						Ext.Msg.error('Ошибка', 'Ошибка');
					}
					else
					{							
						me.formAfterSave(result.data);										
						me.close();	
					};
				},
				failure: function(f,response) 
				{
					Ext.Msg.error('Ошибка', response.result.msg);
				}
			});
		}
	},
	formAfterSave: function(result){},	
	onButtonOk: function(){this.formSave()},
	onButtonCancel: function(){this.close();}
});


Ext.define('iu.windowObjects', {
    extend:'iu.window',
    maxHeight: 650,
    minHeight: 620,
    minWidth: 820,
    maxWidth: 1024,
   
    border: 0,
    autoShow: true,	
	deleteConfirmed:false,
	title:'',
	buttonCancelCaption: 'Закрыть',
	prefix: '',
	listeners:
	{
		beforeclose:function( thisform, eOpts )
		{
			var me = this;	
	
			return true;
		}
	},
	layout:  'fit',
    items:[],
	onButtonOk: function(){if(typeof(this.items.items[0].onButtonOk)=='function') this.items.items[0].onButtonOk();},
	onButtonCancel: function(){ if(typeof(this.items.items[0].onButtonCancel)=='function') this.items.items[0].onButtonCancel();   this.close();}
});


Ext.override(Ext.form.HtmlEditor, {  
createLink: function() {
    var url = prompt(this.createLinkText, this.defaultLinkValue);
    if (url && url != 'http:/' + '/') {
      //if(this.linksInNewWindow){
        this.relayCmd('insertHTML', "<a href='" + url + "' target='_blank'>" + this.getDoc().getSelection() + "</a>");
     // }
      //else{
      //  this.relayCmd('createlink', url);
     // }
    }
  }
});

 
Ext.define('application_info',{
            extend:'Ext.data.Model',
        fields: [
			{name: 'userid',type: 'string'},
			{name: 'roleid',type: 'string'},
			{name: 'rolename',type: 'string'},
			{name: 'login',type: 'string'},
            {name: 'info',type: 'string'},
			{name: 'mailcount',type: 'string'}
        ]
});


 Ext.define('application_actions',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'accesible',type: 'integer'}
            ,{name: 'menuname',type: 'string'}
            ,{name: 'menucode',type: 'string'}
        ]
});

	
 Ext.define('application_operations',{
		extend:'Ext.data.Model',
	fields: [
		{name: 'allowaction',type: 'integer'}
		,{name: 'name',type: 'string'}
	]
});

 Ext.define('application_modes',{
		extend:'Ext.data.Model',
	fields: [
		{name: 'name',type: 'string'}
		,{name: 'addmode',type: 'string'}
		,{name: 'editmode',type: 'string'}
		,{name: 'allowadd',type: 'integer'}
		,{name: 'allowdelete',type: 'integer'}
	]
});

var app_operations;
var app_modes;
var app_info;
var inClick = false;

function CurrentUserID(){
	return app_info.getAt(0).get("userid");
};
function CurrentRoleID(){
	return app_info.getAt(0).get("roleid");
};
function CurrentUserName(){
	return app_info.getAt(0).get("info");
};
function CurrentRoleName(){
	return app_info.getAt(0).get("rolename");
};

function CheckOperation( action){
   /* if(app_operations.getCount()==0){
		app_operations.load();
	}
	var recordIndex = app_operations.find('name', action);

	if(recordIndex == -1){
		return true;
	}else{
		return app_operations.getAt(recordIndex).get('allowaction');
	}
	*/
	return true;
}

function FindAction( mcode ){
	var recordIndex = app_actions.find('menucode', mcode,0,false,false,true);
	if(recordIndex == -1){
		return null;
	}else{
		return app_actions.getAt(recordIndex);
	}
}

function FindModes( objtype ){
	return null;
	/*var recordIndex = app_modes.find('name', objtype,0,false,false,true);
	if(recordIndex == -1){
		return null;
	}else{
		return app_modes.getAt(recordIndex);
	}
	*/
	
}


function OTAllowAdd( objtype ){
	var fm =FindModes(objtype);
	if(fm==null){
		return true;
	}else{
		if(fm.get('allowadd')==-1)
			return true;
		else
			return false;	
	}
}

function OTAllowDelete( objtype ){
	var fm =FindModes(objtype);
	if(fm==null){
		return true;
	}else{
		if(fm.get('allowdelete')==-1)
			return true;
		else
			return false;	
	}
}

function OTAddMode( objtype ){
	var fm =FindModes(objtype);
	if(fm==null){
		return '';
	}else{
		if(fm.get('addmode')==null)
			return '';
		else
			return fm.get('addmode');	
	}
}

function OTEditMode( objtype ){
	var fm =FindModes(objtype);
	if(fm==null){
		return '';
	}else{
		if(fm.get('editmode')==null)
			return '';
		else
			return fm.get('editmode');	
	}
}

function StatusErr(sText){
	var sb = Ext.getCmp('my-status');
	sb.setStatus({
		text: sText,
		//iconCls: 'icon-bullet_red',
		clear: true // auto-clear after a set interval
	});
}

function StatusDB(sText){
	var sb = Ext.getCmp('my-status');
	sb.setStatus({
		text: sText,
		//iconCls: 'icon-bullet_database_yellow',
		clear: true // auto-clear after a set interval
	});
}

function StatusWait(sText){
	var sb = Ext.getCmp('my-status');
	sb.setStatus({
		text: sText,
		//iconCls: 'icon-bullet_yellow',
		clear: true // auto-clear after a set interval
	});
}

function StatusReady(sText){
	var sb = Ext.getCmp('my-status');
	sb.setStatus({
		text: sText,
		//iconCls: 'sicon-bullet_green',
		clear: true // auto-clear after a set interval
	});
}

function combo_LoadNext() {
    if (combo_Index < combo_Stores.length - 1) {
        combo_Index = combo_Index + 1;
        combo_Waiter = 0;
        combo_StoreLoaded = false;
        combo_Stores[combo_Index].load();
        combo_timeout_id = setTimeout(combo_wait, 100);
        if (combo_pbar)
            combo_pbar.updateProgress(combo_Index / combo_Stores.length, 'Запрос пакета данных ' + (combo_Index + 1) + ' из ' + combo_Stores.length + '...');
    } else {
        HideLoading();
    }
}

function combo_wait() {
    if (combo_StoreLoaded) {
        clearTimeout(combo_timeout_id);
        combo_LoadNext();
    } else {
        combo_Waiter = combo_Waiter + 1;
        if (combo_Waiter == 300) {
            clearTimeout(combo_timeout_id);
            combo_LoadNext();
        } else {
            combo_timeout_id = setTimeout(combo_wait, 100);
        }
    }
}

function HideLoading() {
    var loadingMask = Ext.get('loading-mask');
    var loading = Ext.get('loading');
    //  Hide loading message
    loading.fadeOut({ duration:0.2, remove:true });
    //  Hide loading mask
    loadingMask.setOpacity(0.9);
    loadingMask.shift({
        xy:loading.getXY(),
        width:loading.getWidth(),
        height:loading.getHeight(),
        remove:true,
        duration:1,
        opacity:0.1,
        easing:'bounceOut'
    });
	//EnableActions();
}



var cardNav = function (name, incr, maxtab) {
    var l = Ext.getCmp(name).getLayout();
    var i = l.activeItem.id.split(name + '-')[1];
    var next = parseInt(i, 10) + incr;
    l.setActiveItem(next);
    Ext.getCmp(name + '-prev').setDisabled(next === 0);
    Ext.getCmp(name + '-next').setDisabled(next === maxtab);
}


var scen_text="";
var timing_text="";
function ShowText(t,s){
	var st=Ext.create(Ext.window.Window,{
		border:true,
		x:50,
		y:50,
		height:600,
		width:750,
		title:t,
		hidden:true,
		layout:'fit',
		closeAction :'destroy',
		modal : true,
		tbar: [
				{
					
				    xtype:'button'	,
				    iconCls:  'icon-cancel',
                    itemId:  'cancel',
                    text:   'Закрыть',
                    disabled: false,
                    scope:  this,
                    handler : function(){
						st.close();
					}
				}
		],
		
		items:
			[
				{
					/*minWidth: 660,
					width: 660,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 420, */

					xtype:  'htmleditor',
					name:   'info',
					itemId:   'info',
					value: Ext.String.htmlDecode(s),
					fieldLabel:  'Текст документа',
					labelAlign:'top',
					allowBlank:true,
					readOnly:true,
					labelWidth: 120
				}
				
		
			]
		}
	);
	
	st.show();
}


function resizeImg(img,sz){
	with (img) {
		if (offsetWidth <offsetHeight) 
		style.height = sz; 
		else style.width = sz; 
		style.visibility ='visible';
	}
};

///////////////// change password //////////////////////

Ext.define('Form_sp_password', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_sp_password',
		defaultType:'textfield',
		layout:'absolute',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
			  
						url:rootURL+'index.php/app/setSPPassword',
						layout:'absolute',
						items:[
							{
								fieldLabel:'Старый пароль',
								name:'oldPassword',
								itemId:'oldPassword',
								//inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:5,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270 //,
								//minLength:8,
								//minLengthText : 'Длинна пароля не менее 8 символов'
							}
							,
							{
								fieldLabel:'Новый пароль',
								name:'newPassword',
								itemId:'newPassword',
								//inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:35,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270,
								minLength:8,
								minLengthText : 'Длинна пароля не менее 8 символов'
							},
							{
								fieldLabel:'Подтверждение пароля',
								name:'compPassword',
								itemId:'compPassword',
								inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:70,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270,
								minLength:8,
								minLengthText : 'Длинна пароля не менее 8 символов'
							}
							
						],
		   
						dockedItems: 
						[
							{
							xtype:  'toolbar',
							dock:   'bottom',
							ui:     'footer',
							items: ['->', 
								{
									iconCls:  'icon-accept',
									itemId:  'save',
									text:   'Сохранить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
										    if(form._fields.items[2].getValue()==form._fields.items[1].getValue()){
												form.submit(
													{
														url: rootURL+'index.php/app/setSPPassword',
														waitMsg: 'Сохранение...',
														success: function(f,response){
															var text = response.result.msg;
															//var res =Ext.decode(text);
															if(text=="OK"){
																Ext.MessageBox.show({
																title:  'Подтверждение',
																msg:    'Изменения сохранены',
																buttons: Ext.MessageBox.OK,
																icon:   Ext.MessageBox.INFO
																});
																var wn = this.form.owner.ownerCt;
																wn.close();
																spData.load();
															}else{
																Ext.MessageBox.show({
																	title:  'Ошибка',
																	msg:    text,
																	buttons: Ext.MessageBox.OK,
																	icon:   Ext.MessageBox.ERROR
																});
															}
														}
														,
														failure: function(f,response) {
															var text = response.result.msg;
															Ext.MessageBox.show({
															title:  'Ошибка',
															msg:    text,
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.ERROR
															});
														}

													}
												);
											}else{
												Ext.MessageBox.show({
													title:  'Ошибка',
													msg:    'Новый пароль не совпадает с подтверждением пароля',
													buttons: Ext.MessageBox.OK,
													icon:   Ext.MessageBox.ERROR
													});
											}
										}
									}
								}, 
								{
									iconCls:  'icon-cancel',
									text:   'Закрыть',
									scope:  this,
									handler : this.onReset
								}
							]
							}
						] // dockedItems
					}
				); //Ext.apply
				this.callParent();
			}, //initComponent 
	   
		onReset: function()
			{
				 this.ownerCt.close();
			}
	}
); // 'Ext.Define

Ext.define('EditWindow_sp_password',{
    extend:  'Ext.window.Window',
constrainHeader:true,
    height: 160,
    width: 300,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-building_key',
    title:  'Сменить пароль',
    items:[
		{
			xtype:'f_sp_password'
		}
	]
	}
);



function TextTooltip(value, metadata, record, rowIndex, colIndex, store){
    metadata.attr = 'ext:qtip="' + value + '"';
    return value;
}



function myDateRenderer(value, metaData, record, row, col, store, gridView) 
{ 
    if(value==null) return '';
	var s='';
	if(Ext.isDate(value)){
		s = value.toLocaleFormat('%Y-%m-%d %H:%M:%S');
	}else{
		s = new String(value);
	}
	
	var svalue='';
	if (s !=''){
		  var parts2 = s.split(' ');
		  var dparts2  =parts2[0].split('-');
		  var hparts2 =parts2[1].split(':');
		  svalue=dparts2[2]+'/'+ dparts2[1] +'/'+ dparts2[0]+ ' '+hparts2[0] +':'+hparts2[1] +':'+ hparts2[2];
	}

    return svalue;
}


function myTimeRenderer(value, metaData, record, row, col, store, gridView) 
{ 
    if(value==null) return '';
	var s='';
	if(Ext.isDate(value)){
		s = value.toLocaleFormat('%Y-%m-%d %H:%M:%S');
	}else{
		s = new String(value);
	}
	
	var svalue='';
	if (s !=''){
		  var parts2 = s.split(' ');
		  var dparts2  =parts2[0].split('-');
		  var hparts2 =parts2[1].split(':');
		  svalue=hparts2[0] +':'+hparts2[1] +':'+ hparts2[2];
	}

    return svalue;
}

function myDateOnlyRenderer(value, metaData, record, row, col, store, gridView) 
{ 
    if(value==null) return '';
	var s='';
	if(Ext.isDate(value)){
		s = value.toLocaleFormat('%Y-%m-%d %H:%M:%S');
	}else{
		s = new String(value);
	}
	
	var svalue='';
	if (s !=''){
		  var parts2 = s.split(' ');
		  var dparts2  =parts2[0].split('-');
		  var hparts2 =parts2[1].split(':');
		  svalue=dparts2[2]+'/'+ dparts2[1] +'/'+ dparts2[0];
	}

    return svalue;
}

function headerRenderer(value, metaData, record, row, col, store, gridView) 
{ 
	if(metaData==null) return value;
	metaData.style = metaData.style + 'font-weight: bold; ';
    return value;
}

var allowed_tags='<b><p><i><u><br><ul><ol><li><h1><h2><h3><h4><h5><font><a>';

function strip_tags(input, allowed) {
  allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function MyhtmlEncode(v){
//return strip_tags(v,"") ; //allowed_tags);
    var s = new String(v);
	s=strip_tags(v,allowed_tags);
	s=s.replace(/\'/g,'"');
	var s =  Ext.String.htmlEncode(s);
	return s;
	
}

Ext.require([
    'Ext.tree.*',
    'Ext.data.*'
]);

function showSelectObject(caller){
	var obj_id;
	var obj_guid;
	var obj_text="";
	  
        fswin = Ext.widget('window', {
            title:'Выбор объекта',
			constrainHeader:true,
            width:960,
            height:600,
            minHeight:400,
            layout:'fit',
            resizable:true,
            modal:true,
            items:fastseek_Jrnl(caller) 
        });
    
    fswin.show();
}


function showOpenCard1(caller){
	var ff = caller.up('form');
				
	if (ff){
		var form =ff.getForm()
		var active=ff.activeRecord;
		if(active){
			
			form.updateRecord(active);
			
			
				var edit = Ext.create('ObjectWindow_fastseek');
				var p;
				var mtype;
				mtype=active.get('objmarket');
				if(mtype=='b2fr')
					p = B2FR_Panel_(active.get('objguid'), false);
				if(mtype=='b2p')
					p = B2P_Panel_(active.get('objguid'), false);
				if(mtype=='b2s')
					p = B2S_Panel_(active.get('objguid'), false);
				if(mtype=='b2z')
					p = B2Z_Panel_(active.get('objguid'), false);
				if(mtype=='b2c')
					p = B2C_Panel_(active.get('objguid'), false);
	
				edit.add(p);
				edit.show();
		}
	}
}



function showOpenCard(caller){
	var ff = caller.up('form');
				
	if (ff){
		var form =ff.getForm()
		var active=ff.activeRecord;
		if(active){
			
			form.updateRecord(active);
			
			
				{	
				var selection = active
				if (selection) {
					
					var mtype;
					mtype=selection.get('objmarket');
					if(mtype=='b2fr'){
						Ext.Ajax.request({
								url:    'index.php/dataprint/b2fr_form',
								method:  'POST',
								params: { 
								   instance: selection.get('objguid')
								},
								success: function(response, opts) 
								{
									var obj = Ext.decode(response.responseText);
									obj.constrainHeader=true;
									var printWin = Ext.create('Ext.window.Window', obj);
									printWin.show();
								}
						});
					}
					if(mtype=='b2p'){
							Ext.Ajax.request({
								url:    'index.php/dataprint/b2p_form',
								method:  'POST',
								params: { 
								   instance: selection.get('objguid')
								},
								success: function(response, opts) 
								{
									var obj = Ext.decode(response.responseText);
									obj.constrainHeader=true;
									var printWin = Ext.create('Ext.window.Window', obj);
									printWin.show();
								}
							});
					}
					if(mtype=='b2s'){
						Ext.Ajax.request({
								url:    'index.php/dataprint/b2s_form',
								method:  'POST',
								params: { 
								   instance: selection.get('objguid')
								},
								success: function(response, opts) 
								{
									var obj = Ext.decode(response.responseText);
									obj.constrainHeader=true;
									var printWin = Ext.create('Ext.window.Window', obj);
									printWin.show();
								}
						});
						
					}
					if(mtype=='b2z'){
						Ext.Ajax.request({
								url:    'index.php/dataprint/b2z_form',
								method:  'POST',
								params: { 
								   instance: selection.get('objguid')
								},
								success: function(response, opts) 
								{
									var obj = Ext.decode(response.responseText);
									obj.constrainHeader=true;
									var printWin = Ext.create('Ext.window.Window', obj);
									printWin.show();
								}
						});
					}
					if(mtype=='b2c'){
													
						Ext.Ajax.request({
								url:    'index.php/dataprint/b2c_form',
								method:  'POST',
								params: { 
								   instance: selection.get('objguid')
								},
								success: function(response, opts) 
								{
									var obj = Ext.decode(response.responseText);
									obj.constrainHeader=true;
									var printWin = Ext.create('Ext.window.Window', obj);
									printWin.show();
								}
						});
					}
				}
			}
		}
	}
}
function GetAgentPanel(id){
	var agent_panel;
	var myid = id;
	
	function onSave(){
		alert(myid +"->"+ agent_panel.getForm().getValues()['agent_list']);
	};
	
	function onSendToDuty(){
		alert(myid +"-> 2Duty");
	};
	agent_panel=new Ext.form.Panel(
		{ 
				xtype:'panel', 
				closable:false,
				collapsible:false,
				titleCollapse : true,
				title: 'Выбор агента',  
				bodyPadding: 5,
				defaultType:'textfield',
				autoScroll:false, 
				items:
				[
					{	
					   itemId:'agent_list',
						xtype: 'textfield',
						name: 'agent_list',
						dataIndex: 'agent_list',
						hidden: true
					},
					
					{	
						xtype:'button',
						handler:onSave,
						text:'Отправить дежурному агенту'
					},
					{	
						xtype:'button',
						handler:onSave,
						text:'Передать выбранным агентам'
					},
					{	
						xtype: 'textfield',
						name: 'agent_list_filter',
						dataIndex: 'agent_list_filter',
						fieldLabel: 'поиск',
						listeners: {
							change: function( field, newValue, oldValue, eOpts )
							{
								var store = this.up('panel').down('grid').getStore();
								store.filters.clear();
								if(newValue || newValue != '')
								{
									var filters = new Array();
									filters.push({property: 'brief', value: newValue});
									store.filter(filters);
								}
								store.load();
							}
						}
					},
					{
						xtype: 'grid',
						flex: 1,
						margin: '0 0 5 5',
						height:80,
						minHeight:80,
						loadMask: true,
						rootVisible: true,
						selModel: Ext.create('Ext.selection.CheckboxModel', {mode: 'MULTI'}),
						store: cmbstore_busr_def,
						columns: [
							{
								flex:1, 
								dataIndex: 'brief', 
								sortable: true
							}
						],
						listeners: {
							selectionchange: function()
							{
								var data = this.getSelectionModel().getSelection();
								var tmp = new Array();
								for(key in data)
								{
									var row = data[key];
									tmp.push(row.get('id'));
								}

								var txt = tmp.join(',');
								agent_panel.getForm().setValues({agent_list:txt});
							}
						}
					}
					
							   
				 ]
			});
			cmbstore_busr_def.load();
	return agent_panel;
	}
	
	
	
	function Send2Duty(panel){
     
          Ext.Msg.show(
					{
						title:  'Передать дежурному',
						msg:    'Передать заявку дежурному агенту ?' ,
						buttons: Ext.Msg.YESNO,
						icon:   Ext.window.MessageBox.QUESTION,
						fn: function(btn,text,opt){
							if(btn=='yes'){
								Ext.Ajax.request(
								{
									url: 'index.php/app/send2dutynew',
									method:  'POST',
									params: { 
										 instanceid: panel.up('form').instanceid ,
										 qtype:panel.up('form').activeRecord.get('qtype'),
										 objtype:panel.up('form').activeRecord.get('objtype')
									}
									, 
									success: function(response){
										var text = response.responseText;
										var res =Ext.decode(text);
									    if(res.success){
											Ext.MessageBox.show({
											title:  'Подтверждение',
											msg:    'Изменения сохранены',
											buttons: Ext.MessageBox.OK,
											icon:   Ext.MessageBox.INFO
											});
										}else{
											Ext.MessageBox.show({
												title:  'Ошибка',
												msg:    res.msg,
												buttons: Ext.MessageBox.OK,
												icon:   Ext.MessageBox.ERROR
											});
										}
									}
									,
									failure: function(response, opts) {
										var text = response.responseText;
										//var res =Ext.decode(text);
										
										Ext.MessageBox.show({
										title:  'Ошибка',
										msg:    text,
										buttons: Ext.MessageBox.OK,
										icon:   Ext.MessageBox.ERROR
										});
									}
								}
								);
							}
						}
					}
				);
    }
	
	
	function Send2Agent(panel){
     
          Ext.Msg.show(
					{
						title:  'Передать агенту',
						msg:    'Передать заявку  агенту: '+ panel.up('form').getValues()['theagent_grid'] +'?' ,
						buttons: Ext.Msg.YESNO,
						icon:   Ext.window.MessageBox.QUESTION,
						fn: function(btn,text,opt){
							if(btn=='yes'){
								Ext.Ajax.request(
								{
									url: 'index.php/app/send2agent',
									method:  'POST',
									params: { 
										 instanceid: panel.up('form').instanceid ,
										 agent: panel.up('form').activeRecord.get('theagent')
									}
									, 
									success: function(response){
										var text = response.responseText;
										var res =Ext.decode(text);
									    if(res.success){
											Ext.MessageBox.show({
											title:  'Подтверждение',
											msg:    'Изменения сохранены',
											buttons: Ext.MessageBox.OK,
											icon:   Ext.MessageBox.INFO
											});
										}else{
											Ext.MessageBox.show({
												title:  'Ошибка',
												msg:    res.msg,
												buttons: Ext.MessageBox.OK,
												icon:   Ext.MessageBox.ERROR
											});
										}
									}
									,
									failure: function(response, opts) {
										var text = response.responseText;
										//var res =Ext.decode(text);
										
										Ext.MessageBox.show({
										title:  'Ошибка',
										msg:    text,
										buttons: Ext.MessageBox.OK,
										icon:   Ext.MessageBox.ERROR
										});
									}
								}
								);
							}
						}
					}
				);
    }
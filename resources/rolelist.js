
Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);



function showSelectRoles() {
		var gridM ;
		function doSelectRole(){
		
				if (gridM.up('form').getForm().isValid()) {
					
					
					var selection = gridM.getSelectionModel().getSelection()[0];
					if (selection) {
					   
						 Ext.Ajax.request({
								url: 'index.php/app/setRole',
								method:  'POST',
								params: { 
									RoleName: selection.get('name') 
									}
								, success: function(response){
								var text = response.responseText;
								var res =Ext.decode(text);
								//alert('Роль выбрана'+res);
								MyInit();
							  }
					});
					}
					gridM.up('form').getForm().reset();
					gridM.up('window').hide();
				}
                    
		}
		
	  gridM = Ext.create('Ext.grid.Panel', {
        store: app_roles,
        columns:[
						{text: "Название", width:350, dataIndex: 'name', sortable: true}
					],
		columnLines: true,
					width: 480,
					height: 480
					}
				);
    var form = Ext.widget('form', {
            layout:{
                type:'column'
            },
            border:false,
            bodyPadding:10,

            fieldDefaults:{
                labelAlign:'top',
                labelWidth:100,
                labelStyle:'font-weight:bold'
            },
            defaults:{
                margins:'0 0 10 0'
            },

            items:[
					gridM
            ],

            buttons:[
			 {
                    text:'Выбрать',
					iconCls:'icon-accept',
                    handler:doSelectRole
                }
				
				/*,
                {
                    text:'Отмена',
					iconCls:'icon-cancel',
                    handler:function () {
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                    }
                } */
               
            ]
        }
		);

        mrefwin = Ext.widget('window', {
            title:'Подтверждение роли',
			constrainHeader:true,
            closeAction:'hide',
            width:500,
            height:500,
            minHeight:400,
            layout:'fit',
            resizable:true,
            modal:true,
            items:form
        });
    
    mrefwin.show();
	/*
	var map = new Ext.util.KeyMap({
		target: gridM,
		eventName: 'itemkeydown',
		processEvent: function(view, record, node, index, event) {

			// Load the event with the extra information needed by the mappings
			event.view = view;
			event.store = view.getStore();
			event.record = record;
			event.index = index;
			return event;
		},
		binding: {
			key: Ext.EventObject.ENTER,
			fn: function(keyCode, e) {
				alert(keyCode);
				
			}
		}
	});
	*/
 
}


Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);



function showPartRef(caller,storename,mstore,fname) {
	var names;
	var ids;

	var gridM = Ext.create('Ext.grid.Panel', {
        store: mstore,
        columns:[
						{text: "Название", width:350, dataIndex: 'brief', sortable: true}
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
                    handler:function () {
                        if (this.up('form').getForm().isValid()) {
                            
							
                            var selection = gridM.getSelectionModel().getSelection()[0];
                            if (selection) {
                                caller.setValue(selection.get('brief') );
								ids=selection.get(storename+"id");
								var form =caller.up('form').getForm()
								var active=caller.up('form').activeRecord;
								if(active){
									//alert(ids);
									form.updateRecord(active);
									active.set(fname,ids); 
									form.loadRecord(active);
									//alert (ids);
								}
                            }
                            this.up('form').getForm().reset();
                            this.up('window').hide();
                        }
                    }
                },
				{
                    text:'Очистить',
					iconCls:'icon-erase',
                    handler:function () {
						caller.setValue("");
						var form =caller.up('form').getForm()
						var active=caller.up('form').activeRecord;
						if(active){
							form.updateRecord(active);
							active.set(fname,""); 
							form.loadRecord(active);
						}
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                    }
                },
                {
                    text:'Отмена',
					iconCls:'icon-cancel',
                    handler:function () {
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                    }
                }
               
            ]
        }
		);

	var refwin = Ext.widget('window', {
		title:'Выбор значения',
		closeAction:'destroy',
		constrainHeader:true,
		width:500,
		height:500,
		minHeight:400,
		layout:'fit',
		resizable:true,
		modal:true,
		items:form
	});
    
    refwin.show();
    mstore.load();
}
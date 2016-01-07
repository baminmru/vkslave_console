Ext.require([
    'Ext.grid.*',
    'Ext.data.*'
]);

/*
Ext.define('PVE.form.ComboGrid', {
    extend: 'Ext.form.ComboBox', 
    requires: [
	'Ext.grid.Panel'
    ],
    alias: ['widget.PVE.form.ComboGrid'],

    // copied from ComboBox 
    createPicker: function() {
		var sm = Ext.create('Ext.selection.CheckboxModel');
		sm.showHeaderCheckbox=false;
        var me = this,
        picker,
        menuCls = Ext.baseCSSPrefix + 'menu',
        opts = Ext.apply({
            selModel:sm,
                //{
				//mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
				//},
            floating: true,
            hidden: true,
            ownerCt: me.ownerCt,
            cls: me.el.up('.' + menuCls) ? menuCls : '',
            store: me.store,
            displayField: me.displayField,
            focusOnToFront: false,
            pageSize: me.pageSize
        }, me.listConfig, me.defaultListConfig);

	// NOTE: we simply use a grid panel
        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
	picker = me.picker = Ext.create('Ext.grid.Panel', opts);

	// hack: pass getNode() to the view
	picker.getNode = function() {
	    picker.getView().getNode(arguments);
	};

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    }
});
*/




Ext.define('PVE.form.ComboGrid', {
    extend: 'Ext.form.ComboBox',
    requires: [
	'Ext.grid.Panel'
    ],
    alias: ['widget.PVE.form.ComboGrid'],
	sm_select:function(sm, record, index, eOpts){
		//alert(record.get('id'));
	},

    // copied from ComboBox 
    createPicker: function() {
	var me = this;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		sm.showHeaderCheckbox=false;
		//sm.on("select", this.sm_select, this);
		sm.store=me.store;
        
		var  picker,
        menuCls = Ext.baseCSSPrefix + 'menu',
        opts = Ext.apply({
             selModel:sm,
            floating: true,
            hidden: true,
            ownerCt: me.ownerCt,
            cls: me.el.up('.' + menuCls) ? menuCls : '',
            store: me.store,
            displayField: me.displayField,
            focusOnToFront: false,
            pageSize: me.pageSize
        }, me.listConfig, me.defaultListConfig);

	// NOTE: we simply use a grid panel
        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
	picker = me.picker = Ext.create('Ext.grid.Panel', opts);

	// pass getNode() to the view
	picker.getNode = function() {
	    picker.getView().getNode(arguments);
	};

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    },

    initComponent: function() {
		var me = this;

		Ext.apply(me, {
			queryMode: 'local',
			editable: false,
			autoSelect: true,
			matchFieldWidth: false
		});

		Ext.applyIf(me.listConfig,{width:400});

		me.callParent();

		// hack: autoSelect does not work
		me.store.load({
			callback: function(r, o, success) {
				if (success) {
					
					var def = me.getValue();
					var nval=new String(def);
					
					if(nval !=''){
						var arrayOfStrings = nval.split(',');
						//var arrayOfRec = new Array();
					   // for (var i=0; i < arrayOfStrings.length; i++){
						//    var rec=me.store.findRecord(me.valueField, arrayOfStrings[i]);
						//	if (rec) {
									//var sm;
									//sm=me.getPicker().selModel;
									//sm.selectWithEvent(rec, {ctrlKey:false,shiftKey:false});
						//			arrayOfRec.push(rec);
						//	}
						//}
						//me.select(arrayOfRec);
						//var sm;
						//sm=me.getPicker().selModel;
						//sm.select(arrayOfRec);
						me.setValue(arrayOfStrings);
					}
				}
			}
		}
		);
    }
});

function showMultyRef(caller,storename,mstore,fname) {
	var names;
	var ids;
	var sm = Ext.create('Ext.selection.CheckboxModel');
		
	  var gridM = Ext.create('Ext.grid.Panel', {
        store: mstore,
        selModel: sm,
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
                            
							
                            var selection = gridM.getSelectionModel().getSelection();
                            if (selection) {
								ids="";
								names="";
								for(i=0;i <selection.length;i++){
									if(ids!=""){
										//names=names+";";
										ids=ids+";";
									}
									 names=names+selection[i].get('brief');
									 ids=ids+selection[i].get(storename+"id");
								}
								caller.setValue( names);
								
								var form =caller.up('form').getForm()
								var active=caller.up('form').activeRecord;
								if(active){
									//alert(ids);
									form.updateRecord(active);
									active.set(fname,ids); 
									form.loadRecord(active);
								}
							}
                            this.up('form').getForm().reset();
                            this.up('window').hide();
                        }
                    }
                }
				,{
                    text:'Очистить',
					iconCls:'icon-erase',
                    handler:function () {
						caller.setValue( "");
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

        var mrefwin = Ext.widget('window', {
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
    
        mrefwin.show();
        mstore.load();
}
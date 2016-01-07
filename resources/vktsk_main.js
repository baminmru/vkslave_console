
Ext.require([
'Ext.form.*'
]);
  vktsk_main= null;
function VKTSK_Panel_main(objectID, RootPanel, selection){ 


    var store_vk_taskinfo = Ext.create('Ext.data.Store', {
        model:'model_vk_taskinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_taskinfo/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });

    var store_vk_taskmsg = Ext.create('Ext.data.Store', {
        model:'model_vk_taskmsg',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_taskmsg/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });
          DefineForms_vk_taskinfo_main();
          DefineForms_vk_taskmsg_main();
     var   int_vk_taskinfo_main     =      DefineInterface_vk_taskinfo_main('int_vk_taskinfo',store_vk_taskinfo, selection);
     var   int_vk_taskmsg_main     =      DefineInterface_vk_taskmsg_main('int_vk_taskmsg',store_vk_taskmsg);
     vktsk_main= Ext.create('Ext.form.Panel', {
      id: 'vktsk',
      layout:'fit',
      width:810, // для правильного расчета размера дочерних окон ! 
      height:530,
      fieldDefaults: {
          labelAlign:             'top',
          msgTarget:              'side'
        },
        defaults: {
        anchor:'100%'
        },

        instanceid:objectID,
                onCommit: function(){
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        	    int_vk_taskinfo_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_taskinfo_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vktsk',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Описания задачи',
            layout:'fit',
            itemId:'tab_vk_taskinfo',
            items:[ // panel on tab 
int_vk_taskinfo_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Сообщения по задаче',
            layout:'fit',
            itemId:'tab_vk_taskmsg',
            items:[ // panel on tab 
int_vk_taskmsg_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vktsk_main.closable= true;
       vktsk_main.title= 'Задача';
       vktsk_main.frame= true;
    }else{
       vktsk_main.closable= false;
       vktsk_main.title= '';
       vktsk_main.frame= false;
    }
   store_vk_taskinfo.on('load', function() {
        if(store_vk_taskinfo.count()==0){
            store_vk_taskinfo.insert(0, new model_vk_taskinfo());
        }
        record= store_vk_taskinfo.getAt(0);
        record['instanceid']=objectID;
   int_vk_taskinfo_main.setActiveRecord(record,objectID);	
   });
       store_vk_taskinfo.load( {params:{ instanceid:objectID} }  );
   int_vk_taskmsg_main.instanceid=objectID;	
       store_vk_taskmsg.load(  {params:{ instanceid:objectID} } );
    return vktsk_main;
}
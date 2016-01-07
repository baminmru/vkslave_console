
Ext.require([
'Ext.form.*'
]);
  vkrot_main= null;
function VKROT_Panel_main(objectID, RootPanel, selection){ 


    var store_vk_rotinfo = Ext.create('Ext.data.Store', {
        model:'model_vk_rotinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_rotinfo/getRows',
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

    var store_vk_rotads = Ext.create('Ext.data.Store', {
        model:'model_vk_rotads',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_rotads/getRows',
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
          DefineForms_vk_rotinfo_main();
          DefineForms_vk_rotads_main();
     var   int_vk_rotinfo_main     =      DefineInterface_vk_rotinfo_main('int_vk_rotinfo',store_vk_rotinfo, selection);
     var   int_vk_rotads_main     =      DefineInterface_vk_rotads_main('int_vk_rotads',store_vk_rotads);
     vkrot_main= Ext.create('Ext.form.Panel', {
      id: 'vkrot',
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
        	    int_vk_rotinfo_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_rotinfo_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vkrot',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Описание',
            layout:'fit',
            itemId:'tab_vk_rotinfo',
            items:[ // panel on tab 
int_vk_rotinfo_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Объявления в  ротации',
            layout:'fit',
            itemId:'tab_vk_rotads',
            items:[ // panel on tab 
int_vk_rotads_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkrot_main.closable= true;
       vkrot_main.title= 'Ротация';
       vkrot_main.frame= true;
    }else{
       vkrot_main.closable= false;
       vkrot_main.title= '';
       vkrot_main.frame= false;
    }
   store_vk_rotinfo.on('load', function() {
        if(store_vk_rotinfo.count()==0){
            store_vk_rotinfo.insert(0, new model_vk_rotinfo());
        }
        record= store_vk_rotinfo.getAt(0);
        record['instanceid']=objectID;
   int_vk_rotinfo_main.setActiveRecord(record,objectID);	
   });
       store_vk_rotinfo.load( {params:{ instanceid:objectID} }  );
   int_vk_rotads_main.instanceid=objectID;	
       store_vk_rotads.load(  {params:{ instanceid:objectID} } );
    return vkrot_main;
}
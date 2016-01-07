
Ext.require([
'Ext.form.*'
]);
  vkrot_= null;
function VKROT_Panel_(objectID, RootPanel, selection){ 


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
          DefineForms_vk_rotinfo_();
          DefineForms_vk_rotads_();
     var   int_vk_rotinfo_     =      DefineInterface_vk_rotinfo_('int_vk_rotinfo',store_vk_rotinfo, selection);
     var   int_vk_rotads_     =      DefineInterface_vk_rotads_('int_vk_rotads',store_vk_rotads);
     vkrot_= Ext.create('Ext.form.Panel', {
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
        	    int_vk_rotinfo_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_rotinfo_.canClose();
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
int_vk_rotinfo_
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
int_vk_rotads_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkrot_.closable= true;
       vkrot_.title= 'Ротация';
       vkrot_.frame= true;
    }else{
       vkrot_.closable= false;
       vkrot_.title= '';
       vkrot_.frame= false;
    }
   store_vk_rotinfo.on('load', function() {
        if(store_vk_rotinfo.count()==0){
            store_vk_rotinfo.insert(0, new model_vk_rotinfo());
        }
        record= store_vk_rotinfo.getAt(0);
        record['instanceid']=objectID;
   int_vk_rotinfo_.setActiveRecord(record,objectID);	
   });
       store_vk_rotinfo.load( {params:{ instanceid:objectID} }  );
   int_vk_rotads_.instanceid=objectID;	
       store_vk_rotads.load(  {params:{ instanceid:objectID} } );
    return vkrot_;
}
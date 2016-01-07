﻿
Ext.require([
'Ext.form.*'
]);
  vkbrk_= null;
function VKBRK_Panel_(objectID, RootPanel, selection){ 


    var store_vk_brkinfo = Ext.create('Ext.data.Store', {
        model:'model_vk_brkinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_brkinfo/getRows',
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
          DefineForms_vk_brkinfo_();
     var   int_vk_brkinfo_     =      DefineInterface_vk_brkinfo_('int_vk_brkinfo',store_vk_brkinfo, selection);
     vkbrk_= Ext.create('Ext.form.Panel', {
      id: 'vkbrk',
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
        	    int_vk_brkinfo_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_brkinfo_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vkbrk',
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
            itemId:'tab_vk_brkinfo',
            items:[ // panel on tab 
int_vk_brkinfo_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkbrk_.closable= true;
       vkbrk_.title= 'Брокер';
       vkbrk_.frame= true;
    }else{
       vkbrk_.closable= false;
       vkbrk_.title= '';
       vkbrk_.frame= false;
    }
   store_vk_brkinfo.on('load', function() {
        if(store_vk_brkinfo.count()==0){
            store_vk_brkinfo.insert(0, new model_vk_brkinfo());
        }
        record= store_vk_brkinfo.getAt(0);
        record['instanceid']=objectID;
   int_vk_brkinfo_.setActiveRecord(record,objectID);	
   });
       store_vk_brkinfo.load( {params:{ instanceid:objectID} }  );
    return vkbrk_;
}
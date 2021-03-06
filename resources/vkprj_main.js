﻿
Ext.require([
'Ext.form.*'
]);
  vkprj_main= null;
function VKPRJ_Panel_main(objectID, RootPanel, selection){ 


    var store_vk_prj = Ext.create('Ext.data.Store', {
        model:'model_vk_prj',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_prj/getRows',
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
          DefineForms_vk_prj_main();
     var   int_vk_prj_main     =      DefineInterface_vk_prj_main('int_vk_prj',store_vk_prj, selection);
     vkprj_main= Ext.create('Ext.form.Panel', {
      id: 'vkprj',
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
        	    int_vk_prj_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_prj_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vkprj',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Проект',
            layout:'fit',
            itemId:'tab_vk_prj',
            items:[ // panel on tab 
int_vk_prj_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkprj_main.closable= true;
       vkprj_main.title= 'Рекламный проект';
       vkprj_main.frame= true;
    }else{
       vkprj_main.closable= false;
       vkprj_main.title= '';
       vkprj_main.frame= false;
    }
   store_vk_prj.on('load', function() {
        if(store_vk_prj.count()==0){
            store_vk_prj.insert(0, new model_vk_prj());
        }
        record= store_vk_prj.getAt(0);
        record['instanceid']=objectID;
   int_vk_prj_main.setActiveRecord(record,objectID);	
   });
       store_vk_prj.load( {params:{ instanceid:objectID} }  );
    return vkprj_main;
}
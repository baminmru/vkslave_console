
Ext.require([
'Ext.form.*'
]);
  vkads_main= null;
function VKADS_Panel_main(objectID, RootPanel, selection){ 


    var store_vk_adinfo = Ext.create('Ext.data.Store', {
        model:'model_vk_adinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adinfo/getRows',
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

    var store_vk_adsutm = Ext.create('Ext.data.Store', {
        model:'model_vk_adsutm',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adsutm/getRows',
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

    var store_vk_adstrg = Ext.create('Ext.data.Store', {
        model:'model_vk_adstrg',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adstrg/getRows',
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

    var store_vk_adovstat = Ext.create('Ext.data.Store', {
        model:'model_vk_adovstat',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adovstat/getRows',
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

    var store_vk_adstat = Ext.create('Ext.data.Store', {
        model:'model_vk_adstat',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adstat/getRows',
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

    var store_vk_adsovdemografy = Ext.create('Ext.data.Store', {
        model:'model_vk_adsovdemografy',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adsovdemografy/getRows',
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

    var store_vk_adsdaydemografy = Ext.create('Ext.data.Store', {
        model:'model_vk_adsdaydemografy',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adsdaydemografy/getRows',
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
          DefineForms_vk_adinfo_main();
          DefineForms_vk_adsutm_main();
          DefineForms_vk_adstrg_main();
          DefineForms_vk_adovstat_main();
          DefineForms_vk_adstat_main();
          DefineForms_vk_adsovdemografy_main();
          DefineForms_vk_adsdaydemografy_main();
     var   int_vk_adinfo_main     =      DefineInterface_vk_adinfo_main('int_vk_adinfo',store_vk_adinfo, selection);
     var   int_vk_adsutm_main     =      DefineInterface_vk_adsutm_main('int_vk_adsutm',store_vk_adsutm);
     var   int_vk_adstrg_main     =      DefineInterface_vk_adstrg_main('int_vk_adstrg',store_vk_adstrg);
     var   int_vk_adovstat_main     =      DefineInterface_vk_adovstat_main('int_vk_adovstat',store_vk_adovstat);
     var   int_vk_adstat_main     =      DefineInterface_vk_adstat_main('int_vk_adstat',store_vk_adstat);
     var   int_vk_adsovdemografy_main     =      DefineInterface_vk_adsovdemografy_main('int_vk_adsovdemografy',store_vk_adsovdemografy);
     var   int_vk_adsdaydemografy_main     =      DefineInterface_vk_adsdaydemografy_main('int_vk_adsdaydemografy',store_vk_adsdaydemografy);
     vkads_main= Ext.create('Ext.form.Panel', {
      id: 'vkads',
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
        	    int_vk_adinfo_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_adinfo_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vkads',
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
            itemId:'tab_vk_adinfo',
            items:[ // panel on tab 
int_vk_adinfo_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'UTM разметка',
            layout:'fit',
            itemId:'tab_vk_adsutm',
            items:[ // panel on tab 
int_vk_adsutm_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Таргетинг',
            layout:'fit',
            itemId:'tab_vk_adstrg',
            items:[ // panel on tab 
int_vk_adstrg_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Итоговая статистика',
            layout:'fit',
            itemId:'tab_vk_adovstat',
            items:[ // panel on tab 
int_vk_adovstat_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Ежедневная статистика',
            layout:'fit',
            itemId:'tab_vk_adstat',
            items:[ // panel on tab 
int_vk_adstat_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Демография',
            layout:'fit',
            itemId:'tab_vk_adsovdemografy',
            items:[ // panel on tab 
int_vk_adsovdemografy_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Демография ежедневная',
            layout:'fit',
            itemId:'tab_vk_adsdaydemografy',
            items:[ // panel on tab 
int_vk_adsdaydemografy_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkads_main.closable= true;
       vkads_main.title= 'Рекламное объявление';
       vkads_main.frame= true;
    }else{
       vkads_main.closable= false;
       vkads_main.title= '';
       vkads_main.frame= false;
    }
   store_vk_adinfo.on('load', function() {
        if(store_vk_adinfo.count()==0){
            store_vk_adinfo.insert(0, new model_vk_adinfo());
        }
        record= store_vk_adinfo.getAt(0);
        record['instanceid']=objectID;
   int_vk_adinfo_main.setActiveRecord(record,objectID);	
   });
       store_vk_adinfo.load( {params:{ instanceid:objectID} }  );
   store_vk_adsutm.on('load', function() {
        if(store_vk_adsutm.count()==0){
            store_vk_adsutm.insert(0, new model_vk_adsutm());
        }
        record= store_vk_adsutm.getAt(0);
        record['instanceid']=objectID;
   int_vk_adsutm_main.setActiveRecord(record,objectID);	
   });
       store_vk_adsutm.load( {params:{ instanceid:objectID} }  );
   store_vk_adstrg.on('load', function() {
        if(store_vk_adstrg.count()==0){
            store_vk_adstrg.insert(0, new model_vk_adstrg());
        }
        record= store_vk_adstrg.getAt(0);
        record['instanceid']=objectID;
   int_vk_adstrg_main.setActiveRecord(record,objectID);	
   });
       store_vk_adstrg.load( {params:{ instanceid:objectID} }  );
   store_vk_adovstat.on('load', function() {
        if(store_vk_adovstat.count()==0){
            store_vk_adovstat.insert(0, new model_vk_adovstat());
        }
        record= store_vk_adovstat.getAt(0);
        record['instanceid']=objectID;
   int_vk_adovstat_main.setActiveRecord(record,objectID);	
   });
       store_vk_adovstat.load( {params:{ instanceid:objectID} }  );
   int_vk_adstat_main.instanceid=objectID;	
       store_vk_adstat.load(  {params:{ instanceid:objectID} } );
   int_vk_adsovdemografy_main.instanceid=objectID;	
       store_vk_adsovdemografy.load(  {params:{ instanceid:objectID} } );
   int_vk_adsdaydemografy_main.instanceid=objectID;	
       store_vk_adsdaydemografy.load(  {params:{ instanceid:objectID} } );
    return vkads_main;
}
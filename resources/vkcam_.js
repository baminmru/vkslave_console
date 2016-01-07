
Ext.require([
'Ext.form.*'
]);
  vkcam_= null;
function VKCAM_Panel_(objectID, RootPanel, selection){ 


    var store_vk_camp = Ext.create('Ext.data.Store', {
        model:'model_vk_camp',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_camp/getRows',
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

    var store_vk_camovstat = Ext.create('Ext.data.Store', {
        model:'model_vk_camovstat',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_camovstat/getRows',
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

    var store_vk_camstat = Ext.create('Ext.data.Store', {
        model:'model_vk_camstat',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_camstat/getRows',
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
          DefineForms_vk_camp_();
          DefineForms_vk_camovstat_();
          DefineForms_vk_camstat_();
     var   int_vk_camp_     =      DefineInterface_vk_camp_('int_vk_camp',store_vk_camp, selection);
     var   int_vk_camovstat_     =      DefineInterface_vk_camovstat_('int_vk_camovstat',store_vk_camovstat);
     var   int_vk_camstat_     =      DefineInterface_vk_camstat_('int_vk_camstat',store_vk_camstat);
     vkcam_= Ext.create('Ext.form.Panel', {
      id: 'vkcam',
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
        	    int_vk_camp_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_camp_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vkcam',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Рекламная компания',
            layout:'fit',
            itemId:'tab_vk_camp',
            items:[ // panel on tab 
int_vk_camp_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Итоговая статистика',
            layout:'fit',
            itemId:'tab_vk_camovstat',
            items:[ // panel on tab 
int_vk_camovstat_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Ежедневная статистика',
            layout:'fit',
            itemId:'tab_vk_camstat',
            items:[ // panel on tab 
int_vk_camstat_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkcam_.closable= true;
       vkcam_.title= 'Рекламная кампания';
       vkcam_.frame= true;
    }else{
       vkcam_.closable= false;
       vkcam_.title= '';
       vkcam_.frame= false;
    }
   store_vk_camp.on('load', function() {
        if(store_vk_camp.count()==0){
            store_vk_camp.insert(0, new model_vk_camp());
        }
        record= store_vk_camp.getAt(0);
        record['instanceid']=objectID;
   int_vk_camp_.setActiveRecord(record,objectID);	
   });
       store_vk_camp.load( {params:{ instanceid:objectID} }  );
   store_vk_camovstat.on('load', function() {
        if(store_vk_camovstat.count()==0){
            store_vk_camovstat.insert(0, new model_vk_camovstat());
        }
        record= store_vk_camovstat.getAt(0);
        record['instanceid']=objectID;
   int_vk_camovstat_.setActiveRecord(record,objectID);	
   });
       store_vk_camovstat.load( {params:{ instanceid:objectID} }  );
   int_vk_camstat_.instanceid=objectID;	
       store_vk_camstat.load(  {params:{ instanceid:objectID} } );
    return vkcam_;
}
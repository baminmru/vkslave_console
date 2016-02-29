
Ext.require([
'Ext.form.*'
]);
  vdt_= null;
function VDT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_town = Ext.create('Ext.data.Store', {
        model:'model_vk_town',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_town/getRows',
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

    var store_vk_streets = Ext.create('Ext.data.Store', {
        model:'model_vk_streets',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_streets/getRows',
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

    var store_vk_stations = Ext.create('Ext.data.Store', {
        model:'model_vk_stations',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_stations/getRows',
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

    var store_vk_districts = Ext.create('Ext.data.Store', {
        model:'model_vk_districts',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_districts/getRows',
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

    var store_vk_schools = Ext.create('Ext.data.Store', {
        model:'model_vk_schools',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_schools/getRows',
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
          DefineForms_vk_town_();
          DefineForms_vk_streets_();
          DefineForms_vk_stations_();
          DefineForms_vk_districts_();
          DefineForms_vk_schools_();
     var   int_vk_town_     =      DefineInterface_vk_town_('int_vk_town',store_vk_town, selection);
     var   int_vk_streets_     =      DefineInterface_vk_streets_('int_vk_streets',store_vk_streets);
     var   int_vk_stations_     =      DefineInterface_vk_stations_('int_vk_stations',store_vk_stations);
     var   int_vk_districts_     =      DefineInterface_vk_districts_('int_vk_districts',store_vk_districts);
     var   int_vk_schools_     =      DefineInterface_vk_schools_('int_vk_schools',store_vk_schools);
     vdt_= Ext.create('Ext.form.Panel', {
      id: 'vdt',
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
        	    int_vk_town_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_town_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vdt',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Город',
            layout:'fit',
            itemId:'tab_vk_town',
            items:[ // panel on tab 
int_vk_town_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Улицы',
            layout:'fit',
            itemId:'tab_vk_streets',
            items:[ // panel on tab 
int_vk_streets_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Станции',
            layout:'fit',
            itemId:'tab_vk_stations',
            items:[ // panel on tab 
int_vk_stations_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Районы',
            layout:'fit',
            itemId:'tab_vk_districts',
            items:[ // panel on tab 
int_vk_districts_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Учебные заведения',
            layout:'fit',
            itemId:'tab_vk_schools',
            items:[ // panel on tab 
int_vk_schools_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdt_.closable= true;
       vdt_.title= 'Города';
       vdt_.frame= true;
    }else{
       vdt_.closable= false;
       vdt_.title= '';
       vdt_.frame= false;
    }
   store_vk_town.on('load', function() {
        if(store_vk_town.count()==0){
            store_vk_town.insert(0, new model_vk_town());
        }
        record= store_vk_town.getAt(0);
        record['instanceid']=objectID;
   int_vk_town_.setActiveRecord(record,objectID);	
   });
       store_vk_town.load( {params:{ instanceid:objectID} }  );
   int_vk_streets_.instanceid=objectID;	
       store_vk_streets.load(  {params:{ instanceid:objectID} } );
   int_vk_stations_.instanceid=objectID;	
       store_vk_stations.load(  {params:{ instanceid:objectID} } );
   int_vk_districts_.instanceid=objectID;	
       store_vk_districts.load(  {params:{ instanceid:objectID} } );
   int_vk_schools_.instanceid=objectID;	
       store_vk_schools.load(  {params:{ instanceid:objectID} } );
    return vdt_;
}
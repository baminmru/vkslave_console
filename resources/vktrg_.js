
Ext.require([
'Ext.form.*'
]);
  vktrg_= null;
function VKTRG_Panel_(objectID, RootPanel, selection){ 


    var store_vk_trginfo = Ext.create('Ext.data.Store', {
        model:'model_vk_trginfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_trginfo/getRows',
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

    var store_vk_trgfiles = Ext.create('Ext.data.Store', {
        model:'model_vk_trgfiles',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_trgfiles/getRows',
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
          DefineForms_vk_trginfo_();
          DefineForms_vk_trgfiles_();
     var   int_vk_trginfo_     =      DefineInterface_vk_trginfo_('int_vk_trginfo',store_vk_trginfo, selection);
     var   int_vk_trgfiles_     =      DefineInterface_vk_trgfiles_('int_vk_trgfiles',store_vk_trgfiles);
     vktrg_= Ext.create('Ext.form.Panel', {
      id: 'vktrg',
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
        	    int_vk_trginfo_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_trginfo_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vktrg',
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
            itemId:'tab_vk_trginfo',
            items:[ // panel on tab 
int_vk_trginfo_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Списки ',
            layout:'fit',
            itemId:'tab_vk_trgfiles',
            items:[ // panel on tab 
int_vk_trgfiles_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vktrg_.closable= true;
       vktrg_.title= 'Ретаргетинг';
       vktrg_.frame= true;
    }else{
       vktrg_.closable= false;
       vktrg_.title= '';
       vktrg_.frame= false;
    }
   store_vk_trginfo.on('load', function() {
        if(store_vk_trginfo.count()==0){
            store_vk_trginfo.insert(0, new model_vk_trginfo());
        }
        record= store_vk_trginfo.getAt(0);
        record['instanceid']=objectID;
   int_vk_trginfo_.setActiveRecord(record,objectID);	
   });
       store_vk_trginfo.load( {params:{ instanceid:objectID} }  );
   int_vk_trgfiles_.instanceid=objectID;	
       store_vk_trgfiles.load(  {params:{ instanceid:objectID} } );
    return vktrg_;
}
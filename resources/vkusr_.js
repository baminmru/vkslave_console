
Ext.require([
'Ext.form.*'
]);
  vkusr_= null;
function VKUSR_Panel_(objectID, RootPanel, selection){ 


    var store_vk_usr = Ext.create('Ext.data.Store', {
        model:'model_vk_usr',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_usr/getRows',
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

    var store_vk_cab = Ext.create('Ext.data.Store', {
        model:'model_vk_cab',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_cab/getRows',
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
          DefineForms_vk_usr_();
          DefineForms_vk_cab_();
     var   int_vk_usr_     =      DefineInterface_vk_usr_('int_vk_usr',store_vk_usr, selection);
     var   int_vk_cab_     =      DefineInterface_vk_cab_('int_vk_cab',store_vk_cab);
     vkusr_= Ext.create('Ext.form.Panel', {
      id: 'vkusr',
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
        	    int_vk_usr_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_vk_usr_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_vkusr',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'ВК. Пользователь',
            layout:'fit',
            itemId:'tab_vk_usr',
            items:[ // panel on tab 
int_vk_usr_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Рекламный кабинет',
            layout:'fit',
            itemId:'tab_vk_cab',
            items:[ // panel on tab 
int_vk_cab_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vkusr_.closable= true;
       vkusr_.title= 'ВК Аккаунт';
       vkusr_.frame= true;
    }else{
       vkusr_.closable= false;
       vkusr_.title= '';
       vkusr_.frame= false;
    }
   store_vk_usr.on('load', function() {
        if(store_vk_usr.count()==0){
            store_vk_usr.insert(0, new model_vk_usr());
        }
        record= store_vk_usr.getAt(0);
        record['instanceid']=objectID;
   int_vk_usr_.setActiveRecord(record,objectID);	
   });
       store_vk_usr.load( {params:{ instanceid:objectID} }  );
   int_vk_cab_.instanceid=objectID;	
       store_vk_cab.load(  {params:{ instanceid:objectID} } );
    return vkusr_;
}

Ext.require([
'Ext.form.*'
]);
  vdrg_= null;
function VDRG_Panel_(objectID, RootPanel, selection){ 


    var store_vk_region = Ext.create('Ext.data.Store', {
        model:'model_vk_region',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_region/getRows',
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
          DefineForms_vk_region_();
     var   int_vk_region_     =      DefineInterface_vk_region_('int_vk_region',store_vk_region);
     vdrg_= Ext.create('Ext.form.Panel', {
      id: 'vdrg',
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
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return true;
        },
        items: [{
            xtype:'panel',
            itemId:'tabs_vdrg',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_region',
            items:[ // panel on tab 
int_vk_region_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdrg_.closable= true;
       vdrg_.title= 'Регионы';
       vdrg_.frame= true;
    }else{
       vdrg_.closable= false;
       vdrg_.title= '';
       vdrg_.frame= false;
    }
   int_vk_region_.instanceid=objectID;	
       store_vk_region.load(  {params:{ instanceid:objectID} } );
    return vdrg_;
}

Ext.require([
'Ext.form.*'
]);
  vdapl_= null;
function VDAPL_Panel_(objectID, RootPanel, selection){ 


    var store_vk_platform = Ext.create('Ext.data.Store', {
        model:'model_vk_platform',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_platform/getRows',
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
          DefineForms_vk_platform_();
     var   int_vk_platform_     =      DefineInterface_vk_platform_('int_vk_platform',store_vk_platform);
     vdapl_= Ext.create('Ext.form.Panel', {
      id: 'vdapl',
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
            itemId:'tabs_vdapl',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_platform',
            items:[ // panel on tab 
int_vk_platform_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdapl_.closable= true;
       vdapl_.title= 'Платформа';
       vdapl_.frame= true;
    }else{
       vdapl_.closable= false;
       vdapl_.title= '';
       vdapl_.frame= false;
    }
   int_vk_platform_.instanceid=objectID;	
       store_vk_platform.load(  {params:{ instanceid:objectID} } );
    return vdapl_;
}
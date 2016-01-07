
Ext.require([
'Ext.form.*'
]);
  vddev_= null;
function VDDEV_Panel_(objectID, RootPanel, selection){ 


    var store_vk_device = Ext.create('Ext.data.Store', {
        model:'model_vk_device',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_device/getRows',
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
          DefineForms_vk_device_();
     var   int_vk_device_     =      DefineInterface_vk_device_('int_vk_device',store_vk_device);
     vddev_= Ext.create('Ext.form.Panel', {
      id: 'vddev',
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
            itemId:'tabs_vddev',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_device',
            items:[ // panel on tab 
int_vk_device_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vddev_.closable= true;
       vddev_.title= 'Устройства';
       vddev_.frame= true;
    }else{
       vddev_.closable= false;
       vddev_.title= '';
       vddev_.frame= false;
    }
   int_vk_device_.instanceid=objectID;	
       store_vk_device.load(  {params:{ instanceid:objectID} } );
    return vddev_;
}
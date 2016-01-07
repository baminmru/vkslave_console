
Ext.require([
'Ext.form.*'
]);
  vdos_= null;
function VDOS_Panel_(objectID, RootPanel, selection){ 


    var store_vk_os = Ext.create('Ext.data.Store', {
        model:'model_vk_os',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_os/getRows',
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
          DefineForms_vk_os_();
     var   int_vk_os_     =      DefineInterface_vk_os_('int_vk_os',store_vk_os);
     vdos_= Ext.create('Ext.form.Panel', {
      id: 'vdos',
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
            itemId:'tabs_vdos',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_os',
            items:[ // panel on tab 
int_vk_os_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdos_.closable= true;
       vdos_.title= 'ОС';
       vdos_.frame= true;
    }else{
       vdos_.closable= false;
       vdos_.title= '';
       vdos_.frame= false;
    }
   int_vk_os_.instanceid=objectID;	
       store_vk_os.load(  {params:{ instanceid:objectID} } );
    return vdos_;
}

Ext.require([
'Ext.form.*'
]);
  vdbrw_= null;
function VDBRW_Panel_(objectID, RootPanel, selection){ 


    var store_vk_browser = Ext.create('Ext.data.Store', {
        model:'model_vk_browser',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_browser/getRows',
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
          DefineForms_vk_browser_();
     var   int_vk_browser_     =      DefineInterface_vk_browser_('int_vk_browser',store_vk_browser);
     vdbrw_= Ext.create('Ext.form.Panel', {
      id: 'vdbrw',
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
            itemId:'tabs_vdbrw',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_browser',
            items:[ // panel on tab 
int_vk_browser_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdbrw_.closable= true;
       vdbrw_.title= 'Браузеры';
       vdbrw_.frame= true;
    }else{
       vdbrw_.closable= false;
       vdbrw_.title= '';
       vdbrw_.frame= false;
    }
   int_vk_browser_.instanceid=objectID;	
       store_vk_browser.load(  {params:{ instanceid:objectID} } );
    return vdbrw_;
}
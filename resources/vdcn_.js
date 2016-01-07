
Ext.require([
'Ext.form.*'
]);
  vdcn_= null;
function VDCN_Panel_(objectID, RootPanel, selection){ 


    var store_vk_country = Ext.create('Ext.data.Store', {
        model:'model_vk_country',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_country/getRows',
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
          DefineForms_vk_country_();
     var   int_vk_country_     =      DefineInterface_vk_country_('int_vk_country',store_vk_country);
     vdcn_= Ext.create('Ext.form.Panel', {
      id: 'vdcn',
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
            itemId:'tabs_vdcn',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_country',
            items:[ // panel on tab 
int_vk_country_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdcn_.closable= true;
       vdcn_.title= 'Страны';
       vdcn_.frame= true;
    }else{
       vdcn_.closable= false;
       vdcn_.title= '';
       vdcn_.frame= false;
    }
   int_vk_country_.instanceid=objectID;	
       store_vk_country.load(  {params:{ instanceid:objectID} } );
    return vdcn_;
}
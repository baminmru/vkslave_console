
Ext.require([
'Ext.form.*'
]);
  vdinter_= null;
function VDINTER_Panel_(objectID, RootPanel, selection){ 


    var store_vk_interest = Ext.create('Ext.data.Store', {
        model:'model_vk_interest',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_interest/getRows',
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
          DefineForms_vk_interest_();
     var   int_vk_interest_     =      DefineInterface_vk_interest_('int_vk_interest',store_vk_interest);
     vdinter_= Ext.create('Ext.form.Panel', {
      id: 'vdinter',
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
            itemId:'tabs_vdinter',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_interest',
            items:[ // panel on tab 
int_vk_interest_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdinter_.closable= true;
       vdinter_.title= 'Интересы';
       vdinter_.frame= true;
    }else{
       vdinter_.closable= false;
       vdinter_.title= '';
       vdinter_.frame= false;
    }
   int_vk_interest_.instanceid=objectID;	
       store_vk_interest.load(  {params:{ instanceid:objectID} } );
    return vdinter_;
}
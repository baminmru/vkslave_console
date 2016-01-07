
Ext.require([
'Ext.form.*'
]);
  vdast_= null;
function VDAST_Panel_(objectID, RootPanel, selection){ 


    var store_vk_adstate = Ext.create('Ext.data.Store', {
        model:'model_vk_adstate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adstate/getRows',
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
          DefineForms_vk_adstate_();
     var   int_vk_adstate_     =      DefineInterface_vk_adstate_('int_vk_adstate',store_vk_adstate);
     vdast_= Ext.create('Ext.form.Panel', {
      id: 'vdast',
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
            itemId:'tabs_vdast',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_adstate',
            items:[ // panel on tab 
int_vk_adstate_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdast_.closable= true;
       vdast_.title= 'Статус объявления';
       vdast_.frame= true;
    }else{
       vdast_.closable= false;
       vdast_.title= '';
       vdast_.frame= false;
    }
   int_vk_adstate_.instanceid=objectID;	
       store_vk_adstate.load(  {params:{ instanceid:objectID} } );
    return vdast_;
}
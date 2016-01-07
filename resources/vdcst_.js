
Ext.require([
'Ext.form.*'
]);
  vdcst_= null;
function VDCST_Panel_(objectID, RootPanel, selection){ 


    var store_vk_castate = Ext.create('Ext.data.Store', {
        model:'model_vk_castate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_castate/getRows',
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
          DefineForms_vk_castate_();
     var   int_vk_castate_     =      DefineInterface_vk_castate_('int_vk_castate',store_vk_castate);
     vdcst_= Ext.create('Ext.form.Panel', {
      id: 'vdcst',
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
            itemId:'tabs_vdcst',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_castate',
            items:[ // panel on tab 
int_vk_castate_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdcst_.closable= true;
       vdcst_.title= 'Статус кампании';
       vdcst_.frame= true;
    }else{
       vdcst_.closable= false;
       vdcst_.title= '';
       vdcst_.frame= false;
    }
   int_vk_castate_.instanceid=objectID;	
       store_vk_castate.load(  {params:{ instanceid:objectID} } );
    return vdcst_;
}
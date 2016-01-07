
Ext.require([
'Ext.form.*'
]);
  vdpos_= null;
function VDPOS_Panel_(objectID, RootPanel, selection){ 


    var store_vk_position = Ext.create('Ext.data.Store', {
        model:'model_vk_position',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_position/getRows',
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
          DefineForms_vk_position_();
     var   int_vk_position_     =      DefineInterface_vk_position_('int_vk_position',store_vk_position);
     vdpos_= Ext.create('Ext.form.Panel', {
      id: 'vdpos',
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
            itemId:'tabs_vdpos',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_position',
            items:[ // panel on tab 
int_vk_position_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdpos_.closable= true;
       vdpos_.title= 'Должности';
       vdpos_.frame= true;
    }else{
       vdpos_.closable= false;
       vdpos_.title= '';
       vdpos_.frame= false;
    }
   int_vk_position_.instanceid=objectID;	
       store_vk_position.load(  {params:{ instanceid:objectID} } );
    return vdpos_;
}
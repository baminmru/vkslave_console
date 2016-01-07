
Ext.require([
'Ext.form.*'
]);
  vdt_= null;
function VDT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_town = Ext.create('Ext.data.Store', {
        model:'model_vk_town',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_town/getRows',
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
          DefineForms_vk_town_();
     var   int_vk_town_     =      DefineInterface_vk_town_('int_vk_town',store_vk_town);
     vdt_= Ext.create('Ext.form.Panel', {
      id: 'vdt',
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
            itemId:'tabs_vdt',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_town',
            items:[ // panel on tab 
int_vk_town_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdt_.closable= true;
       vdt_.title= 'Города';
       vdt_.frame= true;
    }else{
       vdt_.closable= false;
       vdt_.title= '';
       vdt_.frame= false;
    }
   int_vk_town_.instanceid=objectID;	
       store_vk_town.load(  {params:{ instanceid:objectID} } );
    return vdt_;
}
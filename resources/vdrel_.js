
Ext.require([
'Ext.form.*'
]);
  vdrel_= null;
function VDREL_Panel_(objectID, RootPanel, selection){ 


    var store_vk_religion = Ext.create('Ext.data.Store', {
        model:'model_vk_religion',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_religion/getRows',
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
          DefineForms_vk_religion_();
     var   int_vk_religion_     =      DefineInterface_vk_religion_('int_vk_religion',store_vk_religion);
     vdrel_= Ext.create('Ext.form.Panel', {
      id: 'vdrel',
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
            itemId:'tabs_vdrel',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_religion',
            items:[ // panel on tab 
int_vk_religion_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdrel_.closable= true;
       vdrel_.title= 'Религии';
       vdrel_.frame= true;
    }else{
       vdrel_.closable= false;
       vdrel_.title= '';
       vdrel_.frame= false;
    }
   int_vk_religion_.instanceid=objectID;	
       store_vk_religion.load(  {params:{ instanceid:objectID} } );
    return vdrel_;
}
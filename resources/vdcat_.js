
Ext.require([
'Ext.form.*'
]);
  vdcat_= null;
function VDCAT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_category = Ext.create('Ext.data.Store', {
        model:'model_vk_category',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_category/getRows',
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
          DefineForms_vk_category_();
     var   int_vk_category_     =      DefineInterface_vk_category_('int_vk_category',store_vk_category);
     vdcat_= Ext.create('Ext.form.Panel', {
      id: 'vdcat',
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
            itemId:'tabs_vdcat',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_category',
            items:[ // panel on tab 
int_vk_category_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdcat_.closable= true;
       vdcat_.title= 'Категории';
       vdcat_.frame= true;
    }else{
       vdcat_.closable= false;
       vdcat_.title= '';
       vdcat_.frame= false;
    }
   int_vk_category_.instanceid=objectID;	
       store_vk_category.load(  {params:{ instanceid:objectID} } );
    return vdcat_;
}
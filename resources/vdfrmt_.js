
Ext.require([
'Ext.form.*'
]);
  vdfrmt_= null;
function VDFRMT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_adformat = Ext.create('Ext.data.Store', {
        model:'model_vk_adformat',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adformat/getRows',
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
          DefineForms_vk_adformat_();
     var   int_vk_adformat_     =      DefineInterface_vk_adformat_('int_vk_adformat',store_vk_adformat);
     vdfrmt_= Ext.create('Ext.form.Panel', {
      id: 'vdfrmt',
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
            itemId:'tabs_vdfrmt',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_adformat',
            items:[ // panel on tab 
int_vk_adformat_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdfrmt_.closable= true;
       vdfrmt_.title= 'Формат объявления';
       vdfrmt_.frame= true;
    }else{
       vdfrmt_.closable= false;
       vdfrmt_.title= '';
       vdfrmt_.frame= false;
    }
   int_vk_adformat_.instanceid=objectID;	
       store_vk_adformat.load(  {params:{ instanceid:objectID} } );
    return vdfrmt_;
}

Ext.require([
'Ext.form.*'
]);
  vdpt_= null;
function VDPT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_paytype = Ext.create('Ext.data.Store', {
        model:'model_vk_paytype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_paytype/getRows',
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
          DefineForms_vk_paytype_();
     var   int_vk_paytype_     =      DefineInterface_vk_paytype_('int_vk_paytype',store_vk_paytype);
     vdpt_= Ext.create('Ext.form.Panel', {
      id: 'vdpt',
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
            itemId:'tabs_vdpt',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_paytype',
            items:[ // panel on tab 
int_vk_paytype_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdpt_.closable= true;
       vdpt_.title= 'Тип оплаты';
       vdpt_.frame= true;
    }else{
       vdpt_.closable= false;
       vdpt_.title= '';
       vdpt_.frame= false;
    }
   int_vk_paytype_.instanceid=objectID;	
       store_vk_paytype.load(  {params:{ instanceid:objectID} } );
    return vdpt_;
}
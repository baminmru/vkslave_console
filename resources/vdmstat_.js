
Ext.require([
'Ext.form.*'
]);
  vdmstat_= null;
function VDMSTAT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_matrialstatus = Ext.create('Ext.data.Store', {
        model:'model_vk_matrialstatus',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_matrialstatus/getRows',
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
          DefineForms_vk_matrialstatus_();
     var   int_vk_matrialstatus_     =      DefineInterface_vk_matrialstatus_('int_vk_matrialstatus',store_vk_matrialstatus);
     vdmstat_= Ext.create('Ext.form.Panel', {
      id: 'vdmstat',
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
            itemId:'tabs_vdmstat',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_matrialstatus',
            items:[ // panel on tab 
int_vk_matrialstatus_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdmstat_.closable= true;
       vdmstat_.title= 'Семейное положение';
       vdmstat_.frame= true;
    }else{
       vdmstat_.closable= false;
       vdmstat_.title= '';
       vdmstat_.frame= false;
    }
   int_vk_matrialstatus_.instanceid=objectID;	
       store_vk_matrialstatus.load(  {params:{ instanceid:objectID} } );
    return vdmstat_;
}
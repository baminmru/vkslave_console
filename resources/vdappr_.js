
Ext.require([
'Ext.form.*'
]);
  vdappr_= null;
function VDAPPR_Panel_(objectID, RootPanel, selection){ 


    var store_vk_approve = Ext.create('Ext.data.Store', {
        model:'model_vk_approve',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_approve/getRows',
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
          DefineForms_vk_approve_();
     var   int_vk_approve_     =      DefineInterface_vk_approve_('int_vk_approve',store_vk_approve);
     vdappr_= Ext.create('Ext.form.Panel', {
      id: 'vdappr',
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
            itemId:'tabs_vdappr',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_approve',
            items:[ // panel on tab 
int_vk_approve_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdappr_.closable= true;
       vdappr_.title= 'Статус модерации';
       vdappr_.frame= true;
    }else{
       vdappr_.closable= false;
       vdappr_.title= '';
       vdappr_.frame= false;
    }
   int_vk_approve_.instanceid=objectID;	
       store_vk_approve.load(  {params:{ instanceid:objectID} } );
    return vdappr_;
}
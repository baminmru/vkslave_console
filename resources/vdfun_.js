
Ext.require([
'Ext.form.*'
]);
  vdfun_= null;
function VDFUN_Panel_(objectID, RootPanel, selection){ 


    var store_vk_funs = Ext.create('Ext.data.Store', {
        model:'model_vk_funs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_funs/getRows',
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
          DefineForms_vk_funs_();
     var   int_vk_funs_     =      DefineInterface_vk_funs_('int_vk_funs',store_vk_funs);
     vdfun_= Ext.create('Ext.form.Panel', {
      id: 'vdfun',
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
            itemId:'tabs_vdfun',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_funs',
            items:[ // panel on tab 
int_vk_funs_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdfun_.closable= true;
       vdfun_.title= 'Интересы. Текст';
       vdfun_.frame= true;
    }else{
       vdfun_.closable= false;
       vdfun_.title= '';
       vdfun_.frame= false;
    }
   int_vk_funs_.instanceid=objectID;	
       store_vk_funs.load(  {params:{ instanceid:objectID} } );
    return vdfun_;
}
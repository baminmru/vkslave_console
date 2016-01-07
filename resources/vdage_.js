
Ext.require([
'Ext.form.*'
]);
  vdage_= null;
function VDAGE_Panel_(objectID, RootPanel, selection){ 


    var store_vk_age = Ext.create('Ext.data.Store', {
        model:'model_vk_age',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_age/getRows',
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
          DefineForms_vk_age_();
     var   int_vk_age_     =      DefineInterface_vk_age_('int_vk_age',store_vk_age);
     vdage_= Ext.create('Ext.form.Panel', {
      id: 'vdage',
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
            itemId:'tabs_vdage',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_age',
            items:[ // panel on tab 
int_vk_age_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdage_.closable= true;
       vdage_.title= 'Возрастные ограничения';
       vdage_.frame= true;
    }else{
       vdage_.closable= false;
       vdage_.title= '';
       vdage_.frame= false;
    }
   int_vk_age_.instanceid=objectID;	
       store_vk_age.load(  {params:{ instanceid:objectID} } );
    return vdage_;
}
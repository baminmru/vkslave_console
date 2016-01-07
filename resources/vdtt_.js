
Ext.require([
'Ext.form.*'
]);
  vdtt_= null;
function VDTT_Panel_(objectID, RootPanel, selection){ 


    var store_vk_tasktype = Ext.create('Ext.data.Store', {
        model:'model_vk_tasktype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_tasktype/getRows',
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
          DefineForms_vk_tasktype_();
     var   int_vk_tasktype_     =      DefineInterface_vk_tasktype_('int_vk_tasktype',store_vk_tasktype);
     vdtt_= Ext.create('Ext.form.Panel', {
      id: 'vdtt',
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
            itemId:'tabs_vdtt',
            layout: 'fit',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            layout:'fit',
            itemId:'tab_vk_tasktype',
            items:[ // panel on tab 
int_vk_tasktype_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       vdtt_.closable= true;
       vdtt_.title= 'Типы задач';
       vdtt_.frame= true;
    }else{
       vdtt_.closable= false;
       vdtt_.title= '';
       vdtt_.frame= false;
    }
   int_vk_tasktype_.instanceid=objectID;	
       store_vk_tasktype.load(  {params:{ instanceid:objectID} } );
    return vdtt_;
}
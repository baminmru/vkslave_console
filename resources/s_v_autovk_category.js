
 Ext.define('model_v_autovk_category',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_category_vkid', type: 'number'}
            ,{name:'vk_category_title', type: 'string'}
            ,{name:'vk_category_parent_id', type: 'number'}
        ]
    });

    var store_v_autovk_category = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_category',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_category/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'rows'
                ,totalProperty: 'total'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg:    operation.getError(),
                        icon : Ext.MessageBox.ERROR,
                        buttons : Ext.Msg.OK
                    });
                }
            }
        }
    });
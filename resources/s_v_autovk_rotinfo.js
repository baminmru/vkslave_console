
 Ext.define('model_v_autovk_rotinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_rotinfo_status', type: 'string'}
            ,{name:'vk_rotinfo_name', type: 'string'}
            ,{name:'vk_rotinfo_campaign_id', type: 'string'}
            ,{name:'vk_rotinfo__description', type: 'string'}
        ]
    });

    var store_v_autovk_rotinfo = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_rotinfo',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_rotinfo/getRows',
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
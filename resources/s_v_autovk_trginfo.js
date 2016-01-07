
 Ext.define('model_v_autovk_trginfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_trginfo_lifetime', type: 'number'}
            ,{name:'vk_trginfo_vkid', type: 'string'}
            ,{name:'vk_trginfo_info', type: 'string'}
            ,{name:'vk_trginfo_cab', type: 'string'}
            ,{name:'vk_trginfo_pixel', type: 'string'}
            ,{name:'vk_trginfo_audience_count', type: 'number'}
            ,{name:'vk_trginfo_trgdomain', type: 'string'}
            ,{name:'vk_trginfo_name', type: 'string'}
        ]
    });

    var store_v_autovk_trginfo = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_trginfo',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_trginfo/getRows',
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
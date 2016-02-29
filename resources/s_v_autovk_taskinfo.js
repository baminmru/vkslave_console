
 Ext.define('model_v_autovk_taskinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_taskinfo_lastdate', type: 'string'}
            ,{name:'vk_taskinfo_vkusr', type: 'string'}
            ,{name:'vk_taskinfo_name', type: 'string'}
            ,{name:'vk_taskinfo_result', type: 'string'}
            ,{name:'vk_taskinfo_ads', type: 'string'}
            ,{name:'vk_taskinfo_repeat_interval', type: 'number'}
            ,{name:'vk_taskinfo_isdone', type: 'string'}
            ,{name:'vk_taskinfo_crdate', type: 'string'}
            ,{name:'vk_taskinfo_rotation', type: 'string'}
            ,{name:'vk_taskinfo_cab', type: 'string'}
            ,{name:'vk_taskinfo_camp', type: 'string'}
            ,{name:'vk_taskinfo_tasktype', type: 'string'}
        ]
    });

    var store_v_autovk_taskinfo = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_taskinfo',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_taskinfo/getRows',
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
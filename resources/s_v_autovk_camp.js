
 Ext.define('model_v_autovk_camp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_camp_day_limit', type: 'number'}
            ,{name:'vk_camp_vk_usr', type: 'string'}
            ,{name:'vk_camp_name', type: 'string'}
            ,{name:'vk_camp_stop_time', type: 'string'}
            ,{name:'vk_camp_status', type: 'string'}
            ,{name:'vk_camp_campagin_id', type: 'string'}
            ,{name:'vk_camp_all_limit', type: 'number'}
            ,{name:'vk_camp_start_time', type: 'string'}
            ,{name:'vk_camp_prj', type: 'string'}
            ,{name:'vk_camp_vk_cab', type: 'string'}
        ]
    });

    var store_v_autovk_camp = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_camp',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_camp/getRows',
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

 Ext.define('model_v_autovk_usr',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_usr_online', type: 'string'}
            ,{name:'vk_usr_home_town', type: 'string'}
            ,{name:'vk_usr_status', type: 'string'}
            ,{name:'vk_usr_vkid', type: 'string'}
            ,{name:'vk_usr_bdate', type: 'string'}
            ,{name:'vk_usr_photo_50', type: 'string'}
            ,{name:'vk_usr_photo_id', type: 'string'}
            ,{name:'vk_usr_first_name', type: 'string'}
            ,{name:'vk_usr_sex', type: 'string'}
            ,{name:'vk_usr_country', type: 'string'}
            ,{name:'vk_usr_photo_100', type: 'string'}
            ,{name:'vk_usr_has_photo', type: 'string'}
            ,{name:'vk_usr_deactivated', type: 'string'}
            ,{name:'vk_usr_last_name', type: 'string'}
        ]
    });

    var store_v_autovk_usr = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_usr',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_usr/getRows',
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
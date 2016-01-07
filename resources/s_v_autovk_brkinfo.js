
 Ext.define('model_v_autovk_brkinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_brkinfo_crdate', type: 'string'}
            ,{name:'vk_brkinfo_ads', type: 'string'}
            ,{name:'vk_brkinfo_rotation', type: 'string'}
            ,{name:'vk_brkinfo_name', type: 'string'}
        ]
    });

    var store_v_autovk_brkinfo = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_brkinfo',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_brkinfo/getRows',
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
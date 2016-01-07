
 Ext.define('model_v_autovk_adinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'vk_adinfo_campaign_id', type: 'string'}
            ,{name:'vk_adinfo_impression_limit', type: 'string'}
            ,{name:'vk_adinfo_ad_platform', type: 'string'}
            ,{name:'vk_adinfo_cpm', type: 'number'}
            ,{name:'vk_adinfo_cost_type', type: 'string'}
            ,{name:'vk_adinfo_video', type: 'string'}
            ,{name:'vk_adinfo_link_url', type: 'string'}
            ,{name:'vk_adinfo_category2_id', type: 'string'}
            ,{name:'vk_adinfo_cpc', type: 'number'}
            ,{name:'vk_adinfo__description', type: 'string'}
            ,{name:'vk_adinfo_ad_format', type: 'string'}
            ,{name:'vk_adinfo_preview_link', type: 'string'}
            ,{name:'vk_adinfo_name', type: 'string'}
            ,{name:'vk_adinfo_approved', type: 'string'}
            ,{name:'vk_adinfo_status', type: 'string'}
            ,{name:'vk_adinfo_all_limit', type: 'number'}
            ,{name:'vk_adinfo_link_domain', type: 'string'}
            ,{name:'vk_adinfo_title', type: 'string'}
            ,{name:'vk_adinfo_age_restriction', type: 'string'}
            ,{name:'vk_adinfo_image_src', type: 'string'}
            ,{name:'vk_adinfo_category1_id', type: 'string'}
            ,{name:'vk_adinfo_ads_id', type: 'string'}
            ,{name:'vk_adinfo_disclamer', type: 'string'}
        ]
    });

    var store_v_autovk_adinfo = Ext.create('Ext.data.Store', {
        model:'model_v_autovk_adinfo',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autovk_adinfo/getRows',
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
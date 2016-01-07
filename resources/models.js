

 Ext.define('model_bpc_info',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'bpc_infoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_bpc_info',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'bpc_infoid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_bpc_info_loaded=false;
    var cmbstore_bpc_info = Ext.create('Ext.data.Store', {
        model:'cmbmodel_bpc_info',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_bpc_info/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_bpc_info_loaded =true;}
       }
    });

 Ext.define('model_iu_int_modules',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_int_modulesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'substructobjects', type: 'int'}
            ,{name:'substructobjects_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'visiblecontrol', type: 'int'}
            ,{name:'visiblecontrol_grid', type: 'string'}
            ,{name:'otherdocmode', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'allobjects', type: 'int'}
            ,{name:'allobjects_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'colegsobject', type: 'int'}
            ,{name:'colegsobject_grid', type: 'string'}
            ,{name:'mydocmode', type: 'string'}
            ,{name:'theicon', type: 'string'}
            ,{name:'controldocmode', type: 'string'}
            ,{name:'groupname', type: 'string'}
        ]
    });


 Ext.define('model_iu_crole',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_croleid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowsetuser', type: 'int'}
            ,{name:'allowsetuser_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_crole',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_croleid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_crole_loaded=false;
    var cmbstore_iu_crole = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_crole',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_crole/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_crole_loaded =true;}
       }
    });

 Ext.define('model_iu_rcfg_mod',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_rcfg_modid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'controldocmode', type: 'string'}
            ,{name:'visiblecontrol', type: 'int'}
            ,{name:'visiblecontrol_grid', type: 'string'}
            ,{name:'allobjects', type: 'int'}
            ,{name:'allobjects_grid', type: 'string'}
            ,{name:'theicon', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'moduleaccessible', type: 'int'}
            ,{name:'moduleaccessible_grid', type: 'string'}
            ,{name:'colegsobject', type: 'int'}
            ,{name:'colegsobject_grid', type: 'string'}
            ,{name:'otherdocmode', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'mydocmode', type: 'string'}
            ,{name:'groupname', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'substructobjects', type: 'int'}
            ,{name:'substructobjects_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_rcfg_docmode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_rcfg_docmodeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowadd', type: 'int'}
            ,{name:'allowadd_grid', type: 'string'}
            ,{name:'editmode', type: 'string'}
            ,{name:'addmode', type: 'string'}
            ,{name:'the_document', type: 'string'}
            ,{name:'the_document_grid', type: 'string'}
            ,{name:'allowdelete', type: 'int'}
            ,{name:'allowdelete_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_rcfg_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_rcfg_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'therole', type: 'string'}
            ,{name:'therole_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_u_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_u_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thephone', type: 'string'}
            ,{name:'surname', type: 'string'}
            ,{name:'email', type: 'string'}
            ,{name:'sendtomail', type: 'int'}
            ,{name:'sendtomail_grid', type: 'string'}
            ,{name:'theclient', type: 'string'}
            ,{name:'theclient_grid', type: 'string'}
            ,{name:'login', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'lastname', type: 'string'}
            ,{name:'currole', type: 'string'}
            ,{name:'currole_grid', type: 'string'}
            ,{name:'freelancer', type: 'int'}
            ,{name:'freelancer_grid', type: 'string'}
        ]
    });


 Ext.define('model_mtzext_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzext_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'exttype', type: 'int'}
            ,{name:'exttype_grid', type: 'string'}
            ,{name:'thedescription', type: 'string'}
        ]
    });


 Ext.define('model_mtzextrel',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzextrelid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theclassname', type: 'string'}
            ,{name:'theplatform', type: 'int'}
            ,{name:'theplatform_grid', type: 'string'}
            ,{name:'thelibraryname', type: 'string'}
        ]
    });


 Ext.define('model_filterfieldgroup',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'filterfieldgroupid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'allowignore', type: 'int'}
            ,{name:'allowignore_grid', type: 'string'}
        ]
    });


 Ext.define('model_fileterfield',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fileterfieldid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'fieldsize', type: 'number'}
            ,{name:'reftotype', type: 'string'}
            ,{name:'reftotype_grid', type: 'string'}
            ,{name:'reftype', type: 'int'}
            ,{name:'reftype_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'fieldtype', type: 'string'}
            ,{name:'fieldtype_grid', type: 'string'}
            ,{name:'valuearray', type: 'int'}
            ,{name:'valuearray_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'reftopart', type: 'string'}
            ,{name:'reftopart_grid', type: 'string'}
        ]
    });


 Ext.define('model_filters',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'filtersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecaption', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_journalcolumn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalcolumnid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'columnalignment', type: 'int'}
            ,{name:'columnalignment_grid', type: 'string'}
            ,{name:'groupaggregation', type: 'int'}
            ,{name:'groupaggregation_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'colsort', type: 'int'}
            ,{name:'colsort_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });


 Ext.define('model_jcolumnsource',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'jcolumnsourceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'viewfield', type: 'string'}
            ,{name:'srcpartview', type: 'string'}
            ,{name:'srcpartview_grid', type: 'string'}
        ]
    });


 Ext.define('model_journalsrc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalsrcid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'viewalias', type: 'string'}
            ,{name:'onrun', type: 'int'}
            ,{name:'onrun_grid', type: 'string'}
            ,{name:'openmode', type: 'string'}
            ,{name:'partview', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_journalsrc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalsrcid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_journalsrc_loaded=false;
    var cmbstore_journalsrc = Ext.create('Ext.data.Store', {
        model:'cmbmodel_journalsrc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_journalsrc/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_journalsrc_loaded =true;}
       }
    });

 Ext.define('model_journal',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'jrnliconcls', type: 'string'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'usefavorites', type: 'int'}
            ,{name:'usefavorites_grid', type: 'string'}
        ]
    });


 Ext.define('model_genpackage',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'genpackageid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_generator_target',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'generator_targetid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'generatorstyle', type: 'int'}
            ,{name:'generatorstyle_grid', type: 'string'}
            ,{name:'queuename', type: 'string'}
            ,{name:'thedevelopmentenv', type: 'int'}
            ,{name:'thedevelopmentenv_grid', type: 'string'}
            ,{name:'generatorprogid', type: 'string'}
            ,{name:'targettype', type: 'int'}
            ,{name:'targettype_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_generator_target',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'generator_targetid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_generator_target_loaded=false;
    var cmbstore_generator_target = Ext.create('Ext.data.Store', {
        model:'cmbmodel_generator_target',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_generator_target/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_generator_target_loaded =true;}
       }
    });

 Ext.define('model_genreference',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'genreferenceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'refclassid', type: 'string'}
            ,{name:'versionmajor', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'versionminor', type: 'number'}
        ]
    });


 Ext.define('model_genmanualcode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'genmanualcodeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_gencontrols',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'gencontrolsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'versionminor', type: 'number'}
            ,{name:'versionmajor', type: 'number'}
            ,{name:'controlprogid', type: 'string'}
            ,{name:'controlclassid', type: 'string'}
        ]
    });


 Ext.define('model_localizeinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'localizeinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'langfull', type: 'string'}
            ,{name:'langshort', type: 'string'}
        ]
    });


 Ext.define('model_fieldtype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldtypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'delayedsave', type: 'int'}
            ,{name:'delayedsave_grid', type: 'string'}
            ,{name:'typestyle', type: 'int'}
            ,{name:'typestyle_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'gridsorttype', type: 'int'}
            ,{name:'gridsorttype_grid', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'allowsize', type: 'int'}
            ,{name:'allowsize_grid', type: 'string'}
            ,{name:'allowlikesearch', type: 'int'}
            ,{name:'allowlikesearch_grid', type: 'string'}
            ,{name:'maximum', type: 'string'}
            ,{name:'minimum', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_fieldtype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldtypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_fieldtype_loaded=false;
    var cmbstore_fieldtype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_fieldtype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldtype/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_fieldtype_loaded =true;}
       }
    });

 Ext.define('model_enumitem',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'enumitemid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'nameincode', type: 'string'}
            ,{name:'namevalue', type: 'number'}
        ]
    });


 Ext.define('model_fieldtypemap',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldtypemapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'fixedsize', type: 'number'}
            ,{name:'stoagetype', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_sharedmethod',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'sharedmethodid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'returntype', type: 'string'}
            ,{name:'returntype_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_sharedmethod',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'sharedmethodid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_sharedmethod_loaded=false;
    var cmbstore_sharedmethod = Ext.create('Ext.data.Store', {
        model:'cmbmodel_sharedmethod',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_sharedmethod/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_sharedmethod_loaded =true;}
       }
    });

 Ext.define('model_script',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'scriptid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_parameters',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'parametersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'reftopart', type: 'string'}
            ,{name:'reftopart_grid', type: 'string'}
            ,{name:'outparam', type: 'int'}
            ,{name:'outparam_grid', type: 'string'}
            ,{name:'datasize', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'typeofparm', type: 'string'}
            ,{name:'typeofparm_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'referencetype', type: 'int'}
            ,{name:'referencetype_grid', type: 'string'}
            ,{name:'allownull', type: 'int'}
            ,{name:'allownull_grid', type: 'string'}
            ,{name:'reftotype', type: 'string'}
            ,{name:'reftotype_grid', type: 'string'}
        ]
    });


 Ext.define('model_objecttype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objecttypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'objiconcls', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'useownership', type: 'int'}
            ,{name:'useownership_grid', type: 'string'}
            ,{name:'ondelete', type: 'string'}
            ,{name:'ondelete_grid', type: 'string'}
            ,{name:'usearchiving', type: 'int'}
            ,{name:'usearchiving_grid', type: 'string'}
            ,{name:'replicatype', type: 'int'}
            ,{name:'replicatype_grid', type: 'string'}
            ,{name:'oncreate', type: 'string'}
            ,{name:'oncreate_grid', type: 'string'}
            ,{name:'commitfullobject', type: 'int'}
            ,{name:'commitfullobject_grid', type: 'string'}
            ,{name:'allowreftoobject', type: 'int'}
            ,{name:'allowreftoobject_grid', type: 'string'}
            ,{name:'package', type: 'string'}
            ,{name:'package_grid', type: 'string'}
            ,{name:'onrun', type: 'string'}
            ,{name:'onrun_grid', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'chooseview', type: 'string'}
            ,{name:'chooseview_grid', type: 'string'}
            ,{name:'issingleinstance', type: 'int'}
            ,{name:'issingleinstance_grid', type: 'string'}
            ,{name:'allowsearch', type: 'int'}
            ,{name:'allowsearch_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_objecttype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objecttypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_objecttype_loaded=false;
    var cmbstore_objecttype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_objecttype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objecttype/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_objecttype_loaded =true;}
       }
    });

 Ext.define('model_objstatus',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objstatusid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'isarchive', type: 'int'}
            ,{name:'isarchive_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'isstartup', type: 'int'}
            ,{name:'isstartup_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_objstatus',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objstatusid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_objstatus_loaded=false;
    var cmbstore_objstatus = Ext.create('Ext.data.Store', {
        model:'cmbmodel_objstatus',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objstatus/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_objstatus_loaded =true;}
       }
    });

 Ext.define('model_nextstate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'nextstateid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thestate', type: 'string'}
            ,{name:'thestate_grid', type: 'string'}
        ]
    });


 Ext.define('model_objectmode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objectmodeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'defaultmode', type: 'int'}
            ,{name:'defaultmode_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_objectmode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objectmodeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_objectmode_loaded=false;
    var cmbstore_objectmode = Ext.create('Ext.data.Store', {
        model:'cmbmodel_objectmode',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objectmode/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_objectmode_loaded =true;}
       }
    });

 Ext.define('model_structrestriction',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'structrestrictionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowadd', type: 'int'}
            ,{name:'allowadd_grid', type: 'string'}
            ,{name:'allowdelete', type: 'int'}
            ,{name:'allowdelete_grid', type: 'string'}
            ,{name:'allowread', type: 'int'}
            ,{name:'allowread_grid', type: 'string'}
            ,{name:'struct', type: 'string'}
            ,{name:'struct_grid', type: 'string'}
            ,{name:'allowedit', type: 'int'}
            ,{name:'allowedit_grid', type: 'string'}
        ]
    });


 Ext.define('model_methodrestriction',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'methodrestrictionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'isrestricted', type: 'int'}
            ,{name:'isrestricted_grid', type: 'string'}
            ,{name:'part', type: 'string'}
            ,{name:'part_grid', type: 'string'}
            ,{name:'method', type: 'string'}
            ,{name:'method_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldrestriction',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldrestrictionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'mandatoryfield', type: 'int'}
            ,{name:'mandatoryfield_grid', type: 'string'}
            ,{name:'thefield', type: 'string'}
            ,{name:'thefield_grid', type: 'string'}
            ,{name:'thepart', type: 'string'}
            ,{name:'thepart_grid', type: 'string'}
            ,{name:'allowmodify', type: 'int'}
            ,{name:'allowmodify_grid', type: 'string'}
            ,{name:'allowread', type: 'int'}
            ,{name:'allowread_grid', type: 'string'}
        ]
    });


 Ext.define('model_typemenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'typemenuid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'tooltip', type: 'string'}
            ,{name:'ismenuitem', type: 'int'}
            ,{name:'ismenuitem_grid', type: 'string'}
            ,{name:'hotkey', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'istoolbarbutton', type: 'int'}
            ,{name:'istoolbarbutton_grid', type: 'string'}
            ,{name:'the_action', type: 'string'}
            ,{name:'the_action_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_typemenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'typemenuid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_typemenu_loaded=false;
    var cmbstore_typemenu = Ext.create('Ext.data.Store', {
        model:'cmbmodel_typemenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_typemenu/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_typemenu_loaded =true;}
       }
    });

 Ext.define('model_instancevalidator',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instancevalidatorid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
            ,{name:'code', type: 'string'}
        ]
    });


 Ext.define('model_part',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'particoncls', type: 'string'}
            ,{name:'rulebrief', type: 'string'}
            ,{name:'integerpkey', type: 'int'}
            ,{name:'integerpkey_grid', type: 'string'}
            ,{name:'manualregister', type: 'int'}
            ,{name:'manualregister_grid', type: 'string'}
            ,{name:'ondelete', type: 'string'}
            ,{name:'ondelete_grid', type: 'string'}
            ,{name:'addbehaivor', type: 'int'}
            ,{name:'addbehaivor_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'onsave', type: 'string'}
            ,{name:'onsave_grid', type: 'string'}
            ,{name:'oncreate', type: 'string'}
            ,{name:'oncreate_grid', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'usearchiving', type: 'int'}
            ,{name:'usearchiving_grid', type: 'string'}
            ,{name:'onrun', type: 'string'}
            ,{name:'onrun_grid', type: 'string'}
            ,{name:'extenderobject', type: 'string'}
            ,{name:'extenderobject_grid', type: 'string'}
            ,{name:'nolog', type: 'int'}
            ,{name:'nolog_grid', type: 'string'}
            ,{name:'shablonbrief', type: 'string'}
            ,{name:'parttype', type: 'int'}
            ,{name:'parttype_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'isjormalchange', type: 'int'}
            ,{name:'isjormalchange_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_part',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_part_loaded=false;
    var cmbstore_part = Ext.create('Ext.data.Store', {
        model:'cmbmodel_part',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_part/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_part_loaded =true;}
       }
    });

 Ext.define('model_partmenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partmenuid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_action', type: 'string'}
            ,{name:'the_action_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'ismenuitem', type: 'int'}
            ,{name:'ismenuitem_grid', type: 'string'}
            ,{name:'istoolbarbutton', type: 'int'}
            ,{name:'istoolbarbutton_grid', type: 'string'}
            ,{name:'hotkey', type: 'string'}
            ,{name:'tooltip', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_partmenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partmenuid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_partmenu_loaded=false;
    var cmbstore_partmenu = Ext.create('Ext.data.Store', {
        model:'cmbmodel_partmenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partmenu/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_partmenu_loaded =true;}
       }
    });

 Ext.define('model_partparammap',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partparammapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'paramname', type: 'string'}
            ,{name:'fieldname', type: 'string'}
            ,{name:'noedit', type: 'int'}
            ,{name:'noedit_grid', type: 'string'}
        ]
    });


 Ext.define('model_partview',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partviewid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'filterfield2', type: 'string'}
            ,{name:'filterfield0', type: 'string'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'forchoose', type: 'int'}
            ,{name:'forchoose_grid', type: 'string'}
            ,{name:'filterfield1', type: 'string'}
            ,{name:'filterfield3', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_partview',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partviewid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_partview_loaded=false;
    var cmbstore_partview = Ext.create('Ext.data.Store', {
        model:'cmbmodel_partview',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partview/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_partview_loaded =true;}
       }
    });

 Ext.define('model_viewcolumn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'viewcolumnid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'forcombo', type: 'int'}
            ,{name:'forcombo_grid', type: 'string'}
            ,{name:'frompart', type: 'string'}
            ,{name:'frompart_grid', type: 'string'}
            ,{name:'aggregation', type: 'int'}
            ,{name:'aggregation_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'field', type: 'string'}
            ,{name:'field_grid', type: 'string'}
            ,{name:'expression', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_viewcolumn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'viewcolumnid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_viewcolumn_loaded=false;
    var cmbstore_viewcolumn = Ext.create('Ext.data.Store', {
        model:'cmbmodel_viewcolumn',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_viewcolumn/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_viewcolumn_loaded =true;}
       }
    });

 Ext.define('model_partview_lnk',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partview_lnkid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thejoindestination', type: 'string'}
            ,{name:'thejoindestination_grid', type: 'string'}
            ,{name:'handjoin', type: 'string'}
            ,{name:'seq', type: 'number'}
            ,{name:'thejoinsource', type: 'string'}
            ,{name:'thejoinsource_grid', type: 'string'}
            ,{name:'theview', type: 'string'}
            ,{name:'theview_grid', type: 'string'}
            ,{name:'reftype', type: 'int'}
            ,{name:'reftype_grid', type: 'string'}
        ]
    });


 Ext.define('model_validator',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'validatorid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_uniqueconstraint',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'uniqueconstraintid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'perparent', type: 'int'}
            ,{name:'perparent_grid', type: 'string'}
        ]
    });


 Ext.define('model_constraintfield',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'constraintfieldid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thefield', type: 'string'}
            ,{name:'thefield_grid', type: 'string'}
        ]
    });


 Ext.define('model_extenderinterface',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'extenderinterfaceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theconfig', type: 'string'}
            ,{name:'targetplatform', type: 'string'}
            ,{name:'targetplatform_grid', type: 'string'}
            ,{name:'theobject', type: 'string'}
            ,{name:'thename', type: 'string'}
        ]
    });


 Ext.define('model_field',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'allownull', type: 'int'}
            ,{name:'allownull_grid', type: 'string'}
            ,{name:'themask', type: 'string'}
            ,{name:'reftopart', type: 'string'}
            ,{name:'reftopart_grid', type: 'string'}
            ,{name:'tabname', type: 'string'}
            ,{name:'thenumerator', type: 'string'}
            ,{name:'thenumerator_grid', type: 'string'}
            ,{name:'shablonbrief', type: 'string'}
            ,{name:'datasize', type: 'number'}
            ,{name:'caption', type: 'string'}
            ,{name:'fieldgroupbox', type: 'string'}
            ,{name:'thestyle', type: 'string'}
            ,{name:'zonetemplate', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'reftotype', type: 'string'}
            ,{name:'reftotype_grid', type: 'string'}
            ,{name:'isbrief', type: 'int'}
            ,{name:'isbrief_grid', type: 'string'}
            ,{name:'fieldtype', type: 'string'}
            ,{name:'fieldtype_grid', type: 'string'}
            ,{name:'isautonumber', type: 'int'}
            ,{name:'isautonumber_grid', type: 'string'}
            ,{name:'referencetype', type: 'int'}
            ,{name:'referencetype_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'internalreference', type: 'int'}
            ,{name:'internalreference_grid', type: 'string'}
            ,{name:'createrefonly', type: 'int'}
            ,{name:'createrefonly_grid', type: 'string'}
            ,{name:'istabbrief', type: 'int'}
            ,{name:'istabbrief_grid', type: 'string'}
            ,{name:'thenameclass', type: 'string'}
            ,{name:'numberdatefield', type: 'string'}
            ,{name:'numberdatefield_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_field',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_field_loaded=false;
    var cmbstore_field = Ext.create('Ext.data.Store', {
        model:'cmbmodel_field',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_field/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_field_loaded =true;}
       }
    });

 Ext.define('model_fldextenders',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fldextendersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theobject', type: 'string'}
            ,{name:'thename', type: 'string'}
            ,{name:'targetplatform', type: 'string'}
            ,{name:'targetplatform_grid', type: 'string'}
            ,{name:'theconfig', type: 'string'}
        ]
    });


 Ext.define('model_fieldsrcdef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldsrcdefid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'connectionstring', type: 'string'}
            ,{name:'descriptionstring', type: 'string'}
            ,{name:'sortfield', type: 'string'}
            ,{name:'provider', type: 'string'}
            ,{name:'filterstring', type: 'string'}
            ,{name:'datasource', type: 'string'}
            ,{name:'dontshowdialog', type: 'int'}
            ,{name:'dontshowdialog_grid', type: 'string'}
            ,{name:'briefstring', type: 'string'}
            ,{name:'idfield', type: 'string'}
        ]
    });


 Ext.define('model_dinamicfilterscript',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'dinamicfilterscriptid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
            ,{name:'code', type: 'string'}
        ]
    });


 Ext.define('model_fieldexpression',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldexpressionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldvalidator',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldvalidatorid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldmenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldmenuid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'hotkey', type: 'string'}
            ,{name:'tooltip', type: 'string'}
            ,{name:'actionid', type: 'string'}
            ,{name:'actionid_grid', type: 'string'}
            ,{name:'ismenuitem', type: 'int'}
            ,{name:'ismenuitem_grid', type: 'string'}
            ,{name:'istoolbarbutton', type: 'int'}
            ,{name:'istoolbarbutton_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldparammap',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldparammapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'noedit', type: 'int'}
            ,{name:'noedit_grid', type: 'string'}
            ,{name:'paramname', type: 'string'}
            ,{name:'fieldname', type: 'string'}
        ]
    });


 Ext.define('model_mtzapp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzappid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'dbname', type: 'string'}
            ,{name:'thecomment', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_mtzapp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzappid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_mtzapp_loaded=false;
    var cmbstore_mtzapp = Ext.create('Ext.data.Store', {
        model:'cmbmodel_mtzapp',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_mtzapp/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_mtzapp_loaded =true;}
       }
    });

 Ext.define('model_parentpackage',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'parentpackageid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'package', type: 'string'}
            ,{name:'package_grid', type: 'string'}
        ]
    });


 Ext.define('model_rptstruct',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'rptstructid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'caption', type: 'string'}
        ]
    });


 Ext.define('model_rptfields',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'rptfieldsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'fieldtype', type: 'string'}
            ,{name:'fieldtype_grid', type: 'string'}
            ,{name:'fieldsize', type: 'number'}
            ,{name:'caption', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_rptformula',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'rptformulaid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'platform', type: 'string'}
            ,{name:'platform_grid', type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_reports',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'reportsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'preparemethod', type: 'string'}
            ,{name:'preparemethod_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'reporttype', type: 'int'}
            ,{name:'reporttype_grid', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'reportfile', type: 'string'}
            ,{name:'reportfile_ext', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'reportview', type: 'string'}
            ,{name:'thereportext', type: 'string'}
            ,{name:'thereportext_grid', type: 'string'}
        ]
    });


 Ext.define('model_the_session',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'the_sessionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'login', type: 'string'}
            ,{name:'userrole', type: 'string'}
            ,{name:'userrole_grid', type: 'string'}
            ,{name:'lastaccess', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'usersid', type: 'string'}
            ,{name:'usersid_grid', type: 'string'}
            ,{name:'closed', type: 'int'}
            ,{name:'closed_grid', type: 'string'}
            ,{name:'startat', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'closedat', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'applicationid', type: 'string'}
            ,{name:'applicationid_grid', type: 'string'}
            ,{name:'lang', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_the_session',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'the_sessionid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_the_session_loaded=false;
    var cmbstore_the_session = Ext.create('Ext.data.Store', {
        model:'cmbmodel_the_session',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_the_session/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_the_session_loaded =true;}
       }
    });

 Ext.define('model_sysrefcache',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'sysrefcacheid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'modulename', type: 'string'}
            ,{name:'objectownerid', type: 'string'}
            ,{name:'sessionid', type: 'string'}
            ,{name:'sessionid_grid', type: 'string'}
            ,{name:'cachetype', type: 'int'}
            ,{name:'cachetype_grid', type: 'string'}
        ]
    });


 Ext.define('model_syslog',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'syslogid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_resource', type: 'string'}
            ,{name:'verb', type: 'string'}
            ,{name:'loginstanceid', type: 'string'}
            ,{name:'logstructid', type: 'string'}
            ,{name:'thesession', type: 'string'}
            ,{name:'thesession_grid', type: 'string'}
        ]
    });


 Ext.define('model_users',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'usersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'family', type: 'string'}
            ,{name:'login', type: 'string'}
            ,{name:'password', type: 'string'}
            ,{name:'email', type: 'string'}
            ,{name:'phone', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'domainame', type: 'string'}
            ,{name:'localphone', type: 'string'}
            ,{name:'surname', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_users',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'usersid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_users_loaded=false;
    var cmbstore_users = Ext.create('Ext.data.Store', {
        model:'cmbmodel_users',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_users/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_users_loaded =true;}
       }
    });

 Ext.define('model_groups',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'groupsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'adgroup', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_groups',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'groupsid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_groups_loaded=false;
    var cmbstore_groups = Ext.create('Ext.data.Store', {
        model:'cmbmodel_groups',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_groups/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_groups_loaded =true;}
       }
    });

 Ext.define('model_groupuser',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'groupuserid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theuser', type: 'string'}
            ,{name:'theuser_grid', type: 'string'}
        ]
    });


 Ext.define('model_armjournal',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjournalid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thejournal', type: 'string'}
            ,{name:'thejournal_grid', type: 'string'}
        ]
    });


 Ext.define('model_armjrnlrep',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjrnlrepid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'repname', type: 'string'}
            ,{name:'thereport', type: 'string'}
            ,{name:'thereport_grid', type: 'string'}
        ]
    });


 Ext.define('model_armjrnlrun',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjrnlrunid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theextention', type: 'string'}
            ,{name:'theextention_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_armjrnladd',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjrnladdid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theextention', type: 'string'}
            ,{name:'theextention_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_entrypoints',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'entrypointsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'allowprint', type: 'int'}
            ,{name:'allowprint_grid', type: 'string'}
            ,{name:'iconfile', type: 'string'}
            ,{name:'allowfilter', type: 'int'}
            ,{name:'allowfilter_grid', type: 'string'}
            ,{name:'thefilter', type: 'string'}
            ,{name:'thefilter_grid', type: 'string'}
            ,{name:'journalfixedquery', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'report', type: 'string'}
            ,{name:'report_grid', type: 'string'}
            ,{name:'document', type: 'string'}
            ,{name:'document_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'theextention', type: 'string'}
            ,{name:'theextention_grid', type: 'string'}
            ,{name:'arm', type: 'string'}
            ,{name:'arm_grid', type: 'string'}
            ,{name:'objecttype', type: 'string'}
            ,{name:'objecttype_grid', type: 'string'}
            ,{name:'allowadd', type: 'int'}
            ,{name:'allowadd_grid', type: 'string'}
            ,{name:'journal', type: 'string'}
            ,{name:'journal_grid', type: 'string'}
            ,{name:'method', type: 'string'}
            ,{name:'method_grid', type: 'string'}
            ,{name:'allowedit', type: 'int'}
            ,{name:'allowedit_grid', type: 'string'}
            ,{name:'allowdel', type: 'int'}
            ,{name:'allowdel_grid', type: 'string'}
            ,{name:'astoolbaritem', type: 'int'}
            ,{name:'astoolbaritem_grid', type: 'string'}
            ,{name:'actiontype', type: 'int'}
            ,{name:'actiontype_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });


 Ext.define('model_epfilterlink',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'epfilterlinkid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'rowsource', type: 'string'}
            ,{name:'theexpression', type: 'string'}
            ,{name:'filterfield', type: 'string'}
        ]
    });


 Ext.define('model_workplace',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'workplaceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'theversion', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'theplatform', type: 'int'}
            ,{name:'theplatform_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_workplace',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'workplaceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_workplace_loaded=false;
    var cmbstore_workplace = Ext.create('Ext.data.Store', {
        model:'cmbmodel_workplace',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_workplace/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_workplace_loaded =true;}
       }
    });

 Ext.define('model_armtypes',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armtypesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thedocumenttype', type: 'string'}
            ,{name:'thedocumenttype_grid', type: 'string'}
        ]
    });


 Ext.define('model_num_zones',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'num_zonesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'zonemask', type: 'string'}
        ]
    });


 Ext.define('model_num_values',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'num_valuesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_value', type: 'number'}
            ,{name:'ownerrowid', type: 'string'}
            ,{name:'ownerpartname', type: 'string'}
        ]
    });


 Ext.define('model_num_head',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'num_headid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'shema', type: 'int'}
            ,{name:'shema_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_age',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_ageid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_age',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_ageid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_age_loaded=false;
    var cmbstore_vk_age = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_age',
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
            }
        },
       listeners: {
       'load': function(){combo_vk_age_loaded =true;}
       }
    });

 Ext.define('model_vk_platform',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_platformid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_platform',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_platformid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_platform_loaded=false;
    var cmbstore_vk_platform = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_platform',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_platform/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_platform_loaded =true;}
       }
    });

 Ext.define('model_vk_approve',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_approveid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_approve',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_approveid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_approve_loaded=false;
    var cmbstore_vk_approve = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_approve',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_approve/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_approve_loaded =true;}
       }
    });

 Ext.define('model_vk_adstate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adstateid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'iconname', type: 'string'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_adstate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adstateid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_adstate_loaded=false;
    var cmbstore_vk_adstate = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_adstate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adstate/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_adstate_loaded =true;}
       }
    });

 Ext.define('model_vk_browser',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_browserid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_browser',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_browserid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_browser_loaded=false;
    var cmbstore_vk_browser = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_browser',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_browser/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_browser_loaded =true;}
       }
    });

 Ext.define('model_vk_category',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_categoryid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'parent_id', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_category',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_categoryid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_category_loaded=false;
    var cmbstore_vk_category = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_category',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_category/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_category_loaded =true;}
       }
    });

 Ext.define('model_vk_country',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_countryid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_country',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_countryid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_country_loaded=false;
    var cmbstore_vk_country = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_country',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_country/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_country_loaded =true;}
       }
    });

 Ext.define('model_vk_castate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_castateid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_castate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_castateid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_castate_loaded=false;
    var cmbstore_vk_castate = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_castate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_castate/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_castate_loaded =true;}
       }
    });

 Ext.define('model_vk_device',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_deviceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_device',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_deviceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_device_loaded=false;
    var cmbstore_vk_device = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_device',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_device/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_device_loaded =true;}
       }
    });

 Ext.define('model_vk_adformat',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adformatid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_adformat',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adformatid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_adformat_loaded=false;
    var cmbstore_vk_adformat = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_adformat',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adformat/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_adformat_loaded =true;}
       }
    });

 Ext.define('model_vk_interest',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_interestid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_interest',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_interestid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_interest_loaded=false;
    var cmbstore_vk_interest = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_interest',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_interest/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_interest_loaded =true;}
       }
    });

 Ext.define('model_vk_matrialstatus',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_matrialstatusid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_matrialstatus',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_matrialstatusid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_matrialstatus_loaded=false;
    var cmbstore_vk_matrialstatus = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_matrialstatus',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_matrialstatus/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_matrialstatus_loaded =true;}
       }
    });

 Ext.define('model_vk_os',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_osid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_os',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_osid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_os_loaded=false;
    var cmbstore_vk_os = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_os',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_os/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_os_loaded =true;}
       }
    });

 Ext.define('model_vk_position',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_positionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_position',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_positionid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_position_loaded=false;
    var cmbstore_vk_position = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_position',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_position/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_position_loaded =true;}
       }
    });

 Ext.define('model_vk_paytype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_paytypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_paytype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_paytypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_paytype_loaded=false;
    var cmbstore_vk_paytype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_paytype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_paytype/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_paytype_loaded =true;}
       }
    });

 Ext.define('model_vk_religion',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_religionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_religion',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_religionid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_religion_loaded=false;
    var cmbstore_vk_religion = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_religion',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_religion/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_religion_loaded =true;}
       }
    });

 Ext.define('model_vk_region',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_regionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'vkid', type: 'number'}
            ,{name:'country_id', type: 'string'}
            ,{name:'country_id_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_region',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_regionid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_region_loaded=false;
    var cmbstore_vk_region = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_region',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_region/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_region_loaded =true;}
       }
    });

 Ext.define('model_vk_town',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_townid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'country_id', type: 'string'}
            ,{name:'country_id_grid', type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'region_id', type: 'string'}
            ,{name:'region_id_grid', type: 'string'}
            ,{name:'vkid', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_town',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_townid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_town_loaded=false;
    var cmbstore_vk_town = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_town',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_town/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_town_loaded =true;}
       }
    });

 Ext.define('model_vk_tasktype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_tasktypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'repeatabletask', type: 'int'}
            ,{name:'repeatabletask_grid', type: 'string'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_tasktype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_tasktypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_tasktype_loaded=false;
    var cmbstore_vk_tasktype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_tasktype',
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
            }
        },
       listeners: {
       'load': function(){combo_vk_tasktype_loaded =true;}
       }
    });

 Ext.define('model_vk_adsdaydemografy',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adsdaydemografyid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'recordtype', type: 'string'}
            ,{name:'s_day', type: 'string'}
            ,{name:'_value', type: 'string'}
            ,{name:'click_rate', type: 'number'}
            ,{name:'impression_rate', type: 'number'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_vk_adinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'title', type: 'string'}
            ,{name:'cost_type', type: 'string'}
            ,{name:'cost_type_grid', type: 'string'}
            ,{name:'category1_id', type: 'string'}
            ,{name:'category1_id_grid', type: 'string'}
            ,{name:'status', type: 'string'}
            ,{name:'status_grid', type: 'string'}
            ,{name:'ads_id', type: 'string'}
            ,{name:'category2_id', type: 'string'}
            ,{name:'category2_id_grid', type: 'string'}
            ,{name:'link_domain', type: 'string'}
            ,{name:'cpc', type: 'number'}
            ,{name:'link_url', type: 'string'}
            ,{name:'age_restriction', type: 'string'}
            ,{name:'age_restriction_grid', type: 'string'}
            ,{name:'approved', type: 'string'}
            ,{name:'approved_grid', type: 'string'}
            ,{name:'ad_platform', type: 'string'}
            ,{name:'ad_platform_grid', type: 'string'}
            ,{name:'campaign_id', type: 'string'}
            ,{name:'campaign_id_grid', type: 'string'}
            ,{name:'video', type: 'int'}
            ,{name:'video_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'_description', type: 'string'}
            ,{name:'cpm', type: 'number'}
            ,{name:'impression_limit', type: 'int'}
            ,{name:'impression_limit_grid', type: 'string'}
            ,{name:'image_src', type: 'string'}
            ,{name:'ad_format', type: 'string'}
            ,{name:'ad_format_grid', type: 'string'}
            ,{name:'disclamer', type: 'int'}
            ,{name:'disclamer_grid', type: 'string'}
            ,{name:'preview_link', type: 'string'}
            ,{name:'all_limit', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_vk_adinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adinfoid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_adinfo_loaded=false;
    var cmbstore_vk_adinfo = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_adinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_adinfo/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_adinfo_loaded =true;}
       }
    });

 Ext.define('model_vk_adsowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adsownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_adovstat',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adovstatid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'join_rate', type: 'number'}
            ,{name:'spent', type: 'number'}
            ,{name:'clicks', type: 'number'}
            ,{name:'impressions', type: 'number'}
            ,{name:'video_views', type: 'number'}
            ,{name:'video_clicks_site', type: 'number'}
            ,{name:'video_views_half', type: 'number'}
            ,{name:'video_views_full', type: 'number'}
            ,{name:'reach', type: 'number'}
        ]
    });


 Ext.define('model_vk_adstrg',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adstrgid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'groups', type: 'string'}
            ,{name:'birthday', type: 'number'}
            ,{name:'user_devices', type: 'string'}
            ,{name:'user_devices_grid', type: 'string'}
            ,{name:'travellers', type: 'int'}
            ,{name:'travellers_grid', type: 'string'}
            ,{name:'apps', type: 'string'}
            ,{name:'paying', type: 'number'}
            ,{name:'retargeting_groups_not', type: 'string'}
            ,{name:'age_to', type: 'number'}
            ,{name:'apps_not', type: 'string'}
            ,{name:'districts', type: 'string'}
            ,{name:'stations', type: 'string'}
            ,{name:'groups_not', type: 'string'}
            ,{name:'uni_to', type: 'number'}
            ,{name:'statuses', type: 'string'}
            ,{name:'statuses_grid', type: 'string'}
            ,{name:'interest_categories', type: 'string'}
            ,{name:'interest_categories_grid', type: 'string'}
            ,{name:'interests', type: 'string'}
            ,{name:'interests_grid', type: 'string'}
            ,{name:'uni_from', type: 'number'}
            ,{name:'positions', type: 'string'}
            ,{name:'positions_grid', type: 'string'}
            ,{name:'religions', type: 'string'}
            ,{name:'religions_grid', type: 'string'}
            ,{name:'school_to', type: 'number'}
            ,{name:'sex', type: 'int'}
            ,{name:'sex_grid', type: 'string'}
            ,{name:'cities', type: 'string'}
            ,{name:'cities_grid', type: 'string'}
            ,{name:'age_from', type: 'number'}
            ,{name:'country', type: 'string'}
            ,{name:'country_grid', type: 'string'}
            ,{name:'school_from', type: 'number'}
            ,{name:'cities_not', type: 'string'}
            ,{name:'cities_not_grid', type: 'string'}
            ,{name:'retargeting_groups', type: 'string'}
            ,{name:'streets', type: 'string'}
            ,{name:'user_browsers', type: 'string'}
            ,{name:'user_browsers_grid', type: 'string'}
            ,{name:'user_os', type: 'string'}
            ,{name:'user_os_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_adsovdemografy',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adsovdemografyid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'click_rate', type: 'number'}
            ,{name:'recordtype', type: 'string'}
            ,{name:'impression_rate', type: 'number'}
            ,{name:'_value', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_vk_adsutm',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adsutmid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'utm_campaign', type: 'string'}
            ,{name:'utm_content', type: 'string'}
            ,{name:'utm_source', type: 'string'}
            ,{name:'utm_term', type: 'string'}
            ,{name:'autoutm', type: 'int'}
            ,{name:'autoutm_grid', type: 'string'}
            ,{name:'utm_medium', type: 'string'}
        ]
    });


 Ext.define('model_vk_adstat',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_adstatid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'join_rate', type: 'number'}
            ,{name:'overal', type: 'number'}
            ,{name:'s_day', type: 'string'}
            ,{name:'spent', type: 'number'}
            ,{name:'video_views', type: 'number'}
            ,{name:'impressions', type: 'number'}
            ,{name:'video_views_full', type: 'number'}
            ,{name:'reach', type: 'number'}
            ,{name:'s_month', type: 'string'}
            ,{name:'video_views_half', type: 'number'}
            ,{name:'period', type: 'string'}
            ,{name:'clicks', type: 'number'}
            ,{name:'video_clicks_site', type: 'number'}
        ]
    });


 Ext.define('model_vk_brkinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_brkinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'crdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'rotation', type: 'string'}
            ,{name:'rotation_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'ads', type: 'string'}
            ,{name:'ads_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_brkowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_brkownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_camovstat',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_camovstatid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'impressions', type: 'number'}
            ,{name:'reach', type: 'number'}
            ,{name:'video_clicks_site', type: 'number'}
            ,{name:'spent', type: 'number'}
            ,{name:'video_views_full', type: 'number'}
            ,{name:'video_views', type: 'number'}
            ,{name:'clicks', type: 'number'}
            ,{name:'video_views_half', type: 'number'}
            ,{name:'join_rate', type: 'number'}
        ]
    });


 Ext.define('model_vk_camowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_camownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_camp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_campid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vk_usr', type: 'string'}
            ,{name:'vk_usr_grid', type: 'string'}
            ,{name:'vk_cab', type: 'string'}
            ,{name:'vk_cab_grid', type: 'string'}
            ,{name:'day_limit', type: 'number'}
            ,{name:'all_limit', type: 'number'}
            ,{name:'prj', type: 'string'}
            ,{name:'prj_grid', type: 'string'}
            ,{name:'campagin_id', type: 'string'}
            ,{name:'start_time', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'status', type: 'string'}
            ,{name:'status_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'stop_time', type: 'date',dateFormat:'Y-m-d H:i:s'}
        ]
    });

 Ext.define('cmbmodel_vk_camp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_campid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_camp_loaded=false;
    var cmbstore_vk_camp = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_camp',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_camp/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_camp_loaded =true;}
       }
    });

 Ext.define('model_vk_camstat',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_camstatid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'video_views_full', type: 'number'}
            ,{name:'reach', type: 'number'}
            ,{name:'spent', type: 'number'}
            ,{name:'impressions', type: 'number'}
            ,{name:'period', type: 'string'}
            ,{name:'s_month', type: 'string'}
            ,{name:'join_rate', type: 'number'}
            ,{name:'s_day', type: 'string'}
            ,{name:'video_clicks_site', type: 'number'}
            ,{name:'overal', type: 'number'}
            ,{name:'video_views_half', type: 'number'}
            ,{name:'clicks', type: 'number'}
            ,{name:'video_views', type: 'number'}
        ]
    });


 Ext.define('model_vk_prj',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_prjid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'title', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_prj',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_prjid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_prj_loaded=false;
    var cmbstore_vk_prj = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_prj',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_prj/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_prj_loaded =true;}
       }
    });

 Ext.define('model_vk_prjowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_prjownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_rotinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_rotinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'status', type: 'string'}
            ,{name:'status_grid', type: 'string'}
            ,{name:'campaign_id', type: 'string'}
            ,{name:'campaign_id_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'_description', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_rotinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_rotinfoid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_rotinfo_loaded=false;
    var cmbstore_vk_rotinfo = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_rotinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_rotinfo/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_rotinfo_loaded =true;}
       }
    });

 Ext.define('model_vk_rotads',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_rotadsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'ads', type: 'string'}
            ,{name:'ads_grid', type: 'string'}
            ,{name:'adweight', type: 'number'}
        ]
    });


 Ext.define('model_vk_rotowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_rotownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_trgfiles',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_trgfilesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thefile', type: 'string'}
            ,{name:'thefile_ext', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'listtext', type: 'string'}
        ]
    });


 Ext.define('model_vk_trginfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_trginfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'trgdomain', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'audience_count', type: 'number'}
            ,{name:'cab', type: 'string'}
            ,{name:'cab_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'pixel', type: 'string'}
            ,{name:'vkid', type: 'string'}
            ,{name:'lifetime', type: 'number'}
        ]
    });


 Ext.define('model_vk_trgowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_trgownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_taskowner',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_taskownerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'vkusr', type: 'string'}
            ,{name:'vkusr_grid', type: 'string'}
        ]
    });


 Ext.define('model_vk_taskinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_taskinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'camp', type: 'string'}
            ,{name:'camp_grid', type: 'string'}
            ,{name:'lastdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'tasktype', type: 'string'}
            ,{name:'tasktype_grid', type: 'string'}
            ,{name:'isdone', type: 'int'}
            ,{name:'isdone_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'crdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'ads', type: 'string'}
            ,{name:'ads_grid', type: 'string'}
            ,{name:'cab', type: 'string'}
            ,{name:'cab_grid', type: 'string'}
            ,{name:'rotation', type: 'string'}
            ,{name:'rotation_grid', type: 'string'}
            ,{name:'repeat_interval', type: 'number'}
            ,{name:'result', type: 'string'}
        ]
    });


 Ext.define('model_vk_taskmsg',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_taskmsgid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'okmsg', type: 'int'}
            ,{name:'okmsg_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'msgdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
        ]
    });


 Ext.define('model_vk_cab',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_cabid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'access_role', type: 'string'}
            ,{name:'account_status', type: 'int'}
            ,{name:'account_status_grid', type: 'string'}
            ,{name:'account_id', type: 'string'}
            ,{name:'account_type', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_cab',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_cabid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_cab_loaded=false;
    var cmbstore_vk_cab = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_cab',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_cab/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_cab_loaded =true;}
       }
    });

 Ext.define('model_vk_usr',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_usrid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'sex', type: 'int'}
            ,{name:'sex_grid', type: 'string'}
            ,{name:'photo_50', type: 'string'}
            ,{name:'photo_id', type: 'string'}
            ,{name:'online', type: 'int'}
            ,{name:'online_grid', type: 'string'}
            ,{name:'photo_100', type: 'string'}
            ,{name:'country', type: 'string'}
            ,{name:'country_grid', type: 'string'}
            ,{name:'has_photo', type: 'int'}
            ,{name:'has_photo_grid', type: 'string'}
            ,{name:'home_town', type: 'string'}
            ,{name:'home_town_grid', type: 'string'}
            ,{name:'vkid', type: 'string'}
            ,{name:'bdate', type: 'string'}
            ,{name:'last_name', type: 'string'}
            ,{name:'deactivated', type: 'int'}
            ,{name:'deactivated_grid', type: 'string'}
            ,{name:'status', type: 'string'}
            ,{name:'first_name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_vk_usr',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'vk_usrid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_vk_usr_loaded=false;
    var cmbstore_vk_usr = Ext.create('Ext.data.Store', {
        model:'cmbmodel_vk_usr',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_vk_usr/getRows',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_vk_usr_loaded =true;}
       }
    });
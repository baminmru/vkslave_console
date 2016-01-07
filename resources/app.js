
Ext.Loader.setConfig({
  enabled: true
 });
 //Ext.Loader.setPath('Ext.ux', rootURL+'/e6/packages/ux');

 
 Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.tab.*',
	'Ext.button.*',
	'Ext.form.*',
	'Ext.state.*',
	'Ext.layout.*',
	'Ext.Action',
	'Ext.resizer.Splitter',
	'Ext.fx.target.Element',
	'Ext.fx.target.Component',
	'Ext.window.Window',
	'Ext.selection.CellModel',
	'Ext.toolbar.Paging'
	//,
	/*'Ext.ux.statusbar.StatusBar',
	'Ext.ModelManager',
	'Ext.tip.QuickTipManager',
	'Ext.ux.statusbar.StatusBar',
	'Ext.ux.CheckColumn', 
	'Ext.ux.grid.FiltersFeature',
	'Ext.ux.PreviewPlugin' */
 ]);
 
 Ext.Loader.setConfig({enabled: true});





var menuPanel;
var leftPanel;
var contentPanel;
var stateFulSystem=false;


Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();
    
    // setup the state provider, all state information will be saved to a cookie

	try{
		Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
		stateFulSystem=true;
	}catch( ex ){
		//alert(ex);
		stateFulSystem=false;

	}

	
    // UserLogin();
	MyInit();
	SysLogin();
	EnableActions();
});


function EnableActions(){

	/*app_actions.each(function(record,idx){
	
	 var name=record.get('menucode'); 
	 var enableMenu = record.get('accesible'); 
	 var comp=null;
	 //console.log('code->'+name);
	 if(enableMenu==-1){
		comp=null;
		//startMenu.items[0].menu.down("#"+name)
		comp=menuPanel.down("#"+name);
		//console.log('comp->'+comp);
		if (comp!=null){
			comp.hidden=false;
			comp.disabled=false;
		    // var comp1=null
			// comp1=comp.up();
			//if(comp1!=null)
			//	if(comp1.hidden)
			//		comp1.show(); 
		}
	 }else{
		comp=null;
		comp=menuPanel.down("#"+name);
		//console.log('comp->'+comp);
		if (comp!=null){
			comp.disabled=true;
			comp.hidden=true;
			
		}
		
	 }
	 
	}
	
	
	
	); */
	//menuPanel.doLayout();
	

	//PrepareRoles();
	
	
};


function SysLogin(){
	
	Ext.Ajax.request(
			{
				url: rootURL+'index.php/app/login',
				method:  'POST',
				params: 
				{ 
					loginUsername: vkID,
					loginPassword: vkID,
				},
				success: function(response){
					

				}
			}
		);
	
};


function MakeExit(btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/app/logout',
					method:  'POST',
					success: function(response){
						document.location=document.location;
						
					}
				}
			);
		//document.location=document.location;
	}
};
var actionEXIT = Ext.create('Ext.Action', {
	itemId:'actionEXIT',
	text: 'Выход',
	iconCls: 'icon-door',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Выход из приложения?',
			'Завершить работу с приложением?',
			 MakeExit);
		
	}
});

var actionChangePassword = Ext.create('Ext.Action', {
	itemId:'actionChangePassword',
	text: 'Сменить пароль',
	iconCls: 'icon-building_key',
	disabled:false,
	handler: function() {
			var edit = Ext.create('EditWindow_sp_password');
			edit.show();
		}
});


//actionLoadCategory,actionLoadCountry,actionLoadRegions,actionLoadTowns

function LoadCategory (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadcategory',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка категорий завершена");
					}
				}
			);
	}
};




function LoadCountry (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadcountry',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка списка стран завершена");
					}
				}
			);
	}
};


function LoadRegions (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadregions',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка списка регионов завершена");
					}
				}
			);
	}
};


function LoadTowns (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadtowns',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка списка городов завершена");
					}
				}
			);
	}
};

function LoadUser (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/refreshuser',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка данных пользователя завершена");
					}
				}
			);
	}
};

function LoadAds (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadads',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка объявлений завершена");
					}
				}
			);
	}
};


function LoadAdsStat (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadadsstat',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка статистики объявлений завершена");
					}
				}
			);
	}
};

function LoadAdsDemografy (btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/vk/loadadsdemografy',
					method:  'POST',
					success: function(response){
						
						StatusReady("Загрузка демографии объявлений завершена");
					}
				}
			);
	}
};


var actionLoadAdsDemografy = Ext.create('Ext.Action', {
	itemId:'actionLoadAdsOvStat',
	text: 'Обновить демографическую статистику',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Статистика объявлений',
			'Загрузить демографическую статистику объявлений ив ВК?',
			 LoadAdsDemografy );
	}
});



var actionLoadAdsStat = Ext.create('Ext.Action', {
	itemId:'actionLoadAdsStat',
	text: 'Обновить статистику объявлений',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Статистика объявлений',
			'Загрузить статистику объявлений ив ВК?',
			 LoadAdsStat );
	}
});

var actionLoadAds = Ext.create('Ext.Action', {
	itemId:'actionLoadAds',
	text: 'Обновить объявления',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Объявления',
			'Обновить объявления ив ВК?',
			 LoadAds );
	}
});

var actionLoadUser = Ext.create('Ext.Action', {
	itemId:'actionLoadUser',
	text: 'Загрузить данные пользователя',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Пользователь ВК',
			'Загрузить данные ив ВК?',
			 LoadUser );
		
	}
});

var actionLoadTowns = Ext.create('Ext.Action', {
	itemId:'actionLoadTowns',
	text: 'Загрузить список городов',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Список городов',
			'Загрузить данные ив ВК?',
			 LoadTowns );
		
	}
});

var actionLoadRegions = Ext.create('Ext.Action', {
	itemId:'actionLoadRegions',
	text: 'Загрузить список регионов',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Список регионов',
			'Загрузить данные ив ВК?',
			 LoadRegions);
		
	}
});


var actionLoadCountry = Ext.create('Ext.Action', {
	itemId:'actionLoadCountry',
	text: 'Загрузить список стран',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Список стран',
			'Загрузить данные ив ВК?',
			 LoadCountry);
		
	}
});


var actionLoadCategory = Ext.create('Ext.Action', {
	itemId:'actionLoadCategory',
	text: 'Загрузить категории',
	iconCls: 'icon-database',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Данные по категориям?',
			'Загрузить данные ив ВК?',
			 LoadCategory);
		
	}
});



var actionToDo = Ext.create('Ext.Action', {
	itemId:'actionToDo',
	text: 'В разработке',
	iconCls: 'icon-todo',
	disabled:false,
	handler: function(){
		 Ext.MessageBox.alert('В разработке', 'Функционал в разработке');
		
	}
});


function MyInit(){

    /*
    combo_pbar = Ext.create('Ext.ProgressBar', {
        id:'combo_pbar',
        width:300,
        renderTo:'loading'
    });

    var app_info_loaded=false;
	app_info = Ext.create('Ext.data.Store', {
        model:'application_info',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/app/getSessionInfo',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){
		app_info_loaded =true;
		combo_StoreLoaded=true; 
		var comp=menuPanel.down("#sessionInfo"); 
	    comp.setValue('Пользователь: '+app_info.getAt(0).get("info") + '. (' + app_info.getAt(0).get("rolename") +') Л.С.:' + app_info.getAt(0).get("mailcount") );
	   }
       }
    });
	combo_Stores.push(app_info);

	app_modes = Ext.create('Ext.data.Store', {
        model:'application_modes',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/app/getModes',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){ combo_StoreLoaded=true; }
       }
    });
	combo_Stores.push(app_modes);

	app_actions = Ext.create('Ext.data.Store', {
        model:'application_actions',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/app/getActions',
            reader: {
                type:   'json'
                ,rootProperty:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){app_actions_loaded =true;combo_StoreLoaded=true; EnableActions();}
       }
    });
	combo_Stores.push(app_actions);
	
	
	*/
	

    menuPanel = new Ext.panel.Panel({
	    //title:' ',
		// hideHeaders:true,
        xtype:'panel',
        region:'north',
        dockedItems:{
            itemId:'toolbar',
            xtype:'toolbar',
            items:[ 
               /* {
					itemId:'actionFile',
				    text:'Файл',
                    iconCls:'icon-folder',
                    menu:[ actionChangePassword,actionEXIT] 
				
				}
				,*/
				{
					itemId:'actionDict',
				    text:'Справочники',
                    iconCls:'icon-book_open',
                    menu:[actionVDAPL,actionVDAPPR,actionVDAST,actionVDCST ,actionVDFRMT,actionVDPT,actionVDAGE,'-',actionVDCAT,actionVDINTER,actionVDMSTAT,actionVDPOS,actionVDREL,'-',actionVDCN,actionVDRG,actionVDT,'-',actionVDDEV,actionVDBRW,actionVDOS] 
				
				}
				,
				{
					itemId:'actionAds',
				    text:'Реклама',
                    iconCls:'icon-box_picture',
                    menu:[actionVKUSR,actionVKPRJ,actionVKCAM,actionVKADS,actionVKTRG ] 
				
				}
				,
				{
					itemId:'actionRobo',
				    text:'Раб',
                    iconCls:'icon-robot',
                    menu:[actionVDTT,actionVKROT,actionVKBRK,actionVKTSK ] 
				
				}
				
				,
				{
					itemId:'actionReport',
				    text:'Отчеты',
                    iconCls:'icon-script',
                    menu:[actionToDo ] 
				
				},
				{
					itemId:'actionMoney',
				    text:'Управление счетом',
                    iconCls:'icon-money',
                    menu:[actionToDo ] 
				
				}
		
				,'->',
				
				{
					itemId:'actionLoad',
				    text:'Тесты',
                    iconCls:'icon-page_white_lightning',
                    menu:[actionLoadUser,actionLoadAds,actionLoadAdsStat, actionLoadAdsDemografy,actionLoadCategory,actionLoadCountry,actionLoadRegions,actionLoadTowns] 
				
				}
				
				
				/*{
					itemId:'sessionInfo',
					xtype:'displayfield',
					iconCls:'icon-information'//,
					menu:[ actionInfo]
				}
				*/
			
				
            ]
        }
    });
	
	
    contentPanel = new Ext.tab.Panel({
	    //title:' ',
		// hideHeaders:true,
        region:'center',
        xtype:'tabpanel', // TabPanel itself has no title
		splitter:true,
        activeTab:0      // First tab active by default
    });

	/*statusPanel = new Ext.Panel( {
	 region:'south',
     hideHeaders:true,
	 title:' ',
	 //layout:'hbox',
	 border:false,
	 bbar:
		 Ext.create('Ext.ux.StatusBar', {
			id: 'my-status',
			region:'south',
			// defaults to use when the status is cleared:
			defaultText: 'все хорошо',
			//defaultIconCls: 'icon-bullet_green',

			// values to set initially:
			text: 'Готово',
			//iconCls: 'icon-bullet_green',
			width:600

		})
	
	});
	*/
	
	statusPanel =	 Ext.create('Ext.ux.StatusBar', {
			id: 'my-status',
			//    title:' ',
			//	 hideHeaders:true,
			region:'south',
			// defaults to use when the status is cleared:
			defaultText: 'все хорошо',
			//defaultIconCls: 'icon-bullet_green',
			layout:'fit',
			// values to set initially:
			text: 'Готово',
			height:33

		});
	

    var vPort = new Ext.container.Viewport({
            layout:'border',
            renderTo:Ext.getBody(),
            items:[ /*leftPanel,*/ menuPanel, 
                contentPanel,statusPanel]
        }
    );

	//combo_LoadNext();
	
	//setInterval(function() { app_info.load() }, 60000);
	
}



var defaultMenuDisabled=false;
var defaultMenuHidden=false;
//////////////////////////////////////////////////////
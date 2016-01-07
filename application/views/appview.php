<?php	
		header("Cache-control: public");
	header("Cache-control: max-age=86400");
	session_start();
	log_message('debug', 'appview: B2SESSION >'.$_SESSION['B2SESSION'].'<' );
				 
	if (!isset($_SESSION['B2SESSION']) || $_SESSION['B2SESSION']=='') 
	{
?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>ИНТЕРНЕТУРОК</title>
	<link href="resources/icons/soop.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="resources/css/CheckHeader.css" />
   <link rel="stylesheet" type="text/css" href="resources/css/ext-overrides.css"/> 

	<script>
		var rootURL= "";
	</script>
	
	<script src="resources/gantt/dhtmlxgantt.js" type="text/javascript" charset="utf-8"></script>
	<script src="resources/gantt/dhtmlxgantt_tooltip.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="resources/gantt/dhtmlxgantt_skyblue.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <script src="resources/gantt/locale/locale_ru.js" charset="utf-8"></script>
	<link rel="stylesheet" href="resources/gantt/mygantt.css" type="text/css" media="screen" title="no title" charset="utf-8">
	
 
    <link rel="stylesheet" type="text/css" href="resources/css/icons.css"/>
    <!-- <link rel="stylesheet" type="text/css" href="resources/css/ext-overrides.css"/> -->

    <script type="text/javascript" src="ext-all.js"></script>
	<!-- <script type="text/javascript" src="ext-neptune-debug.js"></script> -->
	<!-- <script type="text/javascript" src="bootstrap.js"></script> -->
	<script type="text/javascript" src="/ux/InputTextMask.js"></script>
    
	 <script type="text/javascript" src="resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="resources/exporter/Workbook.js"></script>
	 
	 
	 <script type="text/javascript" src="locale/ext-lang-ru.js"></script>
	 <script type="text/javascript" src="resources/myfileuploader.js"></script>
	 <script type="text/javascript" src="resources/common.js"></script>
	 <script type="text/javascript" src="resources/reporter.js"></script>
	 <script type="text/javascript" src="resources/reporter2.js"></script>
	 <script type="text/javascript" src="resources/reporter3.js"></script>
	 <script type="text/javascript" src="resources/reporter4.js"></script>
	 <script type="text/javascript" src="resources/reporter5.js"></script>
	 <script type="text/javascript" src="resources/reporter6.js"></script>
	 <script type="text/javascript" src="resources/reporter7.js"></script>
	 <script type="text/javascript" src="resources/s_v_allcomments.js"></script>
	 <script type="text/javascript" src="resources/j_v_allcomments.js"></script>
	 <script type="text/javascript" src="resources/app.js"></script>
	 
	
   
    <script type="text/javascript">
        var combo_pbar = null;
        var combo_timeout_id = null;
        var combo_StoreLoading = false;
        var combo_Waiter = 0;
        var combo_Index = -1;
        var combo_Stores = new Array();
    </script>
    <!-- Model and stores JavaScript -->
    <script type="text/javascript" src="resources/models.js"></script>
    <script type="text/javascript" src="resources/enums.js"></script>
	<script type="text/javascript" src="resources/mystores.js"></script>

   <?php require('inc.php'); ?>

    <!-- Application JavaScript -->
	

	<script type="text/javascript" src="resources/rolelist.js"></script>
	<script type="text/javascript" src="resources/login.js"></script>
	<script type="text/javascript" src="resources/menu.js"></script>
	 <script type="text/javascript" src="resources/trash.js"></script>
	
	<script type="text/javascript" src="resources/s_v_autoiu_urok_def_cur.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_urok_def_cur.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_task_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_urok_def_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_u_def_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_tmdef_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_urok_def_arch.js"></script>
	
</head>
<body>
<div id="loading-mask"></div>
<div id="loading"><span id="loading-message"></span></div>
</body>
</html>


<?php
		//exit();
	}	else{
?>
<html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>ИНТЕРНЕТУРОК</title>
	<link href="resources/icons/soop.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="resources/css/ext-all.css"/>
   <link rel="stylesheet" type="text/css" href="resources/css/ext-overrides.css"/> 

	<link rel="stylesheet" type="text/css" href="resources/css/CheckHeader.css" />
	<script>
		var rootURL= "";
	</script>
	
	<script src="resources/gantt/dhtmlxgantt.js" type="text/javascript" charset="utf-8"></script>
    <script src="resources/gantt/dhtmlxgantt_tooltip.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="resources/gantt/dhtmlxgantt_skyblue.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <script src="resources/gantt/locale/locale_ru.js" charset="utf-8"></script>
	<link rel="stylesheet" href="resources/gantt/mygantt.css" type="text/css" media="screen" title="no title" charset="utf-8">
 
    <link rel="stylesheet" type="text/css" href="resources/css/icons.css"/>
    <!-- <link rel="stylesheet" type="text/css" href="resources/css/ext-overrides.css"/> -->

    <script type="text/javascript" src="ext-all.js"></script>
	<!-- <script type="text/javascript" src="ext-neptune-debug.js"></script> -->
	<!-- <script type="text/javascript" src="bootstrap.js"></script> -->
	<script type="text/javascript" src="/ux/InputTextMask.js"></script>
    
	 <script type="text/javascript" src="resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="resources/exporter/Workbook.js"></script>
	 
	 
	 <script type="text/javascript" src="locale/ext-lang-ru.js"></script>
     <script type="text/javascript" src="resources/myfileuploader.js"></script>
	 <script type="text/javascript" src="resources/common.js"></script>
	 <script type="text/javascript" src="resources/reporter.js"></script>
	 <script type="text/javascript" src="resources/reporter2.js"></script>
	 <script type="text/javascript" src="resources/reporter3.js"></script>
	 <script type="text/javascript" src="resources/reporter4.js"></script>
	 <script type="text/javascript" src="resources/reporter5.js"></script>
	 <script type="text/javascript" src="resources/reporter6.js"></script>
	 <script type="text/javascript" src="resources/reporter7.js"></script>
	 
	 <script type="text/javascript" src="resources/s_v_allcomments.js"></script>
	 <script type="text/javascript" src="resources/j_v_allcomments.js"></script>
	<script type="text/javascript" src="resources/app.js"></script>

   
    <script type="text/javascript">
        var combo_pbar = null;
        var combo_timeout_id = null;
        var combo_StoreLoading = false;
        var combo_Waiter = 0;
        var combo_Index = -1;
        var combo_Stores = new Array();
    </script>
    <!-- Model and stores JavaScript -->
    <script type="text/javascript" src="resources/models.js"></script>
    <script type="text/javascript" src="resources/enums.js"></script>
	<script type="text/javascript" src="resources/mystores.js"></script>

   <?php require('inc.php'); ?>

    <!-- Application JavaScript -->

	<script type="text/javascript" src="resources/logged.js"></script>
	<script type="text/javascript" src="resources/menu.js"></script>
	<script type="text/javascript" src="resources/trash.js"></script>
	<script type="text/javascript" src="resources/s_v_autoiu_urok_def_cur.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_urok_def_cur.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_task_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_urok_def_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_u_def_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_tmdef_trash.js"></script>
	<script type="text/javascript" src="resources/j_v_autoiu_urok_def_arch.js"></script>
</head>
<body>
<div id="loading-mask"></div>
<div id="loading"><span id="loading-message"></span></div>
</body>
</html>
<?php
		
	}	
?>
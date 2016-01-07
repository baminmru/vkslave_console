<?php

require_once dirname(__FILE__) . DIRECTORY_SEPARATOR .  'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'VkPhpSdk.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR .  'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'Oauth2Proxy.php';

// Init OAuth 2.0 proxy
$oauth2Proxy = new Oauth2Proxy(
    '5160460', // client id
    'nb1sdtbD2Px3IFHBn0XI', // client secret
    'https://oauth.vk.com/access_token', // access token url
    'https://oauth.vk.com/authorize', // dialog uri
    'code', // response type
    'http://vas.baminote2.local', // redirect url   
	'offline,notify,friends,photos,audio,video,ads' // scope
);

// Try to authorize client
if($oauth2Proxy->authorize() === true)
{
	// Init vk.com SDK
	$vkPhpSdk = new VkPhpSdk();
	$vkPhpSdk->setAccessToken($oauth2Proxy->getAccessToken());
	$vkPhpSdk->setUserId($oauth2Proxy->getUserId());

	// API call - get profile
	//$result = $vkPhpSdk->api('getProfiles', array(
	//	'uids' => $vkPhpSdk->getUserId(),
	//	'fields' => 'uid,first_name,last_name,photo_id,sex,bdate,city,country,home_town,has_photo',
	//));
	//session_start();
	$_SESSION['VKAT'] = $oauth2Proxy->getAccessToken(); // store token in session
	$_SESSION['VKID'] = $vkPhpSdk->getUserId();		   // store user id in session
	header("Cache-control: public");
	header("Cache-control: max-age=86400");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="description" content="" />
    <title>Рекламный РАБ...</title>
	<script type="text/javascript" src="/e6/ext-all-debug.js"></script> 
	
	 <script type="text/javascript" src="resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="resources/exporter/Workbook.js"></script>

	
    <link rel="stylesheet" type="text/css" href="/e6/classic/theme-triton/resources/theme-triton-all.css">
    <script type="text/javascript" src="/e6/classic/theme-triton/theme-triton-debug.js"></script> 
	
    <!-- <link rel="stylesheet" type="text/css" href="/e6/classic/theme-neptune/resources/theme-neptune-all.css">
    <script type="text/javascript" src="/e6/classic/theme-neptune/theme-neptune-debug.js"></script>  -->
	
	<!-- <link rel="stylesheet" type="text/css" href="/e6/classic/theme-aria/resources/theme-aria-all.css">
    <script type="text/javascript" src="/e6/classic/theme-aria/theme-aria-debug.js"></script>  -->
	
	<!-- <link rel="stylesheet" type="text/css" href="/e6/classic/theme-crisp/resources/theme-crisp-all.css">
    <script type="text/javascript" src="/e6/classic/theme-crisp/theme-crisp-debug.js"></script>  -->
	
		
	<!-- <link rel="stylesheet" type="text/css" href="/e6/classic/theme-gray/resources/theme-gray-all.css">
    <script type="text/javascript" src="/e6/classic/theme-gray/theme-gray-debug.js"></script>  -->
	
	
	<!-- <link rel="stylesheet" type="text/css" href="/e6/classic/theme-classic/resources/theme-classic-all.css">
    <script type="text/javascript" src="/e6/classic/theme-classic/theme-classic-debug.js"></script>  -->


	<script type="text/javascript" src="/e6/packages/ux/classic/ux-debug.js"></script>
	<script type="text/javascript" src="/e6/locale/locale-ru-debug.js"></script>
		
       
       <script type ="text/javascript" > var rootURL="" ; var vkID="<?php echo $_SESSION['VKID']; ?>"; </script>
	   
	   
	   
	   <script type ="text/javascript" >
		function AfterLoad(){}
		</script>
	 <style>
		body, html {
			height: 100%;
		}
  </style>
</head>
<body>
<link rel="stylesheet" type="text/css" href="resources/css/icons.css"/>
<script type="text/javascript" src="resources/common.js"></script>
<script type="text/javascript" src="resources/app.js"></script>
<script type="text/javascript" src="resources/models.js"></script>
<script type="text/javascript" src="resources/enums.js"></script>
	<?php require('inc.php'); ?>
<script type="text/javascript" src="resources/menu.js"></script>
<div id="loading-mask"></div>
<div id="loading"><span id="loading-message"></span></div>
</body>
</html>
<?php
}
else
	echo 'Error occurred';

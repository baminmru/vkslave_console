<?php
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'VkPhpSdk.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'Oauth2Proxy.php';

// Init OAuth 2.0 proxy
$oauth2Proxy = new Oauth2Proxy(
    '5160460', // client id
    'nb1sdtbD2Px3IFHBn0XI', // client secret
    'https://oauth.vk.com/access_token', // access token url
    'https://oauth.vk.com/authorize', // dialog uri
    'code', // response type
    'http://localhost/vas/', // redirect url   'https://oauth.vk.com/blank.html'
	'offline,notify,friends,photos,audio,video,wall,ads' // scope
);

// Try to authorize client
if($oauth2Proxy->authorize() === true)
{
	// Init vk.com SDK
	$vkPhpSdk = new VkPhpSdk();
	$vkPhpSdk->setAccessToken($oauth2Proxy->getAccessToken());
	$vkPhpSdk->setUserId($oauth2Proxy->getUserId());

	// API call - get profile
	$result = $vkPhpSdk->api('getProfiles', array(
		'uids' => $vkPhpSdk->getUserId(),
		'fields' => 'uid,first_name,last_name,photo_id,sex,bdate,city,country,home_town,has_photo',
	));
	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" lang="ru">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="description" content="" />
    <title>Рекламный РАБ...</title>
	<link rel="stylesheet" type="text/css" media="screen" href="/vas/libs/font-awesome/font-awesome.css" /> 
    <link rel="stylesheet" type="text/css" href="packages/ext-theme-crisp-touch/build/resources/ext-theme-crisp-touch-all.css">
   <link rel="stylesheet" type="text/css" href="css/icons.css">
   <script type="text/javascript" src="ext-all.js"></script> 
   <script type="text/javascript" src="packages/ext-theme-crisp-touch/build/ext-theme-crisp-touch.js"></script>
   <script type="text/javascript" src="packages/sencha-charts/build/sencha-charts.js"></script>
	 <style>
		body, html {
			height: 100%;
		}
  </style>
</head>
<body>
<div id="main" style="width: 100%; height:98%;"></div>
<script type="text/javascript">
var rootpath="http://localhost/vas/";
</script>
<script type="text/javascript" src="app.js"></script>


<script type="text/javascript">


</script>
</body>
</html>
<?php
}
else
	echo 'Error occurred';

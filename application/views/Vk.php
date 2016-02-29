<?php
	require_once dirname(__FILE__) . DIRECTORY_SEPARATOR .  'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'VkPhpSdk.php';
	require_once dirname(__FILE__) . DIRECTORY_SEPARATOR .  'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'Oauth2Proxy.php';
	

function getPage( $VKID )	{
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
				
			   
			   <script type ="text/javascript" > var rootURL="" ; var vkID="<?php echo $VKID; ?>"; </script>
			   
			   
			   
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

		$db=null;
		$vkid=null;
		$vkat=null;
		$ok=false;

		if(isset($_COOKIE["lastvkid"])){
		
				$cfg=$this->jservice->dbConfig();
		
				$db = @new mysqli($cfg['server'], $cfg['username'], $cfg['password'], $cfg['database']);

				if ( $db->connect_errno) {
					die('Ошибка соединения: ' .  $db->connect_errno);
				}
				$db->set_charset("utf8");
				
				
				
				$vkat=null;
				$vkid=$_COOKIE["lastvkid"];
		
				$result = array();
				$res = $db->query("select * from slavemeal where vkid='".$vkid."'  limit 1 ");
						
				while ($row = $res->fetch_assoc()){
					$result[] = $row;
				}
				$res->close();
				
				if(count($result) >0){
					if( "".$result[0]['vkat']!=""){
						$vkat=$result[0]['vkat'];
						$ok = true;		
					}else{
						goto relogon;
					}
				}else{
					goto relogon;
				}
					
					
				 
		}else{
relogon:
			// Init OAuth 2.0 proxy
			$oauth2Proxy = new Oauth2Proxy(
				'5302646', // client id
				'LUJf4wzPiglsF5uW8xNe', // client secret
				'https://oauth.vk.com/access_token', // access token url
				'https://oauth.vk.com/authorize', // dialog uri
				'code', // response type
				'http://vas.baminote2.local', // redirect url   
				'offline,notify,friends,photos,video,wall,ads' // scope
				
			);
		
			if($oauth2Proxy->authorize()===true){
				$vkat=$oauth2Proxy->getAccessToken();
				$vkid=$oauth2Proxy->getUserId();
				$ok=true;
			}else{
				echo 'Autorization error';
			};
				
		}

		// Try to authorize client
		if($ok === true)
		{
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($vkat);
			$vkPhpSdk->setUserId($vkid);

			$_SESSION['VKAT'] =$vkat; // store token in session
			$_SESSION['VKID'] = $vkid;		   // store user id in session
			
			setcookie("lastvkid", $_SESSION['VKID'], time()+60*60*24*7, "/", "vas.baminote2.local", false, true);
			
			$res = $this->jservice->get(array('Action' => 'Login', 'Email' => $_SESSION['VKID'], 'PasswordHash' => $_SESSION['VKID'], 'ApplicationID' => ''));
			if (strlen($res) == 38) {
				$_SESSION['B2SESSION'] = $res;
			
				$this->jservice->get(array('Action' => 'StoreToken','VKID'=>$_SESSION['VKID'] ,'VKAT'=>$_SESSION['VKAT'])); // store in database for robot actions
				
				header("Cache-control: public");
				header("Cache-control: max-age=86400");
				getPage($_SESSION['VKID']);
			}else
				echo 'Login error';
		}
		else
		{
			echo 'Error occurred';
		}


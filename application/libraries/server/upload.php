<?php                                                                                               
error_reporting(E_ALL);
$uploaddir="./uploaddir";

$config = array();
//$config['storage'] = "C:/bami/Projects/iUROK/WEB/console/files"; 
//$config['logpath']="C:/bami/Projects/iUROK/WEB/console/application/logs";
$config['storage'] = "/var/www/files"; 
$config['logpath']="/var/www/application/logs";
$config['log']=true;


$prefix = isset($_REQUEST['prefix']) ? $_REQUEST['prefix'] : 'iu';

$finaldir	=$config['storage'] . DIRECTORY_SEPARATOR .  $prefix.'_files'. DIRECTORY_SEPARATOR	;
		

function logWrite($msg)
{
	global $config;
	
	if($config['log'])
	{
		date_default_timezone_set('Europe/Moscow');
		
		$date = date('Y-m-d H:i:s');
	
		file_put_contents($config['logpath'].'/_debug.txt', $date.'  '.$msg."\r\n", FILE_APPEND);
	}
	//echo($msg);
}


$hash=$_SERVER["HTTP_UPLOAD_ID"];
//$hash= isset($_REQUEST['ID']) ? $_REQUEST['ID'] : '';

//openlog("html5upload.php", LOG_PID | LOG_PERROR, LOG_LOCAL0);

if ( true) { //preg_match("/^[\{0123456789abcdef\}-]{32}$/i",$hash)) {

	if ($_SERVER["REQUEST_METHOD"]=="GET") {
		if ($_GET["action"]=="abort") {
			if (is_file($uploaddir."/".$hash.".html5upload")) unlink($uploaddir."/".$hash.".html5upload");
			print "ok abort";
			return;
			}

		if ($_GET["action"]=="done") {
			$ext = pathinfo($_GET['originalname'], PATHINFO_EXTENSION);
			logWrite( "Finished for hash ".$finaldir.$hash.".".$ext);

			if (is_file($finaldir.$hash.".".$ext))
				unlink($finaldir.$hash.".".$ext);
			rename($uploaddir."/".$hash.".html5upload",$finaldir.$hash.".".$ext);
		}
	}
	elseif ($_SERVER["REQUEST_METHOD"]=="POST") {

		logWrite(  "Uploading chunk. Hash ".$hash." (".intval($_SERVER["HTTP_PORTION_FROM"])."-".intval($_SERVER["HTTP_PORTION_FROM"]+$_SERVER["HTTP_PORTION_SIZE"]).", size: ".intval($_SERVER["HTTP_PORTION_SIZE"]).")");

		$filename=$uploaddir."/".$hash.".html5upload";

		if (intval($_SERVER["HTTP_PORTION_FROM"])==0) 
			$fout=fopen($filename,"wb");
		else
			$fout=fopen($filename,"ab");

		if (!$fout) {
			logWrite( "Can't open file for writing: ".$filename);
			header("HTTP/1.0 500 Internal Server Error");
			print "Can't open file for writing.";
			return;
			}

		$fin = fopen("php://input", "rb");
		if ($fin) {
			while (!feof($fin)) {
				$data=fread($fin, 1024*1024);
				fwrite($fout,$data);
				}
			fclose($fin);
			}

		fclose($fout);
		}

	header("HTTP/1.0 200 OK");
	print "ok\n";
	}
else {
	logWrite(  "Uploading chunk. Wrong hash ".$hash);
	header("HTTP/1.0 500 Internal Server Error");
	print "Wrong session hash.";
	}

closelog();

?>
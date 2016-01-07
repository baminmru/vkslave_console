<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

include_once(dirname(__FILE__)  . '/' .'iu_config.php');

include_once(dirname(__FILE__)  . '/' .'B2service.php');


class JService
{
	function temp_file_path(){
		global $dconfig;
		return $dconfig['temppath'];
	}

 function get($data)
    {
		global $dconfig;
		
        $CI =& get_instance();
	//	session_start();
		$data = array_merge($data, array('SessionID'=>$_SESSION['B2SESSION']));
	
		
		$app = new B2service($dconfig, $data);
		
		if ($app->action!="AddFile" && $app->action!="AddPhotoFile"){
			log_message('debug', 'Jservice.Get : '.json_encode($data));
		}else{
			log_message('debug', 'Jservice.Get : '.$app->action);
		}
		try {
			$res = call_user_func(array($app, $app->action));
			log_message('debug', 'Jservice.Result : '.json_encode($res));
			return json_decode(json_encode($res));
		} catch( Exception $e ) {
		   log_message('debug', 'Jservice.Error : '.$e->getMessage());
		   echo json_encode(array('error' => $e->getMessage()));
		}

	}
}



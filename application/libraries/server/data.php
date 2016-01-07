<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
include_once(dirname(__FILE__)  . '/' . 'dataconfig.php');
include_once(dirname(__FILE__)  . '/' . 'B2service.php');


class Data extends CI_Controller
{

	function __construct() {
         parent::__construct();
       
    }
		
	
	public function exec( $action, $request){
		$time_start = microtime(true);
		if ($config['log']==true)	file_put_contents($config['logpath'].'/_debug.txt', '>>>: '.json_encode($request)."\r\n", FILE_APPEND);

		try {
			$app = new B2service($config, $request);
		} catch( Exception $e ) {
		if ($config['log']==true)   file_put_contents($config['logpath'].'/_debug.txt', 'Err: '.$e->getMessage()."\r\n", FILE_APPEND);
			
			echo json_encode(array('error' => $e->getMessage()));
			exit;
		}
		header('Content-Type: application/json; charset=utf-8');
		try {
			$res = json_encode(call_user_func(array($app, $app->action)));
			$time = (microtime(true) - $time_start)*1000;

			if ($config['log']==true)    file_put_contents($config['logpath'].'/_debug.txt', '<<<('.round($time).'ms): '.substr($res, 0, 10000)."\r\n", FILE_APPEND);
			
			echo $res;
		} catch( Exception $e ) {
			if ($config['log']==true)    file_put_contents($config['logpath'].'/_debug.txt', 'Err: '.$e->getMessage()."\r\n", FILE_APPEND);
		   
		   echo json_encode(array('error' => $e->getMessage()));
		}
	}
	
	public function index()
    {
		echo 'Data::Index';
		echo '<br/>'.dirname(__FILE__) ;
		echo '<br/>'.$config;
	}
}


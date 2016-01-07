<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'VkPhpSdk.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'Oauth2Proxy.php';

class vk extends CI_Controller {

	public function index()
	{
		$this->load->view('Vk');
	}
	
	
	public function refreshuser(){
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
		
		

			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadads - error  not logged in')); 
		}
	
	}
	
	
	public function loadadsstat(){
	    
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			
			
			
			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadadsstat - error  not logged in')); 
		}
	
	}
	
	
	public function loadadsdemografy(){
	    
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			
			
			
			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadadsstat - error  not logged in')); 
		}
	
	}
	

	
	public function loadcountry(){
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			
			
			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadcountry - error  not logged in')); 
		}
	}
	public function loadregions(){
	
	if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			

			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadcountry - error  not logged in')); 
		}
	}
	public function loadcategory(){
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
	

			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadcategory - error  not logged in')); 
		}
		
	}
}
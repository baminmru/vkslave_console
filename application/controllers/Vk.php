<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'VkPhpSdk.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'Oauth2Proxy.php';

class vk extends CI_Controller {

	public function index()
	{
			 $this->load->view('Vk');
	}
	
	
	
}
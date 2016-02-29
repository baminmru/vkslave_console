<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'VkPhpSdk.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . 'vk' . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'Oauth2Proxy.php';

class vk extends CI_Controller {

	public function index()
	{
			 $this->load->view('Vk');
	}
	
	
	public function loadcountry(){
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			
			usleep(650000);	
			$result = $vkPhpSdk->api('database.getCountries', array(
				'need_all'=>1,
				'count'=>500
			));
			
			 $this->load->model('M_vk_country', 'm_vk_country');
			
			for($i=0;$i<count($result['response']);$i++){
				$q ="insert into vkd_country(id,title) values(";
				$q=$q.$result['response'][$i]['cid'].",'".$result['response'][$i]['title']."')
				";
			
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_country','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['cid']));
			
			    $crowid='';
			    $cinstanceid='{9404A229-9AEC-42DC-BF43-5FA23920FF34}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			  $data = array(
                'vk_countryid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['title']
                ,'vkid' =>   $result['response'][$i]['cid']
				);
				$vk_country = $this->m_vk_country->setRow($data);
			}
			
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
			
			 $this->load->model('M_vk_region', 'm_vk_region');
			usleep(650000);	
			$result0 = $vkPhpSdk->api('database.getCountries', array(
				'need_all'=>1,
				'count'=>500
			));

			

			for($j=0;$j<count($result0['response']);$j++){
				

				$res = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_country','IDField'=>'vkid', 'IDValue' => $result0['response'][$j]['cid']));
				//var_dump($res);
				
				if(count($res)>0){
				
					usleep(650000);
					$result = $vkPhpSdk->api('database.getRegions', array(
						'country_id'=>$result0['response'][$j]['cid'],
						'count'=>300
					));
					for($i=0;$i<count($result['response']);$i++){
					
					   $reg = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_region','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['region_id']));
				
						$rrowid='';
						$rinstanceid='{EF53DB60-5DEB-4971-9798-B8E9D0EAEDAC}';
						if(count($reg)>0){
							$rrowid=$reg->rowid;
						}
						
						$data = array(
							'vk_regionid' =>  $rrowid
							,'instanceid' =>  $rinstanceid
							,'title' =>   $result['response'][$i]['title']
							,'vkid' =>   $result['response'][$i]['region_id']
							,'country_id' =>   $res->rowid
						);
						$vk_region = $this->m_vk_region->setRow($data);
					}
				}
				
							
			}

			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadcountry - error  not logged in')); 
		}
	}
	public function loadtowns(){
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			
			$this->load->model('M_vk_town', 'm_vk_town');
			$this->load->model('M_v_autovk_usr', 'm_v_autovk_usr');
			
			usleep(650000);
			$result0 = $vkPhpSdk->api('database.getCountries', array(
				'need_all'=>1,
				'count'=>500
			));

			for($j=0;$j<count($result0['response']) ;$j++){
				$res = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_country','IDField'=>'vkid', 'IDValue' => $result0['response'][$j]['cid']));
				if(count($res)>0){
				
					usleep(650000);
					$result = $vkPhpSdk->api('database.getCities', array(
						'country_id'=>$result0['response'][$j]['cid'],
						'need_all'=>0,
						'offset'=>0,
						'count'=>999
					));
					
					//var_dump($result);
					
				
					for($i=0;$i<count($result['response']);$i++){
				
						if(array_key_exists('region', $result['response'][$i])){
						   $reg = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_region','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['region_id']));
							if($reg !=null)
								$regid=$reg->rowid;
								
							else
								$regid=null;
								
						}else{
							$regid=null;
							
						}
				
					   
				
						$trowid='';
						$tinstanceid='{5FCB1238-AA3F-43F3-8EEA-5ED3AFA0AF2D}';
						$town = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_town','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['cid']));
						if(count($town)>0){
							$trowid=$town->rowid;
							$tinstanceid=$town->instanceid;
						}else{
							$res= $this->m_v_autovk_town->newRow('', $result['response'][$i]['title']);
				
							if(count($res) >0){
								if($res['success']==TRUE){
									$tinstanceid=$res['data'];
									$trowid =	 $res['rowid'];
								}
							}					
						}
						
						  $data = array(
							'vk_townid' =>  $trowid
							,'instanceid' =>  $tinstanceid
							,'title' =>  $result['response'][$i]['title']
							,'vkid' =>   $result['response'][$i]['cid']
							,'country_id' =>   $res->rowid
							,'region_id' =>   $regid
						);
						$vk_town = $this->m_vk_town->setRow($data);
					}
				}
				
							
			}

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
	
		 $this->load->model('M_vk_category', 'm_vk_category');
		//{EFB7DC6D-4FA2-4A45-8BF4-D8CEE3E9629C}
		
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getCategories', array(
				'lang'=>'ru'
			));
			
			for($i=0;$i<count($result['response']);$i++){
				$parent_id=$result['response'][$i]['id'];
				
				
			    $cat = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_category','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
				
				$crowid='';
				$cinstanceid='{EFB7DC6D-4FA2-4A45-8BF4-D8CEE3E9629C}';
				if(count($cat)>0){
					$crowid=$cat->rowid;
				}
				
				 $data = array(
					'vk_categoryid' =>  $crowid
					,'instanceid' =>  $cinstanceid
					,'title' =>   $result['response'][$i]['name']
					,'vkid' =>   $result['response'][$i]['id']
					,'parent_id' =>   null
				);
				$vk_category = $this->m_vk_category->setRow($data);
				
				$v=$result['response'][$i];
				
				if(array_key_exists('subcategories', $v) ){
					for($j=0;$j<count($result['response'][$i]['subcategories']);$j++){
					
						 $cat = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_category','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['subcategories'][$j]['id']));
				
						$crowid='';
						if(count($cat)>0){
							$crowid=$cat->rowid;
						}
					
						 $data = array(
								'vk_categoryid' =>   $crowid
								,'instanceid' =>  $cinstanceid
								,'title' =>   $result['response'][$i]['subcategories'][$j]['name']
								,'vkid' =>   $result['response'][$i]['subcategories'][$j]['id']
								,'parent_id' =>   $parent_id
							);
							$vk_category = $this->m_vk_category->setRow($data);
					}
				}
				
			}

			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadcategory - error  not logged in')); 
		}
		
	}
	
	
	
	public function loadsuggestions(){
		if( isset($_SESSION['VKAT']) && isset($_SESSION['VKID']) && isset($_SESSION['B2SESSION'])){
			// Init vk.com SDK
			$vkPhpSdk = new VkPhpSdk();
			$vkPhpSdk->setAccessToken($_SESSION['VKAT']);
			$vkPhpSdk->setUserId($_SESSION['VKID']);
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'religions'
			));
			
			 $this->load->model('M_vk_religion', 'm_vk_religion');
			
			for($i=0;$i<count($result['response']);$i++){
				
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_religion','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
			
			    $crowid='';
			    $cinstanceid='{E987D5B4-87DA-471D-BEB2-1F250951AC50}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			  $data = array(
                'vk_religionid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['name']
                ,'vkid' =>   $result['response'][$i]['id']
				);
				$vk_rel = $this->m_vk_religion->setRow($data);
			}
			
			
			
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'positions'
			));
			
			 $this->load->model('M_vk_position', 'm_vk_position');
			
			for($i=0;$i<count($result['response']);$i++){
				
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_position','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
			
			    $crowid='';
			    $cinstanceid='{B3E25A1F-BD2B-48A6-BADE-0802030863F3}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			  $data = array(
                'vk_positionid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['name']
                ,'vkid' =>   $result['response'][$i]['id']
				);
				$vk_rel = $this->m_vk_position->setRow($data);
			}
			
			
			
			
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'interest_categories'
			));
			
			 $this->load->model('M_vk_interest', 'm_vk_interest');
			
			for($i=0;$i<count($result['response']);$i++){
				
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_interest','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
			
			    $crowid='';
			    $cinstanceid='{271C9FA4-F855-40BA-BB43-37094896C18B}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			    $data = array(
                'vk_interestid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['name']
                ,'vkid' =>   $result['response'][$i]['id']
				);
				$vk_rel = $this->m_vk_interest->setRow($data);
			}
			
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'user_devices'
			));
			
			 $this->load->model('M_vk_device', 'm_vk_device');
			
			for($i=0;$i<count($result['response']);$i++){
				
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_device','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
			
			    $crowid='';
			    $cinstanceid='{7EAB742D-8FCA-4273-A8BC-9714BC5322E3}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			    $data = array(
                'vk_deviceid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['name']
                ,'vkid' =>   $result['response'][$i]['id']
				);
				$vk_dev = $this->m_vk_device->setRow($data);
			}
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'user_os'
			));
			
			 $this->load->model('M_vk_os', 'm_vk_os');
			
			for($i=0;$i<count($result['response']);$i++){
				
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_os','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
			
			    $crowid='';
			    $cinstanceid='{CD999811-051C-40E6-A946-556F4E355F94}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			    $data = array(
                'vk_osid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['name']
                ,'vkid' =>   $result['response'][$i]['id']
				);
				$vk_os= $this->m_vk_os->setRow($data);
			}
			
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'user_browsers'
			));
			
			 $this->load->model('M_vk_browser', 'm_vk_browser');
			
			for($i=0;$i<count($result['response']);$i++){
				
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_browser','IDField'=>'vkid', 'IDValue' => $result['response'][$i]['id']));
			
			    $crowid='';
			    $cinstanceid='{678498A5-EEFE-43A5-8391-A744BBB813E2}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			    $data = array(
                'vk_browserid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]['name']
                ,'vkid' =>   $result['response'][$i]['id']
				);
				$vk_brw= $this->m_vk_browser->setRow($data);
			}
			
			
			usleep(650000);	
			$result = $vkPhpSdk->api('ads.getSuggestions', array(
			'lang'=>'ru' ,
			'section'=>'interests'
			));
			
			 $this->load->model('M_vk_funs', 'm_vk_funs');
			
			// echo count($result['response']).'\r\n';
			
			for($i=0;$i<count($result['response']);$i++){
				
				// echo $result['response'][$i].'\r\n';
				 
 		        $cnt = $this->jservice->get(array('Action' => 'FindByID','Table'=>'vk_funs','IDField'=>'title', 'IDValue' => $result['response'][$i]));
			
			    $crowid='';
			    $cinstanceid='{7DA638F8-3F1E-4597-B368-0C0B47D596C4}';
				if(count($cnt)>0){
					$crowid=$cnt->rowid;
				}
				
			    $data = array(
                'vk_funsid' =>  $crowid
                ,'instanceid' =>  $cinstanceid
                ,'title' =>   $result['response'][$i]
             
				);
				$vk_fun= $this->m_vk_funs->setRow($data);
			}
			

			
			print json_encode(array('success' => TRUE, 'msg' => 'OK')); 
		}else{
			print json_encode(array('success' => FALSE, 'msg' => 'loadsuggesstions - error  not logged in')); 
		}
	}
	
	
	
}
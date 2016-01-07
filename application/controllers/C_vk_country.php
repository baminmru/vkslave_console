<?php
	 class C_vk_country extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_COUNTRY.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_COUNTRY.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_countryid' =>  $this->input->get_post('vk_countryid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
            );
            $vk_country = $this->m_vk_country->setRow($data);
            print json_encode($vk_country);
    }
    function newRow() {
            log_message('debug', 'VK_COUNTRY.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_countryid' =>  $this->input->get_post('vk_countryid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_country= $this->m_vk_country->newRow($instanceid,$data);
            $return = $vk_country;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_COUNTRY.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_country = $this->m_vk_country->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_country
            );
            print json_encode($return);
        }
    }
    function getRows() {
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_country= $this->m_vk_country->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_country= $this->m_vk_country->getRows($sort);
                }
            }else{
              $vk_country= $this->m_vk_country->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_country
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_COUNTRY.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_country= $this->m_vk_country->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_country
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need instanceid to query.'
            );
        }
        print json_encode($return);
    }
    function getRowsByParent() {
        log_message('debug', 'VK_COUNTRY.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_country= $this->m_vk_country->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_country
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need parent parentid to query.'
            );
        }
        print json_encode($return);
    }
    function deleteRow() {
        log_message('debug', 'VK_COUNTRY.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_countryid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_country->deleteRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to delete'
            );
        }
        print json_encode($return);
    }
    private function _loadModels () {
        $this->load->model('M_vk_country', 'm_vk_country');
    }
}
?>
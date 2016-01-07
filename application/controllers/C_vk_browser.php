<?php
	 class C_vk_browser extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_BROWSER.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_BROWSER.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_browserid' =>  $this->input->get_post('vk_browserid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
            $vk_browser = $this->m_vk_browser->setRow($data);
            print json_encode($vk_browser);
    }
    function newRow() {
            log_message('debug', 'VK_BROWSER.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_browserid' =>  $this->input->get_post('vk_browserid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_browser= $this->m_vk_browser->newRow($instanceid,$data);
            $return = $vk_browser;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_BROWSER.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_browser = $this->m_vk_browser->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_browser
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
                    $vk_browser= $this->m_vk_browser->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_browser= $this->m_vk_browser->getRows($sort);
                }
            }else{
              $vk_browser= $this->m_vk_browser->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_browser
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_BROWSER.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_browser= $this->m_vk_browser->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_browser
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
        log_message('debug', 'VK_BROWSER.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_browser= $this->m_vk_browser->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_browser
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
        log_message('debug', 'VK_BROWSER.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_browserid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_browser->deleteRow($tempId);
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
        $this->load->model('M_vk_browser', 'm_vk_browser');
    }
}
?>
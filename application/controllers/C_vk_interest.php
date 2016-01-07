<?php
	 class C_vk_interest extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_INTEREST.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_INTEREST.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_interestid' =>  $this->input->get_post('vk_interestid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
            );
            $vk_interest = $this->m_vk_interest->setRow($data);
            print json_encode($vk_interest);
    }
    function newRow() {
            log_message('debug', 'VK_INTEREST.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_interestid' =>  $this->input->get_post('vk_interestid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_interest= $this->m_vk_interest->newRow($instanceid,$data);
            $return = $vk_interest;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_INTEREST.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_interest = $this->m_vk_interest->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_interest
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
            	$sort[] = array('property'=>'title', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_interest= $this->m_vk_interest->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_interest= $this->m_vk_interest->getRows($sort);
                }
            }else{
              $vk_interest= $this->m_vk_interest->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_interest
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_INTEREST.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'title', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_interest= $this->m_vk_interest->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_interest
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
        log_message('debug', 'VK_INTEREST.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'title', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_interest= $this->m_vk_interest->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_interest
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
        log_message('debug', 'VK_INTEREST.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_interestid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_interest->deleteRow($tempId);
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
        $this->load->model('M_vk_interest', 'm_vk_interest');
    }
}
?>
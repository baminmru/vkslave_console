<?php
	 class C_vk_streets extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'vk_streets.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'vk_streets.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_streetsid' =>  $this->input->get_post('vk_streetsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
            $vk_streets = $this->m_vk_streets->setRow($data);
            print json_encode($vk_streets);
    }
    function newRow() {
            log_message('debug', 'vk_streets.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_streetsid' =>  $this->input->get_post('vk_streetsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_streets= $this->m_vk_streets->newRow($instanceid,$data);
            $return = $vk_streets;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'vk_streets.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_streets = $this->m_vk_streets->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_streets
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
                    $vk_streets= $this->m_vk_streets->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_streets= $this->m_vk_streets->getRows($sort);
                }
            }else{
              $vk_streets= $this->m_vk_streets->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_streets
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'vk_streets.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_streets= $this->m_vk_streets->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_streets
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
        log_message('debug', 'vk_streets.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_streets= $this->m_vk_streets->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_streets
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
        log_message('debug', 'vk_streets.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_streetsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_streets->deleteRow($tempId);
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
        $this->load->model('M_vk_streets', 'm_vk_streets');
    }
}
?>
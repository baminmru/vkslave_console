<?php
	 class C_vk_age extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_AGE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_AGE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_ageid' =>  $this->input->get_post('vk_ageid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
            $vk_age = $this->m_vk_age->setRow($data);
            print json_encode($vk_age);
    }
    function newRow() {
            log_message('debug', 'VK_AGE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_ageid' =>  $this->input->get_post('vk_ageid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_age= $this->m_vk_age->newRow($instanceid,$data);
            $return = $vk_age;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_AGE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_age = $this->m_vk_age->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_age
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
                    $vk_age= $this->m_vk_age->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_age= $this->m_vk_age->getRows($sort);
                }
            }else{
              $vk_age= $this->m_vk_age->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_age
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_AGE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_age= $this->m_vk_age->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_age
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
        log_message('debug', 'VK_AGE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_age= $this->m_vk_age->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_age
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
        log_message('debug', 'VK_AGE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_ageid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_age->deleteRow($tempId);
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
        $this->load->model('M_vk_age', 'm_vk_age');
    }
}
?>
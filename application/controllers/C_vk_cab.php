<?php
	 class C_vk_cab extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_CAB.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_CAB.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_cabid' =>  $this->input->get_post('vk_cabid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'account_id' =>   $this->input->get_post('account_id', TRUE)
                ,'account_type' =>   $this->input->get_post('account_type', TRUE)
                ,'account_status' =>   $this->input->get_post('account_status', TRUE)
                ,'access_role' =>   $this->input->get_post('access_role', TRUE)
            );
            $vk_cab = $this->m_vk_cab->setRow($data);
            print json_encode($vk_cab);
    }
    function newRow() {
            log_message('debug', 'VK_CAB.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_cabid' =>  $this->input->get_post('vk_cabid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'account_id' =>   $this->input->get_post('account_id', TRUE)
                ,'account_type' =>   $this->input->get_post('account_type', TRUE)
                ,'account_status' =>   $this->input->get_post('account_status', TRUE)
                ,'access_role' =>   $this->input->get_post('access_role', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_cab= $this->m_vk_cab->newRow($instanceid,$data);
            $return = $vk_cab;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_CAB.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_cab = $this->m_vk_cab->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_cab
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
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_cab= $this->m_vk_cab->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_cab= $this->m_vk_cab->getRows($sort);
                }
            }else{
              $vk_cab= $this->m_vk_cab->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_cab
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_CAB.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_cab= $this->m_vk_cab->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_cab
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
        log_message('debug', 'VK_CAB.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_cab= $this->m_vk_cab->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_cab
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
        log_message('debug', 'VK_CAB.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_cabid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_cab->deleteRow($tempId);
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
        $this->load->model('M_vk_cab', 'm_vk_cab');
    }
}
?>
<?php
	 class C_vk_taskowner extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TASKOWNER.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TASKOWNER.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_taskownerid' =>  $this->input->get_post('vk_taskownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
            $vk_taskowner = $this->m_vk_taskowner->setRow($data);
            print json_encode($vk_taskowner);
    }
    function newRow() {
            log_message('debug', 'VK_TASKOWNER.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_taskownerid' =>  $this->input->get_post('vk_taskownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_taskowner= $this->m_vk_taskowner->newRow($instanceid,$data);
            $return = $vk_taskowner;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TASKOWNER.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_taskowner = $this->m_vk_taskowner->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_taskowner
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
            	$sort[] = array('property'=>'vkusr', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_taskowner= $this->m_vk_taskowner->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_taskowner= $this->m_vk_taskowner->getRows($sort);
                }
            }else{
              $vk_taskowner= $this->m_vk_taskowner->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_taskowner
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TASKOWNER.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkusr', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_taskowner= $this->m_vk_taskowner->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_taskowner
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
        log_message('debug', 'VK_TASKOWNER.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkusr', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_taskowner= $this->m_vk_taskowner->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_taskowner
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
        log_message('debug', 'VK_TASKOWNER.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_taskownerid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_taskowner->deleteRow($tempId);
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
        $this->load->model('M_vk_taskowner', 'm_vk_taskowner');
    }
}
?>
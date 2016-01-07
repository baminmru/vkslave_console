<?php
	 class C_vk_rotowner extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ROTOWNER.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ROTOWNER.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_rotownerid' =>  $this->input->get_post('vk_rotownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
            $vk_rotowner = $this->m_vk_rotowner->setRow($data);
            print json_encode($vk_rotowner);
    }
    function newRow() {
            log_message('debug', 'VK_ROTOWNER.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_rotownerid' =>  $this->input->get_post('vk_rotownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_rotowner= $this->m_vk_rotowner->newRow($instanceid,$data);
            $return = $vk_rotowner;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ROTOWNER.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_rotowner = $this->m_vk_rotowner->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_rotowner
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
                    $vk_rotowner= $this->m_vk_rotowner->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_rotowner= $this->m_vk_rotowner->getRows($sort);
                }
            }else{
              $vk_rotowner= $this->m_vk_rotowner->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_rotowner
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ROTOWNER.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_rotowner= $this->m_vk_rotowner->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_rotowner
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
        log_message('debug', 'VK_ROTOWNER.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_rotowner= $this->m_vk_rotowner->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_rotowner
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
        log_message('debug', 'VK_ROTOWNER.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_rotownerid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_rotowner->deleteRow($tempId);
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
        $this->load->model('M_vk_rotowner', 'm_vk_rotowner');
    }
}
?>
<?php
	 class C_vk_adformat extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADFORMAT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADFORMAT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adformatid' =>  $this->input->get_post('vk_adformatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
            $vk_adformat = $this->m_vk_adformat->setRow($data);
            print json_encode($vk_adformat);
    }
    function newRow() {
            log_message('debug', 'VK_ADFORMAT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adformatid' =>  $this->input->get_post('vk_adformatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adformat= $this->m_vk_adformat->newRow($instanceid,$data);
            $return = $vk_adformat;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADFORMAT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adformat = $this->m_vk_adformat->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adformat
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
                    $vk_adformat= $this->m_vk_adformat->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adformat= $this->m_vk_adformat->getRows($sort);
                }
            }else{
              $vk_adformat= $this->m_vk_adformat->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adformat
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADFORMAT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_adformat= $this->m_vk_adformat->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adformat
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
        log_message('debug', 'VK_ADFORMAT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_adformat= $this->m_vk_adformat->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adformat
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
        log_message('debug', 'VK_ADFORMAT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adformatid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adformat->deleteRow($tempId);
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
        $this->load->model('M_vk_adformat', 'm_vk_adformat');
    }
}
?>
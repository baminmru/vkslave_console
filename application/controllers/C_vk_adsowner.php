<?php
	 class C_vk_adsowner extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADSOWNER.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADSOWNER.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adsownerid' =>  $this->input->get_post('vk_adsownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
            $vk_adsowner = $this->m_vk_adsowner->setRow($data);
            print json_encode($vk_adsowner);
    }
    function newRow() {
            log_message('debug', 'VK_ADSOWNER.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adsownerid' =>  $this->input->get_post('vk_adsownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adsowner= $this->m_vk_adsowner->newRow($instanceid,$data);
            $return = $vk_adsowner;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADSOWNER.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adsowner = $this->m_vk_adsowner->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adsowner
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
                    $vk_adsowner= $this->m_vk_adsowner->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adsowner= $this->m_vk_adsowner->getRows($sort);
                }
            }else{
              $vk_adsowner= $this->m_vk_adsowner->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adsowner
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADSOWNER.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_adsowner= $this->m_vk_adsowner->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adsowner
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
        log_message('debug', 'VK_ADSOWNER.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_adsowner= $this->m_vk_adsowner->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adsowner
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
        log_message('debug', 'VK_ADSOWNER.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adsownerid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adsowner->deleteRow($tempId);
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
        $this->load->model('M_vk_adsowner', 'm_vk_adsowner');
    }
}
?>
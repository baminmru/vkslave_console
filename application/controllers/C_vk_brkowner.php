<?php
	 class C_vk_brkowner extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_BRKOWNER.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_BRKOWNER.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_brkownerid' =>  $this->input->get_post('vk_brkownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
            $vk_brkowner = $this->m_vk_brkowner->setRow($data);
            print json_encode($vk_brkowner);
    }
    function newRow() {
            log_message('debug', 'VK_BRKOWNER.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_brkownerid' =>  $this->input->get_post('vk_brkownerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_brkowner= $this->m_vk_brkowner->newRow($instanceid,$data);
            $return = $vk_brkowner;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_BRKOWNER.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_brkowner = $this->m_vk_brkowner->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_brkowner
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
                    $vk_brkowner= $this->m_vk_brkowner->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_brkowner= $this->m_vk_brkowner->getRows($sort);
                }
            }else{
              $vk_brkowner= $this->m_vk_brkowner->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_brkowner
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_BRKOWNER.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_brkowner= $this->m_vk_brkowner->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_brkowner
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
        log_message('debug', 'VK_BRKOWNER.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_brkowner= $this->m_vk_brkowner->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_brkowner
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
        log_message('debug', 'VK_BRKOWNER.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_brkownerid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_brkowner->deleteRow($tempId);
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
        $this->load->model('M_vk_brkowner', 'm_vk_brkowner');
    }
}
?>
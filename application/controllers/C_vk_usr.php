<?php
	 class C_vk_usr extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_USR.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_USR.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_usrid' =>  $this->input->get_post('vk_usrid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'first_name' =>   $this->input->get_post('first_name', TRUE)
                ,'last_name' =>   $this->input->get_post('last_name', TRUE)
                ,'deactivated' =>   $this->input->get_post('deactivated', TRUE)
                ,'photo_id' =>   $this->input->get_post('photo_id', TRUE)
                ,'sex' =>   $this->input->get_post('sex', TRUE)
                ,'bdate' =>   $this->input->get_post('bdate', TRUE)
                ,'country' =>   $this->input->get_post('country', TRUE)
                ,'home_town' =>   $this->input->get_post('home_town', TRUE)
                ,'has_photo' =>   $this->input->get_post('has_photo', TRUE)
                ,'photo_50' =>   $this->input->get_post('photo_50', TRUE)
                ,'photo_100' =>   $this->input->get_post('photo_100', TRUE)
                ,'online' =>   $this->input->get_post('online', TRUE)
                ,'status' =>   $this->input->get_post('status', TRUE)
            );
            $vk_usr = $this->m_vk_usr->setRow($data);
            print json_encode($vk_usr);
    }
    function newRow() {
            log_message('debug', 'VK_USR.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_usrid' =>  $this->input->get_post('vk_usrid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'first_name' =>   $this->input->get_post('first_name', TRUE)
                ,'last_name' =>   $this->input->get_post('last_name', TRUE)
                ,'deactivated' =>   $this->input->get_post('deactivated', TRUE)
                ,'photo_id' =>   $this->input->get_post('photo_id', TRUE)
                ,'sex' =>   $this->input->get_post('sex', TRUE)
                ,'bdate' =>   $this->input->get_post('bdate', TRUE)
                ,'country' =>   $this->input->get_post('country', TRUE)
                ,'home_town' =>   $this->input->get_post('home_town', TRUE)
                ,'has_photo' =>   $this->input->get_post('has_photo', TRUE)
                ,'photo_50' =>   $this->input->get_post('photo_50', TRUE)
                ,'photo_100' =>   $this->input->get_post('photo_100', TRUE)
                ,'online' =>   $this->input->get_post('online', TRUE)
                ,'status' =>   $this->input->get_post('status', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_usr= $this->m_vk_usr->newRow($instanceid,$data);
            $return = $vk_usr;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_USR.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_usr = $this->m_vk_usr->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_usr
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
            	$sort[] = array('property'=>'first_name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_usr= $this->m_vk_usr->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_usr= $this->m_vk_usr->getRows($sort);
                }
            }else{
              $vk_usr= $this->m_vk_usr->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_usr
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_USR.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'first_name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_usr= $this->m_vk_usr->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_usr
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
        log_message('debug', 'VK_USR.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'first_name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_usr= $this->m_vk_usr->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_usr
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
        log_message('debug', 'VK_USR.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_usrid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_usr->deleteRow($tempId);
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
        $this->load->model('M_vk_usr', 'm_vk_usr');
    }
}
?>
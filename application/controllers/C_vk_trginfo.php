<?php
	 class C_vk_trginfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TRGINFO.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TRGINFO.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_trginfoid' =>  $this->input->get_post('vk_trginfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'cab' =>   $this->input->get_post('cab', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'trgdomain' =>   $this->input->get_post('trgdomain', TRUE)
                ,'audience_count' =>   $this->input->get_post('audience_count', TRUE)
                ,'lifetime' =>   $this->input->get_post('lifetime', TRUE)
                ,'pixel' =>   $this->input->get_post('pixel', TRUE)
            );
            $vk_trginfo = $this->m_vk_trginfo->setRow($data);
            print json_encode($vk_trginfo);
    }
    function newRow() {
            log_message('debug', 'VK_TRGINFO.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_trginfoid' =>  $this->input->get_post('vk_trginfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'cab' =>   $this->input->get_post('cab', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'trgdomain' =>   $this->input->get_post('trgdomain', TRUE)
                ,'audience_count' =>   $this->input->get_post('audience_count', TRUE)
                ,'lifetime' =>   $this->input->get_post('lifetime', TRUE)
                ,'pixel' =>   $this->input->get_post('pixel', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_trginfo= $this->m_vk_trginfo->newRow($instanceid,$data);
            $return = $vk_trginfo;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TRGINFO.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_trginfo = $this->m_vk_trginfo->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_trginfo
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
                    $vk_trginfo= $this->m_vk_trginfo->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_trginfo= $this->m_vk_trginfo->getRows($sort);
                }
            }else{
              $vk_trginfo= $this->m_vk_trginfo->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_trginfo
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TRGINFO.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_trginfo= $this->m_vk_trginfo->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_trginfo
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
        log_message('debug', 'VK_TRGINFO.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_trginfo= $this->m_vk_trginfo->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_trginfo
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
        log_message('debug', 'VK_TRGINFO.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_trginfoid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_trginfo->deleteRow($tempId);
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
        $this->load->model('M_vk_trginfo', 'm_vk_trginfo');
    }
}
?>
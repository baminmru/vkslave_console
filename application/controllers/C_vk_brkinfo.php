<?php
	 class C_vk_brkinfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_BRKINFO.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_BRKINFO.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_brkinfoid' =>  $this->input->get_post('vk_brkinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'crdate' =>   $this->input->get_post('crdate', TRUE)
                ,'ads' =>   $this->input->get_post('ads', TRUE)
                ,'rotation' =>   $this->input->get_post('rotation', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $vk_brkinfo = $this->m_vk_brkinfo->setRow($data);
            print json_encode($vk_brkinfo);
    }
    function newRow() {
            log_message('debug', 'VK_BRKINFO.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_brkinfoid' =>  $this->input->get_post('vk_brkinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'crdate' =>   $this->input->get_post('crdate', TRUE)
                ,'ads' =>   $this->input->get_post('ads', TRUE)
                ,'rotation' =>   $this->input->get_post('rotation', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_brkinfo= $this->m_vk_brkinfo->newRow($instanceid,$data);
            $return = $vk_brkinfo;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_BRKINFO.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_brkinfo = $this->m_vk_brkinfo->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_brkinfo
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
                    $vk_brkinfo= $this->m_vk_brkinfo->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_brkinfo= $this->m_vk_brkinfo->getRows($sort);
                }
            }else{
              $vk_brkinfo= $this->m_vk_brkinfo->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_brkinfo
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_BRKINFO.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_brkinfo= $this->m_vk_brkinfo->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_brkinfo
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
        log_message('debug', 'VK_BRKINFO.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_brkinfo= $this->m_vk_brkinfo->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_brkinfo
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
        log_message('debug', 'VK_BRKINFO.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_brkinfoid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_brkinfo->deleteRow($tempId);
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
        $this->load->model('M_vk_brkinfo', 'm_vk_brkinfo');
    }
}
?>
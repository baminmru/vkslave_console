<?php
	 class C_vk_trgfiles extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TRGFILES.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TRGFILES.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_trgfilesid' =>  $this->input->get_post('vk_trgfilesid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'thefile' =>   $this->input->get_post('thefile', TRUE)
                ,'thefile_ext' =>   $this->input->get_post('thefile_ext', TRUE)
                ,'listtext' =>   $this->input->get_post('listtext', TRUE)
            );
            $vk_trgfiles = $this->m_vk_trgfiles->setRow($data);
            print json_encode($vk_trgfiles);
    }
    function newRow() {
            log_message('debug', 'VK_TRGFILES.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_trgfilesid' =>  $this->input->get_post('vk_trgfilesid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'thefile' =>   $this->input->get_post('thefile', TRUE)
                ,'thefile_ext' =>   $this->input->get_post('thefile_ext', TRUE)
                ,'listtext' =>   $this->input->get_post('listtext', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_trgfiles= $this->m_vk_trgfiles->newRow($instanceid,$data);
            $return = $vk_trgfiles;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TRGFILES.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_trgfiles = $this->m_vk_trgfiles->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_trgfiles
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
                    $vk_trgfiles= $this->m_vk_trgfiles->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_trgfiles= $this->m_vk_trgfiles->getRows($sort);
                }
            }else{
              $vk_trgfiles= $this->m_vk_trgfiles->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_trgfiles
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TRGFILES.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_trgfiles= $this->m_vk_trgfiles->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_trgfiles
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
        log_message('debug', 'VK_TRGFILES.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_trgfiles= $this->m_vk_trgfiles->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_trgfiles
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
        log_message('debug', 'VK_TRGFILES.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_trgfilesid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_trgfiles->deleteRow($tempId);
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
        $this->load->model('M_vk_trgfiles', 'm_vk_trgfiles');
    }
}
?>
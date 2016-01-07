<?php
	 class C_vk_prj extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_PRJ.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_PRJ.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_prjid' =>  $this->input->get_post('vk_prjid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
            $vk_prj = $this->m_vk_prj->setRow($data);
            print json_encode($vk_prj);
    }
    function newRow() {
            log_message('debug', 'VK_PRJ.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_prjid' =>  $this->input->get_post('vk_prjid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_prj= $this->m_vk_prj->newRow($instanceid,$data);
            $return = $vk_prj;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_PRJ.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_prj = $this->m_vk_prj->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_prj
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
            	$sort[] = array('property'=>'title', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_prj= $this->m_vk_prj->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_prj= $this->m_vk_prj->getRows($sort);
                }
            }else{
              $vk_prj= $this->m_vk_prj->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_prj
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_PRJ.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'title', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_prj= $this->m_vk_prj->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_prj
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
        log_message('debug', 'VK_PRJ.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'title', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_prj= $this->m_vk_prj->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_prj
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
        log_message('debug', 'VK_PRJ.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_prjid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_prj->deleteRow($tempId);
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
        $this->load->model('M_vk_prj', 'm_vk_prj');
    }
}
?>
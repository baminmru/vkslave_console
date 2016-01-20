<?php
	 class C_vk_tasktype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TASKTYPE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TASKTYPE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_tasktypeid' =>  $this->input->get_post('vk_tasktypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'repeatabletask' =>   $this->input->get_post('repeatabletask', TRUE)
                ,'definterval' =>   $this->input->get_post('definterval', TRUE)
            );
            $vk_tasktype = $this->m_vk_tasktype->setRow($data);
            print json_encode($vk_tasktype);
    }
    function newRow() {
            log_message('debug', 'VK_TASKTYPE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_tasktypeid' =>  $this->input->get_post('vk_tasktypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'repeatabletask' =>   $this->input->get_post('repeatabletask', TRUE)
                ,'definterval' =>   $this->input->get_post('definterval', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_tasktype= $this->m_vk_tasktype->newRow($instanceid,$data);
            $return = $vk_tasktype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TASKTYPE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_tasktype = $this->m_vk_tasktype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_tasktype
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
                    $vk_tasktype= $this->m_vk_tasktype->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_tasktype= $this->m_vk_tasktype->getRows($sort);
                }
            }else{
              $vk_tasktype= $this->m_vk_tasktype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_tasktype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TASKTYPE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_tasktype= $this->m_vk_tasktype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_tasktype
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
        log_message('debug', 'VK_TASKTYPE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_tasktype= $this->m_vk_tasktype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_tasktype
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
        log_message('debug', 'VK_TASKTYPE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_tasktypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_tasktype->deleteRow($tempId);
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
        $this->load->model('M_vk_tasktype', 'm_vk_tasktype');
    }
}
?>
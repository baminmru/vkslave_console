<?php
	 class C_vk_taskinfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TASKINFO.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TASKINFO.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_taskinfoid' =>  $this->input->get_post('vk_taskinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'tasktype' =>   $this->input->get_post('tasktype', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'crdate' =>   $this->input->get_post('crdate', TRUE)
                ,'repeat_interval' =>   $this->input->get_post('repeat_interval', TRUE)
                ,'lastdate' =>   $this->input->get_post('lastdate', TRUE)
                ,'result' =>   $this->input->get_post('result', TRUE)
                ,'isdone' =>   $this->input->get_post('isdone', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
                ,'cab' =>   $this->input->get_post('cab', TRUE)
                ,'camp' =>   $this->input->get_post('camp', TRUE)
                ,'ads' =>   $this->input->get_post('ads', TRUE)
                ,'rotation' =>   $this->input->get_post('rotation', TRUE)
                ,'token' =>   $this->input->get_post('token', TRUE)
            );
            $vk_taskinfo = $this->m_vk_taskinfo->setRow($data);
            print json_encode($vk_taskinfo);
    }
    function newRow() {
            log_message('debug', 'VK_TASKINFO.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_taskinfoid' =>  $this->input->get_post('vk_taskinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'tasktype' =>   $this->input->get_post('tasktype', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'crdate' =>   $this->input->get_post('crdate', TRUE)
                ,'repeat_interval' =>   $this->input->get_post('repeat_interval', TRUE)
                ,'lastdate' =>   $this->input->get_post('lastdate', TRUE)
                ,'result' =>   $this->input->get_post('result', TRUE)
                ,'isdone' =>   $this->input->get_post('isdone', TRUE)
                ,'vkusr' =>   $this->input->get_post('vkusr', TRUE)
                ,'cab' =>   $this->input->get_post('cab', TRUE)
                ,'camp' =>   $this->input->get_post('camp', TRUE)
                ,'ads' =>   $this->input->get_post('ads', TRUE)
                ,'rotation' =>   $this->input->get_post('rotation', TRUE)
                ,'token' =>   $this->input->get_post('token', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_taskinfo= $this->m_vk_taskinfo->newRow($instanceid,$data);
            $return = $vk_taskinfo;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TASKINFO.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_taskinfo = $this->m_vk_taskinfo->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_taskinfo
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
            	$sort[] = array('property'=>'tasktype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_taskinfo= $this->m_vk_taskinfo->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_taskinfo= $this->m_vk_taskinfo->getRows($sort);
                }
            }else{
              $vk_taskinfo= $this->m_vk_taskinfo->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_taskinfo
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TASKINFO.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'tasktype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_taskinfo= $this->m_vk_taskinfo->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_taskinfo
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
        log_message('debug', 'VK_TASKINFO.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'tasktype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_taskinfo= $this->m_vk_taskinfo->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_taskinfo
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
        log_message('debug', 'VK_TASKINFO.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_taskinfoid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_taskinfo->deleteRow($tempId);
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
        $this->load->model('M_vk_taskinfo', 'm_vk_taskinfo');
    }
}
?>
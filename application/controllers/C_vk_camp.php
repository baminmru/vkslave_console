<?php
	 class C_vk_camp extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'Vk_CAMP.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'Vk_CAMP.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_campid' =>  $this->input->get_post('vk_campid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vk_usr' =>   $this->input->get_post('vk_usr', TRUE)
                ,'vk_cab' =>   $this->input->get_post('vk_cab', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'campagin_id' =>   $this->input->get_post('campagin_id', TRUE)
                ,'status' =>   $this->input->get_post('status', TRUE)
                ,'all_limit' =>   $this->input->get_post('all_limit', TRUE)
                ,'day_limit' =>   $this->input->get_post('day_limit', TRUE)
                ,'stop_time' =>   $this->input->get_post('stop_time', TRUE)
                ,'start_time' =>   $this->input->get_post('start_time', TRUE)
                ,'prj' =>   $this->input->get_post('prj', TRUE)
            );
            $vk_camp = $this->m_vk_camp->setRow($data);
            print json_encode($vk_camp);
    }
    function newRow() {
            log_message('debug', 'Vk_CAMP.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_campid' =>  $this->input->get_post('vk_campid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'vk_usr' =>   $this->input->get_post('vk_usr', TRUE)
                ,'vk_cab' =>   $this->input->get_post('vk_cab', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'campagin_id' =>   $this->input->get_post('campagin_id', TRUE)
                ,'status' =>   $this->input->get_post('status', TRUE)
                ,'all_limit' =>   $this->input->get_post('all_limit', TRUE)
                ,'day_limit' =>   $this->input->get_post('day_limit', TRUE)
                ,'stop_time' =>   $this->input->get_post('stop_time', TRUE)
                ,'start_time' =>   $this->input->get_post('start_time', TRUE)
                ,'prj' =>   $this->input->get_post('prj', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_camp= $this->m_vk_camp->newRow($instanceid,$data);
            $return = $vk_camp;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'Vk_CAMP.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_camp = $this->m_vk_camp->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_camp
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
                    $vk_camp= $this->m_vk_camp->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_camp= $this->m_vk_camp->getRows($sort);
                }
            }else{
              $vk_camp= $this->m_vk_camp->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_camp
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'Vk_CAMP.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_camp= $this->m_vk_camp->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_camp
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
        log_message('debug', 'Vk_CAMP.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_camp= $this->m_vk_camp->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_camp
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
        log_message('debug', 'Vk_CAMP.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_campid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_camp->deleteRow($tempId);
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
        $this->load->model('M_vk_camp', 'm_vk_camp');
    }
}
?>
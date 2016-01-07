<?php
	 class C_vk_adsdaydemografy extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADSDAYDEMOGRAFY.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADSDAYDEMOGRAFY.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adsdaydemografyid' =>  $this->input->get_post('vk_adsdaydemografyid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'s_day' =>   $this->input->get_post('s_day', TRUE)
                ,'recordtype' =>   $this->input->get_post('recordtype', TRUE)
                ,'impression_rate' =>   $this->input->get_post('impression_rate', TRUE)
                ,'click_rate' =>   $this->input->get_post('click_rate', TRUE)
                ,'_value' =>   $this->input->get_post('_value', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $vk_adsdaydemografy = $this->m_vk_adsdaydemografy->setRow($data);
            print json_encode($vk_adsdaydemografy);
    }
    function newRow() {
            log_message('debug', 'VK_ADSDAYDEMOGRAFY.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adsdaydemografyid' =>  $this->input->get_post('vk_adsdaydemografyid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'s_day' =>   $this->input->get_post('s_day', TRUE)
                ,'recordtype' =>   $this->input->get_post('recordtype', TRUE)
                ,'impression_rate' =>   $this->input->get_post('impression_rate', TRUE)
                ,'click_rate' =>   $this->input->get_post('click_rate', TRUE)
                ,'_value' =>   $this->input->get_post('_value', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adsdaydemografy= $this->m_vk_adsdaydemografy->newRow($instanceid,$data);
            $return = $vk_adsdaydemografy;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADSDAYDEMOGRAFY.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adsdaydemografy = $this->m_vk_adsdaydemografy->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adsdaydemografy
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
            	$sort[] = array('property'=>'s_day', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_adsdaydemografy= $this->m_vk_adsdaydemografy->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adsdaydemografy= $this->m_vk_adsdaydemografy->getRows($sort);
                }
            }else{
              $vk_adsdaydemografy= $this->m_vk_adsdaydemografy->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adsdaydemografy
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADSDAYDEMOGRAFY.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'s_day', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_adsdaydemografy= $this->m_vk_adsdaydemografy->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adsdaydemografy
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
        log_message('debug', 'VK_ADSDAYDEMOGRAFY.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'s_day', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_adsdaydemografy= $this->m_vk_adsdaydemografy->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adsdaydemografy
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
        log_message('debug', 'VK_ADSDAYDEMOGRAFY.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adsdaydemografyid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adsdaydemografy->deleteRow($tempId);
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
        $this->load->model('M_vk_adsdaydemografy', 'm_vk_adsdaydemografy');
    }
}
?>
<?php
	 class C_vk_adsutm extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADSUTM.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADSUTM.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adsutmid' =>  $this->input->get_post('vk_adsutmid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'autoutm' =>   $this->input->get_post('autoutm', TRUE)
                ,'utm_source' =>   $this->input->get_post('utm_source', TRUE)
                ,'utm_medium' =>   $this->input->get_post('utm_medium', TRUE)
                ,'utm_term' =>   $this->input->get_post('utm_term', TRUE)
                ,'utm_content' =>   $this->input->get_post('utm_content', TRUE)
                ,'utm_campaign' =>   $this->input->get_post('utm_campaign', TRUE)
            );
            $vk_adsutm = $this->m_vk_adsutm->setRow($data);
            print json_encode($vk_adsutm);
    }
    function newRow() {
            log_message('debug', 'VK_ADSUTM.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adsutmid' =>  $this->input->get_post('vk_adsutmid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'autoutm' =>   $this->input->get_post('autoutm', TRUE)
                ,'utm_source' =>   $this->input->get_post('utm_source', TRUE)
                ,'utm_medium' =>   $this->input->get_post('utm_medium', TRUE)
                ,'utm_term' =>   $this->input->get_post('utm_term', TRUE)
                ,'utm_content' =>   $this->input->get_post('utm_content', TRUE)
                ,'utm_campaign' =>   $this->input->get_post('utm_campaign', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adsutm= $this->m_vk_adsutm->newRow($instanceid,$data);
            $return = $vk_adsutm;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADSUTM.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adsutm = $this->m_vk_adsutm->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adsutm
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
            	$sort[] = array('property'=>'utm_source', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_adsutm= $this->m_vk_adsutm->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adsutm= $this->m_vk_adsutm->getRows($sort);
                }
            }else{
              $vk_adsutm= $this->m_vk_adsutm->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adsutm
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADSUTM.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'utm_source', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_adsutm= $this->m_vk_adsutm->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adsutm
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
        log_message('debug', 'VK_ADSUTM.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'utm_source', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_adsutm= $this->m_vk_adsutm->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adsutm
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
        log_message('debug', 'VK_ADSUTM.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adsutmid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adsutm->deleteRow($tempId);
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
        $this->load->model('M_vk_adsutm', 'm_vk_adsutm');
    }
}
?>
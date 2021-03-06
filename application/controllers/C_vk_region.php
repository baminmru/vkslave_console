﻿<?php
	 class C_vk_region extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_REGION.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_REGION.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_regionid' =>  $this->input->get_post('vk_regionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'country_id' =>   $this->input->get_post('country_id', TRUE)
            );
            $vk_region = $this->m_vk_region->setRow($data);
            print json_encode($vk_region);
    }
    function newRow() {
            log_message('debug', 'VK_REGION.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_regionid' =>  $this->input->get_post('vk_regionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'country_id' =>   $this->input->get_post('country_id', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_region= $this->m_vk_region->newRow($instanceid,$data);
            $return = $vk_region;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_REGION.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_region = $this->m_vk_region->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_region
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
            	$sort[] = array('property'=>'vkid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_region= $this->m_vk_region->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_region= $this->m_vk_region->getRows($sort);
                }
            }else{
              $vk_region= $this->m_vk_region->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_region
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_REGION.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_region= $this->m_vk_region->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_region
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
        log_message('debug', 'VK_REGION.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'vkid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_region= $this->m_vk_region->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_region
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
        log_message('debug', 'VK_REGION.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_regionid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_region->deleteRow($tempId);
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
        $this->load->model('M_vk_region', 'm_vk_region');
    }
}
?>
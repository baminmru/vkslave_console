﻿<?php
	 class C_vk_rotads extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ROTADS.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ROTADS.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_rotadsid' =>  $this->input->get_post('vk_rotadsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'ads' =>   $this->input->get_post('ads', TRUE)
                ,'adweight' =>   $this->input->get_post('adweight', TRUE)
            );
            $vk_rotads = $this->m_vk_rotads->setRow($data);
            print json_encode($vk_rotads);
    }
    function newRow() {
            log_message('debug', 'VK_ROTADS.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_rotadsid' =>  $this->input->get_post('vk_rotadsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'ads' =>   $this->input->get_post('ads', TRUE)
                ,'adweight' =>   $this->input->get_post('adweight', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_rotads= $this->m_vk_rotads->newRow($instanceid,$data);
            $return = $vk_rotads;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ROTADS.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_rotads = $this->m_vk_rotads->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_rotads
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
            	$sort[] = array('property'=>'ads', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_rotads= $this->m_vk_rotads->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_rotads= $this->m_vk_rotads->getRows($sort);
                }
            }else{
              $vk_rotads= $this->m_vk_rotads->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_rotads
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ROTADS.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'ads', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_rotads= $this->m_vk_rotads->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_rotads
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
        log_message('debug', 'VK_ROTADS.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'ads', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_rotads= $this->m_vk_rotads->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_rotads
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
        log_message('debug', 'VK_ROTADS.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_rotadsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_rotads->deleteRow($tempId);
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
        $this->load->model('M_vk_rotads', 'm_vk_rotads');
    }
}
?>
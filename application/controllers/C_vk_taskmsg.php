﻿<?php
	 class C_vk_taskmsg extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TASKMSG.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TASKMSG.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_taskmsgid' =>  $this->input->get_post('vk_taskmsgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'msgdate' =>   $this->input->get_post('msgdate', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'okmsg' =>   $this->input->get_post('okmsg', TRUE)
            );
            $vk_taskmsg = $this->m_vk_taskmsg->setRow($data);
            print json_encode($vk_taskmsg);
    }
    function newRow() {
            log_message('debug', 'VK_TASKMSG.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_taskmsgid' =>  $this->input->get_post('vk_taskmsgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'msgdate' =>   $this->input->get_post('msgdate', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'okmsg' =>   $this->input->get_post('okmsg', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_taskmsg= $this->m_vk_taskmsg->newRow($instanceid,$data);
            $return = $vk_taskmsg;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TASKMSG.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_taskmsg = $this->m_vk_taskmsg->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_taskmsg
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
            	$sort[] = array('property'=>'msgdate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_taskmsg= $this->m_vk_taskmsg->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_taskmsg= $this->m_vk_taskmsg->getRows($sort);
                }
            }else{
              $vk_taskmsg= $this->m_vk_taskmsg->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_taskmsg
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TASKMSG.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'msgdate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_taskmsg= $this->m_vk_taskmsg->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_taskmsg
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
        log_message('debug', 'VK_TASKMSG.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'msgdate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_taskmsg= $this->m_vk_taskmsg->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_taskmsg
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
        log_message('debug', 'VK_TASKMSG.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_taskmsgid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_taskmsg->deleteRow($tempId);
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
        $this->load->model('M_vk_taskmsg', 'm_vk_taskmsg');
    }
}
?>
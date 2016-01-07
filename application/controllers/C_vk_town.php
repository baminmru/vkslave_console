<?php
	 class C_vk_town extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_TOWN.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_TOWN.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_townid' =>  $this->input->get_post('vk_townid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'country_id' =>   $this->input->get_post('country_id', TRUE)
                ,'region_id' =>   $this->input->get_post('region_id', TRUE)
            );
            $vk_town = $this->m_vk_town->setRow($data);
            print json_encode($vk_town);
    }
    function newRow() {
            log_message('debug', 'VK_TOWN.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_townid' =>  $this->input->get_post('vk_townid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'vkid' =>   $this->input->get_post('vkid', TRUE)
                ,'country_id' =>   $this->input->get_post('country_id', TRUE)
                ,'region_id' =>   $this->input->get_post('region_id', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_town= $this->m_vk_town->newRow($instanceid,$data);
            $return = $vk_town;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_TOWN.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_town = $this->m_vk_town->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_town
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
                    $vk_town= $this->m_vk_town->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_town= $this->m_vk_town->getRows($sort);
                }
            }else{
              $vk_town= $this->m_vk_town->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_town
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_TOWN.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_town= $this->m_vk_town->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_town
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
        log_message('debug', 'VK_TOWN.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_town= $this->m_vk_town->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_town
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
        log_message('debug', 'VK_TOWN.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_townid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_town->deleteRow($tempId);
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
        $this->load->model('M_vk_town', 'm_vk_town');
    }
}
?>
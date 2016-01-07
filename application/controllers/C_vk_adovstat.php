<?php
	 class C_vk_adovstat extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADOVSTAT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADOVSTAT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adovstatid' =>  $this->input->get_post('vk_adovstatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'spent' =>   $this->input->get_post('spent', TRUE)
                ,'join_rate' =>   $this->input->get_post('join_rate', TRUE)
                ,'impressions' =>   $this->input->get_post('impressions', TRUE)
                ,'clicks' =>   $this->input->get_post('clicks', TRUE)
                ,'reach' =>   $this->input->get_post('reach', TRUE)
                ,'video_views' =>   $this->input->get_post('video_views', TRUE)
                ,'video_views_half' =>   $this->input->get_post('video_views_half', TRUE)
                ,'video_views_full' =>   $this->input->get_post('video_views_full', TRUE)
                ,'video_clicks_site' =>   $this->input->get_post('video_clicks_site', TRUE)
            );
            $vk_adovstat = $this->m_vk_adovstat->setRow($data);
            print json_encode($vk_adovstat);
    }
    function newRow() {
            log_message('debug', 'VK_ADOVSTAT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adovstatid' =>  $this->input->get_post('vk_adovstatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'spent' =>   $this->input->get_post('spent', TRUE)
                ,'join_rate' =>   $this->input->get_post('join_rate', TRUE)
                ,'impressions' =>   $this->input->get_post('impressions', TRUE)
                ,'clicks' =>   $this->input->get_post('clicks', TRUE)
                ,'reach' =>   $this->input->get_post('reach', TRUE)
                ,'video_views' =>   $this->input->get_post('video_views', TRUE)
                ,'video_views_half' =>   $this->input->get_post('video_views_half', TRUE)
                ,'video_views_full' =>   $this->input->get_post('video_views_full', TRUE)
                ,'video_clicks_site' =>   $this->input->get_post('video_clicks_site', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adovstat= $this->m_vk_adovstat->newRow($instanceid,$data);
            $return = $vk_adovstat;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADOVSTAT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adovstat = $this->m_vk_adovstat->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adovstat
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
            	$sort[] = array('property'=>'spent', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_adovstat= $this->m_vk_adovstat->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adovstat= $this->m_vk_adovstat->getRows($sort);
                }
            }else{
              $vk_adovstat= $this->m_vk_adovstat->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adovstat
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADOVSTAT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'spent', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_adovstat= $this->m_vk_adovstat->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adovstat
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
        log_message('debug', 'VK_ADOVSTAT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'spent', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_adovstat= $this->m_vk_adovstat->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adovstat
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
        log_message('debug', 'VK_ADOVSTAT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adovstatid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adovstat->deleteRow($tempId);
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
        $this->load->model('M_vk_adovstat', 'm_vk_adovstat');
    }
}
?>
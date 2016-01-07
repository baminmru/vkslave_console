<?php
	 class C_vk_camovstat extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_CAMOVSTAT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_CAMOVSTAT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_camovstatid' =>  $this->input->get_post('vk_camovstatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'join_rate' =>   $this->input->get_post('join_rate', TRUE)
                ,'spent' =>   $this->input->get_post('spent', TRUE)
                ,'clicks' =>   $this->input->get_post('clicks', TRUE)
                ,'impressions' =>   $this->input->get_post('impressions', TRUE)
                ,'video_views' =>   $this->input->get_post('video_views', TRUE)
                ,'video_clicks_site' =>   $this->input->get_post('video_clicks_site', TRUE)
                ,'video_views_half' =>   $this->input->get_post('video_views_half', TRUE)
                ,'video_views_full' =>   $this->input->get_post('video_views_full', TRUE)
                ,'reach' =>   $this->input->get_post('reach', TRUE)
            );
            $vk_camovstat = $this->m_vk_camovstat->setRow($data);
            print json_encode($vk_camovstat);
    }
    function newRow() {
            log_message('debug', 'VK_CAMOVSTAT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_camovstatid' =>  $this->input->get_post('vk_camovstatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'join_rate' =>   $this->input->get_post('join_rate', TRUE)
                ,'spent' =>   $this->input->get_post('spent', TRUE)
                ,'clicks' =>   $this->input->get_post('clicks', TRUE)
                ,'impressions' =>   $this->input->get_post('impressions', TRUE)
                ,'video_views' =>   $this->input->get_post('video_views', TRUE)
                ,'video_clicks_site' =>   $this->input->get_post('video_clicks_site', TRUE)
                ,'video_views_half' =>   $this->input->get_post('video_views_half', TRUE)
                ,'video_views_full' =>   $this->input->get_post('video_views_full', TRUE)
                ,'reach' =>   $this->input->get_post('reach', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_camovstat= $this->m_vk_camovstat->newRow($instanceid,$data);
            $return = $vk_camovstat;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_CAMOVSTAT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_camovstat = $this->m_vk_camovstat->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_camovstat
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
                    $vk_camovstat= $this->m_vk_camovstat->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_camovstat= $this->m_vk_camovstat->getRows($sort);
                }
            }else{
              $vk_camovstat= $this->m_vk_camovstat->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_camovstat
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_CAMOVSTAT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_camovstat= $this->m_vk_camovstat->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_camovstat
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
        log_message('debug', 'VK_CAMOVSTAT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_camovstat= $this->m_vk_camovstat->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_camovstat
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
        log_message('debug', 'VK_CAMOVSTAT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_camovstatid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_camovstat->deleteRow($tempId);
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
        $this->load->model('M_vk_camovstat', 'm_vk_camovstat');
    }
}
?>
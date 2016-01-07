<?php
	 class C_vk_camstat extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_CAMSTAT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_CAMSTAT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_camstatid' =>  $this->input->get_post('vk_camstatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'join_rate' =>   $this->input->get_post('join_rate', TRUE)
                ,'overal' =>   $this->input->get_post('overal', TRUE)
                ,'s_day' =>   $this->input->get_post('s_day', TRUE)
                ,'spent' =>   $this->input->get_post('spent', TRUE)
                ,'video_views' =>   $this->input->get_post('video_views', TRUE)
                ,'impressions' =>   $this->input->get_post('impressions', TRUE)
                ,'video_views_full' =>   $this->input->get_post('video_views_full', TRUE)
                ,'reach' =>   $this->input->get_post('reach', TRUE)
                ,'s_month' =>   $this->input->get_post('s_month', TRUE)
                ,'video_views_half' =>   $this->input->get_post('video_views_half', TRUE)
                ,'period' =>   $this->input->get_post('period', TRUE)
                ,'clicks' =>   $this->input->get_post('clicks', TRUE)
                ,'video_clicks_site' =>   $this->input->get_post('video_clicks_site', TRUE)
            );
            $vk_camstat = $this->m_vk_camstat->setRow($data);
            print json_encode($vk_camstat);
    }
    function newRow() {
            log_message('debug', 'VK_CAMSTAT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_camstatid' =>  $this->input->get_post('vk_camstatid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'join_rate' =>   $this->input->get_post('join_rate', TRUE)
                ,'overal' =>   $this->input->get_post('overal', TRUE)
                ,'s_day' =>   $this->input->get_post('s_day', TRUE)
                ,'spent' =>   $this->input->get_post('spent', TRUE)
                ,'video_views' =>   $this->input->get_post('video_views', TRUE)
                ,'impressions' =>   $this->input->get_post('impressions', TRUE)
                ,'video_views_full' =>   $this->input->get_post('video_views_full', TRUE)
                ,'reach' =>   $this->input->get_post('reach', TRUE)
                ,'s_month' =>   $this->input->get_post('s_month', TRUE)
                ,'video_views_half' =>   $this->input->get_post('video_views_half', TRUE)
                ,'period' =>   $this->input->get_post('period', TRUE)
                ,'clicks' =>   $this->input->get_post('clicks', TRUE)
                ,'video_clicks_site' =>   $this->input->get_post('video_clicks_site', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_camstat= $this->m_vk_camstat->newRow($instanceid,$data);
            $return = $vk_camstat;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_CAMSTAT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_camstat = $this->m_vk_camstat->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_camstat
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
            	$sort[] = array('property'=>'overal', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_camstat= $this->m_vk_camstat->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_camstat= $this->m_vk_camstat->getRows($sort);
                }
            }else{
              $vk_camstat= $this->m_vk_camstat->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_camstat
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_CAMSTAT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'overal', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_camstat= $this->m_vk_camstat->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_camstat
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
        log_message('debug', 'VK_CAMSTAT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'overal', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_camstat= $this->m_vk_camstat->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_camstat
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
        log_message('debug', 'VK_CAMSTAT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_camstatid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_camstat->deleteRow($tempId);
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
        $this->load->model('M_vk_camstat', 'm_vk_camstat');
    }
}
?>
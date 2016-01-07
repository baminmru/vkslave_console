<?php
	 class C_vk_adinfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADINFO.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADINFO.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adinfoid' =>  $this->input->get_post('vk_adinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'ads_id' =>   $this->input->get_post('ads_id', TRUE)
                ,'campaign_id' =>   $this->input->get_post('campaign_id', TRUE)
                ,'ad_format' =>   $this->input->get_post('ad_format', TRUE)
                ,'age_restriction' =>   $this->input->get_post('age_restriction', TRUE)
                ,'cost_type' =>   $this->input->get_post('cost_type', TRUE)
                ,'cpc' =>   $this->input->get_post('cpc', TRUE)
                ,'cpm' =>   $this->input->get_post('cpm', TRUE)
                ,'ad_platform' =>   $this->input->get_post('ad_platform', TRUE)
                ,'category1_id' =>   $this->input->get_post('category1_id', TRUE)
                ,'category2_id' =>   $this->input->get_post('category2_id', TRUE)
                ,'status' =>   $this->input->get_post('status', TRUE)
                ,'impression_limit' =>   $this->input->get_post('impression_limit', TRUE)
                ,'all_limit' =>   $this->input->get_post('all_limit', TRUE)
                ,'approved' =>   $this->input->get_post('approved', TRUE)
                ,'video' =>   $this->input->get_post('video', TRUE)
                ,'disclamer' =>   $this->input->get_post('disclamer', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'_description' =>   $this->input->get_post('_description', TRUE)
                ,'link_url' =>   $this->input->get_post('link_url', TRUE)
                ,'link_domain' =>   $this->input->get_post('link_domain', TRUE)
                ,'preview_link' =>   $this->input->get_post('preview_link', TRUE)
                ,'image_src' =>   $this->input->get_post('image_src', TRUE)
            );
            $vk_adinfo = $this->m_vk_adinfo->setRow($data);
            print json_encode($vk_adinfo);
    }
    function newRow() {
            log_message('debug', 'VK_ADINFO.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adinfoid' =>  $this->input->get_post('vk_adinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'ads_id' =>   $this->input->get_post('ads_id', TRUE)
                ,'campaign_id' =>   $this->input->get_post('campaign_id', TRUE)
                ,'ad_format' =>   $this->input->get_post('ad_format', TRUE)
                ,'age_restriction' =>   $this->input->get_post('age_restriction', TRUE)
                ,'cost_type' =>   $this->input->get_post('cost_type', TRUE)
                ,'cpc' =>   $this->input->get_post('cpc', TRUE)
                ,'cpm' =>   $this->input->get_post('cpm', TRUE)
                ,'ad_platform' =>   $this->input->get_post('ad_platform', TRUE)
                ,'category1_id' =>   $this->input->get_post('category1_id', TRUE)
                ,'category2_id' =>   $this->input->get_post('category2_id', TRUE)
                ,'status' =>   $this->input->get_post('status', TRUE)
                ,'impression_limit' =>   $this->input->get_post('impression_limit', TRUE)
                ,'all_limit' =>   $this->input->get_post('all_limit', TRUE)
                ,'approved' =>   $this->input->get_post('approved', TRUE)
                ,'video' =>   $this->input->get_post('video', TRUE)
                ,'disclamer' =>   $this->input->get_post('disclamer', TRUE)
                ,'title' =>   $this->input->get_post('title', TRUE)
                ,'_description' =>   $this->input->get_post('_description', TRUE)
                ,'link_url' =>   $this->input->get_post('link_url', TRUE)
                ,'link_domain' =>   $this->input->get_post('link_domain', TRUE)
                ,'preview_link' =>   $this->input->get_post('preview_link', TRUE)
                ,'image_src' =>   $this->input->get_post('image_src', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adinfo= $this->m_vk_adinfo->newRow($instanceid,$data);
            $return = $vk_adinfo;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADINFO.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adinfo = $this->m_vk_adinfo->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adinfo
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
                    $vk_adinfo= $this->m_vk_adinfo->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adinfo= $this->m_vk_adinfo->getRows($sort);
                }
            }else{
              $vk_adinfo= $this->m_vk_adinfo->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adinfo
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADINFO.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_adinfo= $this->m_vk_adinfo->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adinfo
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
        log_message('debug', 'VK_ADINFO.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $vk_adinfo= $this->m_vk_adinfo->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adinfo
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
        log_message('debug', 'VK_ADINFO.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adinfoid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adinfo->deleteRow($tempId);
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
        $this->load->model('M_vk_adinfo', 'm_vk_adinfo');
    }
}
?>
<?php
	 class C_vk_adstrg extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VK_ADSTRG.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VK_ADSTRG.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'vk_adstrgid' =>  $this->input->get_post('vk_adstrgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sex' =>   $this->input->get_post('sex', TRUE)
                ,'birthday' =>   $this->input->get_post('birthday', TRUE)
                ,'statuses' =>   $this->input->get_post('statuses', TRUE)
                ,'positions' =>   $this->input->get_post('positions', TRUE)
                ,'paying' =>   $this->input->get_post('paying', TRUE)
                ,'age_from' =>   $this->input->get_post('age_from', TRUE)
                ,'age_to' =>   $this->input->get_post('age_to', TRUE)
                ,'school_from' =>   $this->input->get_post('school_from', TRUE)
                ,'school_to' =>   $this->input->get_post('school_to', TRUE)
                ,'uni_from' =>   $this->input->get_post('uni_from', TRUE)
                ,'uni_to' =>   $this->input->get_post('uni_to', TRUE)
                ,'country' =>   $this->input->get_post('country', TRUE)
                ,'cities' =>   $this->input->get_post('cities', TRUE)
                ,'cities_not' =>   $this->input->get_post('cities_not', TRUE)
                ,'districts' =>   $this->input->get_post('districts', TRUE)
                ,'stations' =>   $this->input->get_post('stations', TRUE)
                ,'streets' =>   $this->input->get_post('streets', TRUE)
                ,'religions' =>   $this->input->get_post('religions', TRUE)
                ,'interests' =>   $this->input->get_post('interests', TRUE)
                ,'interest_categories' =>   $this->input->get_post('interest_categories', TRUE)
                ,'travellers' =>   $this->input->get_post('travellers', TRUE)
                ,'groups' =>   $this->input->get_post('groups', TRUE)
                ,'groups_not' =>   $this->input->get_post('groups_not', TRUE)
                ,'apps' =>   $this->input->get_post('apps', TRUE)
                ,'apps_not' =>   $this->input->get_post('apps_not', TRUE)
                ,'user_devices' =>   $this->input->get_post('user_devices', TRUE)
                ,'user_os' =>   $this->input->get_post('user_os', TRUE)
                ,'user_browsers' =>   $this->input->get_post('user_browsers', TRUE)
                ,'retargeting_groups' =>   $this->input->get_post('retargeting_groups', TRUE)
                ,'retargeting_groups_not' =>   $this->input->get_post('retargeting_groups_not', TRUE)
            );
            $vk_adstrg = $this->m_vk_adstrg->setRow($data);
            print json_encode($vk_adstrg);
    }
    function newRow() {
            log_message('debug', 'VK_ADSTRG.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'vk_adstrgid' =>  $this->input->get_post('vk_adstrgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sex' =>   $this->input->get_post('sex', TRUE)
                ,'birthday' =>   $this->input->get_post('birthday', TRUE)
                ,'statuses' =>   $this->input->get_post('statuses', TRUE)
                ,'positions' =>   $this->input->get_post('positions', TRUE)
                ,'paying' =>   $this->input->get_post('paying', TRUE)
                ,'age_from' =>   $this->input->get_post('age_from', TRUE)
                ,'age_to' =>   $this->input->get_post('age_to', TRUE)
                ,'school_from' =>   $this->input->get_post('school_from', TRUE)
                ,'school_to' =>   $this->input->get_post('school_to', TRUE)
                ,'uni_from' =>   $this->input->get_post('uni_from', TRUE)
                ,'uni_to' =>   $this->input->get_post('uni_to', TRUE)
                ,'country' =>   $this->input->get_post('country', TRUE)
                ,'cities' =>   $this->input->get_post('cities', TRUE)
                ,'cities_not' =>   $this->input->get_post('cities_not', TRUE)
                ,'districts' =>   $this->input->get_post('districts', TRUE)
                ,'stations' =>   $this->input->get_post('stations', TRUE)
                ,'streets' =>   $this->input->get_post('streets', TRUE)
                ,'religions' =>   $this->input->get_post('religions', TRUE)
                ,'interests' =>   $this->input->get_post('interests', TRUE)
                ,'interest_categories' =>   $this->input->get_post('interest_categories', TRUE)
                ,'travellers' =>   $this->input->get_post('travellers', TRUE)
                ,'groups' =>   $this->input->get_post('groups', TRUE)
                ,'groups_not' =>   $this->input->get_post('groups_not', TRUE)
                ,'apps' =>   $this->input->get_post('apps', TRUE)
                ,'apps_not' =>   $this->input->get_post('apps_not', TRUE)
                ,'user_devices' =>   $this->input->get_post('user_devices', TRUE)
                ,'user_os' =>   $this->input->get_post('user_os', TRUE)
                ,'user_browsers' =>   $this->input->get_post('user_browsers', TRUE)
                ,'retargeting_groups' =>   $this->input->get_post('retargeting_groups', TRUE)
                ,'retargeting_groups_not' =>   $this->input->get_post('retargeting_groups_not', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $vk_adstrg= $this->m_vk_adstrg->newRow($instanceid,$data);
            $return = $vk_adstrg;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VK_ADSTRG.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $vk_adstrg = $this->m_vk_adstrg->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $vk_adstrg
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
            	$sort[] = array('property'=>'sex', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $vk_adstrg= $this->m_vk_adstrg->getRowsByInstance($instanceid,$sort);
                }else{
                    $vk_adstrg= $this->m_vk_adstrg->getRows($sort);
                }
            }else{
              $vk_adstrg= $this->m_vk_adstrg->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adstrg
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VK_ADSTRG.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sex', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $vk_adstrg= $this->m_vk_adstrg->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $vk_adstrg
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
        log_message('debug', 'VK_ADSTRG.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sex', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $vk_adstrg= $this->m_vk_adstrg->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $vk_adstrg
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
        log_message('debug', 'VK_ADSTRG.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('vk_adstrgid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_vk_adstrg->deleteRow($tempId);
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
        $this->load->model('M_vk_adstrg', 'm_vk_adstrg');
    }
}
?>
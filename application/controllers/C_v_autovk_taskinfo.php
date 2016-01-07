
    <?php
	 class C_v_autovk_taskinfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function newRow() {
            log_message('debug', 'AUTOVK_TASKINFO.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
            $name  =  $this->input->get_post('name', TRUE);
            $objtype  =  $this->input->get_post('objtype', TRUE);
            $autovk_taskinfo= $this->m_v_autovk_taskinfo->newRow($name,$objtype);
            $return = $autovk_taskinfo;
            print json_encode($return);
    }
    function getRows() {
            log_message('debug', 'AUTOVK_TASKINFO.getRows post : '.json_encode($this->input->post(NULL, FALSE)));
           $start=$this->input->get('start', FALSE);
           $limit=$this->input->get('limit', FALSE);
       $group = $this->input->get('group', FALSE);  
      $sort = $this->input->get('sort', FALSE);
      if(!$sort && $group) $sort = $group;
      if(!$sort || $group == $sort) 
          {
              $sort = json_decode($sort);
              //$sort[] = array('property'=>'field_name', 'direction'=>'ASC');
              $sort = json_encode($sort);
          }
          $filter = $this->input->get('filter', FALSE);
           $autovk_taskinfo= $this->m_v_autovk_taskinfo->getRowsSL($start,$limit,$sort,$filter);
           print json_encode($autovk_taskinfo);
    }
    function deleteRow() {
        log_message('debug', 'AUTOVK_TASKINFO.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_v_autovk_taskinfo->deleteRow($tempId);
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
        $this->load->model('M_v_autovk_taskinfo', 'm_v_autovk_taskinfo');
    }
}
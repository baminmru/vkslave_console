
<?php
class  M_v_autovk_camp extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'VKCAM', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'vk_camp', 'RowID'=>$rowid, 'DocumentID'=>$id));
                if ($id) {
                    return array('success'=>TRUE, 'data' => $id, 'rowid'=>$rowid);
                }
                else {
                    $return= array('success'=>FALSE, 'msg' => 'Error while create new id');
				    return $return;
                }
    }
      function getRowsSL($offset,$limit, $sort = array(), $filter = null){
        $filter = (array)json_decode($filter);
       	$cond ='';
        $whereclause = '';
    try{
	    foreach($filter as $obj) {
		    $tmp = json_decode($obj->value);
		    if(is_array($tmp)) $obj->value = $tmp;	
		    switch($obj->property) {
			    //case 'value':
			    	//$cond = '';
			    	//break;
			  case 'vk_camp_day_limit_le':
			  $cond = 'vk_camp_day_limit<='.$obj->value;
			  break;
			  case 'vk_camp_day_limit_ge':
			  $cond = 'vk_camp_day_limit>='.$obj->value;
			  break;
			  case 'vk_camp_stop_time_le':
			  $cond = 'vk_camp_stop_time<="'.$obj->value.'"';
			  break;
			  case 'vk_camp_stop_time_ge':
			  $cond = 'vk_camp_stop_time>="'.$obj->value.'"';
			  break;
			  case 'vk_camp_all_limit_le':
			  $cond = 'vk_camp_all_limit<='.$obj->value;
			  break;
			  case 'vk_camp_all_limit_ge':
			  $cond = 'vk_camp_all_limit>='.$obj->value;
			  break;
			  case 'vk_camp_start_time_le':
			  $cond = 'vk_camp_start_time<="'.$obj->value.'"';
			  break;
			  case 'vk_camp_start_time_ge':
			  $cond = 'vk_camp_start_time>="'.$obj->value.'"';
			  break;
		    	default:
			    	if(isset($obj->value))
			    	{
			    		if(is_array($obj->value))
				    	{
				    		$cond = $obj->property . ' IN ("' . implode('", "',$obj->value).'") ';
				    		//echo $cond;
					    }else
					    {
					    	$cond = $obj->property . ' LIKE "%' . $obj->value . '%"';
					    }
				    }else{
				        $cond='1=1';
				    }
		    }
		    $whereclause .= (empty($whereclause)) ? $cond : ' AND ' . $cond;
	    }
    }catch(Exception $e) {
	    log_message('error','Exception: '. $e->getMessage());
    }
	 if (isset($offset) && isset($limit)) {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_camp','FieldList'=>'instanceid,id,vk_camp_day_limit,vk_camp_vk_usr,vk_camp_name,DATE_FORMAT(vk_camp_stop_time,\'%Y-%m-%d %H:%i:%s\') vk_camp_stop_time,vk_camp_status,vk_camp_campagin_id,vk_camp_all_limit,DATE_FORMAT(vk_camp_start_time,\'%Y-%m-%d %H:%i:%s\') vk_camp_start_time,vk_camp_prj,vk_camp_vk_cab','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_camp','FieldList'=>'instanceid,id,vk_camp_day_limit,vk_camp_vk_usr,vk_camp_name,DATE_FORMAT(vk_camp_stop_time,\'%Y-%m-%d %H:%i:%s\') vk_camp_stop_time,vk_camp_status,vk_camp_campagin_id,vk_camp_all_limit,DATE_FORMAT(vk_camp_start_time,\'%Y-%m-%d %H:%i:%s\') vk_camp_start_time,vk_camp_prj,vk_camp_vk_cab','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autovk_camp','FieldList'=>'instanceid,id,vk_camp_day_limit,vk_camp_vk_usr,vk_camp_name,DATE_FORMAT(vk_camp_stop_time,\'%Y-%m-%d %H:%i:%s\') vk_camp_stop_time,vk_camp_status,vk_camp_campagin_id,vk_camp_all_limit,DATE_FORMAT(vk_camp_start_time,\'%Y-%m-%d %H:%i:%s\') vk_camp_start_time,vk_camp_prj,vk_camp_vk_cab', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'vkcam', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
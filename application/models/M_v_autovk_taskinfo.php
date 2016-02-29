
<?php
class  M_v_autovk_taskinfo extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'VKTSK', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'vk_taskinfo', 'RowID'=>$rowid, 'DocumentID'=>$id));
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
			  case 'vk_taskinfo_lastdate_le':
			  $cond = 'vk_taskinfo_lastdate<="'.$obj->value.'"';
			  break;
			  case 'vk_taskinfo_lastdate_ge':
			  $cond = 'vk_taskinfo_lastdate>="'.$obj->value.'"';
			  break;
			  case 'vk_taskinfo_repeat_interval_le':
			  $cond = 'vk_taskinfo_repeat_interval<='.$obj->value;
			  break;
			  case 'vk_taskinfo_repeat_interval_ge':
			  $cond = 'vk_taskinfo_repeat_interval>='.$obj->value;
			  break;
			  case 'vk_taskinfo_crdate_le':
			  $cond = 'vk_taskinfo_crdate<="'.$obj->value.'"';
			  break;
			  case 'vk_taskinfo_crdate_ge':
			  $cond = 'vk_taskinfo_crdate>="'.$obj->value.'"';
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_taskinfo','FieldList'=>'instanceid,id,DATE_FORMAT(vk_taskinfo_lastdate,\'%Y-%m-%d %H:%i:%s\') vk_taskinfo_lastdate,vk_taskinfo_vkusr,vk_taskinfo_name,vk_taskinfo_result,vk_taskinfo_ads,vk_taskinfo_repeat_interval,vk_taskinfo_isdone,DATE_FORMAT(vk_taskinfo_crdate,\'%Y-%m-%d %H:%i:%s\') vk_taskinfo_crdate,vk_taskinfo_rotation,vk_taskinfo_cab,vk_taskinfo_camp,vk_taskinfo_tasktype','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_taskinfo','FieldList'=>'instanceid,id,DATE_FORMAT(vk_taskinfo_lastdate,\'%Y-%m-%d %H:%i:%s\') vk_taskinfo_lastdate,vk_taskinfo_vkusr,vk_taskinfo_name,vk_taskinfo_result,vk_taskinfo_ads,vk_taskinfo_repeat_interval,vk_taskinfo_isdone,DATE_FORMAT(vk_taskinfo_crdate,\'%Y-%m-%d %H:%i:%s\') vk_taskinfo_crdate,vk_taskinfo_rotation,vk_taskinfo_cab,vk_taskinfo_camp,vk_taskinfo_tasktype','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autovk_taskinfo','FieldList'=>'instanceid,id,DATE_FORMAT(vk_taskinfo_lastdate,\'%Y-%m-%d %H:%i:%s\') vk_taskinfo_lastdate,vk_taskinfo_vkusr,vk_taskinfo_name,vk_taskinfo_result,vk_taskinfo_ads,vk_taskinfo_repeat_interval,vk_taskinfo_isdone,DATE_FORMAT(vk_taskinfo_crdate,\'%Y-%m-%d %H:%i:%s\') vk_taskinfo_crdate,vk_taskinfo_rotation,vk_taskinfo_cab,vk_taskinfo_camp,vk_taskinfo_tasktype', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'vktsk', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
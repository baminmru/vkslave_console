
<?php
class  M_v_autovk_trginfo extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'VKTRG', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'vk_trginfo', 'RowID'=>$rowid, 'DocumentID'=>$id));
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
			  case 'vk_trginfo_lifetime_le':
			  $cond = 'vk_trginfo_lifetime<='.$obj->value;
			  break;
			  case 'vk_trginfo_lifetime_ge':
			  $cond = 'vk_trginfo_lifetime>='.$obj->value;
			  break;
			  case 'vk_trginfo_audience_count_le':
			  $cond = 'vk_trginfo_audience_count<='.$obj->value;
			  break;
			  case 'vk_trginfo_audience_count_ge':
			  $cond = 'vk_trginfo_audience_count>='.$obj->value;
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_trginfo','FieldList'=>'instanceid,id,vk_trginfo_lifetime,vk_trginfo_vkid,vk_trginfo_info,vk_trginfo_cab,vk_trginfo_pixel,vk_trginfo_audience_count,vk_trginfo_trgdomain,vk_trginfo_name','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_trginfo','FieldList'=>'instanceid,id,vk_trginfo_lifetime,vk_trginfo_vkid,vk_trginfo_info,vk_trginfo_cab,vk_trginfo_pixel,vk_trginfo_audience_count,vk_trginfo_trgdomain,vk_trginfo_name','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autovk_trginfo','FieldList'=>'instanceid,id,vk_trginfo_lifetime,vk_trginfo_vkid,vk_trginfo_info,vk_trginfo_cab,vk_trginfo_pixel,vk_trginfo_audience_count,vk_trginfo_trgdomain,vk_trginfo_name', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'vktrg', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>

<?php
class  M_v_autovk_usr extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'VKUSR', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'vk_usr', 'RowID'=>$rowid, 'DocumentID'=>$id));
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_usr','FieldList'=>'instanceid,id,vk_usr_online,vk_usr_home_town,vk_usr_status,vk_usr_vkid,vk_usr_bdate,vk_usr_photo_50,vk_usr_photo_id,vk_usr_first_name,vk_usr_sex,vk_usr_country,vk_usr_photo_100,vk_usr_has_photo,vk_usr_deactivated,vk_usr_last_name','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_usr','FieldList'=>'instanceid,id,vk_usr_online,vk_usr_home_town,vk_usr_status,vk_usr_vkid,vk_usr_bdate,vk_usr_photo_50,vk_usr_photo_id,vk_usr_first_name,vk_usr_sex,vk_usr_country,vk_usr_photo_100,vk_usr_has_photo,vk_usr_deactivated,vk_usr_last_name','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autovk_usr','FieldList'=>'instanceid,id,vk_usr_online,vk_usr_home_town,vk_usr_status,vk_usr_vkid,vk_usr_bdate,vk_usr_photo_50,vk_usr_photo_id,vk_usr_first_name,vk_usr_sex,vk_usr_country,vk_usr_photo_100,vk_usr_has_photo,vk_usr_deactivated,vk_usr_last_name', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'vkusr', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
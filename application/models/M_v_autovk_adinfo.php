
<?php
class  M_v_autovk_adinfo extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'VKADS', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'vk_adinfo', 'RowID'=>$rowid, 'DocumentID'=>$id));
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
			  case 'vk_adinfo_cpm_le':
			  $cond = 'vk_adinfo_cpm<='.$obj->value;
			  break;
			  case 'vk_adinfo_cpm_ge':
			  $cond = 'vk_adinfo_cpm>='.$obj->value;
			  break;
			  case 'vk_adinfo_cpc_le':
			  $cond = 'vk_adinfo_cpc<='.$obj->value;
			  break;
			  case 'vk_adinfo_cpc_ge':
			  $cond = 'vk_adinfo_cpc>='.$obj->value;
			  break;
			  case 'vk_adinfo_all_limit_le':
			  $cond = 'vk_adinfo_all_limit<='.$obj->value;
			  break;
			  case 'vk_adinfo_all_limit_ge':
			  $cond = 'vk_adinfo_all_limit>='.$obj->value;
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_adinfo','FieldList'=>'instanceid,id,vk_adinfo_campaign_id,vk_adinfo_impression_limit,vk_adinfo_ad_platform,vk_adinfo_cpm,vk_adinfo_cost_type,vk_adinfo_video,vk_adinfo_link_url,vk_adinfo_category2_id,vk_adinfo_cpc,vk_adinfo__description,vk_adinfo_ad_format,vk_adinfo_preview_link,vk_adinfo_name,vk_adinfo_approved,vk_adinfo_status,vk_adinfo_all_limit,vk_adinfo_link_domain,vk_adinfo_title,vk_adinfo_age_restriction,vk_adinfo_image_src,vk_adinfo_category1_id,vk_adinfo_ads_id,vk_adinfo_disclamer','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autovk_adinfo','FieldList'=>'instanceid,id,vk_adinfo_campaign_id,vk_adinfo_impression_limit,vk_adinfo_ad_platform,vk_adinfo_cpm,vk_adinfo_cost_type,vk_adinfo_video,vk_adinfo_link_url,vk_adinfo_category2_id,vk_adinfo_cpc,vk_adinfo__description,vk_adinfo_ad_format,vk_adinfo_preview_link,vk_adinfo_name,vk_adinfo_approved,vk_adinfo_status,vk_adinfo_all_limit,vk_adinfo_link_domain,vk_adinfo_title,vk_adinfo_age_restriction,vk_adinfo_image_src,vk_adinfo_category1_id,vk_adinfo_ads_id,vk_adinfo_disclamer','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autovk_adinfo','FieldList'=>'instanceid,id,vk_adinfo_campaign_id,vk_adinfo_impression_limit,vk_adinfo_ad_platform,vk_adinfo_cpm,vk_adinfo_cost_type,vk_adinfo_video,vk_adinfo_link_url,vk_adinfo_category2_id,vk_adinfo_cpc,vk_adinfo__description,vk_adinfo_ad_format,vk_adinfo_preview_link,vk_adinfo_name,vk_adinfo_approved,vk_adinfo_status,vk_adinfo_all_limit,vk_adinfo_link_domain,vk_adinfo_title,vk_adinfo_age_restriction,vk_adinfo_image_src,vk_adinfo_category1_id,vk_adinfo_ads_id,vk_adinfo_disclamer', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'vkads', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
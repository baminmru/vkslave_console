
<?php
class  M_vk_adinfo extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_adinfoid) as vk_adinfoid, B2G(vk_adinfoid) as id,B2G(instanceid) as instanceid, VK_ADINFO_BRIEF_F(vk_adinfoid , NULL) as  brief,name,ads_id,B2G(campaign_id) campaign_id, Vk_CAMP_BRIEF_F(campaign_id, NULL) as campaign_id_grid,B2G(ad_format) ad_format, VK_ADFORMAT_BRIEF_F(ad_format, NULL) as ad_format_grid,B2G(age_restriction) age_restriction, VK_AGE_BRIEF_F(age_restriction, NULL) as age_restriction_grid,B2G(cost_type) cost_type, VK_PAYTYPE_BRIEF_F(cost_type, NULL) as cost_type_grid,cpc,cpm,B2G(ad_platform) ad_platform, VK_PLATFORM_BRIEF_F(ad_platform, NULL) as ad_platform_grid,B2G(category1_id) category1_id, VK_CATEGORY_BRIEF_F(category1_id, NULL) as category1_id_grid,B2G(category2_id) category2_id, VK_CATEGORY_BRIEF_F(category2_id, NULL) as category2_id_grid,B2G(status) status, VK_ADSTATE_BRIEF_F(status, NULL) as status_grid,impression_limit, case impression_limit  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as impression_limit_grid,all_limit,B2G(approved) approved, VK_APPROVE_BRIEF_F(approved, NULL) as approved_grid,video, case video  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as video_grid,disclamer, case disclamer  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as disclamer_grid,title,_description,link_url,link_domain,preview_link,image_src', 'PartName' => 'vk_adinfo', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_adinfoid'])) {
	        $data['vk_adinfoid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_adinfo', 'RowID' => $data['vk_adinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_adinfo', 'RowID' => $data['vk_adinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_adinfoid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_adinfo', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_adinfoid) as vk_adinfoid, B2G(vk_adinfoid) as id,B2G(instanceid) as instanceid, VK_ADINFO_BRIEF_F(vk_adinfoid , NULL) as  brief,name,ads_id,B2G(campaign_id) campaign_id, Vk_CAMP_BRIEF_F(campaign_id, NULL) as campaign_id_grid,B2G(ad_format) ad_format, VK_ADFORMAT_BRIEF_F(ad_format, NULL) as ad_format_grid,B2G(age_restriction) age_restriction, VK_AGE_BRIEF_F(age_restriction, NULL) as age_restriction_grid,B2G(cost_type) cost_type, VK_PAYTYPE_BRIEF_F(cost_type, NULL) as cost_type_grid,cpc,cpm,B2G(ad_platform) ad_platform, VK_PLATFORM_BRIEF_F(ad_platform, NULL) as ad_platform_grid,B2G(category1_id) category1_id, VK_CATEGORY_BRIEF_F(category1_id, NULL) as category1_id_grid,B2G(category2_id) category2_id, VK_CATEGORY_BRIEF_F(category2_id, NULL) as category2_id_grid,B2G(status) status, VK_ADSTATE_BRIEF_F(status, NULL) as status_grid,impression_limit, case impression_limit  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as impression_limit_grid,all_limit,B2G(approved) approved, VK_APPROVE_BRIEF_F(approved, NULL) as approved_grid,video, case video  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as video_grid,disclamer, case disclamer  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as disclamer_grid,title,_description,link_url,link_domain,preview_link,image_src', 'ViewName' => 'vk_adinfo'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_adinfoid) as vk_adinfoid, B2G(vk_adinfoid) as id,B2G(instanceid) as instanceid, VK_ADINFO_BRIEF_F(vk_adinfoid , NULL) as  brief,name,ads_id,B2G(campaign_id) campaign_id, Vk_CAMP_BRIEF_F(campaign_id, NULL) as campaign_id_grid,B2G(ad_format) ad_format, VK_ADFORMAT_BRIEF_F(ad_format, NULL) as ad_format_grid,B2G(age_restriction) age_restriction, VK_AGE_BRIEF_F(age_restriction, NULL) as age_restriction_grid,B2G(cost_type) cost_type, VK_PAYTYPE_BRIEF_F(cost_type, NULL) as cost_type_grid,cpc,cpm,B2G(ad_platform) ad_platform, VK_PLATFORM_BRIEF_F(ad_platform, NULL) as ad_platform_grid,B2G(category1_id) category1_id, VK_CATEGORY_BRIEF_F(category1_id, NULL) as category1_id_grid,B2G(category2_id) category2_id, VK_CATEGORY_BRIEF_F(category2_id, NULL) as category2_id_grid,B2G(status) status, VK_ADSTATE_BRIEF_F(status, NULL) as status_grid,impression_limit, case impression_limit  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as impression_limit_grid,all_limit,B2G(approved) approved, VK_APPROVE_BRIEF_F(approved, NULL) as approved_grid,video, case video  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as video_grid,disclamer, case disclamer  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as disclamer_grid,title,_description,link_url,link_domain,preview_link,image_src', 'ViewName' => 'vk_adinfo', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_adinfo', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
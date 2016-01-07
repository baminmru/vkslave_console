
<?php
class  M_vk_adstrg extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_adstrgid) as vk_adstrgid, B2G(vk_adstrgid) as id,B2G(instanceid) as instanceid, VK_ADSTRG_BRIEF_F(vk_adstrgid , NULL) as  brief,sex, case sex  when 0 then \'Не существенно\' when 1 then \'Женский\' when 2 then \'Мужской\' else \'\'  end   as sex_grid,birthday,statuses, VK_MATRIALSTATUS_MREF_F(statuses, NULL) as  statuses_grid,positions, VK_POSITION_MREF_F(positions, NULL) as  positions_grid,paying,age_from,age_to,school_from,school_to,uni_from,uni_to,country, VK_COUNTRY_MREF_F(country, NULL) as  country_grid,cities, VK_TOWN_MREF_F(cities, NULL) as  cities_grid,cities_not, VK_TOWN_MREF_F(cities_not, NULL) as  cities_not_grid,districts,stations,streets,religions, VK_RELIGION_MREF_F(religions, NULL) as  religions_grid,interests, VK_INTEREST_MREF_F(interests, NULL) as  interests_grid,interest_categories, VK_CATEGORY_MREF_F(interest_categories, NULL) as  interest_categories_grid,travellers, case travellers  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as travellers_grid,groups,groups_not,apps,apps_not,user_devices, VK_DEVICE_MREF_F(user_devices, NULL) as  user_devices_grid,user_os, VK_OS_MREF_F(user_os, NULL) as  user_os_grid,user_browsers, VK_BROWSER_MREF_F(user_browsers, NULL) as  user_browsers_grid,retargeting_groups,retargeting_groups_not', 'PartName' => 'vk_adstrg', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_adstrgid'])) {
	        $data['vk_adstrgid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_adstrg', 'RowID' => $data['vk_adstrgid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_adstrg', 'RowID' => $data['vk_adstrgid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_adstrgid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_adstrg', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_adstrgid) as vk_adstrgid, B2G(vk_adstrgid) as id,B2G(instanceid) as instanceid, VK_ADSTRG_BRIEF_F(vk_adstrgid , NULL) as  brief,sex, case sex  when 0 then \'Не существенно\' when 1 then \'Женский\' when 2 then \'Мужской\' else \'\'  end   as sex_grid,birthday,statuses, VK_MATRIALSTATUS_MREF_F(statuses, NULL) as  statuses_grid,positions, VK_POSITION_MREF_F(positions, NULL) as  positions_grid,paying,age_from,age_to,school_from,school_to,uni_from,uni_to,country, VK_COUNTRY_MREF_F(country, NULL) as  country_grid,cities, VK_TOWN_MREF_F(cities, NULL) as  cities_grid,cities_not, VK_TOWN_MREF_F(cities_not, NULL) as  cities_not_grid,districts,stations,streets,religions, VK_RELIGION_MREF_F(religions, NULL) as  religions_grid,interests, VK_INTEREST_MREF_F(interests, NULL) as  interests_grid,interest_categories, VK_CATEGORY_MREF_F(interest_categories, NULL) as  interest_categories_grid,travellers, case travellers  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as travellers_grid,groups,groups_not,apps,apps_not,user_devices, VK_DEVICE_MREF_F(user_devices, NULL) as  user_devices_grid,user_os, VK_OS_MREF_F(user_os, NULL) as  user_os_grid,user_browsers, VK_BROWSER_MREF_F(user_browsers, NULL) as  user_browsers_grid,retargeting_groups,retargeting_groups_not', 'ViewName' => 'vk_adstrg'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_adstrgid) as vk_adstrgid, B2G(vk_adstrgid) as id,B2G(instanceid) as instanceid, VK_ADSTRG_BRIEF_F(vk_adstrgid , NULL) as  brief,sex, case sex  when 0 then \'Не существенно\' when 1 then \'Женский\' when 2 then \'Мужской\' else \'\'  end   as sex_grid,birthday,statuses, VK_MATRIALSTATUS_MREF_F(statuses, NULL) as  statuses_grid,positions, VK_POSITION_MREF_F(positions, NULL) as  positions_grid,paying,age_from,age_to,school_from,school_to,uni_from,uni_to,country, VK_COUNTRY_MREF_F(country, NULL) as  country_grid,cities, VK_TOWN_MREF_F(cities, NULL) as  cities_grid,cities_not, VK_TOWN_MREF_F(cities_not, NULL) as  cities_not_grid,districts,stations,streets,religions, VK_RELIGION_MREF_F(religions, NULL) as  religions_grid,interests, VK_INTEREST_MREF_F(interests, NULL) as  interests_grid,interest_categories, VK_CATEGORY_MREF_F(interest_categories, NULL) as  interest_categories_grid,travellers, case travellers  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as travellers_grid,groups,groups_not,apps,apps_not,user_devices, VK_DEVICE_MREF_F(user_devices, NULL) as  user_devices_grid,user_os, VK_OS_MREF_F(user_os, NULL) as  user_os_grid,user_browsers, VK_BROWSER_MREF_F(user_browsers, NULL) as  user_browsers_grid,retargeting_groups,retargeting_groups_not', 'ViewName' => 'vk_adstrg', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_adstrg', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
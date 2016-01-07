
<?php
class  M_vk_usr extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_usrid) as vk_usrid, B2G(vk_usrid) as id,B2G(instanceid) as instanceid, VK_USR_BRIEF_F(vk_usrid , NULL) as  brief,vkid,first_name,last_name,deactivated, case deactivated  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as deactivated_grid,photo_id,sex, case sex  when 0 then \'Не существенно\' when 1 then \'Женский\' when 2 then \'Мужской\' else \'\'  end   as sex_grid,bdate,B2G(country) country, VK_COUNTRY_BRIEF_F(country, NULL) as country_grid,B2G(home_town) home_town, VK_TOWN_BRIEF_F(home_town, NULL) as home_town_grid,has_photo, case has_photo  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as has_photo_grid,photo_50,photo_100,online, case online  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as online_grid,status', 'PartName' => 'vk_usr', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_usrid'])) {
	        $data['vk_usrid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_usr', 'RowID' => $data['vk_usrid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_usr', 'RowID' => $data['vk_usrid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_usrid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_usr', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_usrid) as vk_usrid, B2G(vk_usrid) as id,B2G(instanceid) as instanceid, VK_USR_BRIEF_F(vk_usrid , NULL) as  brief,vkid,first_name,last_name,deactivated, case deactivated  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as deactivated_grid,photo_id,sex, case sex  when 0 then \'Не существенно\' when 1 then \'Женский\' when 2 then \'Мужской\' else \'\'  end   as sex_grid,bdate,B2G(country) country, VK_COUNTRY_BRIEF_F(country, NULL) as country_grid,B2G(home_town) home_town, VK_TOWN_BRIEF_F(home_town, NULL) as home_town_grid,has_photo, case has_photo  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as has_photo_grid,photo_50,photo_100,online, case online  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as online_grid,status', 'ViewName' => 'vk_usr'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_usrid) as vk_usrid, B2G(vk_usrid) as id,B2G(instanceid) as instanceid, VK_USR_BRIEF_F(vk_usrid , NULL) as  brief,vkid,first_name,last_name,deactivated, case deactivated  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as deactivated_grid,photo_id,sex, case sex  when 0 then \'Не существенно\' when 1 then \'Женский\' when 2 then \'Мужской\' else \'\'  end   as sex_grid,bdate,B2G(country) country, VK_COUNTRY_BRIEF_F(country, NULL) as country_grid,B2G(home_town) home_town, VK_TOWN_BRIEF_F(home_town, NULL) as home_town_grid,has_photo, case has_photo  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as has_photo_grid,photo_50,photo_100,online, case online  when 0 then \'Нет\' when 1 then \'Да\' else \'\'  end   as online_grid,status', 'ViewName' => 'vk_usr', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_usr', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
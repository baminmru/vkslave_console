
<?php
class  M_vk_town extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_townid) as vk_townid, B2G(vk_townid) as id,B2G(instanceid) as instanceid, VK_TOWN_BRIEF_F(vk_townid , NULL) as  brief,B2G(country_id) country_id, VK_COUNTRY_BRIEF_F(country_id, NULL) as country_id_grid,title,B2G(region_id) region_id, VK_REGION_BRIEF_F(region_id, NULL) as region_id_grid,vkid', 'PartName' => 'vk_town', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_townid'])) {
	        $data['vk_townid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_town', 'RowID' => $data['vk_townid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_town', 'RowID' => $data['vk_townid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_townid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_town', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_townid) as vk_townid, B2G(vk_townid) as id,B2G(instanceid) as instanceid, VK_TOWN_BRIEF_F(vk_townid , NULL) as  brief,B2G(country_id) country_id, VK_COUNTRY_BRIEF_F(country_id, NULL) as country_id_grid,title,B2G(region_id) region_id, VK_REGION_BRIEF_F(region_id, NULL) as region_id_grid,vkid', 'ViewName' => 'vk_town'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_townid) as vk_townid, B2G(vk_townid) as id,B2G(instanceid) as instanceid, VK_TOWN_BRIEF_F(vk_townid , NULL) as  brief,B2G(country_id) country_id, VK_COUNTRY_BRIEF_F(country_id, NULL) as country_id_grid,title,B2G(region_id) region_id, VK_REGION_BRIEF_F(region_id, NULL) as region_id_grid,vkid', 'ViewName' => 'vk_town', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_town', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>

<?php
class  M_vk_rotinfo extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_rotinfoid) as vk_rotinfoid, B2G(vk_rotinfoid) as id,B2G(instanceid) as instanceid, VK_ROTINFO_BRIEF_F(vk_rotinfoid , NULL) as  brief,name,B2G(campaign_id) campaign_id, Vk_CAMP_BRIEF_F(campaign_id, NULL) as campaign_id_grid,B2G(status) status, VK_ADSTATE_BRIEF_F(status, NULL) as status_grid,_description', 'PartName' => 'vk_rotinfo', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_rotinfoid'])) {
	        $data['vk_rotinfoid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_rotinfo', 'RowID' => $data['vk_rotinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_rotinfo', 'RowID' => $data['vk_rotinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_rotinfoid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_rotinfo', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_rotinfoid) as vk_rotinfoid, B2G(vk_rotinfoid) as id,B2G(instanceid) as instanceid, VK_ROTINFO_BRIEF_F(vk_rotinfoid , NULL) as  brief,name,B2G(campaign_id) campaign_id, Vk_CAMP_BRIEF_F(campaign_id, NULL) as campaign_id_grid,B2G(status) status, VK_ADSTATE_BRIEF_F(status, NULL) as status_grid,_description', 'ViewName' => 'vk_rotinfo'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_rotinfoid) as vk_rotinfoid, B2G(vk_rotinfoid) as id,B2G(instanceid) as instanceid, VK_ROTINFO_BRIEF_F(vk_rotinfoid , NULL) as  brief,name,B2G(campaign_id) campaign_id, Vk_CAMP_BRIEF_F(campaign_id, NULL) as campaign_id_grid,B2G(status) status, VK_ADSTATE_BRIEF_F(status, NULL) as status_grid,_description', 'ViewName' => 'vk_rotinfo', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_rotinfo', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
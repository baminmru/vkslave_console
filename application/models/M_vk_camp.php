
<?php
class  M_vk_camp extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_campid) as vk_campid, B2G(vk_campid) as id,B2G(instanceid) as instanceid, Vk_CAMP_BRIEF_F(vk_campid , NULL) as  brief,B2G(VK_USR) vk_usr, VK_USR_BRIEF_F(vk_usr, NULL) as vk_usr_grid,B2G(VK_CAB) vk_cab, VK_CAB_BRIEF_F(vk_cab, NULL) as vk_cab_grid,name,campagin_id,B2G(status) status, VK_CASTATE_BRIEF_F(status, NULL) as status_grid,all_limit,day_limit,  DATE_FORMAT(stop_time,\'%Y-%m-%d %H:%i:%s\') as  stop_time,  DATE_FORMAT(start_time,\'%Y-%m-%d %H:%i:%s\') as  start_time,B2G(prj) prj, VK_PRJ_BRIEF_F(prj, NULL) as prj_grid', 'PartName' => 'vk_camp', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_campid'])) {
	        $data['vk_campid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_camp', 'RowID' => $data['vk_campid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_camp', 'RowID' => $data['vk_campid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_campid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_camp', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_campid) as vk_campid, B2G(vk_campid) as id,B2G(instanceid) as instanceid, Vk_CAMP_BRIEF_F(vk_campid , NULL) as  brief,B2G(VK_USR) vk_usr, VK_USR_BRIEF_F(vk_usr, NULL) as vk_usr_grid,B2G(VK_CAB) vk_cab, VK_CAB_BRIEF_F(vk_cab, NULL) as vk_cab_grid,name,campagin_id,B2G(status) status, VK_CASTATE_BRIEF_F(status, NULL) as status_grid,all_limit,day_limit,  DATE_FORMAT(stop_time,\'%Y-%m-%d %H:%i:%s\') as  stop_time,  DATE_FORMAT(start_time,\'%Y-%m-%d %H:%i:%s\') as  start_time,B2G(prj) prj, VK_PRJ_BRIEF_F(prj, NULL) as prj_grid', 'ViewName' => 'vk_camp'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_campid) as vk_campid, B2G(vk_campid) as id,B2G(instanceid) as instanceid, Vk_CAMP_BRIEF_F(vk_campid , NULL) as  brief,B2G(VK_USR) vk_usr, VK_USR_BRIEF_F(vk_usr, NULL) as vk_usr_grid,B2G(VK_CAB) vk_cab, VK_CAB_BRIEF_F(vk_cab, NULL) as vk_cab_grid,name,campagin_id,B2G(status) status, VK_CASTATE_BRIEF_F(status, NULL) as status_grid,all_limit,day_limit,  DATE_FORMAT(stop_time,\'%Y-%m-%d %H:%i:%s\') as  stop_time,  DATE_FORMAT(start_time,\'%Y-%m-%d %H:%i:%s\') as  start_time,B2G(prj) prj, VK_PRJ_BRIEF_F(prj, NULL) as prj_grid', 'ViewName' => 'vk_camp', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_camp', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
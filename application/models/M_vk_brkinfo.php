
<?php
class  M_vk_brkinfo extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_brkinfoid) as vk_brkinfoid, B2G(vk_brkinfoid) as id,B2G(instanceid) as instanceid, VK_BRKINFO_BRIEF_F(vk_brkinfoid , NULL) as  brief,  DATE_FORMAT(crdate,\'%Y-%m-%d %H:%i:%s\') as  crdate,B2G(ads) ads, VK_ADINFO_BRIEF_F(ads, NULL) as ads_grid,B2G(rotation) rotation, VK_ROTINFO_BRIEF_F(rotation, NULL) as rotation_grid,name', 'PartName' => 'vk_brkinfo', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_brkinfoid'])) {
	        $data['vk_brkinfoid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_brkinfo', 'RowID' => $data['vk_brkinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_brkinfo', 'RowID' => $data['vk_brkinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_brkinfoid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_brkinfo', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_brkinfoid) as vk_brkinfoid, B2G(vk_brkinfoid) as id,B2G(instanceid) as instanceid, VK_BRKINFO_BRIEF_F(vk_brkinfoid , NULL) as  brief,  DATE_FORMAT(crdate,\'%Y-%m-%d %H:%i:%s\') as  crdate,B2G(ads) ads, VK_ADINFO_BRIEF_F(ads, NULL) as ads_grid,B2G(rotation) rotation, VK_ROTINFO_BRIEF_F(rotation, NULL) as rotation_grid,name', 'ViewName' => 'vk_brkinfo'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_brkinfoid) as vk_brkinfoid, B2G(vk_brkinfoid) as id,B2G(instanceid) as instanceid, VK_BRKINFO_BRIEF_F(vk_brkinfoid , NULL) as  brief,  DATE_FORMAT(crdate,\'%Y-%m-%d %H:%i:%s\') as  crdate,B2G(ads) ads, VK_ADINFO_BRIEF_F(ads, NULL) as ads_grid,B2G(rotation) rotation, VK_ROTINFO_BRIEF_F(rotation, NULL) as rotation_grid,name', 'ViewName' => 'vk_brkinfo', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_brkinfo', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
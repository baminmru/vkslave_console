
<?php
class  M_vk_adsutm extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_adsutmid) as vk_adsutmid, B2G(vk_adsutmid) as id,B2G(instanceid) as instanceid, VK_ADSUTM_BRIEF_F(vk_adsutmid , NULL) as  brief,autoutm, case autoutm  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as autoutm_grid,utm_source,utm_medium,utm_term,utm_content,utm_campaign', 'PartName' => 'vk_adsutm', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_adsutmid'])) {
	        $data['vk_adsutmid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_adsutm', 'RowID' => $data['vk_adsutmid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_adsutm', 'RowID' => $data['vk_adsutmid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_adsutmid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_adsutm', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_adsutmid) as vk_adsutmid, B2G(vk_adsutmid) as id,B2G(instanceid) as instanceid, VK_ADSUTM_BRIEF_F(vk_adsutmid , NULL) as  brief,autoutm, case autoutm  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as autoutm_grid,utm_source,utm_medium,utm_term,utm_content,utm_campaign', 'ViewName' => 'vk_adsutm'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_adsutmid) as vk_adsutmid, B2G(vk_adsutmid) as id,B2G(instanceid) as instanceid, VK_ADSUTM_BRIEF_F(vk_adsutmid , NULL) as  brief,autoutm, case autoutm  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as autoutm_grid,utm_source,utm_medium,utm_term,utm_content,utm_campaign', 'ViewName' => 'vk_adsutm', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_adsutm', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
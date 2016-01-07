
<?php
class  M_vk_taskmsg extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_taskmsgid) as vk_taskmsgid, B2G(vk_taskmsgid) as id,B2G(instanceid) as instanceid, VK_TASKMSG_BRIEF_F(vk_taskmsgid , NULL) as  brief,  DATE_FORMAT(msgdate,\'%Y-%m-%d %H:%i:%s\') as  msgdate,info,okmsg, case okmsg  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as okmsg_grid', 'PartName' => 'vk_taskmsg', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_taskmsgid'])) {
	        $data['vk_taskmsgid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_taskmsg', 'RowID' => $data['vk_taskmsgid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_taskmsg', 'RowID' => $data['vk_taskmsgid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_taskmsgid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_taskmsg', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_taskmsgid) as vk_taskmsgid, B2G(vk_taskmsgid) as id,B2G(instanceid) as instanceid, VK_TASKMSG_BRIEF_F(vk_taskmsgid , NULL) as  brief,  DATE_FORMAT(msgdate,\'%Y-%m-%d %H:%i:%s\') as  msgdate,info,okmsg, case okmsg  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as okmsg_grid', 'ViewName' => 'vk_taskmsg'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_taskmsgid) as vk_taskmsgid, B2G(vk_taskmsgid) as id,B2G(instanceid) as instanceid, VK_TASKMSG_BRIEF_F(vk_taskmsgid , NULL) as  brief,  DATE_FORMAT(msgdate,\'%Y-%m-%d %H:%i:%s\') as  msgdate,info,okmsg, case okmsg  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as okmsg_grid', 'ViewName' => 'vk_taskmsg', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_taskmsg', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
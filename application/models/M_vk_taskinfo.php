
<?php
class  M_vk_taskinfo extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(vk_taskinfoid) as vk_taskinfoid, B2G(vk_taskinfoid) as id,B2G(instanceid) as instanceid, VK_TASKINFO_BRIEF_F(vk_taskinfoid , NULL) as  brief,B2G(tasktype) tasktype, VK_TASKTYPE_BRIEF_F(tasktype, NULL) as tasktype_grid,name,  DATE_FORMAT(crdate,\'%Y-%m-%d %H:%i:%s\') as  crdate,repeat_interval,  DATE_FORMAT(lastdate,\'%Y-%m-%d %H:%i:%s\') as  lastdate,result,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as isdone_grid,B2G(vkusr) vkusr, VK_USR_BRIEF_F(vkusr, NULL) as vkusr_grid,B2G(cab) cab, VK_CAB_BRIEF_F(cab, NULL) as cab_grid,B2G(camp) camp, Vk_CAMP_BRIEF_F(camp, NULL) as camp_grid,B2G(ads) ads, VK_ADINFO_BRIEF_F(ads, NULL) as ads_grid,B2G(rotation) rotation, VK_ROTINFO_BRIEF_F(rotation, NULL) as rotation_grid,token', 'PartName' => 'vk_taskinfo', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['vk_taskinfoid'])) {
	        $data['vk_taskinfoid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_taskinfo', 'RowID' => $data['vk_taskinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'vk_taskinfo', 'RowID' => $data['vk_taskinfoid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['vk_taskinfoid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'vk_taskinfo', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_taskinfoid) as vk_taskinfoid, B2G(vk_taskinfoid) as id,B2G(instanceid) as instanceid, VK_TASKINFO_BRIEF_F(vk_taskinfoid , NULL) as  brief,B2G(tasktype) tasktype, VK_TASKTYPE_BRIEF_F(tasktype, NULL) as tasktype_grid,name,  DATE_FORMAT(crdate,\'%Y-%m-%d %H:%i:%s\') as  crdate,repeat_interval,  DATE_FORMAT(lastdate,\'%Y-%m-%d %H:%i:%s\') as  lastdate,result,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as isdone_grid,B2G(vkusr) vkusr, VK_USR_BRIEF_F(vkusr, NULL) as vkusr_grid,B2G(cab) cab, VK_CAB_BRIEF_F(cab, NULL) as cab_grid,B2G(camp) camp, Vk_CAMP_BRIEF_F(camp, NULL) as camp_grid,B2G(ads) ads, VK_ADINFO_BRIEF_F(ads, NULL) as ads_grid,B2G(rotation) rotation, VK_ROTINFO_BRIEF_F(rotation, NULL) as rotation_grid,token', 'ViewName' => 'vk_taskinfo'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(vk_taskinfoid) as vk_taskinfoid, B2G(vk_taskinfoid) as id,B2G(instanceid) as instanceid, VK_TASKINFO_BRIEF_F(vk_taskinfoid , NULL) as  brief,B2G(tasktype) tasktype, VK_TASKTYPE_BRIEF_F(tasktype, NULL) as tasktype_grid,name,  DATE_FORMAT(crdate,\'%Y-%m-%d %H:%i:%s\') as  crdate,repeat_interval,  DATE_FORMAT(lastdate,\'%Y-%m-%d %H:%i:%s\') as  lastdate,result,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\' else \'\'  end   as isdone_grid,B2G(vkusr) vkusr, VK_USR_BRIEF_F(vkusr, NULL) as vkusr_grid,B2G(cab) cab, VK_CAB_BRIEF_F(cab, NULL) as cab_grid,B2G(camp) camp, Vk_CAMP_BRIEF_F(camp, NULL) as camp_grid,B2G(ads) ads, VK_ADINFO_BRIEF_F(ads, NULL) as ads_grid,B2G(rotation) rotation, VK_ROTINFO_BRIEF_F(rotation, NULL) as rotation_grid,token', 'ViewName' => 'vk_taskinfo', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'vk_taskinfo', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
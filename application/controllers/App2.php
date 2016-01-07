<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class App2 extends CI_Controller
{
    function setFavorite()
    {      
        $instanceid = $this->input->get_post('instanceid', TRUE);
        $value = $this->input->get_post('value', TRUE);
        $this->jservice->get(array('Action' => 'SetFavorite',  'instanceid' => $instanceid, 'value'=>$value));
    }

    function resetFavorite()
    {      
        $instanceid = $this->input->get_post('instanceid', TRUE);
        $type = $this->input->get_post('type', TRUE);
        $this->jservice->get(array('Action' => 'ResetFavorite', 'type'=>$type));
    }
	

	function setPassword() {
		 log_message('debug', 'setPassword post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'setPassword get : '.json_encode($this->input->get(NULL, FALSE)));
		 $data = array(
			'instanceid' =>   $this->input->get_post('instanceid', TRUE),
			'newpassword' =>   $this->input->get_post('newpassword', TRUE),
			'comppassword' =>   $this->input->get_post('comppassword', TRUE)
		 );
       
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'setpassword_wiz', 'Values'=>$data ));
			
			if($res[0]->result=='OK'){
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
			
		} else {
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
    }
	
	
	
   	function setSPPhoto() {
		 log_message('debug', 'setSPPhoto post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'setSPPhoto get : '.json_encode($this->input->get(NULL, FALSE)));
		 $data = array(
			'filename' =>   ''
		 );
		
    	$result['result'] = 'error';
   // 	$result['success'] = true;
    	$result['msg'] = 'test';

        if(file_exists($_FILES['photo']['tmp_name']))
        {
        	$pi = explode('.', $_FILES['photo']['name']);

        	$fn = md5_file($_FILES['photo']['tmp_name']).".".$pi[count($pi) - 1];

            if (move_uploaded_file($_FILES['photo']['tmp_name'], 'images/'.$fn)) {
            	$result['result'] = 'OK';
            	$result['success'] = true;
            	$result['fn'] = 'images/'.$fn;
            	$result['msg'] = 'ОК';
            }else
            {
				$result['result'] = 'error';
				$result['success'] = true;
            	$result['msg'] = 'ошибка записи файла';	            	
            }
    	}else
       	{
			$result['result'] = 'error';
			$result['success'] = true;
        	$result['msg'] = 'ошибка чтения файла';	            	
        }				

        echo(json_encode($result));
		/*if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'setmyphoto_wiz', 'Values'=>$data ));
			log_message('debug', 'setSPPhoto result : '.json_encode($res));
			if( $res[0]->result=='OK'){
				log_message('debug', 'setSPPhoto return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'setSPPhoto return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
			
		} else {
			log_message('debug', 'setSPPhoto return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}*/
    }

}

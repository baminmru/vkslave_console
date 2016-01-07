<?php

class B2service
{
    private $db;
    private $config;
    private $SessionData;
    private $request;
    public  $action;

    public function __construct($config, $request)
    {
        // check action
        $this->request = $request;
        $this->action = isset($this->request['Action']) ? $this->request['Action'] : '';
        if (!method_exists($this, $this->action)) {
            throw new Exception('Unknown action: "' . $this->action . '"');
			
        }

        // connect to DB
        $this->db = new mysqli($config['db']['server'], $config['db']['username'], $config['db']['password'],
                               $config['db']['database']);
        if ($this->db->connect_error) {
            throw new Exception('Connect Error (' . $this->db->connect_errno . ') ' . $this->db->connect_error);
        }
        $this->db->set_charset("utf8");

        // check session
        $this->SessionData['SessionID'] = isset($this->request['SessionID']) ? $this->request['SessionID'] : '';
		
        // логинится можно без сессии, все остальное - только с валидной сессией
        if ($this->action != 'Login') {
            if (empty($this->SessionData['SessionID'])) {
                throw new Exception('Session ID not set!');
            }
            // лезем в БД и ищем такую сессию
            $stmt = $this->db->prepare('SELECT B2G(InstanceID), B2G(UsersID), B2G(UserRole), B2G(ApplicationID)
                                        FROM the_session
                                        WHERE the_Sessionid=G2B(?)');
            $stmt->bind_param('s', $this->SessionData['SessionID']);
            $stmt->execute();
            $stmt->bind_result($c1, $c2, $c3, $c4);
            if ($stmt->fetch()) { // есть такая сессия
                $this->SessionData['InstanceID']    = $c1;
                $this->SessionData['UsersID']       = $c2;
                $this->SessionData['UserRole']      = $c3;
                $this->SessionData['ApplicationID'] = $c4;
            } else {
                $stmt->close();
                throw new Exception('Session not found!');
            }
            $stmt->close();
        }
        $this->config = $config;
    }

    public function __destruct()
    {
        $this->db->close();
    }

    // проверка наличия пользователя, регистрация сессии.
    public function Login()
    {
        $email = isset($this->request['Email']) ? $this->request['Email'] : '';
        $pass = isset($this->request['PasswordHash']) ? $this->request['PasswordHash'] : '';
        $app_id = isset($this->request['ApplicationID']) ? $this->request['ApplicationID'] : '';

        $stmt = $this->db->prepare('CALL Login(@tmp_sessid,?,?)');
        $stmt->bind_param('ss', $pass, $email);
        $stmt->execute();
        $stmt->close();
        $row = $this->db->query('SELECT @tmp_sessid')->fetch_array(MYSQLI_NUM);
		//$row = $this->db->query('SELECT B2G(@tmp_sessid)')->fetch_array(MYSQLI_NUM);
        if (strlen($row[0])) { // TODO Когда процедура будет переписана, перенести app_id в процедуру
            $stmt = $this->db->prepare('UPDATE the_session SET ApplicationID = G2B(?) WHERE the_Sessionid = G2B(?)');
            $stmt->bind_param('ss', $app_id, $row[0]);
            $stmt->execute();
            $stmt->close();
        }
        return $row[0];
    }
     // Обслуживание Wizards
    public function Wizard()
    {
	
        $name = isset($this->request['Name']) ? $this->request['Name'] : '';
        $values = isset($this->request['Values']) ? $this->request['Values'] : '';

	
        $fields = '';
	
	
		if($name=="Subscribe"){
		
			$fname='eventtype';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='theprocess';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');			
			$fname='processstatus';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='statetask';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='doer';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');		
			$fname='thedoc';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='thevideo';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='thediscussion';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');

			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}

		if($name=="iu_urok_restart"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='process';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
		
						
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="ProcessClear"){
		
			$fname='processid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
						
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
	
		if($name=="ProcessCopy"){
		
			$fname='fromprocess';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='toprocess';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		
		if($name=="iu_timing_save"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='info';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
	
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
			if($name=="iu_task_delegate"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='doer';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		if($name=="iu_task_done"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='doer_comment';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='doer_states';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		if($name=="iu_task_stopdelegate"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='controller_comment';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="iu_task_cancel"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='doer_comment';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		
		if($name=="iu_task_check"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='controller_comment';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		if($name=="iu_task_checkbad"){
		
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='controller_comment';
			$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="iu_urok_def_newstate"){
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			//$fname='aiu_urok_defid';
            //$fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='aiu_urok_stage';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			$q='CALL ' . $this->db->real_escape_string($name) . '('.
				'\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\''
				 . $fields . ')';
		    $result = array();
			
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($q) .'\r\n', FILE_APPEND);
				
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
        
		if($name=="busr_wiz"){
			$fname='lastname';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='firstname';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='patronymic';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='loginname';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='email';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='webphone';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='phone';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='firmid';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='deptid';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='roleid';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='postid';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			/* $fname='allobjects';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='substructobjects';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='colegsobjects';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			 */
			 $fname='manager';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			 $fname='thesex';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			 $fname='datebirth';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			 $fname='thecomment';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			 $fname='notes';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
             $fname='status';
             $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');

			 
	   
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';

			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',
				'>>>: '.$q .'', FILE_APPEND);
		
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
        
		if($name=="setmyphoto_wiz"){
			$fname='filename';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;;
		}
		
		if($name=="setmyemail_wiz"){
			$fname='email';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="setmycomment_wiz"){
			$fname='comment';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
			}
		
		if($name=="setmypassword_wiz"){
			$fname='oldpassword';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='newpassword';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='comppassword';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		
		
		if($name=="setpassword_wiz"){
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='newpassword';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='comppassword';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="setstatus_wiz"){
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='status';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='notes';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
		$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		
		if($name=="send2duty_wiz"){
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="send2dutynew_wiz"){
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='qtype';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='objtype';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
		$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="send2agent_wiz"){
			$fname='instanceid';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='agent';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
		$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="checklogin_wiz"){
			$fname='login';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="deluser_wiz"){
			$fname='oldagent';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='mode';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='newagent';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
		
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
		
		if($name=="masschange"){
		
			
			$fname='price';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='haspercent';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='apply2';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$fname='house';
            $fields .= ', ' . (isset($values[strtolower($fname)]) ? ('\''.$this->db->real_escape_string($values[strtolower($fname)]).'\'') : '\'\'');
			$q='CALL ' . $this->db->real_escape_string($name) . '(
				\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\'
				' . $fields . ')';
			$result = array();
			if ($this->db->multi_query($q)) {
				do {
					/* store last result set */
					if ($resultset = $this->db->store_result()) {
						$result = array();
						while ($row = $resultset->fetch_assoc()) {
							$result[] = $row;
						}
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}
					if ($this->config['log']==true)		
						file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.json_encode($result) .'\r\n', FILE_APPEND);
			
				} while ($this->db->next_result());
			}
			
			
			return $result;
		}
    }
	
    // помечает сессию как закрытую, освобождает все заблокированные объекты, если таковые были.
    public function Logout()
    {
        $stmt = $this->db->prepare('CALL Logout(?)');
        $stmt->bind_param('s', $this->SessionData['SessionID']);
        if ($stmt->execute()) { // успешно закрыли сессию
            return 'OK';
        } else {
            return 'Error while closing session: '.$stmt->error;
        }
    }

    // список ролей доступных пользователю для уточнения роли
    public function GetRoleList()
    {

		 $result = array();
        $res = $this->db->query("select distinct roles_def.name from roles_def 
				join busr_def on busr_def.therole = roles_def.roles_defid 
				join users on users.login =busr_def.loginname
				join the_session on the_session.usersid=users.usersid
				where the_sessionid=g2b('".$this->SessionData['SessionID']."') ");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }

    // устанавливает текущую роль пользователя
    public function SetRole()
    {
        $role = isset($this->request['RoleName']) ? $this->request['RoleName'] : '';
        if (empty($role))
            return 'RoleName not set!';

        $stmt = $this->db->prepare('UPDATE the_session
                                    SET UserRole=(SELECT roles_defid FROM roles_def WHERE Name=?)
                                    WHERE the_Sessionid=G2B(?)');
        $stmt->bind_param('ss', $role, $this->SessionData['SessionID']);
        if ($stmt->execute()) { // успешно выбрали роль
			$stmt2 = $this->db->prepare('call BUILD_USERCACHE(?)');
			$stmt2->bind_param('s', $this->SessionData['SessionID']);
			if ($stmt2->execute()){
				return 'OK';
			}
        } else {
            return 'Error while updating session: '.$stmt->error;
        }
    }
	
	
	// список пунктов меню для текущего приложения c  признаком доступности
    public function GetActions()
    {

		 $result = array();
		 
		     $res = $this->db->query("select iu_rcfg_mod.moduleaccessible accesible, iu_rcfg_mod.caption menuname, iu_rcfg_mod.name menucode,iu_rcfg_modid id from iu_rcfg_mod
				join iu_rcfg_def on iu_rcfg_mod.instanceid=iu_rcfg_def.instanceid
				join iu_u_def on iu_rcfg_def.therole=iu_u_def.currole
				join users on users.login=iu_u_def.login
				join the_session on the_session.usersid=users.usersid
				where the_Session.the_Sessionid=g2b('".$this->SessionData['SessionID']."') ");

        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	
	public function GetModes()
    {

		 $result = array();
		 
		     $res = $this->db->query("select OBJECTTYPE.name, iu_rcfg_docmode.allowadd, iu_rcfg_docmode.allowdelete, iu_rcfg_docmode.addmode, iu_rcfg_docmode.editmode,iu_rcfg_docmodeid id from iu_rcfg_docmode
				join OBJECTTYPE on iu_rcfg_docmode.The_Document=OBJECTTYPE.OBJECTTYPEid
				join iu_rcfg_def on iu_rcfg_docmode.instanceid=iu_rcfg_def.instanceid
				join iu_u_def on iu_rcfg_def.therole=iu_u_def.currole
				join users on users.login=iu_u_def.login
				join the_session on the_session.usersid=users.usersid
				where the_Session.the_Sessionid=g2b('".$this->SessionData['SessionID']."') ");

        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	

	
	// список именованных действий доступных пользователю для текущей роли
    public function GetOperations()
    {

		 $result = array();
        $res = $this->db->query("select roles_operations.name ,roles_operations.allowaction  from  roles_operations  
			join roles_def on roles_def.instanceid=roles_operations.instanceid
			join the_Session on the_Session.userrole=roles_def.roles_defid
			where the_Session.the_Sessionid=g2b('".$this->SessionData['SessionID']."') ");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	
	// строка с описанием сесии ( арм+ роль+логин )
	public function GetSessionInfo()
    {

		$result = array();
        $res = $this->db->query("select  b2g(iu_u_defid) userid , 
		    b2g(iu_u_def.currole) roleid, 
		    iu_crole.name rolename, 
			iu_u_def.login, 
		   concat(ifnull(iu_u_def.lastname,''),' 	   ',ifnull(iu_u_def.name,''),' ',ifnull(iu_u_def.surname,'') ) info
		   ,
			getmailcount_f(iu_u_defid) mailcount
		   from  the_Session 
			join users on   the_session.usersid = users.usersid
			join iu_u_def on users.login=iu_u_def.login
			left join iu_crole on iu_crole.iu_croleid=iu_u_def.currole
			where the_Session.the_Sessionid=g2b('".$this->SessionData['SessionID']."') ");
			while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
		
		
		
        return $result;
		
    }
	
	
	public function GetSubjects()
    {
		$result = array();
        $res = $this->db->query("call sp_getsubjects(g2b(
		'".$this->SessionData['SessionID']."'))");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	public function GetTeachers()
    {
		$result = array();
        $res = $this->db->query("call sp_getteachers(g2b(
		'".$this->SessionData['SessionID']."'))");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	
	
	public function GetSubjectsArch()
    {
		$result = array();
        $res = $this->db->query("call sp_getsubjectsarch(g2b(
		'".$this->SessionData['SessionID']."'))");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	public function GetTeachersArch()
    {
		$result = array();
        $res = $this->db->query("call sp_getteachersarch(g2b(
		'".$this->SessionData['SessionID']."'))");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
		
    }
	
	public function GetStartPageData()
    {
		$result = array();
        $res = $this->db->query("select bfrm_def.logo_file,bfrm_def.name,otdel,busr_def.firstname,
		busr_def.lastname,busr_def.patronymic,loginname,busr_def.thecomment,photofilename, 
		busr_Def.mobile1 phone, busr_def.email email,busr_def.email private_email,  
		ifnull (users_accounts.value,0) mymoney from  the_Session 
		join users on   the_session.usersid = users.usersid
		join roles_def on roles_defid=the_session.userrole
		join busr_def on users.login=busr_def.loginname
        join bfrm_struct on busr_def.thedept=bfrm_structid
        join bfrm_def on bfrm_struct.instanceid=bfrm_def.instanceid
        left join users_accounts on users_accounts.userid=the_session.usersid 
		where the_Session.the_Sessionid=g2b('".$this->SessionData['SessionID']."')  limit 0,1");
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close(); 
        return $result;
    }
	
	
	
	public function GetRoleData()
    {
		$result = array();
		$myrow = new stdClass();
		
        $res = $this->db->query("select 
								 b2g(iu_rcfg_modid) opid, iu_crole.name rolename,	b2g(iu_rcfg_def.instanceid) instanceid,iu_rcfg_mod.moduleaccessible,
								allobjects,colegsobject,substructobjects, iu_rcfg_mod.name,  iu_rcfg_mod.groupname,caption,visiblecontrol,theicon
																 from iu_rcfg_def
								join iu_crole on iu_rcfg_def.therole=iu_croleid
								join iu_rcfg_mod on iu_rcfg_def.instanceid=iu_rcfg_mod.instanceid
								order by iu_crole.name,iu_rcfg_mod.groupname, iu_rcfg_mod.sequence"
								);
								$rolename='';
        while ($row = $res->fetch_assoc()){
		    if( $rolename != $row['rolename']){
				if($rolename!=''){
					$result[] = $myrow;
				}
				$myrow = new stdClass();
				$rolename = $row['rolename'];
				$myrow->instanceid=$row['instanceid'];
				$myrow->rolename=$row['rolename'];
			}
			$fld = $row['name'];
            $myrow->$fld=($row['moduleaccessible']==-1);
        }
        $res->close();
		$result[] = $myrow;
        return $result;
    }
	
	
	public function GetRoleColumns()
    {
		$result = array();
	
		
        $res = $this->db->query("select   iu_rcfg_mod.groupname,iu_rcfg_mod.name  ,caption,theicon
								 from iu_rcfg_def
								join iu_crole on iu_rcfg_def.therole=iu_croleid
								join iu_rcfg_mod on iu_rcfg_def.instanceid=iu_rcfg_mod.instanceid
								where iu_crole.name='куратор'
								order by iu_rcfg_mod.groupname, iu_rcfg_mod.sequence"
								);
								
								
								
		$myrow = new stdClass();
		$myrow->dataIndex='rolename';
		$myrow->text='Роль';
		$myrow->sortable=true;
		$myrow->locked=true;
		$myrow->width=200;
		
		$result[] = $myrow;
								
		$groupname='';
        while ($row = $res->fetch_assoc()){
		   
		   if( $groupname != $row['groupname']){
				if($groupname!=''){
					$result[] = $header;
					
				}
				$groupname = $row['groupname'];
				$header= new stdClass();
				$header->text=$row['groupname'];
				$header->aligment='center';
				$header->columns= array();
			}
			
				 
			$myrow = new stdClass();
			$myrow->dataIndex=$row['name'];
			//$cap =  '<b>'.$row['groupname'].'</b><br/>'.str_replace(' ','<br/>',$row['caption']);
			$cap =  '<img src="resources/icons/'.str_replace('icon-','',$row['theicon']).'.png" /><br/>'.str_replace(' ','<br/>',$row['caption']);
			$myrow->text=$cap ;
			//$myrow->cls='grid-header-90deg' ;
			// $myrow->cls=$row['theicon'];
			$myrow->tooltip=$row['caption'];
			$myrow->xtype= 'checkcolumn';
			$myrow->sortable=false;
			$myrow->aligment='center';
			$myrow->width=90;
			//$myrow->stopSelection=true;
			$header->columns[]=$myrow;
			//$result[] = $myrow;
				
			
			
            
        }
        $res->close();
		$result[] = $header;
        return $result;
    }

	
	
	public function GetRoleModel()
    {
		$result = array();
	
		
        $res = $this->db->query("select   iu_rcfg_mod.groupname,iu_rcfg_mod.name  ,caption,theicon
								 from iu_rcfg_def
								join iu_crole on iu_rcfg_def.therole=iu_croleid
								join iu_rcfg_mod on iu_rcfg_def.instanceid=iu_rcfg_mod.instanceid
								where iu_crole.name='куратор'
								order by iu_rcfg_mod.groupname, iu_rcfg_mod.sequence"
								);
								
								
								
		$myrow = new stdClass();
		$myrow->name='rolename';
		$myrow->type='string';
		$result[] = $myrow;
		
		$myrow = new stdClass();
		$myrow->name='instanceid';
		$myrow->type='string';
		$result[] = $myrow;
								
		$groupname='';
        while ($row = $res->fetch_assoc()){
		   
				 
			$myrow = new stdClass();
			$myrow->name=$row['name'];
			$myrow->type='bool';
				
			
			//$fld = str_replace('.','__',$row['name']);
			$result[] = $myrow;
            
        }
        $res->close();
	    return $result;
    }

    // Оповещение о наличии живой сессии
    public function SendPing()
    {
        $stmt = $this->db->prepare('CALL SessionTouch(?)');
        $stmt->bind_param('s', $this->SessionData['SessionID']);
        if ($stmt->execute()) { // успешно обновили время последнего доступа
            return 'OK';
        } else {
            return 'Error while updating session: '.$stmt->error;
        }
    }

    // список названий типов документов, доступных пользователю
    public function GetTypeList()
    {
        $result = array();
        $stmt = $this->db->prepare('SELECT roles_doc_the_document FROM v_autoroles_doc  join roles_def on roles_def.instanceid=g2b(v_autoroles_doc.instanceid) WHERE roles_def.roles_defid=G2B(\'?\')');
        $stmt->bind_param('s', $this->SessionData['UserRole']);
		//echo 'Roleid:'.$this->SessionData['UserRole'];
        $stmt->execute();
        $stmt->bind_result($name);
        while ($stmt->fetch()) {
            $result[] = $name;
        }
        $stmt->close();
        return $result;
    }

    //возвращает список свойств типа документов
    public function GetTypeInfo()
    {
        $result = array();
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $res = $this->db->query('SELECT *,
                                        B2G(InstanceID) as InstanceID,
                                        B2G(OBJECTTYPEid) as OBJECTTYPEid,
                                        B2G(Package) as Package,
                                        B2G(LockSessionID) as LockSessionID,
                                        B2G(LockUserID) as LockUserID,
                                        B2G(SecurityStyleID) as SecurityStyleID,
                                        B2G(OnRun) as OnRun,
                                        B2G(OnCreate) as OnCreate,
                                        B2G(OnDelete) as OnDelete
                                 FROM objecttype
                                 WHERE Name = "' . $this->db->real_escape_string($typename) . '"');
        if ($row = $res->fetch_assoc()){
            $result = $row;
        }
        $res->close();
        return $result;
    }

    //возвращает список названий таблиц, реализующих документ
    public function GetTypeParts()
    {
        $result = array();
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $stmt = $this->db->prepare('SELECT part.name
                                    FROM part JOIN objecttype ON parentstructrowid=objecttypeid
                                    WHERE objecttype.Name = ? AND (part.ParentRowid is null OR part.ParentRowid = G2B(\'{00000000-0000-0000-0000-000000000000}\'))');
        $stmt->bind_param('s', $typename);
        $stmt->execute();
        $stmt->bind_result($name);
        while ($stmt->fetch()) {
            $result[] = $name;
        }
        $stmt->close();
        return $result;
    }

    // возвращает список названий таблиц, реализующих документ
    public function GetPartChildrenParts()
    {
        $result = array();
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        if (empty($partname)) // PartName не передан - возвращаем пустой массив
            return $result;

        $stmt = $this->db->prepare('SELECT part.name
                                    FROM part JOIN part p2 on part.ParentRowid = p2.PARTid
                                    WHERE p2.Name = ?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($name);
        while ($stmt->fetch()) {
            $result[] = $name;
        }
        $stmt->close();
        return $result;
    }

    // возвращает список свойств таблицы документа
    public function GetPartInfo()
    {
        $result = array();
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        if (empty($partname)) // PartName не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT *,
                                        B2G(ParentStructRowID) as ParentStructRowID,
                                        B2G(PARTid) as PARTid,
                                        B2G(LockSessionID) as LockSessionID,
                                        B2G(LockUserID) as LockUserID,
                                        B2G(SecurityStyleID) as SecurityStyleID,
                                        B2G(ParentRowid) as ParentRowid,
                                        B2G(OnCreate) as OnCreate,
                                        B2G(OnSave) as OnSave,
                                        B2G(OnRun) as OnRun,
                                        B2G(OnDelete) as OnDelete
                                 FROM part
                                 WHERE Name = "' . $this->db->real_escape_string($partname) . '"');
        if ($row = $res->fetch_assoc()){
            $result = $row;
        }
        $res->close();
        return $result;
    }

    // возвращает список предопределенных запросов для таблицы документа
    public function GetPartViews()
    {
        $result = array();
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        if (empty($partname)) // PartName не передан - возвращаем пустой массив
            return $result;

        // берем default_value
        $stmt = $this->db->prepare('SELECT Value FROM sysoptions WHERE OptionType="DEFVIEW" AND Name=?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($default_value);
        $stmt->fetch();
        $stmt->close();
        // вьюхи
        $stmt = $this->db->prepare('SELECT partview.name, partview.the_Alias
                                    FROM part, partview
                                    WHERE partview.ParentStructRowID = part.partid AND part.name=?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($name, $alias);
        while ($stmt->fetch()) {
            $result[] = array($alias, $alias == $default_value);
        }
        $stmt->close();
        return $result;
    }

    // возвращает список полей таблицы документа
    public function GetPartFields()
    {
        $result = array();
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        if (empty($partname)) // PartName не передан - возвращаем пустой массив
            return $result;

        $stmt = $this->db->prepare('SELECT FIELD.Name, FIELD.Caption
                                    FROM FIELD JOIN PART ON part.Partid = field.Parentstructrowid
                                    WHERE PART.Name = ?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($name, $caption);
        while ($stmt->fetch()) {
            $result[] = array($name, $caption);
        }
        $stmt->close();
        return $result;
    }

    // возвращает список полей для запроса к таблице документа
    public function GetViewFields()
    {
        $result = array();
        $viewname = isset($this->request['ViewName']) ? $this->request['ViewName'] : '';
        if (empty($viewname)) // ViewName не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT ViewColumn.the_alias,ViewColumn.name,ViewColumn.sequence,
                                        B2G(ViewColumn.ParentStructRowID) as ParentStructRowID,
                                        B2G(ViewColumn.ViewColumnid) as ViewColumnid,
                                        B2G(ViewColumn.LockSessionID) as LockSessionID,
                                        B2G(ViewColumn.LockUserID) as LockUserID,
                                        B2G(ViewColumn.SecurityStyleID) as SecurityStyleID,
                                        B2G(ViewColumn.FromPart) as FromPart,
                                        B2G(ViewColumn.Field) as Field

                                 FROM ViewColumn
                                 JOIN partview ON ViewColumn.ParentStructRowID = partview.PARTVIEWid
                                 JOIN part ON partview.ParentStructRowID = part.partid
                                 WHERE partview.the_Alias = "'. $this->db->real_escape_string($viewname) .'"
                                 ORDER BY ViewColumn.sequence');
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }
	
	
	
	
	

    // возвращает информацию о поле таблицы документа
    public function GetFieldInfo()
    {
        $result = array();
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $fieldname = isset($this->request['FieldName']) ? $this->request['FieldName'] : '';
        if (empty($partname) || empty($fieldname)) // PartName или FieldName не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT field.*,
                                        B2G(field.FIELDid) as FIELDid,
                                        B2G(field.ParentStructRowID) as ParentStructRowID,
                                        B2G(field.FieldType) as FieldType,
                                        B2G(field.RefToPart) as RefToPart_tmp
                                 FROM field, part
                                 WHERE field.Name = "'.$this->db->real_escape_string($fieldname).'" AND
                                       part.Name = "' . $this->db->real_escape_string($partname) . '" AND
                                       field.parentstructrowid = part.PARTid');
        if ($res && $row = $res->fetch_assoc()) {
            $result = $row;
            $result['RefToPart'] = $result['RefToPart_tmp'];
            unset($result['RefToPart_tmp']);
        }
        return $result;
    }

    // список возможных состояний документа
    public function GetStatusList()
    {
        $result = array();
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        if (empty($typename)) // TypeName не передан - возвращаем пустой массив
            return $result;

        $stmt = $this->db->prepare('SELECT objSTATUS.name
                                    FROM objecttype JOIN objSTATUS ON objSTATUS.ParentStructRowID = objecttype.objecttypeID
                                    WHERE objecttype.name=?');
        $stmt->bind_param('s', $typename);
        $stmt->execute();
        $stmt->bind_result($name);
        while ($stmt->fetch()) {
            $result[] = $name;
        }
        $stmt->close();
        return $result;
    }

    // список возможных переходов из заданного состояния
    public function GetStatusLinks()
    {
        $result = array();
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $statusname = isset($this->request['StatusName']) ? $this->request['StatusName'] : '';
        if (empty($typename) || empty($statusname)) // TypeName или StatusName не передан - возвращаем пустой массив
            return $result;

        $stmt = $this->db->prepare('SELECT B2G(OBJSTATUS.OBJSTATUSid),
                                           OBJSTATUS.name,
                                           B2G(S2.OBJSTATUSid),
                                           S2.Name
                                    FROM OBJECTTYPE
                                    JOIN OBJSTATUS ON OBJECTTYPE.OBJECTTYPEid = OBJSTATUS.ParentStructRowID
                                    JOIN NEXTSTATE ON OBJSTATUS.OBJSTATUSid = NEXTSTATE.ParentStructRowID
                                    JOIN OBJSTATUS S2 ON NEXTSTATE.TheState = S2.OBJSTATUSid
                                    WHERE OBJECTTYPE.Name=? AND OBJSTATUS.name=?');
        $stmt->bind_param('ss', $typename, $statusname);
        $stmt->execute();
        $stmt->bind_result($id, $from, $toid, $to);
        while ($stmt->fetch()) {
            $result[] = array($id, $from, $toid, $to);
        }
        $stmt->close();
        return $result;
    }

    // список документов конкретного типа доступных пользователю
    public function GetDocumentList()
    {
        $result = array();
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
        if (empty($typename)) // TypeName не передан - возвращаем пустой массив
            return $result;

        $stmt = $this->db->prepare('SELECT B2G(instanceid), name
                                    FROM instance
                                    WHERE objtype=? AND ' . $whereclause);
        $stmt->bind_param('s', $typename);
        $stmt->execute();
        $stmt->bind_result($id, $name);
        while ($stmt->fetch()) {
            $result[$id] = $name;
        }
        $stmt->close();
        return $result;
    }

    // заголовок документа
    public function GetDocumentHeader()
    {
        $result = array();
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // DocumentID не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT *,
                                 B2G(InstanceID) as InstanceID,
                                 B2G(LockUserID) as LockUserID,
                                 B2G(LockSessionID) as LockSessionID,
                                 B2G(SecurityStyleID) as SecurityStyleID,
                                 B2G(OwnerRowID) as OwnerRowID,
                                 B2G(status) as status
                                 FROM instance
                                 WHERE InstanceID = G2B(\'' . $this->db->real_escape_string($documentid) . '\')');
        if ($row = $res->fetch_assoc()){
            $result = $row;
        }
        $res->close();
        return $result;
    }

    // текущее состояние документа
    public function GetDocumentStatus()
    {
        $result = '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // DocumentID не передан - возвращаем пустую строку
            return $result;

        $stmt = $this->db->prepare('SELECT objstatus.name
                                    FROM instance, objstatus
                                    WHERE instance.status=objstatus.objstatusid AND instance.instanceid=G2B(\'?\')');
        $stmt->bind_param('s', $documentid);
        $stmt->execute();
        $stmt->bind_result($status);
        if ($stmt->fetch()) {
            $result = $status;
        }
        $stmt->close();
        return $result;
    }

    // Корневая таблица документа
    public function GetDocumentRootPart()
    {
        $result = array();
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
        if (empty($partname)) // PartName не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT part.name,part.the_comment,part.parttype,part.sequence,
                                 B2G(OBJECTTYPE.InstanceID) as InstanceID,
                                 B2G(OBJECTTYPE.OBJECTTYPEid) as OBJECTTYPEid,
                                 B2G(OBJECTTYPE.Package) as Package,
                                 B2G(OBJECTTYPE.OnCreate) as OnCreate,
                                 B2G(OBJECTTYPE.OnRun) as OnRun,
                                 B2G(OBJECTTYPE.OnDelete) as OnDelete,
                                 B2G(part.ParentStructRowID) as ParentStructRowID,
                                 B2G(part.PARTid) as PARTid,
                                 B2G(part.OnSave) as OnSave
                                 FROM OBJECTTYPE
                                 JOIN PART ON part.ParentStructRowID = OBJECTTYPE.OBJECTTYPEid
                                 WHERE OBJECTTYPE.Name = "' . $this->db->real_escape_string($partname) . '" AND
                                 (part.ParentRowid is null OR part.ParentRowid = G2B(\'{00000000-0000-0000-0000-000000000000}\')) AND ' . $whereclause.' order by part.sequence');
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }

	  // возвращает таблицу данных, соответствующую  корневому разделу документа
    public function GetRootPartData()
    {
        $result = array();
        $instanceid = isset($this->request['InstanceID']) ? $this->request['InstanceID'] : '';
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
		$flist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';
        if (empty($partname) || empty($instanceid)) // PartName или InstanceID не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT '.$flist.'
                                 FROM ' . $this->db->real_escape_string($partname) . '
                                 WHERE instanceid = G2B("'.$this->db->real_escape_string($instanceid).')" AND ' . $whereclause);
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }


	public function GetRowData()
    {
        $result = array();
        $id = isset($this->request['ID']) ? $this->request['ID'] : '';
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
	    $flist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';
        if (empty($partname) || empty($id)) // PartName или InstanceID не передан - возвращаем пустой массив
            return $result;
        $res = $this->db->query('SELECT '.$flist.'
                                 FROM ' . $this->db->real_escape_string($partname) . '
                                 WHERE ' . $partname . 'id = G2B(\''.$this->db->real_escape_string($id).'\') AND ' . $whereclause);
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }

	public function GetRowDataTemp()
    {
        $result = array();
        $id = isset($this->request['ID']) ? $this->request['ID'] : '';
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
	    $flist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';
        if (empty($partname) || empty($id)) // PartName или InstanceID не передан - возвращаем пустой массив
            return $result;
			
        $res = $this->db->query('SELECT '.$flist.'
                                 FROM ' . $this->db->real_escape_string($partname) . '_temp
                                 WHERE sessionid=g2b(\''  .$this->db->real_escape_string($this->SessionData['SessionID']) .'\') and '  . $partname . 'id = G2B(\''.$this->db->real_escape_string($id).'\') AND ' . $whereclause);
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }
	
    // возвращает таблицу данных, соответствующую дочерним строкам раздела, только для  разделов типа tree
    public function GetPartTreeChildren()
    {
        $result = array();
        $partrowid = isset($this->request['PartRowID']) ? $this->request['PartRowID'] : '';
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
        if (empty($partname)) // PartName не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT part2.name,part2.the_comment,part2.parttype,part2.sequence,
                                        B2G(part2.ParentStructRowID) as ParentStructRowID,
                                        B2G(part2.PARTid) as PARTid,
                                        B2G(part2.LockSessionID) as LockSessionID,
                                        B2G(part2.LockUserID) as LockUserID,
                                        B2G(part2.SecurityStyleID) as SecurityStyleID,
                                        B2G(part2.ParentRowid) as ParentRowid,
                                        B2G(part2.OnCreate) as OnCreate,
                                        B2G(part2.OnSave) as OnSave,
                                        B2G(part2.OnRun) as OnRun,
                                        B2G(part2.OnDelete) as OnDelete
                                 FROM part
                                 JOIN PART part2 ON part2.ParentRowID = part.partid
                                 WHERE part.Name="' . $this->db->real_escape_string($partname) . '" AND ' . $whereclause.' order by part2.sequence');
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }

    // возвращает таблицу данных, соответствующую подчиненному разделу документа
    public function GetPartChildrenData()
    {
        $result = array();
        $parentpartrowid = isset($this->request['ParentPartRowID']) ? $this->request['ParentPartRowID'] : '';
        $parentpartname = isset($this->request['ParentPartName']) ? $this->request['ParentPartName'] : '';
        $childname = isset($this->request['ChildName']) ? $this->request['ChildName'] : '';
        $whereclause = isset($this->request['WhereClause']) ? $this->request['WhereClause'] : '1=1';
		$flist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';
        if (empty($childname) || empty($parentpartrowid)) // ChildName или ParentRowID не передан - возвращаем пустой массив
            return $result;

        $res = $this->db->query('SELECT '.$flist.'
                                 FROM ' . $this->db->real_escape_string($childname) . '
                                 WHERE parentstructrowid = G2B("'.$this->db->real_escape_string($parentpartrowid).')" AND ' . $whereclause);
        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }

    // возвращает таблицу данных, соответствующую запросу к таблице, только для доступных пользователю записей
    public function GetViewData()
    {
        $result = array();
        $viewname = isset($this->request['ViewName']) ? $this->request['ViewName'] : '';
        
        $favorites = isset($this->request['favorites']) ? $this->request['favorites'] : 0;
		
		$archived = isset($this->request['archived']) ? $this->request['archived'] : 0;


        if (empty($viewname)) // ViewName не передан - возвращаем пустой массив
            return $result;
			
		$whereclause =" WHERE 1  ";
		$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
	
		$typename='';
		$stmt = $this->db->prepare("select b.value from sysoptions a  join sysoptions b on  a.name = b.name where a.optiontype='defview'  and  b.optiontype='struct_type'  and concat('v_',a.value)=?");
        $stmt->bind_param('s', $viewname);
        $stmt->execute();
        $stmt->bind_result($typename);
        $stmt->fetch();
        $stmt->close();	
		
		
		if($typename != ''){
		
			$otypename='';
			$stmt = $this->db->prepare("select 1 from objecttype where useownership=-1 and name=?");
			$stmt->bind_param('s', $typename);
			$stmt->execute();
			$stmt->bind_result($otypename);
			$stmt->fetch();
			$stmt->close();
			
			if($archived==0){
			
				if ($otypename!="1"){
						$whereclause =$whereclause." and  instance_archived=0";
				}else{
					$whereclause =$whereclause." and  (".$typename."_access_f('".$this->SessionData['SessionID']."',".$viewname.".instanceid)<>0 and instance_archived=0) ";
				}
			}else{
				if ($otypename!="1"){
					$whereclause =$whereclause." and  instance_archived=1";
				}else{
					$whereclause =$whereclause." and  (".$typename."_access_f('".$this->SessionData['SessionID']."',".$viewname.".instanceid)<>0 and instance_archived=1) ";
				}
			}
		}else{
		
		    $typename='';
			$stmt = $this->db->prepare("select name from part where usearchiving=-1 and name=?");
			$stmt->bind_param('s', $viewname);
			$stmt->execute();
			$stmt->bind_result($typename);
			$stmt->fetch();
			$stmt->close();	
			
			$otypename='';
			$stmt = $this->db->prepare("select 1 from objecttype join part on objecttype.objecttypeid = part.parentstructrowid  where (part.parentrowid is null or part.parentrowid='{00000000-0000-0000-0000-000000000000}') and  objecttype.useownership=-1 and part.name=?");
			$stmt->bind_param('s', $viewname);
			$stmt->execute();
			$stmt->bind_result($otypename);
			$stmt->fetch();
			$stmt->close();
			if($typename != ''){
				if($archived==0){
				
					$whereclause =$whereclause." and  archived=0";
					if($otypename=='1')  $whereclause =$whereclause." and  NotArchived(".$viewname.".instanceid)";
				}else{
					$whereclause =$whereclause." and  archived=1";
				}
			}
		}
		
        $limit = isset($this->request['Limit']) ? $this->request['Limit'] : 0;
        $offset = isset($this->request['Offset']) ? $this->request['Offset'] : 0;


        $sort = isset($this->request['Sort']) ? json_decode($this->request['Sort']) : array();

		$fieldlist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';

		if($favorites) 
		{
			$session = $this->SessionData['SessionID'];

			$fieldlist .= ", (SELECT value = 1 FROM bp3_favorites where session = g2b('{$session}') and instanceid = g2b({$viewname}.instanceid) limit 1) as isfavorite ";
		}

        $limitclause = ($limit>0) ? (' LIMIT ' . $offset . ',' . $limit) : ''; 


		
		$orderby = array();

		$logsort = '';

        if($sort)
        {
			foreach($sort as $i)
			{
				$orderby[] = $i->property . ' ' . $i->direction;
				$logsort .= "sort :[". $i->property . ' ' . $i->direction ."] \r\n";
			}
		}else{
			$logsort .= "sort not exist \r\n";
		} 

		if($orderby) $orderby = ' ORDER BY '. implode(',', $orderby);
			else 
				$orderby = '';

		//if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.
					'SELECT '.$fieldlist.'
                     FROM ' . $viewname . '
                     ' . $whereclause . '
					 '. $orderby . $limitclause
			 .'
			 '.$logsort."
			 "			, FILE_APPEND);

        $res = $this->db->query('SELECT '.$fieldlist.'
                                 FROM ' . $viewname . '
                                 ' . $whereclause . $orderby . $limitclause);
        if ($res === false)
            return $result;

        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }
	
	public function GetViewDataTemp()
    {
        $result = array();
		$temp='';
        $viewname = isset($this->request['ViewName']) ? $this->request['ViewName'] : '';
        
        $favorites = isset($this->request['favorites']) ? $this->request['favorites'] : 0;


        if (empty($viewname)) // ViewName не передан - возвращаем пустой массив
            return $result;
			
		$typename='';
		$stmt = $this->db->prepare("select b.value from sysoptions a  join sysoptions b on  a.name = b.name where a.optiontype='defview'  and  b.optiontype='struct_type'  and concat('v_',a.value)=?");
        $stmt->bind_param('s', $viewname);
        $stmt->execute();
        $stmt->bind_result($typename);
        $stmt->fetch();
        $stmt->close();	
			
		if($typename != ''){
		
			$otypename='';
			$stmt = $this->db->prepare("select 1 from objecttype where useownership=-1 and name=?");
			$stmt->bind_param('s', $typename);
			$stmt->execute();
			$stmt->bind_result($otypename);
			$stmt->fetch();
			$stmt->close();
			
			
			$whereclause =" WHERE 1  ";
			$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
			
			if ($otypename!="1"){
					$whereclause =$whereclause." and  instance_archived=0";
			}else{
				$whereclause =$whereclause." and  (".$typename."_access_f('".$this->SessionData['SessionID']."',".$viewname.".instanceid)<>0 and instance_archived=0) ";
			}
		}else{
			$temp="_temp";
		    $typename='';
			$stmt = $this->db->prepare("select name from part where usearchiving=-1 and name=?");
			$stmt->bind_param('s', $viewname);
			$stmt->execute();
			$stmt->bind_result($typename);
			$stmt->fetch();
			$stmt->close();	
			if($typename != ''){
				
				$whereclause =" WHERE sessionid=g2b('".$this->SessionData['SessionID']."') and (". $viewname.$temp.".archived=0)  ";
				$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
			}else{
				$whereclause =" WHERE sessionid=g2b('".$this->SessionData['SessionID']."') ";
				$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? $whereclause.' and ( '.$this->request['WhereClause'].' ) ' : $whereclause;
			}
			
		
		}
		
        $limit = isset($this->request['Limit']) ? $this->request['Limit'] : 0;
        $offset = isset($this->request['Offset']) ? $this->request['Offset'] : 0;
  /*    
        ob_start();
        var_dump($this->request);
        
        echo $this->request['Sort'];
        var_dump(json_decode($this->request['Sort']));

        $logsort = ob_get_contents();
        ob_end_clean(); */

        $sort = isset($this->request['Sort']) ? json_decode($this->request['Sort']) : array();

		$fieldlist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';

		if($favorites) 
		{
			$session = $this->SessionData['SessionID'];

			$fieldlist .= ", (SELECT value = 1 FROM bp3_favorites where session = g2b('{$session}') and instanceid = g2b({$viewname}.instanceid) limit 1) as isfavorite ";
		}

        $limitclause = ($limit>0) ? (' LIMIT ' . $offset . ',' . $limit) : ''; 

	//	$orderby = '';
        /* if ( isset($sort[0]->property) && (!empty($sort[0]->property)) && isset($sort[0]->direction) && (!empty($sort[0]->direction)) )
            $orderby = ' ORDER BY ' . $sort[0]->property . ' ' . $sort[0]->direction;
        else
            $orderby = ''; */
		
		$orderby = array();

		$logsort = '';

        if($sort)
        {
			foreach($sort as $i)
			{
				$orderby[] = $i->property . ' ' . $i->direction;
				$logsort .= "sort :[". $i->property . ' ' . $i->direction ."] \r\n";
			}
		}else{
			$logsort .= "sort not exist \r\n";
		} 

		if($orderby) $orderby = ' ORDER BY '. implode(',', $orderby);
			else 
				$orderby = '';

		if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.
					'SELECT '.$fieldlist.'
                                 FROM ' . $viewname . $temp. '
                                 ' . $whereclause . $orderby . $limitclause
			 .'\r\n\r\n'.$logsort."\r\n"			, FILE_APPEND);

        $res = $this->db->query('SELECT '.$fieldlist.'
                                 FROM ' . $viewname . $temp . '
                                 ' . $whereclause . $orderby . $limitclause);
								 

        if ($res === false)
            return $result;

        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }
	
	
	
	 // возвращает таблицу данных, соответствующую запросу к таблице, только для экспортных записей
    public function GetExportData()
    {
        $result = array();
        $viewname = isset($this->request['ViewName']) ? $this->request['ViewName'] : '';
        if (empty($viewname)) // ViewName не передан - возвращаем пустой массив
            return $result;
			
		$typename='';
		$stmt = $this->db->prepare("select b.value from sysoptions a  join sysoptions b on  a.name = b.name where a.optiontype='defview'  and  b.optiontype='struct_type'  and concat('v_',a.value)=?");
        $stmt->bind_param('s', $viewname);
        $stmt->execute();
        $stmt->bind_result($typename);
        $stmt->fetch();
        $stmt->close();	
			
		if($typename != ''){
			$whereclause =" WHERE (".$typename."_export_f('".$this->SessionData['SessionID']."',".$viewname.".instanceid)<>0) ";
			$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
		}else{
		
			$stmt = $this->db->prepare("select value from sysoptions where optiontype='struct_type' and name=?  and name not in (select name from sysoptions where optiontype='parent')");
			$stmt->bind_param('s', $viewname);
			$stmt->execute();
			$stmt->bind_result($typename);
			$stmt->fetch();
			$stmt->close();	
			if($typename != ''){
				$whereclause =" WHERE (".$typename."_export_f('".$this->SessionData['SessionID']."',b2g(".$viewname.".instanceid))<>0) ";
				$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
			}else{ 
				$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ('WHERE '.$this->request['WhereClause']) : '';
			}
		
		}
		
        $limit = isset($this->request['Limit']) ? $this->request['Limit'] : 0;
        $offset = isset($this->request['Offset']) ? $this->request['Offset'] : 0;
        $sort = isset($this->request['Sort']) ? json_decode($this->request['Sort']) : array();
		$fieldlist = isset($this->request['FieldList']) ? $this->request['FieldList'] : '*';

        $limitclause = ($limit>0) ? (' LIMIT ' . $offset . ',' . $limit) : '';
        if ( isset($sort[0]->property) && (!empty($sort[0]->property)) && isset($sort[0]->direction) && (!empty($sort[0]->direction)) )
            $orderby = ' ORDER BY ' . $sort[0]->property . ' ' . $sort[0]->direction;
        else
            $orderby = '';

        $res = $this->db->query('SELECT '.$fieldlist.'
                                 FROM ' . $viewname . '
                                 ' . $whereclause . $orderby . $limitclause);
        if ($res === false)
            return $result;

        while ($row = $res->fetch_assoc()){
            $result[] = $row;
        }
        $res->close();
        return $result;
    }
	
	
	  // Кол-во записей во вьюхе
    public function CountView()
    {
        $viewname = isset($this->request['ViewName']) ? $this->request['ViewName'] : '';
		$archived = isset($this->request['archived']) ? $this->request['archived'] : 0;
		 if (empty($viewname))
            return 0;
		
		$typename='';
		$stmt = $this->db->prepare("select b.value from sysoptions a  join sysoptions b on  a.name = b.name where a.optiontype='defview'  and  b.optiontype='struct_type'  and concat('v_',a.value)=?");
        $stmt->bind_param('s', $viewname);
        $stmt->execute();
        $stmt->bind_result($typename);
        $stmt->fetch();
        $stmt->close();	
			
		if($typename != ''){
			
			$otypename='';
			$stmt = $this->db->prepare("select 1 from objecttype where useownership=-1 and name=?");
			$stmt->bind_param('s', $typename);
			$stmt->execute();
			$stmt->bind_result($otypename);
			$stmt->fetch();
			$stmt->close();
			
			
			$whereclause =" WHERE 1  ";
			$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
			if($archived==0){
				if ($otypename!="1"){
						$whereclause =$whereclause." and  instance_archived=0";
				}else{
					$whereclause =$whereclause." and  (".$typename."_access_f('".$this->SessionData['SessionID']."',".$viewname.".instanceid)<>0 and instance_archived=0) ";
				}
			}else{
				if ($otypename!="1"){
						$whereclause =$whereclause." and  instance_archived=1";
				}else{
					$whereclause =$whereclause." and  (".$typename."_access_f('".$this->SessionData['SessionID']."',".$viewname.".instanceid)<>0 and instance_archived=1) ";
				}
			}
			//$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
		}else{
		
			$stmt = $this->db->prepare("select value from sysoptions where optiontype='struct_type' and name=? and name not in (select name from sysoptions where optiontype='parent')");
			$stmt->bind_param('s', $viewname);
			$stmt->execute();
			$stmt->bind_result($typename);
			$stmt->fetch();
			$stmt->close();	
			if($typename != ''){
				$whereclause =" WHERE 1  ";
				$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
				$whereclause = $whereclause." and  (".$typename."_access_f('".$this->SessionData['SessionID']."',b2g(".$viewname.".instanceid))<>0) ";
			}else{ 
			
				$typename='';
				$stmt = $this->db->prepare("select name from part where usearchiving=-1 and name=?");
				$stmt->bind_param('s', $viewname);
				$stmt->execute();
				$stmt->bind_result($typename);
				$stmt->fetch();
				$stmt->close();	
				
				$otypename='';
				$stmt = $this->db->prepare("select 1 from objecttype join part on objecttype.objecttypeid = part.parentstructrowid  where (part.parentrowid is null or part.parentrowid='{00000000-0000-0000-0000-000000000000}') and  objecttype.useownership=-1 and part.name=?");
				$stmt->bind_param('s', $viewname);
				$stmt->execute();
				$stmt->bind_result($otypename);
				$stmt->fetch();
				$stmt->close();
		
				
				if($typename != ''){
					if($archived==0)
						$whereclause =" WHERE (". $viewname.".archived=0 ) ";
						if($otypename=='1')  $whereclause =$whereclause." and  NotArchived(".$viewname.".instanceid)";
					else
						$whereclause =" WHERE (". $viewname.".archived=1 ) ";
					$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? ($whereclause.' and '.$this->request['WhereClause'].' ') : $whereclause;
				}else{
					$whereclause = (isset($this->request['WhereClause'])&&!empty($this->request['WhereClause'])) ? (' WHERE '.$this->request['WhereClause']) : '';
				}
			
				
			}
		}

       
		
		if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.
					'SELECT count(*) FROM ' . $this->db->real_escape_string($viewname) . $whereclause."
					\r\n"			, FILE_APPEND);
				
        $row = $this->db->query('SELECT count(*) FROM ' . $this->db->real_escape_string($viewname) . $whereclause)->fetch_array(MYSQLI_NUM);
		
		
        return $row[0];
    }
	

    // Создание документа
    public function NewDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        $documentcaption = isset($this->request['DocumentCaption']) ? $this->request['DocumentCaption'] : '';
        if (empty($typename)) // TypeName не передан - возвращаем ошибку
            return 'Error: TypeName not set!';

        if (empty($documentid)) // DocumentID не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL Instance_Save(?,?,?,?)');
        $stmt->bind_param('ssss', $this->SessionData['SessionID'], $documentid, $typename, $documentcaption);
        $res = $stmt->execute();
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while creating document: '.$stmt->error;
    }
	
	// Создание копии документа  client_trigger не обрабатываются !
    public function CopyDocument()
    {
		$typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
		$newdocumentid = isset($this->request['NewDocumentID']) ? $this->request['NewDocumentID'] : '';
       
	    if (empty($typename)) // TypeName не передан - возвращаем ошибку
            return 'Error: TypeName not set!';
	   
         if (empty($newdocumentid)) // NewDocumentID не передан - возвращаем ошибку
            return 'Error: NewDocumentID not set!';

        if (empty($documentid)) // DocumentID не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

     
			
		$qry='CALL ' . $this->db->real_escape_string($typename) . '_copy(
			\'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
			\'' . $this->db->real_escape_string($documentid) . '\',
			\'' . $this->db->real_escape_string($newdocumentid) . '\'
		)';
			
		if ($this->config['log']==true)		
		file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.$qry .'\r\n', FILE_APPEND);
			
        $result = array();
		$res = $this->db->query($qry);
		//$error = $res->error;
		while ($row = $res->fetch_assoc()){
			$result[] = $row;
		}
		$res->close();
		return $result;
    }

    // Создание строки  в разделе документа
    public function NewRow()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        $parentid = isset($this->request['ParentID']) ? $this->request['ParentID'] : '';
		$treeid = isset($this->request['TreeID']) ? $this->request['TreeID'] : '';
        $values = isset($this->request['Values']) ? $this->request['Values'] : '';
        if (empty($partname)) // PartName не передан - возвращаем ошибку
            return 'Error: PartName not set!';

        // get type (0-строка, 1-коллекция, 2-дерево)
        $stmt = $this->db->prepare('SELECT B2G(partid),B2G(parentrowid) ,parttype FROM part WHERE name = ?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($partid, $parentrowid, $parttype);
        $stmt->fetch();
        $stmt->close();
        if (!in_array($parttype, array(0,1,2)))
            return 'Unknown parttype: '.$parttype;
		

        //get fields
        $stmt = $this->db->prepare('SELECT field.name, fieldtype.name as typename FROM field, fieldtype WHERE field.parentstructrowid = G2B(?) AND field.fieldtype = fieldtype.fieldtypeid and fieldtype.typestyle <>5 ORDER BY field.sequence');
        $stmt->bind_param('s', $partid);
        $stmt->execute();
        $stmt->bind_result($name, $typename);
        $fields = '';
        $need_convert = array('ID', 'Reference');
        while ($stmt->fetch()) {
             if (isset($values[strtolower($name)])){
				if ($this->db->real_escape_string($values[strtolower($name)])==''){
					$fields .= ", /*".strtolower($name)."*/ NULL 
					";
				}else{
					$fields .= ", /*".strtolower($name)."*/ '".$this->db->real_escape_string($values[strtolower($name)])."' 
					";
				}
			 }else{
				 $fields .= ", /*".strtolower($name)."*/ NULL 
				 ";
			 }
			 if(strtolower($typename)=='file'){
				  if (isset($values[strtolower($name.'_ext')])){
					
					if ($this->db->real_escape_string($values[strtolower($name.'_ext')])==''){
						$fields .= ", /*".strtolower($name.'_ext')."*/ NULL  
						";
					}else{
						$fields .= ", /*".strtolower($name.'_ext')."*/ '".$this->db->real_escape_string($values[strtolower($name.'_ext')])."' 
						";
					}
					
				 }else{
					 $fields .= ", /*".strtolower($name.'_ext')."*/ NULL 
					 ";
				 }
			 }
			 
			 
			  // if (in_array($typename, $need_convert)) {
             //   $fields .= ', /*'.strtolower($name).'*/ ' . (isset($values[strtolower($name)]) ? ('\''.$this->db->real_escape_string($values[strtolower($name)]).'\'') : 'NULL');
            //} else {
            //    $fields .= ', /*'.strtolower($name).'*/ ' . (isset($values[strtolower($name)]) ? ('\''.$this->db->real_escape_string($values[strtolower($name)]).'\'') : '\'\'');
            //}
        }
        $stmt->close();

        $root_part = (is_null($parentrowid) || $parentrowid == '{00000000-0000-0000-0000-000000000000}');

        // корневой раздел простой
        if ( ($root_part) && ($parttype == 0 || $parttype == 1) ) {
			$qry='CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\'
                ' . $fields . '
            )';
		
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$qry .'\r\n
			'			, FILE_APPEND);
		
            $result = array();
			/*$res = $this->db->query($qry);
			//$error = $res->error;
			
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($qry)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if (!$this->db->more_results()) {
						break;
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

        // корневой раздел дерево
        if ( ($root_part) && ($parttype == 2) ) {
		        $qry='CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\',
                \'' . $this->db->real_escape_string($treeid) . '\'
                ' . $fields . '
            )';
			
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.$qry .'\r\n
			', FILE_APPEND);
			
            $result = array();
			/*$res = $this->db->query($qry);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($qry)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

        // раздел простой
        if ( (!$root_part) && ($parttype == 0 || $parttype == 1) ) {
		    $qry='CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
				\'' . $this->db->real_escape_string($parentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\'
                ' . $fields . '
            )';
			
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$qry .'\r\n
			'			, FILE_APPEND);
			
            $result = array();
			/*$res = $this->db->query($qry);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($qry)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

        // раздел дерево
        if ( (!$root_part) && ($parttype == 2) ) {
		    $qry='CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($parentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\',
                \'' . $this->db->real_escape_string($treeid) . '\'
                ' . $fields . '
            )';
			
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$qry .'\r\n
			'			, FILE_APPEND);
			
            $result = array();
			/*$res = $this->db->query($qry);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($qry)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

       
         return 'Error while adding row: '.$qry.' --> '.$error;
    }

    // Изменение строки  в разделе документа
    public function UpdateRowOld()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        $parentid = isset($this->request['ParentID']) ? $this->request['ParentID'] : '';
		$treeid = isset($this->request['TreeID']) ? $this->request['TreeID'] : '';
        $values = isset($this->request['Values']) ? $this->request['Values'] : '';
		
		if ($this->config['log']==true)		
		file_put_contents($this->config['logpath'].'/_debug.txt',				'>>>: '.'Verify params' .'\r\n'				, FILE_APPEND);
		
        if (empty($partname)) // PartName не передан - возвращаем ошибку
            return 'Error: PartName not set!';
        if (empty($rowid)) // RowID не передан - возвращаем ошибку
            return 'Error: RowID not set!';
			
		if ($this->config['log']==true)			
		file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.'Analize part' .'\r\n'			, FILE_APPEND);
        
		
          // get type (0-строка, 1-коллекция, 2-дерево)
        $stmt = $this->db->prepare('SELECT B2G(partid),B2G(parentrowid) ,parttype FROM part WHERE name = ?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($partid, $parentrowid, $parttype);
        $stmt->fetch();
        $stmt->close();
        if (!in_array($parttype, array(0,1,2)))
            return 'Unknown parttype: '.$parttype;
		
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',				'>>>: '.'Analize fields' .'\r\n'				, FILE_APPEND);
				
        //get fields
        $stmt = $this->db->prepare('SELECT field.name, fieldtype.name as typename FROM field, fieldtype WHERE field.parentstructrowid = G2B(?) AND field.fieldtype = fieldtype.fieldtypeid  and fieldtype.typestyle <>5 ORDER BY field.sequence');
        $stmt->bind_param('s', $partid);
        $stmt->execute();
        $stmt->bind_result($name, $typename);
        $fields = '';
        $need_convert = array('ID', 'Reference');
        while ($stmt->fetch()) {
           // if (in_array($typename, $need_convert)) {
           //     $fields .= ',/*'.strtolower($name).'*/ ' . (isset($values[strtolower($name)]) ? '\''.$this->db->real_escape_string($values[strtolower($name)]).'\'' : 'NULL');
           // } else {
            //    $fields .= ',/*'.strtolower($name).'*/ ' . (isset($values[strtolower($name)]) ? ('\''.$this->db->real_escape_string($values[strtolower($name)]).'\'') : '\'\'');
           // }
			
		    if (isset($values[strtolower($name)])){
				if ($this->db->real_escape_string($values[strtolower($name)])==''){
					$fields .= ", /*".strtolower($name)."*/ NULL 
					";
				}else{
					$fields .= ", /*".strtolower($name)."*/ '".$this->db->real_escape_string($values[strtolower($name)])."' 
					";
				}
			 }else{
				 $fields .= ", /*".strtolower($name)."*/ NULL 
				 ";
			 }
        }
        $stmt->close();
        $root_part = (is_null($parentrowid) || $parentrowid == '{00000000-0000-0000-0000-000000000000}');

        $res = false;
		if ($this->config['log']==true)		
		file_put_contents($this->config['logpath'].'/_debug.txt',				'>>>: '.'Make update' .'\r\n'				, FILE_APPEND);
				
		if ($this->config['log']==true)		
		file_put_contents($this->config['logpath'].'/_debug.txt',		'>>>: '.$fields.'\r\n'		, FILE_APPEND);

        // корневой раздел простой
        if ( ($root_part) && ($parttype == 0 || $parttype == 1) ) {
            $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\'
                ' . $fields . ')');
			
			
            $res = $stmt->execute();
            $error = $stmt->error;
            $stmt->close();
        }

        // корневой раздел дерево
        if ( ($root_part) && ($parttype == 2) ) {
            $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\',
                \'' . $this->db->real_escape_string($treeid) . '\'
                ' . $fields . '
            )');
			
		
			
            $res = $stmt->execute();
            $error = $stmt->error;
            $stmt->close();
        }

        // раздел простой
        if ( (!$root_part) && ($parttype == 0 || $parttype == 1) ) {
            $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($parentid) . '\',
				\'' . $this->db->real_escape_string($rowid) . '\'
                ' . $fields . '
            )');
			
            $res = $stmt->execute();
            $error = $stmt->error;
            $stmt->close();
        }

        // раздел дерево
        if ( (!$root_part) && ($parttype == 2) ) {
            $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($parentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\',
				\'' . $this->db->real_escape_string($treeid) . '\'
                ' . $fields . '
            )');
			
			
			
            $res = $stmt->execute();
            $error = $stmt->error;
            $stmt->close();
        }

        if ($res)
            return 'OK';
        else{
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',				'>>>: '.$error .'\r\n'				, FILE_APPEND);
            return 'Error while updating row: '.$error;
		}
    }
	
	
	public function setFirmdogInfo()
    {	
    	$partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';

    	$data['firmdog'] = isset($this->request['firmdog']) ? $this->request['firmdog'] : '';
    	$data['firmdognum'] = isset($this->request['firmdognum']) ? $this->request['firmdognum'] : '';
    	$data['fdogfrom'] = isset($this->request['fdogfrom']) ? $this->request['fdogfrom'] : '';
    	$data['fdogto'] = isset($this->request['fdogto']) ? $this->request['fdogto'] : '';

        if (empty($partname)) return 'Error: PartName not set!';	
        if (empty($rowid)) return 'Error: RowID not set!';

        $q = "UPDATE {$partname} t SET 
        t.firmdog =  g2b('{$data['firmdog']}'),
        t.firmdognum =  '{$data['firmdognum']}',
        t.fdogfrom =  '{$data['fdogfrom']}',
        t.fdogto =  '{$data['fdogto']}'
        WHERE {$partname}id = g2b('{$rowid}')";

        file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$q 			, FILE_APPEND);

        $stmt = $this->db->prepare($q);
        $stmt->execute();
        $stmt->close();
	}

	public function UpdateRow()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        $parentid = isset($this->request['ParentID']) ? $this->request['ParentID'] : '';
		$treeid = isset($this->request['TreeID']) ? $this->request['TreeID'] : '';
        $values = isset($this->request['Values']) ? $this->request['Values'] : '';
		
		$prefix = isset($this->request['Prefix']) ? $this->request['Prefix'] : '';
	
        if (empty($partname)) // PartName не передан - возвращаем ошибку
            return 'Error: PartName not set!';
			
        if (empty($rowid)) // RowID не передан - возвращаем ошибку
            return 'Error: RowID not set!';
		
		
          // get type (0-строка, 1-коллекция, 2-дерево)
        $stmt = $this->db->prepare('SELECT B2G(partid),B2G(parentrowid) ,parttype FROM part WHERE name = ?');
        $stmt->bind_param('s', $partname);
        $stmt->execute();
        $stmt->bind_result($partid, $parentrowid, $parttype);
        $stmt->fetch();
        $stmt->close();
        if (!in_array($parttype, array(0,1,2)))
            return 'Unknown parttype: '.$parttype;
		
				
        //get fields
        $stmt = $this->db->prepare('SELECT field.name, fieldtype.name as typename FROM field, fieldtype WHERE field.parentstructrowid = G2B(?) AND field.fieldtype = fieldtype.fieldtypeid  and fieldtype.typestyle <>5 ORDER BY field.sequence');
        $stmt->bind_param('s', $partid);
        $stmt->execute();
        $stmt->bind_result($name, $typename);
        $fields = '';
       $need_convert = array('ID', 'Reference');
        while ($stmt->fetch()) {
           // if (in_array($typename, $need_convert)) {
           //     $fields .= ',/*'.strtolower($name).'*/ ' . (isset($values[strtolower($name)]) ? '\''.$this->db->real_escape_string($values[strtolower($name)]).'\'' : 'NULL');
          //  } else {
          //      $fields .= ',/*'.strtolower($name).'*/ ' . (isset($values[strtolower($name)]) ? ('\''.$this->db->real_escape_string($values[strtolower($name)]).'\'') : '\'\'');
          //  }
		   if (isset($values[strtolower($name)])){
				
				if ($this->db->real_escape_string($values[strtolower($name)])==''){
					$fields .= ", /*".strtolower($name)."*/ NULL  
					";
				}else{
					$fields .= ", /*".strtolower($name)."*/ '".$this->db->real_escape_string($values[strtolower($name)])."' 
					";
				}
				
			 }else{
				 $fields .= ", /*".strtolower($name)."*/ NULL 
				 ";
			 }
			 if(strtolower($typename)=='file'){
				  if (isset($values[strtolower($name.'_ext')])){
					
					if ($this->db->real_escape_string($values[strtolower($name.'_ext')])==''){
						$fields .= ", /*".strtolower($name.'_ext')."*/ NULL  
						";
					}else{
						$fields .= ", /*".strtolower($name.'_ext')."*/ '".$this->db->real_escape_string($values[strtolower($name.'_ext')])."' 
						";
					}
					
				 }else{
					 $fields .= ", /*".strtolower($name.'_ext')."*/ NULL 
					 ";
				 }
			 }
        }
        $stmt->close();
        $root_part = (is_null($parentrowid) || $parentrowid == '{00000000-0000-0000-0000-000000000000}');

        // корневой раздел простой
        if ( ($root_part) && ($parttype == 0 || $parttype == 1) ) {
            $q = 'CALL ' . $this->db->real_escape_string($partname) .$prefix.'_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\'
                ' . $fields . ')';
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$q 			, FILE_APPEND);
			
			$result = array();
			/*$res = $this->db->query($q);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			*/
			$lastrow=null;
			
			if ($this->db->multi_query($q)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if (!$this->db->more_results()) {
						break;
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

        // корневой раздел дерево
        if ( ($root_part) && ($parttype == 2) ) {
            $q = 'CALL ' . $this->db->real_escape_string($partname) . $prefix.'_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\',
                \'' . $this->db->real_escape_string($treeid) . '\'
                ' . $fields . '
            )';
			
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$q 			, FILE_APPEND);
			
		    $result = array();
			/*$res = $this->db->query($q);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($q)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

        // раздел простой
        if ( (!$root_part) && ($parttype == 0 || $parttype == 1) ) {
            $q = 'CALL ' . $this->db->real_escape_string($partname) . $prefix.'_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($parentid) . '\',
				\'' . $this->db->real_escape_string($rowid) . '\'
                ' . $fields . '
            )';
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$q 			, FILE_APPEND);
			
            $result = array();
			/*$res = $this->db->query($q);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($q)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

        // раздел дерево
        if ( (!$root_part) && ($parttype == 2) ) {
            $q = 'CALL ' . $this->db->real_escape_string($partname) .$prefix. '_Save(
                \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\',
                \'' . $this->db->real_escape_string($documentid) . '\',
                \'' . $this->db->real_escape_string($parentid) . '\',
                \'' . $this->db->real_escape_string($rowid) . '\',
				\'' . $this->db->real_escape_string($treeid) . '\'
                ' . $fields . '
            )';
			if ($this->config['log']==true)		
			file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$q .'\r\n'			, FILE_APPEND);
			
			$result = array();
			/*$res = $this->db->query($q);
			//$error = $res->error;
			while ($row = $res->fetch_assoc()){
				$result[] = $row;
			}
			$res->close();
			return $result;*/
			
			$lastrow=null;
			
			if ($this->db->multi_query($q)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) 
							$lastrow = $row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
			$result[] = $lastrow;
			return $result;
        }

      	if ($this->config['log']==true)		
		file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$error .'\r\n'			, FILE_APPEND);
		return 'Error while updating row: '.$error;
		
    }
	

    public function SetRowOrder()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        // 'moveid'=>$item, 'toid' => $toItem, 'pos'=>$pos

        $moveid = isset($this->request['moveid']) ? $this->request['moveid'] : '';
        $toid = isset($this->request['toid']) ? $this->request['toid'] : '';
        $pos = isset($this->request['pos']) ? $this->request['pos'] : '';

        if (empty($partname))
            return 'Error: PartName not set!';
        if (empty($moveid))
            return 'Error: $moveid not set!';
        if (empty($toid))
            return 'Error: toid not set!';
        if (empty($pos)) 
            return 'Error: pos not set!';            
		$q='CALL ' . $this->db->real_escape_string($partname) . '_setSeq(   g2b(\''.$moveid.'\'), g2b(\''.$toid.'\'), \''.$pos.'\')';
		
        $stmt = $this->db->prepare($q);
    //    $stmt->bind_param($moveid, $toid, $pos);
	
		if ($this->config['log']==true)		
		file_put_contents($this->config['logpath'].'/_debug.txt',			'>>>: '.$q.'\r\n'			, FILE_APPEND);
        $res = $stmt->execute();
        $error = $stmt->error."\r\n 	". implode("\r\n 	",$stmt->error_list);
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while SetRowOrder row: '.$error;
    }
	
	 public function SetRowOrderTemp()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        // 'moveid'=>$item, 'toid' => $toItem, 'pos'=>$pos

        $moveid = isset($this->request['moveid']) ? $this->request['moveid'] : '';
        $toid = isset($this->request['toid']) ? $this->request['toid'] : '';
        $pos = isset($this->request['pos']) ? $this->request['pos'] : '';

        if (empty($partname))
            return 'Error: PartName not set!';
        if (empty($moveid))
            return 'Error: $moveid not set!';
        if (empty($toid))
            return 'Error: toid not set!';
        if (empty($pos)) 
            return 'Error: pos not set!';            

        $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_setSeq2(   \'' . $this->db->real_escape_string($this->SessionData['SessionID']) . '\', g2b(\''.$moveid.'\'), g2b(\''.$toid.'\'), \''.$pos.'\')');
    //    $stmt->bind_param($moveid, $toid, $pos);
        $res = $stmt->execute();
        $error = $stmt->error."\r\n 	". implode("\r\n 	",$stmt->error_list);
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while SetRowOrder row: '.$error;
    }

    public function SetFavorite()
    {
    	file_put_contents($this->config['logpath'].'/_debug.txt',			">>>: SetFavorite\r\n"			, FILE_APPEND);
        $instanceid = isset($this->request['instanceid']) ? $this->request['instanceid'] : '';
        $value = isset($this->request['value']) ? $this->request['value'] : '';
        $session = $this->SessionData['SessionID'];

        if (empty($instanceid))
            return 'Error: instanceid not set!';        

        $q = "INSERT INTO bp3_favorites (`instanceid`, `session`, `value`) VALUES (g2b('{$instanceid}') , g2b('{$session}'), '{$value}') 
        							ON DUPLICATE KEY UPDATE `value` = '{$value}'";

        //file_put_contents($this->config['logpath'].'/_debug.txt',			">>>: {$q} \r\n"			, FILE_APPEND);

        $stmt = $this->db->prepare($q);

     //   $stmt->bind_param('ss', $instanceid, $this->SessionData['SessionID'], $value);
        $res = $stmt->execute();

        

        $error = $stmt->error."\r\n 	". implode("\r\n 	",$stmt->error_list);
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while SetRowOrder row: '.$error;
    }

    public function ResetFavorite()
    {
    	file_put_contents($this->config['logpath'].'/_debug.txt',			">>>: SetFavorite\r\n"			, FILE_APPEND);
        $type = isset($this->request['type']) ? $this->request['type'] : '';
        $session = $this->SessionData['SessionID'];

        if (empty($type))
            return 'Error: type not set!';        

        $q = "UPDATE bp3_favorites t set t.`value` = 0 WHERE t.`session` = g2b('{$session}')  
        AND (SELECT i.objtype from instance i where i.instanceid = t.instanceid LIMIT 1) like '{$type}' ";

        //file_put_contents($this->config['logpath'].'/_debug.txt',			">>>: {$q} \r\n"			, FILE_APPEND);

        $stmt = $this->db->prepare($q);

        $res = $stmt->execute();

        

        $error = $stmt->error."\r\n 	". implode("\r\n 	",$stmt->error_list);
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while SetRowOrder row: '.$error;
    }

    public function CheckOperation()
	{
		$session = $this->SessionData['SessionID'];
		$operation = isset($this->request['operation']) ? $this->request['operation'] : '';

		$q = "select roles_operations.allowaction as allow 
			from roles_operations  
   			join roles_def on roles_def.instanceid=roles_operations.instanceid
   			join the_Session on the_Session.userrole=roles_def.roles_defid
   			where the_Session.the_Sessionid=g2b('{$session}') 
   			AND roles_operations.name like '{$operation}'";
   		
		$res = $this->db->query($q);

        if ($res === false)
            return false;

        while ($row = $res->fetch_assoc()){
            $result = $row;
        }

        $res->close();

        return $result['allow'];
	}

    // удаление строки  в разделе документа
    public function DeleteRow()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';
        if (empty($partname)) // PartName не передан - возвращаем ошибку
            return 'Error: PartName not set!';
        if (empty($rowid)) // RowID не передан - возвращаем ошибку
            return 'Error: RowID not set!';

        $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_Delete(?, ?, null)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $rowid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while deleting row: '.$error;
    }
	
	
	 // архивирование строки  в разделе документа
    public function ArchiveRow()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';
        if (empty($partname)) // PartName не передан - возвращаем ошибку
            return 'Error: PartName not set!';
        if (empty($rowid)) // RowID не передан - возвращаем ошибку
            return 'Error: RowID not set!';

        $stmt = $this->db->prepare('CALL ' . $this->db->real_escape_string($partname) . '_Archive(?, ?, null)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $rowid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while deleting row: '.$error;
    }

    // Удаление документа
    public function DeleteDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL Instance_Delete(?, ?)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $documentid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while deleting document: '.$error;
    }
	
	  public function ArchiveDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL Instance_ARCHIVE(?, ?)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $documentid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while archiving document: '.$error;
    }
	
	public function ReArchiveDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL Instance_REARCHIVE(?, ?)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $documentid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while re archiving document: '.$error;
    }

	 public function PrepareDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL ' .$typename.'_GetToTemp(?, ?)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $documentid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while preparing document: '.$error;
    }
	
	public function GetCard()
    {
        $result = array();
		$result['success']=false;
		$result['msg']='Не удалось получить данные';
		
		$typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $instanceid = isset($this->request['instanceid']) ? $this->request['instanceid'] : '';
		
        if (empty($instanceid)) // Document не передан - возвращаем ошибку
		{
            $result['msg']='Error: instanceid not set!';
			return $result;			
		} 
		$query="CALL ".$typename."_getcard('".$this->SessionData['SessionID']."', '".$instanceid."')";
			
		if ($this->db->multi_query($query)) 
		{
			do 
			{
				if ($resultset = $this->db->store_result()) 
				{

					while ($row = $resultset->fetch_assoc()) {
						
						if($row['success']=='true') 
						{
							$result['success']=true;
							unset($row['success']);
							unset($result['msg']);
							if(count($row))	$result['data'] = $row;
						}
						else
						{
							if($row['msg']) $result['msg']=$row['msg'];
							else $result['msg']='Ошибка при получении данных';	
						}
						
					}
					
					$resultset->free();
				}
			
				if ($this->db->more_results()) {
			
				}		
			} while ($this->db->next_result());
		}

		
	
		return $result;
    }
	
	 public function CommitDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL ' .$typename.'_commitfromtemp(?, ?)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $documentid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while commiting document: '.$error;
    }
	
	
	 public function DropTempDocument()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

        $stmt = $this->db->prepare('CALL ' .$typename.'_droptempdata(?, ?)');
        $stmt->bind_param('ss', $this->SessionData['SessionID'], $documentid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error while commiting document: '.$error;
    }
	
    // Установить состояние документа
    public function SetDocumentStatus()
    {
        $typename = isset($this->request['TypeName']) ? $this->request['TypeName'] : '';
        $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
        $statusname = isset($this->request['StatusName']) ? $this->request['StatusName'] : '';
        if (empty($documentid)) // Document не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';
        if (empty($statusname)) // StatusName не передан - возвращаем ошибку
            return 'Error: StatusName not set!';
        if (empty($typename)) // TypeName не передан - возвращаем ошибку
            return 'Error: TypeName not set!';

        $stmt = $this->db->prepare('CALL Instance_Status(?, ?, (SELECT b2g(objstatus.objstatusid) FROM objecttype JOIN objstatus ON objecttype.objecttypeid=objstatus.parentstructrowid AND objecttype.name=? AND objstatus.name=? LIMIT 1))');
        $stmt->bind_param('ssss', $this->SessionData['SessionID'], $documentid, $typename, $statusname);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
        if ($res)
            return 'OK';
        else
            return 'Error, status not set: '.$error;
    }

    // Сохранение файла
    public function AddFile()
    {
        $filename = isset($this->request['FileName']) ? $this->request['FileName'] : '';
        $fileid = isset($this->request['FileID']) ? $this->request['FileID'] : '';
        $data = isset($this->request['Data']) ? utf8_decode($this->request['Data']) : '';
		$orig =isset($this->request['OrigName']) ? $this->request['OrigName'] : $filename;
		
		
		
        if (strlen($filename) < 3)
            return 'FileName must be set!';
			
        // Проверяем, существует ли папка хранилища, если нет - пробуем создать
        $savepath = $this->config['storage'] . DIRECTORY_SEPARATOR . $fileid ;
        if ( !file_exists($savepath) )
            if (!mkdir($savepath, 0777, true))
                return 'Failed to save file!';

        if (file_put_contents($savepath . DIRECTORY_SEPARATOR . $filename, $data) === FALSE)
            return 'Failed to save file!';
			
		if($filename!=$orig){
		if ($this->config['log']==true)	
			file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: AddFile>>>SF:'.$filename .'  O:'.$orig.'\r\n', FILE_APPEND);
			try {
				$stmt = $this->db->prepare('CALL origname_save(?, ?)');
				$stmt->bind_param('ss',  $filename, $orig);
				$res = $stmt->execute();
				$stmt->close();
			} catch (Exception $e) {
				if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: AddFile>>>Err:'.$e->getMessage() .'\r\n', FILE_APPEND);
					
			}
		}
		
        return 'OK';
    }
	
	
	
	 public function GetIconList()
    {
        $filelist = array();
		if ($handle = opendir($this->config['icons'])) {
		    while ($entry = readdir($handle)) {
			//echo $entry.'   fnm:'.fnmatch("*.png", $entry).'<br/>'			;
				if (fnmatch("*.png", $entry)){
					$myrow = new stdClass();
					$myrow->name=$entry;
					$filelist[] = $myrow;
				}
		      
		    }
		    closedir($handle);
		}
		sort($filelist);
        return $filelist;
		
    }
	
	
	// Сохранение файла с иконкой
    public function AddIconFile()
    {
        $filename = isset($this->request['FileName']) ? $this->request['FileName'] : ''; //собственно имя файла
        $data = isset($this->request['Data']) ? utf8_decode($this->request['Data']) : ''; //получили данные
		$origname = isset($this->request['Data']) ? utf8_decode($this->request['OrigName']) : ''; //получили данные
		
		//$filename = md5($data);
        if (strlen($filename) < 3)
            return 'FileName must be set!';
		$savepath = $this->config['icons'] . DIRECTORY_SEPARATOR . $origname ;
        if ( file_exists($savepath) )
             unlink($savepath);

        if (file_put_contents($savepath , $data) === FALSE) //Пробуем переместить изображение в ...icons folder
            return 'Failed to save image file!';

        return 'OK';
    }
	
	// Сохранение файла изображения
    public function AddPhotoFile()
    {
	//Сначала кидаем изображение в _big, потом копируем два файла в _preview и _small, потом масштабируем их
        $filename = isset($this->request['FileName']) ? $this->request['FileName'] : ''; //собственно имя файла
        $fileid = isset($this->request['FileID']) ? $this->request['FileID'] : ''; //имя КАТЕГОРИИ файла (например b2b, b2c, b2fr...) без постфиксов (_big и пр.)
        $data = isset($this->request['Data']) ? utf8_decode($this->request['Data']) : ''; //получили данные
		
		//$filename = md5($data);
        if (strlen($filename) < 3)
            return 'FileName must be set!';
        // Проверяем, существуют ли ТРИ папки хранилища, куда будут класться отмасштабированные картинки (если нет, пробуем создать их с правами chmod 777)
        $savepath_big = $this->config['storage'] . DIRECTORY_SEPARATOR . $fileid . '_big';
        if ( !file_exists($savepath_big) )
            if (!mkdir($savepath_big, 0777, true))
                return 'Failed to save _big image file!';

        $savepath_preview = $this->config['storage'] . DIRECTORY_SEPARATOR . $fileid . '_preview';
        if ( !file_exists($savepath_preview) )
            if (!mkdir($savepath_preview, 0777, true))
                return 'Failed to save _preview image file!';
				
        $savepath_small = $this->config['storage'] . DIRECTORY_SEPARATOR . $fileid . '_small';
        if ( !file_exists($savepath_small) )
            if (!mkdir($savepath_small, 0777, true))
                return 'Failed to save _small image file!';
		
        if (file_put_contents($savepath_big . DIRECTORY_SEPARATOR . $filename, $data) === FALSE) //Пробуем переместить изображение в ..._big folder
            return 'Failed to save image file!';
			
	//	if (copy($savepath_big . DIRECTORY_SEPARATOR . $filename, $savepath_preview . DIRECTORY_SEPARATOR . $filename) ===  FALSE)
	//		if (copy($savepath_big . DIRECTORY_SEPARATOR . $filename, $savepath_small . DIRECTORY_SEPARATOR . $filename) ===  FALSE)
	//			return 'Failed to copy image file!'; //пытаемся скопировать изображение в папки _preview и _small
		
		//Получаем параметры загруженного (в папку _big) изображения (ширина-высота, тип и пр.)
		list($i_width, $i_height, $i_type, $i_attr) = getimagesize($savepath_big . DIRECTORY_SEPARATOR . $filename);
		
		$small_max_size = 90; //Максимальный размер ширины/высоты small изображения
		$preview_max_size = 500; //Максимальный размер ширины/высоты preview изображения

		//Функция изменения размеров и преобразования изображения в формат jpeg
		function imageresize($outfile,$infile,$neww,$newh,$quality,$realtype) {
			if ($realtype==2) {$im=imagecreatefromjpeg($infile);}
			if ($realtype==3) {$im=imagecreatefrompng($infile);}
			if ($realtype==1) {$im=imagecreatefromgif($infile);}
			if ($realtype==6) {$im=imagecreatefromwbmp($infile);}

			$im1=imagecreatetruecolor($neww,$newh);
			imagecopyresampled($im1,$im,0,0,0,0,$neww,$newh,imagesx($im),imagesy($im));
			imagejpeg($im1,$outfile,$quality);
			imagedestroy($im);
			imagedestroy($im1);
		}
		
		//Задаем коэффициенты масштабирования $i_quo и $i_quo2 для preview и small соответственно
		if ($i_height>$i_width) {
			$i_quo=$i_height/$preview_max_size; 
			$i_quo2=$i_height/$small_max_size;
		} else {
			$i_quo=$i_width/$preview_max_size; 
			$i_quo2=$i_width/$small_max_size;
		}
		
		$f1=$savepath_big . DIRECTORY_SEPARATOR . $filename;
		$fn=$savepath_preview . DIRECTORY_SEPARATOR . $filename;
		$fs=$savepath_small . DIRECTORY_SEPARATOR . $filename;
		
	//	imageresize($f1,$f1,$i_width,$i_height,70,$i_type);
		imageresize($fn,$f1,$i_width/$i_quo,$i_height/$i_quo,70,$i_type); //Масштабируем preview изображение
		imageresize($fs,$f1,$i_width/$i_quo2,$i_height/$i_quo2,70,$i_type); //Масштабируем small изображение
		
	
        return 'OK';
    }
	
	
	
  
	
	public function RotatePhotoFile(){
	    $filename = isset($this->request['FileName']) ? $this->request['FileName'] : ''; //собственно имя файла
        $prefix = isset($this->request['Prefix']) ? $this->request['Prefix'] : ''; //имя КАТЕГОРИИ файла (например b2b, b2c, b2fr...) без постфиксов (_big и пр.)
		$degree  = isset($this->request['Degree']) ? $this->request['Degree'] : 90; // Угол поворота изображения
			//$filename = md5($data);
        if (strlen($filename) < 3)
            return 'FileName must be set!';
			
        // Проверяем, существуют ли ТРИ папки хранилища, куда будут класться отмасштабированные картинки (если нет, пробуем создать их с правами chmod 777)
        $savepath_big = $this->config['storage'] . DIRECTORY_SEPARATOR . $prefix . '_big';
        if ( !file_exists($savepath_big) )
            if (!mkdir($savepath_big, 0777, true))
                return 'Failed to save _big image file!';

        $savepath_preview = $this->config['storage'] . DIRECTORY_SEPARATOR . $prefix . '_preview';
        if ( !file_exists($savepath_preview) )
            if (!mkdir($savepath_preview, 0777, true))
                return 'Failed to save _preview image file!';
				
        $savepath_small = $this->config['storage'] . DIRECTORY_SEPARATOR . $prefix . '_small';
        if ( !file_exists($savepath_small) )
            if (!mkdir($savepath_small, 0777, true))
                return 'Failed to save _small image file!';
				
		$fb=$savepath_big . DIRECTORY_SEPARATOR . $filename;
		$fn=$savepath_preview . DIRECTORY_SEPARATOR . $filename;
		$fs=$savepath_small . DIRECTORY_SEPARATOR . $filename;
		
	
		
		$res=$fb;
		$im=imagecreatefromjpeg($fb);
		if($im){
			$im1 =imagerotate($im, $degree, 0);
			//$res=$res.' size_X='.imagesx($im).' size_Y='.imagesy($im);
			imagedestroy($im);
			if($im1){
				$res=$res.'   converted';
				$res=$res.' size_X='.imagesx($im1).' size_Y='.imagesy($im1);
				imagejpeg($im1,$fb,70);
				$res=$res.'   save as jpeg';
				
				imagedestroy($im1);
			}else{
				$res=$res.' connvert error ;';
				$err = error_get_last();
				var_export($err);
			}
		}else{
				$res=$res.' open error ;';
				$err = error_get_last();
				var_export($err);
		}
		
		
		$res=$res.'   
		'.$fn;
		$im=imagecreatefromjpeg($fn);
		if($im){
			$res=$res.' size_X='.imagesx($im).' size_Y='.imagesy($im);
			$im1 =imagerotate($im, $degree, 0);
			imagedestroy($im);
			if($im1){
				$res=$res.'   converted';
				$res=$res.' size_X='.imagesx($im1).' size_Y='.imagesy($im1);
				imagejpeg($im1,$fn,70);
				$res=$res.'   save as jpeg';
				
				imagedestroy($im1);
				
			}else{
				$res=$res.' connvert error ;';
				$err = error_get_last();
				var_export($err);
			}
		}else{
				$res=$res.' open error ;';
				$err = error_get_last();
				var_export($err);
		}
		
		
		$res=$res.'   
		'.$fs;
		$im=imagecreatefromjpeg($fs);
		if($im){
			$res=$res.' size_X='.imagesx($im).' size_Y='.imagesy($im);
			$im1 =imagerotate($im, $degree, 0);
			imagedestroy($im);
			if($im1){
				$res=$res.'   converted';
				$res=$res.' size_X='.imagesx($im1).' size_Y='.imagesy($im1);
				imagejpeg($im1,$fs,70);
				$res=$res.'   save as jpeg';
				
				imagedestroy($im1);
			}else{
				$res=$res.' connvert error ;';
				$err = error_get_last();
				var_export($err);
			}
		}else{
				$res=$res.' open error ;';
				$err = error_get_last();
				var_export($err);
		}
		
		
         return 'OK';

	}

    // Удаление файла
    public function DeleteFile()
    {
        $fileid = isset($this->request['FileID']) ? $this->request['FileID'] : ''; // Будем считать что это имя файла
        $filename = isset($this->request['FileName']) ? $this->request['FileName'] : '';
        if (strlen($fileid) < 1)
            return 'FileID must be set!';

		$filepath = $this->config['storage'] . DIRECTORY_SEPARATOR . $fileid  . DIRECTORY_SEPARATOR . $filename;
        if (file_exists($filepath)) {
            if (unlink($filepath)) {
                return 'OK';
            } else {
                return 'Error while deleting file!';
            }
        } else {
            return 'File not found!';
        }
    }

    // Получение файла
    public function GetFile()
    {
        $fileid = isset($this->request['FileID']) ? $this->request['FileID'] : '';
        if (strlen($fileid) <= 1)
            return 'FileID must be set!';

        $data = '';
        if (is_readable($this->config['storage'] . DIRECTORY_SEPARATOR . $fileid))
            $data = file_get_contents($this->config['storage'] . DIRECTORY_SEPARATOR . $fileid);
        return $data;
    }

    // Список файлов по маске
    public function FileList()
    {
        $result = array();
        $filemask = isset($this->request['FileMask']) ? $this->request['FileMask'] : '';
        if (is_dir($this->config['storage'])) {
            if ($dh = opendir($this->config['storage'])) {
                while (($file = readdir($dh)) !== false) {
                    if ( $file != '.' && $file != '..' && preg_match("/$filemask/i", $file))
                        $result[] = $file;
                }
                closedir($dh);
            }
        }
        return $result;
    }

    // Новый UUID
    public function NewGuid()
    {
        $result = '';
        $stmt = $this->db->prepare('SELECT UUID()');
        $stmt->execute();
        $stmt->bind_result($uuid);
        if ($stmt->fetch()) {
            $result = $uuid;
        }
        $stmt->close();
        return '{'.strtoupper($result).'}';
    }

	public function ProcessRole()
    {
	        $values = isset($this->request['Values']) ? $this->request['Values'] : '';
			$name = $values['name'];
			$id = $values['instanceid'];
			$value = $values['value'];
		
			if($value=="true"){
				$qry = "update iu_rcfg_mod set moduleaccessible=-1 where name='".$name."' and instanceid=g2b('". $id . "')";
			 }else{
				$qry = "update iu_rcfg_mod set moduleaccessible=0 where name='".$name."' and instanceid=g2b('". $id . "')";
			 }
						
			if ($this->config['log']==true)	
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>: '.$qry .'\r\n', FILE_APPEND);
				
			 $stmt = $this->db->prepare($qry);
			 $res = $stmt->execute();
			$stmt->close();
			return 'OK';
			 
	}
	
	
	
	
	
	
	function treeFirstNode($mass, $id)
	{
		$array = array();
		
		for($i=0; $i<count($mass); $i++) 
		{
			if ($mass[$i]['id']==$id)
			{		
				$array[]=$mass[$i];
				return $array;			
			}		
		}						
	}

	function treeChildrenTreeNode($mass,$parentId)
	{
		$array = array();
		
		for($i=0; $i<count($mass); $i++) 
		{
			if ($mass[$i]['parentId']==$parentId)
			{
				$array[]=$mass[$i];
			}
		}
		return $array;
	}
		
	function treeNodes($mass, $first, $parentId)
	{
		
		if ($first == 0)$obj=$this->treeFirstNode($mass,$parentId);
		else $obj=$this->treeChildrenTreeNode($mass,$parentId);

		$first++;
		
		$arrTree = array();
		
		for($i=0; $i<count($obj); $i++) 
		{			
			$PID = $obj[$i]['id'];      
			
			$children = $this->treeNodes($mass,$first, $PID);
			
			$tmp = array();
			
			foreach($obj[$i] as $key => $value) $tmp[$key]=$value;
		
			if($children)
			{						 
				$tmp['leaf']    =    false;	
				$tmp['children']=    $children;
				$arrTree[] = $tmp;			
			}
			else 
			{				
				$tmp['leaf']    =    true;
				$arrTree[] = $tmp;					
			} 			
		}				

		return $arrTree;
	}
		
		public function GetStoreTree()
		{
			$query="SELECT * FROM v_bfrm_struct";
				
			$tree = array();
			
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) $tree[]=$row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}

			$result=$this->treeNodes($tree, 0, '{00000000-0000-0000-0000-000000000000}');
		
			return $result;
		} 
		
		
		/*
		
		function treeCommentFirstNode($mass,$first, $id)
		{
			$array = array();
			
			for($i=$first; $i<count($mass); $i++) 
			{
			
				if ($mass[$i]['parentid']==$id)
				{		
					$array[]=$mass[$i];
					return $array;			
				}		
			}						
		}
		
		function treeCommentNodes($mass, $first, $parentId)
		{
			
						
			$obj=$this->treeCommentFirstNode($mass,$first,$parentId);
		
				
			if ($this->config['log']==true)		
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>treeCommentNodes   obj=: '.json_encode($obj) .'
				', FILE_APPEND);
			$first++;
			
			$arrTree = array();
			
			for($i=$first; $i<count($obj); $i++) 
			{			
				$PID = $obj[$i]['id'];      
				
				$children = $this->treeCommentNodes($mass,$first, $PID);
				
				$tmp = array();
				
				foreach($obj[$i] as $key => $value) $tmp[$key]=$value;
			
				if($children)
				{						 
					$tmp['leaf']    =    false;	
					$tmp['children']=    $children;
					$tmp['expanded'] = true;
					$arrTree[] = $tmp;			
				}
				else 
				{				
					$tmp['leaf']    =    true;
					$arrTree[] = $tmp;					
				} 			
			}				
			
			return $arrTree;
		}
		*/
		
		
		public function GetCommentTree($instanceid,$parentid,$curator)
		{
		
		    if($curator=='false'){
				$query="select b2g(instanceid) instanceid,  b2g(iu_cm_msgid) id ,b2g(parentrowid) parentid,`iu_u_def_brief_f`(`iu_cm_msg`.`theauthor`,NULL)  `theauthor`, b2g(theauthor) aid,thedate,info
				,thefile, thefile_ext, theref from iu_cm_msg  where (curatoronly=0 or curatoronly is null) and parentrowid=g2b('".$parentid."') and instanceid= g2b('".$instanceid."') order by thedate";
			}else{
				$query="select b2g(instanceid) instanceid,  b2g(iu_cm_msgid) id ,b2g(parentrowid) parentid,`iu_u_def_brief_f`(`iu_cm_msg`.`theauthor`,NULL)  `theauthor`, b2g(theauthor) aid,thedate,info
				,thefile, thefile_ext, theref from iu_cm_msg  where parentrowid=g2b('".$parentid."') and instanceid= g2b('".$instanceid."') order by thedate";
				}
			$tree = array();
			
		
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) $tree[]=$row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
	
			
			for($i=0; $i<count($tree); $i++) 
			{
				$children=$this->GetCommentTree( $tree[$i]['instanceid'], $tree[$i]['id'],$curator);
				
				if($children){
					$tree[$i]['children'] = $children;
					$tree[$i]['expanded'] = true;
					$tree[$i]['leaf'] = false;
					
				}else{
					$tree[$i]['leaf'] = true;
				}
			
			}
			
			return $tree;
		}
		
		
		public function GetCommentThemes()
		{
		    $instanceid = isset($this->request['instanceid']) ? $this->request['instanceid'] : ''; 
			$curator = isset($this->request['curator']) ? $this->request['curator'] : 'false'; 
			if($curator=='false'){ 
			$query="
					select b2g(iu_cm_def.instanceid) instanceid,	b2g(iu_cm_def.iu_cm_defid) id  ,'THEME' parentid,
					 `iu_u_def_brief_f`(`iu_cm_def`.`theauthor`,NULL) theauthor,
					 `b2g`(`iu_cm_def`.`theauthor`) aid,
					 iu_cm_def.thedate   ,
					 iu_cm_def.thetheme info
					,null thefile, null thefile_ext, null theref 
					from iu_cm_def 
                    join instance on `instance`.`instanceid` =iu_cm_def.instanceid
                    where instance.archived=0     and  b2g(iu_cm_def.theprocess)='".$instanceid."'
					and  (iu_cm_def.curatoronly=0 or iu_cm_def.curatoronly is null)
					and  iu_cm_def.isdiscussion=-1  and iu_cm_def.thevideo is null and iu_cm_def.thedoc is null
					order by iu_cm_def.thedate";
			}else{
					$query="
					select b2g(iu_cm_def.instanceid) instanceid,	b2g(iu_cm_def.iu_cm_defid) id  ,'THEME' parentid,
					 `iu_u_def_brief_f`(`iu_cm_def`.`theauthor`,NULL) theauthor,
					 `b2g`(`iu_cm_def`.`theauthor`) aid,
					 iu_cm_def.thedate   ,
					 iu_cm_def.thetheme info
					,null thefile, null thefile_ext, null theref 
					from iu_cm_def 
                    join instance on `instance`.`instanceid` =iu_cm_def.instanceid
                    where instance.archived=0     and  b2g(iu_cm_def.theprocess)='".$instanceid."'
					and  iu_cm_def.isdiscussion=-1  and iu_cm_def.thevideo is null and iu_cm_def.thedoc is null
					order by iu_cm_def.thedate";
			}
					
			$tree = array();
			
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) $tree[]=$row;
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
		
			for($i=0; $i<count($tree); $i++) 
			{
				$children =$this->GetCommentTree($tree[$i]['instanceid'],'{00000000-0000-0000-0000-000000000000}',$curator);
				if($children){
					$tree[$i]['children'] = $children;
					$tree[$i]['expanded'] = true;
					$tree[$i]['leaf'] = false;
					
				}else{
					$tree[$i]['leaf'] = true;
				}
			}
			
			return $tree;
		}
		
		public function GetCommentVideoThemes()
		{
		    $instanceid = isset($this->request['instanceid']) ? $this->request['instanceid'] : ''; 
			$curator = isset($this->request['curator']) ? $this->request['curator'] : 'false'; 
			$children =$this->GetCommentTree($instanceid,'{00000000-0000-0000-0000-000000000000}',$curator);
				
			
			return $children;
		}
		/////////////////////////////////////////////////////////////////////////
		
		public function GetTasks($statusid, $instanceid)
		{
		
			$query="select  iu_statustask.name ,b2g(iu_task.instanceid) id, iu_task.taskfinished,iu_task.taskcancelled,iu_task.ischecked,iu_task.createdate,  iu_task.finishdate,
				ifnull(iu_u_def.lastname,concat('<',drole.name,'>')) lastname,iu_u_def.name username, iu_u_def.surname,iu_crole.name rolename, b2g(iu_task.instanceid) taskinstanceid  from 
				iu_urok_def 
				join  iud_process_def  on iu_urok_def.processtype=iud_process_def.iud_process_defid
				join iu_status on iu_status.theprocess=iud_process_def.iud_process_defid
				join iu_statustask on iu_status.instanceid=iu_statustask.instanceid
				join 	iu_crole drole on iu_statustask.doertype=drole.iu_croleid
				left join iu_task on statetask=iu_statustaskid and iu_task.theprocess=iu_urok_def.iu_urok_defid
				left join iu_u_def on iu_task.doer=iu_u_def.iu_u_defid
				left join  iu_crole  on iu_u_def.currole=iu_crole.iu_croleid
				where iu_urok_def.instanceid=g2b('".$instanceid."') and iu_status.iu_statusid=g2b('".$statusid."')
				order by iu_statustask.tasksequence";
				
			$tree = array();
			
		
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) $tree[]=$row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
	
			 
			if ($this->config['log']==true)		
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>GetTasks   tree=: '.json_encode($tree) .'
				', FILE_APPEND);
			
			for($i=0; $i<count($tree); $i++) 
			{
				
				$tree[$i]['leaf'] = true;
				$tree[$i]['iconCls'] = 'icon-page_gear';
				
			}
			return $tree;
		}
		
		public function GetStates($stageid, $instanceid)
		{
		
			$query="select distinct iu_status.name , b2g(iu_statusid) id,
			     null taskfinished,null taskcancelled,null ischecked ,null createdate,null finishdate,null lastname ,null username ,null surname,null rolename ,null taskinstanceid
				 from iu_status
				join  iud_process_def  on iu_status.theprocess=iud_process_def.iud_process_defid
				join  iud_stagedef  on iu_status.thestage=iud_stagedef.iud_stagedefid
				join iu_urok_def on iu_urok_def.processtype=iud_process_def.iud_process_defid
				where iu_urok_def.instanceid=g2b('".$instanceid."') and iud_stagedefid =g2b('".$stageid."')
				order by  iu_status.sequence";
				
			$tree = array();
			
		
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{

						while ($row = $resultset->fetch_assoc()) $tree[]=$row;

						
						$resultset->free();
					}
				
					if ($this->db->more_results()) {
				
					}		
				} while ($this->db->next_result());
			}
	        
			if ($this->config['log']==true)		
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>GetStates   tree=: '.json_encode($tree) .'
				', FILE_APPEND);
			
			for($i=0; $i<count($tree); $i++) 
			{
				$children=$this->GetTasks( $tree[$i]['id'],$instanceid );
				
				if($children){
					$tree[$i]['children'] = $children;
					$tree[$i]['expanded'] = true;
					$tree[$i]['leaf'] = false;
					$tree[$i]['iconCls'] = 'icon-chart_curve';
					
				}else{
					$tree[$i]['iconCls'] = 'icon-chart_curve';
					$tree[$i]['leaf'] = true;
				}
			
			}
			return $tree;
		}
		
		
		public function GetUrokProcess()
		{
		    $instanceid = isset($this->request['instanceid']) ? $this->request['instanceid'] : ''; 
			$query="select distinct iud_stagedef.name , b2g(iud_stagedefid) id,
					null taskfinished,null taskcancelled,null ischecked ,null createdate,null finishdate,null lastname ,null username ,null surname,null rolename ,null taskinstanceid
					 from iu_status
					join  iud_process_def  on iu_status.theprocess=iud_process_def.iud_process_defid
					join  iud_stagedef  on iu_status.thestage=iud_stagedef.iud_stagedefid
					join iu_urok_def on iu_urok_def.processtype=iud_process_def.iud_process_defid
					where iu_urok_def.instanceid=g2b('".$instanceid."')
					order by  iud_stagedef.sequence";
					
			$tree = array();
			
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) $tree[]=$row;
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
			if ($this->config['log']==true)		
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>GetUrokProcess   tree=: '.json_encode($tree) .'
				', FILE_APPEND);
		
			for($i=0; $i<count($tree); $i++) 
			{
				$children =$this->GetStates($tree[$i]['id'],$instanceid);
				if($children){
					$tree[$i]['children'] = $children;
					$tree[$i]['expanded'] = true;
					$tree[$i]['leaf'] = false;
					$tree[$i]['iconCls'] = 'icon-chart_pie';
					
				}else{
					$tree[$i]['leaf'] = true;
					$tree[$i]['iconCls'] = 'icon-chart_pie';
				}
			}
			
			return $tree;
		}
		
		
	public function GetDeptUser($myid, $deptid,$ismanager,$iscur)
		{
		if($iscur==1){
				$query="select concat(ifnull(iu_u_def.lastname,''),' ',ifnull(iu_u_def.name,''),' ', ifnull(iu_u_def.surname,''),' (',iu_orgtree.name,')') brief, b2g(iu_u_def.iu_u_defid) id ,b2g(iu_orgtree.iu_orgtreeid) deptid, ismanager
				 from  iu_u_def  
				 join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid 
				join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid
				join iu_orgtree mydept on mydept.parentrowid =iu_orgtree.parentrowid
				where mydept.iu_orgtreeid=g2b('".$deptid."') and iu_u_def.iu_u_defid <> g2b('".$myid."') order by iu_orgtree.name,iu_u_def.lastname ";
		}else{		
		   if($ismanager==-1){
					$query="select concat(ifnull(iu_u_def.lastname,''),' ',ifnull(iu_u_def.name,''),' ', ifnull(iu_u_def.surname,''),' (',iu_orgtree.name,')') brief, b2g(iu_u_def.iu_u_defid) id ,b2g(iu_orgtree.iu_orgtreeid) deptid, ismanager
						 from  iu_u_def  
						 join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid 
						join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid
						where iu_orgtree.iu_orgtreeid=g2b('".$deptid."') and iu_u_def.iu_u_defid <>g2b('".$myid."') order by iu_orgtree.name,iu_u_def.lastname ";
		   }else{
				$query="select concat(ifnull(iu_u_def.lastname,''),' ',ifnull(iu_u_def.name,''),' ', ifnull(iu_u_def.surname,''),' (',iu_orgtree.name,')') brief, b2g(iu_u_def.iu_u_defid) id ,b2g(iu_orgtree.iu_orgtreeid) deptid, ismanager
						 from  iu_u_def  
						 join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid 
						join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid
						where iu_orgtree.parentrowid=g2b('".$deptid."') and iu_u_def.iu_u_defid <> g2b('".$myid."') order by iu_orgtree.name,iu_u_def.lastname ";
		   }
		}	
					
					
			$tree = array();
			
			
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) $tree[]=$row;
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
			$res=array();
			if(count($tree)>0){
			
				$prev=$tree[0]['deptid'];
				for($i=0; $i<count($tree); $i++) 
				{
					$res[]=$tree[$i];
					if($prev!=$tree[$i]['deptid']){
						$children =$this->GetDeptUser($myid,$prev,0,0);
						for($j=0; $j<count($children); $j++) {
							$res[]=$children[$j];
						}
						$prev=$tree[$i]['deptid'];
					}
				}
				$children =$this->GetDeptUser($myid,$prev,0);
				for($j=0; $j<count($children); $j++) {
					$res[]=$children[$j];
				}
			}
			
			return $res;
		}
		
		public function GetGANTT(){
		
			 $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
			$query="select   iu_taskid id, iu_task_doer users,iu_task_subj text,
			DATE_FORMAT(iu_task_createdate,'%d-%m-%Y') start_date,
			DATE_FORMAT(iu_task_planenddate,'%d-%m-%Y') end_date,  
            DATE_FORMAT(iu_task_planenddate,'%d-%m-%Y') fin_date,  
			datediff(iu_task_planenddate,iu_task_createdate) duration, 
			if(iu_task_taskfinished='да',datediff(ifnull(iu_task_finishdate,now()),iu_task_createdate), if(iu_task_taskcancelled='да',0,datediff(ifnull(iu_task_finishdate,now()),iu_task_createdate))) fakt,
			iu_task_taskfinished fineshed, 
			iu_task_taskcancelled cancelled,
			ifnull(iu_task_delegatefrom_id,'') parent, 
			if(iu_task_taskcancelled='да',0,datediff(ifnull(iu_task_finishdate,now()),iu_task_createdate)/datediff(iu_task_planenddate,iu_task_createdate)) progress
			from v_autoiu_task 
				 where urokid='".$documentid."'
				 order by iu_task_createdate";
			$rows = array();
			
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) $rows[]=$row;
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
		
			
			return $rows;
		}
		
		
		public function GetDocModes(){
		
			 $documentid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
			 
			$d=array(); 	 
			$rows = array();
			 $query="select   name
					from objectmode where defaultmode=-1 and
				 parentstructrowid=g2b('".$documentid."')
				 order by name";
				 
			
			
			$ok=false;
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) {$ok=true; $d[]=$row;}
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
			
			
			
			$row1= new stdClass();
			$row1->name='';
			if($ok)
				$row1->thecomment='пустой  - по умолчанию ( '.$d[0]['name'] .')';
			else
				$row1->thecomment='нет режимов';
			$rows[]=$row1;
			
			 $query="select   name,concat(name,' - ', thecomment) thecomment
					from objectmode where defaultmode=0 and
				 parentstructrowid=g2b('".$documentid."')
				 order by name";
				 
			
			
			
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) $rows[]=$row;
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
		
			
			return $rows;
		}
		
		public function GetDelegates()
		{
		  
			$query="select concat(ifnull(iu_u_def.lastname,''),' ',ifnull(iu_u_def.name,''),' ', ifnull(iu_u_def.surname,'')) brief, b2g(iu_u_def.iu_u_defid) id ,b2g(iu_orgtree.iu_orgtreeid) deptid, ismanager,iu_crole.name rolename
						 from  iu_u_def  
						 join iu_crole on iu_u_def.currole=iu_crole.iu_croleid
						 join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid 
						join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid
						join users on iu_u_def.login=users.login
						join the_session on the_session.usersid=users.usersid
						where the_session.the_sessionid=g2b('".$this->SessionData['SessionID']."')";
			
			$delegator = array();
			
				
			if ($this->db->multi_query($query)) 
			{
				do 
				{
					if ($resultset = $this->db->store_result()) 
					{
						while ($row = $resultset->fetch_assoc()) $delegator[]=$row;
					
						$resultset->free();
					}
					if ($this->db->more_results()) {
					}		
				} while ($this->db->next_result());
			}
			
			$tree = array();
		
			for($i=0; $i<count($delegator); $i++) 
			{
				if ($delegator[$i]['rolename']=='куратор')
					$iscur =1;
				else
					$iscur =0;
				$children =$this->GetDeptUser($delegator[$i]['id'],$delegator[$i]['deptid'],$delegator[$i]['ismanager'],$iscur);
				for($j=0; $j<count($children); $j++) {
					$tree[]=$children[$j];
				}
			}
			
			return $tree;
		}
		
		
		
    // скрытие строки  в разделе документа
    public function HideRow()
    {
        $partname = isset($this->request['PartName']) ? $this->request['PartName'] : '';
        $rowid = isset($this->request['RowID']) ? $this->request['RowID'] : '';
        if (empty($partname)) // PartName не передан - возвращаем ошибку
            return 'Error: PartName not set!';
        if (empty($rowid)) // RowID не передан - возвращаем ошибку
            return 'Error: RowID not set!';

		$q="update 	".$partname ." set curatoronly=-1 where ".$partname."id=g2b('".$rowid."')";
        $stmt = $this->db->prepare($q);
        //$stmt->bind_param('ss', $this->SessionData['SessionID'], $rowid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while hide row: '.$error;
    }
	
	
	public function ReadLC()
    {
        
        $rowid = isset($this->request['DocumentID']) ? $this->request['DocumentID'] : '';
     
        if (empty($rowid)) // RowID не передан - возвращаем ошибку
            return 'Error: DocumentID not set!';

		$q="update 	iu_l_def set readdate=now() where instanceid=g2b('".$rowid."')";
        $stmt = $this->db->prepare($q);
        //$stmt->bind_param('ss', $this->SessionData['SessionID'], $rowid);
        $res = $stmt->execute();
        $error = $stmt->error;
        $stmt->close();
		
        if ($res)
            return 'OK';
        else
            return 'Error while mark read : '.$error;
    }
	
	
	 // получить  идентификатор строки по VKID
    public function FindByID()
    {
        $result = array();
        $tablename = isset($this->request['Table']) ? $this->request['Table'] : '';
        $idfield = isset($this->request['IDField']) ? $this->request['IDField'] : 'vkid';
		$idvalue = isset($this->request['IDValue']) ? $this->request['IDValue'] : '0';
		
		/*if ($this->config['log']==true)		
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>FindByID   : '.$tablename.'  '.$idfield.'  '.$idvalue.'
				', FILE_APPEND);	
		*/
        if (empty($tablename) ||  empty($idfield )  || empty($idvalue) ) 
            return $result;
		$q='SELECT B2G('.$tablename.'id)  as id ,B2G(instanceid) as instanceid  FROM '. $tablename. ' WHERE '.$idfield.'=? LIMIT 1';

				
        $stmt = $this->db->prepare($q);
        $stmt->bind_param('s', $idvalue);
        $stmt->execute();
        $stmt->bind_result($id,$iid);
		
        while ($stmt->fetch()) {
            $result['rowid'] = $id;
			$result['instanceid'] = $iid;
        }
		
        $stmt->close();
		/*if ($this->config['log']==true)		
				file_put_contents($this->config['logpath'].'/_debug.txt', '>>>FindByID   : '.json_encode($result) .'
				', FILE_APPEND);	
		*/
        return $result;
    }
		
}
?>

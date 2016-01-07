<?php

global $dconfig;

$dconfig = array();

// Реквизиты БД
$dconfig['db']['server'] = 'localhost';
$dconfig['db']['database'] = 'vkas3';
$dconfig['db']['username'] = 'root';
$dconfig['db']['password'] = '';

// полный путь к каталогу файлового хранилища
$dconfig['storage'] = 'C:/bami/Projects/AS/web/files';
$dconfig['icons'] = 'C:/bami/Projects/AS/web/resources/icons';
$dconfig['logpath']='C:/bami/Projects/AS/web/application/logs';
$dconfig['temppath']='C:/bami/Projects/AS/work/temp/';
$dconfig['log']=true;

?>

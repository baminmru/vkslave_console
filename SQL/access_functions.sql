
DELIMITER $$

drop function `vkusr_access_f`
$$
CREATE  FUNCTION `vkusr_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_usr
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_usr.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end
$$

drop function `vkcam_access_f`
$$
CREATE  FUNCTION `vkcam_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_camowner 
  join vk_usr on vk_camowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_camowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end



$$

drop function `vkads_access_f`
$$
CREATE  FUNCTION `vkads_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_adsowner 
  join vk_usr on vk_adsowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_adsowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end

$$


drop function `vkrot_access_f`
$$
CREATE  FUNCTION `vkrot_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_rotowner 
  join vk_usr on vk_rotowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_rotowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end

$$


drop function `vkprj_access_f`
$$
CREATE  FUNCTION `vkprj_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_prjowner 
  join vk_usr on vk_prjowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_prjowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end

$$



drop function `vktrg_access_f`
$$
CREATE  FUNCTION `vktrg_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_trgowner 
  join vk_usr on vk_trgowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_trgowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end

$$


drop function `vktsk_access_f`
$$
CREATE  FUNCTION `vktsk_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_taskowner 
  join vk_usr on vk_taskowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_taskowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end

$$



drop function `vkbrk_access_f`
$$
CREATE  FUNCTION `vkbrk_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select count(*) into existscnt from vk_brkowner 
  join vk_usr on vk_brkowner.vkusr=vk_usr.vk_usrid
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) and vk_brkowner.instanceid=g2b(ainstanceid);
  if existscnt = 0 then
     return 0;
  end if;

  return 1;
end

$$


-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$
drop procedure `vkprj_initownership`
$$

CREATE  PROCEDURE `vkprj_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_prjowner(instanceid,vk_prjownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$


drop procedure `vkrot_initownership`
$$

CREATE  PROCEDURE `vkrot_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_rotowner(instanceid,vk_rotownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$


drop procedure `vkads_initownership`
$$

CREATE  PROCEDURE `vkads_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_adsowner(instanceid,vk_adsownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$


drop procedure `vkcam_initownership`
$$

CREATE  PROCEDURE `vkcam_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_camowner(instanceid,vk_camownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$



drop procedure `vktrg_initownership`
$$

CREATE  PROCEDURE `vktrg_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_trgowner(instanceid,vk_trgownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$


drop procedure `vktsk_initownership`
$$

CREATE  PROCEDURE `vktsk_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_taskowner(instanceid,vk_taskownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$


drop procedure `vkbrk_initownership`
$$

CREATE  PROCEDURE `vkbrk_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 declare curusr binary(16);
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

  select vk_usrid into curusr from  vk_usr 
  join users on vk_usr.vk_usrid=users.usersid 
  join the_session on users.usersid=the_session.usersid
  where the_sessionid =g2b(acursession) ;

  insert into vk_brkowner(instanceid,vk_brkownerid,changestamp,vkusr) values( g2b(ainstanceid),g2b(uuid()),now(),curusr);

end
$$
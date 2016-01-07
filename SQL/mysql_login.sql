-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$
drop procedure Login
$$

CREATE PROCEDURE `Login`( out aTHE_SESSION varchar(38)/* Идентификатор новой сессии */

,aPWD VARCHAR(80)/* Пароль */

,aUSR VARCHAR (64)/* Имя пользователя */

)
body:begin
 declare aID binary(16); 
    declare aUSERSID binary(16); 
    declare asysid binary(16); 
    declare existsCnt int;  
    declare aStatus varchar(38);

set asysid = null; 

select instanceid into asysid from instance where objtype = 'MTZSYSTEM'; 

set athe_session=null  ; 
set aUSERSID=null;

 if aPWD is null then 
    set athe_session=null  ; 
 
else 
  
	 select USERSID into ausersid from users where Login=ausr and Password =MD5(aPWD); 
	 set  aID=G2B(UUID())  ; 
	 if not aUSERSID  is null then
		 if asysid is null then 
				insert into the_session(the_sessionid,lastaccess,usersid,closed,startAt,changestamp) 
				values(aid,sysdate,ausersid,0,now(),now()); 
		else 
				insert into the_session(instanceid,the_sessionid,lastaccess,usersid,closed,startAt,changestamp) 
				values(asysid,aid,now(),ausersid,0,now(),now()); 
		end if; 

		set athe_session=b2g(aid); 
	end if;
	-- call build_usercache(b2g(aid));
		
end if;

end
$$
drop procedure Logout;
$$

CREATE  PROCEDURE `Logout`(aCURSESSION varchar(38))/* Идентификатор сессии */
body:begin
declare
existsCnt integer;
select count(*) into existsCnt from the_session where the_sessionid=g2b(acursession) and closed=0;
if existsCnt >0 then
    update INSTANCE set LockSessionID =null where LockSessionID=acursession ;
    update the_session set closed=1,closedAt=now(), changeStamp=now() where     
    the_sessionid=g2b(acursession);
     delete from SysRefCache where sessionid= g2b(acursession);
 End if;
end
$$



/*пользователи*/

drop procedure if exists users_save
$$


create procedure users_save /*пользователи*/ (
 acursession varchar(38),
ainstanceid varchar(38) ,
 ausersid varchar(38)
,afamily
 varchar (255)/* фамилия *//* фамилия */
,aname
 varchar (64)/* имя *//* имя */
,asurname
 varchar (255)/* отчество *//* отчество */
,alogin
 varchar (64)/* имя для входа *//* имя для входа */
,apassword varchar(80)/* пароль *//* пароль */
,adomainame
 varchar (255)/* доменное имя *//* доменное имя */
,aemail varchar(255)/* e-mail *//* e-mail */
,aphone
 varchar (20)/* телефон *//* телефон */
,alocalphone
 varchar (20)/* местный телефон *//* местный телефон */
)  body: begin  
 declare auniquerowcount integer;
 declare atmpstr varchar(255);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare aec int;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
if aec=0  then
  select 'сессия уже завершена.' result;
    leave body;
  end if;
/*if exists */ select  count(*) into aec from users where usersid=g2b(ausersid);
if aec >0 then
 --  update  --
 --  verify access  --
 select checkoperation( acursession ,'users.edit') into aaccess;
 if aaccess=0  then
    select 'изменение строк не разрешено. раздел=users' result;
    leave body;
  end if;
 start transaction ; 
 update  users set changestamp=now()
,
  family=afamily
,
  name=aname
,
  surname=asurname
,
  login=alogin
,
  domainame=adomainame
,
  email=aemail
,
  phone=aphone
,
  localphone=alocalphone
  where  usersid = g2b(ausersid) ;
-- if asessuserlogin<>'replicator'  then
 select count(*) into  auniquerowcount from users where instanceid=g2b(ainstanceid) 
 and login=alogin;
if auniquerowcount>=2 then
 select 'нарущение уникальности сочетания полей. раздел=пользователи' result;
  rollback;
  leave body;
end if;
 -- end if;

call users_client_trigger(acursession,ausersid);

  	select count(*) into aec from users where password=apassword and usersid = g2b(ausersid) ;
	if aec=0  then
    if apassword is null then
        update users set password=md5(alogin) where usersid = g2b(ausersid);
    else
        update users set password=md5(apassword) where usersid = g2b(ausersid);
    end if;
		
	end if;

 else
 --  insert  --
 --  verify access  --
 select checkoperation( acursession ,'users.add') into aaccess;
 if aaccess=0  then
    select 'добавление строк не разрешено. раздел=users' result;
    leave body;
  end if;
  

  
  
 start transaction;  
 insert into   users
 (  usersid 
,instanceid
,family

,name

,surname

,login

,password

,domainame

,email

,phone

,localphone

 ) values ( g2b(ausersid) 
,g2b(ainstanceid)
,afamily

,aname

,asurname

,alogin

,md5(apassword)

,adomainame

,aemail

,aphone

,alocalphone

 ) ;
-- if asessuserlogin<>'replicator'  then
 select count(*) into  auniquerowcount from users where instanceid=g2b(ainstanceid) 
 and login=alogin;
if auniquerowcount>=2 then
 select 'нарущение уникальности сочетания полей. раздел=пользователи' result;
  rollback;
  leave body;
end if;
 -- end if;

call users_client_trigger(acursession,ausersid);

 end if;
 commit; 
select 'ok' result;
 end 
$$


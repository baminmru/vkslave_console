delimiter $$
CREATE
TRIGGER `vk_usr_updated`
AFTER UPDATE ON `vk_usr`
FOR EACH ROW
begin
    declare existsCnt  integer;
    declare ID  binary(16);
    select instanceid into id from instance where objtype='MTZUsers';

	  if new.vkid<>old.vkid then
			
				select count(*) into existsCnt from users where  usersid=new.vk_usrid;
				if existsCnt = 0 then
				  
				   select count(*) into existsCnt from users where login=old.vkid ;
					if existsCnt = 0 then
							 insert into users
							 (changestamp,instanceid,usersid,family,name,surname, login,password) 
							 values 
							 (sysdate(),id,new.vk_usrid,new.last_name,new.first_name,'',new.vkid,md5(new.vkid));
					else
							update users  set login=new.vkid, password=  md5(new.vkid) where  login = old.vkid ;
							update users set family=new.last_name,name=new.first_name,surname='' where login=new.vkid ;
					end if;
				else
					update users  set login=new.vkid, password=  md5(new.vkid) where  login = old.vkid ;
					update users  set login=new.vkid, password=  md5(new.vkid) where  usersid=new.vk_usrid;
					update users set family=new.last_name,name=new.first_name,surname='' where usersid=new.vk_usrid;
				end if;
	
        else
				update users set family=new.last_name,name=new.first_name,surname='' where login=new.vkid  or usersid=new.vk_usrid;
		end if;

end$$



CREATE  TRIGGER vk_usr_inserted AFTER INSERT ON vk_usr FOR EACH ROW
begin
    declare existsCnt  integer;
    declare ID  binary(16);
    if new.vkid <> '' then
        select count(*) into existsCnt from users where login=new.vkid or usersid=new.vk_usrid;
        if existsCnt = 0 then
         select instanceid into id from instance where objtype='MTZUsers';
         insert into users
         (changestamp,instanceid,usersid,family,name,surname, login,password) 
         values 
         (sysdate(),id,new.vk_usrid,new.last_name,new.first_name,'',new.vkid,md5(new.vkid));
       else
		 update users
			set family=new.last_name,name=new.first_name,surname='', login=new.vkid where usersid=new.vk_usrid;
		update users
			set family=new.last_name,name=new.first_name,surname=''  where login=new.vkid;
        end if;
    end if;
vkrot_initownership
end
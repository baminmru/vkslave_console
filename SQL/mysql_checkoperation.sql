-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop function `checkoperation`
$$
CREATE  FUNCTION `checkoperation`(
    acursession varchar(38)
    ,aopname varchar(255)
) RETURNS tinyint(1)
    READS SQL DATA
begin
  declare isok int;
  select 1 into isok;
  /*select roles_operations.allowaction into isok from   roles_operations  
      join roles_def on roles_def.instanceid=roles_operations.instanceid
      join the_session on the_session.userrole=roles_def.roles_defid
      where the_session.the_sessionid=g2b(acursession) 
      and roles_operations.name=aopname;
*/
  if isok<>0 then
      return 1;
  else
      return 0;
  end if;
end
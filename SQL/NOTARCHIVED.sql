DELIMITER $$


drop  FUNCTION `NotArchived`
$$
CREATE  FUNCTION `NotArchived`(
 aINSTANCEID binary(16)
) RETURNS TINYINT(1)
    READS SQL DATA
begin  

 declare existsCnt int;
 select 0 into existsCnt;
 select archived into existsCnt from instance where INSTANCEID=aINSTANCEID limit 0,1;
 if existsCnt=0 then
    return 1;
 else
    return 0;
 end if;
end
$$
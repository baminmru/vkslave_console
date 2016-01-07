delimiter $$
 drop procedure RowParents
 $$

create  procedure RowParents
        (aQueryID varchar(38)
        ,aRowID varchar(38)
        ,aTable VARCHAR (255)
        ,aCURSESSION varchar(38)
        )
body:begin
        
declare aplevel integer;
declare aparent varchar(255);
declare aprev varchar(255);
declare aec int;

 select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0  then
    leave body;
  end if;
  
  
set aparent =atable;
set @tmpID = g2b(aROWID);
set aplevel =0;
delete from RPRESULT where RPRESULTID  =g2b(aQUERYID);
insert into RPRESULT(RPRESULTID,PARENTLEVEL,PARTNAME,ROWID)values(g2b(aQUERYID),aPLEVEL,atable,g2b(aRowID));

again:loop
set aplevel =aplevel + 1;
set aprev = aparent;
set aparent = null;
select value into aparent from sysoptions where optiontype ='parent' and  name=aprev;

 if aparent is null then

    set @ss = concat('select InstanceID into @tmpRowID from ' , aprev , ' where ' ,aprev ,'id=?');
    PREPARE stmt FROM @ss;
    EXECUTE stmt USING @tmpid;
    DEALLOCATE PREPARE stmt;

   insert into RPRESULT(RPRESULTID,PARENTLEVEL,PARTNAME,ROWID)values(g2b(aQUERYID),aPLEVEL,'INSTANCE',@tmpRowID);
   leave again;

 Else

    set @ss = concat('select ParentStructRowID  into @tmpRowID from ' , aprev , ' where ' ,aprev ,'id=?');
    PREPARE stmt FROM @ss;
    EXECUTE stmt USING @tmpid;
    DEALLOCATE PREPARE stmt;
    set @tmpID = @tmpROWID;
   insert into RPRESULT(RPRESULTID,PARENTLEVEL,PARTNAME,ROWID)
   values(g2b(aQUERYID),aPLEVEL,aparent,@tmpRowID);
    
 End if;
End loop again;
end
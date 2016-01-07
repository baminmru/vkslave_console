create table origname(
filename varchar(255) primary key,
origname varchar(255) not null

);

delimiter $$
drop procedure origname_save
$$
create procedure origname_save( f varchar(255), o varchar(255))
begin

insert into origname(filename,origname) values(f,o);
end
$$

select * from origname;
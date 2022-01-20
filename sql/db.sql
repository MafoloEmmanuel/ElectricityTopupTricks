drop table if exists electricity_meter ;
drop table if exists appliance ;
drop table if exists street ;

create table appliance (
	id serial primary key,
	name text,
	rate decimal(4,2)
);

create table street (
	id serial primary key,
	name text
);

create table electricity_meter (

	id serial primary key,
	street_number text,
	street_id int,
	balance decimal(8,2),
	meter_number text,
	foreign key (street_id) references street(id)
 
);

-- 3 meters per street
insert into street (name) values ('Miller Street');
insert into street (name) values ('Mathaba Crescent');
insert into street (name) values ('Vilakazi Road');

insert into electricity_meter (street_number, street_id, balance,meter_number) values (1, 1, 50, 'ABC123' );
insert into electricity_meter (street_number, street_id, balance,meter_number) values (6, 1, 50, 'DEF123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (8, 1, 50, 'GHI123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (12, 2, 50, 'JKL123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (7, 2, 50, 'MNO123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (5, 2, 50, 'PQR123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (11, 3, 50, 'STU123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (6, 3, 50, 'VWX123');
insert into electricity_meter (street_number, street_id, balance,meter_number) values (13, 3, 50, 'YZA123');

insert into appliance (name, rate) values ('Stove', 4.5);
insert into appliance (name, rate) values ('TV', 1.8);
insert into appliance (name, rate) values ('Heater', 3.5);
insert into appliance (name, rate) values ('Fridge', 4.0);
insert into appliance (name, rate) values ('Kettle', 2.7);

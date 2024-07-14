create database card_image;
use card_image;
create table users (
	id int auto_increment not null,
    name varchar(100),
    email varchar(100),
    rol varchar(45),
    password varchar(50),
    img varchar(200),
    primary key(id)
);
create table self_user (
	id int,
    name varchar(100),
    email varchar(100),
    rol varchar(45),
    password varchar(50),
    img varchar(200),
    primary key(id)
);

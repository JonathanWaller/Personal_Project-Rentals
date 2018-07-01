create table users
(
    id serial primary key,
    user_name varchar(50),
    authid varchar(100),
    user_avatar text,
    user_email varchar(50)
);
create table properties
(
    id serial primary key,
    property_title varchar(100),
    property_location text,
    beds integer,
    baths integer,
    description text,
    amenities text,
    price integer
);

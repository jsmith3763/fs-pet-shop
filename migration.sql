DROP DATABASE IF EXISTS petshop;
CREATE DATABASE petshop;
\c petshop
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id serial PRIMARY KEY,
    age integer,
    name varchar(15),
    kind varchar(15)
);
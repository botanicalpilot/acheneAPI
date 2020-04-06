CREATE TABLE crops (
ID SERIAL PRIMARY KEY,
commonname VARCHAR(255) NOT NULL,
scientificname VARCHAR(255) NOT NULL,
seeddatespring DATE,
startdatespring DATE,
seeddatefall DATE,
startdatefall DATE
);

INSERT INTO crops (commonname, scientificname)
VALUES ('CN Example', 'SN Example');
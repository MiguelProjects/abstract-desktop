--- load with 
--- psql "dbname='webdb' user='webdbuser' password='password' host='localhost'" -f schema.sql

DROP TABLE ftdstats;
DROP TABLE ftduser;


CREATE TABLE ftduser (
	username VARCHAR(20) NOT NULL PRIMARY KEY,
	class varchar(10) NOT NULL
);

CREATE TABLE ftdstats(
	username varchar(20) NOT NULL PRIMARY KEY,
	kills integer NOT NULL CHECK (kills>=0),
	score integer NOT NULL CHECK (score>=0),
	timeSurvived numeric NOT NULL CHECK (timeSurvived>=0),
	FOREIGN KEY (username) references ftduser (username) ON UPDATE CASCADE ON DELETE CASCADE
);


-- CREATE TABLE ftdmedi(
-- 	username varchar(20) PRIMARY KEY,
-- 	kills integer NOT NULL CHECK (kills>=0),
-- 	score integer NOT NULL CHECK (score>=0),
-- 	timeSurvived numeric CHECK (timeSurvived>=0),
-- 	FOREIGN KEY (username) references ftduser (username) ON UPDATE CASCADE ON DELETE CASCADE
-- );


-- CREATE TABLE ftdhard(
-- 	username varchar(20) PRIMARY KEY,
-- 	kills integer NOT NULL CHECK (kills>=0),
-- 	score integer NOT NULL CHECK (score>=0),
-- 	timeSurvived numeric CHECK (timeSurvived>=0),
-- 	FOREIGN KEY (username) references ftduser (username) ON UPDATE CASCADE ON DELETE CASCADE
-- );
--- Could have also stored as 128 character hex encoded values
--- select char_length(encode(sha512('abc'), 'hex')); --- returns 128
INSERT INTO ftduser VALUES('user1', 'tricky');
INSERT INTO ftduser VALUES('user2', 'assassin');
INSERT INTO ftduser VALUES('user3', 'soldier');

INSERT INTO ftdstats VALUES('user1', 100, 2, 3.0);
INSERT INTO ftdstats VALUES('user2', 200, 21, 0.0);
INSERT INTO ftdstats VALUES('user3', 10, 12, 1.0);

-- INSERT INTO ftdmedi VALUES('user1', 100, 2, 3.0);
-- INSERT INTO ftdmedi VALUES('user2', 200, 21, 0.0);


-- INSERT INTO ftdeasy VALUES('user1', 100, 2, 3.0);

--- load with 
--- psql "dbname='webdb' user='webdbuser' password='password' host='localhost'" -f schema.sql
DROP TABLE ftduser;
DROP TABLE ftdeasy;
DROP TABLE ftdmedi;
DROP TABLE ftdhard;
CREATE TABLE ftduser (
	username VARCHAR(20) PRIMARY KEY,
	password BYTEA NOT NULL,
	age smallint CHECK (age>=14 AND age<=120),
	class varchar(10) NOT NULL,
	difficulty integer NOT NULL CHECK (difficulty >= 0 AND difficulty <= 3)
);

CREATE TABLE ftdeasy(
	username varchar(20) PRIMARY KEY,
	kills integer NOT NULL CHECK (kills>=0),
	score integer NOT NULL CHECK (score>=0),
	timeSurvived numeric CHECK (timeSurvived>=0),
	FOREIGN KEY (username) references ftduser (username) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE ftdmedi(
	username varchar(20) PRIMARY KEY,
	kills integer NOT NULL CHECK (kills>=0),
	score integer NOT NULL CHECK (score>=0),
	timeSurvived numeric CHECK (timeSurvived>=0),
	FOREIGN KEY (username) references ftduser (username) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE ftdhard(
	username varchar(20) PRIMARY KEY,
	kills integer NOT NULL CHECK (kills>=0),
	score integer NOT NULL CHECK (score>=0),
	timeSurvived numeric CHECK (timeSurvived>=0),
	FOREIGN KEY (username) references ftduser (username) ON UPDATE CASCADE ON DELETE CASCADE
);
--- Could have also stored as 128 character hex encoded values
--- select char_length(encode(sha512('abc'), 'hex')); --- returns 128
INSERT INTO ftduser VALUES('user1', sha512('password1'), 10, 'lord');
INSERT INTO ftduser VALUES('user2', sha512('password2'), 9, 'lord');
INSERT INTO ftduser VALUES('user3', sha512('password3'), 8, 'lord');

INSERT INTO ftdhard VALUES('user1', 100, 2, 3.0);
INSERT INTO ftdhard VALUES('user2', 200, 21, 0.0);
INSERT INTO ftdhard VALUES('user3', 10, 12, 1.0);

INSERT INTO ftdmedi VALUES('user1', 100, 2, 3.0);
INSERT INTO ftdmedi VALUES('user2', 200, 21, 0.0);


INSERT INTO ftdeasy VALUES('user1', 100, 2, 3.0);

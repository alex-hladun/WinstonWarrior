CREATE TABLE holes (
	hole_id integer PRIMARY KEY AUTOINCREMENT,
	course_id integer,
	hole_num integer,
	hole_par integer,
	hole_distance_blue varchar,
	pin_lat varchar,
	pin_lng varchar,
	camera_lat varchar,
	camera_lng varchar,
	camera_hdg varchar,
	camera_alt varchar,
	camera_zm varchar
);

CREATE TABLE courses (
	course_id integer PRIMARY KEY AUTOINCREMENT,
	name text
);

CREATE TABLE scores (
	score_id integer PRIMARY KEY AUTOINCREMENT,
	user_id integer,
	hole_id integer,
	date_time datetime,
	total_shots integer,
	total_putts integer,
	driver_direction integer,
	approach_rtg integer,
	chip_rtg integer,
	putt_rtg integer,
	round_id integer
);

CREATE TABLE users (
	user_id integer PRIMARY KEY AUTOINCREMENT,
	user_name text
);

CREATE TABLE rounds (
	round_id integer PRIMARY KEY AUTOINCREMENT,
	course_id integer,
	user_id integer,
	total_score integer,
	end_date datetime
);

CREATE TABLE distances (
	distance_id integer PRIMARY KEY AUTOINCREMENT,
	user_id integer,
	club_id integer,
	date_time datetime
);

CREATE TABLE clubs (
	club_id integer PRIMARY KEY AUTOINCREMENT,
	name text
);

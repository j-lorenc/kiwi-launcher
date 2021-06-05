--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE launchers (
	launcher_id	TEXT NOT NULL UNIQUE,
	name	TEXT NOT NULL UNIQUE,
	install_dir	INTEGER NOT NULL,
	created_dt	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP UNIQUE,
	PRIMARY KEY("launcher_id")
);


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE launchers;

CREATE TABLE teams (
  name TEXT PRIMARY KEY,
  month INTEGER NOT NULL CHECK (month >= 1 and month <= 12),
  day INTEGER NOT NULL CHECK (day >= 1 and day <= 31),
  "group" INTEGER NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0) DEFAULT 0
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    team1 TEXT NOT NULL REFERENCES teams (NAME),
    team2 TEXT NOT NULL REFERENCES teams (NAME),
    score1 INTEGER NOT NULL CHECK (score1 >= 0),
    score2 INTEGER NOT NULL CHECK (score1 >= 0)
);

CREATE PROCEDURE delete_all()
LANGUAGE SQL
AS $$
DELETE FROM matches;
DELETE FROM teams;
$$;
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
LANGUAGE ‘plpgsql’
AS $$
DELETE FROM matches;
DELETE FROM teams;
$$;

CREATE PROCEDURE insert_match(team1 TEXT, team2 TEXT, score1 INTEGER, score2 INTEGER)
AS $$
DECLARE
    g1 INTEGER := (SELECT "group" FROM teams WHERE name=team1);
    g2 INTEGER := (SELECT "group" FROM teams WHERE name=team2);
    s1 INTEGER := 3;
    s2 INTEGER := 3;
BEGIN
IF g1 != g2 THEN
    RAISE '% and % are not in the same group.', team1, team2;
END IF;
IF score1 > score2 THEN
    s1 = 5;
    s2 = 1;
ELSIF score1 < score2 THEN
    s1 = 1;
    s2 = 5;
END IF;
UPDATE teams SET score = score + s1 WHERE name = team1;
UPDATE teams SET score = score + s2 WHERE name = team2;
INSERT INTO matches (team1, team2, score1, score2) VALUES (team1, team2, score1, score2);
END;
$$ LANGUAGE plpgsql;
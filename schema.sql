CREATE TABLE teams (
  name TEXT PRIMARY KEY,
  month INTEGER NOT NULL CHECK (month >= 1 and month <= 12),
  day INTEGER NOT NULL CHECK (day >= 1 and day <= 31),
  "group" INTEGER NOT NULL,
  points INTEGER NOT NULL CHECK (points >= 0) DEFAULT 0,
  goals INTEGER NOT NULL CHECK (goals >= 0) DEFAULT 0,
  alt_points INTEGER NOT NULL CHECK (alt_points >= 0) DEFAULT 0
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    team1 TEXT NOT NULL REFERENCES teams (NAME),
    team2 TEXT NOT NULL REFERENCES teams (NAME),
    score1 INTEGER NOT NULL CHECK (score1 >= 0),
    score2 INTEGER NOT NULL CHECK (score2 >= 0)
);

CREATE PROCEDURE delete_all()
    LANGUAGE sql
AS
$$
DELETE FROM matches;
DELETE FROM teams;
$$;

CREATE PROCEDURE insert_match(IN team1 TEXT, IN team2 TEXT, IN score1 INTEGER, IN score2 INTEGER)
AS $$
DECLARE
    g1 INTEGER := (SELECT "group" FROM teams WHERE name=team1);
    g2 INTEGER := (SELECT "group" FROM teams WHERE name=team2);
    s1 INTEGER := 1;
    s2 INTEGER := 1;
    as1 INTEGER := 3;
    as2 INTEGER := 3;
BEGIN
IF g1 != g2 THEN
    RAISE '% and % are not in the same group.', team1, team2;
END IF;
IF score1 > score2 THEN
    RAISE NOTICE 'branch 1';
    s1 = 3;
    s2 = 0;
    as1 = 5;
    as2 = 1;
ELSIF score1 < score2 THEN
    RAISE NOTICE 'branch 2';
    s1 = 0;
    s2 = 3;
    as1 = 1;
    as2 = 5;
END IF;
RAISE NOTICE '% % % % % %', team1, s1, s2, team2, as1, as2;
UPDATE teams SET points = points + s1, alt_points = alt_points + as1, goals = goals + score1 WHERE name = team1;
UPDATE teams SET points = points + s2, alt_points = alt_points + as2, goals = goals + score2 WHERE name = team2;
INSERT INTO matches (team1, team2, score1, score2) VALUES (team1, team2, score1, score2);
END;
$$ LANGUAGE plpgsql;

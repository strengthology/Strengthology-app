CREATE TABLE IF NOT EXISTS exercises (
    id varchar(50) PRIMARY KEY,
    exerciseName varchar(50),
    exerciseType varchar(50),
    exerciseCategory varchar(50)
);

insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Squat', 'Strength', 'Powerlifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Bench Press', 'Strength', 'Powerlifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Deadlift(Conventional)', 'Strength', 'Powerlifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Deadlift(Sumo)', 'Strength', 'Powerlifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Press', 'Strength', 'Other');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Pendlay Row', 'Strength', 'Other');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Log Press', 'Strength', 'Strongman');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Clean and Jerk', 'Strength', 'Olympic Lifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Snatch', 'Strength', 'Olympic Lifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Hang Snatch', 'Strength', 'Olympic Lifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Power Snatch', 'Strength', 'Olympic Lifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Power Clean', 'Strength', 'Olympic Lifting');
insert into exercises (exerciseName, exerciseType, exerciseCategory) values ('Power Jerk', 'Strength', 'Olympic Lifting');








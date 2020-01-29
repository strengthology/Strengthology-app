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
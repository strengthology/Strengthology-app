# Strengthology-app

## Database Configuration

The database is composed of three tables:
1. Users
2. Exercises
3. Sets

The composition of User table:
 - user key (primary key)
 - username
 - password
 - age
 - height
 - weight
 - gender

The composition of the Exercise table:
 - exercise key (primary key)
 - name

The composition of the Set table:
 - set key
 - user key (foreign key)
 - exercise key (foreign key)
 - workout number 
 - time stamp
 - weight
 - distance
 - reps
 - rate of percieved exertion
 - tempo
 - duration

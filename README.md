# assignment-gds-ace
The application is built with Node.js, Express, PostgreSQL and React. It is deployed here: 
https://dry-island-89908.herokuapp.com/. The link may not work after November 2022 as free Heroku Postgres will no longer be available.

# Set Up
## PostgreSQL
1. Run `psql` in command line to open the psql command line tool.
2. Do `CREATE DATABASE [database_name];` and `\c [database_name]`.
3. Paste in the SQL commands in __schema.sql__ from the root directory and enter.
4. Close the psql command line tool with `\q`.

## Node.js and React app
1. Clone this repository and nagivate into it.
2. Create a __.env__ file at the root.
3. Paste the following database configuration in __.env__, change the parameters if you are not using default configuration.
```
host=localhost
user=[username]
password=''
database=[database_name]
db_port=5432
```
4. At the root of the directory, run `npm i`.
5. Go into the React app folder using `cd client` and run `npm i`.
6. Go back to the root using `cd ..` and do `npm run build`.
7. Start the app with `npm start` and go to localhost:3000 to view the page.

# User Guide
The application should work as it is outlined in the assignment. There are some input validation in place for:
- correct input format
- teams are created before matches
- teams are not created more than once
- a match is between two different teams
- only two groups are allowed

Some of the things it did not check for is if each group has exactly 6 teams. However, that should not affect the correctness of the application as it will stil be able to identify the qualifying teams from each group. 

The interface consists of a textbox for multiline input and 5 buttons with hopefully self-explanatory functions.

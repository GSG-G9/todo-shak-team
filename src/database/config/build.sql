BEGIN;

DROP TABLE IF EXISTS users , todo CASCADE;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
user_name VARCHAR(100) NOT NULL UNIQUE,
email VARCHAR (100) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL 
);

CREATE TABLE todo(
todo_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
text_content VARCHAR(250),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
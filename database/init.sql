CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    pwd_hash CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    UNIQUE (username),
    UNIQUE (email)
);


CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(15),
    address TEXT,
    about_me TEXT
);

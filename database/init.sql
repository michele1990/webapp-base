CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

-- Add the initial users
INSERT INTO users (username) VALUES ('michele'), ('admin'); -- Prevents duplication if the usernames already exist

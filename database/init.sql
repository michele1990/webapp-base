CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    google_id VARCHAR(100) -- Add a field for the Google ID
);

-- You can remove the initial INSERT if you're identifying users based on Google IDs.

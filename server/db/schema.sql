CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    servings INTEGER,
    prep_time INTEGER,
    cook_time INTEGER,
    instructions TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
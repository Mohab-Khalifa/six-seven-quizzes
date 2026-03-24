DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE result (
    result_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (result_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
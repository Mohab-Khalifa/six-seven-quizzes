TRUNCATE result RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;


INSERT INTO users (username, password) 
VALUES 
    ('user1', '$2b$10$CXZQmwTZ6zmOiYbpt4CQcOA9qnoUvIR6K8Lj7W1PD9yO.zhNykTnC'), 
    ('user2', '$2b$10$CXZQmwTZ6zmOiYbpt4CQcOA9qnoUvIR6K8Lj7W1PD9yO.zhNykTnC'), 
    ('user3', '$2b$10$CXZQmwTZ6zmOiYbpt4CQcOA9qnoUvIR6K8Lj7W1PD9yO.zhNykTnC')
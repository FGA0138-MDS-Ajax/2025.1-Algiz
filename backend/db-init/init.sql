CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
    -- other columns as needed
);

-- Insert sample data if the table is empty
INSERT INTO users (name, email)
SELECT 'John Doe', 'john.doe@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users);
INSERT INTO users (id, name, email, password, role, avatar_url) VALUES
(uuid_generate_v4(), 'Admin Host', 'admin@meetcore.com', 'admin123', 'host', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'),
(uuid_generate_v4(), 'John Doe', 'john@meetcore.com', 'password123', 'participant', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'),
(uuid_generate_v4(), 'Jane Smith', 'jane@meetcore.com', 'password123', 'participant', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane');

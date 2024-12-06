-- ENUM Types
CREATE TYPE vehicle_type AS ENUM ('kart', 'track_car', 'road_car', 'rally_car');
CREATE TYPE auth_type AS ENUM ('email', 'google');

-- Add new vehicle types: ALTER TYPE vehicle_type ADD VALUE 'truck';
-- Remove vehicle types: ALTER TYPE vehicle_type DROP VALUE 'truck';

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    racing_number INT,
    profile_picture_path TEXT,
    banner_picture_path TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    members INT[] DEFAULT ARRAY[]::INT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Base vehicles table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type vehicle_type,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved vehicles (user-specific instances)
CREATE TABLE saved_vehicles (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE SET NULL,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE SET NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Setups table
-- Create a new setup: INSERT INTO setups (vehicle_id, user_id, name, description, track) VALUES (1, 2, 'Kart Setup for Rain', 'Optimized setup for wet conditions', 'Silverstone');
-- Update a setup: UPDATE setups SET name = 'Kart Setup for Rainy Conditions' WHERE id = 1;
CREATE TABLE setups (
    id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES saved_vehicles(id) ON DELETE SET NULL,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    track TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Authentication modes
CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    auth_type auth_type NOT NULL,
    auth_token TEXT,
    UNIQUE(user_id, auth_type)
);

-- Public posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    setup_id INT REFERENCES setups(id) ON DELETE SET NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Public messages table
CREATE TABLE public_messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Public message replies table
CREATE TABLE public_message_replies (
    id SERIAL PRIMARY KEY,
    parent_message_id INT REFERENCES public_messages(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Private messages table
CREATE TABLE private_messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) ON DELETE SET NULL,
    receiver_id INT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Message images table
CREATE TABLE message_images (
    id SERIAL PRIMARY KEY,
    public_message_id INT REFERENCES public_messages(id) ON DELETE CASCADE,
    private_message_id INT REFERENCES private_messages(id) ON DELETE CASCADE,
    image_path TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Setup parameters table
-- Sample GET query: SELECT * FROM setup_parameters WHERE 'kart' = ANY(applicable_to);
-- Sample POST query: INSERT INTO setup_parameters (name, description, applicable_to) VALUES ('tire_pressure', 'Tire pressure in Bar', ARRAY['kart', 'track_car']);
-- (POST query should only be accessible in admin panel)
CREATE TABLE setup_parameters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    applicable_to vehicle_type[], -- if empty or null, applicable to all vehicle types
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Setup values table (normalized setup parameters)
-- Insert a new setup value: INSERT INTO setup_values (setup_id, parameter_id, value) VALUES (1, 1, '{"front": 1.2, "rear": 1.2}');
CREATE TABLE setup_values (
    id SERIAL PRIMARY KEY,
    setup_id INT REFERENCES setups(id) ON DELETE CASCADE,
    parameter_id INT REFERENCES setup_parameters(id) ON DELETE CASCADE,
    value JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_saved_vehicles_owner_id ON saved_vehicles(owner_id);
CREATE INDEX idx_setups_vehicle_id ON setups(vehicle_id);
CREATE INDEX idx_user_auth_user_id ON user_auth(user_id);

-- Create a new admin user
INSERT INTO users (email, password_hash, first_name, last_name, display_name, is_admin) VALUES ('admin@iii.eu', '$2a$10$LVxGvq/WZ60iMMoi/WyUM.cq9rr/vnpoRFChfmOIpE5kwq2PLfVhq', 'Admin', 'User', 'Admin', TRUE);

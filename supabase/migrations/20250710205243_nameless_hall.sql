/*
  # Initial Schema for Youniverse Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `email` (text)
      - `current_country` (text)
      - `status` (enum: 'in_india' | 'abroad')
      - `destination_country` (text, nullable)
      - `current_university` (text, nullable)
      - `course_field` (text)
      - `bio` (text)
      - `profile_image` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `connections`
      - `id` (uuid, primary key)
      - `requester_id` (uuid, references profiles)
      - `receiver_id` (uuid, references profiles)
      - `status` (enum: 'pending' | 'accepted' | 'rejected')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `receiver_id` (uuid, references profiles)
      - `content` (text)
      - `created_at` (timestamp)
      - `read` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
    - Add policies for viewing accepted connections
    - Add policies for messaging between connected users
*/

-- Create enum types
CREATE TYPE user_status AS ENUM ('in_india', 'abroad');
CREATE TYPE connection_status AS ENUM ('pending', 'accepted', 'rejected');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  current_country text NOT NULL,
  status user_status NOT NULL DEFAULT 'in_india',
  destination_country text,
  current_university text,
  course_field text NOT NULL,
  bio text NOT NULL,
  profile_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES profiles(id) NOT NULL,
  receiver_id uuid REFERENCES profiles(id) NOT NULL,
  status connection_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) NOT NULL,
  receiver_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Connections policies
CREATE POLICY "Users can read their own connections"
  ON connections
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = connections.requester_id 
      AND profiles.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = connections.receiver_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create connection requests"
  ON connections
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = connections.requester_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update received connections"
  ON connections
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = connections.receiver_id 
      AND profiles.user_id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Users can read their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = messages.sender_id 
      AND profiles.user_id = auth.uid()
    ) OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = messages.receiver_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to connected users"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = messages.sender_id 
      AND profiles.user_id = auth.uid()
    ) AND
    EXISTS (
      SELECT 1 FROM connections 
      WHERE connections.status = 'accepted' 
      AND (
        (connections.requester_id = messages.sender_id AND connections.receiver_id = messages.receiver_id) OR
        (connections.requester_id = messages.receiver_id AND connections.receiver_id = messages.sender_id)
      )
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_current_country ON profiles(current_country);
CREATE INDEX idx_profiles_destination_country ON profiles(destination_country);
CREATE INDEX idx_connections_requester_id ON connections(requester_id);
CREATE INDEX idx_connections_receiver_id ON connections(receiver_id);
CREATE INDEX idx_connections_status ON connections(status);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
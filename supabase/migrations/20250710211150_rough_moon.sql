/*
  # Add profile completion tracking

  1. New Tables
    - Add profile_completed column to profiles table
    - Add password_reset_tokens table for secure password recovery
    - Add rate_limiting table for security

  2. Security
    - Enable RLS on new tables
    - Add policies for password reset functionality
    - Add indexes for performance

  3. Changes
    - Update existing profiles to mark them as completed
    - Add constraints for data integrity
*/

-- Add profile completion tracking to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'profile_completed'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_completed boolean DEFAULT false;
  END IF;
END $$;

-- Update existing profiles to mark them as completed
UPDATE profiles SET profile_completed = true WHERE profile_completed IS NULL;

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Create rate limiting table for security
CREATE TABLE IF NOT EXISTS rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address inet,
  action_type text NOT NULL,
  attempt_count integer DEFAULT 1,
  last_attempt timestamptz DEFAULT now(),
  reset_at timestamptz DEFAULT (now() + interval '1 hour')
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_id ON rate_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_address ON rate_limits(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limits_action_type ON rate_limits(action_type);

-- RLS Policies for password reset tokens
CREATE POLICY "Users can read their own reset tokens"
  ON password_reset_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for rate limits
CREATE POLICY "Users can read their own rate limits"
  ON rate_limits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
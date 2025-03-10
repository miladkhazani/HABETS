/*
  # Fix RLS Policies

  1. Changes
    - Remove duplicate policies
    - Add missing INSERT policy for user_profiles
    - Ensure consistent policy naming
    - Add DELETE policies where needed

  2. Security
    - Maintain strict RLS enforcement
    - Ensure proper access control for all operations
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Anyone can view public challenges" ON challenges;
DROP POLICY IF EXISTS "Users can create challenges" ON challenges;
DROP POLICY IF EXISTS "Creators can update their challenges" ON challenges;
DROP POLICY IF EXISTS "Participants can view challenge data" ON challenge_participants;
DROP POLICY IF EXISTS "Users can join challenges" ON challenge_participants;
DROP POLICY IF EXISTS "Users can view their own activity logs" ON activity_logs;
DROP POLICY IF EXISTS "Users can create their own activity logs" ON activity_logs;
DROP POLICY IF EXISTS "Anyone can view achievements" ON achievements;
DROP POLICY IF EXISTS "Users can view their own achievements" ON user_achievements;

-- Create new policies with consistent naming
-- User Profiles policies
CREATE POLICY "user_profiles_insert" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "user_profiles_select" ON user_profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM challenge_participants cp
    WHERE cp.user_id = user_profiles.id AND cp.user_id = auth.uid()
  ));

CREATE POLICY "user_profiles_update" ON user_profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_profiles_delete" ON user_profiles
  FOR DELETE USING (auth.uid() = id);

-- Challenges policies
CREATE POLICY "challenges_select" ON challenges
  FOR SELECT USING (
    is_public = true OR 
    auth.uid() = creator_id OR
    EXISTS (
      SELECT 1 FROM challenge_participants
      WHERE challenge_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "challenges_insert" ON challenges
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "challenges_update" ON challenges
  FOR UPDATE USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "challenges_delete" ON challenges
  FOR DELETE USING (auth.uid() = creator_id);

-- Challenge Participants policies
CREATE POLICY "challenge_participants_select" ON challenge_participants
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM challenges 
      WHERE id = challenge_id AND creator_id = auth.uid()
    )
  );

CREATE POLICY "challenge_participants_insert" ON challenge_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "challenge_participants_update" ON challenge_participants
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "challenge_participants_delete" ON challenge_participants
  FOR DELETE USING (auth.uid() = user_id);

-- Activity Logs policies
CREATE POLICY "activity_logs_select" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "activity_logs_insert" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "activity_logs_update" ON activity_logs
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "activity_logs_delete" ON activity_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "achievements_select" ON achievements
  FOR SELECT USING (true);

-- User Achievements policies
CREATE POLICY "user_achievements_select" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_achievements_insert" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_achievements_update" ON user_achievements
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_achievements_delete" ON user_achievements
  FOR DELETE USING (auth.uid() = user_id);
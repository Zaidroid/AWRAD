-- Supabase Setup SQL for AWRAD Website

-- 0. (Optional but Recommended) Create a custom schema for your app if you prefer
-- CREATE SCHEMA IF NOT EXISTS awrad_schema;
-- SET search_path = awrad_schema, public; -- If using a custom schema

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create a function to automatically update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment: After creating this function, you'll apply it as a trigger to your tables.

-- 3. PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  category_en TEXT,
  category_ar TEXT,
  date DATE NOT NULL,
  link_en TEXT, -- URL to PDF on Supabase Storage or external link
  link_ar TEXT,
  summary_en TEXT,
  summary_ar TEXT,
  image_url TEXT, -- URL to image on Supabase Storage or external link
  status TEXT DEFAULT 'Draft'::TEXT CHECK (status IN ('Published', 'Draft', 'Archived')),
  is_trending BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  author_en TEXT,
  author_ar TEXT,
  tags TEXT[], -- Array of text
  full_content_en TEXT,
  full_content_ar TEXT,
  user_id UUID REFERENCES auth.users(id) -- Optional: if you want to track who created/updated
);

-- Apply the 'updated_at' trigger to 'publications' table
CREATE TRIGGER on_publications_updated
  BEFORE UPDATE ON public.publications
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Add comments to publications table columns for clarity
COMMENT ON COLUMN public.publications.link_en IS 'URL to PDF on Supabase Storage or external link';
COMMENT ON COLUMN public.publications.image_url IS 'URL to image on Supabase Storage or external link';
COMMENT ON COLUMN public.publications.status IS 'Publication status: Published, Draft, Archived';

-- 4. POLLS TABLE
CREATE TABLE IF NOT EXISTS public.polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  date DATE NOT NULL,
  link_en TEXT,
  link_ar TEXT,
  summary_en TEXT,
  summary_ar TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'Draft'::TEXT CHECK (status IN ('Published', 'Draft', 'Archived')),
  is_trending BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  sample_size INTEGER,
  methodology_en TEXT,
  methodology_ar TEXT,
  user_id UUID REFERENCES auth.users(id) -- Optional
);

-- Apply the 'updated_at' trigger to 'polls' table
CREATE TRIGGER on_polls_updated
  BEFORE UPDATE ON public.polls
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- Add comments to polls table columns
COMMENT ON COLUMN public.polls.status IS 'Poll status: Published, Draft, Archived';

-- 5. PROFILES TABLE (for user roles and other profile data)
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user'::TEXT NOT NULL CHECK (role IN ('user', 'admin')), -- Add other roles if needed
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Apply 'updated_at' trigger to 'profiles' table
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

COMMENT ON COLUMN public.profiles.role IS 'User role, e.g., user, admin';

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role)
  VALUES (NEW.id, 'user'); -- Default role for new users is 'user'
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user when a new auth.users row is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. ROW LEVEL SECURITY (RLS)

-- First, enable RLS on all relevant tables
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY; -- Enable RLS for profiles table

-- Updated helper function to check if the current user is an admin based on 'profiles' table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE; -- No authenticated user
  END IF;
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if the currently authenticated user has the admin role in their profile.';

-- RLS Policies for 'profiles' table
DROP POLICY IF EXISTS "Allow users to read their own profile" ON public.profiles;
CREATE POLICY "Allow users to read their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow admins to read all profiles" ON public.profiles;
CREATE POLICY "Allow admins to read all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.profiles;
CREATE POLICY "Allow users to update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id); -- Can only update their own

DROP POLICY IF EXISTS "Allow admins to update any profile" ON public.profiles;
CREATE POLICY "Allow admins to update any profile"
  ON public.profiles FOR UPDATE
  USING (public.is_admin()) -- Admins can update any
  WITH CHECK (public.is_admin()); -- Check is important for security

-- RLS Policies for 'publications' table
DROP POLICY IF EXISTS "Allow public read access to published publications" ON public.publications;
CREATE POLICY "Allow public read access to published publications"
  ON public.publications
  FOR SELECT USING (status = 'Published');

DROP POLICY IF EXISTS "Allow admin full access to publications" ON public.publications;
CREATE POLICY "Allow admin full access to publications"
  ON public.publications
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- RLS Policies for 'polls' table
DROP POLICY IF EXISTS "Allow public read access to published polls" ON public.polls;
CREATE POLICY "Allow public read access to published polls"
  ON public.polls
  FOR SELECT USING (status = 'Published');

DROP POLICY IF EXISTS "Allow admin full access to polls" ON public.polls;
CREATE POLICY "Allow admin full access to polls"
  ON public.polls
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());


-- 7. STORAGE SETUP

-- Create a bucket named 'media_library' for public read access.
-- It's often easier to do this via the Supabase Dashboard (Storage > Create new bucket).
-- If creating via SQL (less common for initial setup, more for migrations):
-- Make sure the user running this has permissions to insert into storage.objects.
-- This SQL won't create policies as effectively as the dashboard.

-- Example of inserting a bucket (if you have permissions, otherwise use Dashboard)
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES ('media_library', 'media_library', TRUE, NULL, NULL) -- TRUE for public bucket
-- ON CONFLICT (id) DO NOTHING;
-- Note: Setting `public = TRUE` here makes all files in the bucket publicly accessible by default via their URL.
-- You would then control UPLOAD/DELETE access via RLS-like policies on the `storage.objects` table.

-- Storage RLS Policies (applied to `storage.objects` table for the 'media_library' bucket)
-- These are more complex and often better managed via the Supabase Dashboard initially.
-- However, here's an example structure:

-- Allow admins to upload to 'media-library'
DROP POLICY IF EXISTS "Allow admin uploads to media-library" ON storage.objects;
CREATE POLICY "Allow admin uploads to media-library"
  ON storage.objects
  FOR INSERT
  TO authenticated 
  WITH CHECK (
    bucket_id = 'media-library' AND -- Updated bucket name
    public.is_admin() 
  );

-- Allow admins to delete from 'media-library'
DROP POLICY IF EXISTS "Allow admin deletes from media-library" ON storage.objects;
CREATE POLICY "Allow admin deletes from media-library"
  ON storage.objects
  FOR DELETE
  TO authenticated 
  USING (
    bucket_id = 'media-library' AND -- Updated bucket name
    public.is_admin() 
  );

-- Public read access for 'media-library' is typically handled by making the bucket public.
-- If the bucket is NOT public, you'd need a SELECT policy like this:
-- DROP POLICY IF EXISTS "Allow public read from media-library" ON storage.objects;
-- CREATE POLICY "Allow public read from media-library"
--   ON storage.objects 
--   FOR SELECT
--   USING ( bucket_id = 'media-library' ); -- Updated bucket name

-- It's highly recommended to use the Supabase Dashboard for setting up Storage Bucket policies
-- as it provides a more user-friendly interface for this specific part.
-- Go to Storage -> Select your 'media-library' bucket -> Policies.

-- Example: To make the bucket truly public for reads after creation:
-- In Supabase Dashboard: Storage -> media-library -> Bucket Settings -> Make Public.
-- Then, for uploads/deletes, you'd add policies like:
-- Target roles: authenticated (or your admin role)
-- Operation: INSERT, DELETE
-- Policy definition (using SQL): bucket_id = 'media-library' AND your_admin_check_condition -- Updated bucket name

SELECT 'Supabase setup SQL executed. Please review RLS and Storage policies, especially the is_admin() function and bucket policies.';

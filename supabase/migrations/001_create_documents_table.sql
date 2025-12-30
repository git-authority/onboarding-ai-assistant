-- ============================================
-- Run this SQL in your Supabase Dashboard:
-- Go to SQL Editor > New Query > Paste and Run
-- ============================================

-- Create documents table for storing document metadata
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status TEXT DEFAULT 'processed' CHECK (status IN ('processed', 'processing', 'error')),
  file_path TEXT NOT NULL,
  storage_path TEXT NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_at ON public.documents(uploaded_at DESC);

-- Enable Row Level Security
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust for your security needs)
CREATE POLICY "Allow all access to documents" ON public.documents
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON public.documents TO anon;
GRANT ALL ON public.documents TO authenticated;

-- ============================================
-- STORAGE BUCKET SETUP
-- Go to Storage in Supabase Dashboard and:
-- 1. Click "New bucket"
-- 2. Name it "documents"
-- 3. Set it to public: false
-- 4. Create the bucket
-- 5. Then go to Policies and add:
--    - A SELECT policy: Allow all (true)
--    - An INSERT policy: Allow all (true)
--    - A DELETE policy: Allow all (true)
-- ============================================

-- Alternative: Create storage bucket via SQL (may not work in all cases)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('documents', 'documents', false)
-- ON CONFLICT (id) DO NOTHING;

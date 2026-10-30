CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  attachment_url TEXT,
  is_important BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department_id UUID,
  semester TEXT,
  subject TEXT,
  exam_date DATE,
  start_time TIME,
  end_time TIME,
  venue TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department_id UUID,
  semester TEXT,
  subject TEXT,
  description TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT,
  job_title TEXT,
  description TEXT,
  location TEXT,
  eligibility TEXT,
  application_url TEXT,
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  eligibility TEXT,
  amount TEXT,
  application_url TEXT,
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  code TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT,
  subject TEXT,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'new',
  admin_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  venue TEXT,
  image_url TEXT,
  registration_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT,
  category TEXT,
  event_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);

CREATE TABLE IF NOT EXISTS important_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT,
  title TEXT,
  url TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT,
  phone_enabled BOOLEAN DEFAULT TRUE,
  whatsapp_number TEXT,
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  landline TEXT,
  email TEXT,
  address TEXT,
  maps_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published notices" ON notices FOR SELECT USING (published = TRUE);
CREATE POLICY "Public can read published departments" ON departments FOR SELECT USING (TRUE);
CREATE POLICY "Public can read public events" ON events FOR SELECT USING (TRUE);
CREATE POLICY "Public can read public materials" ON materials FOR SELECT USING (TRUE);
CREATE POLICY "Public can read jobs" ON jobs FOR SELECT USING (TRUE);
CREATE POLICY "Public can read scholarships" ON scholarships FOR SELECT USING (TRUE);
CREATE POLICY "Public can read social links" ON social_links FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read contact settings" ON contact_settings FOR SELECT USING (TRUE);
CREATE POLICY "Students can submit feedback" ON feedback FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Students can read own feedback" ON feedback FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage all content" ON notices USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON exams USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON materials USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON jobs USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON scholarships USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON departments USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON gallery USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON important_links USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all content" ON social_links USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage all contact settings" ON contact_settings USING (true) WITH CHECK (true);

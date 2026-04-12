-- ==========================================
-- Al-Saleh Real Estate Platform - Complete Database Schema (Latest Version)
-- ==========================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL, -- 'سكني', 'تجاري', 'مكتبي'
  status text NOT NULL, -- 'مكتمل', 'تحت الإنشاء', 'مستقبلي'
  location text NOT NULL,
  image_url text NOT NULL,
  description text,
  sort_order integer DEFAULT 999,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Project Images (Multi-image for gallery)
CREATE TABLE IF NOT EXISTS public.project_images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url text NOT NULL,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. News Table
CREATE TABLE IF NOT EXISTS public.news (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  summary text NOT NULL,
  content text, -- Detailed content for the news
  date text NOT NULL,
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Media Table
CREATE TABLE IF NOT EXISTS public.media (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL, -- 'image' or 'video'
  alt_text text NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Team Members (Board of Directors)
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  role_ar text NOT NULL,
  role_en text NOT NULL,
  image_url text,
  linkedin_url text,
  sort_order int DEFAULT 0,
  bio_ar text,
  bio_en text,
  email text,
  phone text,
  show_image boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key text PRIMARY KEY,
    value text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. About Page Content Table
CREATE TABLE IF NOT EXISTS public.about_content (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title_ar text,
    title_en text,
    content_ar text,
    content_en text,
    image_url text,
    type text NOT NULL, -- e.g., 'who-we-are', 'vision', 'mission'
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    logo_url text NOT NULL,
    website_url text,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Strategic Goals Table
CREATE TABLE IF NOT EXISTS public.strategic_goals (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title_ar text NOT NULL,
    title_en text,
    description_ar text NOT NULL,
    description_en text,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- Security & RLS (Row Level Security)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategic_goals ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies
DROP POLICY IF EXISTS "Allow public read-only" ON public.projects;
CREATE POLICY "Allow public read-only" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.project_images;
CREATE POLICY "Allow public read-only" ON public.project_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.news;
CREATE POLICY "Allow public read-only" ON public.news FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.media;
CREATE POLICY "Allow public read-only" ON public.media FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.team_members;
CREATE POLICY "Allow public read-only" ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.site_settings;
CREATE POLICY "Allow public read-only" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.about_content;
CREATE POLICY "Allow public read-only" ON public.about_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.partners;
CREATE POLICY "Allow public read-only" ON public.partners FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read-only" ON public.strategic_goals;
CREATE POLICY "Allow public read-only" ON public.strategic_goals FOR SELECT USING (true);

-- 2. Authenticated Admin Policies (Full access)
DROP POLICY IF EXISTS "Allow admin all access" ON public.projects;
CREATE POLICY "Allow admin all access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.project_images;
CREATE POLICY "Allow admin all access" ON public.project_images FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.news;
CREATE POLICY "Allow admin all access" ON public.news FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.media;
CREATE POLICY "Allow admin all access" ON public.media FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.team_members;
CREATE POLICY "Allow admin all access" ON public.team_members FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.site_settings;
CREATE POLICY "Allow admin all access" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.partners;
CREATE POLICY "Allow admin all access" ON public.partners FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin all access" ON public.contact_messages;
CREATE POLICY "Allow admin all access" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public insert" ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all access" ON public.strategic_goals;
CREATE POLICY "Allow admin all access" ON public.strategic_goals FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- Default Data & Initial Setup
-- ==========================================

-- Insert site settings (Updated with Hero Phrases)
INSERT INTO public.site_settings (key, value) VALUES
('phone', '+966 11 123 4567'),
('email', 'info@alsaleh-gr.com'),
('address_ar', 'المملكة العربية السعودية، الرياض، شارع العليا المتقاطع مع طريق الملك عبدالله.'),
('address_en', 'Saudi Arabia, Riyadh, Olaya Street, intersecting with King Abdullah Road.'),
('hours_ar', 'الأحد - الخميس: 8:00 ص - 5:00 م'),
('hours_en', 'Sunday - Thursday: 8:00 AM - 5:00 PM'),
('whatsapp', '966111234567'),
('ceo_name_ar', 'المهندس وليد آل صالح'),
('ceo_name_en', 'Eng. Waleed Al-Saleh'),
('ceo_role_ar', 'رئيس مجلس الإدارة'),
('ceo_role_en', 'Chairman of the Board'),
('ceo_bio_ar', 'قيادة برؤية طموحة لمستقبل عقاري واعد، بخبرة تمتد لأكثر من 15 عاماً في قيادة المشاريع العقارية الكبرى.'),
('ceo_bio_en', 'Leading with an ambitious vision for a promising real estate future, with more than 15 years of experience.'),
('ceo_experience', '15'),
('ceo_image', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000'),
('ceo_badge_ar', 'كلمة الإدارة'),
('ceo_badge_en', 'Management Message'),
('ceo_section_title_ar', 'قيادة برؤية طموحة لمستقبل عقاري واعد'),
('ceo_section_title_en', 'Leading with an Ambitious Vision'),
('ceo_stat_label_ar', 'عاماً من الخبرة القيادية'),
('ceo_stat_label_en', 'Years of leadership'),
('ceo_projects_val', '50+'),
('ceo_projects_label_ar', 'مشروعاً تم تنفيذها'),
('ceo_projects_label_en', 'Projects implemented'),
('hero_title_ar', 'نحن هنا لنقدم لكم تجربة فريدة، تجمع بين سهولة التصفح وتنوع الخيارات العقارية.'),
('hero_title_en', 'We are here to provide you a unique experience, combining easy browsing with diverse real estate options.'),
('hero_subtitle_ar', '50 عاماً من الثقة في السوق العقاري السعودي'),
('hero_subtitle_en', '50 years of trust in the Saudi real estate market'),
('about_image_url', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000'),
('hero_bg_url', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075'),
('projects_header_bg_url', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053'),
('news_bg_url', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070'),
('stat_experience', '50+'),
('stat_projects', '15+'),
('stat_clients', '500+'),
('stat_cities', '10+'),
('about_who_ar', 'من نحن؟'),
('about_who_en', 'Who We Are?'),
('about_intro1_ar', 'شركة آل صالح التجارية هي اسم فرض نفسه في السوق العقاري السعودي. على مدى أكثر من 50 سنة، سعت الشركة لترك بصمة قوية ومستدامة في عالم العقار من خلال تقديم مفاهيم مبتكرة توفر الأمان والاستثمار الذكي.'),
('about_intro1_en', 'Al Saleh Trading Company is a name that has established itself in the Saudi real estate market. For more than 50 years, the company has sought to leave a strong and sustainable mark in the world of real estate.'),
('about_intro2_ar', 'تمتد مشاريعنا في أهم مدن المملكة لتشمل مساحات تجارية، سكنية، فندقية، ومكتبية، حيث نحرص دائماً أن يكون كل مشروع نتبناه مدروساً ومربحاً ومميزاً لعملائنا وشركاء نجاحنا.'),
('about_intro2_en', 'Our projects extend to the most important cities in the Kingdom to include commercial, residential, hotel, and office spaces, as we always make sure that every project we adopt is well-studied.'),
('about_vision_ar', 'أن نكون الشركة الرائدة الأولى في صناعة وتطوير العقار بالمملكة، عبر خلق بيئات عيش وعمل تلهم الأجيال القادمة وتلتزم بالاستدامة والفخامة.'),
('about_vision_en', 'To be the first leading company in the industry and development of real estate in the Kingdom, by creating living and working environments that inspire future generations.'),
('about_mission_ar', 'توفير حلول عقارية متكاملة تلبي رغبات وطموحات عملائنا بكفاءة وخبرة عالية، مع الحفاظ على أعلى معايير الجودة والابتكار في كل تفاصيل مشاريعنا.'),
('about_mission_en', 'Providing integrated real estate solutions that meet the desires and aspirations of our customers with high efficiency and experience.'),
('about_values_ar', 'الشفافية المطلقة، النزاهة في التعامل، الالتزام بالجودة الشاملة، والبحث الدائم عن الابتكار والتطوير المستمر في السوق العقاري.'),
('about_values_en', 'Absolute transparency, integrity in dealing, commitment to total quality, and the continuous search for innovation.')
ON CONFLICT (key) DO NOTHING;

-- Insert initial strategic goals
INSERT INTO public.strategic_goals (title_ar, title_en, description_ar, description_en, sort_order) VALUES
('التوسع الجغرافي', 'Geographical Expansion', 'التوسع في أكثر من 10 مدن رئيسية في المملكة العربية السعودية مع مشاريع متنوعة.', 'Expansion in more than 10 major cities in the Kingdom of Saudi Arabia with various projects.', 1),
('الاستدامة والجودة', 'Sustainability and Quality', 'تبني معايير البناء الأخضر والمستدام في جميع مشاريعنا المستقبلية.', 'Adopting green and sustainable building standards in all our future projects.', 2),
('رضا العملاء', 'Customer Satisfaction', 'تحقيق أعلى مستوى من رضا العملاء من خلال تقديم خدمات ما بعد البيع المتميزة.', 'Achieving the highest level of customer satisfaction through providing distinguished after-sales services.', 3),
('الابتكار التقني', 'Technical Innovation', 'توظيف أحدث التقنيات في إدارة المشاريع والتصميم المعماري الذكي.', 'Employing the latest technologies in project management and smart architectural design.', 4)
ON CONFLICT (id) DO NOTHING;

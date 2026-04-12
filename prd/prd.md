# Product Requirements Document (PRD) - Al-Saleh Real Estate Platform

## 1. Project Overview
**Project Name:** Al-Saleh Group Real Estate Platform  
**Client:** Al-Saleh Commercial Group (شركة آل صالح التجارية)  
**Objective:** Create a premium, informative, and visually stunning digital presence for Al-Saleh Group to showcase their 50+ years of expertise in the Saudi real estate market, highlight current and future projects, and share company news.

---

## 2. Target Audience
- **Individual Homebuyers:** Looking for residential villas or apartments.
- **Investors:** Seeking commercial or residential investment opportunities.
- **Partners:** Organizations looking to collaborate on major real estate developments.
- **Media/Press:** Seeking information about the company's growth and news.

---

## 3. Key Functional Requirements

### 3.1 Global Elements
- **Navigation Bar:**
    - Home (الرئيسية)
    - About Company (عن الشركة)
    - Projects (مشاريعنا العقارية)
    - News (الأخبار)
    - Gallery (مكتبة الصور والفيديو)
- **Multilingual Support:** Seamless toggling between Arabic (LTR) and English (RTL).
- **Call to Action:** "Contact Us" (اتصل بنا) button prominently placed.

### 3.2 Homepage Sections
1. **Hero Section:**
    - High-quality background imagery (representing Saudi landmarks/architecture).
    - Large typography with a unique selling proposition (USP).
    - Quick navigation links to specific featured projects (01, 02, 03...).
2. **About Us Section:**
    - Narrative detailing 50 years of experience.
    - Focus on commercial, residential, and hospitality sectors.
    - "Read More" link to the full About page.
3. **Projects Showcase:**
    - Tabbed interface: **Current Projects** vs. **Future Projects**.
    - Project cards featuring:
        - Category (e.g., Villa, Residential Complex).
        - Name (e.g., Lavender Residential Complex, Namar Plan).
        - High-quality image background with overlay.
        - Button: "Project Details" (تفاصيل المشروع).
4. **Company News:**
    - Carousel/Grid of news articles.
    - Focus on market insights (e.g., Real estate prices in Riyadh).
    - Dates and "Read More" links.
5. **Media Library:**
    - Interactive gallery for photos and corporate videos.

---

## 4. Visual Identity & Branding (الهوية البصريه)

### 4.1 Color Palette (لوحة الألوان)
Based on the logo and UI/UX designs, the identity revolves around a "Premium Corporate" aesthetic:
- **Primary Color (Deep Royal Blue):** `#2D3282` 
  - *Usage:* Navigation bars, primary buttons, hero overlays, and formal text. Represents trust, depth, and the twilight luxury theme.
- **Secondary Color (Amber/Golden Gold):** `#E9B85B`
  - *Usage:* Call-to-action (CTA) text, "Read More" links, active hover states, and decorative icons. Represents luxury, value, and excellence.
- **Background Tones:** 
  - *Pure White (`#FFFFFF`):* Used for clean body sections.
  - *Light Soft Gray (`#F8F9FA`):* Used for section backgrounds to create subtle separation.
- **Dark Mode / Contrast:**
  - *Midnight Blue (`#1A1E50`):* Used for footer or deep-contrast sections like the "News" background in the mockup.

### 4.2 Typography (الخطوط)
- **Primary Arabic Font:** A modern, geometric sans-serif (e.g., **Outfit** or **IBM Plex Sans Arabic**). It must be clean and professional, avoiding traditional calligraphy for a modern real-estate feel.
- **Primary English Font:** **Outfit** or **Inter** to maintain a cohesive look with the Arabic geometric style.
- **Weights:** 
  - *Bold:* For headings and USPs.
  - *Regular/Light:* For body text and descriptions.

### 4.3 Imagery & Iconography (النمط البصري)
- **Photography Style:** Use of "Twilight/Night" photography with long-exposure light trails to symbolize dynamism and growth in Riyadh.
- **Logo Usage:** The logo incorporates a geometric diamond-shaped icon and bi-lingual typography. It should be placed on white or transparent navbars.
- **Iconography:** Thin-line icons (Gold or Blue) to maintain the minimalist and elegant feel.

---

## 5. UI/UX Design & Layout

### 5.1 Project Schema
- **Title:** Name of the project.
- **Status:** Current/Future.
- **Category:** Residential, Commercial, Land, Hospitality.
- **Description:** Brief overview.
- **Image/Video:** High-res assets.
- **Location:** (Optional) Map integration.

### 5.2 News Schema
- **Headline:** News title.
- **Publication Date:** For sorting and relevance.
- **Thumbnail:** Aspect-ratio consistent images.
- **Content:** Full article text.

---

## 6. Technical Stack & Recommendations
- **Frontend Framework:** **Next.js** (built on **React**) for optimal SEO, fast loading times, and a robust developer experience.
- **Backend Environment:** **Node.js** for handling server-side logic and integrations.
- **Database & Auth:** **Supabase** (PostgreSQL) for real-time data management, user authentication, and media storage.
- **Styling:** **Tailwind CSS** or Vanilla CSS for implementing the custom premium UI/UX design.
- **Animations:** **Framer Motion** for sophisticated, high-end transition effects.
- **CMS:** Integration with Supabase for effortless management of projects, media library, and news content.

---

## 7. Success Metrics
- **Engagement:** Increase in session duration due to the media-rich content.
- **Inquiries:** Growth in contact form submissions for real estate projects.
- **Professional Perception:** Positive feedback from partners and stakeholders regarding the new digital identity.

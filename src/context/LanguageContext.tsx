'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';
import { supabase } from '@/lib/supabase';

type T = typeof translations.ar | typeof translations.en;

interface LanguageContextType {
  lang: Language;
  t: T;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  t: translations.ar,
  toggleLang: () => {},
  isRTL: true,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');
  const [dynamicSettings, setDynamicSettings] = useState<Record<string, string>>({});

  // Fetch site settings from Supabase
  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_settings').select('key, value');
      if (data) {
        const settings: Record<string, string> = {};
        data.forEach(item => {
          settings[item.key] = item.value;
        });
        setDynamicSettings(settings);
      }
    }
    fetchSettings();
  }, []);

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved === 'en' || saved === 'ar') {
      setLang(saved);
    }
  }, []);

  // Apply dir + lang attributes on html element
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    const next: Language = lang === 'ar' ? 'en' : 'ar';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  // Merge dynamic settings into the translations object
  const mergedTranslations = JSON.parse(JSON.stringify(translations[lang]));
  
  if (dynamicSettings.phone) {
    if (mergedTranslations.footer) mergedTranslations.footer.phone = dynamicSettings.phone;
    if (mergedTranslations.contact) mergedTranslations.contact.phone_val = dynamicSettings.phone;
  }
  if (dynamicSettings.email) {
    if (mergedTranslations.footer) mergedTranslations.footer.email = dynamicSettings.email;
    if (mergedTranslations.contact) mergedTranslations.contact.email_val = dynamicSettings.email;
  }
  if (lang === 'ar') {
    if (dynamicSettings.address_ar && mergedTranslations.footer) mergedTranslations.footer.address = dynamicSettings.address_ar;
    if (dynamicSettings.address_ar && mergedTranslations.contact) mergedTranslations.contact.address_val = dynamicSettings.address_ar;
    if (dynamicSettings.hours_ar && mergedTranslations.contact) mergedTranslations.contact.hours_val = dynamicSettings.hours_ar;
  } else {
    if (dynamicSettings.address_en && mergedTranslations.footer) mergedTranslations.footer.address = dynamicSettings.address_en;
    if (dynamicSettings.address_en && mergedTranslations.contact) mergedTranslations.contact.address_val = dynamicSettings.address_en;
    if (dynamicSettings.hours_en && mergedTranslations.contact) mergedTranslations.contact.hours_val = dynamicSettings.hours_en;
  }

  // Adding CEO data to 'about_ceo' section in mergedTranslations
  if (!mergedTranslations.about_ceo) mergedTranslations.about_ceo = {};
  
  mergedTranslations.about_ceo.ceo_experience = dynamicSettings.ceo_experience || '15+';
  mergedTranslations.about_ceo.ceo_image = dynamicSettings.ceo_image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000';
  
  if (lang === 'ar') {
    mergedTranslations.about_ceo.ceo_name = dynamicSettings.ceo_name_ar || 'د. علي آل صالح';
    mergedTranslations.about_ceo.ceo_role = dynamicSettings.ceo_role_ar || 'رئيس مجلس الإدارة';
    mergedTranslations.about_ceo.ceo_bio = dynamicSettings.ceo_bio_ar || 'قيادة برؤية طموحة لمستقبل عقاري واعد، بخبرة تمتد لأكثر من 15 عاماً في قيادة المشاريع العقارية الكبرى...';
    mergedTranslations.about_ceo.ceo_badge = dynamicSettings.ceo_badge_ar || 'كلمة الإدارة';
    mergedTranslations.about_ceo.ceo_section_title = dynamicSettings.ceo_section_title_ar || 'قيادة برؤية طموحة لمستقبل عقاري واعد';
    mergedTranslations.about_ceo.ceo_stat_label = dynamicSettings.ceo_stat_label_ar || 'عاماً من الخبرة القيادية';
    mergedTranslations.about_ceo.ceo_projects_val = dynamicSettings.ceo_projects_val || '50+';
    mergedTranslations.about_ceo.ceo_projects_label = dynamicSettings.ceo_projects_label_ar || 'مشروعاً تم تنفيذها';
  } else {
    mergedTranslations.about_ceo.ceo_name = dynamicSettings.ceo_name_en || 'Dr. Ali Alsaleh';
    mergedTranslations.about_ceo.ceo_role = dynamicSettings.ceo_role_en || 'Chairman of the Board';
    mergedTranslations.about_ceo.ceo_bio = dynamicSettings.ceo_bio_en || 'Leading with an ambitious vision for a promising real estate future...';
    mergedTranslations.about_ceo.ceo_badge = dynamicSettings.ceo_badge_en || 'Management Message';
    mergedTranslations.about_ceo.ceo_section_title = dynamicSettings.ceo_section_title_en || 'Leading with an Ambitious Vision';
    mergedTranslations.about_ceo.ceo_stat_label = dynamicSettings.ceo_stat_label_en || 'Years of leadership';
    mergedTranslations.about_ceo.ceo_projects_val = dynamicSettings.ceo_projects_val || '50+';
    mergedTranslations.about_ceo.ceo_projects_label = dynamicSettings.ceo_projects_label_en || 'Projects implemented';
  }

  // --- Static/Dynamic merging for About Page ---
  if (!mergedTranslations.about_page) mergedTranslations.about_page = {};

  if (lang === 'ar') {
    if (dynamicSettings.about_who_ar) mergedTranslations.about_page.who_title = dynamicSettings.about_who_ar;
    if (dynamicSettings.about_intro1_ar) mergedTranslations.about_page.intro1 = dynamicSettings.about_intro1_ar;
    if (dynamicSettings.about_intro2_ar) mergedTranslations.about_page.intro2 = dynamicSettings.about_intro2_ar;
    if (dynamicSettings.about_vision_ar) mergedTranslations.about_page.vision_text = dynamicSettings.about_vision_ar;
    if (dynamicSettings.about_mission_ar) mergedTranslations.about_page.mission_text = dynamicSettings.about_mission_ar;
    if (dynamicSettings.about_values_ar) mergedTranslations.about_page.values_text = dynamicSettings.about_values_ar;
  } else {
    if (dynamicSettings.about_who_en) mergedTranslations.about_page.who_title = dynamicSettings.about_who_en;
    if (dynamicSettings.about_intro1_en) mergedTranslations.about_page.intro1 = dynamicSettings.about_intro1_en;
    if (dynamicSettings.about_intro2_en) mergedTranslations.about_page.intro2 = dynamicSettings.about_intro2_en;
    if (dynamicSettings.about_vision_en) mergedTranslations.about_page.vision_text = dynamicSettings.about_vision_en;
    if (dynamicSettings.about_mission_en) mergedTranslations.about_page.mission_text = dynamicSettings.about_mission_en;
    if (dynamicSettings.about_values_en) mergedTranslations.about_page.values_text = dynamicSettings.about_values_en;
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: mergedTranslations,
        toggleLang,
        isRTL: lang === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

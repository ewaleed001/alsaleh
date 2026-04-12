'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import TeamMemberCard from '@/components/TeamMemberCard';

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const [team, setTeam] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      // Load team members
      const { data: teamData } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });
      if (teamData) setTeam(teamData);

      // Load site settings
      const { data: settingsData } = await supabase.from('site_settings').select('*');
      const settingsMap: Record<string, string> = {};
      settingsData?.forEach(s => { settingsMap[s.key] = s.value; });
      setSettings(settingsMap);

      // Load strategic goals
      const { data: goalsData } = await supabase
        .from('strategic_goals')
        .select('*')
        .order('sort_order', { ascending: true });
      if (goalsData && goalsData.length > 0) setGoals(goalsData);
    }
    loadData();
  }, []);
  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero / Header */}
      <section className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${settings.projects_header_bg_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-dark/85 to-brand-dark/95 z-10" />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.nav.about}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-brand-secondary max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              {t.footer.desc}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark border-r-4 border-brand-secondary pr-4">{t.about_page.who_title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">
                {t.about_page.intro1}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">
                {t.about_page.intro2}
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative aspect-[4/5] md:aspect-square rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl border-4 border-white group">
              <img 
                src={settings.about_image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000"} 
                alt="About Al-Saleh" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-brand-dark/20 z-10 transition-opacity duration-500 group-hover:opacity-75" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="py-24 px-4 bg-brand-dark text-white relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
           <ScrollReveal delay={0}>
             <div className="bg-white/5 p-10 rounded-lg hover:bg-white/10 transition-colors border border-white/10 h-full">
               <div className="w-16 h-16 mx-auto bg-brand-secondary rounded-full flex items-center justify-center mb-6 shadow-lg text-brand-dark text-2xl font-bold">
                 👁️
               </div>
               <h3 className="text-2xl font-bold mb-4 text-brand-secondary">{t.about_page.vision}</h3>
               <p className="text-gray-300 leading-relaxed">
                 {t.about_page.vision_text}
               </p>
             </div>
           </ScrollReveal>

           <ScrollReveal delay={0.15}>
             <div className="bg-white/5 p-10 rounded-lg hover:bg-white/10 transition-colors border border-white/10 h-full">
               <div className="w-16 h-16 mx-auto bg-brand-secondary rounded-full flex items-center justify-center mb-6 shadow-lg text-brand-dark text-2xl font-bold">
                 🎯
               </div>
               <h3 className="text-2xl font-bold mb-4 text-brand-secondary">{t.about_page.mission}</h3>
               <p className="text-gray-300 leading-relaxed">
                 {t.about_page.mission_text}
               </p>
             </div>
           </ScrollReveal>

           <ScrollReveal delay={0.3}>
             <div className="bg-white/5 p-10 rounded-lg hover:bg-white/10 transition-colors border border-white/10 h-full">
               <div className="w-16 h-16 mx-auto bg-brand-secondary rounded-full flex items-center justify-center mb-6 shadow-lg text-brand-dark text-2xl font-bold">
                 💎
               </div>
               <h3 className="text-2xl font-bold mb-4 text-brand-secondary">{t.about_page.values}</h3>
               <p className="text-gray-300 leading-relaxed">
                 {t.about_page.values_text}
               </p>
             </div>
           </ScrollReveal>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-24 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right">
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-secondary/20 rounded-2xl blur-xl group-hover:bg-brand-secondary/30 transition-all duration-500" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src={t.about_ceo.ceo_image} 
                  alt={t.about_ceo.ceo_name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur p-6 rounded-xl shadow-xl">
                 <h4 className="text-2xl font-bold text-brand-dark">{t.about_ceo.ceo_name}</h4>
                 <p className="text-brand-primary font-bold">{t.about_ceo.ceo_role}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-brand-secondary/10 border border-brand-secondary/30 rounded-full text-brand-primary font-bold">
                {t.about_ceo.ceo_badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">{t.about_ceo.ceo_section_title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed text-justify italic">
                "{t.about_ceo.ceo_bio}"
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-brand-primary mb-1">{t.about_ceo.ceo_experience}</div>
                  <div className="text-gray-500 text-sm">{t.about_ceo.ceo_stat_label}</div>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-brand-primary mb-1">{t.about_ceo.ceo_projects_val}</div>
                  <div className="text-gray-500 text-sm">{t.about_ceo.ceo_projects_label}</div>
                </div>
              </div>

              <div className="pt-8">
                <img src="/logo.svg" alt="Signature" className="h-16 opacity-30 grayscale" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
             <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-dark">{t.about_page.team_title}</h2>
                <div className="w-24 h-1 bg-brand-secondary mx-auto rounded-full" />
                <p className="text-gray-500 max-w-2xl mx-auto">
                  {t.about_page.team_desc}
                </p>
             </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <ScrollReveal key={member.id} delay={idx * 0.1}>
                <TeamMemberCard member={member} lang={lang} />
              </ScrollReveal>
            ))}
          </div>

          {team.length === 0 && (
            <div className="text-center py-12 text-gray-400">
               <p>سيتم إضافة أعضاء الفريق قريباً...</p>
            </div>
          )}
        </div>
      </section>

      {/* Goals */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark text-center mb-16">أهدافنا الاستراتيجية</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {(goals.length > 0 ? goals : [
              { title_ar: 'التوسع الجغرافي', title_en: 'Geographical Expansion', description_ar: 'التوسع في أكثر من 10 مدن رئيسية في المملكة العربية السعودية مع مشاريع متنوعة.', description_en: 'Expansion in more than 10 major cities in the Kingdom of Saudi Arabia with various projects.' },
              { title_ar: 'الاستدامة والجودة', title_en: 'Sustainability and Quality', description_ar: 'تبني معايير البناء الأخضر والمستدام في جميع مشاريعنا المستقبلية.', description_en: 'Adopting green and sustainable building standards in all our future projects.' },
              { title_ar: 'رضا العملاء', title_en: 'Customer Satisfaction', description_ar: 'تحقيق أعلى مستوى من رضا العملاء من خلال تقديم خدمات ما بعد البيع المتميزة.', description_en: 'Achieving the highest level of customer satisfaction through providing distinguished after-sales services.' },
              { title_ar: 'الابتكار التقني', title_en: 'Technical Innovation', description_ar: 'توظيف أحدث التقنيات في إدارة المشاريع والتصميم المعماري الذكي.', description_en: 'Employing the latest technologies in project management and smart architectural design.' },
            ]).map((goal, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-6 p-6 rounded-xl bg-brand-light/50 border border-brand-secondary/20 hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-bold text-brand-secondary/30 shrink-0">{(i + 1).toString().padStart(2, '0')}</div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{lang === 'ar' ? goal.title_ar : (goal.title_en || goal.title_ar)}</h3>
                    <p className="text-gray-500 leading-relaxed">{lang === 'ar' ? goal.description_ar : (goal.description_en || goal.description_ar)}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">هل تبحث عن استثمار آمن ومربح؟</h2>
            <p className="text-white/70 text-lg">تصفح مشاريعنا العقارية المتميزة أو تواصل معنا مباشرة لمعرفة المزيد.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/projects" className="bg-brand-secondary text-brand-dark px-10 py-4 font-bold rounded shadow-md hover:bg-white transition-all duration-300 text-lg">
                تصفح مشاريعنا الآن
              </Link>
              <Link href="/contact" className="border-2 border-brand-secondary text-brand-secondary px-10 py-4 font-bold rounded hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 text-lg">
                تواصل معنا
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

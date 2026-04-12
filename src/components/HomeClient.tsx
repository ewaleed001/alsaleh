'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
  id: string;
  title: string;
  image_url: string;
  category: string;
  status: string;
  location: string;
}

interface NewsItem {
  id: string;
  title: string;
  image_url: string;
  summary: string;
  date: string;
}

interface MediaItem {
  id: string;
  url: string;
  alt_text: string;
  type: string;
}

interface Partner {
  id: string;
  name: string;
  logo_url: string;
}

interface HomeClientProps {
  projects: Project[];
  news: NewsItem[];
  media: MediaItem[];
  partners: Partner[];
  settings: Record<string, string>;
}

export default function HomeClient({ projects, news, media, partners, settings }: HomeClientProps) {
  const { t, lang } = useLanguage();

  const heroTitle = lang === 'ar' 
    ? (settings.hero_title_ar || t.hero.title)
    : (settings.hero_title_en || t.hero.title);

  const heroSubtitle = lang === 'ar'
    ? (settings.hero_subtitle_ar || t.hero.subtitle)
    : (settings.hero_subtitle_en || t.hero.subtitle);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative h-[75vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${settings.hero_bg_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-dark/80 to-brand-dark/95 z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-balance leading-tight drop-shadow-lg">
              {heroTitle}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-brand-secondary/90 font-medium">
              {heroSubtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/projects" className="bg-brand-secondary text-brand-dark px-8 py-3 rounded-md font-bold hover:bg-white transition shadow-lg text-lg">
                {t.hero.cta_projects}
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-md font-bold hover:bg-white hover:text-brand-dark transition text-lg">
                {t.hero.cta_contact}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects Quick Strip */}
      {projects.length > 0 && (
        <div className="bg-brand-dark py-4 px-4">
          <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto justify-center items-center">
            {projects.map((project, index) => (
              <Link
                href="/projects"
                key={project.id || index}
                className="flex items-center gap-3 shrink-0 cursor-pointer group bg-white/5 hover:bg-white/15 border border-white/10 hover:border-brand-secondary/50 rounded-lg px-4 py-2.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-md overflow-hidden relative bg-brand-primary/50 shrink-0">
                  <ImageWithFallback
                    src={project.image_url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-semibold group-hover:text-brand-secondary transition-colors text-sm max-w-[120px] truncate">
                  {project.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. About Company */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right">
            <div className="aspect-[4/3] rounded-sm relative border-l-4 border-brand-primary shadow-2xl overflow-hidden group">
              <img 
                src={settings.about_image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="About Al-Saleh" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent z-10" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-4xl text-brand-dark font-bold">{t.about.title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">{t.about.body1}</p>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">{t.about.body2}</p>
              <Link href="/about" className="inline-block text-brand-secondary font-bold text-lg hover:text-brand-primary transition-colors border-b-2 border-brand-secondary pb-1">
                {t.about.link}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Stats Counter */}
      <section className="py-16 px-4 bg-brand-primary">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { val: settings.stat_experience || '+50', label: t.stats.experience },
            { val: settings.stat_projects || `+${projects.length || 15}`, label: t.stats.projects },
            { val: settings.stat_clients || '+500', label: t.stats.clients },
            { val: settings.stat_cities || '+10', label: t.stats.cities },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-brand-secondary">{stat.val}</div>
                <div className="text-sm md:text-base opacity-80">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. Projects Showcase */}
      <section className="py-24 px-4 bg-brand-light">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <h2 className="text-4xl text-brand-dark font-bold">{t.sections.projects}</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">{t.sections.projects_sub}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.15}>
                <Link href={`/projects/${project.id}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl cursor-pointer block">
                  <img src={project.image_url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-dark/40 to-transparent opacity-90" />
                  <div className="absolute bottom-6 w-full px-6 flex justify-between items-end z-20">
                    <div>
                      <span className="text-brand-secondary text-sm font-bold tracking-wider mb-2 block">{project.category}</span>
                      <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-brand-secondary flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-dark transition-colors shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/projects" className="inline-block bg-brand-primary text-white font-bold px-10 py-3 rounded shadow hover:bg-brand-dark transition">
                {t.sections.view_all}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Company News */}
      <section 
        className="py-24 px-4 bg-brand-dark relative overflow-hidden"
        style={settings.news_bg_url ? {
          backgroundImage: `linear-gradient(rgba(17, 11, 109, 0.9), rgba(66, 3, 117, 0.9)), url('${settings.news_bg_url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-2/3 flex gap-6 overflow-hidden flex-wrap md:flex-nowrap">
            {news.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.2} className="w-full md:min-w-[350px] shrink-0">
                <Link href={`/news/${item.id}`} className="aspect-[3/4] relative rounded overflow-hidden group block">
                  <img src={item.image_url} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-90" />
                  <div className="absolute bottom-6 px-6 text-white space-y-4 w-full">
                    <h3 className="text-2xl font-bold leading-snug line-clamp-3">{item.title}</h3>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-brand-secondary font-semibold">{t.news_page.read_more}</span>
                      <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-brand-secondary group-hover:border-brand-secondary group-hover:text-brand-dark transition-colors shrink-0">
                        <span className="text-sm">←</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="left" delay={0.3}>
            <div className="w-full md:w-1/3 text-white space-y-8 flex flex-col justify-center">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">{t.sections.news}</h2>
              <Link href="/news" className="bg-brand-secondary text-brand-dark px-8 py-3 w-fit font-bold hover:bg-white transition shadow-sm text-center">
                {t.sections.more_news}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Media Library */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-200 pb-8">
              <div>
                <h2 className="text-4xl font-bold text-brand-dark mb-4">{t.sections.media}</h2>
                <p className="text-gray-500 max-w-lg text-balance">{t.sections.media_sub}</p>
              </div>
              <Link href="/media" className="flex items-center gap-2 text-brand-secondary font-bold hover:text-brand-primary transition">
                <span>{t.sections.view_media}</span>
                <span>←</span>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
            {media.map((item, index) => {
              if (index === 0) {
                return (
                  <ScrollReveal key={item.id} className="col-span-2 row-span-2">
                    <Link href="/media" className="group relative overflow-hidden rounded bg-brand-light cursor-pointer block w-full h-full">
                      <img src={item.url} alt={item.alt_text} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent z-10" />
                      <span className="absolute bottom-6 right-6 text-white font-bold z-20 text-lg">{item.alt_text}</span>
                      <span className="absolute top-6 right-6 bg-brand-secondary text-brand-dark text-xs font-bold px-3 py-1 rounded z-20">{item.type === 'video' ? 'فيديو' : 'صورة'}</span>
                    </Link>
                  </ScrollReveal>
                );
              }
              return (
                <ScrollReveal key={item.id} delay={index * 0.1}>
                  <Link href="/media" className="group relative overflow-hidden rounded bg-brand-light cursor-pointer block w-full h-full">
                    <img src={item.url} alt={item.alt_text} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Partners Section (Marquee) */}
      {partners.length > 0 && (
        <section className="py-20 bg-brand-light/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-brand-dark mb-2">شركاء النجاح</h2>
              <div className="w-20 h-1 bg-brand-secondary mx-auto"></div>
            </ScrollReveal>
          </div>
          
          <div className="relative flex overflow-x-hidden">
            <div className="py-12 animate-marquee whitespace-nowrap flex items-center">
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <div key={`${partner.id}-${i}`} className="mx-8 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex items-center justify-center min-w-[150px]">
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name} 
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate for seamless loop */}
            <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex items-center">
              {[...partners, ...partners, ...partners].map((partner, i) => (
                <div key={`${partner.id}-dup-${i}`} className="mx-8 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex items-center justify-center min-w-[150px]">
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name} 
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">{t.cta.title}</h2>
            <p className="text-lg text-white/70">{t.cta.body}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-brand-secondary text-brand-dark px-10 py-4 rounded-md font-bold hover:bg-white transition shadow-xl text-lg">
                {t.cta.contact_btn}
              </Link>
              <Link href="/projects" className="border-2 border-brand-secondary text-brand-secondary px-10 py-4 rounded-md font-bold hover:bg-brand-secondary hover:text-brand-dark transition text-lg">
                {t.cta.projects_btn}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

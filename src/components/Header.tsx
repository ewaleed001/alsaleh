'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, lang, toggleLang } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/projects', label: t.nav.projects },
    { href: '/news', label: t.nav.news },
    { href: '/media', label: t.nav.media },
  ];

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll for header background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Hide header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mt-1 cursor-pointer flex items-center h-full py-2">
            <img src="/logo.svg" alt="Al-Saleh Group Logo" className="h-[90%] w-auto max-h-[60px] object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-brand-secondary'
                    : 'text-brand-dark hover:text-brand-secondary'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 right-0 left-0 h-0.5 bg-brand-secondary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-4 items-center">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-secondary transition-colors border border-brand-primary/20 hover:border-brand-secondary px-3 py-1.5 rounded-lg"
            >
              <span className="text-base">{lang === 'ar' ? '🇺🇸' : '🇸🇦'}</span>
              <span>{lang === 'ar' ? 'EN' : 'عر'}</span>
            </button>
            <Link href="/contact" className="bg-brand-primary text-white px-6 py-2 rounded-md hover:bg-brand-dark transition shadow-md">
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-brand-primary rounded-full origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              className="block w-6 h-0.5 bg-brand-primary rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-brand-primary rounded-full origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-[85%] max-w-sm bg-white z-40 shadow-2xl flex flex-col`}
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <img src="/logo.svg" alt="Logo" className="h-12 w-auto object-contain" />
                <span className="bg-brand-primary/10 text-brand-primary text-xs px-3 py-1 rounded-full font-bold">
                  {lang === 'ar' ? 'القائمة' : 'Menu'}
                </span>
              </div>

              {/* Menu Navigation Links */}
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                        pathname === link.href
                          ? 'bg-brand-primary text-white shadow-md'
                          : 'text-brand-dark hover:bg-brand-light'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        pathname === link.href ? 'bg-brand-secondary' : 'bg-gray-300'
                      }`} />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Menu Footer Actions */}
              <div className="p-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-brand-primary text-white text-center px-6 py-3.5 rounded-xl font-bold hover:bg-brand-dark transition shadow-lg"
                >
                  {t.nav.contact}
                </Link>
                {/* Language Toggle in Mobile */}
                <button
                  onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
                  className="flex w-full items-center justify-center gap-3 text-sm font-bold text-brand-dark border border-brand-primary/20 py-3 rounded-xl hover:bg-brand-light transition"
                >
                  <span className="text-xl">{lang === 'ar' ? '🇺🇸' : '🇸🇦'}</span>
                  <span>{lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

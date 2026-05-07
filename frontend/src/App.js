import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import WhyChoose from './components/WhyChoose';
import StatsBanner from './components/StatsBanner';
import Benefits from './components/Benefits';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import MobileApp from './components/MobileApp';
import News from './components/News';
import Partners from './components/Partners';
import Banner from './components/Banner';
import Footer from './components/Footer';
import AdminApp from './components/AdminApp';
import SupportWidget from './components/SupportWidget';
import { createQuote, fetchHomeContent } from './api';
import { defaultHomeContent } from './defaultContent';

function App() {
  const isAdminPage = window.location.pathname.startsWith('/admin');
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [quoteState, setQuoteState] = useState({
    submitting: false,
    message: '',
    error: '',
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const partnerContent = useMemo(() => {
    const backendItems = homeContent.partners?.items || [];
    const backendNames = new Set(backendItems.map((item) => item.name));
    const additionalItems = defaultHomeContent.partners.items.filter(
      (item) => !backendNames.has(item.name)
    );

    return {
      ...homeContent.partners,
      items: [...backendItems, ...additionalItems],
    };
  }, [homeContent.partners]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    if (isAdminPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, isAdminPage]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isAdminPage) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    async function loadContent() {
      try {
        const data = await fetchHomeContent();
        if (active) {
          setHomeContent(data);
          setPageError('');
        }
      } catch (error) {
        if (active) {
          setPageError(error.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      active = false;
    };
  }, [isAdminPage]);

  if (isAdminPage) {
    return <AdminApp />;
  }

  async function handleQuoteSubmit(formData) {
    try {
      setQuoteState({
        submitting: true,
        message: '',
        error: '',
      });

      const response = await createQuote(formData);
      setQuoteState({
        submitting: false,
        message: response.message,
        error: '',
      });
      return true;
    } catch (error) {
      setQuoteState({
        submitting: false,
        message: '',
        error: error.message,
      });
      return false;
    }
  }

  return (
    <div className="App">
      <Navbar links={homeContent.navigationLinks} />
      {loading && <div className="page-status">Đang tải dữ liệu từ hệ thống...</div>}
      {pageError && <div className="page-status page-status--error">{pageError}</div>}
      <section id="home">
        <Hero content={homeContent.hero} />
      </section>
      <section id="products" className="animate-on-scroll">
        <Products content={homeContent.products} />
      </section>
      <div className="animate-on-scroll">
        <WhyChoose content={homeContent.whyChoose} />
      </div>
      <div className="animate-on-scroll">
        <StatsBanner content={homeContent.stats} />
      </div>
      <section id="benefits" className="animate-on-scroll">
        <Benefits content={homeContent.benefits} />
      </section>
      <div className="animate-on-scroll">
        <Process content={homeContent.process} />
      </div>
      <div className="animate-on-scroll">
        <FAQ content={homeContent.faqs} />
      </div>
      <div className="animate-on-scroll">
        <Testimonials content={homeContent.testimonials} />
      </div>
      <section id="quote">
        <MobileApp
          quoteSection={homeContent.quoteSection}
          quoteOptions={homeContent.quoteOptions}
          mobileApp={homeContent.mobileApp}
          onQuoteSubmit={handleQuoteSubmit}
          quoteState={quoteState}
        />
      </section>
      <section id="news" className="animate-on-scroll">
        <News content={homeContent.news} />
      </section>
      <div className="animate-on-scroll">
        <Partners content={partnerContent} />
      </div>
      <Banner content={homeContent.banner} />
      <section id="contact">
        <Footer content={homeContent.footer} contactSupport={homeContent.contactSupport} />
      </section>
      <SupportWidget contactSupport={homeContent.contactSupport} />
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Lên đầu trang">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;

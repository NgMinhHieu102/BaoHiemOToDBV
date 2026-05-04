import React, { useEffect, useState } from 'react';
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
      <section id="products">
        <Products content={homeContent.products} />
      </section>
      <WhyChoose content={homeContent.whyChoose} />
      <StatsBanner content={homeContent.stats} />
      <section id="benefits">
        <Benefits content={homeContent.benefits} />
      </section>
      <Process content={homeContent.process} />
      <FAQ content={homeContent.faqs} />
      <Testimonials content={homeContent.testimonials} />
      <MobileApp
        quoteSection={homeContent.quoteSection}
        quoteOptions={homeContent.quoteOptions}
        mobileApp={homeContent.mobileApp}
        onQuoteSubmit={handleQuoteSubmit}
        quoteState={quoteState}
      />
      <section id="news">
        <News content={homeContent.news} />
      </section>
      <Partners content={homeContent.partners} />
      <Banner content={homeContent.banner} />
      <section id="contact">
        <Footer content={homeContent.footer} contactSupport={homeContent.contactSupport} />
      </section>
      <SupportWidget contactSupport={homeContent.contactSupport} />
    </div>
  );
}

export default App;

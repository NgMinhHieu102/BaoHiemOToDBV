import React from 'react';
import './Hero.css';
import pannerImg from '../assets/panner.png';

const Hero = ({ content = {} }) => {
  return (
    <section className="hero" id="home">
      <img src={pannerImg} alt={content.banner_alt || 'Banner bảo hiểm DBV'} className="hero-banner" />

      <div className="hero-buttons">
        <a className="hero-btn hero-btn--primary" href="#quote">
          GỬI TƯ VẤN BẢO HIỂM
        </a>
        <a className="hero-btn hero-btn--outline" href="#products">
          XEM SẢN PHẨM
        </a>
      </div>
    </section>
  );
};

export default Hero;

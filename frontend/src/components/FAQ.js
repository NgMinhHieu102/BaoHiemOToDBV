import React, { useState } from 'react';
import './FAQ.css';

const FAQ = ({ content = { items: [] } }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <p className="faq-eyebrow">{content.eyebrow}</p>
        <h2 className="faq-heading">{content.heading}</h2>

        <div className="faq-list">
          {content.items.map((faq, index) => (
            <div className={`faq-item ${openIndex === index ? 'active' : ''}`} key={index}>
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span className="question-icon">❓</span>
                <span className="question-text">{faq.question}</span>
                <span className="toggle-icon">+</span>
              </button>

              <div className="faq-answer">
                <div className="answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

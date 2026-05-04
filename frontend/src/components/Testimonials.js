import React, { useMemo, useState } from 'react';
import './Testimonials.css';
import { testimonialAvatars } from '../contentAssets';

function resolveAvatar(value) {
  return testimonialAvatars[value] || value;
}

const Testimonials = ({ content = { items: [] } }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.max(1, Math.ceil(content.items.length / itemsPerSlide));

  const currentTestimonials = useMemo(() => {
    const start = currentSlide * itemsPerSlide;
    return content.items.slice(start, start + itemsPerSlide);
  }, [content.items, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>*</span>
    ));
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <p className="testimonials-eyebrow">{content.eyebrow}</p>
        <h2 className="testimonials-heading">{content.heading}</h2>

        <div className="testimonials-slider">
          <div className="testimonials-grid">
            {currentTestimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-header">
                  <div className="avatar">
                    <img src={resolveAvatar(testimonial.avatarKey)} alt={testimonial.name} />
                  </div>
                  <div className="customer-info">
                    <h3 className="customer-name">{testimonial.name}</h3>
                    <p className="customer-location">{testimonial.location}</p>
                  </div>
                </div>

                <p className="testimonial-review">{testimonial.review}</p>

                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>

          <div className="slider-dots">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                className={`dot ${currentSlide === i ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

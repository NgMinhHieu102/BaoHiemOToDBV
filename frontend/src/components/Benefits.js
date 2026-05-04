import './Benefits.css';
import { benefitIcons } from '../contentAssets';

const Benefits = ({ content = { items: [] } }) => (
  <section className="benefits">
    <div className="benefits-container">
      <p className="benefits-eyebrow">{content.eyebrow}</p>
      <h2 className="benefits-heading">{content.heading}</h2>

      <div className="benefits-grid">
        {content.items.map((benefit, i) => (
          <div className="benefit-item" key={i}>
            <div className="benefit-icon">
              {benefitIcons[benefit.iconKey] && (
                <img
                  src={benefitIcons[benefit.iconKey]}
                  alt={benefit.title}
                  style={{ width: '140px', height: '140px', objectFit: 'contain' }}
                />
              )}
            </div>
            <h3 className="benefit-title">{benefit.title}</h3>
            <p className="benefit-description">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;

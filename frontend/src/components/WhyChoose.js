import './WhyChoose.css';
import { whyChooseIcons } from '../contentAssets';

const WhyChoose = ({ content = { reasons: [] } }) => (
  <section className="why-choose">
    <div className="why-top">
      <p className="why-eyebrow">{content.eyebrow}</p>
      <h2 className="why-heading">{content.heading}</h2>

      <div className="why-reasons">
        {content.reasons.map((reason, i) => (
          <div className="why-reason" key={i}>
            <div className="why-reason-icon">
              {whyChooseIcons[reason.icon_key] ? (
                <img src={whyChooseIcons[reason.icon_key]} alt={reason.title} className="why-reason-img" />
              ) : (
                <div className="why-reason-icon-placeholder" />
              )}
            </div>
            <h3 className="why-reason-title">{reason.title}</h3>
            <p className="why-reason-desc">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;

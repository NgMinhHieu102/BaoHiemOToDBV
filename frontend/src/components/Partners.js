import { useState } from 'react';
import './Partners.css';
import { partnerLogos } from '../contentAssets';

function resolvePartnerLogo(value) {
  return partnerLogos[value] || value;
}

function PartnerLogo({ partner }) {
  const [loadFailed, setLoadFailed] = useState(false);
  const src = resolvePartnerLogo(partner.logoKey);
  const isString = typeof src === 'string' && src.trim().length > 0;

  if (!src || loadFailed || !isString) {
    return <div className="partner-placeholder">{partner.name}</div>;
  }

  return (
    <img
      src={src}
      alt={partner.name}
      className="partner-logo"
      onError={() => setLoadFailed(true)}
    />
  );
}

const Partners = ({ content = { items: [] } }) => (
  <section className="partners">
    <div className="partners-container">
      <h2 className="partners-heading">{content.heading}</h2>

      <div className="partners-grid">
        {content.items.map((partner) => (
          <div className="partner-item" key={partner.name}>
            <PartnerLogo partner={partner} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Partners;

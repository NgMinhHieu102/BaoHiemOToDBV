import './Partners.css';
import { partnerLogos } from '../contentAssets';

function resolvePartnerLogo(value) {
  return partnerLogos[value] || value;
}

const Partners = ({ content = { items: [] } }) => (
  <section className="partners">
    <div className="partners-container">
      <h2 className="partners-heading">{content.heading}</h2>

      <div className="partners-grid">
        {content.items.map((partner) => (
          <div className="partner-item" key={partner.name}>
            <img src={resolvePartnerLogo(partner.logoKey)} alt={partner.name} className="partner-logo" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Partners;

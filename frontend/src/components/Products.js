import './Products.css';
import { productIcons } from '../contentAssets';

const ArrowBtn = () => (
  <span className="prod-arrow-btn">
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="18" stroke="#27ae60" strokeWidth="2" />
      <path d="M16 13l6 6-6 6" stroke="#27ae60" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const Products = ({ content = { items: [] } }) => (
  <section className="products" id="products">
    <div className="products-inner">
      <p className="prod-eyebrow">{content.eyebrow}</p>
      <h2 className="prod-heading">{content.heading}</h2>
      <p className="prod-subheading">{content.subheading}</p>

      <div className="prod-grid">
        {content.items.map(({ label, name, description, iconKey }, i) => (
          <a className="prod-card" key={i} href="#quote" aria-label={`${label} ${name}`}>
            <p className="prod-card-label">{label}</p>
            <h3 className="prod-card-name">{name}</h3>

            <div className="prod-icon-wrap">
              {productIcons[iconKey] ? (
                <img src={productIcons[iconKey]} alt={name} className="prod-icon-img" />
              ) : (
                <div className="prod-icon-placeholder" />
              )}
            </div>

            <p className="prod-card-desc">{description}</p>
            <ArrowBtn />
          </a>
        ))}
      </div>

      <div className="prod-cta">
        <a className="prod-btn-all" href="#quote">
          {content.buttonText || 'XEM TẤT CẢ SẢN PHẨM'}
        </a>
      </div>
    </div>
  </section>
);

export default Products;

import './StatsBanner.css';
import { statsIcons } from '../contentAssets';

const StatsBanner = ({ content = { items: [] } }) => (
  <section className="stats-banner">
    <div className="stats-container">
      {content.items.map((item, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-icon">
            {statsIcons[item.iconKey] && (
              <img
                src={statsIcons[item.iconKey]}
                alt={item.label}
                style={{ width: '110px', height: '110px', objectFit: 'contain' }}
              />
            )}
          </div>
          <div className="stat-text">
            <p className="stat-number">{item.number}</p>
            <p className="stat-label">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBanner;

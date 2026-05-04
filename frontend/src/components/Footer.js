import './Footer.css';

const ContactIcon = ({ type }) => {
  if (type === 'phone') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'email') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" />
        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

const Footer = ({
  content = { links: {}, contacts: [] },
  contactSupport = {
    zaloUrl: 'https://zalo.me/0901234567',
    zaloLabel: 'Chat Zalo với tư vấn viên',
    mapEmbedUrl: 'https://www.google.com/maps?q=Quan+1,+Ho+Chi+Minh+City&z=15&output=embed',
    mapTitle: 'Bản đồ văn phòng DBV',
  },
}) => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 2L35 10V30L20 38L5 30V10L20 2Z" stroke="white" strokeWidth="2" fill="none" />
                <path d="M15 18L18 21L25 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="logo-text">
              <div className="logo-name">{content.brandName}</div>
              <div className="logo-subtitle">{content.brandSubtitle}</div>
            </div>
          </div>
          <p className="footer-description">{content.description}</p>
          <div className="footer-social">
            <a href="https://facebook.com" className="social-link">Facebook</a>
            <a href="https://youtube.com" className="social-link">YouTube</a>
            <a href={contactSupport.zaloUrl} className="social-link" target="_blank" rel="noreferrer">Zalo</a>
          </div>
        </div>

        {Object.entries(content.links || {}).map(([sectionTitle, links]) => (
          <div className="footer-column" key={sectionTitle}>
            <h3 className="footer-title">{sectionTitle}</h3>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={`${sectionTitle}-${link.label}`}>
                  <a href={link.href === '#' ? '/#quote' : link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-column">
          <h3 className="footer-title">LIÊN HỆ</h3>
          <div className="footer-contact">
            {content.contacts.map((contact) => (
              <div className="contact-item" key={contact.type}>
                <ContactIcon type={contact.type} />
                <span>{contact.value}</span>
              </div>
            ))}
          </div>
          <a className="footer-zalo-link" href={contactSupport.zaloUrl} target="_blank" rel="noreferrer">
            {contactSupport.zaloLabel}
          </a>
        </div>
      </div>

      <div className="footer-map" id="contact-map">
        <div className="footer-map__copy">
          <p className="footer-map__eyebrow">Tìm đến DBV</p>
          <h3 className="footer-map__title">Bản đồ văn phòng và hỗ trợ Zalo</h3>
          <p className="footer-map__text">
            Khách hàng có thể xem vị trí văn phòng trên bản đồ và kết nối nhanh với bộ phận tư vấn qua Zalo.
          </p>
          <a className="footer-map__cta" href={contactSupport.zaloUrl} target="_blank" rel="noreferrer">
            Mở tư vấn qua Zalo
          </a>
        </div>
        <div className="footer-map__frame">
          <iframe
            title={contactSupport.mapTitle}
            src={contactSupport.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p>{content.copyright}</p>
      </div>
    </div>
  </footer>
);

export default Footer;

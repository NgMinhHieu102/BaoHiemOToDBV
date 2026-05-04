import './SupportWidget.css';

const SupportWidget = ({
  contactSupport = {
    zaloUrl: 'https://zalo.me/0901234567',
  },
}) => {
  return (
    <div className="support-widget">
      <a
        className="support-widget__button support-widget__button--zalo"
        href={contactSupport.zaloUrl}
        target="_blank"
        rel="noreferrer"
      >
        Zalo
      </a>
      <a className="support-widget__button support-widget__button--map" href="#contact-map">
        Bản đồ
      </a>
    </div>
  );
};

export default SupportWidget;

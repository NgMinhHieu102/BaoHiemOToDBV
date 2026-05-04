import './News.css';

function getArticleHref(article) {
  if (article?.link && article.link !== '#') {
    return article.link;
  }

  return '#quote';
}

const News = ({ content = { items: [] } }) => {
  const firstArticleLink = content.items.find((article) => article.link && article.link !== '#')?.link || '#quote';

  return (
    <section className="news">
      <div className="news-container">
        <div className="news-header">
          <div className="news-titles">
            <p className="news-eyebrow">{content.eyebrow}</p>
            <h2 className="news-heading">{content.heading}</h2>
          </div>
          <a className="view-all-btn" href={firstArticleLink}>
            {content.buttonText || 'XEM TẤT CẢ'}
          </a>
        </div>

        <div className="news-grid">
          {content.items.map((article, index) => (
            <article className="news-card" key={index}>
              <div className="news-image">
                <img src={article.image} alt={article.title} />
                <div className="news-meta">
                  <span className="news-category" style={{ backgroundColor: article.categoryColor }}>
                    {article.category}
                  </span>
                  <span className="news-date">{article.date}</span>
                </div>
              </div>

              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-description">{article.description}</p>
                <a
                  href={getArticleHref(article)}
                  className="read-more"
                  target={article.link && article.link !== '#' ? '_blank' : undefined}
                  rel={article.link && article.link !== '#' ? 'noreferrer' : undefined}
                >
                  {article.link && article.link !== '#' ? 'Đọc thêm' : 'Nhận tư vấn'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

import { User, Calendar, Tag, Clock, Eye } from 'lucide-react'

const ArticlePreview = ({ article, categories = [] }) => {
  // Fonction pour nettoyer et afficher le contenu HTML
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent }
  }

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('fr-FR')
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Fonction pour obtenir le label de la catégorie
  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category ? category.label : categoryValue
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Image à la une */}
      {article.featuredImage && (
        <div className="mb-8">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* En-tête de l'article */}
      <header className="mb-8">
        {/* Catégorie */}
        {article.category && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Tag size={14} className="mr-1" />
              {getCategoryLabel(article.category)}
            </span>
          </div>
        )}

        {/* Titre */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title || 'Titre de l\'article'}
        </h1>

        {/* Extrait */}
        {article.excerpt && (
          <div className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </div>
        )}

        {/* Métadonnées */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
          {/* Auteur */}
          {article.author && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <User size={14} className="text-primary" />
              </div>
              <span className="font-medium">{article.author}</span>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            <span>{formatDate(article.publishedAt || new Date())}</span>
          </div>

          {/* Temps de lecture */}
          {article.readTime && (
            <div className="flex items-center">
              <Clock size={14} className="mr-2" />
              <span>{article.readTime} min de lecture</span>
            </div>
          )}

          {/* Vues */}
          {article.views !== undefined && (
            <div className="flex items-center">
              <Eye size={14} className="mr-2" />
              <span>{article.views} vues</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Contenu de l'article */}
      <article className="prose prose-lg max-w-none">
        <div 
          className="article-content"
          dangerouslySetInnerHTML={createMarkup(article.content || '<p>Contenu de l\'article...</p>')}
        />
      </article>

      {/* Styles pour le contenu de l'article */}
      <style jsx>{`
        .article-content {
          line-height: 1.8;
          color: #374151;
        }

        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          color: #111827;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .article-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
        }

        .article-content h2 {
          font-size: 1.875rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
        }

        .article-content h4 {
          font-size: 1.25rem;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .article-content a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }

        .article-content a:hover {
          color: #1d4ed8;
        }

        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem auto;
          display: block;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        .article-content blockquote p {
          margin-bottom: 0;
        }

        .article-content pre {
          background: #1f2937;
          color: #f9fafb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .article-content code {
          background: #f3f4f6;
          color: #1f2937;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
        }

        .article-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
        }

        .article-content ul,
        .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content ul li {
          list-style-type: disc;
        }

        .article-content ol li {
          list-style-type: decimal;
        }

        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .article-content th,
        .article-content td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .article-content th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
        }

        .article-content tr:last-child td {
          border-bottom: none;
        }

        .article-content hr {
          border: none;
          height: 2px;
          background: linear-gradient(to right, transparent, #e5e7eb, transparent);
          margin: 3rem 0;
        }

        .article-content strong {
          font-weight: 600;
          color: #111827;
        }

        .article-content em {
          font-style: italic;
        }

        .article-content mark {
          background: #fef3c7;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }

        .article-content .ql-align-center {
          text-align: center;
        }

        .article-content .ql-align-right {
          text-align: right;
        }

        .article-content .ql-align-justify {
          text-align: justify;
        }

        .article-content .ql-indent-1 {
          padding-left: 3rem;
        }

        .article-content .ql-indent-2 {
          padding-left: 6rem;
        }

        .article-content .ql-indent-3 {
          padding-left: 9rem;
        }
      `}</style>
    </div>
  )
}

export default ArticlePreview

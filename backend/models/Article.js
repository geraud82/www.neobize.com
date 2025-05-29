const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      is: /^[a-z0-9-]+$/
    }
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 500]
    }
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [50, 50000]
    }
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'L\'URL de l\'image doit être valide'
      },
      customValidator(value) {
        if (value !== null && value !== '' && !value.match(/^https?:\/\/.+/)) {
          throw new Error('L\'URL de l\'image doit être valide');
        }
      }
    }
  },
  gallery: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  category: {
    type: DataTypes.ENUM('web-dev', 'transport', 'construction', 'general'),
    allowNull: false,
    defaultValue: 'general'
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    allowNull: false,
    defaultValue: 'draft'
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  readTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 120
    }
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 60]
    }
  },
  metaDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [0, 160]
    }
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'articles',
  timestamps: true,
  indexes: [
    { fields: ['slug'] },
    { fields: ['status'] },
    { fields: ['category'] },
    { fields: ['publishedAt'] },
    { fields: ['featured'] }
  ],
  hooks: {
    beforeCreate: (article) => {
      // ✅ Corrigé : génération du slug
      if (!article.slug && article.title) {
        article.slug = article.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, ''); // ✅ correction ici
      }

      // Temps de lecture
      if (article.content && !article.readTime) {
        const wordsPerMinute = 200;
        const wordCount = article.content.split(/\s+/).length;
        article.readTime = Math.ceil(wordCount / wordsPerMinute);
      }

      // Date de publication
      if (article.status === 'published' && !article.publishedAt) {
        article.publishedAt = new Date();
      }
    },
    beforeUpdate: (article) => {
      if (article.changed('title') && article.title) {
        article.slug = article.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      if (article.changed('content') && article.content) {
        const wordsPerMinute = 200;
        const wordCount = article.content.split(/\s+/).length;
        article.readTime = Math.ceil(wordCount / wordsPerMinute);
      }

      if (article.changed('status') && article.status === 'published' && !article.publishedAt) {
        article.publishedAt = new Date();
      }

      if (article.changed('status') && article.status !== 'published') {
        article.publishedAt = null;
      }
    }
  }
});

// Méthodes personnalisées
Article.prototype.incrementViews = function () {
  return this.increment('views');
};

Article.prototype.isPublished = function () {
  return this.status === 'published' && this.publishedAt && this.publishedAt <= new Date();
};

Article.getPublished = function (options = {}) {
  return this.findAll({
    where: {
      status: 'published',
      publishedAt: {
        [require('sequelize').Op.lte]: new Date()
      }
    },
    order: [['publishedAt', 'DESC']],
    ...options
  });
};

Article.getFeatured = function (limit = 3) {
  return this.findAll({
    where: {
      status: 'published',
      featured: true,
      publishedAt: {
        [require('sequelize').Op.lte]: new Date()
      }
    },
    order: [['publishedAt', 'DESC']],
    limit
  });
};

Article.getByCategory = function (category, options = {}) {
  return this.findAll({
    where: {
      status: 'published',
      category,
      publishedAt: {
        [require('sequelize').Op.lte]: new Date()
      }
    },
    order: [['publishedAt', 'DESC']],
    ...options
  });
};

Article.search = function (query, options = {}) {
  const { Op } = require('sequelize');
  return this.findAll({
    where: {
      status: 'published',
      publishedAt: {
        [Op.lte]: new Date()
      },
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { excerpt: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } }
      ]
    },
    order: [['publishedAt', 'DESC']],
    ...options
  });
};

module.exports = Article;

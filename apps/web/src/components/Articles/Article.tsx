import { useState, useEffect } from 'react';
import articleApi from '@/api/articles-api';
import { Article as ArticleType } from '@/types/article.type';
import Card from './Card/Card';

export default function Article() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await articleApi.getAll();
        setArticles(result);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {articles.map((article) => (
        <Card key={article.id} id={article.id} article={article.article} content={article.content} shortContent={article.shortContent} image={article.image} isSingle={false} />
      ))}
    </div>
  );
}

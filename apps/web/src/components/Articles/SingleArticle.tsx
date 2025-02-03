import { useState, useEffect } from 'react';
import articleApi from '@/api/articles-api';
import { Article as ArticleType } from '@/types/article.type';
import Card from './Card/Card';
import { useNavigate, useParams } from 'react-router-dom';

export default function SingleArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticles] = useState<ArticleType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchArticles = async () => {
      try {
        const article = await articleApi.getOne(id);
        article.isSingle = true;
        setArticles(article);
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id, navigate]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  return (
    <div>
      {article ? (
        <Card
          key={article.id}
          article={article.article}
          content={article.content}
          shortContent={article.shortContent}
          image={article.image}
          id={article.id}
          isSingle={article.isSingle}
        />
      ) : null}
    </div>
  );
}

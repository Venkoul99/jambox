import { Article } from '@/types/article.type';
import * as request from './requester';
import { CreateArticle } from '@/types/createArticle.type';

const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL;

const BASE_URL = `${SERVER_URL}/api/articles`;

export const getAll = async (): Promise<Article[]> => {
  const result = await request.get<Record<string, Article>>(BASE_URL);

  const news = Object.values(result);

  return news;
};

export const getLastThree = async (): Promise<Article[]> => {
  const result = await request.get<Record<string, Article>>(`${BASE_URL}/?sortBy=_publishedOn%20desc&pageSize=3`);

  const news = Object.values(result);

  return news;
};

export const getOne = (articleId: string): Promise<Article> => request.get<Article>(`${BASE_URL}/${articleId}`);

export const create = (articleData: CreateArticle) => {

  if (articleData.content.length > 150) {
    articleData.shortContent = `${articleData.content.substring(0, 150)}...`
  }

  request.post<Article>(`${BASE_URL}`, articleData);
}

export const remove = (articleId: string): Promise<Article> => request.del<Article>(`${BASE_URL}/${articleId}`);

export const update = (articleId: string, articleData: Omit<CreateArticle, 'id'>): Promise<Article> => {
  if (articleData.content.length > 150) {
    articleData.shortContent = `${articleData.content.substring(0, 150)}...`
  } else {
    articleData.shortContent = ''
  }

  return request.put<Article>(`${BASE_URL}/${articleId}`, articleData);
}

const articleApi = {
  getOne,
  getLastThree,
  getAll,
  create,
  update,
  remove
};

export default articleApi;

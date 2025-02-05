import { Article } from '@/types/article.type';
import { CreateArticle } from '@/types/createArticle.type';
import { getAcessToken } from '@/tools/getAcessToken';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL;
const BASE_URL = `${SERVER_URL}/api/articles`;

export const getAll = async (): Promise<Article[]> => {
  const accessToken = getAcessToken();

  const response = await axios.get(`${BASE_URL}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return Object.values(response.data);
};

export const getLastThree = async (): Promise<Article[]> => {
  const accessToken = getAcessToken();

  const response = await axios.get(`${BASE_URL}/?sortBy=_publishedOn%20desc&pageSize=3`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return Object.values(response.data);
};

export const getOne = async (articleId: string): Promise<Article> => {
  const accessToken = getAcessToken();

  const response = await axios.get(`${BASE_URL}/${articleId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const create = async (articleData: CreateArticle) => {
  const accessToken = getAcessToken();

  if (articleData.content.length > 150) {
    articleData.shortContent = `${articleData.content.substring(0, 150)}...`;
  }

  try {
    const response = await axios.post(`${BASE_URL}`, articleData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error creating article', err);
    throw err;
  }
};

export const remove = async (articleId: string): Promise<Article> => {
  const accessToken = getAcessToken();

  try {
    const response = await axios.delete(`${BASE_URL}/${articleId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error removing article', err);
    throw err;
  }
};

export const update = async (articleId: string, articleData: Omit<CreateArticle, 'id'>): Promise<Article> => {
  const accessToken = getAcessToken();

  if (articleData.content.length > 150) {
    articleData.shortContent = `${articleData.content.substring(0, 150)}...`;
  } else {
    articleData.shortContent = '';
  }

  try {
    const response = await axios.put(`${BASE_URL}/${articleId}`, articleData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error updating article', err);
    throw err;
  }
};

const articleApi = {
  getOne,
  getLastThree,
  getAll,
  create,
  update,
  remove,
};

export default articleApi;

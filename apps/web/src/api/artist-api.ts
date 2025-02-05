import { getAcessToken } from '@/tools/getAcessToken';
import { Artist } from '@/types/artist.type';
import { CreateArtist } from '@/types/createArtist.type';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL;

const BASE_URL = `${SERVER_URL}/api/artists`;

export const getAll = async (): Promise<Artist[]> => {
  const accessToken = getAcessToken();

  const response = await axios.get(`${BASE_URL}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return Object.values(response.data);
};

export const getOne = async (artistId: string): Promise<Artist> => {
  const response = await axios.get(`${BASE_URL}/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const create = async (artistData: CreateArtist) => {

  const accessToken = getAcessToken();

  if (artistData.bio.length > 150) {
    artistData.shortBio = `${artistData.bio.substring(0, 150)}...`;
  }

  try {
    const response = await axios.post(`${BASE_URL}`, artistData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error creating artist', err);
    throw err;
  }
};

export const update = async (artistId: string, artistData: Omit<CreateArtist, 'id'>) => {
  const accessToken = getAcessToken();

  if (artistData.bio.length > 150) {
    artistData.shortBio = `${artistData.bio.substring(0, 150)}...`;
  } else {
    artistData.shortBio = '';
  }

  try {
    const response = await axios.put(`${BASE_URL}/${artistId}`, artistData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error updating artist', err);
    throw err;
  }
};

export const remove = async (artistId: string) => {
  const accessToken = getAcessToken();

  try {
    const response = await axios.delete(`${BASE_URL}/${artistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error removing artist', err);
    throw err;
  }
};


const artistApi = {
  getOne,
  getAll,
  create,
  update,
  remove
};

export default artistApi;

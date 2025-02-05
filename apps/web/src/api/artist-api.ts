import { Artist } from '@/types/artist.type';
import * as request from './requester';
import { CreateArtist } from '@/types/createArtist.type';

const SERVER_URL = import.meta.env.VITE_ENVIRONMENT === 'DEV' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL;

const BASE_URL = `${SERVER_URL}/api/artists`;

export const getAll = async (): Promise<Artist[]> => {
  const result = await request.get<Record<string, Artist>>(BASE_URL);

  const news = Object.values(result);

  return news;
};

export const getLastThree = async (): Promise<Artist[]> => {
  const result = await request.get<Record<string, Artist>>(`${BASE_URL}/?sortBy=_publishedOn%20desc&pageSize=3`);

  const news = Object.values(result);

  return news;
};

export const getOne = (ArtistId: string): Promise<Artist> => request.get<Artist>(`${BASE_URL}/${ArtistId}`);

export const create = (ArtistData: CreateArtist) => {

  if (ArtistData.bio.length > 150) {
    ArtistData.shortBio = `${ArtistData.bio.substring(0, 150)}...`
  }

  request.post<Artist>(`${BASE_URL}`, ArtistData);
}

export const remove = (ArtistId: string): Promise<Artist> => request.del<Artist>(`${BASE_URL}/${ArtistId}`);

export const update = (ArtistId: string, ArtistData: Omit<CreateArtist, 'id'>): Promise<Artist> => {
  if (ArtistData.bio.length > 150) {
    ArtistData.shortBio = `${ArtistData.bio.substring(0, 150)}...`
  } else {
    ArtistData.shortBio = ''
  }

  return request.put<Artist>(`${BASE_URL}/${ArtistId}`, ArtistData);
}

const artistApi = {
  getOne,
  getLastThree,
  getAll,
  create,
  update,
  remove
};

export default artistApi;

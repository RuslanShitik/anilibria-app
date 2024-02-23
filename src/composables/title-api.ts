import { api } from 'src/boot/axios';
import { paginationT, titleT } from 'src/types';

export type ITitlesResponse = {
  list: titleT[];
  pagination: paginationT;
};


export const useTitleAPI = async<T> (
  path: string,
  params?: object
): Promise<T> => {
  const res = await api.get(path, { params });
  return res.data;
};

export const getTitleByCode = async (code: string): Promise<titleT | null> => {
  const res = await useTitleAPI<titleT>('title', {code});
  return res || null;
};

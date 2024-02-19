import { api } from 'src/boot/axios';
import { paginationT, titleT } from 'src/types';

type ITitleResponse = {
  list: titleT[];
  pagination: paginationT;
};

export const useTitleAPI = async (path:string, params?: object): Promise<ITitleResponse> => {
  const res = await api.get(path, { params });
  return res.data;
};

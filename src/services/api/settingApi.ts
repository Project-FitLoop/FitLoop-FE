/* eslint-disable */
import { instance } from '@/config/apiConfig';

export const fetchProfile = async () => {
const response = await instance.get('/settings/account/personal');
  return response.data;
};

export const fetchAccount = async () => {
const response = await instance.get('/settings/account/profile');
  return response.data;
};

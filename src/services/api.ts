import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cback.pt/api',
  headers: {
    'Api-Authorization': 'Bearer $2a$12$A0jv3a2X5gexkG8egGKMs.yfUsZ4GNpPiumnS.0ah7ZZQc/ofK/ym',
    'Client-Key': 'hardrockcafelisbon',
  }
});
import { env } from '@/lib/config';
import axios from 'axios';


const axiosBase = axios.create({
  baseURL: env.apiUrl,
});





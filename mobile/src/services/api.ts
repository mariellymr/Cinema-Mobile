import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

function resolveBaseUrl(): string {
  // Se o usuário definir EXPO_PUBLIC_API_URL no .env, ela tem prioridade
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '');
  }

  // No Expo Go (celular físico ou emulador), hostUri traz o IP do PC na rede local
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return `http://${host}:3000`;
    }
  }

  // Fallback para emulador Android Studio (10.0.2.2 aponta para localhost do PC)
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  return 'http://localhost:3000';
}

export const API_BASE_URL = resolveBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default api;

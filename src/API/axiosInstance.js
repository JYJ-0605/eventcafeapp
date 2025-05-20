import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

// ① 인스턴스 만들기
const axiosInstance = axios.create({
  baseURL: 'https://eventcafe.site',
  headers: { 'Content-Type': 'application/json' },
});

// ② 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...(config.headers || {}), // 기존 헤더 유지
        Authorization: `Bearer ${token}`, // 추가만
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ③ 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const res = await axios.post(
          'https://eventcafe.site/user/auth/refresh/',
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = res.data.access;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('⚠️ 토큰 갱신 실패:', refreshError);
        await AsyncStorage.clear();
        Alert.alert('세션 만료', '다시 로그인해주세요.');
        if (navigationRef.isReady()) {
          navigationRef.current?.navigate('Login');
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

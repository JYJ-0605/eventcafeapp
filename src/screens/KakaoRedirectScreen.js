// screens/Auth/KakaoRedirectScreen.js
import { useEffect } from 'react';
import { navigate } from '../navigation/NavigatorRef';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KakaoRedirectScreen = () => {
 

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        const parsed = Linking.parse(url);
        const { access, refresh, username, nickname, profile_image } = parsed.queryParams;

        if (access && refresh) {
          AsyncStorage.setItem('accessToken', access);
          AsyncStorage.setItem('refreshToken', refresh);
          AsyncStorage.setItem('username', username);
          AsyncStorage.setItem('nickname', nickname);
          AsyncStorage.setItem('profile_image', profile_image);

          // ✅ 원하는 화면으로 이동
          navigate.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        }
      }
    });
  }, []);

  return null; // 또는 로딩 스피너
};

export default KakaoRedirectScreen;

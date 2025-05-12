// 로그인 폼
import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../context/UserContext'; // 경로 맞게 수정
import { navigate } from '../../navigation/NavigatorRef'; // 경로 확인!

const LoginForm = ({ closeModal, openSignUpModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserContext); // ✅ 훅은 컴포넌트 최상단에서

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        'https://eventcafe.site/user/auth/login/',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // ✅ 토큰 저장 (AsyncStorage는 비동기!)
      await AsyncStorage.multiSet([
        ['accessToken', data.access],
        ['refreshToken', data.refresh],
        [
          'userInfo',
          JSON.stringify({
            nickname: data.nickname,
            username: data.username,
            email: data.email,
            profile_image: data.profile_image,
          }),
        ],
      ]);

      // ✅ 전역 유저 상태 업데이트 (Context 등으로)
      setUser({
        nickname: data.nickname,
        username: data.username,
        email: data.email,
        profile_image: data.profile_image,
      });

      // ✅ 이동 (Stack 기준 route 이름!)

      setTimeout(() => {
        alert('로그인 완료');
        navigate('Main');
        closeModal();
      }, 100); // 아주 짧게 딜레이 줘서 렌더 후 이동

      // 또는 'Home' 등 네비게이터에 등록한 이름
    } catch (err) {
      const serverMessage =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        '알 수 없는 오류가 발생했습니다.';

      alert('로그인 실패: ' + serverMessage);
    }
  };

  const handleKakaoLogin = () => {
    Alert.alert('카카오로 로그인 요청');
  };

  return (
    <View style={styles.container}>
      {/* 로고 섹션 */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* 제목 */}
      <Text style={styles.title}>로그인</Text>

      {/* 입력 폼 */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          계정이 없으신가요?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => {
              openSignUpModal();
            }}
          >
            회원가입
          </Text>
        </Text>
      </View>

      {/* SNS 로그인 */
      /* 만약 TextInput이 View 내부에 감싸져 있다면, View의 크기에 따라 입력 칸이 제한될 수도 있음. */}

      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>SNS로 로그인하기</Text>
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <Icon name="chat" size={24} style={styles.icon} color="#3C1E1E" />
          <Text style={styles.kakaoButtonText}>카카오로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.closeText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    justifyContent: 'center',
    paddingTop: 70,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 3,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 55,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 26,
  },
  signupText: {
    textAlign: 'center',
    color: '#555',
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  }, //marginVertical이 클수록 소셜로그인 위로 올라옴
  dividerContainer: {
    marginVertical: 1,
    alignItems: 'center',
  },
  dividerText: {
    fontSize: 14,
    color: '#888',
  },
  socialButtons: {
    width: '90%',
    maxWidth: 320,
  },
  kakaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    paddingVertical: 13,
    paddingHorizontal: 46,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
  kakaoButtonText: {
    color: '#3C1E1E',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 8,
  },
  naverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 13,
    paddingHorizontal: 46,
    borderRadius: 8,
    justifyContent: 'center',
  },
  naverButtonText: {
    color: '#757575',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 8,
  },
  closeText: {
    marginTop: 12,
    fontSize: 15,
    color: '#007BFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
});

export default LoginForm;

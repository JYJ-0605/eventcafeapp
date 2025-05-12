import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { navigate } from '../../navigation/NavigatorRef';
import IconButton from '../common/IconButton';

const SignUpForm = ({ closeModal, openLoginModal }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [timer, setTimer] = useState(180);
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState('');

  useEffect(() => {
    let timerInterval;
    if (showEmailVerification && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [showEmailVerification, timer]);

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '0:00'; // 보호 코드
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleSignup = async () => {
    if (!nicknameChecked) {
      Alert.alert('오류', '닉네임 중복 확인을 먼저 해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!code) {
      Alert.alert('오류', '이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        'https://eventcafe.site/user/auth/register/',
        {
          username,
          nickname,
          email,
          password,
          user_type: 'regular',
        }
      );

      console.log('✅ 회원가입 성공:', response.data);
      Alert.alert('회원가입 성공', '로그인 페이지로 이동합니다.');

      // navigationRef 사용 시
      navigate('Main'); // 또는 navigation.navigate('Login');
    } catch (err) {
      console.error('❌ 회원가입 실패:', err.response?.data);
      setError(
        err.response?.data?.error || '회원가입 실패. 다시 시도해주세요.'
      );
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post(
        'https://eventcafe.site/user/auth/verify-email-code/',
        {
          email,
          code,
        }
      );
      Alert.alert('이메일 인증', '✅ 이메일 인증이 완료되었습니다!');
    } catch (err) {
      console.error('인증 실패:', err.response?.data);
      Alert.alert('❌ 인증 코드가 잘못되었거나 만료되었습니다.');
    }
  };

  const handleSendVerification = async () => {
    setShowEmailVerification(true);
    setTimer(300);

    try {
      const response = await axios.post(
        'https://eventcafe.site/user/auth/send-email-verification/',
        {
          email,
        }
      );
      console.log('인증 코드 전송 성공:', response.data);
      Alert.alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (err) {
      console.error('인증 코드 전송 실패:', err.response?.data);
      Alert.alert(err.response?.data?.error || '인증 코드 전송 실패.');
    }
  };

  const handleCheckNickname = async () => {
    const specialCharRegex = /[^a-zA-Z0-9가-힣]/;

    // ✅ 1. 특수문자 금지
    if (specialCharRegex.test(nickname)) {
      Alert.alert('❌ 닉네임에는 한글, 영어, 숫자만 사용할 수 있어요.');
      setNicknameChecked(false);
      setNicknameMessage('올바른 닉네임을 입력해주세요.');
      return;
    }

    // ✅ 2. 길이 제한 체크
    if (nickname.length < 2 || nickname.length > 12) {
      Alert.alert('❌ 닉네임은 2자 이상 12자 이하로 입력해주세요.');
      setNicknameChecked(false);
      setNicknameMessage('닉네임 길이를 확인해주세요.');
      return;
    }

    // ✅ 3. 서버에 중복 확인 요청
    try {
      const response = await axios.post(
        'https://eventcafe.site/user/auth/check-nickname/',
        { nickname }
      );

      const { available, message } = response.data;

      setNicknameChecked(available);
      setNicknameMessage(message);

      if (available) {
        Alert.alert('✅ 사용 가능한 닉네임입니다!');
      } else {
        Alert.alert('❌ 이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error.response?.data);
      setNicknameChecked(false);
      setNicknameMessage('중복 확인 실패. 다시 시도하세요.');
      Alert.alert('❌ 닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleGoToLogin = () => {
    closeModal(); // 회원가입 모달 닫고
    if (typeof openLoginModal === 'function') {
      openLoginModal();
    } else {
      console.warn('openLoginModal is undefined or not a function');
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <IconButton icon="angle-left" onPress={handleGoToLogin} />
          <Text style={styles.title}>회원가입</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={handleSendVerification}
        >
          <Text style={styles.buttonOutlineText}>인증 코드 전송</Text>
        </TouchableOpacity>
        {showEmailVerification && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="인증 코드"
              value={code}
              onChangeText={setCode}
            />
            <Text style={styles.timerText}>
              {timer > 0
                ? `남은 시간: ${formatTime(timer)}`
                : '인증 시간이 만료되었습니다.'}
            </Text>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleVerifyCode}
            >
              <Text style={styles.buttonOutlineText}>인증</Text>
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          value={nickname}
          onChangeText={(text) => {
            setNickname(text);
            setNicknameChecked(false);
            setNicknameMessage('');
          }}
          style={styles.input}
          placeholder="닉네임"
        />
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={handleCheckNickname}
        >
          <Text style={styles.buttonOutlineText}>중복 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
    justifyContent: 'center',
    alignItems: 'center', // ✅ 핵심 변경!
    width: '125%',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    height: 600,
    width: '95%',
    maxWidth: 600,
    elevation: 5, // 그림자 효과
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF6F91',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6F91',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#FF6F91',
    fontWeight: 'bold',
  },
  timerText: {
    color: '#555',
    marginBottom: 10,
  },
  link: {
    color: '#00A0E9',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignUpForm;

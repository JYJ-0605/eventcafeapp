import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LoginForm from '../components/forms/LoginForm';

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); //로그인

  const openLoginModal = () => setModalVisible(true);
  const closeLoginModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openLoginModal} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 로그인 폼을 화면에 직접 렌더링 */}
      {modalVisible && (
        <View style={styles.modalContent}>
          <LoginForm
            closeModal={closeLoginModal}
            openSignUpModal={() => console.log('회원가입 모달 열기')} // 회원가입 모달 열기 함수 호출
          />
          <TouchableOpacity onPress={closeLoginModal}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginButton: {
    backgroundColor: '#FFD1CF',
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default LoginScreen;
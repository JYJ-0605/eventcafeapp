import React, { useState } from 'react';
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import LoginForm from '../components/forms/LoginForm';

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 로그인 버튼 */}
      <TouchableOpacity onPress={openModal} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 로그인 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LoginForm />
            <Button title="닫기" onPress={closeModal}/>
          </View>
        </View>
      </Modal>
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
    
    justifyContent: 'center',
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    marginTop: 100, 
    paddingBottom: 50,
  },
  modalContent: {
    width: '100%',
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default LoginScreen;
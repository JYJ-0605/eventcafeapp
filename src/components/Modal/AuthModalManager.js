import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';


const AuthModalManager = ({
  modalVisible,
  setModalVisible,
  showSignUpModal,
  setShowSignUpModal,
}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LoginForm
              closeModal={() => setModalVisible(false)}
              openSignUpModal={() => {
                setModalVisible(false);
                setShowSignUpModal(true);
              }}
              navigation={null}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSignUpModal}
        onRequestClose={() => setShowSignUpModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SignUpForm
              closeModal={() => setShowSignUpModal(false)}
              openLoginModal={() => setModalVisible(true)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    maxWidth: 700,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default AuthModalManager;

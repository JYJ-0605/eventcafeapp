import React from "react";
import { Modal, View, StyleSheet, Modal } from "react-native";
import SignUpForm from "../components/forms/SignUpForm";

const SignUpScreen = () => {
  const [isSignUpVisible, setSignUpVisible] = useState(false);

  const openSignUpModal = () => setSignUpVisible(true);
  const closeSignUpModal = () => setSignUpVisible(false);

  return (
    <View style={styles.container}>
      <SignUpForm
        onClose={() => console.log("닫기")}
        onLogin={() => console.log("로그인으로 이동")}
      />

      {/* 회원가입 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSignUpVisible}
        onRequestClose={closeSignUpModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SignUpForm closeModal={closeSignUpModal} />
            <TouchableOpacity onPress={closeSignUpModal}>
              <Text style={styles.closeText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfeffd",
  },
});

export default SignUpScreen;
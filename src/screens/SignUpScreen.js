import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import SignUpForm from "../components/forms/SignUpForm";

const SignUpScreen = () => {
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  

  const openSignUpModal = () => setSignUpVisible(true);
  const closeSignUpModal = () => setSignUpVisible(false);

  return (
    <SignUpForm
        onClose={() => console.log("닫기")}
        onLogin={() => console.log("로그인으로 이동")}
      />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfeffd",
  },
});

export default SignUpScreen;
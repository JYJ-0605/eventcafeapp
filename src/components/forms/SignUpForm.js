import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../common/IconButton";




const SignUpForm = ({ closeModal, openLoginModal }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [timer, setTimer] = useState(180);
  const [code, setCode] = useState("");
  const [userName, setUserName] = useState("");

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
    if (typeof seconds !== "number" || isNaN(seconds)) return "0:00"; // 보호 코드
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };
  

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!code) {
      Alert.alert("오류", "이메일 인증을 완료해주세요.");
      return;
    }
    console.log("회원가입 요청", { email, password, code, userName });
    // TODO: 회원가입 API 요청 보내기
  };

  const handleSendVerification = () => {
    setShowEmailVerification(true);
    setTimer(180);
    console.log("인증 코드 전송 요청");
    // TODO: 이메일 인증 API 요청 보내기
  };

  const handleGoToLogin = () => {
    closeModal();         // 회원가입 모달 닫고
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
          <IconButton icon="angle-left" onPress={handleGoToLogin}/> 
          <Text style={styles.title}>회원가입</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.buttonOutline} onPress={handleSendVerification}>
          <Text style={styles.buttonOutlineText}>인증</Text>
        </TouchableOpacity>
        {showEmailVerification && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="인증 코드"
              value={code}
              onChangeText={setCode}
            />
            <Text style={styles.timerText}>{timer > 0 ? `남은 시간: ${formatTime(timer)}` : "인증 시간이 만료되었습니다."}</Text>
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
          placeholder="유저명"
          value={userName}
          onChangeText={setUserName}
        />
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
    backgroundColor: "rgba(0,0,0,0.5)", // 반투명 배경
    justifyContent: "center",
    alignItems: "center", // ✅ 핵심 변경!
    width: '125%',
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    height: 450,
    width: "95%",
    maxWidth: 600,
    elevation: 5, // 그림자 효과
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FF6F91",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF6F91",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#FF6F91",
    fontWeight: "bold",
  },
  timerText: {
    color: "#555",
    marginBottom: 10,
  },
  link: {
    color: "#00A0E9",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignUpForm;
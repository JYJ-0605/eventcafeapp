import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import SignUpForm from "../components/forms/SignUpForm";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [timer, setTimer] = useState(180);
  const [code, setCode] = useState("");

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
    console.log("회원가입 요청", { email, password, code });
  };

  const handleSendVerification = () => {
    setShowEmailVerification(true);
    setTimer(180);
    console.log("인증 코드 전송 요청");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
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
          <Text style={styles.timerText}>
            {timer > 0 ? `남은 시간: ${formatTime(timer)}` : "인증 시간이 만료되었습니다."}
          </Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfeffd",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonOutlineText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  timerText: {
    color: "#555",
    marginTop: 5,
  },
});

export default SignUpScreen;

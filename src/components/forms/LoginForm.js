// 로그인 폼
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const LoginForm = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    Alert.alert("로그인 요청");
  };

  const handleKakaoLogin = () => {
    Alert.alert("카카오로 로그인 요청");
  };

  const handleNaverLogin = () => {
    Alert.alert("네이버로 로그인 요청");
  };

  return (
    <View style={styles.container}>
      {/* 로고 섹션 */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/logo.png")} // 로고 이미지 경로
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
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          계정이 없으신가요?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            회원가입
          </Text>
        </Text>
      </View>

      {/* SNS 로그인 *//* 만약 TextInput이 View 내부에 감싸져 있다면, View의 크기에 따라 입력 칸이 제한될 수도 있음. */}
      
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>SNS로 로그인하기</Text>
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <Icon name="chat" size={24} style={styles.icon} color="#3C1E1E" />
          <Text style={styles.kakaoButtonText}>카카오로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
          <FontAwesome name="google" size={24} style={styles.icon} color="#757575" />
          <Text style={styles.naverButtonText}>네이버로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "80%",
    justifyContent: "center", // 중앙이 아니라 아래쪽으로 배치
    paddingTop: 5, // 폼을 아래로
    alignItems: "center",// 모든 아이템 가운데 정렬, container에 이게 center로 되어있으면 아이템들 축소가 될 수도 있음
  },
  logoContainer: {
    marginBottom: 3,
  },
  logo: {
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  form: {
    width: "100%",
    maxWidth: 320,//로그인 칸?
    marginBottom: 50,// 총 높이임 제일 중요함!
  },
  input: {

    
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    
    marginBottom: 10, //로그인칸 모이게 하기
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 55,// 로그인칸 늘어나는 데 얘도 있어야 댐
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 2,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 26,//이게 진짜 늘어남 로그인 칸
  },
  signupText: {
    textAlign: "center",
    color: "#555",
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },//marginVertical이 클수록 소셜로그인 위로 올라옴
  dividerContainer: {
    marginVertical: 1,// 얘가 크면 아이콘이 모이게됨
    alignItems: "center",
  },
  dividerText: {
    fontSize: 14,
    color: "#888",
  },
  socialButtons: {
    width: "90%",
    maxWidth: 320,
  },
  kakaoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE500",
    paddingVertical: 13,
    paddingHorizontal: 46,
    borderRadius: 8,
    marginBottom: 8,//카카오, 네이버 버튼 사이
    justifyContent: "center",
  },
  kakaoButtonText: {
    color: "#3C1E1E",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 8,
  },
  naverButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 13,
    paddingHorizontal: 46,//버튼 너비
    borderRadius: 8,
    justifyContent: "center",
  },
  naverButtonText: {
    color: "#757575",
    fontWeight: "bold",
    fontSize: 13, //카카오 버튼 텍스트랑 동일하게
    marginLeft: 8,// 버튼 너비
  },
  icon: {
    marginRight: 8,
  },
});

export default LoginForm;
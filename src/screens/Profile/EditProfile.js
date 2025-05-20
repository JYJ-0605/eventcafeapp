import { Avatar } from '@rneui/themed'; // react-native-elements 사용
import * as ImagePicker from 'expo-image-picker'; // 이미지 피커
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axiosInstance from '../../API/axiosInstance'; // Axios 설정 (본인 앱 구조에 맞게 수정)
import { UserContext } from '../../context/UserContext'; // Context API (본인 앱 구조에 맞게 수정)

export default function EditProfile({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [profile_image, setProfileImage] = useState(null);

  const { user, setUser } = useContext(UserContext); // ✅ 로그인된 유저

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      if (user.profile_image) {
        setPreviewImage({ uri: user.profile_image }); // URL로 설정
      }
    }
  }, [user]);

  const pickImage = async () => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 거부', '사진 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setPreviewImage({ uri });
      // React Native의 FormData는 URI를 바로 사용할 수 없으므로, 별도의 처리 필요
      // 여기서는 백엔드에서 URI를 처리하거나, base64 인코딩 등을 고려해야 함
      // 일단 파일 객체 형태로 저장 (백엔드 구현에 따라 수정 필요)
      const imageName = uri.split('/').pop();
      const imageType = 'image/jpeg'; // 실제 타입에 따라 수정
      setProfileImage({ uri, name: imageName, type: imageType });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('email', email);
      formData.append('bio', bio);

      if (profile_image) {
        // React Native의 FormData는 URI를 직접 처리하기 어려울 수 있습니다.
        // 백엔드에서 URI를 처리할 수 있다면 그대로 보내거나,
        // base64 인코딩하여 문자열로 보내는 방식을 고려해야 합니다.
        // 여기서는 임시로 파일 객체를 append 합니다. 실제 백엔드 구현에 맞춰 수정하세요.
        formData.append('profile_image', profile_image);
      }

      const response = await axiosInstance.patch(
        '/user/profile/update/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser(response.data);
      Alert.alert('성공', '변경사항이 저장되었습니다!', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('프로필 수정 에러:', error);
      Alert.alert('실패', '저장 실패, 다시 시도해주세요.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Text style={styles.title}>프로필 수정</Text>

        {/* 프로필 사진 */}
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {preview_image ? (
            <Avatar
              source={previewImage}
              size={110}
              rounded
              containerStyle={styles.profile_image}
            />
          ) : (
            <View style={styles.defaultProfile}>
              <Text style={styles.defaultProfileText}>사진 선택</Text>
            </View>
          )}
          <Text style={styles.changePhotoButton}>사진 변경</Text>
        </TouchableOpacity>

        {/* 입력 폼 */}
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textarea}
          value={bio}
          onChangeText={setBio}
          placeholder="자기소개"
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e7ff',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
  },
  title: {
    marginBottom: 28,
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  imageContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  profileImage: {
    borderWidth: 3,
    borderColor: '#7a70ff',
    marginBottom: 10,
  },
  defaultProfile: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#aaa',
    borderStyle: 'dashed',
  },
  defaultProfileText: {
    fontSize: 14,
    color: '#666',
  },
  changePhotoButton: {
    fontSize: 14,
    color: '#7a70ff',
    marginTop: 5,
  },
  input: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 15,
    marginBottom: 16,
    width: '100%',
  },
  textarea: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 15,
    minHeight: 100,
    resize: 'vertical',
    marginBottom: 22,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    color: '#fff',
    paddingVertical: 13,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 화면 이동을 위한 훅

const DictionaryForm = () => {
  const [term, setTerm] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!term.trim()) {
      Alert.alert('알림', '용어를 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('알림', '설명을 입력해주세요.');
      return;
    }

    // 실제로는 여기서 API 호출 등을 통해 서버에 데이터를 저장해야 합니다.
    // 임시로 Alert를 통해 등록된 내용을 확인합니다.
    Alert.alert(
      '등록 완료',
      `용어: ${term}\n설명: ${description}`,
      [
        {
          text: '확인',
          onPress: () => {
            // 등록 후 화면 이동 등의 처리를 할 수 있습니다.
            navigation.goBack(); // 이전 화면으로 돌아가기
          },
        },
      ]
    );

    // 등록 후 입력 필드 초기화
    setTerm('');
    setDescription('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>용어</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 최애, 입덕, 굿즈"
          value={term}
          onChangeText={setTerm}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>설명</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="용어에 대한 자세한 설명을 적어주세요."
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DictionaryForm;
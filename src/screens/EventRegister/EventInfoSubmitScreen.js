import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Checkbox from 'expo-checkbox';

export default function FinalEventSubmitScreen({ navigation }) {
  const [snsType, setSnsType] = useState({
    x: false,
    instagram: false,
    none: false,
  });
  const [snsId, setSnsId] = useState('');
  const [link, setLink] = useState('');
  const [intro, setIntro] = useState('');

  const toggleSns = (type) => {
    setSnsType((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>이벤트 등록하기</Text>

      <Text style={styles.label}>소개글</Text>
      <TextInput
        style={styles.textarea}
        placeholder="이벤트를 소개해주세요"
        multiline
        numberOfLines={6}
        value={intro}
        onChangeText={setIntro}
      />

      <Text style={styles.label}>SNS</Text>
      <View style={styles.checkboxRow}>
        <Checkbox value={snsType.x} onValueChange={() => toggleSns('x')} />
        <Text style={styles.checkboxLabel}>X</Text>
        <Checkbox value={snsType.instagram} onValueChange={() => toggleSns('instagram')} />
        <Text style={styles.checkboxLabel}>Instagram</Text>
        <Checkbox value={snsType.none} onValueChange={() => toggleSns('none')} />
        <Text style={styles.checkboxLabel}>없음</Text>
      </View>

      <Text style={styles.label}>SNS ID</Text>
      <TextInput
        style={styles.input}
        placeholder="SNS 계정 입력"
        value={snsId}
        onChangeText={setSnsId}
      />

      <Text style={styles.label}>게시글 링크</Text>
      <TextInput
        style={styles.input}
        placeholder="링크 입력"
        value={link}
        onChangeText={setLink}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => console.log('제출 완료')}
        >
          <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0ffff',
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 15,
  },
  textarea: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginTop: 5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  checkboxLabel: {
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingVertical: 6,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#ffcccc',
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

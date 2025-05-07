import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 카메라 아이콘용

export default function InputEventInfo({ navigation }) {
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [posterCount, setPosterCount] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);

  const eventTypes = ['생일', '콜라보'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이벤트 등록하기</Text>

      <Text style={styles.label}>이벤트 항목</Text>
      <View style={styles.typeContainer}>
        {eventTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              eventType === type && styles.selectedTypeButton,
            ]}
            onPress={() => setEventType(type)}
          >
            <Text style={styles.typeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>이벤트 이름</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="이벤트 이름을 입력해 주세요"
      />

      <Text style={styles.label}>메인 포스터 (필수)</Text>
      <TouchableOpacity style={styles.imageBox}>
        <Ionicons name="camera-outline" size={32} color="#888" />
        <Text style={styles.countText}>{posterCount}/1</Text>
      </TouchableOpacity>

      <Text style={styles.label}>사진 추가 등록</Text>
      <TouchableOpacity style={styles.imageBox}>
        <Ionicons name="camera-outline" size={32} color="#888" />
        <Text style={styles.countText}>{photoCount}/5</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
                if (eventType === '생일') {
                navigation.navigate('InputBirthEventInfo');
                } else if (eventType === '콜라보') {
                navigation.navigate('InputCollabEventInfo');
                }
            }}
            >
            <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0ffff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedTypeButton: {
    backgroundColor: '#dcdcdc',
  },
  typeText: {
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
  },
  imageBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    width: 100,
  },
  countText: {
    marginTop: 5,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  nextButton: {
    backgroundColor: '#ffcccc',
    padding: 15,
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox'; // ✅ 여기!

export default function InputCollabEventInfo({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const toggleOption = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>이벤트 등록하기</Text>

      <Text style={styles.label}>전체 특징 (1개 이상 필수)</Text>
      <TouchableOpacity style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#333" />
        <Text style={styles.searchText}>선택</Text>
      </TouchableOpacity>

      <Text style={styles.label}>선착 특징</Text>
      <TouchableOpacity style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#333" />
        <Text style={styles.searchText}>선택</Text>
      </TouchableOpacity>

      <Text style={styles.label}>기타 특징</Text>
      <TouchableOpacity style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#333" />
        <Text style={styles.searchText}>선택</Text>
      </TouchableOpacity>

      <Text style={styles.label}>이벤트 추가 정보</Text>
      {[
        ' 사진 예약',
        ' 믹서기 드로우 이벤트',
        ' 기차',
        ' 포토부스',
        ' 스탬프 투어',
        ' 랜덤 뽑기',
        ' 사전 예약',
      ].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxRow}
          onPress={() => toggleOption(item)}
        >
          <Checkbox value={selectedOptions[item] || false} />
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('EventInfoSubmit')}
          >
          <Text style={styles.buttonText}>다음</Text>
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
    marginTop: 15,
    fontWeight: '600',
  },
  searchBox: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    width: 130,
  },
  searchText: {
    marginLeft: 10,
    color: '#333',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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

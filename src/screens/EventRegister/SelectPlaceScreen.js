import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function SelectPlaceScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState('');
  const [region, setRegion] = useState('');

  const types = ['카페', '음식점', '전시회', '포토부스'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>이벤트 등록하기</Text>

      {/* 장소 찾기 */}
      <Text style={styles.label}>장소에 관한 정보</Text>
      <TouchableOpacity style={styles.searchBox}>
        <Text style={styles.searchText}>장소 찾기</Text>
      </TouchableOpacity>

      {/* 장소 타입 선택 */}
      <Text style={styles.label}>장소의 타입을 선택해 주세요</Text>
      <View style={styles.typeContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={styles.typeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 지역 입력 */}
      <Text style={styles.label}>지역을 선택해 주세요</Text>
      <TextInput
        style={styles.input}
        placeholder="지역명을 입력해 주세요"
        value={region}
        onChangeText={setRegion}
      />

      {/* 이전 / 다음 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('InputEventInfo')}>
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
    marginBottom: 5,
    fontWeight: '600',
  },
  searchBox: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
  },
  searchText: {
    color: '#555',
    textAlign: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  typeButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
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
    marginTop: 5,
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
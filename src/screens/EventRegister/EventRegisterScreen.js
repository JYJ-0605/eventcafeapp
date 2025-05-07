import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const EventRegisterScreen = ({ navigation }) => {
  const handleFindStar = () => {
    // 스타 찾기 버튼 클릭 시 동작 (예: 스타 검색 화면으로 이동)
    console.log('스타 찾기 클릭');
    navigation.navigate('StarSearch');
  };

  return (
    <View style={styles.container}>

      {/* 본문 */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>이벤트 등록</Text>
          <Image
            source={require('../../../assets/Star.png')} // 아이콘 이미지 경로
            style={styles.starImage}
          />
          <TouchableOpacity style={styles.findButton} onPress={handleFindStar}>
            <Text style={styles.findButtonText}>스타 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0FAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  findButton: {
    backgroundColor: '#FFD7D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  findButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default EventRegisterScreen;

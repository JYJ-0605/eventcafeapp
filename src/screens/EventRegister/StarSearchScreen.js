{/* 스타 검색 */}
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ 추가
import SearchBar from '../../components/common/SearchBar';

// ✅ 멤버별 이미지 포함한 mock 데이터
const mockEvents = [
  {
    id: 1,
    name: '김유연',
    birthday: '2001년 02월 09일',
    cafeCount: 0,
    image: require('../../../assets/artist/tripleS_5.jpg'),
  },
  {
    id: 2,
    name: '김나경',
    birthday: '2002년 10월 13일',
    cafeCount: 0,
    image: require('../../../assets/artist/tripleS_7.jpg'),
  },
  {
    id: 3,
    name: '윤서연',
    birthday: '2003년 08월 06일',
    cafeCount: 0,
    image: require('../../../assets/artist/tripleS_1.jpg'),
  },
];

const StarSearchScreen = () => {
  const navigation = useNavigation(); // ✅ 추가
  const [search, setSearch] = useState('');

  const handleSelectStar = (star) => {
    navigation.navigate('SelectedStar', { selectedStar: star }); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectStar(item)}>
      <Image style={styles.profileImage} source={item.image} />
      <View style={styles.infoBox}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.birthday}>{item.birthday}</Text>
      </View>
      <View style={styles.cafeBox}>
        <Text style={styles.cafeCountText}>{item.cafeCount}개</Text>
        <Ionicons name="cafe-outline" size={16} />
      </View>
    </TouchableOpacity>
  );

  // ✅ 검색어로 필터링
  const filteredEvents = mockEvents.filter((item) =>
    item.name.includes(search) || item.birthday.includes(search)
  );

  return (
    <View style={styles.container}>
      {/* SearchBar */}
      <SearchBar value={search} onChangeText={setSearch} />

      {/* 섹션 타이틀 */}
      <Text style={styles.sectionTitle}>현재 인기 이벤트</Text>

      {/* 리스트 */}
      <FlatList
        data={filteredEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default StarSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  infoBox: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  birthday: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
  cafeBox: {
    alignItems: 'flex-end',
  },
  cafeCountText: {
    fontSize: 12,
    marginBottom: 4,
    color: '#444',
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const artistData = [
  { name: '윤서연', image: require('../../../assets/artist/tripleS_1.jpg') },
  { name: '김유연', image: require('../../../assets/artist/tripleS_5.jpg') },
  { name: '김나경', image: require('../../../assets/artist/tripleS_7.jpg') },
  { name: '코토네', image: require('../../../assets/artist/tripleS_11.jpg') },
  { name: '니엔', image: require('../../../assets/artist/tripleS_13.jpg') },
  { name: '정하연', image: require('../../../assets/artist/tripleS_19.jpg') },
];

const dummyPosts = [
  { id: '1', artist: '윤서연', title: '윤서연 생일 카페 공동 주최자 모집합니다!', date: '2025년 4월 19일' },
  { id: '2', artist: '김나경', title: '트리플에스 김나경 생일 카페 공동 주최자 모집', date: '2025년 4월 19일' },
  { id: '3', artist: '정하연', title: '트리플에스 정하연 생카 주최자 모집', date: '2025년 4월 18일' },
];

const BoardScreen = ({ navigation }) => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  // 오늘 날짜를 자동으로 업데이트
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작
    const day = date.getDate();
    setCurrentDate(`${year}년 ${month}월 ${day}일`);
  }, []);

  const filteredPosts = selectedArtist
    ? dummyPosts.filter((post) => post.artist === selectedArtist)
    : dummyPosts;

  // 날짜별로 그룹화
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    if (!acc[post.date]) acc[post.date] = [];
    acc[post.date].push(post);
    return acc;
  }, {});

  const toggleArtist = (name) => {
    setSelectedArtist((prev) => (prev === name ? null : name));
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      {/* 아티스트 선택 영역 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.artistRow}
      >
        {/* 전체 버튼 */}
        <View style={styles.artistItem}>
          <TouchableOpacity onPress={() => setSelectedArtist(null)}>
            <View style={styles.imageWrapper}>
              <View style={[styles.artistImage, styles.allCircle]}>
                <Text style={{ fontWeight: 'bold' }}>ALL</Text>
              </View>
              {!selectedArtist && (
                <View style={styles.checkOverlay}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.artistName}>전체</Text>
        </View>

        {/* 아티스트 리스트 */}
        {artistData.map((artist, index) => {
          const isSelected = selectedArtist === artist.name;
          return (
            <View key={index} style={styles.artistItem}>
              <TouchableOpacity onPress={() => toggleArtist(artist.name)}>
                <View style={styles.imageWrapper}>
                  <Image source={artist.image} style={styles.artistImage} />
                  {isSelected && (
                    <View style={styles.checkOverlay}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.artistName}>{artist.name}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* 게시글 영역 */}
      <ScrollView>
        {Object.keys(groupedPosts).length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>게시글이 없습니다.</Text>
        ) : (
          Object.keys(groupedPosts).map((date) => (
            <View key={date} style={{ marginBottom: 15 }}>
              <Text style={styles.dateHeader}>{date}</Text>
              {groupedPosts[date].map((item) => (
                <TouchableOpacity key={item.id} style={styles.post}>
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => navigation.navigate('Write')}
      >
        <Text style={styles.writeButtonText}>글쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 15 },
  header: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  artistItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  imageWrapper: {
    position: 'relative',
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  allCircle: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  checkOverlay: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: '#FF6F91',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  artistName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  dateHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
    marginTop: 10,
  },
  post: {
    height: 50,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  writeButton: {
    backgroundColor: '#FF6F91',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  writeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BoardScreen;

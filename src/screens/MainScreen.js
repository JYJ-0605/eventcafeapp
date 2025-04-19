import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import IconButton from '../components/common/IconButton';
import Card from '../components/common/Card';
import { FontAwesome } from '@expo/vector-icons';

const MainScreen = ({ onLoginPress, navigation }) => {
  const images = [
    require('../../assets/banner/banner_sample1.jpg'),
    require('../../assets/banner/banner_sample2.jpg'),
    require('../../assets/banner/banner_sample3.jpg'),
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 영역 */}
      <Header
      onLoginPress={onLoginPress} /* 아래처럼 navigate 해버리면 AuthModalManager 설정을 무시해버림 */
      onIconPress={() => navigation.navigate('SubscribeArtist')}
      />
      <SearchBar />

      {/* 배너 이미지 영역 */}
      <View style={styles.bannerContainer}>
      </View>

      {/* 첫 번째 아이콘 줄 */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("PopularCafe")}>
          <FontAwesome name="fire" size={24} color="pink" />
          <Text style={styles.iconText}>인기 카페 이벤트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Calendar")}>
          <FontAwesome name="calendar-check-o" size={24} color="pink" />
          <Text style={styles.iconText}>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Board")}>
          <FontAwesome name="comments" size={24} color="pink" />
          <Text style={styles.iconText}>게시판</Text>
        </TouchableOpacity>
      </View>

      {/* 두 번째 아이콘 줄 */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("PlaceSelect")}>
          <FontAwesome name="map-marker" size={24} color="pink" />
          <Text style={styles.iconText}>장소 등록</Text>
        </TouchableOpacity>
        <IconButton icon="coffee" text="대관 신청" />
        <IconButton icon="birthday-cake" text="이벤트 등록" />
      </View>

      {/* 카드 영역 */}
      <Card title="인기 카페 이벤트" />
      <Card title="대관 가능한 장소" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  bannerContainer: {
    width: '100%',
    height: 315,
    backgroundColor: '#ffffff',
    marginVertical: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  iconButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  iconText: {
    marginTop: 5,
    fontSize: 13.5,
    textAlign: 'center',
  },
});

export default MainScreen;

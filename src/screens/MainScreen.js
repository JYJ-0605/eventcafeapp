import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import IconButton from '../components/common/IconButton';
import Card from '../components/common/Card';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘 라이브러리 꼭 있어야 함

const MainScreen = ({ onLoginPress, navigation }) => {


  const images = [
    require('../../assets/banner/banner_sample1.jpg'),
    require('../../assets/banner/banner_sample2.jpg'),
    require('../../assets/banner/banner_sample3.jpg'),
  ];

  return (
   
    <ScrollView style={styles.container}>
      {/* Header에 onLoginPress 전달 */}
      <Header onLoginPress={onLoginPress} />
      <SearchBar />
      <View style={styles.bannerContainer}>

      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => {navigation.navigate("PopularCafe");}}>
            <View style={styles.iconRow}>
              <FontAwesome name="fire" size={24} color="pink" />
            </View>
            <Text>인기 카페 이벤트</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Calendar");}}>
            <View style={styles.iconRow}>
              <FontAwesome name="calendar-check-o" size={24} color="pink" />
            </View>
            <Text>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Board");}}>
            <View style={styles.iconRow}>
              <FontAwesome name="comments" size={24} color="pink" />
            </View>
            <Text>게시판</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}> 
      <TouchableOpacity onPress={() => {navigation.navigate("PlaceSelect");}}>
            <View style={styles.iconRow}>
              <FontAwesome name="map-marker" size={24} color="pink" />
            </View>
            <Text>장소 등록</Text>
        </TouchableOpacity> coffee
        <IconButton icon="coffee" text="장소 대관" />
        <IconButton icon="birthday-cake" text="이벤트 등록" />
      </View>
      <Card title="인기 카페 이벤트" />
      <Card title="대관 가능한 장소" />
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#e0f7fa'
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
});

export default MainScreen;
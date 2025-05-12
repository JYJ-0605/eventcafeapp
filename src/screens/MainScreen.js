import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Card from '../components/Card/Card';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import SlideMenu from '../components/common/SlideMenu';
import { UserContext } from '../context/UserContext';
import { navigate } from '../navigation/NavigatorRef';

const { width } = Dimensions.get('window');

const dummyPlaces = [
  {
    id: 1,
    name: '로얄 마카롱 신사역점',
    region: '강남',
    address: '서울특별시 강남구 도산대로1길 6 지하 1층',
    type: '디저트 카페',
    mainImage: require('../../assets/cafe/sample-cafe1.png'),
    sampleImages: [require('../../assets/cafe/sample-cafe2.png')],
    fee: '대관료 : 0',
    deposit: '예약금 : 50000',
    info: '마카롱 전문점이며, 사진 촬영이 잘 되도록 조명이 좋아요.',
    hours: '운영 시간 : 11:00 ~ 19:00',
    sns: '@royalmacaron',
  },
  {
    id: 2,
    name: '상호명',
    region: '성수',
    address: '서울 성동구 성수일로12길',
    type: '스튜디오',
    mainImage: require('../../assets/cafe/sample-cafe2.png'),
    sampleImages: [require('../../assets/cafe/sample-cafe1.png')],
    fee: '대관료 : 30000',
    deposit: '예약금 : 10000',
    info: '사진 촬영 전용 스튜디오로 조용한 분위기입니다.',
    hours: '10:00 ~ 18:00',
    sns: '@studio_seongsu',
  },
];

const MainScreen = ({ onLoginPress, navigation }) => {
  const { user, setUser } = useContext(UserContext); // 로그인 정보 Context에서 받아오기
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const images = [
    require('../../assets/banner/banner_sample1.jpg'),
    require('../../assets/banner/banner_sample2.jpg'),
    require('../../assets/banner/banner_sample3.jpg'),
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // or remove specific keys
      setUser(null); // Context도 초기화
      navigate('Login'); // 로그인 화면으로 이동
    } catch (err) {
      console.error('❌ 로그아웃 실패:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView />
      {/* 헤더 */}
      <Header
        onLoginPress={onLoginPress}
        onLogoutPress={() => {
          setUser(null);
          AsyncStorage.removeItem('accessToken'); // 필요시 토큰 삭제
        }}
        onIconPress={() => navigation.navigate('SubscribeArtist')}
        onBookPress={() => navigation.navigate('DictionaryList')}
        isLoggedIn={!!user}
        user={user}
        onToggleMenu={toggleMenu}
      />
      <SlideMenu
        visible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLogoutPress={() => {
          setUser(null);
          AsyncStorage.removeItem('accessToken'); // 필요시 토큰 삭제
        }}
        onProfilePress={() => {
          navigate('Profile');
          setIsMenuOpen(false);
        }}
      />
      <SearchBar />

      {/* 배너 */}
      <View style={styles.bannerContainer}>
        <Swiper
          autoplay
          loop
          showsPagination
          autoplayTimeout={3}
          dotColor="#ccc"
          activeDotColor="#333"
          wrapperStyle={styles.swiperWrapper}
        >
          {images.map((img, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={img}
                style={styles.posterImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </Swiper>
      </View>

      {/* 아이콘 줄 1 */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('PopularCafe')}
        >
          <FontAwesome name="fire" size={24} color="pink" />
          <Text style={styles.iconText}>인기 카페 이벤트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Calendar')}
        >
          <FontAwesome name="calendar-check-o" size={24} color="pink" />
          <Text style={styles.iconText}>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Board')}
        >
          <FontAwesome name="comments" size={24} color="pink" />
          <Text style={styles.iconText}>게시판</Text>
        </TouchableOpacity>
      </View>

      {/* 아이콘 줄 2 */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('EventRegister')}
        >
          <FontAwesome name="birthday-cake" size={24} color="pink" />
          <Text style={styles.iconText}>이벤트 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('CafeRegister')}
        >
          <FontAwesome name="map-marker" size={24} color="pink" />
          <Text style={styles.iconText}>장소 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('ReservablePlacesList')}
        >
          <FontAwesome name="coffee" size={24} color="pink" />
          <Text style={styles.iconText}>대관 신청</Text>
        </TouchableOpacity>
      </View>

      {/* 카드 영역 */}
      <View style={styles.scrollContent}>
        {/* 인기 카페 이벤트 */}
        <Card title="인기 카페 이벤트">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((img, index) => (
              <View
                key={`banner-container-${index}`}
                style={styles.popularCafeCard}
              >
                <TouchableOpacity
                  key={`banner-${index}`}
                  onPress={() => console.log(`배너 ${index + 1} 클릭됨`)}
                >
                  <View style={styles.popularCafeImageContainer}>
                    <Image
                      source={img}
                      style={styles.popularCafeImage}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </Card>

        {/* 대관 가능한 장소 */}
        <Card title="대관 가능한 장소">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyPlaces.map((place) => (
              <TouchableOpacity
                key={`available-${place.id}`}
                style={styles.reservablePlaceCard}
                onPress={() =>
                  navigation.navigate('PlaceDetail', {
                    ...place,
                    images: [place.mainImage, ...(place.sampleImages || [])],
                  })
                }
              >
                <Image
                  source={place.mainImage}
                  style={styles.reservablePlaceImage}
                />
                <Text style={styles.reservablePlaceName}>{place.name}</Text>
                <Text style={styles.reservablePlaceRegion}>{place.region}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>
      </View>
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
    height: 380,
    backgroundColor: '#e0f7fa',
  },
  swiperWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: '60%',
    height: '100%',
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  popularCafeCard: {
    // 인기 카페 이벤트 카드 스타일
    width: 200,
    height: 250,
    borderRadius: 10,
    marginRight: 8,
  },
  popularCafeImageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  popularCafeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 추가됨: 이미지 비율 유지
    borderRadius: 10,
  },
  reservablePlaceCard: {
    // 대관 가능한 장소 카드 스타일
    width: 250,
    borderRadius: 10,
    marginRight: 8,
  },
  reservablePlaceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  reservablePlaceName: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
  reservablePlaceRegion: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
  },
  infoBox: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default MainScreen;

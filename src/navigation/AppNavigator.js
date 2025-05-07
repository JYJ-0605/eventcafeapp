  // AppNavigator.js
  import React from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import MainScreen from '../screens/MainScreen';
  import LoginScreen from '../screens/LoginScreen'; // 로그인 화면
  import SignUpScreen from '../screens/SignUpScreen'; // 회원가입 화면
  import CafeRegisterScreen from '../screens/CafeRegister/CafeRegisterScreen'; // 장소 등록 화면
  import PopularCafeScreen from '../screens/PopularCafeScreen';
  import CalendarScreen from '../screens/Calendar/CalendarScreen';
  import BoardScreen from '../screens/Board/BoardScreen';
  import PostScreen from '../screens/Board/PostScreen';
  import SubscribeArtistScreen from '../screens/Subscribe/SubscribeArtistScreen';
  import ArtistDetailScreen from '../screens/Subscribe/ArtistDetailScreen';
  import PlaceReservationScreen from '../screens/Reservation/PlaceReservationScreen';
  import ReservablePlacesListScreen from '../screens/Reservation/ReservablePlacesListScreen';
  import PlaceDetailScreen from '../screens/Reservation/PlaceDetailScreen';
  import EventRegisterScreen from '../screens/EventRegister/EventRegisterScreen';
  import StarSearchScreen from '../screens/EventRegister/StarSearchScreen';
  import SelectedStarScreen from '../screens/EventRegister/SelectedStarScreen';
  import SelectedDateScreen from '../screens/EventRegister/SelectedDateScreen';
  import SelectPlaceScreen from '../screens/EventRegister/SelectPlaceScreen';
  import InputEventInfo from '../screens/EventRegister/InputEventInfo';
  import InputBirthEventInfo from '../screens/EventRegister/InputBirthEventInfo';
  import InputCollabEventInfo from '../screens/EventRegister/InputCollabEventInfo';
  import EventInfoSubmitScreen from '../screens/EventRegister/EventInfoSubmitScreen';


  const Stack = createStackNavigator();

  const AppNavigator = ({ onLoginPress }) => {
    return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {(props) => <MainScreen {...props} onLoginPress={onLoginPress} />}
        </Stack.Screen>

        {/* 로그인, 회원가입 */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '회원가입' }} />
        
        {/* 아티스트 구독 */}
        <Stack.Screen name="SubscribeArtist" component={SubscribeArtistScreen} options={{ title: '아티스트 구독', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} options={{ title: '아티스트 상세 페이지', headerBackTitleVisible: false, headerBackTitle: "" }}/>
        
        {/* 인기 카페 이벤트 */}
        <Stack.Screen name="PopularCafe" component={PopularCafeScreen} options={{ title: '인기 카페 이벤트', headerBackTitleVisible: false, headerBackTitle: "" }} />
        
        {/* 캘린더 */}
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: '캘린더', headerBackTitleVisible: false, headerBackTitle: "" }} />
        
        {/* 게시판 */}
        <Stack.Screen name="Board" component={BoardScreen} options={{ title: '게시판', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="Write" component={PostScreen} options={{ title : '글쓰기', headerBackTitleVisible: false, headerBackTitle: ""}} />
        
        {/* 장소 등록 */}
        <Stack.Screen name="CafeRegister" component={CafeRegisterScreen} options={{ title: '장소 등록', headerBackTitleVisible: false, headerBackTitle: "" }} />
        
        {/* 대관 신청 */}
        <Stack.Screen name="PlaceReservation" component={PlaceReservationScreen} options={{ title: '대관 신청', headerBackTitleVisible: false, headerBackTitle: ""}} />
        <Stack.Screen name="ReservablePlacesList" component={ReservablePlacesListScreen} options={{ title: '대관 가능한 장소 리스트', headerBackTitleVisible: false, headerBackTitle: ""}} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{ title: '가게 상세 이미지', headerBackTitleVisible: false, headerBackTitle: ""}} />
        
        {/* 이벤트 등록 */}
        <Stack.Screen name="EventRegister" component={EventRegisterScreen} options={{ title: '이벤트 등록', headerBackTitleVisible: false, headerBackTitle: ""}} />
        <Stack.Screen name="StarSearch" component={StarSearchScreen} options={{ title: '스타 검색', headerBackTitleVisible: false, headerBackTitle: ""}} />
        <Stack.Screen name="SelectedStar" component={SelectedStarScreen} options={{ title: '스타 확인', headerBackTitleVisible: false, headerBackTitle: ""}} />
        <Stack.Screen name="SelectedDate" component={SelectedDateScreen} options={{ title: '날짜 선택', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="SelectPlace" component={SelectPlaceScreen} options={{ title: '장소 선택', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="InputEventInfo" component={InputEventInfo} options={{ title: '이벤트 정보 입력', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="InputBirthEventInfo" component={InputBirthEventInfo} options={{ title: '생일카페 이벤트 세부 정보 입력', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="InputCollabEventInfo" component={InputCollabEventInfo} options={{ title: '콜라보카페 이벤트 세부 정보 입력', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="EventInfoSubmit" component={EventInfoSubmitScreen} options={{ title: '이벤트 등록 완료', headerBackTitleVisible: false, headerBackTitle: "" }} />
      </Stack.Navigator>
    );
  };


  export default AppNavigator;
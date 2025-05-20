// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import BoardScreen from '../screens/Board/BoardScreen';
import PostScreen from '../screens/Board/PostScreen';
import CafeRegisterScreen from '../screens/CafeRegister/CafeRegisterScreen'; // 장소 등록 화면
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import DictionaryList from '../screens/Dictionary/DictionaryList'; // 덕질 사전 화면
import DictionaryForm from '../screens/Dictionary/DictionaryForm'; // 덕질 사전 등록 화면
import DictionaryDetail from '../screens/Dictionary/DictionaryDetail'; // 덕질 사전 상세 화면
import EventInfoSubmitScreen from '../screens/EventRegister/EventInfoSubmitScreen';
import EventRegisterScreen from '../screens/EventRegister/EventRegisterScreen';
import InputBirthEventInfo from '../screens/EventRegister/InputBirthEventInfo';
import InputCollabEventInfo from '../screens/EventRegister/InputCollabEventInfo';
import InputEventInfo from '../screens/EventRegister/InputEventInfo';
import SelectedDateScreen from '../screens/EventRegister/SelectedDateScreen';
import SelectedStarScreen from '../screens/EventRegister/SelectedStarScreen';
import SelectPlaceScreen from '../screens/EventRegister/SelectPlaceScreen';
import StarSearchScreen from '../screens/EventRegister/StarSearchScreen';
import LoginScreen from '../screens/LoginScreen'; // 로그인 화면
import MainScreen from '../screens/MainScreen';
import PopularCafeScreen from '../screens/PopularCafeScreen';
import PlaceDetailScreen from '../screens/Reservation/PlaceDetailScreen';
import PlaceReservationScreen from '../screens/Reservation/PlaceReservationScreen';
import ReservablePlacesListScreen from '../screens/Reservation/ReservablePlacesListScreen';
import SignUpScreen from '../screens/SignUpScreen'; // 회원가입 화면
import ArtistDetailScreen from '../screens/Subscribe/ArtistDetailScreen';
import SubscribeArtistScreen from '../screens/Subscribe/SubscribeArtistScreen';
import ProfilePage from '../screens/Profile/ProfilePage';
import KakaoRedirectScreen from '../screens/KakaoRedirectScreen';
import EditProfile from '../screens/Profile/EditProfile';
import AddressSearch from '../components/common/AddressSearch';
  const Stack = createNativeStackNavigator();

  const AppNavigator = ({ onLoginPress }) => {
    return (
      <Stack.Navigator initialRouteName="Main" 
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center', // 텍스트 가운데 정렬
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {(props) => <MainScreen {...props} onLoginPress={onLoginPress} />}
        </Stack.Screen>

        {/* 로그인, 회원가입 */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="KakaoRedirect" component={KakaoRedirectScreen} options={{ headerShown: false }}/>
        
        {/* 아티스트 구독 */}
        <Stack.Screen name="SubscribeArtist" component={SubscribeArtistScreen} options={{ title: '아티스트 구독', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} options={{ title: '아티스트 상세 페이지', headerBackTitleVisible: false, headerBackTitle: "" }}/>
        
        {/* 덕질 사전 */}
        <Stack.Screen name="DictionaryList" component={DictionaryList} options={{ title: '덕질 사전', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="DictionaryForm" component={DictionaryForm} options={{ title: '덕질 사전 등록', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="DictionaryDetail" component={DictionaryDetail} options={{ title: '덕질 사전 상세', headerBackTitleVisible: false, headerBackTitle: "" }} />

        {/* 인기 카페 이벤트 */}
        <Stack.Screen name="PopularCafe" component={PopularCafeScreen} options={{ title: '인기 카페 이벤트', headerBackTitleVisible: false, headerBackTitle: ""}} />
        
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
        <Stack.Screen name="Profile" component={ProfilePage} options={{ title: '프로필 페이지', headerBackTitleVisible: false, headerBackTitle: "" }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: '프로필 수정', headerBackTitleVisible: false, headerBackTitle: "" }} />
        
        <Stack.Screen name="AddressSearch" component={AddressSearch} options={{ title: '주소 검색', headerBackTitleVisible: false, headerBackTitle: "" }} />
      </Stack.Navigator>
    );
  };


  export default AppNavigator;
// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen'; // 로그인 화면
import SignUpScreen from '../screens/SignUpScreen'; // 회원가입 화면
import PlaceSelectScreen from '../screens/PlaceSelectScreen'; // 장소 등록 화면
import PopularCafeScreen from '../screens/PopularCafeScreen'; // 경로 맞게!
import CalendarScreen from '../screens/CalendarScreen';
import BoardScreen from '../screens/Board/BoardScreen';


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

      <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '회원가입' }} />
      <Stack.Screen name="PlaceSelect" component={PlaceSelectScreen} options={{ title: '장소 등록' }} />
      <Stack.Screen name="PopularCafe" component={PopularCafeScreen} options={{ title: '인기 카페 이벤트' }} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: '캘린더' }} />
      <Stack.Screen name="Board" component={BoardScreen} options={{ title: '게시판' }} />
    </Stack.Navigator>
  );
};


export default AppNavigator;
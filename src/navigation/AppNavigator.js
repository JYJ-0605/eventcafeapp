// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './main/MainScreen'; // 메인 화면
import LoginScreen from './main/LoginScreen'; // 로그인 화면
import SignUpScreen from './main/SignUpScreen'; // 회원가입 화면
import PlaceSelectionScreen from './main/PlaceSelectionScreen'; // 장소 등록 화면

const Stack = createStackNavigator();

const AppNavigator = ({ onLoginPress }) => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main">
        {() => <MainScreen onLoginPress={onLoginPress} />}
      </Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '회원가입' }} />
      <Stack.Screen name="PlaceSelect" component={PlaceSelectionScreen} options={{ title: '장소 등록' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

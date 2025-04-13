import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Modal, View, Button } from 'react-native';
import AppNavigator from './src/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import LoginForm from './src/components/forms/LoginForm';
import SignUpForm from './src/components/forms/SignUpForm';

const Stack = createStackNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* MainScreen 내에서 로그인 모달 열기 */}
          <Stack.Screen name="MainScreen">
            {({ navigation }) => (
              <AppNavigator onLoginPress={openModal} navigation={navigation} />
            )}
          </Stack.Screen>

          {/* 로그인 폼 화면 */}
          <Stack.Screen name="LoginForm">
            {({ navigation }) => (
              <LoginForm closeModal={closeModal} navigation={navigation} />
            )}
          </Stack.Screen>

          {/* 회원가입 화면을 SignUpForm으로 수정 */}
          <Stack.Screen name="SignUpForm" component={SignUpForm} />
        </Stack.Navigator>

        {/* 로그인 모달을 별도의 스크린처럼 다룰 수 있도록 수정 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LoginForm closeModal={closeModal} navigation={null} />
              <Button title="닫기" onPress={closeModal} color="red" />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF9F8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

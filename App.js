import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View, Button } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator'; // ✅ 새로 연결
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthModalManager from './src/components/Modal/AuthModalManager';






const Stack = createStackNavigator();
export default function App() {
  const [modalVisible, setModalVisible] = useState(false); //로그인
  const [showSignUpModal, setShowSignUpModal] = useState(false); //회원가입


  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <NavigationContainer>
       <SafeAreaView style={styles.container}>
      
        <StatusBar style="auto" />
        <AppNavigator onLoginPress={() => setModalVisible(true)} />

        {/* 모달 상태들은 별도 컴포넌트로 넘김 */}
        <AuthModalManager
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />

      
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    maxHeight: '80%',
    maxWidth: 700,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

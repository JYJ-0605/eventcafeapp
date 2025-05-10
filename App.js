import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthModalManager from './src/components/Modal/AuthModalManager';
import { UserProvider } from './src/context/UserContext'; // 경로 맞게 수정
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigatorRef'; // 요거 추가!

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView
            style={styles.container}
            edges={['left', 'right', 'bottom']}
          >
            <AppNavigator onLoginPress={() => setModalVisible(true)} />
            <AuthModalManager
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              showSignUpModal={showSignUpModal}
              setShowSignUpModal={setShowSignUpModal}
            />
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF9F8',
  },
});

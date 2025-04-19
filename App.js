import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthModalManager from './src/components/Modal/AuthModalManager';

const Stack = createStackNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF9F8',
  },
});
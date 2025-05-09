import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  try {
    navigationRef.current?.navigate(name, params);
  } catch (e) {
    console.warn('🚨 navigation error:', e);
  }
}

// App.js 등에서 NavigationContainer 아래에 이거 추가

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  try {
    navigationRef.current?.navigate(name, params);
  } catch (e) {
    console.warn('🚨 navigation error:', e);
  }
}

// 전역 navigator
// components/common/SlideMenu.js

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const SlideMenu = ({ visible, onClose, onLogoutPress, onProfilePress }) => {
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 200,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null; // 렌더링 자체 안함

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.animatedMenu,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <TouchableOpacity onPress={onLogoutPress}>
            <Text style={styles.menuItem}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onProfilePress}>
            <Text style={styles.menuItem}>내 정보</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 0,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 어두운 배경
    zIndex: 998,
    justifyContent: 'flex-start', // 메뉴 위치 조정
    alignItems: 'flex-end',
  },

  animatedMenu: {
    width: 160,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginTop: 60,
    marginRight: 10,
    elevation: 6,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  menuItem: {
    fontSize: 15,
    paddingVertical: 10,
    color: '#333',
  },
});

export default SlideMenu;

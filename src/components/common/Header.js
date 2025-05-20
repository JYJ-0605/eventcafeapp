// 로고, 로그인 헤더
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import logo from '../../../assets/logo.png';

const Header = ({
  onLoginPress,
  onIconPress,
  onBookPress,
  isLoggedIn,
  onLogoutPress,
  user,
  onToggleMenu, // ✅ 부모에게 전달
}) => {
  const toggleMenu = () => {
    const toValue = isMenuOpen ? 200 : 0; // 200px 오른쪽 → 0으로 슬라이드

    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <View style={styles.loginContainer}>
        <TouchableOpacity onPress={onBookPress}>
          <FontAwesome
            name="book"
            size={20}
            color="#007bff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIconPress}>
          <FontAwesome
            name="user-plus"
            size={20}
            color="#007bff"
            style={styles.icon}
          />
        </TouchableOpacity>

        {isLoggedIn ? (
          <>
            <TouchableOpacity onPress={onToggleMenu}>
              {user?.profile_image ? (
                <Image
                  source={{ uri: user.profile_image }}
                  style={styles.profile_image}
                />
              ) : (
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>
                    {user?.nickname?.charAt(0).toUpperCase() || '유'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={onLoginPress}>
              <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 40,
    resizeMode: 'contain',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  icon: {
    marginRight: 15,
  },
  loginText: {
    fontSize: 17,
    color: '#007bff',
  },
  profile_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Header;

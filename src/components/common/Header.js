// 로고, 로그인 헤더
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import logo from '../../../assets/logo.png';

const Header = ({ onLoginPress, onIconPress, onBookPress }) => (
  <View style={styles.container}>
    <Image source={logo} style={styles.logo} />

    <View style={styles.loginContainer}>
      <TouchableOpacity onPress={onBookPress}>
        <FontAwesome name="book" size={20} color="#007bff" style={styles.icon} /> 
      </TouchableOpacity>
      <TouchableOpacity onPress={onIconPress}>
        <FontAwesome name="user-plus" size={20} color="#007bff" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLoginPress}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 5,
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
});

export default Header;

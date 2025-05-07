import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="어떤 스타의 생일카페를 찾으시나요?"
      placeholderTextColor="#999"
      value={value} // ✅ 받아온 값
      onChangeText={onChangeText} // ✅ 받아온 함수
    />
    <Ionicons name="search" size={24} color="#999" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#00BFFF',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
});

export default SearchBar;

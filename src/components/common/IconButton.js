import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const IconButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <FontAwesome name={icon} size={24} color="#fcb2ae" />
    {!!text && <Text style={styles.text}>{text}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default IconButton;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title }) => (
  <View style={styles.card}>
    <Text>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { height: 100, backgroundColor: '#f0f0f0', margin: 10, borderRadius: 8 },
});

export default Card;

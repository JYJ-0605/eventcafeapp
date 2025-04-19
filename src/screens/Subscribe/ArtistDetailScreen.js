import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const ArtistDetailScreen = ({ route }) => {
  const { name, image, background } = route.params;

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.overlay}>
        <Image source={image} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>구독하기</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ArtistDetailScreen;

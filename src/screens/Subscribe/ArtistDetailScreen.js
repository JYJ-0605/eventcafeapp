import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const ArtistDetailScreen = ({ route }) => {
  const { name, image, background, artistInfo = {} } = route.params; // 기본값 설정

  const infoRows = [
    { label: '이름', value: artistInfo?.name || '정보 없음' },
    { label: '소속사 / 소속팀', value: artistInfo?.agency || '정보 없음' },
    { label: '생일', value: artistInfo?.birth || '정보 없음' },
    { label: '데뷔일', value: artistInfo?.debut || '정보 없음' },
    { label: '기타 일정', value: artistInfo?.extra || '정보 없음' },
  ];

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.table}>
            {infoRows.map((row, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.cellLabel}>
                  <Text style={styles.labelText}>{row.label}</Text>
                </View>
                <View style={styles.cellValue}>
                  <Text style={styles.valueText}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.overlay}>
          <Image source={image} style={styles.profileImage} />
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>구독하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'space-between' },
  scrollContent: {
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#aaa',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cellLabel: {
    width: 100,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  cellValue: {
    flex: 1,
    padding: 10,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  valueText: {
    fontSize: 14,
  },
  overlay: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
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
    marginBottom: 10,
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

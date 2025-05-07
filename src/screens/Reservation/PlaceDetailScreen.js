import React from 'react';
import { View, Text, Image, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const PlaceDetailScreen = ({ route }) => {
  const {
    name,
    region,
    address,
    type,
    mainImage,
    fee,
    deposit,
    info,
    hours,
    sampleImage,
    sns,
  } = route.params;

  const handleReservePress = () => {
    Alert.alert('대관 신청', '대관 신청 버튼이 눌렸습니다!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReservePress}>
          <Text style={styles.reserveButtonText}>대관 신청</Text>
        </TouchableOpacity>
      </View>

      <Image source={mainImage} style={styles.image} />

      <Text style={styles.label}>주소</Text>
      <Text>{address}</Text>

      <Text style={styles.label}>장소 타입</Text>
      <Text>{type}</Text>

      <Text style={styles.label}>대관료</Text>
      <Text>{fee} 원</Text>

      <Text style={styles.label}>예약금</Text>
      <Text>{deposit} 원</Text>

      <Text style={styles.label}>운영 시간</Text>
      <Text>{hours}</Text>

      <Text style={styles.label}>운영 정보</Text>
      <Text>{info}</Text>

      {sampleImage && (
        <>
          <Text style={styles.label}>특전/예시 이미지</Text>
          <Image source={sampleImage} style={styles.image} />
        </>
      )}

      <Text style={styles.label}>SNS 아이디</Text>
      <Text>{sns}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 10,
  },
  reserveButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default PlaceDetailScreen;

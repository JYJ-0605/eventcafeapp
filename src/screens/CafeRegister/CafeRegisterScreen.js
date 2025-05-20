// 장소 등록
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axiosInstance from '../../API/axiosInstance';

const categories = ['카페', '음식점', '전시회', '포토부스', '파티룸'];

const CafeRegisterScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [venueName, setVenueName] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [venueType, setVenueType] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [rentalFee, setRentalFee] = useState('');
  const [deposit, setDeposit] = useState('');
  const [operatingInfo, setOperatingInfo] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [benefitsImage, setBenefitsImage] = useState(null);
  const [description, setDescription] = useState('');
  const [snsAccount, setSnsAccount] = useState('');
  const [snsType, setSnsType] = useState('');

  const handleSubmit = async () => {
    if (!venueName || !venueType || !roadAddress || !mainImage) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', venueName);
    formData.append('venue_type', venueType);
    formData.append('road_address', roadAddress);
    formData.append('detail_address', detailAddress);
    formData.append('rental_fee', rentalFee);
    formData.append('deposit', deposit);
    formData.append('operating_info', operatingInfo);
    formData.append('operating_hours', operatingHours);
    formData.append('description', description);
    formData.append('sns_type', snsType);
    formData.append('sns_account', snsAccount);

    // 메인 이미지
    formData.append('main_image', {
      uri: mainImage.uri,
      name: mainImage.fileName || 'main.jpg',
      type: 'image/jpeg',
    });

    // 특전 이미지
    if (benefitsImage) {
      formData.append('benefits_image', {
        uri: benefitsImage.uri,
        name: benefitsImage.fileName || 'benefit.jpg',
        type: benefitsImage.type || 'image/jpeg',
      });
    }

    try {
      const token = await AsyncStorage.getItem('accessToken'); // 필요 시
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      await axiosInstance.post('/user/venues/create/', formData, {
        headers: {
          // 'Content-Type' 은 주지마! → Axios가 자동 설정하게 놔둬야 함
          Authorization: `Bearer ${token}`,
        },
      });
      alert('장소 등록 완료!');
      navigation.goBack();
    } catch (error) {
      console.error('장소 등록 실패:', error.response?.data || error);
      alert('등록 실패 ');
    }
  };

  const pickImage = async (setter) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('사진 접근 권한이 필요합니다!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets[0]; // ✅ image object
      setter({
        uri: selected.uri,
        fileName: selected.fileName || selected.uri.split('/').pop(),
        type: selected.mimeType || 'image/jpeg',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>장소 등록</Text>

      <TextInput
        style={styles.input}
        placeholder="장소명 *"
        value={venueName}
        onChangeText={(text) => setVenueName(text)}
      />
      <View style={styles.addressRow}>
        <TextInput
          style={styles.addressInput}
          placeholder="주소 *"
          value={roadAddress}
          onChangeText={(text) => setRoadAddress(text)}
        />
        <TouchableOpacity style={styles.findAddressButton}>
          <Text style={styles.findAddressText}>주소 찾기</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="상세 주소 *"
        value={detailAddress}
        onChangeText={(text) => setDetailAddress(text)}
      />

      <Text style={styles.sectionTitle}>
        장소의 타입을 선택해 주세요 (필수)
      </Text>
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.categorySelected,
            ]}
            value={venueType}
            onPress={() => {
              setSelectedCategory(cat); // UI 스타일용
              setVenueType(cat); // 실제 제출용
            }}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>가게 메인 이미지 (필수)</Text>
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => pickImage(setMainImage)}
      >
        <Text>메인 이미지 선택</Text>
      </TouchableOpacity>
      {mainImage && (
        <Image
          source={{ uri: mainImage.uri }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="대관료 (₩) *"
        keyboardType="numeric"
        value={rentalFee}
        onChangeText={(text) => setRentalFee(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="예약금 (₩) *"
        keyboardType="numeric"
        value={deposit}
        onChangeText={(text) => setDeposit(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="운영 정보"
        multiline
        value={operatingInfo}
        onChangeText={(text) => setOperatingInfo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="운영 시간 *"
        value={operatingHours}
        onChangeText={(text) => setOperatingHours(text)}
      />

      <Text style={styles.sectionTitle}>특전 이미지</Text>
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => pickImage(setBenefitsImage)}
      >
        <Text>특전 이미지 선택</Text>
      </TouchableOpacity>
      {benefitsImage && (
        <Image
          source={{ uri: benefitsImage.uri }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="소개글"
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.sectionTitle}>SNS 아이디</Text>
      <View style={styles.snsRow}>
        {['Instagram', 'X', '없음'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.snsButton, snsType === type && styles.snsSelected]}
            onPress={() => setSnsType(type)}
          >
            <Text
              style={snsType === type ? styles.snsTextSelected : styles.snsText}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="예: @instagram"
        value={snsAccount}
        onChangeText={(text) => setSnsAccount(text)}
      />

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={handleSubmit} // ✅ 등록 로직 실행됨!
      >
        <Text style={styles.registerText}>등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F7F7',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  addressInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
  },
  findAddressButton: {
    backgroundColor: '#cce5ff',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findAddressText: {
    color: '#333',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  categorySelected: {
    backgroundColor: '#FFB6C1',
  },
  uploadBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  registerBtn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  snsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  snsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#fff',
  },
  snsSelected: {
    backgroundColor: '#007bff',
  },
  snsText: {
    color: '#007bff',
  },
  snsTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CafeRegisterScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const dummyPlaces = [
  {
    id: 1,
    name: '로얄 마카롱 신사역점',
    region: '강남',
    address: '서울특별시 강남구 도산대로1길 6 지하 1층',
    type: '디저트 카페',
    mainImage: require('../../../assets/cafe/sample-cafe1.png'),
    sampleImages: [require('../../../assets/cafe/sample-cafe2.png')],
    fee: '대관료 : 0', // 대관료
    deposit: '예약금 : 50000', //예약금
    info: '마카롱 전문점이며, 사진 촬영이 잘 되도록 조명이 좋아요.',
    hours: '운영 시간 : 11:00 ~ 19:00',
    sns: '@royalmacaron',
  },
  {
    id: 2,
    name: '상호명',
    region: '성수',
    address: '서울 성동구 성수일로12길',
    type: '스튜디오',
    mainImage: require('../../../assets/cafe/sample-cafe2.png'),
    sampleImages: [require('../../../assets/cafe/sample-cafe1.png')],
    fee: '대관료 : 30000',
    deposit: '예약금 : 10000',
    info: '사진 촬영 전용 스튜디오로 조용한 분위기입니다.',
    hours: '10:00 ~ 18:00',
    sns: '@studio_seongsu',
  },
];

const dummyRegions = [
  { name: '홍대', count: 31 }, { name: '상수', count: 6 }, { name: '합정', count: 5 },
  { name: '용산', count: 6 }, { name: '건대', count: 2 }, { name: '망원', count: 6 },
  { name: '강남', count: 7 }, { name: '성수', count: 7 }, { name: '을지로', count: 1 },
  { name: '동대문', count: 2 }, { name: '명동', count: 1 }, { name: '압구정', count: 2 },
  { name: '공덕', count: 1 }, { name: '독산', count: 1 }, { name: '양천구', count: 1 },
  { name: '강서구', count: 1 }, { name: '서대문구', count: 1 }, { name: '중랑구', count: 1 },
  { name: '잠실', count: 3 }, { name: '영등포', count: 1 }, { name: '전주', count: 1 },
  { name: '경기', count: 5 }, { name: '대구', count: 2 }, { name: '광주', count: 1 },
  { name: '인천', count: 1 }, { name: '울산', count: 1 }, { name: '부산', count: 5 },
  { name: '군산', count: 1 }, { name: '경북', count: 1 }, { name: '제주', count: 2 },
  { name: '그 외', count: 2 },
];

const PlaceReservationScreen = () => {
  const navigation = useNavigation();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const onDayPress = (day) => {
    const selectedDate = day.dateString;

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
      setMarkedDates({
        [selectedDate]: { startingDay: true, endingDay: true, color: '#FFEB99', textColor: 'black' },
      });
    } else {
      if (selectedDate < startDate) {
        Alert.alert('알림', '종료일은 시작일 이후여야 합니다.');
        return;
      }
      setEndDate(selectedDate);

      const range = getDateRange(startDate, selectedDate);
      const marked = {};
      range.forEach((date, index) => {
        if (index === 0) {
          marked[date] = { startingDay: true, color: '#FFEB99', textColor: 'black' };
        } else if (index === range.length - 1) {
          marked[date] = { endingDay: true, color: '#FFEB99', textColor: 'black' };
        } else {
          marked[date] = { color: '#FFF4BF', textColor: 'black' };
        }
      });
      setMarkedDates(marked);
    }
  };

  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const confirmDateSelection = () => {
    if (!startDate || !endDate) {
      Alert.alert('알림', '시작일과 종료일을 선택해주세요.');
      return;
    }
    console.log(`날짜 선택됨: ${startDate} ~ ${endDate}`);
    setCalendarVisible(false);
  };

  const renderDateText = () => {
    if (startDate && endDate) {
      return `${startDate} ~ ${endDate}`;
    } else if (startDate) {
      return `${startDate} ~ `;
    } else {
      return '날짜 선택';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {/* 날짜 선택 */}
        <TouchableOpacity style={styles.filterButton} onPress={() => setCalendarVisible(true)}>
          <Ionicons name="calendar-outline" size={16} color="black" />
          <Text style={styles.filterText}>{renderDateText()}</Text>
        </TouchableOpacity>

        {/* 지역 선택 */}
        <TouchableOpacity style={styles.filterButton} onPress={() => setLocationModalVisible(true)}>
          <Ionicons name="location-outline" size={16} color="black" />
          <Text style={styles.filterText}>지역 선택</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
      {dummyPlaces.map((place) => (
        <TouchableOpacity
          key={place.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate('PlaceDetail', {
              ...place,
              images: [place.mainImage, ...(place.sampleImages || [])],
            })
          }
        >
          <View style={styles.imageBox}>
            <Image source={place.mainImage} style={styles.image} resizeMode="cover" />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.title}>{place.name}</Text>
            <Text>{place.address}</Text>
            <Text>{place.hours}</Text>
            <Text>{place.fee}</Text>
            <Text>{place.deposit}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

      <Modal visible={calendarVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModal}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={markedDates}
              markingType="period"
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                todayTextColor: '#FF6F61',
                arrowColor: '#FF6F61',
              }}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={confirmDateSelection}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={locationModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>지역 선택</Text>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.tagsContainer}>
              {dummyRegions.map((region, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text>{`${region.name} ${region.count}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlaceReservationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  filterContainer: {
    backgroundColor: '#ddd',
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  filterText: { marginLeft: 8, fontWeight: 'bold' },
  scrollContent: { paddingBottom: 40 },
  card: {
    backgroundColor: '#ffcfd0',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 12,
  },
  imageBox: {
    backgroundColor: '#d3d3d3',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoBox: { paddingHorizontal: 8 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  calendarModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  confirmButton: {
    backgroundColor: '#FF5E5E',
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
    margin: 4,
  },
});

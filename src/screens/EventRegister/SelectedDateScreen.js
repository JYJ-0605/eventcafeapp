import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const SelectedDateScreen = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    const date = day.dateString;

    if (!startDate || (startDate && endDate)) {
      // 시작일만 선택
      setStartDate(date);
      setEndDate(null);
      setMarkedDates({
        [date]: {
          startingDay: true,
          endingDay: true,
          color: '#FFB6B6',
          textColor: 'black',
        },
      });
    } else {
      // 종료일 선택
      if (date < startDate) {
        Alert.alert('알림', '종료일은 시작일 이후여야 합니다.');
        return;
      }
      setEndDate(date);

      const range = getDateRange(startDate, date);
      const newMarkedDates = {};

      range.forEach((d, index) => {
        if (index === 0) {
          newMarkedDates[d] = { startingDay: true, color: '#FFB6B6', textColor: 'black' };
        } else if (index === range.length - 1) {
          newMarkedDates[d] = { endingDay: true, color: '#FFB6B6', textColor: 'black' };
        } else {
          newMarkedDates[d] = { color: '#FFECEC', textColor: 'black' };
        }
      });

      setMarkedDates(newMarkedDates);
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

  const handleNext = () => {
    if (!startDate || !endDate) {
      alert('시작일과 종료일을 모두 선택해 주세요!');
      return;
    }
    console.log('선택한 날짜 범위:', startDate, '~', endDate);
    // 다음 스크린으로 넘기기
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>날짜 선택</Text>

        <View style={styles.dateNotice}>
          <Text style={{ color: '#FF6B6B' }}>
            {startDate && endDate ? `${startDate} ~ ${endDate}` :
              startDate ? `${startDate} ~ (종료일 선택)` :
              '날짜를 선택해 주세요'}
          </Text>
        </View>

        <View style={styles.calendarBox}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType="period"
            minDate={new Date().toISOString().split('T')[0]}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.goBack()}>
            <Text>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('SelectPlace')}
          >
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectedDateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateNotice: {
    backgroundColor: '#FFDADA',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  calendarBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prevButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FFB6B6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
});
